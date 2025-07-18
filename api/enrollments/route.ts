import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function getUserFromToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  try {
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const enrollments = await sql`
      SELECT 
        e.id,
        e.user_id,
        e.course_id,
        e.progress,
        e.enrollment_date,
        e.completion_date,
        e.payment_status,
        e.payment_reference,
        c.title,
        c.thumbnail_url,
        c.duration_hours,
        u.first_name || ' ' || u.last_name as instructor_name,
        COUNT(l.id) as total_lessons,
        COUNT(CASE WHEN lp.completed_at IS NOT NULL THEN 1 END) as completed_lessons
      FROM enrollments e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = e.user_id
      WHERE e.user_id = ${user.userId}
      GROUP BY e.id, c.id, u.first_name, u.last_name
      ORDER BY e.enrollment_date DESC
    `

    return NextResponse.json({
      success: true,
      enrollments: enrollments.map((enrollment) => ({
        ...enrollment,
        total_lessons: Number.parseInt(enrollment.total_lessons) || 0,
        completed_lessons: Number.parseInt(enrollment.completed_lessons) || 0,
      })),
    })
  } catch (error) {
    console.error("Get enrollments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { course_id, payment_reference } = await request.json()

    if (!course_id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    // Check if already enrolled
    const existingEnrollments = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${user.userId} AND course_id = ${course_id}
    `

    if (existingEnrollments.length > 0) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 409 })
    }

    // Create enrollment
    const newEnrollments = await sql`
      INSERT INTO enrollments (user_id, course_id, payment_reference, payment_status)
      VALUES (${user.userId}, ${course_id}, ${payment_reference || null}, ${payment_reference ? "completed" : "pending"})
      RETURNING *
    `

    const enrollment = newEnrollments[0]

    return NextResponse.json({
      success: true,
      enrollment,
    })
  } catch (error) {
    console.error("Create enrollment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

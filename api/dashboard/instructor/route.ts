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
    if (!user || user.role !== "instructor") {
      return NextResponse.json({ error: "Instructor access required" }, { status: 403 })
    }

    // Get instructor's courses
    const courses = await sql`
      SELECT 
        c.id,
        c.title,
        c.price,
        c.is_published,
        c.thumbnail_url,
        COUNT(DISTINCT e.id) as enrollment_count,
        COALESCE(AVG(r.rating), 0) as rating,
        COUNT(DISTINCT r.id) as total_reviews
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id AND e.payment_status = 'completed'
      LEFT JOIN reviews r ON c.id = r.course_id
      WHERE c.instructor_id = ${user.userId}
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `

    // Get students enrolled in instructor's courses
    const students = await sql`
      SELECT DISTINCT
        u.id,
        u.first_name || ' ' || u.last_name as name,
        u.email,
        u.avatar_url,
        e.enrollment_date,
        e.progress,
        c.title as course_title
      FROM users u
      JOIN enrollments e ON u.id = e.user_id
      JOIN courses c ON e.course_id = c.id
      WHERE c.instructor_id = ${user.userId} AND e.payment_status = 'completed'
      ORDER BY e.enrollment_date DESC
      LIMIT 50
    `

    // Calculate total revenue
    const revenueResult = await sql`
      SELECT COALESCE(SUM(c.price), 0) as total_revenue
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE c.instructor_id = ${user.userId} AND e.payment_status = 'completed'
    `

    const totalRevenue = Number.parseFloat(revenueResult[0]?.total_revenue || "0")

    return NextResponse.json({
      success: true,
      data: {
        courses: courses.map((course) => ({
          ...course,
          enrollment_count: Number.parseInt(course.enrollment_count) || 0,
          rating: Number.parseFloat(course.rating) || 0,
          total_reviews: Number.parseInt(course.total_reviews) || 0,
        })),
        students,
        revenue: totalRevenue,
        analytics: {
          total_students: students.length,
          total_courses: courses.length,
          avg_rating:
            courses.length > 0 ? courses.reduce((acc, c) => acc + Number.parseFloat(c.rating), 0) / courses.length : 0,
        },
      },
    })
  } catch (error) {
    console.error("Instructor dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

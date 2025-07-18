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

    // Get enrollments with progress
    const enrollments = await sql`
      SELECT 
        e.id,
        e.course_id,
        e.progress,
        e.enrollment_date,
        c.title,
        c.thumbnail_url,
        u.first_name || ' ' || u.last_name as instructor_name,
        COUNT(l.id) as total_lessons,
        COUNT(CASE WHEN lp.completed_at IS NOT NULL THEN 1 END) as completed_lessons
      FROM enrollments e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = e.user_id
      WHERE e.user_id = ${user.userId} AND e.payment_status = 'completed'
      GROUP BY e.id, c.id, u.first_name, u.last_name
      ORDER BY e.enrollment_date DESC
    `

    // Get upcoming sessions (mock data for now)
    const upcomingSessions = [
      {
        id: 1,
        title: "1-on-1 Mentor Session",
        date: "Tomorrow",
        time: "2:00 PM",
        type: "Mentorship",
        mentor: "James Okafor",
      },
    ]

    // Get achievements (mock data for now)
    const achievements = [
      {
        id: 1,
        title: "First Course Enrolled",
        description: "Started your learning journey",
        earned: true,
        date: "1 week ago",
      },
    ]

    return NextResponse.json({
      success: true,
      data: {
        enrollments: enrollments.map((e) => ({
          ...e,
          total_lessons: Number.parseInt(e.total_lessons) || 0,
          completed_lessons: Number.parseInt(e.completed_lessons) || 0,
        })),
        upcoming_sessions: upcomingSessions,
        achievements,
      },
    })
  } catch (error) {
    console.error("Student dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

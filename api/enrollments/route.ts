import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { course_id } = await request.json()

    if (!course_id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    // Check if already enrolled
    const existingEnrollment = await query("SELECT id FROM enrollments WHERE student_id = $1 AND course_id = $2", [
      userId,
      course_id,
    ])

    if (existingEnrollment.rows.length > 0) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
    }

    // Create enrollment
    const result = await query(
      `INSERT INTO enrollments (student_id, course_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [userId, course_id],
    )

    // Update course enrollment count
    await query("UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = $1", [course_id])

    return NextResponse.json(
      {
        success: true,
        enrollment: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Failed to enroll in course" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    const result = await query(
      `SELECT 
        e.*, c.title, c.thumbnail_url, c.slug,
        c.total_lessons, c.duration_hours,
        u.first_name || ' ' || u.last_name as instructor_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN instructors i ON c.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE e.student_id = $1 AND e.is_active = true
      ORDER BY e.enrolled_at DESC`,
      [userId],
    )

    return NextResponse.json({
      success: true,
      enrollments: result.rows,
    })
  } catch (error) {
    console.error("Enrollments fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 })
  }
}

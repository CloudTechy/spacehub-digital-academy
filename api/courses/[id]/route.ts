import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    const courses = await sql`
      SELECT 
        c.id,
        c.title,
        c.slug,
        c.description,
        c.short_description,
        c.thumbnail_url,
        c.price,
        c.original_price,
        c.currency,
        c.duration_hours,
        c.level,
        c.is_featured,
        c.is_published,
        c.created_at,
        c.updated_at,
        cat.name as category_name,
        u.first_name || ' ' || u.last_name as instructor_name,
        u.id as instructor_id,
        u.bio as instructor_bio,
        u.avatar_url as instructor_avatar,
        COALESCE(AVG(r.rating), 0) as rating,
        COUNT(DISTINCT r.id) as total_reviews,
        COUNT(DISTINCT e.id) as enrollment_count,
        COALESCE(AVG(ur.rating), 0) as instructor_rating
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN reviews r ON c.id = r.course_id
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN reviews ur ON u.id = ur.instructor_id
      WHERE c.id = ${courseId} AND c.is_published = true
      GROUP BY c.id, cat.name, u.first_name, u.last_name, u.id, u.bio, u.avatar_url
    `

    if (courses.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const course = courses[0]

    // Get course lessons
    const lessons = await sql`
      SELECT id, title, description, duration_minutes, is_free, order_index
      FROM lessons
      WHERE course_id = ${courseId}
      ORDER BY order_index ASC
    `

    // Get recent reviews
    const reviews = await sql`
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        u.first_name || ' ' || u.last_name as student_name,
        u.avatar_url as student_avatar
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.course_id = ${courseId}
      ORDER BY r.created_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      success: true,
      course: {
        ...course,
        rating: Number.parseFloat(course.rating) || 0,
        total_reviews: Number.parseInt(course.total_reviews) || 0,
        enrollment_count: Number.parseInt(course.enrollment_count) || 0,
        instructor_rating: Number.parseFloat(course.instructor_rating) || 0,
        lessons,
        reviews,
      },
    })
  } catch (error) {
    console.error("Get course error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

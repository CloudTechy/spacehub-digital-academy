import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const instructor = searchParams.get("instructor")
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = `
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
      WHERE c.is_published = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (category && category !== "all") {
      query += ` AND cat.slug = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (level && level !== "all") {
      query += ` AND c.level = $${paramIndex}`
      params.push(level)
      paramIndex++
    }

    if (featured === "true") {
      query += ` AND c.is_featured = true`
    }

    if (instructor === "true") {
      // This would require authentication to get instructor's courses
      // For now, we'll skip this filter
    }

    query += `
      GROUP BY c.id, cat.name, u.first_name, u.last_name, u.id
      ORDER BY c.is_featured DESC, c.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    params.push(limit, offset)

    const courses = await sql(query, params)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT c.id) as total
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.is_published = true
    `

    const countParams: any[] = []
    let countParamIndex = 1

    if (category && category !== "all") {
      countQuery += ` AND cat.slug = $${countParamIndex}`
      countParams.push(category)
      countParamIndex++
    }

    if (level && level !== "all") {
      countQuery += ` AND c.level = $${countParamIndex}`
      countParams.push(level)
      countParamIndex++
    }

    if (featured === "true") {
      countQuery += ` AND c.is_featured = true`
    }

    const totalResult = await sql(countQuery, countParams)
    const total = Number.parseInt(totalResult[0]?.total || "0")

    return NextResponse.json({
      success: true,
      courses: courses.map((course) => ({
        ...course,
        rating: Number.parseFloat(course.rating) || 0,
        total_reviews: Number.parseInt(course.total_reviews) || 0,
        enrollment_count: Number.parseInt(course.enrollment_count) || 0,
        instructor_rating: Number.parseFloat(course.instructor_rating) || 0,
      })),
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Get courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would require authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // For now, return a placeholder response
    return NextResponse.json({ error: "Course creation not implemented yet" }, { status: 501 })
  } catch (error) {
    console.error("Create course error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

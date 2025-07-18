import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let queryText = `
      SELECT 
        c.id, c.title, c.slug, c.description, c.short_description,
        c.thumbnail_url, c.price, c.original_price, c.currency,
        c.duration_hours, c.level, c.enrollment_count, c.rating,
        c.total_reviews, c.is_featured, c.created_at,
        cat.name as category_name, cat.slug as category_slug,
        u.first_name || ' ' || u.last_name as instructor_name,
        i.title as instructor_title, i.rating as instructor_rating
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN instructors i ON c.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE c.is_published = true
    `

    const params: any[] = []
    let paramIndex = 1

    if (category) {
      queryText += ` AND cat.slug = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (featured === "true") {
      queryText += ` AND c.is_featured = true`
    }

    queryText += ` ORDER BY c.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const result = await query(queryText, params)

    return NextResponse.json({
      success: true,
      courses: result.rows,
      pagination: {
        limit,
        offset,
        total: result.rows.length,
      },
    })
  } catch (error) {
    console.error("Courses fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const userRole = request.headers.get("x-user-role")

    if (userRole !== "instructor" && userRole !== "admin") {
      return NextResponse.json({ error: "Only instructors can create courses" }, { status: 403 })
    }

    const {
      title,
      description,
      short_description,
      category_id,
      price,
      original_price,
      level,
      requirements,
      what_you_learn,
    } = await request.json()

    if (!title || !description || !category_id) {
      return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 })
    }

    // Get instructor ID
    const instructorResult = await query("SELECT id FROM instructors WHERE user_id = $1", [userId])

    if (instructorResult.rows.length === 0) {
      return NextResponse.json({ error: "Instructor profile not found" }, { status: 404 })
    }

    const instructorId = instructorResult.rows[0].id

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const result = await query(
      `INSERT INTO courses (
        title, slug, description, short_description, instructor_id, 
        category_id, price, original_price, level, requirements, what_you_learn
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`,
      [
        title,
        slug,
        description,
        short_description,
        instructorId,
        category_id,
        price || 0,
        original_price,
        level || "beginner",
        requirements || [],
        what_you_learn || [],
      ],
    )

    return NextResponse.json(
      {
        success: true,
        course: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Course creation error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    const result = await query(
      `SELECT 
        c.*, 
        cat.name as category_name, cat.slug as category_slug,
        u.first_name || ' ' || u.last_name as instructor_name,
        i.title as instructor_title, i.bio as instructor_bio,
        i.rating as instructor_rating, i.total_students as instructor_total_students
      FROM courses c
      JOIN categories cat ON c.category_id = cat.id
      JOIN instructors i ON c.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE c.id = $1 AND c.is_published = true`,
      [courseId],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Get course modules and lessons
    const modulesResult = await query(
      `SELECT 
        m.id, m.title, m.description, m.sort_order,
        l.id as lesson_id, l.title as lesson_title, 
        l.description as lesson_description, l.video_duration,
        l.is_free, l.sort_order as lesson_sort_order
      FROM course_modules m
      LEFT JOIN course_lessons l ON m.id = l.module_id AND l.is_published = true
      WHERE m.course_id = $1 AND m.is_published = true
      ORDER BY m.sort_order, l.sort_order`,
      [courseId],
    )

    // Structure the modules and lessons
    const modulesMap = new Map()

    modulesResult.rows.forEach((row) => {
      if (!modulesMap.has(row.id)) {
        modulesMap.set(row.id, {
          id: row.id,
          title: row.title,
          description: row.description,
          sort_order: row.sort_order,
          lessons: [],
        })
      }

      if (row.lesson_id) {
        modulesMap.get(row.id).lessons.push({
          id: row.lesson_id,
          title: row.lesson_title,
          description: row.lesson_description,
          video_duration: row.video_duration,
          is_free: row.is_free,
          sort_order: row.lesson_sort_order,
        })
      }
    })

    const course = {
      ...result.rows[0],
      modules: Array.from(modulesMap.values()),
    }

    return NextResponse.json({
      success: true,
      course,
    })
  } catch (error) {
    console.error("Course fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

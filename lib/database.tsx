import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(process.env.DATABASE_URL)

export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params)
    return { rows: result }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export { sql }

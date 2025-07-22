import { query } from "./database"

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  // This is a simple hash for demo purposes
  // In production, use bcrypt or similar
  return Buffer.from(password).toString("base64")
}

function verifyPassword(password: string, hash: string): boolean {
  return Buffer.from(password).toString("base64") === hash
}

// Simple JWT implementation (in production, use jsonwebtoken)
function createToken(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" }
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url")
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}.secret`).toString("base64url")
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifyToken(token: string): any {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString())
    return payload
  } catch {
    return null
  }
}

// User authentication
export async function authenticateUser(email: string, password: string) {
  try {
    const result = await query(
      "SELECT id, email, password_hash, first_name, last_name, role, is_active FROM users WHERE email = $1",
      [email],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "User not found" }
    }

    const user = result.rows[0]

    if (!user.is_active) {
      return { success: false, error: "Account is deactivated" }
    }

    const isValidPassword = verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return { success: false, error: "Invalid password" }
    }

    // Generate simple token
    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

// Create new user
export async function createUser(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: string
}) {
  try {
    const { email, password, firstName, lastName, role = "student" } = userData

    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return { success: false, error: "User already exists" }
    }

    // Hash password
    const passwordHash = hashPassword(password)

    // Insert new user
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name, role`,
      [email, passwordHash, firstName, lastName, role],
    )

    const newUser = result.rows[0]

    // Generate token
    const token = createToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        role: newUser.role,
      },
      token,
    }
  } catch (error) {
    console.error("User creation error:", error)
    return { success: false, error: "Failed to create user" }
  }
}

// Verify JWT token
export function verifyJWT(token: string) {
  try {
    const payload = verifyToken(token)
    if (!payload || payload.exp < Date.now()) {
      return { success: false, error: "Token expired" }
    }
    return { success: true, payload }
  } catch (error) {
    return { success: false, error: "Invalid token" }
  }
}

// Generate API token
export async function generateApiToken(userId: string, name: string) {
  try {
    const token = `spb_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`
    const tokenHash = Buffer.from(token).toString("base64")

    await query(
      `INSERT INTO api_tokens (user_id, token_hash, name, expires_at) 
       VALUES ($1, $2, $3, $4)`,
      [userId, tokenHash, name, new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)], // 1 year
    )

    return { success: true, token }
  } catch (error) {
    console.error("API token generation error:", error)
    return { success: false, error: "Failed to generate API token" }
  }
}

// Verify API token
export async function verifyApiToken(token: string) {
  try {
    if (!token.startsWith("spb_")) {
      return { success: false, error: "Invalid token format" }
    }

    const tokenHash = Buffer.from(token).toString("base64")

    const result = await query(
      `SELECT at.user_id, at.name, u.email, u.role, u.first_name, u.last_name
       FROM api_tokens at
       JOIN users u ON at.user_id = u.id
       WHERE at.token_hash = $1 AND at.is_active = true 
       AND (at.expires_at IS NULL OR at.expires_at > NOW())`,
      [tokenHash],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Invalid or expired token" }
    }

    const tokenData = result.rows[0]

    // Update last used timestamp
    await query("UPDATE api_tokens SET last_used_at = NOW() WHERE token_hash = $1", [tokenHash])

    return {
      success: true,
      user: {
        id: tokenData.user_id,
        email: tokenData.email,
        firstName: tokenData.first_name,
        lastName: tokenData.last_name,
        role: tokenData.role,
      },
    }
  } catch (error) {
    console.error("API token verification error:", error)
    return { success: false, error: "Token verification failed" }
  }
}

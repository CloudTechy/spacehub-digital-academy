import { type NextRequest, NextResponse } from "next/server"
import { verifyApiToken, verifyJWT } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Only apply middleware to API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Skip auth for public endpoints
  const publicEndpoints = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/courses/public",
    "/api/health",
    "/api/webhooks",
  ]

  const isPublicEndpoint = publicEndpoints.some((endpoint) => request.nextUrl.pathname.startsWith(endpoint))

  if (isPublicEndpoint) {
    return NextResponse.next()
  }

  // Check for API token or JWT token
  const apiToken = request.headers.get("x-api-key")
  const authHeader = request.headers.get("authorization")
  const jwtToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null

  let user = null

  // Try API token first
  if (apiToken) {
    const tokenResult = await verifyApiToken(apiToken)
    if (tokenResult.success) {
      user = tokenResult.user
    }
  }

  // Try JWT token if API token failed
  if (!user && jwtToken) {
    const jwtResult = verifyJWT(jwtToken)
    if (jwtResult.success) {
      user = jwtResult.payload
    }
  }

  if (!user) {
    return NextResponse.json({ error: "Unauthorized - Invalid or missing authentication token" }, { status: 401 })
  }

  // Add user info to request headers for use in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", user.id || user.userId)
  requestHeaders.set("x-user-email", user.email)
  requestHeaders.set("x-user-role", user.role)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: "/api/:path*",
}

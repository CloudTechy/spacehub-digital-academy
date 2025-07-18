"use client"

import { useState, useEffect } from "react"

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  role: "student" | "instructor" | "admin"
  avatar_url?: string
  created_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  thumbnail_url: string
  price: number
  original_price?: number
  currency: string
  duration_hours: number
  level: "beginner" | "intermediate" | "advanced"
  enrollment_count: number
  rating: number
  total_reviews: number
  is_featured: boolean
  is_published: boolean
  category_name: string
  instructor_name: string
  instructor_id: string
  instructor_rating: number
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed_lessons: number
  total_lessons: number
  enrollment_date: string
  completion_date?: string
  payment_status: "pending" | "completed" | "failed"
  payment_reference?: string
  // Course details
  title: string
  thumbnail_url: string
  instructor_name: string
}

// API Client Class
class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ success: boolean; data?: T; error?: string; [key: string]: any }> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const result = await this.request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (result.success && result.token) {
      this.token = result.token
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
    }

    return result
  }

  async register(userData: {
    email: string
    password: string
    first_name: string
    last_name: string
    role?: "student" | "instructor"
  }) {
    const result = await this.request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (result.success && result.token) {
      this.token = result.token
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
    }

    return result
  }

  logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user")
    }
  }

  getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  // Course methods
  async getCourses(
    params: {
      category?: string
      level?: string
      instructor?: boolean
      featured?: boolean
      limit?: number
      offset?: number
    } = {},
  ) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })

    const endpoint = `/courses${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<{ courses: Course[]; total: number }>(endpoint)
  }

  async getCourse(id: string) {
    return this.request<{ course: Course }>(`/courses/${id}`)
  }

  async createCourse(courseData: Partial<Course>) {
    return this.request<{ course: Course }>("/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    })
  }

  async updateCourse(id: string, courseData: Partial<Course>) {
    return this.request<{ course: Course }>(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    })
  }

  // Enrollment methods
  async getEnrollments() {
    return this.request<{ enrollments: Enrollment[] }>("/enrollments")
  }

  async enrollInCourse(courseId: string, paymentReference?: string) {
    return this.request<{ enrollment: Enrollment }>("/enrollments", {
      method: "POST",
      body: JSON.stringify({ course_id: courseId, payment_reference: paymentReference }),
    })
  }

  async updateEnrollmentProgress(enrollmentId: string, progress: number) {
    return this.request<{ enrollment: Enrollment }>(`/enrollments/${enrollmentId}/progress`, {
      method: "PUT",
      body: JSON.stringify({ progress }),
    })
  }

  // Payment methods
  async verifyPayment(reference: string) {
    return this.request<{ payment: any }>(`/payments/verify/${reference}`)
  }

  async createPayment(data: {
    course_id: string
    amount: number
    email: string
    metadata?: any
  }) {
    return this.request<{ payment_url: string; reference: string }>("/payments/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Dashboard methods
  async getDashboardData() {
    return this.request<{
      enrollments: Enrollment[]
      progress: any
      achievements: any[]
      upcoming_sessions: any[]
    }>("/dashboard/student")
  }

  async getInstructorStats() {
    return this.request<{
      courses: Course[]
      students: any[]
      revenue: number
      analytics: any
    }>("/dashboard/instructor")
  }

  // Lead capture
  async submitLead(data: {
    email: string
    first_name?: string
    last_name?: string
    phone?: string
    interest?: string
  }) {
    return this.request<{ lead: any }>("/leads", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

// Create singleton instance
const apiClient = new ApiClient()

// React hook for API
export function useApi() {
  return apiClient
}

// Auth hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = apiClient.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = await apiClient.login(email, password)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const register = async (userData: {
    email: string
    password: string
    first_name: string
    last_name: string
    role?: "student" | "instructor"
  }) => {
    const result = await apiClient.register(userData)
    if (result.success) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    apiClient.logout()
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}

export default apiClient

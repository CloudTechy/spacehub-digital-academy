"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
export interface User {
  id: number
  name: string
  email: string
  role: "student" | "instructor"
  avatar?: string
  enrolledCourses?: number[]
  createdAt: string
}

export interface Course {
  id: number
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  students: number
  duration: string
  level: string
  image: string
  instructor: string
  category: string
  curriculum?: {
    id: number
    title: string
    duration: string
    lessons: {
      id: number
      title: string
      duration: string
      type: "video" | "text" | "quiz"
    }[]
  }[]
  reviews?: {
    id: number
    user: string
    rating: number
    comment: string
    date: string
  }[]
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("spacehub_token")
        if (token) {
          // Verify token with backend
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData.user)
          } else {
            localStorage.removeItem("spacehub_token")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("spacehub_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        localStorage.setItem("spacehub_token", data.token)
        return { success: true }
      } else {
        return { success: false, error: data.error || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error" }
    }
  }

  const register = async (name: string, email: string, password: string, role = "student") => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        localStorage.setItem("spacehub_token", data.token)
        return { success: true }
      } else {
        return { success: false, error: data.error || "Registration failed" }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Network error" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("spacehub_token")
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// API Functions for courses and other data
export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch("/api/courses")
    if (!response.ok) {
      throw new Error("Failed to fetch courses")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export async function fetchCourse(id: number): Promise<Course | null> {
  try {
    const response = await fetch(`/api/courses/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch course")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}

export async function enrollInCourse(courseId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const token = localStorage.getItem("spacehub_token")
    const response = await fetch("/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: data.error || "Enrollment failed" }
    }
  } catch (error) {
    console.error("Enrollment error:", error)
    return { success: false, error: "Network error" }
  }
}

export async function submitLeadCapture(data: {
  name: string
  email: string
  phone?: string
  interest: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: result.error || "Failed to submit" }
    }
  } catch (error) {
    console.error("Lead capture error:", error)
    return { success: false, error: "Network error" }
  }
}

// Student Dashboard API
export async function fetchStudentDashboard(): Promise<{
  enrolledCourses: Course[]
  progress: { [courseId: number]: number }
  certificates: any[]
} | null> {
  try {
    const token = localStorage.getItem("spacehub_token")
    const response = await fetch("/api/dashboard/student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching student dashboard:", error)
    return null
  }
}

// Instructor Dashboard API
export async function fetchInstructorDashboard(): Promise<{
  courses: Course[]
  students: number
  revenue: number
  analytics: any
} | null> {
  try {
    const token = localStorage.getItem("spacehub_token")
    const response = await fetch("/api/dashboard/instructor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching instructor dashboard:", error)
    return null
  }
}

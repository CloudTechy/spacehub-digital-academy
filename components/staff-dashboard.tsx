"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Star,
  Bell,
} from "lucide-react"
import { useApi } from "../lib/api"
import { formatNaira } from "../lib/paystack"
import { useInView } from "../lib/animations"

interface StaffDashboardProps {
  onNavigate?: (page: string) => void
}

export function StaffDashboard({ onNavigate }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const api = useApi()
  const [sectionRef, sectionInView] = useInView()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [coursesResponse, dashboardResponse] = await Promise.all([
        api.getCourses({ instructor: true }),
        api.getInstructorStats().catch(() => ({ success: false })),
      ])

      if (coursesResponse.success) {
        setCourses(coursesResponse.courses || [])
      }

      if (dashboardResponse.success) {
        setDashboardData(dashboardResponse.data)
        setStudents(dashboardResponse.data.students || [])
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    api.logout()
    onNavigate?.("home")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    )
  }

  const instructorData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@spacehub.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    title: "Senior Full-Stack Instructor",
    totalStudents: students.length || 1247,
    totalCourses: courses.length || 8,
    totalRevenue: 2450000, // In Naira
    averageRating: 4.9,
    completionRate: 87,
    responseTime: "2 hours",
    nextClass: "Tomorrow, 10:00 AM",
    upcomingDeadline: "Assignment Review - 2 days",
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SpaceHub</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Instructor Portal</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <img
                  src={instructorData.avatar || "/placeholder.svg"}
                  alt={instructorData.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <div className="font-medium text-gray-900">{instructorData.name}</div>
                  <div className="text-xs text-gray-500">{instructorData.title}</div>
                </div>
              </div>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructor Profile */}
            <Card
              className={`transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardContent className="p-6 text-center">
                <img
                  src={instructorData.avatar || "/placeholder.svg"}
                  alt={instructorData.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-gray-900 mb-1">{instructorData.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{instructorData.title}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{instructorData.averageRating}</span>
                  <span className="text-sm text-gray-500">rating</span>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Top Instructor</Badge>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className={`transition-all duration-1000 delay-200 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-bold text-blue-600">{instructorData.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Courses</span>
                  <span className="font-bold text-green-600">{instructorData.totalCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-bold text-purple-600">{instructorData.completionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-bold text-orange-600">{instructorData.responseTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card
              className={`transition-all duration-1000 delay-400 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900 text-sm">Next Class</p>
                  <p className="text-sm text-blue-700">{instructorData.nextClass}</p>
                  <p className="text-xs text-blue-600">React Advanced Concepts</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="font-medium text-orange-900 text-sm">Deadline</p>
                  <p className="text-sm text-orange-700">{instructorData.upcomingDeadline}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Welcome Message */}
                <Card
                  className={`transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Good morning, {instructorData.name.split(" ")[1]}! 👋
                    </h2>
                    <p className="text-gray-600">
                      You have 3 new student enrollments and 12 pending assignments to review.
                    </p>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Total Students",
                      value: instructorData.totalStudents.toLocaleString(),
                      change: "+12%",
                      icon: Users,
                      color: "text-blue-600",
                      bgColor: "bg-blue-50",
                    },
                    {
                      title: "Active Courses",
                      value: instructorData.totalCourses.toString(),
                      change: "+2",
                      icon: BookOpen,
                      color: "text-green-600",
                      bgColor: "bg-green-50",
                    },
                    {
                      title: "Monthly Revenue",
                      value: formatNaira(instructorData.totalRevenue / 12),
                      change: "+18%",
                      icon: DollarSign,
                      color: "text-purple-600",
                      bgColor: "bg-purple-50",
                    },
                    {
                      title: "Avg. Rating",
                      value: instructorData.averageRating.toString(),
                      change: "+0.1",
                      icon: Star,
                      color: "text-yellow-600",
                      bgColor: "bg-yellow-50",
                    },
                  ].map((metric, index) => (
                    <Card
                      key={index}
                      className={`transition-all duration-1000 delay-${(index + 1) * 200} ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <p className="text-sm text-green-600">{metric.change} from last month</p>
                          </div>
                          <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                            <metric.icon className={`h-6 w-6 ${metric.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card
                    className={`transition-all duration-1000 delay-600 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            name: "John Adebayo",
                            course: "React Development",
                            time: "2 hours ago",
                            avatar:
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                          },
                          {
                            name: "Mary Okafor",
                            course: "UI/UX Design",
                            time: "5 hours ago",
                            avatar:
                              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                          },
                          {
                            name: "David Nwankwo",
                            course: "Data Science",
                            time: "1 day ago",
                            avatar:
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                          },
                        ].map((enrollment, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                            <img
                              src={enrollment.avatar || "/placeholder.svg"}
                              alt={enrollment.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{enrollment.name}</p>
                              <p className="text-sm text-gray-600">enrolled in {enrollment.course}</p>
                              <p className="text-xs text-gray-500">{enrollment.time}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`transition-all duration-1000 delay-800 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">Pending Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            student: "Alice Johnson",
                            assignment: "React Portfolio Project",
                            course: "React Development",
                            submitted: "2 days ago",
                          },
                          {
                            student: "Bob Wilson",
                            assignment: "E-commerce Design",
                            course: "UI/UX Design",
                            submitted: "3 days ago",
                          },
                          {
                            student: "Carol Brown",
                            assignment: "Data Analysis Report",
                            course: "Data Science",
                            submitted: "1 week ago",
                          },
                        ].map((review, index) => (
                          <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-gray-900">{review.student}</p>
                              <Badge variant="outline" className="text-xs">
                                {review.submitted}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{review.assignment}</p>
                            <p className="text-xs text-gray-500 mb-2">{review.course}</p>
                            <Button size="sm" className="w-full">
                              Review Assignment
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.length > 0
                    ? courses.map((course: any, index) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <img
                              src={course.thumbnail_url || "/placeholder.svg?height=150&width=300"}
                              alt={course.title}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className={course.is_published ? "bg-green-600" : "bg-yellow-600"}>
                                {course.is_published ? "Published" : "Draft"}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center justify-between">
                                <span>Students:</span>
                                <span className="font-medium">{course.enrollment_count || 0}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{course.rating || "N/A"}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Revenue:</span>
                                <span className="font-medium text-green-600">
                                  {formatNaira((course.enrollment_count || 0) * (course.price || 0))}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    : // Mock courses when no data
                      [
                        {
                          title: "Complete React Development",
                          students: 324,
                          rating: 4.8,
                          revenue: 1620000,
                          status: "Published",
                          thumbnail:
                            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=150&fit=crop",
                        },
                        {
                          title: "UI/UX Design Masterclass",
                          students: 256,
                          rating: 4.9,
                          revenue: 1280000,
                          status: "Published",
                          thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=150&fit=crop",
                        },
                        {
                          title: "Data Science with Python",
                          students: 189,
                          rating: 4.7,
                          revenue: 945000,
                          status: "Draft",
                          thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=150&fit=crop",
                        },
                      ].map((course, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <img
                              src={course.thumbnail || "/placeholder.svg?height=150&width=300"}
                              alt={course.title}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className={course.status === "Published" ? "bg-green-600" : "bg-yellow-600"}>
                                {course.status}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center justify-between">
                                <span>Students:</span>
                                <span className="font-medium">{course.students}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{course.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Revenue:</span>
                                <span className="font-medium text-green-600">{formatNaira(course.revenue)}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Students</h2>
                  <div className="flex gap-2">
                    <Input placeholder="Search students..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="react">React Development</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-4 font-medium text-gray-900">Student</th>
                            <th className="text-left p-4 font-medium text-gray-900">Course</th>
                            <th className="text-left p-4 font-medium text-gray-900">Progress</th>
                            <th className="text-left p-4 font-medium text-gray-900">Last Active</th>
                            <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "John Adebayo",
                              email: "john@email.com",
                              course: "React Development",
                              progress: 75,
                              lastActive: "2 hours ago",
                              avatar:
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                            },
                            {
                              name: "Mary Okafor",
                              email: "mary@email.com",
                              course: "UI/UX Design",
                              progress: 92,
                              lastActive: "1 day ago",
                              avatar:
                                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                            },
                            {
                              name: "David Nwankwo",
                              email: "david@email.com",
                              course: "Data Science",
                              progress: 45,
                              lastActive: "3 days ago",
                              avatar:
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                            },
                          ].map((student, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={student.avatar || "/placeholder.svg"}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-900">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge variant="outline">{student.course}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Progress value={student.progress} className="w-20 h-2" />
                                  <span className="text-sm font-medium">{student.progress}%</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-gray-600">{student.lastActive}</td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Course Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { course: "React Development", completion: 87, satisfaction: 4.8 },
                          { course: "UI/UX Design", completion: 92, satisfaction: 4.9 },
                          { course: "Data Science", completion: 78, satisfaction: 4.7 },
                        ].map((course, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{course.course}</span>
                              <div className="flex items-center gap-4 text-sm">
                                <span>{course.completion}% completion</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{course.satisfaction}</span>
                                </div>
                              </div>
                            </div>
                            <Progress value={course.completion} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Growth Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium text-blue-900">New Enrollments</p>
                            <p className="text-2xl font-bold text-blue-600">+47</p>
                          </div>
                          <div className="text-sm text-blue-600">+23% this month</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium text-green-900">Course Completions</p>
                            <p className="text-2xl font-bold text-green-600">+32</p>
                          </div>
                          <div className="text-sm text-green-600">+18% this month</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <p className="font-medium text-purple-900">Revenue Growth</p>
                            <p className="text-2xl font-bold text-purple-600">+15%</p>
                          </div>
                          <div className="text-sm text-purple-600">vs last month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="This month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="quarter">This quarter</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Revenue</p>
                          <p className="text-2xl font-bold text-gray-900">{formatNaira(instructorData.totalRevenue)}</p>
                          <p className="text-sm text-green-600">+12% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">This Month</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNaira(instructorData.totalRevenue / 12)}
                          </p>
                          <p className="text-sm text-blue-600">+8% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg. per Student</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNaira(Math.round(instructorData.totalRevenue / instructorData.totalStudents))}
                          </p>
                          <p className="text-sm text-purple-600">+5% from last month</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { course: "React Development", revenue: 1620000, students: 324, percentage: 45 },
                        { course: "UI/UX Design", revenue: 1280000, students: 256, percentage: 35 },
                        { course: "Data Science", revenue: 720000, students: 144, percentage: 20 },
                      ].map((course, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{course.course}</span>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{course.students} students</span>
                              <span className="font-bold text-green-600">{formatNaira(course.revenue)}</span>
                            </div>
                          </div>
                          <Progress value={course.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

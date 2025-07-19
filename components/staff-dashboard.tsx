"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, DollarSign, BookOpen, Plus, Edit, Eye, BarChart3, MessageSquare, Star } from "lucide-react"
import { useAuth } from "@/lib/api"

export function StaffDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Sample instructor data
  const instructorCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      students: 12500,
      revenue: 1125000,
      rating: 4.8,
      status: "published",
      lastUpdated: "2 days ago",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      students: 8900,
      revenue: 801000,
      rating: 4.9,
      status: "published",
      lastUpdated: "1 week ago",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "React Masterclass",
      students: 0,
      revenue: 0,
      rating: 0,
      status: "draft",
      lastUpdated: "3 days ago",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const recentStudents = [
    {
      id: 1,
      name: "Adebayo Johnson",
      course: "Complete Web Development Bootcamp",
      progress: 65,
      lastActive: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Fatima Al-Hassan",
      course: "Advanced JavaScript Concepts",
      progress: 80,
      lastActive: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Chinedu Okoro",
      course: "Complete Web Development Bootcamp",
      progress: 45,
      lastActive: "3 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      student: "Adebayo Johnson",
      course: "Complete Web Development Bootcamp",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly.",
      date: "2 days ago",
    },
    {
      id: 2,
      student: "Fatima Al-Hassan",
      course: "Advanced JavaScript Concepts",
      rating: 5,
      comment: "This course changed my understanding of JavaScript completely.",
      date: "1 week ago",
    },
  ]

  const stats = [
    {
      title: "Total Students",
      value: "21,400",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Revenue",
      value: "₦1,926,000",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Published Courses",
      value: "2",
      change: "0%",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. Rating",
      value: "4.85",
      change: "+0.1",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name || "Instructor"}! Manage your courses and track your success.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="create">Create Course</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Course Performance */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Your top performing courses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {instructorCourses
                      .filter((course) => course.status === "published")
                      .map((course) => (
                        <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>{course.students.toLocaleString()} students</span>
                              <span>₦{course.revenue.toLocaleString()}</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span>{course.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Students */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Students</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-3">
                        <img
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{student.name}</h4>
                          <p className="text-xs text-gray-600">{student.course}</p>
                          <p className="text-xs text-gray-500">{student.progress}% complete</p>
                        </div>
                        <span className="text-xs text-gray-500">{student.lastActive}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{review.student}</h4>
                          <p className="text-sm text-gray-600">{review.course}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <p className="text-gray-600">Manage and track your course content</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${
                        course.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>

                    {course.status === "published" ? (
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span>₦{course.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Course in development</p>
                    )}

                    <p className="text-xs text-gray-500 mt-3">Updated {course.lastUpdated}</p>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage your students across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.course}</p>
                          <p className="text-sm text-gray-500">Progress: {student.progress}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Last active: {student.lastActive}</span>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Course Analytics
                </CardTitle>
                <CardDescription>Detailed insights into your course performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Detailed analytics and reporting features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>Start building your next course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                    <Input placeholder="Enter course title" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
                    <Textarea placeholder="Describe what students will learn in this course" rows={4} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Web Development</option>
                        <option>Data Science</option>
                        <option>Digital Marketing</option>
                        <option>Mobile Development</option>
                        <option>Cybersecurity</option>
                        <option>Cloud Computing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>All Levels</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
                      <Input type="number" placeholder="89000" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <Input placeholder="40 hours" />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save as Draft
                    </Button>
                    <Button className="flex-1">Create Course</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

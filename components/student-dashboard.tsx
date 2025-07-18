"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Award, Users, Calendar, TrendingUp, Target, Bell, Settings, LogOut, BookOpen } from "lucide-react"
import { useApi } from "../lib/api"
import { useInView } from "../lib/animations"

interface StudentDashboardProps {
  onNavigate?: (page: string) => void
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [enrollments, setEnrollments] = useState([])
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
      const [enrollmentsResponse, dashboardResponse] = await Promise.all([
        api.getEnrollments(),
        api.getDashboardData().catch(() => ({ success: false })),
      ])

      if (enrollmentsResponse.success) {
        setEnrollments(enrollmentsResponse.enrollments || [])
      }

      if (dashboardResponse.success) {
        setDashboardData(dashboardResponse.data)
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueLearning = (courseId: string) => {
    // Navigate to course content
    console.log("Continue learning:", courseId)
  }

  const handleLogout = () => {
    api.logout()
    onNavigate?.("home")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const studentData = {
    name: "David Okonkwo",
    email: "david.okonkwo@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    enrolledCourses: enrollments.length,
    completedCourses: enrollments.filter((e: any) => e.progress >= 100).length,
    totalProgress:
      enrollments.length > 0
        ? Math.round(enrollments.reduce((acc: number, e: any) => acc + (e.progress || 0), 0) / enrollments.length)
        : 0,
    streak: 12,
    points: 2450,
    rank: "Advanced Learner",
    nextSession: "Tomorrow, 2:00 PM",
    mentor: "James Okafor",
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SpaceHub</span>
              </div>
              <Badge variant="secondary">Student Portal</Badge>
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
                  src={studentData.avatar || "/placeholder.svg"}
                  alt={studentData.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-900">{studentData.name}</span>
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
            {/* Student Profile */}
            <Card
              className={`transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardContent className="p-6 text-center">
                <img
                  src={studentData.avatar || "/placeholder.svg"}
                  alt={studentData.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-gray-900 mb-1">{studentData.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{studentData.email}</p>
                <Badge className="bg-blue-100 text-blue-800">{studentData.rank}</Badge>
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
                  <span className="text-sm text-gray-600">Learning Streak</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-orange-600">{studentData.streak}</span>
                    <span className="text-sm text-gray-500">days</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points Earned</span>
                  <span className="font-bold text-green-600">{studentData.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Enrolled</span>
                  <span className="font-bold text-blue-600">{studentData.enrolledCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-bold text-purple-600">{studentData.completedCourses}</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Session */}
            <Card
              className={`transition-all duration-1000 delay-400 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Next Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">1-on-1 Mentor Session</p>
                  <p className="text-sm text-gray-600">{studentData.nextSession}</p>
                  <p className="text-sm text-gray-600">with {studentData.mentor}</p>
                  <Button size="sm" className="w-full mt-3">
                    Join Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Welcome Message */}
                <Card
                  className={`transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, {studentData.name.split(" ")[0]}! 👋
                    </h2>
                    <p className="text-gray-600">
                      You're doing great! Keep up the momentum and continue your learning journey.
                    </p>
                  </CardContent>
                </Card>

                {/* Overall Progress */}
                <Card
                  className={`transition-all duration-1000 delay-200 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Learning Progress</span>
                        <Badge variant="secondary">{studentData.totalProgress}% Complete</Badge>
                      </div>
                      <Progress value={studentData.totalProgress} className="h-3" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{studentData.enrolledCourses}</div>
                          <div className="text-sm text-gray-600">Enrolled</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{studentData.completedCourses}</div>
                          <div className="text-sm text-gray-600">Completed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {studentData.enrolledCourses - studentData.completedCourses}
                          </div>
                          <div className="text-sm text-gray-600">In Progress</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card
                    className={`transition-all duration-1000 delay-400 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">Continue Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {enrollments.slice(0, 3).map((enrollment: any, index) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleContinueLearning(enrollment.course_id)}
                          >
                            <img
                              src={enrollment.thumbnail_url || "/placeholder.svg?height=40&width=40"}
                              alt={enrollment.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{enrollment.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={enrollment.progress || 0} className="h-1 flex-1" />
                                <span className="text-xs text-gray-500">{enrollment.progress || 0}%</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`transition-all duration-1000 delay-600 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { title: "First Course Completed", icon: Award, color: "text-yellow-600" },
                          { title: "10-Day Streak", icon: TrendingUp, color: "text-green-600" },
                          { title: "Quiz Master", icon: Target, color: "text-blue-600" },
                        ].map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div
                              className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${achievement.color}`}
                            >
                              <achievement.icon className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-gray-900">{achievement.title}</span>
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
                  <Button onClick={() => onNavigate?.("courses")} variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse More Courses
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {enrollments.map((enrollment: any, index) => (
                    <Card
                      key={enrollment.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleContinueLearning(enrollment.course_id)}
                    >
                      <div className="relative">
                        <img
                          src={enrollment.thumbnail_url || "/placeholder.svg?height=200&width=400"}
                          alt={enrollment.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-600">{enrollment.progress || 0}% Complete</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{enrollment.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">by {enrollment.instructor_name}</p>
                        <Progress value={enrollment.progress || 0} className="h-2 mb-3" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {enrollment.completed_lessons || 0} of {enrollment.total_lessons || 0} lessons
                          </span>
                          <Button size="sm">Continue</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {enrollments.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                    <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                    <Button onClick={() => onNavigate?.("courses")}>Browse Courses</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Average Score</span>
                          <span className="font-bold text-green-600">91.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Time Spent Learning</span>
                          <span className="font-bold text-blue-600">45 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Assignments Completed</span>
                          <span className="font-bold text-purple-600">12/15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Projects Submitted</span>
                          <span className="font-bold text-orange-600">3/5</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Skill Progress</h4>
                        {[
                          { skill: "JavaScript", progress: 85 },
                          { skill: "React", progress: 70 },
                          { skill: "Node.js", progress: 60 },
                          { skill: "MongoDB", progress: 45 },
                        ].map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{skill.skill}</span>
                              <span className="text-sm text-gray-600">{skill.progress}%</span>
                            </div>
                            <Progress value={skill.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "First Project Completed",
                      description: "Built your first React application",
                      icon: Award,
                      earned: true,
                      date: "2 weeks ago",
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      title: "Streak Master",
                      description: "Maintained 10-day learning streak",
                      icon: TrendingUp,
                      earned: true,
                      date: "1 week ago",
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      title: "Code Reviewer",
                      description: "Helped 5 fellow students with code review",
                      icon: Users,
                      earned: true,
                      date: "3 days ago",
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      title: "Full-Stack Hero",
                      description: "Complete all full-stack modules",
                      icon: Target,
                      earned: false,
                      date: null,
                      color: "bg-gray-100 text-gray-500",
                    },
                  ].map((achievement, index) => (
                    <Card key={index} className={`${achievement.earned ? "border-green-200" : "border-gray-200"}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.color}`}
                          >
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                            {achievement.earned ? (
                              <Badge className="bg-green-100 text-green-800">Earned {achievement.date}</Badge>
                            ) : (
                              <Badge variant="outline">Not earned yet</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

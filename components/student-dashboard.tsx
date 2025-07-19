"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar } from "lucide-react"
import { useAuth } from "@/lib/api"

export function StudentDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Sample dashboard data
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      progress: 65,
      totalLessons: 120,
      completedLessons: 78,
      nextLesson: "Building REST APIs with Node.js",
      instructor: "Sarah Johnson",
      category: "Web Development",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      progress: 30,
      totalLessons: 95,
      completedLessons: 28,
      nextLesson: "Introduction to Pandas",
      instructor: "Dr. Michael Chen",
      category: "Data Science",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      progress: 90,
      totalLessons: 75,
      completedLessons: 68,
      nextLesson: "Advanced Analytics Setup",
      instructor: "Emma Rodriguez",
      category: "Marketing",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Course Completed",
      description: "Completed your first course",
      icon: "🎉",
      earned: true,
      date: "2 weeks ago",
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Completed 10 lessons in one day",
      icon: "⚡",
      earned: true,
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Consistent Student",
      description: "Studied for 7 days straight",
      icon: "🔥",
      earned: false,
      date: null,
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Enrolled in 5 courses",
      icon: "📚",
      earned: false,
      date: null,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed: Building REST APIs with Node.js",
      course: "Complete Web Development Bootcamp",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "quiz_passed",
      title: "Passed: JavaScript Fundamentals Quiz",
      course: "Complete Web Development Bootcamp",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "course_enrolled",
      title: "Enrolled in: Digital Marketing Mastery",
      course: "Digital Marketing Mastery",
      time: "3 days ago",
    },
    {
      id: 4,
      type: "certificate_earned",
      title: "Earned Certificate: HTML & CSS Basics",
      course: "Complete Web Development Bootcamp",
      time: "1 week ago",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "JavaScript Project Submission",
      course: "Complete Web Development Bootcamp",
      dueDate: "Tomorrow",
      priority: "high",
    },
    {
      id: 2,
      title: "Data Analysis Assignment",
      course: "Data Science & Machine Learning",
      dueDate: "In 3 days",
      priority: "medium",
    },
    {
      id: 3,
      title: "Marketing Campaign Proposal",
      course: "Digital Marketing Mastery",
      dueDate: "Next week",
      priority: "low",
    },
  ]

  const stats = [
    {
      title: "Courses Enrolled",
      value: "3",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Hours Learned",
      value: "127",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Certificates Earned",
      value: "2",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Current Streak",
      value: "5 days",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Student"}!</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolledCourses.slice(0, 2).map((course) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{deadline.title}</h4>
                            <p className="text-xs text-gray-600">{deadline.course}</p>
                          </div>
                          <Badge
                            variant={
                              deadline.priority === "high"
                                ? "destructive"
                                : deadline.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {deadline.dueDate}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.course}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Track your progress across all enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2">{course.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span>{course.progress === 100 ? "Completed" : "In Progress"}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-600 mb-2">Next lesson:</p>
                          <p className="text-sm font-medium">{course.nextLesson}</p>
                        </div>

                        <Button className="w-full mt-4">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${achievement.earned ? "text-green-900" : "text-gray-600"}`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600 mt-1">Earned {achievement.date}</p>
                          )}
                        </div>
                        {achievement.earned && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
                <CardDescription>Your complete learning history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.course}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        {activity.type === "lesson_completed" && <Play className="h-4 w-4 text-blue-600" />}
                        {activity.type === "quiz_passed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {activity.type === "course_enrolled" && <BookOpen className="h-4 w-4 text-purple-600" />}
                        {activity.type === "certificate_earned" && <Award className="h-4 w-4 text-yellow-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

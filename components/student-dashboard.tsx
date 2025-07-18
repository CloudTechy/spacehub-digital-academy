"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  CheckCircle,
  Clock,
  Award,
  Users,
  Calendar,
  Download,
  Star,
  TrendingUp,
  Target,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

interface StudentDashboardProps {
  onBack?: () => void
}

export function StudentDashboard({ onBack }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const studentData = {
    name: "David Okonkwo",
    email: "david.okonkwo@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    enrolledCourse: "Full-Stack Web Development Bootcamp",
    progress: 65,
    completedLessons: 78,
    totalLessons: 120,
    streak: 12,
    points: 2450,
    rank: "Advanced Learner",
    nextSession: "Tomorrow, 2:00 PM",
    mentor: "James Okafor",
  }

  const recentLessons = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      module: "Advanced React",
      duration: "45 min",
      completed: true,
      score: 95,
    },
    {
      id: 2,
      title: "State Management with Redux",
      module: "Advanced React",
      duration: "60 min",
      completed: true,
      score: 88,
    },
    {
      id: 3,
      title: "Building RESTful APIs",
      module: "Backend Development",
      duration: "50 min",
      completed: false,
      score: null,
    },
    {
      id: 4,
      title: "Database Design Principles",
      module: "Backend Development",
      duration: "40 min",
      completed: false,
      score: null,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "1-on-1 Mentor Session",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Mentorship",
      mentor: "James Okafor",
    },
    {
      id: 2,
      title: "React Workshop",
      date: "Friday",
      time: "6:00 PM",
      type: "Workshop",
      mentor: "Sarah Adebayo",
    },
    {
      id: 3,
      title: "Portfolio Review",
      date: "Next Monday",
      time: "3:00 PM",
      type: "Review",
      mentor: "James Okafor",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Project Completed",
      description: "Built your first React application",
      icon: Award,
      earned: true,
      date: "2 weeks ago",
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintained 10-day learning streak",
      icon: TrendingUp,
      earned: true,
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Code Reviewer",
      description: "Helped 5 fellow students with code review",
      icon: Users,
      earned: true,
      date: "3 days ago",
    },
    {
      id: 4,
      title: "Full-Stack Hero",
      description: "Complete all full-stack modules",
      icon: Target,
      earned: false,
      date: null,
    },
  ]

  const assignments = [
    {
      id: 1,
      title: "E-commerce Website Project",
      dueDate: "In 5 days",
      status: "In Progress",
      progress: 70,
      priority: "High",
    },
    {
      id: 2,
      title: "API Integration Assignment",
      dueDate: "In 2 days",
      status: "Not Started",
      progress: 0,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Database Schema Design",
      dueDate: "In 1 week",
      status: "Not Started",
      progress: 0,
      priority: "Low",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Button onClick={onBack} variant="ghost" size="sm">
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
            <Card>
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
            <Card>
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
                  <span className="text-sm text-gray-600">Course Progress</span>
                  <span className="font-bold text-blue-600">{studentData.progress}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Session */}
            <Card>
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Course Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{studentData.enrolledCourse}</h3>
                        <Badge variant="secondary">{studentData.progress}% Complete</Badge>
                      </div>
                      <Progress value={studentData.progress} className="h-3" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {studentData.completedLessons} of {studentData.totalLessons} lessons completed
                        </span>
                        <span>{studentData.totalLessons - studentData.completedLessons} lessons remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Lessons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentLessons.slice(0, 3).map((lesson) => (
                          <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.completed ? "bg-green-100" : "bg-gray-100"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Play className="h-4 w-4 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                              <p className="text-xs text-gray-500">
                                {lesson.module} • {lesson.duration}
                              </p>
                              {lesson.completed && lesson.score && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs text-gray-600">{lesson.score}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                              <p className="text-xs text-gray-500">
                                {event.date} at {event.time}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements
                        .filter((a) => a.earned)
                        .map((achievement) => (
                          <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <achievement.icon className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-green-800">{achievement.title}</p>
                              <p className="text-sm text-green-600">{achievement.description}</p>
                              <p className="text-xs text-green-500">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lessons" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              lesson.completed ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <Play className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600">{lesson.module}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {lesson.duration}
                              </span>
                              {lesson.completed && lesson.score && (
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {lesson.score}%
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant={lesson.completed ? "outline" : "default"}>
                            {lesson.completed ? "Review" : "Start"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                              <p className="text-sm text-gray-600">Due {assignment.dueDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  assignment.priority === "High"
                                    ? "destructive"
                                    : assignment.priority === "Medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {assignment.priority}
                              </Badge>
                              <Badge variant="outline">{assignment.status}</Badge>
                            </div>
                          </div>
                          {assignment.progress > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span>{assignment.progress}%</span>
                              </div>
                              <Progress value={assignment.progress} className="h-2" />
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-3">
                            <Button size="sm">{assignment.status === "Not Started" ? "Start" : "Continue"}</Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Resources
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
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
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Feed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          user: "Sarah A.",
                          avatar:
                            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                          action: "completed the React Fundamentals module",
                          time: "2 hours ago",
                        },
                        {
                          user: "Michael O.",
                          avatar:
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                          action: "shared a project: E-commerce Dashboard",
                          time: "4 hours ago",
                        },
                        {
                          user: "Grace N.",
                          avatar:
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                          action: "asked a question about API integration",
                          time: "6 hours ago",
                        },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                          <img
                            src={activity.avatar || "/placeholder.svg"}
                            alt={activity.user}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
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
      </div>
    </div>
  )
}

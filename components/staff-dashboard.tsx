"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, TrendingUp, DollarSign, AlertCircle, Settings, LogOut, Bell } from "lucide-react"

interface StaffDashboardProps {
  onBack?: () => void
}

export function StaffDashboard({ onBack }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const staffData = {
    name: "James Okafor",
    role: "Senior Instructor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    department: "Web Development",
    studentsAssigned: 45,
    coursesTeaching: 2,
    avgRating: 4.9,
    totalSessions: 156,
  }

  const dashboardStats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+3",
      trend: "up",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Monthly Revenue",
      value: "₦45.2M",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentStudents = [
    {
      id: 1,
      name: "David Okonkwo",
      email: "david.o@email.com",
      course: "Full-Stack Web Development",
      progress: 65,
      lastActive: "2 hours ago",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Sarah Adebayo",
      email: "sarah.a@email.com",
      course: "UI/UX Design",
      progress: 82,
      lastActive: "1 day ago",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Michael Okafor",
      email: "michael.o@email.com",
      course: "Data Science",
      progress: 34,
      lastActive: "3 days ago",
      status: "At Risk",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "React Advanced Concepts",
      time: "2:00 PM - 4:00 PM",
      date: "Today",
      students: 25,
      type: "Live Class",
    },
    {
      id: 2,
      title: "1-on-1 Mentoring: David O.",
      time: "4:30 PM - 5:30 PM",
      date: "Today",
      students: 1,
      type: "Mentoring",
    },
    {
      id: 3,
      title: "Portfolio Review Session",
      time: "10:00 AM - 12:00 PM",
      date: "Tomorrow",
      students: 15,
      type: "Workshop",
    },
  ]

  const coursePerformance = [
    {
      course: "Full-Stack Web Development",
      students: 1247,
      completion: 85,
      rating: 4.9,
      revenue: "₦22.4M",
    },
    {
      course: "UI/UX Design Mastery",
      students: 892,
      completion: 89,
      rating: 4.8,
      revenue: "₦13.4M",
    },
    {
      course: "Data Science for Business",
      students: 634,
      completion: 78,
      rating: 4.7,
      revenue: "₦12.7M",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Review 12 assignment submissions",
      priority: "High",
      dueDate: "Today",
      course: "Full-Stack Web Development",
    },
    {
      id: 2,
      task: "Prepare materials for React workshop",
      priority: "Medium",
      dueDate: "Tomorrow",
      course: "Full-Stack Web Development",
    },
    {
      id: 3,
      task: "Update course curriculum",
      priority: "Low",
      dueDate: "This week",
      course: "UI/UX Design",
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
              <Badge variant="secondary">Staff Portal</Badge>
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
                  src={staffData.avatar || "/placeholder.svg"}
                  alt={staffData.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">{staffData.name}</p>
                  <p className="text-xs text-gray-500">{staffData.role}</p>
                </div>
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
            {/* Staff Profile */}
            <Card>
              <CardContent className="p-6 text-center">
                <img
                  src={staffData.avatar || "/placeholder.svg"}
                  alt={staffData.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-gray-900 mb-1">{staffData.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{staffData.role}</p>
                <Badge className="bg-blue-100 text-blue-800">{staffData.department}</Badge>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students Assigned</span>
                  <span className="font-bold text-blue-600">{staffData.studentsAssigned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Teaching</span>
                  <span className="font-bold text-green-600">{staffData.coursesTeaching}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-bold text-yellow-600">{staffData.avgRating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Sessions</span>
                  <span className="font-bold text-purple-600">{staffData.totalSessions}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <p className="font-medium text-sm text-gray-900">{task.task}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={task.priority === 'High' ? 'destructive' : 
                          task.priority === 'Medium' ? 'default' : 'secondary'} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Dashboard Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.change} from last month
                            </p>
                          </div>
                          <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentStudents.map((student) => (
                          <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                            <img
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.course}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={student.progress} className="h-1 flex-1" />
                                <span className="text-xs text-gray-500">{student.progress}%</span>
                              </div>
                            </div>
                            <Badge variant={student.status === 'Active' ? 'default' : 'destructive'}>
                              {student.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Car\

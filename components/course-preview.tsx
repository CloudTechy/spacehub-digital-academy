"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, BookOpen, Play, CheckCircle, Award, Download, Globe, ArrowLeft, ChevronRight } from "lucide-react"
import type { Course } from "@/lib/api"

interface CoursePreviewProps {
  course: Course
  onBack: () => void
}

export function CoursePreview({ course, onBack }: CoursePreviewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample curriculum data
  const curriculum = [
    {
      id: 1,
      title: "Getting Started",
      duration: "2 hours",
      lessons: [
        { id: 1, title: "Course Introduction", duration: "5 min", type: "video" as const },
        { id: 2, title: "Setting Up Your Environment", duration: "15 min", type: "video" as const },
        { id: 3, title: "Your First Project", duration: "20 min", type: "video" as const },
        { id: 4, title: "Knowledge Check", duration: "10 min", type: "quiz" as const },
      ],
    },
    {
      id: 2,
      title: "Core Concepts",
      duration: "8 hours",
      lessons: [
        { id: 5, title: "Understanding the Fundamentals", duration: "30 min", type: "video" as const },
        { id: 6, title: "Hands-on Practice", duration: "45 min", type: "video" as const },
        { id: 7, title: "Building Your First Application", duration: "60 min", type: "video" as const },
        { id: 8, title: "Best Practices", duration: "25 min", type: "text" as const },
        { id: 9, title: "Module Assessment", duration: "15 min", type: "quiz" as const },
      ],
    },
    {
      id: 3,
      title: "Advanced Topics",
      duration: "12 hours",
      lessons: [
        { id: 10, title: "Advanced Techniques", duration: "40 min", type: "video" as const },
        { id: 11, title: "Real-world Projects", duration: "90 min", type: "video" as const },
        { id: 12, title: "Industry Best Practices", duration: "35 min", type: "video" as const },
        { id: 13, title: "Final Project", duration: "120 min", type: "video" as const },
      ],
    },
  ]

  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: "Adebayo Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      user: "Fatima Al-Hassan",
      rating: 5,
      comment: "This course changed my career. I got a job as a developer just 3 months after completing it.",
      date: "1 month ago",
    },
    {
      id: 3,
      user: "Chinedu Okoro",
      rating: 4,
      comment: "Great content and well-structured. Would recommend to anyone starting in tech.",
      date: "3 weeks ago",
    },
  ]

  const features = [
    "Lifetime access to course materials",
    "Certificate of completion",
    "Access to private student community",
    "30-day money-back guarantee",
    "Mobile and desktop access",
    "Downloadable resources",
    "Regular content updates",
    "Direct instructor support",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <Badge className="mb-4">{course.category}</Badge>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                  <p className="text-xl text-gray-600 mb-6">{course.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                      <span>({course.students.toLocaleString()} students)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Video/Image */}
              <div className="relative rounded-lg overflow-hidden bg-gray-900">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-64 object-cover opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Play className="h-6 w-6 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Master the fundamentals and advanced concepts",
                          "Build real-world projects for your portfolio",
                          "Learn industry best practices and standards",
                          "Get job-ready skills and knowledge",
                          "Understand modern development workflows",
                          "Deploy applications to production",
                          "Work with popular tools and frameworks",
                          "Prepare for technical interviews",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Course Features</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Basic computer skills and internet access</li>
                        <li>• No prior programming experience required</li>
                        <li>• Willingness to learn and practice</li>
                        <li>• A computer with at least 4GB RAM</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Course Curriculum</h3>
                      <span className="text-sm text-gray-600">
                        {curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons •{" "}
                        {course.duration}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {curriculum.map((section) => (
                        <Card key={section.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{section.title}</CardTitle>
                              <span className="text-sm text-gray-600">{section.duration}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {section.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                                >
                                  <div className="flex items-center space-x-3">
                                    {lesson.type === "video" && <Play className="h-4 w-4 text-blue-600" />}
                                    {lesson.type === "text" && <BookOpen className="h-4 w-4 text-green-600" />}
                                    {lesson.type === "quiz" && <CheckCircle className="h-4 w-4 text-purple-600" />}
                                    <span className="text-gray-700">{lesson.title}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt={course.instructor}
                        className="w-24 h-24 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">Senior Software Engineer & Tech Educator</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="font-semibold">4.8</div>
                            <div className="text-gray-600">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="font-semibold">15,234</div>
                            <div className="text-gray-600">Reviews</div>
                          </div>
                          <div>
                            <div className="font-semibold">45,678</div>
                            <div className="text-gray-600">Students</div>
                          </div>
                          <div>
                            <div className="font-semibold">12</div>
                            <div className="text-gray-600">Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">About the Instructor</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {course.instructor} is a seasoned software engineer with over 8 years of experience in the tech
                        industry. They have worked at leading companies like Google and Microsoft, and have been
                        teaching programming for the past 5 years. Their courses have helped thousands of students
                        transition into successful tech careers.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "React", "Node.js", "Python", "AWS", "MongoDB", "Git", "Agile"].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Student Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-600">({course.students.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img
                              src="/placeholder.svg?height=40&width=40"
                              alt={review.user}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">₦{course.price.toLocaleString()}</span>
                      {course.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          ₦{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge variant="destructive" className="mb-4">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Enroll Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="text-center text-sm text-gray-600">30-day money-back guarantee</div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Level</span>
                      <span className="text-sm font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Students</span>
                      <span className="text-sm font-medium">{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Language</span>
                      <span className="text-sm font-medium">English</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold text-sm">This course includes:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>40 hours of video content</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

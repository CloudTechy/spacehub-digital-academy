"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Lock, CheckCircle, Clock, Users, Star, ArrowLeft, BookOpen, Award, Download, Eye } from "lucide-react"
import { useApi } from "../lib/api"
import { usePaystack, formatNaira } from "../lib/paystack"
import { useInView } from "../lib/animations"

interface CoursePreviewProps {
  courseId: string | null
  onBack: () => void
  onAuthRequest: (type: "student" | "staff") => void
}

export function CoursePreview({ courseId, onBack, onAuthRequest }: CoursePreviewProps) {
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [enrolling, setEnrolling] = useState(false)

  const api = useApi()
  const { makePayment } = usePaystack()
  const [sectionRef, sectionInView] = useInView()

  useEffect(() => {
    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  const loadCourse = async () => {
    try {
      setLoading(true)
      const response = await api.getCourse(courseId!)

      if (response.success) {
        setCourse(response.course)
      }
    } catch (error) {
      console.error("Failed to load course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoPlay = (lesson: any) => {
    if (lesson.is_free && lesson.video_url) {
      setSelectedVideo(lesson)
      setShowVideoModal(true)
    }
  }

  const handleEnroll = async () => {
    try {
      setEnrolling(true)

      // Initialize payment
      const paymentResult = await makePayment(
        course.price,
        "student@example.com", // This should come from user context
        {
          course_id: course.id,
          course_title: course.title,
          student_name: "Student Name", // This should come from user context
        },
        async (response) => {
          // Payment successful, enroll student
          try {
            const enrollResponse = await api.enrollInCourse(course.id)
            if (enrollResponse.success) {
              alert("Enrollment successful! Welcome to the course.")
              onBack()
            }
          } catch (error) {
            console.error("Enrollment failed:", error)
            alert("Payment successful but enrollment failed. Please contact support.")
          }
        },
        () => {
          console.log("Payment cancelled")
        },
      )

      if (!paymentResult.success) {
        alert("Failed to initialize payment. Please try again.")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      alert("Failed to process enrollment. Please try again.")
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Button onClick={onBack}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  const totalLessons = course.modules?.reduce((acc: number, module: any) => acc + (module.lessons?.length || 0), 0) || 0
  const freeLessons =
    course.modules?.reduce(
      (acc: number, module: any) => acc + (module.lessons?.filter((lesson: any) => lesson.is_free)?.length || 0),
      0,
    ) || 0

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <Button onClick={onBack} variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div
              className={`transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <img
                src={course.thumbnail_url || "/placeholder.svg?height=400&width=800"}
                alt={course.title}
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
              />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {course.is_featured && <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>}
                  <Badge variant="outline">{course.level}</Badge>
                  <Badge className="bg-green-100 text-green-800">{freeLessons} Free Lessons</Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-lg text-gray-600">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-500">({course.total_reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{course.enrollment_count?.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration_hours} hours</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{totalLessons} lessons</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Preview Alert */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-2">Free Course Preview Available!</h3>
                    <p className="text-green-700 mb-4">
                      Get a taste of what you'll learn with {freeLessons} free lessons. No credit card required.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-green-600">
                      <span>✓ {freeLessons} free video lessons</span>
                      <span>✓ Course materials preview</span>
                      <span>✓ Community access</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-6">
                <div className="mb-4">
                  <p className="text-gray-600">
                    {course.modules?.length || 0} modules • {totalLessons} lessons • {freeLessons} free preview lessons
                  </p>
                </div>

                {course.modules?.map((module: any, moduleIndex: number) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>
                          Module {moduleIndex + 1}: {module.title}
                        </span>
                        <Badge variant="outline">{module.lessons?.length || 0} lessons</Badge>
                      </CardTitle>
                      {module.description && <p className="text-gray-600">{module.description}</p>}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {module.lessons?.map((lesson: any, lessonIndex: number) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.is_free ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleVideoPlay(lesson)}
                                  className="flex items-center gap-2"
                                >
                                  <Play className="h-4 w-4" />
                                  Preview
                                </Button>
                              ) : (
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {lessonIndex + 1}. {lesson.title}
                                </p>
                                {lesson.description && <p className="text-sm text-gray-600">{lesson.description}</p>}
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lesson.video_duration || "5 min"}
                                  </span>
                                  <span className="capitalize">{lesson.content_type || "video"}</span>
                                </div>
                              </div>
                            </div>
                            {lesson.is_free && <Badge className="bg-green-100 text-green-800">FREE</Badge>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.what_you_learn?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements?.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {course.instructor_name?.charAt(0) || "I"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor_name}</h3>
                        <p className="text-gray-600 mb-4">
                          {course.instructor_title || "Senior Software Engineer & Tech Educator"}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Students</p>
                            <p className="font-medium">
                              {course.instructor_total_students?.toLocaleString() || "1,000+"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Rating</p>
                            <p className="font-medium">{course.instructor_rating || "4.9"}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-gray-700">
                        {course.instructor_bio ||
                          `With over 8 years of industry experience and 5 years in tech education, ${course.instructor_name} has helped thousands of students transition into successful tech careers. Known for breaking down complex concepts into digestible lessons and providing personalized mentorship to every student.`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">Reviews will be loaded from the database</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Video Player */}
              {selectedVideo && (
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Play className="h-12 w-12 mx-auto mb-2" />
                        <p>{selectedVideo.title}</p>
                        <p className="text-sm opacity-75">Demo placeholder</p>
                      </div>
                    </div>
                    <Button onClick={() => setSelectedVideo(null)} variant="outline" className="w-full">
                      Close Preview
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Pricing Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{formatNaira(course.price)}</span>
                      {course.original_price && course.original_price > course.price && (
                        <span className="text-lg text-gray-500 line-through">{formatNaira(course.original_price)}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      or {formatNaira(Math.ceil(course.price / 6))}/month for 6 months
                    </p>
                    {course.original_price && course.original_price > course.price && (
                      <Badge className="bg-red-100 text-red-800 mt-2">
                        Save {Math.round(((course.original_price - course.price) / course.original_price) * 100)}%
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.duration_hours} hours content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.level} level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Certificate included</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {enrolling ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Resources
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onAuthRequest("student")}
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Login
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    30-day money-back guarantee • Lifetime access
                  </p>
                </CardContent>
              </Card>

              {/* Free Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Free Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Watch {freeLessons} free lessons to get a taste of this course
                  </p>
                  <div className="space-y-2">
                    {course.modules?.[0]?.lessons
                      ?.filter((lesson: any) => lesson.is_free)
                      ?.slice(0, 3)
                      ?.map((lesson: any, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start bg-transparent"
                          onClick={() => handleVideoPlay(lesson)}
                        >
                          <Play className="h-3 w-3 mr-2" />
                          {lesson.title}
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedVideo && (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">{selectedVideo.title}</p>
                  <p className="text-sm">Video player would be integrated here</p>
                </div>
              </div>
            )}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Enjoying the preview?</strong> Enroll now to access all {course.modules?.length || 0} modules
                and get personalized mentorship!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

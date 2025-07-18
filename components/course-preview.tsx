"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Lock, CheckCircle, Clock, Users, Star, ArrowLeft, BookOpen } from "lucide-react"

interface CoursePreviewProps {
  courseId: string
  onBack: () => void
  onEnroll: () => void
}

export function CoursePreview({ courseId, onBack, onEnroll }: CoursePreviewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  // Sample course data - in real app, this would come from API
  const courseData = {
    "web-development": {
      title: "Full-Stack Web Development Bootcamp",
      instructor: "David Okafor",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      students: 1247,
      duration: "12 weeks",
      level: "Beginner to Advanced",
      price: "₦150,000",
      originalPrice: "₦200,000",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      description:
        "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and launch your tech career.",
      whatYouLearn: [
        "HTML5, CSS3, and JavaScript fundamentals",
        "React.js and modern frontend development",
        "Node.js and Express.js backend development",
        "MongoDB database design and management",
        "RESTful API development",
        "Authentication and security best practices",
        "Deployment and DevOps basics",
        "Portfolio projects and career guidance",
      ],
      curriculum: [
        {
          module: "Module 1: Web Development Fundamentals",
          duration: "2 weeks",
          lessons: [
            { title: "Introduction to Web Development", duration: "45 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "HTML5 Essentials", duration: "60 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "CSS3 Styling and Layout", duration: "75 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "JavaScript Fundamentals", duration: "90 min", free: false },
            { title: "DOM Manipulation", duration: "60 min", free: false },
            { title: "Project: Personal Portfolio", duration: "120 min", free: false },
          ],
        },
        {
          module: "Module 2: Modern JavaScript & React",
          duration: "3 weeks",
          lessons: [
            { title: "ES6+ Features", duration: "60 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Introduction to React", duration: "75 min", free: false },
            { title: "Components and Props", duration: "60 min", free: false },
            { title: "State Management with Hooks", duration: "90 min", free: false },
            { title: "React Router", duration: "45 min", free: false },
            { title: "Project: React Todo App", duration: "150 min", free: false },
          ],
        },
        {
          module: "Module 3: Backend Development",
          duration: "3 weeks",
          lessons: [
            { title: "Node.js Fundamentals", duration: "60 min", free: false },
            { title: "Express.js Framework", duration: "75 min", free: false },
            { title: "RESTful API Design", duration: "90 min", free: false },
            { title: "Database Integration", duration: "60 min", free: false },
            { title: "Authentication & Authorization", duration: "90 min", free: false },
            { title: "Project: Full-Stack App", duration: "180 min", free: false },
          ],
        },
        {
          module: "Module 4: Advanced Topics & Deployment",
          duration: "4 weeks",
          lessons: [
            { title: "Testing and Debugging", duration: "60 min", free: false },
            { title: "Performance Optimization", duration: "75 min", free: false },
            { title: "Deployment Strategies", duration: "60 min", free: false },
            { title: "DevOps Basics", duration: "90 min", free: false },
            { title: "Career Guidance", duration: "45 min", free: false },
            { title: "Final Capstone Project", duration: "300 min", free: false },
          ],
        },
      ],
      requirements: [
        "Basic computer literacy",
        "No prior programming experience required",
        "Reliable internet connection",
        "Computer with modern web browser",
      ],
      features: [
        "24/7 access to course materials",
        "Live coding sessions",
        "1-on-1 mentorship",
        "Career placement assistance",
        "Certificate of completion",
        "Lifetime access to updates",
      ],
    },
    "ui-ux-design": {
      title: "UI/UX Design Mastery",
      instructor: "Sarah Adebayo",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      students: 892,
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      price: "₦120,000",
      originalPrice: "₦160,000",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      description:
        "Learn to create beautiful, user-centered designs. Master Figma, design systems, and user research methodologies.",
      whatYouLearn: [
        "Design thinking and user research",
        "Figma and design tools mastery",
        "Typography and color theory",
        "Wireframing and prototyping",
        "Design systems and components",
        "Usability testing and iteration",
        "Mobile and responsive design",
        "Portfolio development",
      ],
      curriculum: [
        {
          module: "Module 1: Design Fundamentals",
          duration: "2 weeks",
          lessons: [
            { title: "Introduction to UI/UX Design", duration: "40 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Design Thinking Process", duration: "55 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Typography Essentials", duration: "60 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Color Theory and Psychology", duration: "50 min", free: false },
            { title: "Layout and Composition", duration: "65 min", free: false },
          ],
        },
        {
          module: "Module 2: User Research & Strategy",
          duration: "2 weeks",
          lessons: [
            { title: "User Research Methods", duration: "70 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Creating User Personas", duration: "45 min", free: false },
            { title: "User Journey Mapping", duration: "60 min", free: false },
            { title: "Information Architecture", duration: "55 min", free: false },
          ],
        },
        {
          module: "Module 3: Design Tools & Prototyping",
          duration: "3 weeks",
          lessons: [
            { title: "Figma Mastery", duration: "90 min", free: false },
            { title: "Wireframing Techniques", duration: "60 min", free: false },
            { title: "High-Fidelity Prototyping", duration: "75 min", free: false },
            { title: "Interactive Prototypes", duration: "80 min", free: false },
          ],
        },
        {
          module: "Module 4: Advanced Design & Portfolio",
          duration: "3 weeks",
          lessons: [
            { title: "Design Systems", duration: "85 min", free: false },
            { title: "Mobile Design Patterns", duration: "70 min", free: false },
            { title: "Usability Testing", duration: "60 min", free: false },
            { title: "Portfolio Development", duration: "120 min", free: false },
          ],
        },
      ],
      requirements: [
        "Creative mindset and attention to detail",
        "Basic computer skills",
        "No design experience required",
        "Access to design software (Figma is free)",
      ],
      features: [
        "Industry-standard design tools",
        "Real client projects",
        "Design critique sessions",
        "Portfolio review and feedback",
        "Job placement assistance",
        "Design community access",
      ],
    },
    "data-science": {
      title: "Data Science & Analytics",
      instructor: "Michael Okafor",
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      students: 634,
      duration: "14 weeks",
      level: "Intermediate",
      price: "₦180,000",
      originalPrice: "₦240,000",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      description:
        "Master data science with Python, machine learning, and statistical analysis. Work with real datasets and build predictive models.",
      whatYouLearn: [
        "Python programming for data science",
        "Statistical analysis and hypothesis testing",
        "Data visualization with matplotlib and seaborn",
        "Machine learning algorithms",
        "Deep learning fundamentals",
        "Big data tools and techniques",
        "Business intelligence and reporting",
        "Real-world project portfolio",
      ],
      curriculum: [
        {
          module: "Module 1: Python & Statistics Foundation",
          duration: "3 weeks",
          lessons: [
            { title: "Python for Data Science", duration: "60 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "NumPy and Pandas", duration: "75 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Statistical Concepts", duration: "90 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Probability Distributions", duration: "60 min", free: false },
            { title: "Hypothesis Testing", duration: "75 min", free: false },
          ],
        },
        {
          module: "Module 2: Data Analysis & Visualization",
          duration: "3 weeks",
          lessons: [
            { title: "Exploratory Data Analysis", duration: "80 min", free: true, videoId: "dQw4w9WgXcQ" },
            { title: "Data Cleaning Techniques", duration: "70 min", free: false },
            { title: "Matplotlib Visualization", duration: "60 min", free: false },
            { title: "Seaborn Advanced Plots", duration: "65 min", free: false },
          ],
        },
        {
          module: "Module 3: Machine Learning",
          duration: "4 weeks",
          lessons: [
            { title: "ML Fundamentals", duration: "90 min", free: false },
            { title: "Supervised Learning", duration: "100 min", free: false },
            { title: "Unsupervised Learning", duration: "85 min", free: false },
            { title: "Model Evaluation", duration: "75 min", free: false },
          ],
        },
        {
          module: "Module 4: Advanced Topics & Projects",
          duration: "4 weeks",
          lessons: [
            { title: "Deep Learning Basics", duration: "120 min", free: false },
            { title: "Big Data Tools", duration: "90 min", free: false },
            { title: "Business Intelligence", duration: "75 min", free: false },
            { title: "Capstone Project", duration: "240 min", free: false },
          ],
        },
      ],
      requirements: [
        "Basic programming knowledge helpful",
        "Strong mathematical foundation",
        "Analytical thinking skills",
        "Computer with Python environment",
      ],
      features: [
        "Real industry datasets",
        "Jupyter notebook environments",
        "ML model deployment",
        "Industry mentor sessions",
        "Data science portfolio",
        "Job referral network",
      ],
    },
  }

  const course = courseData[courseId as keyof typeof courseData]
  if (!course) return null

  const totalLessons = course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0)
  const freeLessons = course.curriculum.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.free).length,
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div>
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructorAvatar || "/placeholder.svg"}
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
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
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                <div className="mb-4">
                  <p className="text-gray-600">
                    {totalLessons} lessons • {freeLessons} free preview lessons
                  </p>
                </div>

                {course.curriculum.map((module, moduleIndex) => (
                  <Card key={moduleIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{module.module}</span>
                        <Badge variant="outline">{module.duration}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {lesson.free ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setPlayingVideo(lesson.videoId || null)}
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
                                <p className="font-medium text-gray-900">{lesson.title}</p>
                                <p className="text-sm text-gray-500">{lesson.duration}</p>
                              </div>
                            </div>
                            {lesson.free && <Badge className="bg-green-100 text-green-800">Free</Badge>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={course.instructorAvatar || "/placeholder.svg"}
                        alt={course.instructor}
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">Senior Software Engineer & Tech Educator</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Students</p>
                            <p className="font-medium">{course.students.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Rating</p>
                            <p className="font-medium">{course.rating}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-gray-700">
                        With over 8 years of industry experience and 5 years in tech education,
                        {course.instructor} has helped thousands of students transition into successful tech careers.
                        Known for breaking down complex concepts into digestible lessons and providing personalized
                        mentorship to every student.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      name: "Adaora Okafor",
                      avatar:
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                      rating: 5,
                      date: "2 weeks ago",
                      review:
                        "Excellent course! The instructor explains everything clearly and the projects are very practical. I landed my first tech job 3 months after completing this course.",
                    },
                    {
                      name: "Emeka Nwankwo",
                      avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                      rating: 5,
                      date: "1 month ago",
                      review:
                        "Best investment I've made in my career. The curriculum is up-to-date and the mentorship is invaluable. Highly recommend!",
                    },
                    {
                      name: "Funmi Adebayo",
                      avatar:
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                      rating: 4,
                      date: "1 month ago",
                      review:
                        "Great course content and structure. The only improvement would be more live sessions, but overall very satisfied with my learning experience.",
                    },
                  ].map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{review.name}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.review}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Video Player */}
              {playingVideo && (
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Play className="h-12 w-12 mx-auto mb-2" />
                        <p>YouTube Video: {playingVideo}</p>
                        <p className="text-sm opacity-75">Demo placeholder</p>
                      </div>
                    </div>
                    <Button onClick={() => setPlayingVideo(null)} variant="outline" className="w-full">
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
                      <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                      <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Limited Time Offer</Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.duration} duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{course.level}</span>
                    </div>
                  </div>

                  <Button onClick={onEnroll} className="w-full mb-4">
                    Enroll Now
                  </Button>

                  <p className="text-xs text-gray-500 text-center">30-day money-back guarantee</p>
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
                    {course.curriculum[0].lessons
                      .filter((lesson) => lesson.free)
                      .slice(0, 3)
                      .map((lesson, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start bg-transparent"
                          onClick={() => setPlayingVideo(lesson.videoId || null)}
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
    </div>
  )
}

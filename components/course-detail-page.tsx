"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
  Play,
  Download,
  Share2,
  Heart,
  Globe,
  Calendar,
  BookOpen,
  Target,
  TrendingUp,
  Building,
} from "lucide-react"
import { CourseCheckout } from "./course-checkout"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { formatNaira } from "../lib/paystack"
import type { DetailedCourse } from "../lib/courses-data"

interface CourseDetailPageProps {
  course: DetailedCourse
  onBack?: () => void
}

export function CourseDetailPage({ course, onBack }: CourseDetailPageProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-6 bg-transparent">
          ← Back to Courses
        </Button>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Courses</span>
              <span>/</span>
              <span>{course.category}</span>
              <span>/</span>
              <span className="text-gray-900">{course.title}</span>
            </div>

            {/* Title and Badges */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {course.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                {course.isBestseller && <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>}
                {course.isPopular && <Badge className="bg-purple-500 hover:bg-purple-600">Popular</Badge>}
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-lg text-gray-600">{course.shortDescription}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-500">({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{course.studentsEnrolled.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Globe className="h-4 w-4" />
                <span>{course.language}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Updated {course.lastUpdated}</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={course.instructor.avatar || "/placeholder.svg"}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{course.instructor.name}</h3>
                <p className="text-sm text-gray-600">
                  {course.instructor.title} at {course.instructor.company}
                </p>
                <p className="text-sm text-gray-500">{course.instructor.experience} experience</p>
              </div>
            </div>
          </div>

          {/* Course Video/Preview */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                  <Play className="mr-2 h-5 w-5" />
                  Preview Course
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{course.fullDescription}</p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Job Outcomes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Career Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Average Salary Range</h4>
                    <p className="text-lg font-bold text-green-600">{course.jobOutcomes.averageSalary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Job Titles</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.jobOutcomes.jobTitles.map((title, index) => (
                        <Badge key={index} variant="secondary">
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Hiring Companies</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.jobOutcomes.hiringCompanies.map((company, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              {course.modules.map((module, index) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Module {index + 1}: {module.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{module.lessons} lessons</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="instructor" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      className="w-24 h-24 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h3>
                      <p className="text-lg text-gray-600 mb-4">
                        {course.instructor.title} at {course.instructor.company}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{course.instructor.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                      <div className="flex items-center gap-1 justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{course.reviewsCount} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2 mb-1">
                          <span className="text-sm w-8">{rating}★</span>
                          <Progress value={rating === 5 ? 80 : rating === 4 ? 15 : 5} className="flex-1" />
                          <span className="text-sm text-gray-500 w-8">
                            {rating === 5 ? "80%" : rating === 4 ? "15%" : "5%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              {course.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.studentName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{review.studentName}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Price */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{formatNaira(course.price * 0.9)}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">{formatNaira(course.originalPrice)}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Or {formatNaira(Math.ceil(course.price / 6))}/month for 6 months
                  </p>
                </div>

                <Separator />

                {/* Features */}
                <div className="space-y-3">
                  {course.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-3">
                  <Button onClick={() => setShowCheckout(true)} className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    Enroll Now
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">30-Day Money-Back Guarantee</span>
                  </div>
                  <p className="text-xs text-green-700">Full refund if you're not satisfied</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <CourseCheckout course={course} onClose={() => setShowCheckout(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

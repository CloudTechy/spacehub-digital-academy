"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Users, BookOpen, Eye, Search, Filter } from "lucide-react"
import { useApi } from "../lib/api"
import { formatNaira } from "../lib/paystack"
import { useInView, useStaggerAnimation } from "../lib/animations"

interface Course {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  thumbnail_url: string
  price: number
  original_price?: number
  currency: string
  duration_hours: number
  level: string
  enrollment_count: number
  rating: number
  total_reviews: number
  is_featured: boolean
  category_name: string
  instructor_name: string
  instructor_rating: number
}

interface CourseCatalogProps {
  onCourseSelect?: (courseId: string) => void
  onCoursePreview?: (courseId: string) => void
  onEnrollCourse?: (courseId: string) => void
}

export function CourseCatalog({ onCourseSelect, onCoursePreview, onEnrollCourse }: CourseCatalogProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const api = useApi()
  const [sectionRef, sectionInView] = useInView()
  const [coursesRef, visibleCourses] = useStaggerAnimation(courses.length, 150)

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "data-science", name: "Data Science" },
    { id: "marketing", name: "Marketing" },
    { id: "security", name: "Security" },
  ]

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ]

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "newest", name: "Newest" },
    { id: "rating", name: "Highest Rated" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
  ]

  useEffect(() => {
    loadCourses()
  }, [selectedCategory, sortBy])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const params: any = {}

      if (selectedCategory !== "all") {
        params.category = selectedCategory
      }

      const response = await api.getCourses(params)

      if (response.success) {
        setCourses(response.courses || [])
      }
    } catch (error) {
      console.error("Failed to load courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesLevel
  })

  const handleEnroll = (courseId: string) => {
    onEnrollCourse?.(courseId)
  }

  const handlePreview = (courseId: string) => {
    onCoursePreview?.(courseId)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Browse Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our job-ready courses designed for Nigerian youth who want to earn global income
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden h-12">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}>
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Level Filter */}
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedLevel("all")
              setSortBy("popular")
            }}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div ref={coursesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, index) => {
          const isVisible = index < visibleCourses

          return (
            <Card
              key={course.id}
              className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => onCourseSelect?.(course.id)}
            >
              <div className="relative">
                <img
                  src={course.thumbnail_url || "/placeholder.svg?height=200&width=400"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {course.is_featured && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Featured</Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {course.level}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePreview(course.id)
                      }}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEnroll(course.id)
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Enroll
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Category */}
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.category_name}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.short_description}</p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{course.instructor_name.charAt(0)}</span>
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor_name}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.total_reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrollment_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration_hours}h</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{formatNaira(course.price)}</span>
                    {course.original_price && course.original_price > course.price && (
                      <span className="text-sm text-gray-500 line-through">{formatNaira(course.original_price)}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">or {formatNaira(Math.ceil(course.price / 6))}/month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedLevel("all")
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

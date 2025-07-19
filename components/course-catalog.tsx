"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Users, Clock, ChevronRight, BookOpen } from "lucide-react"
import type { Course } from "@/lib/api"

// Sample course data
const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js and build real-world projects",
    price: 89000,
    originalPrice: 150000,
    rating: 4.8,
    students: 12500,
    duration: "40 hours",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Sarah Johnson",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "Python, Pandas, NumPy, Scikit-learn, TensorFlow and real data projects",
    price: 95000,
    originalPrice: 160000,
    rating: 4.9,
    students: 8900,
    duration: "50 hours",
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "SEO, Social Media, PPC, Content Marketing & Analytics for Nigerian businesses",
    price: 65000,
    originalPrice: 120000,
    rating: 4.7,
    students: 15600,
    duration: "30 hours",
    level: "Beginner",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Emma Rodriguez",
    category: "Marketing",
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build iOS and Android apps with React Native and publish to app stores",
    price: 75000,
    originalPrice: 130000,
    rating: 4.6,
    students: 6800,
    duration: "35 hours",
    level: "Intermediate",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "James Wilson",
    category: "Mobile Development",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description: "Network security, ethical hacking, and cybersecurity best practices",
    price: 85000,
    originalPrice: 140000,
    rating: 4.8,
    students: 4200,
    duration: "45 hours",
    level: "Beginner to Intermediate",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Alex Thompson",
    category: "Cybersecurity",
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services, deployment, and cloud architecture",
    price: 92000,
    originalPrice: 155000,
    rating: 4.7,
    students: 5600,
    duration: "42 hours",
    level: "Intermediate to Advanced",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Maria Garcia",
    category: "Cloud Computing",
  },
]

interface CourseCatalogProps {
  onCourseSelect: (course: Course) => void
}

export function CourseCatalog({ onCourseSelect }: CourseCatalogProps) {
  const [courses, setCourses] = useState<Course[]>(sampleCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(sampleCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    "all",
    "Web Development",
    "Data Science",
    "Marketing",
    "Mobile Development",
    "Cybersecurity",
    "Cloud Computing",
  ]
  const levels = ["all", "Beginner", "Intermediate", "Advanced", "Beginner to Advanced", "Intermediate to Advanced"]

  useEffect(() => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredCourses(filtered)
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive collection of tech courses designed to advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
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
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
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
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLevel("all")
                setSortBy("popular")
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-gray-900">{course.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive">
                    {Math.round(((course.originalPrice! - course.price) / course.originalPrice!) * 100)}% OFF
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">{course.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500">({course.students.toLocaleString()} students)</span>
                  </div>

                  {/* Instructor */}
                  <p className="text-sm text-gray-600">by {course.instructor}</p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">₦{course.price.toLocaleString()}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₦{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => onCourseSelect(course)}
                    className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700"
                  >
                    View Course
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLevel("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

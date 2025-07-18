"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen, Eye } from "lucide-react"

interface CourseCatalogProps {
  onCourseSelect?: (courseId: string) => void
  onPreviewCourse?: (courseId: string) => void
  onEnrollCourse?: (courseId: string) => void
}

export function CourseCatalog({ onCourseSelect, onPreviewCourse, onEnrollCourse }: CourseCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const courses = [
    {
      id: "web-development",
      title: "Full-Stack Web Development Bootcamp",
      instructor: "David Okafor",
      category: "development",
      level: "Beginner",
      duration: "12 weeks",
      students: 1247,
      rating: 4.9,
      price: "₦150,000",
      originalPrice: "₦200,000",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      description:
        "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and launch your tech career.",
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"],
      freeLessons: 4,
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design Mastery",
      instructor: "Sarah Adebayo",
      category: "design",
      level: "Beginner",
      duration: "10 weeks",
      students: 892,
      rating: 4.8,
      price: "₦120,000",
      originalPrice: "₦160,000",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      description:
        "Learn to create beautiful, user-centered designs. Master Figma, design systems, and user research methodologies.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Typography"],
      freeLessons: 4,
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      instructor: "Michael Okafor",
      category: "data",
      level: "Intermediate",
      duration: "14 weeks",
      students: 634,
      rating: 4.7,
      price: "₦180,000",
      originalPrice: "₦240,000",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      description:
        "Master data science with Python, machine learning, and statistical analysis. Work with real datasets and build predictive models.",
      skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
      freeLessons: 4,
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      instructor: "Kemi Adebayo",
      category: "development",
      level: "Intermediate",
      duration: "10 weeks",
      students: 456,
      rating: 4.6,
      price: "₦140,000",
      originalPrice: "₦180,000",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      description:
        "Build native mobile apps for iOS and Android using React Native. Learn app store deployment and monetization strategies.",
      skills: ["React Native", "iOS", "Android", "Firebase", "App Store"],
      freeLessons: 3,
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Mastery",
      instructor: "Tunde Ogundimu",
      category: "marketing",
      level: "Beginner",
      duration: "8 weeks",
      students: 723,
      rating: 4.5,
      price: "₦100,000",
      originalPrice: "₦130,000",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      description:
        "Master digital marketing strategies including SEO, social media marketing, and paid advertising campaigns.",
      skills: ["SEO", "Social Media", "Google Ads", "Analytics", "Content Marketing"],
      freeLessons: 3,
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Fundamentals",
      instructor: "Chidi Okwu",
      category: "security",
      level: "Intermediate",
      duration: "12 weeks",
      students: 389,
      rating: 4.8,
      price: "₦170,000",
      originalPrice: "₦220,000",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      description:
        "Learn ethical hacking, network security, and cybersecurity best practices. Prepare for industry certifications.",
      skills: ["Ethical Hacking", "Network Security", "Penetration Testing", "Risk Assessment", "Compliance"],
      freeLessons: 3,
    },
  ]

  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    { id: "development", name: "Development", count: courses.filter((c) => c.category === "development").length },
    { id: "design", name: "Design", count: courses.filter((c) => c.category === "design").length },
    { id: "data", name: "Data Science", count: courses.filter((c) => c.category === "data").length },
    { id: "marketing", name: "Marketing", count: courses.filter((c) => c.category === "marketing").length },
    { id: "security", name: "Security", count: courses.filter((c) => c.category === "security").length },
  ]

  const filteredCourses =
    selectedCategory === "all" ? courses : courses.filter((course) => course.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Catalog</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of courses designed to accelerate your career in technology
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.name}
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-900">{course.level}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800">{course.freeLessons} Free Lessons</Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {course.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {course.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{course.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{course.price}</span>
                  <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                </div>
                <span className="text-sm text-gray-600">by {course.instructor}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => onPreviewCourse?.(course.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1" onClick={() => onEnrollCourse?.(course.id)}>
                  <BookOpen className="h-4 w-4 mr-1" />
                  Enroll
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found in this category.</p>
        </div>
      )}
    </div>
  )
}

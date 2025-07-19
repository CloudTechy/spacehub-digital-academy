"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Users,
  ChevronRight,
  Play,
  Clock,
  Rocket,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { AuthProvider, useAuth } from "@/lib/api"
import { AuthModal } from "@/components/auth-modal"
import { CourseCatalog } from "@/components/course-catalog"
import { CoursePreview } from "@/components/course-preview"
import { StudentDashboard } from "@/components/student-dashboard"
import { StaffDashboard } from "@/components/staff-dashboard"
import { LeadCaptureModal } from "@/components/lead-capture-modal"

// Course data
const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js and more",
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
    description: "Python, Pandas, NumPy, Scikit-learn, TensorFlow",
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
    description: "SEO, Social Media, PPC, Content Marketing & Analytics",
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
]

const testimonials = [
  {
    name: "Adebayo Ogundimu",
    role: "Software Developer at Paystack",
    content:
      "SpaceHub transformed my career. The practical projects and expert mentorship helped me land my dream job in tech.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Data Analyst at MTN",
    content:
      "The data science course was incredibly comprehensive. I went from zero to getting hired as a data analyst in 6 months.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Chinedu Okoro",
    role: "Digital Marketing Manager",
    content:
      "Best investment I've made in my career. The marketing strategies I learned increased our company's revenue by 300%.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const stats = [
  { number: "50,000+", label: "Students Trained" },
  { number: "95%", label: "Job Placement Rate" },
  { number: "200+", label: "Expert Instructors" },
  { number: "4.9/5", label: "Average Rating" },
]

function SpaceHubLanding() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState("home")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Show lead capture modal after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setShowLeadModal(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [user])

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage("courses")
    } else {
      setAuthMode("register")
      setShowAuthModal(true)
    }
  }

  const handleLogin = () => {
    setAuthMode("login")
    setShowAuthModal(true)
  }

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course)
    setCurrentPage("course-preview")
  }

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SpaceHub</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setCurrentPage("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === "home" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("courses")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === "courses" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === "about" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === "contact" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(user.role === "instructor" ? "staff-dashboard" : "student-dashboard")}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </button>
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <Button onClick={logout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button onClick={handleLogin} variant="ghost">
                    Login
                  </Button>
                  <Button onClick={handleGetStarted}>Get Started</Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => {
                  setCurrentPage("home")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage("courses")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
              >
                Courses
              </button>
              <button
                onClick={() => {
                  setCurrentPage("about")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentPage("contact")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
              >
                Contact
              </button>

              {user ? (
                <div className="border-t pt-4 mt-4">
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-700">Welcome, {user.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage(user.role === "instructor" ? "staff-dashboard" : "student-dashboard")
                      setMobileMenuOpen(false)
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4 mt-4 space-y-2">
                  <button
                    onClick={() => {
                      handleLogin()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      handleGetStarted()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const renderHomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  🚀 Nigeria's #1 Tech Training Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Launch Your
                  <span className="text-blue-600"> Tech Career</span>
                  <br />
                  in Nigeria
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join over 50,000 Nigerians who have transformed their careers with our industry-leading courses in Web
                  Development, Data Science, and Digital Marketing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage("courses")}
                  className="px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Browse Courses
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">50,000+ students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Students learning technology"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Most Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey with our most sought-after courses, designed by industry experts and tailored for the
              Nigerian job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
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
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">{course.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>

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
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">₦{course.price.toLocaleString()}</span>
                          <span className="text-lg text-gray-500 line-through">
                            ₦{course.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                      </div>
                    </div>

                    <Button onClick={() => handleCourseSelect(course)} className="w-full bg-blue-600 hover:bg-blue-700">
                      View Course
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => setCurrentPage("courses")} variant="outline" size="lg" className="px-8">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our graduates who are now thriving in their tech careers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Nigerians who have successfully transitioned into tech careers. Start your journey today
            with our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Start Learning Now
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage("contact")}
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Talk to an Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  const renderAboutPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About SpaceHub</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering Nigerians with world-class tech education and career opportunities
          </p>
        </div>

        <div className="space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At SpaceHub, we believe that every Nigerian deserves access to quality tech education that can transform
                their career and life. We're bridging the skills gap in Nigeria's tech industry by providing practical,
                industry-relevant training.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our courses are designed by industry experts and tailored specifically for the Nigerian job market,
                ensuring our graduates are job-ready from day one.
              </p>
            </div>
            <div>
              <img src="/placeholder.svg?height=400&width=500" alt="Our mission" className="rounded-lg shadow-lg" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose SpaceHub?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Industry-Relevant Curriculum</h3>
                    <p className="text-gray-600">Courses updated regularly to match current industry demands</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Instructors</h3>
                    <p className="text-gray-600">Learn from professionals working at top tech companies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Job Placement Support</h3>
                    <p className="text-gray-600">95% job placement rate with our career support program</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Learning</h3>
                    <p className="text-gray-600">Learn at your own pace with lifetime access to materials</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <img src="/placeholder.svg?height=400&width=500" alt="Why choose us" className="rounded-lg shadow-lg" />
            </div>
          </div>

          <div className="text-center bg-gray-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContactPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Tech Hub Street
                    <br />
                    Victoria Island, Lagos
                    <br />
                    Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+234 (0) 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@spacehub.ng</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="+234 123 456 7890" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea id="message" rows={6} placeholder="Tell us more about your inquiry..." />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "courses":
        return <CourseCatalog onCourseSelect={handleCourseSelect} />
      case "course-preview":
        return selectedCourse ? (
          <CoursePreview course={selectedCourse} onBack={() => setCurrentPage("courses")} />
        ) : (
          <CourseCatalog onCourseSelect={handleCourseSelect} />
        )
      case "student-dashboard":
        return user ? <StudentDashboard /> : renderHomePage()
      case "staff-dashboard":
        return user && user.role === "instructor" ? <StaffDashboard /> : renderHomePage()
      case "about":
        return renderAboutPage()
      case "contact":
        return renderContactPage()
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      {renderCurrentPage()}

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />

      <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} />
    </div>
  )
}

// Main App Component with AuthProvider
function SpaceHubApp() {
  return (
    <AuthProvider>
      <SpaceHubLanding />
    </AuthProvider>
  )
}

export default SpaceHubApp

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Import all components
import { AnimatedHeroSection } from "./components/animated-hero-section"
import { ProblemSection } from "./components/problem-section"
import { AnimatedSolutionSection } from "./components/animated-solution-section"
import { AnimatedSuccessStories } from "./components/animated-success-stories"
import { PricingSection } from "./components/pricing-section"
import { FinalCTA } from "./components/final-cta"
import { LeadCaptureModal } from "./components/lead-capture-modal"
import { InlineLeadForm } from "./components/inline-lead-form"
import { ExitIntentPopup } from "./components/exit-intent-popup"
import { FloatingCTA } from "./components/floating-cta"

// Dashboard and other components
import { CourseCatalog } from "./components/course-catalog"
import { CoursePreview } from "./components/course-preview"
import { CourseCheckout } from "./components/course-checkout"
import { PaymentSuccess } from "./components/payment-success"
import { StudentDashboard } from "./components/student-dashboard"
import { StaffDashboard } from "./components/staff-dashboard"
import { AboutPage } from "./components/about-page"
import { ContactPage } from "./components/contact-page"
import { AuthModal } from "./components/auth-modal"

// Hooks and data
import { useAuth, useApi } from "./lib/api"
import { sampleCourses, type Course } from "./lib/courses-data"

export default function SpaceHubLanding() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showCoursePreview, setShowCoursePreview] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState<{
    reference: string
    course: Course
    amount: string
  } | null>(null)

  const { user, loading, logout } = useAuth()
  const api = useApi()

  // Handle navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    // Close any open modals
    setShowLeadModal(false)
    setShowAuthModal(false)
    setShowCoursePreview(false)
    setShowCheckout(false)
    setPaymentSuccess(null)
  }

  // Handle course selection
  const handleCourseSelect = (courseId: string) => {
    const course = sampleCourses.find((c) => c.id === courseId)
    if (course) {
      setSelectedCourse(course)
      setShowCoursePreview(true)
    }
  }

  // Handle course preview
  const handleCoursePreview = (courseId: string) => {
    handleCourseSelect(courseId)
  }

  // Handle course enrollment
  const handleEnrollCourse = (courseId: string) => {
    if (!user) {
      setAuthMode("register")
      setShowAuthModal(true)
      return
    }

    const course = sampleCourses.find((c) => c.id === courseId)
    if (course) {
      setSelectedCourse(course)
      setShowCheckout(true)
    }
  }

  // Handle payment success
  const handlePaymentSuccess = (reference: string) => {
    if (selectedCourse) {
      setPaymentSuccess({
        reference,
        course: selectedCourse,
        amount: `₦${(selectedCourse.price * 0.9).toLocaleString()}`, // Assuming full payment with discount
      })
      setShowCheckout(false)
    }
  }

  // Handle authentication success
  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // If user was trying to enroll, redirect to checkout
    if (selectedCourse) {
      setShowCheckout(true)
    }
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    setCurrentPage("home")
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SpaceHub...</p>
        </div>
      </div>
    )
  }

  // Render different pages based on current page
  const renderPage = () => {
    switch (currentPage) {
      case "courses":
        return (
          <CourseCatalog
            onCourseSelect={handleCourseSelect}
            onCoursePreview={handleCoursePreview}
            onEnrollCourse={handleEnrollCourse}
          />
        )

      case "about":
        return <AboutPage onNavigate={handleNavigate} />

      case "contact":
        return <ContactPage onNavigate={handleNavigate} />

      case "student-dashboard":
        return <StudentDashboard onNavigate={handleNavigate} />

      case "staff-dashboard":
        return <StaffDashboard onNavigate={handleNavigate} />

      default:
        return (
          <>
            <AnimatedHeroSection onGetStarted={() => setShowLeadModal(true)} onNavigate={handleNavigate} />
            <ProblemSection />
            <AnimatedSolutionSection />
            <AnimatedSuccessStories />
            <PricingSection onEnrollClick={handleEnrollCourse} />
            <InlineLeadForm />
            <FinalCTA onGetStarted={() => setShowLeadModal(true)} />
            <FloatingCTA onGetStarted={() => setShowLeadModal(true)} />
            <ExitIntentPopup />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("home")}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SpaceHub</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavigate("home")}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "home" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("courses")}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "courses" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigate("about")}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "about" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigate("contact")}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "contact" ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Auth/User Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate(user.role === "instructor" ? "staff-dashboard" : "student-dashboard")}
                    className="text-sm"
                  >
                    Dashboard
                  </Button>
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar_url || "/placeholder.svg?height=32&width=32"}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </span>
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="text-sm bg-transparent">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuthModal(true)
                    }}
                    className="text-sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode("register")
                      setShowAuthModal(true)
                    }}
                    className="text-sm bg-blue-600 hover:bg-blue-700"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">{renderPage()}</main>

      {/* Modals */}
      {/* Lead Capture Modal */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="max-w-2xl">
          <LeadCaptureModal onClose={() => setShowLeadModal(false)} />
        </DialogContent>
      </Dialog>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-md">
          <AuthModal
            mode={authMode}
            onSuccess={handleAuthSuccess}
            onClose={() => setShowAuthModal(false)}
            onSwitchMode={(mode) => setAuthMode(mode)}
          />
        </DialogContent>
      </Dialog>

      {/* Course Preview Modal */}
      <Dialog open={showCoursePreview} onOpenChange={setShowCoursePreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <CoursePreview
              course={selectedCourse}
              onEnroll={() => {
                setShowCoursePreview(false)
                handleEnrollCourse(selectedCourse.id)
              }}
              onClose={() => setShowCoursePreview(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          {selectedCourse && (
            <CourseCheckout
              course={selectedCourse}
              onSuccess={handlePaymentSuccess}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Success Modal */}
      <Dialog open={!!paymentSuccess} onOpenChange={() => setPaymentSuccess(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {paymentSuccess && (
            <PaymentSuccess
              reference={paymentSuccess.reference}
              courseName={paymentSuccess.course.title}
              customerEmail={user?.email || ""}
              amount={paymentSuccess.amount}
              onContinue={() => {
                setPaymentSuccess(null)
                handleNavigate(user?.role === "instructor" ? "staff-dashboard" : "student-dashboard")
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

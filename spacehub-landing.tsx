"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "./components/hero-section"
import { ProblemSection } from "./components/problem-section"
import { SolutionSection } from "./components/solution-section"
import { SuccessStories } from "./components/success-stories"
import { PricingSection } from "./components/pricing-section"
import { FinalCTA } from "./components/final-cta"
import { CourseCatalog } from "./components/course-catalog"
import { CoursePreview } from "./components/course-preview"
import { AboutPage } from "./components/about-page"
import { ContactPage } from "./components/contact-page"
import { StudentDashboard } from "./components/student-dashboard"
import { StaffDashboard } from "./components/staff-dashboard"
import { AuthModal } from "./components/auth-modal"
import { Menu, X, User, GraduationCap } from "lucide-react"

export default function SpaceHubLanding() {
  const [currentView, setCurrentView] = useState<
    "home" | "courses" | "course-preview" | "about" | "contact" | "student-dashboard" | "staff-dashboard"
  >("home")
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"student" | "staff" | null>(null)

  const handleCoursePreview = (courseId: string) => {
    setSelectedCourseId(courseId)
    setCurrentView("course-preview")
  }

  const handleCourseEnroll = (courseId: string) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true)
    } else {
      // Handle enrollment logic
      alert(`Enrolling in course: ${courseId}`)
    }
  }

  const handleStudentLogin = (credentials: { email: string; password: string }) => {
    // In a real app, this would validate credentials
    setIsLoggedIn(true)
    setUserType("student")
    setCurrentView("student-dashboard")
  }

  const handleStaffLogin = (credentials: { email: string; password: string }) => {
    // In a real app, this would validate credentials
    setIsLoggedIn(true)
    setUserType("staff")
    setCurrentView("staff-dashboard")
  }

  const handleSignup = (data: { name: string; email: string; password: string }) => {
    // In a real app, this would create a new account
    setIsLoggedIn(true)
    setUserType("student")
    setCurrentView("student-dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setCurrentView("home")
  }

  const handleDashboardAccess = () => {
    if (isLoggedIn) {
      if (userType === "student") {
        setCurrentView("student-dashboard")
      } else if (userType === "staff") {
        setCurrentView("staff-dashboard")
      }
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("home")}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SpaceHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Button variant="ghost" onClick={() => setCurrentView("home")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => setCurrentView("courses")}>
              Courses
            </Button>
            <Button variant="ghost" onClick={() => setCurrentView("about")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => setCurrentView("contact")}>
              Contact
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleDashboardAccess}>
                  {userType === "student" ? (
                    <>
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Dashboard
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Staff Portal
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>Login / Sign Up</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setCurrentView("home")
                  setIsMobileMenuOpen(false)
                }}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setCurrentView("courses")
                  setIsMobileMenuOpen(false)
                }}
              >
                Courses
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setCurrentView("about")
                  setIsMobileMenuOpen(false)
                }}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setCurrentView("contact")
                  setIsMobileMenuOpen(false)
                }}
              >
                Contact
              </Button>

              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      handleDashboardAccess()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {userType === "student" ? (
                      <>
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Dashboard
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Staff Portal
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  className="justify-start"
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  const renderContent = () => {
    switch (currentView) {
      case "courses":
        return (
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <CourseCatalog onPreviewCourse={handleCoursePreview} onEnrollCourse={handleCourseEnroll} />
          </div>
        )

      case "course-preview":
        return (
          <CoursePreview
            courseId={selectedCourseId}
            onBack={() => setCurrentView("courses")}
            onEnroll={() => handleCourseEnroll(selectedCourseId)}
          />
        )

      case "about":
        return <AboutPage onBack={() => setCurrentView("home")} />

      case "contact":
        return <ContactPage onBack={() => setCurrentView("home")} />

      case "student-dashboard":
        return <StudentDashboard onBack={handleLogout} />

      case "staff-dashboard":
        return <StaffDashboard onBack={handleLogout} />

      default:
        return (
          <div className="space-y-0">
            <HeroSection onGetStarted={() => setCurrentView("courses")} />
            <ProblemSection />
            <SolutionSection />
            <SuccessStories />
            <PricingSection onEnroll={handleCourseEnroll} />
            <FinalCTA onGetStarted={() => setCurrentView("courses")} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      {renderContent()}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onStudentLogin={handleStudentLogin}
        onStaffLogin={handleStaffLogin}
        onSignup={handleSignup}
      />
    </div>
  )
}

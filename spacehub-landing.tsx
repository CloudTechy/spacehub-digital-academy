"use client"

import { useState } from "react"
import { LeadCaptureModal } from "./components/lead-capture-modal"
import { ExitIntentPopup } from "./components/exit-intent-popup"
import { FloatingCTA } from "./components/floating-cta"
import { InlineLeadForm } from "./components/inline-lead-form"
import { HeroSection } from "./components/hero-section"
import { ProblemSection } from "./components/problem-section"
import { SolutionSection } from "./components/solution-section"
import { SuccessStories } from "./components/success-stories"
import { FinalCTA } from "./components/final-cta"
import { PricingSection } from "./components/pricing-section"
import { CourseCategories } from "./components/course-categories"
import { CourseCatalog } from "./components/course-catalog"
import { CourseDetailPage } from "./components/course-detail-page"
import { AboutPage } from "./components/about-page"
import type { DetailedCourse } from "./lib/courses-data"

type ViewState = "landing" | "catalog" | "course-detail" | "about"

export default function SpaceHubLanding() {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [currentView, setCurrentView] = useState<ViewState>("landing")
  const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null)

  const handleViewCatalog = () => {
    setCurrentView("catalog")
  }

  const handleViewAbout = () => {
    setCurrentView("about")
  }

  const handleCourseSelect = (course: DetailedCourse) => {
    setSelectedCourse(course)
    setCurrentView("course-detail")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
    setSelectedCourse(null)
  }

  const handleBackToCatalog = () => {
    setCurrentView("catalog")
    setSelectedCourse(null)
  }

  if (currentView === "about") {
    return (
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" onClick={handleBackToLanding} role="button">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SpaceHub</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={handleViewCatalog} className="text-gray-600 hover:text-gray-900">
                  Courses
                </button>
                <button onClick={handleViewAbout} className="text-blue-600 font-medium">
                  About
                </button>
                <a href="#success" className="text-gray-600 hover:text-gray-900">
                  Success Stories
                </a>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowLeadModal(true)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20">
          <AboutPage onBackToHome={handleBackToLanding} onViewCourses={handleViewCatalog} />
        </div>

        <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} trigger="navigation" />
      </div>
    )
  }

  if (currentView === "course-detail" && selectedCourse) {
    return (
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" onClick={handleBackToLanding} role="button">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SpaceHub</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={handleBackToCatalog} className="text-gray-600 hover:text-gray-900">
                  Courses
                </button>
                <button onClick={handleViewAbout} className="text-gray-600 hover:text-gray-900">
                  About
                </button>
                <a href="#success" className="text-gray-600 hover:text-gray-900">
                  Success Stories
                </a>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowLeadModal(true)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20">
          <CourseDetailPage course={selectedCourse} onBack={handleBackToCatalog} />
        </div>

        <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} trigger="navigation" />
      </div>
    )
  }

  if (currentView === "catalog") {
    return (
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" onClick={handleBackToLanding} role="button">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SpaceHub</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => setCurrentView("catalog")} className="text-blue-600 font-medium">
                  Courses
                </button>
                <button onClick={handleViewAbout} className="text-gray-600 hover:text-gray-900">
                  About
                </button>
                <a href="#success" className="text-gray-600 hover:text-gray-900">
                  Success Stories
                </a>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowLeadModal(true)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20">
          <CourseCatalog onCourseSelect={handleCourseSelect} />
        </div>

        <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} trigger="navigation" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SpaceHub</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={handleViewCatalog} className="text-gray-600 hover:text-gray-900">
                Courses
              </button>
              <button onClick={handleViewAbout} className="text-gray-600 hover:text-gray-900">
                About
              </button>
              <a href="#success" className="text-gray-600 hover:text-gray-900">
                Success Stories
              </a>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowLeadModal(true)}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <SuccessStories />

        {/* Inline Lead Capture Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container max-w-4xl mx-auto px-4">
            <InlineLeadForm
              title="Ready to Transform Your Career?"
              subtitle="Join 5,000+ Nigerians who've downloaded our free career guide"
              buttonText="Get Free Starter Pack"
            />
          </div>
        </section>

        <CourseCategories onViewCatalog={handleViewCatalog} />
        <PricingSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">SpaceHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering Nigerian youth with digital skills for global opportunities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={handleViewCatalog} className="hover:text-white">
                    Web Development
                  </button>
                </li>
                <li>
                  <button onClick={handleViewCatalog} className="hover:text-white">
                    UI/UX Design
                  </button>
                </li>
                <li>
                  <button onClick={handleViewCatalog} className="hover:text-white">
                    Data Science
                  </button>
                </li>
                <li>
                  <button onClick={handleViewCatalog} className="hover:text-white">
                    Digital Marketing
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={handleViewAbout} className="hover:text-white">
                    About Us
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 hello@spacehub.ng</li>
                <li>📱 +234 XXX XXX XXXX</li>
                <li>📍 Lagos, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SpaceHub. All rights reserved. Built for Nigerian youth, by Nigerian youth.</p>
          </div>
        </div>
      </footer>

      {/* Lead Capture Components */}
      <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} trigger="navigation" />
      <ExitIntentPopup />
      <FloatingCTA onOpenModal={() => setShowLeadModal(true)} />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useState } from "react"
import { LeadCaptureModal } from "./lead-capture-modal"

export function HeroSection() {
  const [showLeadModal, setShowLeadModal] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              🚀 Join 2,000+ Nigerian Tech Professionals
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Phone Into Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Office</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Join 2,000+ Nigerian youths who've learned high-income digital skills and built careers from their
              laptops. Start with our free starter pack today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => setShowLeadModal(true)}
              >
                Get Free Starter Pack
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>2,000+ students trained</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>85% job placement rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>₦500K+ average salary</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                alt="Young African professionals working on laptops in modern office"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-4 bg-white rounded-lg shadow-lg p-4 hidden sm:block">
              <div className="text-2xl font-bold text-green-600">₦2M+</div>
              <div className="text-sm text-gray-600">Monthly Earnings</div>
            </div>

            <div className="absolute -top-6 -right-4 bg-white rounded-lg shadow-lg p-4 hidden sm:block">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-gray-600">Job Placement</div>
            </div>

            {/* Success Story Card */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-xs hidden lg:block">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Success story"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-xs font-medium text-gray-900">"Landed $2,500/month remote job!"</p>
                  <p className="text-xs text-gray-500">- David O., Web Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadCaptureModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} trigger="hero" />
    </section>
  )
}

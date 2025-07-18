"use client"

import { Button } from "@/components/ui/button"
import { useTypingAnimation, useCountUp, useInView } from "../lib/animations"
import { ArrowRight, Play, Star, Users, Award } from "lucide-react"

interface AnimatedHeroSectionProps {
  onGetStarted?: () => void
  onWatchDemo?: () => void
}

export function AnimatedHeroSection({ onGetStarted, onWatchDemo }: AnimatedHeroSectionProps) {
  const [heroRef, heroInView] = useInView()
  const [studentsRef, studentsCount] = useCountUp(5000, 2000)
  const [coursesRef, coursesCount] = useCountUp(50, 1500)
  const [successRef, successRate] = useCountUp(95, 2500)

  const [mainText] = useTypingAnimation("Transform Your Career with", 100)
  const [subText] = useTypingAnimation("Digital Skills", 150)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Particle System */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-bounce-subtle">
                <Star className="h-4 w-4" />
                #1 Tech Education Platform in Nigeria
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">{mainText}</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {subText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join thousands of Nigerians earning global income through our job-ready tech courses. From zero to hero
                in 6 months.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div ref={studentsRef} className="text-center group">
                <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {studentsCount.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div ref={coursesRef} className="text-center group">
                <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  {coursesCount}+
                </div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div ref={successRef} className="text-center group">
                <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                  {successRate}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                onClick={onWatchDemo}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">Join 5,000+ students</span>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Dashboard Preview */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Student Dashboard</h3>
                        <p className="text-sm text-gray-500">Track your progress</p>
                      </div>
                    </div>
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>React Development</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-progress-85"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>UI/UX Design</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-progress-72"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Science</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-progress-45"></div>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="flex gap-2 pt-2">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium animate-bounce-subtle">
                      🏆 First Project
                    </div>
                    <div
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium animate-bounce-subtle"
                      style={{ animationDelay: "0.5s" }}
                    >
                      🔥 10 Day Streak
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl">🎯</span>
              </div>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-float-delayed">
                <span className="text-xl">💡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

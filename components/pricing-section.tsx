"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, Clock, Award, Zap } from "lucide-react"
import { formatNaira } from "../lib/paystack"
import { sampleCourses } from "../lib/courses-data"

interface PricingSectionProps {
  onEnrollClick?: (courseId: string) => void
}

export function PricingSection({ onEnrollClick }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "pro">("premium")

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      description: "Perfect for beginners starting their learning journey",
      price: 50000,
      originalPrice: 75000,
      duration: "3 months access",
      popular: false,
      features: [
        "Access to 5 beginner courses",
        "Basic community access",
        "Email support",
        "Mobile app access",
        "Basic certificates",
        "Self-paced learning",
      ],
      limitations: ["No live sessions", "Limited mentor access", "No career guidance"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      description: "Most popular choice for serious learners",
      price: 120000,
      originalPrice: 180000,
      duration: "6 months access",
      popular: true,
      features: [
        "Access to ALL courses",
        "Live weekly sessions",
        "Priority community access",
        "1-on-1 mentor sessions (2/month)",
        "Premium certificates",
        "Career guidance",
        "Project reviews",
        "Job placement assistance",
        "Mobile + desktop access",
        "Downloadable resources",
      ],
      limitations: [],
    },
    {
      id: "pro",
      name: "Pro Plan",
      description: "For professionals seeking advanced skills",
      price: 200000,
      originalPrice: 300000,
      duration: "12 months access",
      popular: false,
      features: [
        "Everything in Premium",
        "Unlimited mentor sessions",
        "Advanced project portfolio",
        "Industry expert sessions",
        "Internship opportunities",
        "LinkedIn profile optimization",
        "Resume review service",
        "Interview preparation",
        "Networking events access",
        "Lifetime community access",
        "Advanced certificates",
        "Priority job referrals",
      ],
      limitations: [],
    },
  ]

  const featuredCourses = sampleCourses.filter((course) => course.is_featured).slice(0, 3)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">💰 Special Launch Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invest in your future with our comprehensive learning plans. All plans include lifetime access to course
            materials and our supportive community.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "border-blue-500 shadow-lg scale-105 bg-white" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold">🔥 Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">{formatNaira(plan.price)}</span>
                    <span className="text-lg text-gray-500 line-through">{formatNaira(plan.originalPrice)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.duration}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0">×</span>
                          <span className="text-gray-600">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                  onClick={() => onEnrollClick?.(plan.id)}
                >
                  {plan.popular ? "🚀 Get Started Now" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Courses Preview */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Courses Included</h3>
          <p className="text-gray-600 mb-8">Get access to these high-demand courses and many more</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <img
                  src={course.thumbnail_url || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration_hours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrollment_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.short_description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.level}</Badge>
                  <span className="text-lg font-bold text-gray-900">{formatNaira(course.price)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">5,000+</div>
              <div className="text-sm text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <Check className="w-5 h-5" />
            <span className="font-semibold">30-Day Money-Back Guarantee</span>
          </div>
          <p className="text-gray-600 mt-2">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, GraduationCap, Smartphone, Globe, ArrowRight } from "lucide-react"

export function SolutionSection() {
  const benefits = [
    {
      icon: Home,
      title: "Learn from home, anytime",
      description: "Study at your own pace, whenever it's convenient for you",
    },
    {
      icon: Briefcase,
      title: "Job-ready in 3-6 months",
      description: "Fast-track your career with practical, industry-relevant skills",
    },
    {
      icon: GraduationCap,
      title: "Personal mentor assigned",
      description: "Get 1-on-1 guidance from industry professionals",
    },
    {
      icon: Smartphone,
      title: "Mobile-friendly platform",
      description: "Learn on your phone, tablet, or laptop - anywhere, anytime",
    },
    {
      icon: Globe,
      title: "Global opportunities",
      description: "Access international job markets and remote work opportunities",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn Skills That{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Actually Pay
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            At SpaceHub, we don't just teach theory. We show you exactly how Nigerians like you are making ₦500K - ₦2M
            monthly with digital skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Dashboard Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Learning Dashboard</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your progress, connect with mentors, and build your portfolio - all from your mobile device.
          </p>

          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4">
              <img
                src="/placeholder.svg?height=400&width=250"
                alt="Mobile learning dashboard"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>

          <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700">
            Start Learning Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

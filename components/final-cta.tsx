"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Star, TrendingUp } from "lucide-react"
import { InlineLeadForm } from "./inline-lead-form"

export function FinalCTA() {
  const stats = [
    { icon: Users, value: "2,000+", label: "Students Trained" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: TrendingUp, value: "85%", label: "Job Placement Rate" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Success Story{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of Nigerians who've transformed their lives with digital skills. Get our free starter pack
            and see what's possible.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA - Replace the existing button with inline form */}
        <div className="mb-8">
          <InlineLeadForm
            title="Get Your Free Starter Pack"
            subtitle="No spam, just valuable insights to kickstart your tech career"
            buttonText="Download Free Guide"
          />
        </div>

        {/* Secondary CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 bg-transparent"
          >
            Browse Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm mb-4">Trusted by students from:</p>
          <div className="flex flex-wrap justify-center gap-4 text-blue-300 text-sm">
            <span>🏛️ University of Lagos</span>
            <span>🏛️ Covenant University</span>
            <span>🏛️ FUTA</span>
            <span>🏛️ OAU</span>
          </div>
        </div>
      </div>
    </section>
  )
}

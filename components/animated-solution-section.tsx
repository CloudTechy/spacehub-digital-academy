"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStaggerAnimation, useInView } from "../lib/animations"
import { Code, Palette, BarChart, Smartphone, Globe, Shield, ArrowRight } from "lucide-react"

interface AnimatedSolutionSectionProps {
  onLearnMore?: () => void
}

export function AnimatedSolutionSection({ onLearnMore }: AnimatedSolutionSectionProps) {
  const [sectionRef, sectionInView] = useInView()
  const [cardsRef, visibleCards] = useStaggerAnimation(6, 200)

  const solutions = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Master React, Node.js, and modern web technologies",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Create beautiful, user-centered digital experiences",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: BarChart,
      title: "Data Science",
      description: "Analyze data and build machine learning models",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Build native iOS and Android applications",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      description: "Master SEO, social media, and online advertising",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50",
      hoverColor: "hover:bg-teal-100",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect systems and data from digital threats",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tech Career Path
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From beginner to expert, our comprehensive courses are designed to get you job-ready in the most in-demand
            tech skills.
          </p>
        </div>

        {/* Solutions Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            const isVisible = index < visibleCards

            return (
              <Card
                key={index}
                className={`group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${solution.bgColor} ${solution.hoverColor} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${solution.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {solution.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="h-5 w-5 mx-auto text-gray-500" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button
            onClick={onLearnMore}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            Explore All Courses
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
}

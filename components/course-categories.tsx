"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, BarChart3, Palette, TrendingUp, Zap, Megaphone, Users, ArrowRight } from "lucide-react"

interface CourseCategoriesProps {
  onViewCatalog?: () => void
}

export function CourseCategories({ onViewCatalog }: CourseCategoriesProps) {
  const categories = [
    {
      icon: Code,
      title: "Web & Mobile Development",
      description: "Build apps and websites",
      students: "450+",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Data Science & AI",
      description: "Analyze data, create smart solutions",
      students: "320+",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Design beautiful digital experiences",
      students: "380+",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Forex/Crypto Trading",
      description: "Master financial markets",
      students: "280+",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      icon: Zap,
      title: "Solar & Smart Home Tech",
      description: "Install and maintain renewable energy",
      students: "150+",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Grow brands online",
      students: "520+",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Pick Your Path to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our job-ready courses designed specifically for Nigerian youth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                  <category.icon className={`h-8 w-8 ${category.textColor}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>

                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {category.students} students
                  </Badge>
                </div>

                <Button className="w-full bg-transparent" variant="outline" onClick={onViewCatalog}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={onViewCatalog}>
            Browse All Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

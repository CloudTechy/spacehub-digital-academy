"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStaggerAnimation, useInView } from "../lib/animations"
import { Star, Quote, MapPin, Briefcase } from "lucide-react"

export function AnimatedSuccessStories() {
  const [sectionRef, sectionInView] = useInView()
  const [storiesRef, visibleStories] = useStaggerAnimation(3, 300)

  const stories = [
    {
      name: "Adaora Okafor",
      role: "Frontend Developer",
      company: "Paystack",
      location: "Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      story:
        "SpaceHub transformed my career completely. From a complete beginner to landing my dream job at Paystack in just 8 months. The mentorship and practical projects made all the difference.",
      rating: 5,
      salary: "$45,000/year",
      course: "Full-Stack Development",
      badge: "Success Story",
    },
    {
      name: "Emeka Nwankwo",
      role: "UI/UX Designer",
      company: "Flutterwave",
      location: "Abuja, Nigeria",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story:
        "The design course at SpaceHub opened doors I never imagined. Now I'm designing products used by millions across Africa. The portfolio projects were key to getting hired.",
      rating: 5,
      salary: "$38,000/year",
      course: "UI/UX Design",
      badge: "Career Change",
    },
    {
      name: "Funmi Adebayo",
      role: "Data Scientist",
      company: "Andela",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story:
        "The data science program gave me the skills to work remotely for international companies. I'm now earning more than I ever thought possible while working from home.",
      rating: 5,
      salary: "$52,000/year",
      course: "Data Science",
      badge: "Remote Success",
    },
  ]

  return (
    <section ref={sectionRef} id="success" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Stories,{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Real Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Nigerians who have transformed their careers and are now earning global salaries from the
            comfort of their homes.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div ref={storiesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => {
            const isVisible = index < visibleStories

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-3 bg-white ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-8 relative z-10">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="h-12 w-12 text-blue-500" />
                  </div>

                  {/* Badge */}
                  <div className="mb-4">
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform group-hover:scale-105 transition-all duration-300">
                      {story.badge}
                    </Badge>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">{story.role}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Briefcase className="h-3 w-3" />
                        <span>{story.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                    "{story.story}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium text-blue-600">{story.course}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Salary:</span>
                      <span className="font-bold text-green-600">{story.salary}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {[
            { number: "5,000+", label: "Students Trained" },
            { number: "95%", label: "Job Placement Rate" },
            { number: "$42K", label: "Average Salary" },
            { number: "6 Months", label: "Average Time to Job" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

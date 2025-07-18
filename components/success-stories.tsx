"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight } from "lucide-react"

export function SuccessStories() {
  const stories = [
    {
      name: "Kemi A.",
      location: "Lagos",
      before: "Jobless Graduate",
      after: "UI/UX Designer",
      income: "$2,000/month",
      quote:
        "In 6 months, I went from jobless graduate to earning $2,000 monthly as a UI/UX designer. SpaceHub changed my life.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      course: "UI/UX Design",
    },
    {
      name: "David O.",
      location: "Abuja",
      before: "Banking Job",
      after: "Digital Marketing Agency Owner",
      income: "3x Previous Salary",
      quote: "I was tired of my banking job. Now I run my own digital marketing agency and make 3x my old salary.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      course: "Digital Marketing",
    },
    {
      name: "Blessing E.",
      location: "Port Harcourt",
      before: "Unemployed",
      after: "Full-Stack Developer",
      income: "₦800K/month",
      quote: "From zero coding knowledge to landing a remote job with a US company. The mentorship was incredible.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      course: "Web Development",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Students, Real <span className="text-green-600">Results</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet Nigerian youth who've transformed their lives with digital skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-gray-600 text-sm">{story.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 mb-6 italic">"{story.quote}"</blockquote>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600">Before</div>
                      <div className="font-semibold text-gray-900">{story.before}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">After</div>
                      <div className="font-semibold text-green-600">{story.after}</div>
                    </div>
                  </div>
                  <div className="text-center mt-3 pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">Now Earning</div>
                    <div className="text-xl font-bold text-green-600">{story.income}</div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {story.course}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Group Photo */}
        <div className="text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
            alt="SpaceHub graduates celebration"
            className="w-full max-w-4xl mx-auto h-64 object-cover rounded-2xl shadow-lg"
          />
          <p className="text-sm text-gray-500 mt-4">Our latest graduation ceremony - 200+ new tech professionals!</p>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
            View All Success Stories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

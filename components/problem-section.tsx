"use client"

import { Card, CardContent } from "@/components/ui/card"
import { X, CheckCircle } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Tired of Sending CVs with <span className="text-red-600">No Reply?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The job market is tough. You've got the drive, but not the right skills. While your friends are stuck in
            traffic going to jobs that barely pay the bills, you could be earning dollars from your bedroom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Problem Side */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-4">The Old Way</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sending hundreds of CVs with no response</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Stuck in traffic for ₦50K monthly jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Limited by location and connections</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Skills that don't match market demand</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution Side */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4">The SpaceHub Way</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Companies reaching out to hire you</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Work from home earning $2,000+ monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Global opportunities from your bedroom</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">High-demand digital skills that pay</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Visual Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop"
              alt="Frustrated job seeker with rejection letters"
              className="w-full h-48 object-cover rounded-lg mb-4 grayscale"
            />
            <p className="text-sm text-gray-500">Traditional job hunting struggles</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
              alt="Happy remote worker with laptop"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-500">Digital skills success story</p>
          </div>
        </div>
      </div>
    </section>
  )
}

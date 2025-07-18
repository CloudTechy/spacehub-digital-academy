"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle, CreditCard, Users, Clock, Star } from "lucide-react"
import { CourseCheckout } from "./course-checkout"
import { PaymentSuccess } from "./payment-success"
import { courses, formatNaira, type Course } from "../lib/paystack"

export function PricingSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState<{
    reference: string
    course: Course
    amount: string
  } | null>(null)

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course)
    setShowCheckout(true)
  }

  const handlePaymentSuccess = (reference: string) => {
    if (selectedCourse) {
      setPaymentSuccess({
        reference,
        course: selectedCourse,
        amount: formatNaira(selectedCourse.price * 0.9), // Assuming full payment with discount
      })
      setShowCheckout(false)
    }
  }

  const handleCloseSuccess = () => {
    setPaymentSuccess(null)
    setSelectedCourse(null)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Future Today
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the course that fits your goals. All courses include lifetime access and job placement support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative">
              {course.id === "ui-ux" && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    450+ students
                  </span>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">What You'll Get:</h4>
                  <ul className="space-y-2">
                    {course.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {course.features.length > 3 && (
                      <li className="text-sm text-gray-500 ml-6">+{course.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{formatNaira(course.price * 0.9)}</span>
                    <span className="text-lg text-gray-500 line-through">{formatNaira(course.price)}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save 10%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Or pay {formatNaira(Math.ceil(course.price / 6))}/month for 6 months
                  </p>
                </div>

                {/* CTA Button */}
                <Button onClick={() => handleEnrollClick(course)} className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>

                {/* Guarantee */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">🛡️ 30-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Secure Payment with Paystack
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              30-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Lifetime Course Access
            </span>
          </div>

          <p className="text-gray-500 text-sm">Trusted by 2,000+ Nigerian students • 85% job placement rate</p>
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          {selectedCourse && (
            <CourseCheckout
              course={selectedCourse}
              onSuccess={handlePaymentSuccess}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={!!paymentSuccess} onOpenChange={() => setPaymentSuccess(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {paymentSuccess && (
            <PaymentSuccess
              reference={paymentSuccess.reference}
              courseName={paymentSuccess.course.title}
              customerEmail="user@example.com" // This would come from the form
              amount={paymentSuccess.amount}
              onContinue={handleCloseSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

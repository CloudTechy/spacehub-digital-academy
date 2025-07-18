"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, MessageCircle, ArrowRight } from "lucide-react"

interface PaymentSuccessProps {
  reference: string
  courseName: string
  customerEmail: string
  amount: string
  onContinue?: () => void
}

export function PaymentSuccess({ reference, courseName, customerEmail, amount, onContinue }: PaymentSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-green-800 mb-2">Payment Successful! 🎉</h1>
          <p className="text-green-700 mb-6">
            Welcome to SpaceHub! You've just made the best investment in your future.
          </p>

          {/* Payment Details */}
          <div className="bg-white rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-medium font-mono text-xs">{reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-4">What Happens Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Check Your Email</p>
                  <p className="text-sm text-blue-700">Login details and welcome packet sent to {customerEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Meet Your Mentor</p>
                  <p className="text-sm text-blue-700">Your assigned mentor will reach out within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Join the Community</p>
                  <p className="text-sm text-blue-700">WhatsApp group invitation and orientation session details</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onContinue} className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg">
              <ArrowRight className="mr-2 h-5 w-5" />
              Access Your Course Dashboard
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <p className="text-sm text-green-700 mb-2">Need help getting started?</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
              <span>📧 support@spacehub.ng</span>
              <span className="hidden sm:inline">|</span>
              <span>📱 +234 XXX XXX XXXX</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

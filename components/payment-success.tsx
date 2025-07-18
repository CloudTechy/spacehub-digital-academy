"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Share2, Calendar, Users, BookOpen } from "lucide-react"

interface PaymentSuccessProps {
  reference: string
  courseName: string
  customerEmail: string
  amount: string
  onContinue: () => void
}

export function PaymentSuccess({ reference, courseName, customerEmail, amount, onContinue }: PaymentSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      reference,
      courseName,
      customerEmail,
      amount,
      date: new Date().toLocaleDateString(),
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `receipt-${reference}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I just enrolled in a course!",
          text: `I just enrolled in "${courseName}" on SpaceHub! 🎉`,
          url: window.location.origin,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      const text = `I just enrolled in "${courseName}" on SpaceHub! 🎉 Check it out at ${window.location.origin}`
      navigator.clipboard.writeText(text)
      alert("Shared text copied to clipboard!")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="confetti-animation">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        </div>
      )}

      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Payment Successful! 🎉</CardTitle>
          <p className="text-green-700">Welcome to your learning journey!</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Details */}
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium text-gray-900">{courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-gray-900">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-mono text-xs text-gray-700">{reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Access your course materials immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Join the exclusive student community</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Start learning at your own pace</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Get personalized feedback from instructors</span>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">Lifetime</div>
              <div className="text-xs text-gray-600">Access</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 text-gray-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">24/7</div>
              <div className="text-xs text-gray-600">Support</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-gray-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">Certificate</div>
              <div className="text-xs text-gray-600">Included</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onContinue} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning Now
            </Button>
            <Button variant="outline" onClick={handleDownloadReceipt} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Success
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@spacehub.com" className="text-blue-600 hover:underline font-medium">
              support@spacehub.com
            </a>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .confetti-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

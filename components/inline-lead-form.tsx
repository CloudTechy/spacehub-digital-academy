"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, CheckCircle, ArrowRight } from "lucide-react"

interface InlineLeadFormProps {
  title?: string
  subtitle?: string
  buttonText?: string
  compact?: boolean
}

export function InlineLeadForm({
  title = "Get Your Free Starter Pack",
  subtitle = "Join 5,000+ Nigerians who've downloaded our career guide",
  buttonText = "Get Free Access",
  compact = false,
}: InlineLeadFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setEmail("")
    }, 5000)
  }

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Check Your Email! 📧</h3>
          <p className="text-green-700 text-sm">
            Your Digital Skills Starter Pack is on its way. Don't forget to check your spam folder.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 ${compact ? "shadow-md" : "shadow-lg"}`}
    >
      <CardContent className={compact ? "p-4" : "p-6"}>
        {!compact && (
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={compact ? "flex gap-2" : "space-y-4"}>
          <div className={compact ? "flex-1" : ""}>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-gray-300"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className={`bg-blue-600 hover:bg-blue-700 ${compact ? "px-4" : "w-full py-3"}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {compact ? "..." : "Sending..."}
              </div>
            ) : (
              <>
                {compact ? (
                  <ArrowRight className="h-4 w-4" />
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    {buttonText}
                  </>
                )}
              </>
            )}
          </Button>
        </form>

        {!compact && (
          <p className="text-xs text-gray-500 text-center mt-3">
            Free forever. No credit card required. Unsubscribe anytime.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

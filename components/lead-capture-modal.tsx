"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, CheckCircle, Users, Star, Gift } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  trigger?: string
}

export function LeadCaptureModal({ isOpen, onClose, trigger = "general" }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    currentSituation: "",
    firstName: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      onClose()
      setIsSuccess(false)
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You're In! 🎉</h3>
            <p className="text-gray-600 mb-4">Check your email for the Digital Skills Starter Pack</p>
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <strong>What's Next:</strong>
              <br />
              1. Check your email (and spam folder)
              <br />
              2. Join our WhatsApp community
              <br />
              3. Take the career assessment quiz
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Get Your Free Digital Skills Starter Pack
          </DialogTitle>
          <DialogDescription className="text-center">
            The same guide that helped 5,000+ Nigerians choose their tech career path
          </DialogDescription>
        </DialogHeader>

        {/* Value Proposition */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">5,000+</div>
              <div className="text-xs text-gray-600">Downloads</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">4.9/5</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Gift className="h-5 w-5 text-blue-600" />
              What You'll Get (Worth ₦25,000):
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ Career Assessment Quiz</li>
              <li>✅ Nigerian Tech Salary Guide</li>
              <li>✅ 30-Day Learning Roadmap</li>
              <li>✅ Free Tools & Resources List</li>
              <li>✅ WhatsApp Community Access</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp Number *</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+234 XXX XXX XXXX"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="situation">Current Situation *</Label>
            <Select onValueChange={(value) => handleInputChange("currentSituation", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your current situation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="unemployed">Unemployed Graduate</SelectItem>
                <SelectItem value="employed-unsatisfied">Employed but Unsatisfied</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="career-change">Looking for Career Change</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending Your Pack...
              </div>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Get Free Starter Pack
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            No spam, ever. We respect your privacy and will only send valuable tech career insights.
          </p>
        </form>

        {/* Trust Indicators */}
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>🔒 100% Secure</span>
            <span>📧 No Spam</span>
            <span>🎁 Always Free</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

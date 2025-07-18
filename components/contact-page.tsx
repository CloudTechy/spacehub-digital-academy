"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  BookOpen,
  CreditCard,
  HelpCircle,
} from "lucide-react"

interface ContactPageProps {
  onBack?: () => void
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
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

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+234 XXX XXX XXXX",
      hours: "Mon-Fri, 9AM-6PM WAT",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a message",
      contact: "hello@spacehub.ng",
      hours: "24/7 Response",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat support",
      contact: "+234 XXX XXX XXXX",
      hours: "Mon-Fri, 9AM-9PM WAT",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      contact: "Lagos, Nigeria",
      hours: "By appointment only",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const faqCategories = [
    {
      icon: BookOpen,
      title: "Courses & Learning",
      description: "Questions about our courses, curriculum, and learning process",
      count: "15+ FAQs",
    },
    {
      icon: CreditCard,
      title: "Payment & Pricing",
      description: "Information about fees, payment plans, and refunds",
      count: "10+ FAQs",
    },
    {
      icon: Users,
      title: "Career Support",
      description: "Job placement, mentorship, and career guidance",
      count: "12+ FAQs",
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "Platform access, technical issues, and troubleshooting",
      count: "8+ FAQs",
    },
  ]

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent! 🎉</h2>
            <p className="text-green-700 mb-4">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <Button onClick={onBack} variant="outline" className="bg-transparent">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about our courses? Need help with enrollment? Our team is here to support your learning
            journey.
          </p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter your first name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter your last name"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+234 XXX XXX XXXX"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Category and Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="courses">Courses & Enrollment</SelectItem>
                          <SelectItem value="payment">Payment & Pricing</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="career">Career Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject line"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center justify-center`}>
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                      <p className="font-medium text-gray-900">{method.contact}</p>
                      <p className="text-xs text-gray-500">{method.hours}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All times are in West Africa Time (WAT)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Need Quick Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <category.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{category.title}</h4>
                      <p className="text-xs text-gray-600">{category.description}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Our Location</CardTitle>
              <p className="text-gray-600">Visit us at our Lagos office</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"
                  alt="Modern office building in Lagos"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">SpaceHub Digital Skills Academy</p>
                    <p className="text-gray-600">123 Innovation Drive, Victoria Island</p>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

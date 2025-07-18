"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Gift, Star, Users } from "lucide-react"
import { useApi } from "../lib/api"

interface LeadCaptureModalProps {
  onClose: () => void
}

export function LeadCaptureModal({ onClose }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    experience: "",
    goals: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const api = useApi()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await api.submitLead({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        interest: `${formData.interest} | Experience: ${formData.experience} | Goals: ${formData.goals}`,
      })

      if (result.success) {
        setSubmitted(true)
      } else {
        alert("Failed to submit. Please try again.")
      }
    } catch (error) {
      console.error("Lead submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SpaceHub! 🎉</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest! We've sent you a special welcome package with:
        </p>
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4 text-blue-600" />
            </div>
            <span>Free course preview access</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
            <span>Exclusive learning resources</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <span>Community access invitation</span>
          </div>
        </div>
        <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
          Start Exploring
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      \

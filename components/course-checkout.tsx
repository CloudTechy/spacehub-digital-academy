"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, CreditCard, Shield, Clock, Users } from "lucide-react"
import {
  type Course,
  formatNaira,
  generatePaymentRef,
  loadPaystackScript,
  PAYSTACK_PUBLIC_KEY,
  type PaystackConfig,
  type PaystackResponse,
} from "../lib/paystack"

interface CourseCheckoutProps {
  course: Course
  onSuccess?: (reference: string) => void
  onClose?: () => void
}

export function CourseCheckout({ course, onSuccess, onClose }: CourseCheckoutProps) {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [paymentPlan, setPaymentPlan] = useState<"full" | "installment">("full")
  const [isProcessing, setIsProcessing] = useState(false)

  const installmentAmount = Math.ceil(course.price / 6) // 6 months installment
  const fullPaymentDiscount = course.price * 0.1 // 10% discount for full payment
  const discountedPrice = course.price - fullPaymentDiscount

  const handlePayment = async () => {
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)

    try {
      const scriptLoaded = await loadPaystackScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load Paystack")
      }

      const amount = paymentPlan === "full" ? discountedPrice : installmentAmount
      const reference = generatePaymentRef()

      const config: PaystackConfig = {
        key: PAYSTACK_PUBLIC_KEY,
        email: customerInfo.email,
        amount: amount * 100, // Convert to kobo
        currency: "NGN",
        ref: reference,
        callback: (response: PaystackResponse) => {
          console.log("Payment successful:", response)
          setIsProcessing(false)
          onSuccess?.(response.reference)
        },
        onClose: () => {
          setIsProcessing(false)
          console.log("Payment cancelled")
        },
        metadata: {
          custom_fields: [
            {
              display_name: "Course",
              variable_name: "course_id",
              value: course.id,
            },
            {
              display_name: "Payment Plan",
              variable_name: "payment_plan",
              value: paymentPlan,
            },
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: `${customerInfo.firstName} ${customerInfo.lastName}`,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: customerInfo.phone,
            },
          ],
        },
      }

      const popup = (window as any).PaystackPop.setup(config)
      popup.openIframe()
    } catch (error) {
      console.error("Payment error:", error)
      setIsProcessing(false)
      alert("Payment failed. Please try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Course Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              {course.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{course.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <Badge variant="secondary">{course.category}</Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What You'll Get:</h4>
              <ul className="space-y-2">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Indicators */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Money-Back Guarantee</span>
              </div>
              <p className="text-sm text-green-700">
                Not satisfied after 30 days? Get a full refund. No questions asked.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Your Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Your Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Payment Plan Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold">Choose Payment Plan</h4>

              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentPlan === "full" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentPlan("full")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={paymentPlan === "full"} onChange={() => setPaymentPlan("full")} />
                        <span className="font-semibold">Pay in Full</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Save 10%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">One-time payment with discount</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{formatNaira(discountedPrice)}</div>
                      <div className="text-sm text-gray-500 line-through">{formatNaira(course.price)}</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentPlan === "installment" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentPlan("installment")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={paymentPlan === "installment"}
                          onChange={() => setPaymentPlan("installment")}
                        />
                        <span className="font-semibold">Monthly Installments</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">Pay over 6 months</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatNaira(installmentAmount)}/month</div>
                      <div className="text-sm text-gray-500">Total: {formatNaira(course.price)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-3">
              <h4 className="font-semibold">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span>{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Plan:</span>
                  <span>{paymentPlan === "full" ? "Pay in Full" : "Monthly Installments"}</span>
                </div>
                {paymentPlan === "full" && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%):</span>
                    <span>-{formatNaira(fullPaymentDiscount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>{paymentPlan === "installment" ? "First Payment:" : "Total:"}</span>
                  <span>{formatNaira(paymentPlan === "full" ? discountedPrice : installmentAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay with Paystack
                </>
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield className="h-4 w-4" />
                <span>Secured by Paystack</span>
              </div>
              <p>Your payment information is encrypted and secure</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

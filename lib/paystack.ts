"use client"

// Paystack configuration and utilities
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here"

export interface PaystackConfig {
  key: string
  email: string
  amount: number // Amount in kobo (multiply by 100)
  currency: string
  ref: string
  callback: (response: PaystackResponse) => void
  onClose: () => void
  metadata?: {
    custom_fields?: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
  }
}

export interface PaystackResponse {
  reference: string
  status: string
  trans: string
  transaction: string
  trxref: string
  redirecturl: string
}

export interface Course {
  id: string
  title: string
  price: number
  duration: string
  description: string
  features: string[]
  category: string
}

export interface PaymentPlan {
  id: string
  name: string
  totalAmount: number
  installments: number
  monthlyAmount: number
  description: string
}

export const courses: Course[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development Bootcamp",
    price: 180000,
    duration: "6 months",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB",
    features: [
      "Build 5 portfolio projects",
      "Personal mentor assigned",
      "Job placement support",
      "Lifetime access",
      "Certificate of completion",
    ],
    category: "Web Development",
  },
  {
    id: "ui-ux",
    title: "Digital Product Design Mastery",
    price: 150000,
    duration: "4 months",
    description: "Master Figma, User Research, Prototyping, and Design Systems",
    features: [
      "Design 3 mobile apps",
      "Build professional portfolio",
      "1-on-1 design reviews",
      "Industry mentor guidance",
      "Job placement guarantee",
    ],
    category: "UI/UX Design",
  },
  {
    id: "data-science",
    title: "Data Science for Business",
    price: 200000,
    duration: "5 months",
    description: "Learn Python, SQL, Machine Learning, and Data Visualization",
    features: [
      "Analyze real business data",
      "Create AI models",
      "Portfolio of 4 projects",
      "Industry certification",
      "Remote job placement",
    ],
    category: "Data Science",
  },
  {
    id: "digital-marketing",
    title: "Social Media Marketing Pro",
    price: 100000,
    duration: "3 months",
    description: "Master Facebook Ads, Instagram Marketing, and Content Strategy",
    features: [
      "Manage 5 real client campaigns",
      "Build marketing portfolio",
      "Agency setup guidance",
      "Client acquisition strategies",
      "Ongoing support community",
    ],
    category: "Digital Marketing",
  },
]

export const paymentPlans: PaymentPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    totalAmount: 50000,
    installments: 1,
    monthlyAmount: 50000,
    description: "Perfect for testing the waters",
  },
  {
    id: "professional",
    name: "Professional Plan",
    totalAmount: 180000,
    installments: 6,
    monthlyAmount: 30000,
    description: "Most popular - Complete transformation",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    totalAmount: 300000,
    installments: 6,
    monthlyAmount: 50000,
    description: "Best value - Full career transformation",
  },
]

// Generate unique payment reference
export const generatePaymentRef = () => {
  return `spacehub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Format amount to Naira
export const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Load Paystack script
export const loadPaystackScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.head.appendChild(script)
  })
}

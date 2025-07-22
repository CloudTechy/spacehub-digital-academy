"use client"

// Paystack configuration and utilities
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""

export interface PaystackConfig {
  key: string
  email: string
  amount: number
  currency?: string
  ref?: string
  callback: (response: PaystackResponse) => void
  onClose?: () => void
  metadata?: {
    custom_fields?: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
    [key: string]: any
  }
}

export interface PaystackResponse {
  reference: string
  status: string
  message: string
  trans: string
  transaction: string
  trxref: string
  redirecturl: string
}

// Paystack popup handler
export function initializePaystack(config: PaystackConfig) {
  if (typeof window === "undefined") {
    console.error("Paystack can only be initialized in the browser")
    return
  }

  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.onload = () => {
      if (window.PaystackPop) {
        const handler = window.PaystackPop.setup(config)
        handler.openIframe()
      }
    }
    document.head.appendChild(script)
  } else {
    const handler = window.PaystackPop.setup(config)
    handler.openIframe()
  }
}

// Generate payment reference
export function generatePaymentReference(prefix = "spacehub"): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}_${timestamp}_${random}`
}

// Generate unique payment reference (alias for compatibility)
export const generatePaymentRef = generatePaymentReference

// Format amount for Paystack (convert to kobo)
export function formatAmountForPaystack(amount: number): number {
  return Math.round(amount * 100) // Convert naira to kobo
}

// Format amount for display
export function formatAmountForDisplay(amount: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format amount to Naira (main export that was missing)
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

// Initialize Paystack payment
export async function initializePayment(config: Omit<PaystackConfig, "key">) {
  try {
    const scriptLoaded = await loadPaystackScript()
    if (!scriptLoaded) {
      throw new Error("Failed to load Paystack")
    }

    const paymentConfig: PaystackConfig = {
      key: PAYSTACK_PUBLIC_KEY,
      ...config,
    }

    const popup = (window as any).PaystackPop.setup(paymentConfig)
    popup.openIframe()

    return { success: true }
  } catch (error) {
    console.error("Payment initialization error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Payment hook for React components
export function usePaystack() {
  const makePayment = async (
    amount: number,
    email: string,
    metadata: any = {},
    onSuccess?: (response: PaystackResponse) => void,
    onClose?: () => void,
  ) => {
    const reference = generatePaymentRef()

    return await initializePayment({
      email,
      amount: amount * 100, // Convert to kobo
      currency: "NGN",
      ref: reference,
      callback: (response) => {
        console.log("Payment successful:", response)
        onSuccess?.(response)
      },
      onClose: () => {
        console.log("Payment cancelled")
        onClose?.()
      },
      metadata: {
        custom_fields: Object.entries(metadata).map(([key, value]) => ({
          display_name: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          variable_name: key,
          value: String(value),
        })),
      },
    })
  }

  return { makePayment, formatNaira, generatePaymentRef }
}

// Verify payment on server
export async function verifyPayment(reference: string): Promise<{
  success: boolean
  data?: any
  error?: string
}> {
  try {
    const response = await fetch(`/api/payments/verify/${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Payment verification failed",
      }
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return {
      success: false,
      error: "Network error during payment verification",
    }
  }
}

// Declare global PaystackPop interface
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => {
        openIframe: () => void
      }
    }
  }
}

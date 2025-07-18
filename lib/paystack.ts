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
    return { success: false, error: error.message }
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

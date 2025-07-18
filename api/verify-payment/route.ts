import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    // Verify payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to verify payment" }, { status: 400 })
    }

    if (data.status && data.data.status === "success") {
      // Payment is successful
      // Here you would typically:
      // 1. Save the transaction to your database
      // 2. Create user account or update existing account
      // 3. Grant access to the course
      // 4. Send welcome email
      // 5. Add user to WhatsApp group

      const paymentData = {
        reference: data.data.reference,
        amount: data.data.amount / 100, // Convert from kobo to naira
        currency: data.data.currency,
        customer: data.data.customer,
        metadata: data.data.metadata,
        status: data.data.status,
        paid_at: data.data.paid_at,
      }

      // TODO: Implement your business logic here
      console.log("Payment verified successfully:", paymentData)

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: paymentData,
      })
    } else {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

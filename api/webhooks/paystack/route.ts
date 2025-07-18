import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import crypto from "crypto"

const sql = neon(process.env.DATABASE_URL!)
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    // Verify webhook signature
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(body).digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === "charge.success") {
      const { reference, status, amount } = event.data

      // Update enrollment payment status
      await sql`
        UPDATE enrollments 
        SET payment_status = 'completed'
        WHERE payment_reference = ${reference}
      `

      // Log the payment
      await sql`
        INSERT INTO payments (reference, amount, status, provider_response)
        VALUES (${reference}, ${amount}, ${status}, ${JSON.stringify(event.data)})
        ON CONFLICT (reference) DO UPDATE SET
          status = ${status},
          provider_response = ${JSON.stringify(event.data)},
          updated_at = NOW()
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

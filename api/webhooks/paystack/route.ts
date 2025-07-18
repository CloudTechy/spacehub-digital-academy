import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    if (!signature || !PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Missing signature or secret key" }, { status: 400 })
    }

    // Verify webhook signature
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(body).digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.event) {
      case "charge.success":
        await handleSuccessfulPayment(event.data)
        break

      case "charge.failed":
        await handleFailedPayment(event.data)
        break

      case "subscription.create":
        await handleSubscriptionCreated(event.data)
        break

      default:
        console.log(`Unhandled event type: ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleSuccessfulPayment(data: any) {
  console.log("Processing successful payment:", data)

  // Extract payment information
  const { reference, amount, customer, metadata, paid_at } = data

  // TODO: Implement your business logic:
  // 1. Save transaction to database
  // 2. Create/update user account
  // 3. Grant course access
  // 4. Send welcome email
  // 5. Add to WhatsApp group
  // 6. Notify mentors

  try {
    // Example: Save to database
    // await saveTransaction({
    //   reference,
    //   amount: amount / 100, // Convert from kobo
    //   customer_email: customer.email,
    //   course_id: metadata.custom_fields.find(f => f.variable_name === 'course_id')?.value,
    //   payment_plan: metadata.custom_fields.find(f => f.variable_name === 'payment_plan')?.value,
    //   status: 'completed',
    //   paid_at: new Date(paid_at)
    // })

    // Example: Send welcome email
    // await sendWelcomeEmail({
    //   email: customer.email,
    //   name: metadata.custom_fields.find(f => f.variable_name === 'full_name')?.value,
    //   course: metadata.custom_fields.find(f => f.variable_name === 'course_id')?.value
    // })

    console.log(`Payment processed successfully for ${customer.email}`)
  } catch (error) {
    console.error("Error processing successful payment:", error)
  }
}

async function handleFailedPayment(data: any) {
  console.log("Processing failed payment:", data)

  // TODO: Handle failed payment
  // 1. Log the failure
  // 2. Notify customer
  // 3. Update payment status
}

async function handleSubscriptionCreated(data: any) {
  console.log("Processing subscription created:", data)

  // TODO: Handle subscription for installment payments
  // 1. Set up recurring billing
  // 2. Schedule payment reminders
  // 3. Track subscription status
}

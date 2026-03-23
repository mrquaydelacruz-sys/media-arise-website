import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'
import {MEDIA_ARISE_INITIATIVE} from '@/lib/fellowship-donation'

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(secretKey, {
    apiVersion: '2026-02-25.clover',
  })
}

/**
 * Register this URL in Stripe Dashboard → Webhooks.
 * Use the signing secret for this endpoint as STRIPE_WEBHOOK_SECRET (never commit it).
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      {error: 'Missing stripe-signature header'},
      {status: 400},
    )
  }

  let event: Stripe.Event

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Verification failed'
    console.error('[stripe/webhook] Signature verification failed:', msg)
    return NextResponse.json({error: `Webhook Error: ${msg}`}, {status: 400})
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const initiative = session.metadata?.initiative
      if (initiative !== MEDIA_ARISE_INITIATIVE) {
        console.log(
          '[stripe/webhook] Ignoring checkout.session.completed (not Media Arise donation)',
          session.id,
        )
        break
      }
      console.log(
        '[stripe/webhook] Media Arise donation completed',
        session.id,
        session.amount_total,
        session.currency,
      )
      break
    }
    default:
      console.log(`[stripe/webhook] Received ${event.type} (${event.id})`)
  }

  return NextResponse.json({received: true})
}

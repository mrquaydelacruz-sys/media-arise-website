import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'
import {
  CHECKOUT_PRODUCT_DESCRIPTION,
  CHECKOUT_PRODUCT_NAME,
  fellowshipDonationMetadata,
} from '@/lib/fellowship-donation'

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(secretKey, {
    apiVersion: '2026-02-25.clover',
  })
}

const MIN_CENTS = 100
const MAX_CENTS = 1_000_000_00

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    const body = await request.json()
    const amountCents = Math.round(Number(body.amountCents))
    const currency = String(
      body.currency || process.env.NEXT_PUBLIC_DONATION_CURRENCY || 'cad',
    )
      .toLowerCase()
      .trim()

    if (!Number.isFinite(amountCents) || amountCents < MIN_CENTS) {
      return NextResponse.json(
        {error: 'Minimum donation is $1.00'},
        {status: 400},
      )
    }
    if (amountCents > MAX_CENTS) {
      return NextResponse.json({error: 'Amount is too large'}, {status: 400})
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || ''
    if (!siteUrl) {
      return NextResponse.json(
        {error: 'NEXT_PUBLIC_SITE_URL is not configured'},
        {status: 500},
      )
    }

    const metadata: Record<string, string> = {...fellowshipDonationMetadata}

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amountCents,
            product_data: {
              name: CHECKOUT_PRODUCT_NAME,
              description: CHECKOUT_PRODUCT_DESCRIPTION,
              metadata: {
                ...metadata,
              },
            },
          },
        },
      ],
      custom_text: {
        submit: {
          message:
            'This charge is a donation to Media Arise ministry. It is processed by StoryCruz Films via Stripe and is separate from video production invoices.',
        },
      },
      metadata,
      payment_intent_data: {
        metadata,
        // Bank/card statement: keep Media Arise visible alongside the StoryCruz Stripe account name
        statement_descriptor_suffix: 'MEDIA ARISE',
      },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate?canceled=1`,
    })

    return NextResponse.json({url: session.url})
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to create checkout session'
    console.error('[create-donation-checkout]', error)
    return NextResponse.json({error: message}, {status: 500})
  }
}

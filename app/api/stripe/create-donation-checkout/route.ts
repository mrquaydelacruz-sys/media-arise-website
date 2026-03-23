import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'
import {
  CHECKOUT_PRODUCT_DESCRIPTION,
  CHECKOUT_PRODUCT_NAME,
  fellowshipDonationMetadata,
} from '@/lib/fellowship-donation'
import {getPublicSiteUrl} from '@/lib/site-url'

const isDev = process.env.NODE_ENV === 'development'

function getStripe(secretKey: string) {
  return new Stripe(secretKey, {
    apiVersion: '2026-02-25.clover',
  })
}

/** Avoid exposing env/config details to donors (security + UX). */
function safeCheckoutError(internalHint: string, devMessage: string) {
  console.error(`[create-donation-checkout] ${internalHint}`)
  return NextResponse.json(
    {
      error: isDev
        ? devMessage
        : 'Card giving is not available right now. Please use PayPal, e-transfer, or Wise on our Giving page, or try again later.',
    },
    {status: 503},
  )
}

const MIN_CENTS = 100
const MAX_CENTS = 1_000_000_00

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim()
    if (!secretKey) {
      return safeCheckoutError(
        'STRIPE_SECRET_KEY missing',
        'STRIPE_SECRET_KEY is not configured — add it to .env.local (see .env.example).',
      )
    }
    const stripe = getStripe(secretKey)
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

    const siteUrl = getPublicSiteUrl()
    if (!siteUrl) {
      return safeCheckoutError(
        'Public site URL missing (NEXT_PUBLIC_SITE_URL or VERCEL_URL)',
        'Set NEXT_PUBLIC_SITE_URL in .env.local (e.g. http://localhost:3000). On Vercel, add NEXT_PUBLIC_SITE_URL to match your live domain, or rely on automatic VERCEL_URL.',
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
            'This charge is a donation to Media Arise ministry, processed securely by Stripe.',
        },
      },
      metadata,
      payment_intent_data: {
        metadata,
        statement_descriptor_suffix: 'MEDIA ARISE',
      },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate?canceled=1`,
    })

    return NextResponse.json({url: session.url})
  } catch (error: unknown) {
    console.error('[create-donation-checkout]', error)
    const message =
      error instanceof Error ? error.message : 'Failed to create checkout session'
    return NextResponse.json(
      {
        error: isDev
          ? message
          : 'Could not start checkout. Please try again in a moment or use another giving option.',
      },
      {status: 500},
    )
  }
}

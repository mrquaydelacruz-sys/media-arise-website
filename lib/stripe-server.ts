import Stripe from 'stripe'
import {MEDIA_ARISE_INITIATIVE} from '@/lib/fellowship-donation'

const API_VERSION = '2026-02-25.clover' as const

export function getStripeServer(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) return null
  return new Stripe(key, {apiVersion: API_VERSION})
}

export type DonationVerification =
  | {
      status: 'verified'
      amountFormatted: string
      sessionId: string
    }
  | {
      status:
        | 'no_session_id'
        | 'no_stripe_key'
        | 'not_found'
        | 'not_paid'
        | 'not_media_arise_donation'
        | 'error'
    }

/**
 * Confirms with Stripe’s API that this Checkout Session is paid and tagged as a Media Arise
 * donation (webhook remains the source of truth for your records).
 */
export async function verifyDonationCheckoutSession(
  sessionId: string,
): Promise<DonationVerification> {
  const stripe = getStripeServer()
  if (!stripe) {
    return {status: 'no_stripe_key'}
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.metadata?.initiative !== MEDIA_ARISE_INITIATIVE) {
      return {status: 'not_media_arise_donation'}
    }

    if (session.payment_status !== 'paid') {
      return {status: 'not_paid'}
    }

    const total = session.amount_total ?? 0
    const currency = (session.currency || 'cad').toUpperCase()
    const amountFormatted = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
    }).format(total / 100)

    return {
      status: 'verified',
      amountFormatted,
      sessionId: session.id,
    }
  } catch (err) {
    console.error('[verifyDonationCheckoutSession]', err)
    return {status: 'not_found'}
  }
}

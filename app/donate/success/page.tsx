import type {ReactNode} from 'react'
import Link from 'next/link'
import {verifyDonationCheckoutSession} from '@/lib/stripe-server'

export const metadata = {
  title: 'Thank you — Media Arise',
  description: 'Your donation to Media Arise.',
}

export const dynamic = 'force-dynamic'

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: {session_id?: string}
}) {
  const sessionId = searchParams.session_id
    ? String(searchParams.session_id).trim()
    : ''

  if (!sessionId) {
    return (
      <SuccessShell variant="neutral">
        <h1 className="mb-3 text-2xl font-bold text-gray-900">Thank you</h1>
        <p className="mb-6 text-gray-600">
          This page is shown after a completed card donation. If you used another way to give or
          reached this page directly, your gift may still be processing—check your email for a
          receipt from Stripe.
        </p>
        <BackLinks />
      </SuccessShell>
    )
  }

  const verification = await verifyDonationCheckoutSession(sessionId)

  if (verification.status === 'verified') {
    const ref = verification.sessionId.slice(-12)
    return (
      <SuccessShell variant="success">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          aria-hidden
        >
          <svg
            className="h-9 w-9 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-800">
          Payment confirmed
        </p>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Thank you for your gift</h1>
        <p className="mb-2 text-gray-700">
          Stripe has confirmed your donation of{' '}
          <strong className="font-semibold text-gray-900">{verification.amountFormatted}</strong> to{' '}
          <strong className="font-semibold text-gray-900">Media Arise</strong>.
        </p>
        <p className="mb-8 text-sm text-gray-600">
          You should receive a receipt by email shortly. If you don&apos;t see it, check your spam
          folder.
        </p>
        <p className="mb-8 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
          Reference ending in …{ref}
        </p>
        <BackLinks />
      </SuccessShell>
    )
  }

  const problemCopy =
    verification.status === 'not_paid'
      ? 'This payment is not yet marked as completed in Stripe. If you just finished checkout, wait a minute and refresh; otherwise check your email or contact us.'
      : verification.status === 'not_media_arise_donation'
        ? 'This session is not linked to a Media Arise donation. If you believe this is a mistake, contact us with your receipt.'
        : verification.status === 'no_stripe_key'
          ? 'We could not verify this payment on the server right now. If you received a Stripe receipt, your donation was still processed.'
          : 'We could not verify this checkout session. If you were charged, check your email for a Stripe receipt or contact us.'

  return (
    <SuccessShell variant="warning">
      <h1 className="mb-3 text-2xl font-bold text-gray-900">We couldn&apos;t confirm this page</h1>
      <p className="mb-6 text-gray-600">{problemCopy}</p>
      <BackLinks />
    </SuccessShell>
  )
}

function SuccessShell({
  variant,
  children,
}: {
  variant: 'success' | 'warning' | 'neutral'
  children: ReactNode
}) {
  const bg = variant === 'warning' ? 'bg-amber-50' : 'bg-gray-50'
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center px-4 py-16 ${bg}`}>
      <div className="max-w-md text-center">{children}</div>
    </main>
  )
}

function BackLinks() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Link
        href="/"
        className="inline-block rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-900"
      >
        Back to home
      </Link>
      <Link href="/donate" className="text-sm font-medium text-gray-700 underline hover:text-gray-900">
        Donate again
      </Link>
    </div>
  )
}

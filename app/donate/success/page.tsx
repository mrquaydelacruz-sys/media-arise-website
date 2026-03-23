import Link from 'next/link'

export const metadata = {
  title: 'Thank you — Media Arise',
  description: 'Your donation was received.',
}

export default function DonateSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-900">Thank you</h1>
        <p className="mb-8 text-gray-600">
          Your gift to Media Arise is appreciated. Your receipt may show StoryCruz Films as the
          processor; the line item describes your Media Arise ministry donation.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-900"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

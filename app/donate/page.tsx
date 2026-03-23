import DonateForm from './DonateForm'

export const metadata = {
  title: 'Donate — Media Arise',
  description: 'Support Media Arise ministry with a secure donation via Stripe.',
}

export default function DonatePage({
  searchParams,
}: {
  searchParams: {canceled?: string}
}) {
  const currency = process.env.NEXT_PUBLIC_DONATION_CURRENCY || 'cad'

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">Donate</h1>
        <p className="mx-auto mb-10 max-w-lg text-center text-gray-600">
          Thank you for partnering with Media Arise. Online gifts go to{' '}
          <strong className="font-semibold text-gray-800">Media Arise ministry</strong> and are
          processed securely through Stripe under{' '}
          <strong className="font-semibold text-gray-800">StoryCruz Films</strong> (the same
          account used for video production billing—your donation is labeled separately and is not
          an invoice payment). You will receive a receipt by email.
        </p>
        <DonateForm currency={currency} />
        {searchParams.canceled === '1' ? (
          <p className="mt-8 text-center text-sm text-gray-500">
            Checkout was canceled. You can try again anytime.
          </p>
        ) : null}
      </div>
    </main>
  )
}

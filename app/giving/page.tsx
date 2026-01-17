'use client'

import Script from 'next/script'

export default function GivingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Giving</h1>
        <p className="text-gray-700 mb-8">
          Your generosity helps us continue spreading the Gospel and supporting our community.
          Thank you for your faithful giving.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <Script
            src="https://donorbox.org/widgets.js"
            type="module"
            strategy="lazyOnload"
          />
          <dbox-widget
            campaign="media-arise-tithes-and-offering"
            type="donation_form"
            interval="1 M"
            enable-auto-scroll="true"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why We Give</h2>
          <blockquote className="border-l-4 border-black pl-6 my-4 italic text-gray-700">
            <p className="mb-2">&quot;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&quot;</p>
            <cite className="text-sm text-gray-600">— 2 Corinthians 9:7 (NIV)</cite>
          </blockquote>
          <p className="text-gray-700 mt-4">
            Giving is an act of worship and obedience to God. Your tithes and offerings support
            our ministry, outreach programs, and help us spread the love of Jesus to others.
          </p>
        </div>
      </div>
    </main>
  )
}

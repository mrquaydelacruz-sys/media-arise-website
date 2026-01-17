'use client'

import Script from 'next/script'

interface GivingData {
  title?: string
  description?: string
  donorboxCampaign?: string
  donorboxInterval?: string
  whyWeGiveTitle?: string
  bibleVerse?: string
  bibleVerseReference?: string
  whyWeGiveDescription?: string
}

interface GivingContentProps {
  data: GivingData | null
}

export default function GivingContent({data}: GivingContentProps) {
  // Default values if Sanity data is not available
  const title = data?.title || 'Giving'
  const description = data?.description || 'Your generosity helps us continue spreading the Gospel and supporting our community. Thank you for your faithful giving.'
  const donorboxCampaign = data?.donorboxCampaign || 'media-arise-tithes-and-offering'
  const donorboxInterval = data?.donorboxInterval || '1 M'
  const whyWeGiveTitle = data?.whyWeGiveTitle || 'Why We Give'
  const bibleVerse = data?.bibleVerse || 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.'
  const bibleVerseReference = data?.bibleVerseReference || '2 Corinthians 9:7 (NIV)'
  const whyWeGiveDescription = data?.whyWeGiveDescription || 'Giving is an act of worship and obedience to God. Your tithes and offerings support our ministry, outreach programs, and help us spread the love of Jesus to others.'

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-700 mb-8">{description}</p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <Script
            src="https://donorbox.org/widgets.js"
            type="module"
            strategy="lazyOnload"
          />
          <dbox-widget
            campaign={donorboxCampaign}
            type="donation_form"
            interval={donorboxInterval}
            enable-auto-scroll="true"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{whyWeGiveTitle}</h2>
          <blockquote className="border-l-4 border-black pl-6 my-4 italic text-gray-700">
            <p className="mb-2">&quot;{bibleVerse}&quot;</p>
            <cite className="text-sm text-gray-600">— {bibleVerseReference}</cite>
          </blockquote>
          <p className="text-gray-700 mt-4">{whyWeGiveDescription}</p>
        </div>
      </div>
    </main>
  )
}

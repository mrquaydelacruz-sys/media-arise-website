'use client'

interface GivingData {
  title?: string
  description?: string
  whyWeGiveTitle?: string
  bibleVerse?: string
  bibleVerseReference?: string
  whyWeGiveDescription?: string
  paypalEnabled?: boolean
  paypalTitle?: string
  paypalDescription?: string
  paypalLink?: string
  paypalButtonText?: string
  etransferEnabled?: boolean
  etransferTitle?: string
  etransferDescription?: string
  etransferEmail?: string
  etransferComingSoon?: boolean
  wiseEnabled?: boolean
  wiseTitle?: string
  wiseDescription?: string
  wiseAccountName?: string
  wiseEmail?: string
  wiseAccountNumber?: string
  wiseRoutingNumber?: string
  wiseSwiftCode?: string
  wiseAdditionalInfo?: string
}

interface GivingContentProps {
  data: GivingData | null
}

export default function GivingContent({data}: GivingContentProps) {
  // Default values if Sanity data is not available
  const title = data?.title || 'Give'
  const description = data?.description || 'Your generosity helps us continue spreading the Gospel and supporting our community. Thank you for your faithful giving.'
  const whyWeGiveTitle = data?.whyWeGiveTitle || 'Why We Give'
  const bibleVerse = data?.bibleVerse || 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.'
  const bibleVerseReference = data?.bibleVerseReference || '2 Corinthians 9:7 (NIV)'
  const whyWeGiveDescription = data?.whyWeGiveDescription || 'Giving is an act of worship and obedience to God. Your tithes and offerings support our ministry, outreach programs, and help us spread the love of Jesus to others.'

  // PayPal defaults
  const paypalEnabled = data?.paypalEnabled ?? true
  const paypalTitle = data?.paypalTitle || 'PayPal'
  const paypalDescription = data?.paypalDescription || 'For those who want to use credit cards or international accounts.'
  const paypalLink = data?.paypalLink
  const paypalButtonText = data?.paypalButtonText || 'Give via PayPal'

  // E-transfer defaults
  const etransferEnabled = data?.etransferEnabled ?? true
  const etransferTitle = data?.etransferTitle || 'E-transfer (Canada)'
  const etransferDescription = data?.etransferDescription || 'For those within Canada.'
  const etransferEmail = data?.etransferEmail
  const etransferComingSoon = data?.etransferComingSoon ?? true

  // Wise defaults
  const wiseEnabled = data?.wiseEnabled ?? true
  const wiseTitle = data?.wiseTitle || 'Wise (International)'
  const wiseDescription = data?.wiseDescription || 'For international members who want to give larger amounts with low fees.'
  const wiseAccountName = data?.wiseAccountName
  const wiseEmail = data?.wiseEmail
  const wiseAccountNumber = data?.wiseAccountNumber
  const wiseRoutingNumber = data?.wiseRoutingNumber
  const wiseSwiftCode = data?.wiseSwiftCode
  const wiseAdditionalInfo = data?.wiseAdditionalInfo

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-700 mb-8">{description}</p>

        {/* Giving Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* PayPal Card */}
          {paypalEnabled && (
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-blue-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">{paypalTitle}</h2>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{paypalDescription}</p>
              {paypalLink ? (
                <a
                  href={paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                >
                  {paypalButtonText}
                </a>
              ) : (
                <span className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold text-center">
                  Coming Soon
                </span>
              )}
            </div>
          )}

          {/* E-transfer Card */}
          {etransferEnabled && (
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">{etransferTitle}</h2>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{etransferDescription}</p>
              {etransferComingSoon || !etransferEmail ? (
                <span className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold text-center">
                  Coming Soon
                </span>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Send e-Transfer to:</p>
                  <p className="font-semibold text-gray-900 break-all">{etransferEmail}</p>
                </div>
              )}
            </div>
          )}

          {/* Wise Card */}
          {wiseEnabled && (
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-emerald-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">{wiseTitle}</h2>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{wiseDescription}</p>
              {wiseAccountName || wiseEmail || wiseAccountNumber ? (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  {wiseAccountName && (
                    <div>
                      <span className="text-gray-600">Account Name: </span>
                      <span className="font-semibold text-gray-900">{wiseAccountName}</span>
                    </div>
                  )}
                  {wiseEmail && (
                    <div>
                      <span className="text-gray-600">Email: </span>
                      <span className="font-semibold text-gray-900 break-all">{wiseEmail}</span>
                    </div>
                  )}
                  {wiseAccountNumber && (
                    <div>
                      <span className="text-gray-600">Account #: </span>
                      <span className="font-semibold text-gray-900">{wiseAccountNumber}</span>
                    </div>
                  )}
                  {wiseRoutingNumber && (
                    <div>
                      <span className="text-gray-600">Routing #: </span>
                      <span className="font-semibold text-gray-900">{wiseRoutingNumber}</span>
                    </div>
                  )}
                  {wiseSwiftCode && (
                    <div>
                      <span className="text-gray-600">SWIFT/BIC: </span>
                      <span className="font-semibold text-gray-900">{wiseSwiftCode}</span>
                    </div>
                  )}
                  {wiseAdditionalInfo && (
                    <p className="text-gray-600 mt-2 pt-2 border-t border-gray-200">{wiseAdditionalInfo}</p>
                  )}
                </div>
              ) : (
                <span className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold text-center">
                  Coming Soon
                </span>
              )}
            </div>
          )}
        </div>

        {/* Why We Give Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
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

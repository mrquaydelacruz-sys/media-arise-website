/**
 * Stripe metadata + webhook filtering for Media Arise donations (main website).
 * Secrets stay in environment variables only — never commit keys.
 */
export const MEDIA_ARISE_INITIATIVE = 'media_arise_fellowship' as const

export const fellowshipDonationMetadata = {
  initiative: MEDIA_ARISE_INITIATIVE,
  business_line: 'media_arise_fellowship',
  donation_source: 'media_arise_website',
} as const

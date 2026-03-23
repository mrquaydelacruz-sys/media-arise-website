/**
 * Stripe metadata + webhook filtering for Media Arise donations (main website).
 * Metadata separates ministry donations from other Stripe flows (e.g. CRM invoice_id).
 */
export const MEDIA_ARISE_INITIATIVE = 'media_arise_fellowship' as const

export const fellowshipDonationMetadata = {
  initiative: MEDIA_ARISE_INITIATIVE,
  business_line: 'media_arise_fellowship',
  donation_source: 'media_arise_website',
  donation_recipient: 'media_arise_ministry',
} as const

/** Shown on Stripe Checkout line item */
export const CHECKOUT_PRODUCT_NAME = 'Media Arise — ministry donation' as const

export const CHECKOUT_PRODUCT_DESCRIPTION =
  'Voluntary gift for Media Arise ministry. Processed securely by Stripe.' as const

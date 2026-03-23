/**
 * Stripe metadata + webhook filtering for Media Arise donations (main website).
 * Same Stripe account as StoryCruz Films / video-production-manager; metadata and
 * checkout copy separate ministry donations from CRM invoices (invoice_id, etc.).
 */
export const MEDIA_ARISE_INITIATIVE = 'media_arise_fellowship' as const

/** Identifies the legal/Stripe merchant operator (StoryCruz Films) in Dashboard exports. */
export const STRIPE_OPERATOR_SLUG = 'storycruz_films' as const

export const fellowshipDonationMetadata = {
  initiative: MEDIA_ARISE_INITIATIVE,
  business_line: 'media_arise_fellowship',
  donation_source: 'media_arise_website',
  donation_recipient: 'media_arise_ministry',
  processed_by_merchant: STRIPE_OPERATOR_SLUG,
} as const

/** Shown on Stripe Checkout line item */
export const CHECKOUT_PRODUCT_NAME =
  'Media Arise — ministry donation (StoryCruz Films)' as const

export const CHECKOUT_PRODUCT_DESCRIPTION =
  'Voluntary gift for Media Arise ministry. Card processing by StoryCruz Films through Stripe — not a video production invoice or film deliverable payment.' as const

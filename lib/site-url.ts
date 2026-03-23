import type {NextRequest} from 'next/server'

/** Canonical production URL (no trailing slash). Used for OG metadata and Stripe redirects. */
export const OFFICIAL_SITE_URL = 'https://mediaarise.com' as const

/** Shown at the top of Stripe Checkout (overrides the account slug, e.g. storycruzfilms). */
export const STRIPE_CHECKOUT_DISPLAY_NAME = 'Media Arise' as const

/**
 * Public base URL for server-side redirects (Stripe success/cancel, etc.).
 *
 * Order: `NEXT_PUBLIC_SITE_URL` → Vercel preview `VERCEL_URL` → production uses
 * `OFFICIAL_SITE_URL` when on Vercel production without env → other `VERCEL_URL` →
 * non-Vercel production build → empty in local dev (set `.env.local`).
 */
export function getPublicSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '').trim()
  if (explicit) return explicit

  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    const v = process.env.VERCEL_URL.replace(/\/$/, '').trim()
    return v.startsWith('http') ? v : `https://${v}`
  }

  if (process.env.VERCEL_ENV === 'production') {
    return OFFICIAL_SITE_URL
  }

  if (process.env.VERCEL_URL) {
    const v = process.env.VERCEL_URL.replace(/\/$/, '').trim()
    return v.startsWith('http') ? v : `https://${v}`
  }

  if (process.env.NODE_ENV === 'production') {
    return OFFICIAL_SITE_URL
  }

  return ''
}

const CHECKOUT_ALLOWED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'mediaarise.com',
  'www.mediaarise.com',
])

function isAllowedCheckoutHost(hostname: string): boolean {
  if (CHECKOUT_ALLOWED_HOSTS.has(hostname)) return true
  if (hostname.endsWith('.vercel.app')) return true
  return false
}

/**
 * Base URL for Stripe success/cancel redirects. Prefer the browser's Origin so the return
 * host matches where the donor started (avoids www vs apex 404s and wrong-deployment hosts).
 */
export function resolveCheckoutSiteUrl(request: NextRequest): string {
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      const u = new URL(origin)
      if (
        isAllowedCheckoutHost(u.hostname) &&
        (u.protocol === 'https:' || u.protocol === 'http:')
      ) {
        return origin.replace(/\/$/, '')
      }
    } catch {
      /* ignore */
    }
  }
  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const u = new URL(referer)
      const okHttp =
        u.protocol === 'http:' &&
        (u.hostname === 'localhost' || u.hostname === '127.0.0.1')
      if (
        isAllowedCheckoutHost(u.hostname) &&
        (u.protocol === 'https:' || okHttp)
      ) {
        return `${u.protocol}//${u.host}`.replace(/\/$/, '')
      }
    } catch {
      /* ignore */
    }
  }
  return getPublicSiteUrl()
}

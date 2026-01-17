import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WebsiteAnnouncement from '@/components/WebsiteAnnouncement'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Media Arise - Online Fellowship & Community',
  description: 'Join our online fellowship sessions, stay updated with announcements, and discover upcoming events.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Media Arise - Online Fellowship & Community',
    description: 'Join our online fellowship sessions, stay updated with announcements, and discover upcoming events.',
    url: 'https://mediaarise.com',
    siteName: 'Media Arise',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Media Arise Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Arise - Online Fellowship & Community',
    description: 'Join our online fellowship sessions, stay updated with announcements, and discover upcoming events.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebsiteAnnouncement />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}

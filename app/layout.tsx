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

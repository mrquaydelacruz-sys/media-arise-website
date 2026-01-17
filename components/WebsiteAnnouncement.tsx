'use client'

import {useState, useEffect} from 'react'
import {createClient} from 'next-sanity'
import {websiteAnnouncementQuery} from '@/lib/queries'

// Create a client without CDN for fresh data
const announcementClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1bny7eub',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to get fresh data immediately
})

export default function WebsiteAnnouncement() {
  const [announcement, setAnnouncement] = useState<{
    enabled: boolean
    message: string
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders after client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only fetch after component has mounted on client
    if (!mounted) return

    async function fetchAnnouncement() {
      try {
        // Fetch without CDN to get fresh data immediately
        const data = await announcementClient.fetch(websiteAnnouncementQuery)
        console.log('Website announcement data:', data)
        console.log('Announcement enabled:', data?.enabled)
        console.log('Announcement message:', data?.message)
        
        if (data && data.enabled && data.message) {
          setAnnouncement(data)
          // Check if user has dismissed this announcement (only available on client)
          if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem('announcement-dismissed')
            console.log('LocalStorage dismissed flag:', dismissed)
            if (!dismissed) {
              setIsVisible(true)
              console.log('Setting announcement visible')
            } else {
              console.log('Announcement was previously dismissed')
            }
          }
        } else {
          console.log('Announcement not enabled or missing data:', { 
            enabled: data?.enabled, 
            hasMessage: !!data?.message,
            data: data 
          })
        }
      } catch (error) {
        console.error('Error fetching website announcement:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncement()
  }, [mounted])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    // Store dismissal in localStorage (optional - can remove if you want it to show every time)
    localStorage.setItem('announcement-dismissed', 'true')
  }

  // Don't render anything until component has mounted on client to prevent hydration mismatch
  if (!mounted || isLoading || !isVisible || !announcement) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close announcement"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pr-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Announcement
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{announcement.message}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

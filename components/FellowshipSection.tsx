'use client'

import {useState} from 'react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import {format} from 'date-fns'

interface FellowshipSession {
  _id: string
  title: string
  description?: string
  youtubeUrl: string
  youtubeId?: string
  thumbnailImage: any
  date: string
}

interface FellowshipSectionProps {
  session: FellowshipSession | null
}

export default function FellowshipSection({session}: FellowshipSectionProps) {
  const [showVideo, setShowVideo] = useState(false)

  if (!session) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No fellowship session available at this time.</p>
      </section>
    )
  }

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = session.youtubeId || getYouTubeId(session.youtubeUrl)

  // Build image URL with proper error handling
  let thumbnailUrl = ''
  if (session.thumbnailImage) {
    // First try direct asset URL if available from expanded query
    if (session.thumbnailImage.asset?.url) {
      thumbnailUrl = session.thumbnailImage.asset.url
    } else {
      // Otherwise use the image URL builder
      try {
        const builtUrl = urlFor(session.thumbnailImage)
          .width(800)
          .height(600)
          .url()
        thumbnailUrl = builtUrl || ''
      } catch (error) {
        console.error('Error building image URL:', error)
      }
    }
  }
  
  // Debug: log if image is missing
  if (session.thumbnailImage && !thumbnailUrl) {
    console.log('Thumbnail image data:', session.thumbnailImage)
  }

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      {!showVideo ? (
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-auto bg-gray-900">
            {session.thumbnailImage && thumbnailUrl ? (
              <>
                <Image
                  src={thumbnailUrl}
                  alt={session.title || 'Fellowship session thumbnail'}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    console.error('Image failed to load:', thumbnailUrl)
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all"
                     onClick={() => setShowVideo(true)}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowVideo(true)
                    }}
                    className="bg-black hover:bg-gray-800 text-white rounded-full p-6 transition-all transform hover:scale-110 shadow-xl"
                    aria-label="Play video"
                  >
                    <svg
                      className="w-16 h-16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">No thumbnail available</p>
                  {session.thumbnailImage && (
                    <p className="text-xs text-gray-500">
                      Image data present but URL not found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Latest Online Fellowship Session
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {session.title}
            </h3>
            {session.description && (
              <p className="text-gray-700 mb-6 leading-relaxed">
                {session.description}
              </p>
            )}
            {session.date && (
              <div className="flex items-center text-gray-600 mb-6">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={session.date}>
                  {format(new Date(session.date), 'MMMM dd, yyyy')}
                </time>
              </div>
            )}
            <button
              onClick={() => setShowVideo(true)}
              className="w-full md:w-auto px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-semibold shadow-md"
            >
              Watch Video
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={session.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </section>
  )
}

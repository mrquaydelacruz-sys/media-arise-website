'use client'

import {useEffect} from 'react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import {format} from 'date-fns'

interface MediaModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
  type: 'sermon' | 'recording' | 'podcast'
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function MediaModal({isOpen, onClose, item, type}: MediaModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !item) return null

  const videoId = item.youtubeId || getYouTubeId(item.youtubeUrl || '')
  const thumbnailUrl = item.thumbnailImage
    ? item.thumbnailImage.asset?.url ||
      urlFor(item.thumbnailImage).width(640).height(360).url()
    : videoId
    ? getYouTubeThumbnail(videoId)
    : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Player */}
        {videoId && (
          <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Content Info */}
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          
          {type === 'sermon' && item.speaker && (
            <p className="text-gray-300 mb-2">Speaker: {item.speaker}</p>
          )}
          
          {item.date && (
            <p className="text-gray-400 text-sm mb-4">
              {format(new Date(item.date), 'MMMM dd, yyyy')}
            </p>
          )}
          
          {item.description && (
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

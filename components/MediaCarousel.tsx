'use client'

import {useState, useRef} from 'react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'

interface MediaCarouselProps {
  items: any[]
  type: 'sermon' | 'recording' | 'podcast'
  onItemClick: (item: any) => void
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

export default function MediaCarousel({items, type, onItemClick}: MediaCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const updateScrollPosition = () => {
    if (!scrollContainerRef.current) return
    const position = scrollContainerRef.current.scrollLeft
    setScrollPosition(position)
    setShowLeftArrow(position > 0)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8 // Scroll 80% of container width
    const newPosition =
      direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount

    container.scrollTo({
      left: Math.max(0, newPosition),
      behavior: 'smooth',
    })
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No items available in this section.
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        onScroll={updateScrollPosition}
      >
        {items.map((item: any) => {
          const videoId = item.youtubeId || getYouTubeId(item.youtubeUrl || '')
          const thumbnailUrl = item.thumbnailImage
            ? item.thumbnailImage.asset?.url ||
              urlFor(item.thumbnailImage).width(640).height(360).url()
            : videoId
            ? getYouTubeThumbnail(videoId)
            : null

          return (
            <div
              key={item._id}
              className="flex-shrink-0 w-80 cursor-pointer group"
              onClick={() => onItemClick(item)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-gray-900">
                  {thumbnailUrl ? (
                    <>
                      <Image
                        src={thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized={
                          thumbnailUrl.includes('youtube.com') ||
                          thumbnailUrl.includes('cdn.sanity.io')
                        }
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                        <div className="bg-black rounded-full p-4 group-hover:scale-110 transition-transform">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <p className="text-gray-400">No thumbnail</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  {type === 'sermon' && item.speaker && (
                    <p className="text-sm text-gray-600">Speaker: {item.speaker}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
        aria-label="Scroll right"
      >
        <svg
          className="w-6 h-6 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

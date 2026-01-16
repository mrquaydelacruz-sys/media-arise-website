'use client'

import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import {format} from 'date-fns'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  location?: string
  image?: any
}

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({events}: EventsSectionProps) {
  if (!events || events.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Coming Up Events</h2>
        <p className="text-gray-500">No upcoming events scheduled at this time.</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Coming Up Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            {event.image && (
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={urlFor(event.image).width(600).height(400).url()}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <div className="space-y-2 mb-4">
                {event.date && (
                  <div className="flex items-center text-gray-600">
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
                    <time dateTime={event.date}>
                      {format(new Date(event.date), 'MMMM dd, yyyy h:mm a')}
                    </time>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center text-gray-600">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 line-clamp-3">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

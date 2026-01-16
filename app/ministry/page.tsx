import {client} from '@/lib/sanity.client'
import {ministriesQuery} from '@/lib/queries'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import {format} from 'date-fns'

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata = {
  title: 'Ministry - Media Arise',
  description: 'Explore our ongoing ministries and their progress.',
}

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'planning':
      return 'bg-blue-100 text-blue-800 border-blue-300'
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'completed':
      return 'bg-gray-100 text-gray-800 border-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Active/Ongoing'
    case 'planning':
      return 'Planning'
    case 'paused':
      return 'Paused'
    case 'completed':
      return 'Completed'
    default:
      return status
  }
}

async function getMinistries() {
  try {
    const ministries = await client.fetch(ministriesQuery)
    return ministries || []
  } catch (error) {
    console.error('Error fetching ministries:', error)
    return []
  }
}

export default async function MinistryPage() {
  const ministries = await getMinistries()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Ministries</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We are actively engaged in multiple ministries, each focused on spreading the Gospel 
            and serving our community. Below you can see our ongoing work and track the progress 
            of each ministry.
          </p>
        </div>

        {ministries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No ministries are currently displayed.</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back soon or contact us to learn more about our work.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ministries.map((ministry: any) => {
              const imageUrl = ministry.image
                ? ministry.image.asset?.url ||
                  urlFor(ministry.image).width(800).height(600).url()
                : null

              return (
                <div
                  key={ministry._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  {imageUrl && (
                    <div className="relative w-full h-64 bg-gray-200">
                      <Image
                        src={imageUrl}
                        alt={ministry.title}
                        fill
                        className="object-cover"
                        unoptimized={imageUrl.includes('cdn.sanity.io')}
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {/* Header with Title and Status */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex-1">
                        {ministry.title}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getStatusColor(
                          ministry.status
                        )}`}
                      >
                        {getStatusLabel(ministry.status)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {ministry.description}
                    </p>

                    {/* Full Description (if available) */}
                    {ministry.fullDescription && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {ministry.fullDescription}
                      </p>
                    )}

                    {/* Progress Bar */}
                    {ministry.progress !== undefined && ministry.progress !== null && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {ministry.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              ministry.status === 'completed'
                                ? 'bg-green-500'
                                : ministry.status === 'active'
                                ? 'bg-blue-500'
                                : ministry.status === 'paused'
                                ? 'bg-yellow-500'
                                : 'bg-gray-400'
                            }`}
                            style={{width: `${Math.min(100, Math.max(0, ministry.progress))}%`}}
                          />
                        </div>
                        {ministry.progressDescription && (
                          <p className="text-sm text-gray-600 italic">
                            {ministry.progressDescription}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Dates */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2 border-t border-gray-200">
                      {ministry.dateStarted && (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
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
                          <span>Started: {format(new Date(ministry.dateStarted), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                      {ministry.dateCompleted && (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Completed: {format(new Date(ministry.dateCompleted), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

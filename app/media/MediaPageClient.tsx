'use client'

import {useState} from 'react'
import MediaCarousel from '@/components/MediaCarousel'
import MediaModal from '@/components/MediaModal'

export default function MediaPageClient({
  pastSermons,
  recordings,
  podcasts,
}: {
  pastSermons: any[]
  recordings: any[]
  podcasts: any[]
}) {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<'sermon' | 'recording' | 'podcast' | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: any, type: 'sermon' | 'recording' | 'podcast') => {
    setSelectedItem(item)
    setSelectedType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setSelectedType(null)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Media</h1>

        {/* Past Sermons Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Past Sermons</h2>
            {pastSermons.length === 0 && (
              <span className="text-sm text-gray-500">
                No sermons yet. Add them in Sanity CMS.
              </span>
            )}
          </div>
          <MediaCarousel
            items={pastSermons}
            type="sermon"
            onItemClick={(item) => handleItemClick(item, 'sermon')}
          />
        </section>

        {/* Full Session Recordings Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Full Session Recordings</h2>
            {recordings.length === 0 && (
              <span className="text-sm text-gray-500">
                No recordings yet. Add them in Sanity CMS.
              </span>
            )}
          </div>
          <MediaCarousel
            items={recordings}
            type="recording"
            onItemClick={(item) => handleItemClick(item, 'recording')}
          />
        </section>

        {/* Podcast Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Podcast</h2>
            {podcasts.length === 0 && (
              <span className="text-sm text-gray-500">
                No podcasts yet. Add them in Sanity CMS.
              </span>
            )}
          </div>
          <MediaCarousel
            items={podcasts}
            type="podcast"
            onItemClick={(item) => handleItemClick(item, 'podcast')}
          />
        </section>
      </div>

      {/* Modal */}
      {selectedItem && selectedType && (
        <MediaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          item={selectedItem}
          type={selectedType}
        />
      )}
    </main>
  )
}

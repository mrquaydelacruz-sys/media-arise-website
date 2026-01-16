'use client'

import {format} from 'date-fns'

interface Announcement {
  _id: string
  title: string
  content: string
  date: string
  priority: number
}

interface AnnouncementsSectionProps {
  announcements: Announcement[]
}

export default function AnnouncementsSection({
  announcements,
}: AnnouncementsSectionProps) {
  if (!announcements || announcements.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Announcements</h2>
        <p className="text-gray-500">No announcements at this time.</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Announcements</h2>
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="border-l-4 border-black pl-6 py-4 bg-gray-50 rounded-r-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {announcement.title}
              </h3>
              {announcement.date && (
                <time
                  dateTime={announcement.date}
                  className="text-sm text-gray-500 ml-4 whitespace-nowrap"
                >
                  {format(new Date(announcement.date), 'MMM dd, yyyy')}
                </time>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

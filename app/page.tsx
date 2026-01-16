import {client} from '@/lib/sanity.client'
import {
  latestFellowshipSessionQuery,
  announcementsQuery,
  upcomingEventsQuery,
} from '@/lib/queries'
import FellowshipSection from '@/components/FellowshipSection'
import AnnouncementsSection from '@/components/AnnouncementsSection'
import EventsSection from '@/components/EventsSection'

export const revalidate = 60 // Revalidate every 60 seconds

async function getData() {
  try {
    const [fellowshipSession, announcements, events] = await Promise.all([
      client.fetch(latestFellowshipSessionQuery).catch(() => null),
      client.fetch(announcementsQuery).catch(() => []),
      client.fetch(upcomingEventsQuery).catch(() => []),
    ])

    return {
      fellowshipSession,
      announcements: announcements || [],
      events: events || [],
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      fellowshipSession: null,
      announcements: [],
      events: [],
    }
  }
}

export default async function Home() {
  const {fellowshipSession, announcements, events} = await getData()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Fellowship Section */}
        <FellowshipSection session={fellowshipSession} />

        {/* Announcements Section */}
        <AnnouncementsSection announcements={announcements} />

        {/* Events Section */}
        <EventsSection events={events} />
      </div>
    </main>
  )
}

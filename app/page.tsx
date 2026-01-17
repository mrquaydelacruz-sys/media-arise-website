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

          {/* Get Involved Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Involved</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <a
                  href="/giving"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black">Giving</span>
                </a>

                <a
                  href="/baptism"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black">Get Baptized</span>
                </a>

                <a
                  href="/small-groups"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black text-center">Join a Small Group</span>
                </a>

                <a
                  href="/serve"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black">Serve</span>
                </a>

                <a
                  href="/outreach"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black">Outreach</span>
                </a>

                <a
                  href="/contact"
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-3xl mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-black">Contact</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
  )
}

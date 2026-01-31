import {client} from '@/lib/sanity.client'
import {registrationForParticipantQuery} from '@/lib/queries'
import Link from 'next/link'
import SessionCard from './SessionCard'

export const metadata = {
  title: 'Participant - Session Recaps & Attendance | Media Arise',
  description: 'View session recaps and attendance for your program.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getParticipantData(id: string | undefined) {
  if (!id) return null
  try {
    const data = await client.fetch(registrationForParticipantQuery, {id})
    return data
  } catch {
    return null
  }
}

export default async function ParticipantPage({
  searchParams,
}: {
  searchParams: {id?: string}
}) {
  const id = searchParams?.id

  const registration = await getParticipantData(id)

  if (!registration || !registration.program) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid or expired link</h1>
            <p className="text-gray-600 mb-6">
              This participant link is invalid or has expired. If you registered for a program, please use the link that was shown or sent to you after registration.
            </p>
            <Link
              href="/register"
              className="inline-block px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Register
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const program = registration.program
  const sessions = program.sessions || []
  const allRegistrants = program.allRegistrants || []

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.title}</h1>
          <p className="text-gray-600">
            Session recaps and attendance. Welcome, {registration.firstName}.
          </p>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">
              No sessions have been added yet. Recaps and attendance will appear here once they are available.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sessions.map((session: {label?: string; sessionDate?: string; recapYoutubeUrl?: string; attended?: {_id: string; firstName?: string; lastName?: string}[]}, index: number) => (
              <SessionCard
                key={index}
                session={session}
                allRegistrants={allRegistrants}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            ← Back to Register
          </Link>
        </div>
      </div>
    </main>
  )
}

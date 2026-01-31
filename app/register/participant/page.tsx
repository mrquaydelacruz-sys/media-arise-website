import {client} from '@/lib/sanity.client'
import {registrationForParticipantQuery} from '@/lib/queries'
import Link from 'next/link'
import {format} from 'date-fns'

export const metadata = {
  title: 'Participant - Session Recaps & Attendance | Media Arise',
  description: 'View session recaps and your attendance for your program.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

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
  const registrationId = registration._id

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.title}</h1>
          <p className="text-gray-600">
            Session recaps and your attendance. Welcome, {registration.firstName}.
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
            {sessions.map((session: {label?: string; sessionDate?: string; recapYoutubeUrl?: string; attendedIds?: string[]}, index: number) => {
              const attended = Array.isArray(session.attendedIds) && session.attendedIds.includes(registrationId)
              const videoId = getYouTubeId(session.recapYoutubeUrl)

              return (
                <section
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-gray-900">{session.label || `Session ${index + 1}`}</h2>
                      {session.sessionDate && (
                        <span className="text-sm text-gray-500">
                          {format(new Date(session.sessionDate), 'MMM d, yyyy')}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          attended ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {attended ? 'You attended ✓' : 'You did not attend'}
                      </span>
                    </div>
                  </div>

                  {videoId && (
                    <div className="aspect-video bg-black">
                      <iframe
                        title={session.label ? `Recap: ${session.label}` : 'Session recap'}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {!videoId && session.recapYoutubeUrl && (
                    <div className="p-6">
                      <a
                        href={session.recapYoutubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Watch recap on YouTube →
                      </a>
                    </div>
                  )}
                </section>
              )
            })}
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

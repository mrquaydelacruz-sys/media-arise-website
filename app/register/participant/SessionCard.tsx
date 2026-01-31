'use client'

import {useState} from 'react'
import {format} from 'date-fns'

function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

type Person = {_id: string; firstName?: string; lastName?: string}

interface SessionCardProps {
  session: {
    label?: string
    sessionDate?: string
    recapYoutubeUrl?: string
    attended?: Person[]
  }
  allRegistrants: Person[]
  index: number
}

export default function SessionCard({session, allRegistrants, index}: SessionCardProps) {
  const [showAttendees, setShowAttendees] = useState(false)
  const videoId = getYouTubeId(session.recapYoutubeUrl)
  const attended = session.attended || []
  const attendedIds = new Set(attended.map((p) => p._id))
  const absent = allRegistrants.filter((r) => !attendedIds.has(r._id))

  const name = (p: Person) => [p.firstName, p.lastName].filter(Boolean).join(' ').trim() || '—'

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">{session.label || `Session ${index + 1}`}</h2>
          {session.sessionDate && (
            <span className="text-sm text-gray-500">
              {format(new Date(session.sessionDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAttendees(!showAttendees)}
          className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showAttendees ? 'Hide attendees' : 'View attendees'}
          <svg
            className={`w-4 h-4 transition-transform ${showAttendees ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAttendees && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-800 mb-2">
                Attended ({attended.length})
              </h3>
              {attended.length === 0 ? (
                <p className="text-green-700/80">No one marked as attended yet.</p>
              ) : (
                <ul className="space-y-1 text-green-800">
                  {attended.map((p) => (
                    <li key={p._id}>{name(p)}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h3 className="font-semibold text-amber-800 mb-2">
                Absent ({absent.length})
              </h3>
              {absent.length === 0 ? (
                <p className="text-amber-700/80">Everyone attended.</p>
              ) : (
                <ul className="space-y-1 text-amber-800">
                  {absent.map((p) => (
                    <li key={p._id}>{name(p)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
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
}

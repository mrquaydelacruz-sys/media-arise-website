import {client} from '@/lib/sanity.client'
import {
  pastSermonsQuery,
  sessionRecordingsQuery,
  podcastsQuery,
} from '@/lib/queries'
import MediaPageClient from './MediaPageClient'

export const revalidate = 60 // Revalidate every 60 seconds

async function getMediaData() {
  try {
    const [pastSermons, sessionRecordings, podcasts] = await Promise.all([
      client.fetch(pastSermonsQuery).catch(() => []),
      client.fetch(sessionRecordingsQuery).catch(() => []),
      client.fetch(podcastsQuery).catch(() => []),
    ])

    return {
      pastSermons: pastSermons || [],
      sessionRecordings: sessionRecordings || [],
      podcasts: podcasts || [],
    }
  } catch (error) {
    console.error('Error fetching media data:', error)
    return {
      pastSermons: [],
      sessionRecordings: [],
      podcasts: [],
    }
  }
}

export default async function MediaPage() {
  const {pastSermons, sessionRecordings, podcasts} = await getMediaData()

  return (
    <MediaPageClient
      pastSermons={pastSermons}
      recordings={sessionRecordings}
      podcasts={podcasts}
    />
  )
}

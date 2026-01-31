import {NextRequest, NextResponse} from 'next/server'
import {createClient} from '@sanity/client'
import {registrationsByEmailQuery} from '@/lib/queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {email, lastName} = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {error: 'Email is required'},
        {status: 400}
      )
    }

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      return NextResponse.json(
        {error: 'Email is required'},
        {status: 400}
      )
    }

    const lastNameParam =
      lastName && typeof lastName === 'string' && lastName.trim() ? lastName.trim() : null

    const registrations = await client.fetch(registrationsByEmailQuery, {
      email: trimmedEmail,
      lastName: lastNameParam,
    })

    if (!registrations || registrations.length === 0) {
      return NextResponse.json(
        {registrations: [], message: 'No registration found for this email.'},
        {status: 200}
      )
    }

    // One link per program (keep most recent registration per program)
    const seenProgramIds = new Set<string>()
    const deduped = registrations.filter((r: {_id: string; programId?: string; programTitle?: string}) => {
      const programId = r.programId || r._id
      if (seenProgramIds.has(programId)) return false
      seenProgramIds.add(programId)
      return true
    })

    return NextResponse.json({
      registrations: deduped.map((r: {_id: string; programTitle?: string}) => ({
        registrationId: r._id,
        programTitle: r.programTitle || 'Program',
      })),
    })
  } catch (error) {
    console.error('Error looking up registration:', error)
    return NextResponse.json(
      {error: 'Failed to look up registration'},
      {status: 500}
    )
  }
}

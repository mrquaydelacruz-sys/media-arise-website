import {NextRequest, NextResponse} from 'next/server'
import {createClient} from '@sanity/client'

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
    const {firstName, lastName, email, phone, reason, additionalInfo, programId, programTitle} = body

    // Validate required fields
    if (!firstName || !lastName || !email || !reason || !programId) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {error: 'Invalid email format'},
        {status: 400}
      )
    }

    // Create registration document in Sanity
    const registration = await client.create({
      _type: 'registration',
      program: {
        _type: 'reference',
        _ref: programId,
      },
      firstName,
      lastName,
      email,
      phone: phone || '',
      reason,
      additionalInfo: additionalInfo || '',
      registeredAt: new Date().toISOString(),
      status: 'pending',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        registrationId: registration._id,
      },
      {status: 201}
    )
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      {error: 'Failed to submit registration'},
      {status: 500}
    )
  }
}

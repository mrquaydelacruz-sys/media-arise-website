import {NextRequest, NextResponse} from 'next/server'
import {client} from '@/lib/sanity.client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {name, email, subject, message} = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {error: 'All fields are required'},
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

    // Save to Sanity CMS
    const contactMessage = await client.create({
      _type: 'contactMessage',
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      read: false,
      replied: false,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
        id: contactMessage._id,
      },
      {status: 200}
    )
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      {error: 'Failed to send message. Please try again later.'},
      {status: 500}
    )
  }
}

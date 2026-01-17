import {NextRequest, NextResponse} from 'next/server'
import {updateRegistrationStatus} from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('Webhook received:', body)

    const payload = JSON.parse(body)
    console.log('Parsed payload:', JSON.stringify(payload, null, 2))

    // Sanity sends the projected document directly based on your projection
    // The projection was: {_id, _type, status, firstName, lastName, email}
    const sanityId = payload._id
    const status = payload.status
    const docType = payload._type

    console.log('Extracted values:', {sanityId, status, docType})

    // Check if this is a registration document
    if (docType !== 'registration') {
      console.log('Not a registration document, skipping')
      return NextResponse.json({message: 'Not a registration document, skipping'}, {status: 200})
    }

    if (!sanityId || !status) {
      console.log('Missing required fields:', {sanityId, status})
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    // Update the status in Google Sheets
    console.log(`Updating status for ${sanityId} to ${status}`)
    const result = await updateRegistrationStatus(sanityId, status)

    if (result.success) {
      console.log('Successfully updated Google Sheet')
      return NextResponse.json({success: true, message: 'Status synced to Google Sheets'}, {status: 200})
    } else {
      console.log('Failed to update Google Sheet:', result.error)
      return NextResponse.json({error: result.error}, {status: 500})
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({error: 'Webhook processing failed'}, {status: 500})
  }
}

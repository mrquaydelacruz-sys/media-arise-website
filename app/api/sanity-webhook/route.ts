import {NextRequest, NextResponse} from 'next/server'
import {updateRegistrationStatus} from '@/lib/googleSheets'
import crypto from 'crypto'

// Verify Sanity webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const expectedSignature = hmac.digest('base64')
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('sanity-webhook-signature')
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      if (!verifySignature(body, signature, webhookSecret)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({error: 'Invalid signature'}, {status: 401})
      }
    }

    const payload = JSON.parse(body)

    // Check if this is a registration document update
    if (payload._type !== 'registration') {
      return NextResponse.json({message: 'Not a registration document, skipping'}, {status: 200})
    }

    const sanityId = payload._id
    const status = payload.status

    if (!sanityId || !status) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    // Update the status in Google Sheets
    const result = await updateRegistrationStatus(sanityId, status)

    if (result.success) {
      return NextResponse.json({success: true, message: 'Status synced to Google Sheets'}, {status: 200})
    } else {
      return NextResponse.json({error: result.error}, {status: 500})
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({error: 'Webhook processing failed'}, {status: 500})
  }
}

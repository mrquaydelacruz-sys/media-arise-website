import {google} from 'googleapis'
import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({path: '.env.local'})
dotenv.config({path: '.env'})

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

async function getGoogleSheets() {
  const credentials = {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.GOOGLE_CERT_URL,
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({version: 'v4', auth})
  return sheets
}

async function backfillSanityIds() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!spreadsheetId) {
    console.error('GOOGLE_SHEET_ID not configured')
    return
  }

  console.log('Fetching registrations from Sanity...')

  // Fetch all registrations from Sanity
  const sanityRegistrations = await sanityClient.fetch(`
    *[_type == "registration"] {
      _id,
      firstName,
      lastName,
      email
    }
  `)

  console.log(`Found ${sanityRegistrations.length} registrations in Sanity`)

  console.log('Fetching data from Google Sheets...')

  const sheets = await getGoogleSheets()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A:L',
  })

  const rows = response.data.values || []
  console.log(`Found ${rows.length - 1} rows in Google Sheets (excluding header)`)

  // Create a map of Sanity registrations by email+name for matching
  const sanityMap = new Map<string, string>()
  for (const reg of sanityRegistrations) {
    const key = `${reg.email?.toLowerCase()}-${reg.firstName?.toLowerCase()}-${reg.lastName?.toLowerCase()}`
    sanityMap.set(key, reg._id)
  }

  // Find rows that need Sanity ID backfilled
  const updates: {row: number; sanityId: string}[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    // Column indices: 0=Date, 1=Program, 2=FirstName, 3=LastName, 4=Email, ..., 11=SanityID
    const firstName = row[2]?.toLowerCase() || ''
    const lastName = row[3]?.toLowerCase() || ''
    const email = row[4]?.toLowerCase() || ''
    const existingSanityId = row[11] || ''

    if (existingSanityId) {
      console.log(`Row ${i + 1}: Already has Sanity ID, skipping`)
      continue
    }

    const key = `${email}-${firstName}-${lastName}`
    const sanityId = sanityMap.get(key)

    if (sanityId) {
      updates.push({row: i + 1, sanityId}) // +1 because sheets are 1-indexed
      console.log(`Row ${i + 1}: Found match for ${firstName} ${lastName} (${email}) -> ${sanityId}`)
    } else {
      console.log(`Row ${i + 1}: No match found for ${firstName} ${lastName} (${email})`)
    }
  }

  if (updates.length === 0) {
    console.log('\nNo rows need updating!')
    return
  }

  console.log(`\nUpdating ${updates.length} rows...`)

  // Update each row with its Sanity ID
  for (const update of updates) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!L${update.row}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[update.sanityId]],
      },
    })
    console.log(`Updated row ${update.row} with Sanity ID: ${update.sanityId}`)
  }

  console.log('\nBackfill complete!')
}

backfillSanityIds().catch(console.error)

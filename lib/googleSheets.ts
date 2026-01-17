import {google} from 'googleapis'

// Initialize Google Sheets API
const getGoogleSheets = async () => {
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

interface RegistrationData {
  programTitle: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  reason: string
  additionalInfo?: string
  hearAbout?: string
  convenientTime?: string
  registeredAt: string
  status: string
}

export async function appendToGoogleSheet(data: RegistrationData & {sanityId?: string}) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!spreadsheetId) {
    console.error('GOOGLE_SHEET_ID not configured')
    return {success: false, error: 'Google Sheet not configured'}
  }

  try {
    const sheets = await getGoogleSheets()

    // Format the date
    const formattedDate = new Date(data.registeredAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // Prepare row data (added Sanity ID as column L for syncing)
    const rowData = [
      formattedDate,
      data.programTitle,
      data.firstName,
      data.lastName,
      data.email,
      data.phone || '',
      data.reason,
      data.hearAbout || '',
      data.convenientTime || '',
      data.additionalInfo || '',
      data.status,
      data.sanityId || '', // Column L - Sanity ID for syncing
    ]

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:L',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    return {success: true}
  } catch (error) {
    console.error('Error appending to Google Sheet:', error)
    return {success: false, error: 'Failed to add to spreadsheet'}
  }
}

// Find row by Sanity ID and update status
export async function updateRegistrationStatus(sanityId: string, newStatus: string) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!spreadsheetId) {
    console.error('GOOGLE_SHEET_ID not configured')
    return {success: false, error: 'Google Sheet not configured'}
  }

  try {
    const sheets = await getGoogleSheets()

    // Get all data to find the row with matching Sanity ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:L',
    })

    const rows = response.data.values || []

    // Find the row with matching Sanity ID (column L, index 11)
    let rowIndex = -1
    for (let i = 1; i < rows.length; i++) { // Start at 1 to skip header
      if (rows[i][11] === sanityId) {
        rowIndex = i + 1 // +1 because sheets are 1-indexed
        break
      }
    }

    if (rowIndex === -1) {
      console.log(`Registration with Sanity ID ${sanityId} not found in Google Sheet`)
      return {success: false, error: 'Registration not found in spreadsheet'}
    }

    // Update the status column (column K, index 10)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!K${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[newStatus]],
      },
    })

    console.log(`Updated status for Sanity ID ${sanityId} to ${newStatus} in row ${rowIndex}`)
    return {success: true}
  } catch (error) {
    console.error('Error updating Google Sheet:', error)
    return {success: false, error: 'Failed to update spreadsheet'}
  }
}

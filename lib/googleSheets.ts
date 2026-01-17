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

export async function appendToGoogleSheet(data: RegistrationData) {
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

    // Prepare row data
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
    ]

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:K', // Adjust range if needed
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

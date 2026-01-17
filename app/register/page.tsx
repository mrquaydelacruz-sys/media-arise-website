import {client} from '@/lib/sanity.client'
import {programsQuery} from '@/lib/queries'
import RegisterContent from './RegisterContent'

export const metadata = {
  title: 'Register - Media Arise',
  description: 'Register for programs and activities at Media Arise.',
}

export const revalidate = 60

async function getPrograms() {
  try {
    const programs = await client.fetch(programsQuery)
    return programs || []
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

export default async function RegisterPage() {
  const programs = await getPrograms()

  return <RegisterContent programs={programs} />
}

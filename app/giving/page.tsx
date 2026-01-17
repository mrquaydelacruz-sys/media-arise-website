import {client} from '@/lib/sanity.client'
import {givingPageQuery} from '@/lib/queries'
import GivingContent from './GivingContent'

export const metadata = {
  title: 'Giving - Media Arise',
  description: 'Support Media Arise ministry through your generous tithes and offerings.',
}

export const revalidate = 60

async function getData() {
  try {
    const data = await client.fetch(givingPageQuery)
    return data
  } catch (error) {
    console.error('Error fetching giving page data:', error)
    return null
  }
}

export default async function GivingPage() {
  const data = await getData()

  return <GivingContent data={data} />
}

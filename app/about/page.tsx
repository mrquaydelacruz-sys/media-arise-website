import AboutContent from '@/components/AboutContent'

export const metadata = {
  title: 'About Us - Media Arise',
  description: 'Learn more about Media Arise, a Jesus-focused ministry dedicated to spreading the Gospel through digital fellowship.',
}

export const revalidate = 0

export default function AboutPage() {
  return <AboutContent />
}

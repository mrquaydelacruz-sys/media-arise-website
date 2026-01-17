'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'

interface HomePageClientProps {
  children: React.ReactNode
}

export default function HomePageClient({children}: HomePageClientProps) {
  const [showLogo, setShowLogo] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show logo animation first
    const logoTimer = setTimeout(() => {
      setShowLogo(false)
      // Small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true)
      }, 400)
    }, 2200) // Logo displays for 2.2 seconds (1.8s animation + 0.4s hold)

    return () => clearTimeout(logoTimer)
  }, [])

  return (
    <>
      {showLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="animate-logoEntrance">
            <Image
              src="/logo.png"
              alt="Media Arise"
              width={150}
              height={150}
              className="object-contain drop-shadow-lg"
              unoptimized
              priority
            />
          </div>
        </div>
      )}
      {!showLogo && (
        <div className={showContent ? 'animate-contentFadeIn' : 'opacity-0'}>
          {children}
        </div>
      )}
    </>
  )
}

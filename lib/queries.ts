import {groq} from 'next-sanity'

export const latestFellowshipSessionQuery = groq`
  *[_type == "fellowshipSession" && isLatest == true][0] {
    _id,
    title,
    description,
    youtubeUrl,
    youtubeId,
    thumbnailImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    date,
  }
`

export const announcementsQuery = groq`
  *[_type == "announcement" && isActive == true] | order(priority desc, date desc) {
    _id,
    title,
    content,
    date,
    priority,
  }
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && isUpcoming == true && date >= now()] | order(date asc) {
    _id,
    title,
    description,
    date,
    location,
    image,
  }
`

export const ministriesQuery = groq`
  *[_type == "ministry" && isActive == true] | order(priority desc, progress desc) {
    _id,
    title,
    description,
    fullDescription,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    progress,
    progressDescription,
    status,
    dateStarted,
    dateCompleted,
    priority,
  }
`

export const sessionRecordingsQuery = groq`
  *[_type == "sessionRecording" && (isActive == true || !defined(isActive))] | order(sessionDate desc, priority desc) {
    _id,
    title,
    description,
    youtubeUrl,
    youtubeId,
    thumbnailImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    sessionDate,
    duration,
    speaker,
    topic,
    priority,
    isActive,
  }
`

export const footerQuery = groq`
  *[_type == "footer"][0] {
    quickLinks,
    getConnected,
    ministries,
    copyright,
    socialMedia,
    contactInfo,
    charityNumber,
    affiliation,
    recognitionStatement,
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    getInTouchMessage,
    email,
    phone,
    socialMedia,
  }
`

export const pastSermonsQuery = groq`
  *[_type == "pastSermon" && (isActive == true || !defined(isActive))] | order(date desc, priority desc) {
    _id,
    title,
    speaker,
    youtubeUrl,
    youtubeId,
    thumbnailImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    date,
    priority,
    isActive,
  }
`

export const podcastsQuery = groq`
  *[_type == "podcast" && (isActive == true || !defined(isActive))] | order(date desc, priority desc) {
    _id,
    title,
    description,
    youtubeUrl,
    youtubeId,
    thumbnailImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },
    date,
    priority,
    isActive,
  }
`

export const givingPageQuery = groq`
  *[_type == "givingPage"][0] {
    title,
    description,
    whyWeGiveTitle,
    bibleVerse,
    bibleVerseReference,
    whyWeGiveDescription,
    paypalEnabled,
    paypalTitle,
    paypalDescription,
    paypalLink,
    paypalButtonText,
    etransferEnabled,
    etransferTitle,
    etransferDescription,
    etransferEmail,
    etransferComingSoon,
    wiseEnabled,
    wiseTitle,
    wiseDescription,
    wiseAccountName,
    wiseEmail,
    wiseAccountNumber,
    wiseRoutingNumber,
    wiseSwiftCode,
    wiseAdditionalInfo,
  }
`

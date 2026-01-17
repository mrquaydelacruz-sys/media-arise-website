import {client} from '@/lib/sanity.client'
import {aboutPageQuery} from '@/lib/queries'

export const metadata = {
  title: 'About Us - Media Arise',
  description: 'Learn more about Media Arise, a Jesus-focused ministry dedicated to spreading the Gospel through digital fellowship.',
}

export const revalidate = 0 // Always fetch fresh data (can be changed to 60 later for better performance)

async function getAboutPageData() {
  try {
    const data = await client.fetch(aboutPageQuery, {}, {
      next: { revalidate: 0 }, // Disable caching for fresh data
    })
    return data
  } catch (error) {
    console.error('Error fetching about page data:', error)
    return null
  }
}

export default async function AboutPage() {
  const data = await getAboutPageData()

  // Default content if no data exists in Sanity
  const defaults = {
    part1Title: 'The Introduction',
    part1Subtitle: 'Welcome to Media Arise',
    whoWeAre: {
      title: 'Who We Are',
      content:
        'We are friends united by the purpose of seeking the absolute Truth. Our diverse denominations and backgrounds have not hindered us. Instead, we found common ground in learning and receiving God\'s grace, love, and mercy. As a Jesus-focused ministry, we believe that Jesus is our one true God.',
    },
    mission: {
      title: 'Our Mission',
      content:
        'As a Jesus-focused ministry, our mission is to spread the Gospel and share God\'s truth through digital fellowship and media. We are committed to creating a space where people from all backgrounds can come together, set aside denominational differences, and focus on the absolute truth of God\'s Word. We seek to use technology to bridge gaps, connect believers worldwide, and help others grow in their relationship with Jesus Christ.',
    },
    vision: {
      title: 'Our Vision',
      content:
        'Our vision is to be a beacon of light in the digital world, arising to shine God\'s glory through every platform available to us. We envision a global community united in Christ, where technology becomes a powerful tool for spreading the Gospel, building authentic relationships, and deepening faith. We aim to see believers from every nation, denomination, and background come together to learn, grow, and proclaim that Jesus is our one true God, all while using our professional skills in media to broadcast His truth to the world.',
    },
    story: {
      title: 'Our Story',
      content:
        'It all began with small Bible studies and sharing testimonies in our free time. As we sought God, we met Pastor Donny as a mentor. We realized we could use technology to bridge the gap, so we moved our meetings online.\n\nWhat started as a few friends and cousins has grown into a community spreading the Gospel.',
    },
    nameOrigin: {
      title: 'How We Got Our Name',
      content:
        'The name "Media Arise" was inspired during a Sunday service. As Pastor Donny preached, we were moved by the biblical call to \'Arise\' and let God\'s light shine.',
      bibleVerse:
        'Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.',
      bibleVerseReference: 'Isaiah 60:1 (KJV)',
      closingStatement:
        'After recognizing our calling to use our professional skills for God\'s glory, we met with Pastor Donny over coffee to discuss the vision. The name Media Arise was established by combining our background in media with this spiritual mandate, signifying a call to stand up and broadcast God\'s truth to the world.\n\nWe are currently continuing to grow and meet online. To God be the glory!',
    },
    part2Title: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        question: 'Why was this group created?',
        answer:
          'We were hungry for the Truth and wanted a space to set aside denominational differences and focus purely on the absolute truth of God\'s Word and His grace.',
      },
      {
        question: 'What is the meaning behind the name "Media Arise"?',
        answer:
          'The name comes from a conviction to use media to spread the Gospel. It was inspired by a sermon by Pastor Donny on the word "Arise." Our team met with Pastor Donny and agreed on "Media Arise" as a symbol of our mission: to arise and shine the light of Jesus through digital fellowship.',
      },
      {
        question: 'Do I need to be from a specific denomination to join?',
        answer:
          'Not at all. We welcome people from different backgrounds and denominations. Our focus is not on religious labels, but on the truth that Jesus is our one true God and on building a relationship with Him.',
      },
      {
        question: 'Who leads the biblical teachings?',
        answer:
          'Pastor Donny is our guide and mentor. He helps lead our studies and guides us in our walk toward a deeper relationship with Christ.',
      },
      {
        question: 'How did this online ministry start?',
        answer:
          'We originally met in person for Bible studies. When physical meetings were no longer possible, the idea was brought up to use online video meetings to keep the fire burning. Since then, we have moved fully online, allowing friends, cousins, and families from different places to join.',
      },
      {
        question: 'When and where do you meet?',
        answer: 'We meet online (via Google Meet/Zoom). [Insert dates/times here]',
      },
    ],
  }

  const aboutData = data || defaults

  // Helper function to format text with line breaks
  const formatText = (text: string) => {
    if (!text) return ''
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

        {/* Part 1: Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Part 1: {aboutData.part1Title || defaults.part1Title}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {aboutData.part1Subtitle || defaults.part1Subtitle}
            </p>
          </div>

          {aboutData.whoWeAre && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutData.whoWeAre.title || defaults.whoWeAre.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formatText(aboutData.whoWeAre.content || defaults.whoWeAre.content)}
              </p>
            </section>
          )}

          {aboutData.mission && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutData.mission.title || defaults.mission.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formatText(aboutData.mission.content || defaults.mission.content)}
              </p>
            </section>
          )}

          {aboutData.vision && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutData.vision.title || defaults.vision.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formatText(aboutData.vision.content || defaults.vision.content)}
              </p>
            </section>
          )}

          {aboutData.story && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutData.story.title || defaults.story.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formatText(aboutData.story.content || defaults.story.content)}
              </p>
            </section>
          )}

          {aboutData.nameOrigin && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {aboutData.nameOrigin.title || defaults.nameOrigin.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {formatText(aboutData.nameOrigin.content || defaults.nameOrigin.content)}
              </p>
              {(aboutData.nameOrigin.bibleVerse || defaults.nameOrigin.bibleVerse) && (
                <blockquote className="border-l-4 border-black pl-6 my-6 italic text-gray-700">
                  <p className="mb-2">
                    &quot;{aboutData.nameOrigin.bibleVerse || defaults.nameOrigin.bibleVerse}&quot;
                  </p>
                  <cite className="text-sm text-gray-600">
                    — {aboutData.nameOrigin.bibleVerseReference || defaults.nameOrigin.bibleVerseReference}
                  </cite>
                </blockquote>
              )}
              {aboutData.nameOrigin.closingStatement && (
                <p className="text-gray-700 leading-relaxed mt-4 whitespace-pre-line">
                  {formatText(aboutData.nameOrigin.closingStatement)}
                </p>
              )}
            </section>
          )}
        </div>

        {/* Part 2: FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Part 2: {aboutData.part2Title || defaults.part2Title}
          </h2>

          <div className="space-y-8">
            {aboutData.faqs && aboutData.faqs.length > 0
              ? aboutData.faqs.map((faq: {question: string; answer: string}, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Q: {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      A: {faq.answer}
                    </p>
                  </div>
                ))
              : defaults.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Q: {faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  )
}

'use client'

import {useState, useEffect} from 'react'
import {client} from '@/lib/sanity.client'
import {aboutPageQuery} from '@/lib/queries'

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

export default function AboutContent() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await client.fetch(aboutPageQuery, {}, {
          next: { revalidate: 0 },
        })
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching about page data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const aboutData = data || defaults

  const formatText = (text: string) => {
    if (!text) return ''
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  const sections = [
    {
      icon: '👥',
      title: aboutData.whoWeAre?.title || defaults.whoWeAre.title,
      content: aboutData.whoWeAre?.content || defaults.whoWeAre.content,
    },
    {
      icon: '🎯',
      title: aboutData.mission?.title || defaults.mission.title,
      content: aboutData.mission?.content || defaults.mission.content,
    },
    {
      icon: '🔮',
      title: aboutData.vision?.title || defaults.vision.title,
      content: aboutData.vision?.content || defaults.vision.content,
    },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-fadeInUp">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto animate-fadeInUp delay-100">
              {aboutData.part1Subtitle || defaults.part1Subtitle}
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full animate-fadeInUp delay-200"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story Section - Full Width Card */}
        {aboutData.story && (
          <div className="glass-card p-10 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl animate-fadeIn delay-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className="text-5xl">📖</div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {aboutData.story.title || defaults.story.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line">
              {formatText(aboutData.story.content || defaults.story.content)}
            </p>
          </div>
        )}

        {/* Three Column Grid - Who We Are, Mission, Vision */}
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeInUp"
              style={{animationDelay: `${(index + 1) * 100}ms`}}
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"></div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {formatText(section.content)}
              </p>
            </div>
          ))}
        </div>

        {/* Name Origin Section */}
        {aboutData.nameOrigin && (
          <div className="glass-card p-10 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl animate-fadeIn delay-600">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {aboutData.nameOrigin.title || defaults.nameOrigin.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 whitespace-pre-line">
              {formatText(aboutData.nameOrigin.content || defaults.nameOrigin.content)}
            </p>
            
            {(aboutData.nameOrigin.bibleVerse || defaults.nameOrigin.bibleVerse) && (
              <div className="relative my-10 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-l-2xl"></div>
                <p className="text-2xl md:text-3xl italic text-white mb-4 pl-6">
                  &quot;{aboutData.nameOrigin.bibleVerse || defaults.nameOrigin.bibleVerse}&quot;
                </p>
                <cite className="text-purple-200 pl-6 font-medium">
                  — {aboutData.nameOrigin.bibleVerseReference || defaults.nameOrigin.bibleVerseReference}
                </cite>
              </div>
            )}
            
            {aboutData.nameOrigin.closingStatement && (
              <p className="text-lg text-gray-200 leading-relaxed mt-6 whitespace-pre-line">
                {formatText(aboutData.nameOrigin.closingStatement)}
              </p>
            )}
          </div>
        )}

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            {aboutData.faqs && aboutData.faqs.length > 0
              ? aboutData.faqs.map((faq: {question: string; answer: string}, index: number) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : defaults.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  )
}

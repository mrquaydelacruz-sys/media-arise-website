'use client'

import {useState, useEffect} from 'react'
import {client} from '@/lib/sanity.client'
import {contactPageQuery} from '@/lib/queries'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [contactPageData, setContactPageData] = useState<any>(null)

  useEffect(() => {
    async function fetchContactData() {
      try {
        const data = await client.fetch(contactPageQuery)
        console.log('Contact page data from Sanity:', JSON.stringify(data, null, 2))
        console.log('Social media data:', data?.socialMedia)
        setContactPageData(data)
      } catch (error) {
        console.error('Error fetching contact page data:', error)
      }
    }
    fetchContactData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({name: '', email: '', subject: '', message: ''})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-700 mb-6">
                  {contactPageData?.getInTouchMessage || 
                    "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
                </p>
              </div>

              <div className="space-y-4">
                {(contactPageData?.email || contactPageData?.phone) && (
                  <div>
                    {contactPageData?.email && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                        <a 
                          href={`mailto:${contactPageData.email}`}
                          className="text-gray-600 hover:text-black"
                        >
                          {contactPageData.email}
                        </a>
                      </div>
                    )}
                    {contactPageData?.phone && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                        <a 
                          href={`tel:${contactPageData.phone}`}
                          className="text-gray-600 hover:text-black"
                        >
                          {contactPageData.phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}
                {(contactPageData?.socialMedia?.facebook || 
                  contactPageData?.socialMedia?.youtube || 
                  contactPageData?.socialMedia?.instagram) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Follow Us</h3>
                    <div className="flex flex-wrap gap-4">
                      {contactPageData?.socialMedia?.facebook && (
                        <a 
                          href={contactPageData.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                        >
                          Facebook
                        </a>
                      )}
                      {contactPageData?.socialMedia?.youtube && (
                        <a 
                          href={contactPageData.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                        >
                          YouTube
                        </a>
                      )}
                      {contactPageData?.socialMedia?.instagram && (
                        <a 
                          href={contactPageData.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

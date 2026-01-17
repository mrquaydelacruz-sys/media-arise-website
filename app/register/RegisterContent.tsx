'use client'

import {useState} from 'react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'
import {format} from 'date-fns'

interface Program {
  _id: string
  title: string
  slug: {current: string}
  description?: string
  fullDescription?: string
  image?: any
  startDate?: string
  endDate?: string
  location?: string
  capacity?: number
  registrationDeadline?: string
  category?: string
}

interface RegisterContentProps {
  programs: Program[]
}

const categoryLabels: Record<string, string> = {
  'bible-study': 'Bible Study',
  fellowship: 'Fellowship',
  outreach: 'Outreach',
  workshop: 'Workshop',
  youth: 'Youth',
  prayer: 'Prayer',
  service: 'Service',
  other: 'Other',
}

export default function RegisterContent({programs}: RegisterContentProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    additionalInfo: '',
    hearAbout: '',
    convenientTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program)
    setSubmitStatus('idle')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProgram) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          programId: selectedProgram._id,
          programTitle: selectedProgram.title,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          reason: '',
          additionalInfo: '',
          hearAbout: '',
          convenientTime: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy')
    } catch {
      return dateString
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Register</h1>
        <p className="text-gray-700 mb-8">
          Join one of our programs or activities. Select a program below to register.
        </p>

        {programs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Programs Available</h2>
            <p className="text-gray-600">
              There are currently no programs open for registration. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Programs List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Programs</h2>
              {programs.map((program) => {
                const imageUrl = program.image ? urlFor(program.image)?.width(400).height(200).url() : null
                const isSelected = selectedProgram?._id === program._id

                return (
                  <div
                    key={program._id}
                    onClick={() => handleProgramSelect(program)}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-black' : 'hover:shadow-xl'
                    }`}
                  >
                    {imageUrl && (
                      <div className="relative h-40">
                        <Image
                          src={imageUrl}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                        {program.category && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            {categoryLabels[program.category] || program.category}
                          </span>
                        )}
                      </div>
                      {program.description && (
                        <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                      )}
                      <div className="space-y-1 text-sm text-gray-500">
                        {program.startDate && (
                          <p>
                            <span className="font-medium">Date:</span> {formatDate(program.startDate)}
                            {program.endDate && ` - ${formatDate(program.endDate)}`}
                          </p>
                        )}
                        {program.location && (
                          <p>
                            <span className="font-medium">Location:</span> {program.location}
                          </p>
                        )}
                        {program.registrationDeadline && (
                          <p>
                            <span className="font-medium">Deadline:</span> {formatDate(program.registrationDeadline)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Registration Form */}
            <div className="lg:sticky lg:top-8 h-fit">
              {selectedProgram ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Register for: {selectedProgram.title}
                  </h2>
                  {selectedProgram.fullDescription && (
                    <p className="text-gray-600 text-sm mb-6">{selectedProgram.fullDescription}</p>
                  )}

                  {submitStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-lg text-center">
                      <svg
                        className="h-12 w-12 text-green-500 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
                      <p>Thank you for registering. We will be in touch soon.</p>
                      <button
                        onClick={() => {
                          setSelectedProgram(null)
                          setSubmitStatus('idle')
                        }}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Register for Another Program
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                          Why do you want to join this program? *
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Tell us why you're interested in this program..."
                        />
                      </div>

                      <div>
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Any other details you'd like to share..."
                        />
                      </div>

                      <div>
                        <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">
                          Where did you hear about this leadership course? *
                        </label>
                        <textarea
                          id="hearAbout"
                          name="hearAbout"
                          value={formData.hearAbout}
                          onChange={handleChange}
                          required
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="e.g., Social media, friend, church, website..."
                        />
                      </div>

                      <div>
                        <label htmlFor="convenientTime" className="block text-sm font-medium text-gray-700 mb-1">
                          What is your most convenient time of the day to join online? *
                        </label>
                        <input
                          type="text"
                          id="convenientTime"
                          name="convenientTime"
                          value={formData.convenientTime}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="e.g., Morning (9am-12pm), Afternoon (12pm-5pm), Evening (5pm-9pm)"
                        />
                      </div>

                      {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                          Something went wrong. Please try again.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <svg
                    className="h-16 w-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Program</h3>
                  <p className="text-gray-600">
                    Click on a program from the list to view details and register.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

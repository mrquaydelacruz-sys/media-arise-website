import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sessionRecording',
  title: 'Full Session Recording',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Title of the fellowship session',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the session',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        scheme: ['https'],
        allowRelative: false,
      }),
      description: 'Full YouTube URL (e.g., https://www.youtube.com/watch?v=...)',
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Automatically extracted from URL',
      readOnly: true,
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Custom thumbnail (optional - YouTube thumbnail will be used if not provided)',
    }),
    defineField({
      name: 'sessionDate',
      title: 'Session Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'Date and time of the original fellowship session',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Video duration (e.g., "1 hour 30 minutes", "2 hours")',
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker/Teacher',
      type: 'string',
      description: 'Name of the main speaker or teacher (e.g., Pastor Donny)',
    }),
    defineField({
      name: 'topic',
      title: 'Topic/Theme',
      type: 'string',
      description: 'Main topic or theme of the session',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers appear first (1-10)',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'isActive',
      title: 'Display on Website',
      type: 'boolean',
      description: 'Show this recording on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sessionDate: 'sessionDate',
      speaker: 'speaker',
      media: 'thumbnailImage',
    },
    prepare({title, sessionDate, speaker, media}) {
      return {
        title: title || 'Untitled',
        subtitle: `${sessionDate ? new Date(sessionDate).toLocaleDateString() : ''} ${speaker ? `• ${speaker}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'sessionDate', direction: 'desc'}],
    },
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
  ],
})

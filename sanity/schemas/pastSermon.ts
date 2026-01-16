import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pastSermon',
  title: 'Past Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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
      description: 'Show this sermon on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker',
      date: 'date',
      media: 'thumbnailImage',
    },
    prepare({title, speaker, date, media}) {
      return {
        title: title || 'Untitled',
        subtitle: `${speaker || ''} ${date ? new Date(date).toLocaleDateString() : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
  ],
})

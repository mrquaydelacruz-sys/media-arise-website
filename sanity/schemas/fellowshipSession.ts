import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fellowshipSession',
  title: 'Fellowship Session',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the fellowship session',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isLatest',
      title: 'Mark as Latest',
      type: 'boolean',
      description: 'Check this to display as the latest session on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnailImage',
      date: 'date',
    },
    prepare({title, media, date}) {
      return {
        title: title || 'Untitled',
        subtitle: date ? new Date(date).toLocaleDateString() : '',
        media,
      }
    },
  },
})

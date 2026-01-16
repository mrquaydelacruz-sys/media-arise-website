import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical location or online platform',
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Is Upcoming',
      type: 'boolean',
      description: 'Show in upcoming events section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
      isUpcoming: 'isUpcoming',
    },
    prepare({title, date, media, isUpcoming}) {
      return {
        title: title || 'Untitled',
        subtitle: `${date ? new Date(date).toLocaleDateString() : ''} ${isUpcoming ? '✓ Upcoming' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Soonest First',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})

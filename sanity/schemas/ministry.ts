import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ministry',
  title: 'Ministry',
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
      description: 'Brief description of the ministry',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'Detailed description of the ministry (optional)',
    }),
    defineField({
      name: 'image',
      title: 'Ministry Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'progress',
      title: 'Progress',
      type: 'number',
      description: 'Progress percentage (0-100)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
    defineField({
      name: 'progressDescription',
      title: 'Progress Description',
      type: 'text',
      description: 'Current status or update on the ministry progress',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'Active/Ongoing', value: 'active'},
          {title: 'Paused', value: 'paused'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      initialValue: 'planning',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateStarted',
      title: 'Date Started',
      type: 'date',
    }),
    defineField({
      name: 'dateCompleted',
      title: 'Date Completed',
      type: 'date',
      description: 'Only fill if ministry is completed',
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
      description: 'Show this ministry on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      progress: 'progress',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({title, status, progress, media, isActive}) {
      return {
        title: title || 'Untitled',
        subtitle: `${status ? status.charAt(0).toUpperCase() + status.slice(1) : ''} ${progress !== undefined ? `• ${progress}%` : ''} ${!isActive ? '• Hidden' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
    {
      title: 'Progress, High to Low',
      name: 'progressDesc',
      by: [{field: 'progress', direction: 'desc'}],
    },
    {
      title: 'Date Started, Newest First',
      name: 'dateStartedDesc',
      by: [{field: 'dateStarted', direction: 'desc'}],
    },
  ],
})

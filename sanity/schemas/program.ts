import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program / Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on the registration page',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      description: 'Detailed description of the program',
    }),
    defineField({
      name: 'image',
      title: 'Program Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the program takes place (e.g., "Online via Zoom", "Church Hall")',
    }),
    defineField({
      name: 'capacity',
      title: 'Maximum Capacity',
      type: 'number',
      description: 'Leave empty for unlimited spots',
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bible Study', value: 'bible-study'},
          {title: 'Fellowship', value: 'fellowship'},
          {title: 'Outreach', value: 'outreach'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Youth', value: 'youth'},
          {title: 'Prayer', value: 'prayer'},
          {title: 'Service', value: 'service'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this program on the registration page',
      initialValue: true,
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open',
      type: 'boolean',
      description: 'Allow people to register for this program',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher number = shown first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      isActive: 'isActive',
      media: 'image',
    },
    prepare({title, category, isActive, media}) {
      return {
        title: title,
        subtitle: `${category || 'No category'} ${isActive ? '✓' : '(inactive)'}`,
        media,
      }
    },
  },
})

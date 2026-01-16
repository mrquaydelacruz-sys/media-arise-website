import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'getInTouchMessage',
      title: 'Get in Touch Message',
      type: 'text',
      description: 'Message shown in the sidebar of the contact page',
      initialValue: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number (optional)',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook URL',
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube URL',
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram URL',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Settings',
      }
    },
  },
})

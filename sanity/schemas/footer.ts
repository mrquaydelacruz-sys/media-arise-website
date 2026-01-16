import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'url', type: 'string', title: 'URL'},
          ],
        },
      ],
      description: 'Links for the Quick Links section',
    }),
    defineField({
      name: 'getConnected',
      title: 'Get Connected',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'url', type: 'string', title: 'URL'},
          ],
        },
      ],
      description: 'Links for the Get Connected section',
    }),
    defineField({
      name: 'ministries',
      title: 'Ministries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'url', type: 'string', title: 'URL'},
          ],
        },
      ],
      description: 'Links for the Ministries section',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice (e.g., © 2026 Media Arise. All rights reserved)',
      initialValue: `© ${new Date().getFullYear()} Media Arise. All rights reserved.`,
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'youtube', type: 'url', title: 'YouTube URL'},
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
        {name: 'facebook', type: 'url', title: 'Facebook URL'},
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'address', type: 'string', title: 'Address'},
        {name: 'phone', type: 'string', title: 'Phone'},
        {name: 'email', type: 'string', title: 'Email'},
      ],
    }),
    defineField({
      name: 'charityNumber',
      title: 'Charity Number',
      type: 'string',
      description: 'Charity registration number (optional)',
    }),
    defineField({
      name: 'affiliation',
      title: 'Affiliation Statement',
      type: 'text',
      description: 'Church or organization affiliation (optional)',
    }),
    defineField({
      name: 'recognitionStatement',
      title: 'Recognition Statement',
      type: 'text',
      description: 'Land acknowledgment or recognition statement (optional)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
      }
    },
  },
})

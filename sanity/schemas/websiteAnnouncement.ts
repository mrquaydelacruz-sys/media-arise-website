import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'websiteAnnouncement',
  title: 'Website Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Announcement',
      type: 'boolean',
      description: 'Toggle to show or hide the announcement popup on the website',
      initialValue: false,
    }),
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'text',
      description: 'The message to display in the popup announcement',
      validation: (Rule) => Rule.required(),
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Website Announcement',
      }
    },
  },
})

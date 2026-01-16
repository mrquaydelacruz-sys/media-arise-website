import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'read',
      title: 'Read',
      type: 'boolean',
      description: 'Mark as read after reviewing',
      initialValue: false,
    }),
    defineField({
      name: 'replied',
      title: 'Replied',
      type: 'boolean',
      description: 'Mark as replied after responding',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      subject: 'subject',
      submittedAt: 'submittedAt',
      read: 'read',
    },
    prepare({name, email, subject, submittedAt, read}) {
      return {
        title: subject || 'No Subject',
        subtitle: `${name} (${email}) - ${submittedAt ? new Date(submittedAt).toLocaleDateString() : ''} ${read ? '✓ Read' : '✗ Unread'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Unread First',
      name: 'unreadFirst',
      by: [{field: 'read', direction: 'asc'}, {field: 'submittedAt', direction: 'desc'}],
    },
  ],
})

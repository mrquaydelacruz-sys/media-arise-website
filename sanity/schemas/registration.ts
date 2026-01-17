import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'registration',
  title: 'Registration',
  type: 'document',
  fields: [
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{type: 'program'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
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
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'reason',
      title: 'Reason for Registering',
      type: 'text',
      rows: 4,
      description: 'Why do you want to join this program?',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'hearAbout',
      title: 'Where did you hear about this leadership course?',
      type: 'text',
      rows: 2,
      description: 'How did you learn about this program?',
    }),
    defineField({
      name: 'convenientTime',
      title: 'What is your most convenient time of the day to join online?',
      type: 'string',
      description: 'Please specify your preferred time (e.g., Morning, Afternoon, Evening)',
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Waitlisted', value: 'waitlisted'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes (not visible to registrant)',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      programTitle: 'program.title',
      status: 'status',
      registeredAt: 'registeredAt',
    },
    prepare({firstName, lastName, programTitle, status, registeredAt}) {
      const date = registeredAt ? new Date(registeredAt).toLocaleDateString() : ''
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${programTitle || 'Unknown program'} - ${status} (${date})`,
      }
    },
  },
  orderings: [
    {
      title: 'Registration Date (Newest)',
      name: 'registeredAtDesc',
      by: [{field: 'registeredAt', direction: 'desc'}],
    },
    {
      title: 'Registration Date (Oldest)',
      name: 'registeredAtAsc',
      by: [{field: 'registeredAt', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})

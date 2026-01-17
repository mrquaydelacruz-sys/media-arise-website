import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Part 1: Introduction Section
    defineField({
      name: 'part1Title',
      title: 'Part 1 Title',
      type: 'string',
      initialValue: 'The Introduction',
    }),
    defineField({
      name: 'part1Subtitle',
      title: 'Part 1 Subtitle',
      type: 'string',
      initialValue: 'Welcome to Media Arise',
    }),
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Who We Are',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Mission',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Vision',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Story',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 6,
        }),
      ],
    }),
    defineField({
      name: 'nameOrigin',
      title: 'How We Got Our Name',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'How We Got Our Name',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 8,
        }),
        defineField({
          name: 'bibleVerse',
          title: 'Bible Verse',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'bibleVerseReference',
          title: 'Bible Verse Reference',
          type: 'string',
        }),
        defineField({
          name: 'closingStatement',
          title: 'Closing Statement',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    // Part 2: FAQ Section
    defineField({
      name: 'part2Title',
      title: 'Part 2 Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions (FAQ)',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})

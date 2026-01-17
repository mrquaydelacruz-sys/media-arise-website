import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'givingPage',
  title: 'Giving Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Giving',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue: 'Your generosity helps us continue spreading the Gospel and supporting our community. Thank you for your faithful giving.',
    }),
    defineField({
      name: 'donorboxCampaign',
      title: 'Donorbox Campaign ID',
      type: 'string',
      description: 'The campaign name from your Donorbox embed code (e.g., "media-arise-tithes-and-offering")',
    }),
    defineField({
      name: 'donorboxInterval',
      title: 'Default Donation Interval',
      type: 'string',
      description: 'Default interval for donations (e.g., "1 M" for monthly)',
      initialValue: '1 M',
    }),
    defineField({
      name: 'whyWeGiveTitle',
      title: 'Why We Give Section Title',
      type: 'string',
      initialValue: 'Why We Give',
    }),
    defineField({
      name: 'bibleVerse',
      title: 'Bible Verse',
      type: 'text',
      rows: 3,
      initialValue: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
    }),
    defineField({
      name: 'bibleVerseReference',
      title: 'Bible Verse Reference',
      type: 'string',
      initialValue: '2 Corinthians 9:7 (NIV)',
    }),
    defineField({
      name: 'whyWeGiveDescription',
      title: 'Why We Give Description',
      type: 'text',
      rows: 4,
      initialValue: 'Giving is an act of worship and obedience to God. Your tithes and offerings support our ministry, outreach programs, and help us spread the love of Jesus to others.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

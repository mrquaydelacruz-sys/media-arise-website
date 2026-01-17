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
      initialValue: 'Give',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue: 'Your generosity helps us continue spreading the Gospel and supporting our community. Thank you for your faithful giving.',
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
    // PayPal Section
    defineField({
      name: 'paypalEnabled',
      title: 'Enable PayPal',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'paypalTitle',
      title: 'PayPal Section Title',
      type: 'string',
      initialValue: 'PayPal',
    }),
    defineField({
      name: 'paypalDescription',
      title: 'PayPal Description',
      type: 'text',
      rows: 2,
      initialValue: 'For those who want to use credit cards or international accounts.',
    }),
    defineField({
      name: 'paypalLink',
      title: 'PayPal Link',
      type: 'url',
      description: 'Your PayPal.me link or donation page URL',
    }),
    defineField({
      name: 'paypalButtonText',
      title: 'PayPal Button Text',
      type: 'string',
      initialValue: 'Give via PayPal',
    }),
    // E-transfer Section
    defineField({
      name: 'etransferEnabled',
      title: 'Enable E-transfer',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'etransferTitle',
      title: 'E-transfer Section Title',
      type: 'string',
      initialValue: 'E-transfer (Canada)',
    }),
    defineField({
      name: 'etransferDescription',
      title: 'E-transfer Description',
      type: 'text',
      rows: 2,
      initialValue: 'For those within Canada.',
    }),
    defineField({
      name: 'etransferEmail',
      title: 'E-transfer Email',
      type: 'string',
      description: 'Email address for Interac e-Transfer (leave empty to show "Coming Soon")',
    }),
    defineField({
      name: 'etransferComingSoon',
      title: 'E-transfer Coming Soon',
      type: 'boolean',
      description: 'Show "Coming Soon" instead of email',
      initialValue: true,
    }),
    // Wise Section
    defineField({
      name: 'wiseEnabled',
      title: 'Enable Wise',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'wiseTitle',
      title: 'Wise Section Title',
      type: 'string',
      initialValue: 'Wise (International)',
    }),
    defineField({
      name: 'wiseDescription',
      title: 'Wise Description',
      type: 'text',
      rows: 2,
      initialValue: 'For international members who want to give larger amounts with low fees.',
    }),
    defineField({
      name: 'wiseAccountName',
      title: 'Wise Account Name',
      type: 'string',
    }),
    defineField({
      name: 'wiseEmail',
      title: 'Wise Email',
      type: 'string',
    }),
    defineField({
      name: 'wiseAccountNumber',
      title: 'Wise Account Number',
      type: 'string',
    }),
    defineField({
      name: 'wiseRoutingNumber',
      title: 'Wise Routing Number',
      type: 'string',
    }),
    defineField({
      name: 'wiseSwiftCode',
      title: 'Wise SWIFT/BIC Code',
      type: 'string',
    }),
    defineField({
      name: 'wiseAdditionalInfo',
      title: 'Wise Additional Information',
      type: 'text',
      rows: 3,
      description: 'Any additional details for Wise transfers',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

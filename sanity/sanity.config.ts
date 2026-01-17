'use client'

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {exportRegistrationPDF} from './actions/exportRegistrationPDF'

export default defineConfig({
  name: 'media-arise',
  title: 'Media Arise CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1bny7eub',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio', // Required for embedding in Next.js

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Add PDF export action for registration documents
      if (context.schemaType === 'registration') {
        return [...prev, exportRegistrationPDF]
      }
      return prev
    },
  },
})

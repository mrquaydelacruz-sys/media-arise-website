'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'media-arise',
  title: 'Media Arise CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1bny7eub',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio', // Required for embedding in Next.js

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Note: PDF export action is configured in sanity/sanity.config.ts
  // This embedded config focuses on basic Studio functionality
  // The PDF export feature is only available in the standalone Studio
})

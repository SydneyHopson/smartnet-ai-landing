import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'smartnet-ai-landingoff',

  projectId: 'ifpwwvdq',
  dataset: 'production_v2',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

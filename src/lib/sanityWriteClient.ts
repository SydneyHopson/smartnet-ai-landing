// src/lib/sanityWriteClient.ts
import { createClient } from '@sanity/client'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in env')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET in env')
}

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error('Missing SANITY_WRITE_TOKEN in env')
}

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01', // any recent date is fine
  useCdn: false, // must be false for writes
  token: process.env.SANITY_WRITE_TOKEN, // 🔐 server-side only
  perspective: 'published',
})

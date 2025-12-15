import { type SchemaTypeDefinition } from 'sanity'
import { magicLinkSession } from '../schemas/magicLinkSession'
import { walkthroughBooking } from '../schemas/walkthroughBooking'
import { smartnetLead } from '../schemas/smartnetLead'

export const schemaTypes: SchemaTypeDefinition[] = [
  magicLinkSession,
  walkthroughBooking,
  smartnetLead,
]

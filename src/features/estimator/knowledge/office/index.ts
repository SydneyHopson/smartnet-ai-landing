import { estimatorPlaybookSchema } from "../playbook";

import { officeAiGuidance } from "./ai-guidance";
import { officeAssumptions } from "./assumptions";
import { officeCommonMistakes } from "./mistakes";
import {
  officeCommonMaterials,
  officeLaborProfiles,
} from "./materials";
import { officeQuestions } from "./questions";
import { officeRecommendations } from "./recommendations";
import { officeRisks } from "./risks";
import { officeStandardsReferences } from "./standards";
import { officeUpsellOpportunities } from "./upsells";
import {
  officeRequiredMeasurements,
  officeRequiredPhotos,
  officeWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const officePlaybook = estimatorPlaybookSchema.parse({
  id: "office-v1",

  name: "Office Low-Voltage Estimator",

  description:
    "SmartNET estimating guidance for commercial office buildings, corporate headquarters, executive offices, coworking spaces, professional offices, and multi-tenant office environments.",

  version: "1.0.0",

  projectTypes: [
    "office",
  ],

  environmentTags: [
    "office",
    "corporate",
    "commercial",
    "coworking",
    "professional",
    "headquarters",
    "executive",
    "business",
  ],

  defaultRuleTags: [
    "office",
    "commercial",
    "enterprise-network",
    "conference-room",
    "structured-cabling",
  ],

  aiGuidance: officeAiGuidance,

  questions: officeQuestions,

  assumptions: officeAssumptions,

  risks: officeRisks,

  recommendations: officeRecommendations,

  walkthroughChecklist: officeWalkthroughChecklist,

  requiredPhotos: officeRequiredPhotos,

  requiredMeasurements: officeRequiredMeasurements,

  commonMaterials: officeCommonMaterials,

  laborProfiles: officeLaborProfiles,

  commonMistakes: officeCommonMistakes,

  upsellOpportunities: officeUpsellOpportunities,

  standardsReferences: officeStandardsReferences,

  metadata: {
    createdAt: now,
    updatedAt: now,
    author: "SmartNET",
    active: true,
  },
});
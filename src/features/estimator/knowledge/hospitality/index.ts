import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { hospitalityAiGuidance } from "./ai-guidance";
import { hospitalityAssumptions } from "./assumptions";
import {
  hospitalityCommonMaterials,
  hospitalityLaborProfiles,
} from "./materials";
import { hospitalityCommonMistakes } from "./mistakes";
import { hospitalityQuestions } from "./questions";
import { hospitalityRecommendations } from "./recommendations";
import { hospitalityRisks } from "./risks";
import { hospitalityStandardsReferences } from "./standards";
import { hospitalityUpsellOpportunities } from "./upsells";
import {
  hospitalityRequiredMeasurements,
  hospitalityRequiredPhotos,
  hospitalityWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const hospitalityPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "hospitality-v1",

    name: "Hospitality Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for hotels, resorts, casinos, conference centers, event venues, and hospitality facilities.",

    version: "1.0.0",

    projectTypes: [
      "hospitality",
    ],

    environmentTags: [
      "hospitality",
      "hotel",
      "resort",
      "casino",
      "conference-center",
      "guest-services",
    ],

    defaultRuleTags: [
      "hospitality",
      "guest-experience",
      "hotel-security",
      "wifi",
      "access-control",
    ],

    aiGuidance: hospitalityAiGuidance,

    questions: hospitalityQuestions,

    assumptions: hospitalityAssumptions,

    risks: hospitalityRisks,

    recommendations: hospitalityRecommendations,

    walkthroughChecklist:
      hospitalityWalkthroughChecklist,

    requiredPhotos:
      hospitalityRequiredPhotos,

    requiredMeasurements:
      hospitalityRequiredMeasurements,

    commonMaterials:
      hospitalityCommonMaterials,

    laborProfiles:
      hospitalityLaborProfiles,

    commonMistakes:
      hospitalityCommonMistakes,

    upsellOpportunities:
      hospitalityUpsellOpportunities,

    standardsReferences:
      hospitalityStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
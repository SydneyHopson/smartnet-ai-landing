import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { industrialAiGuidance } from "./ai-guidance";
import { industrialAssumptions } from "./assumptions";
import {
  industrialCommonMaterials,
  industrialLaborProfiles,
} from "./materials";
import { industrialCommonMistakes } from "./mistakes";
import { industrialQuestions } from "./questions";
import { industrialRecommendations } from "./recommendations";
import { industrialRisks } from "./risks";
import { industrialStandardsReferences } from "./standards";
import { industrialUpsellOpportunities } from "./upsells";
import {
  industrialRequiredMeasurements,
  industrialRequiredPhotos,
  industrialWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const industrialPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "industrial-v1",

    name: "Industrial Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for industrial, manufacturing, production, warehouse, fabrication, and processing facilities.",

    version: "1.0.0",

    projectTypes: [
      "industrial",
    ],

    environmentTags: [
      "industrial",
      "manufacturing",
      "production",
      "factory",
      "processing",
      "warehouse",
    ],

    defaultRuleTags: [
      "industrial",
      "manufacturing",
      "heavy-commercial",
      "ot",
      "ics",
    ],

    aiGuidance: industrialAiGuidance,

    questions: industrialQuestions,

    assumptions: industrialAssumptions,

    risks: industrialRisks,

    recommendations: industrialRecommendations,

    walkthroughChecklist:
      industrialWalkthroughChecklist,

    requiredPhotos:
      industrialRequiredPhotos,

    requiredMeasurements:
      industrialRequiredMeasurements,

    commonMaterials:
      industrialCommonMaterials,

    laborProfiles:
      industrialLaborProfiles,

    commonMistakes:
      industrialCommonMistakes,

    upsellOpportunities:
      industrialUpsellOpportunities,

    standardsReferences:
      industrialStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
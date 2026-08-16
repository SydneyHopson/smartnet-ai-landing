import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { multiLocationAiGuidance } from "./ai-guidance";
import { multiLocationAssumptions } from "./assumptions";
import {
  multiLocationCommonMaterials,
  multiLocationLaborProfiles,
} from "./materials";
import { multiLocationCommonMistakes } from "./mistakes";
import { multiLocationQuestions } from "./questions";
import { multiLocationRecommendations } from "./recommendations";
import { multiLocationRisks } from "./risks";
import { multiLocationStandardsReferences } from "./standards";
import { multiLocationUpsellOpportunities } from "./upsells";
import {
  multiLocationRequiredMeasurements,
  multiLocationRequiredPhotos,
  multiLocationWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const multiLocationPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "multi-location-v1",

    name: "Multi-Location Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for enterprise, franchise, chain, and multi-site deployments.",

    version: "1.0.0",

    projectTypes: [
      "multi_location",
    ],

    environmentTags: [
      "enterprise",
      "multi-site",
      "franchise",
      "rollout",
      "chain",
    ],

    defaultRuleTags: [
      "multi-location",
      "enterprise",
      "standardization",
      "rollout",
      "deployment",
    ],

    aiGuidance: multiLocationAiGuidance,

    questions: multiLocationQuestions,

    assumptions: multiLocationAssumptions,

    risks: multiLocationRisks,

    recommendations: multiLocationRecommendations,

    walkthroughChecklist:
      multiLocationWalkthroughChecklist,

    requiredPhotos:
      multiLocationRequiredPhotos,

    requiredMeasurements:
      multiLocationRequiredMeasurements,

    commonMaterials:
      multiLocationCommonMaterials,

    laborProfiles:
      multiLocationLaborProfiles,

    commonMistakes:
      multiLocationCommonMistakes,

    upsellOpportunities:
      multiLocationUpsellOpportunities,

    standardsReferences:
      multiLocationStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { religiousAiGuidance } from "./ai-guidance";
import { religiousAssumptions } from "./assumptions";
import {
  religiousCommonMaterials,
  religiousLaborProfiles,
} from "./materials";
import { religiousCommonMistakes } from "./mistakes";
import { religiousQuestions } from "./questions";
import { religiousRecommendations } from "./recommendations";
import { religiousRisks } from "./risks";
import { religiousStandardsReferences } from "./standards";
import { religiousUpsellOpportunities } from "./upsells";
import {
  religiousRequiredMeasurements,
  religiousRequiredPhotos,
  religiousWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const religiousPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "religious-v1",

    name: "Religious Facility Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for churches, synagogues, mosques, temples, ministries, worship centers, and religious campuses.",

    version: "1.0.0",

    projectTypes: [
      "religious",
    ],

    environmentTags: [
      "religious",
      "church",
      "worship",
      "ministry",
      "campus",
    ],

    defaultRuleTags: [
      "religious",
      "audio",
      "livestream",
      "security",
      "worship",
    ],

    aiGuidance: religiousAiGuidance,

    questions: religiousQuestions,

    assumptions: religiousAssumptions,

    risks: religiousRisks,

    recommendations: religiousRecommendations,

    walkthroughChecklist:
      religiousWalkthroughChecklist,

    requiredPhotos:
      religiousRequiredPhotos,

    requiredMeasurements:
      religiousRequiredMeasurements,

    commonMaterials:
      religiousCommonMaterials,

    laborProfiles:
      religiousLaborProfiles,

    commonMistakes:
      religiousCommonMistakes,

    upsellOpportunities:
      religiousUpsellOpportunities,

    standardsReferences:
      religiousStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
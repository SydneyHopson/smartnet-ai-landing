import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { educationAiGuidance } from "./ai-guidance";
import { educationAssumptions } from "./assumptions";
import {
  educationCommonMaterials,
  educationLaborProfiles,
} from "./materials";
import { educationCommonMistakes } from "./mistakes";
import { educationQuestions } from "./questions";
import { educationRecommendations } from "./recommendations";
import { educationRisks } from "./risks";
import { educationStandardsReferences } from "./standards";
import { educationUpsellOpportunities } from "./upsells";
import {
  educationRequiredMeasurements,
  educationRequiredPhotos,
  educationWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const educationPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "education-v1",

    name: "Education Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for K-12 schools, universities, colleges, libraries, training centers, and educational campuses.",

    version: "1.0.0",

    projectTypes: [
      "education",
    ],

    environmentTags: [
      "education",
      "school",
      "k12",
      "college",
      "university",
      "campus",
    ],

    defaultRuleTags: [
      "education",
      "campus",
      "classroom",
      "school-security",
      "edtech",
    ],

    aiGuidance: educationAiGuidance,

    questions: educationQuestions,

    assumptions: educationAssumptions,

    risks: educationRisks,

    recommendations: educationRecommendations,

    walkthroughChecklist:
      educationWalkthroughChecklist,

    requiredPhotos:
      educationRequiredPhotos,

    requiredMeasurements:
      educationRequiredMeasurements,

    commonMaterials:
      educationCommonMaterials,

    laborProfiles:
      educationLaborProfiles,

    commonMistakes:
      educationCommonMistakes,

    upsellOpportunities:
      educationUpsellOpportunities,

    standardsReferences:
      educationStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
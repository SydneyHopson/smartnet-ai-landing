import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { medicalAiGuidance } from "./ai-guidance";
import { medicalAssumptions } from "./assumptions";
import {
  medicalCommonMaterials,
  medicalLaborProfiles,
} from "./materials";
import { medicalCommonMistakes } from "./mistakes";
import { medicalQuestions } from "./questions";
import { medicalRecommendations } from "./recommendations";
import { medicalRisks } from "./risks";
import { medicalStandardsReferences } from "./standards";
import { medicalUpsellOpportunities } from "./upsells";
import {
  medicalRequiredMeasurements,
  medicalRequiredPhotos,
  medicalWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const medicalPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "medical-v1",

    name: "Medical Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for hospitals, clinics, surgery centers, imaging facilities, laboratories, urgent care centers, dental offices, and other healthcare environments.",

    version: "1.0.0",

    projectTypes: [
      "medical",
    ],

    environmentTags: [
      "medical",
      "healthcare",
      "hospital",
      "clinic",
      "laboratory",
      "urgent-care",
      "dental",
    ],

    defaultRuleTags: [
      "medical",
      "healthcare",
      "hipaa",
      "clinical-environment",
      "patient-safety",
      "critical-infrastructure",
    ],

    aiGuidance: medicalAiGuidance,

    questions: medicalQuestions,

    assumptions: medicalAssumptions,

    risks: medicalRisks,

    recommendations: medicalRecommendations,

    walkthroughChecklist:
      medicalWalkthroughChecklist,

    requiredPhotos:
      medicalRequiredPhotos,

    requiredMeasurements:
      medicalRequiredMeasurements,

    commonMaterials:
      medicalCommonMaterials,

    laborProfiles:
      medicalLaborProfiles,

    commonMistakes:
      medicalCommonMistakes,

    upsellOpportunities:
      medicalUpsellOpportunities,

    standardsReferences:
      medicalStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
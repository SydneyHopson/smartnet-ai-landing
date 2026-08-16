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
import {
  medicalCommonMistakes,
  medicalStandardsReferences,
  medicalUpsellOpportunities,
} from "./mistakes";
import { medicalQuestions } from "./questions";
import { medicalRecommendations } from "./recommendations";
import { medicalRisks } from "./risks";
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
      "SmartNET commercial estimating guidance for physician offices, dental practices, urgent care centers, outpatient clinics, imaging centers, laboratories, pharmacies, behavioral-health facilities, ambulatory surgery centers, and other healthcare environments.",

    version: "1.0.0",

    projectTypes: [
      "medical",
    ],

    environmentTags: [
      "medical",
      "healthcare",
      "clinic",
      "physician-office",
      "dental-office",
      "urgent-care",
      "outpatient",
      "imaging",
      "laboratory",
      "pharmacy",
      "behavioral-health",
      "ambulatory-surgery",
    ],

    defaultRuleTags: [
      "medical",
      "healthcare",
      "commercial",
      "patient-privacy",
      "infection-control",
      "healthcare-network",
      "medical-wifi",
      "medical-security",
      "clinical-operations",
      "commercial-estimate",
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
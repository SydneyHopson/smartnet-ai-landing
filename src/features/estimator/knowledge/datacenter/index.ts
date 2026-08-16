import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { datacenterAiGuidance } from "./ai-guidance";
import { datacenterAssumptions } from "./assumptions";
import {
  datacenterCommonMaterials,
  datacenterLaborProfiles,
} from "./materials";
import { datacenterCommonMistakes } from "./mistakes";
import { datacenterQuestions } from "./questions";
import { datacenterRecommendations } from "./recommendations";
import { datacenterRisks } from "./risks";
import { datacenterStandardsReferences } from "./standards";
import { datacenterUpsellOpportunities } from "./upsells";
import {
  datacenterRequiredMeasurements,
  datacenterRequiredPhotos,
  datacenterWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const datacenterPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "datacenter-v1",

    name: "Datacenter Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for hyperscale, enterprise, edge, and colocation datacenters.",

    version: "1.0.0",

    projectTypes: [
      "datacenter",
    ],

    environmentTags: [
      "datacenter",
      "hyperscale",
      "colo",
      "enterprise",
      "mission-critical",
    ],

    defaultRuleTags: [
      "datacenter",
      "fiber",
      "structured-cabling",
      "critical-infrastructure",
      "network",
    ],

    aiGuidance: datacenterAiGuidance,

    questions: datacenterQuestions,

    assumptions: datacenterAssumptions,

    risks: datacenterRisks,

    recommendations: datacenterRecommendations,

    walkthroughChecklist:
      datacenterWalkthroughChecklist,

    requiredPhotos:
      datacenterRequiredPhotos,

    requiredMeasurements:
      datacenterRequiredMeasurements,

    commonMaterials:
      datacenterCommonMaterials,

    laborProfiles:
      datacenterLaborProfiles,

    commonMistakes:
      datacenterCommonMistakes,

    upsellOpportunities:
      datacenterUpsellOpportunities,

    standardsReferences:
      datacenterStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
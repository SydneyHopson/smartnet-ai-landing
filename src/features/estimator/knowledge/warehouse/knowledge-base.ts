import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { warehouseAiGuidance } from "./ai-guidance";
import { warehouseAssumptions } from "./assumptions";
import {
  warehouseCommonMaterials,
  warehouseLaborProfiles,
} from "./materials";
import {
  warehouseCommonMistakes,
  warehouseStandardsReferences,
  warehouseUpsellOpportunities,
} from "./mistakes";
import { warehouseQuestions } from "./questions";
import { warehouseRecommendations } from "./recommendations";
import { warehouseRisks } from "./risks";
import {
  warehouseRequiredMeasurements,
  warehouseRequiredPhotos,
  warehouseWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const warehousePlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "warehouse-v1",

    name: "Warehouse Low-Voltage Estimator",

    description:
      "SmartNET estimating guidance for warehouses, fulfillment centers, logistics facilities, manufacturing storage facilities, and distribution centers.",

    version: "1.0.0",

    projectTypes: [
      "warehouse",
    ],

    environmentTags: [
      "warehouse",
      "distribution-center",
      "fulfillment-center",
      "logistics",
      "shipping",
      "receiving",
      "inventory",
      "manufacturing-warehouse",
      "cold-storage",
      "cross-dock",
    ],

    questions: warehouseQuestions,

    assumptions: warehouseAssumptions,

    risks: warehouseRisks,

    recommendations: warehouseRecommendations,

    walkthroughChecklist:
      warehouseWalkthroughChecklist,

    requiredPhotos: warehouseRequiredPhotos,

    requiredMeasurements:
      warehouseRequiredMeasurements,

    commonMaterials: warehouseCommonMaterials,

    laborProfiles: warehouseLaborProfiles,

    commonMistakes: warehouseCommonMistakes,

    upsellOpportunities:
      warehouseUpsellOpportunities,

    standardsReferences:
      warehouseStandardsReferences,

    defaultRuleTags: [
      "warehouse",
      "commercial",
      "high-ceiling-review",
      "forklift-review",
      "lift-required-review",
      "fiber-review",
      "loading-dock-review",
      "long-cable-run-review",
      "warehouse-wifi",
      "warehouse-security",
      "commercial-estimate",
    ],

    aiGuidance: warehouseAiGuidance,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });

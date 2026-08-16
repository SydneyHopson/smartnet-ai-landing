import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "../playbook";

import { restaurantAiGuidance } from "./ai-guidance";
import { restaurantAssumptions } from "./assumptions";
import {
  restaurantCommonMaterials,
  restaurantLaborProfiles,
} from "./materials";
import {
  restaurantCommonMistakes,
  restaurantStandardsReferences,
  restaurantUpsellOpportunities,
} from "./mistakes";
import { restaurantQuestions } from "./questions";
import { restaurantRecommendations } from "./recommendations";
import { restaurantRisks } from "./risks";
import {
  restaurantRequiredMeasurements,
  restaurantRequiredPhotos,
  restaurantWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const restaurantPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "restaurant-v1",

    name: "Restaurant Low-Voltage Estimator",

    description:
      "SmartNET commercial estimating guidance for restaurants, bars, cafés, food-service facilities, quick-service restaurants, full-service restaurants, ghost kitchens, and drive-through environments.",

    version: "1.0.0",

    projectTypes: [
      "restaurant",
    ],

    environmentTags: [
      "restaurant",
      "food-service",
      "commercial-kitchen",
      "bar",
      "cafe",
      "drive-through",
      "hospitality",
    ],

    defaultRuleTags: [
      "restaurant",
      "commercial",
      "food-service",
      "restaurant-security",
      "restaurant-network",
      "restaurant-wifi",
      "restaurant-audio",
    ],

    aiGuidance: restaurantAiGuidance,

    questions: restaurantQuestions,

    assumptions: restaurantAssumptions,

    risks: restaurantRisks,

    recommendations: restaurantRecommendations,

    walkthroughChecklist:
      restaurantWalkthroughChecklist,

    requiredPhotos:
      restaurantRequiredPhotos,

    requiredMeasurements:
      restaurantRequiredMeasurements,

    commonMaterials:
      restaurantCommonMaterials,

    laborProfiles:
      restaurantLaborProfiles,

    commonMistakes:
      restaurantCommonMistakes,

    upsellOpportunities:
      restaurantUpsellOpportunities,

    standardsReferences:
      restaurantStandardsReferences,

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
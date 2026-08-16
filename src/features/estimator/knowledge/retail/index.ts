import { estimatorPlaybookSchema } from "../playbook";

import { retailAiGuidance } from "./ai-guidance";
import { retailAssumptions } from "./assumptions";
import { retailCommonMistakes } from "./mistakes";
import {
  retailCommonMaterials,
  retailLaborProfiles,
} from "./materials";
import { retailQuestions } from "./questions";
import { retailRecommendations } from "./recommendations";
import { retailRisks } from "./risks";
import { retailStandardsReferences } from "./standards";
import { retailUpsellOpportunities } from "./upsells";
import {
  retailRequiredMeasurements,
  retailRequiredPhotos,
  retailWalkthroughChecklist,
} from "./walkthrough";

const now = new Date().toISOString();

export const retailPlaybook = estimatorPlaybookSchema.parse({
  id: "retail-v1",

  name: "Retail Low-Voltage Estimator",

  description:
    "SmartNET estimating guidance for retail stores, shopping centers, malls, grocery stores, pharmacies, boutiques, department stores, and commercial retail environments.",

  version: "1.0.0",

  projectTypes: [
    "retail",
  ],

  environmentTags: [
    "retail",
    "shopping",
    "mall",
    "storefront",
    "grocery",
    "pharmacy",
    "department-store",
    "big-box",
  ],

  defaultRuleTags: [
    "retail",
    "loss-prevention",
    "customer-safety",
    "transaction-camera",
    "point-of-sale",
    "guest-wifi",
    "digital-signage",
  ],

  aiGuidance: retailAiGuidance,

  questions: retailQuestions,

  assumptions: retailAssumptions,

  risks: retailRisks,

  recommendations: retailRecommendations,

  walkthroughChecklist: retailWalkthroughChecklist,

  requiredPhotos: retailRequiredPhotos,

  requiredMeasurements: retailRequiredMeasurements,

  commonMaterials: retailCommonMaterials,

  laborProfiles: retailLaborProfiles,

  commonMistakes: retailCommonMistakes,

  upsellOpportunities: retailUpsellOpportunities,

  standardsReferences: retailStandardsReferences,

  metadata: {
    createdAt: now,
    updatedAt: now,
    author: "SmartNET",
    active: true,
  },
});
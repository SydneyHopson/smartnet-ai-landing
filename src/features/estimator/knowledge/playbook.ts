import { z } from "zod";

import { projectTypeSchema } from "../domain/project-estimate";

export const playbookConditionSchema = z.object({
  field: z.string().min(1),

  operator: z.enum([
    "equals",
    "not_equals",
    "includes",
    "not_includes",
    "greater_than",
    "greater_than_or_equal",
    "less_than",
    "less_than_or_equal",
    "is_known",
    "is_unknown",
    "is_true",
    "is_false",
  ]),

  value: z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.string()),
    ])
    .optional(),
});

export const playbookQuestionSchema = z.object({
  id: z.string().min(1),

  projectField: z.string().min(1),

  question: z.string().min(1),

  promptGuidance: z.string().default(""),

  reason: z.string().min(1),

  category: z.enum([
    "discovery",
    "property",
    "cameras",
    "network",
    "wifi",
    "access_control",
    "cabling",
    "audio_visual",
    "installation",
    "safety",
    "commercial",
    "pricing",
  ]),

  priority: z.enum([
    "critical",
    "high",
    "normal",
    "optional",
  ]),

  answerType: z.enum([
    "text",
    "boolean",
    "number",
    "single_choice",
    "multiple_choice",
  ]),

  choices: z.array(z.string()).default([]),

  conditions: z.array(playbookConditionSchema).default([]),

  dependsOn: z.array(z.string()).default([]),

  unlocks: z.array(z.string()).default([]),

  ruleTags: z.array(z.string()).default([]),

  requiredForPreliminaryEstimate: z.boolean().default(false),

  requiredForFinalQuote: z.boolean().default(false),
});

export const playbookAssumptionSchema = z.object({
  id: z.string().min(1),

  text: z.string().min(1),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookRiskSchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),

  description: z.string().min(1),

  severity: z.enum([
    "low",
    "medium",
    "high",
    "critical",
  ]),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookRecommendationSchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),

  description: z.string().min(1),

  category: z.enum([
    "camera",
    "network",
    "wifi",
    "access_control",
    "cabling",
    "rack",
    "power",
    "audio_visual",
    "service",
    "other",
  ]),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookChecklistItemSchema = z.object({
  id: z.string().min(1),

  label: z.string().min(1),

  instructions: z.string().default(""),

  category: z.enum([
    "site",
    "property",
    "camera",
    "network",
    "wifi",
    "access_control",
    "cabling",
    "power",
    "safety",
    "installation",
    "documentation",
    "other",
  ]),

  required: z.boolean().default(false),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookPhotoRequirementSchema = z.object({
  id: z.string().min(1),

  label: z.string().min(1),

  instructions: z.string().min(1),

  category: z.enum([
    "site",
    "camera",
    "network",
    "wifi",
    "access_control",
    "cabling",
    "power",
    "safety",
    "other",
  ]),

  required: z.boolean().default(false),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookMeasurementSchema = z.object({
  id: z.string().min(1),

  label: z.string().min(1),

  unit: z.enum([
    "feet",
    "inches",
    "square_feet",
    "count",
    "degrees",
    "decibels",
    "dbm",
    "other",
  ]),

  instructions: z.string().min(1),

  required: z.boolean().default(false),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookMaterialSchema = z.object({
  id: z.string().min(1),

  category: z.enum([
    "cable",
    "fiber",
    "pathway",
    "support",
    "rack",
    "network",
    "camera",
    "wifi",
    "access_control",
    "power",
    "labeling",
    "firestop",
    "hardware",
    "consumable",
    "other",
  ]),

  name: z.string().min(1),

  description: z.string().default(""),

  unit: z.string().min(1),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookLaborProfileSchema = z.object({
  id: z.string().min(1),

  name: z.string().min(1),

  description: z.string().min(1),

  typicalCrewSizeMin: z.number().int().positive(),

  typicalCrewSizeMax: z.number().int().positive(),

  laborDrivers: z.array(z.string()).default([]),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookCommonMistakeSchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),

  description: z.string().min(1),

  prevention: z.string().min(1),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookUpsellOpportunitySchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),

  description: z.string().min(1),

  valueStatement: z.string().min(1),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const playbookStandardsReferenceSchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),

  reference: z.string().min(1),

  relevance: z.string().min(1),

  jurisdictionDependent: z.boolean().default(true),

  conditions: z.array(playbookConditionSchema).default([]),

  ruleTags: z.array(z.string()).default([]),
});

export const estimatorPlaybookSchema = z.object({
  id: z.string().min(1),

  name: z.string().min(1),

  description: z.string().min(1),

  version: z.string().min(1),

  projectTypes: z.array(projectTypeSchema).min(1),

  environmentTags: z.array(z.string()).default([]),

  questions: z.array(playbookQuestionSchema).default([]),

  assumptions: z.array(playbookAssumptionSchema).default([]),

  risks: z.array(playbookRiskSchema).default([]),

  recommendations: z
    .array(playbookRecommendationSchema)
    .default([]),

  walkthroughChecklist: z
    .array(playbookChecklistItemSchema)
    .default([]),

  requiredPhotos: z
    .array(playbookPhotoRequirementSchema)
    .default([]),

  requiredMeasurements: z
    .array(playbookMeasurementSchema)
    .default([]),

  commonMaterials: z
    .array(playbookMaterialSchema)
    .default([]),

  laborProfiles: z
    .array(playbookLaborProfileSchema)
    .default([]),

  commonMistakes: z
    .array(playbookCommonMistakeSchema)
    .default([]),

  upsellOpportunities: z
    .array(playbookUpsellOpportunitySchema)
    .default([]),

  standardsReferences: z
    .array(playbookStandardsReferenceSchema)
    .default([]),

  defaultRuleTags: z.array(z.string()).default([]),

  aiGuidance: z.string().default(""),

  metadata: z.object({
    createdAt: z.string().datetime(),

    updatedAt: z.string().datetime(),

    author: z.string().default("SmartNET"),

    active: z.boolean().default(true),
  }),
});

export type PlaybookCondition = z.infer<
  typeof playbookConditionSchema
>;

export type PlaybookQuestion = z.infer<
  typeof playbookQuestionSchema
>;

export type PlaybookAssumption = z.infer<
  typeof playbookAssumptionSchema
>;

export type PlaybookRisk = z.infer<
  typeof playbookRiskSchema
>;

export type PlaybookRecommendation = z.infer<
  typeof playbookRecommendationSchema
>;

export type PlaybookChecklistItem = z.infer<
  typeof playbookChecklistItemSchema
>;

export type PlaybookPhotoRequirement = z.infer<
  typeof playbookPhotoRequirementSchema
>;

export type PlaybookMeasurement = z.infer<
  typeof playbookMeasurementSchema
>;

export type PlaybookMaterial = z.infer<
  typeof playbookMaterialSchema
>;

export type PlaybookLaborProfile = z.infer<
  typeof playbookLaborProfileSchema
>;

export type PlaybookCommonMistake = z.infer<
  typeof playbookCommonMistakeSchema
>;

export type PlaybookUpsellOpportunity = z.infer<
  typeof playbookUpsellOpportunitySchema
>;

export type PlaybookStandardsReference = z.infer<
  typeof playbookStandardsReferenceSchema
>;

export type EstimatorPlaybook = z.infer<
  typeof estimatorPlaybookSchema
>;
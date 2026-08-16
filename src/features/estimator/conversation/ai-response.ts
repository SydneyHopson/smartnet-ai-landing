import { z } from "zod";

import { projectEstimateSchema } from "../domain/project-estimate";

/**
 * Deep-enough patch schema for incremental AI updates.
 *
 * Each top-level project section is optional, and every field inside
 * an included section is also optional.
 *
 * The final merged project will still be validated using the complete
 * projectEstimateSchema.
 */
export const projectEstimatePatchSchema = projectEstimateSchema
  .partial()
  .extend({
    customerIntent:
      projectEstimateSchema.shape.customerIntent.partial().optional(),

    property:
      projectEstimateSchema.shape.property.partial().optional(),

    cameras:
      projectEstimateSchema.shape.cameras.partial().optional(),

    network:
      projectEstimateSchema.shape.network.partial().optional(),

    wifi:
      projectEstimateSchema.shape.wifi.partial().optional(),

    accessControl:
      projectEstimateSchema.shape.accessControl.partial().optional(),

    cabling:
      projectEstimateSchema.shape.cabling.partial().optional(),

    installation:
      projectEstimateSchema.shape.installation.partial().optional(),

    equipment:
      projectEstimateSchema.shape.equipment.partial().optional(),

    pricing:
      projectEstimateSchema.shape.pricing.partial().optional(),

    assessment:
      projectEstimateSchema.shape.assessment.partial().optional(),

    metadata:
      projectEstimateSchema.shape.metadata.partial().optional(),
  });

export const aiEstimatorResponseSchema = z.object({
  assistantMessage: z.string().min(1),

  conversationStatus: z.enum([
    "collecting_scope",
    "awaiting_customer",
    "ready_for_pricing",
    "completed",
  ]),

  currentQuestion: z.string().nullable(),

  currentQuestionKey: z.string().nullable(),

  completedQuestionKeys: z.array(z.string()).default([]),

  unansweredQuestionKeys: z.array(z.string()).default([]),

  readyForPricing: z.boolean(),

  confidenceScore: z.number().min(0).max(100),

  /**
   * A brief explanation suitable for logs and the owner dashboard.
   * This is not private chain-of-thought reasoning.
   */
  reasoningSummary: z.string().default(""),

  detectedIntent: z.object({
    primaryGoal: z.string().nullable().default(null),

    projectCategory: z.string().nullable().default(null),

    urgency: z.string().nullable().default(null),
  }),

  /**
   * Only fields discovered or changed during this turn.
   * These updates will later be merged into the complete project model.
   */
  projectUpdates: projectEstimatePatchSchema.default({}),

  assumptionsAdded: z.array(z.string()).default([]),

  risksAdded: z.array(z.string()).default([]),

  exclusionsAdded: z.array(z.string()).default([]),
});

export type ProjectEstimatePatch = z.infer<
  typeof projectEstimatePatchSchema
>;

export type AiEstimatorResponse = z.infer<
  typeof aiEstimatorResponseSchema
>;
import { z } from "zod";

export const conversationRoleSchema = z.enum([
  "system",
  "assistant",
  "user",
]);

export const conversationMessageSchema = z.object({
  id: z.string(),
  role: conversationRoleSchema,
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const estimatorConversationStateSchema = z.object({
  sessionId: z.string(),

  status: z
    .enum([
      "not_started",
      "collecting_scope",
      "awaiting_customer",
      "ready_for_pricing",
      "completed",
      "error",
    ])
    .default("not_started"),

  messages: z.array(conversationMessageSchema).default([]),

  currentQuestion: z.string().nullable().default(null),

  currentQuestionKey: z.string().nullable().default(null),

  unansweredQuestionKeys: z.array(z.string()).default([]),

  completedQuestionKeys: z.array(z.string()).default([]),

  lastCustomerMessage: z.string().nullable().default(null),

  lastAssistantMessage: z.string().nullable().default(null),

  readyForPricing: z.boolean().default(false),

  confidenceScore: z.number().min(0).max(100).default(0),

  createdAt: z.string().datetime(),

  updatedAt: z.string().datetime(),
});

export type ConversationMessage = z.infer<
  typeof conversationMessageSchema
>;

export type EstimatorConversationState = z.infer<
  typeof estimatorConversationStateSchema
>;

export function createEstimatorConversationState(
  sessionId: string
): EstimatorConversationState {
  const now = new Date().toISOString();

  return estimatorConversationStateSchema.parse({
    sessionId,
    status: "not_started",
    messages: [],
    currentQuestion: null,
    currentQuestionKey: null,
    unansweredQuestionKeys: [],
    completedQuestionKeys: [],
    lastCustomerMessage: null,
    lastAssistantMessage: null,
    readyForPricing: false,
    confidenceScore: 0,
    createdAt: now,
    updatedAt: now,
  });
}
import type { ProjectEstimate } from "../domain/project-estimate";

import {
  getCombinedEstimatorQuestions,
  isCombinedProjectReadyForFinalQuote,
  isCombinedProjectReadyForPreliminaryPricing,
  type CombinedEstimatorQuestion,
} from "./combined-question-planner";

import {
  createEstimatorConversationState,
  type EstimatorConversationState,
} from "./conversation-state";

export type ConversationTurnResult = {
  project: ProjectEstimate;
  conversation: EstimatorConversationState;
};

type StartConversationOptions = {
  sessionId: string;
  project: ProjectEstimate;
};

export function startEstimatorConversation({
  sessionId,
  project,
}: StartConversationOptions): ConversationTurnResult {
  const now = new Date().toISOString();

  const conversation =
    createEstimatorConversationState(sessionId);

  const unansweredQuestions =
    getCombinedEstimatorQuestions(project);

  const nextQuestion =
    unansweredQuestions[0] ?? null;

  const readyForPricing =
    isCombinedProjectReadyForPreliminaryPricing(
      project
    );

  const readyForFinalQuote =
    isCombinedProjectReadyForFinalQuote(
      project
    );

  const assistantMessage =
    createAssistantMessage(
      nextQuestion,
      readyForPricing,
      readyForFinalQuote
    );

  conversation.status =
    getConversationStatus(
      nextQuestion,
      readyForPricing
    );

  conversation.currentQuestion =
    nextQuestion?.question ?? null;

  conversation.currentQuestionKey =
    nextQuestion?.projectField ?? null;

  conversation.unansweredQuestionKeys =
    unansweredQuestions.map(
      (question) => question.projectField
    );

  conversation.completedQuestionKeys = [];

  conversation.readyForPricing =
    readyForPricing;

  conversation.confidenceScore =
    calculateConversationConfidence(
      unansweredQuestions
    );

  conversation.lastAssistantMessage =
    assistantMessage;

  conversation.messages.push({
    id: createMessageId(),
    role: "assistant",
    content: assistantMessage,
    createdAt: now,
  });

  conversation.updatedAt = now;

  return {
    project,
    conversation,
  };
}

export function refreshEstimatorConversation(
  project: ProjectEstimate,
  conversation: EstimatorConversationState
): ConversationTurnResult {
  const now = new Date().toISOString();

  const previousUnansweredKeys = new Set(
    conversation.unansweredQuestionKeys
  );

  const unansweredQuestions =
    getCombinedEstimatorQuestions(project);

  const unansweredQuestionKeys =
    unansweredQuestions.map(
      (question) => question.projectField
    );

  const nextQuestion =
    unansweredQuestions[0] ?? null;

  const completedQuestionKeys =
    mergeCompletedQuestionKeys(
      conversation.completedQuestionKeys,
      previousUnansweredKeys,
      unansweredQuestionKeys
    );

  const readyForPricing =
    isCombinedProjectReadyForPreliminaryPricing(
      project
    );

  const readyForFinalQuote =
    isCombinedProjectReadyForFinalQuote(
      project
    );

  const assistantMessage =
    createAssistantMessage(
      nextQuestion,
      readyForPricing,
      readyForFinalQuote
    );

  const nextConversation: EstimatorConversationState = {
    ...conversation,

    status: getConversationStatus(
      nextQuestion,
      readyForPricing
    ),

    currentQuestion:
      nextQuestion?.question ?? null,

    currentQuestionKey:
      nextQuestion?.projectField ?? null,

    unansweredQuestionKeys,

    completedQuestionKeys,

    readyForPricing,

    confidenceScore:
      calculateConversationConfidence(
        unansweredQuestions
      ),

    lastAssistantMessage:
      assistantMessage,

    updatedAt: now,
  };

  if (
    assistantMessage !==
    conversation.lastAssistantMessage
  ) {
    nextConversation.messages = [
      ...conversation.messages,
      {
        id: createMessageId(),
        role: "assistant",
        content: assistantMessage,
        createdAt: now,
      },
    ];
  }

  return {
    project,
    conversation: nextConversation,
  };
}

function mergeCompletedQuestionKeys(
  existingCompletedKeys: string[],
  previousUnansweredKeys: Set<string>,
  currentUnansweredKeys: string[]
): string[] {
  const completedKeys = new Set(
    existingCompletedKeys
  );

  const currentUnansweredSet = new Set(
    currentUnansweredKeys
  );

  for (
    const previousKey
    of previousUnansweredKeys
  ) {
    if (
      !currentUnansweredSet.has(previousKey)
    ) {
      completedKeys.add(previousKey);
    }
  }

  return Array.from(completedKeys);
}

function getConversationStatus(
  nextQuestion: CombinedEstimatorQuestion | null,
  readyForPricing: boolean
): EstimatorConversationState["status"] {
  if (nextQuestion) {
    return "awaiting_customer";
  }

  if (readyForPricing) {
    return "ready_for_pricing";
  }

  return "completed";
}

function createAssistantMessage(
  nextQuestion: CombinedEstimatorQuestion | null,
  readyForPricing: boolean,
  readyForFinalQuote: boolean
): string {
  if (nextQuestion) {
    return nextQuestion.question;
  }

  if (readyForFinalQuote) {
    return "I have enough information to prepare the final SmartNET project scope and quote.";
  }

  if (readyForPricing) {
    return "I have enough information to prepare a preliminary SmartNET estimate.";
  }

  return "The SmartNET project discovery conversation is complete.";
}

function calculateConversationConfidence(
  unansweredQuestions: CombinedEstimatorQuestion[]
): number {
  const penalty =
    unansweredQuestions.reduce(
      (total, question) => {
        switch (question.priority) {
          case "critical":
            return total + 12;

          case "high":
            return total + 6;

          case "normal":
            return total + 2;

          case "optional":
            return total + 1;

          default:
            return total;
        }
      },
      0
    );

  return Math.max(
    0,
    Math.min(100, 100 - penalty)
  );
}

function createMessageId(): string {
  return crypto.randomUUID();
}
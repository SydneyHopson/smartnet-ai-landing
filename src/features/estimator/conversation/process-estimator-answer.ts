import { extractEstimatorResponse } from "../ai/azure-estimator-extractor";

import type { ProjectEstimate } from "../domain/project-estimate";
import { mergeProjectEstimatePatch } from "../domain/merge-project-patch";
import { normalizeProjectFieldValue } from "../domain/normalize-project-field-value";

import { calculateEstimate } from "../pricing/pricing-engine";

import {
  normalizeEstimatorAnswer,
  type NormalizedEstimatorAnswer,
} from "./answer-normalizer";

import { createProjectPatchFromAnswer } from "./answer-project-patch";

import {
  getCombinedEstimatorQuestions,
  isCombinedProjectReadyForPreliminaryPricing,
  type CombinedEstimatorQuestion,
} from "./combined-question-planner";

import {
  refreshEstimatorConversation,
  type ConversationTurnResult,
} from "./conversation-orchestrator";

import type { EstimatorConversationState } from "./conversation-state";

export type ProcessEstimatorAnswerInput = {
  project: ProjectEstimate;

  conversation: EstimatorConversationState;

  question: CombinedEstimatorQuestion;

  rawAnswer: unknown;
};

export type ProcessEstimatorAnswerSuccess = {
  ok: true;

  normalizedAnswer: NormalizedEstimatorAnswer;

  result: ConversationTurnResult;
};

export type ProcessEstimatorAnswerFailure = {
  ok: false;

  error: string;

  field: string;

  questionKey: string;
};

export type ProcessEstimatorAnswerResult =
  | ProcessEstimatorAnswerSuccess
  | ProcessEstimatorAnswerFailure;

type QuantityValue = {
  value: number | null;

  confidence:
    | "unknown"
    | "customer_reported"
    | "ai_inferred"
    | "site_verified";
};

export async function processEstimatorAnswer({
  project,
  conversation,
  question,
  rawAnswer,
}: ProcessEstimatorAnswerInput): Promise<ProcessEstimatorAnswerResult> {
  const validationError =
    validateCurrentQuestion(
      conversation,
      question
    );

  if (validationError) {
    return {
      ok: false,

      error:
        validationError,

      field:
        question.projectField,

      questionKey:
        question.key,
    };
  }

  const normalizedQuestion =
    normalizeQuestionAnswerType(
      question
    );

  const normalizedRawAnswer =
    normalizeProjectFieldValue(
      question.projectField,
      rawAnswer
    );

  const normalized =
    normalizeEstimatorAnswer(
      normalizedQuestion,
      normalizedRawAnswer
    );

  const customerMessage =
    typeof rawAnswer === "string"
      ? rawAnswer.trim()
      : "";

  let updatedProject =
    project;

  let aiResolvedCurrentQuestion =
    false;

  /*
   * Natural-language answers may contain multiple useful facts.
   *
   * Azure extracts them first, but the resulting project is protected
   * against default null, empty, and "unknown" values that may appear
   * inside a partial AI patch.
   */
  if (customerMessage) {
    try {
      const aiResponse =
        await extractEstimatorResponse({
          customerMessage,

          project,

          currentQuestion:
            question.question,

          remainingQuestions:
            conversation
              .unansweredQuestionKeys,
        });

      const aiMergedProject =
        mergeProjectEstimatePatch(
          updatedProject,
          aiResponse.projectUpdates
        );

      updatedProject =
        preserveKnownProjectFacts(
          project,
          aiMergedProject
        );

      aiResolvedCurrentQuestion =
        !isQuestionStillUnanswered(
          updatedProject,
          question.projectField
        );
    } catch (error) {
      console.error(
        "[SmartNET Azure extraction fallback]",
        error
      );
    }
  }

  /*
   * The deterministic patch guarantees that the answer to the current
   * question is stored on its exact ProjectEstimate field.
   */
  if (normalized.ok) {
    try {
      const deterministicPatch =
        createProjectPatchFromAnswer(
          normalizedQuestion,
          normalized.value
        );

      const deterministicMergedProject =
        mergeProjectEstimatePatch(
          updatedProject,
          deterministicPatch
        );

      /*
       * Use updatedProject as the previous state here so every fact
       * extracted during this turn is also protected.
       */
      updatedProject =
        preserveKnownProjectFacts(
          updatedProject,
          deterministicMergedProject
        );
    } catch (error) {
      return {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "The estimator answer could not be processed.",

        field:
          question.projectField,

        questionKey:
          question.key,
      };
    }
  } else if (
    !aiResolvedCurrentQuestion
  ) {
    return {
      ok: false,

      error:
        normalized.error,

      field:
        question.projectField,

      questionKey:
        question.key,
    };
  }

  try {
    updatedProject =
      calculatePreliminaryPricingWhenReady(
        updatedProject
      );

    const conversationAnswer =
      normalized.ok
        ? normalized.value
        : customerMessage;

    const conversationWithUserMessage =
      appendUserMessage(
        conversation,
        conversationAnswer
      );

    console.log(
      "[SmartNET answer diagnostic]",
      {
        answeredField:
          question.projectField,

        normalizedQuestionType:
          normalizedQuestion.answerType,

        rawAnswer,

        normalizedValue:
          normalized.ok
            ? normalized.value
            : null,

        cabling: {
          existingCablingAvailable:
            updatedProject.cabling
              .existingCablingAvailable,

          preferredCableType:
            updatedProject.cabling
              .preferredCableType,

          wiringStyle:
            updatedProject.cabling
              .wiringStyle,

          trenchingRequired:
            updatedProject.cabling
              .trenchingRequired,

          fireStoppingRequired:
            updatedProject.cabling
              .fireStoppingRequired,
        },

        liftRequired:
          updatedProject.installation
            .liftRequired,

        indoorCoverage:
          updatedProject.wifi
            .indoorCoverage,

        outdoorCoverage:
          updatedProject.wifi
            .outdoorCoverage,

        remainingQuestions:
          getCombinedEstimatorQuestions(
            updatedProject
          ).map(
            (candidate) => ({
              field:
                candidate.projectField,

              question:
                candidate.question,

              source:
                candidate.source,

              answerType:
                candidate.answerType,
            })
          ),
      }
    );

    const refreshed =
      refreshEstimatorConversation(
        updatedProject,
        conversationWithUserMessage
      );

    return {
      ok: true,

      normalizedAnswer:
        conversationAnswer,

      result:
        refreshed,
    };
  } catch (error) {
    return {
      ok: false,

      error:
        error instanceof Error
          ? error.message
          : "The estimator answer could not be processed.",

      field:
        question.projectField,

      questionKey:
        question.key,
    };
  }
}

function calculatePreliminaryPricingWhenReady(
  project: ProjectEstimate
): ProjectEstimate {
  const readyForPricing =
    isCombinedProjectReadyForPreliminaryPricing(
      project
    );

  if (!readyForPricing) {
    return project;
  }

  if (
    project.pricing.status ===
      "preliminary" ||
    project.pricing.status ===
      "verified"
  ) {
    return project;
  }

  return calculateEstimate(
    project
  );
}

function preserveKnownProjectFacts(
  previous: ProjectEstimate,
  next: ProjectEstimate
): ProjectEstimate {
  return {
    ...next,

    status:
      next.status === "draft" &&
      previous.status !== "draft"
        ? previous.status
        : next.status,

    customerIntent: {
      ...next.customerIntent,

      summary:
        preserveKnownRequiredString(
          previous.customerIntent
            .summary,
          next.customerIntent.summary
        ),

      goals:
        preserveKnownArray(
          previous.customerIntent.goals,
          next.customerIntent.goals
        ),

      problems:
        preserveKnownArray(
          previous.customerIntent
            .problems,
          next.customerIntent.problems
        ),

      futureExpansion:
        preserveKnownNullableString(
          previous.customerIntent
            .futureExpansion,
          next.customerIntent
            .futureExpansion
        ),
    },

    property: {
      ...next.property,

      projectType:
        next.property.projectType ??
        previous.property.projectType,

      customProjectType:
        preserveKnownNullableString(
          previous.property
            .customProjectType,
          next.property.customProjectType
        ),

      squareFootage:
        preserveKnownQuantity(
          previous.property
            .squareFootage,
          next.property.squareFootage
        ),

      numberOfFloors:
        preserveKnownQuantity(
          previous.property
            .numberOfFloors,
          next.property.numberOfFloors
        ),

      ceilingHeightFeet:
        preserveKnownQuantity(
          previous.property
            .ceilingHeightFeet,
          next.property
            .ceilingHeightFeet
        ),

      constructionType:
        preserveKnownUnknownEnum(
          previous.property
            .constructionType,
          next.property.constructionType
        ),

      ceilingType:
        preserveKnownUnknownEnum(
          previous.property.ceilingType,
          next.property.ceilingType
        ),

      specialEnvironment:
        preserveKnownArray(
          previous.property
            .specialEnvironment,
          next.property
            .specialEnvironment
        ),

      occupiedDuringInstall:
        preserveKnownNullableBoolean(
          previous.property
            .occupiedDuringInstall,
          next.property
            .occupiedDuringInstall
        ),
    },

    cameras: {
      ...next.cameras,

      requested:
        previous.cameras.requested ||
        next.cameras.requested,

      interiorCount:
        preserveKnownQuantity(
          previous.cameras
            .interiorCount,
          next.cameras.interiorCount
        ),

      exteriorCount:
        preserveKnownQuantity(
          previous.cameras
            .exteriorCount,
          next.cameras.exteriorCount
        ),

      specialtyCount:
        preserveKnownQuantity(
          previous.cameras
            .specialtyCount,
          next.cameras.specialtyCount
        ),

      recordingDays:
        preserveKnownQuantity(
          previous.cameras
            .recordingDays,
          next.cameras.recordingDays
        ),

      coverageGoals:
        preserveKnownArray(
          previous.cameras
            .coverageGoals,
          next.cameras.coverageGoals
        ),

      existingSystem:
        preserveKnownNullableBoolean(
          previous.cameras
            .existingSystem,
          next.cameras.existingSystem
        ),

      remoteViewingRequired:
        preserveKnownNullableBoolean(
          previous.cameras
            .remoteViewingRequired,
          next.cameras
            .remoteViewingRequired
        ),

      mountingSurfaces:
        preserveKnownArray(
          previous.cameras
            .mountingSurfaces,
          next.cameras
            .mountingSurfaces
        ),
    },

    network: {
      ...next.network,

      requested:
        previous.network.requested ||
        next.network.requested,

      internetProvider:
        preserveKnownNullableString(
          previous.network
            .internetProvider,
          next.network
            .internetProvider
        ),

      currentDownloadMbps:
        preserveKnownQuantity(
          previous.network
            .currentDownloadMbps,
          next.network
            .currentDownloadMbps
        ),

      currentUploadMbps:
        preserveKnownQuantity(
          previous.network
            .currentUploadMbps,
          next.network
            .currentUploadMbps
        ),

      existingRouter:
        preserveKnownNullableBoolean(
          previous.network
            .existingRouter,
          next.network.existingRouter
        ),

      existingSwitches:
        preserveKnownNullableBoolean(
          previous.network
            .existingSwitches,
          next.network
            .existingSwitches
        ),

      existingRack:
        preserveKnownNullableBoolean(
          previous.network
            .existingRack,
          next.network.existingRack
        ),

      rackRequired:
        preserveKnownNullableBoolean(
          previous.network
            .rackRequired,
          next.network.rackRequired
        ),

      rackLocation:
        preserveKnownNullableString(
          previous.network
            .rackLocation,
          next.network.rackLocation
        ),

      vlanRequired:
        preserveKnownNullableBoolean(
          previous.network
            .vlanRequired,
          next.network.vlanRequired
        ),
    },

    wifi: {
      ...next.wifi,

      requested:
        previous.wifi.requested ||
        next.wifi.requested,

      estimatedAccessPointCount:
        preserveKnownQuantity(
          previous.wifi
            .estimatedAccessPointCount,
          next.wifi
            .estimatedAccessPointCount
        ),

      estimatedConcurrentUsers:
        preserveKnownQuantity(
          previous.wifi
            .estimatedConcurrentUsers,
          next.wifi
            .estimatedConcurrentUsers
        ),

      coverageGoals:
        preserveKnownArray(
          previous.wifi.coverageGoals,
          next.wifi.coverageGoals
        ),

      weakAreas:
        preserveKnownArray(
          previous.wifi.weakAreas,
          next.wifi.weakAreas
        ),

      indoorCoverage:
        preserveKnownNullableBoolean(
          previous.wifi.indoorCoverage,
          next.wifi.indoorCoverage
        ),

      outdoorCoverage:
        preserveKnownNullableBoolean(
          previous.wifi
            .outdoorCoverage,
          next.wifi.outdoorCoverage
        ),

      guestNetworkRequired:
        preserveKnownNullableBoolean(
          previous.wifi
            .guestNetworkRequired,
          next.wifi
            .guestNetworkRequired
        ),
    },

    accessControl: {
      ...next.accessControl,

      requested:
        previous.accessControl
          .requested ||
        next.accessControl.requested,

      controlledDoorCount:
        preserveKnownQuantity(
          previous.accessControl
            .controlledDoorCount,
          next.accessControl
            .controlledDoorCount
        ),

      exteriorDoorCount:
        preserveKnownQuantity(
          previous.accessControl
            .exteriorDoorCount,
          next.accessControl
            .exteriorDoorCount
        ),

      interiorDoorCount:
        preserveKnownQuantity(
          previous.accessControl
            .interiorDoorCount,
          next.accessControl
            .interiorDoorCount
        ),

      credentialTypes:
        preserveKnownArray(
          previous.accessControl
            .credentialTypes,
          next.accessControl
            .credentialTypes
        ),

      existingSystem:
        preserveKnownNullableBoolean(
          previous.accessControl
            .existingSystem,
          next.accessControl
            .existingSystem
        ),

      remoteManagementRequired:
        preserveKnownNullableBoolean(
          previous.accessControl
            .remoteManagementRequired,
          next.accessControl
            .remoteManagementRequired
        ),
    },

    cabling: {
      ...next.cabling,

      existingCablingAvailable:
        preserveKnownNullableBoolean(
          previous.cabling
            .existingCablingAvailable,
          next.cabling
            .existingCablingAvailable
        ),

      preferredCableType:
        preserveKnownUnknownEnum(
          previous.cabling
            .preferredCableType,
          next.cabling
            .preferredCableType
        ),

      pathwayType:
        preserveKnownArray(
          previous.cabling.pathwayType,
          next.cabling.pathwayType
        ),

      wiringStyle:
        preserveKnownUnknownEnum(
          previous.cabling.wiringStyle,
          next.cabling.wiringStyle
        ),

      estimatedCableFeet:
        preserveKnownQuantity(
          previous.cabling
            .estimatedCableFeet,
          next.cabling
            .estimatedCableFeet
        ),

      trenchingRequired:
        preserveKnownNullableBoolean(
          previous.cabling
            .trenchingRequired,
          next.cabling
            .trenchingRequired
        ),

      fireStoppingRequired:
        preserveKnownNullableBoolean(
          previous.cabling
            .fireStoppingRequired,
          next.cabling
            .fireStoppingRequired
        ),
    },

    installation: {
      ...next.installation,

      liftRequired:
        preserveKnownNullableBoolean(
          previous.installation
            .liftRequired,
          next.installation
            .liftRequired
        ),

      liftType:
        preserveKnownNullableString(
          previous.installation
            .liftType,
          next.installation.liftType
        ),

      ladderAccessPossible:
        preserveKnownNullableBoolean(
          previous.installation
            .ladderAccessPossible,
          next.installation
            .ladderAccessPossible
        ),

      afterHoursRequired:
        preserveKnownNullableBoolean(
          previous.installation
            .afterHoursRequired,
          next.installation
            .afterHoursRequired
        ),

      permitsRequired:
        preserveKnownNullableBoolean(
          previous.installation
            .permitsRequired,
          next.installation
            .permitsRequired
        ),

      travelMiles:
        preserveKnownQuantity(
          previous.installation
            .travelMiles,
          next.installation
            .travelMiles
        ),

      difficultyLevel:
        preserveKnownUnknownEnum(
          previous.installation
            .difficultyLevel,
          next.installation
            .difficultyLevel
        ),

      estimatedCrewSize:
        preserveKnownQuantity(
          previous.installation
            .estimatedCrewSize,
          next.installation
            .estimatedCrewSize
        ),

      estimatedLaborHours:
        preserveKnownQuantity(
          previous.installation
            .estimatedLaborHours,
          next.installation
            .estimatedLaborHours
        ),

      estimatedDurationDays:
        preserveKnownQuantity(
          previous.installation
            .estimatedDurationDays,
          next.installation
            .estimatedDurationDays
        ),
    },
  };
}

function preserveKnownQuantity(
  previous: QuantityValue,
  next: QuantityValue
): QuantityValue {
  if (
    next.value === null &&
    previous.value !== null
  ) {
    return previous;
  }

  return next;
}

function preserveKnownNullableBoolean(
  previous: boolean | null,
  next: boolean | null
): boolean | null {
  if (
    next === null &&
    previous !== null
  ) {
    return previous;
  }

  return next;
}

function preserveKnownNullableString(
  previous: string | null,
  next: string | null
): string | null {
  if (
    (
      next === null ||
      next.trim() === ""
    ) &&
    previous !== null &&
    previous.trim() !== ""
  ) {
    return previous;
  }

  return next;
}

function preserveKnownRequiredString(
  previous: string,
  next: string
): string {
  if (
    !next.trim() &&
    previous.trim()
  ) {
    return previous;
  }

  return next;
}

function preserveKnownArray(
  previous: string[],
  next: string[]
): string[] {
  if (
    next.length === 0 &&
    previous.length > 0
  ) {
    return previous;
  }

  return next;
}

function preserveKnownUnknownEnum<
  T extends string,
>(
  previous: T,
  next: T
): T {
  if (
    next === "unknown" &&
    previous !== "unknown"
  ) {
    return previous;
  }

  return next;
}

function normalizeQuestionAnswerType(
  question: CombinedEstimatorQuestion
): CombinedEstimatorQuestion {
  const numericFields =
    new Set<string>([
      "property.squareFootage",
      "property.numberOfFloors",
      "property.ceilingHeightFeet",

      "cameras.interiorCount",
      "cameras.exteriorCount",
      "cameras.specialtyCount",
      "cameras.recordingDays",

      "network.currentDownloadMbps",
      "network.currentUploadMbps",

      "wifi.estimatedAccessPointCount",
      "wifi.estimatedConcurrentUsers",

      "accessControl.controlledDoorCount",
      "accessControl.exteriorDoorCount",
      "accessControl.interiorDoorCount",

      "cabling.estimatedCableFeet",

      "installation.travelMiles",
      "installation.estimatedCrewSize",
      "installation.estimatedLaborHours",
      "installation.estimatedDurationDays",
    ]);

  const booleanFields =
    new Set<string>([
      "property.occupiedDuringInstall",

      "cameras.requested",
      "cameras.existingSystem",
      "cameras.remoteViewingRequired",

      "network.requested",
      "network.existingRouter",
      "network.existingSwitches",
      "network.existingRack",
      "network.rackRequired",
      "network.vlanRequired",

      "wifi.requested",
      "wifi.indoorCoverage",
      "wifi.outdoorCoverage",
      "wifi.guestNetworkRequired",

      "accessControl.requested",
      "accessControl.existingSystem",
      "accessControl.remoteManagementRequired",

      "cabling.existingCablingAvailable",
      "cabling.trenchingRequired",
      "cabling.fireStoppingRequired",

      "installation.liftRequired",
      "installation.ladderAccessPossible",
      "installation.afterHoursRequired",
      "installation.permitsRequired",
    ]);

  if (
    numericFields.has(
      question.projectField
    )
  ) {
    return {
      ...question,

      answerType:
        "number",

      choices:
        [],
    };
  }

  if (
    booleanFields.has(
      question.projectField
    )
  ) {
    return {
      ...question,

      answerType:
        "boolean",

      choices:
        [],
    };
  }

  return question;
}

function isQuestionStillUnanswered(
  project: ProjectEstimate,
  projectField: string
): boolean {
  return getCombinedEstimatorQuestions(
    project
  ).some(
    (candidate) =>
      candidate.projectField ===
      projectField
  );
}

function validateCurrentQuestion(
  conversation: EstimatorConversationState,
  question: CombinedEstimatorQuestion
): string | null {
  if (
    conversation.status !==
    "awaiting_customer"
  ) {
    return "The estimator is not currently waiting for a customer answer.";
  }

  if (
    conversation.currentQuestionKey &&
    conversation.currentQuestionKey !==
      question.projectField
  ) {
    return `The answer does not match the current estimator question. Expected "${conversation.currentQuestionKey}" but received "${question.projectField}".`;
  }

  return null;
}

function appendUserMessage(
  conversation: EstimatorConversationState,
  answer: NormalizedEstimatorAnswer
): EstimatorConversationState {
  const now =
    new Date().toISOString();

  return {
    ...conversation,

    messages: [
      ...conversation.messages,

      {
        id:
          createMessageId(),

        role:
          "user",

        content:
          formatAnswerForConversation(
            answer
          ),

        createdAt:
          now,
      },
    ],

    lastCustomerMessage:
      formatAnswerForConversation(
        answer
      ),

    updatedAt:
      now,
  };
}

function formatAnswerForConversation(
  answer: NormalizedEstimatorAnswer
): string {
  if (Array.isArray(answer)) {
    return answer.join(", ");
  }

  if (
    typeof answer ===
    "boolean"
  ) {
    return answer
      ? "Yes"
      : "No";
  }

  return String(answer);
}

function createMessageId(): string {
  return crypto.randomUUID();
}
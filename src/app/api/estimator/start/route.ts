import {
  NextRequest,
  NextResponse,
} from "next/server";

import { z } from "zod";

import { extractEstimatorResponse } from "@/features/estimator/ai/azure-estimator-extractor";

import {
  startEstimatorConversation,
} from "@/features/estimator/conversation/conversation-orchestrator";

import {
  getCurrentEstimatorQuestion,
} from "@/features/estimator/conversation/get-current-estimator-question";

import {
  createEmptyProjectEstimate,
  projectEstimateSchema,
  type ProjectEstimate,
} from "@/features/estimator/domain/project-estimate";

import {
  mergeProjectEstimatePatch,
} from "@/features/estimator/domain/merge-project-patch";

import {
  selectPrimaryEstimatorPlaybook,
} from "@/features/estimator/knowledge/playbook-registry";

import {
  resolveEstimatorPlaybook,
} from "@/features/estimator/knowledge/playbook-resolver";

import {
  createPersistentEstimatorSession,
} from "@/features/estimator/session/sanity-estimator-session-store";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const estimatorSeedSchema =
  z.object({
    projectType: z
      .enum([
        "residential",
        "office",
        "retail",
        "restaurant",
        "warehouse",
        "industrial",
        "medical",
        "education",
        "hospitality",
        "religious",
        "datacenter",
        "multi_location",
        "other",
      ])
      .optional(),

    customerIntent: z
      .string()
      .trim()
      .min(1)
      .optional(),

    squareFootage: z
      .number()
      .positive()
      .optional(),

    cameras: z
      .boolean()
      .optional(),

    wifi: z
      .boolean()
      .optional(),

    accessControl: z
      .boolean()
      .optional(),
  });

type EstimatorSeed =
  z.infer<
    typeof estimatorSeedSchema
  >;

const startEstimatorRequestSchema =
  z.object({
    sessionId: z
      .string()
      .trim()
      .min(1)
      .optional(),

    project:
      projectEstimateSchema.optional(),

    seed:
      estimatorSeedSchema.optional(),
  });

function createProjectFromSeed(
  seed: EstimatorSeed
): ProjectEstimate {
  const project =
    createEmptyProjectEstimate();

  project.status =
    "collecting_scope";

  project.metadata.source =
    "wizard";

  if (seed.projectType) {
    project.property.projectType =
      seed.projectType;
  }

  if (seed.customerIntent) {
    project.customerIntent.summary =
      seed.customerIntent;
  }

  if (
    typeof seed.squareFootage ===
    "number"
  ) {
    project.property.squareFootage = {
      value:
        seed.squareFootage,

      confidence:
        "customer_reported",
    };
  }

  if (
    typeof seed.cameras ===
    "boolean"
  ) {
    project.cameras.requested =
      seed.cameras;
  }

  if (
    typeof seed.wifi ===
    "boolean"
  ) {
    project.wifi.requested =
      seed.wifi;
  }

  if (
    typeof seed.accessControl ===
    "boolean"
  ) {
    project.accessControl.requested =
      seed.accessControl;
  }

  if (
    project.cameras.requested ||
    project.wifi.requested ||
    project.accessControl.requested
  ) {
    project.network.requested =
      true;
  }

  return projectEstimateSchema.parse(
    project
  );
}

async function enrichProjectFromSeedDescription(
  project: ProjectEstimate,
  seed: EstimatorSeed
): Promise<ProjectEstimate> {
  const customerMessage =
    seed.customerIntent?.trim();

  if (!customerMessage) {
    return project;
  }

  try {
    const extraction =
      await extractEstimatorResponse({
        customerMessage,

        project,

        currentQuestion:
          null,

        remainingQuestions:
          [],
      });

    const mergedProject =
      mergeProjectEstimatePatch(
        project,
        extraction.projectUpdates
      );

    const protectedProject =
      preserveExactSeedValues(
        mergedProject,
        seed
      );

    console.log(
      "[SmartNET start extraction]",
      {
        confidence:
          extraction.confidence,

        explanation:
          extraction.explanation,

        extractedUpdates:
          extraction.projectUpdates,

        resultingFacts: {
          projectType:
            protectedProject.property
              .projectType,

          squareFootage:
            protectedProject.property
              .squareFootage.value,

          numberOfFloors:
            protectedProject.property
              .numberOfFloors.value,

          ceilingType:
            protectedProject.property
              .ceilingType,

          ceilingHeightFeet:
            protectedProject.property
              .ceilingHeightFeet.value,

          interiorCameras:
            protectedProject.cameras
              .interiorCount.value,

          exteriorCameras:
            protectedProject.cameras
              .exteriorCount.value,

          recordingDays:
            protectedProject.cameras
              .recordingDays.value,

          wifiUsers:
            protectedProject.wifi
              .estimatedConcurrentUsers
              .value,

          indoorWifi:
            protectedProject.wifi
              .indoorCoverage,

          outdoorWifi:
            protectedProject.wifi
              .outdoorCoverage,

          wiringStyle:
            protectedProject.cabling
              .wiringStyle,

          liftRequired:
            protectedProject.installation
              .liftRequired,

          afterHoursRequired:
            protectedProject.installation
              .afterHoursRequired,
        },
      }
    );

    return projectEstimateSchema.parse(
      protectedProject
    );
  } catch (error) {
    console.error(
      "[SmartNET start extraction fallback]",
      error
    );

    /*
     * Azure extraction should improve the
     * initial project, but it must never
     * prevent the estimator from starting.
     */
    return project;
  }
}

function preserveExactSeedValues(
  project: ProjectEstimate,
  seed: EstimatorSeed
): ProjectEstimate {
  const protectedProject: ProjectEstimate =
    {
      ...project,

      customerIntent: {
        ...project.customerIntent,

        summary:
          seed.customerIntent?.trim() ||
          project.customerIntent.summary,
      },

      property: {
        ...project.property,

        projectType:
          seed.projectType ??
          project.property.projectType,

        squareFootage:
          typeof seed.squareFootage ===
          "number"
            ? {
                value:
                  seed.squareFootage,

                confidence:
                  "customer_reported",
              }
            : project.property
                .squareFootage,
      },

      cameras: {
        ...project.cameras,

        requested:
          typeof seed.cameras ===
          "boolean"
            ? seed.cameras
            : project.cameras
                .requested,
      },

      wifi: {
        ...project.wifi,

        requested:
          typeof seed.wifi ===
          "boolean"
            ? seed.wifi
            : project.wifi.requested,
      },

      accessControl: {
        ...project.accessControl,

        requested:
          typeof seed.accessControl ===
          "boolean"
            ? seed.accessControl
            : project.accessControl
                .requested,
      },
    };

  protectedProject.network.requested =
    protectedProject.network.requested ||
    protectedProject.cameras.requested ||
    protectedProject.wifi.requested ||
    protectedProject.accessControl
      .requested;

  return protectedProject;
}

export async function POST(
  req: NextRequest
) {
  try {
    const rawBody: unknown =
      await req.json();

    const parsedRequest =
      startEstimatorRequestSchema.safeParse(
        rawBody
      );

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid estimator start request.",

          details:
            parsedRequest.error.flatten(),
        },
        {
          status:
            400,
        }
      );
    }

    const sessionId =
      parsedRequest.data.sessionId ??
      crypto.randomUUID();

    let project:
      ProjectEstimate;

    if (
      parsedRequest.data.project
    ) {
      project =
        projectEstimateSchema.parse(
          parsedRequest.data.project
        );
    } else if (
      parsedRequest.data.seed
    ) {
      const seed =
        parsedRequest.data.seed;

      const seededProject =
        createProjectFromSeed(
          seed
        );

      project =
        await enrichProjectFromSeedDescription(
          seededProject,
          seed
        );
    } else {
      const emptyProject =
        createEmptyProjectEstimate();

      emptyProject.status =
        "collecting_scope";

      emptyProject.metadata.source =
        "ai_conversation";

      project =
        projectEstimateSchema.parse(
          emptyProject
        );
    }

    const conversationResult =
      startEstimatorConversation({
        sessionId,
        project,
      });

    const savedSession =
      await createPersistentEstimatorSession(
        sessionId,
        conversationResult.project,
        conversationResult.conversation
      );

    const selectedPlaybook =
      selectPrimaryEstimatorPlaybook(
        savedSession.project
      );

    const resolvedPlaybook =
      selectedPlaybook
        ? resolveEstimatorPlaybook(
            savedSession.project,
            selectedPlaybook
          )
        : null;

    const nextQuestion =
      getCurrentEstimatorQuestion(
        savedSession.project,
        savedSession.conversation
          .currentQuestionKey
      );

    return NextResponse.json(
      {
        ok:
          true,

        sessionId:
          savedSession.sessionId,

        project:
          savedSession.project,

        conversation:
          savedSession.conversation,

        nextQuestion:
          nextQuestion
            ? {
                key:
                  nextQuestion.projectField,

                questionId:
                  nextQuestion.questionId,

                question:
                  nextQuestion.question,

                reason:
                  nextQuestion.reason,

                category:
                  nextQuestion.category,

                priority:
                  nextQuestion.priority,

                answerType:
                  nextQuestion.answerType,

                choices:
                  nextQuestion.choices,

                promptGuidance:
                  nextQuestion.promptGuidance,

                source:
                  nextQuestion.source,

                playbookId:
                  nextQuestion.playbookId,
              }
            : null,

        playbook:
          selectedPlaybook
            ? {
                id:
                  selectedPlaybook.id,

                name:
                  selectedPlaybook.name,

                version:
                  selectedPlaybook.version,

                description:
                  selectedPlaybook.description,

                aiGuidance:
                  selectedPlaybook.aiGuidance,
              }
            : null,

        playbookResolution:
          resolvedPlaybook,
      },
      {
        status:
          200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "[SmartNET estimator start error]",
      error
    );

    return NextResponse.json(
      {
        ok:
          false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to start the SmartNET estimator conversation.",
      },
      {
        status:
          500,
      }
    );
  }
}
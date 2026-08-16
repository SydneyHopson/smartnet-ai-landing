import {
  NextRequest,
  NextResponse,
} from "next/server";
import { z } from "zod";

import { getCurrentEstimatorQuestion } from "@/features/estimator/conversation/get-current-estimator-question";
import { processEstimatorAnswer } from "@/features/estimator/conversation/process-estimator-answer";

import { selectPrimaryEstimatorPlaybook } from "@/features/estimator/knowledge/playbook-registry";
import { resolveEstimatorPlaybook } from "@/features/estimator/knowledge/playbook-resolver";

import {
  getPersistentEstimatorSession,
  updatePersistentEstimatorSession,
} from "@/features/estimator/session/sanity-estimator-session-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const estimatorAnswerRequestSchema =
  z.object({
    sessionId: z
      .string()
      .trim()
      .min(1),

    answer: z.unknown(),
  });

export async function POST(
  req: NextRequest
) {
  try {
    const rawBody: unknown =
      await req.json();

    const parsedRequest =
      estimatorAnswerRequestSchema.safeParse(
        rawBody
      );

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid estimator answer request.",

          details:
            parsedRequest.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const {
      sessionId,
      answer,
    } = parsedRequest.data;

    const session =
      await getPersistentEstimatorSession(
        sessionId
      );

    if (!session) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Estimator session not found. Start a new estimator conversation.",
        },
        {
          status: 404,
        }
      );
    }

    const currentQuestion =
      getCurrentEstimatorQuestion(
        session.project,
        session.conversation
          .currentQuestionKey
      );

    if (!currentQuestion) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "There is no unanswered estimator question for this session.",
        },
        {
          status: 409,
        }
      );
    }

    const processed =
      await processEstimatorAnswer({
        project:
          session.project,

        conversation:
          session.conversation,

        question:
          currentQuestion,

        rawAnswer:
          answer,
      });

    if (!processed.ok) {
      return NextResponse.json(
        {
          ok: false,

          error:
            processed.error,

          field:
            processed.field,

          questionKey:
            processed.questionKey,

          currentQuestion: {
            key:
              currentQuestion.projectField,

            question:
              currentQuestion.question,

            answerType:
              currentQuestion.answerType,

            choices:
              currentQuestion.choices,
          },
        },
        {
          status: 400,
        }
      );
    }

    const updatedSession =
      await updatePersistentEstimatorSession(
        sessionId,
        {
          project:
            processed.result.project,

          conversation:
            processed.result
              .conversation,
        }
      );

    if (!updatedSession) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Unable to update the estimator session.",
        },
        {
          status: 500,
        }
      );
    }

    const selectedPlaybook =
      selectPrimaryEstimatorPlaybook(
        updatedSession.project
      );

    const resolvedPlaybook =
      selectedPlaybook
        ? resolveEstimatorPlaybook(
            updatedSession.project,
            selectedPlaybook
          )
        : null;

    const nextQuestion =
      getCurrentEstimatorQuestion(
        updatedSession.project,
        updatedSession.conversation
          .currentQuestionKey
      );

    return NextResponse.json(
      {
        ok: true,

        sessionId:
          updatedSession.sessionId,

        normalizedAnswer:
          processed.normalizedAnswer,

        project:
          updatedSession.project,

        conversation:
          updatedSession.conversation,

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
              }
            : null,

        playbookResolution:
          resolvedPlaybook,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "[SmartNET estimator answer error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to process the SmartNET estimator answer.",
      },
      {
        status: 500,
      }
    );
  }
}
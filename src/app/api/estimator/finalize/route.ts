import {
  NextRequest,
  NextResponse,
} from "next/server";
import { z } from "zod";

import { isCombinedProjectReadyForPreliminaryPricing } from "@/features/estimator/conversation/combined-question-planner";

import { calculateEstimate } from "@/features/estimator/pricing/pricing-engine";

import { createEstimatorProposalPackage } from "@/features/estimator/proposal/proposal-package";
import { saveEstimatorProposal } from "@/features/estimator/proposal/sanity-estimator-proposal-store";

import { createPreliminaryQuote } from "@/features/estimator/quote/preliminary-quote";
import { saveEstimatorQuote } from "@/features/estimator/quote/sanity-estimator-quote-store";

import {
  getPersistentEstimatorSession,
  updatePersistentEstimatorSession,
} from "@/features/estimator/session/sanity-estimator-session-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const finalizeEstimatorRequestSchema =
  z.object({
    sessionId: z
      .string()
      .trim()
      .min(1),
  });

export async function POST(
  req: NextRequest
) {
  try {
    const rawBody: unknown =
      await req.json();

    const parsedRequest =
      finalizeEstimatorRequestSchema.safeParse(
        rawBody
      );

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid estimator finalize request.",

          details:
            parsedRequest.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const { sessionId } =
      parsedRequest.data;

    const session =
      await getPersistentEstimatorSession(
        sessionId
      );

    if (!session) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Estimator session not found.",
        },
        {
          status: 404,
        }
      );
    }

    const readyForPricing =
      isCombinedProjectReadyForPreliminaryPricing(
        session.project
      );

    if (!readyForPricing) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "The estimator still needs additional project information before finalization.",

          sessionId,

          currentQuestion:
            session.conversation
              .currentQuestion,

          currentQuestionKey:
            session.conversation
              .currentQuestionKey,

          unansweredQuestionKeys:
            session.conversation
              .unansweredQuestionKeys,
        },
        {
          status: 409,
        }
      );
    }

    const pricedProject =
      session.project.pricing.status ===
      "not_calculated"
        ? calculateEstimate(
            session.project
          )
        : session.project;

    const now =
      new Date().toISOString();

    const readyMessage =
      "Your preliminary SmartNET estimate and proposal are ready.";

    const alreadyHasReadyMessage =
      session.conversation.messages.some(
        (message) =>
          message.role ===
            "assistant" &&
          message.content ===
            readyMessage
      );

    const updatedSession =
      await updatePersistentEstimatorSession(
        sessionId,
        {
          project:
            pricedProject,

          conversation: {
            ...session.conversation,

            status:
              "ready_for_pricing",

            currentQuestion:
              null,

            currentQuestionKey:
              null,

            readyForPricing:
              true,

            lastAssistantMessage:
              readyMessage,

            messages:
              alreadyHasReadyMessage
                ? session.conversation
                    .messages
                : [
                    ...session
                      .conversation
                      .messages,

                    {
                      id:
                        crypto.randomUUID(),

                      role:
                        "assistant",

                      content:
                        readyMessage,

                      createdAt:
                        now,
                    },
                  ],

            updatedAt:
              now,
          },
        }
      );

    if (!updatedSession) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Unable to save the finalized estimator session.",
        },
        {
          status: 500,
        }
      );
    }

    const quote =
      createPreliminaryQuote(
        updatedSession.project
      );

    const savedQuote =
      await saveEstimatorQuote(
        updatedSession.sessionId,
        quote
      );

    const proposal =
      createEstimatorProposalPackage({
        sessionId:
          updatedSession.sessionId,

        project:
          updatedSession.project,
      });

    const savedProposal =
      await saveEstimatorProposal(
        updatedSession.sessionId,
        proposal
      );

    return NextResponse.json(
      {
        ok: true,

        sessionId:
          updatedSession.sessionId,

        quoteId:
          savedQuote.quoteId,

        proposalId:
          savedProposal.proposalId,

        projectStatus:
          updatedSession.project.status,

        conversationStatus:
          updatedSession.conversation
            .status,

        pricing:
          updatedSession.project.pricing,

        recommendedEquipment:
          updatedSession.project
            .equipment
            .recommendedItems,

        quote:
          savedQuote.quote,

        proposal:
          savedProposal.proposal,

        quoteCreatedAt:
          savedQuote.createdAt,

        quoteUpdatedAt:
          savedQuote.updatedAt,

        proposalCreatedAt:
          savedProposal.createdAt,

        proposalUpdatedAt:
          savedProposal.updatedAt,

        project:
          updatedSession.project,

        conversation:
          updatedSession.conversation,
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
      "[SmartNET estimator finalize error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to finalize the SmartNET estimate.",
      },
      {
        status: 500,
      }
    );
  }
}
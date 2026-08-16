import {
  NextRequest,
  NextResponse,
} from "next/server";
import { z } from "zod";

import { isCombinedProjectReadyForPreliminaryPricing } from "@/features/estimator/conversation/combined-question-planner";
import { calculateEstimate } from "@/features/estimator/pricing/pricing-engine";

import {
  getPersistentEstimatorSession,
  updatePersistentEstimatorSession,
} from "@/features/estimator/session/sanity-estimator-session-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const estimatorPricingRequestSchema =
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
      estimatorPricingRequestSchema.safeParse(
        rawBody
      );

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid estimator pricing request.",

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
            "The estimator does not have enough information for preliminary pricing.",

          sessionId,

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
      calculateEstimate(
        session.project
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

            readyForPricing:
              true,

            updatedAt:
              new Date().toISOString(),
          },
        }
      );

    if (!updatedSession) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Unable to save the preliminary estimate.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,

        sessionId:
          updatedSession.sessionId,

        status:
          updatedSession.project.status,

        pricing:
          updatedSession.project.pricing,

        estimatedLaborHours:
          updatedSession.project
            .installation
            .estimatedLaborHours,

        estimatedCableFeet:
          updatedSession.project
            .cabling
            .estimatedCableFeet,

        estimatedAccessPointCount:
          updatedSession.project
            .wifi
            .estimatedAccessPointCount,

        recommendedEquipment:
          updatedSession.project
            .equipment
            .recommendedItems,

        project:
          updatedSession.project,
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
      "[SmartNET estimator pricing error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to calculate the SmartNET preliminary estimate.",
      },
      {
        status: 500,
      }
    );
  }
}
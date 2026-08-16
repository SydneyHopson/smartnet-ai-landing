import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createEstimatorProposalPackage } from "@/features/estimator/proposal/proposal-package";

import { getPersistentEstimatorSession } from "@/features/estimator/session/sanity-estimator-session-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  context: RouteContext
) {
  try {
    const { sessionId } =
      await context.params;

    const normalizedSessionId =
      sessionId.trim();

    if (!normalizedSessionId) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "A valid estimator session ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await getPersistentEstimatorSession(
        normalizedSessionId
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

    if (
      session.project.pricing.status !==
        "preliminary" &&
      session.project.pricing.status !==
        "verified"
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "The project must be priced before a proposal package can be generated.",

          sessionId:
            session.sessionId,

          pricingStatus:
            session.project.pricing
              .status,
        },
        {
          status: 409,
        }
      );
    }

    const proposal =
      createEstimatorProposalPackage({
        sessionId:
          session.sessionId,

        project:
          session.project,
      });

    return NextResponse.json(
      {
        ok: true,

        sessionId:
          session.sessionId,

        proposal,

        createdAt:
          session.createdAt,

        updatedAt:
          session.updatedAt,
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
      "[SmartNET estimator proposal error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to generate the SmartNET estimator proposal package.",
      },
      {
        status: 500,
      }
    );
  }
}
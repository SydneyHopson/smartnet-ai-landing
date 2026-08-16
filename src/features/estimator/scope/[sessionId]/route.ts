import {
  NextRequest,
  NextResponse,
} from "next/server";

import { generateEstimatorScope } from "@/features/estimator/design/scope-generator";

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

    const scope =
      generateEstimatorScope(
        session.project
      );

    return NextResponse.json(
      {
        ok: true,

        sessionId:
          session.sessionId,

        scope,

        projectStatus:
          session.project.status,

        pricingStatus:
          session.project.pricing
            .status,

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
      "[SmartNET estimator scope error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to generate the SmartNET estimator scope.",
      },
      {
        status: 500,
      }
    );
  }
}
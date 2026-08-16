import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getEstimatorProposalBySessionId } from "@/features/estimator/proposal/sanity-estimator-proposal-store";

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

    const savedProposal =
      await getEstimatorProposalBySessionId(
        normalizedSessionId
      );

    if (!savedProposal) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Estimator proposal not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,

        proposalId:
          savedProposal.proposalId,

        sessionId:
          savedProposal.sessionId,

        proposal:
          savedProposal.proposal,

        createdAt:
          savedProposal.createdAt,

        updatedAt:
          savedProposal.updatedAt,
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
      "[SmartNET saved estimator proposal error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to load the saved SmartNET estimator proposal.",
      },
      {
        status: 500,
      }
    );
  }
}
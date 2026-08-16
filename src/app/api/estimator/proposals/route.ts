import {
  NextRequest,
  NextResponse,
} from "next/server";

import { listEstimatorProposals } from "@/features/estimator/proposal/sanity-estimator-proposal-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest
) {
  try {
    const rawLimit =
      req.nextUrl.searchParams.get(
        "limit"
      );

    const parsedLimit =
      rawLimit === null
        ? 50
        : Number(rawLimit);

    if (
      !Number.isFinite(parsedLimit) ||
      parsedLimit < 1
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "The proposal limit must be a positive number.",
        },
        {
          status: 400,
        }
      );
    }

    const limit =
      Math.min(
        100,
        Math.floor(parsedLimit)
      );

    const savedProposals =
      await listEstimatorProposals(
        limit
      );

    return NextResponse.json(
      {
        ok: true,

        count:
          savedProposals.length,

        proposals:
          savedProposals.map(
            (savedProposal) => ({
              proposalId:
                savedProposal.proposalId,

              sessionId:
                savedProposal.sessionId,

              version:
                savedProposal.proposal
                  .version,

              status:
                savedProposal.proposal
                  .status,

              title:
                savedProposal.proposal
                  .title,

              subtitle:
                savedProposal.proposal
                  .subtitle,

              projectType:
                savedProposal.proposal
                  .projectSummary
                  .projectType,

              customerIntent:
                savedProposal.proposal
                  .projectSummary
                  .customerIntent,

              systems:
                savedProposal.proposal
                  .systems,

              estimatedLow:
                savedProposal.proposal
                  .pricingSummary
                  .estimatedLow,

              estimatedHigh:
                savedProposal.proposal
                  .pricingSummary
                  .estimatedHigh,

              targetMarginPercent:
                savedProposal.proposal
                  .pricingSummary
                  .targetMarginPercent,

              walkthroughRequired:
                savedProposal.proposal
                  .quote
                  .walkthroughRequired,

              generatedAt:
                savedProposal.proposal
                  .generatedAt,

              createdAt:
                savedProposal.createdAt,

              updatedAt:
                savedProposal.updatedAt,
            })
          ),
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
      "[SmartNET estimator proposal list error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to load the SmartNET estimator proposals.",
      },
      {
        status: 500,
      }
    );
  }
}
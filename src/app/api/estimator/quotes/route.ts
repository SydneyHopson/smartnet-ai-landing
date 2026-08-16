import {
  NextRequest,
  NextResponse,
} from "next/server";

import { listEstimatorQuotes } from "@/features/estimator/quote/sanity-estimator-quote-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest
) {
  try {
    const searchParams =
      req.nextUrl.searchParams;

    const rawLimit =
      searchParams.get("limit");

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
            "The quote limit must be a positive number.",
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

    const savedQuotes =
      await listEstimatorQuotes(
        limit
      );

    return NextResponse.json(
      {
        ok: true,

        count:
          savedQuotes.length,

        quotes:
          savedQuotes.map(
            (savedQuote) => ({
              quoteId:
                savedQuote.quoteId,

              sessionId:
                savedQuote.sessionId,

              status:
                savedQuote.quote.status,

              projectType:
                savedQuote.quote
                  .projectType,

              scopeSummary:
                savedQuote.quote
                  .scopeSummary,

              systems:
                savedQuote.quote.systems,

              quantities:
                savedQuote.quote
                  .quantities,

              estimatedLow:
                savedQuote.quote.pricing
                  .estimatedLow,

              estimatedHigh:
                savedQuote.quote.pricing
                  .estimatedHigh,

              walkthroughRequired:
                savedQuote.quote
                  .walkthroughRequired,

              generatedAt:
                savedQuote.quote
                  .generatedAt,

              createdAt:
                savedQuote.createdAt,

              updatedAt:
                savedQuote.updatedAt,
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
      "[SmartNET estimator quote list error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to load the SmartNET estimator quotes.",
      },
      {
        status: 500,
      }
    );
  }
}
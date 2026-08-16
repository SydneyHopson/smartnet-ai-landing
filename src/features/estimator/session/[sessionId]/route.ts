import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getEstimatorQuoteBySessionId } from "@/features/estimator/quote/sanity-estimator-quote-store";

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

    const savedQuote =
      await getEstimatorQuoteBySessionId(
        normalizedSessionId
      );

    if (!savedQuote) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Estimator quote not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,

        quoteId:
          savedQuote.quoteId,

        sessionId:
          savedQuote.sessionId,

        quote:
          savedQuote.quote,

        createdAt:
          savedQuote.createdAt,

        updatedAt:
          savedQuote.updatedAt,
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
      "[SmartNET estimator saved quote error]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to load the saved SmartNET estimator quote.",
      },
      {
        status: 500,
      }
    );
  }
}
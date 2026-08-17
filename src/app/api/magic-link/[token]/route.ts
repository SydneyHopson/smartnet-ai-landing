import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import type { SmartNetEstimateSnapshot } from "@/lib/estimate-snapshot";

type MagicLinkSessionDoc = {
  _id: string;
  email?: string | null;
  phone?: string | null;
  jobLocation?: string | null;
  token: string;
  status?: "active" | "redeemed" | "expired" | string;
  lead?: { _ref: string } | null;
  estimateTotal?: number | null;
  estimateSummary?: string | null;
  estimateSnapshot?: SmartNetEstimateSnapshot | null;
  restored?: boolean | null;
  restoredAt?: string | null;
  rawEstimateJson?: string | null;
  expiresAt?: string | null;
  createdAt?: string | null;
  lastAccessedAt?: string | null;
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const query = `*[_type == "magicLinkSession" && token == $token][0]{
      _id,
      email,
      phone,
      jobLocation,
      token,
      status,
      lead,
      estimateTotal,
      estimateSummary,
      estimateSnapshot,
      rawEstimateJson,
      expiresAt,
      createdAt,
      lastAccessedAt,
      restored,
      restoredAt
    }`;

    const doc = await sanityClient.fetch<MagicLinkSessionDoc | null>(
      query,
      { token } as Record<string, unknown>
    );

    if (!doc) {
      return NextResponse.json({ error: "Magic link not found" }, { status: 404 });
    }

    const now = new Date();
    const isExpired = Boolean(
      doc.expiresAt && new Date(doc.expiresAt).getTime() < now.getTime()
    );

    // rawEstimateJson is the lossless source of truth because the Sanity
    // estimateSnapshot Studio schema may lag new ProjectEstimate fields.
    let estimate: SmartNetEstimateSnapshot | null = null;
    if (doc.rawEstimateJson) {
      try {
        estimate = JSON.parse(doc.rawEstimateJson) as SmartNetEstimateSnapshot;
      } catch (error) {
        console.error("[SmartNET] Failed to restore full magic-link estimate JSON", error);
      }
    }
    if (!estimate && doc.estimateSnapshot) {
      estimate = doc.estimateSnapshot;
    }

    const leadId = doc.lead?._ref ?? null;

    try {
      await sanityWriteClient
        .patch(doc._id)
        .set({
          lastAccessedAt: now.toISOString(),
          restored: true,
          restoredAt: doc.restoredAt ?? now.toISOString(),
          status: isExpired ? "expired" : "redeemed",
        })
        .commit({ autoGenerateArrayKeys: true });
    } catch (error) {
      console.error("[SmartNET] Failed updating magic-link access tracking", error);
    }

    if (leadId) {
      try {
        await sanityWriteClient
          .patch(leadId)
          .set({
            lastInteractionAt: now.toISOString(),
            updatedAt: now.toISOString(),
            status: "engaged",
          })
          .commit({ autoGenerateArrayKeys: true });
      } catch (error) {
        console.error("[SmartNET] Failed updating magic-link lead", error);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        isExpired,
        session: {
          _id: doc._id,
          email: doc.email ?? null,
          phone: doc.phone ?? null,
          jobLocation: doc.jobLocation ?? null,
          token: doc.token,
          status: isExpired ? "expired" : "redeemed",
          leadId,
          estimateTotal: doc.estimateTotal ?? null,
          estimateSummary: doc.estimateSummary ?? null,
          expiresAt: doc.expiresAt ?? null,
          createdAt: doc.createdAt ?? null,
          lastAccessedAt: now.toISOString(),
          restored: true,
          restoredAt: doc.restoredAt ?? now.toISOString(),
        },
        estimate,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SmartNET magic-link GET error]", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanityClient"; // read client
import { sanityWriteClient } from "@/lib/sanityWriteClient"; // ✅ write client

type SmartNetEstimate = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[];
  coverageProfile?: string;
  wifiLayout?: string;
  doorsAccess?: string;
  extras?: string[];
  wiringStyle?: string;
  rackLocation?: string;
  timeline?: string;
  roughLow?: number;
  roughHigh?: number;
  notes?: string;
};

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

  // ✅ new fields
  estimateSnapshot?: SmartNetEstimate | null;
  restored?: boolean | null;
  restoredAt?: string | null;

  // legacy backup
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
    // 🔑 In Next.js App Router, params can be a Promise (as you noted)
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

    const doc = await sanityClient.fetch<MagicLinkSessionDoc | null>(query, {
      token,
    });

    if (!doc) {
      return NextResponse.json({ error: "Magic link not found" }, { status: 404 });
    }

    // 🕒 Check expiry
    const now = new Date();
    let isExpired = false;

    if (doc.expiresAt) {
      const expiry = new Date(doc.expiresAt);
      if (expiry.getTime() < now.getTime()) {
        isExpired = true;
      }
    }

    // 🧠 Prefer structured snapshot; fallback to JSON parse
    let estimate: SmartNetEstimate | null = null;

    if (doc.estimateSnapshot) {
      estimate = doc.estimateSnapshot;
    } else if (doc.rawEstimateJson) {
      try {
        estimate = JSON.parse(doc.rawEstimateJson) as SmartNetEstimate;
      } catch (e) {
        console.warn("[SmartNET] Failed to parse rawEstimateJson", e);
      }
    }

    // ✅ Update access tracking + restore signals
    // We still return the estimate even if expired, but we mark status accordingly.
    const patchSession = sanityWriteClient
      .patch(doc._id)
      .set({
        lastAccessedAt: now.toISOString(),
        restored: true,
        restoredAt: doc.restoredAt ?? now.toISOString(),
        status: isExpired ? "expired" : (doc.status === "redeemed" ? "redeemed" : "redeemed"),
      });

    try {
      await patchSession.commit({ autoGenerateArrayKeys: true });
    } catch (patchErr) {
      console.error("[SmartNET] Failed updating magicLinkSession tracking", patchErr);
      // Don’t fail the request—reading should still work.
    }

    // ✅ Update lead lastInteractionAt if session has lead reference
    const leadId = doc.lead?._ref ?? null;
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
      } catch (leadPatchErr) {
        console.error("[SmartNET] Failed updating lead lastInteractionAt", leadPatchErr);
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
          status: isExpired ? "expired" : (doc.status ?? null),
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

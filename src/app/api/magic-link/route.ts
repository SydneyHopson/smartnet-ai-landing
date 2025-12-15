import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { resend } from "@/lib/email";

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

type MagicLinkPayload = {
  contact: {
    email: string | null;
    phone: string | null;
    fullName?: string | null;
    // wired from "Location details (optional)" in the UI
    jobLocation?: string | null;
  };
  estimate: SmartNetEstimate | null;
};

function normalizeEmail(email: string | null): string | null {
  if (!email) return null;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length ? trimmed : null;
}

function normalizePhone(phone: string | null): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  return trimmed.length ? trimmed : null;
}

/**
 * POST /api/magic-link
 * ✅ Finds/creates a SmartNET Lead
 * ✅ Creates a magicLinkSession referencing that lead
 * ✅ Returns a magic quote URL + token
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MagicLinkPayload;

    const email = normalizeEmail(body.contact?.email ?? null);
    const phone = normalizePhone(body.contact?.phone ?? null);
    const fullNameRaw = body.contact?.fullName ?? null;
    const fullName =
      fullNameRaw && fullNameRaw.trim().length ? fullNameRaw.trim() : undefined;

    const jobLocationRaw = body.contact?.jobLocation ?? null;
    const jobLocation =
      jobLocationRaw && jobLocationRaw.trim().length
        ? jobLocationRaw.trim()
        : null;

    const estimate = body.estimate ?? null;

    // 🔒 Require at least one contact method
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      );
    }

    // 🎟️ Generate token
    const token = randomUUID();

    // 🌐 Base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Landing page for resuming quote
    const quoteUrl = `${baseUrl}/quote/${token}`;

    // 🧮 Derive estimate total (optional)
    let estimateTotal: number | undefined;
    if (estimate?.roughLow != null && estimate?.roughHigh != null) {
      estimateTotal = (estimate.roughLow + estimate.roughHigh) / 2;
    } else if (estimate?.roughHigh != null) {
      estimateTotal = estimate.roughHigh;
    } else if (estimate?.roughLow != null) {
      estimateTotal = estimate.roughLow;
    }

    // 📝 Summary for Studio quick scan
    const summaryParts: string[] = [];
    if (estimate?.projectType) summaryParts.push(`Type: ${estimate.projectType}`);
    if (estimate?.squareFootage)
      summaryParts.push(`Sq Ft: ${estimate.squareFootage}`);
    if (estimate?.focus?.length)
      summaryParts.push(`Focus: ${estimate.focus.join(", ")}`);
    if (estimate?.coverageProfile)
      summaryParts.push(`Coverage: ${estimate.coverageProfile}`);
    if (estimate?.wiringStyle)
      summaryParts.push(`Wiring: ${estimate.wiringStyle}`);
    if (estimate?.timeline) summaryParts.push(`Timeline: ${estimate.timeline}`);
    if (estimate?.extras?.length)
      summaryParts.push(`Extras: ${estimate.extras.join(", ")}`);

    const estimateSummary =
      summaryParts.length > 0
        ? summaryParts.join(" • ")
        : "SmartNET estimate saved for this lead.";

    const now = new Date();
    const expires = new Date(now);
    expires.setDate(now.getDate() + 7); // 7-day validity

    /**
     * ✅ STEP 1: Find-or-create lead
     *
     * Prefer email match; fall back to phone match.
     * If neither exists (shouldn’t happen due to validation), create anyway.
     */
    let leadId: string | null = null;

    // Find by email first (most reliable)
    if (email) {
      const existingByEmail = await sanityWriteClient.fetch<{ _id: string } | null>(
        `*[_type == "smartnetLead" && lower(email) == $email][0]{ _id }`,
        { email }
      );
      leadId = existingByEmail?._id ?? null;
    }

    // Fallback: find by phone (if no email lead match)
    if (!leadId && phone) {
      const existingByPhone = await sanityWriteClient.fetch<{ _id: string } | null>(
        `*[_type == "smartnetLead" && phone == $phone][0]{ _id }`,
        { phone }
      );
      leadId = existingByPhone?._id ?? null;
    }

    // Create lead if not found
    if (!leadId) {
      const createdLead = await sanityWriteClient.create({
        _type: "smartnetLead",
        fullName: fullName ?? (email ? email.split("@")[0] : "SmartNET Lead"),
        email: email ?? "unknown@example.com", // schema requires email; you can revise schema later to allow phone-only
        phone: phone ?? undefined,
        primaryJobLocation: jobLocation ?? undefined,
        leadSource: "smartnet_funnel",
        status: "new",
        lastEstimateTotal: estimateTotal ?? undefined,
        lastEstimateCurrency: "USD",
        lastInteractionAt: now.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
      leadId = createdLead._id;
    } else {
      // Update lead "last seen" fields
      await sanityWriteClient
        .patch(leadId)
        .set({
          phone: phone ?? undefined,
          primaryJobLocation: jobLocation ?? undefined,
          lastEstimateTotal: estimateTotal ?? undefined,
          lastEstimateCurrency: "USD",
          lastInteractionAt: now.toISOString(),
          updatedAt: now.toISOString(),
          // optional: move them forward in pipeline
          status: "engaged",
        })
        .commit({ autoGenerateArrayKeys: true });
    }

    /**
     * ✅ STEP 2: Create magic link session referencing lead
     */
    const sessionDoc = await sanityWriteClient.create({
      _type: "magicLinkSession",
      token,
      lead: leadId ? { _type: "reference", _ref: leadId } : undefined,
      email,
      phone,
      jobLocation,
      source: "magic_link",
      status: "active",
      estimateTotal: estimateTotal ?? undefined,
      estimateSummary,
      estimateSnapshot: estimate ?? undefined, // ✅ structured object
      rawEstimateJson: estimate ? JSON.stringify(estimate) : undefined, // ✅ backup
      expiresAt: expires.toISOString(),
      createdAt: now.toISOString(),
      lastAccessedAt: undefined,
      restored: false,
      restoredAt: undefined,
    });

    /**
     * ✅ STEP 3 (optional): attach session reference to lead arrays (since your lead schema has them)
     * This is optional, but it keeps your lead doc "linked" in Studio.
     */
    if (leadId) {
      await sanityWriteClient
        .patch(leadId)
        .setIfMissing({ magicLinkSessions: [] })
        .append("magicLinkSessions", [
          { _type: "reference", _ref: sessionDoc._id },
        ])
        .commit({ autoGenerateArrayKeys: true });
    }

    console.log("[SmartNET magic link created]", {
      leadId,
      sessionId: sessionDoc._id,
      token,
      email,
      phone,
      quoteUrl,
    });

    /**
     * ✉️ Send email (if available)
     */
    if (email) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "SmartNET <onboarding@resend.dev>",
          to: email,
          subject: "Your SmartNET Estimate Link",
          html: `
            <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a;">
              <h2 style="color:#0f172a;">Your SmartNET Estimate is Saved</h2>
              <p>Hi${fullName ? ` ${fullName}` : ""},</p>
              <p>Your SmartNET wiring & camera estimate has been saved. You can resume your quote at any time using the link below:</p>
              <p>
                <a href="${quoteUrl}" style="color:#059669; font-weight:600;">
                  Continue your SmartNET estimate
                </a>
              </p>
              <p style="font-size: 13px; color:#6b7280; margin-top:16px;">
                If the button above doesn't work, copy and paste this URL into your browser:<br/>
                <span style="word-break: break-all;">${quoteUrl}</span>
              </p>
              <hr style="margin-top:24px; margin-bottom:16px; border:none; border-top:1px solid #e5e7eb;" />
              <p style="font-size: 12px; color:#9ca3af;">
                SmartNET AI • Smart wiring & camera estimates
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[SmartNET magic link email error]", emailErr);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        ok: true,
        quoteUrl,
        token,
        leadId,
        sessionId: sessionDoc._id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SmartNET magic link error]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

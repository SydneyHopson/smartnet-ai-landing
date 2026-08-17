import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { resend } from "@/lib/email";
import {
  buildEstimateSummary,
  getEstimateTotal,
  type SmartNetEstimateSnapshot,
} from "@/lib/estimate-snapshot";

type MagicLinkPayload = {
  contact: {
    email: string | null;
    phone: string | null;
    fullName?: string | null;
    jobLocation?: string | null;
  };
  estimate: SmartNetEstimateSnapshot | null;
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MagicLinkPayload;
    const email = normalizeEmail(body.contact?.email ?? null);
    const phone = normalizePhone(body.contact?.phone ?? null);
    const fullNameRaw = body.contact?.fullName ?? null;
    const fullName = fullNameRaw?.trim() || undefined;
    const jobLocationRaw = body.contact?.jobLocation ?? null;
    const jobLocation = jobLocationRaw?.trim() || null;
    const estimate = body.estimate ?? null;

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      );
    }

    const token = randomUUID();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const quoteUrl = `${baseUrl}/quote/${token}`;
    const estimateTotal = getEstimateTotal(estimate);
    const estimateSummary = buildEstimateSummary(estimate);
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(now.getDate() + 7);

    let leadId: string | null = null;

    if (email) {
      const existingByEmail = await sanityWriteClient.fetch<{ _id: string } | null>(
        `*[_type == "smartnetLead" && lower(email) == $email][0]{ _id }`,
        { email }
      );
      leadId = existingByEmail?._id ?? null;
    }

    if (!leadId && phone) {
      const existingByPhone = await sanityWriteClient.fetch<{ _id: string } | null>(
        `*[_type == "smartnetLead" && phone == $phone][0]{ _id }`,
        { phone }
      );
      leadId = existingByPhone?._id ?? null;
    }

    if (!leadId) {
      const createdLead = await sanityWriteClient.create({
        _type: "smartnetLead",
        fullName: fullName ?? (email ? email.split("@")[0] : "SmartNET Lead"),
        // Existing lead schema currently expects email. Preserve phone-only
        // direct booking while the schema is migrated to optional email.
        email: email ?? `phone-${phone?.replace(/\D/g, "") || token}@smartnet.local`,
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
      const leadUpdate: Record<string, unknown> = {
        lastEstimateTotal: estimateTotal ?? undefined,
        lastEstimateCurrency: "USD",
        lastInteractionAt: now.toISOString(),
        updatedAt: now.toISOString(),
        status: "engaged",
      };
      if (phone) leadUpdate.phone = phone;
      if (jobLocation) leadUpdate.primaryJobLocation = jobLocation;
      if (fullName) leadUpdate.fullName = fullName;

      await sanityWriteClient
        .patch(leadId)
        .set(leadUpdate)
        .commit({ autoGenerateArrayKeys: true });
    }

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
      // Keep both forms. rawEstimateJson is the lossless source of truth when
      // ProjectEstimate gains fields before the Studio schema catches up.
      estimateSnapshot: estimate ?? undefined,
      rawEstimateJson: estimate ? JSON.stringify(estimate) : undefined,
      expiresAt: expires.toISOString(),
      createdAt: now.toISOString(),
      restored: false,
    });

    if (leadId) {
      await sanityWriteClient
        .patch(leadId)
        .setIfMissing({ magicLinkSessions: [] })
        .append("magicLinkSessions", [
          { _type: "reference", _ref: sessionDoc._id },
        ])
        .commit({ autoGenerateArrayKeys: true });
    }

    if (email) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "SmartNET <onboarding@resend.dev>",
          to: email,
          subject: "Your SmartNET Project Link",
          html: `
            <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
              <h2>Your SmartNET project is saved</h2>
              <p>Hi${fullName ? ` ${fullName}` : ""},</p>
              <p>Your project profile${estimate ? ", estimate, equipment scope and installation details" : ""} are saved together.</p>
              <p><a href="${quoteUrl}" style="color:#0284c7;font-weight:700;">Open your SmartNET project</a></p>
              <p style="font-size:13px;color:#64748b;">${estimateSummary}</p>
              <p style="font-size:12px;color:#94a3b8;word-break:break-all;">${quoteUrl}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[SmartNET magic link email error]", emailErr);
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

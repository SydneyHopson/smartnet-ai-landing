import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

type ActionType = "call" | "text" | "email" | "walkthrough" | "quote";
type Body = { action?: ActionType; detail?: string | null };

const labels: Record<ActionType, string> = {
  call: "Call initiated",
  text: "Text initiated",
  email: "Email initiated",
  walkthrough: "Walkthrough workflow started",
  quote: "Quote workflow started",
};

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = (await req.json()) as Body;
    if (!body.action || !(body.action in labels)) {
      return NextResponse.json({ ok: false, error: "Invalid activity" }, { status: 400 });
    }

    const lead = await sanityWriteClient.fetch<{ _id: string; contactName?: string | null } | null>(
      `*[_type=="walkthroughBooking"&&_id==$id][0]{_id,contactName}`,
      { id },
    );
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

    const now = new Date().toISOString();
    const detail = body.detail?.trim();
    const summary = detail ? `${labels[body.action]} · ${detail}` : labels[body.action];
    const activity = await sanityWriteClient.create({
      _type: "smartnetLeadActivity",
      leadId: id,
      customerName: lead.contactName || "Unknown customer",
      activityType: body.action,
      summary,
      createdAt: now,
    });

    await sanityWriteClient.create({
      _type: "smartnetActivity",
      eventType: `lead_${body.action}`,
      customerName: lead.contactName || "Unknown customer",
      sourceId: id,
      sourceType: "walkthroughBooking",
      occurredAt: now,
      metadata: { detail: detail || null },
    });

    return NextResponse.json({
      ok: true,
      activity: { _id: activity._id, activityType: body.action, summary, createdAt: now },
    });
  } catch (error) {
    console.error("[owner lead activity]", error);
    return NextResponse.json({ ok: false, error: "Failed to log activity" }, { status: 500 });
  }
}

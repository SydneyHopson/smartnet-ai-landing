import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

type LeadPatch = {
  stage?: string;
  priority?: string;
  assignedTo?: string | null;
  nextFollowUpAt?: string | null;
  lostReason?: string | null;
  note?: string | null;
};

const allowedStages = new Set(["new", "contacted", "qualified", "walkthrough", "quote", "negotiating", "won", "lost"]);
const allowedPriorities = new Set(["low", "normal", "high", "hot"]);

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = (await req.json()) as LeadPatch;
    const booking = await sanityWriteClient.fetch<{ _id: string; contactName?: string | null } | null>(
      `*[_type=="walkthroughBooking" && _id==$id][0]{_id,contactName}`,
      { id },
    );
    if (!booking) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

    const patch: Record<string, unknown> = { crmUpdatedAt: new Date().toISOString() };
    if (body.stage && allowedStages.has(body.stage)) patch.crmStage = body.stage;
    if (body.priority && allowedPriorities.has(body.priority)) patch.crmPriority = body.priority;
    if (body.assignedTo !== undefined) patch.crmAssignedTo = body.assignedTo?.trim() || null;
    if (body.nextFollowUpAt !== undefined) patch.ownerFollowUpDueAt = body.nextFollowUpAt || null;
    if (body.lostReason !== undefined) patch.crmLostReason = body.lostReason?.trim() || null;

    await sanityWriteClient.patch(id).set(patch).commit();

    const now = new Date().toISOString();
    const changes = Object.keys(patch).filter((key) => key !== "crmUpdatedAt");
    if (changes.length) {
      await sanityWriteClient.create({
        _type: "smartnetLeadActivity",
        leadId: id,
        customerName: booking.contactName || "Unknown customer",
        activityType: "crm_update",
        summary: `Updated ${changes.join(", ")}`,
        createdAt: now,
      });
    }
    if (body.note?.trim()) {
      await sanityWriteClient.create({
        _type: "smartnetLeadActivity",
        leadId: id,
        customerName: booking.contactName || "Unknown customer",
        activityType: "note",
        summary: body.note.trim(),
        createdAt: now,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[owner lead patch]", error);
    return NextResponse.json({ ok: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ ok: false, error: "Missing lead id" }, { status: 400 });
    const booking = await sanityWriteClient.fetch<{ _id: string } | null>(`*[_type=="walkthroughBooking" && _id==$id][0]{_id}`, { id });
    if (!booking?._id) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
    await sanityWriteClient.delete(booking._id);
    return NextResponse.json({ ok: true, deletedId: booking._id });
  } catch (error) {
    console.error("[owner lead delete] error", error);
    return NextResponse.json({ ok: false, error: "Failed to delete lead" }, { status: 500 });
  }
}

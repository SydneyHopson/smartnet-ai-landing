import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

type ManualLeadPayload = {
  customerName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  services?: string;
  source?: string;
  address?: string;
  notes?: string;
  roughLow?: number | null;
  roughHigh?: number | null;
};

function clean(value?: string) {
  const next = value?.trim();
  return next ? next : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ManualLeadPayload;
    const customerName = clean(body.customerName);
    const email = clean(body.email);
    const phone = clean(body.phone);

    if (!customerName) {
      return NextResponse.json({ ok: false, error: "Customer name is required" }, { status: 400 });
    }
    if (!email && !phone) {
      return NextResponse.json({ ok: false, error: "Add an email or phone number" }, { status: 400 });
    }

    const roughLow = typeof body.roughLow === "number" && Number.isFinite(body.roughLow) ? body.roughLow : null;
    const roughHigh = typeof body.roughHigh === "number" && Number.isFinite(body.roughHigh) ? body.roughHigh : null;
    const estimateRoughRange = roughLow !== null || roughHigh !== null
      ? `$${Math.max(0, roughLow ?? 0).toLocaleString("en-US")} – $${Math.max(0, roughHigh ?? roughLow ?? 0).toLocaleString("en-US")}`
      : null;

    const createdAt = new Date().toISOString();
    const doc = await sanityWriteClient.create({
      _type: "walkthroughBooking",
      createdAt,
      status: "new",
      appointmentType: "Manual lead",
      contactName: customerName,
      contactEmail: email,
      contactPhone: phone,
      dateISO: null,
      timeSlot: null,
      estimateRoughRange,
      manualLead: true,
      leadSource: clean(body.source) ?? "Owner Console",
      projectType: clean(body.projectType),
      requestedServices: clean(body.services),
      jobLocationNote: clean(body.address),
      ownerNotes: clean(body.notes),
    });

    return NextResponse.json({ ok: true, id: doc._id }, { status: 201 });
  } catch (error) {
    console.error("[owner lead create] error", error);
    return NextResponse.json({ ok: false, error: "Failed to create lead" }, { status: 500 });
  }
}

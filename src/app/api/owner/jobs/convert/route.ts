import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";

type WalkthroughBooking = {
  _id: string;
  status?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  locationLabel?: string | null;
  locationType?: string | null;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  rawEstimateJson?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { bookingId?: string };
    const bookingId = body.bookingId?.trim();
    if (!bookingId) {
      return NextResponse.json({ ok: false, error: "Missing bookingId" }, { status: 400 });
    }

    const booking = await sanityWriteClient.fetch<WalkthroughBooking | null>(
      `*[_type == "walkthroughBooking" && _id == $bookingId][0]{_id,status,contactName,contactEmail,contactPhone,locationLabel,locationType,estimateRoughRange,estimateTotal,rawEstimateJson}`,
      { bookingId }
    );

    if (!booking) {
      return NextResponse.json({ ok: false, error: "Walkthrough not found" }, { status: 404 });
    }

    const normalizedStatus = (booking.status || "").toLowerCase();
    if (!normalizedStatus.includes("complete") && !normalizedStatus.includes("done")) {
      return NextResponse.json(
        { ok: false, error: "Complete the walkthrough before converting it to a job." },
        { status: 409 }
      );
    }

    const existing = await sanityWriteClient.fetch<{ _id: string } | null>(
      `*[_type == "smartnetJob" && sourceBookingId == $bookingId][0]{_id}`,
      { bookingId }
    );
    if (existing?._id) {
      return NextResponse.json({ ok: true, jobId: existing._id, existing: true });
    }

    const jobId = `smartnetJob-${bookingId}`;
    const job = await sanityWriteClient.createIfNotExists({
      _id: jobId,
      _type: "smartnetJob",
      sourceBookingId: bookingId,
      status: "draft",
      customerName: booking.contactName || "Unknown customer",
      customerEmail: booking.contactEmail || null,
      customerPhone: booking.contactPhone || null,
      locationLabel: booking.locationLabel || null,
      locationType: booking.locationType || null,
      estimateRoughRange: booking.estimateRoughRange || null,
      estimateTotal: booking.estimateTotal ?? null,
      rawEstimateJson: booking.rawEstimateJson || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, jobId: job._id, existing: false });
  } catch (error) {
    console.error("[owner jobs convert]", error);
    return NextResponse.json({ ok: false, error: "Failed to convert walkthrough to job" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { resend } from "@/lib/email";
import { buildIdempotencyKey } from "@/lib/idempotency";
import {
  buildEstimateSummary,
  getEstimateTotal,
  getPriceRange,
  type SmartNetEstimateSnapshot,
} from "@/lib/estimate-snapshot";

type BookingPayload = {
  dateISO: string;
  timeSlot: string;
  appointmentType: string;
  contact: { fullName: string; email: string; phone: string };
  jobLocation: { type: "home" | "office" | "retail" | "industrial" | "multi"; note: string | null };
  estimate: SmartNetEstimateSnapshot | null;
};

const SMARTNET_NOTIFY_EMAILS = [
  "farhad@smartnetinstallation.ai",
  "shopson@smartnetinstallation.ai",
  "info@smartnetinstallation.ai",
];

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingPayload;
    const contact = body.contact;
    const estimate = body.estimate ?? null;

    if (!contact?.fullName?.trim() || !contact?.email?.trim() || !contact?.phone?.trim() || !body.dateISO || !body.timeSlot) {
      return NextResponse.json({ error: "Missing required fields (name, email, phone, date, timeSlot)" }, { status: 400 });
    }

    const appointmentType = body.appointmentType || "On-site walkthrough";
    const lowerType = appointmentType.toLowerCase();
    const isOnsite = lowerType.includes("on-site") || lowerType.includes("onsite");
    const isVirtual = lowerType.includes("virtual") || lowerType.includes("video");
    const isPhone = lowerType.includes("phone") || lowerType.includes("call");
    const estimateSummary = buildEstimateSummary(estimate);
    const estimateTotal = getEstimateTotal(estimate);
    const { low, high } = getPriceRange(estimate);
    const roughRangeLabel = low !== null || high !== null ? `$${low?.toLocaleString() ?? "?"} – $${high?.toLocaleString() ?? "?"}` : "No AI estimate attached";

    const locationLabels: Record<BookingPayload["jobLocation"]["type"], string> = {
      home: "Home / residence", office: "Office / suite", retail: "Retail / restaurant / storefront", industrial: "Warehouse / industrial", multi: "Multi-location / campus",
    };
    const locationTypeLabel = locationLabels[body.jobLocation?.type ?? "home"];

    const idempotencyKey = await buildIdempotencyKey({ email: contact.email, phone: contact.phone, dateISO: body.dateISO, timeSlot: body.timeSlot, appointmentType });
    const bookingDocId = `walkthroughBooking.${idempotencyKey}`;
    const alreadyExists = await sanityWriteClient.fetch<boolean>(`defined(*[_id == $id][0]._id)`, { id: bookingDocId });

    const createdAt = new Date();
    const bookingDoc = await sanityWriteClient.createIfNotExists({
      _id: bookingDocId, _type: "walkthroughBooking", idempotencyKey, status: "new", appointmentType,
      dateISO: body.dateISO, timeSlot: body.timeSlot,
      contactName: contact.fullName.trim(), contactEmail: contact.email.trim().toLowerCase(), contactPhone: contact.phone.trim(),
      locationType: body.jobLocation?.type ?? null, locationLabel: locationTypeLabel, locationNote: body.jobLocation?.note ?? null,
      needsOnsiteWalkthrough: !isOnsite, isVirtualCall: isVirtual, isPhoneCall: isPhone, hasAiEstimate: Boolean(estimate),
      estimateSummary, estimateRoughRange: roughRangeLabel, estimateTotal: estimateTotal ?? null,
      rawEstimateJson: estimate ? JSON.stringify(estimate) : null, createdAt: createdAt.toISOString(),
    });

    if (alreadyExists) {
      return NextResponse.json({ ok: true, id: bookingDoc._id, deduped: true, email: { attempted: false, sent: false, reason: "deduped" } }, { status: 200 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const ownerBookingUrl = `${appUrl}/owner/booking/${bookingDoc._id}`;
    const ownerEnvEmail = process.env.SMARTNET_BOOKING_EMAIL?.trim() || "";
    const recipients = Array.from(new Set([...SMARTNET_NOTIFY_EMAILS, ownerEnvEmail].filter(Boolean)));
    const datePretty = new Date(body.dateISO).toLocaleDateString("en-US", { dateStyle: "full", timeZone: "America/New_York" });

    const appointmentGuidance = isPhone
      ? "Phone consultation: review goals, budget and existing equipment. Request photos/video if an onsite walkthrough will be needed."
      : isVirtual
        ? "Virtual consultation: review the space on video and identify likely camera, Wi-Fi, rack and cable-path locations."
        : "On-site walkthrough: verify cable paths, mounting surfaces, network location, power, access and installation conditions.";

    let emailSent = false;
    let emailId: string | null = null;
    let emailError: string | null = null;
    try {
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || "SmartNET <onboarding@resend.dev>", to: recipients,
        subject: `New SmartNET ${appointmentType} – ${datePretty} at ${body.timeSlot}`,
        html: `<div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;line-height:1.5;"><h2 style="margin-bottom:4px;">New SmartNET Booking</h2><p><strong>${escapeHtml(appointmentType)}</strong> · ${escapeHtml(datePretty)} · ${escapeHtml(body.timeSlot)}</p><p><strong>Client:</strong> ${escapeHtml(contact.fullName)}<br/><strong>Email:</strong> ${escapeHtml(contact.email)}<br/><strong>Phone:</strong> ${escapeHtml(contact.phone)}<br/><strong>Location:</strong> ${escapeHtml(locationTypeLabel)}</p>${body.jobLocation?.note ? `<p><strong>Site notes:</strong> ${escapeHtml(body.jobLocation.note)}</p>` : ""}<hr style="border:none;border-top:1px solid #e2e8f0;margin:18px 0;"/><p><strong>AI estimate:</strong> ${estimate ? "Attached" : "Not completed — direct booking"}<br/><strong>Range:</strong> ${escapeHtml(roughRangeLabel)}<br/><strong>Scope:</strong> ${escapeHtml(estimateSummary)}</p><p style="background:#f1f5f9;padding:12px;border-radius:8px;">${escapeHtml(appointmentGuidance)}</p><p><a href="${ownerBookingUrl}" style="font-weight:700;color:#0369a1;">Open booking record</a></p></div>`,
      });
      emailId = result.data?.id ?? null;
      emailSent = Boolean(emailId) && !result.error;
      if (result.error) emailError = result.error.message;
    } catch (emailErr) {
      emailError = emailErr instanceof Error ? emailErr.message : "Booking email failed";
      console.error("[SmartNET booking email error]", emailErr);
    }

    return NextResponse.json({ ok: true, id: bookingDoc._id, email: { attempted: recipients.length > 0, sent: emailSent, id: emailId, error: emailError } }, { status: 200 });
  } catch (err) {
    console.error("[SmartNET booking API error]", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

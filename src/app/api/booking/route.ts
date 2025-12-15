import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { resend } from "@/lib/email"; // same style as your magic-link route
import { buildIdempotencyKey } from "@/lib/idempotency";

// Keep this in sync with your front-end SmartNetEstimate type
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

type BookingPayload = {
  dateISO: string;
  timeSlot: string;
  appointmentType: string; // "On-site walkthrough" | "Virtual call" | "Phone call"
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  jobLocation: {
    type: "home" | "office" | "retail" | "industrial" | "multi";
    note: string | null;
  };
  estimate: SmartNetEstimate | null;
};

// 👇 Dev / fallback “owner” email until you have real business inbox
const DEFAULT_NOTIFY_EMAIL = "Karatesyd@icloud.com";

/**
 * POST /api/booking
 * Saves a walkthrough booking + quote snapshot to Sanity
 * and emails the SmartNET side with a checklist.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingPayload;

    const { contact, jobLocation, estimate } = body;

    if (
      !contact?.email ||
      !contact.fullName ||
      !body.dateISO ||
      !body.timeSlot
    ) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, date, timeSlot)" },
        { status: 400 }
      );
    }

    const appointmentType = body.appointmentType || "Walkthrough";

    // 🔍 Derive some helper flags
    const isOnsite =
      appointmentType.toLowerCase().includes("on-site") ||
      appointmentType.toLowerCase().includes("onsite");

    const isVirtual =
      appointmentType.toLowerCase().includes("virtual") ||
      appointmentType.toLowerCase().includes("video");

    const isPhone =
      appointmentType.toLowerCase().includes("phone") ||
      appointmentType.toLowerCase().includes("call");

    // If they didn’t pick on-site, we still want a physical walkthrough later
    const needsOnsiteWalkthrough = !isOnsite;

    // 🧮 Estimate math + summary
    let estimateTotal: number | undefined;
    if (estimate?.roughLow != null && estimate?.roughHigh != null) {
      estimateTotal = (estimate.roughLow + estimate.roughHigh) / 2;
    } else if (estimate?.roughHigh != null) {
      estimateTotal = estimate.roughHigh;
    } else if (estimate?.roughLow != null) {
      estimateTotal = estimate.roughLow;
    }

    const summaryParts: string[] = [];
    if (estimate?.projectType) summaryParts.push(`Type: ${estimate.projectType}`);
    if (estimate?.squareFootage)
      summaryParts.push(`Sq Ft: ${estimate.squareFootage.toLocaleString()}`);
    if (estimate?.focus?.length)
      summaryParts.push(`Focus: ${estimate.focus.join(", ")}`);
    if (estimate?.coverageProfile)
      summaryParts.push(`Coverage: ${estimate.coverageProfile}`);
    if (estimate?.wifiLayout) summaryParts.push(`Wi-Fi: ${estimate.wifiLayout}`);
    if (estimate?.doorsAccess) summaryParts.push(`Doors: ${estimate.doorsAccess}`);
    if (estimate?.wiringStyle) summaryParts.push(`Wiring: ${estimate.wiringStyle}`);
    if (estimate?.timeline) summaryParts.push(`Timeline: ${estimate.timeline}`);
    if (estimate?.extras?.length)
      summaryParts.push(`Extras: ${estimate.extras.join(", ")}`);

    const estimateSummary =
      summaryParts.length > 0
        ? summaryParts.join(" • ")
        : "SmartNET estimate attached to this booking.";

    const roughRangeLabel =
      estimate?.roughLow || estimate?.roughHigh
        ? `$${estimate?.roughLow?.toLocaleString() ?? "?"} – $${
            estimate?.roughHigh?.toLocaleString() ?? "?"
          }`
        : "Not set yet";

    const locationLabelMap: Record<
      "home" | "office" | "retail" | "industrial" | "multi",
      string
    > = {
      home: "Home / residence",
      office: "Office / suite",
      retail: "Retail / storefront",
      industrial: "Warehouse / industrial",
      multi: "Multi-location / campus",
    };

    const locationTypeLabel =
      jobLocation?.type ? locationLabelMap[jobLocation.type] : "Not specified";

    // ✅ STRONG IDEMPOTENCY (launch-proof)
    // Deterministic key + deterministic Sanity doc id.
    // If a user double-clicks / refreshes / retries, this will not create duplicates.
    const idempotencyKey = await buildIdempotencyKey({
      email: contact.email,
      phone: contact.phone,
      dateISO: body.dateISO,
      timeSlot: body.timeSlot,
      appointmentType,
    });

    const bookingDocId = `walkthroughBooking.${idempotencyKey}`;

    // We also need to prevent duplicate emails.
    // Check if it already exists BEFORE createIfNotExists.
    const alreadyExists = await sanityWriteClient.fetch<boolean>(
      `defined(*[_id == $id][0]._id)`,
      { id: bookingDocId }
    );

    // 🧠 Save booking into Sanity as `walkthroughBooking`
    const createdAt = new Date();

    const bookingDoc = await sanityWriteClient.createIfNotExists({
      _id: bookingDocId,
      _type: "walkthroughBooking",
      idempotencyKey,

      status: "new", // you can later update this to "confirmed", "completed", etc.
      appointmentType,
      dateISO: body.dateISO,
      timeSlot: body.timeSlot,

      contactName: contact.fullName,
      contactEmail: contact.email,
      contactPhone: contact.phone,

      locationType: jobLocation?.type ?? null,
      locationLabel: locationTypeLabel,
      locationNote: jobLocation?.note ?? null,

      needsOnsiteWalkthrough,
      isVirtualCall: isVirtual,
      isPhoneCall: isPhone,

      estimateSummary,
      estimateRoughRange: roughRangeLabel,
      estimateTotal: estimateTotal ?? null,
      rawEstimateJson: estimate ? JSON.stringify(estimate) : null,

      createdAt: createdAt.toISOString(),
      // optional future fields:
      // followupWalkthroughDateISO: null,
      // followupWalkthroughTimeSlot: null,
      // jobInstallDateISO: null,
    });

    // If it already existed, return and DO NOT email again
    if (alreadyExists) {
      return NextResponse.json(
        { ok: true, id: bookingDoc._id, deduped: true },
        { status: 200 }
      );
    }

    // 🔗 Build owner booking URL (local now, later your real domain)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const ownerBookingUrl = `${appUrl}/owner/booking/${bookingDoc._id}`;

    console.log("[SmartNET owner booking URL]", ownerBookingUrl);

    // ✉️ OWNER / BUSINESS EMAILS
    const ownerEnvEmail = process.env.SMARTNET_BOOKING_EMAIL?.trim() || "";
    const recipients = Array.from(
      new Set(
        [ownerEnvEmail, DEFAULT_NOTIFY_EMAIL].filter(
          (e) => typeof e === "string" && e.length > 0
        )
      )
    );

    const datePretty = new Date(body.dateISO).toLocaleString("en-US", {
      dateStyle: "full",
      timeZone: "America/New_York",
    });

    const subject = `New SmartNET Booking – ${appointmentType} on ${datePretty} at ${body.timeSlot}`;

    const html = buildBookingEmailHtml({
      booking: body,
      estimate,
      estimateSummary,
      roughRangeLabel,
      locationTypeLabel,
      needsOnsiteWalkthrough,
      createdAt,
      docId: bookingDoc._id,
      ownerBookingUrl,
    });

    try {
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || "SmartNET <onboarding@resend.dev>",
        to: recipients,
        subject,
        html,
      });

      console.log("[SmartNET booking email sent to]", recipients);
      console.log("[SmartNET booking email result]", result);
    } catch (emailErr) {
      console.error("[SmartNET booking email error]", emailErr);
      // Don't fail the request if email breaks
    }

    return NextResponse.json(
      {
        ok: true,
        id: bookingDoc._id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SmartNET booking API error]", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// 🧾 Build a rich HTML email with quote + checklist for the crew
function buildBookingEmailHtml(opts: {
  booking: BookingPayload;
  estimate: SmartNetEstimate | null;
  estimateSummary: string;
  roughRangeLabel: string;
  locationTypeLabel: string;
  needsOnsiteWalkthrough: boolean;
  createdAt: Date;
  docId: string;
  ownerBookingUrl: string;
}) {
  const { booking, estimate, estimateSummary, roughRangeLabel } = opts;
  const {
    locationTypeLabel,
    needsOnsiteWalkthrough,
    createdAt,
    docId,
    ownerBookingUrl,
  } = opts;

  const callType = booking.appointmentType || "Walkthrough";

  const createdPretty = createdAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  const isVirtual = callType.toLowerCase().includes("virtual");
  const isPhone = callType.toLowerCase().includes("phone");
  const isOnsite =
    callType.toLowerCase().includes("on-site") ||
    callType.toLowerCase().includes("onsite");

  // 🧠 Dynamic checklist
  const coreQuestions = [
    "Confirm internet provider, modem/router location, and bandwidth.",
    "Confirm where the main network head-end / rack / NVR will live.",
    "Confirm any areas that absolutely MUST be covered by cameras (front door, gates, parking, loading, etc.).",
    "Confirm areas that should specifically NOT be recorded (privacy zones).",
    "Clarify budget comfort and any hard ceiling for this phase.",
    "Ask who is the day-to-day decision maker and who signs off on the final quote.",
  ];

  const onsiteQuestions = [
    "Walk the full perimeter and note mount heights and surface types (stucco, brick, metal, etc.).",
    "Check above ceilings / open ceilings for cable paths and possible obstacles.",
    "Confirm power availability near head-end and any remote locations (gates, poles, etc.).",
    "Confirm ladder / lift access and any safety constraints.",
  ];

  const virtualQuestions = [
    "Have client walk the perimeter with their phone and show ceiling, walls, and key mounting spots.",
    "Have client show current networking gear and low-voltage closet (if any).",
    "Ask them to stand in weak Wi-Fi / blind camera spots while on video so you can see coverage problems.",
  ];

  const phoneQuestions = [
    "Ask for photos or a short video of the space (inside and outside) before the onsite.",
    "Confirm when someone can be onsite to walk with the tech during the walkthrough.",
  ];

  const htmlList = (items: string[]) =>
    `<ul style="margin: 8px 0 0 18px; padding:0; font-size:13px; color:#111827;">${items
      .map(
        (q) => `<li style="margin-bottom:4px; line-height:1.4;">${q}</li>`
      )
      .join("")}</ul>`;

  const coreQuestionsHtml = htmlList(coreQuestions);
  const onsiteQuestionsHtml = htmlList(onsiteQuestions);
  const virtualQuestionsHtml = isVirtual ? htmlList(virtualQuestions) : "";
  const phoneQuestionsHtml = isPhone ? htmlList(phoneQuestions) : "";

  const aiDetailsHtml = `
    <div style="font-size:13px; color:#111827; margin-top:10px;">
      <strong>AI Estimate Range:</strong> ${opts.roughRangeLabel}<br/>
      <strong>Summary:</strong> ${opts.estimateSummary}
      ${
        estimate?.notes
          ? `<div style="margin-top:6px;"><strong>Client Notes:</strong><br/><span style="white-space:pre-line;">${escapeHtml(
              estimate.notes
            )}</span></div>`
          : ""
      }
    </div>
  `;

  const locationNoteHtml = booking.jobLocation?.note
    ? `<div style="margin-top:4px; font-size:13px; color:#4b5563;">
        <strong>Location Notes:</strong><br/>
        <span style="white-space:pre-line;">${escapeHtml(
          booking.jobLocation.note
        )}</span>
       </div>`
    : "";

  const onsiteFlagHtml = needsOnsiteWalkthrough
    ? `<p style="margin: 8px 0 0 0; font-size:13px; color:#b91c1c;">
         ⚠ This booking is <strong>${callType}</strong> only. Schedule a follow-up <strong>on-site walkthrough</strong> date before sending any final proposal.
       </p>`
    : `<p style="margin: 8px 0 0 0; font-size:13px; color:#047857;">
         ✓ On-site walkthrough scheduled as part of this booking.
       </p>`;

  return `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#0f172a; padding: 4px 0;">
      <h2 style="color:#0f172a; margin:0 0 4px 0;">New SmartNET Booking</h2>
      <p style="margin:0; font-size:13px; color:#4b5563;">
        Created: ${createdPretty}<br/>
        Booking ID (Sanity): <code style="font-size:12px; background:#f3f4f6; padding:2px 4px; border-radius:4px;">${docId}</code>
      </p>

      <p style="margin:8px 0 0 0; font-size:13px;">
        <a href="${ownerBookingUrl}" target="_blank" rel="noopener noreferrer"
           style="display:inline-block; margin-top:6px; padding:8px 14px; border-radius:999px; background:#0f172a; color:#e5f0ff; font-size:13px; text-decoration:none;">
          Open booking dashboard view
        </a>
      </p>

      <hr style="margin:12px 0; border:none; border-top:1px solid #e5e7eb;" />

      <h3 style="margin:0 0 6px 0; font-size:15px;">Client & Appointment</h3>
      <div style="font-size:13px; color:#111827;">
        <strong>Client:</strong> ${escapeHtml(booking.contact.fullName)}<br/>
        <strong>Email:</strong> ${escapeHtml(booking.contact.email)}<br/>
        <strong>Phone:</strong> ${escapeHtml(booking.contact.phone)}<br/>
        <strong>Appointment Type:</strong> ${escapeHtml(callType)}<br/>
        <strong>Date & Time:</strong> ${new Date(
          booking.dateISO
        ).toLocaleDateString("en-US", { dateStyle: "full" })} at ${escapeHtml(
    booking.timeSlot
  )}<br/>
        <strong>Location Type:</strong> ${escapeHtml(locationTypeLabel)}
        ${locationNoteHtml}
      </div>

      <hr style="margin:12px 0; border:none; border-top:1px solid #e5e7eb;" />

      <h3 style="margin:0 0 6px 0; font-size:15px;">Quote Snapshot</h3>
      ${aiDetailsHtml}

      <hr style="margin:12px 0; border:none; border-top:1px solid #e5e7eb;" />

      <h3 style="margin:0 0 6px 0; font-size:15px;">What to Cover on This ${escapeHtml(
        callType
      )}</h3>
      <p style="margin:0 0 4px 0; font-size:13px; color:#111827;">
        Use this as a quick script/checklist so every call or walkthrough moves the quote closer to a signed job.
      </p>

      <p style="margin:6px 0 2px 0; font-size:13px; font-weight:600;">Core items (every call):</p>
      ${coreQuestionsHtml}

      ${
        isOnsite
          ? `<p style="margin:10px 0 2px 0; font-size:13px; font-weight:600;">On-site walkthrough checks:</p>${onsiteQuestionsHtml}`
          : ""
      }

      ${
        isVirtual
          ? `<p style="margin:10px 0 2px 0; font-size:13px; font-weight:600;">Extra for virtual calls:</p>${virtualQuestionsHtml}`
          : ""
      }

      ${
        isPhone
          ? `<p style="margin:10px 0 2px 0; font-size:13px; font-weight:600;">Extra for phone-only calls:</p>${phoneQuestionsHtml}`
          : ""
      }

      ${onsiteFlagHtml}

      <hr style="margin:12px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="margin:0; font-size:12px; color:#9ca3af;">
        SmartNET AI • Walkthrough bookings, quotes & automation ready.
      </p>
    </div>
  `;
}

// tiny helper so we don't break HTML when echoing user text
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

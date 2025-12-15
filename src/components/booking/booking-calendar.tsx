"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import QRCode from "react-qr-code";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

// ✅ Dynamic import for QuotePDF – expects a default export from src/components/quote/QuotePDF.tsx
const QuotePDF = dynamic(() => import("@/components/quote/QuotePDF"), {
  ssr: false,
});

// Summary from Steps 1–4 (already human-readable labels)
export type SmartNetEstimate = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[]; // Cameras, Wi-Fi & APs, etc.
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

// Booking payload we'll send up to /api/booking (and optional parent)
export type BookingPayload = {
  dateISO: string;
  timeSlot: string;
  appointmentType: string;
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

// Utility helpers
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function diffInDays(from: Date, to: Date): number {
  const utcFrom = Date.UTC(
    from.getFullYear(),
    from.getMonth(),
    from.getDate()
  );
  const utcTo = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcTo - utcFrom) / msPerDay);
}

// 3-day / 4-day rotation, starting Dec 4
const CYCLE_START = new Date("2025-12-04T00:00:00");
const CYCLE_LENGTH = 14;
const BOOKED_OFFSETS = new Set<number>([0, 1, 2, 6, 7, 8, 9]);

function isBookedDate(date: Date): boolean {
  const offset = diffInDays(CYCLE_START, date);
  if (offset < 0) return false;
  const mod = ((offset % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
  return BOOKED_OFFSETS.has(mod);
}

type BookingCalendarSectionProps = {
  estimate?: SmartNetEstimate;
  onConfirmBooking?: (payload: BookingPayload) => Promise<void> | void;
};

export function BookingCalendarSection({
  estimate,
  onConfirmBooking,
}: BookingCalendarSectionProps) {
  // Core booking state
  const [date, setDate] = React.useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = React.useState<string | null>(null);
  const [appointmentType, setAppointmentType] = React.useState<
    "virtual" | "onsite" | "phone"
  >("onsite");

  // UX toggles
  const [showTypeHelp, setShowTypeHelp] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(true);

  // contact + location
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [locationType, setLocationType] = React.useState<
    "home" | "office" | "retail" | "industrial" | "multi"
  >("home");
  const [locationNote, setLocationNote] = React.useState("");

  // submit + success
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingSummary, setBookingSummary] = React.useState<string | null>(
    null
  );

  // Toast message state
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // 🔹 Store the last successful booking payload for the PDF
  const [lastBooking, setLastBooking] = React.useState<BookingPayload | null>(
    null
  );

  // 🔹 "Continue later" magic link state
  const [magicEmail, setMagicEmail] = React.useState("");
  const [magicPhone, setMagicPhone] = React.useState("");
  const [isSendingMagicLink, setIsSendingMagicLink] = React.useState(false);
  const [magicLinkMessage, setMagicLinkMessage] = React.useState<
    string | null
  >(null);

  // 🔹 The actual magic link URL (shown as QR + text)
  const [magicLinkUrl, setMagicLinkUrl] = React.useState<string | null>(null);

  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
  const today = startOfDay(new Date());

  // 🔹 Confirm booking: call /api/booking + optional parent, PDF, auto magic link
  const handleConfirm = async () => {
    if (!date || !timeSlot || !fullName || !email || !phone) return;

    const typeLabel =
      appointmentType === "onsite"
        ? "On-site walkthrough"
        : appointmentType === "virtual"
        ? "Virtual call"
        : "Phone call";

    const payload: BookingPayload = {
      dateISO: date.toISOString(),
      timeSlot,
      appointmentType: typeLabel,
      contact: {
        fullName,
        email,
        phone,
      },
      jobLocation: {
        type: locationType,
        note: locationNote || null,
      },
      estimate: estimate ?? null,
    };

    try {
      setIsSubmitting(true);

      // 🔹 Hit the backend booking route (saves to Sanity + emails owner + client)
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("[SmartNET booking failed]", await res.text());
        setToastMessage(
          "Something glitched while saving your booking. You can try again or contact us directly."
        );
        return;
      }

      const data: unknown = await res.json().catch(() => null);
      console.log("[SmartNET booking success]", data);

      // Optional callback to parent
      if (onConfirmBooking) {
        await onConfirmBooking(payload);
      }

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

      const summaryLines = [
        `You're locked in for ${date.toDateString()} at ${timeSlot} (${typeLabel}).`,
        `For: ${fullName}.`,
        `We'll send confirmation + your SmartNET profile to ${email}.`,
        `Callback: ${phone}. Location type: ${locationLabelMap[locationType]}.`,
        locationNote ? `Location notes: ${locationNote}` : "",
        estimate && (estimate.roughLow || estimate.roughHigh)
          ? `AI rough range: $${estimate.roughLow?.toLocaleString() ?? "?"} – $${estimate.roughHigh?.toLocaleString() ?? "?"}.`
          : "",
      ]
        .filter(Boolean)
        .join(" ");

      setBookingSummary(summaryLines);
      setToastMessage(summaryLines);
      setLastBooking(payload);

      // 🔥 Auto-generate magic link after booking (lead snapshot)
      try {
        const magicRes = await fetch("/api/magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact: {
              email: email || null,
              phone: phone || null,
              jobLocation: locationNote || null,
            },
            estimate: estimate ?? null,
          }),
        });

        if (magicRes.ok) {
          const magicData: unknown = await magicRes.json().catch(() => null);
          let url: string | null = null;

          if (magicData && typeof magicData === "object") {
            const maybeAny = magicData as Record<string, unknown>;
            if (typeof maybeAny.quoteUrl === "string") {
              url = maybeAny.quoteUrl;
            } else if (typeof maybeAny.magicUrl === "string") {
              url = maybeAny.magicUrl;
            } else if (typeof maybeAny.url === "string") {
              url = maybeAny.url;
            }
          }

          if (url) {
            setMagicLinkUrl(url);
          }
        }
      } catch (err) {
        console.error("Magic link auto-generation failed:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 "Continue later" magic link handler + QR code
  const handleSendMagicLink = async () => {
    if (!magicEmail && !magicPhone) {
      setMagicLinkMessage("Add an email or phone so we know where to send it.");
      setMagicLinkUrl(null);
      return;
    }

    try {
      setIsSendingMagicLink(true);
      setMagicLinkMessage(null);
      setMagicLinkUrl(null);

      const res = await fetch("/api/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            email: magicEmail || null,
            phone: magicPhone || null,
            jobLocation: locationNote || null,
          },
          estimate: estimate ?? null,
        }),
      });

      if (!res.ok) {
        throw new Error(`Bad status: ${res.status}`);
      }

      // Your route returns: { ok: true, quoteUrl, token, id }
      const data: unknown = await res.json().catch(() => null);
      let url: string | null = null;

      if (data && typeof data === "object") {
        const maybeAny = data as Record<string, unknown>;
        if (typeof maybeAny.quoteUrl === "string") {
          url = maybeAny.quoteUrl;
        } else if (typeof maybeAny.magicUrl === "string") {
          url = maybeAny.magicUrl;
        } else if (typeof maybeAny.url === "string") {
          url = maybeAny.url;
        }
      }

      if (url) {
        setMagicLinkUrl(url);
        setMagicLinkMessage(
          "Got it — we’ll send a link so you can pick this SmartNET estimate back up later. You can also scan this QR code to jump straight to your quote page."
        );
      } else {
        setMagicLinkUrl(null);
        setMagicLinkMessage(
          "Got it — we’ll send a link so you can pick this SmartNET estimate back up later."
        );
      }
    } catch (err) {
      console.error("Failed to send magic link", err);
      setMagicLinkUrl(null);
      setMagicLinkMessage(
        "Something glitched on our side. You can try again or just book a walkthrough and we’ll handle it live."
      );
    } finally {
      setIsSendingMagicLink(false);
    }
  };

  const selectedTypeLabel =
    appointmentType === "onsite"
      ? "On-site walkthrough"
      : appointmentType === "virtual"
      ? "Virtual call"
      : "Phone call";

  const confirmDisabled =
    !date || !timeSlot || !fullName || !email || !phone || isSubmitting;

  return (
    <section
      id="booking-calendar"
      className="relative border-y border-[#020617] bg-[#020617] py-16 scroll-mt-28"
    >
      {/* Ambient glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(3,7,18,1),_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-8 px-4">
        {/* Heading – Step 5 */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Step 5 · Choose a day for your walkthrough
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#e6f4ff] sm:text-3xl">
            Lock in the walkthrough that turns your SmartNET plan into a build.
          </h2>
          <p className="max-w-xl text-sm text-[#a3c3df] sm:text-base">
            Your AI estimate (Steps 1–4) gives us the range. This step locks a
            day for your on-site or virtual survey so we can turn that rough
            range into a formal proposal.
          </p>
        </div>

        {/* 🔹 Micro-copy about walkthrough length */}
        <p className="mx-auto -mt-2 mb-2 max-w-2xl text-center text-[0.8rem] text-slate-400">
          Most SmartNET walkthroughs take{" "}
          <span className="font-semibold text-sky-300">30–45 minutes</span> and
          help us create the most accurate proposal for your space.
        </p>

        {/* TOP: Calendar card */}
        <Card className="rounded-2xl border border-[#101827] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.96),_rgba(2,6,23,1))] shadow-[0_0_52px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#e6f4ff]">
              Choose a day
            </CardTitle>
            <p className="text-xs text-[#7f96b2]">
              The rotation blocks out certain clusters of days. Look for dates
              without the &quot;Booked&quot; tag to schedule your walkthrough.
            </p>
          </CardHeader>
          <CardContent className="pb-5">
            <div className="rounded-xl border border-[#1f2937] bg-[#020617] p-2 shadow-[0_0_42px_rgba(2,6,23,0.95)]">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
                titleFormat={{ month: "long", year: "numeric" }}
                dateClick={(info) => {
                  const clicked = startOfDay(info.date);

                  if (clicked < today) return;

                  if (isBookedDate(clicked)) {
                    // Fully booked by the SmartNET rotation
                    return;
                  }

                  setDate(clicked);
                }}
                selectable
                fixedWeekCount={false}
                aspectRatio={1.35}
                dayHeaderClassNames={() =>
                  "text-[0.65rem] font-semibold text-[#90a5c1] uppercase tracking-wide"
                }
                dayCellClassNames={(arg) => {
                  const cellDate = startOfDay(arg.date);
                  const classes = ["transition-colors", "relative", "group"];

                  const booked = isBookedDate(cellDate);
                  const isToday = sameDay(cellDate, today);
                  const isSelected = !!date && sameDay(cellDate, date);
                  const isPast = cellDate < today;

                  if (booked) classes.push("fc-day-booked");
                  else classes.push("fc-day-available");

                  if (isToday) classes.push("fc-day-today-custom");
                  if (isSelected) classes.push("fc-day-selected-custom");
                  if (isPast) classes.push("fc-day-past-custom");

                  return classes;
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* BOTTOM: Time, contact, profile, success + magic link */}
        <Card className="rounded-2xl border border-[#39c4ff]/75 bg-[radial-gradient(circle_at_top,_rgba(18,34,58,0.98),_rgba(3,7,18,1))] shadow-[0_0_86px_rgba(56,189,248,0.75)] backdrop-blur-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#eaf5ff]">
              Time, contact & summary
            </CardTitle>
            <p className="text-xs text-[#8ca3c0]">
              Pick how we meet, choose a time slot, add your contact details,
              and we’ll attach your AI estimate snapshot to the booking.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 text-sm">
            {/* AI mascot */}
            <div className="flex flex-col items-center justify-center pt-1 pb-3">
              <div className="relative h-20 w-20 buddy-float">
                <div className="absolute inset-0 rounded-full buddy-glow" />
                <div className="absolute inset-[3px] flex items-center justify-center rounded-full border border-sky-400/80 bg-[#020617]/95 shadow-[0_0_30px_rgba(56,189,248,0.95)]">
                  <div className="relative h-14 w-14">
                    <Image
                      src="/mascot/images/mascot1.png"
                      alt="SmartNET AI Mascot"
                      fill
                      sizes="56px"
                      className="object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-2 text-[0.7rem] font-semibold tracking-wide text-sky-200">
                SmartNET AI · Booking Buddy
              </p>
              <p className="max-w-[13rem] text-center text-[0.65rem] text-[#8ca3c0]">
                Pulls in your AI estimate (Steps 1–4) so the crew shows up
                already aligned with your plan.
              </p>
            </div>

            {/* Appointment type */}
            <div className="space-y-3">
              <p className="mb-1 text-xs uppercase tracking-[0.2em] text-sky-400">
                Appointment type
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentType("onsite")}
                  className={`rounded-full border px-4 py-1.5 text-xs transition ${
                    appointmentType === "onsite"
                      ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_22px_rgba(56,189,248,0.9)]"
                      : "border-[#334155] bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                  }`}
                >
                  On-site walkthrough
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType("virtual")}
                  className={`rounded-full border px-4 py-1.5 text-xs transition ${
                    appointmentType === "virtual"
                      ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_22px_rgba(56,189,248,0.9)]"
                      : "border-[#334155] bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                  }`}
                >
                  Virtual call
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType("phone")}
                  className={`rounded-full border px-4 py-1.5 text-xs transition ${
                    appointmentType === "phone"
                      ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_22px_rgba(56,189,248,0.9)]"
                      : "border-[#334155] bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                  }`}
                >
                  Phone call
                </button>
              </div>

              {/* Tiny accordion */}
              <div className="mt-1 rounded-lg border border-[#111827] bg-[#020617]/95">
                <button
                  type="button"
                  onClick={() => setShowTypeHelp((prev) => !prev)}
                  className="flex w-full items-center justify-between px-2 py-1.5 text-[0.7rem] font-medium text-[#d4e5fb]"
                >
                  <span>What&apos;s the difference?</span>
                  <span className="text-sky-300">
                    {showTypeHelp ? "▴" : "▾"}
                  </span>
                </button>
                {showTypeHelp && (
                  <div className="border-t border-[#020617] px-2 pb-2 pt-1 text-[0.7rem] text-[#8fa4c1]">
                    <ul className="space-y-1">
                      <li>
                        <span className="font-semibold text-sky-300">
                          On-site
                        </span>{" "}
                        – full wiring + camera/AP placement survey.
                      </li>
                      <li>
                        <span className="font-semibold text-sky-300">
                          Virtual
                        </span>{" "}
                        – video walk-through to refine your AI estimate.
                      </li>
                      <li>
                        <span className="font-semibold text-sky-300">
                          Phone
                        </span>{" "}
                        – quick 10–15 min Q&amp;A before scheduling.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
                Contact details
              </p>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[0.7rem] text-[#cbd5f5]">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="First & last name"
                    className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[0.7rem] text-[#cbd5f5]">
                    Email for confirmation
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[0.7rem] text-[#cbd5f5]">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 15);
                      setPhone(digitsOnly);
                    }}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* Location info */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
                Where is this install?
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "office", label: "Office / suite" },
                  { id: "retail", label: "Retail / storefront" },
                  { id: "industrial", label: "Warehouse / industrial" },
                  { id: "multi", label: "Multi-location" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setLocationType(
                        opt.id as
                          | "home"
                          | "office"
                          | "retail"
                          | "industrial"
                          | "multi"
                      )
                    }
                    className={`rounded-full border px-3 py-1 text-[0.7rem] transition ${
                      locationType === opt.id
                        ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
                        : "border-[#334155] bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-[0.7rem] text-[#cbd5f5]">
                  Location details (optional)
                </label>
                <textarea
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder="Ex: Back building of the plaza, unit 204. Gate code, parking notes, etc."
                  rows={2}
                  className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                />
              </div>
            </div>

            {/* SmartNET profile – collapsible */}
            {estimate && (
              <div className="space-y-2 rounded-lg border border-[#1e293b] bg-[#020617]/80 px-3 py-3 text-[0.7rem] text-[#9fb4d4]">
                <button
                  type="button"
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-400">
                    Your SmartNET profile · Steps 1–4
                  </p>
                  <span className="text-sky-300 text-xs">
                    {showProfile ? "▴" : "▾"}
                  </span>
                </button>

                {showProfile && (
                  <div className="mt-2 space-y-2">
                    <div className="grid gap-1.5 md:grid-cols-2">
                      <ProfileRow
                        label="Project type"
                        value={estimate.projectType ?? "Not set yet"}
                      />
                      <ProfileRow
                        label="Approx. square footage"
                        value={
                          estimate.squareFootage
                            ? `${estimate.squareFootage.toLocaleString()} ft²`
                            : "Not set yet"
                        }
                      />
                      <ProfileRow
                        label="Focus"
                        value={
                          estimate.focus && estimate.focus.length > 0
                            ? estimate.focus.join(" · ")
                            : "Not picked yet"
                        }
                      />
                      <ProfileRow
                        label="Coverage profile"
                        value={estimate.coverageProfile ?? "Not picked yet"}
                      />
                      <ProfileRow
                        label="Wi-Fi layout"
                        value={estimate.wifiLayout ?? "Not picked yet"}
                      />
                      <ProfileRow
                        label="Doors / access"
                        value={estimate.doorsAccess ?? "Not picked yet"}
                      />
                      <ProfileRow
                        label="Extras"
                        value={
                          estimate.extras && estimate.extras.length > 0
                            ? estimate.extras.join(" · ")
                            : "None yet"
                        }
                      />
                      <ProfileRow
                        label="Wiring style"
                        value={estimate.wiringStyle ?? "Not picked yet"}
                      />
                      <ProfileRow
                        label="Rack location"
                        value={estimate.rackLocation ?? "Not picked yet"}
                      />
                      <ProfileRow
                        label="Timeline"
                        value={estimate.timeline ?? "Not picked yet"}
                      />
                    </div>

                    {estimate.notes && (
                      <div className="mt-2 rounded-md border border-slate-700/80 bg-slate-950/60 p-2">
                        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-400">
                          Special notes
                        </p>
                        <p className="mt-0.5 whitespace-pre-wrap text-[0.7rem] text-slate-100">
                          {estimate.notes}
                        </p>
                      </div>
                    )}

                    {estimate.roughLow && estimate.roughHigh && (
                      <p className="mt-1 text-[0.7rem] text-sky-200">
                        <span className="font-semibold">AI rough range:</span>{" "}
                        ${estimate.roughLow.toLocaleString()} – $
                        {estimate.roughHigh.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 🔹 Continue later / magic link block */}
            <div className="space-y-2 rounded-lg border border-slate-700/80 bg-slate-950/70 px-3 py-3 text-[0.7rem] text-slate-200">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                Not ready to book yet?
              </p>
              <p className="text-[0.7rem] text-slate-300">
                Drop an email or phone and we’ll send a{" "}
                <span className="font-semibold text-sky-200">
                  magic link
                </span>{" "}
                so you can come back to this SmartNET estimate later.
              </p>

              <div className="mt-2 grid gap-2 md:grid-cols-[1.1fr,1.1fr,auto]">
                <input
                  type="email"
                  value={magicEmail}
                  onChange={(e) => {
                    setMagicEmail(e.target.value);
                    setMagicLinkUrl(null);
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                />
                <input
                  type="tel"
                  value={magicPhone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 15);
                    setMagicPhone(digitsOnly);
                    setMagicLinkUrl(null);
                  }}
                  placeholder="(optional) mobile number"
                  className="w-full rounded-lg border border-[#1f2937] bg-[#020617] px-3 py-1.5 text-xs text-sky-50 outline-none placeholder:text-[#64748b] focus:border-sky-400"
                />
                <Button
                  type="button"
                  onClick={handleSendMagicLink}
                  disabled={isSendingMagicLink}
                  className="w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-1.5 text-[0.7rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_18px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none"
                >
                  {isSendingMagicLink ? "Sending..." : "Send magic link"}
                </Button>
              </div>

              {magicLinkMessage && (
                <p className="mt-1 text-[0.68rem] text-sky-200">
                  {magicLinkMessage}
                </p>
              )}

              {/* QR code preview for the magic quote link */}
              {magicLinkUrl && (
                <div className="mt-3 flex flex-col gap-2 rounded-lg border border-sky-500/40 bg-slate-900/70 p-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                    Scan to open your quote page
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-white p-2 shadow-[0_0_16px_rgba(59,130,246,0.8)]">
                      <QRCode value={magicLinkUrl} size={72} />
                    </div>
                    <div className="max-w-xs break-all text-[0.65rem] text-slate-200">
                      {magicLinkUrl}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Booking summary (date/time/type) */}
            <div className="space-y-1 text-xs text-[#b5cbe4]">
              <p>
                <span className="font-semibold text-[#eaf5ff]">
                  Selected date:
                </span>{" "}
                {date ? date.toDateString() : "None yet"}
              </p>
              <p>
                <span className="font-semibold text-[#eaf5ff]">
                  Selected time:
                </span>{" "}
                {timeSlot ?? "None yet"}
              </p>
              <p>
                <span className="font-semibold text-[#eaf5ff]">Type:</span>{" "}
                {selectedTypeLabel}
              </p>
            </div>

            {/* Available time slots */}
            <div>
              <p className="mt-3 mb-2 text-xs uppercase tracking-[0.2em] text-sky-400">
                Available times
              </p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        isSelected
                          ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_20px_rgba(56,189,248,0.85)]"
                          : "border-[#334155] bg-slate-900/80 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Green success box */}
            {bookingSummary && (
              <div className="mt-3 rounded-xl border border-emerald-400/70 bg-gradient-to-br from-emerald-900/70 via-emerald-800/80 to-slate-950/95 p-3 text-[0.7rem] text-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.7)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Booking locked in
                </p>
                <p className="mt-1 leading-relaxed">{bookingSummary}</p>
                <p className="mt-1 text-[0.65rem] text-emerald-100/80">
                  If you need to tweak anything, update the fields and press
                  confirm again.
                </p>
                <p className="mt-2 text-[0.62rem] leading-relaxed text-emerald-100/75">
  Estimates are preliminary and may change after the walkthrough based on site
  conditions, scope verification, and equipment requirements. We use your
  contact and project details only to schedule, estimate, and communicate —
  your information is never sold.
</p>

                {/* Download Estimate PDF */}
                {lastBooking && (
                  <div className="mt-3 border-t border-emerald-500/40 pt-3">
                    <QuotePDF
                      estimate={estimate ?? null}
                      booking={lastBooking}
                    />
                  </div>
                )}

                {/* Auto-generated QR code after booking */}
                {magicLinkUrl && (
                  <div className="mt-4 rounded-lg border border-sky-500/40 bg-slate-900/70 p-3">
                    <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sky-300">
                      Quick access to your SmartNET estimate
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-white p-2 shadow-[0_0_16px_rgba(59,130,246,0.8)]">
                        <QRCode value={magicLinkUrl} size={84} />
                      </div>
                      <div className="max-w-xs break-all text-[0.65rem] text-slate-200">
                        {magicLinkUrl}
                      </div>
                    </div>
                    <p className="mt-2 text-[0.6rem] text-slate-400">
                      Scan or tap to reopen your quote anytime.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Confirm button */}
            <Button
              type="button"
              disabled={confirmDisabled}
              onClick={handleConfirm}
              className="mt-2 w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] text-xs font-semibold tracking-wide text-slate-950 shadow-[0_0_26px_rgba(63,201,255,0.95)] hover:from-[#37b6ff] hover:to-[#40c4ff] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none"
            >
              {isSubmitting ? "Locking in..." : "Confirm this time"}
            </Button>
          </CardContent>
        </Card>

        {/* Inline toast message */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-emerald-400/70 bg-slate-900/95 px-4 py-3 text-xs text-emerald-50 shadow-[0_0_26px_rgba(16,185,129,0.8)]">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <div className="space-y-1">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Booking locked in
                </p>
                <p className="leading-relaxed text-[0.7rem]">
                  {toastMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="ml-2 text-[0.7rem] text-emerald-200/80 hover:text-emerald-100"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Local FullCalendar + Buddy styles */}
      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(30, 64, 175, 0.55);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: transparent;
          --fc-list-event-hover-bg-color: rgba(15, 23, 42, 0.9);
          --fc-today-bg-color: transparent;
          font-size: 0.8rem;
        }

        .fc .fc-toolbar.fc-header-toolbar {
          margin-bottom: 0.75rem;
        }

        .fc .fc-toolbar-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #e5f0ff;
        }

        .fc .fc-button-primary {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.7);
          padding: 0.15rem 0.45rem;
          font-size: 0.7rem;
          border-radius: 999px;
          text-transform: none;
        }

        .fc .fc-button-primary:hover {
          background: rgba(15, 23, 42, 1);
          border-color: rgba(56, 189, 248, 0.9);
        }

        .fc .fc-button-primary:disabled {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(148, 163, 184, 0.4);
          opacity: 0.7;
        }

        .fc .fc-daygrid-day {
          border-color: rgba(30, 64, 175, 0.5);
        }

        .fc-day-available .fc-daygrid-day-frame {
          background: radial-gradient(
            circle at top,
            rgba(15, 23, 42, 0.95),
            rgba(2, 6, 23, 1)
          );
          transition: box-shadow 150ms ease, border-color 150ms ease,
            background 150ms ease;
        }

        .fc-day-available:hover .fc-daygrid-day-frame {
          border-radius: 0.9rem;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
          border: 1px solid rgba(56, 189, 248, 0.7);
        }

        .fc-day-booked .fc-daygrid-day-frame {
          background: radial-gradient(
            circle at bottom,
            rgba(15, 23, 42, 1),
            rgba(2, 6, 23, 1)
          );
          opacity: 0.85;
        }

        .fc-day-booked .fc-daygrid-day-events .fc-daygrid-event {
          background: rgba(127, 29, 29, 0.9) !important;
          border: 1px solid rgba(248, 113, 113, 1) !important;
          color: #fee2e2 !important;
          border-radius: 999px;
          padding: 0.08rem 0.4rem;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          box-shadow: 0 0 8px rgba(248, 113, 113, 0.4);
          justify-content: center;
        }

        .fc-daygrid-day-events .fc-daygrid-event-dot {
          display: none;
        }

        .fc-daygrid-day-events {
          margin-top: 0.25rem;
        }

        .fc-day-booked {
          cursor: not-allowed;
        }

        .fc-day-past-custom .fc-daygrid-day-frame {
          opacity: 0.35;
          filter: grayscale(0.2);
          cursor: default;
        }

        .fc-day-past-custom {
          pointer-events: none;
        }

        .fc-day-today-custom .fc-daygrid-day-number {
          position: relative;
          color: #e5f0ff;
        }

        .fc-day-today-custom .fc-daygrid-day-number::after {
          content: "";
          position: absolute;
          inset: -0.18rem;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.9);
        }

        .fc-day-selected-custom .fc-daygrid-day-frame {
          border-radius: 0.9rem;
          border: 1px solid rgba(56, 189, 248, 1);
          box-shadow: 0 0 26px rgba(56, 189, 248, 0.9);
        }

        .fc-day-selected-custom .fc-daygrid-day-number {
          color: #e0f2fe;
          font-weight: 700;
        }

        .fc .fc-daygrid-day-number {
          font-size: 0.7rem;
          color: #9fb4d4;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: rgba(30, 64, 175, 0.5);
        }

        /* Lil Buddy motion – only the circle moves */
        .buddy-float {
          animation: buddyFloat 4s ease-in-out infinite;
        }

        .buddy-glow {
          background: radial-gradient(
            circle at 30% 10%,
            rgba(56, 189, 248, 0.9),
            rgba(15, 23, 42, 1)
          );
          animation: buddyGlow 4s ease-in-out infinite;
        }

        @keyframes buddyFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes buddyGlow {
          0%,
          100% {
            opacity: 0.9;
            filter: blur(4px);
          }
          50% {
            opacity: 0.5;
            filter: blur(6px);
          }
        }
      `}</style>
    </section>
  );
}

type ProfileRowProps = {
  label: string;
  value: string;
};

function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[0.62rem] uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <span className="text-[0.72rem] text-slate-100">{value}</span>
    </div>
  );
}

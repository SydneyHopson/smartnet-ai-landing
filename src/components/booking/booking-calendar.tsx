"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import QRCode from "react-qr-code";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  buildEstimateSummary,
  getCameraCount,
  getDoorCount,
  getPriceRange,
  getProjectType,
  getSquareFootage,
  getWifiApCount,
  type SmartNetEstimateSnapshot,
} from "@/lib/estimate-snapshot";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), { ssr: false });
const QuotePDF = dynamic(() => import("@/components/quote/QuotePDF"), { ssr: false });

export type SmartNetEstimate = SmartNetEstimateSnapshot;

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

type BookingCalendarSectionProps = {
  estimate?: SmartNetEstimate;
  onConfirmBooking?: (payload: BookingPayload) => Promise<void> | void;
};

type AppointmentType = "onsite" | "virtual" | "phone";
type LocationType = BookingPayload["jobLocation"]["type"];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function diffInDays(from: Date, to: Date): number {
  return Math.floor(
    (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) /
      86_400_000
  );
}

// Light placeholder availability until the live calendar/AI operator owns
// scheduling. Only two days per 14-day cycle are visually unavailable.
const CYCLE_START = new Date("2025-12-04T00:00:00");
const CYCLE_LENGTH = 14;
const BOOKED_OFFSETS = new Set<number>([3, 10]);

function isBookedDate(date: Date): boolean {
  const offset = diffInDays(CYCLE_START, date);
  if (offset < 0) return false;
  const mod = ((offset % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
  return BOOKED_OFFSETS.has(mod);
}

function labelProjectType(value: string | null): string {
  if (!value) return "Not specified";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function BookingCalendarSection({ estimate, onConfirmBooking }: BookingCalendarSectionProps) {
  const [date, setDate] = React.useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = React.useState<string | null>(null);
  const [appointmentType, setAppointmentType] = React.useState<AppointmentType>("onsite");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [locationType, setLocationType] = React.useState<LocationType>("home");
  const [locationNote, setLocationNote] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingSummary, setBookingSummary] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [lastBooking, setLastBooking] = React.useState<BookingPayload | null>(null);
  const [magicEmail, setMagicEmail] = React.useState("");
  const [magicPhone, setMagicPhone] = React.useState("");
  const [isSendingMagicLink, setIsSendingMagicLink] = React.useState(false);
  const [magicLinkMessage, setMagicLinkMessage] = React.useState<string | null>(null);
  const [magicLinkUrl, setMagicLinkUrl] = React.useState<string | null>(null);
  const [showProfile, setShowProfile] = React.useState(true);

  const today = startOfDay(new Date());
  const hasEstimate = Boolean(estimate);
  const projectType = getProjectType(estimate);
  const squareFootage = getSquareFootage(estimate);
  const cameraCount = getCameraCount(estimate);
  const wifiCount = getWifiApCount(estimate);
  const doorCount = getDoorCount(estimate);
  const priceRange = getPriceRange(estimate);
  const estimateSummary = buildEstimateSummary(estimate);

  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
  const selectedTypeLabel =
    appointmentType === "onsite"
      ? "On-site walkthrough"
      : appointmentType === "virtual"
        ? "Virtual consultation"
        : "Phone consultation";

  const confirmDisabled = !date || !timeSlot || !fullName.trim() || !email.trim() || !phone.trim() || isSubmitting;

  async function createMagicLink(contactEmail: string, contactPhone: string) {
    const response = await fetch("/api/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          fullName: fullName.trim() || null,
          email: contactEmail || null,
          phone: contactPhone || null,
          jobLocation: locationNote.trim() || null,
        },
        estimate: estimate ?? null,
      }),
    });

    if (!response.ok) throw new Error(`Magic-link request failed (${response.status})`);
    const data = (await response.json()) as { quoteUrl?: string; magicUrl?: string; url?: string };
    return data.quoteUrl ?? data.magicUrl ?? data.url ?? null;
  }

  const handleConfirm = async () => {
    if (confirmDisabled || !date || !timeSlot) return;

    const payload: BookingPayload = {
      dateISO: date.toISOString(),
      timeSlot,
      appointmentType: selectedTypeLabel,
      contact: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      jobLocation: {
        type: locationType,
        note: locationNote.trim() || null,
      },
      estimate: estimate ?? null,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setToastMessage("Something glitched while saving your booking. Please try again.");
        return;
      }

      await onConfirmBooking?.(payload);
      setLastBooking(payload);

      const summary = `${selectedTypeLabel} confirmed for ${date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })} at ${timeSlot}. ${hasEstimate ? "Your AI project profile is attached." : "We'll build your project profile during the consultation."}`;

      setBookingSummary(summary);
      setToastMessage(summary);

      try {
        const url = await createMagicLink(email.trim(), phone.trim());
        if (url) setMagicLinkUrl(url);
      } catch (error) {
        // Booking success should never be rolled back because project-link email failed.
        console.error("[SmartNET] Post-booking project-link creation failed", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMagicLink = async () => {
    const targetEmail = magicEmail.trim();
    const targetPhone = magicPhone.trim();
    if (!targetEmail && !targetPhone) {
      setMagicLinkMessage("Add an email or phone so we know where to save your project link.");
      return;
    }

    try {
      setIsSendingMagicLink(true);
      setMagicLinkMessage(null);
      setMagicLinkUrl(null);
      const url = await createMagicLink(targetEmail, targetPhone);
      setMagicLinkUrl(url);
      setMagicLinkMessage(
        url
          ? "Your SmartNET project link is ready. The complete estimate snapshot is attached to it."
          : "Your SmartNET project link has been created."
      );
    } catch (error) {
      console.error("[SmartNET] Project-link creation failed", error);
      setMagicLinkMessage("Something glitched while creating your project link. Please try again.");
    } finally {
      setIsSendingMagicLink(false);
    }
  };

  return (
    <section id="booking-calendar" className="relative scroll-mt-28 overflow-hidden bg-[#020617] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_55%,rgba(37,99,235,.13),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(56,189,248,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.45)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 border-y border-sky-400/30 bg-sky-950/20 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,.8)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">SmartNET Project Scheduling</span>
          </div>
          <h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Turn Your Plan Into
            <span className="block bg-gradient-to-r from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">A Real Installation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Book directly, choose a phone or virtual consultation, or attach your SmartNET AI estimate so our team arrives already knowing the project.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className={`rounded-2xl border p-5 sm:p-6 ${hasEstimate ? "border-sky-400/35 bg-sky-950/15" : "border-slate-700/60 bg-slate-950/45"}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Project Profile</p>
                  <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${hasEstimate ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-slate-600 bg-slate-800/60 text-slate-400"}`}>
                    {hasEstimate ? "AI Estimate Attached" : "Direct Booking"}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                  {hasEstimate
                    ? "Project type, devices, network, cabling, access control, equipment, pricing and assessment details will travel with this booking and its project link."
                    : "No estimate required. Pick a consultation and we'll collect the project details with you."}
                </p>
              </div>
              {(priceRange.low !== null || priceRange.high !== null) && (
                <div className="shrink-0 lg:text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Preliminary Range</p>
                  <p className="mt-1 text-xl font-bold text-emerald-300">
                    ${priceRange.low?.toLocaleString() ?? "?"} – ${priceRange.high?.toLocaleString() ?? "?"}
                  </p>
                </div>
              )}
            </div>

            {hasEstimate && (
              <div className="mt-5 border-t border-sky-500/15 pt-5">
                <button type="button" onClick={() => setShowProfile((value) => !value)} className="flex w-full items-center justify-between text-left">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Project Intelligence</span>
                  <span className="text-sky-300">{showProfile ? "−" : "+"}</span>
                </button>
                {showProfile && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <ProjectDataCard label="Project Type" value={labelProjectType(projectType)} />
                    <ProjectDataCard label="Property Size" value={squareFootage !== null ? `${squareFootage.toLocaleString()} SQ FT` : "Not specified"} />
                    <ProjectDataCard label="Cameras" value={cameraCount !== null ? String(cameraCount) : "Not specified"} />
                    <ProjectDataCard label="Wi-Fi APs" value={wifiCount !== null ? String(wifiCount) : "Not specified"} />
                    <ProjectDataCard label="Access Doors" value={doorCount !== null ? String(doorCount) : "Not specified"} />
                    <div className="sm:col-span-2 lg:col-span-5 rounded-xl border border-sky-500/15 bg-[#020617]/70 p-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">Attached Scope</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{estimateSummary}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <Card className="overflow-hidden rounded-2xl border border-sky-500/20 bg-[#050b1b]/90">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <CardTitle className="text-base font-semibold text-white">Select Your Date</CardTitle>
              <p className="text-xs text-slate-400">Most days are open. A few are held for existing field work.</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-sky-500/15 bg-[#020617] p-2 sm:p-3">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  height="auto"
                  headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
                  fixedWeekCount={false}
                  dateClick={(info) => {
                    const clicked = startOfDay(info.date);
                    if (clicked < today || isBookedDate(clicked)) return;
                    setDate(clicked);
                    setTimeSlot(null);
                  }}
                  dayCellClassNames={(arg) => {
                    const cellDate = startOfDay(arg.date);
                    const classes = ["relative", "transition-colors"];
                    if (cellDate < today) classes.push("fc-day-past-custom");
                    else if (isBookedDate(cellDate)) classes.push("fc-day-booked");
                    else classes.push("fc-day-available");
                    if (sameDay(cellDate, today)) classes.push("fc-day-today-custom");
                    if (date && sameDay(cellDate, date)) classes.push("fc-day-selected-custom");
                    return classes;
                  }}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                <Legend dot="bg-sky-400" text="Available" />
                <Legend dot="bg-blue-600" text="Selected" />
                <Legend dot="bg-slate-700" text="Unavailable" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-sky-400/30 bg-[#050b1b]/90">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <CardTitle className="text-base font-semibold text-white">Appointment Details</CardTitle>
              <p className="text-xs text-slate-400">On-site, virtual and phone consultations are all bookable.</p>
            </CardHeader>
            <CardContent className="space-y-7 p-6">
              <div>
                <SectionLabel>Appointment Type</SectionLabel>
                <div className="mt-3 grid gap-2">
                  <AppointmentButton active={appointmentType === "onsite"} title="On-site walkthrough" description="Best for cable paths, mounting and equipment placement." onClick={() => setAppointmentType("onsite")} />
                  <AppointmentButton active={appointmentType === "virtual"} title="Virtual consultation" description="Review the project remotely before an on-site visit." onClick={() => setAppointmentType("virtual")} />
                  <AppointmentButton active={appointmentType === "phone"} title="Phone consultation" description="Talk through the project first — no AI estimate required." onClick={() => setAppointmentType("phone")} />
                </div>
              </div>

              <div>
                <SectionLabel>Selected Date</SectionLabel>
                <div className="mt-3 rounded-xl border border-sky-500/15 bg-[#020617] px-4 py-4 text-sm font-semibold text-white">
                  {date ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "Select a date from the calendar"}
                </div>
              </div>

              <div>
                <SectionLabel>Available Times</SectionLabel>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      disabled={!date}
                      onClick={() => setTimeSlot(slot)}
                      className={`rounded-lg border px-3 py-3 text-xs font-semibold transition ${timeSlot === slot ? "border-sky-300 bg-gradient-to-r from-blue-700 to-sky-500 text-white" : "border-slate-700 bg-[#020617] text-slate-300 hover:border-sky-500/60 disabled:opacity-30"}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-6 max-w-6xl">
          <Card className="rounded-2xl border border-sky-500/20 bg-[#050b1b]/90">
            <CardHeader className="border-b border-sky-500/10 px-6 py-5">
              <CardTitle className="text-base font-semibold text-white">Contact & Site Information</CardTitle>
              <p className="text-xs text-slate-400">This information stays connected to the booking and project link.</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <SectionLabel>Contact Details</SectionLabel>
                  <Field label="Full Name" type="text" value={fullName} onChange={setFullName} placeholder="First and last name" />
                  <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                  <Field label="Phone" type="tel" value={phone} onChange={(value) => setPhone(value.replace(/[^\d()+\-\s]/g, "").slice(0, 22))} placeholder="(555) 123-4567" />
                </div>

                <div>
                  <SectionLabel>Installation Location</SectionLabel>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      ["home", "Home"],
                      ["office", "Office"],
                      ["retail", "Retail / Restaurant"],
                      ["industrial", "Warehouse / Industrial"],
                      ["multi", "Multi-location"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setLocationType(id as LocationType)}
                        className={`rounded-full border px-4 py-2 text-[11px] font-medium transition ${locationType === id ? "border-sky-300 bg-sky-400/10 text-sky-200" : "border-slate-700 bg-[#020617] text-slate-400"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={locationNote}
                    onChange={(event) => setLocationNote(event.target.value)}
                    placeholder="Address, suite, gate code, parking instructions or site notes"
                    rows={5}
                    className="mt-5 w-full resize-none rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-400/70"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-5 border-t border-sky-500/10 pt-7 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {date && timeSlot ? `${selectedTypeLabel} · ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${timeSlot}` : "Complete your appointment details"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{hasEstimate ? "Your complete AI project snapshot will be attached." : "You can book without completing the estimator."}</p>
                </div>
                <Button type="button" disabled={confirmDisabled} onClick={handleConfirm} className="h-14 min-w-[260px] border border-sky-300 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-8 text-xs font-bold uppercase tracking-[0.1em] text-white disabled:opacity-40">
                  {isSubmitting ? "Confirming..." : `Confirm ${appointmentType === "phone" ? "Call" : "Appointment"}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {bookingSummary && (
          <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-emerald-400/35 bg-emerald-950/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Appointment Confirmed</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">{bookingSummary}</p>
            {lastBooking && <div className="mt-5 border-t border-emerald-500/20 pt-5"><QuotePDF estimate={estimate ?? null} booking={lastBooking} /></div>}
            {magicLinkUrl && <MagicLinkCard url={magicLinkUrl} />}
          </div>
        )}

        {hasEstimate && !bookingSummary && (
          <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-800 bg-[#050b1b]/70 p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">Save Your Project</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">Create a magic link containing the complete SmartNET estimate and return later.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Email" type="email" value={magicEmail} onChange={setMagicEmail} placeholder="you@example.com" />
                  <Field label="Mobile" type="tel" value={magicPhone} onChange={(value) => setMagicPhone(value.replace(/[^\d()+\-\s]/g, "").slice(0, 22))} placeholder="Optional mobile number" />
                </div>
              </div>
              <Button type="button" onClick={handleSendMagicLink} disabled={isSendingMagicLink} className="h-12 border border-sky-500/30 bg-sky-500/10 px-6 text-xs font-semibold uppercase tracking-[0.08em] text-sky-200 hover:bg-sky-500/20">
                {isSendingMagicLink ? "Creating..." : "Save Project"}
              </Button>
            </div>
            {magicLinkMessage && <p className="mt-4 text-xs text-sky-200">{magicLinkMessage}</p>}
            {magicLinkUrl && <MagicLinkCard url={magicLinkUrl} />}
          </div>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-emerald-400/30 bg-[#050b1b]/95 px-5 py-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
            <p className="text-xs leading-5 text-slate-300">{toastMessage}</p>
            <button type="button" onClick={() => setToastMessage(null)} className="ml-auto text-slate-500 hover:text-white">×</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc { --fc-border-color: rgba(56,189,248,.11); --fc-page-bg-color: transparent; --fc-today-bg-color: transparent; font-size:.82rem; }
        .fc .fc-toolbar-title { color:#f8fafc; font-size:1rem; font-weight:700; }
        .fc .fc-button-primary { background:#071022; border:1px solid rgba(56,189,248,.2); color:#bae6fd; font-size:.7rem; }
        .fc-theme-standard td,.fc-theme-standard th { border-color:rgba(56,189,248,.1); }
        .fc .fc-daygrid-day { background:rgba(2,6,23,.55); }
        .fc .fc-daygrid-day-frame { min-height:72px; }
        .fc-day-available { cursor:pointer; }
        .fc-day-available:hover { background:rgba(14,165,233,.08)!important; box-shadow:inset 0 0 0 1px rgba(56,189,248,.28); }
        .fc-day-booked { cursor:not-allowed; background:rgba(15,23,42,.8)!important; opacity:.55; }
        .fc-day-past-custom { pointer-events:none; opacity:.25; }
        .fc-day-today-custom .fc-daygrid-day-number { color:#7dd3fc!important; font-weight:800; }
        .fc-day-selected-custom { background:rgba(37,99,235,.18)!important; box-shadow:inset 0 0 0 1px rgba(56,189,248,.75); }
        .fc .fc-daygrid-day-number { color:#94a3b8; padding:.4rem; font-size:.72rem; }
        @media (max-width:640px) { .fc .fc-toolbar.fc-header-toolbar { align-items:flex-start; flex-direction:column; } .fc .fc-daygrid-day-frame { min-height:52px; } }
      `}</style>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">{children}</p>;
}

function ProjectDataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sky-500/15 bg-[#020617]/75 px-4 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1.5 truncate text-xs font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function AppointmentButton({ active, title, description, onClick }: { active: boolean; title: string; description: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`w-full rounded-xl border p-4 text-left transition ${active ? "border-sky-400/60 bg-sky-400/10" : "border-slate-800 bg-[#020617]/70 hover:border-sky-500/30"}`}>
      <p className={`text-xs font-semibold ${active ? "text-white" : "text-slate-300"}`}>{title}</p>
      <p className="mt-1 text-[10px] leading-4 text-slate-500">{description}</p>
    </button>
  );
}

function Field({ label, type, value, onChange, placeholder }: { label: string; type: React.HTMLInputTypeAttribute; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</label>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-700 bg-[#020617] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-400/70" />
    </div>
  );
}

function Legend({ dot, text }: { dot: string; text: string }) {
  return <div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${dot}`} />{text}</div>;
}

function MagicLinkCard({ url }: { url: string }) {
  return (
    <div className="mt-5 flex flex-col gap-4 rounded-xl border border-sky-500/20 bg-[#020617]/80 p-4 sm:flex-row sm:items-center">
      <div className="shrink-0 rounded-lg bg-white p-2"><QRCode value={url} size={78} /></div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300">SmartNET Project Link</p>
        <p className="mt-2 break-all text-xs text-slate-400">{url}</p>
      </div>
    </div>
  );
}

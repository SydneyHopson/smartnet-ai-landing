"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

type CalendarDayCellArg = {
  date: Date;
  el: HTMLElement;
};

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

export function BookingCalendarSection() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = React.useState<string | null>(null);
  const [appointmentType, setAppointmentType] = React.useState<
    "virtual" | "onsite" | "phone"
  >("onsite");
  const [showTypeHelp, setShowTypeHelp] = React.useState(false);

  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  const handleConfirm = () => {
    if (!date || !timeSlot) return;

    const typeLabel =
      appointmentType === "onsite"
        ? "On-site walkthrough"
        : appointmentType === "virtual"
        ? "Virtual call"
        : "Phone call";

    alert(
      [
        "📅 Booking Summary",
        "--------------------------",
        `Appointment Type: ${typeLabel}`,
        `Date: ${date.toDateString()}`,
        `Time: ${timeSlot}`,
        "",
        "(Later this will send to Sanity/email instead of alert.)",
      ].join("\n")
    );
  };

  const selectedTypeLabel =
    appointmentType === "onsite"
      ? "On-site walkthrough"
      : appointmentType === "virtual"
      ? "Virtual call"
      : "Phone call";

  return (
    <section
      id="booking-calendar"
      className="relative border-y border-[#020617] bg-[#020617] py-16"
    >
      {/* Ambient glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(3,7,18,1),_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-4">
        {/* Heading */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Step 2 · Lock in your walkthrough
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#e6f4ff] sm:text-3xl">
            Pick a day for your consult or on-site walkthrough.
          </h2>
          <p className="max-w-xl text-sm text-[#a3c3df] sm:text-base">
            Our schedule runs on a 3-day / 4-day rotation. Days marked
            &quot;Booked&quot; are already allocated—any open day is fair game
            for your SmartNET install.
          </p>
        </div>

        {/* Calendar + summary layout */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT: Calendar card */}
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
                    const clicked = info.date;
                    if (isBookedDate(clicked)) {
                      alert(
                        "That day is fully booked in our rotation. Please choose another date."
                      );
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
                  dayCellDidMount={(arg: CalendarDayCellArg) => {
                    const cellDate = arg.date;
                    const el = arg.el;
                    const today = new Date();
                    const booked = isBookedDate(cellDate);
                    const isToday = sameDay(cellDate, today);

                    el.classList.add("transition-colors", "relative");

                    if (booked) {
                      el.classList.add("fc-day-booked");
                    } else {
                      el.classList.add("fc-day-available");
                    }

                    if (isToday) {
                      el.classList.add("fc-day-today-custom");
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Time & summary card */}
          <Card className="rounded-2xl border border-[#39c4ff]/75 bg-[radial-gradient(circle_at_top,_rgba(18,34,58,0.98),_rgba(3,7,18,1))] shadow-[0_0_86px_rgba(56,189,248,0.75)] backdrop-blur-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#eaf5ff]">
                Time &amp; summary
              </CardTitle>
              <p className="text-xs text-[#8ca3c0]">
                Select an appointment type, pick a time slot, and confirm your
                booking.
              </p>
            </CardHeader>

            <CardContent className="space-y-5 text-sm">
              {/* AI mascot (Lil Buddy) */}
              <div className="flex flex-col items-center justify-center pt-1 pb-3">
                <div className="relative h-20 w-20">
                  {/* Glow field */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_10%,rgba(56,189,248,0.9),rgba(15,23,42,1))] blur-[8px]" />
                  {/* Buddy */}
                  <div className="absolute inset-[3px] flex items-center justify-center rounded-full border border-sky-400/80 bg-[#020617]/95 shadow-[0_0_30px_rgba(56,189,248,0.95)]">
                    <div className="relative h-14 w-14">
                      <Image
                        src="/mascot/images/mascot1.png"
                        alt="SmartNET AI Mascot"
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[0.7rem] font-semibold tracking-wide text-sky-200">
                  SmartNET AI · Booking Buddy
                </p>
                <p className="max-w-[13rem] text-center text-[0.65rem] text-[#8ca3c0]">
                  Uses your AI estimate &amp; project notes to prep the
                  walkthrough before the crew shows up.
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

              {/* Time slots */}
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sky-400">
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

              {/* Summary */}
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

                <p className="pt-2 text-[0.7rem] text-[#7b8fb0]">
                  Later, this panel will also show your AI estimate snapshot
                  (property type, square footage, scope, rough range) and send
                  everything to the backend/Sanity when you confirm.
                </p>
              </div>

              {/* Confirm button */}
              <Button
                type="button"
                disabled={!date || !timeSlot}
                onClick={handleConfirm}
                className="mt-1 w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] text-xs font-semibold tracking-wide text-slate-950 shadow-[0_0_26px_rgba(63,201,255,0.95)] hover:from-[#37b6ff] hover:to-[#40c4ff] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none"
              >
                Confirm this time
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

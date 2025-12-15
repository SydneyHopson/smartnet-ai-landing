// File: src/components/owner/OwnerCalendarClient.tsx

"use client";

import type { FC } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { OwnerCalendarEvent } from "@/app/owner/dashboard/calendar/page";

// FullCalendar is client-only
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

type Props = {
  events: OwnerCalendarEvent[];
};

function statusColor(status: string, kind: OwnerCalendarEvent["kind"]): string {
  const s = status.toLowerCase();
  if (s.includes("complete")) return "#9CA3AF"; // gray for done
  if (kind === "followup") return "#FBBF24"; // amber for follow-ups
  return "#34D399"; // emerald for initial / scheduled
}

export const OwnerCalendarClient: FC<Props> = ({ events }) => {
  const fcEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.startISO,
    borderColor: statusColor(e.status, e.kind),
    backgroundColor: "rgba(15,23,42,0.92)",
    textColor: "#E5E7EB",
    extendedProps: {
      bookingId: e.bookingId,
      kind: e.kind,
      status: e.status,
    },
  }));

  const handleEventClick = (info: any) => {
    const bookingId = info.event.extendedProps?.bookingId as string | undefined;
    if (!bookingId) return;
    window.location.href = `/owner/booking/${bookingId}`;
  };

  // Upcoming events (future only, sorted)
  const upcoming = events
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
    )
    .filter((e) => new Date(e.startISO).getTime() >= Date.now())
    .slice(0, 6);

  return (
    <motion.main
      className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)] text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-3 py-1 text-xs font-medium text-emerald-200 shadow-[0_0_36px_rgba(16,185,129,0.7)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.95)]" />
              SmartNET Owner Console
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Walkthrough Calendar
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-400">
              Every booked walkthrough and follow-up on one calendar. Click any
              slot to open the full booking view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge className="flex items-center gap-1 border-emerald-500/60 bg-emerald-500/10 text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Initial walkthrough
            </Badge>
            <Badge className="flex items-center gap-1 border-amber-400/60 bg-amber-500/10 text-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Follow-up
            </Badge>
            <Badge className="flex items-center gap-1 border-slate-500/60 bg-slate-700/30 text-slate-200">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Marked complete
            </Badge>
          </div>
        </motion.header>

        {/* Calendar + upcoming list */}
        <section className="grid gap-5 lg:grid-cols-3 lg:items-start">
          {/* Calendar */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <Card className="border-slate-800/80 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,1)] backdrop-blur">
              <CardHeader className="border-b border-slate-800/70 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-sm font-semibold text-slate-100">
                      Walkthrough &amp; Follow-Up Calendar
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-400">
                      Dates are pulled directly from your SmartNET bookings.
                    </CardDescription>
                  </div>
                  <CalendarDays className="h-5 w-5 text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/90">
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek",
                    }}
                    events={fcEvents}
                    eventClick={handleEventClick}
                    eventDisplay="block"
                    displayEventTime={false}
                    themeSystem="standard"
                    dayMaxEvents={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming sidebar */}
          <motion.aside
            className="space-y-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <Card className="border-slate-800/80 bg-slate-950/80 shadow-[0_0_32px_rgba(16,185,129,0.8)] backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Upcoming Walkthroughs
                </CardTitle>
                <CardDescription className="text-[11px] text-slate-400">
                  Next few days at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {events.length === 0 && (
                  <p className="text-xs text-slate-500">
                    No walkthroughs or follow-ups booked yet. Once you start
                    using the funnel, they&apos;ll appear here.
                  </p>
                )}

                {upcoming.map((e) => {
                  const d = new Date(e.startISO);
                  const dateLabel = d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                  const timeLabel = d.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <Link
                      href={`/owner/booking/${e.bookingId}`}
                      key={e.id}
                      className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 hover:border-emerald-500/60 hover:bg-slate-900/80"
                    >
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-slate-50">
                          {e.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {dateLabel} • {timeLabel}
                        </span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </motion.aside>
        </section>
      </div>
    </motion.main>
  );
};

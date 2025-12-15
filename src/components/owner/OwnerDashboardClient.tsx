// File: src/components/owner/OwnerDashboardClient.tsx
"use client";

import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  UserCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// ✅ Logout button (cookie clear + redirect)
import { OwnerLogoutButton } from "../../app/owner/access/OwnerLogoutButton";

import type {
  OwnerDashboardData,
  OwnerBooking,
  ReminderItem,
  LeadEvent,
  BookingStatus,
} from "@/app/owner/dashboard/page";

type Props = OwnerDashboardData;

/* ---------------------------
   API types (for wiring)
--------------------------- */

type OwnerDashboardApiResponse = {
  ok: boolean;
  data?: OwnerDashboardData;
  error?: string;
};

/* ---------------------------
   Client helpers
--------------------------- */

function formatShortDateTime(iso: string | null): string {
  if (!iso) return "Not scheduled";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusLabel(status: OwnerBooking["status"]): string {
  switch (status) {
    case "new":
      return "New";
    case "scheduled":
      return "Scheduled";
    case "followup":
      return "Follow-Up";
    case "completed":
      return "Completed";
    case "unknown":
    default:
      return "Unknown";
  }
}

function statusBadgeClasses(status: OwnerBooking["status"]): string {
  switch (status) {
    case "new":
      return "bg-sky-950/60 text-sky-300 border-sky-500/40";
    case "scheduled":
      return "bg-emerald-950/60 text-emerald-300 border-emerald-500/50";
    case "followup":
      return "bg-amber-950/60 text-amber-200 border-amber-400/60";
    case "completed":
      return "bg-slate-900/80 text-slate-300 border-slate-500/40";
    case "unknown":
    default:
      return "bg-slate-900/80 text-slate-400 border-slate-700/60";
  }
}

function eventTypeLabel(eventType: LeadEvent["eventType"]): string {
  switch (eventType) {
    case "estimate_created":
      return "Estimate Created";
    case "magic_link_created":
      return "Magic Link Generated";
    case "magic_link_opened":
      return "Magic Link Opened";
    case "booking_created":
      return "Booking Created";
    case "followup_scheduled":
      return "Follow-Up Scheduled";
    case "job_scheduled":
      return "Job Scheduled";
    default:
      return eventType;
  }
}

function compareByScheduledDate(
  a: OwnerBooking,
  b: OwnerBooking,
  mode: "newest" | "oldest"
): number {
  const da = a.scheduledForISO ? new Date(a.scheduledForISO).getTime() : 0;
  const db = b.scheduledForISO ? new Date(b.scheduledForISO).getTime() : 0;
  return mode === "newest" ? db - da : da - db;
}

/* ---------------------------
   Tiny UI helper
--------------------------- */

const SeeMoreButton: FC<{
  expanded: boolean;
  onClick: () => void;
  hidden?: boolean;
  labelMore?: string;
  labelLess?: string;
}> = ({ expanded, onClick, hidden, labelMore = "See more", labelLess = "See less" }) => {
  if (hidden) return null;
  return (
    <div className="pt-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onClick}
        className="h-7 rounded-full border-slate-700/80 bg-slate-900/80 px-3 text-[11px] text-slate-200"
      >
        {expanded ? labelLess : labelMore}
        <ChevronDown className={`ml-1 h-3 w-3 text-slate-500 ${expanded ? "rotate-180" : ""}`} />
      </Button>
    </div>
  );
};

/* ---------------------------
   Main client component
--------------------------- */

export const OwnerDashboardClient: FC<Props> = (props) => {
  // ✅ Optional live refresh from API (won’t break anything if it fails)
  const [apiData, setApiData] = useState<OwnerDashboardData | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setApiLoading(true);
        setApiError(null);

        const res = await fetch("/api/owner/dashboard", { cache: "no-store" });
        const json = (await res.json()) as OwnerDashboardApiResponse;

        if (!mounted) return;

        if (!json.ok || !json.data) {
          setApiError(json.error || "Failed to load dashboard data");
          setApiData(null);
          return;
        }

        setApiData(json.data);
      } catch {
        if (!mounted) return;
        setApiError("Failed to load dashboard data");
        setApiData(null);
      } finally {
        if (!mounted) return;
        setApiLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Prefer API data if present; otherwise use server props
  const raw = (apiData ?? props) as Partial<OwnerDashboardData>;

  // ✅ Normalize so runtime can’t explode
  const dataSource: OwnerDashboardData = {
    bookings: Array.isArray(raw.bookings) ? raw.bookings : [],
    reminders: Array.isArray(raw.reminders) ? raw.reminders : [],
    leadEvents: Array.isArray(raw.leadEvents) ? raw.leadEvents : [],
    kpis: raw.kpis ?? {
      activeLeads: 0,
      upcomingWalkthroughs: 0,
      openFollowups: 0,
      completedJobs: 0,
    },
  };

  const hasReminders = dataSource.reminders.length > 0;
  const hasLeadEvents = dataSource.leadEvents.length > 0;

  // 🔍 Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sortMode, setSortMode] = useState<"newest" | "oldest">("newest");

  // “See more” controls (prevents endless growth + overlap)
  const [bookingsExpanded, setBookingsExpanded] = useState(false);
  const [leadExpanded, setLeadExpanded] = useState(false);
  const [todayExpanded, setTodayExpanded] = useState(false);
  const [weekExpanded, setWeekExpanded] = useState(false);
  const [overdueExpanded, setOverdueExpanded] = useState(false);

  // all → new → scheduled → followup → completed → all
  const cycleStatusFilter = () => {
    const order: (BookingStatus | "all")[] = ["all", "new", "scheduled", "followup", "completed"];
    const idx = order.indexOf(statusFilter);
    const next = order[(idx + 1) % order.length];
    setStatusFilter(next);
  };

  const statusFilterLabel = () => {
    switch (statusFilter) {
      case "all":
        return "All statuses";
      case "new":
        return "New only";
      case "scheduled":
        return "Scheduled only";
      case "followup":
        return "Follow-Ups only";
      case "completed":
        return "Completed only";
      case "unknown":
        return "Unknown only";
    }
  };

  const sortLabel = sortMode === "newest" ? "Date (newest)" : "Date (oldest)";

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return dataSource.bookings
      .filter((b) => {
        if (statusFilter !== "all" && b.status !== statusFilter) return false;
        if (!q) return true;

        const name = b.customerName?.toLowerCase() ?? "";
        const email = b.customerEmail?.toLowerCase() ?? "";
        return name.includes(q) || email.includes(q);
      })
      .slice()
      .sort((a, b) => compareByScheduledDate(a, b, sortMode));
  }, [dataSource.bookings, searchQuery, statusFilter, sortMode]);

  // ✅ “See more” caps (these are the levers)
  const BOOKINGS_CAP = bookingsExpanded ? 250 : 35;
  const LEAD_CAP = leadExpanded ? 200 : 25;
  const REM_CAP = (expanded: boolean) => (expanded ? 30 : 6);

  const remindersToday = dataSource.reminders.filter((r) => r.bucket === "today");
  const remindersWeek = dataSource.reminders.filter((r) => r.bucket === "week");
  const remindersOverdue = dataSource.reminders.filter((r) => r.bucket === "overdue");

  const sortedLeadEvents = useMemo(() => {
    return dataSource.leadEvents
      .slice()
      .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
  }, [dataSource.leadEvents]);

  return (
    <motion.main
      className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)] text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-3 py-1 text-xs font-medium text-emerald-200 shadow-[0_0_36px_rgba(16,185,129,0.7)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.95)]" />
                SmartNET Owner Console
                <span className="ml-2 text-[10px] text-slate-400">
                  {apiLoading ? "syncing…" : apiError ? "offline" : apiData ? "live" : "cached"}
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                SmartNET Owner Dashboard
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                A single cockpit for every walkthrough, follow-up, and lead your funnel generates.
              </p>
            </div>

            <div className="flex items-center justify-end">
              <OwnerLogoutButton
                className="h-8 rounded-full border-rose-500/40 bg-rose-500/10 px-4 text-[11px] font-semibold text-rose-200 hover:bg-rose-500/15"
                variant="outline"
                next="/owner/access"
              />
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
            <KpiCard label="Active Leads" value={dataSource.kpis.activeLeads} icon={<UserCircle2 className="h-4 w-4" />} />
            <KpiCard label="Upcoming Walkthroughs" value={dataSource.kpis.upcomingWalkthroughs} icon={<CalendarDays className="h-4 w-4" />} />
            <KpiCard label="Open Follow-Ups" value={dataSource.kpis.openFollowups} icon={<Clock className="h-4 w-4" />} />
            <KpiCard label="Completed Jobs" value={dataSource.kpis.completedJobs} icon={<ArrowRight className="h-4 w-4" />} />
          </div>
        </motion.header>

        {/* Main grid */}
        <section className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {/* Left: All booking sessions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {/* overflow-hidden ensures nothing bleeds outside card */}
            <Card className="overflow-hidden border-slate-800/80 bg-slate-950/80 shadow-[0_0_50px_rgba(15,23,42,0.95)] backdrop-blur">
              <CardHeader className="border-b border-slate-800/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-100">All Booking Sessions</CardTitle>
                  <CardDescription className="text-[11px] text-slate-400">
                    New, scheduled, follow-ups, and completed jobs — all linked to the same funnel.
                  </CardDescription>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:mt-0">
                  <div className="flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5">
                    <Search className="h-3 w-3 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="Search customer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-5 w-32 border-none bg-transparent p-0 text-[11px] text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 sm:w-40"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cycleStatusFilter}
                    className="h-7 rounded-full border-slate-700/80 bg-slate-900/80 px-3 text-[11px] text-slate-200"
                  >
                    <Filter className="mr-1 h-3 w-3 text-slate-500" />
                    Status <span className="ml-1 text-emerald-300">{statusFilterLabel()}</span>
                    <ChevronDown className="ml-1 h-3 w-3 text-slate-500" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortMode((prev) => (prev === "newest" ? "oldest" : "newest"))}
                    className="h-7 rounded-full border-slate-700/80 bg-slate-900/80 px-3 text-[11px] text-slate-200"
                  >
                    Sort by <span className="ml-1 text-emerald-300">{sortLabel}</span>
                    <ChevronDown className="ml-1 h-3 w-3 text-slate-500" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* FIXED HEIGHT (not max-height) keeps it inside its lane */}
                <ScrollArea className="h-[560px]">
                  <div className="hidden border-b border-slate-800/80 bg-slate-950/90 px-6 py-2 text-[11px] text-slate-400 sm:grid sm:grid-cols-6">
                    <span>Customer</span>
                    <span>Type</span>
                    <span>Date &amp; Time</span>
                    <span>Status</span>
                    <span className="text-right">Estimate</span>
                    <span className="text-right">View</span>
                  </div>

                  <div className="divide-y divide-slate-800/80">
                    {filteredBookings.slice(0, BOOKINGS_CAP).map((booking, idx) => (
                      <motion.article
                        key={booking.id}
                        className="px-4 py-3 text-xs text-slate-100 sm:px-6"
                        whileHover={{ backgroundColor: "rgba(15,23,42,0.9)", transition: { duration: 0.2 } }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.02 * idx }}
                      >
                        {/* Desktop row */}
                        <div className="hidden items-center gap-2 sm:grid sm:grid-cols-6">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-100">{booking.customerName || "Unknown"}</span>
                            {booking.customerEmail && <span className="text-[11px] text-slate-400">{booking.customerEmail}</span>}
                          </div>

                          <div className="capitalize text-slate-300">
                            {booking.bookingType === "initial" ? "Initial Walkthrough" : "Follow-Up"}
                          </div>

                          <div className="text-slate-300">{formatShortDateTime(booking.scheduledForISO)}</div>

                          <div>
                            <Badge
                              variant="outline"
                              className={`border px-2 py-0.5 text-[11px] font-medium ${statusBadgeClasses(booking.status)}`}
                            >
                              {statusLabel(booking.status)}
                            </Badge>
                          </div>

                          <div className="text-right text-slate-300">
                            {typeof booking.roughLow === "number" && typeof booking.roughHigh === "number"
                              ? `$${booking.roughLow.toLocaleString()} – $${booking.roughHigh.toLocaleString()}`
                              : booking.roughLow
                              ? `~ $${booking.roughLow.toLocaleString()}`
                              : "–"}
                          </div>

                          <div className="text-right">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="h-7 rounded-full border-emerald-500/50 bg-emerald-500/10 px-2.5 text-[11px] font-medium text-emerald-200 hover:bg-emerald-500/20"
                            >
                              <Link href={`/owner/booking/${booking.id}`}>
                                Open <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Mobile stacked */}
                        <div className="grid gap-1 sm:hidden">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-[13px] font-medium text-slate-100">{booking.customerName || "Unknown"}</p>
                              {booking.customerEmail && <p className="text-[11px] text-slate-400">{booking.customerEmail}</p>}
                            </div>
                            <Badge
                              variant="outline"
                              className={`border px-2 py-0.5 text-[10px] font-medium ${statusBadgeClasses(booking.status)}`}
                            >
                              {statusLabel(booking.status)}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                            <span className="capitalize">
                              {booking.bookingType === "initial" ? "Initial Walkthrough" : "Follow-Up"}
                            </span>
                            <span>{formatShortDateTime(booking.scheduledForISO)}</span>
                          </div>

                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              Estimate:{" "}
                              {typeof booking.roughLow === "number" && typeof booking.roughHigh === "number"
                                ? `$${booking.roughLow.toLocaleString()} – $${booking.roughHigh.toLocaleString()}`
                                : booking.roughLow
                                ? `~ $${booking.roughLow.toLocaleString()}`
                                : "–"}
                            </span>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="h-7 rounded-full border-emerald-500/50 bg-emerald-500/10 px-2 text-[10px] font-medium text-emerald-200"
                            >
                              <Link href={`/owner/booking/${booking.id}`}>
                                Open <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.article>
                    ))}

                    {filteredBookings.length === 0 && (
                      <div className="px-6 py-10 text-center text-xs text-slate-400">
                        No bookings match your filters yet. Try clearing search or status filters.
                      </div>
                    )}
                  </div>

                  {/* footer inside scroll area so it doesn’t push layout */}
                  {filteredBookings.length > 35 && (
                    <div className="border-t border-slate-800/70 bg-slate-950/80 px-6 py-3">
                      <SeeMoreButton
                        expanded={bookingsExpanded}
                        onClick={() => setBookingsExpanded((v) => !v)}
                        labelMore={`See more (${filteredBookings.length - 35} more)`}
                        labelLess="See less"
                      />
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right rail */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            {/* Reminders */}
            <Card className="overflow-hidden border-slate-800/80 bg-slate-950/80 shadow-[0_0_45px_rgba(16,185,129,0.5)] backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/70 pb-3">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-100">Reminders &amp; Tasks</CardTitle>
                  <CardDescription className="text-[11px] text-slate-400">
                    Walkthroughs, follow-ups, and anything you shouldn&apos;t forget.
                  </CardDescription>
                </div>
                <motion.div
                  className="rounded-full bg-amber-500/15 p-1.5"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(251,191,36,0.0)",
                      "0 0 20px rgba(251,191,36,0.6)",
                      "0 0 0px rgba(251,191,36,0.0)",
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                </motion.div>
              </CardHeader>

              <CardContent className="pt-3">
                {/* FIXED HEIGHT so this card can’t grow into the next */}
                <ScrollArea className="h-[320px] pr-2">
                  <div className="space-y-3">
                    <div>
                      <ReminderBucket label="Due Today" items={remindersToday.slice(0, REM_CAP(todayExpanded))} />
                      <SeeMoreButton
                        expanded={todayExpanded}
                        onClick={() => setTodayExpanded((v) => !v)}
                        hidden={remindersToday.length <= 6}
                        labelMore={`See more (${remindersToday.length - 6} more)`}
                      />
                    </div>

                    <div>
                      <ReminderBucket label="This Week" items={remindersWeek.slice(0, REM_CAP(weekExpanded))} />
                      <SeeMoreButton
                        expanded={weekExpanded}
                        onClick={() => setWeekExpanded((v) => !v)}
                        hidden={remindersWeek.length <= 6}
                        labelMore={`See more (${remindersWeek.length - 6} more)`}
                      />
                    </div>

                    <div>
                      <ReminderBucket
                        label="Overdue"
                        items={remindersOverdue.slice(0, REM_CAP(overdueExpanded))}
                        highlight
                      />
                      <SeeMoreButton
                        expanded={overdueExpanded}
                        onClick={() => setOverdueExpanded((v) => !v)}
                        hidden={remindersOverdue.length <= 6}
                        labelMore={`See more (${remindersOverdue.length - 6} more)`}
                      />
                    </div>

                    {!hasReminders && (
                      <p className="text-xs text-slate-500">
                        No reminders yet — once walkthroughs and follow-ups are scheduled, they&apos;ll land here automatically.
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Lead activity timeline */}
            <Card className="overflow-hidden border-slate-800/80 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,0.95)] backdrop-blur">
              <CardHeader className="border-b border-slate-800/70 pb-3">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-100">Recent Lead Activity</CardTitle>
                  <CardDescription className="text-[11px] text-slate-400">
                    The latest steps across quotes, magic links, and bookings.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-3">
                {!hasLeadEvents ? (
                  <p className="text-xs text-slate-400">
                    Activity will appear here as leads move through the SmartNET journey.
                  </p>
                ) : (
                  <ScrollArea className="h-[340px] pr-2">
                    <ol className="ml-3 space-y-3 border-l border-slate-800/80">
                      {sortedLeadEvents.slice(0, LEAD_CAP).map((event, idx) => (
                        <motion.li
                          key={event.id}
                          className="relative pl-4 text-xs text-slate-100"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.02 * idx }}
                        >
                          <motion.div
                            className="absolute -left-[10px] top-2 h-2.5 w-2.5 rounded-full bg-emerald-400"
                            animate={{
                              boxShadow: [
                                "0 0 0px rgba(16,185,129,0.0)",
                                "0 0 16px rgba(16,185,129,0.9)",
                                "0 0 0px rgba(16,185,129,0.0)",
                              ],
                            }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                          />

                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-slate-100">{event.customerName || "Unknown"}</span>
                            <span className="text-[10px] text-slate-500">{formatShortDateTime(event.occurredAt)}</span>
                          </div>

                          <p className="mt-0.5 text-[11px] text-emerald-200">{eventTypeLabel(event.eventType)}</p>

                          {event.bookingId && (
                            <div className="mt-1">
                              <Button
                                asChild
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-[10px] font-medium text-emerald-300 hover:text-emerald-200"
                              >
                                <Link href={`/owner/booking/${event.bookingId}`}>
                                  View booking <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </ol>

                    {sortedLeadEvents.length > 25 && (
                      <div className="mt-3 border-t border-slate-800/70 pt-3">
                        <SeeMoreButton
                          expanded={leadExpanded}
                          onClick={() => setLeadExpanded((v) => !v)}
                          labelMore={`See more (${sortedLeadEvents.length - 25} more)`}
                          labelLess="See less"
                        />
                      </div>
                    )}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
};

/* ---------------------------
   Subcomponents
--------------------------- */

const KpiCard: FC<{
  label: string;
  value: number;
  icon: ReactElement;
}> = ({ label, value, icon }) => {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <Card className="border border-slate-800/80 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-emerald-950/40 px-3 py-2.5 text-xs shadow-[0_0_40px_rgba(15,23,42,1)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">{label}</span>
          <div className="rounded-full bg-emerald-500/10 p-1.5 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.6)]">
            {icon}
          </div>
        </div>
        <span className="mt-2 block text-lg font-semibold text-slate-50">{value.toLocaleString()}</span>
      </Card>
    </motion.div>
  );
};

const ReminderBucket: FC<{
  label: string;
  items: ReminderItem[];
  highlight?: boolean;
}> = ({ label, items, highlight }) => {
  if (items.length === 0) return null;

  return (
    <motion.div
      className={`rounded-xl border px-3 py-2 ${
        highlight ? "border-amber-500/60 bg-amber-950/30" : "border-slate-800/80 bg-slate-950/60"
      }`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className={`font-semibold ${highlight ? "text-amber-200" : "text-slate-300"}`}>{label}</span>
        <span className="text-[10px] text-slate-500">
          {items.length} item{items.length !== 1 && "s"}
        </span>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/owner/booking/${item.bookingId}`}
              className="flex items-center justify-between gap-2 text-[11px] text-slate-100 hover:text-emerald-200"
            >
              <div className="flex flex-col">
                <span className="max-w-[210px] truncate">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.when}</span>
              </div>
              <span className="shrink-0 text-[10px] text-emerald-300">
                {item.kind === "walkthrough" ? "Walkthrough" : "Follow-Up"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

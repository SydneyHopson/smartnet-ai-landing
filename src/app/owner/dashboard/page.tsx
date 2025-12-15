// File: src/app/owner/dashboard/page.tsx

import type { ReactElement } from "react";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { OwnerDashboardClient } from "@/components/owner/OwnerDashboardClient";

export type BookingStatus =
  | "new"
  | "scheduled"
  | "followup"
  | "completed"
  | "unknown";

export type OwnerBooking = {
  id: string;
  customerName: string;
  customerEmail?: string;
  bookingType: "initial" | "followup";
  scheduledForISO: string | null;
  status: BookingStatus;
  roughLow?: number;
  roughHigh?: number;
};

export type ReminderItem = {
  id: string;
  label: string;
  when: string; // human-readable
  bucket: "today" | "week" | "overdue";
  bookingId: string;
  kind: "walkthrough" | "followup";
};

export type LeadEvent = {
  id: string;
  customerName: string;
  eventType:
    | "estimate_created"
    | "magic_link_created"
    | "magic_link_opened"
    | "booking_created"
    | "followup_scheduled"
    | "job_scheduled";
  occurredAt: string; // ISO
  bookingId?: string;
  leadId?: string;
};

export type OwnerDashboardData = {
  bookings: OwnerBooking[];
  reminders: ReminderItem[];
  leadEvents: LeadEvent[];
  kpis: {
    activeLeads: number;
    upcomingWalkthroughs: number;
    openFollowups: number;
    completedJobs: number;
  };
};

type WalkthroughBookingDoc = {
  _id: string;
  status?: string;
  appointmentType?: string;
  dateISO?: string;
  timeSlot?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  rawEstimateJson?: string | null;
  createdAt?: string | null;
  followupWalkthroughDateISO?: string | null;
  followupWalkthroughTimeSlot?: string | null;
};

// ----- Data loader from Sanity -----

async function getOwnerDashboardData(): Promise<OwnerDashboardData> {
  const query = `*[_type == "walkthroughBooking"] | order(dateISO desc)[0...100]{
    _id,
    status,
    appointmentType,
    dateISO,
    timeSlot,
    contactName,
    contactEmail,
    contactPhone,
    estimateRoughRange,
    estimateTotal,
    rawEstimateJson,
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot
  }`;

  const docs = await sanityWriteClient.fetch<WalkthroughBookingDoc[]>(query);

  const bookings: OwnerBooking[] = docs.map((doc) => {
    const {
      _id,
      contactName,
      contactEmail,
      appointmentType,
      dateISO,
      timeSlot,
      status,
      estimateRoughRange,
      estimateTotal,
    } = doc;

    const typeRaw = (appointmentType || "").toLowerCase();
    const bookingType: OwnerBooking["bookingType"] = typeRaw.includes("follow")
      ? "followup"
      : "initial";

    const statusNormalized = normalizeStatus(status, bookingType);

    const scheduledForISO =
      dateISO && timeSlot ? buildDateTimeISO(dateISO, timeSlot) : dateISO || null;

    const [roughLow, roughHigh] = parseEstimateRange(estimateRoughRange);

    return {
      id: _id,
      customerName: contactName || "Unknown customer",
      customerEmail: contactEmail || undefined,
      bookingType,
      scheduledForISO,
      status: statusNormalized,
      roughLow: roughLow ?? estimateTotal ?? undefined,
      roughHigh: roughHigh ?? undefined,
    };
  });

  const reminders = buildReminderItems(docs);
  const leadEvents = buildLeadEvents(docs);
  const kpis = buildKpis(bookings, reminders);

  return { bookings, reminders, leadEvents, kpis };
}

// ----- Helpers (server side only) -----

function normalizeStatus(
  status: string | undefined,
  bookingType: OwnerBooking["bookingType"]
): BookingStatus {
  if (!status) {
    return bookingType === "followup" ? "followup" : "scheduled";
  }
  const s = status.toLowerCase();
  if (s.includes("new")) return "new";
  if (s.includes("sched")) return "scheduled";
  if (s.includes("follow")) return "followup";
  if (s.includes("complete") || s.includes("done")) return "completed";
  return "unknown";
}

function buildDateTimeISO(dateISO: string, timeSlot: string): string {
  try {
    const baseDate = new Date(dateISO);
    const [time, ampmRaw] = timeSlot.split(" ");
    if (!time || !ampmRaw) return dateISO;

    const [hStr, mStr] = time.split(":");
    let hours = parseInt(hStr || "0", 10);
    const minutes = parseInt(mStr || "0", 10);
    const ampm = ampmRaw.toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    baseDate.setHours(hours, minutes, 0, 0);
    return baseDate.toISOString();
  } catch {
    return dateISO;
  }
}

function parseEstimateRange(
  range: string | null | undefined
): [number | null, number | null] {
  if (!range) return [null, null];
  const parts = range.split("–").map((p) => p.trim());
  if (parts.length !== 2) return [null, null];

  const parseMoney = (s: string): number | null => {
    const cleaned = s.replace(/[^0-9.]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };

  const low = parseMoney(parts[0]);
  const high = parseMoney(parts[1]);
  return [low, high];
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function classifyBucket(
  date: Date,
  todayStart: Date,
  weekAhead: Date
): "today" | "week" | "overdue" | null {
  const day = startOfDay(date).getTime();
  const today = todayStart.getTime();
  const weekEnd = weekAhead.getTime();

  if (day === today) return "today";
  if (day > today && day <= weekEnd) return "week";
  if (day < today) return "overdue";
  return null;
}

function friendlyWhen(date: Date, timeSlot?: string | null): string {
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  if (timeSlot) return `${dateStr} • ${timeSlot}`;
  return dateStr;
}

function buildReminderItems(docs: WalkthroughBookingDoc[]): ReminderItem[] {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekAhead = new Date(todayStart.getTime() + 7 * 24 * 60 * 60 * 1000);

  const items: ReminderItem[] = [];

  for (const doc of docs) {
    const baseName = doc.contactName || "Unknown customer";

    if (doc.dateISO) {
      const d = new Date(doc.dateISO);
      const bucket = classifyBucket(d, todayStart, weekAhead);
      if (bucket) {
        items.push({
          id: doc._id + "-walkthrough",
          label: `Walkthrough – ${baseName}`,
          when: friendlyWhen(d, doc.timeSlot),
          bucket,
          bookingId: doc._id,
          kind: "walkthrough",
        });
      }
    }

    if (doc.followupWalkthroughDateISO) {
      const d = new Date(doc.followupWalkthroughDateISO);
      const bucket = classifyBucket(d, todayStart, weekAhead);
      if (bucket) {
        items.push({
          id: doc._id + "-followup",
          label: `Follow-up – ${baseName}`,
          when: friendlyWhen(d, doc.followupWalkthroughTimeSlot),
          bucket,
          bookingId: doc._id,
          kind: "followup",
        });
      }
    }
  }

  return items;
}

function buildLeadEvents(docs: WalkthroughBookingDoc[]): LeadEvent[] {
  const events: LeadEvent[] = [];

  for (const doc of docs) {
    const name = doc.contactName || "Unknown customer";

    if (doc.createdAt) {
      events.push({
        id: doc._id + "-created",
        customerName: name,
        eventType: "booking_created",
        occurredAt: doc.createdAt,
        bookingId: doc._id,
      });
    } else if (doc.dateISO) {
      events.push({
        id: doc._id + "-created",
        customerName: name,
        eventType: "booking_created",
        occurredAt: doc.dateISO,
        bookingId: doc._id,
      });
    }

    if (doc.followupWalkthroughDateISO) {
      events.push({
        id: doc._id + "-followup",
        customerName: name,
        eventType: "followup_scheduled",
        occurredAt: doc.followupWalkthroughDateISO,
        bookingId: doc._id,
      });
    }
  }

  return events;
}

function buildKpis(
  bookings: OwnerBooking[],
  reminders: ReminderItem[]
): OwnerDashboardData["kpis"] {
  const completedJobs = bookings.filter((b) => b.status === "completed").length;

  const upcomingWalkthroughs = bookings.filter(
    (b) =>
      (b.status === "scheduled" || b.status === "new") &&
      b.scheduledForISO &&
      new Date(b.scheduledForISO) >= new Date()
  ).length;

  const openFollowups = reminders.filter((r) => r.kind === "followup").length;

  const activeLeadEmails = new Set(
    bookings
      .filter((b) => b.status !== "completed")
      .map((b) => b.customerEmail)
      .filter(Boolean) as string[]
  );

  return {
    activeLeads: activeLeadEmails.size || bookings.length,
    upcomingWalkthroughs,
    openFollowups,
    completedJobs,
  };
}

// ----- Page (server) -----

export default async function OwnerDashboardPage(): Promise<ReactElement> {
  const data = await getOwnerDashboardData();
  return <OwnerDashboardClient {...data} />;
}

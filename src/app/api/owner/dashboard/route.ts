import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { getPersonKey, resolveDisplayName } from "@/lib/identity";

// --- Types returned to the UI ---
type BookingStatus = "new" | "scheduled" | "followup" | "completed" | "unknown";

type OwnerBooking = {
  id: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  bookingType: "initial" | "followup";
  scheduledForISO: string | null;
  status: BookingStatus;
  roughLow?: number | null;
  roughHigh?: number | null;
};

type ReminderItem = {
  id: string;
  bookingId: string;
  label: string;
  when: string;
  bucket: "today" | "week" | "overdue";
  kind: "walkthrough" | "followup";
};

type LeadEvent = {
  id: string;
  occurredAt: string; // ISO
  eventType:
    | "estimate_created"
    | "magic_link_created"
    | "magic_link_opened"
    | "booking_created"
    | "followup_scheduled"
    | "job_scheduled";
  customerName: string;
  customerEmail?: string | null;
  bookingId?: string | null;
};

type OwnerDashboardData = {
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

// --- Helpers ---
function safeIso(d?: string | null): string | null {
  if (!d) return null;
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
}

function normalizeStatus(status?: string | null): BookingStatus {
  const s = (status ?? "").toLowerCase();
  if (!s) return "scheduled";
  if (s.includes("new")) return "new";
  if (s.includes("sched")) return "scheduled";
  if (s.includes("follow")) return "followup";
  if (s.includes("complete") || s.includes("done")) return "completed";
  return "unknown";
}

function parseEstimateRange(range?: string | null): [number | null, number | null] {
  if (!range) return [null, null];
  const parts = range.split("–").map((p) => p.trim());
  if (parts.length !== 2) return [null, null];

  const parseMoney = (s: string): number | null => {
    const cleaned = s.replace(/[^0-9.]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };

  return [parseMoney(parts[0]), parseMoney(parts[1])];
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
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return timeSlot ? `${dateStr} • ${timeSlot}` : dateStr;
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    if (!item?.id) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

// --- GET /api/owner/dashboard ---
export async function GET() {
  try {
    /**
     * ✅ Updated for your NEW booking schema fields:
     * - contactName/contactEmail/contactPhone
     * - dateISO/timeSlot/appointmentType
     * - estimateRoughRange/estimateTotal
     * - status/createdAt
     */
    const bookingsQuery = `*[_type == "walkthroughBooking"] | order(createdAt desc)[0...150]{
      _id,
      createdAt,
      status,
      appointmentType,
      dateISO,
      timeSlot,
      contactName,
      contactEmail,
      contactPhone,
      estimateRoughRange,
      estimateTotal,
      followupWalkthroughDateISO,
      followupWalkthroughTimeSlot
    }`;

    const magicQuery = `*[_type == "magicLinkSession"] | order(createdAt desc)[0...200]{
      _id,
      createdAt,
      lastAccessedAt,
      email,
      phone,
      contactName,
      estimateSummary,
      estimateTotal,
      token,
      status
    }`;

    const [bookingDocs, magicDocs] = await Promise.all([
      sanityWriteClient.fetch<any[]>(bookingsQuery),
      sanityWriteClient.fetch<any[]>(magicQuery),
    ]);

    // ---- Map bookings (and fix "Unknown" properly) ----
    const bookings: OwnerBooking[] = (bookingDocs ?? []).map((b) => {
      const email = b.contactEmail ?? null;
      const phone = b.contactPhone ?? null;

      const customerName = resolveDisplayName({
        name: b.contactName ?? null,
        email,
        phone,
      });

      const typeRaw = String(b.appointmentType ?? "").toLowerCase();
      const bookingType: OwnerBooking["bookingType"] = typeRaw.includes("follow")
        ? "followup"
        : "initial";

      const scheduledForISO = safeIso(b.dateISO);

      const [roughLow, roughHigh] = parseEstimateRange(b.estimateRoughRange ?? null);

      return {
        id: String(b._id),
        customerName,
        customerEmail: email,
        customerPhone: phone,
        bookingType,
        scheduledForISO,
        status: normalizeStatus(b.status ?? null),
        roughLow: roughLow ?? (typeof b.estimateTotal === "number" ? b.estimateTotal : null),
        roughHigh,
      };
    });

    const dedupedBookings = dedupeById(bookings);

    // ---- Build a unified name map (email/phone key) from both sources ----
    const nameByPersonKey = new Map<string, string>();

    for (const b of bookingDocs ?? []) {
      const key = getPersonKey({ email: b.contactEmail ?? null, phone: b.contactPhone ?? null });
      if (key !== "unknown") {
        nameByPersonKey.set(
          key,
          resolveDisplayName({
            name: b.contactName ?? null,
            email: b.contactEmail ?? null,
            phone: b.contactPhone ?? null,
          })
        );
      }
    }

    for (const s of magicDocs ?? []) {
      const key = getPersonKey({ email: s.email ?? null, phone: s.phone ?? null });
      if (key !== "unknown" && !nameByPersonKey.has(key)) {
        nameByPersonKey.set(
          key,
          resolveDisplayName({
            name: s.contactName ?? null,
            email: s.email ?? null,
            phone: s.phone ?? null,
          })
        );
      }
    }

    const displayNameFor = (input: { name?: string | null; email?: string | null; phone?: string | null }) => {
      const key = getPersonKey({ email: input.email ?? null, phone: input.phone ?? null });
      if (key !== "unknown") return nameByPersonKey.get(key) ?? resolveDisplayName(input);
      return resolveDisplayName(input);
    };

    // ---- Timeline events (magic link + booking) ----
    const magicEvents: LeadEvent[] = [];
    for (const s of magicDocs ?? []) {
      const email = s.email ?? null;
      const phone = s.phone ?? null;

      const who = displayNameFor({
        name: s.contactName ?? null,
        email,
        phone,
      });

      const createdAt = safeIso(s.createdAt);
      if (createdAt) {
        magicEvents.push({
          id: `ml_created_${s._id}`,
          occurredAt: createdAt,
          eventType: "magic_link_created",
          customerName: who,
          customerEmail: email,
          bookingId: null,
        });
      }

      const openedAt = safeIso(s.lastAccessedAt);
      if (openedAt) {
        magicEvents.push({
          id: `ml_opened_${s._id}`,
          occurredAt: openedAt,
          eventType: "magic_link_opened",
          customerName: who,
          customerEmail: email,
          bookingId: null,
        });
      }
    }

    const bookingEvents: LeadEvent[] = (bookingDocs ?? []).map((b) => {
      const email = b.contactEmail ?? null;
      const phone = b.contactPhone ?? null;

      const who = displayNameFor({
        name: b.contactName ?? null,
        email,
        phone,
      });

      return {
        id: `bk_${b._id}`,
        occurredAt: safeIso(b.createdAt) ?? safeIso(b.dateISO) ?? new Date().toISOString(),
        eventType: "booking_created",
        customerName: who,
        customerEmail: email,
        bookingId: String(b._id),
      };
    });

    const leadEvents = [...magicEvents, ...bookingEvents].sort(
      (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    );

    // ---- Reminders (walkthrough + followup) ----
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekAhead = new Date(todayStart.getTime() + 7 * 24 * 60 * 60 * 1000);

    const reminders: ReminderItem[] = [];

    for (const b of bookingDocs ?? []) {
      const email = b.contactEmail ?? null;
      const phone = b.contactPhone ?? null;

      const who = displayNameFor({
        name: b.contactName ?? null,
        email,
        phone,
      });

      // walkthrough reminder
      if (b.dateISO) {
        const d = new Date(b.dateISO);
        const bucket = classifyBucket(d, todayStart, weekAhead);
        if (bucket) {
          reminders.push({
            id: `${b._id}-walkthrough`,
            bookingId: String(b._id),
            label: `Walkthrough – ${who}`,
            when: friendlyWhen(d, b.timeSlot ?? null),
            bucket,
            kind: "walkthrough",
          });
        }
      }

      // followup reminder
      if (b.followupWalkthroughDateISO) {
        const d = new Date(b.followupWalkthroughDateISO);
        const bucket = classifyBucket(d, todayStart, weekAhead);
        if (bucket) {
          reminders.push({
            id: `${b._id}-followup`,
            bookingId: String(b._id),
            label: `Follow-up – ${who}`,
            when: friendlyWhen(d, b.followupWalkthroughTimeSlot ?? null),
            bucket,
            kind: "followup",
          });
        }
      }
    }

    // ---- KPIs ----
    const activeLeads = new Set(
      [
        ...(bookingDocs ?? []).map((b) =>
          getPersonKey({ email: b.contactEmail ?? null, phone: b.contactPhone ?? null })
        ),
        ...(magicDocs ?? []).map((s) =>
          getPersonKey({ email: s.email ?? null, phone: s.phone ?? null })
        ),
      ].filter((k) => k && k !== "unknown")
    ).size;

    const upcomingWalkthroughs = (bookingDocs ?? []).filter((b) => {
      const iso = safeIso(b.dateISO);
      return iso && new Date(iso) >= new Date() && normalizeStatus(b.status ?? null) !== "completed";
    }).length;

    const openFollowups = reminders.filter((r) => r.kind === "followup").length;

    const completedJobs = (bookingDocs ?? []).filter(
      (b) => normalizeStatus(b.status ?? null) === "completed"
    ).length;

    const payload: OwnerDashboardData = {
      bookings: dedupedBookings,
      reminders,
      leadEvents,
      kpis: { activeLeads, upcomingWalkthroughs, openFollowups, completedJobs },
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("[owner dashboard api] error", err);
    return NextResponse.json(
      { error: "Failed to load owner dashboard data" },
      { status: 500 }
    );
  }
}

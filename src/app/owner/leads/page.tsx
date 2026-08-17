import type { ReactElement } from "react";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { OwnerLeadsClient, type OwnerLead } from "@/components/owner/OwnerLeadsClient";

type WalkthroughBookingDoc = {
  _id: string;
  status?: string | null;
  appointmentType?: string | null;
  dateISO?: string | null;
  timeSlot?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  createdAt?: string | null;
  followupWalkthroughDateISO?: string | null;
  followupWalkthroughTimeSlot?: string | null;
};

function normalizeStatus(status?: string | null, appointmentType?: string | null): OwnerLead["status"] {
  const value = (status || "").toLowerCase();
  const type = (appointmentType || "").toLowerCase();

  if (value.includes("complete") || value.includes("done")) return "completed";
  if (value.includes("follow") || type.includes("follow")) return "followup";
  if (value.includes("new")) return "new";
  if (value.includes("sched")) return "scheduled";
  return "scheduled";
}

function parseEstimateRange(range?: string | null): [number | null, number | null] {
  if (!range) return [null, null];
  const parts = range.split(/[–-]/).map((part) => part.trim());
  if (parts.length < 2) return [null, null];

  const parseMoney = (value: string) => {
    const amount = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount) ? amount : null;
  };

  return [parseMoney(parts[0]), parseMoney(parts[1])];
}

function buildScheduledISO(dateISO?: string | null, timeSlot?: string | null): string | null {
  if (!dateISO) return null;
  if (!timeSlot) return dateISO;

  try {
    const date = new Date(dateISO);
    const [time, meridiemRaw] = timeSlot.split(" ");
    const [hourRaw, minuteRaw] = (time || "").split(":");
    let hour = Number(hourRaw);
    const minute = Number(minuteRaw || 0);
    const meridiem = (meridiemRaw || "").toUpperCase();

    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return dateISO;
    if (meridiem === "PM" && hour < 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
  } catch {
    return dateISO;
  }
}

export default async function OwnerLeadsPage(): Promise<ReactElement> {
  const query = `*[_type == "walkthroughBooking"] | order(createdAt desc)[0...250]{
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
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot
  }`;

  const docs = await sanityWriteClient.fetch<WalkthroughBookingDoc[]>(query);

  const leads: OwnerLead[] = docs.map((doc) => {
    const [roughLow, roughHigh] = parseEstimateRange(doc.estimateRoughRange);
    const status = normalizeStatus(doc.status, doc.appointmentType);
    const followupISO = buildScheduledISO(doc.followupWalkthroughDateISO, doc.followupWalkthroughTimeSlot);
    const scheduledISO = buildScheduledISO(doc.dateISO, doc.timeSlot);

    return {
      id: doc._id,
      customerName: doc.contactName || "Unknown customer",
      customerEmail: doc.contactEmail || null,
      customerPhone: doc.contactPhone || null,
      status,
      bookingType: (doc.appointmentType || "").toLowerCase().includes("follow") ? "followup" : "initial",
      roughLow: roughLow ?? doc.estimateTotal ?? null,
      roughHigh: roughHigh,
      scheduledForISO: scheduledISO,
      followupForISO: followupISO,
      createdAt: doc.createdAt || doc.dateISO || null,
    };
  });

  return <OwnerLeadsClient leads={leads} />;
}

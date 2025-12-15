// File: src/app/owner/dashboard/calendar/page.tsx

import type { ReactElement } from "react";
import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { OwnerCalendarClient } from "@/components/owner/OwnerCalendarClient";

type WalkthroughBookingDoc = {
  _id: string;
  status?: string;
  appointmentType?: string;
  dateISO?: string;
  timeSlot?: string;
  contactName?: string;
  contactEmail?: string;
  createdAt?: string | null;
  followupWalkthroughDateISO?: string | null;
  followupWalkthroughTimeSlot?: string | null;
};

export type OwnerCalendarEvent = {
  id: string;
  bookingId: string;
  title: string;
  startISO: string;
  kind: "initial" | "followup";
  status: string;
};

// Build ISO from date + "3:00 PM"-style time
function buildDateTimeISO(dateISO: string, timeSlot?: string | null): string {
  if (!timeSlot) return dateISO;
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

async function getCalendarEvents(): Promise<OwnerCalendarEvent[]> {
  const query = `*[_type == "walkthroughBooking"]{
    _id,
    status,
    appointmentType,
    dateISO,
    timeSlot,
    contactName,
    contactEmail,
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot
  }`;

  const docs = await sanityWriteClient.fetch<WalkthroughBookingDoc[]>(query);

  const events: OwnerCalendarEvent[] = [];

  for (const doc of docs) {
    const baseTitle = doc.contactName || doc.contactEmail || "Walkthrough";

    // Initial booking event
    if (doc.dateISO) {
      const startISO = buildDateTimeISO(doc.dateISO, doc.timeSlot);
      events.push({
        id: `${doc._id}-initial`,
        bookingId: doc._id,
        title: `${baseTitle} — Initial`,
        startISO,
        kind: "initial",
        status: doc.status || "scheduled",
      });
    }

    // Follow-up event
    if (doc.followupWalkthroughDateISO) {
      const startISO = buildDateTimeISO(
        doc.followupWalkthroughDateISO,
        doc.followupWalkthroughTimeSlot
      );
      events.push({
        id: `${doc._id}-followup`,
        bookingId: doc._id,
        title: `${baseTitle} — Follow-Up`,
        startISO,
        kind: "followup",
        status: doc.status || "followup",
      });
    }
  }

  events.sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
  );

  return events;
}

export default async function OwnerCalendarPage(): Promise<ReactElement> {
  const events = await getCalendarEvents();
  return <OwnerCalendarClient events={events} />;
}

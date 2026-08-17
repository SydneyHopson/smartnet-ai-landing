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
  customerPhone?: string;
  bookingType: "initial" | "followup";
  scheduledForISO: string | null;
  status: BookingStatus;
  roughLow?: number;
  roughHigh?: number;
};

export type ReminderItem = {
  id: string;
  label: string;
  when: string;
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
  occurredAt: string;
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

async function getOwnerDashboardData(): Promise<OwnerDashboardData> {
  const query = `*[_type == "walkthroughBooking"] | order(dateISO desc)[0...100]{
    _id,status,appointmentType,dateISO,timeSlot,contactName,contactEmail,contactPhone,
    estimateRoughRange,estimateTotal,rawEstimateJson,createdAt,
    followupWalkthroughDateISO,followupWalkthroughTimeSlot
  }`;
  const docs = await sanityWriteClient.fetch<WalkthroughBookingDoc[]>(query);
  const bookings: OwnerBooking[] = docs.map((doc) => {
    const typeRaw = (doc.appointmentType || "").toLowerCase();
    const bookingType: OwnerBooking["bookingType"] = typeRaw.includes("follow") ? "followup" : "initial";
    const scheduledForISO = doc.dateISO && doc.timeSlot ? buildDateTimeISO(doc.dateISO, doc.timeSlot) : doc.dateISO || null;
    const [roughLow, roughHigh] = parseEstimateRange(doc.estimateRoughRange);
    return {
      id: doc._id,
      customerName: doc.contactName || "Unknown customer",
      customerEmail: doc.contactEmail || undefined,
      customerPhone: doc.contactPhone || undefined,
      bookingType,
      scheduledForISO,
      status: normalizeStatus(doc.status, bookingType),
      roughLow: roughLow ?? doc.estimateTotal ?? undefined,
      roughHigh: roughHigh ?? undefined,
    };
  });
  const reminders = buildReminderItems(docs);
  const leadEvents = buildLeadEvents(docs);
  return { bookings, reminders, leadEvents, kpis: buildKpis(bookings, reminders) };
}

function normalizeStatus(status: string | undefined, bookingType: OwnerBooking["bookingType"]): BookingStatus {
  if (!status) return bookingType === "followup" ? "followup" : "scheduled";
  const s = status.toLowerCase();
  if (s.includes("new")) return "new";
  if (s.includes("sched")) return "scheduled";
  if (s.includes("follow")) return "followup";
  if (s.includes("complete") || s.includes("done")) return "completed";
  return "unknown";
}
function buildDateTimeISO(dateISO: string, timeSlot: string): string {
  try { const d=new Date(dateISO); const [time,ampmRaw]=timeSlot.split(" "); if(!time||!ampmRaw)return dateISO; const [h,m]=time.split(":"); let hours=parseInt(h||"0",10); const minutes=parseInt(m||"0",10); const ampm=ampmRaw.toUpperCase(); if(ampm==="PM"&&hours<12)hours+=12; if(ampm==="AM"&&hours===12)hours=0; d.setHours(hours,minutes,0,0); return d.toISOString(); } catch { return dateISO; }
}
function parseEstimateRange(range?: string | null): [number|null,number|null] { if(!range)return[null,null]; const parts=range.split("–").map(p=>p.trim()); if(parts.length!==2)return[null,null]; const p=(s:string)=>{const n=Number(s.replace(/[^0-9.]/g,""));return Number.isFinite(n)?n:null}; return[p(parts[0]),p(parts[1])]; }
function startOfDay(d:Date){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function classifyBucket(date:Date,todayStart:Date,weekAhead:Date):"today"|"week"|"overdue"|null{const day=startOfDay(date).getTime(),today=todayStart.getTime(),week=weekAhead.getTime();if(day===today)return"today";if(day>today&&day<=week)return"week";if(day<today)return"overdue";return null;}
function friendlyWhen(date:Date,timeSlot?:string|null){const s=date.toLocaleDateString("en-US",{month:"short",day:"numeric"});return timeSlot?`${s} • ${timeSlot}`:s;}
function buildReminderItems(docs:WalkthroughBookingDoc[]):ReminderItem[]{const today=startOfDay(new Date()),week=new Date(today.getTime()+7*86400000),items:ReminderItem[]=[];for(const d of docs){const name=d.contactName||"Unknown customer";if(d.dateISO){const date=new Date(d.dateISO),bucket=classifyBucket(date,today,week);if(bucket)items.push({id:d._id+"-walkthrough",label:`Walkthrough – ${name}`,when:friendlyWhen(date,d.timeSlot),bucket,bookingId:d._id,kind:"walkthrough"});}if(d.followupWalkthroughDateISO){const date=new Date(d.followupWalkthroughDateISO),bucket=classifyBucket(date,today,week);if(bucket)items.push({id:d._id+"-followup",label:`Follow-up – ${name}`,when:friendlyWhen(date,d.followupWalkthroughTimeSlot),bucket,bookingId:d._id,kind:"followup"});}}return items;}
function buildLeadEvents(docs:WalkthroughBookingDoc[]):LeadEvent[]{const events:LeadEvent[]=[];for(const d of docs){const name=d.contactName||"Unknown customer";if(d.createdAt||d.dateISO)events.push({id:d._id+"-created",customerName:name,eventType:"booking_created",occurredAt:d.createdAt||d.dateISO!,bookingId:d._id});if(d.followupWalkthroughDateISO)events.push({id:d._id+"-followup",customerName:name,eventType:"followup_scheduled",occurredAt:d.followupWalkthroughDateISO,bookingId:d._id});}return events;}
function buildKpis(bookings:OwnerBooking[],reminders:ReminderItem[]):OwnerDashboardData["kpis"]{const completedJobs=bookings.filter(b=>b.status==="completed").length;const upcomingWalkthroughs=bookings.filter(b=>(b.status==="scheduled"||b.status==="new")&&b.scheduledForISO&&new Date(b.scheduledForISO)>=new Date()).length;const openFollowups=reminders.filter(r=>r.kind==="followup").length;const active=new Set(bookings.filter(b=>b.status!=="completed").map(b=>b.customerEmail||b.customerPhone||b.id));return{activeLeads:active.size,upcomingWalkthroughs,openFollowups,completedJobs};}

export default async function OwnerDashboardPage(): Promise<ReactElement> {
  const data = await getOwnerDashboardData();
  return <OwnerDashboardClient {...data} />;
}

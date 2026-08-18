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
  ownerFollowUpDueAt?: string | null;
  leadSource?: string | null;
  projectType?: string | null;
  requestedServices?: string | null;
  jobLocationNote?: string | null;
  crmStage?: string | null;
  crmPriority?: string | null;
  crmAssignedTo?: string | null;
  crmLostReason?: string | null;
  crmUpdatedAt?: string | null;
  attribution?: { provider?: string | null; campaign?: string | null } | null;
};

function parseEstimateRange(range?: string | null): [number | null, number | null] {
  if (!range) return [null, null];
  const parts = range.split(/[–-]/).map((part) => part.trim());
  const parseMoney = (value?: string) => {
    const amount = Number((value || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount) ? amount : null;
  };
  return [parseMoney(parts[0]), parseMoney(parts[1])];
}

function inferStage(doc: WalkthroughBookingDoc): OwnerLead["stage"] {
  const explicit = doc.crmStage?.toLowerCase();
  const supported: OwnerLead["stage"][] = ["new", "contacted", "qualified", "walkthrough", "quote", "negotiating", "won", "lost"];
  if (explicit && supported.includes(explicit as OwnerLead["stage"])) return explicit as OwnerLead["stage"];
  const status = (doc.status || "").toLowerCase();
  if (status.includes("complete")) return "won";
  if (doc.followupWalkthroughDateISO || doc.dateISO) return "walkthrough";
  if (status.includes("follow")) return "contacted";
  return "new";
}

export default async function OwnerLeadsPage(): Promise<ReactElement> {
  const docs = await sanityWriteClient.fetch<WalkthroughBookingDoc[]>(`*[_type=="walkthroughBooking"] | order(coalesce(crmUpdatedAt,createdAt) desc)[0...500]{
    _id,status,appointmentType,dateISO,timeSlot,contactName,contactEmail,contactPhone,
    estimateRoughRange,estimateTotal,createdAt,followupWalkthroughDateISO,followupWalkthroughTimeSlot,
    ownerFollowUpDueAt,leadSource,projectType,requestedServices,jobLocationNote,crmStage,crmPriority,
    crmAssignedTo,crmLostReason,crmUpdatedAt,attribution
  }`);

  const leads: OwnerLead[] = docs.map((doc) => {
    const [roughLow, roughHigh] = parseEstimateRange(doc.estimateRoughRange);
    return {
      id: doc._id,
      customerName: doc.contactName || "Unknown customer",
      customerEmail: doc.contactEmail || null,
      customerPhone: doc.contactPhone || null,
      stage: inferStage(doc),
      priority: (doc.crmPriority as OwnerLead["priority"]) || "normal",
      assignedTo: doc.crmAssignedTo || null,
      source: doc.attribution?.provider || doc.leadSource || "Website / Estimator",
      campaign: doc.attribution?.campaign || null,
      projectType: doc.projectType || null,
      services: doc.requestedServices || null,
      location: doc.jobLocationNote || null,
      roughLow: roughLow ?? doc.estimateTotal ?? null,
      roughHigh: roughHigh,
      walkthroughForISO: doc.followupWalkthroughDateISO || doc.dateISO || null,
      nextFollowUpAt: doc.ownerFollowUpDueAt || null,
      createdAt: doc.createdAt || null,
      updatedAt: doc.crmUpdatedAt || doc.createdAt || null,
      lostReason: doc.crmLostReason || null,
    };
  });

  return <OwnerLeadsClient leads={leads} />;
}

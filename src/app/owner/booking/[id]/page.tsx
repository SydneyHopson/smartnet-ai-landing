import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

import { sanityWriteClient } from "@/lib/sanityWriteClient";
import { FollowupWalkthroughScheduler } from "@/components/owner/FollowupWalkthroughScheduler";

type SmartNetEstimate = {
  projectType?: string;
  squareFootage?: number;
  focus?: string[];
  coverageProfile?: string;
  wifiLayout?: string;
  doorsAccess?: string;
  extras?: string[];
  wiringStyle?: string;
  rackLocation?: string;
  timeline?: string;
  roughLow?: number;
  roughHigh?: number;
  notes?: string;
  [key: string]: unknown;
};

type WalkthroughBookingDoc = {
  _id: string;
  status?: string | null;
  appointmentType?: string | null;
  dateISO?: string | null;
  timeSlot?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  locationType?: string | null;
  locationLabel?: string | null;
  locationNote?: string | null;
  needsOnsiteWalkthrough?: boolean | null;
  isVirtualCall?: boolean | null;
  isPhoneCall?: boolean | null;
  estimateSummary?: string | null;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  rawEstimateJson?: string | null;
  createdAt?: string | null;
  followupWalkthroughDateISO?: string | null;
  followupWalkthroughTimeSlot?: string | null;
};

export const metadata: Metadata = {
  title: "SmartNET • Lead Detail",
  description: "Internal SmartNET CRM lead record.",
};

async function getBookingById(id: string): Promise<{
  booking: WalkthroughBookingDoc | null;
  estimate: SmartNetEstimate | null;
}> {
  const query = `*[_type == "walkthroughBooking" && _id == $id][0]{
    _id,
    status,
    appointmentType,
    dateISO,
    timeSlot,
    contactName,
    contactEmail,
    contactPhone,
    locationType,
    locationLabel,
    locationNote,
    needsOnsiteWalkthrough,
    isVirtualCall,
    isPhoneCall,
    estimateSummary,
    estimateRoughRange,
    estimateTotal,
    rawEstimateJson,
    createdAt,
    followupWalkthroughDateISO,
    followupWalkthroughTimeSlot
  }`;

  const booking = await sanityWriteClient.fetch<WalkthroughBookingDoc | null>(query, { id });
  if (!booking) return { booking: null, estimate: null };

  let estimate: SmartNetEstimate | null = null;
  if (booking.rawEstimateJson) {
    try {
      estimate = JSON.parse(booking.rawEstimateJson) as SmartNetEstimate;
    } catch {
      estimate = null;
    }
  }

  return { booking, estimate };
}

function formatDate(value?: string | null) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

function formatCreated(value?: string | null) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function money(value?: number | null) {
  if (value == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeStatus(status?: string | null) {
  const value = (status || "scheduled").toLowerCase();
  if (value.includes("complete") || value.includes("done")) return "Completed";
  if (value.includes("follow")) return "Follow-Up";
  if (value.includes("new")) return "New";
  if (value.includes("sched")) return "Scheduled";
  return "Scheduled";
}

export default async function OwnerBookingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { booking, estimate } = await getBookingById(id);

  if (!booking) notFound();

  const status = normalizeStatus(booking.status);
  const appointment = booking.appointmentType || "Walkthrough";
  const estimateLabel = booking.estimateRoughRange || money(booking.estimateTotal) || "No estimate saved";
  const projectType = typeof estimate?.projectType === "string" ? estimate.projectType : "Not specified";
  const squareFootage = typeof estimate?.squareFootage === "number" ? estimate.squareFootage.toLocaleString() : "Not specified";
  const focus = Array.isArray(estimate?.focus) ? estimate.focus.join(", ") : "Not specified";

  return (
    <main className="min-h-screen bg-[#020713] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,132,255,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,.09),transparent_28%),linear-gradient(rgba(15,34,58,.17)_1px,transparent_1px),linear-gradient(90deg,rgba(15,34,58,.17)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />

      <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-[#020713]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,.22)]">
              <Network className="h-4 w-4 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Smart<span className="text-blue-400">NET</span></p>
              <p className="text-[9px] uppercase tracking-[0.24em] text-slate-600">Lead Command Record</p>
            </div>
          </div>
          <Link href="/owner/leads" className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/20 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Leads
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1500px] space-y-5 px-3 pb-10 pt-5 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.96),rgba(3,10,24,.98))] p-5 shadow-[0_24px_90px_rgba(0,0,0,.38)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-300">CRM Lead</span>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300">{status}</span>
              </div>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-4xl">{booking.contactName || "Unknown customer"}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">One record for the customer journey from estimate through walkthrough, quote, and future job conversion.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:min-w-[360px]">
              {booking.contactPhone ? <a href={`tel:${booking.contactPhone}`} className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-500/[0.06] px-3 py-3 text-xs font-medium text-cyan-200"><Phone className="h-4 w-4" /> Call</a> : null}
              {booking.contactEmail ? <a href={`mailto:${booking.contactEmail}`} className="flex items-center justify-center gap-2 rounded-xl border border-blue-400/15 bg-blue-500/[0.06] px-3 py-3 text-xs font-medium text-blue-200"><Mail className="h-4 w-4" /> Email</a> : null}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Metric icon={<CircleDollarSign className="h-5 w-5 text-amber-300" />} label="Estimate" value={estimateLabel} />
          <Metric icon={<CalendarDays className="h-5 w-5 text-cyan-300" />} label="Appointment" value={`${formatDate(booking.dateISO)}${booking.timeSlot ? ` · ${booking.timeSlot}` : ""}`} />
          <Metric icon={<Clock3 className="h-5 w-5 text-violet-300" />} label="Lead Created" value={formatCreated(booking.createdAt)} />
          <Metric icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />} label="Pipeline Stage" value={status} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-5">
            <Card title="Customer & Appointment" icon={<UserRoundSearch className="h-4 w-4 text-blue-300" />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="Name" value={booking.contactName || "Unknown"} />
                <Info label="Appointment Type" value={appointment} />
                <Info label="Email" value={booking.contactEmail || "Not provided"} />
                <Info label="Phone" value={booking.contactPhone || "Not provided"} />
                <Info label="Location" value={booking.locationLabel || booking.locationType || "Not specified"} />
                <Info label="On-site Required" value={booking.needsOnsiteWalkthrough ? "Yes" : "No / already included"} />
              </div>
              {booking.locationNote ? <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.025] p-3 text-xs leading-5 text-slate-400"><MapPin className="mr-2 inline h-3.5 w-3.5 text-cyan-400" />{booking.locationNote}</div> : null}
            </Card>

            <Card title="AI Estimate Snapshot" icon={<Sparkles className="h-4 w-4 text-cyan-300" />}>
              <div className="grid gap-3 sm:grid-cols-3">
                <Info label="Project Type" value={projectType} />
                <Info label="Square Footage" value={squareFootage} />
                <Info label="Primary Focus" value={focus} />
              </div>
              {booking.estimateSummary ? <p className="mt-4 rounded-xl border border-blue-400/10 bg-blue-500/[0.04] p-4 text-sm leading-6 text-slate-300">{booking.estimateSummary}</p> : null}
              {estimate ? (
                <details className="mt-4 rounded-xl border border-white/5 bg-black/10 px-4 py-3">
                  <summary className="cursor-pointer text-xs font-medium text-slate-300">View complete estimator data</summary>
                  <pre className="mt-3 max-h-[420px] overflow-auto whitespace-pre-wrap text-[10px] leading-5 text-slate-500">{JSON.stringify(estimate, null, 2)}</pre>
                </details>
              ) : null}
            </Card>

            <Card title="Lead Timeline" icon={<Clock3 className="h-4 w-4 text-violet-300" />}>
              <TimelineItem title="Lead / booking created" detail={formatCreated(booking.createdAt || booking.dateISO)} complete />
              <TimelineItem title="Initial appointment" detail={`${formatDate(booking.dateISO)}${booking.timeSlot ? ` · ${booking.timeSlot}` : ""}`} complete={Boolean(booking.dateISO)} />
              <TimelineItem title="Follow-up walkthrough" detail={booking.followupWalkthroughDateISO ? `${formatDate(booking.followupWalkthroughDateISO)}${booking.followupWalkthroughTimeSlot ? ` · ${booking.followupWalkthroughTimeSlot}` : ""}` : "Not scheduled"} complete={Boolean(booking.followupWalkthroughDateISO)} />
              <TimelineItem title="Final quote" detail="Next pipeline milestone" complete={false} />
              <TimelineItem title="Job conversion" detail="Available after quote acceptance" complete={false} />
            </Card>
          </div>

          <div className="space-y-5">
            <Card title="Next Best Action" icon={<ShieldCheck className="h-4 w-4 text-emerald-300" />}>
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.05] p-4">
                <p className="text-xs font-semibold text-white">{booking.followupWalkthroughDateISO ? "Prepare for the on-site walkthrough" : "Lock in the next walkthrough"}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">Keep the customer moving forward while the estimate context is fresh. The next admin feature will let this record change pipeline stage and store internal notes directly.</p>
              </div>
            </Card>

            <FollowupWalkthroughScheduler
              bookingId={booking._id}
              existingDateISO={booking.followupWalkthroughDateISO}
              existingTimeSlot={booking.followupWalkthroughTimeSlot}
            />

            <Card title="Record Identity" icon={<Network className="h-4 w-4 text-blue-300" />}>
              <Info label="Booking ID" value={booking._id} mono />
              <div className="mt-3"><Info label="Source" value="SmartNET AI Estimator / Walkthrough Booking" /></div>
              <div className="mt-3"><Info label="Data Store" value="Sanity Production" /></div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] p-4 shadow-[0_18px_70px_rgba(0,0,0,.28)] sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03]">{icon}</div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]">{icon}</div>
        <div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">{label}</p><p className="mt-1 truncate text-xs font-semibold text-white sm:text-sm">{value}</p></div>
      </div>
    </div>
  );
}

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">{label}</p>
      <p className={`mt-1 break-words text-xs text-slate-300 ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function TimelineItem({ title, detail, complete }: { title: string; detail: string; complete: boolean }) {
  return (
    <div className="flex gap-3 border-l border-white/10 pb-5 pl-4 last:border-transparent last:pb-0">
      <span className={`-ml-[21px] mt-0.5 h-2.5 w-2.5 rounded-full ${complete ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.75)]" : "border border-slate-700 bg-[#071426]"}`} />
      <div><p className="text-xs font-medium text-slate-200">{title}</p><p className="mt-1 text-[10px] text-slate-600">{detail}</p></div>
    </div>
  );
}

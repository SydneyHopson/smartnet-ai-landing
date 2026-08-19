"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  CalendarClock,
  CircleDollarSign,
  Clock3,
  Flame,
  Save,
  Sparkles,
} from "lucide-react";

import {
  EditableCustomerProject,
  type CustomerProjectDraft,
} from "./EditableCustomerProject";
import { LeadActionBar } from "./LeadActionBar";

type Lead = {
  _id: string;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  leadSource?: string | null;
  projectType?: string | null;
  requestedServices?: string | null;
  jobLocationNote?: string | null;
  estimateRoughRange?: string | null;
  estimateTotal?: number | null;
  createdAt?: string | null;
  dateISO?: string | null;
  timeSlot?: string | null;
  ownerFollowUpDueAt?: string | null;
  crmStage?: string | null;
  crmPriority?: string | null;
  crmAssignedTo?: string | null;
  crmLostReason?: string | null;
  appointmentType?: string | null;
  estimateNotes?: string | null;
  notes?: string | null;
  squareFootage?: number | null;
  focus?: string[] | null;
  coverageProfile?: string | null;
  wifiLayout?: string | null;
  doorsAccess?: string | null;
  extras?: string[] | null;
  wiringStyle?: string | null;
  rackLocation?: string | null;
  timeline?: string | null;
  attribution?: {
    provider?: string | null;
    campaign?: string | null;
    adSet?: string | null;
    ad?: string | null;
  } | null;
};

type Activity = {
  _id: string;
  activityType?: string | null;
  summary?: string | null;
  createdAt?: string | null;
};

type LiveLead = Lead & CustomerProjectDraft;

const stages = [
  "new",
  "contacted",
  "qualified",
  "walkthrough",
  "quote",
  "negotiating",
  "won",
  "lost",
];

const priorities = ["low", "normal", "high", "hot"];

function scoreLead(lead: LiveLead) {
  let score = 25;
  const why: string[] = [];

  if (lead.contactPhone.trim()) {
    score += 12;
    why.push("phone captured");
  }
  if (lead.contactEmail.trim()) {
    score += 8;
    why.push("email captured");
  }
  if (lead.requestedServices.trim()) {
    score += 12;
    why.push("scope identified");
  }
  if (lead.estimateTotal || lead.estimateRoughRange) {
    score += 12;
    why.push("pricing established");
  }
  if (lead.dateISO) {
    score += 12;
    why.push("walkthrough activity");
  }
  if (lead.timeline) {
    score += 8;
    why.push("timeline known");
  }
  if (lead.crmPriority === "hot") {
    score += 8;
    why.push("marked hot");
  }
  if (
    ["qualified", "walkthrough", "quote", "negotiating"].includes(
      lead.crmStage || "",
    )
  ) {
    score += 8;
    why.push("sales engagement");
  }

  return { score: Math.min(99, score), why };
}

function createCustomerProjectDraft(lead: Lead): CustomerProjectDraft {
  return {
    contactName: lead.contactName || "",
    contactEmail: lead.contactEmail || "",
    contactPhone: lead.contactPhone || "",
    jobLocationNote: lead.jobLocationNote || "",
    projectType: lead.projectType || "",
    requestedServices: lead.requestedServices || "",
  };
}

export function OwnerLeadWorkspace({
  lead,
  activity,
}: {
  lead: Lead;
  activity: Activity[];
}) {
  const [customerProject, setCustomerProject] = useState<CustomerProjectDraft>(
    () => createCustomerProjectDraft(lead),
  );
  const [stage, setStage] = useState(lead.crmStage || "new");
  const [priority, setPriority] = useState(lead.crmPriority || "normal");
  const [assignedTo, setAssignedTo] = useState(lead.crmAssignedTo || "");
  const [followUp, setFollowUp] = useState(
    lead.ownerFollowUpDueAt ? lead.ownerFollowUpDueAt.slice(0, 16) : "",
  );
  const [lostReason, setLostReason] = useState(lead.crmLostReason || "");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const liveLead = useMemo<LiveLead>(
    () => ({
      ...lead,
      ...customerProject,
      crmStage: stage,
      crmPriority: priority,
    }),
    [lead, customerProject, stage, priority],
  );

  const intelligence = useMemo(() => scoreLead(liveLead), [liveLead]);

  const missing = useMemo(
    () =>
      [
        !customerProject.contactPhone.trim() && "phone",
        !customerProject.contactEmail.trim() && "email",
        !customerProject.requestedServices.trim() && "service scope",
        !lead.timeline && "timeline",
        !customerProject.jobLocationNote.trim() && "job location",
      ].filter(Boolean) as string[],
    [customerProject, lead.timeline],
  );

  const nextAction =
    stage === "new"
      ? "Contact the lead and confirm project scope."
      : stage === "contacted"
        ? "Qualify budget, timeline and decision maker."
        : stage === "qualified"
          ? "Schedule the walkthrough."
          : stage === "walkthrough"
            ? "Complete site notes and prepare the quote."
            : stage === "quote"
              ? "Follow up on the quote and objections."
              : stage === "negotiating"
                ? "Resolve objections and ask for the job."
                : stage === "won"
                  ? "Move into job execution and work-order planning."
                  : stage === "lost"
                    ? "Preserve the loss reason for reporting."
                    : "Review this opportunity.";

  const amount =
    lead.estimateRoughRange ||
    ((lead.estimateTotal || 0) > 0
      ? `$${lead.estimateTotal?.toLocaleString()}`
      : "Pricing pending");

  const source =
    lead.attribution?.provider || lead.leadSource || "Website / Estimator";

  async function save(extra?: Record<string, unknown>) {
    setSaving(true);
    setNotice("");

    try {
      const response = await fetch(`/api/owner/leads/${lead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          priority,
          assignedTo: assignedTo || null,
          nextFollowUpAt: followUp
            ? new Date(followUp).toISOString()
            : null,
          lostReason: stage === "lost" ? lostReason || null : null,
          note: note || null,
          contactName: customerProject.contactName,
          contactEmail: customerProject.contactEmail,
          contactPhone: customerProject.contactPhone,
          jobLocationNote: customerProject.jobLocationNote,
          projectType: customerProject.projectType,
          requestedServices: customerProject.requestedServices,
          ...extra,
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setNote("");
      setNotice("Lead updated and memory saved.");
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Could not save lead",
      );
    } finally {
      setSaving(false);
    }
  }

  function quickFollow(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(9, 0, 0, 0);
    setFollowUp(date.toISOString().slice(0, 16));
  }

  return (
    <main className="min-h-screen bg-[#010713] text-white">
      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/owner/leads"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[.06] px-3 text-[10px] font-semibold text-blue-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Leads
          </Link>
        </div>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[.22em] text-cyan-400">
              SmartNET Lead Workspace
            </p>
            <h1 className="truncate text-2xl font-semibold sm:text-3xl">
              {customerProject.contactName || "Unknown customer"}
            </h1>
            <p className="mt-1 text-[10px] text-slate-500">
              One record from first touch through conversion.
            </p>
          </div>

          <button
            type="button"
            onClick={() => save()}
            disabled={saving}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-blue-600/20 px-5 text-xs font-semibold text-cyan-100 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save Lead"}
          </button>
        </header>

        <LeadActionBar
          phone={customerProject.contactPhone}
          email={customerProject.contactEmail}
          onWalkthrough={() => {
            setStage("walkthrough");
            quickFollow(1);
          }}
          onQuote={() => setStage("quote")}
        />

        {notice && (
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/[.06] px-4 py-3 text-xs text-emerald-200">
            {notice}
          </div>
        )}

        <section className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            <Card
              title="SmartNET AI Opportunity Intelligence"
              icon={<BrainCircuit />}
            >
              <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
                <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[.06] p-4 text-center">
                  <Flame className="mx-auto h-5 w-5 text-orange-300" />
                  <p className="mt-2 text-3xl font-semibold">
                    {intelligence.score}
                  </p>
                  <p className="text-[8px] uppercase tracking-wider text-orange-300">
                    Opportunity Score
                  </p>
                </div>
                <div className="space-y-3">
                  <Mini label="Recommended Next Action" value={nextAction} />
                  <Mini
                    label="Why this score"
                    value={
                      intelligence.why.length
                        ? intelligence.why.join(" · ")
                        : "Early-stage opportunity with limited engagement data."
                    }
                  />
                  {missing.length > 0 && (
                    <Mini label="Still Missing" value={missing.join(" · ")} />
                  )}
                </div>
              </div>
            </Card>

            <Card title="Customer & Project" icon={<Sparkles />}>
              <EditableCustomerProject
                value={customerProject}
                onChange={setCustomerProject}
                source={source}
                amount={amount}
              />
            </Card>

            <Card title="AI Estimate & Discovery" icon={<Sparkles />}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Mini
                  label="Square Footage"
                  value={
                    lead.squareFootage
                      ? lead.squareFootage.toLocaleString()
                      : "—"
                  }
                />
                <Mini label="Timeline" value={lead.timeline || "—"} />
                <Mini label="Coverage" value={lead.coverageProfile || "—"} />
                <Mini label="Wi-Fi Layout" value={lead.wifiLayout || "—"} />
                <Mini label="Access Doors" value={lead.doorsAccess || "—"} />
                <Mini label="Wiring" value={lead.wiringStyle || "—"} />
                <Mini label="Rack Location" value={lead.rackLocation || "—"} />
                <Mini label="Focus" value={lead.focus?.join(", ") || "—"} />
              </div>
              {(lead.estimateNotes || lead.notes) && (
                <div className="mt-3">
                  <Mini
                    label="Estimator Notes"
                    value={lead.estimateNotes || lead.notes || "—"}
                  />
                </div>
              )}
            </Card>

            <Card title="Sales Controls" icon={<CalendarClock />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Stage"
                  value={stage}
                  options={stages}
                  set={setStage}
                />
                <Select
                  label="Priority"
                  value={priority}
                  options={priorities}
                  set={setPriority}
                />
                <Field label="Assigned To" value={assignedTo} set={setAssignedTo} />
                <label>
                  <span className="mb-2 block text-[8px] uppercase text-slate-500">
                    Next Follow-Up
                  </span>
                  <input
                    type="datetime-local"
                    value={followUp}
                    onChange={(event) => setFollowUp(event.target.value)}
                    className="h-11 w-full rounded-xl border border-blue-400/15 bg-[#031020] px-3 text-xs"
                  />
                </label>
                <div className="flex flex-wrap gap-2 sm:col-span-2">
                  <span className="flex items-center gap-1 text-[8px] uppercase text-slate-600">
                    <Clock3 className="h-3 w-3" />
                    Quick follow-up
                  </span>
                  {[
                    ["Today", 0],
                    ["Tomorrow", 1],
                    ["3 Days", 3],
                    ["1 Week", 7],
                  ].map(([label, days]) => (
                    <button
                      type="button"
                      key={String(label)}
                      onClick={() => quickFollow(Number(days))}
                      className="rounded-lg border border-blue-400/15 px-2.5 py-1.5 text-[8px] text-blue-200"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {stage === "lost" && (
                  <div className="sm:col-span-2">
                    <Field
                      label="Lost Reason"
                      value={lostReason}
                      set={setLostReason}
                    />
                  </div>
                )}
              </div>
            </Card>

            <Card title="Internal Note" icon={<Sparkles />}>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-blue-400/15 bg-[#031020] p-3 text-xs"
                placeholder="Call notes, objections, decisions, next steps…"
              />
              <p className="mt-2 text-[9px] text-slate-600">
                Notes become permanent lead activity and SmartNET business memory.
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Attribution" icon={<Sparkles />}>
              <Rows
                rows={[
                  ["Provider", source],
                  ["Campaign", lead.attribution?.campaign || "—"],
                  ["Ad Set", lead.attribution?.adSet || "—"],
                  ["Ad", lead.attribution?.ad || "—"],
                ]}
              />
            </Card>

            <Card title="Activity Timeline" icon={<CalendarClock />}>
              <div className="max-h-[760px] overflow-y-auto">
                {activity.length ? (
                  activity.map((item, index) => (
                    <div
                      key={item._id}
                      className="relative border-l border-blue-400/20 pb-5 pl-5"
                    >
                      <span
                        className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${
                          index === 0 ? "bg-cyan-300" : "bg-blue-500"
                        }`}
                      />
                      <p className="text-[9px] uppercase text-cyan-400">
                        {item.activityType || "activity"}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        {item.summary || "SmartNET activity"}
                      </p>
                      <p className="mt-1 text-[8px] text-slate-600">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-12 text-center text-[10px] text-slate-600">
                    No activity recorded yet.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-blue-400/15 bg-[#041022] p-5">
      <div className="mb-5 flex items-center gap-2 text-cyan-300 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#08182d] p-3">
      <p className="text-[8px] uppercase text-slate-600">{label}</p>
      <p className="mt-1 text-[10px] leading-5 text-slate-300">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  set,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[8px] uppercase text-slate-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => set(event.target.value)}
        className="h-11 w-full rounded-xl border border-blue-400/15 bg-[#031020] px-3 text-xs"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  set,
}: {
  label: string;
  value: string;
  options: string[];
  set: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[8px] uppercase text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => set(event.target.value)}
        className="h-11 w-full rounded-xl border border-blue-400/15 bg-[#031020] px-3 text-xs capitalize"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <div className="divide-y divide-white/5">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-3 py-3">
          <span className="text-[9px] text-slate-600">{label}</span>
          <b className="text-right text-[10px] text-slate-300">{value}</b>
        </div>
      ))}
    </div>
  );
}

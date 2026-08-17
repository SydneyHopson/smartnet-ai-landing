"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ChevronDown,
  LockKeyhole,
  Network,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import { AiEstimatorCard } from "@/components/AiEstimator/AiEstimatorCard";
import { pricingCatalog } from "@/features/estimator/pricing/pricing-catalog";
import {
  useSmartNetEstimate,
  type EstimatorProject,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

type SmartNetGeneratorSectionProps = { startOnSummary?: boolean };

type BomItem = {
  category?: string;
  description?: string;
  quantity?: number;
  manufacturer?: string | null;
  model?: string | null;
  reason?: string;
};

export function SmartNetGeneratorSection({ startOnSummary = false }: SmartNetGeneratorSectionProps) {
  const { estimator } = useSmartNetEstimate();
  const workspaceRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!startOnSummary) return;
    const timeout = window.setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [startOnSummary]);

  const hasSession = Boolean(estimator.sessionId);

  return (
    <section id="smartnet-generator" className="relative overflow-hidden border-t border-blue-500/10 bg-[#010512] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(0,102,255,0.15),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(0,174,255,0.08),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <WorkspaceHeader />
        {startOnSummary && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-100">
            Your saved SmartNET project has been restored.
          </motion.div>
        )}
        <div ref={workspaceRef} className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <main className="min-w-0"><AiEstimatorCard /></main>
          <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <ProjectSummaryPanel />
            {hasSession && <RequestedSystemsPanel />}
            {hasSession && <EstimatePanel />}
            <TrustPanel />
          </aside>
        </div>
      </div>
    </section>
  );
}

function WorkspaceHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-blue-300">SmartNET AI Project Builder</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Smart solutions. Strong connections. Secure futures.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">Answer a few simple questions. SmartNET turns your answers into a clear preliminary project scope and estimate.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:min-w-[390px]">
        <HeaderBadge icon={<ShieldCheck className="h-5 w-5" />} label="Professional" />
        <HeaderBadge icon={<CheckCircle2 className="h-5 w-5" />} label="Reliable" />
        <HeaderBadge icon={<Network className="h-5 w-5" />} label="Connected" />
      </div>
    </div>
  );
}

function HeaderBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 px-3 py-3 text-center">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300">{icon}</div>
      <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-300">{label}</p>
    </div>
  );
}

function ProjectSummaryPanel() {
  const { estimator } = useSmartNetEstimate();
  const conversation = estimator.conversation;
  const project = estimator.project;
  const completed = conversation?.completedQuestionKeys.length ?? 0;
  const remaining = conversation?.unansweredQuestionKeys.length ?? 0;
  const confidence = conversation?.confidenceScore ?? 0;
  const progress = calculateProgress(completed, remaining, confidence);
  const facts = project ? createKnownFacts(project) : [];

  return (
    <Panel accent>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue-300">Live project summary</p>
          <h3 className="mt-1 text-base font-semibold text-white">{estimator.sessionId ? "Updates as you answer" : "Your project will appear here"}</h3>
        </div>
        {estimator.sessionId && <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-emerald-300">Live</span>}
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs"><span className="text-slate-500">Estimate readiness</span><span className="font-semibold text-blue-200">{progress}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-900"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      </div>
      {facts.length > 0 ? (
        <div className="mt-5 space-y-2">{facts.map((fact) => <div key={fact} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/65 px-3 py-2.5"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" /><span className="text-sm text-slate-200">{fact}</span></div>)}</div>
      ) : <p className="mt-5 text-sm leading-relaxed text-slate-500">Start the estimator and SmartNET will organize the project here in real time.</p>}
      {estimator.sessionId && <div className="mt-5 grid grid-cols-3 gap-2"><Metric label="Confirmed" value={String(completed)} /><Metric label="Remaining" value={String(remaining)} /><Metric label="Confidence" value={`${confidence}%`} /></div>}
    </Panel>
  );
}

function RequestedSystemsPanel() {
  const { estimator } = useSmartNetEstimate();
  const project = estimator.project;
  if (!project) return null;
  return (
    <Panel>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue-300">Requested systems</p>
      <div className="mt-4 space-y-2">
        <SystemRow icon={<Camera className="h-4 w-4" />} label="Security Cameras" requested={project.cameras?.requested ?? false} />
        <SystemRow icon={<Wifi className="h-4 w-4" />} label="Managed Wi-Fi" requested={project.wifi?.requested ?? false} />
        <SystemRow icon={<Network className="h-4 w-4" />} label="Network" requested={project.network?.requested ?? false} />
        <SystemRow icon={<LockKeyhole className="h-4 w-4" />} label="Access Control" requested={project.accessControl?.requested ?? false} />
      </div>
    </Panel>
  );
}

function EstimatePanel() {
  const { estimator, finalizeEstimator, clearEstimatorError } = useSmartNetEstimate();
  const pricing = estimator.project?.pricing;
  const readyForPricing = estimator.conversation?.readyForPricing ?? false;
  const hasPricing = Boolean(pricing && pricing.status !== "not_calculated" && pricing.estimatedLow > 0 && pricing.estimatedHigh > 0);
  const bomItems = (estimator.project?.equipment?.recommendedItems ?? []) as BomItem[];

  return (
    <Panel accent>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cyan-300">Preliminary estimate</p>
      {hasPricing && pricing ? (
        <>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">${pricing.estimatedLow.toLocaleString()} – ${pricing.estimatedHigh.toLocaleString()}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">Final price is confirmed after walkthrough verification.</p>
          <p className="mt-2 text-[0.68rem] font-medium leading-relaxed text-blue-200">This is a complete project price range, not simply materials + field labor.</p>
          <div className="mt-4 grid grid-cols-2 gap-2"><CostCard label="Materials" value={pricing.materialCost} /><CostCard label="Labor" value={pricing.laborCost} /></div>
          <div className="mt-3 rounded-xl border border-blue-500/15 bg-blue-500/5 px-3 py-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-blue-300">How this estimate is calculated</p>
            <p className="mt-1.5 text-[0.68rem] leading-relaxed text-slate-400">Materials and installation labor are the foundation of your project cost. The preliminary range also accounts for project mobilization, installation consumables, business overhead, configuration and commissioning, and site-condition uncertainty. Because SmartNET has not yet completed an on-site walkthrough, the range includes an allowance for conditions that can only be verified in person.</p>
          </div>
          {bomItems.length > 0 && <EstimateBreakdown items={bomItems} materialTotal={pricing.materialCost} />}
        </>
      ) : <p className="mt-3 text-sm leading-relaxed text-slate-400">{readyForPricing ? "SmartNET has enough information to calculate the preliminary estimate." : "Pricing will appear when discovery is complete."}</p>}

      {readyForPricing && !estimator.proposalId && <button type="button" disabled={estimator.isFinalizing} onClick={() => void finalizeEstimator()} className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.3)] transition hover:brightness-110 disabled:opacity-50">{estimator.isFinalizing ? "Building your proposal..." : "Build my proposal"}</button>}
      {estimator.proposalId && <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-100">Proposal ready.</div>}
      {estimator.error && <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3"><p className="text-xs leading-relaxed text-rose-100">{estimator.error}</p><button type="button" onClick={clearEstimatorError} className="mt-2 text-xs font-semibold text-rose-300">Dismiss</button></div>}
    </Panel>
  );
}

function EstimateBreakdown({ items, materialTotal }: { items: BomItem[]; materialTotal: number }) {
  const [open, setOpen] = React.useState(false);
  const rows = items.map((item, index) => {
    const catalogItem = pricingCatalog.find((candidate) => candidate.name === item.description);
    const quantity = item.quantity ?? 0;
    const unitCost = catalogItem?.unitCost ?? null;
    return { key: `${item.description ?? "item"}-${index}`, ...item, quantity, unitCost, extended: unitCost === null ? null : unitCost * quantity };
  });
  const visibleTotal = rows.reduce((sum, row) => sum + (row.extended ?? 0), 0);

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-blue-500/15 bg-slate-950/55">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left">
        <div><p className="text-xs font-semibold text-slate-200">View estimate breakdown</p><p className="mt-0.5 text-[0.62rem] text-slate-500">Live equipment & material BOM</p></div>
        <ChevronDown className={`h-4 w-4 text-blue-300 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-slate-800/80 px-3 pb-3">
          <div className="divide-y divide-slate-800/70">
            {rows.map((row) => (
              <div key={row.key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-snug text-slate-200">{row.description ?? "Material"}</p>
                  {(row.manufacturer || row.model) && <p className="mt-1 truncate text-[0.6rem] text-slate-500">{[row.manufacturer, row.model].filter(Boolean).join(" · ")}</p>}
                  <p className="mt-1 text-[0.6rem] text-slate-600">Qty {formatBomQuantity(row.quantity, row.category)}{row.unitCost !== null ? ` × ${formatMoney(row.unitCost)}${row.category === "cable" ? "/ft" : ""}` : ""}</p>
                </div>
                <p className="text-xs font-semibold text-slate-100">{row.extended !== null ? formatMoney(row.extended) : "Included"}</p>
              </div>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-blue-500/20 pt-3"><span className="text-xs font-semibold text-slate-300">Equipment & materials</span><span className="text-sm font-semibold text-white">{formatMoney(visibleTotal)}</span></div>
          {Math.abs(materialTotal - visibleTotal) > 0.01 && <p className="mt-2 text-[0.6rem] leading-relaxed text-slate-500">Estimator material total: {formatMoney(materialTotal)}. The difference is reserved for project-level material adjustments when applicable.</p>}
        </div>
      )}
    </div>
  );
}

function TrustPanel() {
  return <Panel><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300"><ShieldCheck className="h-5 w-5" /></span><div><p className="text-sm font-semibold text-white">Professional installation</p><p className="mt-1 text-xs leading-relaxed text-slate-500">Measurements, pathways, mounting conditions, power, and hardware are verified during the walkthrough.</p></div></div></Panel>;
}

function Panel({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.25 }} className={`rounded-2xl border p-4 sm:p-5 ${accent ? "border-blue-500/25 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.12),rgba(3,8,23,0.98))] shadow-[0_0_28px_rgba(0,102,255,0.1)]" : "border-slate-800 bg-[#030817]/90"}`}>{children}</motion.section>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-2 py-2.5 text-center"><p className="text-[0.55rem] uppercase tracking-[0.12em] text-slate-600">{label}</p><p className="mt-1 text-xs font-semibold text-white">{value}</p></div>;
}

function SystemRow({ icon, label, requested }: { icon: React.ReactNode; label: string; requested: boolean }) {
  return <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/65 px-3 py-3"><span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${requested ? "border-blue-500/30 bg-blue-500/10 text-blue-300" : "border-slate-800 bg-slate-900 text-slate-600"}`}>{icon}</span><span className="flex-1 text-sm font-medium text-slate-200">{label}</span><span className={`rounded-full border px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] ${requested ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300" : "border-slate-700 bg-slate-900 text-slate-600"}`}>{requested ? "Included" : "Not selected"}</span></div>;
}

function CostCard({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-[0.56rem] uppercase tracking-[0.12em] text-slate-600">{label}</p><p className="mt-1 text-sm font-semibold text-white">{formatMoney(value)}</p></div>;
}

function formatMoney(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatBomQuantity(quantity: number, category?: string): string {
  if (category === "cable") return `${quantity.toLocaleString()} ft`;
  return quantity.toLocaleString();
}

function calculateProgress(completed: number, remaining: number, confidence: number): number {
  const total = completed + remaining;
  if (total === 0) return confidence > 0 ? confidence : 0;
  const questionProgress = Math.round((completed / total) * 100);
  return Math.max(0, Math.min(100, Math.round(questionProgress * 0.7 + confidence * 0.3)));
}

function createKnownFacts(project: EstimatorProject): string[] {
  const facts: string[] = [];
  const projectType = project.property?.projectType;
  const squareFootage = project.property?.squareFootage?.value;
  const floors = project.property?.numberOfFloors?.value;
  const ceilingHeight = project.property?.ceilingHeightFeet?.value;
  const cameraCount = (project.cameras?.interiorCount?.value ?? 0) + (project.cameras?.exteriorCount?.value ?? 0) + (project.cameras?.specialtyCount?.value ?? 0);
  const recordingDays = project.cameras?.recordingDays?.value;
  const wifiUsers = project.wifi?.estimatedConcurrentUsers?.value;
  const doors = project.accessControl?.controlledDoorCount?.value;
  if (projectType) facts.push(formatLabel(projectType));
  if (squareFootage) facts.push(`${squareFootage.toLocaleString()} ft²`);
  if (floors) facts.push(`${floors} ${floors === 1 ? "floor" : "floors"}`);
  if (ceilingHeight) facts.push(`${ceilingHeight}-foot ceilings`);
  if (cameraCount > 0) facts.push(`${cameraCount} cameras`);
  if (recordingDays) facts.push(`${recordingDays}-day recording`);
  if (wifiUsers) facts.push(`${wifiUsers} Wi-Fi devices`);
  if (doors) facts.push(`${doors} controlled doors`);
  return facts;
}

function formatLabel(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
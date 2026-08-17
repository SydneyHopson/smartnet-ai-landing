"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity, ArrowRight, BarChart3, Bell, BriefcaseBusiness, CalendarDays,
  CircleDollarSign, Clock3, FileText, LayoutDashboard, Menu, Network,
  Search, ShieldCheck, Sparkles, Trash2, Users, UserRoundSearch, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OwnerLogoutButton } from "../../app/owner/access/OwnerLogoutButton";
import type { BookingStatus, OwnerDashboardData } from "@/app/owner/dashboard/page";

type Props = OwnerDashboardData;
type ApiResponse = { ok?: boolean; data?: OwnerDashboardData; bookings?: OwnerDashboardData["bookings"]; reminders?: OwnerDashboardData["reminders"]; leadEvents?: OwnerDashboardData["leadEvents"]; kpis?: OwnerDashboardData["kpis"] };

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/owner/dashboard" },
  { label: "Calendar", icon: CalendarDays, href: "/owner/dashboard/calendar" },
  { label: "Leads", icon: UserRoundSearch, href: "#leads" },
  { label: "Walkthroughs", icon: ShieldCheck },
  { label: "Jobs", icon: BriefcaseBusiness },
  { label: "Quotes", icon: FileText },
  { label: "Customers", icon: Users },
  { label: "Reports", icon: BarChart3 },
];

const statusAccent: Record<BookingStatus, string> = {
  new: "border-blue-400/30 bg-blue-500/10 text-blue-300",
  scheduled: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
  followup: "border-violet-400/30 bg-violet-500/10 text-violet-300",
  completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  unknown: "border-slate-600 bg-slate-800 text-slate-300",
};

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
function formatDateTime(iso: string | null) { if (!iso) return "Not scheduled"; const d = new Date(iso); return Number.isNaN(d.getTime()) ? "Unknown" : d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); }
function ShellCard({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] shadow-[0_18px_70px_rgba(0,0,0,.32)] ${className}`}>{children}</div>; }

export const OwnerDashboardClient: FC<Props> = (props) => {
  const [apiData, setApiData] = useState<OwnerDashboardData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function refresh() {
    try {
      const res = await fetch("/api/owner/dashboard", { cache: "no-store" });
      const json: ApiResponse = await res.json();
      const next = json.data ?? (json.bookings ? json as OwnerDashboardData : null);
      if (next) setApiData(next);
    } catch {}
  }
  useEffect(() => { void refresh(); }, []);

  const raw = apiData ?? props;
  const data: OwnerDashboardData = { bookings: raw.bookings ?? [], reminders: raw.reminders ?? [], leadEvents: raw.leadEvents ?? [], kpis: raw.kpis ?? { activeLeads: 0, upcomingWalkthroughs: 0, openFollowups: 0, completedJobs: 0 } };
  const pipelineValue = useMemo(() => data.bookings.reduce((sum, b) => sum + (b.roughHigh ?? b.roughLow ?? 0), 0), [data.bookings]);
  const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return data.bookings.filter((b) => !q || b.customerName.toLowerCase().includes(q) || b.customerEmail?.toLowerCase().includes(q) || b.customerPhone?.includes(q)); }, [data.bookings, query]);

  async function deleteLead(id: string, name: string) {
    if (!window.confirm(`Delete ${name}?\n\nThis permanently removes this walkthrough/lead record. Use this for test leads only.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/owner/leads/${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Delete failed");
      setApiData((current) => {
        const base = current ?? data;
        return { ...base, bookings: base.bookings.filter((b) => b.id !== id), reminders: base.reminders.filter((r) => r.bookingId !== id), leadEvents: base.leadEvents.filter((e) => e.bookingId !== id) };
      });
      await refresh();
    } catch (e) { window.alert(e instanceof Error ? e.message : "Could not delete lead."); }
    finally { setDeletingId(null); }
  }

  return <main className="min-h-screen bg-[#020713] text-slate-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,132,255,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,.09),transparent_28%),linear-gradient(rgba(15,34,58,.17)_1px,transparent_1px),linear-gradient(90deg,rgba(15,34,58,.17)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] border-r border-cyan-400/10 bg-[#03101f]/95 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col"><Brand/><div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"/><OwnerNav/><div className="mt-auto space-y-3"><div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-3"><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15"><Sparkles className="h-4 w-4 text-blue-300"/></div><div><p className="text-xs font-semibold text-white">SmartNET Admin</p><p className="text-[10px] text-cyan-400">Owner</p></div></div></div><OwnerLogoutButton className="w-full justify-start rounded-xl border-slate-800 bg-transparent text-xs text-slate-500" variant="outline" next="/owner/access"/></div></aside>
    {menuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/70" onClick={()=>setMenuOpen(false)}/><aside className="relative h-full w-[82%] max-w-[290px] border-r border-cyan-400/15 bg-[#03101f] p-5"><div className="flex items-center justify-between"><Brand/><Button variant="ghost" size="icon" onClick={()=>setMenuOpen(false)}><X className="h-5 w-5"/></Button></div><div className="mt-8"><OwnerNav onNavigate={()=>setMenuOpen(false)}/></div></aside></div>}
    <section className="relative min-h-screen lg:ml-[230px]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cyan-400/10 bg-[#020713]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8"><div className="flex items-center gap-3 lg:hidden"><Button variant="ghost" size="icon" onClick={()=>setMenuOpen(true)}><Menu className="h-5 w-5"/></Button><Brand compact/></div><div className="hidden lg:block"><p className="text-sm font-semibold text-white">SmartNET Command Center</p><p className="text-[10px] text-slate-500">Owner operations console</p></div><div className="flex items-center gap-2"><div className="hidden rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] text-emerald-300 sm:block">● Systems Operational</div><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]"><Bell className="h-4 w-4 text-slate-400"/></div></div></header>
      <div className="mx-auto max-w-[1500px] space-y-5 px-3 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-10">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-500">Operations Overview</p><h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">SmartNET Command Center</h1><p className="mt-1 text-xs text-slate-500">Live pipeline, walkthrough, and lead activity.</p></div>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-5"><Metric label="Active Leads" value={String(data.kpis.activeLeads)} icon={<Users className="h-5 w-5 text-blue-300"/>}/><Metric label="Walkthroughs" value={String(data.kpis.upcomingWalkthroughs)} icon={<CalendarDays className="h-5 w-5 text-cyan-300"/>}/><Metric label="Follow-Ups" value={String(data.kpis.openFollowups)} icon={<Clock3 className="h-5 w-5 text-violet-300"/>}/><Metric label="Completed" value={String(data.kpis.completedJobs)} icon={<ShieldCheck className="h-5 w-5 text-emerald-300"/>}/><div className="col-span-2 xl:col-span-1"><Metric label="Pipeline Value" value={money(pipelineValue)} icon={<CircleDollarSign className="h-5 w-5 text-amber-300"/>}/></div></div>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <ShellCard className="overflow-hidden" ><div id="leads" className="scroll-mt-24"><div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div><p className="text-sm font-semibold text-white">Leads</p><p className="text-[10px] text-slate-600">Your live CRM stays inside the Command Center</p></div><div className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/10 px-3"><Search className="h-3.5 w-3.5 text-slate-600"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search customer" className="h-9 border-0 bg-transparent p-0 text-xs focus-visible:ring-0"/></div></div>
          <div className="divide-y divide-white/5">{filtered.length ? filtered.map((b)=><div key={b.id} className="grid gap-3 p-4 transition hover:bg-blue-500/[0.035] sm:grid-cols-[1.3fr_.9fr_.7fr_auto] sm:items-center"><Link href={`/owner/booking/${b.id}`} className="min-w-0"><p className="truncate text-sm font-medium text-white">{b.customerName}</p><p className="truncate text-[10px] text-slate-500">{b.customerEmail || b.customerPhone || "No contact"}</p></Link><p className="text-xs text-slate-400">{b.roughLow||b.roughHigh?`${money(b.roughLow??0)} – ${money(b.roughHigh??b.roughLow??0)}`:"No estimate"}</p><span className={`w-fit rounded-full border px-2 py-1 text-[9px] font-semibold uppercase ${statusAccent[b.status]}`}>{b.status}</span><div className="flex items-center justify-between gap-2"><Link href={`/owner/booking/${b.id}`} className="flex items-center gap-2 text-[10px] text-slate-500"><span>{formatDateTime(b.scheduledForISO)}</span><ArrowRight className="h-3.5 w-3.5"/></Link><button disabled={deletingId===b.id} onClick={()=>deleteLead(b.id,b.customerName)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-500/[0.06] text-rose-400 transition hover:bg-rose-500/15 disabled:opacity-40" title="Delete test lead"><Trash2 className="h-4 w-4"/></button></div></div>):<div className="p-10 text-center text-xs text-slate-600">No matching leads.</div>}</div></div></ShellCard>
          <div className="space-y-5"><ShellCard className="p-5"><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-cyan-300"/><p className="text-sm font-semibold text-white">Pipeline Health</p></div><div className="mt-4 grid grid-cols-2 gap-2"><Mini label="New" value={data.bookings.filter(b=>b.status==="new").length}/><Mini label="Scheduled" value={data.bookings.filter(b=>b.status==="scheduled").length}/><Mini label="Follow-Up" value={data.bookings.filter(b=>b.status==="followup").length}/><Mini label="Completed" value={data.bookings.filter(b=>b.status==="completed").length}/></div></ShellCard><ShellCard className="p-5"><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-amber-300"/><p className="text-sm font-semibold text-white">Reminders</p></div><div className="mt-4 space-y-2"><Mini label="Due Today" value={data.reminders.filter(r=>r.bucket==="today").length}/><Mini label="This Week" value={data.reminders.filter(r=>r.bucket==="week").length}/><Mini label="Overdue" value={data.reminders.filter(r=>r.bucket==="overdue").length}/></div></ShellCard></div>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-cyan-400/10 bg-[#03101f]/95 px-2 pb-[max(env(safe-area-inset-bottom),.5rem)] pt-2 backdrop-blur-xl lg:hidden"><MobileNav label="Home" href="/owner/dashboard" icon={<LayoutDashboard className="h-4 w-4"/>} active/><MobileNav label="Calendar" href="/owner/dashboard/calendar" icon={<CalendarDays className="h-4 w-4"/>}/><MobileNav label="Leads" href="/owner/dashboard#leads" icon={<Users className="h-4 w-4"/>}/><button onClick={()=>setMenuOpen(true)} className="flex flex-col items-center gap-1 rounded-xl py-2 text-[9px] text-slate-600"><Menu className="h-4 w-4"/>More</button></nav>
    </section>
  </main>;
};

function OwnerNav({onNavigate}:{onNavigate?:()=>void}) { return <nav className="space-y-1.5">{navItems.map(item=>item.href?<Link key={item.label} href={item.href} onClick={onNavigate} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${item.label==="Dashboard"?"border border-blue-400/20 bg-blue-500/15 text-white":"text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><item.icon className="h-4 w-4"/>{item.label}</Link>:<div key={item.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600"><item.icon className="h-4 w-4"/>{item.label}<span className="ml-auto text-[9px] uppercase">Soon</span></div>)}</nav>; }
function Brand({compact=false}:{compact?:boolean}) { return <div className="flex items-center gap-2.5"><div className={`${compact?"h-8 w-8":"h-10 w-10"} flex items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10`}><Network className={`${compact?"h-4 w-4":"h-5 w-5"} text-cyan-300`}/></div><div><p className={`${compact?"text-sm":"text-lg"} font-semibold text-white`}>Smart<span className="text-blue-400">NET</span></p>{!compact&&<p className="text-[8px] uppercase tracking-[.3em] text-slate-600">Owner Console</p>}</div></div>; }
function Metric({label,value,icon}:{label:string;value:string;icon:ReactNode}) { return <ShellCard className="p-4 sm:p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]">{icon}</div><div><p className="text-[9px] uppercase tracking-[.16em] text-slate-600">{label}</p><p className="mt-1 text-xl font-semibold text-white">{value}</p></div></div></ShellCard>; }
function Mini({label,value}:{label:string;value:number}) { return <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3"><span className="text-[11px] text-slate-500">{label}</span><span className="text-sm font-semibold text-white">{value}</span></div>; }
function MobileNav({label,href,icon,active=false}:{label:string;href:string;icon:ReactNode;active?:boolean}) { return <Link href={href} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[9px] ${active?"text-cyan-300":"text-slate-600"}`}>{icon}{label}</Link>; }

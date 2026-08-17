"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  LayoutDashboard,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundSearch,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OwnerLogoutButton } from "../../app/owner/access/OwnerLogoutButton";
import type {
  BookingStatus,
  LeadEvent,
  OwnerDashboardData,
} from "@/app/owner/dashboard/page";

type Props = OwnerDashboardData;
type OwnerDashboardApiResponse = { ok: boolean; data?: OwnerDashboardData; error?: string };

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/owner/dashboard", live: true },
  { label: "Calendar", icon: CalendarDays, href: "/owner/dashboard/calendar", live: true },
  { label: "Leads", icon: UserRoundSearch },
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

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(iso: string | null) {
  if (!iso) return "Not scheduled";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isToday(iso: string | null) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

function eventLabel(type: LeadEvent["eventType"]) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ShellCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] shadow-[0_18px_70px_rgba(0,0,0,.32)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  accent,
  detail,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent: string;
  detail: string;
}) {
  return (
    <ShellCard className="relative overflow-hidden p-4 sm:p-5">
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${accent}`} />
      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_0_24px_rgba(255,255,255,.03)]">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">{value}</p>
        </div>
      </div>
      <p className="relative mt-3 text-[11px] text-slate-500">{detail}</p>
    </ShellCard>
  );
}

export const OwnerDashboardClient: FC<Props> = (props) => {
  const [apiData, setApiData] = useState<OwnerDashboardData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/owner/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: OwnerDashboardApiResponse) => {
        if (active && json.ok && json.data) setApiData(json.data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const raw = apiData ?? props;
  const data: OwnerDashboardData = {
    bookings: Array.isArray(raw.bookings) ? raw.bookings : [],
    reminders: Array.isArray(raw.reminders) ? raw.reminders : [],
    leadEvents: Array.isArray(raw.leadEvents) ? raw.leadEvents : [],
    kpis: raw.kpis ?? { activeLeads: 0, upcomingWalkthroughs: 0, openFollowups: 0, completedJobs: 0 },
  };

  const pipelineValue = useMemo(
    () => data.bookings.reduce((sum, booking) => sum + (booking.roughHigh ?? booking.roughLow ?? 0), 0),
    [data.bookings]
  );

  const filteredBookings = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.bookings
      .filter((booking) => !q || booking.customerName.toLowerCase().includes(q) || booking.customerEmail?.toLowerCase().includes(q))
      .slice()
      .sort((a, b) => (b.scheduledForISO ? new Date(b.scheduledForISO).getTime() : 0) - (a.scheduledForISO ? new Date(a.scheduledForISO).getTime() : 0));
  }, [data.bookings, query]);

  const todayBookings = data.bookings.filter((booking) => isToday(booking.scheduledForISO)).slice(0, 4);
  const recentEvents = data.leadEvents
    .slice()
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 6);

  const reminderGroups = [
    { label: "Due Today", count: data.reminders.filter((r) => r.bucket === "today").length, tone: "text-rose-300 bg-rose-500/10 border-rose-400/20" },
    { label: "This Week", count: data.reminders.filter((r) => r.bucket === "week").length, tone: "text-amber-300 bg-amber-500/10 border-amber-400/20" },
    { label: "Overdue", count: data.reminders.filter((r) => r.bucket === "overdue").length, tone: "text-orange-300 bg-orange-500/10 border-orange-400/20" },
  ];

  const pipeline = [
    { label: "New", value: data.bookings.filter((b) => b.status === "new").length, cls: "bg-blue-500" },
    { label: "Scheduled", value: data.bookings.filter((b) => b.status === "scheduled").length, cls: "bg-cyan-400" },
    { label: "Follow-Up", value: data.bookings.filter((b) => b.status === "followup").length, cls: "bg-violet-500" },
    { label: "Completed", value: data.bookings.filter((b) => b.status === "completed").length, cls: "bg-emerald-500" },
  ];
  const pipelineTotal = Math.max(1, pipeline.reduce((sum, item) => sum + item.value, 0));

  return (
    <main className="min-h-screen bg-[#020713] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,132,255,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,.09),transparent_28%),linear-gradient(rgba(15,34,58,.17)_1px,transparent_1px),linear-gradient(90deg,rgba(15,34,58,.17)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] border-r border-cyan-400/10 bg-[#03101f]/95 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
        <Brand />
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            item.live ? (
              <Link key={item.label} href={item.href!} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${item.label === "Dashboard" ? "border border-blue-400/20 bg-blue-500/15 text-white shadow-[0_0_24px_rgba(37,99,235,.15)]" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ) : (
              <div key={item.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500">
                <item.icon className="h-4 w-4" /> {item.label}<span className="ml-auto text-[9px] uppercase tracking-wider text-slate-700">Soon</span>
              </div>
            )
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-3">
            <div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300"><Sparkles className="h-4 w-4" /></div><div><p className="text-xs font-semibold text-white">SmartNET Admin</p><p className="text-[10px] text-cyan-400">Owner</p></div></div>
          </div>
          <OwnerLogoutButton className="w-full justify-start rounded-xl border-slate-800 bg-transparent text-xs text-slate-500 hover:bg-rose-500/10 hover:text-rose-300" variant="outline" next="/owner/access" />
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} className="relative h-full w-[82%] max-w-[290px] border-r border-cyan-400/15 bg-[#03101f] p-5 shadow-2xl">
            <div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}><X className="h-5 w-5" /></Button></div>
            <nav className="mt-8 space-y-2">{navItems.map((item) => item.live ? <Link key={item.label} href={item.href!} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 text-sm text-slate-200"><item.icon className="h-4 w-4 text-cyan-400" />{item.label}</Link> : <div key={item.label} className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600"><item.icon className="h-4 w-4" />{item.label}<span className="ml-auto text-[9px]">SOON</span></div>)}</nav>
          </motion.aside>
        </div>
      )}

      <section className="relative min-h-screen lg:ml-[230px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cyan-400/10 bg-[#020713]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden"><Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} className="text-slate-300"><Menu className="h-5 w-5" /></Button><Brand compact /></div>
          <div className="hidden lg:block"><p className="text-sm font-semibold text-white">SmartNET Command Center</p><p className="text-[10px] text-slate-500">Owner operations console</p></div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] text-emerald-300 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" />Systems Operational</div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-slate-400"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-400" /></button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-5 px-3 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-500">Operations Overview</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Welcome back, SmartNET Admin <span aria-hidden>👋</span></h1><p className="mt-1 text-xs text-slate-500 sm:text-sm">Here&apos;s what is happening across your business right now.</p></div>
            <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/[0.04] px-3 py-2 text-[10px] text-slate-400"><span className="text-cyan-300">LIVE</span> · Sanity synced</div>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
            <MetricCard label="Active Leads" value={data.kpis.activeLeads} detail="Current open opportunities" accent="bg-blue-500/25" icon={<Users className="h-5 w-5 text-blue-300" />} />
            <MetricCard label="Walkthroughs" value={data.kpis.upcomingWalkthroughs} detail="Upcoming site visits" accent="bg-cyan-400/25" icon={<CalendarDays className="h-5 w-5 text-cyan-300" />} />
            <MetricCard label="Follow-Ups" value={data.kpis.openFollowups} detail="Open follow-up actions" accent="bg-violet-500/25" icon={<Clock3 className="h-5 w-5 text-violet-300" />} />
            <MetricCard label="Completed" value={data.kpis.completedJobs} detail="Closed jobs recorded" accent="bg-emerald-500/25" icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />} />
            <div className="col-span-2 xl:col-span-1"><MetricCard label="Pipeline Value" value={money(pipelineValue)} detail="Upper rough-estimate total" accent="bg-amber-400/25" icon={<CircleDollarSign className="h-5 w-5 text-amber-300" />} /></div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.25fr_.85fr_.8fr]">
            <ShellCard className="p-4 sm:p-5">
              <SectionTitle title="Business Overview" subtitle="Lead and estimate momentum" icon={<Activity className="h-4 w-4 text-blue-300" />} />
              <div className="mt-6 h-44 rounded-xl border border-blue-400/10 bg-[linear-gradient(180deg,rgba(20,60,120,.10),transparent)] p-3 sm:h-52">
                <svg viewBox="0 0 600 180" className="h-full w-full" role="img" aria-label="Pipeline activity chart">
                  {[30,60,90,120,150].map((y) => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(148,163,184,.12)" strokeWidth="1" />)}
                  <polyline fill="none" stroke="rgb(59,130,246)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points="0,145 55,132 105,115 160,121 215,92 270,102 325,74 380,82 435,55 490,63 545,31 600,38" />
                  <polyline fill="none" stroke="rgb(34,211,238)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="0,157 55,148 105,150 160,136 215,142 270,119 325,126 380,103 435,112 490,90 545,96 600,72" />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center"><MiniStat label="Bookings" value={data.bookings.length} /><MiniStat label="Pipeline" value={money(pipelineValue)} /><MiniStat label="Completion" value={`${Math.round((data.kpis.completedJobs / Math.max(1, data.bookings.length)) * 100)}%`} /></div>
            </ShellCard>

            <ShellCard className="p-4 sm:p-5">
              <SectionTitle title="Pipeline by Stage" subtitle={`${data.bookings.length} total booking records`} icon={<Network className="h-4 w-4 text-cyan-300" />} />
              <div className="mt-6 flex items-center gap-5">
                <div className="relative h-28 w-28 shrink-0 rounded-full" style={{ background: `conic-gradient(#3b82f6 0 28%,#22d3ee 28% 58%,#8b5cf6 58% 78%,#10b981 78% 100%)` }}><div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-[#071426]"><span className="text-2xl font-semibold text-white">{data.bookings.length}</span><span className="text-[9px] uppercase tracking-widest text-slate-500">Leads</span></div></div>
                <div className="min-w-0 flex-1 space-y-2.5">{pipeline.map((stage) => <div key={stage.label} className="flex items-center gap-2 text-[11px]"><span className={`h-2 w-2 rounded-full ${stage.cls}`} /><span className="min-w-0 flex-1 truncate text-slate-400">{stage.label}</span><span className="font-medium text-white">{stage.value}</span><span className="w-9 text-right text-slate-600">{Math.round((stage.value / pipelineTotal) * 100)}%</span></div>)}</div>
              </div>
            </ShellCard>

            <ShellCard className="p-4 sm:p-5">
              <SectionTitle title="Today&apos;s Schedule" subtitle="Walkthroughs and follow-ups" icon={<CalendarDays className="h-4 w-4 text-violet-300" />} />
              <div className="mt-4 space-y-2">{todayBookings.length ? todayBookings.map((booking) => <Link href={`/owner/booking/${booking.id}`} key={booking.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 transition hover:border-cyan-400/20 hover:bg-cyan-500/[0.04]"><div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[10px] font-semibold text-blue-300">{new Date(booking.scheduledForISO!).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-white">{booking.customerName}</p><p className="truncate text-[10px] text-slate-500">{booking.bookingType === "followup" ? "Follow-Up" : "Initial Walkthrough"}</p></div><ChevronRight className="h-4 w-4 text-slate-700" /></Link>) : <EmptyState text="No walkthroughs scheduled for today." />}</div>
            </ShellCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.45fr_.7fr_.75fr]">
            <ShellCard className="overflow-hidden">
              <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><SectionTitle title="Recent Leads" subtitle="Newest booking activity" icon={<Zap className="h-4 w-4 text-blue-300" />} /><div className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/10 px-3"><Search className="h-3.5 w-3.5 text-slate-600" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customer" className="h-9 border-0 bg-transparent p-0 text-xs focus-visible:ring-0" /></div></div>
              <div className="divide-y divide-white/5">{filteredBookings.slice(0, 6).map((booking) => <Link href={`/owner/booking/${booking.id}`} key={booking.id} className="grid gap-2 p-4 transition hover:bg-blue-500/[0.035] sm:grid-cols-[1.4fr_.9fr_.8fr_auto] sm:items-center"><div className="min-w-0"><p className="truncate text-sm font-medium text-white">{booking.customerName}</p><p className="truncate text-[10px] text-slate-500">{booking.customerEmail || "No email"}</p></div><div className="text-[11px] text-slate-400"><span className="sm:hidden">Estimate · </span>{booking.roughLow || booking.roughHigh ? `${money(booking.roughLow ?? 0)} – ${money(booking.roughHigh ?? booking.roughLow ?? 0)}` : "No estimate"}</div><div><span className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${statusAccent[booking.status]}`}>{booking.status}</span></div><div className="flex items-center justify-between text-[10px] text-slate-600 sm:block sm:text-right"><span>{formatDateTime(booking.scheduledForISO)}</span><ArrowRight className="h-3.5 w-3.5 sm:ml-auto sm:mt-1" /></div></Link>)}</div>
            </ShellCard>

            <ShellCard className="p-4 sm:p-5"><SectionTitle title="Reminders & Tasks" subtitle="What needs attention" icon={<Clock3 className="h-4 w-4 text-amber-300" />} /><div className="mt-4 space-y-2">{reminderGroups.map((group) => <div key={group.label} className={`flex items-center justify-between rounded-xl border px-3 py-3 ${group.tone}`}><span className="text-xs font-medium">{group.label}</span><span className="text-sm font-semibold">{group.count}</span></div>)}<div className="mt-4 border-t border-white/5 pt-3 text-[10px] text-slate-600">{data.reminders.length} total active reminders</div></div></ShellCard>

            <ShellCard className="p-4 sm:p-5"><SectionTitle title="Recent Activity" subtitle="Latest lead events" icon={<Activity className="h-4 w-4 text-emerald-300" />} /><div className="mt-4 space-y-3">{recentEvents.length ? recentEvents.map((event) => <div key={event.id} className="relative flex gap-3 pl-1"><div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10"><Zap className="h-3 w-3 text-blue-300" /></div><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-medium text-slate-200">{eventLabel(event.eventType)}</p><p className="truncate text-[10px] text-slate-500">{event.customerName}</p></div><span className="text-[9px] text-slate-700">{new Date(event.occurredAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></div>) : <EmptyState text="No recent activity yet." />}</div></ShellCard>
          </div>

          <footer className="py-5 text-center"><div className="inline-flex items-center gap-2 text-sm font-semibold text-white"><span className="text-blue-400">SmartNET</span><span className="text-slate-700">•</span><span className="text-[9px] font-normal uppercase tracking-[0.26em] text-slate-600">AI Powered. Human Approved.</span></div></footer>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-cyan-400/10 bg-[#03101f]/95 px-2 pb-[max(env(safe-area-inset-bottom),.5rem)] pt-2 backdrop-blur-xl lg:hidden">
          {[{ label: "Home", icon: LayoutDashboard, href: "/owner/dashboard" },{ label: "Calendar", icon: CalendarDays, href: "/owner/dashboard/calendar" },{ label: "Leads", icon: Users, href: "/owner/dashboard" },{ label: "More", icon: Menu, href: "/owner/dashboard" }].map((item) => <Link key={item.label} href={item.href} onClick={() => item.label === "More" && setMenuOpen(true)} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[9px] ${item.label === "Home" ? "text-cyan-300" : "text-slate-600"}`}><item.icon className="h-4 w-4" />{item.label}</Link>)}
        </nav>
      </section>
    </main>
  );
};

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-2.5"><div className={`${compact ? "h-8 w-8" : "h-10 w-10"} flex items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,.24)]`}><Network className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-cyan-300`} /></div><div><p className={`${compact ? "text-sm" : "text-lg"} font-semibold tracking-tight text-white`}>Smart<span className="text-blue-400">NET</span></p>{!compact && <p className="text-[8px] font-medium uppercase tracking-[0.32em] text-slate-600">Owner Console</p>}</div></div>;
}

function SectionTitle({ title, subtitle, icon }: { title: string; subtitle: string; icon: ReactNode }) {
  return <div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03]">{icon}</div><div><h2 className="text-sm font-semibold text-white">{title}</h2><p className="text-[10px] text-slate-600">{subtitle}</p></div></div>;
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-xl border border-white/5 bg-white/[0.025] px-2 py-3"><p className="text-[9px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 truncate text-sm font-semibold text-slate-200">{value}</p></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-[11px] text-slate-600">{text}</div>;
}

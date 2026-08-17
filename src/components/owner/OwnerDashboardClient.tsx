"use client";

import type { FC } from "react";
import Link from "next/link";
import { BarChart3, BriefcaseBusiness, CalendarDays, FileText, LayoutDashboard, Network, ShieldCheck, Users, UserRoundSearch } from "lucide-react";
import { OwnerLogoutButton } from "../../app/owner/access/OwnerLogoutButton";
import type { OwnerDashboardData } from "@/app/owner/dashboard/page";

type Props = OwnerDashboardData;

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/owner/dashboard" },
  { label: "Calendar", icon: CalendarDays, href: "/owner/dashboard/calendar" },
  { label: "Leads", icon: UserRoundSearch, href: "#leads" },
  { label: "Walkthroughs", icon: ShieldCheck, href: "/owner/walkthroughs" },
  { label: "Jobs", icon: BriefcaseBusiness, href: "/owner/jobs" },
  { label: "Quotes", icon: FileText, href: "/owner/quotes" },
  { label: "Customers", icon: Users },
  { label: "Reports", icon: BarChart3 },
];

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const OwnerDashboardClient: FC<Props> = (data) => {
  const pipelineValue = data.bookings.reduce((sum, booking) => sum + (booking.roughHigh ?? booking.roughLow ?? 0), 0);

  return (
    <main className="min-h-screen bg-[#020713] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,132,255,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,.09),transparent_28%),linear-gradient(rgba(15,34,58,.17)_1px,transparent_1px),linear-gradient(90deg,rgba(15,34,58,.17)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] border-r border-cyan-400/10 bg-[#03101f]/95 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
        <Brand />
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => href ? (
            <Link key={label} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-400 transition hover:bg-blue-500/10 hover:text-cyan-200">
              <Icon className="h-4 w-4" />{label}
            </Link>
          ) : (
            <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-700">
              <Icon className="h-4 w-4" />{label}
            </div>
          ))}
        </nav>
        <div className="mt-auto"><OwnerLogoutButton className="w-full justify-start rounded-xl border-slate-800 bg-transparent text-xs text-slate-500" variant="outline" next="/owner/access" /></div>
      </aside>

      <section className="relative min-h-screen lg:ml-[230px]">
        <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-[#020713]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <Brand />
            <span className="rounded-full border border-emerald-400/15 bg-emerald-500/[.06] px-3 py-1.5 text-[10px] text-emerald-300">● Systems Operational</span>
          </div>
        </header>

        <div className="relative mx-auto max-w-[1500px] space-y-5 px-3 pb-24 pt-5 sm:px-6 lg:px-8">
          <div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-cyan-500">Operations Overview</p><h1 className="mt-1 text-2xl font-semibold sm:text-3xl">SmartNET Command Center</h1><p className="mt-1 text-xs text-slate-500">Live pipeline, walkthrough, and lead activity.</p></div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
            <Metric label="Active Leads" value={String(data.kpis.activeLeads)} />
            <Metric label="Walkthroughs" value={String(data.kpis.upcomingWalkthroughs)} />
            <Metric label="Follow-Ups" value={String(data.kpis.openFollowups)} />
            <Metric label="Completed" value={String(data.kpis.completedJobs)} />
            <div className="col-span-2 xl:col-span-1"><Metric label="Pipeline Value" value={money(pipelineValue)} /></div>
          </div>

          <section id="leads" className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.95),rgba(3,10,24,.97))]">
            <div className="border-b border-white/5 p-5"><h2 className="text-sm font-semibold">Recent Leads</h2><p className="mt-1 text-[10px] text-slate-600">CRM lives inside your Command Center</p></div>
            <div className="divide-y divide-white/5">
              {data.bookings.length ? data.bookings.map((booking) => (
                <Link key={booking.id} href={`/owner/booking/${booking.id}`} className="grid gap-2 p-4 transition hover:bg-blue-500/[.035] sm:grid-cols-[1.4fr_1fr_.7fr] sm:items-center">
                  <div><p className="text-sm font-medium">{booking.customerName}</p><p className="text-[10px] text-slate-500">{booking.customerEmail || "No email"}</p></div>
                  <p className="text-xs text-slate-400">{booking.roughLow || booking.roughHigh ? `${money(booking.roughLow ?? 0)} – ${money(booking.roughHigh ?? booking.roughLow ?? 0)}` : "No estimate"}</p>
                  <span className="w-fit rounded-full border border-cyan-400/15 bg-cyan-500/[.06] px-2 py-1 text-[9px] font-semibold uppercase text-cyan-300">{booking.status}</span>
                </Link>
              )) : <div className="p-10 text-center text-xs text-slate-600">No leads yet.</div>}
            </div>
          </section>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-cyan-400/10 bg-[#03101f]/95 px-1 py-2 backdrop-blur-xl lg:hidden">
          {navItems.slice(0,5).map(({ label, icon: Icon, href }) => href ? <Link key={label} href={href} className="flex flex-col items-center gap-1 py-1 text-[9px] text-slate-400"><Icon className="h-4 w-4" />{label}</Link> : null)}
        </nav>
      </section>
    </main>
  );
};

function Brand() { return <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10"><Network className="h-4 w-4 text-cyan-300" /></div><div><p className="text-sm font-semibold">Smart<span className="text-blue-400">NET</span></p><p className="text-[9px] uppercase tracking-[.24em] text-slate-600">Owner Console</p></div></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.95),rgba(3,10,24,.97))] p-4"><p className="text-[9px] uppercase tracking-[.16em] text-slate-600">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>; }

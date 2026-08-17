"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Filter,
  LayoutDashboard,
  Mail,
  Menu,
  Network,
  Phone,
  Search,
  UserRoundSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OwnerLogoutButton } from "@/app/owner/access/OwnerLogoutButton";

export type LeadStatus = "new" | "scheduled" | "followup" | "completed";

export type OwnerLead = {
  id: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  status: LeadStatus;
  bookingType: "initial" | "followup";
  roughLow: number | null;
  roughHigh: number | null;
  scheduledForISO: string | null;
  followupForISO: string | null;
  createdAt: string | null;
};

type Props = {
  leads: OwnerLead[];
};

const statusStyles: Record<LeadStatus, string> = {
  new: "border-blue-400/25 bg-blue-500/10 text-blue-300",
  scheduled: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
  followup: "border-violet-400/25 bg-violet-500/10 text-violet-300",
  completed: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
};

const navItems = [
  { label: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
  { label: "Calendar", href: "/owner/dashboard/calendar", icon: CalendarDays },
  { label: "Leads", href: "/owner/leads", icon: UserRoundSearch },
];

function money(value: number | null) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ageLabel(value: string | null) {
  if (!value) return "Unknown";
  const created = new Date(value).getTime();
  if (!Number.isFinite(created)) return "Unknown";
  const days = Math.max(0, Math.floor((Date.now() - created) / 86_400_000));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function OwnerLeadsClient({ leads }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery =
        !q ||
        lead.customerName.toLowerCase().includes(q) ||
        lead.customerEmail?.toLowerCase().includes(q) ||
        lead.customerPhone?.toLowerCase().includes(q);
      const matchesStatus = status === "all" || lead.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [leads, query, status]);

  const active = leads.filter((lead) => lead.status !== "completed").length;
  const followups = leads.filter((lead) => lead.status === "followup").length;
  const scheduled = leads.filter((lead) => lead.status === "scheduled").length;
  const pipeline = leads.reduce((sum, lead) => sum + (lead.roughHigh ?? lead.roughLow ?? 0), 0);

  return (
    <main className="min-h-screen bg-[#020713] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,132,255,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,.09),transparent_28%),linear-gradient(rgba(15,34,58,.17)_1px,transparent_1px),linear-gradient(90deg,rgba(15,34,58,.17)_1px,transparent_1px)] bg-[size:auto,auto,40px_40px,40px_40px]" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[230px] border-r border-cyan-400/10 bg-[#03101f]/95 px-4 py-6 backdrop-blur-xl lg:flex lg:flex-col">
        <Brand />
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                item.label === "Leads"
                  ? "border border-blue-400/20 bg-blue-500/15 text-white shadow-[0_0_24px_rgba(37,99,235,.15)]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-3 text-xs text-slate-400">
            CRM records are synced from live Sanity walkthrough bookings.
          </div>
          <OwnerLogoutButton
            className="w-full justify-start rounded-xl border-slate-800 bg-transparent text-xs text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
            variant="outline"
            next="/owner/access"
          />
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <aside className="relative h-full w-[82%] max-w-[290px] border-r border-cyan-400/15 bg-[#03101f] p-5 shadow-2xl">
            <Brand />
            <nav className="mt-8 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 text-sm text-slate-200"
                >
                  <item.icon className="h-4 w-4 text-cyan-400" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <section className="relative min-h-screen lg:ml-[230px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cyan-400/10 bg-[#020713]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} className="text-slate-300">
              <Menu className="h-5 w-5" />
            </Button>
            <Brand compact />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-white">SmartNET Command Center</p>
            <p className="text-[10px] text-slate-500">Lead pipeline and customer intake</p>
          </div>
          <div className="rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] text-emerald-300">
            LIVE · Sanity synced
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-5 px-3 pb-20 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-500">CRM Pipeline</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Leads</h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Every estimate customer, walkthrough, and follow-up in one operating view.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <Metric label="Active Leads" value={String(active)} />
            <Metric label="Scheduled" value={String(scheduled)} />
            <Metric label="Follow-Ups" value={String(followups)} />
            <Metric label="Pipeline Value" value={money(pipeline)} />
          </div>

          <div className="rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] shadow-[0_18px_70px_rgba(0,0,0,.32)]">
            <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-sm font-semibold text-white">Lead Pipeline</p>
                <p className="text-[10px] text-slate-500">{filtered.length} of {leads.length} records</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/10 px-3">
                  <Search className="h-3.5 w-3.5 text-slate-600" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, email, phone"
                    className="h-10 min-w-[220px] border-0 bg-transparent p-0 text-xs focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/10 px-3">
                  <Filter className="h-3.5 w-3.5 text-slate-600" />
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value as "all" | LeadStatus)}
                    className="h-10 bg-transparent text-xs text-slate-300 outline-none"
                  >
                    <option value="all" className="bg-slate-950">All statuses</option>
                    <option value="new" className="bg-slate-950">New</option>
                    <option value="scheduled" className="bg-slate-950">Scheduled</option>
                    <option value="followup" className="bg-slate-950">Follow-Up</option>
                    <option value="completed" className="bg-slate-950">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="hidden grid-cols-[1.2fr_.9fr_.8fr_.85fr_.75fr_auto] gap-3 border-b border-white/5 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600 md:grid">
              <span>Customer</span><span>Estimate</span><span>Status</span><span>Walkthrough</span><span>Last Activity</span><span />
            </div>

            <div className="divide-y divide-white/5">
              {filtered.length ? (
                filtered.map((lead) => (
                  <Link
                    href={`/owner/booking/${lead.id}`}
                    key={lead.id}
                    className="block p-4 transition hover:bg-blue-500/[0.035] sm:p-5"
                  >
                    <div className="grid gap-3 md:grid-cols-[1.2fr_.9fr_.8fr_.85fr_.75fr_auto] md:items-center">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{lead.customerName}</p>
                        <div className="mt-1 space-y-1 text-[10px] text-slate-500">
                          {lead.customerEmail && <p className="flex items-center gap-1.5 truncate"><Mail className="h-3 w-3" />{lead.customerEmail}</p>}
                          {lead.customerPhone && <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{lead.customerPhone}</p>}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-600 md:hidden">Estimate</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-300 md:mt-0"><CircleDollarSign className="h-3.5 w-3.5 text-amber-300" />{lead.roughLow != null || lead.roughHigh != null ? `${money(lead.roughLow ?? 0)} – ${money(lead.roughHigh ?? lead.roughLow)}` : "No estimate"}</p>
                      </div>
                      <div>
                        <span className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-wide ${statusStyles[lead.status]}`}>
                          {lead.status === "followup" ? "Follow-Up" : lead.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <p className="md:hidden text-[9px] uppercase tracking-wider text-slate-600">Walkthrough</p>
                        <p className="mt-1 md:mt-0">{formatDate(lead.followupForISO || lead.scheduledForISO)}</p>
                      </div>
                      <div className="text-[10px] text-slate-500">{ageLabel(lead.createdAt)}</div>
                      <div className="flex items-center justify-between gap-2 text-[10px] font-medium text-cyan-300 md:justify-end">
                        <span>Open Lead</span><ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-10 text-center text-xs text-slate-500">No leads match those filters.</div>
              )}
            </div>
          </div>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-cyan-400/10 bg-[#03101f]/95 px-2 pb-[max(env(safe-area-inset-bottom),.5rem)] pt-2 backdrop-blur-xl lg:hidden">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[9px] ${item.label === "Leads" ? "text-cyan-300" : "text-slate-600"}`}>
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-[linear-gradient(145deg,rgba(8,18,36,.94),rgba(3,10,24,.96))] p-4 shadow-[0_18px_70px_rgba(0,0,0,.22)] sm:p-5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">{value}</p>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${compact ? "h-8 w-8" : "h-10 w-10"} flex items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,.24)]`}>
        <Network className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-cyan-300`} />
      </div>
      <div>
        <p className={`${compact ? "text-sm" : "text-lg"} font-semibold tracking-tight text-white`}>SmartNET</p>
        {!compact && <p className="text-[9px] uppercase tracking-[0.24em] text-slate-600">Command Center</p>}
      </div>
    </div>
  );
}

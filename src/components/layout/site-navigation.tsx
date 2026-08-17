"use client";

import * as React from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";

const navItems = [
  { label: "AI Estimate", href: "#smartnet-generator" },
  { label: "Book", href: "#booking-calendar" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#project-types" },
  { label: "Results", href: "#field-results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const BUSINESS_PHONE_DISPLAY = "(470) 226-7705";
const BUSINESS_PHONE_HREF = "tel:+14702267705";

export function SiteNavigation() {
  const [open, setOpen] = React.useState(false);

  const goTo = React.useCallback((href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header className="sticky top-0 z-[80] border-b border-sky-400/10 bg-[#020617]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => goTo("#top")} className="group flex shrink-0 items-center gap-2 text-left" aria-label="SmartNET home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky-400/25 bg-sky-400/10 shadow-[0_0_28px_rgba(56,189,248,.12)]">
            <Sparkles className="h-4 w-4 text-sky-300" />
          </span>
          <span>
            <span className="block text-sm font-black tracking-[0.14em] text-white">SMARTNET</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-sky-300/70 sm:block">Installation LLC</span>
          </span>
        </button>

        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => goTo(item.href)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-3">
          <a href={BUSINESS_PHONE_HREF} className="hidden items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200 transition hover:border-emerald-300/45 hover:bg-emerald-400/15 sm:flex" aria-label={`Call SmartNET at ${BUSINESS_PHONE_DISPLAY}`}>
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">{BUSINESS_PHONE_DISPLAY}</span>
            <span className="lg:hidden">Call</span>
          </a>
          <button onClick={() => goTo("#smartnet-generator")} className="hidden rounded-xl bg-sky-400 px-4 py-2 text-xs font-black text-slate-950 shadow-[0_0_24px_rgba(56,189,248,.2)] transition hover:bg-sky-300 md:block">
            Start AI Estimate
          </button>
          <button onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white xl:hidden" aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#020617]/98 px-4 py-4 shadow-2xl xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => goTo(item.href)} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:border-sky-400/20 hover:bg-sky-400/5">
                {item.label}
              </button>
            ))}
            <a href={BUSINESS_PHONE_HREF} className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 sm:col-span-2">
              <Phone className="h-4 w-4" /> Call SmartNET · {BUSINESS_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

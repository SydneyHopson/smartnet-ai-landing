"use client";

import * as React from "react";
import { Menu, Phone, X } from "lucide-react";

const navItems = [
  { label: "AI Estimate", href: "#smartnet-generator" },
  { label: "Book", href: "#booking-calendar" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#project-types" },
  { label: "Results", href: "#field-results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const BUSINESS_PHONE_DISPLAY = "(404) 966-5499";
const BUSINESS_PHONE_HREF = "tel:+14049665499";

export function SiteNavigation() {
  const [open, setOpen] = React.useState(false);

  const goTo = React.useCallback((href: string) => {
    setOpen(false);
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      const navOffset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <header className="sticky top-0 z-[80] border-b border-sky-400/10 bg-[#020617]/88 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center gap-4 pl-3 pr-4 sm:pl-4 sm:pr-6 lg:pl-5 lg:pr-8">
        <button onClick={() => goTo("#top")} className="group flex shrink-0 items-center text-left" aria-label="SmartNET home">
          <span className="text-lg font-black tracking-tight text-white sm:text-xl">Smart<span className="text-sky-400">NET</span></span>
          <span className="ml-2 hidden text-[0.58rem] font-bold uppercase tracking-[0.16em] text-slate-500 sm:inline">Installation LLC</span>
        </button>

        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => goTo(item.href)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white">{item.label}</button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-3">
          <a href={BUSINESS_PHONE_HREF} className="hidden items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200 transition hover:border-emerald-300/45 hover:bg-emerald-400/15 sm:flex" aria-label={`Call SmartNET at ${BUSINESS_PHONE_DISPLAY}`}>
            <Phone className="h-3.5 w-3.5" /><span className="hidden lg:inline">{BUSINESS_PHONE_DISPLAY}</span><span className="lg:hidden">Call</span>
          </a>
          <button type="button" onClick={() => goTo("#smartnet-generator")} className="hidden rounded-xl bg-sky-400 px-4 py-2 text-xs font-black text-slate-950 shadow-[0_0_24px_rgba(56,189,248,.2)] transition hover:bg-sky-300 md:block">Start AI Estimate</button>
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white xl:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#020617]/98 px-4 py-4 shadow-2xl xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => goTo(item.href)} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:border-sky-400/20 hover:bg-sky-400/5">{item.label}</button>
            ))}
            <a href={BUSINESS_PHONE_HREF} className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 sm:col-span-2"><Phone className="h-4 w-4" /> Call SmartNET · {BUSINESS_PHONE_DISPLAY}</a>
          </div>
        </div>
      )}
    </header>
  );
}

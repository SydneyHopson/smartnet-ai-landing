"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Navigation, Radar } from "lucide-react";

const cities = ["Atlanta", "Douglasville", "Lithia Springs", "Austell", "Mableton", "Smyrna", "Marietta"];

export function ServiceAreaSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(37,99,235,.17),transparent_30rem),radial-gradient(circle_at_10%_15%,rgba(14,165,233,.06),transparent_24rem)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Service area</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Metro Atlanta first. Larger projects reviewed case by case.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">Keeping core work local helps SmartNET stay responsive for walkthroughs, installation, support and future expansion.</p>
          <div className="mt-7 flex flex-wrap gap-2">{cities.map((city) => <span key={city} className="rounded-full border border-sky-400/15 bg-sky-400/[.06] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-sky-400/30 hover:bg-sky-400/10">{city}</span>)}</div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="group rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-4 transition hover:border-sky-400/25 hover:bg-sky-400/[.035]"><Navigation className="h-5 w-5 text-sky-300" /><p className="mt-3 text-sm font-semibold text-white">Residential & commercial</p><p className="mt-1 text-xs leading-5 text-slate-500">Homes, offices, retail and light industrial projects.</p></div>
            <div className="group rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-4 transition hover:border-sky-400/25 hover:bg-sky-400/[.035]"><Building2 className="h-5 w-5 text-sky-300" /><p className="mt-3 text-sm font-semibold text-white">Multi-site review</p><p className="mt-1 text-xs leading-5 text-slate-500">Larger and out-of-area opportunities can be scoped separately.</p></div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative min-h-[420px] overflow-hidden rounded-3xl border border-sky-400/20 bg-[linear-gradient(145deg,rgba(8,17,34,.98),rgba(2,6,23,.96))] p-6 shadow-[0_28px_90px_rgba(2,6,23,.45)]">
          <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(56,189,248,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.6)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.10),transparent_42%)]" />
          <div className="relative flex items-center justify-between"><div><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">SmartNET coverage zone</p><p className="mt-1 text-sm text-slate-400">Local-first service footprint</p></div><Radar className="h-5 w-5 text-sky-300" /></div>
          <div className="relative mt-8 flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute h-64 w-64 rounded-full border border-dashed border-sky-400/15" />
            <div className="absolute h-64 w-64 rounded-full border border-sky-400/15" /><div className="absolute h-44 w-44 rounded-full border border-sky-400/25" /><div className="absolute h-24 w-24 rounded-full border border-sky-400/40 bg-sky-400/[.04]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute h-64 w-64 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_325deg,rgba(56,189,248,.16)_355deg,transparent_360deg)]" />
            <div className="absolute h-px w-[85%] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" /><div className="absolute h-[85%] w-px bg-gradient-to-b from-transparent via-sky-400/30 to-transparent" />
            <span className="absolute left-[24%] top-[28%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,.9)]"/><span className="absolute bottom-[25%] right-[24%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,.9)]"/>
            <div className="relative z-10 flex flex-col items-center"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-300/40 bg-blue-600/20 text-sky-200 shadow-[0_0_36px_rgba(37,99,235,.35)]"><MapPin className="h-6 w-6" /></span><span className="mt-3 rounded-full border border-sky-400/20 bg-[#020617]/90 px-3 py-1 text-xs font-bold text-white">Atlanta</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Building2, Home, Warehouse } from "lucide-react";

const tiers = [
  { icon: Home, label: "Residential", title: "Smart home coverage", range: "Preliminary range after AI discovery", body: "Cameras, Wi-Fi improvements, clean routing and setup sized to the home and actual coverage goals." },
  { icon: Building2, label: "Business", title: "Commercial systems", range: "Scoped around site complexity", body: "Interior/exterior coverage, network improvements and access-control options for customer-facing and staff spaces.", featured: true },
  { icon: Warehouse, label: "Larger sites", title: "Warehouse & perimeter", range: "Custom project range", body: "Longer runs, high mounting, larger camera counts, racks and network infrastructure planned around the site." },
];

export function PricingPreviewSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,.11),transparent_32rem)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[52%] h-[22rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-sky-400/[.06]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Planning ranges</p><h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Pricing starts with scope, not a package sticker.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">The AI estimator creates a preliminary investment range from the project details you provide. The walkthrough verifies pathways, mounting conditions, quantities and final equipment before a proposal is approved.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.article key={tier.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} whileHover={{ y: -5 }} className={`group relative min-h-[300px] overflow-hidden rounded-2xl border p-6 ${tier.featured ? "border-sky-400/35 bg-[radial-gradient(circle_at_top,rgba(37,99,235,.20),rgba(7,16,31,.97)_48%)] shadow-[0_0_65px_rgba(37,99,235,.14)]" : "border-sky-400/15 bg-[#07101f]/92"}`}>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                <div className="pointer-events-none absolute -right-16 bottom-[-5rem] h-48 w-48 rounded-full border border-sky-400/[.08] transition duration-500 group-hover:scale-110" />
                {tier.featured && <span className="absolute right-4 top-4 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.16em] text-sky-200 shadow-[0_0_20px_rgba(56,189,248,.08)]">Common starting point</span>}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300"><Icon className="h-5 w-5" /></span>
                <div className="relative mt-8"><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300/80">{tier.label}</p><h3 className="mt-2 text-2xl font-bold text-white">{tier.title}</h3><p className="mt-4 text-sm font-semibold text-sky-200">{tier.range}</p><p className="mt-3 text-sm leading-6 text-slate-400">{tier.body}</p></div>
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07101f]/70 px-5 py-4 text-center text-sm text-slate-400"><div className="pointer-events-none absolute inset-y-0 left-1/2 w-64 -translate-x-1/2 bg-sky-400/[.025] blur-2xl"/>We’ll replace generic planning ranges with the estimator’s real project calculation once discovery is complete.</div>
      </div>
    </section>
  );
}

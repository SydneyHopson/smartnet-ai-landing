"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Home, Warehouse } from "lucide-react";

const tiers = [
  { icon: Home, label: "Residential", title: "Smart home coverage", range: "Preliminary range after AI discovery", body: "Cameras, Wi-Fi improvements, clean routing and setup sized to the home and actual coverage goals.", image: "/styling/images/residential-security-solutions.png" },
  { icon: Building2, label: "Business", title: "Commercial systems", range: "Scoped around site complexity", body: "Interior/exterior coverage, network improvements and access-control options for customer-facing and staff spaces.", featured: true, image: "/styling/images/commercial-security-solutions.png" },
  { icon: Warehouse, label: "Larger sites", title: "Warehouse & perimeter", range: "Custom project range", body: "Longer runs, high mounting, larger camera counts, racks and network infrastructure planned around the site.", image: "/styling/images/warehouse-larger-site-solutions.png" },
];

export function PricingPreviewSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,.13),transparent_32rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Planning ranges</p><h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Pricing starts with scope, not a package sticker.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">The AI estimator creates a preliminary investment range from the project details you provide. The walkthrough verifies pathways, mounting conditions, quantities and final equipment before a proposal is approved.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.article key={tier.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} whileHover={{ y: -7 }} className={`group relative min-h-[390px] overflow-hidden rounded-2xl border ${tier.featured ? "border-sky-300/40 shadow-[0_0_70px_rgba(37,99,235,.18)]" : "border-sky-400/15"}`}>
                <Image src={tier.image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover object-center opacity-45 saturate-90 transition duration-700 group-hover:scale-105 group-hover:opacity-60 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#041024]/78 to-[#041024]/12" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/80 to-transparent" />
                {tier.featured && <span className="absolute right-4 top-4 z-10 rounded-full border border-sky-300/30 bg-[#03101f]/80 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.16em] text-sky-200 backdrop-blur">Common starting point</span>}
                <div className="relative flex min-h-[390px] flex-col p-6"><span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-300/30 bg-sky-400/10 text-sky-200 backdrop-blur"><Icon className="h-5 w-5" /></span><div className="mt-auto"><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">{tier.label}</p><h3 className="mt-2 text-2xl font-bold text-white">{tier.title}</h3><p className="mt-4 text-sm font-semibold text-sky-200">{tier.range}</p><p className="mt-3 text-sm leading-6 text-slate-300">{tier.body}</p></div></div>
              </motion.article>
            );
          })}
        </div>
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07101f]/70 px-5 py-4 text-center text-sm text-slate-400">Your real preliminary range comes from the estimator—not a generic package price.</div>
      </div>
    </section>
  );
}

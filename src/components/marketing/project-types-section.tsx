"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Church, Home, KeyRound, Store, Warehouse } from "lucide-react";

const projects = [
  { icon: Home, eyebrow: "Residential", title: "Homes & estates", body: "Driveways, porches, garages, backyards and interior coverage designed around how the property is actually used." },
  { icon: Store, eyebrow: "Retail", title: "Shops, salons & studios", body: "Customer entrances, registers, service areas and back rooms covered without turning the space into a camera showroom." },
  { icon: Warehouse, eyebrow: "Industrial", title: "Warehouses & yards", body: "Dock doors, aisles, loading lanes and perimeter coverage with cable paths planned for serviceability and growth." },
  { icon: Building2, eyebrow: "Commercial", title: "Offices & suites", body: "Lobbies, corridors, shared spaces, Wi-Fi and IT closets tied together as one clean system." },
  { icon: Church, eyebrow: "Community", title: "Churches & gathering spaces", body: "Sanctuaries, classrooms, parking lots and common areas planned with coverage, comfort and privacy in mind." },
  { icon: KeyRound, eyebrow: "Hospitality", title: "Rentals & small portfolios", body: "Entry, parking and common-area visibility for short-term rentals and multi-property owners." },
];

export function ProjectTypesSection() {
  return (
    <section id="project-types" className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(37,99,235,.15),transparent_28%),radial-gradient(circle_at_92%_85%,rgba(14,165,233,.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Built for real spaces</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">One platform. Different environments.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300 lg:justify-self-end">SmartNET adapts the same planning discipline to homes, businesses and larger sites—without forcing every property into the same template.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .35, delay: index * .04 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-sky-400/15 bg-[linear-gradient(145deg,rgba(8,17,34,.96),rgba(3,8,23,.9))] p-5 shadow-[0_20px_70px_rgba(2,6,23,.38)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-70" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-sky-300" />
                </div>
                <p className="mt-6 text-[.65rem] font-bold uppercase tracking-[.22em] text-sky-300/80">{item.eyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

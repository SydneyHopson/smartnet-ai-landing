"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Church, Home, KeyRound, Store, Warehouse } from "lucide-react";

const projects = [
  { icon: Home, eyebrow: "Residential", title: "Homes & estates", body: "Driveways, porches, garages, backyards and interior coverage designed around how the property is actually used.", scene: "from-blue-500/20 via-transparent to-transparent", tag: "PERIMETER / WIFI" },
  { icon: Store, eyebrow: "Retail", title: "Shops, salons & studios", body: "Customer entrances, registers, service areas and back rooms covered without turning the space into a camera showroom.", scene: "from-cyan-500/15 via-transparent to-transparent", tag: "POS / ENTRY" },
  { icon: Warehouse, eyebrow: "Industrial", title: "Warehouses & yards", body: "Dock doors, aisles, loading lanes and perimeter coverage with cable paths planned for serviceability and growth.", scene: "from-sky-400/15 via-transparent to-transparent", tag: "DOCK / AISLE" },
  { icon: Building2, eyebrow: "Commercial", title: "Offices & suites", body: "Lobbies, corridors, shared spaces, Wi-Fi and IT closets tied together as one clean system.", scene: "from-indigo-500/15 via-transparent to-transparent", tag: "LAN / ACCESS" },
  { icon: Church, eyebrow: "Community", title: "Churches & gathering spaces", body: "Sanctuaries, classrooms, parking lots and common areas planned with coverage, comfort and privacy in mind.", scene: "from-blue-400/15 via-transparent to-transparent", tag: "COVERAGE / AV" },
  { icon: KeyRound, eyebrow: "Hospitality", title: "Rentals & small portfolios", body: "Entry, parking and common-area visibility for short-term rentals and multi-property owners.", scene: "from-cyan-400/15 via-transparent to-transparent", tag: "ENTRY / REMOTE" },
];

export function ProjectTypesSection() {
  return (
    <section id="project-types" className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(37,99,235,.18),transparent_28%),radial-gradient(circle_at_92%_85%,rgba(14,165,233,.10),transparent_30%)]" />
      <div className="pointer-events-none absolute left-[-12%] top-1/3 h-px w-[70%] rotate-[-8deg] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
      <div className="pointer-events-none absolute right-[-8%] top-16 h-72 w-72 rounded-full border border-sky-400/10 shadow-[0_0_90px_rgba(37,99,235,.12)]" />
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
              <motion.article key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .35, delay: index * .04 }} whileHover={{ y: -6 }} className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-sky-400/15 bg-[linear-gradient(145deg,rgba(8,17,34,.97),rgba(3,8,23,.92))] p-5 shadow-[0_20px_70px_rgba(2,6,23,.38)]">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.scene} opacity-70 transition duration-500 group-hover:opacity-100`} />
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-sky-400/10 transition duration-500 group-hover:scale-110 group-hover:border-sky-400/20" />
                <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 opacity-20 [background-image:linear-gradient(rgba(56,189,248,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.8)_1px,transparent_1px)] [background-size:10px_10px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,.08)]"><Icon className="h-5 w-5" /></div>
                  <div className="flex items-center gap-2"><span className="hidden text-[.55rem] font-bold tracking-[.16em] text-slate-600 sm:block">{item.tag}</span><ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-sky-300" /></div>
                </div>
                <div className="relative mt-12">
                  <p className="text-[.65rem] font-bold uppercase tracking-[.22em] text-sky-300/80">{item.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Building2, CircuitBoard, Home, ShieldCheck, Store, Warehouse } from "lucide-react";

const results = [
  { icon: Home, number: "01", title: "Residential coverage", lead: "Driveway, porch and backyard dialed in", detail: "Camera placement, attic paths and Wi-Fi coverage planned as one system instead of separate add-ons." },
  { icon: Store, number: "02", title: "Retail & studio", lead: "Clear views where business happens", detail: "Entrances, service areas and POS zones designed around glare, foot traffic and daily operations." },
  { icon: Warehouse, number: "03", title: "Warehouse & dock", lead: "Bays, lanes and perimeter under control", detail: "High-value areas, loading points and future expansion considered before cable ever gets pulled." },
  { icon: Building2, number: "04", title: "Office environments", lead: "Lobby, corridors and IT tied together", detail: "Security, network and future access control planned around the same backbone." },
  { icon: ShieldCheck, number: "05", title: "Exterior security", lead: "Lots, gates and side entries stay visible", detail: "Mounting height, lighting, weather and service access all shape the final placement." },
  { icon: CircuitBoard, number: "06", title: "Network backbone", lead: "The quiet layer that keeps it all working", detail: "Rack layout, labels, switching and documentation make upgrades cleaner years after install." },
];

export function FieldResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(rgba(56,189,248,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.5)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">SmartNET in the field</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">What clean planning looks like in real spaces.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400">Every project is different, but the discipline stays the same: visibility, clean pathways, serviceability and room to grow.</p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {results.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, x: index % 2 ? 18 : -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .35, delay: index * .04 }}
                className="relative overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07101f]/90 p-6"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300 shadow-[0_0_28px_rgba(37,99,235,.16)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300/80">{item.title}</p>
                      <span className="text-sm font-black text-slate-700">{item.number}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{item.lead}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

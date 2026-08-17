"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, CircuitBoard, Home, ShieldCheck, Store, Warehouse } from "lucide-react";

const results = [
  { icon: Home, number: "01", title: "Residential coverage", lead: "Driveway, porch and backyard dialed in", detail: "Camera placement, attic paths and Wi-Fi coverage planned as one system instead of separate add-ons.", image: "/styling/images/residential-coverage-security.png", position: "object-center" },
  { icon: Store, number: "02", title: "Retail & studio", lead: "Clear views where business happens", detail: "Entrances, service areas and POS zones designed around glare, foot traffic and daily operations.", image: "/styling/images/restaurant-pos-security.png", position: "object-center" },
  { icon: Warehouse, number: "03", title: "Warehouse & dock", lead: "Bays, lanes and perimeter under control", detail: "High-value areas, loading points and future expansion considered before cable ever gets pulled.", image: "/styling/images/warehouse-dock-infrastructure-v2.png", position: "object-center" },
  { icon: Building2, number: "04", title: "Office environments", lead: "Lobby, corridors and IT tied together", detail: "Security, network and future access control planned around the same backbone.", image: "/styling/images/office-network-security-infrastructure.png", position: "object-center" },
  { icon: ShieldCheck, number: "05", title: "Exterior security", lead: "Lots, gates and side entries stay visible", detail: "Mounting height, lighting, weather and service access all shape the final placement.", image: "/styling/images/exterior-security-perimeter.png", position: "object-center" },
  { icon: CircuitBoard, number: "06", title: "Network backbone", lead: "The quiet layer that keeps it all working", detail: "Rack layout, labels, switching and documentation make upgrades cleaner years after install.", image: "/styling/images/network-backbone-infrastructure.png", position: "object-center" },
];

export function FieldResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(rgba(56,189,248,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.5)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,.12),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/[.04] px-3 py-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,.8)]"/><span className="font-mono text-[.58rem] uppercase tracking-[.2em] text-sky-300/70">Field systems online</span></div>
          <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">SmartNET in the field</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">What clean planning looks like in real spaces.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400">Every project is different, but the discipline stays the same: visibility, clean pathways, serviceability and room to grow.</p>
        </div>

        <div className="relative mt-14 grid gap-4 lg:grid-cols-2">
          {results.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.number} initial={{ opacity: 0, x: index % 2 ? 18 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .35, delay: index * .04 }} whileHover={{ scale: 1.012 }} className="group relative min-h-[330px] overflow-hidden rounded-2xl border border-sky-400/15 bg-[#07101f] shadow-[0_18px_60px_rgba(2,6,23,.3)]">
                <Image src={item.image} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className={`object-cover ${item.position} opacity-42 saturate-90 transition duration-700 group-hover:scale-105 group-hover:opacity-58 group-hover:saturate-100`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/75 to-[#020617]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/45 via-transparent to-sky-950/15" />
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-sky-300/30 bg-[#03101f]/80 text-sky-200 backdrop-blur-md"><Icon className="h-5 w-5" /></div>
                <span className="absolute right-5 top-5 font-mono text-sm font-black text-sky-200/50">{item.number}</span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">{item.title}</p>
                  <h3 className="mt-2 max-w-lg text-2xl font-bold text-white">{item.lead}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-sky-300 to-blue-600 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

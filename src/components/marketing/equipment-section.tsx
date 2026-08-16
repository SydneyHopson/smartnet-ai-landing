"use client";

import { motion } from "framer-motion";
import { BatteryCharging, Cable, Camera, HardDrive, Server, Wifi } from "lucide-react";

const equipment = [
  { icon: Camera, label: "Cameras", title: "Coverage built around the view", body: "Indoor, outdoor and specialty cameras selected around distance, lighting, weather and the detail you need to capture." },
  { icon: Wifi, label: "Network", title: "Wi-Fi and switching that stay stable", body: "Access points, PoE and hard-wired links designed around coverage and device load—not just where an outlet happens to be." },
  { icon: HardDrive, label: "Recording", title: "Storage sized for the project", body: "NVR and retention planning matched to camera count, recording goals and future growth." },
  { icon: BatteryCharging, label: "Power", title: "Uptime where it matters", body: "PoE budgets, injectors and UPS options planned to keep the backbone dependable through normal power events." },
  { icon: Server, label: "Racks", title: "Clean equipment spaces", body: "Wall racks, floor racks, patch panels and cable management sized to the site with room left for tomorrow." },
  { icon: Cable, label: "Cabling", title: "The infrastructure you barely notice", body: "Correct cable, clean pathways, tested terminations and labeling from device to rack." },
];

export function EquipmentSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(14,165,233,.10),transparent_30%),radial-gradient(ellipse_at_18%_72%,rgba(37,99,235,.10),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-sky-400/15 to-transparent" />
      <div className="pointer-events-none absolute right-[-8rem] top-10 h-[28rem] w-[28rem] rounded-full border border-sky-400/10 shadow-[inset_0_0_90px_rgba(37,99,235,.06),0_0_120px_rgba(37,99,235,.08)]" />
      <div className="pointer-events-none absolute right-4 top-20 h-52 w-52 rounded-full border border-dashed border-sky-400/10" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Equipment & infrastructure</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Hardware chosen for the system—not the shelf.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">We design the coverage and backbone first, then select the equipment tier that fits the environment, budget and growth plan.</p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-sky-400/15 bg-[linear-gradient(145deg,rgba(8,17,34,.97),rgba(3,8,23,.94))] shadow-[0_28px_90px_rgba(2,6,23,.48)]">
          <div className="pointer-events-none absolute inset-0 opacity-[.025] [background-image:linear-gradient(rgba(56,189,248,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.8)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-2/3 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.10),transparent_70%)]" />
          <div className="relative grid md:grid-cols-2 xl:grid-cols-3">
            {equipment.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .3, delay: index * .035 }} className="group relative min-h-[250px] overflow-hidden border-b border-r border-sky-400/10 p-6 transition duration-300 hover:bg-sky-400/[.045]">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/0 blur-3xl transition duration-500 group-hover:bg-sky-400/10" />
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-300 shadow-[0_0_26px_rgba(56,189,248,.08)]"><Icon className="h-5 w-5" /></span><span className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300/80">{item.label}</span></div>
                    <span className="font-mono text-[.58rem] text-slate-700">SYS-0{index + 1}</span>
                  </div>
                  <h3 className="relative mt-8 text-xl font-bold text-white">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
                  <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-sky-400/80 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

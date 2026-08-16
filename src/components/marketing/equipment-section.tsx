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
      <div className="pointer-events-none absolute right-[-10rem] top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Equipment & infrastructure</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Hardware chosen for the system—not the shelf.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">We design the coverage and backbone first, then select the equipment tier that fits the environment, budget and growth plan.</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-sky-400/15 bg-[linear-gradient(145deg,rgba(8,17,34,.96),rgba(3,8,23,.94))]">
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {equipment.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .3, delay: index * .035 }}
                  className="group border-b border-r border-sky-400/10 p-6 transition hover:bg-sky-400/[.035]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300"><Icon className="h-5 w-5" /></span>
                    <span className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300/80">{item.label}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

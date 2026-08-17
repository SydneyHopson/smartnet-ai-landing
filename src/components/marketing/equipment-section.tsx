"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BatteryCharging, Cable, Camera, HardDrive, Server, Wifi } from "lucide-react";

const equipment = [
  { icon: Camera, label: "Cameras", title: "Coverage built around the view", body: "Indoor, outdoor and specialty cameras selected around distance, lighting, weather and the detail you need to capture.", image: "/styling/images/warehouse-dock-cameras.png" },
  { icon: Wifi, label: "Network", title: "Wi-Fi and switching that stay stable", body: "Access points, PoE and hard-wired links designed around coverage and device load—not just where an outlet happens to be.", image: "/styling/images/wifi-access-points.png" },
  { icon: HardDrive, label: "Recording", title: "Storage sized for the project", body: "NVR and retention planning matched to camera count, recording goals and future growth.", image: "/styling/images/datacenter-infrastructure.png" },
  { icon: BatteryCharging, label: "Power", title: "Uptime where it matters", body: "PoE budgets, injectors and UPS options planned to keep the backbone dependable through normal power events.", image: "/styling/images/commercial-smartnet-solutions.png" },
  { icon: Server, label: "Racks", title: "Clean equipment spaces", body: "Wall racks, floor racks, patch panels and cable management sized to the site with room left for tomorrow.", image: "/styling/images/structured-cabling-network-rack.png" },
  { icon: Cable, label: "Cabling", title: "The infrastructure you barely notice", body: "Correct cable, clean pathways, tested terminations and labeling from device to rack.", image: "/styling/images/office-network-infrastructure.png" },
];

export function EquipmentSection() {
  return (
    <section className="relative overflow-hidden border-y border-sky-500/10 bg-[#020617] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(14,165,233,.10),transparent_30%),radial-gradient(ellipse_at_18%_72%,rgba(37,99,235,.10),transparent_30%)]" />

      {/* Full-width SmartNET system composition sits behind the equipment grid. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-3%] top-[24%] hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_34%_50%,rgba(14,165,233,.13),transparent_34%),radial-gradient(ellipse_at_68%_54%,rgba(37,99,235,.10),transparent_38%)]" />
        <Image
          src="/styling/images/smartnet-system-stack.png"
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-left-bottom opacity-82 saturate-110 drop-shadow-[0_0_48px_rgba(14,165,233,.18)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020617]/10 to-[#020617]/30" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020617] via-[#020617]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617]/65 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Equipment & infrastructure</p><h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Hardware chosen for the system—not the shelf.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">We design the coverage and backbone first, then select the equipment tier that fits the environment, budget and growth plan.</p>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {equipment.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} whileHover={{ y: -6 }} className="group relative min-h-[310px] overflow-hidden rounded-2xl border border-sky-400/20 bg-[#061020]/78 shadow-[0_18px_55px_rgba(2,6,23,.32)] backdrop-blur-[3px]">
                <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover object-center opacity-32 saturate-90 transition duration-700 group-hover:scale-110 group-hover:opacity-48 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#061020]/20 via-[#061020]/64 to-[#020617]/94" />
                <div className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(rgba(56,189,248,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.8)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="relative flex h-full min-h-[310px] flex-col p-6">
                  <div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-300/30 bg-[#031126]/80 text-sky-200 backdrop-blur"><Icon className="h-5 w-5" /></span><span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[.6rem] tracking-[.18em] text-sky-200/70 backdrop-blur">SYS-0{index + 1}</span></div>
                  <div className="mt-auto"><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">{item.label}</p><h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p></div>
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

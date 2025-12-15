"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Wifi,
  HardDrive,
  BatteryCharging,
  Server,
  Cable,
} from "lucide-react";

export function EquipmentSection() {
  return (
    <motion.section
      className="relative w-full px-4 py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            Equipment we use
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            Hardware that matches the way you actually live & work
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            We don&apos;t lead with brand logos. SmartNET designs around coverage,
            reliability and clean wiring first, then picks hardware that fits
            the space, budget and future upgrades.
          </p>
        </div>

        {/* grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <EquipmentCard
            index={0}
            icon={<Camera className="h-5 w-5 text-cyan-300" />}
            label="Cameras & views"
            title="Indoor, outdoor & specialty angles"
            points={[
              "Weather-rated exterior cameras for lots, doors and walkways.",
              "Compact interior cameras for lobbies, chairs, aisles and halls.",
              "Mix of wide and tighter views so you see context and detail.",
            ]}
            tag="Entry, perimeter & interior coverage"
          />
          <EquipmentCard
            index={1}
            icon={<Wifi className="h-5 w-5 text-cyan-300" />}
            label="Network & Wi-Fi"
            title="Access points, switches and clean links"
            points={[
              "Hard-wired links where it matters most (NVR, racks, APs).",
              "Wi-Fi access points placed for coverage, not just convenience.",
              "Network tuned so cameras stay online instead of fighting for signal.",
            ]}
            tag="Stable backbone for cameras & devices"
          />
          <EquipmentCard
            index={2}
            icon={<HardDrive className="h-5 w-5 text-cyan-300" />}
            label="Recording & storage"
            title="NVRs, local storage & retention"
            points={[
              "Recorder sized to match how long you want to keep footage.",
              "Smart layouts so critical cameras keep more days on disk.",
              "Racks and shelves that make servicing the NVR simple, not chaos.",
            ]}
            tag="Right-size storage, not guesswork"
          />
          <EquipmentCard
            index={3}
            icon={<BatteryCharging className="h-5 w-5 text-cyan-300" />}
            label="Power & uptime"
            title="Power injection & backup"
            points={[
              "PoE switches and injectors matched to cable runs and load.",
              "Battery backup / UPS options for key parts of the system.",
              "Cable paths and power separated where heat and noise are a risk.",
            ]}
            tag="Built for real-world power blips"
          />
          <EquipmentCard
            index={4}
            icon={<Server className="h-5 w-5 text-cyan-300" />}
            label="Racks & enclosures"
            title="From mini racks to small IDF closets"
            points={[
              "Wall-mount and floor racks sized to your space, not oversized.",
              "Patch panels, labeling and cable management as standard, not extra.",
              "Room left for future APs, cameras or access control gear.",
            ]}
            tag="Datacenter habits, field-sized racks"
          />
          <EquipmentCard
            index={5}
            icon={<Cable className="h-5 w-5 text-cyan-300" />}
            label="Cable & finishing"
            title="The part most people never see"
            points={[
              "Low-voltage cabling rated for the runs and environment.",
              "Staples, conduit or raceway chosen to fit the space and look right.",
              "Terminations tested, labeled and documented before we leave.",
            ]}
            tag="Clean, labeled paths end-to-end"
          />
        </div>

        {/* bottom line */}
        <p className="mx-auto max-w-3xl text-center text-[0.75rem] text-slate-400 md:text-xs">
          Brand and model may change by project, but the rule stays the same:
          SmartNET installs gear we&apos;d trust on our own homes and shops, wired
          in a way another technician can understand later.
        </p>
      </div>
    </motion.section>
  );
}

type EquipmentCardProps = {
  index: number;
  icon: React.ReactNode;
  label: string;
  title: string;
  points: string[];
  tag: string;
};

function EquipmentCard({
  index,
  icon,
  label,
  title,
  points,
  tag,
}: EquipmentCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: index * 0.04,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 0 32px rgba(56,189,248,0.35)",
        borderColor: "rgba(56,189,248,0.6)",
      }}
      className="flex h-full flex-col rounded-xl border border-sky-500/25 bg-slate-950/70 p-4 shadow-[0_0_24px_rgba(8,47,73,0.5)] md:p-5"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-300/80">
            {label}
          </span>
          <h3 className="text-xs font-semibold text-slate-50 md:text-sm">
            {title}
          </h3>
        </div>
      </div>

      <ul className="mt-2 space-y-1.5 text-[0.7rem] text-slate-300/90">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
        <span className="text-[0.7rem] font-medium text-cyan-100/90">
          {tag}
        </span>
      </div>
    </motion.article>
  );
}

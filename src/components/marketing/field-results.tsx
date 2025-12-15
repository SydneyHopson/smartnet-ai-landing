"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Home,
  Store,
  Warehouse,
  Building2,
  ShieldCheck,
  CircuitBoard,
} from "lucide-react";

export function FieldResultsSection() {
  return (
    <section className="relative w-full px-4 py-12 md:py-18">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-4 bottom-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/70">
            SmartNET in the field
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            6 ways SmartNET lands in real spaces
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            These aren&apos;t theoretical diagrams — they&apos;re realistic 
            layouts for the kinds of homes, shops and sites SmartNET is built for.
          </p>
        </div>

        {/* Vertical stack 1–6 */}
        <div className="relative mx-auto flex max-w-4xl flex-col gap-4 md:gap-5">
          {/* vertical line for timeline feel */}
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/10 to-transparent md:left-6" />

          <ResultStep
            index={1}
            icon={<Home className="h-4 w-4 text-cyan-300" />}
            label="Home perimeter coverage"
            headline="Driveway, porch & backyard dialed in"
            body="6–8 cameras covering the driveway, porch, side gate and backyard with attic runs to a mini rack near the panel."
            bullets={[
              "Angles planned for faces, plates and packages",
              "Attic routing instead of exposed siding cable when possible",
              "Mesh Wi-Fi tuned so outdoor cameras stay online",
            ]}
          />

          <ResultStep
            index={2}
            icon={<Store className="h-4 w-4 text-cyan-300" />}
            label="Shop / studio layout"
            headline="Chairs, lobby & register in one clean view"
            body="Front door, stations and POS area covered so owners can check in from anywhere without grainy footage."
            bullets={[
              "Front door + interior zone coverage",
              "Camera views planned around mirrors, glass and glare",
              "Back room NVR cleaned up and labeled for support",
            ]}
          />

          <ResultStep
            index={3}
            icon={<Warehouse className="h-4 w-4 text-cyan-300" />}
            label="Warehouse & dock"
            headline="Loading dock, gates and lot monitored"
            body="Perimeter cameras watch truck lanes, dock doors and parking areas with planned paths for future add-ons."
            bullets={[
              "Angles picked for plate-read & people ID",
              "Conduit routes chosen for forklift-safe zones",
              "Labelled home runs back to NVR / switch",
            ]}
          />

          <ResultStep
            index={4}
            icon={<Building2 className="h-4 w-4 text-cyan-300" />}
            label="Office suite coverage"
            headline="Lobby, corridors & IT closet protected"
            body="Balanced layout covering reception, key intersections and the equipment room without turning the space into a maze of hardware."
            bullets={[
              "Doorway cameras placed for faces, not ceilings",
              "Patch panel + switch clean-up in the rack",
              "Planned drops for future access control",
            ]}
          />

          <ResultStep
            index={5}
            icon={<ShieldCheck className="h-4 w-4 text-cyan-300" />}
            label="Exterior & parking"
            headline="Lots, paths & side entrances lit up"
            body="Weather-rated cameras and mounting choices that survive real life — rain, headlights, tree movement and motion spam."
            bullets={[
              "IR + wide angle mix to avoid blind zones",
              "Longer runs planned with power and voltage in mind",
              "Mounts chosen for serviceability, not just looks",
            ]}
          />

          <ResultStep
            index={6}
            icon={<CircuitBoard className="h-4 w-4 text-cyan-300" />}
            label="Network & rack backbone"
            headline="The quiet part that makes everything work"
            body="Even when the cameras look simple, the wiring, labeling and rack work follow datacenter habits so future upgrades don&apos;t hurt."
            bullets={[
              "Cable IDs that actually match where they land",
              "Documented layout for the next tech who touches it",
              "Room in the rack for growth — not chaos",
            ]}
          />
        </div>

        {/* Bottom helper */}
        <p className="mx-auto max-w-3xl text-center text-[0.75rem] text-slate-400 md:text-xs">
          Your project won&apos;t be copy-pasted from a template, but it will follow
          the same SmartNET rule set: smart angles, clean paths, and a layout 
          you can actually understand.
        </p>
      </div>
    </section>
  );
}

type ResultStepProps = {
  index: number;
  icon: React.ReactNode;
  label: string;
  headline: string;
  body: string;
  bullets: string[];
};

function ResultStep({
  index,
  icon,
  label,
  headline,
  body,
  bullets,
}: ResultStepProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{
        y: -4,
        boxShadow: "0 0 36px rgba(56,189,248,0.35)",
        borderColor: "rgba(56,189,248,0.6)",
      }}
      className="relative ml-8 rounded-xl border border-sky-500/20 bg-slate-950/70 px-4 py-4 pl-5 shadow-[0_0_26px_rgba(8,47,73,0.45)] md:ml-10 md:px-6 md:py-5"
    >
      {/* Number badge */}
      <div className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/60 bg-slate-950 text-[0.7rem] font-semibold text-cyan-100 shadow-[0_0_18px_rgba(56,189,248,0.7)] md:-left-10">
        {index.toString().padStart(2, "0")}
      </div>

      {/* Animated camera icon */}
      <motion.div
        className="absolute right-3 top-3 md:right-4 md:top-4"
        animate={{
          rotate: [-6, 4, -4, 6, -6],
          opacity: [0.35, 0.7, 0.45, 0.7, 0.35],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Camera className="h-4 w-4 text-cyan-300" />
      </motion.div>

      <div className="flex flex-col gap-2 pr-8 md:pr-10">
        <div className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-sky-300/80">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10">
            {icon}
          </span>
          <span>{label}</span>
        </div>

        <h3 className="text-sm font-semibold text-slate-50 md:text-[0.95rem]">
          {headline}
        </h3>

        <p className="text-xs text-slate-300/85 md:text-[0.8rem]">{body}</p>

        <ul className="mt-2 space-y-1.5 text-[0.7rem] text-slate-300/90">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

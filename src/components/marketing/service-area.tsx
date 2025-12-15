"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Building2, Crosshair } from "lucide-react";

export function ServiceAreaSection() {
  return (
    <motion.section
      className="relative w-full px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* soft map-ish glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-4 h-52 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Left: headline + copy */}
        <div className="max-w-xl space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            Service area
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            Built for Metro Atlanta homes & businesses
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            SmartNET focuses on nearby projects so installs, follow-up tweaks
            and future add-ons feel local, not like a ticket in a queue.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-200/90">
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-3 py-1">
              <Navigation className="h-3 w-3 text-cyan-300" />
              Metro Atlanta radius
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-3 py-1">
              <Building2 className="h-3 w-3 text-sky-300" />
              Residential & light commercial
            </span>
          </div>

          <p className="mt-3 text-[0.75rem] text-slate-400 md:text-xs">
            Bigger multi-site or out-of-area projects can still be reviewed
            case-by-case. Start with the estimate and notes so we understand
            the scope.
          </p>
        </div>

        {/* Right: SmartNET-style map card */}
        <div className="mt-4 w-full max-w-md rounded-2xl border border-sky-500/30 bg-slate-950/80 p-4 shadow-[0_0_32px_rgba(8,47,73,0.7)] md:mt-0 md:p-5">
          {/* header */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10">
                <MapPin className="h-4 w-4 text-cyan-300" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                  SmartNET coverage zone
                </p>
                <p className="text-[0.75rem] text-slate-300/85">
                  If you&apos;re near here, you&apos;re probably in range.
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[0.65rem] text-cyan-100 md:inline-flex">
              <Crosshair className="h-3 w-3" />
              Live radius
            </div>
          </div>

          {/* HUD-style map */}
          <div className="relative mb-4 mt-1 min-h-[230px] overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/90 px-3 py-3">
            {/* grid background */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(15,23,42,0.85) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.85) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* faint radial glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)]" />

            {/* --- ROADS LAYER --- */}
            <div className="pointer-events-none absolute inset-0">
              {/* ring road */}
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-cyan-500/30" />
              {/* horizontal main road */}
              <Road
                className="left-[8%] top-1/2 w-[84%] -translate-y-1/2"
                angle={0}
              />
              {/* vertical spur */}
              <Road
                className="left-1/2 top-[22%] h-[65%] -translate-x-1/2"
                vertical
              />
              {/* diagonal route (southwest -> northeast) */}
              <Road
                className="left-[18%] top-[70%] w-[68%]"
                angle={-18}
              />
            </div>

            {/* scanning ring animation on top of roads */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25" />

            {/* city dots (rough ATL layout, staggered) */}
            <MapDot x="50%" y="48%" label="Atlanta" strong />
            <MapDot x="30%" y="64%" label="Lithia Springs" />
            <MapDot x="35%" y="56%" label="Douglasville" />
            <MapDot x="60%" y="60%" label="Smyrna" />
            <MapDot x="68%" y="52%" label="Marietta" />
            <MapDot x="44%" y="70%" label="Austell" small />
            <MapDot x="54%" y="74%" label="Mableton" small />

            {/* north marker */}
            <div className="pointer-events-none absolute right-2 top-2 text-[0.55rem] uppercase tracking-[0.35em] text-slate-400/80">
              N
            </div>
          </div>

          {/* chip row under map */}
          <div className="mb-2 flex flex-wrap gap-2 text-[0.7rem]">
            {[
              "Single-family homes",
              "Shops & studios",
              "Small warehouses",
              "Office suites",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-cyan-50"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-2 text-[0.75rem] text-slate-300/85">
            Not sure if you&apos;re in the radius? Use the wizard and booking
            calendar, then drop your address in the notes — we&apos;ll confirm
            coverage before anything is locked in.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

/* ----------------- helpers ----------------- */

type MapDotProps = {
  x: string;
  y: string;
  label: string;
  strong?: boolean;
  small?: boolean;
};

function MapDot({ x, y, label, strong, small }: MapDotProps) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="relative flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className={`block rounded-full ${
            small ? "h-1.5 w-1.5" : "h-2 w-2"
          } ${strong ? "bg-cyan-300" : "bg-cyan-200"}`}
          animate={{
            boxShadow: [
              "0 0 0 rgba(56,189,248,0.0)",
              "0 0 14px rgba(56,189,248,0.9)",
              "0 0 0 rgba(56,189,248,0.0)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <span
          className={`rounded-full bg-slate-950/85 px-2 py-0.5 text-[0.6rem] text-cyan-50 ${
            strong
              ? "font-semibold border border-cyan-400/60"
              : "border border-cyan-500/30"
          }`}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
}

type RoadProps = {
  className?: string;
  angle?: number;
  vertical?: boolean;
};

/**
 * Simple HUD road segment.
 * If `vertical` is true we render a tall div, otherwise a horizontal div
 * and rotate by `angle` degrees.
 */
function Road({ className = "", angle = 0, vertical }: RoadProps) {
  const base =
    "absolute bg-cyan-300/25 shadow-[0_0_18px_rgba(56,189,248,0.4)]";

  if (vertical) {
    return (
      <div
        className={`${base} w-[3px] ${className}`}
        style={{
          transform: "translateX(-50%)",
        }}
      />
    );
  }

  return (
    <div
      className={`${base} h-[3px] ${className}`}
      style={{
        transformOrigin: "left center",
        transform: `translateY(-50%) rotate(${angle}deg)`,
      }}
    />
  );
}

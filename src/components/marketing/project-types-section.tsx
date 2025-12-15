"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Store,
  Warehouse,
  Building2,
  Church,
  KeyRound,
} from "lucide-react";

export function ProjectTypesSection() {
  const types = [
    {
      icon: <Home className="h-5 w-5 text-cyan-300" />,
      label: "Homes & driveways",
      title: "Single-family, townhomes & small lots",
      body: "Front doors, driveways, side gates, garages and back patios with coverage that still looks good on your house.",
      tag: "Owner-occupied and family properties",
    },
    {
      icon: <Store className="h-5 w-5 text-cyan-300" />,
      label: "Shops & salons",
      title: "Retail, barbers, studios & boutiques",
      body: "Registers, chairs, entrances and parking all on the same system, tuned for foot traffic and staff flow.",
      tag: "Customer-facing spaces",
    },
    {
      icon: <Warehouse className="h-5 w-5 text-cyan-300" />,
      label: "Warehouses & garages",
      title: "Bays, inventory rows & yards",
      body: "Loading doors, interior aisles and tool areas for small industrial spaces without going full enterprise budget.",
      tag: "Light industrial & storage",
    },
    {
      icon: <Building2 className="h-5 w-5 text-cyan-300" />,
      label: "Offices & suites",
      title: "Lobbies, hallways & shared spaces",
      body: "Entries, mailrooms and common areas with options to grow into access control and more APs later.",
      tag: "Professional & multi-tenant",
    },
    {
      icon: <Church className="h-5 w-5 text-cyan-300" />,
      label: "Churches & community spaces",
      title: "Sanctuaries, halls & lots",
      body: "Coverage for gatherings, kids areas and parking lots with attention to angles, privacy and comfort.",
      tag: "Community-focused installs",
    },
    {
      icon: <KeyRound className="h-5 w-5 text-cyan-300" />,
      label: "Airbnb & rentals",
      title: "Short-term & small portfolios",
      body: "Smart placement around doors, driveways and shared spaces so you see what matters, not your guests’ private life.",
      tag: "Host-ready camera layouts",
    },
  ];

  return (
    <motion.section
      id="project-types" // 🔹 anchor target for "Services & use cases"
      className="relative w-full px-4 py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* heading */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            Project types
          </p>
          <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
            SmartNET is built for real-world spaces, not just server rooms
          </h2>
          <p className="text-sm text-slate-300/80 md:text-base">
            If it has a door, a driveway, a parking lot or a back room where
            you keep the important stuff, we probably have a layout pattern for it.
          </p>
        </div>

        {/* grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {types.map((item, index) => (
            <ProjectCard key={item.label} index={index} {...item} />
          ))}
        </div>

        <p className="mx-auto max-w-3xl text-center text-[0.75rem] text-slate-400 md:text-xs">
          Not sure if your property fits one of these buckets? Use the notes
          field in the wizard to describe it in plain language — SmartNET is
          built to adapt the plan to the space you actually have.
        </p>
      </div>
    </motion.section>
  );
}

type ProjectCardProps = {
  index: number;
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  tag: string;
};

function ProjectCard({
  index,
  icon,
  label,
  title,
  body,
  tag,
}: ProjectCardProps) {
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

      <p className="mt-1 text-[0.7rem] text-slate-300/90">{body}</p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
        <span className="text-[0.7rem] font-medium text-cyan-100/90">
          {tag}
        </span>
      </div>
    </motion.article>
  );
}

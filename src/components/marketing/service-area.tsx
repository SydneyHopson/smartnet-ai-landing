"use client";

import { motion } from "framer-motion";
import { Building2, Home, MapPin, Navigation, Radar, Route, Wifi } from "lucide-react";

const cities = ["Atlanta", "Douglasville", "Lithia Springs", "Austell", "Mableton", "Smyrna", "Marietta"];

const nodes = [
  { name: "Atlanta", x: 50, y: 48, zone: "Operations hub", primary: true },
  { name: "Douglasville", x: 20, y: 60, zone: "Core service" },
  { name: "Lithia Springs", x: 28, y: 53, zone: "Core service" },
  { name: "Austell", x: 34, y: 48, zone: "Core service" },
  { name: "Mableton", x: 39, y: 42, zone: "Core service" },
  { name: "Smyrna", x: 46, y: 35, zone: "Metro service" },
  { name: "Marietta", x: 50, y: 25, zone: "Metro service" },
];

const routes = nodes.filter((node) => !node.primary);

export function ServiceAreaSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_48%,rgba(37,99,235,.18),transparent_34rem),radial-gradient(circle_at_10%_15%,rgba(14,165,233,.06),transparent_24rem)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/[.05] px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.85)]" />
            <span className="font-mono text-[.6rem] font-bold uppercase tracking-[.2em] text-sky-200">Atlanta operations online</span>
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[.28em] text-sky-300">Service area</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Metro Atlanta first. Built to reach the right project.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">SmartNET keeps its core footprint focused so walkthroughs, installs, support and future expansion stay responsive. Larger and farther-out projects can still be reviewed individually.</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {cities.map((city) => (
              <span key={city} className="rounded-full border border-sky-400/15 bg-sky-400/[.06] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-sky-400/35 hover:bg-sky-400/10 hover:text-white">{city}</span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="group rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-4 transition hover:border-sky-400/25 hover:bg-sky-400/[.035]">
              <Navigation className="h-5 w-5 text-sky-300" />
              <p className="mt-3 text-sm font-semibold text-white">Residential & commercial</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Homes, offices, retail and light industrial projects.</p>
            </div>
            <div className="group rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-4 transition hover:border-sky-400/25 hover:bg-sky-400/[.035]">
              <Building2 className="h-5 w-5 text-sky-300" />
              <p className="mt-3 text-sm font-semibold text-white">Extended project review</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Larger and out-of-area opportunities can be scoped separately.</p>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-[linear-gradient(145deg,rgba(8,17,34,.98),rgba(2,6,23,.96))] p-5 shadow-[0_28px_90px_rgba(2,6,23,.45)] sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(56,189,248,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.6)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(37,99,235,.12),transparent_42%)]" />

          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-sky-300" />
                <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-sky-300">SmartNET operations coverage</p>
              </div>
              <p className="mt-1 text-sm text-slate-400">Live-style project footprint · Atlanta hub</p>
            </div>
            <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[.06] px-3 py-2 text-right">
              <p className="font-mono text-[.55rem] uppercase tracking-[.18em] text-emerald-300/70">Network status</p>
              <p className="mt-1 text-xs font-bold text-emerald-200">Coverage active</p>
            </div>
          </div>

          <div className="relative mt-6 min-h-[430px] overflow-hidden rounded-2xl border border-sky-400/10 bg-[#020817]/72">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(14,165,233,.10),transparent_24%),linear-gradient(135deg,rgba(2,6,23,.1),rgba(8,47,73,.08))]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(56,189,248,.18)" />
                  <stop offset="55%" stopColor="rgba(56,189,248,.7)" />
                  <stop offset="100%" stopColor="rgba(37,99,235,.18)" />
                </linearGradient>
              </defs>
              {routes.map((node, index) => (
                <motion.line
                  key={node.name}
                  x1="50"
                  y1="48"
                  x2={node.x}
                  y2={node.y}
                  stroke="url(#routeGlow)"
                  strokeWidth=".28"
                  strokeDasharray="1.4 1.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: .9, delay: index * .08 }}
                />
              ))}
            </svg>

            <div className="pointer-events-none absolute left-1/2 top-[48%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10" />
            <div className="pointer-events-none absolute left-1/2 top-[48%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/15" />
            <div className="pointer-events-none absolute left-1/2 top-[48%] h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/25 bg-sky-400/[.025]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute left-1/2 top-[48%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_326deg,rgba(56,189,248,.16)_356deg,transparent_360deg)]" />

            <div className="pointer-events-none absolute left-4 top-4 grid gap-2 text-[.58rem] font-bold uppercase tracking-[.16em] text-slate-500">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Core service</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Metro service</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full border border-sky-300/50" /> Extended review</span>
            </div>

            {nodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, scale: .7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: .18 + index * .07 }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {node.primary ? (
                  <div className="relative flex flex-col items-center">
                    <span className="absolute h-16 w-16 animate-ping rounded-full border border-sky-300/15" />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-sky-300/45 bg-blue-600/25 text-sky-100 shadow-[0_0_42px_rgba(37,99,235,.4)] backdrop-blur">
                      <MapPin className="h-6 w-6" />
                    </span>
                    <span className="mt-2 rounded-lg border border-sky-400/20 bg-[#020617]/95 px-3 py-1.5 text-center shadow-xl backdrop-blur">
                      <span className="block text-xs font-black text-white">ATLANTA</span>
                      <span className="mt-0.5 block font-mono text-[.5rem] uppercase tracking-[.16em] text-sky-300">Operations hub</span>
                    </span>
                  </div>
                ) : (
                  <div className="relative cursor-default">
                    <span className={`block h-3 w-3 rounded-full border border-white/20 shadow-[0_0_16px_rgba(56,189,248,.75)] transition duration-200 group-hover:scale-150 ${node.zone === "Core service" ? "bg-sky-300" : "bg-blue-400"}`} />
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-max -translate-x-1/2 translate-y-1 rounded-lg border border-sky-300/20 bg-[#030817]/95 px-3 py-2 opacity-0 shadow-[0_15px_40px_rgba(2,6,23,.55)] backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs font-bold text-white">{node.name}</p>
                      <p className="mt-1 font-mono text-[.52rem] uppercase tracking-[.14em] text-sky-300">{node.zone}</p>
                      <p className="mt-1 text-[.58rem] text-slate-500">Residential · Commercial · Walkthroughs</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-sky-400/10 bg-[#040b18]/75 px-3 py-2 backdrop-blur">
                <Home className="h-3.5 w-3.5 text-sky-300" />
                <p className="mt-1 font-mono text-[.5rem] uppercase tracking-[.14em] text-slate-500">Residential</p>
              </div>
              <div className="rounded-xl border border-sky-400/10 bg-[#040b18]/75 px-3 py-2 backdrop-blur">
                <Building2 className="h-3.5 w-3.5 text-sky-300" />
                <p className="mt-1 font-mono text-[.5rem] uppercase tracking-[.14em] text-slate-500">Commercial</p>
              </div>
              <div className="rounded-xl border border-sky-400/10 bg-[#040b18]/75 px-3 py-2 backdrop-blur">
                <Route className="h-3.5 w-3.5 text-sky-300" />
                <p className="mt-1 font-mono text-[.5rem] uppercase tracking-[.14em] text-slate-500">Project review</p>
              </div>
            </div>

            <Wifi className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-sky-300/35" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

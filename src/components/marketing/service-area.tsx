"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, CalendarDays, Home, MapPin, Navigation, Radar, Route, ShieldCheck, Wrench } from "lucide-react";

const cities = ["Atlanta", "Douglasville", "Lithia Springs", "Austell", "Mableton", "Smyrna", "Marietta", "Sandy Springs", "Decatur", "East Point", "College Park", "Fayetteville"];

const nodes = [
  { name: "Atlanta", x: 55, y: 48, zone: "Operations hub", primary: true },
  { name: "Douglasville", x: 15, y: 50, zone: "Core service" },
  { name: "Lithia Springs", x: 21, y: 60, zone: "Core service" },
  { name: "Austell", x: 34, y: 56, zone: "Core service" },
  { name: "Mableton", x: 35, y: 43, zone: "Core service" },
  { name: "Smyrna", x: 42, y: 32, zone: "Metro service" },
  { name: "Marietta", x: 51, y: 17, zone: "Metro service" },
  { name: "Sandy Springs", x: 53, y: 26, zone: "Metro service" },
  { name: "Decatur", x: 71, y: 47, zone: "Core service" },
  { name: "East Point", x: 52, y: 68, zone: "Core service" },
  { name: "College Park", x: 51, y: 78, zone: "Core service" },
  { name: "Fayetteville", x: 53, y: 91, zone: "Metro service" },
];

const routeNames = new Set(["Douglasville", "Marietta", "Sandy Springs", "Decatur", "Fayetteville", "College Park"]);
const routes = nodes.filter((node) => routeNames.has(node.name));

export function ServiceAreaSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_50%,rgba(37,99,235,.2),transparent_38rem),radial-gradient(circle_at_10%_15%,rgba(14,165,233,.06),transparent_24rem)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      <div className="relative mx-auto grid max-w-[1540px] gap-8 px-5 sm:px-8 lg:grid-cols-[.68fr_1.32fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[.05] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
            <span className="font-mono text-[.62rem] font-bold uppercase tracking-[.2em] text-sky-100">Atlanta operations online</span>
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.28em] text-sky-300">Service area</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">Metro Atlanta first. Built to reach the right project.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">SmartNET keeps its core footprint focused so walkthroughs, installs, support and future expansion stay responsive. Larger and farther-out projects can still be reviewed individually.</p>
          <div className="mt-8 flex flex-wrap gap-2">{cities.map((city) => <span key={city} className="rounded-full border border-sky-400/20 bg-sky-400/[.05] px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:border-sky-300/45 hover:bg-sky-400/10 hover:text-white">{city}</span>)}</div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <InfoCard icon={<Home className="h-5 w-5" />} title="Residential & commercial" copy="Homes, offices, retail and light industrial projects." />
            <InfoCard icon={<Building2 className="h-5 w-5" />} title="Extended project review" copy="Larger and out-of-area opportunities can be scoped separately." />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border border-sky-400/25 bg-[linear-gradient(145deg,rgba(5,16,34,.99),rgba(1,6,18,.98))] p-4 shadow-[0_35px_110px_rgba(2,6,23,.55)] sm:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-[.06] [background-image:linear-gradient(rgba(56,189,248,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.55)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative flex flex-wrap items-center justify-between gap-4 px-2 pb-4">
            <div className="flex items-start gap-3"><Radar className="mt-1 h-5 w-5 text-sky-300" /><div><p className="text-xs font-bold uppercase tracking-[.22em] text-sky-300">SmartNET operations coverage</p><p className="mt-1 text-sm text-slate-400">Metro Atlanta project footprint · Atlanta hub</p></div></div>
            <div className="rounded-2xl border border-emerald-400/35 bg-emerald-400/[.06] px-4 py-2.5 text-right"><p className="font-mono text-[.55rem] uppercase tracking-[.18em] text-emerald-300/75">Network status</p><p className="mt-1 flex items-center gap-2 text-xs font-bold text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />Coverage active</p></div>
          </div>

          <div className="relative min-h-[585px] overflow-hidden rounded-2xl border border-sky-400/10 bg-[#020817]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_48%,rgba(14,165,233,.095),transparent_25%),linear-gradient(rgba(56,189,248,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.025)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" strokeLinecap="round">
                <path d="M30 430 C120 400 200 390 285 360 C370 330 445 310 540 315 C645 320 735 308 820 325 C890 340 945 352 995 365" stroke="rgba(56,189,248,.34)" strokeWidth="2.1" />
                <path d="M515 0 C505 90 510 170 516 240 C520 315 518 390 514 465 C510 545 520 600 535 650" stroke="rgba(56,189,248,.30)" strokeWidth="2.1" />
                <path d="M145 12 C220 95 295 170 365 230 C430 285 500 337 565 415 C625 487 675 555 725 650" stroke="rgba(56,189,248,.22)" strokeWidth="1.7" />
                <path d="M95 540 C185 470 270 420 350 372 C430 322 500 285 585 245 C670 205 735 145 805 55" stroke="rgba(56,189,248,.20)" strokeWidth="1.3" />
                <path d="M18 260 C120 245 215 242 310 252 C405 262 500 275 595 272 C720 268 840 245 995 225" stroke="rgba(56,189,248,.16)" strokeWidth="1.2" />
              </g>
              <g fill="none" stroke="rgba(125,211,252,.10)" strokeWidth="1">
                <path d="M72 115 C175 185 210 260 195 355 C178 450 235 535 330 602" /><path d="M870 65 C818 165 817 248 860 338 C898 420 895 512 835 608" /><path d="M255 32 C315 112 335 190 322 265 C307 350 338 432 398 520" /><path d="M710 25 C660 120 650 210 690 298 C730 390 732 475 688 575" />
                <path d="M112 340 C210 305 300 300 390 312 C500 330 610 330 720 315 C820 300 910 285 980 292" /><path d="M330 70 C380 160 410 230 425 310 C443 400 430 500 470 610" />
              </g>
              <g fill="none" stroke="rgba(56,189,248,.055)" strokeWidth=".8">
                <path d="M130 90 L220 150 L190 235 L260 300 L205 380 L280 460 L240 560"/><path d="M350 95 L410 155 L390 230 L465 280 L440 350 L490 415 L460 520"/><path d="M610 70 L585 150 L635 210 L610 300 L670 360 L645 440 L700 520"/><path d="M790 105 L750 175 L790 245 L760 330 L815 395 L790 490 L850 560"/>
              </g>
            </svg>

            <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-xl border border-sky-400/15 bg-[#020817]/88 px-4 py-3 backdrop-blur-md">
              <p className="mb-2 font-mono text-[.55rem] uppercase tracking-[.18em] text-slate-500">Coverage radius</p>
              <p className="flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full bg-blue-500" />Core service <span className="text-slate-600">0–25 mi</span></p>
              <p className="mt-2 flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full bg-sky-300" />Metro service <span className="text-slate-600">25–50 mi</span></p>
              <p className="mt-2 flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full border border-slate-400" />Extended review <span className="text-slate-600">50+ mi</span></p>
            </div>

            <div className="pointer-events-none absolute right-5 top-5 z-20 flex h-20 w-20 items-center justify-center opacity-60"><svg viewBox="0 0 80 90" className="h-full w-full"><path d="M15 4 L59 5 L66 17 L64 27 L72 38 L66 47 L69 60 L61 69 L58 83 L45 86 L38 78 L25 79 L18 69 L11 58 L13 46 L7 36 L12 24 Z" fill="rgba(14,165,233,.035)" stroke="rgba(125,211,252,.65)" strokeWidth="1.2"/><text x="39" y="49" textAnchor="middle" fill="rgba(186,230,253,.8)" fontSize="16" fontWeight="700">GA</text></svg></div>

            <div className="pointer-events-none absolute left-[55%] top-[48%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400/28" />
            <div className="pointer-events-none absolute left-[55%] top-[48%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/38" />
            <div className="pointer-events-none absolute left-[55%] top-[48%] h-[215px] w-[215px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/65 bg-blue-500/[.03] shadow-[inset_0_0_55px_rgba(37,99,235,.06)]" />
            <div className="pointer-events-none absolute left-[55%] top-[48%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-2xl" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute left-[55%] top-[48%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_342deg,rgba(56,189,248,.1)_358deg,transparent_360deg)]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="routeGlow3"><stop offset="0%" stopColor="rgba(56,189,248,.08)"/><stop offset="55%" stopColor="rgba(56,189,248,.65)"/><stop offset="100%" stopColor="rgba(37,99,235,.1)"/></linearGradient></defs>{routes.map((node,index)=><motion.line key={node.name} x1="55" y1="48" x2={node.x} y2={node.y} stroke="url(#routeGlow3)" strokeWidth=".18" strokeDasharray="1.2 1.1" initial={{pathLength:0,opacity:0}} whileInView={{pathLength:1,opacity:1}} viewport={{once:true}} transition={{duration:1,delay:index*.07}} />)}</svg>

            {nodes.map((node,index)=><CityNode key={node.name} node={node} index={index} />)}

            <div className="pointer-events-none absolute left-[27%] top-[69%] z-10 hidden w-24 -rotate-[7deg] opacity-78 drop-shadow-[0_12px_24px_rgba(2,6,23,.8)] sm:block"><Image src="/styling/images/smartnet-service-van.png" alt="" width={300} height={160} className="h-auto w-full object-contain" /></div>

            <div className="pointer-events-none absolute left-[24%] top-[22%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-75</div>
            <div className="pointer-events-none absolute right-[18%] top-[28%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-85</div>
            <div className="pointer-events-none absolute right-[7%] top-[55%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-20</div>
          </div>

          <div className="relative mt-4 grid gap-3 rounded-2xl border border-sky-400/15 bg-[#030b19]/85 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <OpsItem icon={<ShieldCheck className="h-5 w-5" />} title="Local teams" copy="On-site response" />
            <OpsItem icon={<CalendarDays className="h-5 w-5" />} title="Walkthroughs" copy="Scheduled daily" />
            <OpsItem icon={<Wrench className="h-5 w-5" />} title="Install & support" copy="Professional execution" />
            <OpsItem icon={<Route className="h-5 w-5" />} title="Future expansion" copy="Coverage grows with demand" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CityNode({ node, index }: { node: (typeof nodes)[number]; index: number }) {
  return <motion.div initial={{opacity:0,scale:.65}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.12+index*.04}} className="group absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{left:`${node.x}%`,top:`${node.y}%`}}>{node.primary ? <div className="flex flex-col items-center"><span className="absolute h-20 w-20 animate-ping rounded-full border border-blue-400/15"/><span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-sky-300 bg-blue-600/30 text-white shadow-[0_0_48px_rgba(37,99,235,.75)]"><MapPin className="h-7 w-7"/></span><span className="mt-2 text-center"><span className="block text-sm font-black text-white">ATLANTA</span><span className="block font-mono text-[.52rem] font-bold uppercase tracking-[.16em] text-sky-400">Operations hub</span></span></div> : <div className="flex items-center gap-2"><span className={`h-3 w-3 shrink-0 rounded-full border border-white/30 shadow-[0_0_15px_rgba(56,189,248,.9)] ${node.zone==="Core service"?"bg-sky-300":"bg-blue-400"}`}/><span className="whitespace-nowrap rounded bg-[#020817]/78 px-1.5 py-0.5 text-[.62rem] font-semibold text-slate-200 backdrop-blur-sm transition group-hover:bg-[#020817] group-hover:text-white">{node.name}</span></div>}</motion.div>;
}

function InfoCard({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}) { return <div className="rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-5"><span className="text-sky-300">{icon}</span><p className="mt-4 text-sm font-semibold text-white">{title}</p><p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p></div>; }
function OpsItem({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}) { return <div className="flex gap-3 border-sky-400/10 xl:border-r xl:last:border-r-0"><span className="mt-1 text-sky-300">{icon}</span><div><p className="text-xs font-bold text-white">{title}</p><p className="mt-1 text-[.65rem] leading-5 text-slate-500">{copy}</p></div></div>; }

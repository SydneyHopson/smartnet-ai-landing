"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, CalendarDays, Home, MapPin, Navigation, Radar, Route, ShieldCheck, Wrench } from "lucide-react";

const cities = ["Atlanta", "Douglasville", "Lithia Springs", "Austell", "Mableton", "Smyrna", "Marietta", "Sandy Springs", "Decatur", "East Point", "College Park", "Fayetteville"];

const nodes = [
  { name: "Atlanta", x: 55, y: 49, zone: "Operations hub", primary: true },
  { name: "Douglasville", x: 18, y: 49, zone: "Core service" },
  { name: "Lithia Springs", x: 23, y: 59, zone: "Core service" },
  { name: "Austell", x: 37, y: 55, zone: "Core service" },
  { name: "Mableton", x: 39, y: 42, zone: "Core service" },
  { name: "Smyrna", x: 44, y: 31, zone: "Metro service" },
  { name: "Marietta", x: 53, y: 16, zone: "Metro service" },
  { name: "Sandy Springs", x: 55, y: 25, zone: "Metro service" },
  { name: "Decatur", x: 71, y: 47, zone: "Core service" },
  { name: "East Point", x: 54, y: 67, zone: "Core service" },
  { name: "College Park", x: 54, y: 77, zone: "Core service" },
  { name: "Fayetteville", x: 55, y: 91, zone: "Metro service" },
];

const routes = nodes.filter((node) => !node.primary);

export function ServiceAreaSection() {
  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_48%,rgba(37,99,235,.18),transparent_36rem),radial-gradient(circle_at_10%_15%,rgba(14,165,233,.06),transparent_24rem)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      <div className="relative mx-auto grid max-w-[1480px] gap-8 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[.05] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
            <span className="font-mono text-[.62rem] font-bold uppercase tracking-[.2em] text-sky-100">Atlanta operations online</span>
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.28em] text-sky-300">Service area</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">Metro Atlanta first. Built to reach the right project.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">SmartNET keeps its core footprint focused so walkthroughs, installs, support and future expansion stay responsive. Larger and farther-out projects can still be reviewed individually.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {cities.map((city) => <span key={city} className="rounded-full border border-sky-400/20 bg-sky-400/[.05] px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:border-sky-300/45 hover:bg-sky-400/10 hover:text-white">{city}</span>)}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <InfoCard icon={<Home className="h-5 w-5" />} title="Residential & commercial" copy="Homes, offices, retail and light industrial projects." />
            <InfoCard icon={<Building2 className="h-5 w-5" />} title="Extended project review" copy="Larger and out-of-area opportunities can be scoped separately." />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border border-sky-400/25 bg-[linear-gradient(145deg,rgba(5,16,34,.99),rgba(1,6,18,.98))] p-4 shadow-[0_35px_110px_rgba(2,6,23,.55)] sm:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-[.06] [background-image:linear-gradient(rgba(56,189,248,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.55)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative flex flex-wrap items-center justify-between gap-4 px-2 pb-4">
            <div className="flex items-start gap-3"><Radar className="mt-1 h-5 w-5 text-sky-300" /><div><p className="text-xs font-bold uppercase tracking-[.22em] text-sky-300">SmartNET operations coverage</p><p className="mt-1 text-sm text-slate-400">Metro Atlanta project footprint · Atlanta hub</p></div></div>
            <div className="rounded-2xl border border-emerald-400/35 bg-emerald-400/[.06] px-4 py-2.5 text-right shadow-[0_0_24px_rgba(52,211,153,.05)]"><p className="font-mono text-[.55rem] uppercase tracking-[.18em] text-emerald-300/75">Network status</p><p className="mt-1 flex items-center gap-2 text-xs font-bold text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />Coverage active</p></div>
          </div>

          <div className="relative min-h-[570px] overflow-hidden rounded-2xl border border-sky-400/10 bg-[#020817]">
            <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_30%_20%,rgba(30,64,175,.12),transparent_32%),linear-gradient(rgba(56,189,248,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.025)_1px,transparent_1px)] [background-size:auto,32px_32px,32px_32px]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" strokeLinecap="round">
                <path d="M65 430 C150 390 215 380 285 355 C360 330 410 300 500 305 C590 310 675 295 760 310 C835 322 905 350 980 358" stroke="rgba(56,189,248,.24)" strokeWidth="2" />
                <path d="M505 5 C495 95 500 165 505 230 C510 310 510 390 505 470 C500 530 510 575 525 620" stroke="rgba(56,189,248,.20)" strokeWidth="2" />
                <path d="M155 20 C225 105 285 165 350 225 C420 285 485 330 545 405 C600 475 650 545 700 620" stroke="rgba(56,189,248,.13)" strokeWidth="1.5" />
                <path d="M120 530 C210 455 290 410 365 360 C430 318 500 290 580 245 C650 205 720 145 785 60" stroke="rgba(56,189,248,.10)" strokeWidth="1" />
                <path d="M30 260 C135 245 230 245 315 255 C410 265 495 280 590 275 C710 268 820 240 970 225" stroke="rgba(56,189,248,.08)" strokeWidth="1" />
              </g>
              <g fill="none" stroke="rgba(56,189,248,.055)" strokeWidth="1">
                <path d="M90 120 C180 180 210 255 200 360 C190 455 250 530 330 585" /><path d="M850 60 C805 160 810 245 855 330 C900 420 890 500 830 590" /><path d="M250 40 C300 115 325 180 315 250 C305 335 330 410 390 490" /><path d="M690 30 C645 120 640 205 675 285 C715 375 720 460 680 560" />
              </g>
            </svg>

            <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-xl border border-sky-400/15 bg-[#020817]/88 px-4 py-3 backdrop-blur-md">
              <p className="mb-2 font-mono text-[.55rem] uppercase tracking-[.18em] text-slate-500">Coverage radius</p>
              <p className="flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full bg-blue-500" />Core service <span className="text-slate-600">0–25 mi</span></p>
              <p className="mt-2 flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full bg-sky-300" />Metro service <span className="text-slate-600">25–50 mi</span></p>
              <p className="mt-2 flex items-center gap-2 text-[.62rem] text-slate-300"><span className="h-2 w-2 rounded-full border border-slate-400" />Extended review <span className="text-slate-600">50+ mi</span></p>
            </div>

            <div className="pointer-events-none absolute right-5 top-5 z-20 flex h-20 w-20 items-center justify-center opacity-60"><svg viewBox="0 0 80 90" className="h-full w-full"><path d="M15 4 L59 5 L66 17 L64 27 L72 38 L66 47 L69 60 L61 69 L58 83 L45 86 L38 78 L25 79 L18 69 L11 58 L13 46 L7 36 L12 24 Z" fill="rgba(14,165,233,.035)" stroke="rgba(125,211,252,.65)" strokeWidth="1.2"/><text x="39" y="49" textAnchor="middle" fill="rgba(186,230,253,.8)" fontSize="16" fontWeight="700">GA</text></svg></div>

            <div className="pointer-events-none absolute left-[55%] top-[49%] h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400/30" />
            <div className="pointer-events-none absolute left-[55%] top-[49%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/35 bg-sky-400/[.012]" />
            <div className="pointer-events-none absolute left-[55%] top-[49%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/55 bg-blue-500/[.025] shadow-[inset_0_0_45px_rgba(37,99,235,.04)]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute left-[55%] top-[49%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_338deg,rgba(56,189,248,.11)_358deg,transparent_360deg)]" />

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="routeGlow2"><stop offset="0%" stopColor="rgba(56,189,248,.1)"/><stop offset="55%" stopColor="rgba(56,189,248,.75)"/><stop offset="100%" stopColor="rgba(37,99,235,.12)"/></linearGradient></defs>{routes.map((node,index)=><motion.line key={node.name} x1="55" y1="49" x2={node.x} y2={node.y} stroke="url(#routeGlow2)" strokeWidth=".2" initial={{pathLength:0,opacity:0}} whileInView={{pathLength:1,opacity:1}} viewport={{once:true}} transition={{duration:1,delay:index*.045}} />)}</svg>

            {nodes.map((node,index)=><CityNode key={node.name} node={node} index={index} />)}

            <div className="pointer-events-none absolute left-[31%] top-[64%] z-10 hidden w-28 -rotate-[10deg] opacity-85 drop-shadow-[0_12px_24px_rgba(2,6,23,.8)] sm:block"><Image src="/styling/images/smartnet-service-van.png" alt="" width={300} height={160} className="h-auto w-full object-contain" /></div>

            <div className="pointer-events-none absolute left-[26%] top-[25%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-75</div>
            <div className="pointer-events-none absolute right-[20%] top-[33%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-85</div>
            <div className="pointer-events-none absolute right-[8%] top-[53%] rounded-md border border-sky-400/20 bg-[#061328]/90 px-2 py-1 font-mono text-[.55rem] font-bold text-sky-200">I-20</div>
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
  return <motion.div initial={{opacity:0,scale:.65}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.12+index*.04}} className="group absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{left:`${node.x}%`,top:`${node.y}%`}}>{node.primary ? <div className="flex flex-col items-center"><span className="absolute h-20 w-20 animate-ping rounded-full border border-blue-400/15"/><span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-sky-300 bg-blue-600/25 text-white shadow-[0_0_42px_rgba(37,99,235,.65)]"><MapPin className="h-7 w-7"/></span><span className="mt-2 text-center"><span className="block text-sm font-black text-white drop-shadow-lg">ATLANTA</span><span className="block font-mono text-[.52rem] font-bold uppercase tracking-[.16em] text-sky-400">Operations hub</span></span></div> : <div className="flex items-center gap-2"><span className={`h-3 w-3 shrink-0 rounded-full border border-white/30 shadow-[0_0_15px_rgba(56,189,248,.9)] ${node.zone==="Core service"?"bg-sky-300":"bg-blue-400"}`}/><span className="whitespace-nowrap rounded bg-[#020817]/65 px-1.5 py-0.5 text-[.62rem] font-semibold text-slate-200 backdrop-blur-sm transition group-hover:bg-[#020817] group-hover:text-white">{node.name}</span></div>}</motion.div>;
}

function InfoCard({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}) { return <div className="rounded-2xl border border-sky-400/15 bg-[#07101f]/80 p-5"><span className="text-sky-300">{icon}</span><p className="mt-4 text-sm font-semibold text-white">{title}</p><p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p></div>; }
function OpsItem({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}) { return <div className="flex gap-3 border-sky-400/10 xl:border-r xl:last:border-r-0"><span className="mt-1 text-sky-300">{icon}</span><div><p className="text-xs font-bold text-white">{title}</p><p className="mt-1 text-[.65rem] leading-5 text-slate-500">{copy}</p></div></div>; }

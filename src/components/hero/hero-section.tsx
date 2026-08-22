"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroBrandBar } from "./HeroBrandBar";
import { designSummary, services } from "./hero-data";

export function HeroSection() {
  const handleStartEstimateClick = () => {
    document.getElementById("smartnet-generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScheduleWalkthroughClick = () => {
    document.getElementById("booking-calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-[#020617] pb-24 pt-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(37,99,235,.2),transparent_34%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_42%,rgba(14,165,233,.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020617,rgba(2,6,23,.96),#020617)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(56,189,248,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.45)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-10">
        <HeroBrandBar />

        <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
          <div className="relative z-20">
            <div className="inline-flex items-center border-y border-sky-400/40 bg-sky-950/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">AI Powered Project Design</div>
            <h1 className="mt-7 max-w-[720px] text-5xl font-black uppercase leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">Professional<span className="mt-2 block bg-gradient-to-b from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">Low-Voltage</span>Solutions Built Around<span className="block">Your Space<span className="text-blue-500">.</span></span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">SmartNET AI analyzes your project, recommends the right technology, and delivers a professional preliminary estimate in minutes.</p>

            <div className="mt-9 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6">
              {services.map((service) => <div key={service.label} className="flex flex-col items-center text-center"><div className="flex h-12 w-12 items-center justify-center text-sky-300 drop-shadow-[0_0_14px_rgba(56,189,248,.55)]">{service.icon}</div><p className="mt-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-slate-300">{service.label}</p></div>)}
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Button type="button" onClick={handleStartEstimateClick} className="h-16 rounded-md border border-sky-300 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-7 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(37,99,235,.55)] transition hover:scale-[1.015]">Start My AI Estimate<span className="ml-3 text-xl">→</span></Button>
              <Button type="button" variant="outline" onClick={handleScheduleWalkthroughClick} className="h-16 rounded-md border-sky-500/40 bg-slate-950/70 px-7 text-sm font-semibold uppercase tracking-[0.04em] text-slate-100 hover:border-sky-300 hover:bg-sky-950/30"><svg viewBox="0 0 24 24" fill="none" className="mr-3 h-5 w-5 text-sky-300" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 3v4M16 3v4M4 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Schedule Walkthrough</Button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-sky-500/15 pt-6 sm:grid-cols-4">
              {["Licensed & Insured", "Background Verified Pros", "Commercial & Residential", "Enterprise Grade Experience"].map((item) => <div key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,.9)]"/><span>{item}</span></div>)}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="pointer-events-none absolute left-1/2 top-[42%] h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-[170px]" />
            <div className="relative flex min-h-[650px] items-center justify-center xl:min-h-[720px]">
              <div className="relative w-[118%] max-w-none sm:w-[114%] lg:w-[110%] xl:-ml-[7%] xl:w-[138%] 2xl:-ml-[10%] 2xl:w-[145%]">
                <div className="pointer-events-none absolute inset-[6%] rounded-full bg-sky-500/25 blur-[115px]" />
                <div className="relative aspect-[4/3] w-full"><Image src="/hero/images/smartnet-ai-building-v4.png" alt="SmartNET AI holographic low-voltage building blueprint" fill priority loading="eager" sizes="(max-width: 767px) 118vw, (max-width: 1279px) 76vw, 78vw" className="object-contain drop-shadow-[0_0_75px_rgba(37,99,235,.72)]" /></div>
              </div>
            </div>

            <div className="relative z-20 mx-auto -mt-8 w-full max-w-[860px] rounded-2xl border border-sky-400/30 bg-[#020617]/90 p-4 shadow-[0_0_35px_rgba(37,99,235,.22)] backdrop-blur-xl sm:p-5 xl:-mt-20 xl:mr-[2%] xl:w-[84%]">
              <div className="grid gap-6 lg:grid-cols-[1.45fr_.85fr]">
                <div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-sky-300">Design Summary</p><div className="mt-4 grid grid-cols-5 divide-x divide-sky-500/20">{designSummary.map((item) => <div key={item.label} className="px-1 text-center sm:px-2"><div className="mx-auto flex h-8 w-8 items-center justify-center text-sky-300">{item.icon}</div><p className="mt-2 text-base font-bold text-white sm:text-lg">{item.value}</p><p className="mt-1 text-[7px] font-semibold uppercase leading-4 tracking-[0.06em] text-slate-400 sm:text-[9px]">{item.label}</p></div>)}</div></div>
                <div className="border-t border-sky-500/20 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-sky-300">Estimated Investment</p><p className="mt-4 text-2xl font-bold text-emerald-300 sm:text-3xl">$84,000 – $101,000</p><p className="mt-2 text-xs text-slate-400">Preliminary estimate range</p><div className="mt-5 flex h-10 items-end gap-1">{[22,46,30,64,38,72,48,86,55,70,42,92,66,78,50,88,58,74].map((height,index) => <span key={`${height}-${index}`} className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,.4)]" style={{ height: `${height}%` }} />)}</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center"><button type="button" onClick={handleStartEstimateClick} className="group flex items-center gap-3 text-sm font-medium text-slate-400 transition hover:text-sky-300"><span className="uppercase tracking-[0.18em]">Launch SmartNET AI Estimator</span><span className="text-xl transition-transform group-hover:translate-y-1">↓</span></button></div>
      </div>
    </section>
  );
}

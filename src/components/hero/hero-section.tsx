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
    <section className="relative overflow-hidden bg-[#020617] pb-16 pt-5 sm:pb-20 sm:pt-7 xl:pb-24 xl:pt-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(37,99,235,.2),transparent_34%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_42%,rgba(14,165,233,.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020617,rgba(2,6,23,.96),#020617)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(56,189,248,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.45)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <HeroBrandBar />

        <div className="grid gap-5 sm:gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
          <div className="relative z-20">
            <div className="inline-flex items-center border-y border-sky-400/40 bg-sky-950/20 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-sky-300 sm:px-5 sm:text-xs sm:tracking-[0.25em]">AI Powered Project Design</div>

            <h1 className="mt-5 max-w-[720px] text-[2.65rem] font-black uppercase leading-[.96] tracking-[-0.045em] text-white min-[390px]:text-[3rem] sm:mt-7 sm:text-6xl sm:leading-[0.98] lg:text-7xl">
              Professional
              <span className="mt-1 block bg-gradient-to-b from-sky-300 via-blue-500 to-blue-700 bg-clip-text text-transparent sm:mt-2">Low-Voltage</span>
              Solutions Built Around
              <span className="block">Your Space<span className="text-blue-500">.</span></span>
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-6 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">SmartNET AI analyzes your project, recommends the right technology, and delivers a professional preliminary estimate in minutes.</p>

            <div className="mt-6 grid grid-cols-5 gap-1.5 sm:mt-9 sm:gap-4">
              {services.map((service) => (
                <div key={service.label} className="flex min-w-0 flex-col items-center text-center">
                  <div className="flex h-9 w-9 items-center justify-center text-sky-300 drop-shadow-[0_0_14px_rgba(56,189,248,.55)] sm:h-12 sm:w-12">{service.icon}</div>
                  <p className="mt-1.5 text-[7px] font-semibold uppercase leading-3 tracking-[0.035em] text-slate-300 sm:mt-2 sm:text-[10px] sm:leading-4 sm:tracking-[0.08em]">{service.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
              <Button type="button" onClick={handleStartEstimateClick} className="h-14 w-full rounded-xl border border-sky-300 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-5 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(37,99,235,.45)] transition hover:scale-[1.015] sm:h-16 sm:rounded-md sm:px-7 sm:text-sm">Start My AI Estimate<span className="ml-3 text-xl">→</span></Button>
              <Button type="button" variant="outline" onClick={handleScheduleWalkthroughClick} className="h-14 w-full rounded-xl border-sky-500/40 bg-slate-950/70 px-5 text-xs font-semibold uppercase tracking-[0.04em] text-slate-100 hover:border-sky-300 hover:bg-sky-950/30 sm:h-16 sm:rounded-md sm:px-7 sm:text-sm"><svg viewBox="0 0 24 24" fill="none" className="mr-3 h-5 w-5 text-sky-300" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 3v4M16 3v4M4 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Schedule Walkthrough</Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-sky-500/15 pt-5 sm:mt-7 sm:grid-cols-4 sm:gap-3 sm:pt-6">
              {["Licensed & Insured", "Background Verified Pros", "Commercial & Residential", "Enterprise Grade Experience"].map((item) => <div key={item} className="flex items-start gap-2 text-[10px] leading-4 text-slate-400 sm:text-xs sm:leading-5 sm:text-slate-300"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,.9)] sm:h-2 sm:w-2"/><span>{item}</span></div>)}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="pointer-events-none absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[130px] sm:h-[720px] sm:w-[720px] xl:h-[860px] xl:w-[860px] xl:bg-blue-600/25 xl:blur-[170px]" />
            <div className="relative flex min-h-[330px] items-center justify-center sm:min-h-[520px] xl:min-h-[720px]">
              <div className="relative -mx-[12%] w-[124%] max-w-none sm:-mx-[7%] sm:w-[114%] lg:mx-0 lg:w-[110%] xl:-ml-[7%] xl:w-[138%] 2xl:-ml-[10%] 2xl:w-[145%]">
                <div className="pointer-events-none absolute inset-[8%] rounded-full bg-sky-500/20 blur-[80px] sm:inset-[6%] sm:bg-sky-500/25 sm:blur-[115px]" />
                <div className="relative aspect-[4/3] w-full"><Image src="/hero/images/smartnet-ai-building-v5.png" alt="SmartNET AI holographic low-voltage building blueprint" fill priority loading="eager" sizes="(max-width: 640px) 124vw, (max-width: 1279px) 114vw, 78vw" className="object-contain drop-shadow-[0_0_45px_rgba(37,99,235,.58)] sm:drop-shadow-[0_0_75px_rgba(37,99,235,.72)]" /></div>
              </div>
            </div>

            <div className="relative z-20 mx-auto -mt-4 w-full rounded-2xl border border-sky-400/25 bg-[#020617]/92 p-4 shadow-[0_0_28px_rgba(37,99,235,.18)] backdrop-blur-xl sm:-mt-8 sm:max-w-[860px] sm:p-5 xl:-mt-20 xl:mr-[2%] xl:w-[84%]">
              <div className="grid gap-5 lg:grid-cols-[1.45fr_.85fr] lg:gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-sky-300 sm:text-xs">Design Summary</p>
                  <div className="mt-4 grid grid-cols-4 divide-x divide-sky-500/20">
                    {designSummary.map((item) => <div key={item.label} className="min-w-0 px-1 text-center sm:px-2"><div className="mx-auto flex h-7 w-7 items-center justify-center text-sky-300 sm:h-8 sm:w-8">{item.icon}</div><p className="mt-2 text-sm font-bold text-white sm:text-lg">{item.value}</p><p className="mt-1 text-[6px] font-semibold uppercase leading-3 tracking-[0.04em] text-slate-400 sm:text-[9px] sm:leading-4 sm:tracking-[0.06em]">{item.label}</p></div>)}
                  </div>
                </div>
                <div className="border-t border-sky-500/20 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-sky-300 sm:text-xs">Estimated Investment</p><p className="mt-2 text-2xl font-bold text-emerald-300 sm:mt-4 sm:text-3xl">$84,000 – $101,000</p><p className="mt-1 text-[10px] text-slate-400 sm:mt-2 sm:text-xs">Preliminary estimate range</p><div className="mt-4 flex h-8 items-end gap-1 sm:mt-5 sm:h-10">{[22,46,30,64,38,72,48,86,55,70,42,92,66,78,50,88,58,74].map((height,index) => <span key={`${height}-${index}`} className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 to-sky-300 shadow-[0_0_8px_rgba(56,189,248,.4)]" style={{ height: `${height}%` }} />)}</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-16"><button type="button" onClick={handleStartEstimateClick} className="group flex items-center gap-3 text-[10px] font-medium text-slate-400 transition hover:text-sky-300 sm:text-sm"><span className="uppercase tracking-[0.14em] sm:tracking-[0.18em]">Launch SmartNET AI Estimator</span><span className="text-lg transition-transform group-hover:translate-y-1 sm:text-xl">↓</span></button></div>
      </div>
    </section>
  );
}

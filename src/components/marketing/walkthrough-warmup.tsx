"use client";

import { Camera, CheckCircle2, ClipboardList, FileCheck, MoveRight } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Walk the space", body: "We verify the doors, rooms, exterior areas and priorities that matter most." },
  { icon: Camera, title: "Confirm placement", body: "Camera angles, AP locations, mounting conditions and cable routes get checked against the real site." },
  { icon: FileCheck, title: "Finalize the proposal", body: "Your AI range becomes a field-verified scope you can approve, adjust or phase." },
];

export function WalkthroughWarmupSection() {
  const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative overflow-hidden bg-[#010512] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,.15),transparent_34rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-sky-400/20 bg-[linear-gradient(135deg,rgba(8,17,34,.98),rgba(2,6,23,.94))] p-6 shadow-[0_28px_90px_rgba(2,6,23,.45)] sm:p-9 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-300">Next step</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Turn the AI estimate into a real install plan.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">The walkthrough is where SmartNET verifies the details software cannot see from a questionnaire alone.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-4 py-2 text-xs font-semibold text-emerald-200"><CheckCircle2 className="h-4 w-4" /> No work begins until you approve the final scope.</div>
            </div>

            <div className="grid gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return <div key={step.title} className="flex gap-4 rounded-2xl border border-sky-400/12 bg-[#020617]/55 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300"><Icon className="h-5 w-5" /></span><div><p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-slate-600">0{index + 1}</p><h3 className="mt-1 text-base font-bold text-white">{step.title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{step.body}</p></div></div>;
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-sky-400/10 pt-7 sm:flex-row">
            <button type="button" onClick={() => scrollToId("smartnet-generator")} className="rounded-xl border border-sky-400/20 bg-[#020617] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-white">Adjust my estimate</button>
            <button type="button" onClick={() => scrollToId("booking-calendar")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(37,99,235,.35)] transition hover:brightness-110">Schedule walkthrough <MoveRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

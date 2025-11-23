"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const handleStartEstimateClick = () => {
    // Scroll to the separate SmartNetGeneratorSection
    const el = document.getElementById("smartnet-generator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#020617] pb-20 pt-10">
      {/* Ambient background glow over whole hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(3,7,18,1),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* TOP: Logo + Brand */}
        <header className="mb-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Floating logo */}
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_10%,rgba(56,189,248,0.6),rgba(15,23,42,0))] opacity-50 blur-sm" />
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl">
                <Image
                  src="/logos/images/smartnet3.png"
                  alt="SmartNET Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]"
                />
              </div>
            </div>

            <div className="leading-tight">
              <p className="text-[1.1rem] font-semibold uppercase tracking-[0.18em] text-sky-200">
                SMARTNET INSTALLATIONS
              </p>
              <p className="text-[0.8rem] text-[#8ea5c7] tracking-wide">
                Precision · Security · Low-Voltage Systems
              </p>
            </div>
          </div>

          <div className="hidden text-right text-[0.75rem] text-[#7f96b2] sm:block">
            <p className="uppercase tracking-[0.18em] text-sky-300">
              Licensed · Insured
            </p>
            <p>Commercial + Residential Cabling &amp; Security</p>
          </div>
        </header>

        {/* MAIN ROW: Copy + mascot */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* LEFT: Copy + CTAs */}
          <div className="flex-1 space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-900/10 px-3 py-1 text-[0.7rem] font-medium tracking-[0.2em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              SMARTNET INSTALLATION · AI ESTIMATES
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-[#f3f7ff] sm:text-[2.6rem] sm:leading-[1.05]">
                Start my space,
                <br />
                drop in your square
                <br />
                footage or photos.
              </h1>

              {/* Micro-tagline */}
              <p className="text-[0.85rem] font-medium text-sky-200/90">
                A smarter way to wire your world.
              </p>

              {/* Body copy */}
              <p className="mx-auto max-w-xl text-sm text-[#9fb8d7] sm:mx-0 sm:text-[0.95rem]">
                In a few clicks, SmartNET gives you a rough AI estimate for
                cameras, cabling, and Wi-Fi—then walks you straight into a real
                install window with a human crew.
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-2 grid grid-cols-1 justify-items-center gap-2 text-[0.7rem] text-sky-100 sm:grid-cols-2 sm:justify-items-start">
              <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1">
                Certified low-voltage &amp; structured cabling
              </span>
              <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1">
                Enterprise-grade networking experience
              </span>
              <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1">
                Licensed · Insured · Background-verified
              </span>
              <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1">
                Residential &amp; commercial ready
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2 sm:justify-start">
              <Button
                onClick={handleStartEstimateClick}
                className="rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-6 py-2.5 text-xs font-semibold tracking-wide text-slate-950 shadow-[0_0_30px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
              >
                Start My AI Estimate
              </Button>

              {/* Hover-reveal phone number */}
              <Button
                variant="outline"
                className="group relative overflow-hidden rounded-full border-sky-500/40 bg-transparent px-5 py-2.5 text-xs font-medium text-[#d4e5fb] hover:bg-slate-900/40 hover:text-white"
              >
                <span className="block transition-opacity duration-200 group-hover:opacity-0">
                  Talk to a human instead
                </span>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[0.75rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Call 312-312-0654
                </span>
              </Button>
            </div>

            {/* What you'll get today */}
            <div className="space-y-1 pt-3 text-[0.75rem] text-slate-200">
              <p className="font-semibold text-[#c6daf4]">
                What you&apos;ll get today:
              </p>
              <ul className="mx-auto space-y-1 text-center text-slate-300 sm:mx-0 sm:text-left">
                <li>· AI-powered rough estimate for cams, APs, and cabling</li>
                <li>
                  · Your walkthrough appointment (onsite or virtual, based on
                  your schedule)
                </li>
                <li>· A clean, human-verified install plan</li>
              </ul>
            </div>

            {/* Field experience */}
            <div className="mt-3 space-y-1 text-[0.75rem] text-[#7f96b2]">
              <p className="font-semibold text-[#c6daf4]">
                Lock in your time with real field experience:
              </p>
              <ul className="mx-auto space-y-1 text-center sm:mx-0 sm:text-left">
                <li>· Low-voltage and structured cabling background</li>
                <li>· Enterprise-grade networking and security</li>
                <li>· Residential, commercial, and new construction ready</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Mascot + glow */}
          <div className="relative flex flex-1 items-center justify-center group">
            {/* Soft glow field */}
            <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5),transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute h-52 w-52 translate-x-20 translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.4),transparent_70%)] blur-3xl" />

            {/* Mascot + fireflies + label */}
            <div className="relative flex flex-col items-center gap-3">
              <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                <div className="relative z-20 h-full w-full motion-safe:animate-[float_6s_ease-in-out_infinite]">
                  <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:rotate-[1deg]">
                    <Image
                      src="/mascot/images/mascot1.png"
                      alt="SmartNET AI Mascot"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_0_32px_rgba(56,189,248,0.95)]"
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-30">
                  <div
                    className="absolute -top-3 left-[18%] h-1.5 w-1.5 rounded-full bg-sky-200/90 blur-[1px] motion-safe:animate-[float_7s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="absolute -top-4 right-[16%] h-1.5 w-1.5 rounded-full bg-cyan-200/90 blur-[1px] motion-safe:animate-[float_6s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.8s" }}
                  />
                  <div
                    className="absolute top-[40%] -left-3 h-1.5 w-1.5 rounded-full bg-sky-100/90 blur-[1px] motion-safe:animate-[float_9s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <div
                    className="absolute top-[48%] -right-3 h-1.5 w-1.5 rounded-full bg-indigo-200/90 blur-[1px] motion-safe:animate-[float_8s_ease-in-out_infinite]"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute -bottom-3 left-[22%] h-1.5 w-1.5 rounded-full bg-cyan-100/90 blur-[1px] motion-safe:animate-[float_7s_ease-in-out_infinite]"
                    style={{ animationDelay: "1.4s" }}
                  />
                  <div
                    className="absolute -bottom-2 right-[20%] h-1.5 w-1.5 rounded-full bg-sky-100/90 blur-[1px] motion-safe:animate-[float_10s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="rounded-full border border-sky-500/50 bg-slate-950/70 px-4 py-1.5 text-[0.7rem] text-sky-100 backdrop-blur">
                  SmartNET AI · Install Assistant
                </div>
                <p className="max-w-xs text-[0.68rem] text-slate-300">
                  Scans your space and builds the first pass of your estimate,
                  so your installer never starts from zero.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-12 right-4 hidden sm:block motion-safe:animate-[float_7s_ease-in-out_infinite]">
              <div className="relative rounded-2xl border border-sky-500/40 bg-slate-950/90 px-3 py-2 text-[0.7rem] text-slate-100 shadow-[0_0_20px_rgba(15,23,42,0.9)] backdrop-blur">
                <span className="pointer-events-none absolute -left-1 bottom-2 h-2 w-2 rotate-45 border-l border-b border-sky-500/40 bg-slate-950/90" />
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-sky-300">
                  &quot;Here&apos;s what I&apos;m seeing&quot;
                </p>
                <p className="mt-1 text-[0.7rem] text-sky-100">
                  1,200–2,400 ft² · 4–8 cams · 1–3 APs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Helper CTA under hero */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleStartEstimateClick}
            className="group inline-flex items-center gap-2 text-[0.75rem] text-slate-500 transition hover:text-sky-200"
          >
            <span className="tracking-[0.18em] uppercase">
              Jump to SmartNET AI Generator
            </span>
            <span className="text-sky-400 transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiEstimatorCard } from "@/components/AiEstimator/AiEstimatorCard";
import {
  useSmartNetEstimate,
  SmartNetEstimate,
} from "./SmartNetEstimateProvider";

type WizardStep = 1 | 2 | 3 | 4;

const panelVariants = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

export function SmartNetGeneratorSection() {
  const [step, setStep] = React.useState<WizardStep>(1);

  const step2Ref = React.useRef<HTMLDivElement | null>(null);
  const step3Ref = React.useRef<HTMLDivElement | null>(null);
  const step4Ref = React.useRef<HTMLDivElement | null>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToStep = (target: WizardStep) => {
    setStep(target);
    if (target === 2) scrollToRef(step2Ref);
    if (target === 3) scrollToRef(step3Ref);
    if (target === 4) scrollToRef(step4Ref);
  };

  const handleContinueToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="smartnet-generator"
      className="border-t border-slate-800/60 bg-[#020617] pb-24 pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 space-y-6">
        {/* Header + buddy card */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
              SmartNET AI Generator
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-50 sm:text-[1.4rem]">
              Tell SmartNET about your space, then we&apos;ll walk you through
              dates and install options.
            </h2>
            <p className="mt-1 max-w-xl text-[0.8rem] text-slate-400">
              Think of this as your pre-flight checklist. We dial in space,
              focus, extras, and style here—then show you a summary before you
              ever pick a date.
            </p>
          </div>

          {/* Buddy HUD */}
          <BuddyHud step={step} />
        </div>

        {/* Step nav */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-[0.75rem] shadow-[0_0_35px_rgba(15,23,42,0.9)]">
          <StepPill
            step={1}
            label="Space & focus"
            active={step === 1}
            onClick={() => goToStep(1)}
          />
          <StepPill
            step={2}
            label="Devices & extras"
            active={step === 2}
            onClick={() => goToStep(2)}
          />
          <StepPill
            step={3}
            label="Equipment style"
            active={step === 3}
            onClick={() => goToStep(3)}
          />
          <StepPill
            step={4}
            label="Summary preview"
            active={step === 4}
            onClick={() => goToStep(4)}
          />

          <div className="ml-auto hidden items-center gap-2 text-[0.7rem] text-slate-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span>Buddy updates live as you go</span>
          </div>
        </div>

        {/* STEP 1 – main generator card (always visible) */}
        <AnimatePresence mode="wait">
          <motion.div
            key="step-1-card"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AiEstimatorCard onNextStep={() => goToStep(2)} />
          </motion.div>
        </AnimatePresence>

        {/* STEP 2 – devices & extras */}
        <div ref={step2Ref}>
          {step >= 2 && (
            <motion.div
              key="step-2-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-6 rounded-[1.6rem] border border-slate-800 bg-slate-950/70 p-5 text-[0.8rem] text-slate-300 shadow-[0_0_45px_rgba(15,23,42,0.95)]"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 2 · Devices & extras
              </p>
              <Step2DevicesExtras onNext={() => goToStep(3)} />
            </motion.div>
          )}
        </div>

        {/* STEP 3 – style */}
        <div ref={step3Ref}>
          {step >= 3 && (
            <motion.div
              key="step-3-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-6 rounded-[1.6rem] border border-slate-800 bg-slate-950/70 p-5 text-[0.8rem] text-slate-300 shadow-[0_0_45px_rgba(15,23,42,0.95)]"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 3 · Equipment style
              </p>
              <Step3Style onNext={() => goToStep(4)} />
            </motion.div>
          )}
        </div>

        {/* STEP 4 – summary */}
        <div ref={step4Ref}>
          {step >= 4 && (
            <motion.div
              key="step-4-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-6 rounded-[1.6rem] border border-slate-800 bg-slate-950/80 p-5 text-[0.8rem] text-slate-300 shadow-[0_0_55px_rgba(15,23,42,0.98)]"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step 4 · Summary preview
              </p>
              <Step4Summary onContinue={handleContinueToBooking} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// --- Buddy HUD ---------------------------------------------------------

function BuddyHud({ step }: { step: WizardStep }) {
  const titles: Record<WizardStep, string> = {
    1: "Step 1 of 4",
    2: "Step 2 of 4",
    3: "Step 3 of 4",
    4: "Step 4 of 4",
  };

  const captions: Record<WizardStep, string> = {
    1: "Start with the basics: space size and what matters most—cameras, Wi-Fi, or access control.",
    2: "Dial in how heavy your coverage is and what extras you want layered in.",
    3: "Pick wiring style, rack location, and urgency so we know the level of craftsmanship you expect.",
    4: "Here’s your AI-built snapshot before you lock in a walkthrough slot.",
  };

  return (
    <div className="rounded-2xl border border-sky-500/60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),_rgba(15,23,42,0.98))] px-4 py-3 text-[0.75rem] text-sky-50 shadow-[0_0_60px_rgba(56,189,248,0.9)]">
      <div className="mb-2 flex items-center gap-3">
        <div className="relative h-9 w-9">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_10%,rgba(56,189,248,0.95),rgba(15,23,42,1))] blur-[4px]" />
          <div className="absolute inset-[3px] flex items-center justify-center rounded-full border border-sky-300/80 bg-[#020617]/95 shadow-[0_0_26px_rgba(56,189,248,1)]">
            <div className="h-4 w-4 animate-pulse rounded-full bg-sky-300 shadow-[0_0_26px_rgba(56,189,248,1)]" />
          </div>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-sky-200">
            SmartNET AI Buddy
          </p>
          <p className="text-[0.7rem] font-semibold text-sky-50">
            {titles[step]}
          </p>
        </div>
      </div>
      <p className="text-[0.7rem] text-sky-50/80">{captions[step]}</p>
    </div>
  );
}

// --- Step pills --------------------------------------------------------

type StepPillProps = {
  step: number;
  label: string;
  active: boolean;
  onClick: () => void;
};

function StepPill({ step, label, active, onClick }: StepPillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition";

  const activeClasses =
    "border-sky-400 bg-slate-900 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.8)]";

  const inactive =
    "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-sky-400 hover:text-sky-100";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeClasses : inactive}`}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[0.65rem] text-sky-300">
        {step}
      </span>
      <span className="text-[0.7rem]">{label}</span>
    </button>
  );
}

// --- Step 2 – devices & extras -----------------------------------------

function Step2DevicesExtras({ onNext }: { onNext: () => void }) {
  const { estimate, updateEstimate } = useSmartNetEstimate();

  const setDevices = (partial: Partial<SmartNetEstimate["devices"]>) => {
    updateEstimate({ devices: { ...estimate.devices, ...partial } });
  };

  const toggleExtra = (key: keyof SmartNetEstimate["extras"]) => {
    updateEstimate({
      extras: {
        ...estimate.extras,
        [key]: !estimate.extras[key],
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Cameras intensity */}
      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Camera coverage
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(["light", "standard", "heavy"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDevices({ cameras: level })}
              className={
                estimate.devices.cameras === level
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {level === "light" && "Entry points only"}
              {level === "standard" && "Most common areas"}
              {level === "heavy" && "Full coverage"}
            </button>
          ))}
        </div>
      </div>

      {/* AP mesh */}
      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Wi-Fi / AP layout
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(["light", "standard", "mesh"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDevices({ aps: level })}
              className={
                estimate.devices.aps === level
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {level === "light" && "Few APs"}
              {level === "standard" && "Balanced coverage"}
              {level === "mesh" && "Dense mesh"}
            </button>
          ))}
        </div>
      </div>

      {/* Doors / access */}
      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Doors / access points
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(["none", "a-few", "multi-door"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setDevices({ doors: opt })}
              className={
                estimate.devices.doors === opt
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {opt === "none" && "No access control"}
              {opt === "a-few" && "Front/back + 1–2 doors"}
              {opt === "multi-door" && "Many internal doors"}
            </button>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Extras to layer in
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          <ExtraPill
            label="Ceiling speakers"
            active={estimate.extras.speakers}
            onClick={() => toggleExtra("speakers")}
          />
          <ExtraPill
            label="Wall displays / screens"
            active={estimate.extras.wallDisplays}
            onClick={() => toggleExtra("wallDisplays")}
          />
          <ExtraPill
            label="Mini network rack"
            active={estimate.extras.miniRack}
            onClick={() => toggleExtra("miniRack")}
          />
          <ExtraPill
            label="Battery backup / UPS"
            active={estimate.extras.batteryBackup}
            onClick={() => toggleExtra("batteryBackup")}
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.75rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_20px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
        >
          Step 3: Style &amp; complexity
        </button>
      </div>
    </div>
  );
}

function ExtraPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-sky-400 bg-slate-900 text-sky-100 px-3 py-1 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
          : "rounded-full border border-slate-700 bg-slate-900/70 text-slate-300 px-3 py-1"
      }
    >
      {label}
    </button>
  );
}

// --- Step 3 – style -----------------------------------------------------

function Step3Style({ onNext }: { onNext: () => void }) {
  const { estimate, updateEstimate } = useSmartNetEstimate();

  const setStyle = (partial: Partial<SmartNetEstimate["style"]>) => {
    updateEstimate({ style: { ...estimate.style, ...partial } });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Wiring style
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(
            ["exposed-conduit", "hidden-in-walls", "mix"] as const
          ).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setStyle({ wiring: opt })}
              className={
                estimate.style.wiring === opt
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {opt === "exposed-conduit" && "Exposed conduit runs"}
              {opt === "hidden-in-walls" && "Hidden in walls / ceilings"}
              {opt === "mix" && "Mix of both"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Rack location
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(["closet", "utility", "idc"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setStyle({ rackLocation: opt })}
              className={
                estimate.style.rackLocation === opt
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {opt === "closet" && "Hall / office closet"}
              {opt === "utility" && "Garage / utility room"}
              {opt === "idc" && "Dedicated IDF / MDF"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
          Timeline
        </p>
        <div className="flex flex-wrap gap-2 text-[0.7rem]">
          {(["flexible", "soon", "rush"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setStyle({ urgency: opt })}
              className={
                estimate.style.urgency === opt
                  ? "rounded-full border border-sky-400 bg-slate-900 px-3 py-1 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-300"
              }
            >
              {opt === "flexible" && "Flexible"}
              {opt === "soon" && "Within a month"}
              {opt === "rush" && "ASAP / rush"}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.75rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_20px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
        >
          Step 4: See summary &amp; range
        </button>
      </div>
    </div>
  );
}

// --- Step 4 – summary ---------------------------------------------------

function Step4Summary({ onContinue }: { onContinue: () => void }) {
  const { estimate, recomputePrice } = useSmartNetEstimate();

  React.useEffect(() => {
    recomputePrice();
  }, [recomputePrice]);

  const {
    projectType,
    squareFootage,
    focus,
    extras,
    devices,
    style,
    priceLow,
    priceHigh,
    estCameras,
    estAps,
    notes,
  } = estimate;

  const focusList = [
    focus.cameras && "Cameras",
    focus.wifi && "Wi-Fi / APs",
    focus.accessControl && "Access control",
  ]
    .filter(Boolean)
    .join(" · ");

  const extrasList = Object.entries(extras)
    .filter(([, v]) => v)
    .map(([k]) =>
      k
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase())
    )
    .join(" · ");

  return (
    <div className="space-y-4 text-[0.8rem]">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <p className="text-[0.7rem] text-slate-400">Project</p>
          <p className="font-semibold text-sky-100 capitalize">
            {projectType} · {squareFootage.toLocaleString()} ft²
          </p>
          <p className="text-[0.7rem] text-slate-400">
            Focus: {focusList || "Not set yet"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.7rem] text-slate-400">AI rough range</p>
          <p className="text-[1rem] font-semibold text-sky-100">
            ${priceLow.toLocaleString()} – ${priceHigh.toLocaleString()}
          </p>
          <p className="text-[0.7rem] text-slate-500">
            ~{estCameras} cams · ~{estAps} APs
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
            Device profile
          </p>
          <p className="text-slate-300">
            Cameras: {devices.cameras} · APs: {devices.aps} · Doors:{" "}
            {devices.doors}
          </p>
          <p className="mt-2 text-[0.7rem] text-slate-400">
            Extras: {extrasList || "No extras selected"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-sky-300">
            Style &amp; notes
          </p>
          <p className="text-slate-300">
            Wiring: {style.wiring} · Rack: {style.rackLocation} · Timeline:{" "}
            {style.urgency}
          </p>
          <p className="mt-2 text-[0.7rem] text-slate-400">
            Notes: {notes || "You can add special instructions in Step 1."}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.75rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_26px_rgba(63,201,255,0.95)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
        >
          Looks good — continue to booking
        </button>
      </div>
    </div>
  );
}

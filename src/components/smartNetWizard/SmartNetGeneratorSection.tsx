"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AiEstimatorCard } from "@/components/AiEstimator/AiEstimatorCard";
import {
  useSmartNetEstimate,
  CoveragePreset,
  WifiLayoutPreset,
  AccessPreset,
  WiringStyle,
  RackLocation,
  TimelinePreference,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

type StepIndex = 1 | 2 | 3 | 4;

const sectionCardClasses =
  "rounded-[1.6rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.96),rgba(3,7,18,1))] shadow-[0_0_45px_rgba(15,23,42,0.95)]";

const sectionInnerPad = "px-5 py-6 sm:px-7 sm:py-7";

type SmartNetGeneratorSectionProps = {
  /**
   * If true (e.g. when resuming from a magic link),
   * start on Step 4 and unlock all steps.
   */
  startOnSummary?: boolean;
};

/**
 * ✅ Named export so `import { SmartNetGeneratorSection } ...` works
 */
export function SmartNetGeneratorSection({
  startOnSummary = false,
}: SmartNetGeneratorSectionProps) {
  const [activeStep, setActiveStep] = React.useState<StepIndex>(
    startOnSummary ? 4 : 1
  );
  const [maxStep, setMaxStep] = React.useState<StepIndex>(
    startOnSummary ? 4 : 1
  );

  // Briefly highlight the Summary nav pill when resuming
  const [highlightSummary, setHighlightSummary] =
    React.useState<boolean>(startOnSummary);

  React.useEffect(() => {
    if (!startOnSummary) return;

    // Auto-scroll Step 4 into view after layout
    const scrollTimeout = window.setTimeout(() => {
      const el = document.getElementById("smartnet-step-4");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;

      window.scrollTo({
        top: absoluteTop - 24,
        behavior: "smooth",
      });
    }, 400);

    // Turn off the pill highlight after a short moment
    const highlightTimeout = window.setTimeout(() => {
      setHighlightSummary(false);
    }, 2500);

    return () => {
      window.clearTimeout(scrollTimeout);
      window.clearTimeout(highlightTimeout);
    };
  }, [startOnSummary]);

  const goToStep = (target: StepIndex, id?: string) => {
    setActiveStep(target);
    setMaxStep((prev) => (target > prev ? target : prev));

    if (id) {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        window.scrollTo({
          // small offset so it tucks nicely under the viewport
          top: absoluteTop - 24,
          behavior: "smooth",
        });
      });
    }
  };

  return (
    <section
      id="smartnet-generator"
      className="border-t border-slate-800/60 bg-[#020617] pb-24 pt-16"
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        {/* Header row: copy + buddy HUD */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sky-300">
              SmartNET AI Generator
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-[1.4rem]">
              Tell SmartNET about your space, then we&apos;ll walk you through
              dates and install options.
            </h2>
            <p className="text-[0.8rem] text-slate-400">
              Think of this as your pre-flight checklist. We dial in space,
              focus, extras, and style here—then show you a summary before you
              ever pick a date.
            </p>
          </div>

          {/* Buddy HUD */}
          <div className="mt-2 w-full max-w-xs self-start rounded-2xl border border-sky-500/40 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),rgba(15,23,42,0.98))] px-4 py-3 text-[0.72rem] text-slate-100 shadow-[0_0_42px_rgba(56,189,248,0.9)]">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_10%,rgba(56,189,248,0.9),rgba(15,23,42,1))] blur-[5px]" />
                <div className="absolute inset-[3px] flex items-center justify-center rounded-full border border-sky-300/80 bg-[#020617]/95 shadow-[0_0_24px_rgba(56,189,248,1)]">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-sky-200 shadow-[0_0_18px_rgba(56,189,248,1)]" />
                </div>
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-200">
                  SmartNET AI Buddy
                </p>
                <p className="text-[0.68rem] text-slate-200">
                  Updates live as you tweak space, devices, and style—then hands
                  everything off to your walkthrough booking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 💚 Welcome-back banner when using a magic link */}
        {startOnSummary && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-xl border border-emerald-400/40 bg-emerald-900/20 px-3 py-2 text-[0.75rem] text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.65)]"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
            Welcome back — we&apos;ve restored your last SmartNET estimate from
            your magic link.
          </motion.div>
        )}

        {/* 🔹 Step progress bar */}
        <StepProgress activeStep={activeStep} maxStep={maxStep} totalSteps={4} />

        {/* Step nav */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-[0.75rem] shadow-[0_0_35px_rgba(15,23,42,0.9)]">
          <NavPill
            step={1}
            label="Space & focus"
            active={activeStep === 1}
            disabled={false}
            onClick={() => goToStep(1, "smartnet-step-1")}
          />
          <NavPill
            step={2}
            label="Devices & extras"
            active={activeStep === 2}
            disabled={maxStep < 2}
            onClick={() => maxStep >= 2 && goToStep(2, "smartnet-step-2")}
          />
          <NavPill
            step={3}
            label="Equipment style"
            active={activeStep === 3}
            disabled={maxStep < 3}
            onClick={() => maxStep >= 3 && goToStep(3, "smartnet-step-3")}
          />
          <NavPill
            step={4}
            label="Summary preview"
            active={activeStep === 4}
            disabled={maxStep < 4}
            onClick={() => maxStep >= 4 && goToStep(4, "smartnet-step-4")}
            highlight={highlightSummary}
          />

          <div className="ml-auto hidden items-center gap-2 text-[0.7rem] text-slate-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span>Buddy updates live as you go</span>
          </div>
        </div>

        {/* STEP 1 – always visible */}
        <StepWrapper
          id="smartnet-step-1"
          label="Step 1 · Space & focus"
          dimmed={activeStep !== 1}
        >
          <AiEstimatorCard
            onNextStep={() => goToStep(2 as StepIndex, "smartnet-step-2")}
          />
        </StepWrapper>

        {/* STEP 2 – only rendered once unlocked */}
        {maxStep >= 2 && (
          <StepWrapper
            id="smartnet-step-2"
            label="Step 2 · Devices & extras"
            dimmed={activeStep !== 2}
          >
            <Step2DevicesExtras
              onNextStep={() => goToStep(3 as StepIndex, "smartnet-step-3")}
            />
          </StepWrapper>
        )}

        {/* STEP 3 – only rendered once unlocked */}
        {maxStep >= 3 && (
          <StepWrapper
            id="smartnet-step-3"
            label="Step 3 · Equipment style"
            dimmed={activeStep !== 3}
          >
            <Step3EquipmentStyle
              onNextStep={() => goToStep(4 as StepIndex, "smartnet-step-4")}
            />
          </StepWrapper>
        )}

        {/* STEP 4 – only rendered once unlocked */}
        {maxStep >= 4 && (
          <StepWrapper
            id="smartnet-step-4"
            label="Step 4 · Summary & range"
            dimmed={activeStep !== 4}
          >
            <Step4SummaryAndRange />
          </StepWrapper>
        )}
      </div>
    </section>
  );
}

/* ----------------- STEP PROGRESS ----------------- */

type StepProgressProps = {
  activeStep: StepIndex;
  maxStep: StepIndex;
  totalSteps: number;
};

function StepProgress({ activeStep, maxStep, totalSteps }: StepProgressProps) {
  const percent = (maxStep / totalSteps) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
        <span>
          Step {activeStep} of {totalSteps}
        </span>
        <span className="text-sky-300">
          {maxStep === totalSteps
            ? "You’re ready to pick a walkthrough time"
            : "Fill this in once, reuse it for every quote"}
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-900/80">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 shadow-[0_0_20px_rgba(56,189,248,0.9)] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* ----------------- shared shells ----------------- */

type StepWrapperProps = {
  id: string;
  label: string;
  dimmed?: boolean;
  children: React.ReactNode;
};

function StepWrapper({ id, label, dimmed, children }: StepWrapperProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.25 }}
      className={`${sectionCardClasses} ${
        dimmed ? "opacity-95" : "opacity-100"
      }`}
    >
      <div className={sectionInnerPad}>
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

type NavPillProps = {
  step: number;
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  highlight?: boolean;
};

function NavPill({
  step,
  label,
  active,
  disabled,
  onClick,
  highlight,
}: NavPillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition";
  const activeClasses =
    "border-sky-400 bg-slate-900 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.8)]";
  const inactive = disabled
    ? "border-slate-800 bg-slate-900/40 text-slate-500 cursor-not-allowed"
    : "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-sky-400 hover:text-sky-100";

  const highlightClasses = highlight
    ? "ring-2 ring-emerald-400/70 ring-offset-2 ring-offset-slate-950 animate-pulse"
    : "";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${base} ${active ? activeClasses : inactive} ${highlightClasses}`}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[0.65rem] text-sky-300">
        {step}
      </span>
      <span className="text-[0.7rem]">{label}</span>
    </button>
  );
}

/* ----------------- STEP 2 ----------------- */

type Step2DevicesExtrasProps = {
  onNextStep?: () => void;
};

function Step2DevicesExtras({ onNextStep }: Step2DevicesExtrasProps) {
  const { estimate, updateEstimate } = useSmartNetEstimate();

  const setCoverage = (value: CoveragePreset) =>
    updateEstimate({ coveragePreset: value });
  const setWifi = (value: WifiLayoutPreset) =>
    updateEstimate({ wifiLayoutPreset: value });
  const setAccess = (value: AccessPreset) =>
    updateEstimate({ accessPreset: value });

  const toggleExtra = (key: keyof typeof estimate.extras) => {
    updateEstimate({
      extras: {
        ...estimate.extras,
        [key]: !estimate.extras[key],
      },
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-[0.8rem] text-slate-300">
        Here we zoom in on how dense you want coverage and what extras matter.
        This quietly nudges the device count and budget that show up in Step 4.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Column 1 */}
        <div className="space-y-5">
          {/* Camera coverage */}
          <div className="space-y-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Camera coverage
            </p>
            <p className="text-[0.7rem] text-slate-400">
              How much of the property should feel &quot;on camera&quot;?
            </p>
            <div className="flex flex-wrap justify-start gap-2 md:justify-center lg:justify-start">
              <ChoicePill
                label="Entry points only"
                active={estimate.coveragePreset === "entry"}
                onClick={() => setCoverage("entry")}
              />
              <ChoicePill
                label="Most common areas"
                active={estimate.coveragePreset === "common"}
                onClick={() => setCoverage("common")}
              />
              <ChoicePill
                label="Full coverage"
                active={estimate.coveragePreset === "full"}
                onClick={() => setCoverage("full")}
              />
            </div>
          </div>

          {/* Wi-Fi / AP layout */}
          <div className="space-y-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Wi-Fi / AP layout
            </p>
            <p className="text-[0.7rem] text-slate-400">
              Pick how tight you want the Wi-Fi mesh—light, balanced, or dense.
            </p>
            <div className="flex flex-wrap justify-start gap-2 md:justify-center lg:justify-start">
              <ChoicePill
                label="Few APs"
                active={estimate.wifiLayoutPreset === "few"}
                onClick={() => setWifi("few")}
              />
              <ChoicePill
                label="Balanced coverage"
                active={estimate.wifiLayoutPreset === "balanced"}
                onClick={() => setWifi("balanced")}
              />
              <ChoicePill
                label="Dense mesh"
                active={estimate.wifiLayoutPreset === "dense"}
                onClick={() => setWifi("dense")}
              />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-5">
          {/* Doors / access points */}
          <div className="space-y-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Doors / access points
            </p>
            <p className="text-[0.7rem] text-slate-400">
              How serious do we get about card readers, keypads, and door
              contacts?
            </p>
            <div className="flex flex-wrap justify-start gap-2 md:justify-center lg:justify-start">
              <ChoicePill
                label="No access control"
                active={estimate.accessPreset === "none"}
                onClick={() => setAccess("none")}
              />
              <ChoicePill
                label="Front/back + 1–2 doors"
                active={estimate.accessPreset === "fewDoors"}
                onClick={() => setAccess("fewDoors")}
              />
              <ChoicePill
                label="Many internal doors"
                active={estimate.accessPreset === "manyDoors"}
                onClick={() => setAccess("manyDoors")}
              />
            </div>
          </div>

          {/* Extras to layer in */}
          <div className="space-y-1.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Extras to layer in
            </p>
            <p className="text-[0.7rem] text-slate-400">
              Optional add-ons that raise the scope and budget in Step 4.
            </p>
            <div className="flex flex-wrap justify-start gap-2 md:justify-center lg:justify-start">
              <ChoicePill
                label="Ceiling speakers"
                active={estimate.extras.speakers}
                onClick={() => toggleExtra("speakers")}
              />
              <ChoicePill
                label="Wall displays / screens"
                active={estimate.extras.wallDisplays}
                onClick={() => toggleExtra("wallDisplays")}
              />
              <ChoicePill
                label="Mini network rack"
                active={estimate.extras.miniRack}
                onClick={() => toggleExtra("miniRack")}
              />
              <ChoicePill
                label="Battery backup / UPS"
                active={estimate.extras.batteryUps}
                onClick={() => toggleExtra("batteryUps")}
              />
            </div>
          </div>
        </div>
      </div>

      {onNextStep && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onNextStep}
            className="rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.7rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_22px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
          >
            Step 3: Style &amp; complexity
          </button>
        </div>
      )}
    </div>
  );
}

/* ----------------- STEP 3 ----------------- */

type Step3EquipmentStyleProps = {
  onNextStep?: () => void;
};

function Step3EquipmentStyle({ onNextStep }: Step3EquipmentStyleProps) {
  const { estimate, updateEstimate } = useSmartNetEstimate();

  const setWiring = (value: WiringStyle) =>
    updateEstimate({ wiringStyle: value });
  const setRackLocation = (value: RackLocation) =>
    updateEstimate({ rackLocation: value });
  const setTimeline = (value: TimelinePreference) =>
    updateEstimate({ timeline: value });

  return (
    <div className="space-y-6">
      <p className="text-[0.8rem] text-slate-300">
        This is the &quot;vibe&quot; layer—how clean the runs look, where we
        land the rack, and how fast you want the project. It nudges labor and
        scheduling in the background.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Wiring style */}
        <div className="space-y-1.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Wiring style
          </p>
          <p className="text-[0.7rem] text-slate-400">
            Where do you want us to spend the polish—visible conduit vs. fully
            hidden?
          </p>
          <div className="mt-1 flex flex-wrap justify-start gap-2">
            <ChoicePill
              label="Exposed conduit runs"
              active={estimate.wiringStyle === "exposed"}
              onClick={() => setWiring("exposed")}
            />
            <ChoicePill
              label="Hidden in walls / ceilings"
              active={estimate.wiringStyle === "hidden"}
              onClick={() => setWiring("hidden")}
            />
            <ChoicePill
              label="Mix of both"
              active={estimate.wiringStyle === "mix"}
              onClick={() => setWiring("mix")}
            />
          </div>
        </div>

        {/* Rack location */}
        <div className="space-y-1.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Rack location
          </p>
          <p className="text-[0.7rem] text-slate-400">
            Where should the main network gear live?
          </p>
          <div className="mt-1 flex flex-wrap justify-start gap-2">
            <ChoicePill
              label="Hall / office closet"
              active={estimate.rackLocation === "hall"}
              onClick={() => setRackLocation("hall")}
            />
            <ChoicePill
              label="Garage / utility room"
              active={estimate.rackLocation === "garage"}
              onClick={() => setRackLocation("garage")}
            />
            <ChoicePill
              label="Dedicated IDF / MDF"
              active={estimate.rackLocation === "dedicated"}
              onClick={() => setRackLocation("dedicated")}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-1.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Timeline
          </p>
          <p className="text-[0.7rem] text-slate-400">
            How urgent is this install in your world?
          </p>
          <div className="mt-1 flex flex-wrap justify-start gap-2">
            <ChoicePill
              label="Flexible"
              active={estimate.timeline === "flexible"}
              onClick={() => setTimeline("flexible")}
            />
            <ChoicePill
              label="Within a month"
              active={estimate.timeline === "month"}
              onClick={() => setTimeline("month")}
            />
            <ChoicePill
              label="ASAP / rush"
              active={estimate.timeline === "rush"}
              onClick={() => setTimeline("rush")}
            />
          </div>
        </div>
      </div>

      {onNextStep && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onNextStep}
            className="rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.7rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_22px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
          >
            Step 4: See summary &amp; range
          </button>
        </div>
      )}
    </div>
  );
}

/* ----------------- STEP 4 (WITH CONTINUE LATER MODAL) ----------------- */

function Step4SummaryAndRange() {
  const { estimate } = useSmartNetEstimate();
  const {
    projectType,
    squareFootage,
    focus,
    notes,
    coveragePreset,
    wifiLayoutPreset,
    accessPreset,
    extras,
    wiringStyle,
    rackLocation,
    timeline,
    roughLow,
    roughHigh,
  } = estimate;

  const safeSqft =
    typeof squareFootage === "number" && squareFootage > 0
      ? squareFootage
      : 0;

  const safeLow =
    typeof roughLow === "number" && !Number.isNaN(roughLow) ? roughLow : 0;
  const safeHigh =
    typeof roughHigh === "number" && !Number.isNaN(roughHigh) ? roughHigh : 0;

  const hasRange = safeLow > 0 && safeHigh > 0;

  const coverageProfileLabel =
    coveragePreset === "entry"
      ? "Entry points only"
      : coveragePreset === "common"
      ? "Most common areas"
      : coveragePreset === "full"
      ? "Full coverage"
      : undefined;

  const wifiLayoutLabel =
    wifiLayoutPreset === "few"
      ? "Few APs"
      : wifiLayoutPreset === "balanced"
      ? "Balanced coverage"
      : wifiLayoutPreset === "dense"
      ? "Dense mesh"
      : undefined;

  const doorsAccessLabel =
    accessPreset === "none"
      ? "No access control"
      : accessPreset === "fewDoors"
      ? "Front/back + 1–2 doors"
      : accessPreset === "manyDoors"
      ? "Many internal doors"
      : undefined;

  const extrasLabels =
    extras
      ? Object.entries(extras)
          .filter(([, v]) => v)
          .map(([k]) => {
            if (k === "speakers") return "Ceiling speakers";
            if (k === "wallDisplays") return "Wall displays / screens";
            if (k === "miniRack") return "Mini network rack";
            if (k === "batteryUps") return "Battery backup / UPS";
            return "";
          })
          .filter(Boolean)
      : [];

  const wiringStyleLabel =
    wiringStyle === "exposed"
      ? "Exposed conduit runs"
      : wiringStyle === "hidden"
      ? "Hidden in walls / ceilings"
      : wiringStyle === "mix"
      ? "Mix of both"
      : undefined;

  const rackLocationLabel =
    rackLocation === "hall"
      ? "Hall / office closet"
      : rackLocation === "garage"
      ? "Garage / utility room"
      : rackLocation === "dedicated"
      ? "Dedicated IDF / MDF"
      : undefined;

  const timelineLabel =
    timeline === "flexible"
      ? "Flexible"
      : timeline === "month"
      ? "Within a month"
      : timeline === "rush"
      ? "ASAP / rush"
      : undefined;

  const handleGoToBooking = () => {
    const el = document.getElementById("booking-calendar");
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;

    window.scrollTo({
      top: absoluteTop - 24,
      behavior: "smooth",
    });
  };

  // Continue Later modal state
  const [showContinueLater, setShowContinueLater] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  // Build the flattened estimate payload for magic-link (matches MagicLinkEstimate)
  const flatEstimateForMagicLink = {
    projectType: projectType || "Home",
    squareFootage: safeSqft || undefined,
    focus: [
      focus?.cameras && "Cameras",
      focus?.wifi && "Wi-Fi & APs",
      focus?.accessControl && "Access control",
    ]
      .filter(Boolean)
      .map(String),
    coverageProfile: coverageProfileLabel,
    wifiLayout: wifiLayoutLabel,
    doorsAccess: doorsAccessLabel,
    extras: extrasLabels,
    wiringStyle: wiringStyleLabel,
    rackLocation: rackLocationLabel,
    timeline: timelineLabel,
    roughLow: safeLow || undefined,
    roughHigh: safeHigh || undefined,
    notes: notes || undefined,
  };

  return (
    <div className="space-y-5 text-[0.8rem] text-slate-200">
      <p className="text-[0.8rem] text-slate-300">
        Here&apos;s the snapshot we&apos;ll send with your walkthrough booking.
        The range is still a ballpark—your final proposal locks after an
        on-site or virtual survey.
      </p>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: selections */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Your SmartNET profile
          </h3>

          <div className="grid gap-2 text-[0.78rem] md:grid-cols-2">
            <SummaryRow label="Project type" value={projectType || "Home"} />
            <SummaryRow
              label="Approx. square footage"
              value={
                safeSqft ? `${safeSqft.toLocaleString()} ft²` : "Not set yet"
              }
            />
            <SummaryRow
              label="Focus"
              value={
                [
                  focus?.cameras && "Cameras",
                  focus?.wifi && "Wi-Fi & APs",
                  focus?.accessControl && "Access control",
                ]
                  .filter(Boolean)
                  .join(" · ") || "Not picked yet"
              }
            />
            <SummaryRow
              label="Coverage profile"
              value={coverageProfileLabel || "Not picked yet"}
            />
            <SummaryRow
              label="Wi-Fi layout"
              value={wifiLayoutLabel || "Not picked yet"}
            />
            <SummaryRow
              label="Doors / access"
              value={doorsAccessLabel || "Not picked yet"}
            />
            <SummaryRow
              label="Extras"
              value={
                extrasLabels.length > 0 ? extrasLabels.join(" · ") : "None yet"
              }
            />
            <SummaryRow
              label="Wiring style"
              value={wiringStyleLabel || "Not picked yet"}
            />
            <SummaryRow
              label="Rack location"
              value={rackLocationLabel || "Not picked yet"}
            />
            <SummaryRow
              label="Timeline"
              value={timelineLabel || "Not picked yet"}
            />
          </div>

          {notes && (
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-[0.76rem] text-slate-200">
              <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sky-300">
                Special notes
              </p>
              <p className="whitespace-pre-wrap">{notes}</p>
            </div>
          )}
        </div>

        {/* Right: range + booking CTA + Continue Later */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-sky-500/40 bg-slate-950/80 p-4 shadow-[0_0_32px_rgba(56,189,248,0.6)]">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
              AI rough range
            </p>

            {hasRange ? (
              <>
                <p className="mt-2 text-[1.6rem] font-semibold text-sky-100">
                  ${safeLow.toLocaleString()} – $
                  {safeHigh.toLocaleString()}
                </p>
                <p className="mt-1 text-[0.75rem] text-slate-400">
                  This already bakes in your space size, coverage density,
                  extras, and style choices. The walkthrough tightens this into
                  a formal proposal.
                </p>
              </>
            ) : (
              <p className="mt-3 text-[0.75rem] text-slate-400">
                Once you finish Steps 1–3, I&apos;ll drop a rough budget range
                here before you pick a walkthrough time.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-[0.7rem] text-slate-300">
              <p>
                When you lock a walkthrough on the next section, we&apos;ll send
                this snapshot along so the crew shows up already aligned with
                your plan.
              </p>
            </div>

            {/* Step 5 CTA */}
            <button
              type="button"
              onClick={handleGoToBooking}
              className="w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] px-4 py-2 text-[0.75rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_22px_rgba(63,201,255,0.9)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
            >
              Step 5: Choose a day for your walkthrough
            </button>

            {/* Continue later button */}
            <button
              type="button"
              onClick={() => setShowContinueLater(true)}
              className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-[0.75rem] font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-100 transition"
            >
              Continue later
            </button>
          </div>
        </div>
      </div>

      {/* Continue Later modal */}
      {showContinueLater && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm rounded-xl border border-slate-800 bg-[#0a1220] p-6 shadow-[0_0_45px_rgba(15,23,42,0.9)]"
          >
            {!sent ? (
              <>
                <p className="mb-4 text-[0.8rem] text-slate-300">
                  Enter your email and we’ll send you a link to pick up where
                  you left off.
                </p>

                {/* Email Input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-[0.8rem] text-slate-200 outline-none focus:border-sky-400"
                />

                {/* Submit Button */}
                <button
                  onClick={async () => {
                    if (!email) return;

                    setSending(true);

                    try {
                      const res = await fetch("/api/magic-link", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          contact: { email, phone: null },
                          estimate: flatEstimateForMagicLink,
                        }),
                      });

                      const data = await res.json();
                      console.log("[Continue Later] response:", data);

                      setSending(false);
                      setSent(true);
                    } catch (err) {
                      console.error(err);
                      setSending(false);
                    }
                  }}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-4 py-2 text-[0.75rem] font-semibold text-slate-950 shadow-[0_0_22px_rgba(63,201,255,0.9)]"
                >
                  {sending ? "Sending…" : "Send link"}
                </button>
              </>
            ) : (
              <div className="text-center text-[0.8rem] text-emerald-300">
                Your resume link has been sent.
                <br />
                You can close this window now.
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setShowContinueLater(false)}
              className="mt-4 w-full rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-[0.75rem] text-slate-300 hover:border-sky-400"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      <span className="text-[0.8rem] text-slate-100">{value}</span>
    </div>
  );
}

/* ----------------- shared pill ----------------- */

type ChoicePillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function ChoicePill({ label, active, onClick }: ChoicePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[0.7rem] transition ${
        active
          ? "border-sky-400 bg-slate-900 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.75)]"
          : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-sky-400 hover:text-sky-100"
      }`}
    >
      {label}
    </button>
  );
}

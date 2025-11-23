"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useSmartNetEstimate,
  ProjectType,
  FocusState,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

type AiEstimatorCardProps = {
  onNextStep?: () => void;
};

export function AiEstimatorCard({ onNextStep }: AiEstimatorCardProps) {
  const { estimate, updateEstimate } = useSmartNetEstimate();

  const projectType = estimate.projectType;
  const squareFootage = estimate.squareFootage;
  const focus = estimate.focus;
  const notes = estimate.notes;

  const handleProjectTypeChange = (type: ProjectType) => {
    updateEstimate({ projectType: type });
  };

  const handleSquareFootageChange = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return;
    updateEstimate({ squareFootage: value });
  };

  const handleFocusToggle = (key: keyof FocusState) => {
    updateEstimate({
      focus: {
        ...focus,
        [key]: !focus[key],
      },
    });
  };

  const handleNotesChange = (value: string) => {
    updateEstimate({ notes: value });
  };

  return (
    <Card className="rounded-[1.6rem] border border-[#1f2937] bg-[radial-gradient(circle_at_top,rgba(31,64,171,0.9),rgba(2,6,23,1))] shadow-[0_0_70px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
      <CardContent className="space-y-6 p-5 sm:p-6">
        {/* Buddy circle + intro */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_10%,rgba(56,189,248,0.95),rgba(15,23,42,1))] blur-[6px]" />
            <div className="absolute inset-[4px] flex items-center justify-center rounded-full border border-sky-400/80 bg-[#020617]/90 shadow-[0_0_40px_rgba(56,189,248,1)]">
              <div className="h-9 w-9 animate-pulse rounded-full bg-sky-300 shadow-[0_0_30px_rgba(56,189,248,1)]" />
            </div>
          </div>
          <p className="mt-3 text-[0.7rem] font-semibold tracking-wide text-sky-100">
            SmartNET AI Estimator
          </p>
          <p className="max-w-[18rem] text-center text-[0.65rem] text-[#c1d6f4]">
            Start with your space and priorities. I&apos;ll sync this all the
            way through to booking and your final proposal.
          </p>
        </div>

        {/* Project type */}
        <div className="space-y-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sky-300">
            Project type
          </p>
          <div className="flex flex-wrap gap-2">
            {([
              ["home", "Home"],
              ["office", "Office"],
              ["retail", "Retail"],
              ["industrial", "Industrial"],
            ] as [ProjectType, string][]).map(([value, label]) => {
              const active = projectType === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleProjectTypeChange(value)}
                  className={`rounded-full border px-3 py-1 text-[0.7rem] transition ${
                    active
                      ? "border-sky-400 bg-[#020617] text-sky-50 shadow-[0_0_20px_rgba(56,189,248,0.85)]"
                      : "border-[#334155] bg-slate-900/70 text-slate-200 hover:border-sky-400 hover:text-sky-100"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Square footage */}
        <SquareFootageSection
          squareFootage={squareFootage}
          setSquareFootage={handleSquareFootageChange}
        />

        {/* Focus areas */}
        <FocusSection focus={focus} onToggle={handleFocusToggle} />

        {/* Extras – just labels here; real device/extras live in steps 2–3 */}
        <div className="space-y-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sky-300">
            Extras to layer in
          </p>
          <p className="text-[0.65rem] text-slate-300">
            We&apos;ll pick details like speakers, wall displays, and racks in
            Step 2. For now, just keep in mind what you&apos;re dreaming about.
          </p>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sky-300">
            Anything special we should know?
          </p>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={2}
            placeholder={`Drop things like "need clean conduit runs", "dog on site", or "existing rack we can tie into".`}
            className="min-h-[60px] w-full rounded-lg border border-[#1f2937] bg-[#020617]/90 px-3 py-2 text-[0.7rem] text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400"
          />
        </div>

        {/* CTA */}
        {onNextStep && (
          <div>
            <Button
              type="button"
              onClick={onNextStep}
              className="mt-1 w-full rounded-full bg-gradient-to-r from-[#3fc9ff] to-[#3ea8ff] text-[0.7rem] font-semibold tracking-wide text-slate-950 shadow-[0_0_26px_rgba(63,201,255,0.95)] hover:from-[#37b6ff] hover:to-[#40c4ff]"
            >
              Step 2: Devices &amp; extras
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type SquareFootageSectionProps = {
  squareFootage: number;
  setSquareFootage: (v: number) => void;
};

function SquareFootageSection({
  squareFootage,
  setSquareFootage,
}: SquareFootageSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sky-300">
        Approx. square footage
      </p>
      <div className="space-y-2">
        <div className="flex gap-2 text-[0.7rem]">
          {[800, 1500, 2500, 4000].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSquareFootage(size)}
              className={`flex-1 rounded-md border px-2 py-1 transition ${
                squareFootage === size
                  ? "border-sky-400 bg-slate-900 text-sky-100"
                  : "border-[#1f2937] bg-slate-900/60 text-slate-300 hover:border-sky-400 hover:text-sky-100"
              }`}
            >
              {size.toLocaleString()} ft²
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#1f2937] bg-[#020617]/80 px-2 py-2">
          <span className="text-[0.7rem] text-slate-400">Custom:</span>
          <input
            type="number"
            min={200}
            max={20000}
            value={squareFootage}
            onChange={(e) => {
              const v = parseInt(e.target.value || "0", 10);
              setSquareFootage(Number.isNaN(v) ? 0 : v);
            }}
            className="w-20 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[0.7rem] text-slate-100 outline-none focus:border-sky-400"
          />
          <span className="text-[0.7rem] text-slate-400">ft²</span>
        </div>
      </div>
    </div>
  );
}

type FocusSectionProps = {
  focus: FocusState;
  onToggle: (key: keyof FocusState) => void;
};

function FocusSection({ focus, onToggle }: FocusSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-sky-300">
        What are we focusing on?
      </p>
      <div className="flex flex-wrap gap-2 text-[0.7rem]">
        <FocusPill
          label="Cameras"
          active={focus.cameras}
          onClick={() => onToggle("cameras")}
        />
        <FocusPill
          label="Wi-Fi & APs"
          active={focus.wifi}
          onClick={() => onToggle("wifi")}
        />
        <FocusPill
          label="Access control"
          active={focus.accessControl}
          onClick={() => onToggle("accessControl")}
        />
      </div>
    </div>
  );
}

type FocusPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FocusPill({ label, active, onClick }: FocusPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 transition ${
        active
          ? "border-sky-400 bg-slate-900 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
          : "border-[#1f2937] bg-slate-900/70 text-slate-300 hover:border-sky-400 hover:text-sky-100"
      }`}
    >
      {label}
    </button>
  );
}

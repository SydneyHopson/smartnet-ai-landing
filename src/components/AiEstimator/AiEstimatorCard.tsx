"use client";

import * as React from "react";
import {
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Home,
  LockKeyhole,
  Sparkles,
  Wifi,
} from "lucide-react";

import { EstimatorQuestionInput } from "@/components/AiEstimator/EstimatorQuestionInput";
import { Button } from "@/components/ui/button";

import {
  useSmartNetEstimate,
  type FocusState,
  type ProjectType,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

type AiEstimatorCardProps = {
  onNextStep?: () => void;
};

type SetupStep =
  | "property"
  | "business"
  | "systems"
  | "description";

type PropertyGroup =
  | "home"
  | "business"
  | null;

const businessTypeOptions: Array<{
  value: Exclude<ProjectType, "home">;
  label: string;
}> = [
  { value: "warehouse", label: "Warehouse" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail" },
  { value: "restaurant", label: "Restaurant" },
  { value: "medical", label: "Medical" },
  { value: "education", label: "School" },
  { value: "religious", label: "Church" },
  { value: "hospitality", label: "Hotel" },
  { value: "industrial", label: "Industrial" },
  { value: "datacenter", label: "Datacenter" },
  { value: "multi_location", label: "Multi-location" },
  { value: "other", label: "Other" },
];

export function AiEstimatorCard({
  onNextStep,
}: AiEstimatorCardProps) {
  const {
    estimate,
    updateEstimate,
    estimator,
    startEstimator,
    answerEstimator,
    clearEstimatorError,
    resetEstimatorSession,
  } = useSmartNetEstimate();

  const [setupStep, setSetupStep] =
    React.useState<SetupStep>("property");

  const [propertyGroup, setPropertyGroup] =
    React.useState<PropertyGroup>(null);

  const conversationStarted = Boolean(
    estimator.sessionId
  );

  const currentQuestion = estimator.nextQuestion;

  const readyForPricing =
    estimator.conversation?.readyForPricing ?? false;

  const conversationComplete =
    conversationStarted &&
    !currentQuestion &&
    readyForPricing;

  const isBusy =
    estimator.isStarting || estimator.isAnswering;

  const setupProgress = getSetupProgress(setupStep);

  const selectedSystemCount =
    Number(estimate.focus.cameras) +
    Number(estimate.focus.wifi) +
    Number(estimate.focus.accessControl);

  const clearErrorWhenPresent = () => {
    if (estimator.error) {
      clearEstimatorError();
    }
  };

  const selectPropertyGroup = (
    group: Exclude<PropertyGroup, null>
  ) => {
    setPropertyGroup(group);
    clearErrorWhenPresent();

    if (group === "home") {
      updateEstimate({ projectType: "home" });
      setSetupStep("systems");
      return;
    }

    if (estimate.projectType === "home") {
      updateEstimate({ projectType: "office" });
    }

    setSetupStep("business");
  };

  const selectBusinessType = (
    projectType: Exclude<ProjectType, "home">
  ) => {
    updateEstimate({ projectType });
    clearErrorWhenPresent();
    setSetupStep("systems");
  };

  const toggleFocus = (key: keyof FocusState) => {
    updateEstimate({
      focus: {
        ...estimate.focus,
        [key]: !estimate.focus[key],
      },
    });

    clearErrorWhenPresent();
  };

  const goBack = () => {
    clearErrorWhenPresent();

    if (setupStep === "description") {
      setSetupStep("systems");
      return;
    }

    if (setupStep === "systems") {
      setSetupStep(
        propertyGroup === "business"
          ? "business"
          : "property"
      );
      return;
    }

    if (setupStep === "business") {
      setSetupStep("property");
      setPropertyGroup(null);
    }
  };

  const restartEstimator = () => {
    resetEstimatorSession();
    setPropertyGroup(null);
    setSetupStep("property");
  };

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-blue-500/25 bg-[#030817] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      <div className="border-b border-blue-500/15 bg-[radial-gradient(circle_at_top_left,rgba(0,119,255,0.2),transparent_42%),linear-gradient(180deg,rgba(7,22,52,0.98),rgba(3,8,23,0.98))] px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-blue-300">
              <Sparkles className="h-4 w-4" />
              SmartNET AI Estimator
            </div>

            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              {conversationStarted
                ? "Your project is taking shape"
                : "Let’s build your estimate"}
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
              {conversationStarted
                ? "Answer one clear question at a time. SmartNET updates the project behind the scenes."
                : "A short guided interview that asks only what matters."}
            </p>
          </div>

          {!conversationStarted && (
            <div className="min-w-[180px]">
              <div className="flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.14em] text-slate-500">
                <span>Setup</span>
                <span>{setupProgress}%</span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-300"
                  style={{ width: `${setupProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {!conversationStarted ? (
          <div className="mx-auto max-w-3xl">
            {setupStep === "property" && (
              <SetupFrame
                eyebrow="Question 1"
                title="What type of property are we working on?"
                description="Choose the option that best matches the project."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <ChoiceCard
                    icon={<Home className="h-8 w-8" />}
                    title="Home"
                    description="Residential cameras, Wi-Fi, networking, and smart technology."
                    active={propertyGroup === "home"}
                    onClick={() => selectPropertyGroup("home")}
                  />

                  <ChoiceCard
                    icon={<Building2 className="h-8 w-8" />}
                    title="Business"
                    description="Commercial, retail, office, warehouse, medical, and more."
                    active={propertyGroup === "business"}
                    onClick={() => selectPropertyGroup("business")}
                  />
                </div>
              </SetupFrame>
            )}

            {setupStep === "business" && (
              <SetupFrame
                eyebrow="Question 2"
                title="What best describes your business?"
                description="This selects the right SmartNET project playbook."
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {businessTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectBusinessType(option.value)}
                      className={`rounded-2xl border px-4 py-5 text-left transition ${
                        estimate.projectType === option.value
                          ? "border-blue-400 bg-blue-500/15 text-white shadow-[0_0_28px_rgba(37,99,235,0.22)]"
                          : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-white"
                      }`}
                    >
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <span className="mt-3 block text-sm font-semibold">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                <BackButton onClick={goBack} />
              </SetupFrame>
            )}

            {setupStep === "systems" && (
              <SetupFrame
                eyebrow={
                  propertyGroup === "business"
                    ? "Question 3"
                    : "Question 2"
                }
                title="Which systems should we include?"
                description="Select everything that applies. You can describe additional needs on the next screen."
              >
                <div className="space-y-3">
                  <SystemChoice
                    icon={<Camera className="h-5 w-5" />}
                    title="Security Cameras"
                    description="Indoor, outdoor, recording, and remote viewing."
                    active={estimate.focus.cameras}
                    onClick={() => toggleFocus("cameras")}
                  />

                  <SystemChoice
                    icon={<Wifi className="h-5 w-5" />}
                    title="Managed Wi-Fi & Networking"
                    description="Wireless coverage, access points, switching, and connectivity."
                    active={estimate.focus.wifi}
                    onClick={() => toggleFocus("wifi")}
                  />

                  <SystemChoice
                    icon={<LockKeyhole className="h-5 w-5" />}
                    title="Access Control"
                    description="Badges, key fobs, controlled doors, and remote management."
                    active={estimate.focus.accessControl}
                    onClick={() => toggleFocus("accessControl")}
                  />
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <BackButton onClick={goBack} />

                  <Button
                    type="button"
                    disabled={selectedSystemCount === 0}
                    onClick={() => setSetupStep("description")}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:brightness-110 disabled:opacity-40"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </SetupFrame>
            )}

            {setupStep === "description" && (
              <SetupFrame
                eyebrow={
                  propertyGroup === "business"
                    ? "Question 4"
                    : "Question 3"
                }
                title="Tell SmartNET about your project"
                description="Use natural language. One good paragraph can answer several questions at once."
              >
                <textarea
                  value={estimate.notes}
                  onChange={(event) => {
                    updateEstimate({ notes: event.target.value });
                    clearErrorWhenPresent();
                  }}
                  rows={7}
                  placeholder="Example: I have a 12,000 square foot warehouse with 24-foot ceilings. We need 18 indoor cameras, 6 outdoor cameras, Wi-Fi for about 85 devices, Comcast Business internet, and badge access on six doors."
                  className="min-h-[190px] w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm leading-relaxed text-white outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15"
                />

                <div className="mt-3 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3 text-xs leading-relaxed text-slate-400">
                  SmartNET can recognize property type, quantities, providers, camera brands, networking equipment, cabling, ceilings, doors, and other project details.
                </div>

                {estimator.error && (
                  <EstimatorError
                    message={estimator.error}
                    onDismiss={clearEstimatorError}
                  />
                )}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <BackButton onClick={goBack} />

                  <Button
                    type="button"
                    disabled={estimator.isStarting}
                    onClick={() => void startEstimator()}
                    className="rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.4)] hover:brightness-110 disabled:opacity-50"
                  >
                    {estimator.isStarting
                      ? "SmartNET is reviewing your project..."
                      : "Start my estimate"}
                    {!estimator.isStarting && (
                      <ChevronRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </SetupFrame>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5">
            <ConversationProgress />

            <KnownDetails />

            {currentQuestion ? (
              <div className="rounded-2xl border border-blue-500/25 bg-[linear-gradient(180deg,rgba(7,18,43,0.96),rgba(3,8,23,0.98))] p-5 sm:p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Next question
                </p>

                <h3 className="mt-2 text-lg font-semibold leading-relaxed text-white">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.reason && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {currentQuestion.reason}
                  </p>
                )}

                <div className="mt-5">
                  <EstimatorQuestionInput
                    question={currentQuestion}
                    disabled={isBusy}
                    onSubmit={answerEstimator}
                  />
                </div>

                {estimator.isAnswering && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,1)]" />
                    <p className="text-xs text-blue-100">
                      SmartNET is updating your project...
                    </p>
                  </div>
                )}

                {estimator.error && (
                  <EstimatorError
                    message={estimator.error}
                    onDismiss={clearEstimatorError}
                  />
                )}
              </div>
            ) : (
              <CompletionPanel readyForPricing={readyForPricing} />
            )}

            <ConversationHistory />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={restartEstimator}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
              >
                Start over
              </button>

              {onNextStep && (
                <Button
                  type="button"
                  onClick={onNextStep}
                  disabled={!conversationComplete}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.32)] hover:brightness-110 disabled:opacity-40"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SetupFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-300">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>

      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceCard({
  icon,
  title,
  description,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group min-h-[190px] rounded-3xl border p-6 text-left transition ${
        active
          ? "border-blue-400 bg-blue-500/15 shadow-[0_0_36px_rgba(37,99,235,0.2)]"
          : "border-slate-800 bg-slate-950/70 hover:border-blue-500/45 hover:bg-blue-500/5"
      }`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300 transition group-hover:border-blue-400 group-hover:text-blue-200">
        {icon}
      </span>

      <span className="mt-6 block text-lg font-semibold text-white">
        {title}
      </span>

      <span className="mt-2 block text-sm leading-relaxed text-slate-400">
        {description}
      </span>
    </button>
  );
}

function SystemChoice({
  icon,
  title,
  description,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-blue-400 bg-blue-500/12 shadow-[0_0_24px_rgba(37,99,235,0.15)]"
          : "border-slate-800 bg-slate-950/70 hover:border-blue-500/40"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
          active
            ? "border-blue-400/60 bg-blue-500/20 text-blue-200"
            : "border-slate-700 bg-slate-900 text-slate-400"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-500">
          {description}
        </span>
      </span>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
          active
            ? "border-blue-400 bg-blue-500 text-white"
            : "border-slate-700 bg-slate-950 text-transparent"
        }`}
      >
        ✓
      </span>
    </button>
  );
}

function BackButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}

function ConversationProgress() {
  const { estimator } = useSmartNetEstimate();

  const completed =
    estimator.conversation?.completedQuestionKeys.length ?? 0;

  const remaining =
    estimator.conversation?.unansweredQuestionKeys.length ?? 0;

  const total = completed + remaining;

  const percent =
    total > 0
      ? Math.round((completed / total) * 100)
      : estimator.conversation?.confidenceScore ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-400">
          Estimate progress
        </span>
        <span className="font-semibold text-blue-200">
          {Math.max(0, Math.min(100, percent))}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 transition-all duration-500"
          style={{
            width: `${Math.max(0, Math.min(100, percent))}%`,
          }}
        />
      </div>
    </div>
  );
}

function KnownDetails() {
  const { estimator } = useSmartNetEstimate();
  const project = estimator.project;

  if (!project) {
    return null;
  }

  const details: string[] = [];

  const projectType = project.property?.projectType;
  const squareFootage = project.property?.squareFootage?.value;
  const floors = project.property?.numberOfFloors?.value;
  const ceilingHeight = project.property?.ceilingHeightFeet?.value;
  const cameraCount =
    (project.cameras?.interiorCount?.value ?? 0) +
    (project.cameras?.exteriorCount?.value ?? 0) +
    (project.cameras?.specialtyCount?.value ?? 0);
  const wifiUsers =
    project.wifi?.estimatedConcurrentUsers?.value;
  const doors =
    project.accessControl?.controlledDoorCount?.value;

  if (projectType) {
    details.push(formatLabel(projectType));
  }

  if (squareFootage) {
    details.push(`${squareFootage.toLocaleString()} ft²`);
  }

  if (floors) {
    details.push(`${floors} ${floors === 1 ? "floor" : "floors"}`);
  }

  if (ceilingHeight) {
    details.push(`${ceilingHeight}-foot ceilings`);
  }

  if (cameraCount > 0) {
    details.push(`${cameraCount} cameras`);
  }

  if (wifiUsers) {
    details.push(`${wifiUsers} concurrent Wi-Fi devices`);
  }

  if (doors) {
    details.push(`${doors} controlled doors`);
  }

  if (details.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
        SmartNET understood
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {details.map((detail) => (
          <span
            key={detail}
            className="rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3 py-1.5 text-xs text-emerald-50"
          >
            ✓ {detail}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompletionPanel({
  readyForPricing,
}: {
  readyForPricing: boolean;
}) {
  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 text-lg text-emerald-300">
          ✓
        </span>

        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {readyForPricing
              ? "Discovery complete"
              : "Project information saved"}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            {readyForPricing
              ? "Your preliminary estimate is ready"
              : "SmartNET saved your project"}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {readyForPricing
              ? "Review the live summary and estimate beside this panel. Final field conditions will be confirmed during the walkthrough."
              : "Additional details can be collected later without losing the work already completed."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ConversationHistory() {
  const { estimator } = useSmartNetEstimate();

  const messages = estimator.conversation?.messages ?? [];
  const previousMessages = messages.slice(0, -1);

  if (previousMessages.length === 0) {
    return null;
  }

  return (
    <details className="group rounded-2xl border border-slate-800 bg-slate-950/50">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-300">
        <span>View project conversation</span>
        <span className="text-blue-300 transition group-open:rotate-180">
          ▾
        </span>
      </summary>

      <div className="max-h-[320px] space-y-3 overflow-y-auto border-t border-slate-800 p-4">
        {previousMessages.map((message) => {
          const assistant = message.role === "assistant";

          return (
            <div
              key={message.id}
              className={`flex ${
                assistant ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  assistant
                    ? "border border-blue-500/20 bg-blue-500/5 text-blue-50"
                    : "border border-slate-700 bg-slate-800/80 text-white"
                }`}
              >
                <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] opacity-60">
                  {assistant ? "SmartNET" : "You"}
                </p>
                <p>{message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}

function EstimatorError({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-rose-500/35 bg-rose-500/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm leading-relaxed text-rose-100">
          {message}
        </p>

        <button
          type="button"
          onClick={onDismiss}
          className="text-xs font-semibold text-rose-300 hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getSetupProgress(step: SetupStep) {
  if (step === "property") return 25;
  if (step === "business") return 50;
  if (step === "systems") return 75;
  return 100;
}

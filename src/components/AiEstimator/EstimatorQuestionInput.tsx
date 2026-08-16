"use client";

import * as React from "react";

import type { EstimatorNextQuestion } from "@/components/smartNetWizard/SmartNetEstimateProvider";

type EstimatorQuestionInputProps = {
  question: EstimatorNextQuestion;
  disabled?: boolean;
  onSubmit: (answer: unknown) => Promise<boolean>;
};

type ChoiceOption = {
  label: string;
  value: string;
  description?: string;
};

type NormalizedAnswerType =
  | "boolean"
  | "number"
  | "single_choice"
  | "multiple_choice"
  | "text";

type CameraCoverageType =
  | "interior"
  | "exterior"
  | "both"
  | null;

const forcedNumericFields = new Set<string>([
  "property.squareFootage",
  "property.numberOfFloors",
  "property.ceilingHeightFeet",

  "cameras.interiorCount",
  "cameras.exteriorCount",
  "cameras.specialtyCount",
  "cameras.recordingDays",

  "network.currentDownloadMbps",
  "network.currentUploadMbps",

  "wifi.estimatedAccessPointCount",
  "wifi.estimatedConcurrentUsers",

  "accessControl.controlledDoorCount",
  "accessControl.exteriorDoorCount",
  "accessControl.interiorDoorCount",

  "cabling.estimatedCableFeet",

  "installation.travelMiles",
  "installation.estimatedCrewSize",
  "installation.estimatedLaborHours",
  "installation.estimatedDurationDays",
]);

export function EstimatorQuestionInput({
  question,
  disabled = false,
  onSubmit,
}: EstimatorQuestionInputProps) {
  const [selectedChoices, setSelectedChoices] =
    React.useState<string[]>([]);

  const [textAnswer, setTextAnswer] =
    React.useState("");

  const [isSubmittingText, setIsSubmittingText] =
    React.useState(false);

  React.useEffect(() => {
    setSelectedChoices([]);
    setTextAnswer("");
    setIsSubmittingText(false);
  }, [question.key]);

  if (isLiftRequirementQuestion(question)) {
    return (
      <LiftRequirementQuestion
        disabled={disabled}
        onSubmit={onSubmit}
      />
    );
  }

  if (isCombinedCameraQuestion(question)) {
    return (
      <CombinedCameraQuestion
        disabled={disabled}
        onSubmit={onSubmit}
      />
    );
  }

  const customChoices =
    getCustomQuestionChoices(question);

  const answerType =
    getResolvedAnswerType(
      question,
      customChoices
    );

  const standardChoices: ChoiceOption[] =
    customChoices.length > 0
      ? customChoices
      : question.choices.map(
          (choice): ChoiceOption => ({
            label:
              formatChoiceLabel(choice),
            value:
              choice,
          })
        );

  const handleChoiceSubmit = async (
    value: string
  ) => {
    if (disabled) {
      return;
    }

    await onSubmit(value);
  };

  const handleBooleanChoice = async (
    value: boolean
  ) => {
    if (disabled) {
      return;
    }

    await onSubmit(value);
  };

  const handleMultiChoiceToggle = (
    choice: string
  ) => {
    setSelectedChoices(
      (currentChoices) => {
        if (
          currentChoices.includes(
            choice
          )
        ) {
          return currentChoices.filter(
            (currentChoice) =>
              currentChoice !== choice
          );
        }

        return [
          ...currentChoices,
          choice,
        ];
      }
    );
  };

  const handleMultiChoiceSubmit =
    async () => {
      if (
        selectedChoices.length === 0 ||
        disabled
      ) {
        return;
      }

      const submitted =
        await onSubmit(
          selectedChoices
        );

      if (submitted) {
        setSelectedChoices([]);
      }
    };

  const handleTextSubmit =
    async () => {
      const trimmedAnswer =
        textAnswer.trim();

      if (
        !trimmedAnswer ||
        disabled ||
        isSubmittingText
      ) {
        return;
      }

      setIsSubmittingText(true);

      try {
        const submitted =
          await onSubmit(
            trimmedAnswer
          );

        if (submitted) {
          setTextAnswer("");
        }
      } finally {
        setIsSubmittingText(false);
      }
    };

  if (answerType === "boolean") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <QuestionChoiceButton
          label="Yes"
          disabled={disabled}
          onClick={() =>
            void handleBooleanChoice(true)
          }
        />

        <QuestionChoiceButton
          label="No"
          disabled={disabled}
          onClick={() =>
            void handleBooleanChoice(false)
          }
        />
      </div>
    );
  }

  if (answerType === "number") {
    const numberChoices =
      getQuickNumberChoices(
        question.key
      );

    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-sky-500/20 bg-sky-950/20 px-3 py-2">
          <p className="text-[0.68rem] leading-relaxed text-sky-100">
            {getNumericGuidance(
              question.key
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {numberChoices.map(
            (value) => (
              <QuestionChoiceButton
                key={value}
                label={formatQuickNumber(
                  question.key,
                  value
                )}
                disabled={disabled}
                onClick={() =>
                  void onSubmit(value)
                }
              />
            )
          )}
        </div>

        <p className="text-[0.64rem] leading-relaxed text-slate-500">
          Choose the closest estimate.
          SmartNET can confirm the final
          number during the walkthrough.
        </p>
      </div>
    );
  }

  if (
    answerType ===
    "single_choice"
  ) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {standardChoices.map(
          (choice) => (
            <QuestionChoiceButton
              key={choice.value}
              label={choice.label}
              description={
                choice.description
              }
              disabled={disabled}
              muted={
                choice.value ===
                  "unknown" ||
                choice.value ===
                  "confirm_during_walkthrough" ||
                choice.value ===
                  "confirm during walkthrough"
              }
              onClick={() =>
                void handleChoiceSubmit(
                  choice.value
                )
              }
            />
          )
        )}
      </div>
    );
  }

  if (
    answerType ===
    "multiple_choice"
  ) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {standardChoices.map(
            (choice) => {
              const selected =
                selectedChoices.includes(
                  choice.value
                );

              return (
                <button
                  key={choice.value}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    handleMultiChoiceToggle(
                      choice.value
                    )
                  }
                  className={`rounded-full border px-4 py-2 text-[0.72rem] font-medium transition ${
                    selected
                      ? "border-sky-300 bg-sky-950/70 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.45)]"
                      : "border-slate-700 bg-slate-950/80 text-slate-300 hover:border-sky-400 hover:text-sky-100"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {choice.label}
                </button>
              );
            }
          )}
        </div>

        <button
          type="button"
          disabled={
            disabled ||
            selectedChoices.length === 0
          }
          onClick={() =>
            void handleMultiChoiceSubmit()
          }
          className="w-full rounded-xl bg-gradient-to-r from-sky-300 to-cyan-300 px-4 py-3 text-[0.72rem] font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.65)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Continue with{" "}
          {selectedChoices.length}{" "}
          selected
        </button>
      </div>
    );
  }

  const textPresetChoices =
    getTextPresetChoices(question);

  if (
    textPresetChoices.length > 0
  ) {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {textPresetChoices.map(
            (choice) => (
              <QuestionChoiceButton
                key={choice.value}
                label={choice.label}
                description={
                  choice.description
                }
                disabled={disabled}
                muted={
                  choice.value ===
                    "unknown" ||
                  choice.value ===
                    "confirm_during_walkthrough" ||
                  choice.value ===
                    "confirm during walkthrough"
                }
                onClick={() =>
                  void handleChoiceSubmit(
                    choice.value
                  )
                }
              />
            )
          )}
        </div>

        <p className="text-[0.64rem] leading-relaxed text-slate-500">
          Choose the closest answer. Details
          can be refined during the site
          walkthrough.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-sky-500/25 bg-slate-950/65 p-4">
        <label
          htmlFor={`estimator-answer-${question.key}`}
          className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky-200"
        >
          Your answer
        </label>

        <textarea
          id={`estimator-answer-${question.key}`}
          value={textAnswer}
          disabled={
            disabled ||
            isSubmittingText
          }
          rows={4}
          placeholder={getTextPlaceholder(
            question
          )}
          onChange={(event) =>
            setTextAnswer(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {
              event.preventDefault();

              void handleTextSubmit();
            }
          }}
          className="min-h-28 w-full resize-y rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-[0.75rem] leading-relaxed text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <button
        type="button"
        disabled={
          disabled ||
          isSubmittingText ||
          textAnswer.trim().length === 0
        }
        onClick={() =>
          void handleTextSubmit()
        }
        className="w-full rounded-xl bg-gradient-to-r from-sky-300 to-cyan-300 px-4 py-3 text-[0.72rem] font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.65)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isSubmittingText
          ? "Saving answer..."
          : "Continue"}
      </button>

      <p className="text-[0.64rem] leading-relaxed text-slate-500">
        Type what you know. SmartNET can
        interpret a full sentence and update
        multiple project details at once.
      </p>
    </div>
  );
}

type LiftRequirementQuestionProps = {
  disabled: boolean;
  onSubmit: (
    answer: unknown
  ) => Promise<boolean>;
};

function LiftRequirementQuestion({
  disabled,
  onSubmit,
}: LiftRequirementQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <QuestionChoiceButton
          label="Yes — powered lift equipment is required"
          description="A scissor lift, boom lift, order picker, or similar elevated-access equipment will be needed."
          disabled={disabled}
          onClick={() =>
            void onSubmit(true)
          }
        />

        <QuestionChoiceButton
          label="No — ladder access is enough"
          description="The work can be completed safely without powered lift equipment."
          disabled={disabled}
          onClick={() =>
            void onSubmit(false)
          }
        />
      </div>

      <p className="text-[0.64rem] leading-relaxed text-slate-500">
        SmartNET will confirm the exact
        access equipment during the
        walkthrough.
      </p>
    </div>
  );
}

function isLiftRequirementQuestion(
  question: EstimatorNextQuestion
): boolean {
  return (
    question.key ===
    "installation.liftRequired"
  );
}

type CombinedCameraQuestionProps = {
  disabled: boolean;
  onSubmit: (
    answer: unknown
  ) => Promise<boolean>;
};

function CombinedCameraQuestion({
  disabled,
  onSubmit,
}: CombinedCameraQuestionProps) {
  const [
    coverageType,
    setCoverageType,
  ] =
    React.useState<CameraCoverageType>(
      null
    );

  const [
    interiorCount,
    setInteriorCount,
  ] =
    React.useState<number | null>(
      null
    );

  const [
    exteriorCount,
    setExteriorCount,
  ] =
    React.useState<number | null>(
      null
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    React.useState(false);

  const interiorRequired =
    coverageType === "interior" ||
    coverageType === "both";

  const exteriorRequired =
    coverageType === "exterior" ||
    coverageType === "both";

  const canSubmit =
    coverageType !== null &&
    (!interiorRequired ||
      interiorCount !== null) &&
    (!exteriorRequired ||
      exteriorCount !== null) &&
    !disabled &&
    !isSubmitting;

  const handleSubmit =
    async () => {
      if (
        !canSubmit ||
        coverageType === null
      ) {
        return;
      }

      setIsSubmitting(true);

      try {
        const message =
          createCameraAnswerMessage(
            coverageType,
            interiorCount ?? 0,
            exteriorCount ?? 0
          );

        await onSubmit(message);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-sky-500/20 bg-sky-950/20 p-4">
        <p className="text-[0.72rem] font-semibold text-sky-100">
          Where will cameras be installed?
        </p>

        <p className="mt-1 text-[0.65rem] leading-relaxed text-slate-400">
          Choose the coverage area, then
          select the closest camera count.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SelectableChoiceButton
          label="Interior only"
          selected={
            coverageType ===
            "interior"
          }
          disabled={
            disabled ||
            isSubmitting
          }
          onClick={() => {
            setCoverageType(
              "interior"
            );

            setExteriorCount(null);
          }}
        />

        <SelectableChoiceButton
          label="Exterior only"
          selected={
            coverageType ===
            "exterior"
          }
          disabled={
            disabled ||
            isSubmitting
          }
          onClick={() => {
            setCoverageType(
              "exterior"
            );

            setInteriorCount(null);
          }}
        />

        <SelectableChoiceButton
          label="Interior and exterior"
          selected={
            coverageType === "both"
          }
          disabled={
            disabled ||
            isSubmitting
          }
          onClick={() =>
            setCoverageType("both")
          }
        />
      </div>

      {interiorRequired && (
        <CameraCountButtons
          label="Interior camera locations"
          value={interiorCount}
          disabled={
            disabled ||
            isSubmitting
          }
          choices={[
            2,
            4,
            6,
            8,
            12,
            16,
            24,
          ]}
          onChange={
            setInteriorCount
          }
        />
      )}

      {exteriorRequired && (
        <CameraCountButtons
          label="Exterior camera locations"
          value={exteriorCount}
          disabled={
            disabled ||
            isSubmitting
          }
          choices={[
            1,
            2,
            4,
            6,
            8,
            12,
            16,
          ]}
          onChange={
            setExteriorCount
          }
        />
      )}

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() =>
          void handleSubmit()
        }
        className="w-full rounded-xl bg-gradient-to-r from-sky-300 to-cyan-300 px-4 py-3 text-[0.72rem] font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.65)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isSubmitting
          ? "Saving camera scope..."
          : "Continue"}
      </button>
    </div>
  );
}

type CameraCountButtonsProps = {
  label: string;
  value: number | null;
  disabled: boolean;
  choices: number[];
  onChange: (
    value: number
  ) => void;
};

function CameraCountButtons({
  label,
  value,
  disabled,
  choices,
  onChange,
}: CameraCountButtonsProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/55 p-4">
      <p className="text-[0.7rem] font-semibold text-slate-200">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {choices.map(
          (choice) => (
            <button
              key={choice}
              type="button"
              disabled={disabled}
              onClick={() =>
                onChange(choice)
              }
              className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-medium transition ${
                value === choice
                  ? "border-sky-300 bg-sky-950/70 text-sky-100"
                  : "border-slate-700 bg-slate-950/75 text-slate-300 hover:border-sky-400 hover:text-sky-100"
              } disabled:cursor-not-allowed disabled:opacity-45`}
            >
              {choice}
            </button>
          )
        )}
      </div>
    </div>
  );
}

type SelectableChoiceButtonProps = {
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};

function SelectableChoiceButton({
  label,
  selected,
  disabled,
  onClick,
}: SelectableChoiceButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-[0.72rem] font-semibold transition ${
        selected
          ? "border-sky-300 bg-sky-950/70 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
          : "border-slate-700 bg-slate-950/75 text-slate-300 hover:border-sky-400 hover:text-sky-100"
      } disabled:cursor-not-allowed disabled:opacity-45`}
    >
      {label}
    </button>
  );
}

function createCameraAnswerMessage(
  coverageType:
    Exclude<
      CameraCoverageType,
      null
    >,
  interiorCount: number,
  exteriorCount: number
): string {
  switch (coverageType) {
    case "interior":
      return `I need interior cameras only, covering approximately ${interiorCount} interior camera locations.`;

    case "exterior":
      return `I need exterior cameras only, covering approximately ${exteriorCount} exterior camera locations.`;

    case "both":
      return `I need both interior and exterior cameras, covering approximately ${interiorCount} interior camera locations and ${exteriorCount} exterior camera locations.`;
  }
}

function isCombinedCameraQuestion(
  question: EstimatorNextQuestion
): boolean {
  const normalizedQuestion =
    question.question
      .trim()
      .toLowerCase();

  return (
    normalizedQuestion.includes(
      "interior cameras"
    ) &&
    normalizedQuestion.includes(
      "exterior cameras"
    ) &&
    (
      normalizedQuestion.includes(
        "how many"
      ) ||
      normalizedQuestion.includes(
        "approximately"
      ) ||
      normalizedQuestion.includes(
        "locations"
      )
    )
  );
}

function getResolvedAnswerType(
  question: EstimatorNextQuestion,
  customChoices: ChoiceOption[]
): NormalizedAnswerType {
  if (
    forcedNumericFields.has(
      question.key
    )
  ) {
    return "number";
  }

  if (
    customChoices.length > 0
  ) {
    return "single_choice";
  }

  return normalizeAnswerType(
    question.answerType,
    question.choices
  );
}

function getCustomQuestionChoices(
  question: EstimatorNextQuestion
): ChoiceOption[] {
  switch (question.key) {
    case "property.constructionType":
      return [
        {
          label:
            "Operating location",
          value:
            "existing_finished",
          description:
            "The business is open and the interior is already finished.",
        },
        {
          label:
            "Tenant build-out or unfinished space",
          value:
            "existing_unfinished",
          description:
            "The building exists, but the interior is still being completed.",
        },
        {
          label:
            "Renovation",
          value:
            "renovation",
          description:
            "The existing space is being remodeled or substantially changed.",
        },
        {
          label:
            "New construction",
          value:
            "new_construction",
          description:
            "The building is being constructed from the ground up.",
        },
        {
          label:
            "I’m not sure",
          value:
            "unknown",
          description:
            "SmartNET will confirm this during the walkthrough.",
        },
      ];

    case "property.ceilingType":
      return [
        {
          label:
            "Drop ceiling",
          value:
            "drop_ceiling",
        },
        {
          label:
            "Drywall or finished ceiling",
          value:
            "drywall",
        },
        {
          label:
            "Open or exposed ceiling",
          value:
            "open_ceiling",
        },
        {
          label:
            "Warehouse roof deck",
          value:
            "warehouse_deck",
        },
        {
          label:
            "Multiple ceiling types",
          value:
            "mixed",
        },
        {
          label:
            "I’m not sure",
          value:
            "unknown",
        },
      ];

    case "cabling.pathwayType":
      return [
        {
          label:
            "Above a drop ceiling",
          value:
            "drop ceiling",
          description:
            "Cables can run above removable ceiling tiles.",
        },
        {
          label:
            "Open ceiling or cable tray",
          value:
            "open structure or cable tray",
          description:
            "Cables can follow exposed structure, supports, or existing tray.",
        },
        {
          label:
            "Existing conduit",
          value:
            "existing conduit",
          description:
            "Existing conduit or raceway may be available for cable runs.",
        },
        {
          label:
            "Inside finished walls",
          value:
            "inside finished walls",
          description:
            "Cables will likely need to be concealed inside walls or ceilings.",
        },
        {
          label:
            "A mixture of pathways",
          value:
            "mixed pathways",
          description:
            "Different areas will use different cable-routing methods.",
        },
        {
          label:
            "I’m not sure",
          value:
            "confirm during walkthrough",
          description:
            "SmartNET will identify the best pathway during the site walkthrough.",
        },
      ];

    case "customerIntent.futureExpansion":
      return [
        {
          label:
            "Yes — plan for future growth",
          value:
            "Plan for future growth",
          description:
            "Include capacity for additional cameras, doors, Wi-Fi, or locations.",
        },
        {
          label:
            "Possibly later",
          value:
            "Possibly expand later",
          description:
            "Leave reasonable room for growth without overbuilding the first phase.",
        },
        {
          label:
            "No planned expansion",
          value:
            "No planned expansion",
          description:
            "Size the system mainly for the current project.",
        },
      ];

    case "cabling.wiringStyle":
      return [
        {
          label:
            "Hidden in walls or ceilings",
          value:
            "hidden",
        },
        {
          label:
            "Exposed conduit or surface runs",
          value:
            "exposed",
        },
        {
          label:
            "A mix of hidden and exposed",
          value:
            "mixed",
        },
        {
          label:
            "I’m not sure",
          value:
            "unknown",
        },
      ];

    case "cabling.preferredCableType":
      return [
        {
          label:
            "CAT6",
          value:
            "cat6",
        },
        {
          label:
            "CAT6A",
          value:
            "cat6a",
        },
        {
          label:
            "Fiber",
          value:
            "fiber",
        },
        {
          label:
            "Copper and fiber",
          value:
            "mixed",
        },
        {
          label:
            "I’m not sure",
          value:
            "unknown",
        },
      ];

    case "installation.difficultyLevel":
      return [
        {
          label:
            "Standard",
          value:
            "standard",
        },
        {
          label:
            "Moderate",
          value:
            "moderate",
        },
        {
          label:
            "Difficult",
          value:
            "difficult",
        },
        {
          label:
            "Specialty environment",
          value:
            "specialty",
        },
        {
          label:
            "I’m not sure",
          value:
            "unknown",
        },
      ];

    case "network.rackLocation":
      return [
        {
          label:
            "Existing server or network room",
          value:
            "existing server or network room",
        },
        {
          label:
            "Office or utility closet",
          value:
            "office or utility closet",
        },
        {
          label:
            "Back-of-house area",
          value:
            "back-of-house area",
        },
        {
          label:
            "New dedicated rack location",
          value:
            "new dedicated rack location",
        },
        {
          label:
            "Confirm during walkthrough",
          value:
            "confirm during walkthrough",
        },
      ];

    default:
      return [];
  }
}

function getTextPresetChoices(
  question: EstimatorNextQuestion
): ChoiceOption[] {
  const normalizedQuestion =
    question.question
      .trim()
      .toLowerCase();

  if (
    question.key ===
      "customerIntent.summary" ||
    normalizedQuestion.includes(
      "main goal"
    ) ||
    normalizedQuestion.includes(
      "trying to accomplish"
    )
  ) {
    return [
      {
        label:
          "Improve security",
        value:
          "Improve security and property visibility.",
      },
      {
        label:
          "Improve Wi-Fi and network",
        value:
          "Improve Wi-Fi coverage and network reliability.",
      },
      {
        label:
          "Add access control",
        value:
          "Add secure managed access to doors and restricted areas.",
      },
      {
        label:
          "Complete technology upgrade",
        value:
          "Upgrade cameras, network, Wi-Fi, cabling, and access control.",
      },
    ];
  }

  if (
    question.key ===
      "cameras.coverageGoals" ||
    normalizedQuestion.includes(
      "camera coverage"
    )
  ) {
    return [
      {
        label:
          "Entrances and exits",
        value:
          "entrances and exits",
      },
      {
        label:
          "Parking and exterior",
        value:
          "parking areas and building exterior",
      },
      {
        label:
          "Customer and common areas",
        value:
          "customer and common areas",
      },
      {
        label:
          "Sensitive or restricted areas",
        value:
          "sensitive and restricted areas",
      },
    ];
  }

  if (
    question.key ===
      "wifi.coverageGoals" ||
    normalizedQuestion.includes(
      "wi-fi coverage"
    ) ||
    normalizedQuestion.includes(
      "wifi coverage"
    )
  ) {
    return [
      {
        label:
          "Whole-building coverage",
        value:
          "whole-building coverage",
      },
      {
        label:
          "Customer or guest coverage",
        value:
          "customer and guest coverage",
      },
      {
        label:
          "Staff and business devices",
        value:
          "staff and business device coverage",
      },
      {
        label:
          "Indoor and outdoor coverage",
        value:
          "indoor and outdoor coverage",
      },
    ];
  }

  if (
    question.key ===
      "accessControl.credentialTypes" ||
    normalizedQuestion.includes(
      "credential"
    )
  ) {
    return [
      {
        label:
          "Badge or key card",
        value:
          "badge",
      },
      {
        label:
          "Mobile phone",
        value:
          "mobile credential",
      },
      {
        label:
          "PIN code",
        value:
          "pin code",
      },
      {
        label:
          "Recommend the best option",
        value:
          "SmartNET recommendation",
      },
    ];
  }

  if (
    normalizedQuestion.includes(
      "schedule"
    ) ||
    normalizedQuestion.includes(
      "completion date"
    ) ||
    normalizedQuestion.includes(
      "opening date"
    )
  ) {
    return [
      {
        label:
          "Flexible schedule",
        value:
          "The schedule is flexible.",
      },
      {
        label:
          "Within 30 days",
        value:
          "Completion is needed within 30 days.",
      },
      {
        label:
          "Within 60 days",
        value:
          "Completion is needed within 60 days.",
      },
      {
        label:
          "Phased installation",
        value:
          "A phased installation schedule is preferred.",
      },
    ];
  }

  return [];
}

function getTextPlaceholder(
  question: EstimatorNextQuestion
): string {
  const normalizedQuestion =
    question.question
      .trim()
      .toLowerCase();

  if (
    question.key ===
    "property.customProjectType"
  ) {
    return "Example: full-service restaurant, fast-casual restaurant, café, warehouse, medical office...";
  }

  if (
    normalizedQuestion.includes(
      "restaurant"
    ) ||
    normalizedQuestion.includes(
      "facility"
    ) ||
    normalizedQuestion.includes(
      "property"
    )
  ) {
    return "Describe the type of location or facility.";
  }

  if (
    normalizedQuestion.includes(
      "areas"
    ) ||
    normalizedQuestion.includes(
      "locations"
    ) ||
    normalizedQuestion.includes(
      "coverage"
    )
  ) {
    return "Describe the areas, locations, or coverage you need.";
  }

  if (
    normalizedQuestion.includes(
      "existing"
    )
  ) {
    return "Describe what equipment or infrastructure is already installed.";
  }

  return "Type your answer here. You can use a full sentence.";
}

function normalizeAnswerType(
  answerType: string,
  choices: string[]
): NormalizedAnswerType {
  const normalized =
    answerType
      .trim()
      .toLowerCase()
      .replace(/-/g, "_");

  if (
    normalized === "boolean" ||
    normalized === "yes_no" ||
    normalized === "yesno"
  ) {
    return "boolean";
  }

  if (
    normalized === "number" ||
    normalized === "numeric" ||
    normalized === "integer"
  ) {
    return "number";
  }

  if (
    normalized ===
      "multiple_choice" ||
    normalized ===
      "multi_select" ||
    normalized ===
      "multiselect"
  ) {
    return "multiple_choice";
  }

  if (
    normalized ===
      "single_choice" ||
    normalized === "choice" ||
    normalized === "select" ||
    choices.length > 0
  ) {
    return "single_choice";
  }

  return "text";
}

function getNumericGuidance(
  questionKey: string
): string {
  switch (questionKey) {
    case "property.squareFootage":
      return "Choose the closest estimated square footage.";

    case "property.numberOfFloors":
      return "Choose the number of floors or levels.";

    case "property.ceilingHeightFeet":
      return "Choose the closest ceiling height.";

    case "cameras.recordingDays":
      return "Choose the preferred video retention period.";

    case "installation.estimatedDurationDays":
      return "Choose the closest estimated project duration.";

    case "installation.estimatedLaborHours":
      return "Choose the closest estimated labor-hour range.";

    default:
      return "Choose the closest estimate.";
  }
}

function getQuickNumberChoices(
  questionKey: string
): number[] {
  switch (questionKey) {
    case "property.squareFootage":
      return [
        1000,
        2500,
        5000,
        10000,
        25000,
        50000,
        100000,
      ];

    case "property.numberOfFloors":
      return [
        1,
        2,
        3,
        4,
        5,
        10,
      ];

    case "property.ceilingHeightFeet":
      return [
        8,
        10,
        12,
        16,
        20,
        24,
        30,
        40,
      ];

    case "cameras.interiorCount":
    case "cameras.exteriorCount":
    case "cameras.specialtyCount":
      return [
        0,
        2,
        4,
        6,
        8,
        12,
        16,
        24,
        32,
        48,
      ];

    case "cameras.recordingDays":
      return [
        7,
        14,
        30,
        60,
        90,
      ];

    case "network.currentDownloadMbps":
    case "network.currentUploadMbps":
      return [
        25,
        50,
        100,
        250,
        500,
        1000,
      ];

    case "wifi.estimatedAccessPointCount":
      return [
        1,
        2,
        4,
        6,
        8,
        12,
        16,
        24,
      ];

    case "wifi.estimatedConcurrentUsers":
      return [
        10,
        25,
        50,
        100,
        250,
        500,
        1000,
      ];

    case "accessControl.controlledDoorCount":
    case "accessControl.exteriorDoorCount":
    case "accessControl.interiorDoorCount":
      return [
        0,
        1,
        2,
        4,
        6,
        8,
        12,
        16,
        24,
      ];

    case "cabling.estimatedCableFeet":
      return [
        500,
        1000,
        2500,
        5000,
        10000,
        25000,
      ];

    case "installation.travelMiles":
      return [
        0,
        10,
        25,
        50,
        100,
        250,
      ];

    case "installation.estimatedCrewSize":
      return [
        1,
        2,
        3,
        4,
        6,
        8,
      ];

    case "installation.estimatedLaborHours":
      return [
        8,
        16,
        24,
        40,
        80,
        120,
        160,
        240,
      ];

    case "installation.estimatedDurationDays":
      return [
        1,
        3,
        5,
        7,
        10,
        14,
        21,
        30,
      ];

    default:
      return [
        0,
        1,
        2,
        4,
        8,
        12,
        16,
        24,
        30,
        50,
        100,
      ];
  }
}

function formatQuickNumber(
  questionKey: string,
  value: number
): string {
  if (
    questionKey ===
    "property.squareFootage"
  ) {
    return `${value.toLocaleString()} ft²`;
  }

  if (
    questionKey ===
    "property.ceilingHeightFeet"
  ) {
    return `${value} ft`;
  }

  if (
    questionKey ===
      "cameras.recordingDays" ||
    questionKey ===
      "installation.estimatedDurationDays"
  ) {
    return `${value} ${
      value === 1
        ? "day"
        : "days"
    }`;
  }

  if (
    questionKey ===
      "network.currentDownloadMbps" ||
    questionKey ===
      "network.currentUploadMbps"
  ) {
    return `${value} Mbps`;
  }

  if (
    questionKey ===
    "cabling.estimatedCableFeet"
  ) {
    return `${value.toLocaleString()} ft`;
  }

  if (
    questionKey ===
    "installation.travelMiles"
  ) {
    return `${value} miles`;
  }

  if (
    questionKey ===
    "installation.estimatedLaborHours"
  ) {
    return `${value} hours`;
  }

  return String(value);
}

type QuestionChoiceButtonProps = {
  label: string;
  description?: string;
  disabled?: boolean;
  muted?: boolean;
  onClick: () => void;
};

function QuestionChoiceButton({
  label,
  description,
  disabled = false,
  muted = false,
  onClick,
}: QuestionChoiceButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left transition ${
        muted
          ? "border-slate-700 bg-slate-950/70 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          : "border-sky-500/30 bg-sky-950/25 text-sky-50 hover:border-sky-300 hover:bg-sky-950/45 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]"
      } disabled:cursor-not-allowed disabled:opacity-45`}
    >
      <span className="block text-[0.74rem] font-semibold">
        {label}
      </span>

      {description && (
        <span className="mt-1 block text-[0.64rem] leading-relaxed text-slate-400">
          {description}
        </span>
      )}
    </button>
  );
}

function formatChoiceLabel(
  value: string
): string {
  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}
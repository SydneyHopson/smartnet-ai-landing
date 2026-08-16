import type { CombinedEstimatorQuestion } from "./combined-question-planner";

export type NormalizedEstimatorAnswer =
  | string
  | number
  | boolean
  | string[];

export type NormalizeEstimatorAnswerResult =
  | {
      ok: true;
      value: NormalizedEstimatorAnswer;
    }
  | {
      ok: false;
      error: string;
    };

export function normalizeEstimatorAnswer(
  question: CombinedEstimatorQuestion,
  rawAnswer: unknown
): NormalizeEstimatorAnswerResult {
  switch (question.answerType) {
    case "boolean":
      return normalizeBooleanAnswer(rawAnswer);

    case "number":
      return normalizeNumberAnswer(rawAnswer);

    case "single_choice":
      return normalizeSingleChoiceAnswer(
        rawAnswer,
        question.choices
      );

    case "multiple_choice":
      return normalizeMultipleChoiceAnswer(
        rawAnswer,
        question.choices
      );

    case "text":
      return normalizeTextAnswer(rawAnswer);

    default:
      return {
        ok: false,
        error: "Unsupported estimator answer type.",
      };
  }
}

function normalizeTextAnswer(
  rawAnswer: unknown
): NormalizeEstimatorAnswerResult {
  if (typeof rawAnswer !== "string") {
    return {
      ok: false,
      error: "A text answer is required.",
    };
  }

  const value = rawAnswer.trim();

  if (!value) {
    return {
      ok: false,
      error: "The answer cannot be empty.",
    };
  }

  return {
    ok: true,
    value,
  };
}

function normalizeBooleanAnswer(
  rawAnswer: unknown
): NormalizeEstimatorAnswerResult {
  if (typeof rawAnswer === "boolean") {
    return {
      ok: true,
      value: rawAnswer,
    };
  }

  if (typeof rawAnswer !== "string") {
    return {
      ok: false,
      error: "A yes or no answer is required.",
    };
  }

  const normalized = rawAnswer
    .trim()
    .toLowerCase();

  const trueValues = new Set([
    "yes",
    "y",
    "true",
    "1",
    "required",
    "needed",
  ]);

  const falseValues = new Set([
    "no",
    "n",
    "false",
    "0",
    "not required",
    "not needed",
  ]);

  if (trueValues.has(normalized)) {
    return {
      ok: true,
      value: true,
    };
  }

  if (falseValues.has(normalized)) {
    return {
      ok: true,
      value: false,
    };
  }

  return {
    ok: false,
    error: "Please answer yes or no.",
  };
}

function normalizeNumberAnswer(
  rawAnswer: unknown
): NormalizeEstimatorAnswerResult {
  if (
    typeof rawAnswer === "number" &&
    Number.isFinite(rawAnswer)
  ) {
    return {
      ok: true,
      value: rawAnswer,
    };
  }

  if (typeof rawAnswer !== "string") {
    return {
      ok: false,
      error: "A numeric answer is required.",
    };
  }

  const cleaned = rawAnswer
    .trim()
    .replace(/,/g, "")
    .replace(/\$/g, "")
    .replace(
      /\s*(square feet|sq\.?\s*ft\.?|feet|ft\.?|inches|inch|days|day)$/i,
      ""
    );

  if (!cleaned) {
    return {
      ok: false,
      error: "A numeric answer is required.",
    };
  }

  const value = Number(cleaned);

  if (!Number.isFinite(value)) {
    return {
      ok: false,
      error: "The answer must contain a valid number.",
    };
  }

  if (value < 0) {
    return {
      ok: false,
      error: "The answer cannot be negative.",
    };
  }

  return {
    ok: true,
    value,
  };
}

function normalizeSingleChoiceAnswer(
  rawAnswer: unknown,
  choices: string[]
): NormalizeEstimatorAnswerResult {
  if (typeof rawAnswer !== "string") {
    return {
      ok: false,
      error: "One selection is required.",
    };
  }

  const value = rawAnswer.trim();

  if (!value) {
    return {
      ok: false,
      error: "One selection is required.",
    };
  }

  if (choices.length === 0) {
    return {
      ok: true,
      value,
    };
  }

  const matchingChoice = findMatchingChoice(
    value,
    choices
  );

  if (!matchingChoice) {
    return {
      ok: false,
      error: `Select one of: ${choices.join(", ")}.`,
    };
  }

  return {
    ok: true,
    value: matchingChoice,
  };
}

function normalizeMultipleChoiceAnswer(
  rawAnswer: unknown,
  choices: string[]
): NormalizeEstimatorAnswerResult {
  const rawValues = toStringArray(rawAnswer);

  if (rawValues.length === 0) {
    return {
      ok: false,
      error: "At least one selection is required.",
    };
  }

  if (choices.length === 0) {
    return {
      ok: true,
      value: uniqueValues(rawValues),
    };
  }

  const normalizedValues: string[] = [];

  for (const rawValue of rawValues) {
    const matchingChoice = findMatchingChoice(
      rawValue,
      choices
    );

    if (!matchingChoice) {
      return {
        ok: false,
        error: `"${rawValue}" is not an available selection.`,
      };
    }

    normalizedValues.push(matchingChoice);
  }

  return {
    ok: true,
    value: uniqueValues(normalizedValues),
  };
}

function toStringArray(
  rawAnswer: unknown
): string[] {
  if (Array.isArray(rawAnswer)) {
    return rawAnswer
      .filter(
        (value): value is string =>
          typeof value === "string"
      )
      .map((value) => value.trim())
      .filter(Boolean);
  }

  if (typeof rawAnswer !== "string") {
    return [];
  }

  return rawAnswer
    .split(/,|\n|;/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function findMatchingChoice(
  rawValue: string,
  choices: string[]
): string | null {
  const normalizedValue =
    normalizeComparisonText(rawValue);

  const exactMatch = choices.find(
    (choice) =>
      normalizeComparisonText(choice) ===
      normalizedValue
  );

  if (exactMatch) {
    return exactMatch;
  }

  const partialMatches = choices.filter(
    (choice) => {
      const normalizedChoice =
        normalizeComparisonText(choice);

      return (
        normalizedChoice.includes(
          normalizedValue
        ) ||
        normalizedValue.includes(
          normalizedChoice
        )
      );
    }
  );

  return partialMatches.length === 1
    ? partialMatches[0]
    : null;
}

function normalizeComparisonText(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueValues(
  values: string[]
): string[] {
  return Array.from(new Set(values));
}
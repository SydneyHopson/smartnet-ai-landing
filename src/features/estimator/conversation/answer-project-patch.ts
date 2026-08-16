import type { ProjectEstimatePatch } from "./ai-response";

import type { CombinedEstimatorQuestion } from "./combined-question-planner";

import type { NormalizedEstimatorAnswer } from "./answer-normalizer";

import { normalizeProjectFieldValue } from "../domain/normalize-project-field-value";

type PatchRecord =
  Record<string, unknown>;

const quantityFields =
  new Set<string>([
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

const stringArrayFields =
  new Set<string>([
    "customerIntent.goals",
    "customerIntent.problems",

    "property.specialEnvironment",

    "cameras.coverageGoals",
    "cameras.mountingSurfaces",

    "wifi.coverageGoals",
    "wifi.weakAreas",

    "accessControl.credentialTypes",

    "cabling.pathwayType",

    "assessment.assumptions",
    "assessment.exclusions",
    "assessment.risks",
    "assessment.unansweredQuestions",
  ]);

export function createProjectPatchFromAnswer(
  question: CombinedEstimatorQuestion,
  answer: NormalizedEstimatorAnswer
): ProjectEstimatePatch {
  const projectField =
    question.projectField;

  if (
    projectField ===
    "equipment.recommendedItems"
  ) {
    return createRecommendationAnswerPatch(
      question,
      answer
    );
  }

  const normalizedAnswer =
    normalizeProjectFieldValue(
      projectField,
      answer
    );

  const patch: PatchRecord = {};

  if (
    quantityFields.has(
      projectField
    )
  ) {
    if (
      typeof normalizedAnswer !==
      "number"
    ) {
      throw new Error(
        `Field "${projectField}" requires a numeric answer.`
      );
    }

    setValueAtPath(
      patch,
      projectField,
      {
        value:
          normalizedAnswer,

        confidence:
          "customer_reported",
      }
    );

    return patch as ProjectEstimatePatch;
  }

  if (
    stringArrayFields.has(
      projectField
    )
  ) {
    const values =
      Array.isArray(
        normalizedAnswer
      )
        ? normalizedAnswer.map(
            String
          )
        : [
            String(
              normalizedAnswer
            ),
          ];

    setValueAtPath(
      patch,
      projectField,
      values
    );

    return patch as ProjectEstimatePatch;
  }

  setValueAtPath(
    patch,
    projectField,
    normalizedAnswer
  );

  return patch as ProjectEstimatePatch;
}

function createRecommendationAnswerPatch(
  question: CombinedEstimatorQuestion,
  answer: NormalizedEstimatorAnswer
): ProjectEstimatePatch {
  const answerText =
    formatAnswer(answer);

  return {
    assessment: {
      assumptions: [
        `${question.question} Customer response: ${answerText}`,
      ],
    },
  };
}

function setValueAtPath(
  target: PatchRecord,
  path: string,
  value: unknown
): void {
  const parts =
    path.split(".");

  if (
    parts.length === 0
  ) {
    throw new Error(
      "A valid project field path is required."
    );
  }

  let current = target;

  for (
    let index = 0;
    index <
    parts.length - 1;
    index += 1
  ) {
    const part =
      parts[index];

    const existing =
      current[part];

    if (
      typeof existing !==
        "object" ||
      existing === null ||
      Array.isArray(existing)
    ) {
      current[part] = {};
    }

    current =
      current[
        part
      ] as PatchRecord;
  }

  const finalPart =
    parts[
      parts.length - 1
    ];

  current[finalPart] =
    value;
}

function formatAnswer(
  answer: NormalizedEstimatorAnswer
): string {
  if (
    Array.isArray(answer)
  ) {
    return answer.join(", ");
  }

  if (
    typeof answer ===
    "boolean"
  ) {
    return answer
      ? "Yes"
      : "No";
  }

  return String(answer);
}
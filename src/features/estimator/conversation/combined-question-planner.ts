import type { ProjectEstimate } from "../domain/project-estimate";

import type { PlaybookQuestion } from "../knowledge/playbook";
import { selectApplicableEstimatorPlaybooks } from "../knowledge/playbook-registry";
import { resolveEstimatorPlaybook } from "../knowledge/playbook-resolver";

import type { EstimatorQuestion } from "./question-planner";
import { getEstimatorQuestions } from "./question-planner";

export type CombinedEstimatorQuestion =
  EstimatorQuestion & {
    source: "core" | "playbook";

    playbookId: string | null;

    questionId: string | null;

    projectField: string;

    answerType:
      | "text"
      | "boolean"
      | "number"
      | "single_choice"
      | "multiple_choice";

    choices: string[];

    promptGuidance: string;

    ruleTags: string[];

    requiredForPreliminaryEstimate: boolean;

    requiredForFinalQuote: boolean;
  };

const priorityOrder: Record<
  CombinedEstimatorQuestion["priority"],
  number
> = {
  critical: 0,
  high: 1,
  normal: 2,
  optional: 3,
};

const categoryOrder: Record<
  CombinedEstimatorQuestion["category"],
  number
> = {
  project: 0,
  property: 1,
  cameras: 2,
  wifi: 3,
  access_control: 4,
  network: 5,
  cabling: 6,
  installation: 7,
  commercial: 8,
};

/**
 * Fields whose real ProjectEstimate value is boolean.
 *
 * This overrides incorrect or outdated answerType metadata
 * inside individual playbooks.
 */
const booleanProjectFields =
  new Set<string>([
    "property.occupiedDuringInstall",

    "cameras.requested",
    "cameras.existingSystem",
    "cameras.remoteViewingRequired",

    "network.requested",
    "network.existingRouter",
    "network.existingSwitches",
    "network.existingRack",
    "network.rackRequired",
    "network.vlanRequired",

    "wifi.requested",
    "wifi.indoorCoverage",
    "wifi.outdoorCoverage",
    "wifi.guestNetworkRequired",

    "accessControl.requested",
    "accessControl.existingSystem",
    "accessControl.remoteManagementRequired",

    "cabling.existingCablingAvailable",
    "cabling.trenchingRequired",
    "cabling.fireStoppingRequired",

    "installation.liftRequired",
    "installation.ladderAccessPossible",
    "installation.afterHoursRequired",
    "installation.permitsRequired",
  ]);

/**
 * Fields whose real ProjectEstimate value is a quantity object.
 *
 * These must always be answered as numbers even if a playbook
 * accidentally marks them as text or single choice.
 */
const numberProjectFields =
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

/**
 * These fields may remain useful to SmartNET technicians,
 * walkthrough checklists, and final quoting, but they should
 * not interrupt the customer-facing preliminary estimator.
 *
 * This central list protects every playbook without requiring
 * individual edits to each knowledge-base file.
 */
const deferredCustomerFields =
  new Set<string>([
    "assessment.assumptions",
    "assessment.exclusions",
    "assessment.risks",
    "assessment.unansweredQuestions",

    "equipment.recommendedItems",

    "cameras.mountingSurfaces",

    "network.currentDownloadMbps",
    "network.currentUploadMbps",
    "network.existingSwitches",
    "network.rackLocation",
    "network.vlanRequired",

    "cabling.preferredCableType",
    "cabling.wiringStyle",
    "cabling.estimatedCableFeet",
    "cabling.trenchingRequired",
    "cabling.fireStoppingRequired",

    "installation.liftType",
    "installation.ladderAccessPossible",
    "installation.permitsRequired",
    "installation.travelMiles",
    "installation.difficultyLevel",
    "installation.estimatedCrewSize",
    "installation.estimatedLaborHours",
    "installation.estimatedDurationDays",
  ]);

/**
 * Technical wording that should never be presented directly
 * to a normal customer, even if a playbook maps it to a
 * customer-facing ProjectEstimate field.
 */
const technicianOnlyQuestionPatterns: RegExp[] =
  [
    /\bcat\s?5e\b/i,
    /\bcat\s?6a?\b/i,
    /\bfiber type\b/i,
    /\bfibre type\b/i,
    /\bsingle[- ]mode\b/i,
    /\bmultimode\b/i,
    /\bom[1-5]\b/i,
    /\bos[12]\b/i,
    /\bmdf\b/i,
    /\bidf\b/i,
    /\bpoe budget\b/i,
    /\bpatch panel\b/i,
    /\brack elevation\b/i,
    /\bconduit fill\b/i,
    /\bfire[- ]?stopp/i,
    /\bcore drill/i,
    /\bbonding\b/i,
    /\bgrounding\b/i,
    /\bcertification test/i,
    /\bfluke test/i,
    /\bsplice enclosure\b/i,
    /\bstrand count\b/i,
    /\bvlan\b/i,
    /\bups sizing\b/i,
    /\bmounting surface/i,
    /\bmounted\b/i,
  ];

function getAnswerTypeForProjectField(
  projectField: string,
  fallbackAnswerType: CombinedEstimatorQuestion["answerType"]
): CombinedEstimatorQuestion["answerType"] {
  if (
    booleanProjectFields.has(
      projectField
    )
  ) {
    return "boolean";
  }

  if (
    numberProjectFields.has(
      projectField
    )
  ) {
    return "number";
  }

  if (
    projectField ===
    "customerIntent.futureExpansion"
  ) {
    return "single_choice";
  }

  return fallbackAnswerType;
}

function getChoicesForQuestion(
  projectField: string,
  answerType: CombinedEstimatorQuestion["answerType"],
  choices: string[]
): string[] {
  if (
    projectField ===
    "customerIntent.futureExpansion"
  ) {
    return [
      "Plan for future growth",
      "Possibly expand later",
      "No planned expansion",
    ];
  }

  if (
    answerType === "boolean" ||
    answerType === "number" ||
    answerType === "text"
  ) {
    return [];
  }

  return [...choices];
}

function mapCoreQuestion(
  question: EstimatorQuestion
): CombinedEstimatorQuestion {
  const answerType =
    getAnswerTypeForProjectField(
      question.key,
      "text"
    );

  return {
    ...question,

    source:
      "core",

    playbookId:
      null,

    questionId:
      null,

    projectField:
      question.key,

    answerType,

    choices:
      getChoicesForQuestion(
        question.key,
        answerType,
        []
      ),

    promptGuidance:
      "",

    ruleTags:
      [],

    requiredForPreliminaryEstimate:
      question.priority === "critical" ||
      question.priority === "high",

    requiredForFinalQuote:
      true,
  };
}

function mapPlaybookCategory(
  category: PlaybookQuestion["category"]
): EstimatorQuestion["category"] {
  switch (category) {
    case "discovery":
      return "project";

    case "property":
      return "property";

    case "cameras":
      return "cameras";

    case "network":
      return "network";

    case "wifi":
      return "wifi";

    case "access_control":
      return "access_control";

    case "cabling":
      return "cabling";

    case "installation":
    case "safety":
      return "installation";

    case "commercial":
    case "pricing":
    case "audio_visual":
      return "commercial";

    default:
      return "project";
  }
}

function mapPlaybookQuestion(
  question: PlaybookQuestion,
  playbookId: string
): CombinedEstimatorQuestion {
  const answerType =
    getAnswerTypeForProjectField(
      question.projectField,
      question.answerType
    );

  return {
    key:
      question.projectField,

    question:
      question.question,

    reason:
      question.reason,

    priority:
      question.priority,

    category:
      mapPlaybookCategory(
        question.category
      ),

    source:
      "playbook",

    playbookId,

    questionId:
      question.id,

    projectField:
      question.projectField,

    answerType,

    choices:
      getChoicesForQuestion(
        question.projectField,
        answerType,
        question.choices
      ),

    promptGuidance:
      question.promptGuidance,

    ruleTags: [
      ...question.ruleTags,
    ],

    requiredForPreliminaryEstimate:
      question.requiredForPreliminaryEstimate,

    requiredForFinalQuote:
      question.requiredForFinalQuote,
  };
}

function compareQuestions(
  first: CombinedEstimatorQuestion,
  second: CombinedEstimatorQuestion
): number {
  const priorityDifference =
    priorityOrder[first.priority] -
    priorityOrder[second.priority];

  if (
    priorityDifference !== 0
  ) {
    return priorityDifference;
  }

  const categoryDifference =
    categoryOrder[first.category] -
    categoryOrder[second.category];

  if (
    categoryDifference !== 0
  ) {
    return categoryDifference;
  }

  /**
   * When both sources ask questions at the same stage,
   * favor the stable core question before playbook additions.
   */
  if (
    first.source !==
    second.source
  ) {
    return first.source === "core"
      ? -1
      : 1;
  }

  return first.key.localeCompare(
    second.key
  );
}

function choosePreferredQuestion(
  current: CombinedEstimatorQuestion,
  candidate: CombinedEstimatorQuestion
): CombinedEstimatorQuestion {
  const currentCustomerFacing =
    isCustomerFacingQuestion(
      current
    );

  const candidateCustomerFacing =
    isCustomerFacingQuestion(
      candidate
    );

  if (
    currentCustomerFacing &&
    !candidateCustomerFacing
  ) {
    return current;
  }

  if (
    candidateCustomerFacing &&
    !currentCustomerFacing
  ) {
    return candidate;
  }

  /**
   * When both a core and playbook question write to the
   * same ProjectEstimate field, prefer the core question.
   *
   * The core planner is intentionally customer-friendly.
   * Playbooks still contribute questions for fields without
   * an equivalent core question.
   */
  if (
    current.source === "core" &&
    candidate.source === "playbook"
  ) {
    return current;
  }

  if (
    current.source === "playbook" &&
    candidate.source === "core"
  ) {
    return candidate;
  }

  return compareQuestions(
    current,
    candidate
  ) <= 0
    ? current
    : candidate;
}

function removeDuplicateQuestions(
  questions: CombinedEstimatorQuestion[]
): CombinedEstimatorQuestion[] {
  const questionsByProjectField =
    new Map<
      string,
      CombinedEstimatorQuestion
    >();

  for (
    const question of questions
  ) {
    const existing =
      questionsByProjectField.get(
        question.projectField
      );

    if (!existing) {
      questionsByProjectField.set(
        question.projectField,
        question
      );

      continue;
    }

    questionsByProjectField.set(
      question.projectField,
      choosePreferredQuestion(
        existing,
        question
      )
    );
  }

  return Array.from(
    questionsByProjectField.values()
  );
}

function isTechnicianOnlyWording(
  questionText: string
): boolean {
  return technicianOnlyQuestionPatterns.some(
    (pattern) =>
      pattern.test(
        questionText
      )
  );
}

function normalizeRuleTag(
  tag: string
): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "_"
    )
    .replace(
      /^_+|_+$/g,
      ""
    );
}

function isCustomerFacingQuestion(
  question: CombinedEstimatorQuestion
): boolean {
  /**
   * Core questions are already curated for the customer flow.
   */
  if (
    question.source === "core"
  ) {
    return true;
  }

  /**
   * Walkthrough, technician, safety, and survey details stay
   * inside the knowledge base but do not block the customer.
   */
  if (
    deferredCustomerFields.has(
      question.projectField
    )
  ) {
    return false;
  }

  if (
    isTechnicianOnlyWording(
      question.question
    )
  ) {
    return false;
  }

  /**
   * Rule tags allow any playbook to classify questions without
   * requiring additional hard-coded field names here.
   */
  const normalizedTags =
    question.ruleTags.map(
      normalizeRuleTag
    );

  if (
    normalizedTags.some(
      (tag) =>
        tag ===
          "technician_only" ||
        tag ===
          "walkthrough_only" ||
        tag ===
          "site_survey" ||
        tag ===
          "site_survey_only" ||
        tag ===
          "final_quote_only" ||
        tag ===
          "internal_only" ||
        tag ===
          "installer_only"
    )
  ) {
    return false;
  }

  return true;
}

function normalizeCustomerQuestion(
  question: CombinedEstimatorQuestion
): CombinedEstimatorQuestion {
  if (
    question.projectField ===
    "customerIntent.futureExpansion"
  ) {
    return {
      ...question,

      question:
        "Do you think you may add more cameras, doors, Wi-Fi coverage, or locations later?",

      reason:
        "Future growth can affect switch capacity, rack space, storage, and spare capacity.",

      priority:
        "optional",

      answerType:
        "single_choice",

      choices: [
        "Plan for future growth",
        "Possibly expand later",
        "No planned expansion",
      ],

      requiredForPreliminaryEstimate:
        false,
    };
  }

  return question;
}

function getAllCombinedEstimatorQuestions(
  project: ProjectEstimate
): CombinedEstimatorQuestion[] {
  const coreQuestions =
    getEstimatorQuestions(
      project
    ).map(
      mapCoreQuestion
    );

  const playbookQuestions =
    selectApplicableEstimatorPlaybooks(
      project
    ).flatMap(
      (playbook) => {
        const resolved =
          resolveEstimatorPlaybook(
            project,
            playbook
          );

        return resolved.questions.map(
          (question) =>
            mapPlaybookQuestion(
              question,
              playbook.id
            )
        );
      }
    );

  return removeDuplicateQuestions([
    ...coreQuestions,
    ...playbookQuestions,
  ]).sort(
    compareQuestions
  );
}

/**
 * Returns only questions suitable for the customer-facing
 * estimator conversation.
 *
 * Technical and walkthrough questions remain available through
 * the playbooks, but they do not interrupt preliminary pricing.
 */
export function getCombinedEstimatorQuestions(
  project: ProjectEstimate
): CombinedEstimatorQuestion[] {
  return getAllCombinedEstimatorQuestions(
    project
  )
    .filter(
      isCustomerFacingQuestion
    )
    .map(
      normalizeCustomerQuestion
    )
    .sort(
      compareQuestions
    );
}

export function getNextCombinedEstimatorQuestion(
  project: ProjectEstimate
): CombinedEstimatorQuestion | null {
  return (
    getCombinedEstimatorQuestions(
      project
    )[0] ?? null
  );
}

export function getUnansweredCombinedEstimatorQuestionKeys(
  project: ProjectEstimate
): string[] {
  return getCombinedEstimatorQuestions(
    project
  ).map(
    (question) =>
      question.projectField
  );
}

/**
 * Preliminary pricing depends only on customer-facing,
 * pricing-critical questions.
 *
 * Walkthrough questions no longer block the initial estimate.
 */
export function isCombinedProjectReadyForPreliminaryPricing(
  project: ProjectEstimate
): boolean {
  return !getCombinedEstimatorQuestions(
    project
  ).some(
    (question) =>
      question
        .requiredForPreliminaryEstimate
  );
}

/**
 * Final-quote readiness still checks every unresolved core
 * and playbook question, including deferred technical items.
 *
 * This keeps a preliminary estimate from being treated as a
 * verified final quote before the walkthrough is completed.
 */
export function isCombinedProjectReadyForFinalQuote(
  project: ProjectEstimate
): boolean {
  return !getAllCombinedEstimatorQuestions(
    project
  ).some(
    (question) =>
      question.requiredForFinalQuote
  );
}
import type { ProjectEstimate } from "../domain/project-estimate";

import type {
  EstimatorPlaybook,
  PlaybookAssumption,
  PlaybookChecklistItem,
  PlaybookCommonMistake,
  PlaybookLaborProfile,
  PlaybookMaterial,
  PlaybookMeasurement,
  PlaybookPhotoRequirement,
  PlaybookQuestion,
  PlaybookRecommendation,
  PlaybookRisk,
  PlaybookStandardsReference,
  PlaybookUpsellOpportunity,
} from "./playbook";

import { evaluateAllPlaybookConditions } from "./condition-evaluator";

export type ResolvedPlaybook = {
  playbookId: string;
  playbookName: string;

  questions: PlaybookQuestion[];
  assumptions: PlaybookAssumption[];
  risks: PlaybookRisk[];
  recommendations: PlaybookRecommendation[];

  walkthroughChecklist: PlaybookChecklistItem[];
  requiredPhotos: PlaybookPhotoRequirement[];
  requiredMeasurements: PlaybookMeasurement[];
  commonMaterials: PlaybookMaterial[];
  laborProfiles: PlaybookLaborProfile[];
  commonMistakes: PlaybookCommonMistake[];
  upsellOpportunities: PlaybookUpsellOpportunity[];
  standardsReferences: PlaybookStandardsReference[];

  unansweredRequiredQuestionIds: string[];

  readyForPreliminaryEstimate: boolean;
  readyForFinalQuote: boolean;

  activeRuleTags: string[];
};

const priorityOrder: Record<
  PlaybookQuestion["priority"],
  number
> = {
  critical: 0,
  high: 1,
  normal: 2,
  optional: 3,
};

function isProjectFieldKnown(
  project: ProjectEstimate,
  fieldPath: string
): boolean {
  const parts = fieldPath.split(".");

  let current: unknown = project;

  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return false;
    }

    current = (
      current as Record<string, unknown>
    )[part];
  }

  if (current === null || current === undefined) {
    return false;
  }

  if (typeof current === "string") {
    return (
      current.trim().length > 0 &&
      current !== "unknown"
    );
  }

  if (Array.isArray(current)) {
    return current.length > 0;
  }

  if (
    typeof current === "object" &&
    current !== null &&
    "value" in current
  ) {
    const quantityValue = (
      current as {
        value?: unknown;
      }
    ).value;

    return (
      quantityValue !== null &&
      quantityValue !== undefined
    );
  }

  return true;
}

function areDependenciesCompleted(
  question: PlaybookQuestion,
  completedQuestionIds: Set<string>
): boolean {
  return question.dependsOn.every((dependencyId) =>
    completedQuestionIds.has(dependencyId)
  );
}

function addRuleTags(
  tags: Set<string>,
  items: Array<{
    ruleTags: string[];
  }>
): void {
  for (const item of items) {
    for (const tag of item.ruleTags) {
      tags.add(tag);
    }
  }
}

function collectRuleTags(
  playbook: EstimatorPlaybook,
  questions: PlaybookQuestion[],
  assumptions: PlaybookAssumption[],
  risks: PlaybookRisk[],
  recommendations: PlaybookRecommendation[],
  walkthroughChecklist: PlaybookChecklistItem[],
  requiredPhotos: PlaybookPhotoRequirement[],
  requiredMeasurements: PlaybookMeasurement[],
  commonMaterials: PlaybookMaterial[],
  laborProfiles: PlaybookLaborProfile[],
  commonMistakes: PlaybookCommonMistake[],
  upsellOpportunities: PlaybookUpsellOpportunity[],
  standardsReferences: PlaybookStandardsReference[]
): string[] {
  const tags = new Set<string>(
    playbook.defaultRuleTags
  );

  addRuleTags(tags, questions);
  addRuleTags(tags, assumptions);
  addRuleTags(tags, risks);
  addRuleTags(tags, recommendations);
  addRuleTags(tags, walkthroughChecklist);
  addRuleTags(tags, requiredPhotos);
  addRuleTags(tags, requiredMeasurements);
  addRuleTags(tags, commonMaterials);
  addRuleTags(tags, laborProfiles);
  addRuleTags(tags, commonMistakes);
  addRuleTags(tags, upsellOpportunities);
  addRuleTags(tags, standardsReferences);

  return Array.from(tags).sort();
}

export function resolveEstimatorPlaybook(
  project: ProjectEstimate,
  playbook: EstimatorPlaybook
): ResolvedPlaybook {
  const applicableQuestions =
    playbook.questions.filter((question) =>
      evaluateAllPlaybookConditions(
        project,
        question.conditions
      )
    );

  const completedQuestionIds = new Set<string>();

  for (const question of applicableQuestions) {
    if (
      isProjectFieldKnown(
        project,
        question.projectField
      )
    ) {
      completedQuestionIds.add(question.id);
    }
  }

  const availableQuestions =
    applicableQuestions
      .filter(
        (question) =>
          !completedQuestionIds.has(question.id)
      )
      .filter((question) =>
        areDependenciesCompleted(
          question,
          completedQuestionIds
        )
      )
      .sort((a, b) => {
        const priorityDifference =
          priorityOrder[a.priority] -
          priorityOrder[b.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return a.id.localeCompare(b.id);
      });

  const assumptions =
    playbook.assumptions.filter((assumption) =>
      evaluateAllPlaybookConditions(
        project,
        assumption.conditions
      )
    );

  const risks =
    playbook.risks.filter((risk) =>
      evaluateAllPlaybookConditions(
        project,
        risk.conditions
      )
    );

  const recommendations =
    playbook.recommendations.filter(
      (recommendation) =>
        evaluateAllPlaybookConditions(
          project,
          recommendation.conditions
        )
    );

  const walkthroughChecklist =
    playbook.walkthroughChecklist.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const requiredPhotos =
    playbook.requiredPhotos.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const requiredMeasurements =
    playbook.requiredMeasurements.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const commonMaterials =
    playbook.commonMaterials.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const laborProfiles =
    playbook.laborProfiles.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const commonMistakes =
    playbook.commonMistakes.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const upsellOpportunities =
    playbook.upsellOpportunities.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const standardsReferences =
    playbook.standardsReferences.filter((item) =>
      evaluateAllPlaybookConditions(
        project,
        item.conditions
      )
    );

  const unansweredPreliminary =
    applicableQuestions.filter(
      (question) =>
        question.requiredForPreliminaryEstimate &&
        !completedQuestionIds.has(question.id)
    );

  const unansweredFinal =
    applicableQuestions.filter(
      (question) =>
        question.requiredForFinalQuote &&
        !completedQuestionIds.has(question.id)
    );

  const activeRuleTags = collectRuleTags(
    playbook,
    availableQuestions,
    assumptions,
    risks,
    recommendations,
    walkthroughChecklist,
    requiredPhotos,
    requiredMeasurements,
    commonMaterials,
    laborProfiles,
    commonMistakes,
    upsellOpportunities,
    standardsReferences
  );

  return {
    playbookId: playbook.id,
    playbookName: playbook.name,

    questions: availableQuestions,
    assumptions,
    risks,
    recommendations,

    walkthroughChecklist,
    requiredPhotos,
    requiredMeasurements,
    commonMaterials,
    laborProfiles,
    commonMistakes,
    upsellOpportunities,
    standardsReferences,

    unansweredRequiredQuestionIds:
      unansweredPreliminary.map(
        (question) => question.id
      ),

    readyForPreliminaryEstimate:
      unansweredPreliminary.length === 0,

    readyForFinalQuote:
      unansweredFinal.length === 0,

    activeRuleTags,
  };
}

export function getNextPlaybookQuestion(
  project: ProjectEstimate,
  playbook: EstimatorPlaybook
): PlaybookQuestion | null {
  const resolved = resolveEstimatorPlaybook(
    project,
    playbook
  );

  return resolved.questions[0] ?? null;
}
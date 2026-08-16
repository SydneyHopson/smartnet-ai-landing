import type { EstimatorPlaybook } from "./playbook";
import { getAllEstimatorPlaybooks } from "./playbook-registry";

export type PlaybookValidationIssue = {
  playbookId: string;
  path: string;
  message: string;
};

function findDuplicateIds(
  playbookId: string,
  path: string,
  items: Array<{ id: string }>
): PlaybookValidationIssue[] {
  const seen = new Set<string>();
  const issues: PlaybookValidationIssue[] = [];

  for (const item of items) {
    if (seen.has(item.id)) {
      issues.push({
        playbookId,
        path,
        message: `Duplicate id "${item.id}".`,
      });
    }

    seen.add(item.id);
  }

  return issues;
}

function validatePlaybook(
  playbook: EstimatorPlaybook
): PlaybookValidationIssue[] {
  return [
    ...findDuplicateIds(
      playbook.id,
      "questions",
      playbook.questions
    ),
    ...findDuplicateIds(
      playbook.id,
      "assumptions",
      playbook.assumptions
    ),
    ...findDuplicateIds(
      playbook.id,
      "risks",
      playbook.risks
    ),
    ...findDuplicateIds(
      playbook.id,
      "recommendations",
      playbook.recommendations
    ),
    ...findDuplicateIds(
      playbook.id,
      "walkthroughChecklist",
      playbook.walkthroughChecklist
    ),
    ...findDuplicateIds(
      playbook.id,
      "requiredPhotos",
      playbook.requiredPhotos
    ),
    ...findDuplicateIds(
      playbook.id,
      "requiredMeasurements",
      playbook.requiredMeasurements
    ),
    ...findDuplicateIds(
      playbook.id,
      "commonMaterials",
      playbook.commonMaterials
    ),
    ...findDuplicateIds(
      playbook.id,
      "laborProfiles",
      playbook.laborProfiles
    ),
    ...findDuplicateIds(
      playbook.id,
      "commonMistakes",
      playbook.commonMistakes
    ),
    ...findDuplicateIds(
      playbook.id,
      "upsellOpportunities",
      playbook.upsellOpportunities
    ),
    ...findDuplicateIds(
      playbook.id,
      "standardsReferences",
      playbook.standardsReferences
    ),
  ];
}

export function validateEstimatorPlaybooks(): PlaybookValidationIssue[] {
  const playbooks = getAllEstimatorPlaybooks();
  const issues: PlaybookValidationIssue[] = [];

  issues.push(
    ...findDuplicateIds(
      "registry",
      "playbooks",
      playbooks
    )
  );

  for (const playbook of playbooks) {
    issues.push(...validatePlaybook(playbook));
  }

  return issues;
}

export function assertEstimatorPlaybooksValid(): void {
  const issues = validateEstimatorPlaybooks();

  if (issues.length === 0) {
    return;
  }

  const message = issues
    .map(
      (issue) =>
        `[${issue.playbookId}] ${issue.path}: ${issue.message}`
    )
    .join("\n");

  throw new Error(
    `Estimator playbook validation failed:\n${message}`
  );
}
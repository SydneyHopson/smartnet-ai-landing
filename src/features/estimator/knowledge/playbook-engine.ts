import type { ProjectEstimate } from "../domain/project-estimate";

import type {
  EstimatorPlaybook,
  PlaybookQuestion,
} from "./playbook";

import {
  getNextPlaybookQuestion,
  resolveEstimatorPlaybook,
} from "./playbook-resolver";

export function getAvailableQuestions(
  project: ProjectEstimate,
  playbook: EstimatorPlaybook
): PlaybookQuestion[] {
  return resolveEstimatorPlaybook(
    project,
    playbook
  ).questions;
}

export function getNextQuestion(
  project: ProjectEstimate,
  playbook: EstimatorPlaybook
): PlaybookQuestion | null {
  return getNextPlaybookQuestion(
    project,
    playbook
  );
}
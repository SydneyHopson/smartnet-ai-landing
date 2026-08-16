import type { ProjectEstimate } from "../domain/project-estimate";

import {
  getCombinedEstimatorQuestions,
  type CombinedEstimatorQuestion,
} from "./combined-question-planner";

export function getCurrentEstimatorQuestion(
  project: ProjectEstimate,
  currentQuestionKey: string | null
): CombinedEstimatorQuestion | null {
  const questions =
    getCombinedEstimatorQuestions(project);

  if (!currentQuestionKey) {
    return questions[0] ?? null;
  }

  return (
    questions.find(
      (question) =>
        question.projectField ===
        currentQuestionKey
    ) ??
    questions[0] ??
    null
  );
}
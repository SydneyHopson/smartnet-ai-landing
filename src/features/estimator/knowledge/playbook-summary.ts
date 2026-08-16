import type { EstimatorPlaybook } from "./playbook";
import { getAllEstimatorPlaybooks } from "./playbook-registry";

export type EstimatorPlaybookSummary = {
  id: string;
  name: string;
  version: string;
  projectTypes: string[];
  active: boolean;
  questionCount: number;
  assumptionCount: number;
  riskCount: number;
  recommendationCount: number;
  walkthroughChecklistCount: number;
  requiredPhotoCount: number;
  requiredMeasurementCount: number;
  commonMaterialCount: number;
  laborProfileCount: number;
  commonMistakeCount: number;
  upsellOpportunityCount: number;
  standardsReferenceCount: number;
  totalKnowledgeItems: number;
};

export function summarizeEstimatorPlaybook(
  playbook: EstimatorPlaybook
): EstimatorPlaybookSummary {
  const totalKnowledgeItems =
    playbook.questions.length +
    playbook.assumptions.length +
    playbook.risks.length +
    playbook.recommendations.length +
    playbook.walkthroughChecklist.length +
    playbook.requiredPhotos.length +
    playbook.requiredMeasurements.length +
    playbook.commonMaterials.length +
    playbook.laborProfiles.length +
    playbook.commonMistakes.length +
    playbook.upsellOpportunities.length +
    playbook.standardsReferences.length;

  return {
    id: playbook.id,
    name: playbook.name,
    version: playbook.version,
    projectTypes: [...playbook.projectTypes],
    active: playbook.metadata.active,
    questionCount: playbook.questions.length,
    assumptionCount: playbook.assumptions.length,
    riskCount: playbook.risks.length,
    recommendationCount: playbook.recommendations.length,
    walkthroughChecklistCount:
      playbook.walkthroughChecklist.length,
    requiredPhotoCount:
      playbook.requiredPhotos.length,
    requiredMeasurementCount:
      playbook.requiredMeasurements.length,
    commonMaterialCount:
      playbook.commonMaterials.length,
    laborProfileCount:
      playbook.laborProfiles.length,
    commonMistakeCount:
      playbook.commonMistakes.length,
    upsellOpportunityCount:
      playbook.upsellOpportunities.length,
    standardsReferenceCount:
      playbook.standardsReferences.length,
    totalKnowledgeItems,
  };
}

export function getEstimatorPlaybookSummaries(): EstimatorPlaybookSummary[] {
  return getAllEstimatorPlaybooks().map(
    summarizeEstimatorPlaybook
  );
}
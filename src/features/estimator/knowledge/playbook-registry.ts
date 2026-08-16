import type { ProjectEstimate } from "../domain/project-estimate";

import { datacenterPlaybook } from "./datacenter";
import { educationPlaybook } from "./education";
import { hospitalityPlaybook } from "./hospitality";
import { industrialPlaybook } from "./industrial";
import { medicalPlaybook } from "./medical";
import { multiLocationPlaybook } from "./multi-location";
import { officePlaybook } from "./office";
import type { EstimatorPlaybook } from "./playbook";
import { religiousPlaybook } from "./religious";
import { residentialPlaybook } from "./residential";
import { restaurantPlaybook } from "./restaurant";
import { retailPlaybook } from "./retail";
import { warehousePlaybook } from "./warehouse";

const playbooks: EstimatorPlaybook[] = [
  residentialPlaybook,
  officePlaybook,
  retailPlaybook,
  restaurantPlaybook,
  warehousePlaybook,
  industrialPlaybook,
  medicalPlaybook,
  educationPlaybook,
  hospitalityPlaybook,
  religiousPlaybook,
  datacenterPlaybook,
  multiLocationPlaybook,
];

export function getAllEstimatorPlaybooks(): EstimatorPlaybook[] {
  return playbooks.filter(
    (playbook) => playbook.metadata.active
  );
}

export function getEstimatorPlaybookById(
  playbookId: string
): EstimatorPlaybook | null {
  return (
    getAllEstimatorPlaybooks().find(
      (playbook) => playbook.id === playbookId
    ) ?? null
  );
}

export function getEstimatorPlaybooksForProject(
  project: ProjectEstimate
): EstimatorPlaybook[] {
  const projectType =
    project.property.projectType;

  if (!projectType) {
    return [];
  }

  return getAllEstimatorPlaybooks().filter(
    (playbook) =>
      playbook.projectTypes.includes(projectType)
  );
}

export function selectApplicableEstimatorPlaybooks(
  project: ProjectEstimate
): EstimatorPlaybook[] {
  const matchingPlaybooks =
    getEstimatorPlaybooksForProject(project);

  if (matchingPlaybooks.length === 0) {
    return [];
  }

  const customProjectType =
    project.property.customProjectType
      ?.trim()
      .toLowerCase();

  if (!customProjectType) {
    return matchingPlaybooks;
  }

  return [...matchingPlaybooks].sort((a, b) => {
    const aMatches =
      a.environmentTags.some((tag) => {
        const normalizedTag =
          tag.trim().toLowerCase();

        return (
          customProjectType.includes(
            normalizedTag
          ) ||
          normalizedTag.includes(
            customProjectType
          )
        );
      });

    const bMatches =
      b.environmentTags.some((tag) => {
        const normalizedTag =
          tag.trim().toLowerCase();

        return (
          customProjectType.includes(
            normalizedTag
          ) ||
          normalizedTag.includes(
            customProjectType
          )
        );
      });

    if (aMatches === bMatches) {
      return 0;
    }

    return aMatches ? -1 : 1;
  });
}

export function selectPrimaryEstimatorPlaybook(
  project: ProjectEstimate
): EstimatorPlaybook | null {
  return (
    selectApplicableEstimatorPlaybooks(project)[0] ??
    null
  );
}
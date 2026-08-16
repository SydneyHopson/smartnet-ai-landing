import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "./project-estimate";

import type { ProjectEstimatePatch } from "../conversation/ai-response";

function mergeArrayUnique(
  existing: string[],
  incoming: string[] | undefined
): string[] {
  if (!incoming) {
    return existing;
  }

  return Array.from(
    new Set(
      [...existing, ...incoming]
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function removeUndefinedValues<T>(
  value: T
): T {
  if (Array.isArray(value)) {
    return value.map(
      (item) =>
        removeUndefinedValues(item)
    ) as T;
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const cleanedEntries =
      Object.entries(value).flatMap(
        ([key, itemValue]) => {
          if (
            typeof itemValue ===
            "undefined"
          ) {
            return [];
          }

          return [
            [
              key,
              removeUndefinedValues(
                itemValue
              ),
            ],
          ];
        }
      );

    return Object.fromEntries(
      cleanedEntries
    ) as T;
  }

  return value;
}

export function mergeProjectEstimatePatch(
  current: ProjectEstimate,
  patch: ProjectEstimatePatch
): ProjectEstimate {
  const safePatch =
    removeUndefinedValues(patch);

  const merged: ProjectEstimate = {
    ...current,
    ...safePatch,

    customerIntent: {
      ...current.customerIntent,
      ...safePatch.customerIntent,

      goals: mergeArrayUnique(
        current.customerIntent.goals,
        safePatch.customerIntent?.goals
      ),

      problems: mergeArrayUnique(
        current.customerIntent.problems,
        safePatch.customerIntent?.problems
      ),
    },

    property: {
      ...current.property,
      ...safePatch.property,

      squareFootage: {
        ...current.property.squareFootage,
        ...safePatch.property
          ?.squareFootage,
      },

      numberOfFloors: {
        ...current.property.numberOfFloors,
        ...safePatch.property
          ?.numberOfFloors,
      },

      ceilingHeightFeet: {
        ...current.property
          .ceilingHeightFeet,
        ...safePatch.property
          ?.ceilingHeightFeet,
      },

      specialEnvironment:
        mergeArrayUnique(
          current.property
            .specialEnvironment,
          safePatch.property
            ?.specialEnvironment
        ),
    },

    cameras: {
      ...current.cameras,
      ...safePatch.cameras,

      interiorCount: {
        ...current.cameras.interiorCount,
        ...safePatch.cameras
          ?.interiorCount,
      },

      exteriorCount: {
        ...current.cameras.exteriorCount,
        ...safePatch.cameras
          ?.exteriorCount,
      },

      specialtyCount: {
        ...current.cameras.specialtyCount,
        ...safePatch.cameras
          ?.specialtyCount,
      },

      recordingDays: {
        ...current.cameras.recordingDays,
        ...safePatch.cameras
          ?.recordingDays,
      },

      coverageGoals: mergeArrayUnique(
        current.cameras.coverageGoals,
        safePatch.cameras
          ?.coverageGoals
      ),

      mountingSurfaces:
        mergeArrayUnique(
          current.cameras
            .mountingSurfaces,
          safePatch.cameras
            ?.mountingSurfaces
        ),
    },

    network: {
      ...current.network,
      ...safePatch.network,

      currentDownloadMbps: {
        ...current.network
          .currentDownloadMbps,
        ...safePatch.network
          ?.currentDownloadMbps,
      },

      currentUploadMbps: {
        ...current.network
          .currentUploadMbps,
        ...safePatch.network
          ?.currentUploadMbps,
      },
    },

    wifi: {
      ...current.wifi,
      ...safePatch.wifi,

      estimatedAccessPointCount: {
        ...current.wifi
          .estimatedAccessPointCount,
        ...safePatch.wifi
          ?.estimatedAccessPointCount,
      },

      estimatedConcurrentUsers: {
        ...current.wifi
          .estimatedConcurrentUsers,
        ...safePatch.wifi
          ?.estimatedConcurrentUsers,
      },

      coverageGoals: mergeArrayUnique(
        current.wifi.coverageGoals,
        safePatch.wifi?.coverageGoals
      ),

      weakAreas: mergeArrayUnique(
        current.wifi.weakAreas,
        safePatch.wifi?.weakAreas
      ),
    },

    accessControl: {
      ...current.accessControl,
      ...safePatch.accessControl,

      controlledDoorCount: {
        ...current.accessControl
          .controlledDoorCount,
        ...safePatch.accessControl
          ?.controlledDoorCount,
      },

      exteriorDoorCount: {
        ...current.accessControl
          .exteriorDoorCount,
        ...safePatch.accessControl
          ?.exteriorDoorCount,
      },

      interiorDoorCount: {
        ...current.accessControl
          .interiorDoorCount,
        ...safePatch.accessControl
          ?.interiorDoorCount,
      },

      credentialTypes:
        mergeArrayUnique(
          current.accessControl
            .credentialTypes,
          safePatch.accessControl
            ?.credentialTypes
        ),
    },

    cabling: {
      ...current.cabling,
      ...safePatch.cabling,

      estimatedCableFeet: {
        ...current.cabling
          .estimatedCableFeet,
        ...safePatch.cabling
          ?.estimatedCableFeet,
      },

      pathwayType: mergeArrayUnique(
        current.cabling.pathwayType,
        safePatch.cabling?.pathwayType
      ),
    },

    installation: {
      ...current.installation,
      ...safePatch.installation,

      travelMiles: {
        ...current.installation
          .travelMiles,
        ...safePatch.installation
          ?.travelMiles,
      },

      estimatedCrewSize: {
        ...current.installation
          .estimatedCrewSize,
        ...safePatch.installation
          ?.estimatedCrewSize,
      },

      estimatedLaborHours: {
        ...current.installation
          .estimatedLaborHours,
        ...safePatch.installation
          ?.estimatedLaborHours,
      },

      estimatedDurationDays: {
        ...current.installation
          .estimatedDurationDays,
        ...safePatch.installation
          ?.estimatedDurationDays,
      },
    },

    equipment: {
      ...current.equipment,
      ...safePatch.equipment,

      recommendedItems:
        safePatch.equipment
          ?.recommendedItems ??
        current.equipment
          .recommendedItems,
    },

    pricing: {
      ...current.pricing,
      ...safePatch.pricing,
    },

    assessment: {
      ...current.assessment,
      ...safePatch.assessment,

      assumptions: mergeArrayUnique(
        current.assessment.assumptions,
        safePatch.assessment
          ?.assumptions
      ),

      exclusions: mergeArrayUnique(
        current.assessment.exclusions,
        safePatch.assessment
          ?.exclusions
      ),

      risks: mergeArrayUnique(
        current.assessment.risks,
        safePatch.assessment?.risks
      ),

      unansweredQuestions:
        safePatch.assessment
          ?.unansweredQuestions ??
        current.assessment
          .unansweredQuestions,
    },

    metadata: {
      ...current.metadata,
      ...safePatch.metadata,

      updatedAt:
        new Date().toISOString(),
    },
  };

  return projectEstimateSchema.parse(
    merged
  );
}
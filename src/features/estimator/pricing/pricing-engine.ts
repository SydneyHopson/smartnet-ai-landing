import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

import {
  pricingCatalog,
  type CatalogItem,
} from "./pricing-catalog";

type RecommendedItem =
  ProjectEstimate["equipment"]["recommendedItems"][number];

type PricingAccumulator = {
  materialCost: number;
  laborHours: number;
  recommendedItems: RecommendedItem[];
};

export function calculateEstimate(
  project: ProjectEstimate
): ProjectEstimate {
  const calculatedProject =
    projectEstimateSchema.parse(
      structuredClone(project)
    );

  const accumulator: PricingAccumulator = {
    materialCost: 0,
    laborHours: 0,
    recommendedItems: [],
  };

  addCameraScope(
    calculatedProject,
    accumulator
  );

  addWifiScope(
    calculatedProject,
    accumulator
  );

  addAccessControlScope(
    calculatedProject,
    accumulator
  );

  addCablingScope(
    calculatedProject,
    accumulator
  );

  addRackScope(
    calculatedProject,
    accumulator
  );

  const laborRate =
    getCatalogItem("labor").unitCost;

  const laborCost =
    accumulator.laborHours *
    laborRate;

  const equipmentRentalCost =
    calculateEquipmentRentalCost(
      calculatedProject
    );

  const travelCost =
    calculateTravelCost(
      calculatedProject
    );

  const permitCost =
    calculatedProject.installation
      .permitsRequired
      ? 250
      : 0;

  const otherCost = 0;

  const directCost =
    accumulator.materialCost +
    laborCost +
    equipmentRentalCost +
    travelCost +
    permitCost +
    otherCost;

  const overheadAmount =
    directCost * 0.15;

  const costWithOverhead =
    directCost +
    overheadAmount;

  const targetMarginPercent = 25;

  const targetMarginDecimal =
    targetMarginPercent / 100;

  const targetSellPrice =
    targetMarginDecimal >= 1
      ? costWithOverhead
      : costWithOverhead /
        (1 - targetMarginDecimal);

  const markupAmount =
    targetSellPrice -
    costWithOverhead;

  calculatedProject.equipment.recommendedItems =
    accumulator.recommendedItems;

  calculatedProject.pricing = {
    ...calculatedProject.pricing,

    status: "preliminary",

    materialCost:
      roundCurrency(
        accumulator.materialCost
      ),

    laborCost:
      roundCurrency(laborCost),

    equipmentRentalCost:
      roundCurrency(
        equipmentRentalCost
      ),

    travelCost:
      roundCurrency(travelCost),

    permitCost:
      roundCurrency(permitCost),

    otherCost:
      roundCurrency(otherCost),

    directCost:
      roundCurrency(directCost),

    overheadAmount:
      roundCurrency(
        overheadAmount
      ),

    markupAmount:
      roundCurrency(markupAmount),

    estimatedLow:
      roundCurrency(
        targetSellPrice * 0.9
      ),

    estimatedHigh:
      roundCurrency(
        targetSellPrice * 1.1
      ),

    targetMarginPercent,

    catalogVersion:
      "smartnet-catalog-1.0.0",
  };

  calculatedProject.installation
    .estimatedLaborHours = {
    value:
      roundQuantity(
        accumulator.laborHours
      ),

    confidence:
      "ai_inferred",
  };

  calculatedProject.status =
    "ready_for_pricing";

  return projectEstimateSchema.parse(
    calculatedProject
  );
}

function addCameraScope(
  project: ProjectEstimate,
  accumulator: PricingAccumulator
): void {
  if (!project.cameras.requested) {
    return;
  }

  const interiorCount =
    project.cameras.interiorCount
      .value ?? 0;

  const exteriorCount =
    project.cameras.exteriorCount
      .value ?? 0;

  const specialtyCount =
    project.cameras.specialtyCount
      .value ?? 0;

  const standardCameraCount =
    interiorCount +
    exteriorCount;

  addCatalogItem(
    accumulator,
    "camera-standard",
    standardCameraCount,
    "Camera quantity provided during project discovery."
  );

  addCatalogItem(
    accumulator,
    "camera-standard",
    specialtyCount,
    "Specialty camera allowance pending final model selection."
  );

  const totalCameraCount =
    standardCameraCount +
    specialtyCount;

  if (totalCameraCount <= 0) {
    return;
  }

  addCatalogItem(
    accumulator,
    "nvr-small",
    1,
    "Recorder required for the proposed camera system."
  );

  const switchCount =
    Math.max(
      1,
      Math.ceil(
        totalCameraCount / 40
      )
    );

  addCatalogItem(
    accumulator,
    totalCameraCount > 20
      ? "switch-48"
      : "switch-24",
    switchCount,
    "PoE switching required for cameras and connected devices."
  );

  addCatalogItem(
    accumulator,
    "ups",
    1,
    "Battery backup recommended for recording and network equipment."
  );
}

function addWifiScope(
  project: ProjectEstimate,
  accumulator: PricingAccumulator
): void {
  if (!project.wifi.requested) {
    return;
  }

  const explicitAccessPointCount =
    project.wifi
      .estimatedAccessPointCount
      .value;

  const concurrentUsers =
    project.wifi
      .estimatedConcurrentUsers
      .value ?? 0;

  const squareFootage =
    project.property.squareFootage
      .value ?? 0;

  const calculatedAccessPointCount =
    explicitAccessPointCount ??
    Math.max(
      1,
      Math.ceil(
        Math.max(
          concurrentUsers / 35,
          squareFootage / 3500
        )
      )
    );

  addCatalogItem(
    accumulator,
    "wifi-ap",
    calculatedAccessPointCount,
    explicitAccessPointCount !== null
      ? "Access-point quantity provided during project discovery."
      : "Preliminary access-point quantity based on square footage and concurrent-device demand."
  );

  project.wifi
    .estimatedAccessPointCount = {
    value:
      calculatedAccessPointCount,

    confidence:
      explicitAccessPointCount !== null
        ? project.wifi
            .estimatedAccessPointCount
            .confidence
        : "ai_inferred",
  };
}

function addAccessControlScope(
  project: ProjectEstimate,
  accumulator: PricingAccumulator
): void {
  if (
    !project.accessControl.requested
  ) {
    return;
  }

  const controlledDoorCount =
    project.accessControl
      .controlledDoorCount
      .value ?? 0;

  addCatalogItem(
    accumulator,
    "door-reader",
    controlledDoorCount,
    "One credential reader is provisioned for each controlled opening."
  );

  addCatalogItem(
    accumulator,
    "door-controller",
    controlledDoorCount,
    "Preliminary allowance of one door-control interface per controlled opening."
  );
}

function addCablingScope(
  project: ProjectEstimate,
  accumulator: PricingAccumulator
): void {
  const explicitCableFeet =
    project.cabling
      .estimatedCableFeet.value;

  const cameraCount =
    (project.cameras.interiorCount
      .value ?? 0) +
    (project.cameras.exteriorCount
      .value ?? 0) +
    (project.cameras.specialtyCount
      .value ?? 0);

  const accessPointCount =
    project.wifi
      .estimatedAccessPointCount
      .value ?? 0;

  const doorCount =
    project.accessControl
      .controlledDoorCount
      .value ?? 0;

  const estimatedDeviceRuns =
    cameraCount +
    accessPointCount +
    doorCount;

  const inferredCableFeet =
    estimatedDeviceRuns > 0
      ? estimatedDeviceRuns * 175
      : 0;

  const cableFeet =
    explicitCableFeet ??
    inferredCableFeet;

  addCatalogItem(
    accumulator,
    "cat6",
    cableFeet,
    explicitCableFeet !== null
      ? "Cable quantity provided during project discovery."
      : "Preliminary cable allowance based on device count and average commercial cable-run distance."
  );

  if (
    explicitCableFeet === null &&
    cableFeet > 0
  ) {
    project.cabling
      .estimatedCableFeet = {
      value: cableFeet,

      confidence:
        "ai_inferred",
    };
  }
}

function addRackScope(
  project: ProjectEstimate,
  accumulator: PricingAccumulator
): void {
  if (
    project.network.rackRequired ===
    true
  ) {
    addCatalogItem(
      accumulator,
      "rack",
      1,
      "Dedicated rack requested for network and security equipment."
    );
  }
}

function addCatalogItem(
  accumulator: PricingAccumulator,
  catalogId: string,
  quantity: number,
  reason: string
): void {
  if (
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    return;
  }

  const item =
    getCatalogItem(catalogId);

  const normalizedQuantity =
    item.unit === "foot"
      ? Math.ceil(quantity)
      : Math.ceil(quantity);

  accumulator.materialCost +=
    item.unitCost *
    normalizedQuantity;

  accumulator.laborHours +=
    item.laborHours *
    normalizedQuantity;

  accumulator.recommendedItems.push(
    createRecommendedItem(
      item,
      normalizedQuantity,
      reason
    )
  );
}

function createRecommendedItem(
  item: CatalogItem,
  quantity: number,
  reason: string
): RecommendedItem {
  return {
    category:
      item.category,

    description:
      item.name,

    quantity,

    manufacturer:
      item.manufacturer ?? null,

    model:
      item.model ?? null,

    reason,
  };
}

function getCatalogItem(
  catalogId: string
): CatalogItem {
  const item =
    pricingCatalog.find(
      (candidate) =>
        candidate.id === catalogId
    );

  if (!item) {
    throw new Error(
      `Pricing catalog item "${catalogId}" was not found.`
    );
  }

  return item;
}

function calculateEquipmentRentalCost(
  project: ProjectEstimate
): number {
  if (
    project.installation
      .liftRequired !== true
  ) {
    return 0;
  }

  const durationDays =
    project.installation
      .estimatedDurationDays.value ??
    1;

  return (
    Math.max(
      1,
      Math.ceil(durationDays)
    ) * 350
  );
}

function calculateTravelCost(
  project: ProjectEstimate
): number {
  const travelMiles =
    project.installation
      .travelMiles.value ?? 0;

  return travelMiles * 0.85;
}

function roundCurrency(
  value: number
): number {
  return (
    Math.round(
      (value +
        Number.EPSILON) *
        100
    ) / 100
  );
}

function roundQuantity(
  value: number
): number {
  return (
    Math.round(
      (value +
        Number.EPSILON) *
        10
    ) / 10
  );
}
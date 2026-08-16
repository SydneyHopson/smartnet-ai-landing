import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

export type PreliminaryQuoteLineItem = {
  category: string;

  description: string;

  quantity: number;

  manufacturer: string | null;

  model: string | null;

  reason: string;
};

export type PreliminaryQuote = {
  projectId: string | null;

  status: "preliminary";

  generatedAt: string;

  scopeSummary: string;

  projectType: string;

  systems: {
    cameras: boolean;

    network: boolean;

    wifi: boolean;

    accessControl: boolean;
  };

  quantities: {
    squareFootage: number | null;

    cameraCount: number;

    accessPointCount: number;

    controlledDoorCount: number;

    cableFeet: number | null;

    laborHours: number | null;
  };

  lineItems: PreliminaryQuoteLineItem[];

  pricing: {
    materialCost: number;

    laborCost: number;

    equipmentRentalCost: number;

    travelCost: number;

    permitCost: number;

    otherCost: number;

    directCost: number;

    overheadAmount: number;

    markupAmount: number;

    estimatedLow: number;

    estimatedHigh: number;

    targetMarginPercent: number;

    catalogVersion: string | null;
  };

  assumptions: string[];

  exclusions: string[];

  risks: string[];

  walkthroughRequired: boolean;

  disclaimer: string;
};

export function createPreliminaryQuote(
  input: ProjectEstimate
): PreliminaryQuote {
  const project =
    projectEstimateSchema.parse(
      structuredClone(input)
    );

  if (
    project.pricing.status !==
      "preliminary" &&
    project.pricing.status !==
      "verified"
  ) {
    throw new Error(
      "The project must be priced before a preliminary quote can be created."
    );
  }

  const cameraCount =
    (project.cameras.interiorCount
      .value ?? 0) +
    (project.cameras.exteriorCount
      .value ?? 0) +
    (project.cameras.specialtyCount
      .value ?? 0);

  const scopeSummary =
    project.assessment.scopeSummary.trim() ||
    createScopeSummary(project);

  return {
    projectId:
      project.id ?? null,

    status:
      "preliminary",

    generatedAt:
      new Date().toISOString(),

    scopeSummary,

    projectType:
      project.property.projectType ??
      project.property.customProjectType ??
      "unspecified",

    systems: {
      cameras:
        project.cameras.requested,

      network:
        project.network.requested,

      wifi:
        project.wifi.requested,

      accessControl:
        project.accessControl.requested,
    },

    quantities: {
      squareFootage:
        project.property
          .squareFootage.value,

      cameraCount,

      accessPointCount:
        project.wifi
          .estimatedAccessPointCount
          .value ?? 0,

      controlledDoorCount:
        project.accessControl
          .controlledDoorCount
          .value ?? 0,

      cableFeet:
        project.cabling
          .estimatedCableFeet.value,

      laborHours:
        project.installation
          .estimatedLaborHours.value,
    },

    lineItems:
      project.equipment.recommendedItems.map(
        (item) => ({
          category:
            item.category,

          description:
            item.description,

          quantity:
            item.quantity,

          manufacturer:
            item.manufacturer,

          model:
            item.model,

          reason:
            item.reason,
        })
      ),

    pricing: {
      materialCost:
        project.pricing.materialCost,

      laborCost:
        project.pricing.laborCost,

      equipmentRentalCost:
        project.pricing
          .equipmentRentalCost,

      travelCost:
        project.pricing.travelCost,

      permitCost:
        project.pricing.permitCost,

      otherCost:
        project.pricing.otherCost,

      directCost:
        project.pricing.directCost,

      overheadAmount:
        project.pricing
          .overheadAmount,

      markupAmount:
        project.pricing.markupAmount,

      estimatedLow:
        project.pricing.estimatedLow,

      estimatedHigh:
        project.pricing.estimatedHigh,

      targetMarginPercent:
        project.pricing
          .targetMarginPercent,

      catalogVersion:
        project.pricing.catalogVersion,
    },

    assumptions:
      createAssumptions(project),

    exclusions:
      createExclusions(project),

    risks:
      [...project.assessment.risks],

    walkthroughRequired:
      project.assessment
        .walkthroughRequired,

    disclaimer:
      "This is a preliminary SmartNET estimate based on customer-reported and inferred project information. Final equipment selection, labor, materials, permits, site conditions, and pricing require walkthrough verification and owner approval.",
  };
}

function createScopeSummary(
  project: ProjectEstimate
): string {
  const systems: string[] = [];

  if (project.cameras.requested) {
    systems.push(
      "video surveillance"
    );
  }

  if (project.wifi.requested) {
    systems.push(
      "managed Wi-Fi"
    );
  }

  if (project.network.requested) {
    systems.push(
      "network infrastructure"
    );
  }

  if (
    project.accessControl.requested
  ) {
    systems.push(
      "electronic access control"
    );
  }

  const propertyType =
    project.property.projectType ??
    project.property.customProjectType ??
    "property";

  if (systems.length === 0) {
    return `Preliminary SmartNET low-voltage project for the ${propertyType}.`;
  }

  return `Preliminary SmartNET ${formatList(
    systems
  )} project for the ${propertyType}.`;
}

function createAssumptions(
  project: ProjectEstimate
): string[] {
  const assumptions = new Set(
    project.assessment.assumptions
  );

  if (
    project.cabling
      .estimatedCableFeet.confidence ===
    "ai_inferred"
  ) {
    assumptions.add(
      "Cable footage is a preliminary allowance based on device count and average cable-run distance."
    );
  }

  if (
    project.wifi
      .estimatedAccessPointCount
      .confidence === "ai_inferred"
  ) {
    assumptions.add(
      "Access-point quantity is preliminary and must be verified through wireless design or site validation."
    );
  }

  if (
    project.installation
      .estimatedLaborHours
      .confidence === "ai_inferred"
  ) {
    assumptions.add(
      "Labor hours are preliminary and depend on verified pathways, mounting conditions, access restrictions, and installation schedule."
    );
  }

  assumptions.add(
    "Existing electrical power, network capacity, pathways, and mounting surfaces are assumed usable unless otherwise noted."
  );

  return Array.from(assumptions);
}

function createExclusions(
  project: ProjectEstimate
): string[] {
  const exclusions = new Set(
    project.assessment.exclusions
  );

  exclusions.add(
    "Electrical work, structural modifications, painting, drywall repair, trenching, permits, fire-alarm integration, and specialty engineering are excluded unless explicitly included."
  );

  exclusions.add(
    "Final taxes, shipping, subscriptions, licensing, and manufacturer price changes are excluded until verified."
  );

  return Array.from(exclusions);
}

function formatList(
  values: string[]
): string {
  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values
    .slice(0, -1)
    .join(", ")}, and ${
    values[values.length - 1]
  }`;
}
import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

import {
  createEstimatorDesign,
  type EstimatorDesign,
} from "../design/design-engine";

import {
  generateEstimatorScope,
  type GeneratedEstimatorScope,
} from "../design/scope-generator";

import {
  createPreliminaryQuote,
  type PreliminaryQuote,
} from "../quote/preliminary-quote";

export type EstimatorProposalPackage = {
  proposalId: string;

  sessionId: string;

  version: string;

  status: "preliminary";

  generatedAt: string;

  title: string;

  subtitle: string;

  projectSummary: {
    projectType: string;

    customerIntent: string;

    squareFootage: number | null;

    numberOfFloors: number | null;

    constructionType: string;

    ceilingType: string;

    ceilingHeightFeet: number | null;
  };

  systems: {
    cameras: boolean;

    network: boolean;

    wifi: boolean;

    accessControl: boolean;
  };

  design: EstimatorDesign;

  scope: GeneratedEstimatorScope;

  quote: PreliminaryQuote;

  pricingSummary: {
    estimatedLow: number;

    estimatedHigh: number;

    materialCost: number;

    laborCost: number;

    equipmentRentalCost: number;

    travelCost: number;

    permitCost: number;

    targetMarginPercent: number;

    catalogVersion: string | null;
  };

  nextSteps: string[];

  disclaimer: string;
};

export type CreateEstimatorProposalPackageInput = {
  sessionId: string;

  project: ProjectEstimate;
};

export function createEstimatorProposalPackage({
  sessionId,
  project: inputProject,
}: CreateEstimatorProposalPackageInput): EstimatorProposalPackage {
  const project =
    projectEstimateSchema.parse(
      structuredClone(inputProject)
    );

  if (
    project.pricing.status !==
      "preliminary" &&
    project.pricing.status !==
      "verified"
  ) {
    throw new Error(
      "The project must be priced before a proposal package can be generated."
    );
  }

  const design =
    createEstimatorDesign(project);

  const scope =
    generateEstimatorScope(project);

  const quote =
    createPreliminaryQuote(project);

  const generatedAt =
    new Date().toISOString();

  return {
    proposalId:
      createProposalId(sessionId),

    sessionId,

    version:
      "1.0.0",

    status:
      "preliminary",

    generatedAt,

    title:
      createProposalTitle(project),

    subtitle:
      "Preliminary Low-Voltage Systems Proposal",

    projectSummary: {
      projectType:
        project.property.projectType ??
        project.property
          .customProjectType ??
        "unspecified",

      customerIntent:
        project.customerIntent.summary,

      squareFootage:
        project.property
          .squareFootage.value,

      numberOfFloors:
        project.property
          .numberOfFloors.value,

      constructionType:
        project.property
          .constructionType,

      ceilingType:
        project.property.ceilingType,

      ceilingHeightFeet:
        project.property
          .ceilingHeightFeet.value,
    },

    systems: {
      cameras:
        project.cameras.requested,

      network:
        project.network.requested,

      wifi:
        project.wifi.requested,

      accessControl:
        project.accessControl
          .requested,
    },

    design,

    scope,

    quote,

    pricingSummary: {
      estimatedLow:
        project.pricing.estimatedLow,

      estimatedHigh:
        project.pricing.estimatedHigh,

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

      targetMarginPercent:
        project.pricing
          .targetMarginPercent,

      catalogVersion:
        project.pricing.catalogVersion,
    },

    nextSteps:
      createNextSteps(project),

    disclaimer:
      "This proposal is preliminary and is based on customer-reported information, estimator assumptions, and inferred quantities. Final pricing, equipment selection, labor, pathways, permits, subscriptions, taxes, shipping, and installation conditions require walkthrough verification and SmartNET owner approval.",
  };
}

function createProposalId(
  sessionId: string
): string {
  return `proposal-${sessionId}`;
}

function createProposalTitle(
  project: ProjectEstimate
): string {
  const propertyType =
    project.property.projectType ??
    project.property.customProjectType ??
    "Project";

  const formattedPropertyType =
    propertyType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      );

  return `SmartNET ${formattedPropertyType} Technology Proposal`;
}

function createNextSteps(
  project: ProjectEstimate
): string[] {
  const steps: string[] = [];

  if (
    project.assessment
      .walkthroughRequired
  ) {
    steps.push(
      "Schedule a SmartNET site walkthrough to verify device locations, pathways, mounting surfaces, network infrastructure, power, door hardware, lift access, and work restrictions."
    );
  }

  steps.push(
    "Review the proposed system scope, manufacturer stack, preliminary equipment quantities, assumptions, exclusions, and estimated price range."
  );

  if (project.cameras.requested) {
    steps.push(
      "Approve representative camera coverage objectives, recording retention, remote-access requirements, and identification expectations."
    );
  }

  if (project.wifi.requested) {
    steps.push(
      "Confirm wireless coverage areas, expected device density, guest-network requirements, and validation expectations."
    );
  }

  if (
    project.accessControl.requested
  ) {
    steps.push(
      "Confirm controlled openings, credential types, locking hardware, egress requirements, schedules, and remote-management needs."
    );
  }

  steps.push(
    "Update the design and estimate after walkthrough verification, then issue the final SmartNET proposal for approval."
  );

  return steps;
}
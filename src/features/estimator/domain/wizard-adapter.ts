import type {
  SmartNetEstimate,
  ProjectType as WizardProjectType,
} from "@/components/smartNetWizard/SmartNetEstimateProvider";

import {
  createEmptyProjectEstimate,
  type ProjectEstimate,
} from "./project-estimate";

function mapProjectType(
  projectType: WizardProjectType
): ProjectEstimate["property"]["projectType"] {
  switch (projectType) {
    case "home":
      return "residential";

    case "office":
      return "office";

    case "retail":
      return "retail";

    case "industrial":
      return "industrial";

    default:
      return null;
  }
}

export function wizardEstimateToProjectEstimate(
  wizardEstimate: SmartNetEstimate
): ProjectEstimate {
  const project = createEmptyProjectEstimate();

  project.status = "collecting_scope";

  project.property.projectType = mapProjectType(
    wizardEstimate.projectType
  );

  project.property.squareFootage = {
    value:
      wizardEstimate.squareFootage > 0
        ? wizardEstimate.squareFootage
        : null,
    confidence:
      wizardEstimate.squareFootage > 0
        ? "customer_reported"
        : "unknown",
  };

  project.cameras.requested = wizardEstimate.focus.cameras;

  project.wifi.requested = wizardEstimate.focus.wifi;

  project.network.requested = wizardEstimate.focus.wifi;

  project.accessControl.requested =
    wizardEstimate.focus.accessControl;

  if (wizardEstimate.coveragePreset) {
    project.cameras.coverageGoals = [
      wizardEstimate.coveragePreset,
    ];
  }

  if (wizardEstimate.wifiLayoutPreset) {
    project.wifi.coverageGoals = [
      wizardEstimate.wifiLayoutPreset,
    ];
  }

  if (wizardEstimate.accessPreset === "none") {
    project.accessControl.requested = false;

    project.accessControl.controlledDoorCount = {
      value: 0,
      confidence: "customer_reported",
    };
  }

  if (wizardEstimate.accessPreset === "fewDoors") {
    project.accessControl.requested = true;

    project.accessControl.controlledDoorCount = {
      value: 4,
      confidence: "ai_inferred",
    };
  }

  if (wizardEstimate.accessPreset === "manyDoors") {
    project.accessControl.requested = true;

    project.accessControl.controlledDoorCount = {
      value: null,
      confidence: "unknown",
    };
  }

  if (wizardEstimate.wiringStyle === "exposed") {
    project.cabling.wiringStyle = "exposed";
  }

  if (wizardEstimate.wiringStyle === "hidden") {
    project.cabling.wiringStyle = "hidden";
  }

  if (wizardEstimate.wiringStyle === "mix") {
    project.cabling.wiringStyle = "mixed";
  }

  if (wizardEstimate.rackLocation) {
    project.network.rackLocation =
      wizardEstimate.rackLocation;

    project.network.rackRequired = true;
  }

  if (wizardEstimate.extras.miniRack) {
    project.network.rackRequired = true;
  }

  if (wizardEstimate.notes.trim()) {
    project.customerIntent.summary =
      wizardEstimate.notes.trim();
  }

  project.pricing.status =
    wizardEstimate.roughLow > 0 ||
    wizardEstimate.roughHigh > 0
      ? "preliminary"
      : "not_calculated";

  project.pricing.estimatedLow = Math.max(
    wizardEstimate.roughLow,
    0
  );

  project.pricing.estimatedHigh = Math.max(
    wizardEstimate.roughHigh,
    0
  );

  project.assessment.walkthroughRequired = true;

  project.assessment.assumptions = [
    "Project information was collected through the existing SmartNET wizard.",
    "Pricing remains a preliminary square-footage-based range.",
    "Device quantities, cable distances, labor hours, and field conditions have not yet been verified.",
  ];

  project.metadata.source = "wizard";

  return project;
}
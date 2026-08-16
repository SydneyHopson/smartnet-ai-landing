import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

import {
  createEstimatorDesign,
  type EstimatorDesign,
} from "./design-engine";

export type GeneratedEstimatorScope = {
  generatedAt: string;

  executiveSummary: string;

  scopeOfWork: string[];

  cameraScope: string[];

  networkScope: string[];

  wifiScope: string[];

  accessControlScope: string[];

  cablingScope: string[];

  installationScope: string[];

  testingAndCloseout: string[];

  assumptions: string[];

  exclusions: string[];

  risks: string[];

  acceptanceCriteria: string[];
};

export function generateEstimatorScope(
  input: ProjectEstimate
): GeneratedEstimatorScope {
  const project =
    projectEstimateSchema.parse(
      structuredClone(input)
    );

  const design =
    createEstimatorDesign(project);

  return {
    generatedAt:
      new Date().toISOString(),

    executiveSummary:
      createExecutiveSummary(
        project,
        design
      ),

    scopeOfWork:
      createGeneralScope(
        project,
        design
      ),

    cameraScope:
      createCameraScope(
        project,
        design
      ),

    networkScope:
      createNetworkScope(
        project,
        design
      ),

    wifiScope:
      createWifiScope(
        project,
        design
      ),

    accessControlScope:
      createAccessControlScope(
        project,
        design
      ),

    cablingScope:
      createCablingScope(
        project,
        design
      ),

    installationScope:
      createInstallationScope(
        project,
        design
      ),

    testingAndCloseout:
      createTestingAndCloseout(
        project
      ),

    assumptions:
      createAssumptions(
        project,
        design
      ),

    exclusions:
      createExclusions(project),

    risks:
      createRisks(
        project,
        design
      ),

    acceptanceCriteria:
      createAcceptanceCriteria(
        project
      ),
  };
}

function createExecutiveSummary(
  project: ProjectEstimate,
  design: EstimatorDesign
): string {
  const propertyType =
    project.property.projectType ??
    project.property.customProjectType ??
    "property";

  const squareFootage =
    project.property.squareFootage
      .value;

  const sizeDescription =
    squareFootage !== null
      ? ` approximately ${formatNumber(
          squareFootage
        )} square feet in size`
      : "";

  return `SmartNET proposes a preliminary ${design.manufacturerSelection.tier} low-voltage systems design for the ${propertyType}${sizeDescription}. The proposed work may include ${formatRequestedSystems(
    project
  )}. Final equipment selection, quantities, pathways, mounting conditions, labor requirements, and pricing remain subject to site verification and customer approval.`;
}

function createGeneralScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  const scope: string[] = [
    "Provide project coordination, system design, installation planning, configuration, testing, and closeout documentation for the approved SmartNET systems.",
    `Use the preliminary ${design.manufacturerSelection.tier} manufacturer stack selected for the current project requirements.`,
    "Coordinate final device locations, network requirements, equipment placement, access windows, and installation sequencing before field deployment.",
  ];

  if (
    project.property.occupiedDuringInstall ===
    true
  ) {
    scope.push(
      "Coordinate work around an occupied and operating facility using phased installation areas and customer-approved work zones."
    );
  }

  if (
    project.customerIntent.futureExpansion
  ) {
    scope.push(
      `Include reasonable provisions for future expansion: ${project.customerIntent.futureExpansion}.`
    );
  }

  return scope;
}

function createCameraScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  if (!project.cameras.requested) {
    return [];
  }

  const scope: string[] = [];

  if (
    design.cameraDesign.totalCameraCount >
    0
  ) {
    scope.push(
      `Provide and configure approximately ${design.cameraDesign.totalCameraCount} ${design.cameraDesign.manufacturer} IP cameras using the ${design.cameraDesign.platform} platform.`
    );
  } else {
    scope.push(
      `Provide a ${design.cameraDesign.manufacturer} video-surveillance system using the ${design.cameraDesign.platform} platform, with final camera quantity pending verification.`
    );
  }

  if (
    design.cameraDesign
      .interiorCameraCount > 0
  ) {
    scope.push(
      `Include ${design.cameraDesign.interiorCameraCount} interior camera locations.`
    );
  }

  if (
    design.cameraDesign
      .exteriorCameraCount > 0
  ) {
    scope.push(
      `Include ${design.cameraDesign.exteriorCameraCount} exterior weather-rated camera locations.`
    );
  }

  if (
    design.cameraDesign
      .specialtyCameraCount > 0
  ) {
    scope.push(
      `Include ${design.cameraDesign.specialtyCameraCount} specialty camera locations requiring final lens, analytics, or environmental selection.`
    );
  }

  if (
    design.cameraDesign.coverageGoals
      .length > 0
  ) {
    scope.push(
      `Design camera views for ${formatList(
        design.cameraDesign.coverageGoals
      )}.`
    );
  }

  if (
    design.cameraDesign.recordingDays !==
    null
  ) {
    scope.push(
      `Size recording storage for approximately ${design.cameraDesign.recordingDays} days of retention, subject to final resolution, frame rate, compression, and recording-profile validation.`
    );
  }

  if (
    design.cameraDesign
      .remoteViewingRequired === true
  ) {
    scope.push(
      "Configure secure remote viewing for authorized users on supported computers and mobile devices."
    );
  }

  scope.push(
    "Configure camera names, recording profiles, user permissions, time settings, system health monitoring, and initial acceptance views."
  );

  return scope;
}

function createNetworkScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  if (!project.network.requested) {
    return [];
  }

  const scope: string[] = [
    `Provide or configure managed ${design.networkDesign.manufacturer} network infrastructure using the ${design.networkDesign.platform} platform.`,
  ];

  if (
    design.networkDesign
      .estimatedSwitchPorts > 0
  ) {
    scope.push(
      `Provide preliminary switching capacity for at least ${design.networkDesign.estimatedSwitchPorts} active and spare device ports.`
    );
  }

  if (
    design.networkDesign.rackRequired ===
    true
  ) {
    scope.push(
      "Provide a dedicated network rack or cabinet with patching, cable management, grounding coordination, power distribution, and equipment organization."
    );
  }

  if (
    design.networkDesign.rackLocation
  ) {
    scope.push(
      `Use the identified network-equipment location: ${design.networkDesign.rackLocation}.`
    );
  }

  if (
    design.networkDesign.vlanRequired ===
    true
  ) {
    scope.push(
      "Configure VLAN segmentation for applicable cameras, wireless networks, access-control devices, management traffic, and customer systems."
    );
  }

  scope.push(
    "Verify available PoE capacity, uplink capacity, internet handoff, addressing, firewall requirements, and compatibility with any retained customer equipment."
  );

  return scope;
}

function createWifiScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  if (!project.wifi.requested) {
    return [];
  }

  const scope: string[] = [
    `Provide a managed ${design.wifiDesign.manufacturer} wireless system using the ${design.wifiDesign.platform} platform.`,
  ];

  if (
    design.wifiDesign
      .estimatedAccessPointCount > 0
  ) {
    scope.push(
      `Provide approximately ${design.wifiDesign.estimatedAccessPointCount} wireless access points, subject to predictive design and site verification.`
    );
  }

  if (
    design.wifiDesign
      .estimatedConcurrentUsers !== null
  ) {
    scope.push(
      `Design preliminary wireless capacity for approximately ${design.wifiDesign.estimatedConcurrentUsers} concurrent users and connected devices.`
    );
  }

  if (
    design.wifiDesign.coverageGoals
      .length > 0
  ) {
    scope.push(
      `Provide wireless coverage for ${formatList(
        design.wifiDesign.coverageGoals
      )}.`
    );
  }

  if (
    design.wifiDesign
      .indoorCoverage === true
  ) {
    scope.push(
      "Include indoor wireless coverage."
    );
  }

  if (
    design.wifiDesign
      .outdoorCoverage === true
  ) {
    scope.push(
      "Include outdoor wireless coverage using suitable weather-rated equipment."
    );
  }

  if (
    design.wifiDesign
      .guestNetworkRequired === true
  ) {
    scope.push(
      "Configure a logically separated guest wireless network with customer-approved access controls."
    );
  }

  scope.push(
    "Configure SSIDs, security settings, management access, channel planning, transmit power, roaming parameters, and post-installation wireless validation."
  );

  return scope;
}

function createAccessControlScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  if (
    !project.accessControl.requested
  ) {
    return [];
  }

  const scope: string[] = [
    `Provide a ${design.accessControlDesign.manufacturer} electronic access-control system using the ${design.accessControlDesign.platform} platform.`,
  ];

  if (
    design.accessControlDesign
      .controlledDoorCount > 0
  ) {
    scope.push(
      `Equip approximately ${design.accessControlDesign.controlledDoorCount} controlled openings with customer-approved readers, controllers, locking hardware interfaces, request-to-exit devices, and door-status monitoring as required.`
    );
  }

  if (
    design.accessControlDesign
      .credentialTypes.length > 0
  ) {
    scope.push(
      `Configure support for ${formatList(
        design.accessControlDesign
          .credentialTypes
      )} credentials.`
    );
  }

  if (
    design.accessControlDesign
      .remoteManagementRequired === true
  ) {
    scope.push(
      "Configure secure remote administration for authorized access-control administrators."
    );
  }

  scope.push(
    "Coordinate final lock type, egress requirements, fire-alarm interfaces, power supplies, door hardware compatibility, credential enrollment, schedules, permissions, and testing."
  );

  return scope;
}

function createCablingScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  const scope: string[] = [];

  const cableType =
    design.cablingDesign
      .preferredCableType === "unknown"
      ? "commercial low-voltage cable"
      : design.cablingDesign
          .preferredCableType;

  if (
    design.cablingDesign
      .estimatedCableFeet !== null
  ) {
    scope.push(
      `Provide an estimated ${formatNumber(
        design.cablingDesign
          .estimatedCableFeet
      )} feet of ${cableType}, subject to final pathway measurements.`
    );
  } else {
    scope.push(
      `Provide ${cableType} for approved cameras, access points, controlled openings, network equipment, and related devices.`
    );
  }

  if (
    design.cablingDesign
      .pathwayTypes.length > 0
  ) {
    scope.push(
      `Route cabling through available ${formatList(
        design.cablingDesign
          .pathwayTypes
      )} pathways.`
    );
  }

  if (
    design.cablingDesign.wiringStyle !==
    "unknown"
  ) {
    scope.push(
      `Use a ${design.cablingDesign.wiringStyle} wiring approach where practical and approved.`
    );
  }

  if (
    design.cablingDesign
      .trenchingRequired === true
  ) {
    scope.push(
      "Include underground or interbuilding pathway coordination, with final trenching, conduit, fiber, surge protection, restoration, and permitting requirements subject to verification."
    );
  }

  if (
    design.cablingDesign
      .fireStoppingRequired === true
  ) {
    scope.push(
      "Provide approved firestop systems at applicable rated penetrations."
    );
  }

  scope.push(
    "Terminate, label, dress, support, test, and document new cabling in accordance with applicable manufacturer requirements and commercial installation practices."
  );

  return scope;
}

function createInstallationScope(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  const scope: string[] = [
    "Provide qualified field labor, supervision, tools, consumables, device mounting, cable installation, configuration, testing, cleanup, and closeout support.",
  ];

  if (
    design.installationDesign
      .liftRequired === true
  ) {
    scope.push(
      `Provide suitable lift access${
        design.installationDesign.liftType
          ? ` using ${design.installationDesign.liftType}`
          : ""
      } for elevated installation areas.`
    );
  }

  if (
    design.installationDesign
      .afterHoursRequired === true
  ) {
    scope.push(
      "Perform designated work during customer-approved after-hours or restricted installation windows."
    );
  }

  if (
    design.installationDesign
      .permitsRequired === true
  ) {
    scope.push(
      "Coordinate applicable permit and inspection requirements."
    );
  }

  if (
    design.installationDesign
      .estimatedLaborHours !== null
  ) {
    scope.push(
      `Carry a preliminary labor allowance of approximately ${design.installationDesign.estimatedLaborHours} field hours.`
    );
  }

  return scope;
}

function createTestingAndCloseout(
  project: ProjectEstimate
): string[] {
  const items: string[] = [
    "Test and document newly installed copper or fiber cabling as applicable.",
    "Verify device connectivity, naming, addressing, firmware status, power delivery, time synchronization, and management access.",
    "Provide final device schedules, cable labels, configuration records, and available as-built information.",
    "Provide basic customer orientation for approved system administration and daily operation.",
  ];

  if (project.cameras.requested) {
    items.push(
      "Verify camera views, focus, recording, playback, retention settings, remote access, user permissions, and system health."
    );
  }

  if (project.wifi.requested) {
    items.push(
      "Validate wireless connectivity, SSID operation, authentication, roaming, and representative coverage areas."
    );
  }

  if (
    project.accessControl.requested
  ) {
    items.push(
      "Test credential access, schedules, reader operation, door monitoring, request-to-exit functions, and approved lock-release behavior."
    );
  }

  return items;
}

function createAssumptions(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  const assumptions = new Set(
    project.assessment.assumptions
  );

  assumptions.add(
    "Customer will provide timely access to installation areas, network information, decision-makers, and existing system documentation."
  );

  assumptions.add(
    "Existing electrical circuits, internet service, network capacity, pathways, racks, and mounting surfaces are assumed suitable unless verification shows otherwise."
  );

  if (
    project.cabling
      .estimatedCableFeet.confidence ===
    "ai_inferred"
  ) {
    assumptions.add(
      "Cable footage is an inferred preliminary allowance and will be adjusted after pathway measurements."
    );
  }

  if (
    project.wifi
      .estimatedAccessPointCount
      .confidence === "ai_inferred"
  ) {
    assumptions.add(
      "Wireless access-point quantity is preliminary and requires predictive design or field validation."
    );
  }

  for (const note of [
    ...design.cameraDesign.notes,
    ...design.networkDesign.notes,
    ...design.wifiDesign.notes,
    ...design.accessControlDesign.notes,
    ...design.cablingDesign.notes,
    ...design.installationDesign.notes,
  ]) {
    assumptions.add(note);
  }

  return Array.from(assumptions);
}

function createExclusions(
  project: ProjectEstimate
): string[] {
  const exclusions = new Set(
    project.assessment.exclusions
  );

  exclusions.add(
    "Electrical branch circuits, receptacles, panels, generators, and permanent power modifications are excluded unless specifically listed."
  );

  exclusions.add(
    "Structural engineering, hazardous-material remediation, roofing work, drywall repair, painting, landscaping, concrete restoration, and finish repair are excluded unless specifically listed."
  );

  exclusions.add(
    "Permit fees, taxes, shipping, subscriptions, cloud licensing, internet service, and manufacturer price changes are excluded until verified."
  );

  exclusions.add(
    "Fire-alarm programming, elevator integration, gate fabrication, locksmith work, and specialty door modifications are excluded unless specifically included."
  );

  return Array.from(exclusions);
}

function createRisks(
  project: ProjectEstimate,
  design: EstimatorDesign
): string[] {
  const risks = new Set(
    project.assessment.risks
  );

  if (
    project.property
      .ceilingHeightFeet.value !==
      null &&
    project.property
      .ceilingHeightFeet.value >= 18
  ) {
    risks.add(
      "High installation elevations may increase lift requirements, labor time, safety controls, and camera-design complexity."
    );
  }

  if (
    project.cabling.pathwayType
      .length === 0
  ) {
    risks.add(
      "Unverified cable pathways may materially affect labor, cable footage, conduit requirements, and schedule."
    );
  }

  if (
    project.network.existingSwitches ===
      null ||
    project.network.existingRack ===
      null
  ) {
    risks.add(
      "Unverified existing network infrastructure may require additional switching, rack equipment, power, or remediation."
    );
  }

  if (
    project.wifi.requested &&
    design.wifiDesign.coverageGoals
      .length === 0
  ) {
    risks.add(
      "Undefined wireless coverage objectives may cause access-point quantity or placement changes."
    );
  }

  if (
    project.accessControl.requested &&
    project.accessControl
      .existingSystem === null
  ) {
    risks.add(
      "Existing door hardware and security-system conditions remain unknown and may affect compatibility and labor."
    );
  }

  return Array.from(risks);
}

function createAcceptanceCriteria(
  project: ProjectEstimate
): string[] {
  const criteria: string[] = [
    "All approved devices are installed, labeled, powered, connected, configured, and visible in the applicable management platform.",
    "New cabling passes the agreed testing standard and corresponds to final labels and device records.",
    "Customer-approved administrative accounts and access permissions are operational.",
    "Open deficiencies are documented with an agreed corrective-action plan.",
  ];

  if (project.cameras.requested) {
    criteria.push(
      "Customer approves representative camera views, recording, playback, retention configuration, and remote-viewing access."
    );
  }

  if (project.wifi.requested) {
    criteria.push(
      "Customer approves representative wireless connectivity and coverage validation results."
    );
  }

  if (
    project.accessControl.requested
  ) {
    criteria.push(
      "Customer approves credential operation, door-control behavior, monitoring, schedules, and administrative access."
    );
  }

  return criteria;
}

function formatRequestedSystems(
  project: ProjectEstimate
): string {
  const systems: string[] = [];

  if (project.cameras.requested) {
    systems.push(
      "video surveillance"
    );
  }

  if (project.network.requested) {
    systems.push(
      "network infrastructure"
    );
  }

  if (project.wifi.requested) {
    systems.push(
      "managed Wi-Fi"
    );
  }

  if (
    project.accessControl.requested
  ) {
    systems.push(
      "electronic access control"
    );
  }

  return systems.length > 0
    ? formatList(systems)
    : "general low-voltage infrastructure";
}

function formatList(
  values: string[]
): string {
  if (values.length === 0) {
    return "";
  }

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

function formatNumber(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-US"
  ).format(value);
}
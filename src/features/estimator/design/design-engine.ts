import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

import {
  selectManufacturerStack,
  type ManufacturerSelection,
} from "./manufacturer-selector";

export type EstimatorDesign = {
  generatedAt: string;

  manufacturerSelection: ManufacturerSelection;

  designSummary: string;

  cameraDesign: {
    requested: boolean;

    totalCameraCount: number;

    interiorCameraCount: number;

    exteriorCameraCount: number;

    specialtyCameraCount: number;

    recordingDays: number | null;

    remoteViewingRequired: boolean | null;

    coverageGoals: string[];

    platform: string;

    manufacturer: string;

    notes: string[];
  };

  networkDesign: {
    requested: boolean;

    manufacturer: string;

    platform: string;

    rackRequired: boolean | null;

    rackLocation: string | null;

    vlanRequired: boolean | null;

    estimatedSwitchPorts: number;

    notes: string[];
  };

  wifiDesign: {
    requested: boolean;

    manufacturer: string;

    platform: string;

    estimatedAccessPointCount: number;

    estimatedConcurrentUsers: number | null;

    indoorCoverage: boolean | null;

    outdoorCoverage: boolean | null;

    guestNetworkRequired: boolean | null;

    coverageGoals: string[];

    notes: string[];
  };

  accessControlDesign: {
    requested: boolean;

    manufacturer: string;

    platform: string;

    controlledDoorCount: number;

    exteriorDoorCount: number;

    interiorDoorCount: number;

    credentialTypes: string[];

    remoteManagementRequired: boolean | null;

    notes: string[];
  };

  cablingDesign: {
    preferredCableType: string;

    estimatedCableFeet: number | null;

    pathwayTypes: string[];

    wiringStyle: string;

    trenchingRequired: boolean | null;

    fireStoppingRequired: boolean | null;

    notes: string[];
  };

  installationDesign: {
    liftRequired: boolean | null;

    liftType: string | null;

    afterHoursRequired: boolean | null;

    permitsRequired: boolean | null;

    estimatedLaborHours: number | null;

    estimatedDurationDays: number | null;

    estimatedCrewSize: number | null;

    difficultyLevel: string;

    notes: string[];
  };
};

export function createEstimatorDesign(
  input: ProjectEstimate
): EstimatorDesign {
  const project =
    projectEstimateSchema.parse(
      structuredClone(input)
    );

  const manufacturerSelection =
    selectManufacturerStack(project);

  const interiorCameraCount =
    project.cameras.interiorCount
      .value ?? 0;

  const exteriorCameraCount =
    project.cameras.exteriorCount
      .value ?? 0;

  const specialtyCameraCount =
    project.cameras.specialtyCount
      .value ?? 0;

  const totalCameraCount =
    interiorCameraCount +
    exteriorCameraCount +
    specialtyCameraCount;

  const estimatedAccessPointCount =
    project.wifi
      .estimatedAccessPointCount
      .value ?? 0;

  const controlledDoorCount =
    project.accessControl
      .controlledDoorCount
      .value ?? 0;

  const estimatedSwitchPorts =
    calculateEstimatedSwitchPorts(
      totalCameraCount,
      estimatedAccessPointCount,
      controlledDoorCount
    );

  return {
    generatedAt:
      new Date().toISOString(),

    manufacturerSelection,

    designSummary:
      createDesignSummary(
        project,
        manufacturerSelection
      ),

    cameraDesign: {
      requested:
        project.cameras.requested,

      totalCameraCount,

      interiorCameraCount,

      exteriorCameraCount,

      specialtyCameraCount,

      recordingDays:
        project.cameras.recordingDays
          .value,

      remoteViewingRequired:
        project.cameras
          .remoteViewingRequired,

      coverageGoals: [
        ...project.cameras
          .coverageGoals,
      ],

      platform:
        manufacturerSelection
          .cameras.platform,

      manufacturer:
        manufacturerSelection
          .cameras.manufacturer,

      notes:
        createCameraNotes(
          project,
          totalCameraCount
        ),
    },

    networkDesign: {
      requested:
        project.network.requested,

      manufacturer:
        manufacturerSelection
          .network.manufacturer,

      platform:
        manufacturerSelection
          .network.platform,

      rackRequired:
        project.network.rackRequired,

      rackLocation:
        project.network.rackLocation,

      vlanRequired:
        project.network.vlanRequired,

      estimatedSwitchPorts,

      notes:
        createNetworkNotes(
          project,
          estimatedSwitchPorts
        ),
    },

    wifiDesign: {
      requested:
        project.wifi.requested,

      manufacturer:
        manufacturerSelection
          .wifi.manufacturer,

      platform:
        manufacturerSelection
          .wifi.platform,

      estimatedAccessPointCount,

      estimatedConcurrentUsers:
        project.wifi
          .estimatedConcurrentUsers
          .value,

      indoorCoverage:
        project.wifi.indoorCoverage,

      outdoorCoverage:
        project.wifi.outdoorCoverage,

      guestNetworkRequired:
        project.wifi
          .guestNetworkRequired,

      coverageGoals: [
        ...project.wifi
          .coverageGoals,
      ],

      notes:
        createWifiNotes(
          project,
          estimatedAccessPointCount
        ),
    },

    accessControlDesign: {
      requested:
        project.accessControl
          .requested,

      manufacturer:
        manufacturerSelection
          .accessControl
          .manufacturer,

      platform:
        manufacturerSelection
          .accessControl.platform,

      controlledDoorCount,

      exteriorDoorCount:
        project.accessControl
          .exteriorDoorCount
          .value ?? 0,

      interiorDoorCount:
        project.accessControl
          .interiorDoorCount
          .value ?? 0,

      credentialTypes: [
        ...project.accessControl
          .credentialTypes,
      ],

      remoteManagementRequired:
        project.accessControl
          .remoteManagementRequired,

      notes:
        createAccessControlNotes(
          project,
          controlledDoorCount
        ),
    },

    cablingDesign: {
      preferredCableType:
        project.cabling
          .preferredCableType,

      estimatedCableFeet:
        project.cabling
          .estimatedCableFeet.value,

      pathwayTypes: [
        ...project.cabling
          .pathwayType,
      ],

      wiringStyle:
        project.cabling.wiringStyle,

      trenchingRequired:
        project.cabling
          .trenchingRequired,

      fireStoppingRequired:
        project.cabling
          .fireStoppingRequired,

      notes:
        createCablingNotes(project),
    },

    installationDesign: {
      liftRequired:
        project.installation
          .liftRequired,

      liftType:
        project.installation.liftType,

      afterHoursRequired:
        project.installation
          .afterHoursRequired,

      permitsRequired:
        project.installation
          .permitsRequired,

      estimatedLaborHours:
        project.installation
          .estimatedLaborHours.value,

      estimatedDurationDays:
        project.installation
          .estimatedDurationDays.value,

      estimatedCrewSize:
        project.installation
          .estimatedCrewSize.value,

      difficultyLevel:
        project.installation
          .difficultyLevel,

      notes:
        createInstallationNotes(
          project
        ),
    },
  };
}

function calculateEstimatedSwitchPorts(
  cameraCount: number,
  accessPointCount: number,
  controlledDoorCount: number
): number {
  const activeDevicePorts =
    cameraCount +
    accessPointCount +
    controlledDoorCount;

  if (activeDevicePorts === 0) {
    return 0;
  }

  return Math.ceil(
    activeDevicePorts * 1.2
  );
}

function createDesignSummary(
  project: ProjectEstimate,
  selection: ManufacturerSelection
): string {
  const systems: string[] = [];

  if (project.cameras.requested) {
    systems.push(
      `${selection.cameras.manufacturer} video surveillance`
    );
  }

  if (project.network.requested) {
    systems.push(
      `${selection.network.manufacturer} network infrastructure`
    );
  }

  if (project.wifi.requested) {
    systems.push(
      `${selection.wifi.manufacturer} managed Wi-Fi`
    );
  }

  if (
    project.accessControl.requested
  ) {
    systems.push(
      `${selection.accessControl.manufacturer} access control`
    );
  }

  const projectType =
    project.property.projectType ??
    project.property
      .customProjectType ??
    "property";

  if (systems.length === 0) {
    return `Preliminary SmartNET design for the ${projectType}.`;
  }

  return `Preliminary ${selection.tier} SmartNET design for the ${projectType}, including ${formatList(
    systems
  )}.`;
}

function createCameraNotes(
  project: ProjectEstimate,
  totalCameraCount: number
): string[] {
  const notes: string[] = [];

  if (!project.cameras.requested) {
    return notes;
  }

  if (totalCameraCount === 0) {
    notes.push(
      "Final camera quantity remains pending."
    );
  }

  if (
    project.cameras.recordingDays
      .value === null
  ) {
    notes.push(
      "Video-retention duration must be confirmed before final storage sizing."
    );
  }

  if (
    project.cameras.coverageGoals
      .length === 0
  ) {
    notes.push(
      "Final camera placement requires confirmed coverage objectives."
    );
  }

  if (
    project.property
      .ceilingHeightFeet.value !==
      null &&
    project.property
      .ceilingHeightFeet.value >= 18
  ) {
    notes.push(
      "High mounting elevations may require specialty lenses, lower mounting points, or lift access."
    );
  }

  return notes;
}

function createNetworkNotes(
  project: ProjectEstimate,
  estimatedSwitchPorts: number
): string[] {
  const notes: string[] = [];

  if (!project.network.requested) {
    return notes;
  }

  if (estimatedSwitchPorts > 0) {
    notes.push(
      `Allow at least ${estimatedSwitchPorts} managed switch ports, including preliminary spare capacity.`
    );
  }

  if (
    project.network.existingSwitches ===
    null
  ) {
    notes.push(
      "Existing switch capacity and PoE budget require verification."
    );
  }

  if (
    project.network.existingRack ===
    null
  ) {
    notes.push(
      "Existing rack or cabinet availability requires verification."
    );
  }

  if (
    project.network.vlanRequired ===
    null
  ) {
    notes.push(
      "Final network segmentation and VLAN requirements remain pending."
    );
  }

  return notes;
}

function createWifiNotes(
  project: ProjectEstimate,
  estimatedAccessPointCount: number
): string[] {
  const notes: string[] = [];

  if (!project.wifi.requested) {
    return notes;
  }

  if (estimatedAccessPointCount === 0) {
    notes.push(
      "Access-point quantity requires wireless design validation."
    );
  }

  if (
    project.wifi.coverageGoals
      .length === 0
  ) {
    notes.push(
      "Required wireless coverage areas remain pending."
    );
  }

  if (
    project.property.projectType ===
      "warehouse" ||
    project.property.projectType ===
      "industrial"
  ) {
    notes.push(
      "Metal racks, inventory, machinery, and changing storage conditions must be included in RF design."
    );
  }

  notes.push(
    "Final access-point placement should be verified through predictive design and post-installation validation."
  );

  return notes;
}

function createAccessControlNotes(
  project: ProjectEstimate,
  controlledDoorCount: number
): string[] {
  const notes: string[] = [];

  if (
    !project.accessControl.requested
  ) {
    return notes;
  }

  if (controlledDoorCount === 0) {
    notes.push(
      "Final controlled-opening count remains pending."
    );
  }

  if (
    project.accessControl
      .credentialTypes.length === 0
  ) {
    notes.push(
      "Credential type must be confirmed."
    );
  }

  notes.push(
    "Door hardware, egress requirements, fire-alarm interfaces, and locking methods require field verification."
  );

  return notes;
}

function createCablingNotes(
  project: ProjectEstimate
): string[] {
  const notes: string[] = [];

  if (
    project.cabling
      .estimatedCableFeet
      .confidence === "ai_inferred"
  ) {
    notes.push(
      "Cable footage is preliminary and must be verified against actual pathways."
    );
  }

  if (
    project.cabling.pathwayType
      .length === 0
  ) {
    notes.push(
      "Available pathways remain unverified."
    );
  }

  if (
    project.cabling
      .existingCablingAvailable ===
    true
  ) {
    notes.push(
      "Existing cabling must be tested before reuse."
    );
  }

  return notes;
}

function createInstallationNotes(
  project: ProjectEstimate
): string[] {
  const notes: string[] = [];

  if (
    project.installation
      .liftRequired === null
  ) {
    notes.push(
      "Lift requirements remain pending."
    );
  }

  if (
    project.installation
      .afterHoursRequired === null
  ) {
    notes.push(
      "Installation work-window requirements remain pending."
    );
  }

  if (
    project.installation
      .permitsRequired === null
  ) {
    notes.push(
      "Permit requirements must be confirmed with the applicable authority."
    );
  }

  return notes;
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
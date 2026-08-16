import type { ProjectEstimate } from "../domain/project-estimate";

export type ManufacturerTier =
  | "value"
  | "professional"
  | "enterprise";

export type ManufacturerSelection = {
  tier: ManufacturerTier;

  cameras: {
    manufacturer: string;
    platform: string;
    reason: string;
  };

  network: {
    manufacturer: string;
    platform: string;
    reason: string;
  };

  wifi: {
    manufacturer: string;
    platform: string;
    reason: string;
  };

  accessControl: {
    manufacturer: string;
    platform: string;
    reason: string;
  };
};

export function selectManufacturerStack(
  project: ProjectEstimate
): ManufacturerSelection {
  const tier =
    determineManufacturerTier(project);

  switch (tier) {
    case "enterprise":
      return createEnterpriseSelection(
        project
      );

    case "professional":
      return createProfessionalSelection(
        project
      );

    case "value":
    default:
      return createValueSelection(
        project
      );
  }
}

function determineManufacturerTier(
  project: ProjectEstimate
): ManufacturerTier {
  const squareFootage =
    project.property.squareFootage
      .value ?? 0;

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

  const concurrentUsers =
    project.wifi
      .estimatedConcurrentUsers
      .value ?? 0;

  const controlledDoorCount =
    project.accessControl
      .controlledDoorCount
      .value ?? 0;

  const isEnterpriseProperty =
    project.property.projectType ===
      "datacenter" ||
    project.property.projectType ===
      "medical" ||
    project.property.projectType ===
      "education" ||
    project.property.projectType ===
      "multi_location";

  const isLargeProject =
    squareFootage >= 75000 ||
    cameraCount >= 64 ||
    accessPointCount >= 25 ||
    concurrentUsers >= 500 ||
    controlledDoorCount >= 24;

  if (
    isEnterpriseProperty ||
    isLargeProject
  ) {
    return "enterprise";
  }

  const isProfessionalProperty =
    project.property.projectType ===
      "warehouse" ||
    project.property.projectType ===
      "industrial" ||
    project.property.projectType ===
      "office" ||
    project.property.projectType ===
      "hospitality" ||
    project.property.projectType ===
      "religious";

  const isMediumProject =
    squareFootage >= 15000 ||
    cameraCount >= 16 ||
    accessPointCount >= 8 ||
    concurrentUsers >= 100 ||
    controlledDoorCount >= 6;

  if (
    isProfessionalProperty ||
    isMediumProject
  ) {
    return "professional";
  }

  return "value";
}

function createValueSelection(
  project: ProjectEstimate
): ManufacturerSelection {
  return {
    tier: "value",

    cameras: {
      manufacturer: "Ubiquiti",

      platform:
        "UniFi Protect",

      reason:
        project.cameras.requested
          ? "Selected for an integrated, cost-conscious camera platform with centralized management."
          : "Camera platform not currently requested.",
    },

    network: {
      manufacturer: "Ubiquiti",

      platform:
        "UniFi Network",

      reason:
        project.network.requested
          ? "Selected for unified routing, switching, monitoring, and straightforward administration."
          : "Network platform not currently requested.",
    },

    wifi: {
      manufacturer: "Ubiquiti",

      platform:
        "UniFi WiFi",

      reason:
        project.wifi.requested
          ? "Selected for managed wireless coverage with centralized configuration and reasonable deployment cost."
          : "Wi-Fi platform not currently requested.",
    },

    accessControl: {
      manufacturer: "Ubiquiti",

      platform:
        "UniFi Access",

      reason:
        project.accessControl.requested
          ? "Selected for integrated credential management and simplified door administration."
          : "Access-control platform not currently requested.",
    },
  };
}

function createProfessionalSelection(
  project: ProjectEstimate
): ManufacturerSelection {
  return {
    tier: "professional",

    cameras: {
      manufacturer: "Hanwha Vision",

      platform:
        "Wisenet",

      reason:
        project.cameras.requested
          ? "Selected for commercial-grade video quality, flexible camera options, analytics support, and strong warehouse suitability."
          : "Camera platform not currently requested.",
    },

    network: {
      manufacturer: "Aruba",

      platform:
        "Aruba Instant On",

      reason:
        project.network.requested
          ? "Selected for reliable managed switching, VLAN support, PoE capacity, and commercial network growth."
          : "Network platform not currently requested.",
    },

    wifi: {
      manufacturer: "Aruba",

      platform:
        "Aruba Instant On",

      reason:
        project.wifi.requested
          ? "Selected for commercial wireless performance, roaming, centralized management, and scalable coverage."
          : "Wi-Fi platform not currently requested.",
    },

    accessControl: {
      manufacturer: "Axis",

      platform:
        "Axis Access Control",

      reason:
        project.accessControl.requested
          ? "Selected for professional door control, credential flexibility, and integration with commercial security systems."
          : "Access-control platform not currently requested.",
    },
  };
}

function createEnterpriseSelection(
  project: ProjectEstimate
): ManufacturerSelection {
  return {
    tier: "enterprise",

    cameras: {
      manufacturer: "Axis Communications",

      platform:
        "Axis Camera Station",

      reason:
        project.cameras.requested
          ? "Selected for enterprise reliability, advanced analytics, cybersecurity controls, broad camera options, and long-term support."
          : "Camera platform not currently requested.",
    },

    network: {
      manufacturer: "Cisco",

      platform:
        "Cisco Catalyst",

      reason:
        project.network.requested
          ? "Selected for enterprise switching, segmentation, resiliency, security controls, and multi-site management."
          : "Network platform not currently requested.",
    },

    wifi: {
      manufacturer: "Aruba",

      platform:
        "Aruba Central",

      reason:
        project.wifi.requested
          ? "Selected for enterprise wireless design, roaming, analytics, centralized management, and high-density performance."
          : "Wi-Fi platform not currently requested.",
    },

    accessControl: {
      manufacturer: "Genetec",

      platform:
        "Security Center Synergis",

      reason:
        project.accessControl.requested
          ? "Selected for enterprise access-control management, auditability, integrations, scalability, and multi-site operations."
          : "Access-control platform not currently requested.",
    },
  };
}
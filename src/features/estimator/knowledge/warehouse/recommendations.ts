import type { PlaybookRecommendation } from "../playbook";

export const warehouseRecommendations: PlaybookRecommendation[] = [
  {
    id: "warehouse.fiberBackbone",
    title: "Install a fiber backbone between network rooms",
    description:
      "Use fiber to interconnect MDFs, IDFs, remote equipment rooms, and distant warehouse areas to improve bandwidth, scalability, and reliability while avoiding copper distance limitations.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "fiber-backbone",
      "long-cable-run-review",
      "scalability",
    ],
  },

  {
    id: "warehouse.managedSwitching",
    title: "Deploy managed PoE switching",
    description:
      "Use enterprise managed PoE switches that support VLANs, monitoring, remote troubleshooting, QoS, and future expansion for cameras, Wi-Fi, and access control.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "managed-network",
      "poe-switching",
      "vlan-ready",
    ],
  },

  {
    id: "warehouse.networkRack",
    title: "Use centralized rack organization",
    description:
      "Organize switches, patch panels, UPS units, fiber shelves, cable management, and recorders into professionally managed racks for easier maintenance and expansion.",
    category: "rack",
    conditions: [],
    ruleTags: [
      "rack-standardization",
      "serviceability",
      "maintenance",
    ],
  },

  {
    id: "warehouse.upsProtection",
    title: "Provide UPS protection",
    description:
      "Protect switches, servers, NVRs, controllers, and core networking equipment with appropriately sized UPS systems to minimize downtime during short power interruptions.",
    category: "power",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "warehouse.predictiveWifi",
    title: "Perform predictive wireless design",
    description:
      "Create a predictive RF design before installation to determine access-point quantity, antenna selection, and preliminary coverage throughout the warehouse.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "predictive-survey",
      "wifi-design",
      "rf-planning",
    ],
  },

  {
    id: "warehouse.validationSurvey",
    title: "Perform a post-installation wireless validation survey",
    description:
      "Validate coverage, roaming performance, channel utilization, and signal quality after installation to ensure warehouse workflows perform reliably.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "validation-survey",
      "wifi-certification",
      "roaming-validation",
    ],
  },

  {
    id: "warehouse.highDensityWifi",
    title: "Design for high-density warehouse mobility",
    description:
      "Optimize Wi-Fi for handheld scanners, tablets, forklifts, robotics, and other mobile devices using enterprise wireless design principles.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "warehouse-mobility",
      "high-density-wireless",
      "enterprise-wifi",
    ],
  },

  {
    id: "warehouse.loadingDockCameras",
    title: "Provide dedicated loading dock coverage",
    description:
      "Use dedicated cameras for trailer positioning, shipment verification, employee safety, and dock-door activity instead of relying on wide-area overview cameras.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "loading-dock-review",
      "shipment-verification",
      "dock-security",
    ],
  },

  {
    id: "warehouse.lowLightCameras",
    title: "Use low-light optimized cameras",
    description:
      "Deploy cameras with strong low-light performance, wide dynamic range, and infrared capability where lighting conditions vary throughout the day.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "low-light",
      "wdr",
      "infrared",
    ],
  },

  {
    id: "warehouse.cameraAnalytics",
    title: "Enable intelligent video analytics",
    description:
      "Use analytics such as intrusion detection, line crossing, object classification, people counting, vehicle detection, and license-plate recognition where appropriate.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ai-video",
      "analytics",
      "future-ready",
    ],
  },

  {
    id: "warehouseAccessControl",
    title: "Deploy enterprise access control",
    description:
      "Use centrally managed access control with audit logs, schedules, mobile credentials, visitor management, and role-based permissions.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "enterprise-access",
      "credential-management",
      "audit-trail",
    ],
  },

  {
    id: "warehouseVisitorManagement",
    title: "Integrate visitor management",
    description:
      "Consider visitor check-in, temporary credentials, contractor tracking, and delivery management for improved operational security.",
    category: "service",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "visitor-management",
      "security-upgrade",
    ],
  },

  {
    id: "warehouseCableManagement",
    title: "Install structured cable management",
    description:
      "Use ladder rack, cable tray, J-hooks, vertical managers, horizontal managers, labeling, and documentation for a scalable installation.",
    category: "cabling",
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "labeling",
      "documentation",
    ],
  },

  {
    id: "warehouseDocumentation",
    title: "Provide complete project documentation",
    description:
      "Deliver floor plans, rack elevations, cable schedules, labeling documentation, IP addressing, device inventory, and as-built drawings.",
    category: "service",
    conditions: [],
    ruleTags: [
      "documentation",
      "as-built",
      "handover",
    ],
  },

  {
    id: "warehousePreventiveMaintenance",
    title: "Offer preventive maintenance",
    description:
      "Provide periodic inspections, firmware updates, camera cleaning, UPS testing, network health reviews, and proactive maintenance visits.",
    category: "service",
    conditions: [],
    ruleTags: [
      "maintenance",
      "service-contract",
      "recurring-revenue",
    ],
  },

  {
    id: "warehouseFutureExpansion",
    title: "Design for future expansion",
    description:
      "Reserve rack space, switch capacity, fiber strands, conduit capacity, and structured pathways so future growth can occur with minimal disruption.",
    category: "network",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
    ],
  },

  {
    id: "warehouseCybersecurity",
    title: "Harden network security",
    description:
      "Segment security devices with VLANs, apply strong authentication, monitor firmware, and follow cybersecurity best practices for connected systems.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cybersecurity",
      "network-hardening",
      "best-practices",
    ],
  },

  {
    id: "warehouseManagedServices",
    title: "Offer managed monitoring and support",
    description:
      "Provide remote monitoring, proactive alerting, configuration backup, firmware management, and priority support through a managed service agreement.",
    category: "service",
    conditions: [],
    ruleTags: [
      "managed-services",
      "recurring-revenue",
      "remote-monitoring",
    ],
  },
];
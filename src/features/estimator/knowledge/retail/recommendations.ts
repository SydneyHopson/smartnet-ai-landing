import type { PlaybookRecommendation } from "../playbook";

export const retailRecommendations: PlaybookRecommendation[] = [
  {
    id: "retail.performWalkthrough",
    title: "Perform a detailed retail walkthrough",
    description:
      "Verify store layout, checkout locations, sales-floor fixtures, stockrooms, receiving, telecom spaces, ceiling conditions, pathways, camera views, controlled openings, power, and operating restrictions before final pricing.",
    category: "service",
    conditions: [],
    ruleTags: [
      "walkthrough-required",
      "retail-site-verification",
      "estimate-accuracy",
    ],
  },

  {
    id: "retail.operatingStorePlan",
    title: "Create an occupied-store installation plan",
    description:
      "Define customer-safe work zones, aisle closures, merchandise protection, overhead-work controls, daily cleanup, store-management approvals, and phased installation procedures.",
    category: "service",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-retail",
      "customer-safety",
      "work-zone-coordination",
      "phased-installation",
    ],
  },

  {
    id: "retail.networkSegmentation",
    title: "Separate payment and retail systems",
    description:
      "Use managed switching, VLANs, firewall policies, and controlled access to separate point-of-sale, payment, employee, guest, camera, access-control, inventory, signage, audio, IoT, and vendor traffic.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-network-segmentation",
      "pci-coordination",
      "cybersecurity",
      "vlan-review",
    ],
  },

  {
    id: "retail.managedSwitching",
    title: "Use managed PoE switching",
    description:
      "Deploy managed PoE switches with sufficient port capacity, PoE budget, resilient uplinks, monitoring, VLAN support, secure administration, and planned spare capacity.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "managed-switching",
      "poe-capacity",
      "network-monitoring",
      "future-expansion",
    ],
  },

  {
    id: "retail.secureRack",
    title: "Use a secure and serviceable network rack",
    description:
      "Organize routers, firewalls, switches, patch panels, fiber shelves, recorders, controllers, audio equipment, point-of-sale interfaces, and UPS units in a secured rack or enclosure.",
    category: "rack",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "secure-rack",
      "equipment-security",
      "serviceability",
      "retail-headend",
    ],
  },

  {
    id: "retail.fiberBackbone",
    title: "Use fiber for distant or multi-level areas",
    description:
      "Install fiber between network rooms, floors, mall telecom spaces, detached areas, remote enclosures, loading zones, and locations beyond copper Ethernet limits.",
    category: "cabling",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "fiber-backbone",
      "distance-limitation",
      "remote-enclosure-review",
      "future-expansion",
    ],
  },

  {
    id: "retail.verifyExistingFiber",
    title: "Test existing fiber before reuse",
    description:
      "Verify fiber type, strand count, connectors, route, ownership, labeling, condition, and test results before depending on existing infrastructure.",
    category: "cabling",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "fiber-testing",
      "existing-infrastructure",
      "backbone-review",
    ],
  },

  {
    id: "retail.enterpriseWifi",
    title: "Design enterprise Wi-Fi for retail mobility",
    description:
      "Account for handheld scanners, mobile point-of-sale, tablets, inventory devices, customer density, fixtures, shelving, refrigeration, roaming, and changing merchandise layouts.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-wifi-design",
      "mobile-pos",
      "inventory-mobility",
      "wireless-survey",
    ],
  },

  {
    id: "retail.wifiValidation",
    title: "Validate wireless coverage after installation",
    description:
      "Test signal strength, interference, roaming, authentication, channel use, handheld-device performance, checkout coverage, stockroom coverage, and curbside connectivity.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-validation",
      "retail-roaming",
      "quality-assurance",
      "device-compatibility-review",
    ],
  },

  {
    id: "retail.guestWifi",
    title: "Isolate customer and vendor Wi-Fi",
    description:
      "Provide a separate guest network with firewall isolation, bandwidth controls, captive-portal options, usage policies, and support boundaries.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "bandwidth-control",
      "captive-portal",
    ],
  },

  {
    id: "retail.transactionCameras",
    title: "Use dedicated transaction camera views",
    description:
      "Design focused camera views for registers, self-checkout, customer service, refunds, cash handling, item handoff, pharmacy transactions, and curbside pickup where approved.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-verification",
      "loss-prevention",
      "pixel-density-review",
      "lens-selection-review",
    ],
  },

  {
    id: "retail.cameraPrivacy",
    title: "Design surveillance around privacy restrictions",
    description:
      "Exclude fitting rooms, restrooms, changing areas, protected customer information, restricted pharmacy views, and inappropriate employee areas while using masking and policy review where required.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-privacy",
      "employee-privacy",
      "fitting-room-restriction",
      "camera-policy-review",
    ],
  },

  {
    id: "retail.cameraLighting",
    title: "Select cameras for retail lighting conditions",
    description:
      "Account for storefront glass, reflections, display lighting, jewelry cases, self-checkout screens, low-light stockrooms, headlights, and exterior nighttime conditions.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wdr-review",
      "low-light-review",
      "reflection-review",
      "display-lighting-review",
    ],
  },

  {
    id: "retail.videoStorage",
    title: "Size video storage from confirmed retention requirements",
    description:
      "Calculate storage using approved camera count, resolution, frame rate, compression, recording mode, transaction coverage, legal holds, and retention groups.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "storage-sizing",
      "retention-policy-review",
      "recording-profile-review",
    ],
  },

  {
    id: "retail.accessControl",
    title: "Survey every controlled retail opening",
    description:
      "Inspect storefront doors, employee entrances, pharmacy doors, stockrooms, cash offices, loading areas, inventory cages, roll-up doors, gates, cabinets, and automatic doors before selecting hardware.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-survey",
      "storefront-door-review",
      "inventory-cage-review",
      "hardware-selection",
    ],
  },

  {
    id: "retail.roleBasedAccess",
    title: "Use role-based retail access permissions",
    description:
      "Assign access by employee role, store location, shift, management level, pharmacy responsibility, vendor status, and temporary work schedule.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "role-based-access",
      "credential-management",
      "vendor-access",
      "multi-store-management",
    ],
  },

  {
    id: "retail.accessAlerts",
    title: "Enable access alerts and audit reporting",
    description:
      "Configure forced-door alerts, held-door alerts, scheduled reports, remote management, pharmacy audit trails, vendor access records, and multi-store event review where required.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "remote-management",
      "pharmacy-security",
    ],
  },

  {
    id: "retail.upsProtection",
    title: "Protect critical retail systems with UPS power",
    description:
      "Provide battery backup for internet, firewalls, switches, point-of-sale, payment connectivity, cameras, access control, inventory systems, pharmacy systems, and selected signage or communications equipment.",
    category: "power",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
      "retail-resilience",
      "power-protection",
    ],
  },

  {
    id: "retail.audioZones",
    title: "Use zoned retail audio",
    description:
      "Separate sales-floor, pharmacy, stockroom, receiving, fitting-room, vestibule, exterior, and employee-area audio where different volume, paging, or content requirements apply.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "retail-audio",
      "audio-zones",
      "paging",
      "control-design",
    ],
  },

  {
    id: "retail.commercialMusic",
    title: "Use a commercial music service",
    description:
      "Confirm licensed commercial music, content scheduling, paging priorities, corporate branding, advertising control, and multi-store administration.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "commercial-audio",
      "music-licensing-review",
      "service-subscription-review",
    ],
  },

  {
    id: "retail.digitalSignage",
    title: "Use centrally managed digital signage",
    description:
      "Provide commercial displays, secure mounts, managed players, reliable network connectivity, scheduled content, user permissions, and multi-store administration.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "content-management",
      "multi-store-signage",
      "retail-displays",
    ],
  },

  {
    id: "retail.environmentRatedEquipment",
    title: "Use environment-rated equipment where required",
    description:
      "Select properly rated cable, devices, enclosures, fittings, seals, and mounting hardware for refrigeration, freezer, condensation, moisture, washdown, grease, dust, chemicals, corrosion, and exterior weather.",
    category: "other",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "environmental-rating-review",
      "temperature-rating",
      "weather-rated-equipment",
      "specialty-materials",
    ],
  },

  {
    id: "retail.pharmacySecurity",
    title: "Apply enhanced pharmacy security controls",
    description:
      "Coordinate approved camera coverage, controlled access, cabinet security, credential rules, access logs, alerts, refrigeration monitoring, and reporting for pharmacy areas.",
    category: "other",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security",
      "controlled-substance-review",
      "access-audit",
      "camera-policy-review",
    ],
  },

  {
    id: "retail.firestopDocumentation",
    title: "Document all rated penetrations",
    description:
      "Use approved firestop systems and provide labels, photographs, locations, system references, and closeout documentation for rated walls, floors, shafts, and tenant separations.",
    category: "cabling",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "documentation",
      "inspection-readiness",
    ],
  },

  {
    id: "retail.testing",
    title: "Include complete testing and commissioning",
    description:
      "Define copper certification, fiber testing, wireless validation, camera acceptance, transaction-view verification, access-control testing, audio commissioning, signage validation, labeling, training, and closeout requirements.",
    category: "service",
    conditions: [],
    ruleTags: [
      "testing",
      "commissioning",
      "closeout",
      "quality-assurance",
    ],
  },

  {
    id: "retail.documentation",
    title: "Deliver complete retail as-built documentation",
    description:
      "Provide cable records, rack elevations, device inventories, camera views, access-control schedules, floor plans, test results, network diagrams, warranties, and configuration references.",
    category: "service",
    conditions: [],
    ruleTags: [
      "documentation",
      "as-built",
      "serviceability",
      "closeout",
    ],
  },

  {
    id: "retail.preventiveMaintenance",
    title: "Offer preventive maintenance and managed support",
    description:
      "Provide recurring network monitoring, camera cleaning, UPS testing, access-control inspection, firmware management, audio testing, signage support, and priority service.",
    category: "service",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "managed-services",
      "remote-monitoring",
      "recurring-revenue",
    ],
  },

  {
    id: "retail.futureExpansion",
    title: "Design for future retail growth",
    description:
      "Reserve rack space, switch ports, PoE capacity, fiber strands, conduit, pathways, licenses, storage, and spare cabling for future registers, cameras, displays, access points, fixtures, and store technology.",
    category: "network",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
      "retail-growth",
    ],
  },
];
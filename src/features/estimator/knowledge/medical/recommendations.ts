import type { PlaybookRecommendation } from "../playbook";

export const medicalRecommendations: PlaybookRecommendation[] = [
  {
    id: "medical.walkthrough",
    title: "Perform a comprehensive healthcare site walkthrough",
    description:
      "Verify telecom rooms, ceiling conditions, infection-control requirements, patient-flow restrictions, pathways, specialty clinical spaces, and equipment locations before final pricing.",
    category: "service",
    conditions: [],
    ruleTags: [
      "walkthrough-required",
      "field-verification",
      "estimate-accuracy",
    ],
  },

  {
    id: "medical.infectionControl",
    title: "Coordinate infection-control requirements before installation",
    description:
      "Review containment procedures, dust control, cleaning protocols, PPE, infection-control risk assessment requirements, and approved work practices with facility management before beginning work.",
    category: "service",
    conditions: [],
    ruleTags: [
      "infection-control",
      "clinical-safety",
      "icra-review",
    ],
  },

  {
    id: "medical.patientPrivacy",
    title: "Review patient privacy requirements",
    description:
      "Identify restricted areas, photography limitations, patient-information protections, camera restrictions, and facility privacy policies that affect installation and documentation.",
    category: "service",
    conditions: [],
    ruleTags: [
      "patient-privacy",
      "hipaa-coordination",
      "documentation-review",
    ],
  },

  {
    id: "medical.networkSegmentation",
    title: "Separate healthcare systems using network segmentation",
    description:
      "Use dedicated VLANs or isolated networks for clinical devices, administrative systems, guest Wi-Fi, security systems, medical devices, and building systems when appropriate.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "vlan-review",
      "medical-device-isolation",
      "cybersecurity",
    ],
  },

  {
    id: "medical.managedSwitching",
    title: "Deploy managed PoE switching",
    description:
      "Use managed PoE switches with VLAN support, monitoring, secure administration, adequate PoE capacity, resilient uplinks, and planned spare capacity.",
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
    id: "medical.secureRack",
    title: "Use secure and serviceable telecom racks",
    description:
      "Organize switches, patch panels, fiber shelves, controllers, recorders, UPS units, and cable management in secured telecom racks or enclosures with suitable power and cooling.",
    category: "rack",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "secure-rack",
      "equipment-organization",
      "serviceability",
      "physical-security",
    ],
  },

  {
    id: "medical.upsProtection",
    title: "Provide UPS protection for critical systems",
    description:
      "Protect network, camera, access-control, communication, and selected clinical-support equipment with appropriately sized battery backup.",
    category: "power",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "medical.enterpriseWifi",
    title: "Design enterprise Wi-Fi for healthcare mobility",
    description:
      "Account for roaming devices, clinical workflows, density, shielding, interference, authentication, and device compatibility, then validate performance after installation.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wireless-survey",
      "clinical-roaming",
      "wifi-validation",
      "device-compatibility-review",
    ],
  },

  {
    id: "medical.guestWifi",
    title: "Isolate patient and visitor Wi-Fi",
    description:
      "Place guest wireless traffic on a separated network with appropriate bandwidth limits, security policies, captive-portal controls, and support boundaries.",
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
      "cybersecurity",
    ],
  },

  {
    id: "medical.cameraDesign",
    title: "Design surveillance around privacy and operational goals",
    description:
      "Define coverage objectives, prohibited areas, privacy masking, lighting, retention, mounting height, identification requirements, and facility policy before selecting cameras.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-design",
      "privacy-review",
      "lighting-review",
      "retention-review",
    ],
  },

  {
    id: "medical.pharmacyCameraCoverage",
    title: "Provide focused pharmacy and medication-area coverage",
    description:
      "Use dedicated camera views for pharmacy entrances, medication storage, transaction areas, and controlled-substance handling where permitted by policy and law.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
          "Medication storage",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security",
      "medication-area-coverage",
      "privacy-review",
    ],
  },

  {
    id: "medical.accessControl",
    title: "Inspect every controlled opening before selecting hardware",
    description:
      "Verify door construction, frames, egress hardware, automatic-door interfaces, pharmacy requirements, behavioral-health considerations, accessibility, and life-safety requirements.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-survey",
      "life-safety-review",
      "hardware-selection",
      "accessibility-review",
    ],
  },

  {
    id: "medical.roleBasedAccess",
    title: "Use role-based access permissions",
    description:
      "Configure access permissions around staff roles, departments, schedules, pharmacy responsibilities, contractors, and visitors rather than using broad shared access.",
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
      "audit-trail",
      "least-privilege",
    ],
  },

  {
    id: "medical.accessAudit",
    title: "Enable access alerts and audit reporting",
    description:
      "Use detailed access logs, forced-door alerts, held-door alerts, scheduled reports, and remote administration where operationally required.",
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
      "security-monitoring",
    ],
  },

  {
    id: "medical.fiberBackbone",
    title: "Use fiber between telecom rooms and distant areas",
    description:
      "Install fiber backbone cabling between MDFs, IDFs, floors, buildings, remote clinical areas, and locations beyond copper Ethernet limits.",
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
      "network-resilience",
      "future-expansion",
    ],
  },

  {
    id: "medical.backboneValidation",
    title: "Validate existing backbone cabling before reuse",
    description:
      "Test existing fiber and verify strand availability, connector types, labeling, routing, ownership, and documentation before relying on it in the final design.",
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
      "backbone-review",
      "existing-infrastructure",
    ],
  },

  {
    id: "medical.firestopDocumentation",
    title: "Document all rated penetrations",
    description:
      "Use approved firestop systems and provide labels, photographs, locations, system references, and closeout documentation for fire-rated and smoke-rated penetrations.",
    category: "cabling",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "documentation",
      "inspection-readiness",
    ],
  },

  {
    id: "medical.communicationSystems",
    title: "Coordinate clinical communication systems",
    description:
      "Treat paging, intercom, staff duress, patient assistance, nurse call, emergency notification, and room-status systems as specialty workflows requiring vendor and facility coordination.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "healthcare-communications",
      "clinical-workflow",
      "vendor-integration",
      "specialty-system-review",
    ],
  },

  {
    id: "medical.staffDuress",
    title: "Consider staff duress coverage",
    description:
      "Evaluate fixed and mobile duress devices for reception, pharmacy, behavioral-health, exam, treatment, and isolated staff areas where risk warrants it.",
    category: "other",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Behavioral health",
          "Pharmacy",
        ],
      },
    ],
    ruleTags: [
      "staff-duress",
      "employee-safety",
      "behavioral-health-review",
      "pharmacy-security",
    ],
  },

  {
    id: "medical.documentation",
    title: "Collect complete healthcare facility documentation",
    description:
      "Request floor plans, reflected ceiling plans, telecom drawings, shielding details, door schedules, infection-control standards, network diagrams, and system documentation before final pricing.",
    category: "service",
    conditions: [],
    ruleTags: [
      "documentation",
      "design-inputs",
      "facility-standard-review",
      "estimate-quality",
    ],
  },

  {
    id: "medical.testing",
    title: "Include comprehensive testing and commissioning",
    description:
      "Define copper certification, fiber testing, wireless validation, camera acceptance, access-control testing, communication-system verification, labeling, training, and closeout requirements.",
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
    id: "medical.preventiveMaintenance",
    title: "Offer preventive maintenance and managed support",
    description:
      "Provide recurring system health reviews, firmware management, camera cleaning, UPS testing, network monitoring, configuration backup, and priority support.",
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
    id: "medical.futureExpansion",
    title: "Design for future healthcare expansion",
    description:
      "Reserve rack space, switch capacity, PoE capacity, pathway capacity, fiber strands, licensing, and spare cabling for future clinical growth and technology upgrades.",
    category: "network",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
    ],
  },
];
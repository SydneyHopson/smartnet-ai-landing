import type {
  PlaybookCommonMistake,
  PlaybookStandardsReference,
  PlaybookUpsellOpportunity,
} from "../playbook";

export const medicalCommonMistakes: PlaybookCommonMistake[] = [
  {
    id: "medical.mistake.infectionControl",
    title: "Ignoring infection-control requirements",
    description:
      "Ceiling access, drilling, wall openings, debris, tools, and material staging can create unacceptable contamination risk in active healthcare spaces.",
    prevention:
      "Confirm containment, HEPA, cleaning, PPE, access permits, approved tools, and facility infection-prevention requirements before estimating labor.",
    conditions: [],
    ruleTags: [
      "infection-control",
      "dust-containment",
      "clinical-safety",
    ],
  },

  {
    id: "medical.mistake.patientPrivacy",
    title: "Failing to account for patient privacy",
    description:
      "Photos, camera views, device access, and work near records or active treatment areas may expose protected information or violate facility policy.",
    prevention:
      "Identify restricted areas, photography rules, camera exclusions, escort requirements, and documentation procedures before work begins.",
    conditions: [],
    ruleTags: [
      "patient-privacy",
      "hipaa-coordination",
      "photo-restriction",
    ],
  },

  {
    id: "medical.mistake.ceilingAccess",
    title: "Assuming healthcare ceiling access is unrestricted",
    description:
      "Sealed ceilings, procedure rooms, imaging areas, smoke barriers, utilities, and infection-control rules may prevent normal above-ceiling work.",
    prevention:
      "Inspect each clinical zone and document approved access methods, pathway availability, containment, and work-window requirements.",
    conditions: [],
    ruleTags: [
      "ceiling-access-review",
      "clinical-pathway-review",
      "walkthrough-required",
    ],
  },

  {
    id: "medical.mistake.ratedBarriers",
    title: "Missing fire-rated and smoke-rated barriers",
    description:
      "Healthcare facilities often contain smoke compartments, fire walls, shafts, and rated floors requiring approved penetration systems and documentation.",
    prevention:
      "Review drawings, inspect barriers, identify sleeves, use approved firestop systems, and document every penetration.",
    conditions: [],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
    ],
  },

  {
    id: "medical.mistake.networkSegmentation",
    title: "Combining clinical and nonclinical systems",
    description:
      "Clinical devices, medical equipment, guest Wi-Fi, cameras, administrative systems, and vendor equipment may have different security and reliability requirements.",
    prevention:
      "Confirm healthcare IT requirements and design appropriate VLANs, firewall policies, authentication, and support boundaries.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "healthcare-network-segmentation",
      "medical-device-isolation",
      "cybersecurity-review",
    ],
  },

  {
    id: "medical.mistake.existingFiber",
    title: "Assuming existing fiber is reusable",
    description:
      "Existing fiber may have insufficient strands, incompatible connectors, undocumented routes, poor labeling, ownership restrictions, or failed test results.",
    prevention:
      "Inspect, document, and test existing fiber before relying on it in the final design.",
    conditions: [],
    ruleTags: [
      "fiber-testing",
      "existing-infrastructure",
      "backbone-review",
    ],
  },

  {
    id: "medical.mistake.wifiSurvey",
    title: "Skipping wireless survey and validation",
    description:
      "Lead-lined walls, MRI shielding, concrete, equipment, elevators, and clinical-device roaming requirements can cause unpredictable coverage.",
    prevention:
      "Perform predictive design, confirm device requirements, and validate coverage and roaming after installation.",
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
    ],
  },

  {
    id: "medical.mistake.cameraPrivacy",
    title: "Treating medical surveillance like normal commercial CCTV",
    description:
      "Camera placement near exam rooms, treatment areas, records, behavioral-health spaces, restrooms, and protected information may create serious privacy concerns.",
    prevention:
      "Define approved coverage areas, prohibited views, masking, signage, access permissions, and facility policy before selecting locations.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "patient-privacy",
      "camera-restrictions",
      "policy-review",
    ],
  },

  {
    id: "medical.mistake.cameraRetention",
    title: "Sizing storage before confirming retention policy",
    description:
      "Healthcare video retention may vary by camera group, facility policy, incident type, legal hold, or operational need.",
    prevention:
      "Confirm retention days, recording profiles, critical cameras, redundancy, and event-retention requirements before sizing storage.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retention-policy-review",
      "storage-sizing",
      "recording-profile-review",
    ],
  },

  {
    id: "medical.mistake.doorHardware",
    title: "Quoting access control without surveying openings",
    description:
      "Automatic doors, pharmacy cabinets, elevators, behavioral-health doors, storefront doors, and existing frames may require specialty hardware or integration.",
    prevention:
      "Inspect both sides of every opening and document hardware, frame, egress, closer, power transfer, interfaces, and pathway conditions.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "automatic-door-review",
      "cabinet-control-review",
    ],
  },

  {
    id: "medical.mistake.lifeSafety",
    title: "Ignoring life-safety and accessibility requirements",
    description:
      "Electrified locking, maglocks, delayed egress, automatic doors, controlled exits, and behavioral-health openings may require specialized approval and interfaces.",
    prevention:
      "Review egress, emergency release, fire-alarm integration, accessibility, occupancy, and authority requirements before final design.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "life-safety-review",
      "egress-review",
      "accessibility-review",
    ],
  },

  {
    id: "medical.mistake.mri",
    title: "Using standard installation methods in MRI environments",
    description:
      "Magnetic restrictions, shielding, approved materials, tools, pathways, and equipment-vendor requirements may prohibit normal installation methods.",
    prevention:
      "Coordinate with imaging vendors, facility engineering, and clinical leadership before selecting tools, hardware, routes, or device locations.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "MRI environment",
        ],
      },
    ],
    ruleTags: [
      "mri-review",
      "magnetic-environment",
      "vendor-coordination",
    ],
  },

  {
    id: "medical.mistake.shielding",
    title: "Penetrating imaging shielding without coordination",
    description:
      "Improper penetrations through lead-lined or shielded walls may compromise imaging performance or radiation protection.",
    prevention:
      "Use approved penetration details, coordinate shielding restoration, and confirm testing and documentation requirements.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "MRI environment",
          "X-ray or imaging room",
        ],
      },
    ],
    ruleTags: [
      "shielding-coordination",
      "penetration-control",
      "specialty-contractor-review",
    ],
  },

  {
    id: "medical.mistake.behavioralHealth",
    title: "Using standard devices in behavioral-health areas",
    description:
      "Exposed cables, standard mounting hardware, breakable devices, and normal door hardware may create ligature, tamper, vandal, or patient-safety risks.",
    prevention:
      "Use facility-approved ligature-resistant, tamper-resistant, vandal-resistant, and securely mounted solutions.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Behavioral health",
        ],
      },
    ],
    ruleTags: [
      "behavioral-health-review",
      "ligature-review",
      "patient-safety",
    ],
  },

  {
    id: "medical.mistake.pharmacy",
    title: "Underestimating pharmacy security requirements",
    description:
      "Pharmacies and medication areas may require access logs, controlled credentials, cabinet monitoring, surveillance, alerts, and specialized reporting.",
    prevention:
      "Confirm facility policy, controlled openings, audit requirements, camera restrictions, event retention, and administrative responsibilities.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
          "Medication storage",
          "Medication refrigeration",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security",
      "controlled-substance-review",
      "access-audit",
    ],
  },

  {
    id: "medical.mistake.power",
    title: "Failing to verify normal and backup power",
    description:
      "Network, security, communication, and selected clinical-support systems may require dedicated circuits, UPS capacity, or emergency-power coordination.",
    prevention:
      "Verify receptacles, circuits, grounding, UPS requirements, emergency-power availability, and electrical responsibilities.",
    conditions: [],
    ruleTags: [
      "power-verification",
      "ups-review",
      "electrical-coordination",
    ],
  },

  {
    id: "medical.mistake.vendorIntegration",
    title: "Assuming healthcare systems are openly compatible",
    description:
      "Medical devices, nurse call, imaging, laboratory, pharmacy, fire alarm, paging, phone, and EHR-related systems may use proprietary interfaces.",
    prevention:
      "Identify system owners, vendors, supported interfaces, licenses, testing responsibilities, and support boundaries before quoting integration.",
    conditions: [],
    ruleTags: [
      "vendor-integration",
      "compatibility-review",
      "scope-boundary-review",
    ],
  },

  {
    id: "medical.mistake.schedule",
    title: "Underestimating clinical scheduling constraints",
    description:
      "Patient appointments, procedures, licensing, inspections, equipment commissioning, and clinical cutovers may compress installation windows.",
    prevention:
      "Confirm dependencies, work windows, shutdowns, phased turnover, staffing, procurement, and testing before committing to completion.",
    conditions: [],
    ruleTags: [
      "clinical-cutover",
      "schedule-review",
      "procurement-review",
    ],
  },
];

export const medicalUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "medical.upsell.managedNetwork",
    title: "Managed Healthcare Network Support",
    description:
      "Provide remote monitoring, firmware management, configuration backup, alerting, switch health, firewall oversight, and priority support.",
    valueStatement:
      "Reduces downtime and improves visibility across clinical, administrative, guest, security, and connected-device networks.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "managed-services",
      "remote-monitoring",
      "recurring-revenue",
    ],
  },

  {
    id: "medical.upsell.wirelessValidation",
    title: "Healthcare Wireless Validation",
    description:
      "Perform post-installation testing for signal strength, interference, roaming, channel use, authentication, and critical-device performance.",
    valueStatement:
      "Confirms that wireless infrastructure supports real clinical workflows instead of relying on predictive coverage alone.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-validation",
      "clinical-roaming",
      "quality-assurance",
    ],
  },

  {
    id: "medical.upsell.networkAccessControl",
    title: "Network Access Control",
    description:
      "Add device profiling, authentication, policy enforcement, segmentation, and visibility for managed and unmanaged devices.",
    valueStatement:
      "Improves control over medical devices, vendor equipment, guest systems, and unknown endpoints.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-access-control",
      "device-visibility",
      "cybersecurity",
    ],
  },

  {
    id: "medical.upsell.failoverInternet",
    title: "Backup Internet Connectivity",
    description:
      "Add cellular or secondary-provider failover for critical cloud, communications, access, and business systems.",
    valueStatement:
      "Helps preserve operations when the primary internet connection fails.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "internet-failover",
      "business-continuity",
      "network-resilience",
    ],
  },

  {
    id: "medical.upsell.cloudVideo",
    title: "Cloud Video Backup",
    description:
      "Add cloud retention for selected entrances, pharmacies, medication areas, parking, or other approved critical cameras.",
    valueStatement:
      "Protects important footage against onsite recorder failure, theft, or damage.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cloud-video",
      "redundancy",
      "recurring-revenue",
    ],
  },

  {
    id: "medical.upsell.videoAnalytics",
    title: "Healthcare Video Analytics",
    description:
      "Add approved analytics such as intrusion detection, people counting, loitering, perimeter alerts, object detection, and occupancy insights.",
    valueStatement:
      "Improves security awareness and operational visibility without relying solely on continuous live monitoring.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "video-analytics",
      "operational-intelligence",
      "security-monitoring",
    ],
  },

  {
    id: "medical.upsell.mobileCredentials",
    title: "Mobile and Role-Based Credentials",
    description:
      "Provide managed mobile credentials and role-based access for staff, providers, contractors, pharmacy personnel, and administrators.",
    valueStatement:
      "Reduces physical key management while improving auditability and access control.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "mobile-credentials",
      "role-based-access",
      "credential-management",
    ],
  },

  {
    id: "medical.upsell.pharmacyAudit",
    title: "Pharmacy Access Audit Package",
    description:
      "Add detailed access logs, forced-door alerts, held-door alerts, scheduled reports, cabinet monitoring, and remote administration.",
    valueStatement:
      "Improves accountability and event review for medication and controlled-storage areas.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
          "Medication storage",
          "Medication refrigeration",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security",
      "access-audit",
      "event-reporting",
    ],
  },

  {
    id: "medical.upsell.staffDuress",
    title: "Staff Duress System",
    description:
      "Add fixed or mobile duress devices for reception, pharmacy, behavioral-health, exam, treatment, and isolated staff areas.",
    valueStatement:
      "Provides faster assistance during threatening, unsafe, or emergency situations.",
    conditions: [],
    ruleTags: [
      "staff-duress",
      "employee-safety",
      "clinical-communication",
    ],
  },

  {
    id: "medical.upsell.massNotification",
    title: "Emergency Notification Integration",
    description:
      "Add coordinated emergency messaging through paging, mobile alerts, desktop notifications, visual indicators, and supported system integrations.",
    valueStatement:
      "Improves communication speed and consistency during emergencies.",
    conditions: [],
    ruleTags: [
      "emergency-notification",
      "mass-notification",
      "life-safety-coordination",
    ],
  },

  {
    id: "medical.upsell.preventiveMaintenance",
    title: "Preventive Maintenance Plan",
    description:
      "Provide scheduled camera cleaning, network health checks, UPS testing, access-control inspections, firmware management, communication testing, and documentation reviews.",
    valueStatement:
      "Reduces unexpected failures and keeps critical systems reliable.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "service-contract",
      "recurring-revenue",
    ],
  },

  {
    id: "medical.upsell.configurationBackup",
    title: "Secure Configuration Backup",
    description:
      "Maintain encrypted backups of network, access-control, camera, wireless, firewall, and communication-system configurations.",
    valueStatement:
      "Speeds recovery after equipment failure, configuration loss, or replacement.",
    conditions: [],
    ruleTags: [
      "configuration-backup",
      "disaster-recovery",
      "managed-services",
    ],
  },

  {
    id: "medical.upsell.assetDocumentation",
    title: "Digital Asset and As-Built Documentation",
    description:
      "Provide searchable cable records, device inventories, rack elevations, photos, floor plans, IP information, warranty details, and testing results.",
    valueStatement:
      "Makes future service, compliance reviews, upgrades, and troubleshooting faster and more accurate.",
    conditions: [],
    ruleTags: [
      "asset-documentation",
      "as-built",
      "serviceability",
    ],
  },

  {
    id: "medical.upsell.futureExpansion",
    title: "Future Clinical Expansion Capacity",
    description:
      "Reserve rack units, switch ports, PoE capacity, fiber strands, conduit, pathways, licenses, and spare cabling for future technology.",
    valueStatement:
      "Reduces future upgrade costs and limits disruption to patient-care operations.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
    ],
  },
];

export const medicalStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "medical.standard.tia568",
    title: "ANSI/TIA-568",
    reference:
      "Commercial Building Telecommunications Cabling Standard",
    relevance:
      "Supports structured cabling topology, performance, termination, installation, and testing.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "commercial-standard",
    ],
  },

  {
    id: "medical.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Supports telecom rooms, pathways, conduit, sleeves, routing, and equipment-space planning.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
      "telecom-spaces",
    ],
  },

  {
    id: "medical.standard.tia606",
    title: "ANSI/TIA-606",
    reference:
      "Administration Standard for Telecommunications Infrastructure",
    relevance:
      "Supports consistent labeling, records, cable administration, and infrastructure documentation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
    ],
  },

  {
    id: "medical.standard.tia607",
    title: "ANSI/TIA-607",
    reference:
      "Telecommunications Bonding and Grounding",
    relevance:
      "Supports bonding and grounding for telecom racks, equipment, pathways, and infrastructure.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "grounding",
      "bonding",
    ],
  },

  {
    id: "medical.standard.tia1179",
    title: "ANSI/TIA-1179",
    reference:
      "Healthcare Facility Telecommunications Infrastructure Standard",
    relevance:
      "Provides healthcare-specific telecommunications guidance for cabling, spaces, density, systems, and clinical environments.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "healthcare-telecommunications",
      "clinical-infrastructure",
    ],
  },

  {
    id: "medical.standard.nec",
    title: "NFPA 70",
    reference:
      "National Electrical Code",
    relevance:
      "Applies to low-voltage cabling, pathways, separation, grounding, environmental conditions, and installation methods as adopted locally.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
      "installation-compliance",
    ],
  },

  {
    id: "medical.standard.nfpa99",
    title: "NFPA 99",
    reference:
      "Health Care Facilities Code",
    relevance:
      "Relevant to electrical systems, emergency power, medical-gas coordination, communication, risk categories, and healthcare facility infrastructure.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "healthcare-facilities-code",
      "clinical-safety",
      "medical-gas-review",
    ],
  },

  {
    id: "medical.standard.nfpa101",
    title: "NFPA 101",
    reference:
      "Life Safety Code",
    relevance:
      "Relevant to occupancy, egress, controlled exits, electrified locking, smoke compartments, and life-safety coordination.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "life-safety",
      "egress",
      "smoke-compartment",
    ],
  },

  {
    id: "medical.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Relevant when access control, emergency notification, paging, duress, door release, or other systems interface with fire alarm.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "fire-alarm-interface",
      "emergency-notification",
      "life-safety",
    ],
  },

  {
    id: "medical.standard.ada",
    title: "ADA Standards",
    reference:
      "Americans with Disabilities Act Accessibility Standards",
    relevance:
      "Relevant to door operation, mounting heights, controls, communication devices, clearances, and accessible interfaces.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "accessibility",
      "mounting-height",
    ],
  },

  {
    id: "medical.standard.hipaa",
    title: "HIPAA Administrative, Physical, and Technical Safeguards",
    reference:
      "Health Insurance Portability and Accountability Act safeguards",
    relevance:
      "May affect access, privacy, documentation, network security, device management, auditability, and protected-information handling.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "hipaa-coordination",
      "patient-privacy",
      "security-safeguards",
    ],
  },

  {
    id: "medical.standard.fgi",
    title: "FGI Guidelines",
    reference:
      "Facility Guidelines Institute Guidelines for Design and Construction",
    relevance:
      "May inform healthcare planning, clinical environments, room requirements, safety, and infrastructure coordination.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "healthcare-design",
      "facility-guidelines",
    ],
  },

  {
    id: "medical.standard.localBuilding",
    title: "Applicable Building and Fire Codes",
    reference:
      "Locally adopted building, fire, electrical, mechanical, and healthcare regulations",
    relevance:
      "May affect pathways, penetrations, smoke barriers, occupancy, access control, mounting, inspections, and specialty clinical work.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "building-code",
      "fire-code",
      "ahj-review",
    ],
  },

  {
    id: "medical.standard.bicsi",
    title: "BICSI Healthcare and Telecommunications Best Practices",
    reference:
      "BICSI design and installation guidance",
    relevance:
      "Supports healthcare telecom spaces, pathways, cabling, testing, grounding, administration, and installation-quality practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
      "healthcare-telecommunications",
    ],
  },
];
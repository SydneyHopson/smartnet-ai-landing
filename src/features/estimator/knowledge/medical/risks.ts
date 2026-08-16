import type { PlaybookRisk } from "../playbook";

export const medicalRisks: PlaybookRisk[] = [
  {
    id: "medical.activeOperationsRisk",
    title: "Active clinical operations may reduce installation productivity",
    description:
      "Patient care, provider schedules, imaging use, pharmacy activity, laboratory work, and restricted clinical areas may require phased work, escorts, containment, repeated mobilization, or after-hours installation.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "clinical-operations",
      "productivity-review",
      "work-zone-coordination",
    ],
  },

  {
    id: "medical.infectionControlRisk",
    title: "Infection-control requirements may significantly affect scope",
    description:
      "Ceiling access, drilling, wall openings, dust, debris, and equipment staging may require containment barriers, HEPA filtration, negative air, daily cleaning, specialized PPE, or formal infection-control approval.",
    severity: "critical",
    conditions: [],
    ruleTags: [
      "infection-control",
      "dust-containment",
      "clinical-safety",
      "labor-review",
    ],
  },

  {
    id: "medical.patientPrivacyRisk",
    title: "Patient privacy restrictions may limit access and documentation",
    description:
      "Protected health information, patient-identifiable information, active treatment areas, photography restrictions, and escorted-access requirements may limit work locations, documentation, scheduling, and camera placement.",
    severity: "critical",
    conditions: [],
    ruleTags: [
      "patient-privacy",
      "hipaa-coordination",
      "restricted-access",
      "photo-restriction",
    ],
  },

  {
    id: "medical.afterHoursRisk",
    title: "Restricted clinical work windows may increase cost",
    description:
      "After-hours, overnight, weekend, shutdown, or between-patient work may increase labor rates, mobilizations, supervision, containment duration, and project schedule risk.",
    severity: "high",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "clinical-shutdown",
      "labor-premium-review",
      "schedule-risk",
    ],
  },

  {
    id: "medical.unknownCeilingRisk",
    title: "Ceiling and above-ceiling conditions are unknown",
    description:
      "Unknown ceiling type, access, plenum conditions, clinical restrictions, utilities, and pathway availability can materially change labor, containment, routing, and installation methods.",
    severity: "medium",
    conditions: [
      {
        field: "property.ceilingType",
        operator: "equals",
        value: "unknown",
      },
    ],
    ruleTags: [
      "ceiling-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "medical.sealedCeilingRisk",
    title: "Sealed clinical ceilings may restrict installation access",
    description:
      "Sealed ceilings in procedure, sterile, imaging, pharmacy, or specialty areas may require approved access methods, surface pathways, specialty containment, or coordination with facility contractors.",
    severity: "high",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "includes",
        value: [
          "Sealed clinical ceiling",
          "No ceiling access",
        ],
      },
    ],
    ruleTags: [
      "sealed-ceiling",
      "clinical-pathway-review",
      "raceway-review",
      "labor-review",
    ],
  },

  {
    id: "medical.highCeilingRisk",
    title: "Elevated mounting locations require specialized access",
    description:
      "High lobbies, atriums, exterior walls, parking areas, and clinical spaces may require lifts, scaffolding, additional crew members, floor protection, and controlled work zones.",
    severity: "high",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "greater_than_or_equal",
        value: 14,
      },
    ],
    ruleTags: [
      "high-ceiling",
      "lift-review",
      "crew-size-review",
      "floor-protection-review",
    ],
  },

  {
    id: "medical.noPathwayRisk",
    title: "No usable cable pathway has been confirmed",
    description:
      "A lack of accessible ceiling space, conduit, sleeves, cable tray, or approved routes may require new conduit, raceway, coring, fire stopping, clinical-area access, or revised device locations.",
    severity: "high",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "includes",
        value: [
          "No known pathway",
        ],
      },
    ],
    ruleTags: [
      "new-pathway-required",
      "conduit-review",
      "raceway-review",
      "clinical-routing",
    ],
  },

  {
    id: "medical.unknownPathwayRisk",
    title: "Cable pathway conditions are unknown",
    description:
      "Unknown pathway capacity, accessibility, fire ratings, infection-control exposure, utilities, and routing may significantly affect labor, materials, and project duration.",
    severity: "medium",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "pathway-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "medical.longCableRunRisk",
    title: "Cable distance may exceed copper Ethernet limits",
    description:
      "Long routes between telecom rooms, floors, buildings, parking areas, imaging zones, or remote clinical spaces may require fiber, additional network enclosures, or revised equipment locations.",
    severity: "high",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "greater_than",
        value: 295,
      },
    ],
    ruleTags: [
      "long-cable-run",
      "fiber-required-review",
      "idf-review",
      "distance-limitation",
    ],
  },

  {
    id: "medical.unknownCableDistanceRisk",
    title: "Cable-route distances have not been measured",
    description:
      "Unknown pathway distances may conceal copper distance violations, underestimated cable quantities, additional telecom-space needs, or fiber-backbone requirements.",
    severity: "medium",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "distance-measurement-required",
      "fiber-review",
      "material-quantity-review",
    ],
  },

  {
    id: "medical.existingFiberRisk",
    title: "Existing fiber may not be reusable",
    description:
      "Existing fiber may have incompatible type, insufficient strands, damaged connectors, unknown ownership, poor labeling, undocumented routes, or failed test results.",
    severity: "high",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "existing-fiber-verification",
      "fiber-testing",
      "strand-count-review",
      "connector-review",
    ],
  },

  {
    id: "medical.firestopRisk",
    title: "Rated and smoke-barrier penetrations require approved fire stopping",
    description:
      "Healthcare facilities may contain fire walls, smoke barriers, shafts, floors, and compartments requiring listed firestop systems, labels, documentation, inspections, and facility-specific procedures.",
    severity: "critical",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
      "inspection-review",
    ],
  },

  {
    id: "medical.rackCapacityRisk",
    title: "Existing rack capacity may be insufficient",
    description:
      "Existing telecom spaces may lack rack units, switch ports, PoE capacity, power, cooling, grounding, cable management, physical security, or future expansion capacity.",
    severity: "high",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-review",
      "power-review",
      "cooling-review",
      "switch-capacity-review",
    ],
  },

  {
    id: "medical.noRackRisk",
    title: "A new secure rack or enclosure may be required",
    description:
      "Facilities without suitable telecom spaces may require a secured enclosure, patch panels, switches, UPS, power, cooling, grounding, environmental controls, and restricted access.",
    severity: "medium",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "new-rack-review",
      "equipment-security",
      "electrical-coordination",
      "room-readiness",
    ],
  },

  {
    id: "medical.powerRisk",
    title: "Electrical power availability is unverified",
    description:
      "Insufficient or non-backed-up power near racks, controllers, recorders, communication systems, access-control power supplies, and clinical-support devices may require electrical work outside the low-voltage scope.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "power-verification-required",
      "electrical-coordination",
      "ups-review",
      "scope-boundary-review",
    ],
  },

  {
    id: "medical.networkSegmentationRisk",
    title: "Clinical and business systems may require network isolation",
    description:
      "Combining clinical devices, administrative systems, guest Wi-Fi, cameras, access control, building systems, and vendor equipment can create cybersecurity, reliability, support, and compliance concerns.",
    severity: "critical",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
      {
        field: "network.vlanRequired",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "healthcare-network-segmentation",
      "medical-device-isolation",
      "cybersecurity-review",
      "vlan-review",
    ],
  },

  {
    id: "medical.vendorIntegrationRisk",
    title: "Healthcare systems may require proprietary vendor coordination",
    description:
      "Medical devices, EHR systems, imaging, laboratory, pharmacy, nurse-call, phone, fire-alarm, paging, duress, and building systems may have proprietary requirements and restricted support boundaries.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "vendor-integration",
      "clinical-system-coordination",
      "compatibility-review",
      "scope-boundary-review",
    ],
  },

  {
    id: "medical.guestWifiRisk",
    title: "Guest Wi-Fi may affect security and bandwidth",
    description:
      "Patient and visitor devices should be separated from clinical, administrative, medical-device, security, and building-system networks.",
    severity: "high",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "bandwidth-review",
      "cybersecurity-review",
    ],
  },

  {
    id: "medical.rfObstructionRisk",
    title: "Healthcare construction may disrupt wireless coverage",
    description:
      "Lead-lined walls, imaging shielding, concrete, masonry, metal cabinets, equipment, elevators, and specialty rooms may block, absorb, or reflect wireless signals.",
    severity: "high",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "shielded-room-review",
      "wireless-survey",
      "interference-review",
    ],
  },

  {
    id: "medical.clinicalRoamingRisk",
    title: "Clinical mobile workflows require validated Wi-Fi roaming",
    description:
      "Tablets, mobile carts, scanners, voice devices, and medical systems may experience dropped sessions without proper authentication, cell overlap, channel planning, device compatibility, and validation.",
    severity: "high",
    conditions: [
      {
        field: "wifi.weakAreas",
        operator: "is_known",
      },
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "clinical-roaming",
      "wireless-validation",
      "device-compatibility-review",
      "mobility-review",
    ],
  },

  {
    id: "medical.mriRisk",
    title: "MRI environments require specialized review",
    description:
      "Magnetic-field restrictions, shielding, approved tools, material selection, device placement, cable pathways, equipment shutdowns, and vendor coordination may be required.",
    severity: "critical",
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
      "shielding-coordination",
      "vendor-coordination",
    ],
  },

  {
    id: "medical.imagingShieldingRisk",
    title: "Imaging-room shielding may be compromised by penetrations",
    description:
      "New cable penetrations through lead-lined or shielded assemblies may require approved methods, shielding restoration, testing, and imaging-vendor coordination.",
    severity: "critical",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "X-ray or imaging room",
          "MRI environment",
        ],
      },
    ],
    ruleTags: [
      "shielding-review",
      "penetration-control",
      "imaging-coordination",
      "specialty-contractor-review",
    ],
  },

  {
    id: "medical.sterileAreaRisk",
    title: "Sterile and procedure areas may require strict installation controls",
    description:
      "Procedure rooms, surgery spaces, clean areas, and sterile environments may require approved materials, containment, shutdowns, cleaning, environmental controls, and facility infection-prevention approval.",
    severity: "critical",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Procedure or surgery room",
          "Sterile or clean area",
        ],
      },
    ],
    ruleTags: [
      "sterile-area-review",
      "infection-control",
      "approved-materials",
      "clinical-shutdown",
    ],
  },

  {
    id: "medical.behavioralHealthRisk",
    title: "Behavioral-health spaces require patient-safety review",
    description:
      "Device placement, cabling, mounting hardware, cameras, access control, intercoms, and duress systems may require ligature-resistant, tamper-resistant, vandal-resistant, and privacy-conscious design.",
    severity: "critical",
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
      "tamper-resistance",
      "patient-safety",
    ],
  },

  {
    id: "medical.pharmacyRisk",
    title: "Pharmacy and medication areas may require enhanced security",
    description:
      "Controlled substances, medication storage, refrigeration, cabinet access, audit trails, event reporting, surveillance, and restricted credentials may require specialized design and policy coordination.",
    severity: "critical",
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
      "camera-policy-review",
    ],
  },

  {
    id: "medical.labRisk",
    title: "Laboratory environments may require specialty coordination",
    description:
      "Hazardous materials, clean zones, biological samples, specialized equipment, restricted access, temperature controls, and contamination procedures may affect installation methods and device selection.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Laboratory",
          "Hazardous materials area",
        ],
      },
    ],
    ruleTags: [
      "laboratory-review",
      "hazardous-materials",
      "restricted-access",
      "environmental-rating-review",
    ],
  },

  {
    id: "medical.medicalGasRisk",
    title: "Medical-gas and oxygen areas require coordination",
    description:
      "Drilling, coring, device placement, power, pathways, and work practices near oxygen or medical-gas systems may require facility approval, utility locating, shutdown procedures, and specialty safety controls.",
    severity: "critical",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Oxygen or medical gas area",
        ],
      },
    ],
    ruleTags: [
      "medical-gas-review",
      "oxygen-safety",
      "utility-coordination",
      "permit-review",
    ],
  },

  {
    id: "medical.cameraPrivacyRisk",
    title: "Healthcare camera placement may violate privacy expectations",
    description:
      "Exam rooms, treatment areas, procedure rooms, behavioral-health spaces, medical records, patient information, restrooms, and changing areas may require exclusion, masking, signage, policy approval, or legal review.",
    severity: "critical",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "patient-privacy",
      "camera-restrictions",
      "privacy-masking",
      "policy-review",
    ],
  },

  {
    id: "medical.lowLightCameraRisk",
    title: "Lighting conditions may reduce camera performance",
    description:
      "Bright glass entrances, dim corridors, reflective surfaces, nighttime parking, headlights, and changing lobby lighting may require specialized cameras or revised placement.",
    severity: "high",
    conditions: [
      {
        field: "assessment.risks",
        operator: "includes",
        value: [
          "low light",
          "bright glass",
          "headlights",
          "reflections",
          "changing lighting",
        ],
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
      "infrared-review",
    ],
  },

  {
    id: "medical.videoRetentionRisk",
    title: "Video retention may require substantial storage",
    description:
      "Large camera counts, high resolution, continuous recording, long retention, legal-hold requirements, and critical-area redundancy may significantly increase storage and bandwidth needs.",
    severity: "high",
    conditions: [
      {
        field: "cameras.recordingDays",
        operator: "greater_than_or_equal",
        value: 30,
      },
    ],
    ruleTags: [
      "storage-sizing-review",
      "retention-policy-review",
      "bandwidth-review",
      "redundancy-review",
    ],
  },

  {
    id: "medical.unknownRetentionRisk",
    title: "Video retention has not been defined",
    description:
      "Without a confirmed retention policy, recorder capacity, storage pricing, legal review, and event-retention requirements remain preliminary.",
    severity: "medium",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "cameras.recordingDays",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "retention-required",
      "storage-sizing-review",
      "estimate-confidence-review",
    ],
  },

  {
    id: "medical.accessHardwareRisk",
    title: "Existing openings may not support proposed access hardware",
    description:
      "Automatic doors, pharmacy cabinets, storefront doors, behavioral-health doors, gates, elevators, hollow-metal frames, and wood doors may require specialty hardware, fabrication, or coordination with door contractors.",
    severity: "high",
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
      "fabrication-review",
    ],
  },

  {
    id: "medical.lifeSafetyRisk",
    title: "Access-control design may affect egress and life safety",
    description:
      "Electrified locks, maglocks, delayed egress, automatic doors, pharmacy security, behavioral-health controls, and controlled exits may require fire-alarm interfaces, emergency release, inspections, and authority approval.",
    severity: "critical",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "life-safety-review",
      "egress-review",
      "fire-alarm-interface-review",
      "ahj-review",
    ],
  },

  {
    id: "medical.accessAuditRisk",
    title: "Audit and reporting requirements may increase system complexity",
    description:
      "Pharmacy events, controlled-substance access, role-based permissions, forced-door alerts, remote management, and compliance reporting may require additional licensing, storage, configuration, and identity integration.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "identity-integration-review",
      "licensing-review",
    ],
  },

  {
    id: "medical.communicationIntegrationRisk",
    title: "Clinical communication systems may require specialty integration",
    description:
      "Paging, intercom, staff duress, patient assistance, nurse call, emergency notification, phones, mobile devices, and room-status systems may require proprietary interfaces, code review, workflow analysis, and vendor testing.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "healthcare-communications",
      "vendor-integration",
      "clinical-workflow",
      "specialty-system-review",
    ],
  },

  {
    id: "medical.permitRisk",
    title: "Permit and approval requirements are unverified",
    description:
      "Access control, fire-alarm interfaces, rated penetrations, healthcare communication systems, imaging areas, structural mounting, and specialty environments may require permits, engineering, inspections, or facility approval.",
    severity: "high",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-review",
      "inspection-review",
      "healthcare-approval",
      "engineering-review",
    ],
  },

  {
    id: "medical.scheduleRisk",
    title: "Clinical schedules may compress installation and cutover",
    description:
      "Patient appointments, procedures, inspections, licensing, equipment commissioning, staff training, and system migrations may require larger crews, overtime, phased turnover, and carefully controlled outages.",
    severity: "high",
    conditions: [
      {
        field: "installation.estimatedDurationDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "clinical-cutover",
      "schedule-review",
      "crew-scaling",
      "shutdown-coordination",
    ],
  },

  {
    id: "medical.documentRisk",
    title: "Incomplete healthcare documentation may reduce estimate accuracy",
    description:
      "Missing floor plans, reflected ceiling plans, shielding details, infection-control requirements, network diagrams, door schedules, equipment plans, and facility standards may lead to routing, quantity, and coordination changes.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "document-review",
      "walkthrough-required",
      "facility-standard-review",
      "estimate-confidence-review",
    ],
  },

  {
    id: "medical.procurementRisk",
    title: "Specialty healthcare equipment may have extended lead times",
    description:
      "Environment-rated devices, behavioral-health hardware, access-control components, fiber equipment, enterprise switches, communication systems, and approved clinical products may have long lead times or substitution restrictions.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "procurement-risk",
      "lead-time-review",
      "approved-product-review",
      "schedule-risk",
    ],
  },
];
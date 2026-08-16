import type {
  PlaybookLaborProfile,
  PlaybookMaterial,
} from "../playbook";

export const medicalCommonMaterials: PlaybookMaterial[] = [
  {
    id: "medical.material.cat6",
    category: "cable",
    name: "Category 6 Plenum Cable",
    description:
      "Commercial horizontal cabling for cameras, access points, access control, workstations, phones, clinical devices, and network endpoints.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6",
      "horizontal-cabling",
    ],
  },

  {
    id: "medical.material.cat6a",
    category: "cable",
    name: "Category 6A Plenum Cable",
    description:
      "Higher-performance cabling for multi-gigabit networking, higher-power PoE, dense wireless deployments, and future expansion.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6a",
      "future-ready",
      "higher-power-poe",
    ],
  },

  {
    id: "medical.material.fiber",
    category: "fiber",
    name: "Fiber-Optic Backbone Cable",
    description:
      "Single-mode or multimode fiber between MDFs, IDFs, floors, buildings, and distant clinical areas.",
    unit: "foot",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "fiber-backbone",
      "long-cable-run",
    ],
  },

  {
    id: "medical.material.fiberEnclosure",
    category: "fiber",
    name: "Fiber Distribution Enclosure",
    description:
      "Rack-mounted or wall-mounted enclosure for fiber termination, splicing, adapters, and cable management.",
    unit: "each",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "fiber-enclosure",
      "backbone-termination",
    ],
  },

  {
    id: "medical.material.fiberPatchCord",
    category: "fiber",
    name: "Fiber Patch Cord",
    description:
      "Factory-terminated fiber jumper selected for the required fiber type, connector, and equipment interface.",
    unit: "each",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "fiber-patching",
      "connector-compatibility",
    ],
  },

  {
    id: "medical.material.patchPanel",
    category: "network",
    name: "Rack-Mounted Patch Panel",
    description:
      "Structured cabling termination for clinical, administrative, security, wireless, voice, and building-system connections.",
    unit: "each",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "patch-panel",
      "structured-cabling",
    ],
  },

  {
    id: "medical.material.managedPoeSwitch",
    category: "network",
    name: "Managed PoE Switch",
    description:
      "Managed switch supporting VLANs, PoE devices, monitoring, secure administration, resilient uplinks, and future capacity.",
    unit: "each",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "managed-switch",
      "poe",
      "vlan-ready",
    ],
  },

  {
    id: "medical.material.firewall",
    category: "network",
    name: "Commercial Firewall or Security Gateway",
    description:
      "Security appliance supporting segmented clinical, administrative, guest, security, vendor, and medical-device networks.",
    unit: "each",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firewall",
      "network-segmentation",
      "cybersecurity",
    ],
  },

  {
    id: "medical.material.networkRack",
    category: "rack",
    name: "Secure Network Rack",
    description:
      "Lockable rack for switches, patch panels, fiber shelves, firewalls, controllers, recorders, UPS units, and cable management.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "secure-rack",
      "equipment-organization",
      "physical-security",
    ],
  },

  {
    id: "medical.material.wallEnclosure",
    category: "rack",
    name: "Lockable Wall-Mount Enclosure",
    description:
      "Secure enclosure for remote switches, fiber termination, controllers, and small telecom locations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "wall-enclosure",
      "remote-equipment",
      "physical-security",
    ],
  },

  {
    id: "medical.material.verticalManager",
    category: "rack",
    name: "Vertical Cable Manager",
    description:
      "Rack-mounted cable management for organized patch cords and equipment connections.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "cable-management",
      "serviceability",
    ],
  },

  {
    id: "medical.material.horizontalManager",
    category: "rack",
    name: "Horizontal Cable Manager",
    description:
      "Rack-mounted cable management between patch panels and active equipment.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "cable-management",
      "serviceability",
    ],
  },

  {
    id: "medical.material.jHooks",
    category: "support",
    name: "Plenum-Rated J-Hooks",
    description:
      "Independent cable supports for accessible above-ceiling pathways.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "j-hooks",
      "cable-support",
    ],
  },

  {
    id: "medical.material.cableTray",
    category: "pathway",
    name: "Cable Tray or Basket Tray",
    description:
      "Structured pathway for larger cable bundles in corridors, telecom spaces, and approved clinical routes.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cable-tray",
      "pathway",
    ],
  },

  {
    id: "medical.material.emt",
    category: "pathway",
    name: "EMT Conduit",
    description:
      "Metal conduit for mechanical protection, exposed routes, restricted spaces, specialty rooms, and facility-required pathways.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "emt",
      "conduit",
      "mechanical-protection",
    ],
  },

  {
    id: "medical.material.surfaceRaceway",
    category: "pathway",
    name: "Surface Raceway",
    description:
      "Finished pathway for rooms or corridors where concealed routing is unavailable or prohibited.",
    unit: "foot",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "not_equals",
        value: "hidden",
      },
    ],
    ruleTags: [
      "surface-raceway",
      "finished-space-routing",
    ],
  },

  {
    id: "medical.material.sleeves",
    category: "pathway",
    name: "Cable Sleeves and Bushings",
    description:
      "Protected wall, floor, and ceiling penetrations for telecommunications cabling.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "sleeve",
      "penetration-protection",
    ],
  },

  {
    id: "medical.material.firestop",
    category: "firestop",
    name: "Approved Firestop System",
    description:
      "Listed system for fire-rated and smoke-rated penetrations, including labels and documentation.",
    unit: "penetration",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestop",
      "smoke-compartment",
      "rated-penetration",
    ],
  },

  {
    id: "medical.material.labels",
    category: "labeling",
    name: "Machine-Generated Labels",
    description:
      "Permanent labels for cables, patch panels, racks, devices, controllers, power supplies, and controlled openings.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
    ],
  },

  {
    id: "medical.material.camera",
    category: "camera",
    name: "Commercial IP Camera",
    description:
      "PoE camera selected for approved entrance, hallway, pharmacy, parking, reception, or restricted-area coverage.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ip-camera",
      "medical-surveillance",
      "privacy-review",
    ],
  },

  {
    id: "medical.material.vandalCamera",
    category: "camera",
    name: "Vandal-Resistant IP Camera",
    description:
      "Tamper-resistant camera for behavioral-health, exterior, public, or elevated-risk areas where approved.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Behavioral health",
        ],
      },
    ],
    ruleTags: [
      "vandal-resistant-camera",
      "behavioral-health-review",
      "tamper-resistance",
    ],
  },

  {
    id: "medical.material.cameraMount",
    category: "hardware",
    name: "Camera Mounting Hardware",
    description:
      "Junction boxes, pendant mounts, wall arms, back boxes, anchors, and specialty mounting hardware.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-mount",
      "mounting-hardware",
    ],
  },

  {
    id: "medical.material.nvr",
    category: "camera",
    name: "Network Video Recorder",
    description:
      "Recorder sized for approved camera quantity, retention, recording profile, remote access, security, and expansion.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "nvr",
      "video-storage",
    ],
  },

  {
    id: "medical.material.storageDrive",
    category: "camera",
    name: "Surveillance Storage Drive",
    description:
      "Video-rated storage media for continuous or event-based recording.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "surveillance-storage",
      "retention-sizing",
    ],
  },

  {
    id: "medical.material.accessPoint",
    category: "wifi",
    name: "Enterprise Wireless Access Point",
    description:
      "Managed access point for clinical, administrative, guest, voice, mobile-device, and vendor wireless networks.",
    unit: "each",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "enterprise-wifi",
      "access-point",
      "clinical-roaming",
    ],
  },

  {
    id: "medical.material.outdoorAccessPoint",
    category: "wifi",
    name: "Outdoor Wireless Access Point",
    description:
      "Weather-rated access point for parking, exterior staff areas, ambulance approaches, courtyards, and outdoor coverage zones.",
    unit: "each",
    conditions: [
      {
        field: "wifi.outdoorCoverage",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "outdoor-wifi",
      "weather-rated-access-point",
    ],
  },

  {
    id: "medical.material.accessReader",
    category: "access_control",
    name: "Access-Control Reader",
    description:
      "Card, fob, mobile, PIN, or biometric reader for staff, pharmacy, records, laboratory, imaging, and restricted-area access.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-reader",
      "credential-management",
      "role-based-access",
    ],
  },

  {
    id: "medical.material.electricLock",
    category: "access_control",
    name: "Electric Locking Hardware",
    description:
      "Electric strike, maglock, electrified trim, or specialty lock selected for the controlled opening and life-safety requirements.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "electric-lock",
      "door-hardware",
      "life-safety-review",
    ],
  },

  {
    id: "medical.material.doorPositionSwitch",
    category: "access_control",
    name: "Door Position Switch",
    description:
      "Contact for monitoring door status, forced-door events, and held-open conditions.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-position",
      "access-monitoring",
    ],
  },

  {
    id: "medical.material.requestToExit",
    category: "access_control",
    name: "Request-to-Exit Device",
    description:
      "Motion sensor, push button, or approved hardware interface for controlled egress.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "request-to-exit",
      "life-safety",
    ],
  },

  {
    id: "medical.material.accessController",
    category: "access_control",
    name: "Access-Control Controller",
    description:
      "Controller supporting readers, locks, schedules, credentials, audit events, alerts, and remote management.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-controller",
      "enterprise-access",
      "access-audit",
    ],
  },

  {
    id: "medical.material.secureCabinetLock",
    category: "access_control",
    name: "Electronic Cabinet Lock",
    description:
      "Electronic locking hardware for medication cabinets, controlled storage, records, or specialty healthcare enclosures.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
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
      "cabinet-control",
      "pharmacy-security",
      "controlled-substance-review",
    ],
  },

  {
    id: "medical.material.duressButton",
    category: "other",
    name: "Fixed Duress Button",
    description:
      "Fixed emergency-assistance device for reception, pharmacy, behavioral-health, exam, treatment, and isolated staff areas.",
    unit: "each",
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
    ],
  },

  {
    id: "medical.material.mobileDuress",
    category: "other",
    name: "Mobile Duress Device",
    description:
      "Portable staff-assistance device with location, alerting, or integration capabilities where supported.",
    unit: "each",
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
      "mobile-duress",
      "staff-safety",
      "clinical-communication",
    ],
  },

  {
    id: "medical.material.pagingSpeaker",
    category: "other",
    name: "Commercial Paging Speaker",
    description:
      "Ceiling or surface-mounted speaker for paging, announcements, emergency messaging, or clinical communication.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "paging-speaker",
      "healthcare-communications",
    ],
  },

  {
    id: "medical.material.intercomStation",
    category: "other",
    name: "Intercom Station",
    description:
      "Desk, wall, door, or clinical intercom endpoint for staff, visitor, patient, or secure-area communication.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "intercom",
      "clinical-communication",
    ],
  },

  {
    id: "medical.material.roomStatus",
    category: "other",
    name: "Room-Status Indicator",
    description:
      "Visual or networked indicator for room status, staff workflow, occupancy, or clinical communication.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "room-status",
      "clinical-workflow",
    ],
  },

  {
    id: "medical.material.ups",
    category: "power",
    name: "UPS Battery Backup",
    description:
      "Battery backup for network, camera, access-control, communication, and selected clinical-support equipment.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "medical.material.surgeProtection",
    category: "power",
    name: "Network and Low-Voltage Surge Protection",
    description:
      "Protection for exterior cameras, access points, gates, remote devices, and outdoor copper routes.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "surge-protection",
      "exterior-equipment",
    ],
  },

  {
    id: "medical.material.ligatureResistantHardware",
    category: "hardware",
    name: "Ligature-Resistant Mounting Hardware",
    description:
      "Specialty mounting hardware for approved behavioral-health devices and patient-safety environments.",
    unit: "each",
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
      "ligature-resistant",
      "behavioral-health-review",
      "patient-safety",
    ],
  },

  {
    id: "medical.material.tamperEnclosure",
    category: "hardware",
    name: "Tamper-Resistant Equipment Enclosure",
    description:
      "Secure enclosure for exposed devices, controls, interfaces, power supplies, or communications equipment.",
    unit: "each",
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
      "tamper-resistant",
      "secure-enclosure",
      "behavioral-health-review",
    ],
  },

  {
    id: "medical.material.containment",
    category: "consumable",
    name: "Infection-Control Containment Materials",
    description:
      "Temporary barriers, HEPA equipment accessories, floor protection, sticky mats, disposable coverings, sealants, and cleaning supplies.",
    unit: "allowance",
    conditions: [],
    ruleTags: [
      "infection-control",
      "containment-materials",
      "clinical-safety",
    ],
  },

  {
    id: "medical.material.consumables",
    category: "consumable",
    name: "Installation Consumables",
    description:
      "Fasteners, anchors, bushings, hook-and-loop straps, connectors, sealant, cleaning materials, and minor mounting supplies.",
    unit: "allowance",
    conditions: [],
    ruleTags: [
      "installation-consumables",
      "material-allowance",
    ],
  },
];

export const medicalLaborProfiles: PlaybookLaborProfile[] = [
  {
    id: "medical.labor.small",
    name: "Small Medical Office Installation",
    description:
      "Typical installation for a physician office, dental practice, or small outpatient clinic with limited telecom spaces and moderate device counts.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 4,
    laborDrivers: [
      "Finished clinical spaces",
      "Patient-schedule coordination",
      "Ceiling access",
      "Infection-control precautions",
      "Small camera and Wi-Fi deployment",
      "Network rack cleanup",
      "After-hours scheduling",
    ],
    conditions: [
      {
        field: "property.squareFootage",
        operator: "less_than",
        value: 5000,
      },
    ],
    ruleTags: [
      "small-medical-project",
      "two-to-four-person-crew",
    ],
  },

  {
    id: "medical.labor.medium",
    name: "Outpatient Healthcare Installation",
    description:
      "Typical multi-system deployment for an urgent care, specialty clinic, imaging office, laboratory, or larger medical practice.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Multiple clinical zones",
      "Enterprise Wi-Fi",
      "Access control",
      "Camera privacy review",
      "Fiber backbone",
      "Fire and smoke barriers",
      "Infection-control containment",
      "After-hours work",
      "Testing and commissioning",
    ],
    conditions: [],
    ruleTags: [
      "medium-medical-project",
      "multi-system-installation",
    ],
  },

  {
    id: "medical.labor.large",
    name: "Large Healthcare Facility Installation",
    description:
      "Complex deployment for a large outpatient center, multi-floor clinic, ambulatory surgery center, or high-device-count healthcare environment.",
    typicalCrewSizeMin: 5,
    typicalCrewSizeMax: 10,
    laborDrivers: [
      "Multiple MDFs and IDFs",
      "Large fiber backbone",
      "High wireless-device density",
      "Clinical roaming",
      "Large camera count",
      "Complex access control",
      "Communication systems",
      "Multiple containment zones",
      "Phased turnover",
      "Compressed clinical schedule",
      "Extensive closeout documentation",
    ],
    conditions: [
      {
        field: "property.squareFootage",
        operator: "greater_than_or_equal",
        value: 15000,
      },
    ],
    ruleTags: [
      "large-medical-project",
      "crew-scaling",
      "complex-installation",
    ],
  },

  {
    id: "medical.labor.operatingFacility",
    name: "Operating Clinical Facility Installation",
    description:
      "Phased, contained, escorted, or after-hours installation while patient care continues.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Patient-flow coordination",
      "Restricted work windows",
      "Repeated mobilization",
      "Dust containment",
      "Daily cleaning",
      "Escorted access",
      "Noise restrictions",
      "Temporary outages",
      "Above-ceiling permits",
      "Clinical shutdown coordination",
    ],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-medical-facility",
      "productivity-adjustment",
      "infection-control-labor",
    ],
  },

  {
    id: "medical.labor.imaging",
    name: "Imaging and Shielded-Area Installation",
    description:
      "Specialty installation involving MRI, X-ray, CT, lead-lined rooms, shielding, magnetic restrictions, or imaging-vendor coordination.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Approved tools and materials",
      "Magnetic restrictions",
      "Shielding penetrations",
      "Shielding restoration",
      "Imaging-vendor coordination",
      "Controlled shutdowns",
      "Specialty testing",
      "Restricted photography",
    ],
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
      "imaging-labor",
      "shielding-coordination",
      "specialty-installation",
    ],
  },

  {
    id: "medical.labor.behavioralHealth",
    name: "Behavioral-Health Specialty Installation",
    description:
      "Specialty installation requiring patient-safety, ligature, tamper-resistance, privacy, secure mounting, and staff-safety review.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Ligature-resistant hardware",
      "Tamper-resistant devices",
      "Secure enclosures",
      "Staff duress",
      "Camera restrictions",
      "Door-hardware coordination",
      "Patient-area access",
      "Clinical approval",
    ],
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
      "behavioral-health-labor",
      "patient-safety",
      "specialty-installation",
    ],
  },

  {
    id: "medical.labor.pharmacy",
    name: "Pharmacy and Medication-Security Installation",
    description:
      "Specialty work involving pharmacy access, controlled storage, medication refrigeration, cabinets, surveillance, and audit requirements.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Controlled opening survey",
      "Cabinet locking hardware",
      "Access audit configuration",
      "Camera privacy review",
      "Medication refrigeration",
      "Credential programming",
      "Event reporting",
      "Restricted work windows",
    ],
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
      "pharmacy-labor",
      "medication-security",
      "specialty-installation",
    ],
  },

  {
    id: "medical.labor.sterileArea",
    name: "Sterile and Procedure-Area Installation",
    description:
      "Installation requiring formal containment, approved materials, environmental controls, cleaning, and clinical shutdown coordination.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Containment setup",
      "HEPA filtration",
      "Negative air",
      "Approved materials",
      "Daily cleaning",
      "Sterile-area access",
      "Facility infection-prevention approval",
      "Controlled shutdowns",
    ],
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
      "sterile-area-labor",
      "infection-control",
      "specialty-installation",
    ],
  },
];
import type {
  PlaybookLaborProfile,
  PlaybookMaterial,
} from "../playbook";

export const restaurantCommonMaterials: PlaybookMaterial[] = [
  {
    id: "restaurant.material.cat6",
    category: "cable",
    name: "Category 6 Plenum Cable",
    description:
      "Commercial horizontal cabling for cameras, access points, point-of-sale devices, access control, and network endpoints.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6",
      "horizontal-cabling",
    ],
  },

  {
    id: "restaurant.material.cat6a",
    category: "cable",
    name: "Category 6A Plenum Cable",
    description:
      "Higher-performance structured cabling for multi-gigabit networking, higher-power PoE, and future expansion.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6a",
      "future-ready",
      "higher-power-poe",
    ],
  },

  {
    id: "restaurant.material.outdoorCable",
    category: "cable",
    name: "Outdoor-Rated Ethernet Cable",
    description:
      "UV-resistant and moisture-resistant cable for patios, drive-through lanes, exterior cameras, signs, and outdoor access points.",
    unit: "foot",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Exterior weather exposure",
        ],
      },
    ],
    ruleTags: [
      "outdoor-rated-cable",
      "exterior-installation",
    ],
  },

  {
    id: "restaurant.material.fiber",
    category: "fiber",
    name: "Fiber-Optic Backbone Cable",
    description:
      "Single-mode or multimode fiber for long-distance exterior routes, detached equipment, or remote network enclosures.",
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
    id: "restaurant.material.patchPanel",
    category: "network",
    name: "Rack-Mounted Patch Panel",
    description:
      "Structured cabling termination for organized network, camera, Wi-Fi, and restaurant-technology connections.",
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
    id: "restaurant.material.managedPoeSwitch",
    category: "network",
    name: "Managed PoE Switch",
    description:
      "Managed Ethernet switch supporting cameras, wireless access points, phones, access control, VLANs, monitoring, and remote support.",
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
    id: "restaurant.material.firewall",
    category: "network",
    name: "Commercial Firewall or Security Gateway",
    description:
      "Network-security appliance supporting VLAN separation, guest Wi-Fi, point-of-sale isolation, monitoring, and secure remote access.",
    unit: "each",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firewall",
      "pci-network-separation",
      "cybersecurity",
    ],
  },

  {
    id: "restaurant.material.networkRack",
    category: "rack",
    name: "Wall-Mount or Floor Network Rack",
    description:
      "Secure enclosure for switches, patch panels, firewall, NVR, UPS, controllers, and cable management.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "network-rack",
      "equipment-organization",
    ],
  },

  {
    id: "restaurant.material.verticalManager",
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
    id: "restaurant.material.horizontalManager",
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
    id: "restaurant.material.raceway",
    category: "pathway",
    name: "Surface Raceway",
    description:
      "Finished pathway for exposed cable routing in dining rooms, kitchens, offices, and other inaccessible finished spaces.",
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
    id: "restaurant.material.emt",
    category: "pathway",
    name: "EMT Conduit",
    description:
      "Metal conduit for mechanical protection, exterior work, kitchens, drive-through systems, and exposed commercial pathways.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "emt",
      "conduit",
      "mechanical-protection",
    ],
  },

  {
    id: "restaurant.material.flexConduit",
    category: "pathway",
    name: "Flexible Metallic Conduit",
    description:
      "Flexible protected pathway for short transitions to equipment, counters, kitchen devices, and moving assemblies where permitted.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "flex-conduit",
      "equipment-transition",
    ],
  },

  {
    id: "restaurant.material.jHooks",
    category: "support",
    name: "Plenum-Rated J-Hooks",
    description:
      "Independent cable supports for accessible ceiling spaces.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "j-hooks",
      "cable-support",
    ],
  },

  {
    id: "restaurant.material.sleeves",
    category: "pathway",
    name: "Cable Sleeves and Bushings",
    description:
      "Protected wall and ceiling penetrations for structured cabling routes.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "sleeve",
      "penetration-protection",
    ],
  },

  {
    id: "restaurant.material.firestop",
    category: "firestop",
    name: "Approved Firestop System",
    description:
      "Listed firestop materials for rated wall, floor, shaft, and tenant-separation penetrations.",
    unit: "penetration",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestop",
      "rated-penetration",
    ],
  },

  {
    id: "restaurant.material.labels",
    category: "labeling",
    name: "Machine-Generated Labels",
    description:
      "Permanent labels for cables, patch panels, racks, devices, power supplies, and controlled openings.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
    ],
  },

  {
    id: "restaurant.material.camera",
    category: "camera",
    name: "Commercial IP Camera",
    description:
      "PoE camera selected for transaction, overview, exterior, kitchen, drive-through, or low-light coverage.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ip-camera",
      "video-surveillance",
    ],
  },

  {
    id: "restaurant.material.environmentRatedCamera",
    category: "camera",
    name: "Environment-Rated IP Camera",
    description:
      "Sealed or specialty-rated camera for kitchens, exterior areas, grease, moisture, washdown, coolers, or freezers.",
    unit: "each",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "environment-rated-camera",
      "food-service-environment",
    ],
  },

  {
    id: "restaurant.material.cameraMount",
    category: "hardware",
    name: "Camera Mounting Hardware",
    description:
      "Junction boxes, pendant mounts, wall arms, pole mounts, back boxes, anchors, and weatherproof fittings.",
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
    id: "restaurant.material.nvr",
    category: "camera",
    name: "Network Video Recorder",
    description:
      "Recorder sized for camera quantity, retention period, recording profile, remote viewing, and future expansion.",
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
    id: "restaurant.material.storageDrive",
    category: "camera",
    name: "Surveillance Storage Drive",
    description:
      "Video-rated storage for continuous or event-based recording.",
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
    id: "restaurant.material.accessPoint",
    category: "wifi",
    name: "Enterprise Wireless Access Point",
    description:
      "Managed indoor access point for guest, staff, point-of-sale, and business wireless connectivity.",
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
    ],
  },

  {
    id: "restaurant.material.outdoorAccessPoint",
    category: "wifi",
    name: "Outdoor Wireless Access Point",
    description:
      "Weather-rated access point for patios, drive-through lanes, parking areas, and exterior pickup zones.",
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
    id: "restaurant.material.accessReader",
    category: "access_control",
    name: "Access-Control Reader",
    description:
      "Card, fob, mobile, PIN, or biometric reader for employee and restricted-area access.",
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
    ],
  },

  {
    id: "restaurant.material.electricLock",
    category: "access_control",
    name: "Electric Locking Hardware",
    description:
      "Electric strike, maglock, electrified trim, or specialty lock selected for the controlled opening.",
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
    ],
  },

  {
    id: "restaurant.material.doorPositionSwitch",
    category: "access_control",
    name: "Door Position Switch",
    description:
      "Contact used to monitor door status and forced or held-open events.",
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
    id: "restaurant.material.requestToExit",
    category: "access_control",
    name: "Request-to-Exit Device",
    description:
      "Motion sensor, push button, or hardware interface for controlled egress.",
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
    id: "restaurant.material.accessController",
    category: "access_control",
    name: "Access-Control Controller",
    description:
      "Controller supporting readers, locks, schedules, credentials, audit events, and remote management.",
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
    ],
  },

  {
    id: "restaurant.material.ups",
    category: "power",
    name: "UPS Battery Backup",
    description:
      "Battery backup for network, camera, access-control, audio, and point-of-sale-supporting equipment.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
    ],
  },

  {
    id: "restaurant.material.surgeProtection",
    category: "power",
    name: "Network and Low-Voltage Surge Protection",
    description:
      "Protection for exterior cameras, access points, drive-through devices, and long outdoor copper routes.",
    unit: "each",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Exterior weather exposure",
        ],
      },
    ],
    ruleTags: [
      "surge-protection",
      "exterior-equipment",
    ],
  },

  {
    id: "restaurant.material.ceilingSpeaker",
    category: "other",
    name: "Commercial Ceiling Speaker",
    description:
      "Distributed audio speaker for dining, restroom, waiting, or private-room zones.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "ceiling-speaker",
      "distributed-audio",
    ],
  },

  {
    id: "restaurant.material.surfaceSpeaker",
    category: "other",
    name: "Commercial Surface-Mount Speaker",
    description:
      "Wall or structure-mounted speaker for bars, kitchens, patios, and areas without ceiling access.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "surface-speaker",
      "distributed-audio",
    ],
  },

  {
    id: "restaurant.material.amplifier",
    category: "other",
    name: "Commercial Audio Amplifier",
    description:
      "Multi-zone or distributed amplifier sized for speaker count, zone count, load, and future capacity.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "audio-amplifier",
      "zone-audio",
    ],
  },

  {
    id: "restaurant.material.volumeControl",
    category: "other",
    name: "Audio Zone Volume Control",
    description:
      "Wall-mounted or network-based volume control for independent restaurant audio zones.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "volume-control",
      "audio-zone",
    ],
  },

  {
    id: "restaurant.material.driveThroughConduit",
    category: "pathway",
    name: "Drive-Through Underground Conduit",
    description:
      "Underground pathway for menu boards, intercoms, vehicle detection, cameras, payment devices, and lane equipment.",
    unit: "foot",
    conditions: [
      {
        field: "property.customProjectType",
        operator: "includes",
        value: [
          "drive-through",
          "quick-service",
        ],
      },
    ],
    ruleTags: [
      "drive-through-pathway",
      "underground-conduit",
    ],
  },

  {
    id: "restaurant.material.weatherproofBox",
    category: "hardware",
    name: "Weatherproof Junction Box",
    description:
      "Exterior-rated enclosure for cameras, access points, drive-through devices, and protected cable transitions.",
    unit: "each",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Exterior weather exposure",
        ],
      },
    ],
    ruleTags: [
      "weatherproof-box",
      "exterior-installation",
    ],
  },

  {
    id: "restaurant.material.consumables",
    category: "consumable",
    name: "Installation Consumables",
    description:
      "Fasteners, anchors, bushings, cable ties, hook-and-loop straps, sealant, connectors, cleaning materials, and minor mounting supplies.",
    unit: "allowance",
    conditions: [],
    ruleTags: [
      "installation-consumables",
      "material-allowance",
    ],
  },
];

export const restaurantLaborProfiles: PlaybookLaborProfile[] = [
  {
    id: "restaurant.labor.small",
    name: "Small Restaurant Installation",
    description:
      "Typical low-voltage work in a small café, bakery, carryout, or limited-service restaurant with accessible pathways and limited device counts.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 3,
    laborDrivers: [
      "Finished-space routing",
      "Limited ceiling access",
      "Customer-area protection",
      "Network rack cleanup",
      "Small camera and Wi-Fi deployment",
      "After-hours scheduling",
    ],
    conditions: [
      {
        field: "property.squareFootage",
        operator: "less_than",
        value: 3500,
      },
    ],
    ruleTags: [
      "small-restaurant",
      "two-to-three-person-crew",
    ],
  },

  {
    id: "restaurant.labor.medium",
    name: "Full-Service Restaurant Installation",
    description:
      "Typical commercial installation for a full-service restaurant, bar, or moderate quick-service location with cameras, Wi-Fi, network, access control, or zoned audio.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Kitchen and dining-room coordination",
      "Multiple technology systems",
      "After-hours work",
      "Finished architectural surfaces",
      "Audio zones",
      "Access-controlled doors",
      "Exterior devices",
      "Testing and commissioning",
    ],
    conditions: [],
    ruleTags: [
      "medium-restaurant",
      "multi-system-installation",
    ],
  },

  {
    id: "restaurant.labor.large",
    name: "Large or High-Complexity Restaurant Installation",
    description:
      "Complex deployment for a large restaurant, entertainment venue, food hall, multi-zone facility, or high-device-count location.",
    typicalCrewSizeMin: 5,
    typicalCrewSizeMax: 8,
    laborDrivers: [
      "Large camera count",
      "High customer capacity",
      "Multiple audio zones",
      "Large guest-Wi-Fi deployment",
      "Complex access control",
      "Multiple exterior areas",
      "Compressed opening schedule",
      "Specialty environmental conditions",
      "Large rack and backbone work",
    ],
    conditions: [
      {
        field: "property.squareFootage",
        operator: "greater_than_or_equal",
        value: 7500,
      },
    ],
    ruleTags: [
      "large-restaurant",
      "crew-scaling",
      "complex-installation",
    ],
  },

  {
    id: "restaurant.labor.driveThrough",
    name: "Drive-Through Specialty Installation",
    description:
      "Specialty installation involving drive-through intercoms, menu boards, cameras, lane devices, exterior pathways, vehicle detection, or outdoor payment systems.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Exterior trenching or conduit",
      "Weather-rated equipment",
      "Vehicle-lane safety",
      "Vendor integration",
      "Outdoor power coordination",
      "Menu-board and intercom mounting",
      "Lane shutdowns",
      "Testing with restaurant operations",
    ],
    conditions: [
      {
        field: "property.customProjectType",
        operator: "includes",
        value: [
          "drive-through",
          "quick-service",
        ],
      },
    ],
    ruleTags: [
      "drive-through-labor",
      "specialty-system",
      "exterior-installation",
    ],
  },

  {
    id: "restaurant.labor.operatingFacility",
    name: "Operating Restaurant Installation",
    description:
      "Phased or after-hours installation while the restaurant remains open.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Repeated mobilization",
      "Restricted work windows",
      "Dust containment",
      "Customer-area protection",
      "Food-safety coordination",
      "Daily cleanup",
      "Temporary system outages",
      "Manager access",
    ],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-restaurant",
      "productivity-adjustment",
      "after-hours-review",
    ],
  },

  {
    id: "restaurant.labor.specialEnvironment",
    name: "Food-Service Specialty Environment Installation",
    description:
      "Installation involving kitchens, grease, heat, washdown, coolers, freezers, condensation, or cleaning chemicals.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Environment-rated equipment",
      "Sealed penetrations",
      "Specialty mounting hardware",
      "Kitchen-equipment coordination",
      "Fire-suppression avoidance",
      "Condensation control",
      "Protected cable routing",
      "Detailed cleanup",
    ],
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "food-service-specialty",
      "environmental-labor",
      "specialty-installation",
    ],
  },
];
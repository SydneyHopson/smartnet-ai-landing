import type {
  PlaybookLaborProfile,
  PlaybookMaterial,
} from "../playbook";

export const retailCommonMaterials: PlaybookMaterial[] = [
  {
    id: "retail.material.cat6",
    category: "cable",
    name: "Category 6 Plenum Cable",
    description:
      "Commercial horizontal cabling for point-of-sale systems, cameras, access points, access control, inventory devices, signage, printers, phones, and network endpoints.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6",
      "horizontal-cabling",
      "retail-network",
    ],
  },

  {
    id: "retail.material.cat6a",
    category: "cable",
    name: "Category 6A Plenum Cable",
    description:
      "Higher-performance structured cabling for multi-gigabit networking, higher-power PoE, dense wireless deployments, audiovisual systems, and future expansion.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6a",
      "future-ready",
      "higher-power-poe",
    ],
  },

  {
    id: "retail.material.outdoorCable",
    category: "cable",
    name: "Outdoor-Rated Ethernet Cable",
    description:
      "UV-resistant and moisture-resistant cable for exterior cameras, outdoor access points, parking areas, curbside pickup, gates, and perimeter devices.",
    unit: "foot",
    conditions: [
      {
        field: "wifi.outdoorCoverage",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "outdoor-rated-cable",
      "exterior-installation",
      "weather-exposure",
    ],
  },

  {
    id: "retail.material.lowTemperatureCable",
    category: "cable",
    name: "Low-Temperature Rated Cable",
    description:
      "Cable selected for refrigerated, freezer, condensation-prone, or cold-storage retail environments.",
    unit: "foot",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Refrigerated displays",
          "Freezer areas",
        ],
      },
    ],
    ruleTags: [
      "low-temperature-cable",
      "refrigeration-review",
      "temperature-rating",
    ],
  },

  {
    id: "retail.material.fiber",
    category: "fiber",
    name: "Fiber-Optic Backbone Cable",
    description:
      "Single-mode or multimode fiber between network rooms, floors, mall telecom spaces, detached areas, remote enclosures, and distant retail zones.",
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
      "remote-network-area",
    ],
  },

  {
    id: "retail.material.fiberEnclosure",
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
    id: "retail.material.fiberPatchCord",
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
    id: "retail.material.patchPanel",
    category: "network",
    name: "Rack-Mounted Patch Panel",
    description:
      "Structured cabling termination for point-of-sale, cameras, access points, access control, signage, inventory systems, audio, and retail network devices.",
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
      "retail-headend",
    ],
  },

  {
    id: "retail.material.keystoneJack",
    category: "hardware",
    name: "Category-Rated Keystone Jack",
    description:
      "Modular termination jack for wall outlets, floor boxes, checkout counters, fixtures, cabinets, and equipment connections.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "keystone-jack",
      "structured-cabling",
      "endpoint-termination",
    ],
  },

  {
    id: "retail.material.faceplate",
    category: "hardware",
    name: "Commercial Faceplate",
    description:
      "Wall, furniture, fixture, counter, or surface-mount faceplate for network and low-voltage terminations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "faceplate",
      "finished-installation",
      "endpoint-termination",
    ],
  },

  {
    id: "retail.material.patchCord",
    category: "cable",
    name: "Category-Rated Patch Cord",
    description:
      "Factory-terminated patch cord for rack, point-of-sale, camera, access point, signage, inventory, and endpoint connections.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "patch-cord",
      "equipment-connection",
      "structured-cabling",
    ],
  },

  {
    id: "retail.material.managedPoeSwitch",
    category: "network",
    name: "Managed PoE Switch",
    description:
      "Managed switch supporting VLANs, PoE devices, payment-system separation, cameras, access control, wireless, inventory, signage, audio, and monitoring.",
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
      "retail-network",
    ],
  },

  {
    id: "retail.material.firewall",
    category: "network",
    name: "Commercial Firewall or Security Gateway",
    description:
      "Security appliance supporting payment, point-of-sale, employee, guest, camera, access-control, inventory, signage, audio, IoT, and vendor network segmentation.",
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
      "pci-coordination",
    ],
  },

  {
    id: "retail.material.cellularFailover",
    category: "network",
    name: "Cellular Failover Gateway",
    description:
      "Backup internet gateway for point-of-sale, payment, cloud applications, phones, access control, cameras, and critical retail operations.",
    unit: "each",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "internet-failover",
      "business-continuity",
      "retail-resilience",
    ],
  },

  {
    id: "retail.material.networkRack",
    category: "rack",
    name: "Secure Network Rack",
    description:
      "Floor-mounted or wall-mounted rack for switches, patch panels, fiber shelves, firewalls, recorders, controllers, audio equipment, point-of-sale interfaces, and UPS units.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "secure-rack",
      "equipment-organization",
      "retail-headend",
    ],
  },

  {
    id: "retail.material.wallEnclosure",
    category: "rack",
    name: "Lockable Wall-Mount Enclosure",
    description:
      "Secure enclosure for remote switches, fiber termination, controllers, stockroom equipment, exterior systems, and small telecom locations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "wall-enclosure",
      "remote-equipment",
      "physical-security",
    ],
  },

  {
    id: "retail.material.verticalManager",
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
    id: "retail.material.horizontalManager",
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
    id: "retail.material.rackShelf",
    category: "rack",
    name: "Rack Shelf",
    description:
      "Rack-mounted shelf for non-rack-mounted retail, network, audio, security, and point-of-sale equipment.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "rack-shelf",
      "equipment-support",
      "serviceability",
    ],
  },

  {
    id: "retail.material.jHooks",
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
    id: "retail.material.cableTray",
    category: "pathway",
    name: "Cable Tray or Basket Tray",
    description:
      "Structured pathway for larger cable bundles in stockrooms, sales floors, receiving areas, telecom spaces, open ceilings, and retail distribution routes.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cable-tray",
      "pathway",
      "retail-distribution",
    ],
  },

  {
    id: "retail.material.emt",
    category: "pathway",
    name: "EMT Conduit",
    description:
      "Metal conduit for mechanical protection, exposed pathways, stockrooms, receiving, exterior routes, telecom entrances, and property-required installations.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "emt",
      "conduit",
      "mechanical-protection",
    ],
  },

  {
    id: "retail.material.surfaceRaceway",
    category: "pathway",
    name: "Surface Raceway",
    description:
      "Finished pathway for sales floors, checkout areas, fitting-room approaches, offices, stockrooms, and other spaces without concealed access.",
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
    id: "retail.material.floorBox",
    category: "pathway",
    name: "Commercial Floor Box",
    description:
      "Floor-mounted enclosure for point-of-sale, checkout, kiosk, customer-service, display, network, power, and audiovisual connectivity.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "floor-box",
      "checkout-connectivity",
      "fixture-connectivity",
    ],
  },

  {
    id: "retail.material.pokeThrough",
    category: "pathway",
    name: "Fire-Rated Poke-Through",
    description:
      "Listed floor penetration assembly for power, data, point-of-sale, kiosk, and audiovisual connectivity through rated floor construction.",
    unit: "each",
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "poke-through",
      "floor-core",
      "rated-penetration",
    ],
  },

  {
    id: "retail.material.fixtureFeed",
    category: "pathway",
    name: "Retail Fixture Cable Feed",
    description:
      "Pathway and transition hardware for checkout counters, gondolas, kiosks, millwork, display fixtures, cabinets, and customer-service stations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "fixture-feed",
      "checkout-pathway",
      "retail-fixture",
    ],
  },

  {
    id: "retail.material.sleeves",
    category: "pathway",
    name: "Cable Sleeves and Bushings",
    description:
      "Protected wall, floor, ceiling, stockroom, tenant-separation, and fixture penetrations for low-voltage cabling.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "sleeve",
      "penetration-protection",
    ],
  },

  {
    id: "retail.material.firestop",
    category: "firestop",
    name: "Approved Firestop System",
    description:
      "Listed firestop system for rated walls, floors, shafts, risers, stockroom barriers, and tenant separations.",
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
      "inspection-readiness",
    ],
  },

  {
    id: "retail.material.labels",
    category: "labeling",
    name: "Machine-Generated Labels",
    description:
      "Permanent labels for cables, racks, patch panels, point-of-sale drops, cameras, access points, displays, controllers, and controlled openings.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
      "serviceability",
    ],
  },

  {
    id: "retail.material.camera",
    category: "camera",
    name: "Commercial IP Camera",
    description:
      "PoE camera selected for entrances, sales floors, checkout, customer service, stockrooms, receiving, parking, exterior areas, and approved restricted spaces.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ip-camera",
      "retail-surveillance",
      "loss-prevention",
    ],
  },

  {
    id: "retail.material.transactionCamera",
    category: "camera",
    name: "Transaction-Focused IP Camera",
    description:
      "Camera selected for detailed checkout, self-checkout, refund, customer-service, cash-handling, pharmacy, or item-handoff views.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-camera",
      "pixel-density-review",
      "loss-prevention",
    ],
  },

  {
    id: "retail.material.vandalCamera",
    category: "camera",
    name: "Vandal-Resistant IP Camera",
    description:
      "Tamper-resistant camera for parking, loading, exterior, vestibule, public, stockroom, and elevated-risk retail areas.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "vandal-resistant-camera",
      "exterior-security",
      "tamper-resistance",
    ],
  },

  {
    id: "retail.material.cameraMount",
    category: "hardware",
    name: "Camera Mounting Hardware",
    description:
      "Junction boxes, pendant mounts, wall arms, pole mounts, back boxes, parapet mounts, anchors, and specialty retail mounting hardware.",
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
    id: "retail.material.nvr",
    category: "camera",
    name: "Network Video Recorder",
    description:
      "Recorder sized for approved camera quantity, retention, transaction coverage, recording profiles, remote access, analytics, and future expansion.",
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
      "retail-security",
    ],
  },

  {
    id: "retail.material.storageDrive",
    category: "camera",
    name: "Surveillance Storage Drive",
    description:
      "Video-rated storage media for continuous, motion-based, event-based, and transaction-focused recording.",
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
    id: "retail.material.accessPoint",
    category: "wifi",
    name: "Enterprise Wireless Access Point",
    description:
      "Managed access point for point-of-sale, scanners, tablets, inventory, employee, guest, signage, IoT, and retail wireless networks.",
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
      "retail-roaming",
    ],
  },

  {
    id: "retail.material.outdoorAccessPoint",
    category: "wifi",
    name: "Outdoor Wireless Access Point",
    description:
      "Weather-rated access point for curbside pickup, parking, garden areas, patios, loading zones, exterior sales, and perimeter coverage.",
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
      "curbside-connectivity",
    ],
  },

  {
    id: "retail.material.environmentRatedAccessPoint",
    category: "wifi",
    name: "Environment-Rated Wireless Access Point",
    description:
      "Access point selected for freezer, refrigeration, dust, moisture, grease, washdown, corrosion, or specialty retail conditions.",
    unit: "each",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "environment-rated-access-point",
      "specialty-environment",
      "retail-wifi",
    ],
  },

  {
    id: "retail.material.accessReader",
    category: "access_control",
    name: "Access-Control Reader",
    description:
      "Card, fob, mobile, PIN, or biometric reader for employee entrances, stockrooms, cash offices, pharmacy, receiving, offices, cages, and restricted areas.",
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
    id: "retail.material.electricLock",
    category: "access_control",
    name: "Electric Locking Hardware",
    description:
      "Electric strike, maglock, electrified trim, shear lock, cabinet lock, gate operator interface, or specialty hardware selected for the controlled opening.",
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
    id: "retail.material.doorPositionSwitch",
    category: "access_control",
    name: "Door Position Switch",
    description:
      "Contact for monitoring door, gate, cage, cabinet, pharmacy, stockroom, and receiving-area status.",
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
      "inventory-security",
    ],
  },

  {
    id: "retail.material.requestToExit",
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
    id: "retail.material.accessController",
    category: "access_control",
    name: "Access-Control Controller",
    description:
      "Controller supporting readers, locks, schedules, credentials, alerts, pharmacy events, multi-store administration, audit logs, and remote management.",
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
    id: "retail.material.cabinetLock",
    category: "access_control",
    name: "Electronic Cabinet Lock",
    description:
      "Electronic lock for pharmacy cabinets, cash drawers, secure inventory, high-value merchandise, records, and specialty enclosures.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cabinet-control",
      "inventory-security",
      "pharmacy-security",
    ],
  },

  {
    id: "retail.material.ups",
    category: "power",
    name: "UPS Battery Backup",
    description:
      "Battery backup for internet, switches, point-of-sale, payment connectivity, cameras, access control, inventory, pharmacy, signage, audio, and critical retail systems.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "retail.material.surgeProtection",
    category: "power",
    name: "Network and Low-Voltage Surge Protection",
    description:
      "Protection for exterior cameras, access points, gates, parking devices, curbside systems, signs, and outdoor copper routes.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "surge-protection",
      "exterior-equipment",
    ],
  },

  {
    id: "retail.material.display",
    category: "other",
    name: "Commercial Digital Signage Display",
    description:
      "Commercial-grade display for promotions, window-facing content, queue information, menu boards, pharmacy, wayfinding, employee communication, and video walls.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "commercial-display",
      "digital-signage",
      "retail-display",
    ],
  },

  {
    id: "retail.material.highBrightnessDisplay",
    category: "other",
    name: "High-Brightness Window Display",
    description:
      "Commercial display designed for storefront windows, bright ambient light, promotional content, and extended-duty operation.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "high-brightness-display",
      "window-signage",
      "retail-promotion",
    ],
  },

  {
    id: "retail.material.displayMount",
    category: "hardware",
    name: "Commercial Display Mount",
    description:
      "Fixed, tilt, articulating, ceiling, floor, window, cart, or specialty mount selected for display size, structure, viewing, service, and security requirements.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "display-mount",
      "mounting-hardware",
      "retail-signage",
    ],
  },

  {
    id: "retail.material.signagePlayer",
    category: "other",
    name: "Digital Signage Media Player",
    description:
      "Managed content player for promotions, menu boards, window displays, queue information, wayfinding, employee communication, and multi-store campaigns.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "media-player",
      "content-management",
    ],
  },

  {
    id: "retail.material.audioSpeaker",
    category: "other",
    name: "Commercial Retail Speaker",
    description:
      "Ceiling, pendant, surface, outdoor, or specialty speaker for background music, paging, promotional audio, and customer announcements.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "retail-speaker",
      "background-music",
      "paging",
    ],
  },

  {
    id: "retail.material.audioAmplifier",
    category: "other",
    name: "Commercial Audio Amplifier",
    description:
      "Amplifier supporting retail audio zones, paging priorities, background music, promotional audio, scheduling, and system control.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "audio-amplifier",
      "retail-audio",
      "zone-control",
    ],
  },

  {
    id: "retail.material.audioController",
    category: "other",
    name: "Retail Audio Zone Controller",
    description:
      "Controller for independent sales-floor, pharmacy, stockroom, receiving, fitting-room, exterior, and employee audio zones.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "audio-zone-controller",
      "retail-audio",
      "paging-control",
    ],
  },

  {
    id: "retail.material.musicPlayer",
    category: "other",
    name: "Commercial Music Player",
    description:
      "Network-connected player for licensed commercial music, promotional content, schedules, announcements, and multi-store management.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "commercial-music",
      "music-service",
      "content-scheduling",
    ],
  },

  {
    id: "retail.material.weatherproofEnclosure",
    category: "hardware",
    name: "Weatherproof Equipment Enclosure",
    description:
      "Sealed enclosure for exterior, curbside, garden, loading, parking, refrigeration, moisture, dust, or specialty equipment locations.",
    unit: "each",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "weatherproof-enclosure",
      "environmental-protection",
      "specialty-equipment",
    ],
  },

  {
    id: "retail.material.condensationSeal",
    category: "consumable",
    name: "Environmental Sealing Materials",
    description:
      "Sealants, glands, fittings, barriers, insulation, and moisture-control materials for cold, wet, exterior, refrigerated, freezer, or washdown areas.",
    unit: "allowance",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "environmental-sealing",
      "condensation-review",
      "moisture-protection",
    ],
  },

  {
    id: "retail.material.consumables",
    category: "consumable",
    name: "Installation Consumables",
    description:
      "Fasteners, anchors, bushings, hook-and-loop straps, connectors, sealant, floor protection, cleaning materials, and minor mounting supplies.",
    unit: "allowance",
    conditions: [],
    ruleTags: [
      "installation-consumables",
      "material-allowance",
    ],
  },
];

export const retailLaborProfiles: PlaybookLaborProfile[] = [
  {
    id: "retail.labor.small",
    name: "Small Retail Installation",
    description:
      "Typical installation for a boutique, specialty shop, small showroom, mall tenant, or convenience retail location.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 4,
    laborDrivers: [
      "Finished customer-facing spaces",
      "Fixture coordination",
      "Limited ceiling access",
      "Small camera and Wi-Fi deployment",
      "Point-of-sale cabling",
      "Rack cleanup",
      "After-hours scheduling",
      "Merchandise protection",
    ],
    conditions: [
      {
        field: "property.squareFootage",
        operator: "less_than",
        value: 5000,
      },
    ],
    ruleTags: [
      "small-retail-project",
      "two-to-four-person-crew",
    ],
  },

  {
    id: "retail.labor.medium",
    name: "Standard Retail Installation",
    description:
      "Typical multi-system deployment for a medium retail store, showroom, grocery tenant, pharmacy retail location, or multi-department shop.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Structured cabling",
      "Point-of-sale connectivity",
      "Enterprise Wi-Fi",
      "Access control",
      "Loss-prevention cameras",
      "Transaction cameras",
      "Retail audio",
      "Digital signage",
      "Fixture pathways",
      "After-hours work",
      "Testing and commissioning",
    ],
    conditions: [],
    ruleTags: [
      "medium-retail-project",
      "multi-system-installation",
    ],
  },

  {
    id: "retail.labor.large",
    name: "Large Retail Installation",
    description:
      "Complex deployment for a big-box store, department store, grocery store, multi-floor retailer, flagship store, or high-device-count environment.",
    typicalCrewSizeMin: 5,
    typicalCrewSizeMax: 10,
    laborDrivers: [
      "Multiple network rooms",
      "Large fiber backbone",
      "High wireless-device density",
      "Large point-of-sale count",
      "Large camera deployment",
      "Transaction-specific surveillance",
      "Complex access control",
      "Retail audio zoning",
      "Large digital-signage deployment",
      "Multiple lifts",
      "Phased turnover",
      "Compressed opening schedule",
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
      "large-retail-project",
      "crew-scaling",
      "complex-installation",
    ],
  },

  {
    id: "retail.labor.operatingStore",
    name: "Operating Store Installation",
    description:
      "Phased, protected, or after-hours installation while customers, employees, transactions, inventory, and merchandise remain active.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Customer-safe work zones",
      "Restricted work windows",
      "Repeated mobilization",
      "Merchandise protection",
      "Fixture access",
      "Daily cleanup",
      "Temporary barriers",
      "Overhead-work restrictions",
      "Store-security access",
      "Transaction-area restrictions",
    ],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-retail",
      "productivity-adjustment",
      "customer-safety-labor",
    ],
  },

  {
    id: "retail.labor.multiFloor",
    name: "Multi-Floor Retail Installation",
    description:
      "Installation involving multiple sales levels, stock levels, mezzanines, network rooms, risers, fiber backbone, and phased access.",
    typicalCrewSizeMin: 4,
    typicalCrewSizeMax: 8,
    laborDrivers: [
      "Riser pathways",
      "Multiple network rooms",
      "Fiber backbone",
      "Floor-by-floor staging",
      "Lift coordination",
      "Building access",
      "Mall coordination",
      "Multiple testing zones",
    ],
    conditions: [
      {
        field: "property.numberOfFloors",
        operator: "greater_than",
        value: 1,
      },
    ],
    ruleTags: [
      "multi-floor-retail",
      "fiber-backbone",
      "crew-scaling",
    ],
  },

  {
    id: "retail.labor.floorCore",
    name: "Retail Floor Pathway Installation",
    description:
      "Specialty pathway installation involving checkout feeds, floor boxes, poke-throughs, core drilling, trenching, fixture feeds, and structural coordination.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Slab scanning",
      "Structural review",
      "Landlord approval",
      "Mall approval",
      "After-hours drilling",
      "Occupied-area coordination",
      "Fire-rated assemblies",
      "Floor protection",
      "Debris control",
      "Fixture sequencing",
    ],
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-floor-core-labor",
      "checkout-pathway",
      "structural-coordination",
    ],
  },

  {
    id: "retail.labor.refrigeration",
    name: "Refrigerated and Freezer Installation",
    description:
      "Specialty installation involving low temperatures, condensation, refrigeration panels, sealed pathways, environmental equipment, and controlled work periods.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Low-temperature cable",
      "Environmental enclosures",
      "Sealed penetrations",
      "Condensation control",
      "Temperature transitions",
      "Specialty PPE",
      "Refrigeration-vendor coordination",
      "Restricted work periods",
      "Material acclimation",
    ],
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Refrigerated displays",
          "Freezer areas",
        ],
      },
    ],
    ruleTags: [
      "refrigeration-labor",
      "temperature-rating",
      "specialty-installation",
    ],
  },

  {
    id: "retail.labor.pharmacy",
    name: "Retail Pharmacy Security Installation",
    description:
      "Specialty work involving pharmacy access, controlled storage, medication refrigeration, surveillance, audit requirements, and restricted customer information.",
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
      "Vendor coordination",
    ],
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
      "retail-pharmacy-labor",
      "pharmacy-security",
      "specialty-installation",
    ],
  },

  {
    id: "retail.labor.cameraHeavy",
    name: "Loss-Prevention Camera Installation",
    description:
      "Camera-intensive installation involving sales-floor coverage, transaction views, entrances, stockrooms, receiving, parking, exterior areas, and analytics.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 7,
    laborDrivers: [
      "High camera count",
      "Transaction camera alignment",
      "Pixel-density verification",
      "Lift work",
      "Storefront lighting",
      "Exterior mounting",
      "Privacy restrictions",
      "Recorder configuration",
      "Storage commissioning",
      "Acceptance testing",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "loss-prevention-labor",
      "camera-installation",
      "transaction-verification",
    ],
  },

  {
    id: "retail.labor.signageAudio",
    name: "Retail Audio and Signage Installation",
    description:
      "Specialty installation involving commercial displays, media players, window signage, video walls, speakers, amplifiers, paging, and zoned audio.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Display mounting",
      "Structural blocking verification",
      "Window-facing brightness",
      "Media-player installation",
      "Content-platform configuration",
      "Speaker placement",
      "Audio zoning",
      "Amplifier sizing",
      "Paging integration",
      "System commissioning",
    ],
    conditions: [],
    ruleTags: [
      "retail-av-labor",
      "digital-signage",
      "retail-audio",
    ],
  },
];
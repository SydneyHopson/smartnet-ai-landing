import type {
  PlaybookLaborProfile,
  PlaybookMaterial,
} from "../playbook";

export const officeCommonMaterials: PlaybookMaterial[] = [
  {
    id: "office.material.cat6",
    category: "cable",
    name: "Category 6 Plenum Cable",
    description:
      "Commercial horizontal cabling for workstations, phones, printers, cameras, access points, access control, audiovisual devices, and office network endpoints.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6",
      "horizontal-cabling",
    ],
  },

  {
    id: "office.material.cat6a",
    category: "cable",
    name: "Category 6A Plenum Cable",
    description:
      "Higher-performance structured cabling for multi-gigabit networking, high-power PoE, dense wireless deployments, audiovisual systems, and future expansion.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cat6a",
      "future-ready",
      "higher-power-poe",
    ],
  },

  {
    id: "office.material.outdoorCable",
    category: "cable",
    name: "Outdoor-Rated Ethernet Cable",
    description:
      "UV-resistant and moisture-resistant cable for exterior cameras, outdoor access points, gates, parking areas, and building perimeter devices.",
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
    ],
  },

  {
    id: "office.material.fiber",
    category: "fiber",
    name: "Fiber-Optic Backbone Cable",
    description:
      "Single-mode or multimode fiber between MDFs, IDFs, floors, suites, buildings, and remote office areas.",
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
    id: "office.material.fiberEnclosure",
    category: "fiber",
    name: "Fiber Distribution Enclosure",
    description:
      "Rack-mounted or wall-mounted enclosure for fiber termination, adapters, splicing, and cable management.",
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
    id: "office.material.fiberPatchCord",
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
    id: "office.material.patchPanel",
    category: "network",
    name: "Rack-Mounted Patch Panel",
    description:
      "Structured cabling termination for workstations, phones, cameras, access points, access control, audiovisual systems, and office technology.",
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
    id: "office.material.managedPoeSwitch",
    category: "network",
    name: "Managed PoE Switch",
    description:
      "Managed switch supporting VLANs, PoE devices, voice, wireless, cameras, access control, monitoring, and secure administration.",
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
    id: "office.material.firewall",
    category: "network",
    name: "Commercial Firewall or Security Gateway",
    description:
      "Security appliance supporting employee, guest, voice, security, audiovisual, IoT, building-system, and vendor network segmentation.",
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
    id: "office.material.networkRack",
    category: "rack",
    name: "Network Equipment Rack",
    description:
      "Floor-mounted or wall-mounted rack for switches, patch panels, fiber shelves, firewalls, controllers, recorders, UPS units, and cable management.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "network-rack",
      "equipment-organization",
      "serviceability",
    ],
  },

  {
    id: "office.material.wallEnclosure",
    category: "rack",
    name: "Lockable Wall-Mount Enclosure",
    description:
      "Secure enclosure for remote switches, fiber termination, controllers, and smaller telecom locations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "wall-enclosure",
      "remote-equipment",
      "physical-security",
    ],
  },

  {
    id: "office.material.verticalManager",
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
    id: "office.material.horizontalManager",
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
    id: "office.material.jHooks",
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
    id: "office.material.cableTray",
    category: "pathway",
    name: "Cable Tray or Basket Tray",
    description:
      "Structured pathway for larger cable bundles in corridors, telecom spaces, open ceilings, and office distribution routes.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "cable-tray",
      "pathway",
    ],
  },

  {
    id: "office.material.emt",
    category: "pathway",
    name: "EMT Conduit",
    description:
      "Metal conduit for mechanical protection, exposed pathways, exterior routes, telecom entrances, and building-required installations.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "emt",
      "conduit",
      "mechanical-protection",
    ],
  },

  {
    id: "office.material.surfaceRaceway",
    category: "pathway",
    name: "Surface Raceway",
    description:
      "Finished pathway for offices, conference rooms, executive areas, lobbies, and other spaces without concealed cable access.",
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
    id: "office.material.floorBox",
    category: "pathway",
    name: "Commercial Floor Box",
    description:
      "Floor-mounted enclosure for power, data, audiovisual, and furniture connectivity in open offices, conference rooms, and collaboration spaces.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "floor-box",
      "workspace-connectivity",
      "conference-room",
    ],
  },

  {
    id: "office.material.pokeThrough",
    category: "pathway",
    name: "Fire-Rated Poke-Through",
    description:
      "Listed floor penetration assembly for power, data, and audiovisual connectivity through rated floor construction.",
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
    id: "office.material.furnitureFeed",
    category: "pathway",
    name: "Furniture Cable Feed",
    description:
      "Pathway and transition hardware for modular furniture, benching systems, cubicles, sit-stand desks, and shared workstations.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "furniture-feed",
      "modular-furniture",
      "workspace-connectivity",
    ],
  },

  {
    id: "office.material.sleeves",
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
    id: "office.material.firestop",
    category: "firestop",
    name: "Approved Firestop System",
    description:
      "Listed firestop system for rated walls, floors, tenant separations, risers, and shafts.",
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
    id: "office.material.labels",
    category: "labeling",
    name: "Machine-Generated Labels",
    description:
      "Permanent labels for cables, patch panels, racks, devices, controllers, power supplies, rooms, and controlled openings.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
    ],
  },

  {
    id: "office.material.camera",
    category: "camera",
    name: "Commercial IP Camera",
    description:
      "PoE camera selected for entrances, lobbies, hallways, server rooms, parking, exterior areas, and approved restricted spaces.",
    unit: "each",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ip-camera",
      "office-surveillance",
      "privacy-review",
    ],
  },

  {
    id: "office.material.vandalCamera",
    category: "camera",
    name: "Vandal-Resistant IP Camera",
    description:
      "Tamper-resistant camera for exterior, parking, loading, public, or elevated-risk office areas.",
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
    id: "office.material.cameraMount",
    category: "hardware",
    name: "Camera Mounting Hardware",
    description:
      "Junction boxes, pendant mounts, wall arms, pole mounts, back boxes, anchors, and specialty mounting hardware.",
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
    id: "office.material.nvr",
    category: "camera",
    name: "Network Video Recorder",
    description:
      "Recorder sized for approved camera quantity, retention, recording profile, remote access, user permissions, and future expansion.",
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
    id: "office.material.storageDrive",
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
    id: "office.material.accessPoint",
    category: "wifi",
    name: "Enterprise Wireless Access Point",
    description:
      "Managed access point for employee, guest, voice, conferencing, mobile, IoT, and business wireless networks.",
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
      "office-roaming",
    ],
  },

  {
    id: "office.material.outdoorAccessPoint",
    category: "wifi",
    name: "Outdoor Wireless Access Point",
    description:
      "Weather-rated access point for courtyards, patios, parking, exterior workspaces, loading areas, and building perimeter coverage.",
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
    id: "office.material.accessReader",
    category: "access_control",
    name: "Access-Control Reader",
    description:
      "Card, fob, mobile, PIN, or biometric reader for employee, executive, tenant, visitor, server-room, and restricted-area access.",
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
    id: "office.material.electricLock",
    category: "access_control",
    name: "Electric Locking Hardware",
    description:
      "Electric strike, maglock, electrified trim, shear lock, or specialty hardware selected for the controlled opening.",
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
    id: "office.material.doorPositionSwitch",
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
    id: "office.material.requestToExit",
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
    id: "office.material.accessController",
    category: "access_control",
    name: "Access-Control Controller",
    description:
      "Controller supporting readers, locks, schedules, credentials, alerts, visitor access, audit events, and remote management.",
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
    id: "office.material.visitorKiosk",
    category: "access_control",
    name: "Visitor Management Kiosk",
    description:
      "Self-service or staffed visitor check-in station supporting registration, badges, host notification, and temporary access workflows.",
    unit: "each",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "visitor-management",
      "temporary-credentials",
      "lobby-security",
    ],
  },

  {
    id: "office.material.ups",
    category: "power",
    name: "UPS Battery Backup",
    description:
      "Battery backup for network, camera, access-control, audiovisual, conferencing, and selected business systems.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "office.material.surgeProtection",
    category: "power",
    name: "Network and Low-Voltage Surge Protection",
    description:
      "Protection for exterior cameras, access points, gates, remote devices, displays, and outdoor copper routes.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "surge-protection",
      "exterior-equipment",
    ],
  },

  {
    id: "office.material.display",
    category: "other",
    name: "Commercial Display",
    description:
      "Commercial-grade display for conference rooms, training rooms, lobbies, executive spaces, dashboards, and digital signage.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "commercial-display",
      "conference-room",
      "digital-signage",
    ],
  },

  {
    id: "office.material.displayMount",
    category: "hardware",
    name: "Commercial Display Mount",
    description:
      "Fixed, tilt, articulating, ceiling, cart, or specialty mount selected for display size, wall construction, viewing, and service requirements.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "display-mount",
      "mounting-hardware",
      "display-blocking-review",
    ],
  },

  {
    id: "office.material.conferenceCamera",
    category: "other",
    name: "Conference-Room Camera",
    description:
      "USB, network, appliance-based, or intelligent framing camera selected for room size, seating, and platform requirements.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "conference-camera",
      "video-conferencing",
      "room-system",
    ],
  },

  {
    id: "office.material.microphone",
    category: "other",
    name: "Conference-Room Microphone",
    description:
      "Table, ceiling, pendant, beamforming, or expansion microphone selected for room acoustics, seating, and platform requirements.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "conference-microphone",
      "room-audio",
      "acoustic-review",
    ],
  },

  {
    id: "office.material.roomSpeaker",
    category: "other",
    name: "Conference-Room Speaker",
    description:
      "Ceiling, wall, soundbar, or integrated speaker selected for room size, intelligibility, conferencing, and presentation audio.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "conference-speaker",
      "room-audio",
      "speech-intelligibility",
    ],
  },

  {
    id: "office.material.soundbar",
    category: "other",
    name: "Video Collaboration Soundbar",
    description:
      "Integrated camera, microphone, speaker, and conferencing appliance for small and medium collaboration rooms.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "video-soundbar",
      "huddle-room",
      "conference-room",
    ],
  },

  {
    id: "office.material.roomCompute",
    category: "other",
    name: "Room Conferencing Compute Device",
    description:
      "Dedicated compute appliance for Teams Rooms, Zoom Rooms, Webex, Google Meet, or other supported collaboration platforms.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "room-compute",
      "collaboration-platform",
      "licensing-review",
    ],
  },

  {
    id: "office.material.touchController",
    category: "other",
    name: "Conference-Room Touch Controller",
    description:
      "Table-mounted or wall-mounted user interface for meeting control, source selection, volume, camera control, and room functions.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "room-control",
      "touch-controller",
      "user-interface",
    ],
  },

  {
    id: "office.material.presentationGateway",
    category: "other",
    name: "Wireless Presentation Gateway",
    description:
      "Managed presentation device supporting wireless content sharing from laptops, tablets, and mobile devices.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "wireless-presentation",
      "conference-room",
      "collaboration",
    ],
  },

  {
    id: "office.material.avExtender",
    category: "other",
    name: "Audiovisual Signal Extender",
    description:
      "HDBaseT, USB, HDMI, network, or fiber extension device for reliable signal transport between furniture, equipment, and displays.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "av-extension",
      "signal-transport",
      "conference-room",
    ],
  },

  {
    id: "office.material.avCable",
    category: "cable",
    name: "Audiovisual Signal Cable",
    description:
      "HDMI, USB, control, speaker, microphone, or specialty audiovisual cabling for conference and collaboration systems.",
    unit: "foot",
    conditions: [],
    ruleTags: [
      "av-cabling",
      "conference-room",
      "signal-transport",
    ],
  },

  {
    id: "office.material.schedulingPanel",
    category: "other",
    name: "Room Scheduling Panel",
    description:
      "PoE or network-connected panel for room availability, booking, check-in, calendar integration, and occupancy workflows.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "room-scheduling",
      "calendar-integration",
      "occupancy-management",
    ],
  },

  {
    id: "office.material.occupancySensor",
    category: "other",
    name: "Occupancy Sensor",
    description:
      "Sensor for room usage, desk booking, automatic room release, analytics, and smart-office workflows.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "occupancy-sensing",
      "workspace-analytics",
      "smart-office",
    ],
  },

  {
    id: "office.material.signagePlayer",
    category: "other",
    name: "Digital Signage Media Player",
    description:
      "Managed content player for lobby signage, dashboards, employee communications, wayfinding, and promotional displays.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "media-player",
      "content-management",
    ],
  },

  {
    id: "office.material.soundMaskingEmitter",
    category: "other",
    name: "Sound-Masking Emitter",
    description:
      "Above-ceiling or direct-field emitter for speech privacy and ambient sound control in open and private office areas.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "sound-masking",
      "speech-privacy",
      "acoustic-design",
    ],
  },

  {
    id: "office.material.soundMaskingController",
    category: "other",
    name: "Sound-Masking Controller",
    description:
      "Controller or amplifier supporting sound-masking zones, tuning, schedules, paging integration, and system management.",
    unit: "each",
    conditions: [],
    ruleTags: [
      "sound-masking-controller",
      "zone-control",
      "commissioning",
    ],
  },

  {
    id: "office.material.consumables",
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

export const officeLaborProfiles: PlaybookLaborProfile[] = [
  {
    id: "office.labor.small",
    name: "Small Office Installation",
    description:
      "Typical installation for a professional office, executive suite, or small commercial workspace with limited telecom infrastructure and moderate device counts.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 3,
    laborDrivers: [
      "Finished office spaces",
      "Furniture coordination",
      "Limited ceiling access",
      "Small network and Wi-Fi deployment",
      "Conference-room installation",
      "Rack cleanup",
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
      "small-office-project",
      "two-to-three-person-crew",
    ],
  },

  {
    id: "office.labor.medium",
    name: "Standard Commercial Office Installation",
    description:
      "Typical multi-system deployment for a corporate office, professional workspace, coworking facility, or moderate call center.",
    typicalCrewSizeMin: 3,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Structured cabling",
      "Enterprise Wi-Fi",
      "Access control",
      "Camera privacy review",
      "Multiple conference rooms",
      "Furniture pathways",
      "Fiber backbone",
      "After-hours work",
      "Testing and commissioning",
    ],
    conditions: [],
    ruleTags: [
      "medium-office-project",
      "multi-system-installation",
    ],
  },

  {
    id: "office.labor.large",
    name: "Large Corporate Office Installation",
    description:
      "Complex deployment for a large corporate office, multi-floor tenant, headquarters, call center, coworking facility, or high-device-count environment.",
    typicalCrewSizeMin: 5,
    typicalCrewSizeMax: 10,
    laborDrivers: [
      "Multiple MDFs and IDFs",
      "Large fiber backbone",
      "High wireless-device density",
      "Large workstation count",
      "Complex access control",
      "Large camera count",
      "Multiple conference-room types",
      "Digital signage",
      "Sound masking",
      "Phased turnover",
      "Compressed move-in schedule",
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
      "large-office-project",
      "crew-scaling",
      "complex-installation",
    ],
  },

  {
    id: "office.labor.operatingFacility",
    name: "Operating Office Installation",
    description:
      "Phased or after-hours installation while employees and business operations remain active.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 6,
    laborDrivers: [
      "Employee coordination",
      "Restricted work windows",
      "Repeated mobilization",
      "Noise restrictions",
      "Furniture access",
      "Daily cleanup",
      "Temporary outages",
      "Security access",
      "Executive schedules",
      "Meeting-room restrictions",
    ],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-office",
      "productivity-adjustment",
      "after-hours-review",
    ],
  },

  {
    id: "office.labor.multiFloor",
    name: "Multi-Floor Office Installation",
    description:
      "Installation involving multiple floors, risers, telecom rooms, fiber backbone, phased access, and separate tenant or department areas.",
    typicalCrewSizeMin: 4,
    typicalCrewSizeMax: 8,
    laborDrivers: [
      "Riser pathways",
      "Multiple telecom rooms",
      "Fiber backbone",
      "Elevator coordination",
      "Floor-by-floor staging",
      "Building access",
      "Tenant coordination",
      "Multiple lift locations",
      "Phased testing",
    ],
    conditions: [
      {
        field: "property.numberOfFloors",
        operator: "greater_than",
        value: 1,
      },
    ],
    ruleTags: [
      "multi-floor-office",
      "fiber-backbone",
      "crew-scaling",
    ],
  },

  {
    id: "office.labor.conferenceRooms",
    name: "Conference and Collaboration Systems Installation",
    description:
      "Specialty audiovisual installation involving displays, cameras, microphones, speakers, scheduling panels, controls, and collaboration platforms.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Display mounting",
      "Wall blocking verification",
      "Table connectivity",
      "Audiovisual signal routing",
      "Room compute installation",
      "Microphone placement",
      "Camera framing",
      "System programming",
      "Platform configuration",
      "Acoustic testing",
      "User training",
    ],
    conditions: [],
    ruleTags: [
      "conference-room-labor",
      "av-installation",
      "specialty-system",
    ],
  },

  {
    id: "office.labor.floorCore",
    name: "Floor Box and Core-Drilling Installation",
    description:
      "Specialty pathway installation involving floor boxes, poke-throughs, core drilling, raised floors, furniture feeds, and structural coordination.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 5,
    laborDrivers: [
      "Slab scanning",
      "Structural review",
      "Landlord approval",
      "After-hours drilling",
      "Occupied-floor coordination",
      "Fire-rated assemblies",
      "Floor protection",
      "Debris control",
      "Furniture sequencing",
    ],
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "floor-core-labor",
      "specialty-pathway",
      "structural-coordination",
    ],
  },

  {
    id: "office.labor.soundMasking",
    name: "Sound-Masking Installation",
    description:
      "Specialty installation involving emitters, controllers, zoning, paging integration, acoustic tuning, and speech-privacy commissioning.",
    typicalCrewSizeMin: 2,
    typicalCrewSizeMax: 4,
    laborDrivers: [
      "Ceiling access",
      "Emitter spacing",
      "Zone design",
      "Controller installation",
      "Paging integration",
      "Acoustic tuning",
      "After-hours commissioning",
      "Speech-privacy validation",
    ],
    conditions: [],
    ruleTags: [
      "sound-masking-labor",
      "acoustic-commissioning",
      "speech-privacy",
    ],
  },
];
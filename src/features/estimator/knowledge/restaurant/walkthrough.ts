import type {
  PlaybookChecklistItem,
  PlaybookMeasurement,
  PlaybookPhotoRequirement,
} from "../playbook";

export const restaurantWalkthroughChecklist: PlaybookChecklistItem[] = [
  {
    id: "restaurant.walkthrough.verifyLayout",
    label: "Verify restaurant layout",
    instructions:
      "Confirm dining, kitchen, bar, pickup, delivery, office, storage, restroom, patio, parking, drive-through, and exterior service areas.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-layout",
      "scope-verification",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyOperations",
    label: "Verify operating restrictions",
    instructions:
      "Document business hours, food-preparation periods, deliveries, cleaning schedules, customer traffic, shutdown windows, and restricted work areas.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "restaurant-operations",
      "schedule-review",
      "productivity-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifySanitation",
    label: "Verify sanitation requirements",
    instructions:
      "Confirm dust-control requirements, food-protection responsibilities, kitchen-access restrictions, cleanup expectations, PPE, and surface-protection requirements.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "food-safety-review",
      "sanitation-coordination",
      "dust-control",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyCeilings",
    label: "Inspect ceiling conditions",
    instructions:
      "Verify ceiling types, heights, access points, soffits, sealed areas, kitchen panels, architectural obstructions, and available mounting surfaces.",
    category: "property",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-verification",
      "pathway-review",
      "mounting-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyPathways",
    label: "Inspect cable pathways",
    instructions:
      "Inspect ceiling spaces, conduit, raceway, cable supports, sleeves, floor pathways, exterior routes, tenant separations, and pathway capacity.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-review",
      "conduit-review",
      "cable-support-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyFirestop",
    label: "Identify rated penetrations",
    instructions:
      "Identify fire-rated walls, floors, tenant separations, kitchen barriers, shafts, existing sleeves, and firestop documentation requirements.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "inspection-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyNetworkLocation",
    label: "Inspect network equipment location",
    instructions:
      "Verify modem, router, firewall, switches, patch panels, POS equipment, NVR, audio equipment, UPS units, available space, cooling, security, and cable management.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-headend",
      "rack-capacity-review",
      "network-cleanup",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyPower",
    label: "Verify electrical power",
    instructions:
      "Confirm outlets, dedicated circuits, receptacle type, UPS capacity, grounding, and power availability near racks, controllers, amplifiers, displays, and exterior equipment.",
    category: "power",
    required: true,
    conditions: [],
    ruleTags: [
      "power-verification",
      "electrical-coordination",
      "ups-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyPosCoordination",
    label: "Verify point-of-sale coordination",
    instructions:
      "Document POS vendor, payment processor, kitchen display systems, online ordering, delivery tablets, printers, VLAN requirements, and vendor responsibilities.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "pos-coordination",
      "pci-network-separation",
      "vendor-integration",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyCameraViews",
    label: "Verify camera views",
    instructions:
      "Confirm each proposed camera view, mounting surface, target distance, lighting, privacy restrictions, cable route, service access, and identification objective.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-layout",
      "lens-selection-review",
      "coverage-verification",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyTransactionViews",
    label: "Verify transaction camera views",
    instructions:
      "Confirm detailed views of registers, cash handling, pickup shelves, drive-through windows, payment terminals, and employee/customer handoffs.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-verification",
      "pixel-density-review",
      "camera-height-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyLighting",
    label: "Inspect camera lighting conditions",
    instructions:
      "Document bright entrances, dark dining areas, reflective surfaces, menu-board lighting, parking-lot lighting, drive-through headlights, and nighttime conditions.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "drive-through-lighting",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyWifiZones",
    label: "Verify wireless coverage zones",
    instructions:
      "Walk dining, kitchen, bar, patio, pickup, drive-through, office, storage, parking, and delivery areas while documenting obstructions and device usage.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design",
      "rf-obstruction-review",
      "coverage-zone-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyApMounting",
    label: "Verify access-point mounting locations",
    instructions:
      "Confirm mounting structure, height, environmental exposure, antenna orientation, nearby kitchen equipment, cable route, power source, and service access.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-point-placement",
      "antenna-review",
      "environmental-rating-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyControlledOpenings",
    label: "Inspect controlled doors and gates",
    instructions:
      "Inspect both sides of each opening for frame type, lock hardware, hinges, egress hardware, closer, power transfer, request-to-exit, door position, and cable pathway.",
    category: "access_control",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "controlled-opening",
      "access-control-design",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyLifeSafety",
    label: "Verify life-safety requirements",
    instructions:
      "Identify emergency release, fire-alarm integration, accessibility requirements, controlled exits, maglocks, delayed egress, cooler or freezer doors, and authority requirements.",
    category: "safety",
    required: true,
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
    ],
  },

  {
    id: "restaurant.walkthrough.verifyAudioZones",
    label: "Verify audio zones",
    instructions:
      "Confirm dining, bar, patio, restroom, kitchen, waiting, pickup, and private-room zones, including speaker locations, controls, ambient noise, and audio sources.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "audio-zone-review",
      "speaker-layout-review",
      "control-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyDriveThrough",
    label: "Inspect drive-through systems",
    instructions:
      "Document intercoms, headsets, lane timers, menu boards, vehicle detection, cameras, payment equipment, trenching, conduit, power, network, and vendor ownership.",
    category: "other",
    required: false,
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
      "drive-through-review",
      "vendor-integration",
      "exterior-pathway-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifySpecialEnvironments",
    label: "Inspect specialty environments",
    instructions:
      "Inspect kitchens, hoods, grease areas, washdown zones, coolers, freezers, exterior areas, chemical-storage areas, and temperature transitions.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "environmental-rating-review",
      "food-service-environment",
      "condensation-review",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyStaging",
    label: "Verify material and equipment staging",
    instructions:
      "Confirm secure storage for cable, equipment, ladders, lifts, tools, batteries, and removed materials without disrupting food service or customer operations.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "material-staging",
      "equipment-security",
      "site-logistics",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyApprovals",
    label: "Verify approvals and responsibilities",
    instructions:
      "Confirm permit responsibility, landlord approval, shopping-center requirements, general-contractor coordination, health and fire inspection requirements, and system-vendor responsibilities.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "permit-review",
      "landlord-approval",
      "scope-coordination",
    ],
  },

  {
    id: "restaurant.walkthrough.verifyCloseout",
    label: "Confirm testing and closeout requirements",
    instructions:
      "Confirm copper testing, fiber certification, Wi-Fi validation, camera acceptance, access-control testing, audio tuning, labeling, training, as-built documents, and warranty requirements.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "testing-requirements",
      "commissioning",
      "closeout-review",
    ],
  },
];

export const restaurantRequiredPhotos: PlaybookPhotoRequirement[] = [
  {
    id: "restaurant.photo.exterior",
    label: "Building exterior",
    instructions:
      "Capture entrances, storefront, patio, parking, drive-through, delivery door, dumpster area, signs, poles, and proposed exterior device locations.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "exterior-overview",
      "perimeter-review",
    ],
  },

  {
    id: "restaurant.photo.interiorOverview",
    label: "Interior overview",
    instructions:
      "Capture dining, bar, kitchen, pickup, waiting, office, storage, and ceiling conditions from multiple angles.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-overview",
      "layout-verification",
    ],
  },

  {
    id: "restaurant.photo.ceilingConditions",
    label: "Ceiling conditions",
    instructions:
      "Capture drop ceilings, drywall, open ceilings, kitchen panels, soffits, obstructions, access points, and proposed mounting surfaces.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-structure",
      "pathway-review",
      "mounting-review",
    ],
  },

  {
    id: "restaurant.photo.pathways",
    label: "Existing pathways",
    instructions:
      "Capture conduit, raceway, sleeves, cable supports, ceiling pathways, floor pathways, exterior routes, and pathway transitions.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-documentation",
      "capacity-review",
    ],
  },

  {
    id: "restaurant.photo.networkEquipment",
    label: "Network equipment location",
    instructions:
      "Capture modem, router, firewall, switches, patch panels, POS equipment, NVR, UPS, audio equipment, power, cooling, and available space.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-headend",
      "rack-documentation",
      "power-review",
    ],
  },

  {
    id: "restaurant.photo.cameraViews",
    label: "Proposed camera views",
    instructions:
      "Capture the target view from every proposed camera location and a separate photo of the mounting surface and cable route.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-view-documentation",
      "mounting-surface-review",
    ],
  },

  {
    id: "restaurant.photo.transactionAreas",
    label: "Transaction areas",
    instructions:
      "Capture registers, payment terminals, cash drawers, pickup shelves, drive-through windows, handoff points, and likely camera angles.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-verification",
      "camera-detail-review",
    ],
  },

  {
    id: "restaurant.photo.lighting",
    label: "Camera lighting conditions",
    instructions:
      "Capture bright windows, dark dining areas, menu boards, exterior lighting, drive-through lanes, reflective surfaces, and nighttime risk areas.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lighting-review",
      "wdr-review",
      "low-light-review",
    ],
  },

  {
    id: "restaurant.photo.wifiZones",
    label: "Wireless coverage areas",
    instructions:
      "Capture dining, kitchen, bar, patio, pickup, drive-through, office, storage, parking, and major wireless obstructions.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-zone-documentation",
      "rf-obstruction-review",
    ],
  },

  {
    id: "restaurant.photo.apMounting",
    label: "Access-point mounting locations",
    instructions:
      "Capture mounting structure, ceiling height, nearby kitchen equipment, environmental exposure, cable pathway, and service access.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-point-placement",
      "antenna-review",
    ],
  },

  {
    id: "restaurant.photo.controlledOpenings",
    label: "Controlled doors and gates",
    instructions:
      "Capture both sides of each opening, frame, lock, hinges, closer, egress hardware, ceiling above the door, and nearby pathways.",
    category: "access_control",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-survey",
      "hardware-review",
      "access-control-design",
    ],
  },

  {
    id: "restaurant.photo.kitchenEnvironment",
    label: "Kitchen environmental conditions",
    instructions:
      "Capture hoods, ductwork, grease exposure, steam, washdown areas, stainless surfaces, fire-suppression equipment, and proposed device locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "kitchen-environment",
      "food-service-review",
      "mounting-risk",
    ],
  },

  {
    id: "restaurant.photo.coolerFreezer",
    label: "Cooler and freezer conditions",
    instructions:
      "Capture doors, wall panels, penetrations, temperature labels, condensation, cable routes, nearby power, and proposed device locations.",
    category: "safety",
    required: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Walk-in cooler",
          "Walk-in freezer",
        ],
      },
    ],
    ruleTags: [
      "temperature-rating",
      "condensation-review",
      "sealed-penetration-review",
    ],
  },

  {
    id: "restaurant.photo.driveThrough",
    label: "Drive-through systems",
    instructions:
      "Capture menu boards, intercom posts, lane equipment, windows, timers, cameras, vehicle-detection hardware, conduit, power, and network pathways.",
    category: "other",
    required: false,
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
      "drive-through-documentation",
      "vendor-integration",
      "exterior-pathway-review",
    ],
  },
];

export const restaurantRequiredMeasurements: PlaybookMeasurement[] = [
  {
    id: "restaurant.measurement.squareFootage",
    label: "Total restaurant square footage",
    unit: "square_feet",
    instructions:
      "Record total area and separately identify dining, kitchen, bar, office, storage, patio, drive-through, and expansion areas when available.",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-size",
      "material-scaling",
      "labor-scaling",
    ],
  },

  {
    id: "restaurant.measurement.ceilingHeight",
    label: "Ceiling height",
    unit: "feet",
    instructions:
      "Measure representative heights in dining, kitchen, bar, pickup, office, and exterior mounting areas.",
    required: true,
    conditions: [],
    ruleTags: [
      "height-verification",
      "lift-review",
      "mounting-height",
    ],
  },

  {
    id: "restaurant.measurement.longestCableRoute",
    label: "Longest cable-route distance",
    unit: "feet",
    instructions:
      "Measure along the actual pathway from the network location to the farthest device, including vertical transitions and service loops.",
    required: true,
    conditions: [],
    ruleTags: [
      "copper-distance-review",
      "fiber-review",
      "cable-quantity",
    ],
  },

  {
    id: "restaurant.measurement.availableRackUnits",
    label: "Available rack units",
    unit: "count",
    instructions:
      "Count usable rack units or available enclosure space after accounting for existing equipment, cable management, UPS, ventilation, and required clearance.",
    required: true,
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity",
      "equipment-planning",
    ],
  },

  {
    id: "restaurant.measurement.availableSwitchPorts",
    label: "Available switch ports",
    unit: "count",
    instructions:
      "Record available copper and fiber ports, PoE capacity, uplink capacity, and desired spare capacity.",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "switch-capacity",
      "poe-budget",
      "future-expansion",
    ],
  },

  {
    id: "restaurant.measurement.customerCapacity",
    label: "Peak customer capacity",
    unit: "count",
    instructions:
      "Record seated occupancy, standing capacity, outdoor seating, and expected peak guest volume.",
    required: true,
    conditions: [],
    ruleTags: [
      "occupancy-review",
      "wifi-capacity",
      "audio-design",
    ],
  },

  {
    id: "restaurant.measurement.concurrentDevices",
    label: "Peak concurrent wireless devices",
    unit: "count",
    instructions:
      "Count or estimate POS tablets, handheld ordering devices, delivery tablets, printers, staff devices, customer devices, cameras, and connected restaurant equipment.",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-capacity",
      "device-density",
    ],
  },

  {
    id: "restaurant.measurement.cameraMountingHeight",
    label: "Camera mounting height",
    unit: "feet",
    instructions:
      "Measure each proposed camera height or group locations by common mounting condition.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-height",
      "lens-selection",
      "ladder-lift-review",
    ],
  },

  {
    id: "restaurant.measurement.cameraTargetDistance",
    label: "Camera target distance",
    unit: "feet",
    instructions:
      "Measure from camera location to the transaction, entrance, table, drive-through, parking, or identification target.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-design",
      "pixel-density",
      "lens-selection",
    ],
  },

  {
    id: "restaurant.measurement.recordingDays",
    label: "Required video retention",
    unit: "count",
    instructions:
      "Record retention days and identify any camera groups requiring different recording profiles or retention periods.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "storage-sizing",
      "retention-review",
    ],
  },

  {
    id: "restaurant.measurement.apMountingHeight",
    label: "Access-point mounting height",
    unit: "feet",
    instructions:
      "Measure access-point elevations in dining, kitchen, bar, patio, drive-through, and exterior areas.",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design",
      "antenna-selection",
      "mounting-review",
    ],
  },

  {
    id: "restaurant.measurement.controlledOpeningCount",
    label: "Controlled opening count",
    unit: "count",
    instructions:
      "Count employee doors, manager offices, storage rooms, liquor rooms, gates, cooler doors, freezer doors, roll-up doors, and other controlled openings separately.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "controlled-opening-count",
      "access-control-quantity",
    ],
  },

  {
    id: "restaurant.measurement.doorDimensions",
    label: "Controlled opening dimensions",
    unit: "inches",
    instructions:
      "Measure door width, height, frame dimensions, gate opening, cooler or freezer door condition, and hardware clearances where specialty hardware may be required.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "cold-storage-door-review",
      "fabrication-review",
    ],
  },

  {
    id: "restaurant.measurement.audioZoneCount",
    label: "Audio zone count",
    unit: "count",
    instructions:
      "Count dining, bar, patio, restroom, kitchen, waiting, pickup, and private-room zones requiring independent control.",
    required: false,
    conditions: [],
    ruleTags: [
      "audio-zone-count",
      "amplifier-sizing",
      "control-design",
    ],
  },

  {
    id: "restaurant.measurement.speakerCount",
    label: "Estimated speaker count",
    unit: "count",
    instructions:
      "Count proposed ceiling, pendant, surface, outdoor, kitchen, and paging speakers by zone.",
    required: false,
    conditions: [],
    ruleTags: [
      "speaker-layout",
      "audio-material-quantity",
    ],
  },

  {
    id: "restaurant.measurement.driveThroughLaneCount",
    label: "Drive-through lane count",
    unit: "count",
    instructions:
      "Count ordering points, menu boards, payment windows, pickup windows, vehicle-detection points, and lane cameras.",
    required: false,
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
      "drive-through-quantity",
      "specialty-system-design",
    ],
  },
];
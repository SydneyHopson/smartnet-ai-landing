import type {
  PlaybookChecklistItem,
  PlaybookMeasurement,
  PlaybookPhotoRequirement,
} from "../playbook";

export const warehouseWalkthroughChecklist: PlaybookChecklistItem[] = [
  {
    id: "warehouse.walkthrough.verifyFacilityLayout",
    label: "Verify facility layout and operational zones",
    instructions:
      "Confirm warehouse dimensions, shipping and receiving areas, loading docks, storage aisles, offices, production zones, exterior yards, and restricted areas.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-layout",
      "scope-verification",
      "walkthrough-required",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyOperatingConditions",
    label: "Verify operating conditions",
    instructions:
      "Document active shifts, forklift traffic, conveyor activity, inventory movement, shutdown windows, restricted aisles, and customer safety requirements.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "occupied-facility",
      "forklift-review",
      "operational-coordination",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyCeilingHeights",
    label: "Verify ceiling and mounting heights",
    instructions:
      "Measure roof-deck height, ceiling height, racking height, proposed camera height, proposed access-point height, and any areas with varying elevation.",
    category: "property",
    required: true,
    conditions: [],
    ruleTags: [
      "height-verification",
      "lift-review",
      "mounting-height",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyLiftAccess",
    label: "Verify lift access",
    instructions:
      "Confirm aisle widths, floor conditions, overhead obstructions, dock transitions, door clearances, charging access, staging areas, and safe routes for lift delivery and operation.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "lift-access-review",
      "equipment-rental",
      "site-logistics",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyPathways",
    label: "Inspect cable pathways",
    instructions:
      "Inspect cable tray, basket tray, J-hooks, conduit, sleeves, risers, underground routes, structural supports, pathway fill, accessibility, and pathway continuity.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-review",
      "cable-support-review",
      "conduit-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyRatedPenetrations",
    label: "Identify rated penetrations",
    instructions:
      "Identify fire-rated walls, floors, shafts, barriers, existing sleeves, firestop systems, labeling requirements, and documentation requirements.",
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
    id: "warehouse.walkthrough.verifyNetworkRooms",
    label: "Inspect MDF, IDF, and network enclosures",
    instructions:
      "Verify rack locations, available rack units, switch ports, patch-panel capacity, fiber shelves, grounding, cooling, security, cable management, and room accessibility.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "mdf-review",
      "idf-review",
      "rack-capacity-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyPower",
    label: "Verify electrical power",
    instructions:
      "Confirm available outlets, dedicated circuits, voltage, receptacle type, UPS capacity, grounding, and electrical-panel coordination near proposed equipment locations.",
    category: "power",
    required: true,
    conditions: [],
    ruleTags: [
      "power-verification",
      "ups-review",
      "electrical-coordination",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyFiber",
    label: "Inspect existing fiber infrastructure",
    instructions:
      "Document fiber type, strand count, connector type, patch panels, labeling, available strands, route, condition, ownership, and existing test records.",
    category: "network",
    required: false,
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
      "backbone-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyCameraViews",
    label: "Verify camera views",
    instructions:
      "Stand at each proposed camera location and confirm field of view, mounting surface, height, lighting, obstructions, identification objective, cable route, and service access.",
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
    id: "warehouse.walkthrough.verifyLighting",
    label: "Inspect camera lighting conditions",
    instructions:
      "Document low-light areas, bright dock doors, direct sunlight, headlights, reflections, nighttime conditions, infrared conflicts, and supplemental-lighting needs.",
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
      "infrared-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyRecordingLocation",
    label: "Verify recorder and storage location",
    instructions:
      "Confirm rack space, power, cooling, network connectivity, physical security, service clearance, storage capacity, and remote-access requirements.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "video-storage",
      "nvr-review",
      "rack-capacity-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyWifiZones",
    label: "Verify wireless coverage zones",
    instructions:
      "Walk all required Wi-Fi areas and document rack aisles, inventory density, freezers, offices, docks, yards, mezzanines, conveyors, machinery, and mobile-device routes.",
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
      "warehouse-mobility",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyWifiMounting",
    label: "Verify access-point mounting locations",
    instructions:
      "Confirm mounting height, structure, antenna orientation, nearby obstructions, environmental exposure, cable route, service access, and lift requirements.",
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
      "lift-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyControlledOpenings",
    label: "Inspect controlled doors and gates",
    instructions:
      "Inspect every proposed controlled opening for door type, frame type, lock hardware, hinges, egress hardware, door condition, power transfer, request-to-exit, door position, and cable pathway.",
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
    id: "warehouse.walkthrough.verifyLifeSafety",
    label: "Verify life-safety coordination",
    instructions:
      "Identify fire-alarm interfaces, emergency release requirements, egress restrictions, accessibility requirements, delayed-egress conditions, maglocks, turnstiles, and authority requirements.",
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
    id: "warehouse.walkthrough.verifyEnvironmentalConditions",
    label: "Verify specialty environmental conditions",
    instructions:
      "Inspect freezers, coolers, washdown areas, dusty areas, corrosive zones, high-temperature areas, exterior exposures, and classified locations.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "environmental-rating-review",
      "temperature-rating",
      "hazardous-area-review",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyStaging",
    label: "Verify material and equipment staging",
    instructions:
      "Confirm secure storage for cable, equipment, lifts, tools, batteries, consumables, and removed materials without interfering with warehouse operations.",
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
    id: "warehouse.walkthrough.verifyDocumentation",
    label: "Collect available project documentation",
    instructions:
      "Request floor plans, reflected ceiling plans, rack elevations, network diagrams, door schedules, equipment standards, safety rules, and construction schedules.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "document-review",
      "design-inputs",
      "scope-verification",
    ],
  },

  {
    id: "warehouse.walkthrough.verifyCustomerAcceptance",
    label: "Confirm testing and acceptance requirements",
    instructions:
      "Confirm copper testing, fiber certification, Wi-Fi validation, camera acceptance views, access-control testing, labeling, as-built documentation, training, and closeout requirements.",
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

export const warehouseRequiredPhotos: PlaybookPhotoRequirement[] = [
  {
    id: "warehouse.photo.buildingExterior",
    label: "Building exterior",
    instructions:
      "Capture each exterior elevation, entrances, loading docks, yard areas, parking areas, gates, poles, and proposed exterior device locations.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "exterior-overview",
      "perimeter-review",
    ],
  },

  {
    id: "warehouse.photo.warehouseOverview",
    label: "Warehouse interior overview",
    instructions:
      "Capture wide views from multiple corners showing ceiling structure, racking, aisles, conveyors, machinery, inventory density, and operating conditions.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-overview",
      "layout-verification",
    ],
  },

  {
    id: "warehouse.photo.ceilingStructure",
    label: "Ceiling and roof-deck structure",
    instructions:
      "Capture roof deck, beams, joists, trusses, obstructions, existing supports, lighting, and proposed mounting surfaces.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-structure",
      "mounting-review",
      "pathway-review",
    ],
  },

  {
    id: "warehouse.photo.pathways",
    label: "Existing cable pathways",
    instructions:
      "Capture cable tray, basket tray, J-hooks, conduit, sleeves, risers, pathway fill, damaged sections, and route transitions.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-documentation",
      "capacity-review",
    ],
  },

  {
    id: "warehouse.photo.ratedPenetrations",
    label: "Rated walls and penetrations",
    instructions:
      "Capture fire-rated barriers, sleeves, existing firestop, labels, damaged firestop, and proposed penetration locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "firestopping",
      "rated-penetration",
    ],
  },

  {
    id: "warehouse.photo.networkRooms",
    label: "Network rooms and racks",
    instructions:
      "Capture full rack views, rack labels, patch panels, switches, fiber shelves, UPS units, grounding, power, cooling, cable management, and available rack space.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-documentation",
      "mdf-review",
      "idf-review",
    ],
  },

  {
    id: "warehouse.photo.powerLocations",
    label: "Equipment power locations",
    instructions:
      "Capture receptacles, circuit labels, UPS equipment, electrical proximity, grounding points, and proposed equipment locations.",
    category: "power",
    required: true,
    conditions: [],
    ruleTags: [
      "power-verification",
      "electrical-coordination",
    ],
  },

  {
    id: "warehouse.photo.cameraViews",
    label: "Proposed camera views",
    instructions:
      "Capture the intended view from each proposed mounting location and a separate photo showing the mounting surface and cable route.",
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
    id: "warehouse.photo.cameraLighting",
    label: "Camera lighting conditions",
    instructions:
      "Capture dock doors, dark aisles, exterior nighttime areas, reflective surfaces, direct sunlight, and other challenging lighting conditions.",
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
    id: "warehouse.photo.wifiZones",
    label: "Wireless coverage areas",
    instructions:
      "Capture aisles, racking, inventory, freezers, machinery, mezzanines, docks, yards, and mobile-device routes.",
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
    id: "warehouse.photo.apMounting",
    label: "Access-point mounting locations",
    instructions:
      "Capture the proposed mounting structure, nearby obstructions, antenna orientation area, environmental exposure, and cable pathway.",
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
    id: "warehouse.photo.controlledOpenings",
    label: "Controlled doors and gates",
    instructions:
      "Capture both sides of each opening, frame, lock, hinges, egress hardware, door closer, power-transfer area, ceiling above the door, and nearby pathway.",
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
    id: "warehouse.photo.specialEnvironments",
    label: "Special environmental areas",
    instructions:
      "Capture freezers, coolers, washdown zones, dusty areas, corrosive areas, hazardous locations, exterior exposures, and equipment labels.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "environmental-review",
      "hazardous-area-review",
    ],
  },

  {
    id: "warehouse.photo.liftRoutes",
    label: "Lift routes and access constraints",
    instructions:
      "Capture aisle widths, door clearances, dock transitions, floor conditions, overhead obstructions, staging areas, and charging locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "lift-access-review",
      "site-logistics",
    ],
  },
];

export const warehouseRequiredMeasurements: PlaybookMeasurement[] = [
  {
    id: "warehouse.measurement.totalSquareFootage",
    label: "Total facility square footage",
    unit: "square_feet",
    instructions:
      "Record the total warehouse area and separately identify office, production, freezer, yard, mezzanine, and expansion areas when available.",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-size",
      "material-scaling",
      "labor-scaling",
    ],
  },

  {
    id: "warehouse.measurement.ceilingHeight",
    label: "Ceiling or roof-deck height",
    unit: "feet",
    instructions:
      "Measure the highest and lowest installation elevations and note areas with different ceiling heights.",
    required: true,
    conditions: [],
    ruleTags: [
      "height-verification",
      "lift-review",
    ],
  },

  {
    id: "warehouse.measurement.rackHeight",
    label: "Warehouse racking height",
    unit: "feet",
    instructions:
      "Measure representative rack heights and identify floor-to-ceiling storage areas that may affect cameras, Wi-Fi, pathways, or lift access.",
    required: true,
    conditions: [],
    ruleTags: [
      "rack-obstruction-review",
      "rf-design",
      "camera-design",
    ],
  },

  {
    id: "warehouse.measurement.aisleWidth",
    label: "Warehouse aisle width",
    unit: "feet",
    instructions:
      "Measure representative narrow and standard aisles to confirm lift type, access, work-zone controls, and equipment placement.",
    required: true,
    conditions: [],
    ruleTags: [
      "lift-access",
      "aisle-clearance",
      "site-logistics",
    ],
  },

  {
    id: "warehouse.measurement.longestCableRoute",
    label: "Longest cable-route distance",
    unit: "feet",
    instructions:
      "Measure along the actual proposed pathway from the serving rack or enclosure to the farthest device, including vertical transitions and service loops.",
    required: true,
    conditions: [],
    ruleTags: [
      "copper-distance-review",
      "fiber-review",
      "cable-quantity",
    ],
  },

  {
    id: "warehouse.measurement.networkRoomCount",
    label: "Network room and enclosure count",
    unit: "count",
    instructions:
      "Count all MDFs, IDFs, wall enclosures, floor racks, remote cabinets, and existing telecom spaces serving the project.",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "mdf-count",
      "idf-count",
      "backbone-design",
    ],
  },

  {
    id: "warehouse.measurement.availableRackUnits",
    label: "Available rack units",
    unit: "count",
    instructions:
      "Count usable rack units after accounting for existing equipment, clearance, cable management, UPS units, fiber shelves, and reserved space.",
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
    id: "warehouse.measurement.availableSwitchPorts",
    label: "Available switch ports",
    unit: "count",
    instructions:
      "Record available copper and fiber switch ports, PoE capacity, uplink capacity, and planned spare capacity.",
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
    id: "warehouse.measurement.loadingDockCount",
    label: "Loading dock count",
    unit: "count",
    instructions:
      "Count dock-high doors, drive-in doors, shipping entrances, receiving entrances, trailer positions, and exterior approach lanes.",
    required: true,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Loading docks",
          "Receiving area",
          "Shipping area",
        ],
      },
    ],
    ruleTags: [
      "loading-dock-review",
      "camera-quantity",
      "perimeter-design",
    ],
  },

  {
    id: "warehouse.measurement.cameraMountingHeight",
    label: "Camera mounting height",
    unit: "feet",
    instructions:
      "Measure each proposed camera height or group locations by common elevation and mounting condition.",
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
      "lift-review",
    ],
  },

  {
    id: "warehouse.measurement.cameraTargetDistance",
    label: "Camera target distance",
    unit: "feet",
    instructions:
      "Measure the distance from each proposed camera to the target area for overview, recognition, identification, package detail, or license-plate capture.",
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
    id: "warehouse.measurement.recordingDays",
    label: "Required video retention",
    unit: "count",
    instructions:
      "Record required retention days and identify any camera groups with different retention or recording-profile requirements.",
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
    id: "warehouse.measurement.apMountingHeight",
    label: "Access-point mounting height",
    unit: "feet",
    instructions:
      "Measure proposed access-point mounting elevations and identify different mounting heights across warehouse zones.",
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
      "lift-review",
    ],
  },

  {
    id: "warehouse.measurement.concurrentWirelessDevices",
    label: "Peak concurrent wireless devices",
    unit: "count",
    instructions:
      "Count or estimate scanners, tablets, phones, laptops, printers, sensors, robots, cameras, and vehicle-mounted terminals active during the busiest shift.",
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
    id: "warehouse.measurement.controlledOpeningCount",
    label: "Controlled opening count",
    unit: "count",
    instructions:
      "Count personnel doors, vehicle gates, roll-up doors, turnstiles, cages, mantraps, and other controlled barriers separately.",
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
    id: "warehouse.measurement.doorDimensions",
    label: "Controlled opening dimensions",
    unit: "inches",
    instructions:
      "Measure door width, height, frame dimensions, gate opening, roll-up opening, and hardware clearances where specialty hardware may be required.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "gate-design",
      "fabrication-review",
    ],
  },
];
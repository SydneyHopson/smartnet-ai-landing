import type {
  PlaybookChecklistItem,
  PlaybookMeasurement,
  PlaybookPhotoRequirement,
} from "../playbook";

export const officeWalkthroughChecklist: PlaybookChecklistItem[] = [
  {
    id: "office.walk.siteExterior",
    label: "Walk the building exterior",
    instructions:
      "Identify entrances, exits, loading areas, parking, service entrances, exterior cameras, access-controlled openings, conduit routes, telecom entrances, and outdoor Wi-Fi coverage.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "walkthrough",
      "exterior",
      "site-verification",
    ],
  },

  {
    id: "office.walk.facilityLayout",
    label: "Verify the office layout",
    instructions:
      "Confirm reception, open office areas, private offices, executive spaces, conference rooms, training rooms, break rooms, storage, telecom rooms, shared spaces, and restricted areas.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-layout",
      "scope-verification",
      "office-zones",
    ],
  },

  {
    id: "office.walk.operatingConditions",
    label: "Verify operating conditions",
    instructions:
      "Document office hours, employee occupancy, meetings, quiet periods, customer activity, executive schedules, shutdown windows, security access, and restricted work areas.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "office-operations",
      "schedule-review",
      "productivity-review",
    ],
  },

  {
    id: "office.walk.telecomRooms",
    label: "Inspect all telecom rooms",
    instructions:
      "Document MDFs, IDFs, racks, enclosures, UPS units, switches, patch panels, fiber shelves, grounding, cooling, power, cable management, available rack space, switch capacity, and future expansion.",
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
      "switch-capacity-review",
    ],
  },

  {
    id: "office.walk.power",
    label: "Verify equipment power",
    instructions:
      "Confirm outlets, dedicated circuits, receptacle types, UPS capacity, grounding, and electrical availability near racks, displays, conferencing systems, scheduling panels, controllers, and other equipment.",
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
    id: "office.walk.ceilings",
    label: "Inspect ceiling conditions",
    instructions:
      "Verify ceiling types, heights, access points, soffits, open ceilings, acoustic systems, obstructions, utilities, mounting surfaces, and areas with limited access.",
    category: "property",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-verification",
      "mounting-review",
      "pathway-review",
    ],
  },

  {
    id: "office.walk.pathways",
    label: "Inspect cable pathways",
    instructions:
      "Verify cable tray, J-hooks, conduit, sleeves, risers, raised floors, floor boxes, poke-throughs, furniture pathways, surface raceway, pathway fill, accessibility, and continuity.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-review",
      "furniture-pathway-review",
      "floor-box-review",
      "conduit-review",
    ],
  },

  {
    id: "office.walk.firestop",
    label: "Identify rated penetrations",
    instructions:
      "Identify fire-rated walls, tenant separations, floors, shafts, risers, existing sleeves, firestop systems, labels, damaged penetrations, and documentation requirements.",
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
    id: "office.walk.floorPathways",
    label: "Inspect floor and furniture pathways",
    instructions:
      "Verify floor boxes, poke-throughs, slab penetrations, raised-floor routes, furniture feeds, power poles, modular furniture pathways, and access below the floor.",
    category: "cabling",
    required: false,
    conditions: [],
    ruleTags: [
      "floor-core-review",
      "furniture-coordination",
      "raised-floor-review",
      "structural-scan-review",
    ],
  },

  {
    id: "office.walk.furniture",
    label: "Verify furniture coordination",
    instructions:
      "Document cubicles, benching systems, sit-stand desks, modular furniture, power poles, table connections, furniture feeds, delivery schedules, and furniture-vendor responsibilities.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "furniture-coordination",
      "modular-furniture",
      "installation-sequencing",
    ],
  },

  {
    id: "office.walk.fiber",
    label: "Inspect existing fiber infrastructure",
    instructions:
      "Document fiber type, strand count, connectors, patch panels, routes, labeling, ownership, available strands, condition, and existing test records.",
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
    id: "office.walk.networkRequirements",
    label: "Verify network requirements",
    instructions:
      "Document employee, guest, voice, camera, access-control, audiovisual, printer, IoT, building-system, and vendor network requirements, including VLANs, authentication, firewall policies, and remote access.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "office-network-segmentation",
      "vlan-review",
      "cybersecurity-review",
      "iot-isolation",
    ],
  },

  {
    id: "office.walk.wifi",
    label: "Evaluate Wi-Fi coverage",
    instructions:
      "Walk open offices, private offices, conference rooms, training rooms, executive spaces, lobbies, break rooms, call-center areas, shared spaces, exterior areas, and mobile-worker routes.",
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
      "coverage-zone-review",
      "wireless-survey",
    ],
  },

  {
    id: "office.walk.rfConditions",
    label: "Inspect wireless obstructions and interference",
    instructions:
      "Document concrete, glass, metal partitions, movable walls, elevators, acoustic materials, dense furniture, neighboring wireless systems, high-density rooms, and other interference sources.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "interference-review",
      "high-density-wireless",
    ],
  },

  {
    id: "office.walk.apMounting",
    label: "Verify access-point mounting locations",
    instructions:
      "Confirm mounting height, structure, ceiling condition, cable route, antenna orientation, nearby obstructions, service access, appearance requirements, and lift needs.",
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
      "mounting-review",
    ],
  },

  {
    id: "office.walk.cameraViews",
    label: "Verify camera views",
    instructions:
      "Confirm each proposed camera field of view, mounting surface, height, target distance, lighting, privacy restrictions, cable route, identification objective, and service access.",
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
      "coverage-verification",
      "lens-selection-review",
    ],
  },

  {
    id: "office.walk.cameraPrivacy",
    label: "Verify camera privacy boundaries",
    instructions:
      "Identify private offices, human-resources areas, legal workspaces, executive spaces, employee desks, screens, whiteboards, wellness rooms, break rooms, and other restricted views.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "employee-privacy",
      "camera-restrictions",
      "confidential-information-review",
    ],
  },

  {
    id: "office.walk.cameraLighting",
    label: "Inspect camera lighting conditions",
    instructions:
      "Document bright glass entrances, reflections, dim hallways, parking areas, nighttime exterior conditions, headlights, backlighting, and infrared conflicts.",
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
      "reflection-review",
    ],
  },

  {
    id: "office.walk.controlledOpenings",
    label: "Inspect controlled doors and barriers",
    instructions:
      "Inspect both sides of each controlled door, elevator, turnstile, gate, or barrier for frame type, lock, hinges, closer, egress hardware, power transfer, request-to-exit, door position, interfaces, and cable pathway.",
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
    id: "office.walk.lifeSafety",
    label: "Verify life-safety and accessibility requirements",
    instructions:
      "Identify fire-alarm interfaces, emergency release, maglocks, delayed egress, automatic doors, elevators, turnstiles, controlled exits, accessibility requirements, and authority requirements.",
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
      "accessibility-review",
      "fire-alarm-interface-review",
    ],
  },

  {
    id: "office.walk.conferenceRooms",
    label: "Inspect conference and collaboration rooms",
    instructions:
      "Document room dimensions, seating, displays, walls, furniture, cameras, microphones, speakers, table connectivity, control locations, lighting, acoustics, power, network, and scheduling-panel locations.",
    category: "other",
    required: true,
    conditions: [],
    ruleTags: [
      "conference-room",
      "av-design",
      "collaboration-space-review",
    ],
  },

  {
    id: "office.walk.avPlatforms",
    label: "Verify conferencing platform requirements",
    instructions:
      "Confirm Microsoft Teams, Zoom, Webex, Google Meet, SIP, bring-your-own-device, account, licensing, room-resource, administration, and support requirements.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "collaboration-platform",
      "licensing-review",
      "customer-it-coordination",
    ],
  },

  {
    id: "office.walk.acoustics",
    label: "Inspect acoustic conditions",
    instructions:
      "Document glass walls, open ceilings, movable partitions, HVAC noise, reverberation, background conversations, speech-privacy concerns, and room-dividing configurations.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "acoustic-review",
      "conference-audio",
      "speech-privacy",
      "sound-masking",
    ],
  },

  {
    id: "office.walk.digitalSignage",
    label: "Inspect digital-signage locations",
    instructions:
      "Verify display locations, wall construction, mounting surfaces, orientation, brightness, viewing distance, power, network, media-player locations, and content-management requirements.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "digital-signage",
      "display-mounting-review",
      "content-management",
    ],
  },

  {
    id: "office.walk.staging",
    label: "Verify material and equipment staging",
    instructions:
      "Confirm secure storage for cable, equipment, displays, racks, ladders, lifts, tools, batteries, consumables, packaging, and removed materials without disrupting office operations.",
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
    id: "office.walk.approvals",
    label: "Verify building approvals and responsibilities",
    instructions:
      "Confirm permits, inspections, landlord approval, property-management requirements, structural scans, elevator coordination, union requirements, loading access, fire-alarm coordination, and contractor responsibilities.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "permit-review",
      "landlord-approval",
      "property-management-coordination",
      "scope-coordination",
    ],
  },

  {
    id: "office.walk.documentation",
    label: "Collect existing documentation",
    instructions:
      "Request floor plans, reflected ceiling plans, furniture plans, rack elevations, telecom drawings, network diagrams, door schedules, audiovisual standards, building rules, and construction schedules.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "documentation",
      "design-inputs",
      "building-standard-review",
    ],
  },

  {
    id: "office.walk.closeout",
    label: "Confirm testing and closeout requirements",
    instructions:
      "Confirm copper certification, fiber testing, wireless validation, camera acceptance, access-control testing, audiovisual commissioning, acoustic testing, labeling, training, as-built documentation, warranty, and support requirements.",
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

export const officeRequiredPhotos: PlaybookPhotoRequirement[] = [
  {
    id: "office.photo.exterior",
    label: "Building exterior",
    instructions:
      "Capture entrances, exits, parking, loading areas, service entrances, telecom entrances, exterior pathways, gates, poles, and proposed exterior device locations.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "exterior",
      "perimeter-review",
    ],
  },

  {
    id: "office.photo.interiorOverview",
    label: "Office interior overview",
    instructions:
      "Capture reception, open offices, private offices, conference areas, lobbies, executive spaces, break rooms, and representative ceiling conditions.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "facility-overview",
      "layout-verification",
    ],
  },

  {
    id: "office.photo.telecom",
    label: "Telecom rooms and racks",
    instructions:
      "Photograph each rack, enclosure, UPS, switch stack, patch panel, fiber shelf, firewall, grounding point, power source, cooling condition, and cable-management area.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "rack-documentation",
      "mdf-review",
      "idf-review",
    ],
  },

  {
    id: "office.photo.ceilings",
    label: "Typical ceiling conditions",
    instructions:
      "Capture representative drop ceilings, drywall ceilings, open ceilings, acoustic systems, soffits, obstructions, utilities, and proposed mounting surfaces.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "ceiling-structure",
      "mounting-review",
    ],
  },

  {
    id: "office.photo.pathways",
    label: "Cable pathways",
    instructions:
      "Document conduit, cable tray, J-hooks, sleeves, risers, floor boxes, poke-throughs, raised floors, furniture pathways, surface raceway, and pathway transitions.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "pathway-documentation",
      "capacity-review",
    ],
  },

  {
    id: "office.photo.firestop",
    label: "Rated walls and penetrations",
    instructions:
      "Capture fire-rated walls, tenant separations, sleeves, existing firestop, labels, damaged penetrations, and proposed penetration locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "firestopping",
      "rated-penetration",
    ],
  },

  {
    id: "office.photo.furniture",
    label: "Furniture and workspace pathways",
    instructions:
      "Capture cubicles, benching systems, sit-stand desks, modular furniture, floor feeds, power poles, table connections, and furniture pathway conditions.",
    category: "other",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "furniture-coordination",
      "modular-furniture",
    ],
  },

  {
    id: "office.photo.wifiZones",
    label: "Wireless coverage areas",
    instructions:
      "Capture open offices, conference rooms, training rooms, executive areas, lobbies, call-center spaces, shared spaces, dense furniture, glass, elevators, and major RF obstructions.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "wifi-zone-documentation",
      "rf-obstruction-review",
    ],
  },

  {
    id: "office.photo.apMounting",
    label: "Access-point mounting locations",
    instructions:
      "Capture proposed mounting structure, ceiling height, nearby obstructions, antenna area, cable pathway, appearance requirements, and service access.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "access-point-placement",
      "mounting-review",
    ],
  },

  {
    id: "office.photo.cameraViews",
    label: "Proposed camera views",
    instructions:
      "Capture the target view from each proposed camera location and a separate photo showing the mounting surface, cable route, lighting, and nearby obstructions.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "camera-view-documentation",
      "mounting-surface-review",
    ],
  },

  {
    id: "office.photo.cameraLighting",
    label: "Camera lighting conditions",
    instructions:
      "Capture bright glass, reflections, dim hallways, parking areas, nighttime exterior zones, headlights, backlighting, and other difficult lighting conditions.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "lighting-review",
      "wdr-review",
      "low-light-review",
    ],
  },

  {
    id: "office.photo.controlledOpenings",
    label: "Controlled doors and barriers",
    instructions:
      "Capture both sides of each controlled door, elevator, turnstile, gate, or barrier, including the frame, lock, hinges, closer, egress hardware, interfaces, ceiling above, and nearby pathways.",
    category: "access_control",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "photo",
      "door-survey",
      "hardware-review",
      "access-control-design",
    ],
  },

  {
    id: "office.photo.conference",
    label: "Conference and collaboration rooms",
    instructions:
      "Capture room layouts, seating, displays, display walls, tables, cameras, microphones, speakers, control locations, scheduling-panel locations, lighting, and acoustic conditions.",
    category: "other",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "conference-room",
      "av-design",
    ],
  },

  {
    id: "office.photo.digitalSignage",
    label: "Digital-signage locations",
    instructions:
      "Capture proposed display walls, mounting surfaces, viewing areas, power, network, ambient lighting, player locations, and architectural constraints.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "photo",
      "digital-signage",
      "display-mounting-review",
    ],
  },

  {
    id: "office.photo.liftRoutes",
    label: "Lift and equipment-access routes",
    instructions:
      "Capture corridor widths, door clearances, elevators, floor conditions, furniture obstructions, staging areas, loading access, overhead obstructions, and charging locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "photo",
      "lift-access-review",
      "site-logistics",
    ],
  },
];

export const officeRequiredMeasurements: PlaybookMeasurement[] = [
  {
    id: "office.measure.squareFootage",
    label: "Total office square footage",
    unit: "square_feet",
    instructions:
      "Measure or verify total project area and separately identify office, conference, executive, telecom, shared, exterior, and future-expansion areas.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "facility-size",
      "scope",
    ],
  },

  {
    id: "office.measure.floorCount",
    label: "Floor and suite count",
    unit: "count",
    instructions:
      "Count all floors, suites, connected spaces, remote office areas, and separate tenant areas included in the project.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "multi-floor-review",
      "scope-segmentation",
    ],
  },

  {
    id: "office.measure.ceilingHeight",
    label: "Ceiling heights",
    unit: "feet",
    instructions:
      "Measure representative ceiling heights in open offices, private offices, conference rooms, lobbies, atriums, training rooms, and exterior areas.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "ceiling-height",
      "lift-review",
    ],
  },

  {
    id: "office.measure.cableRuns",
    label: "Longest cable-route distance",
    unit: "feet",
    instructions:
      "Measure along the actual proposed pathway from the serving telecom room to the farthest device, including vertical transitions and service loops.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "cabling",
      "fiber-review",
    ],
  },

  {
    id: "office.measure.telecomRoomCount",
    label: "Telecom room and enclosure count",
    unit: "count",
    instructions:
      "Count MDFs, IDFs, racks, wall enclosures, remote cabinets, and existing telecom spaces serving the project.",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "mdf-count",
      "idf-count",
      "backbone-design",
    ],
  },

  {
    id: "office.measure.rackSpace",
    label: "Available rack units",
    unit: "count",
    instructions:
      "Record usable rack units after accounting for existing equipment, cable management, UPS units, fiber shelves, airflow, security, and reserved expansion space.",
    required: true,
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "rack-capacity",
      "equipment-planning",
    ],
  },

  {
    id: "office.measure.switchPorts",
    label: "Available switch ports",
    unit: "count",
    instructions:
      "Record available copper and fiber switch ports, PoE capacity, uplink capacity, and desired spare capacity.",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "switch-capacity",
      "poe-budget",
    ],
  },

  {
    id: "office.measure.concurrentDevices",
    label: "Peak concurrent wireless devices",
    unit: "count",
    instructions:
      "Count or estimate employee laptops, phones, tablets, conference devices, printers, guest devices, IoT sensors, displays, and smart-office equipment.",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "wifi-capacity",
      "device-density",
    ],
  },

  {
    id: "office.measure.apHeight",
    label: "Access-point mounting height",
    unit: "feet",
    instructions:
      "Measure proposed access-point elevations and identify different ceiling, wall, open-ceiling, lobby, and exterior mounting conditions.",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "wifi-design",
      "mounting-review",
    ],
  },

  {
    id: "office.measure.cameraHeight",
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
      "measurement",
      "camera-height",
      "lens-selection",
    ],
  },

  {
    id: "office.measure.cameraDistance",
    label: "Camera target distance",
    unit: "feet",
    instructions:
      "Measure from each proposed camera location to the entrance, hallway, parking, lobby, server room, or identification target.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "camera-design",
      "pixel-density",
    ],
  },

  {
    id: "office.measure.recordingDays",
    label: "Required video retention",
    unit: "count",
    instructions:
      "Record retention days and identify camera groups with different recording profiles, legal-hold requirements, or retention policies.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "storage-sizing",
      "retention-review",
    ],
  },

  {
    id: "office.measure.controlledOpenings",
    label: "Controlled opening count",
    unit: "count",
    instructions:
      "Count personnel doors, elevators, turnstiles, gates, glass doors, automatic doors, cabinets, and other controlled barriers separately.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "controlled-opening-count",
      "access-control-quantity",
    ],
  },

  {
    id: "office.measure.doorDimensions",
    label: "Controlled opening dimensions",
    unit: "inches",
    instructions:
      "Measure door width, height, frame dimensions, glass-door conditions, gate openings, turnstile clearances, elevator interfaces, and specialty hardware clearances.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "door-hardware-review",
      "fabrication-review",
    ],
  },

  {
    id: "office.measure.conferenceRoomCount",
    label: "Conference and collaboration room count",
    unit: "count",
    instructions:
      "Count boardrooms, conference rooms, huddle rooms, training rooms, divisible rooms, executive meeting rooms, and collaboration spaces by type.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "conference-room-count",
      "av-design",
    ],
  },

  {
    id: "office.measure.conferenceRoomDimensions",
    label: "Conference room dimensions",
    unit: "feet",
    instructions:
      "Measure room length, width, ceiling height, table dimensions, seating distance, display-wall dimensions, camera distance, and microphone coverage area.",
    required: true,
    conditions: [],
    ruleTags: [
      "measurement",
      "conference-room",
      "display-sizing",
      "camera-framing",
    ],
  },

  {
    id: "office.measure.displayCount",
    label: "Display count",
    unit: "count",
    instructions:
      "Count conference-room displays, lobby displays, signage displays, training displays, video-wall panels, and interactive displays by location.",
    required: false,
    conditions: [],
    ruleTags: [
      "measurement",
      "display-quantity",
      "digital-signage",
    ],
  },

  {
    id: "office.measure.soundMaskingArea",
    label: "Sound-masking coverage area",
    unit: "square_feet",
    instructions:
      "Measure open-office, private-office, legal, human-resources, executive, call-center, and other areas requiring sound masking or speech privacy.",
    required: false,
    conditions: [],
    ruleTags: [
      "measurement",
      "sound-masking",
      "speech-privacy",
    ],
  },

  {
    id: "office.measure.liftClearance",
    label: "Lift and equipment clearance",
    unit: "inches",
    instructions:
      "Measure corridor widths, door openings, elevator dimensions, turning clearances, loading access, and staging clearances for lifts and large equipment.",
    required: false,
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "measurement",
      "lift-access",
      "equipment-clearance",
    ],
  },
];
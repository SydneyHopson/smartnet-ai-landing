import type {
  PlaybookChecklistItem,
  PlaybookMeasurement,
  PlaybookPhotoRequirement,
} from "../playbook";

export const medicalWalkthroughChecklist: PlaybookChecklistItem[] = [
  {
    id: "medical.walkthrough.verifyFacilityLayout",
    label: "Verify facility layout and clinical zones",
    instructions:
      "Confirm reception, waiting, exam, treatment, procedure, imaging, laboratory, pharmacy, records, administrative, staff, telecom, exterior, and restricted areas.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-layout",
      "clinical-zone-review",
      "scope-verification",
    ],
  },

  {
    id: "medical.walkthrough.verifyClinicalOperations",
    label: "Verify clinical operating conditions",
    instructions:
      "Document patient schedules, provider schedules, treatment activity, imaging use, pharmacy hours, laboratory work, cleaning schedules, shutdown windows, escorts, and restricted areas.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "clinical-operations",
      "schedule-review",
      "productivity-review",
    ],
  },

  {
    id: "medical.walkthrough.verifyInfectionControl",
    label: "Verify infection-control requirements",
    instructions:
      "Confirm infection-control risk assessment requirements, containment barriers, HEPA filtration, negative air, ceiling-access permits, PPE, cleaning procedures, approved tools, and facility approval.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "infection-control",
      "dust-containment",
      "clinical-safety",
    ],
  },

  {
    id: "medical.walkthrough.verifyPrivacyRestrictions",
    label: "Verify privacy and photography restrictions",
    instructions:
      "Identify areas where photographs, recording, documentation, device access, or unescorted work are prohibited because of patients, records, protected information, or facility policy.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "patient-privacy",
      "hipaa-coordination",
      "photo-restriction",
    ],
  },

  {
    id: "medical.walkthrough.verifyCeilingConditions",
    label: "Inspect ceiling and above-ceiling conditions",
    instructions:
      "Verify ceiling type, height, access, sealed areas, utilities, infection-control exposure, congestion, mounting surfaces, and approved access methods.",
    category: "property",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-verification",
      "clinical-pathway-review",
      "mounting-review",
    ],
  },

  {
    id: "medical.walkthrough.verifyPathways",
    label: "Inspect cable pathways",
    instructions:
      "Inspect conduit, cable tray, J-hooks, sleeves, risers, above-ceiling routes, floor pathways, pathway fill, support methods, accessibility, and continuity.",
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
    id: "medical.walkthrough.verifyRatedBarriers",
    label: "Identify fire-rated and smoke-rated barriers",
    instructions:
      "Document fire walls, smoke barriers, floors, shafts, compartments, existing sleeves, firestop systems, labels, inspection requirements, and facility documentation standards.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
    ],
  },

  {
    id: "medical.walkthrough.verifyTelecomRooms",
    label: "Inspect telecom rooms and racks",
    instructions:
      "Verify MDFs, IDFs, racks, enclosures, available rack units, switches, patch panels, fiber shelves, UPS units, grounding, cooling, security, cable management, and service clearance.",
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
    id: "medical.walkthrough.verifyPower",
    label: "Verify electrical power and backup",
    instructions:
      "Confirm outlets, dedicated circuits, receptacle type, voltage, grounding, UPS capacity, emergency-power availability, and electrical coordination near proposed equipment.",
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
    id: "medical.walkthrough.verifyFiber",
    label: "Inspect existing fiber infrastructure",
    instructions:
      "Document fiber type, strand count, connector type, route, patch panels, labeling, available strands, ownership, condition, and existing test records.",
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
    id: "medical.walkthrough.verifyNetworkSegmentation",
    label: "Verify network and vendor requirements",
    instructions:
      "Document clinical, administrative, guest, security, medical-device, imaging, laboratory, pharmacy, voice, building-system, and vendor-managed network requirements.",
    category: "network",
    required: true,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "healthcare-network-segmentation",
      "medical-device-isolation",
      "vendor-coordination",
    ],
  },

  {
    id: "medical.walkthrough.verifyWifiZones",
    label: "Verify wireless coverage zones",
    instructions:
      "Walk reception, waiting, exam, treatment, imaging, laboratory, pharmacy, offices, hallways, staff areas, exterior spaces, and mobile-device routes.",
    category: "wifi",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "medical-wifi-design",
      "clinical-roaming",
      "coverage-zone-review",
    ],
  },

  {
    id: "medical.walkthrough.verifyRfConditions",
    label: "Inspect wireless obstructions and interference",
    instructions:
      "Document lead-lined walls, MRI shielding, concrete, masonry, metal cabinets, imaging equipment, elevators, dense utilities, neighboring wireless systems, and other interference sources.",
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
      "shielded-room-review",
      "wireless-survey",
    ],
  },

  {
    id: "medical.walkthrough.verifyApMounting",
    label: "Verify access-point mounting locations",
    instructions:
      "Confirm mounting height, structure, service access, cable route, infection-control impact, environmental conditions, antenna orientation, and nearby obstructions.",
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
      "mounting-review",
      "clinical-access-review",
    ],
  },

  {
    id: "medical.walkthrough.verifyCameraViews",
    label: "Verify approved camera views",
    instructions:
      "Confirm field of view, privacy restrictions, prohibited areas, mounting surface, height, target distance, lighting, cable route, retention objective, and service access.",
    category: "camera",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "medical-camera-layout",
      "privacy-review",
      "coverage-verification",
    ],
  },

  {
    id: "medical.walkthrough.verifyCameraPrivacy",
    label: "Verify camera privacy boundaries",
    instructions:
      "Identify exam rooms, treatment rooms, procedure rooms, restrooms, changing areas, behavioral-health spaces, patient records, displays, and other locations requiring exclusion or masking.",
    category: "camera",
    required: true,
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
    ],
  },

  {
    id: "medical.walkthrough.verifyCameraLighting",
    label: "Inspect camera lighting conditions",
    instructions:
      "Document bright entrances, reflective glass, dim corridors, exterior nighttime areas, parking-lot headlights, infrared conflicts, and changing light levels.",
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
    id: "medical.walkthrough.verifyControlledOpenings",
    label: "Inspect controlled doors, cabinets, gates, and elevators",
    instructions:
      "Inspect both sides of every controlled opening for door type, frame, lock, closer, hinges, egress hardware, automatic-door interface, power transfer, request-to-exit, door position, and cable pathway.",
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
    id: "medical.walkthrough.verifyLifeSafety",
    label: "Verify life-safety and accessibility requirements",
    instructions:
      "Identify fire-alarm interfaces, emergency release, maglocks, delayed egress, automatic doors, controlled exits, accessibility requirements, behavioral-health considerations, and authority requirements.",
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
    ],
  },

  {
    id: "medical.walkthrough.verifyPharmacySecurity",
    label: "Inspect pharmacy and medication-security requirements",
    instructions:
      "Document entrances, medication rooms, cabinets, refrigeration, controlled-substance storage, reader locations, camera views, audit requirements, alarms, credentials, and event reporting.",
    category: "access_control",
    required: false,
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
    id: "medical.walkthrough.verifyBehavioralHealth",
    label: "Inspect behavioral-health safety requirements",
    instructions:
      "Document ligature risks, tamper resistance, vandal resistance, staff duress, privacy, camera restrictions, device placement, exposed cable, door hardware, and secure enclosures.",
    category: "safety",
    required: false,
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
      "staff-safety",
    ],
  },

  {
    id: "medical.walkthrough.verifyImagingAreas",
    label: "Inspect imaging and shielded areas",
    instructions:
      "Document MRI restrictions, lead-lined walls, shielding, approved tools, approved materials, penetration restrictions, equipment-vendor requirements, shutdown procedures, and cable-routing limitations.",
    category: "safety",
    required: false,
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
      "imaging-review",
      "shielding-coordination",
      "magnetic-environment-review",
    ],
  },

  {
    id: "medical.walkthrough.verifySterileAreas",
    label: "Inspect sterile and procedure areas",
    instructions:
      "Confirm approved materials, work windows, containment, cleaning, environmental controls, infection-prevention approval, ceiling restrictions, and equipment-vendor coordination.",
    category: "safety",
    required: false,
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
    ],
  },

  {
    id: "medical.walkthrough.verifyLabConditions",
    label: "Inspect laboratory and hazardous areas",
    instructions:
      "Document hazardous materials, biological samples, chemical exposure, clean zones, specialty equipment, restricted access, environmental ratings, and approved work practices.",
    category: "safety",
    required: false,
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
    ],
  },

  {
    id: "medical.walkthrough.verifyMedicalGas",
    label: "Identify oxygen and medical-gas constraints",
    instructions:
      "Locate oxygen and medical-gas systems near proposed drilling, coring, pathways, devices, racks, and work areas. Confirm utility locating, shutdown, and approval requirements.",
    category: "safety",
    required: false,
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
    ],
  },

  {
    id: "medical.walkthrough.verifyCommunicationSystems",
    label: "Inspect clinical communication systems",
    instructions:
      "Document paging, intercom, nurse call, staff duress, patient assistance, emergency notification, room-status, phone, mobile-alert, and integration requirements.",
    category: "other",
    required: false,
    conditions: [],
    ruleTags: [
      "healthcare-communications",
      "clinical-workflow",
      "vendor-integration",
    ],
  },

  {
    id: "medical.walkthrough.verifyStaging",
    label: "Verify material and equipment staging",
    instructions:
      "Confirm secure storage for cable, equipment, ladders, lifts, containment materials, tools, batteries, consumables, and removed equipment without affecting patient care.",
    category: "installation",
    required: true,
    conditions: [],
    ruleTags: [
      "material-staging",
      "equipment-security",
      "clinical-logistics",
    ],
  },

  {
    id: "medical.walkthrough.verifyDocuments",
    label: "Collect facility documentation",
    instructions:
      "Request floor plans, reflected ceiling plans, telecom drawings, shielding details, infection-control standards, network diagrams, door schedules, facility standards, system documentation, and construction schedules.",
    category: "documentation",
    required: true,
    conditions: [],
    ruleTags: [
      "document-review",
      "design-inputs",
      "facility-standard-review",
    ],
  },

  {
    id: "medical.walkthrough.verifyCloseout",
    label: "Confirm testing and closeout requirements",
    instructions:
      "Confirm copper certification, fiber testing, wireless validation, camera acceptance, access-control testing, communication-system testing, labeling, training, as-built documentation, warranty, and commissioning requirements.",
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

export const medicalRequiredPhotos: PlaybookPhotoRequirement[] = [
  {
    id: "medical.photo.exterior",
    label: "Building exterior",
    instructions:
      "Capture entrances, staff entrances, parking, loading or service areas, gates, exterior walls, poles, and proposed exterior device locations without including identifiable patients.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "exterior-overview",
      "perimeter-review",
      "privacy-protection",
    ],
  },

  {
    id: "medical.photo.interiorOverview",
    label: "Approved interior overview",
    instructions:
      "Capture approved common areas, hallways, reception, waiting, telecom, administrative, and construction areas while excluding patients, records, displays, and protected information.",
    category: "site",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-overview",
      "layout-verification",
      "patient-privacy",
    ],
  },

  {
    id: "medical.photo.ceilingConditions",
    label: "Ceiling and above-ceiling conditions",
    instructions:
      "Capture ceiling type, access points, supports, utilities, obstructions, sealed areas, pathways, and proposed mounting surfaces after facility approval.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "ceiling-structure",
      "clinical-pathway-review",
      "mounting-review",
    ],
  },

  {
    id: "medical.photo.pathways",
    label: "Existing cable pathways",
    instructions:
      "Capture cable tray, conduit, J-hooks, sleeves, risers, pathway fill, transitions, damage, and accessibility.",
    category: "cabling",
    required: true,
    conditions: [],
    ruleTags: [
      "pathway-documentation",
      "capacity-review",
    ],
  },

  {
    id: "medical.photo.ratedBarriers",
    label: "Rated walls and penetrations",
    instructions:
      "Capture fire walls, smoke barriers, sleeves, existing firestop, labels, damaged systems, and proposed penetration locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
    ],
  },

  {
    id: "medical.photo.telecomRooms",
    label: "Telecom rooms and racks",
    instructions:
      "Capture full rack views, labels, switches, patch panels, fiber shelves, UPS units, grounding, power, cooling, cable management, security, and available space.",
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
    id: "medical.photo.powerLocations",
    label: "Equipment power locations",
    instructions:
      "Capture receptacles, circuit labels, UPS systems, emergency-power indicators, grounding points, and proposed equipment locations.",
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
    id: "medical.photo.cameraViews",
    label: "Approved camera views",
    instructions:
      "Capture intended camera views and mounting surfaces only after confirming privacy, legal, and facility approval. Exclude patients and protected information.",
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
      "patient-privacy",
      "mounting-review",
    ],
  },

  {
    id: "medical.photo.cameraLighting",
    label: "Camera lighting conditions",
    instructions:
      "Capture bright entrances, reflective glass, dim corridors, exterior nighttime areas, parking lighting, and other difficult conditions without recording patients.",
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
    id: "medical.photo.wifiZones",
    label: "Wireless coverage areas",
    instructions:
      "Capture approved areas showing construction materials, hallways, clinical-room entrances, imaging boundaries, equipment, shielding, and obstructions without including protected information.",
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
      "privacy-protection",
    ],
  },

  {
    id: "medical.photo.apMounting",
    label: "Access-point mounting locations",
    instructions:
      "Capture mounting structure, height, nearby obstructions, ceiling conditions, infection-control impact, cable route, and service access.",
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
      "mounting-review",
      "clinical-access-review",
    ],
  },

  {
    id: "medical.photo.controlledOpenings",
    label: "Controlled doors, cabinets, gates, and elevators",
    instructions:
      "Capture both sides of each opening, frame, lock, hinges, closer, egress hardware, automatic-door equipment, ceiling above, and nearby pathway.",
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
    id: "medical.photo.pharmacySecurity",
    label: "Pharmacy and medication-security areas",
    instructions:
      "Capture approved entrances, cabinets, refrigeration, controlled storage, mounting locations, and pathways without exposing labels, patient data, or protected inventory details.",
    category: "access_control",
    required: false,
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
      "privacy-protection",
    ],
  },

  {
    id: "medical.photo.behavioralHealth",
    label: "Behavioral-health installation conditions",
    instructions:
      "Capture approved mounting surfaces, door hardware, secure enclosures, cable exposure risks, and staff-safety locations without including patients.",
    category: "safety",
    required: false,
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
    ],
  },

  {
    id: "medical.photo.imagingAreas",
    label: "Imaging and shielding conditions",
    instructions:
      "Capture approved equipment boundaries, shielding labels, penetration locations, cable routes, vendor interfaces, and mounting restrictions without photographing prohibited clinical equipment or patient information.",
    category: "safety",
    required: false,
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
      "imaging-review",
      "shielding-coordination",
      "photo-restriction",
    ],
  },

  {
    id: "medical.photo.specialEnvironments",
    label: "Special clinical environments",
    instructions:
      "Capture approved sterile, laboratory, hazardous, oxygen, medical-gas, refrigeration, and specialty areas, including equipment labels and mounting constraints where permitted.",
    category: "safety",
    required: false,
    conditions: [],
    ruleTags: [
      "specialty-clinical-review",
      "environmental-rating-review",
      "facility-approval",
    ],
  },

  {
    id: "medical.photo.liftRoutes",
    label: "Lift and equipment-access routes",
    instructions:
      "Capture corridor widths, door clearances, floor conditions, elevators, overhead obstructions, staging areas, patient-routing conflicts, and charging locations.",
    category: "safety",
    required: true,
    conditions: [],
    ruleTags: [
      "lift-access-review",
      "clinical-logistics",
      "floor-protection-review",
    ],
  },
];

export const medicalRequiredMeasurements: PlaybookMeasurement[] = [
  {
    id: "medical.measurement.squareFootage",
    label: "Total facility square footage",
    unit: "square_feet",
    instructions:
      "Record total area and separately identify clinical, administrative, imaging, laboratory, pharmacy, behavioral-health, exterior, and future-expansion areas.",
    required: true,
    conditions: [],
    ruleTags: [
      "facility-size",
      "material-scaling",
      "labor-scaling",
    ],
  },

  {
    id: "medical.measurement.ceilingHeight",
    label: "Ceiling height",
    unit: "feet",
    instructions:
      "Measure representative heights in clinical, waiting, office, hallway, imaging, lobby, exterior, and specialty areas.",
    required: true,
    conditions: [],
    ruleTags: [
      "height-verification",
      "lift-review",
      "mounting-height",
    ],
  },

  {
    id: "medical.measurement.longestCableRoute",
    label: "Longest cable-route distance",
    unit: "feet",
    instructions:
      "Measure along the actual proposed pathway from the serving telecom room to the farthest device, including vertical transitions and service loops.",
    required: true,
    conditions: [],
    ruleTags: [
      "copper-distance-review",
      "fiber-review",
      "cable-quantity",
    ],
  },

  {
    id: "medical.measurement.telecomRoomCount",
    label: "Telecom room and enclosure count",
    unit: "count",
    instructions:
      "Count MDFs, IDFs, wall enclosures, floor racks, remote cabinets, and existing telecom spaces serving the project.",
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
    id: "medical.measurement.availableRackUnits",
    label: "Available rack units",
    unit: "count",
    instructions:
      "Count usable rack units after accounting for existing equipment, clearance, cable management, UPS units, fiber shelves, security, and reserved capacity.",
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
    id: "medical.measurement.availableSwitchPorts",
    label: "Available switch ports",
    unit: "count",
    instructions:
      "Record available copper and fiber ports, PoE capacity, uplink capacity, and planned spare capacity.",
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
    id: "medical.measurement.concurrentDevices",
    label: "Peak concurrent wireless devices",
    unit: "count",
    instructions:
      "Count or estimate clinical devices, tablets, mobile carts, scanners, printers, staff devices, patient devices, guest devices, cameras, sensors, and vendor equipment.",
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
      "clinical-device-load",
    ],
  },

  {
    id: "medical.measurement.apMountingHeight",
    label: "Access-point mounting height",
    unit: "feet",
    instructions:
      "Measure proposed access-point elevations and identify different ceiling, wall, corridor, imaging-boundary, and specialty mounting conditions.",
    required: true,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design",
      "mounting-review",
      "lift-review",
    ],
  },

  {
    id: "medical.measurement.cameraMountingHeight",
    label: "Camera mounting height",
    unit: "feet",
    instructions:
      "Measure each approved camera height or group locations by common elevation and mounting condition.",
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
    id: "medical.measurement.cameraTargetDistance",
    label: "Camera target distance",
    unit: "feet",
    instructions:
      "Measure from each approved camera location to the entrance, hallway, pharmacy, parking, reception, or identification target.",
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
    id: "medical.measurement.recordingDays",
    label: "Required video retention",
    unit: "count",
    instructions:
      "Record required retention days and identify camera groups with different policies, recording profiles, legal-hold, or event-retention requirements.",
    required: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "storage-sizing",
      "retention-policy-review",
    ],
  },

  {
    id: "medical.measurement.controlledOpeningCount",
    label: "Controlled opening count",
    unit: "count",
    instructions:
      "Count personnel doors, pharmacy doors, medication rooms, cabinets, elevators, automatic doors, gates, behavioral-health doors, and other controlled barriers separately.",
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
    id: "medical.measurement.doorDimensions",
    label: "Controlled opening dimensions",
    unit: "inches",
    instructions:
      "Measure door width, height, frame dimensions, cabinet dimensions, automatic-door clearances, elevator interfaces, and specialty hardware clearances.",
    required: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "cabinet-control-review",
      "fabrication-review",
    ],
  },

  {
    id: "medical.measurement.pharmacyOpeningCount",
    label: "Pharmacy and medication opening count",
    unit: "count",
    instructions:
      "Count pharmacy entrances, medication-room doors, controlled cabinets, refrigerators, freezers, pass-throughs, and other secured storage points.",
    required: false,
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
      "access-control-quantity",
    ],
  },

  {
    id: "medical.measurement.communicationEndpointCount",
    label: "Clinical communication endpoint count",
    unit: "count",
    instructions:
      "Count paging speakers, intercom stations, staff-duress buttons, patient-assistance stations, nurse-call endpoints, room-status devices, and emergency-notification endpoints.",
    required: false,
    conditions: [],
    ruleTags: [
      "healthcare-communications",
      "endpoint-quantity",
      "specialty-system-design",
    ],
  },

  {
    id: "medical.measurement.liftClearance",
    label: "Lift and equipment clearance",
    unit: "inches",
    instructions:
      "Measure corridor widths, door openings, elevator dimensions, turning clearances, and staging access for lifts, scaffolding, containment equipment, and material carts.",
    required: false,
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access",
      "clinical-logistics",
      "equipment-clearance",
    ],
  },
];
import type { PlaybookRisk } from "../playbook";

export const warehouseRisks: PlaybookRisk[] = [
  {
    id: "warehouse.activeOperationsRisk",
    title: "Active warehouse operations may reduce installation productivity",
    description:
      "Forklift traffic, material movement, shipping activity, restricted aisles, and occupied work zones may require phased installation, spotters, barricades, or temporary shutdowns.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "productivity-review",
      "work-zone-coordination",
    ],
  },

  {
    id: "warehouse.highCeilingRisk",
    title: "High mounting elevations require specialized access",
    description:
      "High ceilings or roof-deck mounting locations may require scissor lifts, boom lifts, additional crew members, longer installation time, and specialized mounting hardware.",
    severity: "high",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "greater_than_or_equal",
        value: 18,
      },
    ],
    ruleTags: [
      "high-ceiling",
      "lift-required-review",
      "crew-size-review",
      "labor-review",
    ],
  },

  {
    id: "warehouse.unknownCeilingHeightRisk",
    title: "Mounting height has not been verified",
    description:
      "Unknown ceiling and device mounting heights create uncertainty in lift selection, camera design, wireless placement, cable quantity, crew size, and labor duration.",
    severity: "medium",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "height-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "warehouse.liftAccessRisk",
    title: "Lift access may be restricted",
    description:
      "Narrow aisles, stored inventory, conveyors, machinery, floor conditions, overhead obstructions, dock plates, or active operations may prevent safe lift access to installation locations.",
    severity: "high",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-review",
      "aisle-clearance-review",
      "equipment-rental-risk",
      "site-logistics",
    ],
  },

  {
    id: "warehouse.forkliftTrafficRisk",
    title: "Mobile equipment creates installation hazards",
    description:
      "Forklifts, pallet jacks, order pickers, tuggers, and other mobile equipment can create collision risks and may require protected work zones, traffic control, spotters, and restricted work periods.",
    severity: "critical",
    conditions: [
      {
        field: "assessment.risks",
        operator: "includes",
        value: [
          "forklift",
          "pallet jack",
          "order picker",
          "tugger",
          "vehicle traffic",
        ],
      },
    ],
    ruleTags: [
      "forklift-review",
      "mobile-equipment",
      "work-zone-safety",
      "spotter-review",
    ],
  },

  {
    id: "warehouse.noPathwayRisk",
    title: "No usable cable pathway has been confirmed",
    description:
      "A lack of existing cable tray, conduit, sleeves, or approved structural pathways may require new supports, conduit, coring, trenching, fire stopping, or revised device locations.",
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
      "coring-review",
      "labor-review",
    ],
  },

  {
    id: "warehouse.unknownPathwayRisk",
    title: "Cable pathway conditions are unknown",
    description:
      "Unknown pathway capacity, accessibility, routing, code compliance, and support conditions can materially change cable quantities, labor, equipment needs, and project duration.",
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
    id: "warehouse.longCopperRunRisk",
    title: "Cable distance may exceed copper Ethernet limits",
    description:
      "Long warehouse cable routes may require fiber backbone cabling, additional network enclosures, intermediate switches, or revised equipment locations.",
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
    id: "warehouse.unknownCableDistanceRisk",
    title: "Cable-route distances have not been measured",
    description:
      "Unknown cable distances may conceal copper distance violations, additional pathway requirements, fiber backbone needs, or underestimated cable quantities.",
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
    id: "warehouse.existingFiberRisk",
    title: "Existing fiber may not be reusable",
    description:
      "Existing fiber may have incompatible type, insufficient strands, damaged connectors, poor labeling, unknown routing, failed test results, or inadequate bandwidth.",
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
    id: "warehouse.rackCapacityRisk",
    title: "Existing rack capacity may be insufficient",
    description:
      "Existing racks may lack physical space, power, cooling, grounding, patching capacity, cable management, UPS capacity, or switch-port availability for new systems.",
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
    id: "warehouse.noRackRisk",
    title: "New network enclosure or rack may be required",
    description:
      "A facility without an existing rack may require a wall enclosure, floor rack, patch panels, cable management, grounding, electrical power, cooling, and physical security.",
    severity: "medium",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "new-rack-review",
      "electrical-coordination",
      "grounding-review",
      "room-readiness",
    ],
  },

  {
    id: "warehouse.powerAvailabilityRisk",
    title: "Electrical power availability is unverified",
    description:
      "Insufficient or unavailable electrical power near racks, recorders, controllers, power supplies, access points, and UPS equipment may require electrical work outside the low-voltage scope.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "power-verification-required",
      "electrical-coordination",
      "scope-boundary-review",
    ],
  },

  {
    id: "warehouse.lowLightCameraRisk",
    title: "Lighting conditions may reduce camera performance",
    description:
      "Dark aisles, exterior nighttime areas, bright dock doors, headlights, reflective surfaces, and changing light levels may require specialized cameras, revised positioning, or supplemental lighting.",
    severity: "high",
    conditions: [
      {
        field: "assessment.risks",
        operator: "includes",
        value: [
          "poorly lit",
          "low light",
          "dark",
          "backlit",
          "headlights",
          "dock-door lighting",
        ],
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "infrared-review",
      "supplemental-lighting-review",
    ],
  },

  {
    id: "warehouse.highCameraMountRisk",
    title: "High camera placement may reduce identification detail",
    description:
      "Cameras mounted too high may provide broad coverage but insufficient facial, package, label, or license-plate detail without proper lens selection and placement.",
    severity: "high",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "greater_than_or_equal",
        value: 20,
      },
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-height-review",
      "pixel-density-review",
      "lens-selection-review",
      "identification-objective-review",
    ],
  },

  {
    id: "warehouse.videoStorageRisk",
    title: "Video retention requirements may require substantial storage",
    description:
      "Large camera counts, high resolution, high frame rates, continuous recording, and long retention periods can significantly increase recorder, storage, bandwidth, and redundancy requirements.",
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
      "bandwidth-review",
      "recorder-capacity-review",
      "retention-review",
    ],
  },

  {
    id: "warehouse.unknownRetentionRisk",
    title: "Video retention has not been defined",
    description:
      "Without a confirmed retention target, recorder capacity and storage pricing remain preliminary.",
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
    id: "warehouse.rfObstructionRisk",
    title: "Warehouse materials may obstruct wireless signals",
    description:
      "Metal racking, dense inventory, liquids, machinery, freezer panels, conveyors, and changing stock levels can block, absorb, or reflect wireless signals.",
    severity: "high",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "wireless-survey",
      "inventory-variability",
      "access-point-density-review",
    ],
  },

  {
    id: "warehouse.roamingRisk",
    title: "Mobile workflows require validated Wi-Fi roaming",
    description:
      "Scanners, robots, tablets, and vehicle-mounted terminals may experience dropped sessions unless access-point placement, channel planning, power levels, authentication, and roaming behavior are properly designed and tested.",
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
      "wifi-roaming",
      "warehouse-mobility",
      "wireless-validation",
      "survey-required",
    ],
  },

  {
    id: "warehouse.freezerWirelessRisk",
    title: "Cold-storage environments require specialty wireless design",
    description:
      "Freezer panels, insulated walls, condensation, low temperatures, and door transitions may require temperature-rated access points, sealed enclosures, specialized antennas, and additional coverage zones.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Freezer",
          "Cooler",
          "Cold storage",
        ],
      },
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cold-storage-wifi",
      "temperature-rating",
      "enclosure-review",
      "condensation-review",
    ],
  },

  {
    id: "warehouse.specialEnvironmentRisk",
    title: "Special environmental ratings may be required",
    description:
      "Dust, moisture, washdown, heat, corrosion, freezer conditions, or classified areas may require specialty equipment, enclosures, cable, fittings, and installation methods.",
    severity: "critical",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Dusty environment",
          "High moisture",
          "Washdown area",
          "Extreme heat",
          "Corrosive environment",
          "Hazardous or classified area",
        ],
      },
    ],
    ruleTags: [
      "environmental-rating-review",
      "hazardous-area-review",
      "specialty-equipment",
      "code-review",
    ],
  },

  {
    id: "warehouse.accessDoorHardwareRisk",
    title: "Existing openings may not support proposed access hardware",
    description:
      "Door frames, gates, roll-up doors, turnstiles, and barriers may require structural modification, specialty locks, welding, fabrication, electrical work, or coordination with door-hardware contractors.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "gate-integration-review",
      "fabrication-review",
      "scope-coordination",
    ],
  },

  {
    id: "warehouse.lifeSafetyRisk",
    title: "Access-control design may affect life safety and egress",
    description:
      "Electrified locks, delayed egress, maglocks, gates, turnstiles, and controlled openings may require fire-alarm interfaces, emergency release, inspections, permits, and authority approval.",
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
    id: "warehouse.firestopRisk",
    title: "Rated penetrations require approved fire stopping",
    description:
      "Improperly sealed penetrations can create code violations, inspection failures, rework, and liability. Approved systems, materials, labeling, and documentation may be required.",
    severity: "high",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "inspection-review",
      "documentation-required",
    ],
  },

  {
    id: "warehouse.afterHoursRisk",
    title: "Restricted work windows may increase cost and duration",
    description:
      "After-hours, weekend, shutdown, and maintenance-window requirements may increase labor rates, mobilizations, supervision, equipment rental duration, and schedule risk.",
    severity: "high",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "labor-premium-review",
      "schedule-risk",
      "mobilization-review",
    ],
  },

  {
    id: "warehouse.scheduleRisk",
    title: "Compressed schedule may require additional resources",
    description:
      "Aggressive completion dates or phased turnover requirements may require larger crews, overtime, expedited freight, multiple lifts, additional supervision, and coordinated commissioning.",
    severity: "high",
    conditions: [
      {
        field: "installation.estimatedDurationDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "schedule-review",
      "crew-scaling",
      "overtime-review",
      "procurement-risk",
    ],
  },

  {
    id: "warehouse.permitRisk",
    title: "Permit and inspection requirements are unverified",
    description:
      "Access control, pathways, fire-alarm interfaces, structural mounting, rated penetrations, and specialty environments may require permits, inspections, engineered details, or authority approval.",
    severity: "medium",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-review",
      "inspection-review",
      "ahj-coordination",
      "engineering-review",
    ],
  },

  {
    id: "warehouse.documentRisk",
    title: "Incomplete site documentation may reduce estimate accuracy",
    description:
      "Missing floor plans, rack elevations, network diagrams, door schedules, reflected ceiling plans, and equipment standards may lead to quantity, routing, and coordination changes.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "document-review",
      "walkthrough-required",
      "design-input-risk",
      "estimate-confidence-review",
    ],
  },

  {
    id: "warehouse.procurementRisk",
    title: "Equipment availability and lead times may affect schedule",
    description:
      "Specialty cameras, access-control hardware, fiber components, network switches, lifts, enclosures, and environmental-rated equipment may have extended lead times or substitution risk.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "procurement-risk",
      "lead-time-review",
      "substitution-review",
      "schedule-risk",
    ],
  },

  {
    id: "warehouse.changeManagementRisk",
    title: "Operational changes may alter the system design",
    description:
      "Future rack changes, inventory movement, conveyor additions, aisle reconfiguration, dock expansion, or workflow changes may affect camera views, wireless coverage, pathways, and device locations.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "future-change-review",
      "scalability-review",
      "design-flexibility",
    ],
  },
];
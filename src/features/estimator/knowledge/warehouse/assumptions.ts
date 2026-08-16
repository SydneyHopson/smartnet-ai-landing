import type { PlaybookAssumption } from "../playbook";

export const warehouseAssumptions: PlaybookAssumption[] = [
  {
    id: "warehouse.standardAccessAssumption",
    text:
      "Pricing assumes reasonable access to installation areas during the agreed work schedule unless restricted operational zones are identified.",
    conditions: [],
    ruleTags: [
      "site-access-assumption",
      "operational-access",
    ],
  },

  {
    id: "warehouse.activeOperationsAssumption",
    text:
      "Pricing assumes warehouse operations can be coordinated to provide safe temporary work zones around ladders, lifts, cable pathways, and equipment locations.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "work-zone-coordination",
      "productivity-assumption",
    ],
  },

  {
    id: "warehouse.standardWorkHoursAssumption",
    text:
      "Pricing assumes installation can be completed during normal business hours unless after-hours, shutdown, weekend, or holiday work is specifically required.",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-hours-assumption",
      "labor-rate-assumption",
    ],
  },

  {
    id: "warehouse.afterHoursAccessAssumption",
    text:
      "After-hours pricing assumes the customer will provide building access, alarm coordination, security access, loading access, and an authorized site contact during each work window.",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "site-contact-required",
      "access-coordination",
    ],
  },

  {
    id: "warehouse.ceilingHeightAssumption",
    text:
      "Pricing assumes standard warehouse mounting heights until actual ceiling, deck, rack, and device mounting elevations are verified.",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "height-assumption",
      "lift-review",
      "labor-review",
    ],
  },

  {
    id: "warehouse.liftAccessAssumption",
    text:
      "Pricing assumes lifts can safely reach proposed installation areas without removal of stored inventory, warehouse racking, machinery, conveyors, or permanent obstructions.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-assumption",
      "obstruction-review",
      "productivity-assumption",
    ],
  },

  {
    id: "warehouse.liftRentalAssumption",
    text:
      "Lift rental pricing assumes standard delivery, pickup, charging, storage, and operating conditions with no special floor-protection or restricted-access requirements.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "equipment-rental-assumption",
      "lift-delivery",
      "floor-protection-review",
    ],
  },

  {
    id: "warehouse.pathwayAssumption",
    text:
      "Pricing assumes existing cable pathways are usable, accessible, code-compliant, and have sufficient capacity unless otherwise identified during the walkthrough.",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "existing-pathway-assumption",
      "pathway-capacity-review",
      "code-compliance-review",
    ],
  },

  {
    id: "warehouse.openPathwayAssumption",
    text:
      "Where no existing pathway is available, preliminary pricing assumes open structural cable routing with approved supports unless conduit or another pathway is required.",
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
      "new-pathway-assumption",
      "cable-support-review",
      "conduit-exclusion-review",
    ],
  },

  {
    id: "warehouse.copperDistanceAssumption",
    text:
      "Copper network cabling is assumed to remain within standard Ethernet distance limits unless field measurements identify longer routes requiring fiber or additional network enclosures.",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "copper-distance-assumption",
      "fiber-review",
      "idf-review",
    ],
  },

  {
    id: "warehouse.existingFiberAssumption",
    text:
      "Existing fiber is not assumed reusable until fiber type, strand availability, connector type, routing, labeling, and test results are verified.",
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
    id: "warehouse.powerAvailabilityAssumption",
    text:
      "Pricing assumes suitable electrical power is available near all proposed racks, network enclosures, recorders, controllers, power supplies, and UPS equipment.",
    conditions: [],
    ruleTags: [
      "power-assumption",
      "electrical-coordination",
    ],
  },

  {
    id: "warehouse.rackCapacityAssumption",
    text:
      "Existing racks are not assumed to have sufficient space, power, cooling, grounding, or cable management until verified.",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-assumption",
      "power-review",
      "cooling-review",
      "grounding-review",
    ],
  },

  {
    id: "warehouse.networkConfigurationAssumption",
    text:
      "Pricing assumes the customer will provide required network addressing, VLAN, firewall, authentication, and cybersecurity requirements before system commissioning.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-coordination",
      "vlan-review",
      "cybersecurity-coordination",
    ],
  },

  {
    id: "warehouse.cameraLightingAssumption",
    text:
      "Preliminary camera pricing assumes normal warehouse lighting conditions unless low-light, backlight, infrared, license-plate, or supplemental-lighting requirements are identified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-lighting-assumption",
      "low-light-review",
      "wdr-review",
    ],
  },

  {
    id: "warehouse.cameraViewAssumption",
    text:
      "Camera quantities are preliminary until exact views, mounting heights, lens requirements, obstructions, lighting, and identification objectives are verified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-layout-assumption",
      "walkthrough-required",
      "lens-selection-review",
    ],
  },

  {
    id: "warehouse.videoRetentionAssumption",
    text:
      "Video storage sizing assumes continuous recording at standard resolution, frame rate, compression, and motion levels unless specific recording requirements are provided.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "cameras.recordingDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "storage-sizing-assumption",
      "recording-profile-review",
      "bandwidth-review",
    ],
  },

  {
    id: "warehouse.wifiSurveyAssumption",
    text:
      "Wireless access-point quantities are preliminary until warehouse dimensions, rack layout, inventory density, device types, mounting heights, and radio-frequency conditions are verified.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design-assumption",
      "wireless-survey",
      "access-point-count-review",
    ],
  },

  {
    id: "warehouse.inventoryConditionAssumption",
    text:
      "Wireless performance assumptions are based on typical inventory levels and may require adjustment when storage density, materials, or rack occupancy changes significantly.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "inventory-variability",
      "rf-design-assumption",
      "wireless-validation",
    ],
  },

  {
    id: "warehouse.accessHardwareAssumption",
    text:
      "Access-control pricing assumes existing doors, frames, gates, and barriers are structurally suitable for the proposed locking hardware unless deficiencies are identified.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-condition-assumption",
      "hardware-compatibility-review",
      "gate-review",
    ],
  },

  {
    id: "warehouse.lifeSafetyAssumption",
    text:
      "Access-control scope assumes all locking arrangements will be reviewed for applicable life-safety, egress, fire-alarm, and accessibility requirements before final installation.",
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
    id: "warehouse.firestopAssumption",
    text:
      "Fire-rated penetrations are assumed to require approved firestop materials, labeling, documentation, and installation methods when encountered.",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "documentation-required",
    ],
  },

  {
    id: "warehouse.permitAssumption",
    text:
      "Permit, inspection, engineering, and authority-having-jurisdiction fees are excluded from preliminary pricing unless specifically identified.",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-assumption",
      "inspection-review",
      "ahj-coordination",
    ],
  },

  {
    id: "warehouse.customerProvidedDocumentsAssumption",
    text:
      "Pricing assumes the customer will provide available floor plans, reflected ceiling plans, rack elevations, network diagrams, door schedules, and equipment standards when requested.",
    conditions: [],
    ruleTags: [
      "document-coordination",
      "design-input-assumption",
    ],
  },

  {
    id: "warehouse.patchAndPaintAssumption",
    text:
      "Patching, painting, ceiling repair, roofing repair, concrete restoration, and architectural finish work are excluded unless specifically included in the proposal.",
    conditions: [],
    ruleTags: [
      "finish-repair-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "warehouse.hazardousAreaAssumption",
    text:
      "Standard equipment and installation methods are assumed unless hazardous, classified, corrosive, washdown, freezer, or other specialty environmental requirements are identified.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-environment-assumption",
      "hazardous-area-review",
      "environmental-rating-review",
    ],
  },

  {
    id: "warehouse.testingAssumption",
    text:
      "Pricing assumes standard manufacturer and installation testing unless certified copper testing, fiber certification, wireless validation, camera acceptance testing, or third-party commissioning is required.",
    conditions: [],
    ruleTags: [
      "testing-assumption",
      "certification-review",
      "commissioning-review",
    ],
  },

  {
    id: "warehouse.procurementAssumption",
    text:
      "Equipment availability, lead times, substitutions, freight, and manufacturer pricing remain subject to verification before final quote approval.",
    conditions: [],
    ruleTags: [
      "procurement-assumption",
      "lead-time-review",
      "price-validity",
    ],
  },
];
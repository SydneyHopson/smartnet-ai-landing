import type { PlaybookRisk } from "../playbook";

export const restaurantRisks: PlaybookRisk[] = [
  {
    id: "restaurant.activeOperationsRisk",
    title: "Operating restaurant conditions may reduce productivity",
    description:
      "Customer traffic, food preparation, deliveries, cleaning schedules, kitchen activity, and restricted work areas may require phased work, protected zones, repeated mobilization, or after-hours installation.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "restaurant-operations",
      "productivity-review",
      "work-zone-coordination",
    ],
  },

  {
    id: "restaurant.foodSafetyRisk",
    title: "Food-service sanitation restrictions may affect installation",
    description:
      "Drilling, ceiling access, dust, debris, exposed cable, and equipment staging near food-preparation areas may require special scheduling, containment, cleanup, and customer coordination.",
    severity: "critical",
    conditions: [],
    ruleTags: [
      "food-safety-review",
      "sanitation-coordination",
      "dust-control",
      "work-area-protection",
    ],
  },

  {
    id: "restaurant.afterHoursRisk",
    title: "Restricted work windows may increase cost",
    description:
      "Overnight, after-closing, weekend, shutdown, or pre-opening work may increase labor rates, mobilizations, supervision, equipment-rental duration, and schedule risk.",
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
      "mobilization-review",
      "schedule-risk",
    ],
  },

  {
    id: "restaurant.unknownCeilingRisk",
    title: "Ceiling conditions have not been verified",
    description:
      "Unknown ceiling type, height, access, and construction can materially change cable routing, ladder or lift requirements, mounting methods, patching, and labor.",
    severity: "medium",
    conditions: [
      {
        field: "property.ceilingType",
        operator: "equals",
        value: "unknown",
      },
    ],
    ruleTags: [
      "ceiling-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "restaurant.highCeilingRisk",
    title: "Elevated mounting locations require specialized access",
    description:
      "High dining-room ceilings, exterior walls, signs, poles, or architectural features may require lifts, scaffolding, additional crew members, floor protection, and longer installation time.",
    severity: "high",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "greater_than_or_equal",
        value: 14,
      },
    ],
    ruleTags: [
      "high-ceiling",
      "lift-review",
      "crew-size-review",
      "floor-protection-review",
    ],
  },

  {
    id: "restaurant.noPathwayRisk",
    title: "No usable cable pathway has been confirmed",
    description:
      "A lack of accessible ceiling space, conduit, sleeves, or approved pathways may require surface raceway, new conduit, wall openings, coring, fire stopping, or revised device locations.",
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
      "raceway-review",
      "conduit-review",
      "labor-review",
    ],
  },

  {
    id: "restaurant.unknownPathwayRisk",
    title: "Cable pathway conditions are unknown",
    description:
      "Unknown pathway accessibility, capacity, routing, code compliance, and finish requirements can significantly affect labor, materials, appearance, and project duration.",
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
    id: "restaurant.longCableRunRisk",
    title: "Cable distance may exceed copper Ethernet limits",
    description:
      "Long routes to parking lots, drive-through lanes, exterior patios, detached signs, or remote equipment may require fiber, additional enclosures, surge protection, or revised equipment locations.",
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
      "distance-limitation",
      "surge-protection-review",
    ],
  },

  {
    id: "restaurant.unknownCableDistanceRisk",
    title: "Cable-route distances have not been measured",
    description:
      "Unknown pathway distances may conceal copper distance violations, underestimated cable quantities, exterior pathway needs, or additional network-enclosure requirements.",
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
    id: "restaurant.specialEnvironmentRisk",
    title: "Food-service environments may require specialty equipment",
    description:
      "Grease, steam, heat, moisture, washdown, cleaning chemicals, refrigeration, freezer temperatures, and exterior exposure may require rated equipment, sealed enclosures, protected cabling, and specialty mounting hardware.",
    severity: "critical",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Commercial kitchen heat",
          "Grease exposure",
          "Steam or high humidity",
          "Washdown area",
          "Walk-in cooler",
          "Walk-in freezer",
          "Cleaning chemicals",
          "Exterior weather exposure",
        ],
      },
    ],
    ruleTags: [
      "environmental-rating-review",
      "food-service-environment",
      "temperature-rating",
      "moisture-review",
    ],
  },

  {
    id: "restaurant.freezerCondensationRisk",
    title: "Cooler and freezer transitions may cause condensation",
    description:
      "Temperature changes around walk-in coolers and freezers can create condensation, cable-sealing issues, equipment failures, and corrosion without proper environmental design.",
    severity: "high",
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
      "condensation-review",
      "temperature-rating",
      "sealed-penetration-review",
      "corrosion-review",
    ],
  },

  {
    id: "restaurant.kitchenMountingRisk",
    title: "Kitchen mounting surfaces may be unsuitable",
    description:
      "Stainless-steel panels, tile, grease-laden surfaces, equipment clearances, fire-suppression systems, hoods, ductwork, and cleaning requirements may restrict device placement and cable routing.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Kitchen",
          "Commercial kitchen heat",
          "Grease exposure",
        ],
      },
    ],
    ruleTags: [
      "kitchen-mounting-review",
      "surface-compatibility",
      "fire-suppression-coordination",
    ],
  },

  {
    id: "restaurant.rackCapacityRisk",
    title: "Existing network location may be inadequate",
    description:
      "Restaurant network equipment is often crowded into offices, cabinets, shelves, or utility areas without sufficient rack space, cooling, power, security, cable management, or service clearance.",
    severity: "high",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-review",
      "network-cleanup",
      "power-review",
      "cooling-review",
    ],
  },

  {
    id: "restaurant.noRackRisk",
    title: "A new rack or enclosure may be required",
    description:
      "A restaurant without an organized network rack may require an enclosure, patch panels, cable management, UPS, electrical coordination, cooling, and physical security.",
    severity: "medium",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "new-rack-review",
      "network-cleanup",
      "electrical-coordination",
      "equipment-security",
    ],
  },

  {
    id: "restaurant.powerRisk",
    title: "Electrical power availability is unverified",
    description:
      "Insufficient electrical capacity near network equipment, recorders, amplifiers, access-control power supplies, displays, or drive-through equipment may require electrical work outside the low-voltage scope.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "power-verification-required",
      "electrical-coordination",
      "scope-boundary-review",
    ],
  },

  {
    id: "restaurant.posSegmentationRisk",
    title: "Point-of-sale systems may require network isolation",
    description:
      "Combining payment systems, guest Wi-Fi, cameras, staff devices, music systems, and business equipment on the same network may create security, reliability, and compliance concerns.",
    severity: "critical",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
      {
        field: "network.vlanRequired",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "pci-network-separation",
      "vlan-review",
      "cybersecurity-review",
      "pos-protection",
    ],
  },

  {
    id: "restaurant.vendorIntegrationRisk",
    title: "Third-party restaurant systems may require coordination",
    description:
      "Point-of-sale, payment, delivery, drive-through, menu-board, music, alarm, fire-suppression, and internet systems may have proprietary requirements or vendor restrictions.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "vendor-integration",
      "compatibility-review",
      "scope-coordination",
      "schedule-risk",
    ],
  },

  {
    id: "restaurant.guestWifiRisk",
    title: "Guest Wi-Fi may affect security and performance",
    description:
      "Customer devices can consume significant bandwidth and should be separated from point-of-sale, staff, camera, and business networks.",
    severity: "high",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "bandwidth-review",
      "cybersecurity-review",
    ],
  },

  {
    id: "restaurant.wifiInterferenceRisk",
    title: "Kitchen and building materials may disrupt Wi-Fi",
    description:
      "Stainless steel, refrigeration equipment, tile, concrete, microwaves, kitchen machinery, mirrors, and dense customer areas can reduce wireless performance.",
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
      "interference-review",
      "access-point-density-review",
    ],
  },

  {
    id: "restaurant.outdoorWifiRisk",
    title: "Outdoor Wi-Fi requires environmental and pathway planning",
    description:
      "Patios, parking lots, drive-through lanes, and pickup zones may require weather-rated access points, surge protection, exterior pathways, directional antennas, and mounting approval.",
    severity: "high",
    conditions: [
      {
        field: "wifi.outdoorCoverage",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "outdoor-wifi",
      "weather-rated-equipment",
      "surge-protection-review",
      "exterior-pathway-review",
    ],
  },

  {
    id: "restaurant.cameraPrivacyRisk",
    title: "Camera placement may create privacy concerns",
    description:
      "Employee areas, offices, restrooms, neighboring properties, customer seating, and sensitive workspaces may require placement restrictions, privacy masking, signage, or policy review.",
    severity: "high",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "privacy-review",
      "camera-policy-review",
      "masking-review",
    ],
  },

  {
    id: "restaurant.transactionCameraRisk",
    title: "Transaction cameras may not capture enough detail",
    description:
      "Poor placement, excessive mounting height, glare, low resolution, or wide overview lenses may prevent useful transaction, cash-handling, order, or employee identification.",
    severity: "high",
    conditions: [
      {
        field: "cameras.coverageGoals",
        operator: "includes",
        value: [
          "Cash transaction verification",
          "Point-of-sale activity",
          "Pickup-order verification",
          "Drive-through handoff",
        ],
      },
    ],
    ruleTags: [
      "transaction-verification",
      "pixel-density-review",
      "lens-selection-review",
      "camera-height-review",
    ],
  },

  {
    id: "restaurant.lowLightCameraRisk",
    title: "Restaurant lighting may reduce camera performance",
    description:
      "Bright windows, dim dining rooms, headlights, backlit drive-through lanes, nighttime parking, reflections, and menu-board lighting may require specialized cameras or revised placement.",
    severity: "high",
    conditions: [
      {
        field: "assessment.risks",
        operator: "includes",
        value: [
          "low light",
          "bright windows",
          "headlights",
          "menu-board lighting",
          "drive-through",
        ],
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "infrared-review",
      "drive-through-lighting",
    ],
  },

  {
    id: "restaurant.videoStorageRisk",
    title: "Video retention may require substantial storage",
    description:
      "Large camera counts, high resolution, continuous recording, transaction detail, and long retention periods can significantly increase recorder, storage, and bandwidth requirements.",
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
    id: "restaurant.unknownRetentionRisk",
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
    id: "restaurant.accessHardwareRisk",
    title: "Existing openings may not support access hardware",
    description:
      "Storefront doors, cooler doors, freezer doors, gates, roll-up doors, hollow-metal frames, and wood doors may require specialty hardware, fabrication, structural repair, or door-contractor coordination.",
    severity: "high",
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
      "scope-coordination",
    ],
  },

  {
    id: "restaurant.lifeSafetyRisk",
    title: "Access-control design may affect egress and life safety",
    description:
      "Electrified locks, maglocks, gates, delayed egress, employee entrances, cooler doors, and controlled exits may require fire-alarm interfaces, emergency release, permits, inspections, and authority approval.",
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
    id: "restaurant.audioCoverageRisk",
    title: "Audio coverage may be uneven without zone design",
    description:
      "Dining rooms, bars, patios, kitchens, restrooms, and private rooms have different noise levels and acoustic conditions that may require separate zones, speaker types, and volume controls.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "audio-zone-review",
      "speaker-layout-review",
      "acoustic-review",
    ],
  },

  {
    id: "restaurant.musicLicensingRisk",
    title: "Commercial music use may require licensing",
    description:
      "Consumer streaming accounts may not include commercial performance rights, and restaurant music services may require subscriptions or licensed providers.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "music-licensing-review",
      "commercial-audio",
      "service-subscription-review",
    ],
  },

  {
    id: "restaurant.driveThroughRisk",
    title: "Drive-through systems may require specialty integration",
    description:
      "Intercoms, timers, menu boards, vehicle detection, cameras, lane equipment, payment terminals, and outdoor devices may require proprietary components, weather-rated installation, trenching, electrical coordination, and vendor support.",
    severity: "high",
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
      "weather-rated-equipment",
      "trenching-review",
    ],
  },

  {
    id: "restaurant.firestopRisk",
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
    id: "restaurant.landlordApprovalRisk",
    title: "Landlord or shopping-center approval may be required",
    description:
      "Exterior devices, roof penetrations, conduit, signage, common-area work, telecom pathways, and after-hours access may require landlord, property-management, or shopping-center approval.",
    severity: "high",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "landlord-approval",
      "property-management-coordination",
      "schedule-risk",
      "documentation-review",
    ],
  },

  {
    id: "restaurant.permitRisk",
    title: "Permit and inspection requirements are unverified",
    description:
      "Access control, fire-alarm interfaces, rated penetrations, exterior work, structural mounting, and specialty systems may require permits, inspections, engineered details, or authority approval.",
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
    id: "restaurant.openingScheduleRisk",
    title: "Opening dates may compress the installation schedule",
    description:
      "Grand openings, inspections, staff training, kitchen commissioning, furniture installation, and point-of-sale cutovers may require larger crews, overtime, expedited freight, and tightly coordinated testing.",
    severity: "high",
    conditions: [
      {
        field: "installation.estimatedDurationDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "opening-date",
      "schedule-review",
      "crew-scaling",
      "procurement-risk",
    ],
  },

  {
    id: "restaurant.documentRisk",
    title: "Incomplete project documentation may reduce estimate accuracy",
    description:
      "Missing floor plans, reflected ceiling plans, kitchen layouts, equipment schedules, network diagrams, landlord criteria, and door schedules may lead to routing, quantity, and coordination changes.",
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
    id: "restaurant.procurementRisk",
    title: "Equipment availability may affect the opening schedule",
    description:
      "Specialty cameras, access-control hardware, audio equipment, network switches, weather-rated devices, drive-through components, and restaurant technology may have extended lead times or substitution risk.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "procurement-risk",
      "lead-time-review",
      "substitution-review",
      "schedule-risk",
    ],
  },
];
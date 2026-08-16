import type { PlaybookAssumption } from "../playbook";

export const restaurantAssumptions: PlaybookAssumption[] = [
  {
    id: "restaurant.standardAccessAssumption",
    text:
      "Pricing assumes reasonable access to all installation areas during the agreed work schedule unless restricted customer, kitchen, bar, drive-through, or delivery zones are identified.",
    conditions: [],
    ruleTags: [
      "site-access-assumption",
      "restaurant-access",
    ],
  },

  {
    id: "restaurant.operatingFacilityAssumption",
    text:
      "Pricing assumes restaurant operations can be coordinated to provide safe temporary work zones around ladders, lifts, ceilings, walls, counters, kitchens, and customer areas.",
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
    id: "restaurant.standardWorkHoursAssumption",
    text:
      "Pricing assumes installation can be completed during normal business hours unless after-hours, overnight, shutdown, weekend, or holiday work is specifically required.",
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
    id: "restaurant.afterHoursAccessAssumption",
    text:
      "After-hours pricing assumes the customer will provide building access, alarm coordination, keys, security access, lighting, utility access, and an authorized site contact during each work window.",
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
    id: "restaurant.sanitationAssumption",
    text:
      "Pricing assumes installation areas will be cleared of exposed food, utensils, packaging, and active preparation before drilling, ceiling access, cable routing, or equipment mounting begins.",
    conditions: [],
    ruleTags: [
      "food-safety-assumption",
      "sanitation-coordination",
      "work-area-preparation",
    ],
  },

  {
    id: "restaurant.cleanupAssumption",
    text:
      "Pricing assumes standard construction cleanup only and excludes specialized food-service sanitation, grease removal, kitchen deep cleaning, or health-department remediation.",
    conditions: [],
    ruleTags: [
      "cleanup-assumption",
      "sanitation-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "restaurant.ceilingAccessAssumption",
    text:
      "Pricing assumes accessible ceiling or pathway conditions unless finished ceilings, kitchen panels, inaccessible soffits, sealed spaces, or architectural restrictions are identified.",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "ceiling-access-assumption",
      "pathway-review",
      "labor-review",
    ],
  },

  {
    id: "restaurant.pathwayAssumption",
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
    id: "restaurant.openPathwayAssumption",
    text:
      "Where no existing pathway is available, preliminary pricing assumes an approved combination of concealed routing, surface raceway, conduit, and supported ceiling pathways.",
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
      "raceway-review",
      "conduit-review",
    ],
  },

  {
    id: "restaurant.standardCeilingHeightAssumption",
    text:
      "Pricing assumes standard commercial mounting heights until actual ceiling, exterior, sign, pole, and device elevations are verified.",
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
    id: "restaurant.liftAccessAssumption",
    text:
      "Pricing assumes ladders, scaffolding, or lifts can safely reach proposed installation areas without removal of fixed kitchen equipment, dining furniture, menu boards, architectural features, or permanent obstructions.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-assumption",
      "obstruction-review",
      "floor-protection-review",
    ],
  },

  {
    id: "restaurant.copperDistanceAssumption",
    text:
      "Copper network cabling is assumed to remain within standard Ethernet distance limits unless field measurements identify longer routes requiring fiber or an additional enclosure.",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "copper-distance-assumption",
      "fiber-review",
      "distance-verification",
    ],
  },

  {
    id: "restaurant.powerAvailabilityAssumption",
    text:
      "Pricing assumes suitable electrical power is available near all proposed network racks, recorders, controllers, amplifiers, displays, point-of-sale equipment, access-control power supplies, and UPS equipment.",
    conditions: [],
    ruleTags: [
      "power-assumption",
      "electrical-coordination",
    ],
  },

  {
    id: "restaurant.rackCapacityAssumption",
    text:
      "Existing racks, cabinets, shelves, and network locations are not assumed to have sufficient space, power, cooling, grounding, security, or cable management until verified.",
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
      "security-review",
    ],
  },

  {
    id: "restaurant.networkConfigurationAssumption",
    text:
      "Pricing assumes the customer or technology provider will supply required internet, firewall, VLAN, payment-system, authentication, remote-access, and cybersecurity requirements before commissioning.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-coordination",
      "vlan-review",
      "pci-coordination",
      "cybersecurity-coordination",
    ],
  },

  {
    id: "restaurant.posIntegrationAssumption",
    text:
      "Point-of-sale programming, merchant processing, software licensing, payment-terminal configuration, and vendor-specific integration are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "pos-integration-exclusion",
      "vendor-coordination",
      "scope-clarification",
    ],
  },

  {
    id: "restaurant.guestWifiAssumption",
    text:
      "Guest Wi-Fi pricing assumes standard captive-portal and network-separation requirements unless branding, analytics, content filtering, legal acceptance, or custom authentication is requested.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi-assumption",
      "captive-portal-review",
      "network-segmentation",
    ],
  },

  {
    id: "restaurant.wifiDesignAssumption",
    text:
      "Wireless access-point quantities are preliminary until restaurant dimensions, construction materials, kitchen equipment, seating density, device load, outdoor areas, and radio-frequency conditions are verified.",
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
    id: "restaurant.cameraViewAssumption",
    text:
      "Camera quantities are preliminary until exact views, mounting heights, lighting, privacy restrictions, transaction objectives, obstructions, and cable routes are verified.",
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
    id: "restaurant.cameraLightingAssumption",
    text:
      "Preliminary camera pricing assumes typical restaurant lighting unless low-light, backlight, drive-through, infrared, license-plate, or supplemental-lighting requirements are identified.",
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
    id: "restaurant.videoRetentionAssumption",
    text:
      "Video storage sizing assumes continuous recording at standard resolution, frame rate, compression, and motion levels unless specific recording profiles are provided.",
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
    id: "restaurant.accessHardwareAssumption",
    text:
      "Access-control pricing assumes existing doors, frames, gates, cooler doors, freezer doors, and barriers are structurally suitable for the proposed locking hardware unless deficiencies are identified.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-condition-assumption",
      "hardware-compatibility-review",
      "cold-storage-door-review",
    ],
  },

  {
    id: "restaurant.lifeSafetyAssumption",
    text:
      "Access-control scope assumes all locking arrangements will be reviewed for applicable egress, fire-alarm, accessibility, occupancy, and authority requirements before final installation.",
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
    id: "restaurant.audioCoverageAssumption",
    text:
      "Audio speaker quantities and amplifier sizing are preliminary until room dimensions, ceiling heights, finish materials, ambient-noise levels, zone requirements, and customer loudness expectations are verified.",
    conditions: [],
    ruleTags: [
      "audio-design-assumption",
      "speaker-layout-review",
      "amplifier-sizing",
    ],
  },

  {
    id: "restaurant.musicLicensingAssumption",
    text:
      "Commercial music licensing, subscriptions, performance rights, streaming accounts, and content services are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "music-licensing-exclusion",
      "audio-service-review",
    ],
  },

  {
    id: "restaurant.driveThroughIntegrationAssumption",
    text:
      "Drive-through pricing assumes compatibility and coordination with existing intercom, timer, menu-board, vehicle-detection, payment, and restaurant-technology vendors unless replacement is specifically included.",
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
      "drive-through-assumption",
      "vendor-integration",
      "compatibility-review",
    ],
  },

  {
    id: "restaurant.firestopAssumption",
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
    id: "restaurant.permitAssumption",
    text:
      "Permit, inspection, engineering, landlord, shopping-center, health-department, fire-alarm, and authority fees are excluded from preliminary pricing unless specifically identified.",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-assumption",
      "inspection-review",
      "approval-coordination",
    ],
  },

  {
    id: "restaurant.customerProvidedDocumentsAssumption",
    text:
      "Pricing assumes the customer will provide available floor plans, reflected ceiling plans, kitchen layouts, equipment schedules, network diagrams, door schedules, landlord criteria, and technology standards when requested.",
    conditions: [],
    ruleTags: [
      "document-coordination",
      "design-input-assumption",
    ],
  },

  {
    id: "restaurant.patchAndPaintAssumption",
    text:
      "Patching, painting, ceiling repair, tile repair, stainless-steel repair, millwork restoration, roofing repair, concrete restoration, and architectural finish work are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "finish-repair-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "restaurant.specialEnvironmentAssumption",
    text:
      "Standard equipment and installation methods are assumed unless grease, steam, washdown, refrigeration, freezer, chemical, heat, or exterior exposure requirements are identified.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-environment-assumption",
      "environmental-rating-review",
      "food-service-environment",
    ],
  },

  {
    id: "restaurant.testingAssumption",
    text:
      "Pricing assumes standard manufacturer and installation testing unless certified copper testing, fiber certification, wireless validation, camera acceptance testing, audio tuning, or third-party commissioning is required.",
    conditions: [],
    ruleTags: [
      "testing-assumption",
      "certification-review",
      "commissioning-review",
    ],
  },

  {
    id: "restaurant.procurementAssumption",
    text:
      "Equipment availability, freight, lead times, substitutions, manufacturer pricing, and restaurant opening schedules remain subject to verification before final quote approval.",
    conditions: [],
    ruleTags: [
      "procurement-assumption",
      "lead-time-review",
      "price-validity",
    ],
  },
];
import type { PlaybookQuestion } from "../playbook";

export const warehouseQuestions: PlaybookQuestion[] = [
  {
    id: "warehouse.facilitySubtype",
    projectField: "property.customProjectType",
    question:
      "What type of warehouse or logistics facility is this?",
    promptGuidance:
      "Offer common examples such as distribution center, fulfillment center, cold storage, manufacturing warehouse, or general storage.",
    reason:
      "The facility type affects camera coverage, network density, environmental requirements, operating constraints, and installation methods.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Distribution center",
      "Fulfillment center",
      "General storage warehouse",
      "Manufacturing warehouse",
      "Cold storage or freezer warehouse",
      "Cross-dock facility",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "warehouse.operationalAreas",
      "warehouse.environmentalConditions",
      "warehouse.loadingDockCount",
    ],
    ruleTags: [
      "warehouse-subtype",
      "commercial-facility-classification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.constructionStatus",
    projectField: "property.constructionType",
    question:
      "Is this an operating warehouse, a renovation, or a new construction project?",
    promptGuidance:
      "Clarify whether employees, inventory, vehicles, or equipment will remain active during installation.",
    reason:
      "Construction status determines pathway access, scheduling, safety controls, installation speed, and coordination requirements.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Existing operating facility",
      "Existing vacant facility",
      "Renovation",
      "New construction",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "warehouse.occupiedDuringInstall",
      "warehouse.afterHoursWork",
      "warehouse.pathwayAvailability",
    ],
    ruleTags: [
      "construction-phase",
      "operational-coordination",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.squareFootage",
    projectField: "property.squareFootage",
    question:
      "What is the approximate total square footage of the warehouse?",
    promptGuidance:
      "Accept an estimate or range when the exact square footage is unavailable.",
    reason:
      "Facility size influences cable distance, equipment quantities, network design, labor, crew size, and project duration.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "warehouse.longestCableRun",
      "warehouse.networkRoomCount",
    ],
    ruleTags: [
      "facility-size",
      "labor-scaling",
      "material-scaling",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.ceilingHeight",
    projectField: "property.ceilingHeightFeet",
    question:
      "What is the approximate ceiling or roof-deck height in the warehouse?",
    promptGuidance:
      "Ask for the highest working area and note whether heights vary across the building.",
    reason:
      "Mounting height affects lift selection, camera lens requirements, access-point placement, labor productivity, and safety planning.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "warehouse.liftRequirement",
      "warehouse.cameraMountingHeight",
    ],
    ruleTags: [
      "high-ceiling-review",
      "lift-review",
      "mounting-height",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.ceilingType",
    projectField: "property.ceilingType",
    question:
      "What type of ceiling or overhead structure is present?",
    promptGuidance:
      "Offer warehouse deck, open steel structure, drop ceiling, drywall, or mixed construction.",
    reason:
      "The overhead structure affects cable supports, mounting hardware, pathways, fire stopping, lift access, and installation labor.",
    category: "property",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Open warehouse deck",
      "Open steel structure",
      "Drop ceiling",
      "Drywall ceiling",
      "Mixed ceiling types",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "warehouse.pathwayAvailability",
    ],
    ruleTags: [
      "ceiling-structure",
      "mounting-method-review",
      "cable-support-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.occupiedDuringInstall",
    projectField: "property.occupiedDuringInstall",
    question:
      "Will warehouse operations continue while the installation is taking place?",
    promptGuidance:
      "Mention employees, forklifts, conveyors, loading docks, inventory movement, and shipping operations.",
    reason:
      "Active operations can require phased work, spotters, barricades, restricted work zones, and reduced installation productivity.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "property.constructionType",
        operator: "not_equals",
        value: "new_construction",
      },
    ],
    dependsOn: [
      "warehouse.constructionStatus",
    ],
    unlocks: [
      "warehouse.afterHoursWork",
      "warehouse.forkliftTraffic",
      "warehouse.safetyRestrictions",
    ],
    ruleTags: [
      "occupied-facility",
      "operational-coordination",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.operationalAreas",
    projectField: "property.specialEnvironment",
    question:
      "Which operational areas are included in the project?",
    promptGuidance:
      "Allow multiple selections and ask the customer to describe any specialized spaces.",
    reason:
      "Different operational areas require different camera views, wireless coverage, pathways, mounting methods, and safety controls.",
    category: "commercial",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Receiving area",
      "Shipping area",
      "Loading docks",
      "Storage aisles",
      "Racking areas",
      "Packing stations",
      "Conveyor areas",
      "Production area",
      "Office area",
      "Exterior yard",
      "Trailer parking",
      "Cold storage",
      "Hazardous area",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "warehouse.facilitySubtype",
    ],
    unlocks: [
      "warehouse.loadingDockCount",
      "warehouse.forkliftTraffic",
      "warehouse.environmentalConditions",
    ],
    ruleTags: [
      "warehouse-zones",
      "scope-segmentation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.environmentalConditions",
    projectField: "property.specialEnvironment",
    question:
      "Are there any special environmental conditions such as freezers, coolers, dust, moisture, washdown areas, extreme heat, or hazardous materials?",
    promptGuidance:
      "Ask whether equipment must be temperature-rated, sealed, corrosion-resistant, explosion-rated, or protected from washdown.",
    reason:
      "Environmental conditions affect equipment ratings, enclosures, cable types, mounting hardware, warranties, and installation procedures.",
    category: "safety",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Freezer",
      "Cooler",
      "Dusty environment",
      "High moisture",
      "Washdown area",
      "Extreme heat",
      "Corrosive environment",
      "Hazardous or classified area",
      "No special conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "warehouse.facilitySubtype",
    ],
    unlocks: [],
    ruleTags: [
      "environmental-rating-review",
      "temperature-rating",
      "enclosure-review",
      "hazardous-area-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.loadingDockCount",
    projectField: "assessment.assumptions",
    question:
      "How many loading dock doors, drive-in doors, and shipping or receiving entrances are included?",
    promptGuidance:
      "Ask for separate counts when possible and clarify whether interior and exterior coverage is needed.",
    reason:
      "Loading docks commonly require cameras, wireless coverage, access control, intercoms, and specialized mounting locations.",
    category: "commercial",
    priority: "high",
    answerType: "number",
    choices: [],
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
    dependsOn: [
      "warehouse.operationalAreas",
    ],
    unlocks: [
      "warehouse.loadingDockCoverage",
    ],
    ruleTags: [
      "loading-dock-review",
      "dock-count",
      "perimeter-security",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.loadingDockCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "What activity should be visible at the loading docks?",
    promptGuidance:
      "Ask about trailer identification, dock-door activity, pallet movement, employee safety, shipment verification, and exterior approach views.",
    reason:
      "Coverage objectives determine camera quantity, placement, resolution, lens selection, lighting requirements, and storage usage.",
    category: "cameras",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Trailer identification",
      "Dock-door activity",
      "Pallet movement",
      "Shipment verification",
      "Employee safety",
      "Exterior approach",
      "License plates",
      "General overview",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
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
    dependsOn: [
      "warehouse.loadingDockCount",
    ],
    unlocks: [],
    ruleTags: [
      "dock-camera-design",
      "shipment-verification",
      "license-plate-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.forkliftTraffic",
    projectField: "assessment.risks",
    question:
      "Are forklifts, pallet jacks, order pickers, tuggers, or other vehicles operating in the installation areas?",
    promptGuidance:
      "Ask about traffic volume, travel aisles, charging areas, and whether lifts can safely occupy active lanes.",
    reason:
      "Vehicle traffic affects installer safety, cable and equipment protection, lift access, work-zone controls, and productivity.",
    category: "safety",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.occupiedDuringInstall",
    ],
    unlocks: [
      "warehouse.safetyRestrictions",
    ],
    ruleTags: [
      "forklift-review",
      "mobile-equipment",
      "work-zone-safety",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.safetyRestrictions",
    projectField: "assessment.risks",
    question:
      "What site-specific safety rules, permits, escorts, certifications, or restricted work zones apply?",
    promptGuidance:
      "Ask about lift certifications, hot-work permits, lockout procedures, spotters, safety orientations, PPE, and escorted access.",
    reason:
      "Site safety requirements affect mobilization, labor time, crew qualifications, equipment selection, and scheduling.",
    category: "safety",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "site-safety-plan",
      "permit-review",
      "certification-review",
      "restricted-access",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.pathwayAvailability",
    projectField: "cabling.pathwayType",
    question:
      "What cable pathways are available throughout the warehouse?",
    promptGuidance:
      "Ask about cable tray, J-hooks, conduit, basket tray, existing sleeves, underground pathways, and open structural routes.",
    reason:
      "Available pathways affect cable quantity, support materials, fire stopping, lift usage, installation speed, and code compliance.",
    category: "cabling",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Existing cable tray",
      "Basket tray",
      "J-hooks",
      "Conduit",
      "Existing sleeves",
      "Underground pathway",
      "Open structural routing",
      "No known pathway",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "warehouse.ceilingType",
    ],
    unlocks: [
      "warehouse.longestCableRun",
      "warehouse.fireStopping",
    ],
    ruleTags: [
      "pathway-review",
      "cable-support-review",
      "conduit-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.longestCableRun",
    projectField: "cabling.estimatedCableFeet",
    question:
      "What is the approximate longest cable route from the network room to the farthest device location?",
    promptGuidance:
      "Accept an estimated distance and explain that routes longer than standard copper limits may require fiber or an additional network enclosure.",
    reason:
      "Long cable routes may exceed copper Ethernet limits and require fiber, intermediate distribution frames, or revised equipment locations.",
    category: "cabling",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "warehouse.pathwayAvailability",
    ],
    unlocks: [
      "warehouse.networkRoomCount",
    ],
    ruleTags: [
      "long-cable-run-review",
      "fiber-review",
      "distance-limitation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.networkRoomCount",
    projectField: "network.rackLocation",
    question:
      "How many network rooms, telecom rooms, racks, or equipment enclosures serve the warehouse?",
    promptGuidance:
      "Ask where they are located and whether additional enclosures may be needed for distant areas.",
    reason:
      "Network-room locations determine backbone design, cable distances, fiber requirements, switch quantities, power, cooling, and serviceability.",
    category: "network",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "warehouse.existingFiber",
      "warehouse.rackCapacity",
    ],
    ruleTags: [
      "network-room-review",
      "idf-review",
      "mdf-review",
      "fiber-backbone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.existingFiber",
    projectField: "cabling.preferredCableType",
    question:
      "Is there existing fiber between the network rooms or major warehouse areas?",
    promptGuidance:
      "Ask whether the fiber type, strand count, connector type, test results, and available strands are known.",
    reason:
      "Existing fiber may be reusable, but its type, condition, capacity, and termination must be verified.",
    category: "cabling",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Existing fiber is available and documented",
      "Existing fiber is available but not documented",
      "No existing fiber",
      "Not sure",
    ],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "existing-fiber-review",
      "fiber-testing",
      "backbone-capacity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.rackCapacity",
    projectField: "network.rackRequired",
    question:
      "Do the existing racks have enough space, power, cooling, grounding, and cable management for the new equipment?",
    promptGuidance:
      "Explain that physical rack space alone does not confirm that the rack can support additional switches, recorders, UPS units, or fiber equipment.",
    reason:
      "Insufficient rack capacity can require a new rack, wall enclosure, power circuit, UPS, cooling improvements, or cable-management upgrades.",
    category: "network",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Yes",
      "No",
      "Needs verification",
      "No existing rack",
    ],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "rack-capacity-review",
      "power-review",
      "cooling-review",
      "ups-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.cameraCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Which warehouse areas and activities need camera coverage?",
    promptGuidance:
      "Ask about entrances, loading docks, aisles, high-value inventory, packing stations, conveyors, offices, yards, parking, and perimeter areas.",
    reason:
      "Coverage goals determine camera quantity, lens type, mounting height, network capacity, storage, lighting, and installation labor.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Entrances and exits",
      "Loading docks",
      "Storage aisles",
      "High-value inventory",
      "Packing stations",
      "Conveyors",
      "Production areas",
      "Office areas",
      "Exterior yard",
      "Trailer parking",
      "Employee parking",
      "Building perimeter",
      "Other",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "warehouse.cameraMountingHeight",
      "warehouse.recordingRetention",
      "warehouse.lowLightAreas",
    ],
    ruleTags: [
      "warehouse-camera-layout",
      "coverage-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.cameraMountingHeight",
    projectField: "cameras.mountingSurfaces",
    question:
      "At what heights and on what surfaces will the cameras be mounted?",
    promptGuidance:
      "Ask about roof deck, steel columns, walls, poles, racking, canopies, and exterior building surfaces.",
    reason:
      "Mounting height and surface affect camera selection, lens design, brackets, weatherproofing, lift type, installation time, and service access.",
    category: "cameras",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.cameraCoverage",
      "warehouse.ceilingHeight",
    ],
    unlocks: [
      "warehouse.liftRequirement",
    ],
    ruleTags: [
      "camera-height-review",
      "mounting-surface-review",
      "lift-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.recordingRetention",
    projectField: "cameras.recordingDays",
    question:
      "How many days of recorded video should the system retain?",
    promptGuidance:
      "Ask whether retention requirements differ for general areas, loading docks, high-value inventory, or incident investigations.",
    reason:
      "Retention requirements drive recorder capacity, storage quantity, bandwidth planning, camera settings, and system cost.",
    category: "cameras",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "video-retention",
      "storage-sizing",
      "bandwidth-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.lowLightAreas",
    projectField: "assessment.risks",
    question:
      "Are any camera areas poorly lit, backlit, completely dark, or affected by changing dock-door lighting?",
    promptGuidance:
      "Ask about nighttime exterior areas, dark aisles, bright open dock doors, and vehicle headlights.",
    reason:
      "Difficult lighting conditions affect sensor selection, infrared range, wide dynamic range, supplemental lighting, placement, and image quality.",
    category: "cameras",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "supplemental-lighting-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.wifiCoverage",
    projectField: "wifi.coverageGoals",
    question:
      "Which warehouse areas require reliable Wi-Fi coverage?",
    promptGuidance:
      "Ask about aisles, loading docks, yards, offices, mezzanines, freezers, handheld-scanner areas, and mobile equipment.",
    reason:
      "Coverage zones determine access-point quantity, placement, antenna type, environmental rating, cabling, and validation requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Storage aisles",
      "Loading docks",
      "Shipping and receiving",
      "Packing stations",
      "Office areas",
      "Mezzanines",
      "Exterior yard",
      "Trailer parking",
      "Freezers or coolers",
      "Production areas",
      "Other",
    ],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "warehouse.wifiDevices",
      "warehouse.wifiRoaming",
      "warehouse.wifiObstructions",
    ],
    ruleTags: [
      "warehouse-wifi-design",
      "coverage-zone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.wifiDevices",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "Approximately how many wireless devices will be active during the busiest shift?",
    promptGuidance:
      "Mention handheld scanners, tablets, phones, laptops, printers, cameras, sensors, robots, and vehicle-mounted terminals.",
    reason:
      "Device count and traffic load affect access-point density, channel planning, switch capacity, licensing, and internet requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "switch-capacity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.wifiRoaming",
    projectField: "wifi.weakAreas",
    question:
      "Do scanners, tablets, robots, or vehicle-mounted devices need uninterrupted Wi-Fi while moving through the warehouse?",
    promptGuidance:
      "Ask whether dropped connections currently interrupt scanning, picking, voice, automation, or warehouse-management applications.",
    reason:
      "Mobile workflows require roaming-aware wireless design, proper cell overlap, consistent configuration, and post-installation validation.",
    category: "wifi",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-roaming",
      "warehouse-mobility",
      "survey-required",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.wifiObstructions",
    projectField: "assessment.risks",
    question:
      "What materials or equipment may block or reflect wireless signals?",
    promptGuidance:
      "Ask about metal racks, dense inventory, liquids, freezers, machinery, conveyors, changing stock levels, and floor-to-ceiling storage.",
    reason:
      "Warehouse inventory and structures can significantly affect wireless propagation and may require predictive or onsite surveys.",
    category: "wifi",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "rf-obstruction-review",
      "wireless-survey",
      "inventory-variability",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.accessControlledDoors",
    projectField: "accessControl.controlledDoorCount",
    question:
      "How many doors, gates, turnstiles, or secured entries require access control?",
    promptGuidance:
      "Ask for exterior doors, interior restricted areas, employee entrances, gates, cages, offices, and high-value inventory rooms.",
    reason:
      "Controlled-opening count drives reader, lock, controller, power-supply, credential, licensing, cabling, and labor requirements.",
    category: "access_control",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "warehouse.accessDoorTypes",
      "warehouse.accessCredentials",
    ],
    ruleTags: [
      "warehouse-access-control",
      "controlled-opening-count",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.accessDoorTypes",
    projectField: "assessment.assumptions",
    question:
      "What types of doors, gates, or barriers will be controlled?",
    promptGuidance:
      "Ask about hollow-metal doors, aluminum storefront doors, roll-up doors, vehicle gates, turnstiles, mantraps, and fenced cages.",
    reason:
      "Opening type affects lock hardware, door position monitoring, request-to-exit devices, power, interfaces, permits, and labor.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Hollow-metal personnel door",
      "Aluminum storefront door",
      "Wood door",
      "Roll-up door",
      "Vehicle gate",
      "Turnstile",
      "Fenced cage",
      "Mantrap",
      "Other",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.accessControlledDoors",
    ],
    unlocks: [],
    ruleTags: [
      "door-hardware-review",
      "gate-integration-review",
      "life-safety-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.accessCredentials",
    projectField: "accessControl.credentialTypes",
    question:
      "What credentials should employees, contractors, and visitors use?",
    promptGuidance:
      "Allow multiple selections and ask whether the system must integrate with employee records or visitor management.",
    reason:
      "Credential requirements affect readers, mobile access, cards, enrollment, identity integration, licensing, and administration.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cards",
      "Key fobs",
      "Mobile credentials",
      "PIN codes",
      "Biometric credentials",
      "Vehicle tags",
      "Temporary visitor credentials",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "warehouse.accessControlledDoors",
    ],
    unlocks: [],
    ruleTags: [
      "credential-selection",
      "identity-integration-review",
      "visitor-access-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.liftRequirement",
    projectField: "installation.liftRequired",
    question:
      "Will a scissor lift, boom lift, order picker, or other elevated-access equipment be required?",
    promptGuidance:
      "Consider mounting height, aisle width, floor condition, obstructions, rack layout, dock areas, and active operations.",
    reason:
      "Lift requirements affect rental cost, delivery fees, operator qualifications, crew size, scheduling, safety planning, and productivity.",
    category: "installation",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Scissor lift",
      "Boom lift",
      "Order picker",
      "Multiple lift types",
      "Ladder access only",
      "Needs walkthrough",
    ],
    conditions: [],
    dependsOn: [
      "warehouse.ceilingHeight",
    ],
    unlocks: [],
    ruleTags: [
      "lift-required-review",
      "equipment-rental",
      "operator-certification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.afterHoursWork",
    projectField: "installation.afterHoursRequired",
    question:
      "Must any installation work be completed after hours, during shutdowns, or in scheduled maintenance windows?",
    promptGuidance:
      "Ask about shipping cutoffs, production schedules, peak seasons, blackout periods, and restricted dock availability.",
    reason:
      "Restricted work windows can increase labor rates, extend duration, require phased mobilization, and affect equipment-rental periods.",
    category: "installation",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "warehouse.constructionStatus",
    ],
    unlocks: [],
    ruleTags: [
      "after-hours",
      "shutdown-coordination",
      "schedule-restriction",
      "labor-premium-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.fireStopping",
    projectField: "cabling.fireStoppingRequired",
    question:
      "Will new cabling pass through fire-rated walls, floors, shafts, or other rated assemblies?",
    promptGuidance:
      "Ask whether existing sleeves are available and whether the customer has approved firestop systems or documentation requirements.",
    reason:
      "Rated penetrations require approved firestop materials, installation methods, labeling, documentation, and additional labor.",
    category: "cabling",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Yes",
      "No",
      "Existing sleeves are available",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [
      "warehouse.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "documentation-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "warehouse.projectSchedule",
    projectField: "installation.estimatedDurationDays",
    question:
      "What is the required completion date, and are there any phased turnover dates or operational deadlines?",
    promptGuidance:
      "Ask about construction milestones, warehouse launches, peak seasons, tenant occupancy, inspections, and system cutovers.",
    reason:
      "Schedule constraints affect crew size, sequencing, overtime, equipment rentals, procurement, testing, and commissioning.",
    category: "installation",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "schedule-review",
      "crew-scaling",
      "phased-delivery",
      "procurement-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },
];
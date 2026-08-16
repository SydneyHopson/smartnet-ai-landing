import type { PlaybookQuestion } from "../playbook";

export const restaurantQuestions: PlaybookQuestion[] = [
  {
    id: "restaurant.facilitySubtype",
    projectField: "property.customProjectType",
    question:
      "What type of restaurant or food-service facility is this?",
    promptGuidance:
      "Offer common examples such as quick service, full service, bar, café, food hall, ghost kitchen, or drive-through.",
    reason:
      "Restaurant type affects customer traffic, operating hours, camera coverage, Wi-Fi capacity, audio requirements, access control, and installation conditions.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Quick-service restaurant",
      "Full-service restaurant",
      "Bar or lounge",
      "Café or bakery",
      "Food hall vendor",
      "Ghost kitchen",
      "Drive-through restaurant",
      "Commercial kitchen",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "restaurant.operationalAreas",
      "restaurant.customerCapacity",
      "restaurant.environmentalConditions",
    ],
    ruleTags: [
      "restaurant-subtype",
      "food-service-classification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.constructionStatus",
    projectField: "property.constructionType",
    question:
      "Is this an operating restaurant, renovation, tenant build-out, or new construction project?",
    promptGuidance:
      "Clarify whether food service and customer operations will continue during installation.",
    reason:
      "Construction status affects pathway access, scheduling, dust control, inspections, shutdown coordination, and labor productivity.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Existing operating restaurant",
      "Existing vacant restaurant",
      "Renovation",
      "Tenant build-out",
      "New construction",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "restaurant.occupiedDuringInstall",
      "restaurant.afterHoursWork",
      "restaurant.pathwayAvailability",
    ],
    ruleTags: [
      "construction-phase",
      "restaurant-operations",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.squareFootage",
    projectField: "property.squareFootage",
    question:
      "What is the approximate total square footage of the restaurant?",
    promptGuidance:
      "Accept an estimate or range if exact plans are unavailable.",
    reason:
      "Facility size affects cable distances, device quantities, Wi-Fi coverage, labor, pathway needs, and project duration.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "restaurant.networkLocation",
      "restaurant.wifiCoverage",
    ],
    ruleTags: [
      "facility-size",
      "material-scaling",
      "labor-scaling",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.customerCapacity",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "What is the restaurant's approximate customer seating or maximum occupancy?",
    promptGuidance:
      "Ask for seated capacity, standing capacity, outdoor seating, and peak guest volume when applicable.",
    reason:
      "Customer capacity affects guest Wi-Fi demand, point-of-sale traffic, audio coverage, camera placement, and network sizing.",
    category: "commercial",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "restaurant.facilitySubtype",
    ],
    unlocks: [
      "restaurant.guestWifi",
      "restaurant.audioZones",
    ],
    ruleTags: [
      "occupancy-review",
      "guest-capacity",
      "network-capacity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.occupiedDuringInstall",
    projectField: "property.occupiedDuringInstall",
    question:
      "Will the restaurant remain open while installation work is being completed?",
    promptGuidance:
      "Ask whether dining, kitchen, drive-through, delivery, or bar operations will continue.",
    reason:
      "Operating restaurants may require after-hours work, phased installation, sanitation controls, protected work zones, and repeated mobilization.",
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
      "restaurant.constructionStatus",
    ],
    unlocks: [
      "restaurant.afterHoursWork",
      "restaurant.sanitationRestrictions",
    ],
    ruleTags: [
      "occupied-facility",
      "restaurant-operations",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.operationalAreas",
    projectField: "property.specialEnvironment",
    question:
      "Which restaurant areas are included in the project?",
    promptGuidance:
      "Allow multiple selections and ask about any specialized customer, kitchen, delivery, or exterior areas.",
    reason:
      "Different restaurant zones require different cameras, wireless coverage, audio, cabling, environmental ratings, and installation methods.",
    category: "commercial",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Dining room",
      "Kitchen",
      "Bar",
      "Point-of-sale counters",
      "Drive-through",
      "Pickup area",
      "Delivery entrance",
      "Manager office",
      "Storage room",
      "Walk-in cooler",
      "Walk-in freezer",
      "Outdoor patio",
      "Parking lot",
      "Dumpster area",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.facilitySubtype",
    ],
    unlocks: [
      "restaurant.environmentalConditions",
      "restaurant.cameraCoverage",
      "restaurant.wifiCoverage",
      "restaurant.audioZones",
    ],
    ruleTags: [
      "restaurant-zones",
      "scope-segmentation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.environmentalConditions",
    projectField: "property.specialEnvironment",
    question:
      "Are devices or cabling needed in hot, greasy, wet, refrigerated, freezer, washdown, or exterior areas?",
    promptGuidance:
      "Ask whether equipment must tolerate grease, steam, moisture, cleaning chemicals, heat, cold, or direct weather exposure.",
    reason:
      "Restaurant environmental conditions affect equipment ratings, cable jackets, enclosures, mounting hardware, cleaning resistance, and warranty eligibility.",
    category: "safety",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Commercial kitchen heat",
      "Grease exposure",
      "Steam or high humidity",
      "Washdown area",
      "Walk-in cooler",
      "Walk-in freezer",
      "Cleaning chemicals",
      "Exterior weather exposure",
      "No special conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.operationalAreas",
    ],
    unlocks: [],
    ruleTags: [
      "environmental-rating-review",
      "food-service-environment",
      "temperature-rating",
      "moisture-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.sanitationRestrictions",
    projectField: "assessment.risks",
    question:
      "What sanitation, food-safety, cleaning, or work-area restrictions must the installation crew follow?",
    promptGuidance:
      "Ask about kitchen access, food preparation hours, dust control, ceiling access above food areas, cleaning schedules, PPE, and protected surfaces.",
    reason:
      "Food-service restrictions can affect work hours, cable routing, drilling methods, cleanup, crew access, and installation productivity.",
    category: "safety",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "sanitation-review",
      "food-safety-coordination",
      "dust-control",
      "work-zone-protection",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.ceilingType",
    projectField: "property.ceilingType",
    question:
      "What ceiling types are present throughout the restaurant?",
    promptGuidance:
      "Offer drop ceiling, drywall, open ceiling, kitchen ceiling panels, and mixed construction.",
    reason:
      "Ceiling construction affects cable access, mounting hardware, pathway selection, fire stopping, patching, and labor.",
    category: "property",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Drop ceiling",
      "Drywall ceiling",
      "Open ceiling",
      "Kitchen ceiling panels",
      "Mixed ceiling types",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "restaurant.pathwayAvailability",
      "restaurant.ceilingAccess",
    ],
    ruleTags: [
      "ceiling-structure",
      "pathway-review",
      "mounting-method-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.ceilingHeight",
    projectField: "property.ceilingHeightFeet",
    question:
      "What is the approximate ceiling height in the dining, kitchen, and customer-service areas?",
    promptGuidance:
      "Ask whether ceiling heights vary between front-of-house and back-of-house areas.",
    reason:
      "Ceiling height affects ladder or lift requirements, speaker placement, camera views, access-point placement, and labor.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "restaurant.liftRequirement",
    ],
    ruleTags: [
      "ceiling-height",
      "lift-review",
      "mounting-height",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.ceilingAccess",
    projectField: "cabling.wiringStyle",
    question:
      "Can cabling be routed above the ceilings, or will finished surfaces require exposed raceway or access openings?",
    promptGuidance:
      "Ask separately about dining areas, kitchens, offices, exterior walls, and drive-through areas.",
    reason:
      "Ceiling access and finish expectations affect pathway materials, wall repair, visual appearance, labor, and installation duration.",
    category: "cabling",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Accessible above ceilings",
      "Limited ceiling access",
      "No ceiling access",
      "Exposed raceway is acceptable",
      "Mixed conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.ceilingType",
    ],
    unlocks: [
      "restaurant.pathwayAvailability",
      "restaurant.patchRepair",
    ],
    ruleTags: [
      "ceiling-access-review",
      "wiring-finish",
      "labor-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.pathwayAvailability",
    projectField: "cabling.pathwayType",
    question:
      "What cable pathways are available throughout the restaurant?",
    promptGuidance:
      "Ask about existing conduit, cable tray, J-hooks, ceiling space, wall sleeves, floor pathways, and exterior conduit.",
    reason:
      "Available pathways affect material quantities, cable protection, fire stopping, installation speed, visual finish, and code compliance.",
    category: "cabling",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Accessible ceiling space",
      "Existing conduit",
      "Cable tray",
      "J-hooks",
      "Existing sleeves",
      "Floor pathway",
      "Exterior conduit",
      "No known pathway",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.ceilingAccess",
    ],
    unlocks: [
      "restaurant.fireStopping",
      "restaurant.longestCableRun",
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
    id: "restaurant.longestCableRun",
    projectField: "cabling.estimatedCableFeet",
    question:
      "What is the approximate longest cable route from the network equipment to the farthest device?",
    promptGuidance:
      "Accept an estimate and explain that actual pathway distance matters more than straight-line distance.",
    reason:
      "Cable distance affects material quantities, labor, pathway needs, network design, and whether fiber or an additional enclosure is needed.",
    category: "cabling",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "restaurant.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "cable-distance-review",
      "fiber-review",
      "material-quantity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.fireStopping",
    projectField: "cabling.fireStoppingRequired",
    question:
      "Will new cabling pass through fire-rated walls, tenant separations, floors, shafts, or kitchen barriers?",
    promptGuidance:
      "Ask whether existing sleeves or approved firestop systems are available.",
    reason:
      "Rated penetrations require approved materials, installation methods, labeling, documentation, and additional labor.",
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
      "restaurant.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "inspection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.patchRepair",
    projectField: "assessment.assumptions",
    question:
      "If wall or ceiling openings are required, should SmartNET include patching and painting, or will another contractor handle repairs?",
    promptGuidance:
      "Explain that finished dining spaces may require access openings even when most wiring is concealed.",
    reason:
      "Finish-repair responsibilities must be included or excluded from the proposal.",
    category: "installation",
    priority: "normal",
    answerType: "single_choice",
    choices: [
      "Include patching",
      "Include patching and painting",
      "Another contractor will handle repairs",
      "Decide after walkthrough",
    ],
    conditions: [
      {
        field: "property.constructionType",
        operator: "not_equals",
        value: "new_construction",
      },
    ],
    dependsOn: [
      "restaurant.ceilingAccess",
    ],
    unlocks: [],
    ruleTags: [
      "finish-repair-scope",
      "scope-clarification",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.networkLocation",
    projectField: "network.rackLocation",
    question:
      "Where are the modem, router, switches, point-of-sale network equipment, and other network devices located?",
    promptGuidance:
      "Ask whether equipment is in an office, storage room, manager area, kitchen cabinet, ceiling, or dedicated rack.",
    reason:
      "The network location affects cable routes, rack needs, cooling, power, security, serviceability, and equipment organization.",
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
      "restaurant.rackCapacity",
      "restaurant.networkSegmentation",
    ],
    ruleTags: [
      "network-headend",
      "rack-location",
      "serviceability-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.rackCapacity",
    projectField: "network.rackRequired",
    question:
      "Is the existing network equipment organized in a rack or enclosure with enough space, power, cooling, and cable management?",
    promptGuidance:
      "Ask whether point-of-sale, cameras, Wi-Fi, music, delivery systems, and office devices currently share the same equipment area.",
    reason:
      "Insufficient equipment organization may require a new rack, enclosure, UPS, patch panels, power, cooling, or cable cleanup.",
    category: "network",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Existing rack has capacity",
      "Existing rack needs cleanup",
      "Existing rack is full",
      "No existing rack",
      "Needs verification",
    ],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.networkLocation",
    ],
    unlocks: [
      "restaurant.upsRequirement",
    ],
    ruleTags: [
      "rack-capacity-review",
      "network-cleanup",
      "power-review",
      "cooling-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.networkSegmentation",
    projectField: "network.vlanRequired",
    question:
      "Should point-of-sale, guest Wi-Fi, staff devices, cameras, music systems, and business equipment be separated on different networks?",
    promptGuidance:
      "Explain that separating systems can improve security, reliability, troubleshooting, and payment-system protection.",
    reason:
      "Network segmentation affects switch configuration, firewall requirements, wireless design, cybersecurity, and commissioning.",
    category: "network",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.networkLocation",
    ],
    unlocks: [],
    ruleTags: [
      "vlan-review",
      "pci-network-separation",
      "cybersecurity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.upsRequirement",
    projectField: "equipment.recommendedItems",
    question:
      "Should point-of-sale, internet, cameras, Wi-Fi, and other critical systems remain online during short power interruptions?",
    promptGuidance:
      "Explain that battery backup can reduce transaction disruption and preserve critical connectivity.",
    reason:
      "Runtime goals determine UPS capacity, equipment grouping, outlet requirements, and rack design.",
    category: "installation",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "restaurant.rackCapacity",
    ],
    unlocks: [],
    ruleTags: [
      "ups-review",
      "business-continuity",
      "power-resilience",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.cameraCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Which restaurant areas and activities need camera coverage?",
    promptGuidance:
      "Ask about entrances, registers, dining areas, kitchen, bar, pickup shelves, drive-through, storage, delivery doors, parking, and dumpsters.",
    reason:
      "Coverage goals determine camera count, lens type, mounting location, lighting requirements, storage, network capacity, and labor.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Main entrance",
      "Registers and point-of-sale",
      "Dining room",
      "Kitchen",
      "Bar",
      "Pickup area",
      "Drive-through",
      "Storage rooms",
      "Manager office",
      "Delivery entrance",
      "Parking lot",
      "Dumpster area",
      "Outdoor patio",
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
      "restaurant.transactionCoverage",
      "restaurant.kitchenCameraRestrictions",
      "restaurant.recordingRetention",
      "restaurant.cameraLighting",
    ],
    ruleTags: [
      "restaurant-camera-layout",
      "loss-prevention",
      "coverage-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.transactionCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Should cameras provide clear views of cash transactions, point-of-sale activity, pickup orders, or drive-through handoffs?",
    promptGuidance:
      "Clarify whether the customer needs general overview, employee activity, transaction verification, or detailed identification.",
    reason:
      "Transaction objectives affect camera placement, lens selection, mounting height, resolution, frame rate, and storage.",
    category: "cameras",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cash transaction verification",
      "Point-of-sale activity",
      "Pickup-order verification",
      "Drive-through handoff",
      "Employee activity",
      "General overview only",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "transaction-verification",
      "camera-detail-review",
      "lens-selection-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.kitchenCameraRestrictions",
    projectField: "assessment.risks",
    question:
      "Are there restrictions on camera placement in kitchens, employee areas, offices, or other sensitive locations?",
    promptGuidance:
      "Ask respectfully about employee privacy, union requirements, company policies, and areas that should not be recorded.",
    reason:
      "Privacy and workplace policies affect camera placement, masking, signage, proposal assumptions, and system configuration.",
    category: "cameras",
    priority: "normal",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "privacy-review",
      "workplace-policy-review",
      "camera-restrictions",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.recordingRetention",
    projectField: "cameras.recordingDays",
    question:
      "How many days of recorded video should the restaurant retain?",
    promptGuidance:
      "Ask whether registers, drive-through, kitchen, parking, or incident areas require different retention periods.",
    reason:
      "Retention requirements drive recorder size, storage capacity, bandwidth, redundancy, and system cost.",
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
      "restaurant.cameraCoverage",
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
    id: "restaurant.cameraLighting",
    projectField: "assessment.risks",
    question:
      "Are any camera areas affected by low light, bright windows, headlights, menu-board lighting, or changing drive-through conditions?",
    promptGuidance:
      "Ask about nighttime parking, bright entrances, backlit registers, kitchen lighting, and drive-through lanes.",
    reason:
      "Challenging lighting affects sensor selection, infrared, wide dynamic range, supplemental lighting, and camera placement.",
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
      "restaurant.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "drive-through-lighting",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.wifiCoverage",
    projectField: "wifi.coverageGoals",
    question:
      "Which restaurant areas need reliable Wi-Fi coverage?",
    promptGuidance:
      "Ask about dining, kitchen, bar, patio, drive-through, pickup, office, storage, parking, and delivery areas.",
    reason:
      "Coverage zones determine access-point quantity, placement, environmental rating, cabling, switching, and validation requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Dining room",
      "Kitchen",
      "Bar",
      "Outdoor patio",
      "Drive-through",
      "Pickup area",
      "Manager office",
      "Storage areas",
      "Parking lot",
      "Delivery entrance",
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
      "restaurant.guestWifi",
      "restaurant.businessDevices",
      "restaurant.outdoorWifi",
    ],
    ruleTags: [
      "restaurant-wifi-design",
      "coverage-zone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.guestWifi",
    projectField: "wifi.guestNetworkRequired",
    question:
      "Will the restaurant provide guest Wi-Fi for customers?",
    promptGuidance:
      "Ask whether the guest network needs branding, splash-page acceptance, time limits, content filtering, or usage reporting.",
    reason:
      "Guest Wi-Fi affects network segmentation, internet capacity, access-point density, security, portal configuration, and support.",
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
      "restaurant.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "captive-portal-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.businessDevices",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "How many business and customer devices may use Wi-Fi during the busiest period?",
    promptGuidance:
      "Mention point-of-sale tablets, handheld ordering devices, printers, phones, delivery tablets, menu boards, staff devices, and customer devices.",
    reason:
      "Device count affects access-point density, switch capacity, channel planning, internet bandwidth, and licensing.",
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
      "restaurant.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "restaurant-technology-load",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.outdoorWifi",
    projectField: "wifi.outdoorCoverage",
    question:
      "Is reliable Wi-Fi required on patios, drive-through lanes, parking areas, or exterior pickup zones?",
    promptGuidance:
      "Ask about weather exposure, coverage distance, staff devices, outdoor payment terminals, and customer use.",
    reason:
      "Outdoor coverage may require weather-rated access points, directional antennas, exterior pathways, surge protection, and additional design validation.",
    category: "wifi",
    priority: "normal",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "outdoor-wifi",
      "weather-rated-equipment",
      "surge-protection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.accessControlledDoors",
    projectField: "accessControl.controlledDoorCount",
    question:
      "How many doors, gates, storage rooms, offices, or restricted areas need access control?",
    promptGuidance:
      "Ask about employee entrances, manager offices, liquor storage, cash rooms, delivery doors, roof access, and exterior gates.",
    reason:
      "Controlled-opening count drives readers, locks, controllers, power supplies, credentials, cabling, licensing, and labor.",
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
      "restaurant.accessDoorTypes",
      "restaurant.accessCredentials",
    ],
    ruleTags: [
      "restaurant-access-control",
      "controlled-opening-count",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.accessDoorTypes",
    projectField: "assessment.assumptions",
    question:
      "What types of doors or barriers will be controlled?",
    promptGuidance:
      "Ask about hollow-metal doors, storefront doors, wood doors, gates, cooler doors, freezer doors, and roll-up delivery doors.",
    reason:
      "Opening type affects lock hardware, door monitoring, power transfer, request-to-exit devices, life safety, and installation labor.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Hollow-metal door",
      "Aluminum storefront door",
      "Wood door",
      "Exterior gate",
      "Walk-in cooler door",
      "Walk-in freezer door",
      "Roll-up delivery door",
      "Other",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.accessControlledDoors",
    ],
    unlocks: [],
    ruleTags: [
      "door-hardware-review",
      "cold-storage-door-review",
      "life-safety-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.accessCredentials",
    projectField: "accessControl.credentialTypes",
    question:
      "How should employees, managers, vendors, and contractors unlock controlled doors?",
    promptGuidance:
      "Allow multiple selections and ask whether temporary or scheduled credentials are needed.",
    reason:
      "Credential requirements affect readers, mobile access, cards, enrollment, licensing, scheduling, and administration.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cards",
      "Key fobs",
      "Mobile credentials",
      "PIN codes",
      "Biometric credentials",
      "Temporary credentials",
      "Remote release",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "restaurant.accessControlledDoors",
    ],
    unlocks: [],
    ruleTags: [
      "credential-selection",
      "employee-access",
      "vendor-access",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.audioZones",
    projectField: "assessment.assumptions",
    question:
      "Which areas need background music, paging, announcements, television audio, or separate volume control?",
    promptGuidance:
      "Ask about dining, bar, patio, restrooms, kitchen, pickup, waiting, and private dining areas.",
    reason:
      "Audio zones determine speaker quantity, amplifier channels, source equipment, controls, cabling, and commissioning.",
    category: "audio_visual",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Dining room",
      "Bar",
      "Outdoor patio",
      "Restrooms",
      "Kitchen",
      "Pickup area",
      "Waiting area",
      "Private dining room",
      "Paging throughout",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.operationalAreas",
    ],
    unlocks: [
      "restaurant.audioSources",
      "restaurant.audioControls",
    ],
    ruleTags: [
      "restaurant-audio",
      "audio-zone-design",
      "speaker-layout",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.audioSources",
    projectField: "equipment.recommendedItems",
    question:
      "What audio sources should the system support?",
    promptGuidance:
      "Ask about licensed background music, television audio, streaming devices, paging microphones, DJ input, and local source connections.",
    reason:
      "Audio-source requirements affect mixers, streaming hardware, licensing, input interfaces, amplifiers, and controls.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Licensed background music",
      "Television audio",
      "Streaming device",
      "Paging microphone",
      "DJ or live input",
      "Local auxiliary input",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.audioZones",
    ],
    unlocks: [],
    ruleTags: [
      "audio-source-review",
      "music-licensing-review",
      "av-equipment",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.audioControls",
    projectField: "assessment.assumptions",
    question:
      "Who should control music sources, zone volume, paging, and television audio?",
    promptGuidance:
      "Ask whether controls should be wall-mounted, app-based, manager-only, scheduled, or centrally locked.",
    reason:
      "Control requirements affect wall controls, mobile applications, programming, user permissions, and training.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Manager-only controls",
      "Wall volume controls",
      "Mobile application",
      "Scheduled automation",
      "Central locked controls",
      "Separate controls by zone",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.audioZones",
    ],
    unlocks: [],
    ruleTags: [
      "audio-control-review",
      "user-permissions",
      "automation-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.driveThroughSystems",
    projectField: "assessment.assumptions",
    question:
      "Does the project include drive-through communication, menu boards, timers, vehicle detection, cameras, or outdoor payment equipment?",
    promptGuidance:
      "Ask which systems are existing, being replaced, or need integration.",
    reason:
      "Drive-through systems may require specialized audio, networking, cabling, weather-rated equipment, power, loops, sensors, cameras, and vendor coordination.",
    category: "commercial",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Drive-through intercom",
      "Digital menu boards",
      "Vehicle detection",
      "Drive-through timer",
      "Lane cameras",
      "Outdoor payment terminal",
      "Multiple lanes",
      "No drive-through systems",
    ],
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
    dependsOn: [
      "restaurant.facilitySubtype",
    ],
    unlocks: [],
    ruleTags: [
      "drive-through-review",
      "weather-rated-equipment",
      "vendor-integration",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.afterHoursWork",
    projectField: "installation.afterHoursRequired",
    question:
      "Must installation work be completed after closing, overnight, during scheduled shutdowns, or before opening?",
    promptGuidance:
      "Ask about operating hours, cleaning schedules, delivery windows, peak periods, and restricted kitchen access.",
    reason:
      "Restricted work windows can increase labor rates, mobilizations, supervision, project duration, and equipment-rental periods.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "restaurant.constructionStatus",
    ],
    unlocks: [],
    ruleTags: [
      "after-hours",
      "restaurant-shutdown",
      "labor-premium-review",
      "schedule-restriction",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.liftRequirement",
    projectField: "installation.liftRequired",
    question:
      "Will ladders, scaffolding, or a lift be required to reach ceilings, exterior walls, signs, poles, or drive-through equipment?",
    promptGuidance:
      "Consider ceiling height, dining-room access, kitchen obstructions, exterior mounting, and parking-lot work.",
    reason:
      "Elevated-access requirements affect rental cost, crew size, safety, floor protection, scheduling, and productivity.",
    category: "installation",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Ladders only",
      "Scaffolding",
      "Scissor lift",
      "Boom lift",
      "Multiple access methods",
      "Needs walkthrough",
    ],
    conditions: [],
    dependsOn: [
      "restaurant.ceilingHeight",
    ],
    unlocks: [],
    ruleTags: [
      "lift-review",
      "equipment-rental",
      "floor-protection-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.permits",
    projectField: "installation.permitsRequired",
    question:
      "Are permits, inspections, landlord approvals, fire-alarm coordination, health-department coordination, or shopping-center approvals required?",
    promptGuidance:
      "Ask whether the customer, general contractor, landlord, or SmartNET will manage approvals.",
    reason:
      "Approval requirements affect schedule, documentation, engineering, fees, inspections, access-control design, and project responsibility.",
    category: "commercial",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Yes",
      "No",
      "Customer or contractor will manage",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "permit-review",
      "landlord-approval",
      "inspection-review",
      "authority-coordination",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "restaurant.projectSchedule",
    projectField: "installation.estimatedDurationDays",
    question:
      "What is the required completion date, opening date, inspection date, or phased turnover schedule?",
    promptGuidance:
      "Ask about grand opening, construction milestones, equipment installation, staff training, and system cutover.",
    reason:
      "Schedule constraints affect crew size, overtime, procurement, sequencing, testing, programming, and commissioning.",
    category: "installation",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "schedule-review",
      "opening-date",
      "crew-scaling",
      "procurement-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },
];
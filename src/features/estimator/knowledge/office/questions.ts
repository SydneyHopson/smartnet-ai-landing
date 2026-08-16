import type { PlaybookQuestion } from "../playbook";

export const officeQuestions: PlaybookQuestion[] = [
  {
    id: "office.facilitySubtype",
    projectField: "property.customProjectType",
    question:
      "What type of office environment is this?",
    promptGuidance:
      "Offer examples such as corporate office, professional services, coworking, call center, government office, executive suite, or mixed-use office.",
    reason:
      "Office type affects user density, conference-room needs, Wi-Fi capacity, access control, audiovisual systems, security, and installation scheduling.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Corporate office",
      "Professional services office",
      "Coworking space",
      "Call center",
      "Government office",
      "Executive suite",
      "Mixed-use office",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.operationalAreas",
      "office.employeeCapacity",
      "office.specialRequirements",
    ],
    ruleTags: [
      "office-subtype",
      "commercial-office-classification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.constructionStatus",
    projectField: "property.constructionType",
    question:
      "Is this an operating office, renovation, tenant build-out, relocation, or new construction project?",
    promptGuidance:
      "Clarify whether employees and business operations will continue during installation.",
    reason:
      "Construction status affects pathway access, furniture coordination, work hours, phased installation, system cutovers, and labor productivity.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Existing operating office",
      "Existing vacant office",
      "Renovation",
      "Tenant build-out",
      "Office relocation",
      "New construction",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.occupiedDuringInstall",
      "office.afterHoursWork",
      "office.pathwayAvailability",
    ],
    ruleTags: [
      "construction-phase",
      "office-operations",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.squareFootage",
    projectField: "property.squareFootage",
    question:
      "What is the approximate total square footage of the office?",
    promptGuidance:
      "Accept an estimate or range if exact plans are unavailable.",
    reason:
      "Office size affects cable quantities, access-point count, camera coverage, labor, rack capacity, and project duration.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.networkRoomCount",
      "office.longestCableRun",
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
    id: "office.numberOfFloors",
    projectField: "property.numberOfFloors",
    question:
      "How many floors or separate office suites are included?",
    promptGuidance:
      "Ask whether floors are connected internally and whether each floor has its own telecom room.",
    reason:
      "Multiple floors or suites may require fiber backbone, additional racks, riser pathways, access coordination, and separate network zones.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.networkRoomCount",
      "office.existingFiber",
    ],
    ruleTags: [
      "multi-floor-review",
      "riser-review",
      "fiber-backbone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.employeeCapacity",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "How many employees, contractors, visitors, and connected devices are expected during the busiest period?",
    promptGuidance:
      "Ask about full-time staff, hybrid workers, conference attendees, guest devices, phones, laptops, tablets, printers, and smart-office devices.",
    reason:
      "Occupancy and device count affect Wi-Fi capacity, switch sizing, internet bandwidth, conferencing, licensing, and future growth.",
    category: "commercial",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.facilitySubtype",
    ],
    unlocks: [
      "office.wifiDevices",
      "office.guestWifi",
      "office.hotelingRequirements",
    ],
    ruleTags: [
      "occupancy-review",
      "device-density",
      "network-capacity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.occupiedDuringInstall",
    projectField: "property.occupiedDuringInstall",
    question:
      "Will employees and business operations continue during installation?",
    promptGuidance:
      "Ask whether desks, conference rooms, reception, executive areas, and customer-facing spaces will remain active.",
    reason:
      "Occupied offices may require phased work, after-hours installation, furniture coordination, noise control, and repeated mobilization.",
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
      "office.constructionStatus",
    ],
    unlocks: [
      "office.afterHoursWork",
      "office.noiseRestrictions",
      "office.furnitureCoordination",
    ],
    ruleTags: [
      "occupied-facility",
      "office-operations",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.operationalAreas",
    projectField: "property.specialEnvironment",
    question:
      "Which office areas are included in the project?",
    promptGuidance:
      "Allow multiple selections and ask about specialty collaboration, security, executive, customer, and support spaces.",
    reason:
      "Different office areas require different networking, wireless, audiovisual, security, privacy, and installation approaches.",
    category: "commercial",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Reception",
      "Open office",
      "Private offices",
      "Conference rooms",
      "Training rooms",
      "Executive offices",
      "Break rooms",
      "Copy and print areas",
      "Call-center floor",
      "Server room",
      "Telecom rooms",
      "Storage rooms",
      "Lobby",
      "Parking and exterior",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "office.facilitySubtype",
    ],
    unlocks: [
      "office.conferenceRoomCount",
      "office.cameraCoverage",
      "office.wifiCoverage",
      "office.accessControlledAreas",
    ],
    ruleTags: [
      "office-zones",
      "scope-segmentation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.specialRequirements",
    projectField: "property.specialEnvironment",
    question:
      "Are there any special office environments or security requirements?",
    promptGuidance:
      "Ask about executive suites, legal offices, financial areas, secure rooms, call centers, recording restrictions, high-density seating, and sensitive information.",
    reason:
      "Special office requirements may affect privacy, access control, sound masking, network segmentation, camera placement, and documentation.",
    category: "safety",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Executive suite",
      "Legal or confidential workspace",
      "Financial or payment-processing area",
      "High-density call center",
      "Secure records room",
      "Restricted server room",
      "Recording restrictions",
      "Sound-privacy requirements",
      "No special requirements",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.facilitySubtype",
    ],
    unlocks: [
      "office.soundMasking",
      "office.networkSegmentation",
      "office.cameraPrivacy",
    ],
    ruleTags: [
      "office-security-review",
      "privacy-review",
      "confidential-area-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.ceilingType",
    projectField: "property.ceilingType",
    question:
      "What ceiling types are present throughout the office?",
    promptGuidance:
      "Offer drop ceiling, drywall, open ceiling, specialty acoustic ceiling, and mixed construction.",
    reason:
      "Ceiling construction affects cable pathways, speaker installation, access-point mounting, camera placement, fire stopping, and labor.",
    category: "property",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Drop ceiling",
      "Drywall ceiling",
      "Open ceiling",
      "Acoustic ceiling system",
      "Mixed ceiling types",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.ceilingAccess",
      "office.pathwayAvailability",
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
    id: "office.ceilingHeight",
    projectField: "property.ceilingHeightFeet",
    question:
      "What is the approximate ceiling height in office, lobby, conference, and common areas?",
    promptGuidance:
      "Ask whether heights vary in lobbies, training rooms, atriums, exposed ceilings, or exterior areas.",
    reason:
      "Ceiling height affects ladder or lift requirements, speaker placement, camera views, access-point placement, and labor.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "office.liftRequirement",
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
    id: "office.ceilingAccess",
    projectField: "cabling.wiringStyle",
    question:
      "Can cabling be routed above the ceilings, or will finished spaces require raceway, wall openings, or furniture pathways?",
    promptGuidance:
      "Ask separately about open offices, private offices, conference rooms, executive areas, lobbies, and exterior walls.",
    reason:
      "Ceiling access and finish expectations affect pathway design, labor, furniture coordination, patching, and visual appearance.",
    category: "cabling",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Accessible above ceilings",
      "Limited ceiling access",
      "No ceiling access",
      "Furniture pathways are available",
      "Surface raceway is acceptable",
      "Mixed conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.ceilingType",
    ],
    unlocks: [
      "office.pathwayAvailability",
      "office.patchRepair",
    ],
    ruleTags: [
      "ceiling-access-review",
      "furniture-pathway-review",
      "wiring-finish",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.pathwayAvailability",
    projectField: "cabling.pathwayType",
    question:
      "What cable pathways are available throughout the office?",
    promptGuidance:
      "Ask about cable tray, J-hooks, conduit, floor boxes, poke-throughs, furniture pathways, wall sleeves, raised floor, and existing telecom routes.",
    reason:
      "Available pathways affect cable quantities, floor-core work, furniture integration, fire stopping, installation speed, and code compliance.",
    category: "cabling",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Accessible ceiling space",
      "Cable tray",
      "J-hooks",
      "Existing conduit",
      "Floor boxes",
      "Poke-throughs",
      "Furniture pathways",
      "Raised floor",
      "Existing sleeves",
      "No known pathway",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.ceilingAccess",
    ],
    unlocks: [
      "office.longestCableRun",
      "office.fireStopping",
      "office.floorCoreRequirements",
    ],
    ruleTags: [
      "pathway-review",
      "furniture-pathway-review",
      "floor-box-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.longestCableRun",
    projectField: "cabling.estimatedCableFeet",
    question:
      "What is the approximate longest cable route from the serving telecom room to the farthest device?",
    promptGuidance:
      "Accept an estimate and explain that actual installed pathway distance matters more than straight-line distance.",
    reason:
      "Cable distance affects material quantities, copper limits, fiber requirements, telecom-room design, and labor.",
    category: "cabling",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.pathwayAvailability",
    ],
    unlocks: [
      "office.networkRoomCount",
    ],
    ruleTags: [
      "cable-distance-review",
      "fiber-review",
      "material-quantity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.fireStopping",
    projectField: "cabling.fireStoppingRequired",
    question:
      "Will new cabling pass through fire-rated walls, floors, shafts, tenant separations, or other rated assemblies?",
    promptGuidance:
      "Ask whether existing sleeves or approved firestop systems are available.",
    reason:
      "Rated penetrations require approved materials, labeling, documentation, inspections, and additional labor.",
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
      "office.pathwayAvailability",
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
    id: "office.floorCoreRequirements",
    projectField: "cabling.trenchingRequired",
    question:
      "Are new floor boxes, poke-throughs, core drilling, raised-floor routes, or furniture feeds required?",
    promptGuidance:
      "Ask whether structural scans, landlord approval, engineering, after-hours drilling, or below-floor access are required.",
    reason:
      "Floor pathways may require scanning, coring, specialty fittings, fire stopping, structural approval, and coordination with other tenants.",
    category: "cabling",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "New floor boxes",
      "New poke-throughs",
      "Core drilling",
      "Raised-floor routing",
      "Furniture feeds",
      "Existing floor pathways only",
      "No floor work",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [
      "office.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "floor-core-review",
      "structural-scan-review",
      "tenant-coordination",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.patchRepair",
    projectField: "assessment.assumptions",
    question:
      "If wall or ceiling openings are required, should SmartNET include patching and painting, or will another contractor handle repairs?",
    promptGuidance:
      "Mention finished executive, lobby, conference, and customer-facing spaces.",
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
      "office.ceilingAccess",
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
    id: "office.networkRoomCount",
    projectField: "network.rackLocation",
    question:
      "How many server rooms, telecom rooms, racks, or network enclosures serve the office?",
    promptGuidance:
      "Ask where the main and intermediate telecom spaces are and whether each floor or suite has local equipment.",
    reason:
      "Telecom-room locations determine cable distance, fiber backbone, rack quantities, switch capacity, power, cooling, and serviceability.",
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
      "office.rackCapacity",
      "office.existingFiber",
      "office.networkSegmentation",
    ],
    ruleTags: [
      "network-room-review",
      "mdf-review",
      "idf-review",
      "fiber-backbone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.rackCapacity",
    projectField: "network.rackRequired",
    question:
      "Do the existing racks have enough space, power, cooling, grounding, switch ports, PoE capacity, and cable management?",
    promptGuidance:
      "Ask about patch panels, switches, firewalls, UPS units, recorders, audiovisual equipment, controllers, and future growth.",
    reason:
      "Insufficient rack capacity may require a new rack, enclosure, UPS, switches, electrical work, cooling, or cable-management upgrades.",
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
      "office.networkRoomCount",
    ],
    unlocks: [
      "office.upsRequirement",
    ],
    ruleTags: [
      "rack-capacity-review",
      "switch-capacity-review",
      "power-review",
      "cooling-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.existingFiber",
    projectField: "cabling.preferredCableType",
    question:
      "Is there existing fiber between floors, telecom rooms, suites, or buildings?",
    promptGuidance:
      "Ask whether fiber type, strand count, connectors, labeling, available strands, ownership, and test records are known.",
    reason:
      "Existing fiber may be reusable only after capacity, compatibility, routing, ownership, and test results are verified.",
    category: "cabling",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Existing fiber is available and documented",
      "Existing fiber is available but undocumented",
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
      "office.networkRoomCount",
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
    id: "office.networkSegmentation",
    projectField: "network.vlanRequired",
    question:
      "Should employee, guest, voice, camera, access-control, audiovisual, printer, IoT, and building-system traffic be separated?",
    promptGuidance:
      "Explain that segmentation can improve security, performance, troubleshooting, and vendor separation.",
    reason:
      "Office networks often require controlled separation between users, guests, security, voice, audiovisual, smart-office, and vendor systems.",
    category: "network",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "vlan-review",
      "office-network-segmentation",
      "cybersecurity-review",
      "iot-isolation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.upsRequirement",
    projectField: "equipment.recommendedItems",
    question:
      "Which network, phone, security, conferencing, and business systems must remain online during short power interruptions?",
    promptGuidance:
      "Ask about internet, switches, phones, cameras, access control, conference systems, servers, and selected workstations.",
    reason:
      "Required runtime affects UPS capacity, equipment grouping, rack design, electrical requirements, and business continuity.",
    category: "installation",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.rackCapacity",
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
    id: "office.wifiCoverage",
    projectField: "wifi.coverageGoals",
    question:
      "Which office areas require reliable Wi-Fi coverage?",
    promptGuidance:
      "Ask about open offices, private offices, conference rooms, training rooms, lobbies, break rooms, outdoor areas, parking, and shared spaces.",
    reason:
      "Coverage zones determine access-point quantity, placement, switching, cabling, capacity, and validation requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Open office",
      "Private offices",
      "Conference rooms",
      "Training rooms",
      "Reception and lobby",
      "Break rooms",
      "Call-center floor",
      "Executive suite",
      "Outdoor areas",
      "Parking areas",
      "Entire facility",
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
      "office.wifiDevices",
      "office.guestWifi",
      "office.roamingRequirements",
      "office.wifiObstructions",
    ],
    ruleTags: [
      "office-wifi-design",
      "coverage-zone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.wifiDevices",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "Approximately how many wireless devices will be active during the busiest period?",
    promptGuidance:
      "Mention laptops, phones, tablets, printers, conference devices, guest devices, IoT sensors, displays, and smart-office equipment.",
    reason:
      "Device count and traffic type affect access-point density, switch capacity, channel planning, licensing, and internet bandwidth.",
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
      "office.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "office-device-load",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.guestWifi",
    projectField: "wifi.guestNetworkRequired",
    question:
      "Will visitors, clients, vendors, or temporary workers receive guest Wi-Fi access?",
    promptGuidance:
      "Ask about network isolation, captive portal, sponsorship, legal acceptance, time limits, bandwidth controls, and support responsibility.",
    reason:
      "Guest Wi-Fi affects segmentation, security, authentication, firewall policies, bandwidth, and support.",
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
      "office.wifiCoverage",
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
    id: "office.roamingRequirements",
    projectField: "wifi.weakAreas",
    question:
      "Do voice devices, laptops, tablets, conferencing systems, or mobile workers require uninterrupted Wi-Fi while moving through the office?",
    promptGuidance:
      "Ask whether dropped connections affect calls, meetings, collaboration, hot-desking, warehouse-adjacent work, or mobile applications.",
    reason:
      "Mobile office workflows require roaming-aware wireless design, consistent authentication, proper cell overlap, and validation.",
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
      "office.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-roaming",
      "voice-over-wifi",
      "wireless-validation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.wifiObstructions",
    projectField: "assessment.risks",
    question:
      "Are there materials or office features that may affect wireless coverage?",
    promptGuidance:
      "Ask about concrete, glass, metal partitions, movable walls, elevators, dense furniture, acoustic panels, neighboring Wi-Fi, and high-density rooms.",
    reason:
      "Office construction and occupancy can significantly affect wireless propagation and may require predictive or onsite surveys.",
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
      "office.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "rf-obstruction-review",
      "wireless-survey",
      "interference-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.hotelingRequirements",
    projectField: "assessment.assumptions",
    question:
      "Does the office use hoteling, hot-desking, shared workspaces, desk booking, or flexible seating?",
    promptGuidance:
      "Ask about docking stations, shared phones, room booking, occupancy sensors, wireless dependence, and user support.",
    reason:
      "Flexible workplaces may require denser wireless, shared docking, room scheduling, occupancy technology, and additional support systems.",
    category: "commercial",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Hot-desking",
      "Desk booking",
      "Shared workstations",
      "Shared phones",
      "Room booking",
      "Occupancy sensors",
      "No flexible seating",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.employeeCapacity",
    ],
    unlocks: [],
    ruleTags: [
      "hybrid-office",
      "hoteling",
      "workspace-technology",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.cameraCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Which office areas and activities require camera coverage?",
    promptGuidance:
      "Ask about entrances, reception, lobbies, hallways, server rooms, storage, loading areas, parking, executive areas, and restricted spaces.",
    reason:
      "Coverage goals determine camera count, privacy restrictions, placement, lens selection, storage, network capacity, and policy review.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Main entrances",
      "Reception",
      "Lobby",
      "Hallways",
      "Server rooms",
      "Storage rooms",
      "Executive areas",
      "Loading or service areas",
      "Parking",
      "Exterior perimeter",
      "Restricted areas",
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
      "office.cameraPrivacy",
      "office.recordingRetention",
      "office.cameraLighting",
    ],
    ruleTags: [
      "office-camera-layout",
      "privacy-review",
      "security-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.cameraPrivacy",
    projectField: "assessment.risks",
    question:
      "Are there employee privacy, confidential-work, recording, legal, union, or company-policy restrictions on camera placement?",
    promptGuidance:
      "Ask about private offices, HR areas, legal departments, screens, whiteboards, break rooms, wellness rooms, and employee workstations.",
    reason:
      "Office surveillance must account for employee privacy, confidential information, policy, legal review, and sensitive workspaces.",
    category: "cameras",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "employee-privacy",
      "camera-restrictions",
      "confidential-information-review",
      "policy-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.recordingRetention",
    projectField: "cameras.recordingDays",
    question:
      "How many days of recorded video should the office retain?",
    promptGuidance:
      "Ask whether entrances, server rooms, parking, executive areas, or incident footage require different retention.",
    reason:
      "Retention requirements drive recorder capacity, storage quantity, bandwidth, redundancy, and system cost.",
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
      "office.cameraCoverage",
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
    id: "office.cameraLighting",
    projectField: "assessment.risks",
    question:
      "Are any camera areas affected by bright glass, reflections, low light, backlighting, parking-lot headlights, or changing conditions?",
    promptGuidance:
      "Ask about glass lobbies, exterior entrances, dim hallways, parking decks, and nighttime exterior areas.",
    reason:
      "Lighting conditions affect camera sensor selection, WDR, infrared, placement, and image quality.",
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
      "office.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.accessControlledAreas",
    projectField: "accessControl.controlledDoorCount",
    question:
      "How many doors, elevators, turnstiles, gates, cabinets, or restricted areas require access control?",
    promptGuidance:
      "Ask about employee entrances, executive suites, server rooms, records, HR, finance, storage, parking, elevators, and shared tenant spaces.",
    reason:
      "Controlled-opening count drives readers, locks, controllers, power supplies, credentials, software, monitoring, and labor.",
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
      "office.accessDoorTypes",
      "office.accessCredentials",
      "office.accessAuditRequirements",
    ],
    ruleTags: [
      "office-access-control",
      "controlled-opening-count",
      "restricted-area-security",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.accessDoorTypes",
    projectField: "assessment.assumptions",
    question:
      "What types of doors, elevators, turnstiles, gates, or barriers are included?",
    promptGuidance:
      "Ask about hollow-metal doors, storefront doors, wood doors, glass doors, automatic doors, elevators, turnstiles, and parking gates.",
    reason:
      "Opening type affects lock hardware, life safety, power transfer, accessibility, monitoring, integrations, and labor.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Hollow-metal door",
      "Aluminum storefront door",
      "Wood door",
      "Glass door",
      "Automatic door",
      "Elevator",
      "Turnstile",
      "Parking gate",
      "Other",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "door-hardware-review",
      "elevator-integration-review",
      "turnstile-review",
      "life-safety-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.accessCredentials",
    projectField: "accessControl.credentialTypes",
    question:
      "What credentials should employees, executives, contractors, visitors, and tenants use?",
    promptGuidance:
      "Allow multiple selections and ask about mobile credentials, temporary access, role-based permissions, visitor management, and identity-system integration.",
    reason:
      "Credential requirements affect readers, enrollment, permissions, licensing, audit trails, visitor workflows, and administration.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cards",
      "Key fobs",
      "Mobile credentials",
      "PIN codes",
      "Biometric credentials",
      "Temporary visitor credentials",
      "Tenant credentials",
      "Role-based access",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "credential-selection",
      "role-based-access",
      "visitor-access",
      "identity-integration-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.accessAuditRequirements",
    projectField: "assessment.assumptions",
    question:
      "Are detailed access logs, alerts, reports, remote management, visitor records, or identity integrations required?",
    promptGuidance:
      "Ask which openings require monitoring and who reviews events, reports, and visitor records.",
    reason:
      "Audit and reporting requirements affect licensing, event retention, integrations, alerting, and administrative setup.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Detailed access logs",
      "Forced-door alerts",
      "Held-door alerts",
      "Remote management",
      "Scheduled reports",
      "Visitor records",
      "Identity-system integration",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "visitor-management",
      "remote-management",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.conferenceRoomCount",
    projectField: "assessment.assumptions",
    question:
      "How many conference rooms, huddle rooms, training rooms, boardrooms, and collaboration spaces are included?",
    promptGuidance:
      "Ask for room types and whether existing equipment will remain.",
    reason:
      "Room count and type drive displays, cameras, microphones, speakers, control systems, scheduling panels, cabling, programming, and support.",
    category: "audio_visual",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.operationalAreas",
    ],
    unlocks: [
      "office.conferenceRoomFeatures",
      "office.roomScheduling",
      "office.avPlatforms",
    ],
    ruleTags: [
      "conference-room-count",
      "collaboration-space-review",
      "av-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.conferenceRoomFeatures",
    projectField: "equipment.recommendedItems",
    question:
      "What features are required in the conference and collaboration rooms?",
    promptGuidance:
      "Allow multiple selections and ask whether requirements vary by room type.",
    reason:
      "Room features determine displays, cameras, microphones, speakers, control systems, cabling, furniture integration, and programming.",
    category: "audio_visual",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Video conferencing",
      "Wireless presentation",
      "Wired presentation",
      "Room camera",
      "Room microphones",
      "Ceiling speakers",
      "Soundbar",
      "Interactive display",
      "Dual displays",
      "Room control",
      "Recording",
      "Assistive listening",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "office.conferenceRoomCount",
    ],
    unlocks: [
      "office.avPlatforms",
      "office.roomScheduling",
      "office.acousticConditions",
    ],
    ruleTags: [
      "conference-room-features",
      "av-equipment",
      "collaboration-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.avPlatforms",
    projectField: "assessment.assumptions",
    question:
      "Which conferencing and collaboration platforms must the rooms support?",
    promptGuidance:
      "Ask about Microsoft Teams, Zoom, Webex, Google Meet, BYOD, SIP, and mixed-platform requirements.",
    reason:
      "Platform requirements affect room systems, licensing, compute devices, peripherals, control, interoperability, and support.",
    category: "audio_visual",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Microsoft Teams Rooms",
      "Zoom Rooms",
      "Cisco Webex",
      "Google Meet",
      "Bring your own device",
      "SIP conferencing",
      "Multiple platforms",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.conferenceRoomFeatures",
    ],
    unlocks: [],
    ruleTags: [
      "collaboration-platform",
      "room-system-review",
      "licensing-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.roomScheduling",
    projectField: "assessment.assumptions",
    question:
      "Do rooms need scheduling panels, calendar integration, occupancy sensing, check-in, or room-release automation?",
    promptGuidance:
      "Ask which calendar platform is used and whether desk or room booking is already deployed.",
    reason:
      "Scheduling requirements affect panels, licensing, calendar integration, sensors, network ports, power, configuration, and support.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Scheduling panels",
      "Calendar integration",
      "Room check-in",
      "Occupancy sensing",
      "Automatic room release",
      "Desk booking",
      "No scheduling system",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "office.conferenceRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "room-scheduling",
      "calendar-integration",
      "occupancy-sensing",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.acousticConditions",
    projectField: "assessment.risks",
    question:
      "Are there echo, background noise, glass walls, open ceilings, movable partitions, or privacy concerns in meeting and work areas?",
    promptGuidance:
      "Ask about call-center noise, open-office speech privacy, executive confidentiality, and poor meeting-room acoustics.",
    reason:
      "Acoustic conditions affect microphone selection, speaker placement, DSP, sound treatment, sound masking, and room performance.",
    category: "audio_visual",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.conferenceRoomFeatures",
    ],
    unlocks: [
      "office.soundMasking",
    ],
    ruleTags: [
      "acoustic-review",
      "speech-privacy",
      "conference-audio",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.soundMasking",
    projectField: "assessment.assumptions",
    question:
      "Does the office need sound masking or speech-privacy improvements?",
    promptGuidance:
      "Ask about open offices, legal departments, HR, finance, executive areas, call centers, and private offices.",
    reason:
      "Sound masking affects emitter quantity, zoning, controls, ceiling conditions, commissioning, and privacy performance.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Open-office sound masking",
      "Private-office speech privacy",
      "HR or legal privacy",
      "Executive-area privacy",
      "Call-center noise control",
      "No sound masking",
      "Needs assessment",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "sound-masking",
      "speech-privacy",
      "acoustic-design",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.digitalSignage",
    projectField: "assessment.assumptions",
    question:
      "Does the office need digital signage, lobby displays, wayfinding, employee communications, dashboards, or video walls?",
    promptGuidance:
      "Ask about content sources, display locations, orientation, brightness, scheduling, management, and network connectivity.",
    reason:
      "Digital-signage requirements affect displays, mounts, players, power, network, cabling, content management, and support.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Lobby display",
      "Employee communications",
      "Wayfinding",
      "KPI dashboard",
      "Video wall",
      "Training display",
      "Reception signage",
      "No digital signage",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "digital-signage",
      "display-system",
      "content-management",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.furnitureCoordination",
    projectField: "assessment.risks",
    question:
      "Will new or existing furniture systems affect cable routing, device placement, desk feeds, or installation access?",
    promptGuidance:
      "Ask about cubicles, sit-stand desks, modular furniture, floor feeds, power poles, benching systems, and furniture-vendor responsibilities.",
    reason:
      "Furniture systems can significantly affect pathway design, cable lengths, installation sequencing, access, and change orders.",
    category: "installation",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.occupiedDuringInstall",
    ],
    unlocks: [],
    ruleTags: [
      "furniture-coordination",
      "modular-furniture",
      "installation-sequencing",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.noiseRestrictions",
    projectField: "assessment.risks",
    question:
      "Are there noise, drilling, dust, meeting, executive, or customer-service restrictions during installation?",
    promptGuidance:
      "Ask about quiet hours, board meetings, calls, training, tenant rules, and customer-facing operations.",
    reason:
      "Noise restrictions may require after-hours drilling, phased work, specialized tools, additional mobilizations, and reduced productivity.",
    category: "installation",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "office.occupiedDuringInstall",
    ],
    unlocks: [],
    ruleTags: [
      "noise-restriction",
      "drilling-window",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.afterHoursWork",
    projectField: "installation.afterHoursRequired",
    question:
      "Must installation occur after hours, on weekends, during shutdowns, or around business-critical meetings?",
    promptGuidance:
      "Ask about office hours, executive schedules, tenant rules, building access, security, and cutover windows.",
    reason:
      "Restricted work windows may increase labor rates, mobilizations, supervision, access coordination, and project duration.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "office.constructionStatus",
    ],
    unlocks: [],
    ruleTags: [
      "after-hours",
      "office-shutdown",
      "labor-premium-review",
      "schedule-restriction",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "office.liftRequirement",
    projectField: "installation.liftRequired",
    question:
      "Will ladders, scaffolding, or lifts be required for ceilings, atriums, lobbies, exterior walls, parking areas, or elevated equipment?",
    promptGuidance:
      "Consider floor protection, corridor access, furniture, employees, finished surfaces, and building restrictions.",
    reason:
      "Elevated access affects rental cost, crew size, floor protection, scheduling, access, and productivity.",
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
      "office.ceilingHeight",
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
    id: "office.permits",
    projectField: "installation.permitsRequired",
    question:
      "Are permits, inspections, landlord approvals, property-management approvals, structural scans, elevator coordination, or fire-alarm interfaces required?",
    promptGuidance:
      "Ask who is responsible for each approval and whether the building has specific contractor rules.",
    reason:
      "Approval requirements affect schedule, documentation, engineering, fees, building access, and project responsibility.",
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
      "property-management-coordination",
      "inspection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "office.projectSchedule",
    projectField: "installation.estimatedDurationDays",
    question:
      "What is the required completion date, move-in date, phased turnover, inspection date, or system-cutover schedule?",
    promptGuidance:
      "Ask about furniture installation, employee moves, network cutover, conference-room commissioning, training, and occupancy.",
    reason:
      "Schedule constraints affect crew size, overtime, procurement, sequencing, testing, migration, and commissioning.",
    category: "installation",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "schedule-review",
      "move-in-date",
      "system-cutover",
      "crew-scaling",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },
];
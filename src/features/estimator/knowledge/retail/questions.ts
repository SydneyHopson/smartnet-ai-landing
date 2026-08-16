import type { PlaybookQuestion } from "../playbook";

export const retailQuestions: PlaybookQuestion[] = [
  {
    id: "retail.facilitySubtype",
    projectField: "property.customProjectType",
    question:
      "What type of retail environment is this?",
    promptGuidance:
      "Offer examples such as boutique, convenience store, grocery store, department store, showroom, mall tenant, pharmacy retail, luxury retail, or multi-location chain.",
    reason:
      "Retail type affects customer traffic, transaction security, Wi-Fi density, camera design, access control, audio, digital signage, and installation scheduling.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Boutique or specialty store",
      "Convenience store",
      "Grocery store",
      "Department store",
      "Showroom",
      "Mall tenant",
      "Luxury retail",
      "Pharmacy retail",
      "Big-box retail",
      "Multi-location chain",
      "Other retail environment",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.storeAreas",
      "retail.customerCapacity",
      "retail.specialRequirements",
    ],
    ruleTags: [
      "retail-subtype",
      "commercial-retail-classification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.constructionStatus",
    projectField: "property.constructionType",
    question:
      "Is this an operating store, renovation, tenant build-out, relocation, remodel, or new construction project?",
    promptGuidance:
      "Clarify whether customers, employees, inventory, and store operations will continue during installation.",
    reason:
      "Construction status affects pathway access, merchandise protection, work hours, phased installation, system cutovers, and labor productivity.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Existing operating store",
      "Existing vacant store",
      "Renovation",
      "Tenant build-out",
      "Store relocation",
      "Store remodel",
      "New construction",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.occupiedDuringInstall",
      "retail.afterHoursWork",
      "retail.pathwayAvailability",
    ],
    ruleTags: [
      "construction-phase",
      "retail-operations",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.squareFootage",
    projectField: "property.squareFootage",
    question:
      "What is the approximate total square footage of the store?",
    promptGuidance:
      "Accept an estimate or range when exact plans are unavailable.",
    reason:
      "Store size affects cable quantities, wireless coverage, camera count, rack capacity, labor, and project duration.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.networkRoomCount",
      "retail.longestCableRun",
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
    id: "retail.numberOfFloors",
    projectField: "property.numberOfFloors",
    question:
      "How many sales floors, stock levels, mezzanines, or separate suites are included?",
    promptGuidance:
      "Ask whether each level has its own network equipment, stockroom, office, or customer area.",
    reason:
      "Multiple levels may require fiber backbone, additional racks, riser pathways, lift access, and separate network zones.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.networkRoomCount",
      "retail.existingFiber",
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
    id: "retail.customerCapacity",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "How many employees, customers, vendors, and connected devices are expected during the busiest period?",
    promptGuidance:
      "Ask about registers, handheld scanners, tablets, staff devices, guest devices, digital signage, cameras, sensors, printers, and inventory systems.",
    reason:
      "Occupancy and device count affect Wi-Fi capacity, switch sizing, internet bandwidth, point-of-sale reliability, and network segmentation.",
    category: "commercial",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.facilitySubtype",
    ],
    unlocks: [
      "retail.wifiDevices",
      "retail.guestWifi",
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
    id: "retail.occupiedDuringInstall",
    projectField: "property.occupiedDuringInstall",
    question:
      "Will the store remain open to customers during installation?",
    promptGuidance:
      "Ask whether sales areas, registers, stockrooms, fitting rooms, receiving, and customer entrances will remain active.",
    reason:
      "Operating stores may require phased work, after-hours installation, merchandise protection, dust control, temporary barriers, and repeated mobilization.",
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
      "retail.constructionStatus",
    ],
    unlocks: [
      "retail.afterHoursWork",
      "retail.customerSafetyRestrictions",
      "retail.merchandiseProtection",
    ],
    ruleTags: [
      "occupied-facility",
      "retail-operations",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.storeAreas",
    projectField: "property.specialEnvironment",
    question:
      "Which store areas are included in the project?",
    promptGuidance:
      "Allow multiple selections and ask about customer, employee, inventory, transaction, receiving, and exterior spaces.",
    reason:
      "Different retail areas require different camera, network, Wi-Fi, access-control, pathway, audio, and installation strategies.",
    category: "commercial",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Sales floor",
      "Checkout or registers",
      "Customer service",
      "Fitting rooms",
      "Stockroom",
      "Receiving area",
      "Loading area",
      "Manager office",
      "Cash office",
      "Pharmacy area",
      "High-value merchandise area",
      "Vestibule",
      "Exterior and parking",
      "Drive-up or curbside pickup",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "retail.facilitySubtype",
    ],
    unlocks: [
      "retail.cameraCoverage",
      "retail.accessControlledAreas",
      "retail.wifiCoverage",
      "retail.specialRequirements",
    ],
    ruleTags: [
      "retail-zones",
      "scope-segmentation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.specialRequirements",
    projectField: "property.specialEnvironment",
    question:
      "Are there any special retail environments, loss-prevention requirements, or operating conditions?",
    promptGuidance:
      "Ask about high-value merchandise, refrigeration, pharmacy, jewelry, cash handling, fitting rooms, food retail, exterior displays, and secure inventory.",
    reason:
      "Special retail conditions may require enhanced surveillance, environmental ratings, access controls, privacy review, specialty pathways, and vendor coordination.",
    category: "safety",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "High-value merchandise",
      "Jewelry or luxury goods",
      "Pharmacy",
      "Cash office",
      "Refrigerated displays",
      "Freezer areas",
      "Food retail",
      "Fitting rooms",
      "Secure inventory cage",
      "Exterior merchandise",
      "Drive-up pickup",
      "No special requirements",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "retail.storeAreas",
    ],
    unlocks: [
      "retail.cameraPrivacy",
      "retail.environmentalConditions",
      "retail.transactionCoverage",
    ],
    ruleTags: [
      "retail-security-review",
      "loss-prevention",
      "specialty-environment-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.customerSafetyRestrictions",
    projectField: "assessment.risks",
    question:
      "What customer-safety, work-zone, noise, dust, ladder, lift, or merchandise restrictions apply during installation?",
    promptGuidance:
      "Ask about temporary barriers, aisle closures, customer routing, daily cleanup, overhead work, and store-management approval.",
    reason:
      "Customer-facing work restrictions can materially affect labor, staging, access, sequencing, and project duration.",
    category: "safety",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "retail.occupiedDuringInstall",
    ],
    unlocks: [],
    ruleTags: [
      "customer-safety",
      "work-zone-coordination",
      "dust-control",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.merchandiseProtection",
    projectField: "assessment.risks",
    question:
      "What merchandise, fixture, inventory, display, or loss-prevention protections are required during installation?",
    promptGuidance:
      "Ask about covered merchandise, secure staging, inventory movement, fixture protection, employee escorts, and prohibited work zones.",
    reason:
      "Merchandise protection affects labor, staging, access, cleanup, customer coordination, and liability.",
    category: "safety",
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
      "retail.occupiedDuringInstall",
    ],
    unlocks: [],
    ruleTags: [
      "merchandise-protection",
      "inventory-security",
      "site-logistics",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.ceilingType",
    projectField: "property.ceilingType",
    question:
      "What ceiling types are present throughout the store?",
    promptGuidance:
      "Offer drop ceiling, drywall, open ceiling, exposed structure, decorative ceiling, and mixed construction.",
    reason:
      "Ceiling construction affects cable pathways, camera mounting, access-point placement, speakers, signage, lifts, and labor.",
    category: "property",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Drop ceiling",
      "Drywall ceiling",
      "Open ceiling",
      "Exposed structure",
      "Decorative ceiling",
      "Mixed ceiling types",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.ceilingAccess",
      "retail.pathwayAvailability",
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
    id: "retail.ceilingHeight",
    projectField: "property.ceilingHeightFeet",
    question:
      "What is the approximate ceiling height in the sales floor, stockroom, checkout, receiving, and entrance areas?",
    promptGuidance:
      "Ask whether heights vary near vestibules, open ceilings, signs, exterior canopies, or loading areas.",
    reason:
      "Ceiling height affects lift requirements, camera design, access-point placement, speaker layout, signage, and labor.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.liftRequirement",
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
    id: "retail.ceilingAccess",
    projectField: "cabling.wiringStyle",
    question:
      "Can cabling be routed above ceilings, or will finished areas require raceway, conduit, fixture pathways, or wall openings?",
    promptGuidance:
      "Ask separately about sales floors, checkout, fitting rooms, stockrooms, pharmacy, exterior walls, and mall common-area boundaries.",
    reason:
      "Ceiling access and finish expectations affect pathway design, labor, fixture coordination, patching, and appearance.",
    category: "cabling",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Accessible above ceilings",
      "Limited ceiling access",
      "No ceiling access",
      "Open ceiling pathways",
      "Fixture pathways are available",
      "Surface raceway is acceptable",
      "Mixed conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "retail.ceilingType",
    ],
    unlocks: [
      "retail.pathwayAvailability",
      "retail.patchRepair",
    ],
    ruleTags: [
      "ceiling-access-review",
      "fixture-pathway-review",
      "wiring-finish",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.pathwayAvailability",
    projectField: "cabling.pathwayType",
    question:
      "What cable pathways are available throughout the store?",
    promptGuidance:
      "Ask about cable tray, J-hooks, conduit, floor boxes, fixture pathways, wall sleeves, raceway, risers, and existing telecom routes.",
    reason:
      "Available pathways affect material quantities, fixture integration, floor work, fire stopping, installation time, and code compliance.",
    category: "cabling",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Accessible ceiling space",
      "Cable tray",
      "J-hooks",
      "Existing conduit",
      "Floor boxes",
      "Fixture pathways",
      "Surface raceway",
      "Existing sleeves",
      "Riser pathway",
      "No known pathway",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "retail.ceilingAccess",
    ],
    unlocks: [
      "retail.longestCableRun",
      "retail.fireStopping",
      "retail.floorCoreRequirements",
    ],
    ruleTags: [
      "pathway-review",
      "fixture-pathway-review",
      "floor-box-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.longestCableRun",
    projectField: "cabling.estimatedCableFeet",
    question:
      "What is the approximate longest cable route from the serving network location to the farthest device?",
    promptGuidance:
      "Accept an estimate and explain that actual pathway distance matters more than straight-line distance.",
    reason:
      "Cable distance affects material quantities, copper limits, fiber requirements, remote enclosures, and labor.",
    category: "cabling",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.pathwayAvailability",
    ],
    unlocks: [
      "retail.networkRoomCount",
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
    id: "retail.fireStopping",
    projectField: "cabling.fireStoppingRequired",
    question:
      "Will new cabling pass through fire-rated walls, floors, shafts, tenant separations, stockroom barriers, or other rated assemblies?",
    promptGuidance:
      "Ask whether existing sleeves, approved systems, landlord documentation, or inspection requirements are available.",
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
      "retail.pathwayAvailability",
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
    id: "retail.floorCoreRequirements",
    projectField: "cabling.trenchingRequired",
    question:
      "Are new floor boxes, poke-throughs, slab penetrations, checkout feeds, fixture feeds, or trenching required?",
    promptGuidance:
      "Ask whether structural scans, landlord approval, after-hours drilling, below-floor access, or occupied areas beneath the store are involved.",
    reason:
      "Floor pathways may require scanning, coring, specialty fittings, fire stopping, structural approval, and tenant coordination.",
    category: "cabling",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "New floor boxes",
      "New poke-throughs",
      "Core drilling",
      "Checkout feeds",
      "Fixture feeds",
      "Trenching",
      "Existing floor pathways only",
      "No floor work",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [
      "retail.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "floor-core-review",
      "checkout-pathway",
      "fixture-feed-review",
      "structural-scan-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.patchRepair",
    projectField: "assessment.assumptions",
    question:
      "If wall, ceiling, floor, or fixture openings are required, should SmartNET include repairs, or will another contractor handle them?",
    promptGuidance:
      "Mention finished sales floors, decorative walls, millwork, checkout counters, pharmacy fixtures, and customer-facing areas.",
    reason:
      "Finish-repair responsibilities must be included or excluded from the proposal.",
    category: "installation",
    priority: "normal",
    answerType: "single_choice",
    choices: [
      "Include patching",
      "Include patching and painting",
      "Include fixture or millwork repair",
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
      "retail.ceilingAccess",
    ],
    unlocks: [],
    ruleTags: [
      "finish-repair-scope",
      "fixture-repair-scope",
      "scope-clarification",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.networkRoomCount",
    projectField: "network.rackLocation",
    question:
      "How many server rooms, telecom rooms, racks, cabinets, or network enclosures serve the store?",
    promptGuidance:
      "Ask where the main network location is and whether checkout, stockroom, pharmacy, receiving, exterior, or remote areas require additional equipment.",
    reason:
      "Network locations determine cable distance, fiber backbone, rack quantities, switch capacity, power, cooling, security, and serviceability.",
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
      "retail.rackCapacity",
      "retail.existingFiber",
      "retail.networkSegmentation",
    ],
    ruleTags: [
      "network-room-review",
      "retail-headend-review",
      "fiber-backbone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.rackCapacity",
    projectField: "network.rackRequired",
    question:
      "Do the existing racks or cabinets have enough space, power, cooling, switch ports, PoE capacity, security, and cable management?",
    promptGuidance:
      "Ask about routers, firewalls, switches, patch panels, point-of-sale equipment, NVRs, audio equipment, controllers, UPS units, and spare capacity.",
    reason:
      "Insufficient capacity may require a new rack, cabinet, switches, UPS, electrical work, cooling, or cable-management upgrades.",
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
      "retail.networkRoomCount",
    ],
    unlocks: [
      "retail.upsRequirement",
    ],
    ruleTags: [
      "rack-capacity-review",
      "switch-capacity-review",
      "power-review",
      "equipment-security",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.existingFiber",
    projectField: "cabling.preferredCableType",
    question:
      "Is there existing fiber between floors, network rooms, detached areas, mall telecom spaces, or remote store equipment?",
    promptGuidance:
      "Ask whether fiber type, strand count, connectors, labeling, ownership, available strands, and test records are known.",
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
      "retail.networkRoomCount",
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
    id: "retail.networkSegmentation",
    projectField: "network.vlanRequired",
    question:
      "Should point-of-sale, payment, employee, guest, camera, access-control, inventory, digital-signage, audio, IoT, and vendor traffic be separated?",
    promptGuidance:
      "Explain that segmentation can improve payment security, reliability, troubleshooting, and vendor separation.",
    reason:
      "Retail networks often require controlled separation between payment, business, guest, security, inventory, signage, and vendor systems.",
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
      "retail.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "vlan-review",
      "retail-network-segmentation",
      "pci-coordination",
      "cybersecurity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.posVendor",
    projectField: "assessment.assumptions",
    question:
      "Which point-of-sale, payment, inventory, loyalty, and retail-management systems are used?",
    promptGuidance:
      "Ask whether systems are existing, new, vendor-managed, cloud-based, or being replaced.",
    reason:
      "Retail systems may have proprietary network, cabling, security, hardware, power, and support requirements.",
    category: "network",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.transactionCoverage",
      "retail.posCutover",
    ],
    ruleTags: [
      "pos-coordination",
      "payment-system-review",
      "vendor-integration",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.upsRequirement",
    projectField: "equipment.recommendedItems",
    question:
      "Which retail systems must remain online during short power interruptions?",
    promptGuidance:
      "Ask about point-of-sale, payment, internet, switches, phones, cameras, access control, inventory systems, pharmacy systems, signage, and curbside operations.",
    reason:
      "Required runtime affects UPS capacity, equipment grouping, rack layout, electrical requirements, and business continuity.",
    category: "installation",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.rackCapacity",
    ],
    unlocks: [],
    ruleTags: [
      "ups-review",
      "business-continuity",
      "retail-resilience",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.wifiCoverage",
    projectField: "wifi.coverageGoals",
    question:
      "Which retail areas require reliable Wi-Fi coverage?",
    promptGuidance:
      "Ask about sales floors, checkout, stockrooms, receiving, offices, pharmacy, curbside pickup, exterior areas, parking, and handheld-device routes.",
    reason:
      "Coverage zones determine access-point quantity, placement, switching, cabling, environmental ratings, and validation requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Sales floor",
      "Checkout",
      "Stockroom",
      "Receiving",
      "Manager office",
      "Pharmacy",
      "Fitting rooms",
      "Curbside pickup",
      "Exterior areas",
      "Parking",
      "Entire store",
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
      "retail.wifiDevices",
      "retail.guestWifi",
      "retail.roamingRequirements",
      "retail.wifiObstructions",
    ],
    ruleTags: [
      "retail-wifi-design",
      "coverage-zone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.wifiDevices",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "Approximately how many wireless devices will be active during the busiest period?",
    promptGuidance:
      "Mention handheld scanners, tablets, mobile point-of-sale, staff phones, printers, sensors, guest devices, cameras, signs, and inventory systems.",
    reason:
      "Device count and traffic type affect access-point density, switch capacity, roaming, channel planning, licensing, and internet bandwidth.",
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
      "retail.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "retail-device-load",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.guestWifi",
    projectField: "wifi.guestNetworkRequired",
    question:
      "Will customers, vendors, or temporary workers receive guest Wi-Fi access?",
    promptGuidance:
      "Ask about network isolation, captive portal, branding, legal acceptance, time limits, analytics, bandwidth controls, and support responsibility.",
    reason:
      "Guest Wi-Fi affects segmentation, security, authentication, firewall policies, bandwidth, analytics, and support.",
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
      "retail.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "captive-portal-review",
      "customer-analytics",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.roamingRequirements",
    projectField: "wifi.weakAreas",
    question:
      "Do handheld scanners, tablets, mobile point-of-sale devices, phones, or inventory systems require uninterrupted Wi-Fi while moving through the store?",
    promptGuidance:
      "Ask whether dropped connections affect checkout, inventory, fulfillment, receiving, curbside pickup, or staff communications.",
    reason:
      "Mobile retail workflows require roaming-aware design, stable authentication, proper cell overlap, and post-installation validation.",
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
      "retail.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "retail-roaming",
      "mobile-pos",
      "inventory-mobility",
      "wireless-validation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.wifiObstructions",
    projectField: "assessment.risks",
    question:
      "Are there fixtures, shelving, refrigeration, merchandise, concrete, metal, mirrors, elevators, or neighboring wireless systems that may affect coverage?",
    promptGuidance:
      "Ask about changing displays, seasonal merchandise, stockroom shelving, coolers, freezers, metal racks, and high-density customer areas.",
    reason:
      "Retail layouts and equipment can significantly affect wireless propagation and may require predictive or onsite surveys.",
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
      "retail.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "rf-obstruction-review",
      "retail-fixture-review",
      "wireless-survey",
      "interference-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.cameraCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Which areas and activities require camera coverage?",
    promptGuidance:
      "Ask about entrances, sales floors, checkout, customer service, high-value merchandise, fitting-room approaches, stockrooms, receiving, cash offices, parking, and curbside pickup.",
    reason:
      "Coverage goals determine camera count, privacy restrictions, placement, lens selection, analytics, storage, bandwidth, and policy review.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Main entrances",
      "Sales floor",
      "Checkout or registers",
      "Customer service",
      "High-value merchandise",
      "Fitting-room approaches",
      "Stockroom",
      "Receiving",
      "Cash office",
      "Pharmacy",
      "Curbside pickup",
      "Parking",
      "Exterior perimeter",
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
      "retail.cameraPrivacy",
      "retail.transactionCoverage",
      "retail.recordingRetention",
      "retail.cameraLighting",
    ],
    ruleTags: [
      "retail-camera-layout",
      "loss-prevention",
      "privacy-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.cameraPrivacy",
    projectField: "assessment.risks",
    question:
      "Which areas must not be recorded, and are privacy masking, signage, employee-policy, fitting-room, pharmacy, or legal restrictions required?",
    promptGuidance:
      "Ask specifically about fitting rooms, restrooms, employee areas, pharmacy counters, customer information, screens, and neighboring property.",
    reason:
      "Retail surveillance must account for customer privacy, employee policy, sensitive information, restricted areas, and legal review.",
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
      "retail.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "customer-privacy",
      "employee-privacy",
      "fitting-room-restriction",
      "camera-policy-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.transactionCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "What transaction, cash-handling, refund, pickup, or point-of-sale activity must cameras clearly capture?",
    promptGuidance:
      "Ask whether the goal is general overview, employee identification, customer identification, payment verification, receipt verification, or item-level detail.",
    reason:
      "Transaction objectives affect camera height, lens selection, pixel density, placement, resolution, and integration requirements.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Cash transaction verification",
      "Refund and return verification",
      "Customer-service disputes",
      "Self-checkout activity",
      "Employee register activity",
      "Item handoff",
      "Curbside pickup handoff",
      "Pharmacy transaction",
      "General checkout overview",
      "Other",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "retail.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "transaction-verification",
      "loss-prevention",
      "pixel-density-review",
      "camera-height-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.recordingRetention",
    projectField: "cameras.recordingDays",
    question:
      "How many days of recorded video should the store retain?",
    promptGuidance:
      "Ask whether entrances, registers, pharmacy, stockrooms, parking, high-value areas, or investigations require different retention.",
    reason:
      "Retention requirements drive recorder capacity, storage quantity, bandwidth, redundancy, and cost.",
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
      "retail.cameraCoverage",
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
    id: "retail.cameraLighting",
    projectField: "assessment.risks",
    question:
      "Are any camera areas affected by bright storefront glass, reflections, low light, headlights, display lighting, seasonal changes, or nighttime conditions?",
    promptGuidance:
      "Ask about glass entrances, parking, vestibules, display cases, jewelry lighting, self-checkout, loading areas, and exterior zones.",
    reason:
      "Lighting conditions affect camera sensor selection, WDR, infrared, placement, filters, and image quality.",
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
      "retail.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
      "display-lighting-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.accessControlledAreas",
    projectField: "accessControl.controlledDoorCount",
    question:
      "How many doors, gates, cabinets, cages, elevators, or restricted areas require access control?",
    promptGuidance:
      "Ask about employee entrances, stockrooms, cash offices, pharmacies, receiving, manager offices, server rooms, inventory cages, roof access, and loading areas.",
    reason:
      "Controlled-opening count drives readers, locks, controllers, power supplies, credentials, monitoring, licensing, and labor.",
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
      "retail.accessDoorTypes",
      "retail.accessCredentials",
      "retail.accessAuditRequirements",
    ],
    ruleTags: [
      "retail-access-control",
      "controlled-opening-count",
      "inventory-security",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.accessDoorTypes",
    projectField: "assessment.assumptions",
    question:
      "What types of doors, gates, cabinets, cages, or controlled barriers are included?",
    promptGuidance:
      "Ask about hollow-metal doors, storefront doors, glass doors, automatic doors, roll-up doors, pharmacy doors, inventory cages, and exterior gates.",
    reason:
      "Opening type affects lock hardware, life safety, power transfer, accessibility, monitoring, integrations, fabrication, and labor.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Hollow-metal door",
      "Aluminum storefront door",
      "Wood door",
      "Glass door",
      "Automatic door",
      "Roll-up door",
      "Pharmacy door",
      "Inventory cage",
      "Exterior gate",
      "Cabinet",
      "Other",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "retail.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "door-hardware-review",
      "inventory-cage-review",
      "automatic-door-review",
      "life-safety-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.accessCredentials",
    projectField: "accessControl.credentialTypes",
    question:
      "What credentials should employees, managers, pharmacy staff, vendors, contractors, and temporary workers use?",
    promptGuidance:
      "Allow multiple selections and ask about mobile credentials, role-based permissions, temporary access, shared stores, and identity integration.",
    reason:
      "Credential requirements affect readers, enrollment, permissions, licensing, audit trails, administration, and temporary access.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cards",
      "Key fobs",
      "Mobile credentials",
      "PIN codes",
      "Biometric credentials",
      "Temporary vendor credentials",
      "Role-based access",
      "Shared multi-store credentials",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "retail.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "credential-selection",
      "role-based-access",
      "vendor-access",
      "identity-integration-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.accessAuditRequirements",
    projectField: "assessment.assumptions",
    question:
      "Are detailed access logs, forced-door alerts, held-door alerts, pharmacy reports, remote management, or multi-store reporting required?",
    promptGuidance:
      "Ask which openings require alerts and who reviews events, reports, and store-to-store access.",
    reason:
      "Audit and reporting requirements affect licensing, event retention, integrations, alerting, administration, and recurring support.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Detailed access logs",
      "Forced-door alerts",
      "Held-door alerts",
      "Pharmacy audit trail",
      "Remote management",
      "Scheduled reports",
      "Multi-store reporting",
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
      "retail.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "multi-store-management",
      "remote-management",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.audioRequirements",
    projectField: "assessment.assumptions",
    question:
      "Does the store need background music, paging, promotional audio, emergency messaging, fitting-room audio, or separate zones?",
    promptGuidance:
      "Ask about sales floor, stockroom, receiving, exterior, pharmacy, customer-service, and employee-only zones.",
    reason:
      "Audio requirements affect speaker count, zoning, amplifier sizing, controls, paging integration, licensing, cabling, and commissioning.",
    category: "audio_visual",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Background music",
      "Employee paging",
      "Customer announcements",
      "Emergency messaging",
      "Promotional audio",
      "Fitting-room audio",
      "Exterior audio",
      "Multiple audio zones",
      "No audio system",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.audioZones",
      "retail.musicService",
    ],
    ruleTags: [
      "retail-audio",
      "paging",
      "audio-zone-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.audioZones",
    projectField: "assessment.assumptions",
    question:
      "Which areas require independent audio control?",
    promptGuidance:
      "Ask about sales floor, pharmacy, stockroom, receiving, exterior, fitting rooms, vestibule, and employee areas.",
    reason:
      "Independent zones affect speaker layout, amplifier channels, controls, scheduling, paging, and system programming.",
    category: "audio_visual",
    priority: "normal",
    answerType: "multiple_choice",
    choices: [
      "Sales floor",
      "Pharmacy",
      "Stockroom",
      "Receiving",
      "Exterior",
      "Fitting rooms",
      "Vestibule",
      "Employee areas",
      "Single zone only",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "retail.audioRequirements",
    ],
    unlocks: [],
    ruleTags: [
      "audio-zones",
      "amplifier-sizing",
      "control-design",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.musicService",
    projectField: "assessment.assumptions",
    question:
      "Which commercial music, paging, or content service will be used?",
    promptGuidance:
      "Ask whether the customer already has a licensed provider, corporate service, local source, or requires a new subscription.",
    reason:
      "Music services affect licensing, content source, network access, scheduling, controls, recurring fees, and support.",
    category: "audio_visual",
    priority: "normal",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.audioRequirements",
    ],
    unlocks: [],
    ruleTags: [
      "music-licensing-review",
      "commercial-audio",
      "service-subscription-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.digitalSignage",
    projectField: "assessment.assumptions",
    question:
      "Does the store need digital signage, menu boards, promotional displays, video walls, queue displays, or customer-facing screens?",
    promptGuidance:
      "Ask about display locations, orientation, brightness, viewing distance, content source, scheduling, management, power, and network.",
    reason:
      "Digital signage affects display count, mounts, players, cabling, power, network, content management, licensing, and support.",
    category: "audio_visual",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Promotional displays",
      "Window-facing displays",
      "Video wall",
      "Queue display",
      "Self-checkout display",
      "Pharmacy display",
      "Menu board",
      "Wayfinding",
      "Employee communications",
      "No digital signage",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "retail.signageContentManagement",
    ],
    ruleTags: [
      "digital-signage",
      "retail-displays",
      "content-management",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.signageContentManagement",
    projectField: "assessment.assumptions",
    question:
      "How will signage content be created, approved, scheduled, updated, and managed?",
    promptGuidance:
      "Ask whether content is local, corporate, cloud-managed, vendor-managed, multi-store, or tied to promotions and inventory.",
    reason:
      "Content workflow affects media players, licensing, cloud services, user permissions, network requirements, and support.",
    category: "audio_visual",
    priority: "normal",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.digitalSignage",
    ],
    unlocks: [],
    ruleTags: [
      "content-management",
      "multi-store-signage",
      "user-permissions",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.environmentalConditions",
    projectField: "property.specialEnvironment",
    question:
      "Are any devices exposed to refrigeration, freezer temperatures, condensation, grease, moisture, washdown, dust, chemicals, or exterior weather?",
    promptGuidance:
      "Ask about grocery, pharmacy refrigeration, food retail, garden centers, loading areas, stockrooms, outdoor merchandise, and curbside zones.",
    reason:
      "Environmental exposure may require specialty cable, enclosures, seals, temperature ratings, corrosion resistance, and weather-rated equipment.",
    category: "safety",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Refrigerated area",
      "Freezer area",
      "Condensation",
      "Grease exposure",
      "Moisture or humidity",
      "Washdown area",
      "Dust",
      "Cleaning chemicals",
      "Exterior weather exposure",
      "No special exposure",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "retail.specialRequirements",
    ],
    unlocks: [],
    ruleTags: [
      "environmental-rating-review",
      "temperature-rating",
      "weather-rated-equipment",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.afterHoursWork",
    projectField: "installation.afterHoursRequired",
    question:
      "Must installation occur after closing, overnight, before opening, during shutdowns, or around inventory and promotional events?",
    promptGuidance:
      "Ask about store hours, mall access, security, deliveries, stocking, inventory counts, holidays, and restricted work windows.",
    reason:
      "Restricted work windows may increase labor rates, mobilizations, supervision, access coordination, and project duration.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.constructionStatus",
    ],
    unlocks: [],
    ruleTags: [
      "after-hours",
      "retail-shutdown",
      "labor-premium-review",
      "schedule-restriction",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.liftRequirement",
    projectField: "installation.liftRequired",
    question:
      "Will ladders, scaffolding, or lifts be required for ceilings, signs, exterior walls, canopies, parking areas, stockrooms, or elevated equipment?",
    promptGuidance:
      "Consider merchandise, fixtures, customer traffic, aisle widths, polished floors, mall restrictions, and loading access.",
    reason:
      "Elevated access affects rental cost, crew size, floor protection, work-zone control, scheduling, and productivity.",
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
      "retail.ceilingHeight",
    ],
    unlocks: [],
    ruleTags: [
      "lift-review",
      "equipment-rental",
      "floor-protection-review",
      "customer-safety",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.posCutover",
    projectField: "assessment.risks",
    question:
      "Will point-of-sale, payment, network, inventory, camera, or access systems require a scheduled cutover or migration?",
    promptGuidance:
      "Ask about blackout periods, store reopening, transaction testing, vendor support, rollback plans, and system ownership.",
    reason:
      "Cutovers affect staffing, after-hours work, vendor coordination, testing, rollback planning, and business-continuity risk.",
    category: "installation",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "retail.posVendor",
    ],
    unlocks: [],
    ruleTags: [
      "pos-cutover",
      "system-migration",
      "business-continuity",
      "vendor-coordination",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.permits",
    projectField: "installation.permitsRequired",
    question:
      "Are permits, inspections, landlord approvals, mall approvals, structural scans, fire-alarm coordination, signage approvals, or property-management requirements involved?",
    promptGuidance:
      "Ask who is responsible for each approval and whether the property has specific contractor, loading, insurance, or work-hour rules.",
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
      "mall-coordination",
      "inspection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "retail.projectSchedule",
    projectField: "installation.estimatedDurationDays",
    question:
      "What is the required completion date, grand-opening date, remodel turnover, inventory date, inspection date, or system-cutover schedule?",
    promptGuidance:
      "Ask about fixture installation, merchandise stocking, employee training, vendor commissioning, carrier activation, and store reopening.",
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
      "grand-opening",
      "store-cutover",
      "crew-scaling",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },
];
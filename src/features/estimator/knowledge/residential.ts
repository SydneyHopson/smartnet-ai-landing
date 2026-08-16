import {
  estimatorPlaybookSchema,
  type EstimatorPlaybook,
} from "./playbook";

const now = new Date().toISOString();

export const residentialPlaybook: EstimatorPlaybook =
  estimatorPlaybookSchema.parse({
    id: "residential-v1",

    name: "Residential Low-Voltage Estimator",

    description:
      "SmartNET estimating guidance for single-family homes, townhomes, condos, and similar residential environments.",

    version: "1.0.0",

    projectTypes: ["residential"],

    environmentTags: [
      "single-family-home",
      "townhome",
      "condo",
      "residential",
    ],

    defaultRuleTags: [
      "residential",
      "finished-space-review",
      "attic-review",
      "exterior-mount-review",
    ],

    aiGuidance:
      "Speak like an experienced residential low-voltage estimator. Ask one clear question at a time. Avoid technical jargon unless the customer uses it first. Explain why difficult site conditions may affect the estimate. Do not promise a final price before the installation conditions are verified.",

    questions: [
      {
        id: "residential.propertySubtype",
        projectField: "property.customProjectType",
        question:
          "Is this a single-family home, townhome, condo, apartment, or another type of residence?",
        promptGuidance:
          "Keep the question conversational and offer the common options.",
        reason:
          "The type of residence affects pathway access, ownership restrictions, shared walls, exterior mounting, and HOA requirements.",
        category: "property",
        priority: "critical",
        answerType: "single_choice",
        choices: [
          "Single-family home",
          "Townhome",
          "Condo",
          "Apartment",
          "Other residence",
        ],
        conditions: [],
        dependsOn: [],
        unlocks: [
          "residential.hoaRestrictions",
          "residential.atticAccess",
          "residential.crawlspaceAccess",
        ],
        ruleTags: [
          "residential-property-type",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.existingOrNew",
        projectField: "property.constructionType",
        question:
          "Is this an existing finished home, a renovation, or new construction?",
        promptGuidance:
          "Explain briefly that construction phase changes how easily wiring can be installed.",
        reason:
          "New construction, renovation, and finished homes require different cable pathways, labor, and wall-access assumptions.",
        category: "property",
        priority: "critical",
        answerType: "single_choice",
        choices: [
          "Existing finished home",
          "Renovation",
          "New construction",
          "Not sure",
        ],
        conditions: [],
        dependsOn: [],
        unlocks: [
          "residential.wallAccess",
          "residential.patchRepair",
        ],
        ruleTags: [
          "construction-phase",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.finishedAreas",
        projectField: "property.specialEnvironment",
        question:
          "Which parts of the home are finished, unfinished, or still under construction?",
        promptGuidance:
          "Ask about basements, garages, attics, additions, and unfinished rooms.",
        reason:
          "Finished spaces usually require more careful cable routing and may increase labor or wall-repair requirements.",
        category: "property",
        priority: "high",
        answerType: "text",
        choices: [],
        conditions: [],
        dependsOn: [
          "residential.existingOrNew",
        ],
        unlocks: [
          "residential.patchRepair",
        ],
        ruleTags: [
          "finished-space-review",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.atticAccess",
        projectField: "cabling.pathwayType",
        question:
          "Is there usable attic access above the areas where cameras, Wi-Fi, or other devices will be installed?",
        promptGuidance:
          "Ask whether the attic is accessible, partially accessible, or blocked by insulation or finished areas.",
        reason:
          "Attic access can significantly reduce cable-routing labor and wall damage.",
        category: "cabling",
        priority: "high",
        answerType: "single_choice",
        choices: [
          "Full attic access",
          "Partial attic access",
          "No attic access",
          "Not sure",
        ],
        conditions: [],
        dependsOn: [
          "residential.propertySubtype",
        ],
        unlocks: [
          "residential.wallAccess",
        ],
        ruleTags: [
          "attic-review",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.crawlspaceAccess",
        projectField: "cabling.pathwayType",
        question:
          "Does the home have a basement, crawlspace, or another lower-level pathway that can be used for cabling?",
        promptGuidance:
          "Ask naturally and allow the customer to describe multiple pathway options.",
        reason:
          "Lower-level access may reduce concealed-cabling labor and help reach first-floor device locations.",
        category: "cabling",
        priority: "normal",
        answerType: "multiple_choice",
        choices: [
          "Finished basement",
          "Unfinished basement",
          "Crawlspace",
          "Slab foundation",
          "Not sure",
        ],
        conditions: [],
        dependsOn: [
          "residential.propertySubtype",
        ],
        unlocks: [],
        ruleTags: [
          "lower-pathway-review",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.wallAccess",
        projectField: "cabling.wiringStyle",
        question:
          "Do you want wiring fully hidden where possible, or are clean exposed runs acceptable in garages, basements, or utility areas?",
        promptGuidance:
          "Do not make exposed wiring sound inferior. Present concealed and clean exposed work as practical choices.",
        reason:
          "The desired finish level changes pathway materials, labor, repair risk, and installation time.",
        category: "cabling",
        priority: "high",
        answerType: "single_choice",
        choices: [
          "Fully concealed where possible",
          "Exposed runs are acceptable",
          "A mixture is fine",
          "Not sure",
        ],
        conditions: [],
        dependsOn: [
          "residential.existingOrNew",
        ],
        unlocks: [
          "residential.patchRepair",
        ],
        ruleTags: [
          "wiring-finish",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.patchRepair",
        projectField: "assessment.assumptions",
        question:
          "If wall openings are required, should SmartNET include patching and painting, or will another contractor handle repairs?",
        promptGuidance:
          "Explain that most low-voltage work avoids major wall damage, but some finished spaces may require access openings.",
        reason:
          "Wall repair responsibilities must be included or excluded from the proposal.",
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
          "residential.wallAccess",
        ],
        unlocks: [],
        ruleTags: [
          "wall-repair-scope",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.hoaRestrictions",
        projectField: "assessment.risks",
        question:
          "Are there any HOA, landlord, condo-association, or exterior-mounting restrictions we should know about?",
        promptGuidance:
          "Only emphasize this for condos, townhomes, apartments, or communities with exterior restrictions.",
        reason:
          "Exterior cameras, conduit, antennas, and drilling may require approval.",
        category: "commercial",
        priority: "normal",
        answerType: "text",
        choices: [],
        conditions: [
          {
            field: "property.customProjectType",
            operator: "includes",
            value: [
              "townhome",
              "condo",
              "apartment",
            ],
          },
        ],
        dependsOn: [
          "residential.propertySubtype",
        ],
        unlocks: [],
        ruleTags: [
          "hoa-review",
          "exterior-approval",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.cameraLocations",
        projectField: "cameras.coverageGoals",
        question:
          "Which areas do you want covered by cameras, such as the front door, driveway, backyard, garage, side entrances, or inside common areas?",
        promptGuidance:
          "Let the customer describe the property naturally, then summarize the locations back to them.",
        reason:
          "Camera placement goals determine device count, lens selection, cable routes, and recording coverage.",
        category: "cameras",
        priority: "critical",
        answerType: "multiple_choice",
        choices: [
          "Front door",
          "Driveway",
          "Garage",
          "Backyard",
          "Side entrances",
          "Interior common areas",
          "Detached building",
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
          "residential.exteriorMounting",
          "residential.detachedStructures",
          "residential.cameraPrivacy",
        ],
        ruleTags: [
          "camera-layout",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.exteriorMounting",
        projectField: "cameras.mountingSurfaces",
        question:
          "What surfaces would the exterior cameras mount to, such as soffit, brick, siding, stucco, wood, or a pole?",
        promptGuidance:
          "Ask only when exterior camera locations are part of the project.",
        reason:
          "Mounting surfaces affect anchors, boxes, weatherproofing, tools, and labor.",
        category: "cameras",
        priority: "high",
        answerType: "multiple_choice",
        choices: [
          "Soffit",
          "Brick",
          "Siding",
          "Stucco",
          "Wood",
          "Pole",
          "Not sure",
        ],
        conditions: [
          {
            field: "cameras.requested",
            operator: "is_true",
          },
        ],
        dependsOn: [
          "residential.cameraLocations",
        ],
        unlocks: [],
        ruleTags: [
          "exterior-mount-review",
          "weatherproofing",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.cameraPrivacy",
        projectField: "assessment.risks",
        question:
          "Are there any areas that should not be recorded, such as neighboring yards, bedrooms, private patios, or indoor privacy zones?",
        promptGuidance:
          "Ask respectfully and explain that privacy zones can be configured when supported.",
        reason:
          "Privacy expectations affect placement, camera angles, masking, and proposal assumptions.",
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
          "residential.cameraLocations",
        ],
        unlocks: [],
        ruleTags: [
          "privacy-review",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.detachedStructures",
        projectField: "cabling.trenchingRequired",
        question:
          "Do any cameras, access points, gates, garages, sheds, or other devices need to connect across the yard or to a detached structure?",
        promptGuidance:
          "Explain that detached buildings may require trenching, wireless bridging, or fiber depending on distance.",
        reason:
          "Detached structures can require underground pathways, fiber, surge protection, or wireless bridges.",
        category: "cabling",
        priority: "high",
        answerType: "boolean",
        choices: [],
        conditions: [],
        dependsOn: [
          "residential.cameraLocations",
        ],
        unlocks: [],
        ruleTags: [
          "detached-structure",
          "trenching-review",
          "fiber-review",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.internetLocation",
        projectField: "network.rackLocation",
        question:
          "Where are the modem, router, and current network equipment located in the home?",
        promptGuidance:
          "Offer examples such as a living room, office, basement, garage, utility room, or structured wiring panel.",
        reason:
          "The network starting point affects cable distance, equipment organization, power, and rack placement.",
        category: "network",
        priority: "high",
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
          "residential.networkCleanup",
        ],
        ruleTags: [
          "network-headend",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.networkCleanup",
        projectField: "network.rackRequired",
        question:
          "Would you like the modem, router, switches, recorder, and cabling organized into a structured panel or small network rack?",
        promptGuidance:
          "Present organization, serviceability, cooling, and battery backup as benefits without overselling.",
        reason:
          "A structured enclosure or rack may be needed for switches, recorders, patch panels, power, and cable management.",
        category: "network",
        priority: "normal",
        answerType: "boolean",
        choices: [],
        conditions: [
          {
            field: "network.requested",
            operator: "is_true",
          },
        ],
        dependsOn: [
          "residential.internetLocation",
        ],
        unlocks: [
          "residential.upsRequirement",
        ],
        ruleTags: [
          "rack-review",
          "network-cleanup",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.wifiProblems",
        projectField: "wifi.weakAreas",
        question:
          "Where does the Wi-Fi currently feel weak, slow, or unreliable?",
        promptGuidance:
          "Ask for rooms, floors, outdoor spaces, garages, and work-from-home areas.",
        reason:
          "Weak-area information helps estimate access-point count and placement.",
        category: "wifi",
        priority: "critical",
        answerType: "text",
        choices: [],
        conditions: [
          {
            field: "wifi.requested",
            operator: "is_true",
          },
        ],
        dependsOn: [],
        unlocks: [
          "residential.outdoorWifi",
          "residential.wifiUsage",
        ],
        ruleTags: [
          "wifi-design",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.outdoorWifi",
        projectField: "wifi.outdoorCoverage",
        question:
          "Do you also want reliable Wi-Fi in outdoor areas such as the patio, pool, driveway, yard, or detached garage?",
        promptGuidance:
          "Ask only when Wi-Fi is part of the project.",
        reason:
          "Outdoor coverage may require weather-rated access points and additional cable pathways.",
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
          "residential.wifiProblems",
        ],
        unlocks: [],
        ruleTags: [
          "outdoor-wifi",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.wifiUsage",
        projectField: "wifi.estimatedConcurrentUsers",
        question:
          "About how many people and connected devices use the network at the busiest time?",
        promptGuidance:
          "Mention phones, televisions, gaming systems, computers, cameras, smart-home devices, and work equipment.",
        reason:
          "Device load and usage affect access-point density, router capability, switch capacity, and internet recommendations.",
        category: "wifi",
        priority: "high",
        answerType: "number",
        choices: [],
        conditions: [
          {
            field: "wifi.requested",
            operator: "is_true",
          },
        ],
        dependsOn: [
          "residential.wifiProblems",
        ],
        unlocks: [],
        ruleTags: [
          "wifi-capacity",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.accessDoors",
        projectField: "accessControl.controlledDoorCount",
        question:
          "Which residential doors, gates, or entry points should receive keypad, card, fob, mobile, or smart-lock access?",
        promptGuidance:
          "Clarify whether the customer means consumer smart locks or a professionally managed access-control system.",
        reason:
          "Door count and lock type drive hardware, power, cabling, controller, and labor requirements.",
        category: "access_control",
        priority: "critical",
        answerType: "text",
        choices: [],
        conditions: [
          {
            field: "accessControl.requested",
            operator: "is_true",
          },
        ],
        dependsOn: [],
        unlocks: [
          "residential.accessCredential",
        ],
        ruleTags: [
          "residential-access-control",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.accessCredential",
        projectField: "accessControl.credentialTypes",
        question:
          "How would you like people to unlock those doors or gates: PIN code, phone, key card, fob, biometric, or another method?",
        promptGuidance:
          "Keep the question simple and allow multiple selections.",
        reason:
          "Credential choice affects reader, lock, controller, licensing, and programming requirements.",
        category: "access_control",
        priority: "high",
        answerType: "multiple_choice",
        choices: [
          "PIN code",
          "Mobile phone",
          "Key card",
          "Key fob",
          "Biometric",
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
          "residential.accessDoors",
        ],
        unlocks: [],
        ruleTags: [
          "credential-selection",
        ],
        requiredForPreliminaryEstimate: true,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.upsRequirement",
        projectField: "equipment.recommendedItems",
        question:
          "Should the network, cameras, and security equipment stay online during short power outages?",
        promptGuidance:
          "Explain that a battery backup can keep critical network and camera equipment running temporarily.",
        reason:
          "Backup-runtime goals determine UPS size, outlet requirements, and equipment grouping.",
        category: "installation",
        priority: "normal",
        answerType: "boolean",
        choices: [],
        conditions: [],
        dependsOn: [
          "residential.networkCleanup",
        ],
        unlocks: [],
        ruleTags: [
          "ups-review",
          "power-resilience",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },

      {
        id: "residential.installationTiming",
        projectField: "installation.afterHoursRequired",
        question:
          "Are there any scheduling restrictions, work-from-home hours, pets, children, gate access, or quiet-time requirements we should plan around?",
        promptGuidance:
          "Ask politely and frame it as helping the crew arrive prepared.",
        reason:
          "Residential access and scheduling conditions affect crew planning, duration, and safety.",
        category: "installation",
        priority: "normal",
        answerType: "text",
        choices: [],
        conditions: [],
        dependsOn: [],
        unlocks: [],
        ruleTags: [
          "residential-site-logistics",
        ],
        requiredForPreliminaryEstimate: false,
        requiredForFinalQuote: true,
      },
    ],

    assumptions: [
      {
        id: "residential.finishedHomeAssumption",
        text:
          "Pricing assumes reasonable access through attic, basement, crawlspace, garage, or existing pathways unless otherwise identified.",
        conditions: [
          {
            field: "property.constructionType",
            operator: "equals",
            value: "existing_finished",
          },
        ],
        ruleTags: [
          "pathway-assumption",
        ],
      },

      {
        id: "residential.standardCeilingAssumption",
        text:
          "Pricing assumes standard residential mounting heights unless taller ceilings or specialty access are identified.",
        conditions: [
          {
            field: "property.ceilingHeightFeet",
            operator: "is_unknown",
          },
        ],
        ruleTags: [
          "height-assumption",
        ],
      },

      {
        id: "residentialPowerAssumption",
        text:
          "Pricing assumes suitable electrical power is available near the proposed network and recording equipment location.",
        conditions: [],
        ruleTags: [
          "power-assumption",
        ],
      },
    ],

    risks: [
      {
        id: "residential.noAtticAccessRisk",
        title: "Limited concealed-cabling access",
        description:
          "Finished walls or inaccessible ceilings may require surface raceway, additional wall openings, or revised device locations.",
        severity: "high",
        conditions: [
          {
            field: "cabling.pathwayType",
            operator: "includes",
            value: [
              "No attic access",
            ],
          },
        ],
        ruleTags: [
          "limited-access",
          "labor-review",
        ],
      },

      {
        id: "residential.detachedStructureRisk",
        title: "Detached-building connectivity",
        description:
          "Detached structures may require trenching, fiber, wireless bridging, surge protection, or separate power considerations.",
        severity: "high",
        conditions: [
          {
            field: "cabling.trenchingRequired",
            operator: "is_true",
          },
        ],
        ruleTags: [
          "trenching-review",
          "fiber-review",
        ],
      },

      {
        id: "residential.hoaRisk",
        title: "Exterior approval may be required",
        description:
          "Exterior-mounted cameras, conduit, antennas, and penetrations may require HOA, landlord, or association approval.",
        severity: "medium",
        conditions: [
          {
            field: "assessment.risks",
            operator: "includes",
            value: [
              "HOA",
              "landlord",
              "association",
            ],
          },
        ],
        ruleTags: [
          "approval-review",
        ],
      },
    ],

    recommendations: [
      {
        id: "residential.smallRackRecommendation",
        title: "Centralized network enclosure",
        description:
          "Organize the router, PoE switch, recorder, patch panel, and battery backup in a small structured enclosure or network rack.",
        category: "rack",
        conditions: [
          {
            field: "network.rackRequired",
            operator: "is_true",
          },
        ],
        ruleTags: [
          "rack",
          "serviceability",
        ],
      },

      {
        id: "residential.upsRecommendation",
        title: "Battery backup",
        description:
          "Provide a UPS to keep critical network and camera equipment online during short power interruptions.",
        category: "power",
        conditions: [],
        ruleTags: [
          "ups",
          "resilience",
        ],
      },

      {
        id: "residential.managedWifiRecommendation",
        title: "Managed Wi-Fi system",
        description:
          "Use centrally managed access points instead of relying only on a consumer router or basic mesh system.",
        category: "wifi",
        conditions: [
          {
            field: "wifi.requested",
            operator: "is_true",
          },
        ],
        ruleTags: [
          "managed-wifi",
        ],
      },

      {
        id: "residential.cameraStorageRecommendation",
        title: "Dedicated local recording",
        description:
          "Use dedicated local recording with remote viewing and appropriately sized storage based on camera count and retention goals.",
        category: "camera",
        conditions: [
          {
            field: "cameras.requested",
            operator: "is_true",
          },
        ],
        ruleTags: [
          "video-storage",
          "nvr",
        ],
      },
    ],

    metadata: {
      createdAt: now,
      updatedAt: now,
      author: "SmartNET",
      active: true,
    },
  });
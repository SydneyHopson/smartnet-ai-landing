import type {
  PlaybookCommonMistake,
  PlaybookStandardsReference,
  PlaybookUpsellOpportunity,
} from "../playbook";

export const warehouseCommonMistakes: PlaybookCommonMistake[] = [
  {
    id: "warehouse.mistake.ceilingHeight",
    title: "Ceiling height not verified",
    description:
      "Estimating without verified mounting heights often results in incorrect lift selection, underestimated labor, and poor camera design.",
    prevention:
      "Measure representative mounting heights during the walkthrough.",
    conditions: [],
    ruleTags: [
      "height-verification",
      "lift-review",
    ],
  },

  {
    id: "warehouse.mistake.cableDistance",
    title: "Cable routes estimated instead of measured",
    description:
      "Straight-line measurements frequently underestimate installed cable lengths and can exceed copper Ethernet limitations.",
    prevention:
      "Measure actual pathway distances, including vertical transitions and service loops.",
    conditions: [],
    ruleTags: [
      "distance-verification",
      "fiber-review",
    ],
  },

  {
    id: "warehouse.mistake.rf",
    title: "Ignoring RF obstructions",
    description:
      "Metal racks, inventory, machinery, and freezers can dramatically reduce wireless performance.",
    prevention:
      "Perform predictive design and validate coverage after installation.",
    conditions: [],
    ruleTags: [
      "wireless-survey",
      "rf-design",
    ],
  },

  {
    id: "warehouse.mistake.cameraHeight",
    title: "Mounting cameras too high",
    description:
      "Very high mounting locations often provide broad coverage but insufficient identification detail.",
    prevention:
      "Design around the required identification objective instead of simply maximizing coverage.",
    conditions: [],
    ruleTags: [
      "camera-design",
      "lens-selection",
    ],
  },

  {
    id: "warehouse.mistake.existingFiber",
    title: "Assuming existing fiber is reusable",
    description:
      "Existing fiber may not have available strands, proper connectors, or acceptable test results.",
    prevention:
      "Inspect and test existing fiber before including it in the final design.",
    conditions: [],
    ruleTags: [
      "fiber-testing",
      "verification",
    ],
  },

  {
    id: "warehouse.mistake.operations",
    title: "Underestimating operational impact",
    description:
      "Active warehouse operations can significantly slow installation and require phased work.",
    prevention:
      "Coordinate installation schedules with warehouse operations before estimating labor.",
    conditions: [],
    ruleTags: [
      "occupied-facility",
      "productivity-review",
    ],
  },

  {
    id: "warehouse.mistake.power",
    title: "Power availability not confirmed",
    description:
      "Missing electrical capacity near network equipment often creates unexpected coordination work.",
    prevention:
      "Verify available power during every walkthrough.",
    conditions: [],
    ruleTags: [
      "power-review",
      "electrical-coordination",
    ],
  },

  {
    id: "warehouse.mistake.documentation",
    title: "Working without current drawings",
    description:
      "Old floor plans or missing rack documentation frequently lead to redesigns and change orders.",
    prevention:
      "Request current as-built documentation before final pricing.",
    conditions: [],
    ruleTags: [
      "documentation",
      "design-review",
    ],
  },
];

export const warehouseUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "warehouse.upsell.managedServices",
    title: "Managed Support",
    description:
      "Provide proactive monitoring, firmware management, and remote support.",
    valueStatement:
      "Reduces downtime and provides recurring operational support.",
    conditions: [],
    ruleTags: [
      "managed-services",
      "recurring-revenue",
    ],
  },

  {
    id: "warehouse.upsell.preventiveMaintenance",
    title: "Preventive Maintenance",
    description:
      "Scheduled inspections, camera cleaning, UPS testing, and network health reviews.",
    valueStatement:
      "Extends equipment life while reducing unexpected outages.",
    conditions: [],
    ruleTags: [
      "maintenance",
    ],
  },

  {
    id: "warehouse.upsell.videoAnalytics",
    title: "AI Video Analytics",
    description:
      "Object detection, people counting, intrusion detection, and license-plate recognition.",
    valueStatement:
      "Transforms surveillance into operational intelligence.",
    conditions: [],
    ruleTags: [
      "analytics",
      "ai-video",
    ],
  },

  {
    id: "warehouse.upsell.visitorManagement",
    title: "Visitor Management",
    description:
      "Temporary credentials, visitor check-in, and contractor tracking.",
    valueStatement:
      "Improves security and accountability.",
    conditions: [],
    ruleTags: [
      "visitor-management",
    ],
  },

  {
    id: "warehouse.upsell.futureExpansion",
    title: "Future Expansion Planning",
    description:
      "Reserve rack space, fiber strands, switch capacity, and cable pathways.",
    valueStatement:
      "Lowers future installation costs while supporting business growth.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "scalability",
    ],
  },
];

export const warehouseStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "warehouse.standard.tia568",
    title: "ANSI/TIA-568",
    reference: "Commercial Building Telecommunications Cabling Standard",
    relevance: "Structured cabling design and installation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
    ],
  },

  {
    id: "warehouse.standard.tia569",
    title: "ANSI/TIA-569",
    reference: "Telecommunications Pathways and Spaces",
    relevance: "Cable pathways, telecom rooms, and routing.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
    ],
  },

  {
    id: "warehouse.standard.tia606",
    title: "ANSI/TIA-606",
    reference: "Administration Standard",
    relevance: "Cable labeling and administration.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "labeling",
    ],
  },

  {
    id: "warehouse.standard.nec",
    title: "NFPA 70 (NEC)",
    reference: "National Electrical Code",
    relevance: "Low-voltage installation requirements.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
    ],
  },

  {
    id: "warehouse.standard.nfpa101",
    title: "NFPA 101",
    reference: "Life Safety Code",
    relevance: "Egress and life safety considerations for access control.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "life-safety",
    ],
  },

  {
    id: "warehouse.standard.bicsi",
    title: "BICSI Best Practices",
    reference: "BICSI Telecommunications Distribution Methods",
    relevance: "Commercial installation best practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "best-practices",
    ],
  },
];
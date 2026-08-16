import type { PlaybookStandardsReference } from "../playbook";

export const restaurantStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "restaurant.standard.tia568",
    title: "ANSI/TIA-568",
    reference:
      "Commercial Building Telecommunications Cabling Standard",
    relevance:
      "Structured cabling design, installation, testing, and certification.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "testing",
    ],
  },

  {
    id: "restaurant.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Pathways, telecom rooms, conduit, sleeves, trays, and equipment spaces.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
      "telecom-spaces",
    ],
  },

  {
    id: "restaurant.standard.tia606",
    title: "ANSI/TIA-606",
    reference:
      "Telecommunications Administration Standard",
    relevance:
      "Cable labeling, rack labeling, documentation, and administration.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
    ],
  },

  {
    id: "restaurant.standard.tia607",
    title: "ANSI/TIA-607",
    reference:
      "Telecommunications Bonding and Grounding",
    relevance:
      "Grounding and bonding of network infrastructure.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "grounding",
      "bonding",
    ],
  },

  {
    id: "restaurant.standard.nec",
    title: "NFPA 70",
    reference:
      "National Electrical Code",
    relevance:
      "Electrical installation requirements for low-voltage systems.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
      "installation",
    ],
  },

  {
    id: "restaurant.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Fire-alarm interfaces and emergency door release requirements.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "fire-alarm",
      "life-safety",
    ],
  },

  {
    id: "restaurant.standard.nfpa101",
    title: "NFPA 101",
    reference:
      "Life Safety Code",
    relevance:
      "Egress, occupancy, and controlled-door requirements.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "egress",
      "life-safety",
    ],
  },

  {
    id: "restaurant.standard.ada",
    title: "ADA Accessibility Standards",
    reference:
      "Americans with Disabilities Act",
    relevance:
      "Accessible door hardware, controls, counters, and customer-facing equipment.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "accessibility",
      "ada",
    ],
  },

  {
    id: "restaurant.standard.ieee8023",
    title: "IEEE 802.3",
    reference:
      "Ethernet and Power over Ethernet",
    relevance:
      "Ethernet networking and PoE device compatibility.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "ethernet",
      "poe",
    ],
  },

  {
    id: "restaurant.standard.ieee80211",
    title: "IEEE 802.11",
    reference:
      "Wireless LAN Standards",
    relevance:
      "Enterprise Wi-Fi design and wireless performance.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi",
      "wireless",
    ],
  },

  {
    id: "restaurant.standard.pci",
    title: "PCI DSS",
    reference:
      "Payment Card Industry Data Security Standard",
    relevance:
      "Network security requirements for POS and payment systems.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pci",
      "payment-security",
      "cybersecurity",
    ],
  },

  {
    id: "restaurant.standard.bicsi",
    title: "BICSI Best Practices",
    reference:
      "BICSI Telecommunications Distribution Methods Manual",
    relevance:
      "Commercial best practices for structured cabling installation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
    ],
  },

  {
    id: "restaurant.standard.ul294",
    title: "UL 294",
    reference:
      "Access Control System Units",
    relevance:
      "Commercial access-control equipment requirements.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-control",
      "ul294",
    ],
  },

  {
    id: "restaurant.standard.ul2043",
    title: "UL 2043",
    reference:
      "Products Installed in Air-Handling Spaces",
    relevance:
      "Requirements for plenum-rated devices installed above ceilings.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "plenum",
      "ceiling-installation",
    ],
  },

  {
    id: "restaurant.standard.nema",
    title: "NEMA Enclosure Ratings",
    reference:
      "Environmental enclosure classifications",
    relevance:
      "Selection of enclosures for kitchens, exterior equipment, and washdown environments.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "nema",
      "environmental-rating",
    ],
  },

  {
    id: "restaurant.standard.ip",
    title: "IEC 60529",
    reference:
      "Ingress Protection Ratings",
    relevance:
      "Dust and water protection for restaurant equipment.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "ip-rating",
      "weatherproof",
    ],
  },

  {
    id: "restaurant.standard.health",
    title: "Local Health Department Requirements",
    reference:
      "Applicable food-service regulations",
    relevance:
      "May affect equipment placement, sanitation, penetrations, and installation practices.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "health-department",
      "food-service",
    ],
  },

  {
    id: "restaurant.standard.building",
    title: "Local Building Codes",
    reference:
      "Applicable local building and fire codes",
    relevance:
      "Permit, inspection, structural, and occupancy requirements.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "building-code",
      "permit",
    ],
  },

  {
    id: "restaurant.standard.manufacturer",
    title: "Manufacturer Requirements",
    reference:
      "Manufacturer installation instructions",
    relevance:
      "Required to maintain warranty and ensure proper operation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "manufacturer",
      "warranty",
    ],
  },
];
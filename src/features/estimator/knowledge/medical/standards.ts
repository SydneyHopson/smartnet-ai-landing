import type { PlaybookStandardsReference } from "../playbook";

export const medicalStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "medical.standard.tia568",
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
    id: "medical.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Telecommunications rooms, pathways, conduit, sleeves, cable tray, and equipment spaces.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
      "telecom-spaces",
    ],
  },

  {
    id: "medical.standard.tia606",
    title: "ANSI/TIA-606",
    reference:
      "Administration Standard for Telecommunications Infrastructure",
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
    id: "medical.standard.tia607",
    title: "ANSI/TIA-607",
    reference:
      "Telecommunications Bonding and Grounding",
    relevance:
      "Grounding and bonding for telecommunications systems.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "grounding",
      "bonding",
    ],
  },

  {
    id: "medical.standard.nec",
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
    id: "medical.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Fire-alarm interfaces and emergency system coordination.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "fire-alarm",
      "life-safety",
    ],
  },

  {
    id: "medical.standard.nfpa99",
    title: "NFPA 99",
    reference:
      "Health Care Facilities Code",
    relevance:
      "Requirements affecting healthcare technology infrastructure, electrical systems, and patient-care environments.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "healthcare",
      "patient-care",
    ],
  },

  {
    id: "medical.standard.fgi",
    title: "FGI Guidelines",
    reference:
      "Facility Guidelines Institute Design and Construction Standards",
    relevance:
      "Healthcare facility design requirements affecting technology installation.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "healthcare-design",
      "clinical-facilities",
    ],
  },

  {
    id: "medical.standard.hipaa",
    title: "HIPAA",
    reference:
      "Health Insurance Portability and Accountability Act",
    relevance:
      "Protection of patient information and healthcare technology security.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "hipaa",
      "patient-privacy",
      "cybersecurity",
    ],
  },

  {
    id: "medical.standard.ieee8023",
    title: "IEEE 802.3",
    reference:
      "Ethernet and Power over Ethernet",
    relevance:
      "Enterprise networking and PoE infrastructure.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "ethernet",
      "poe",
    ],
  },

  {
    id: "medical.standard.ieee80211",
    title: "IEEE 802.11",
    reference:
      "Wireless LAN Standards",
    relevance:
      "Enterprise wireless networking and roaming.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "wifi",
      "wireless",
    ],
  },

  {
    id: "medical.standard.bicsi",
    title: "BICSI Best Practices",
    reference:
      "Telecommunications Distribution Methods Manual",
    relevance:
      "Commercial structured cabling best practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
    ],
  },

  {
    id: "medical.standard.ul294",
    title: "UL 294",
    reference:
      "Access Control System Units",
    relevance:
      "Commercial access-control hardware requirements.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "access-control",
      "ul294",
    ],
  },

  {
    id: "medical.standard.ul2043",
    title: "UL 2043",
    reference:
      "Products Installed in Air-Handling Spaces",
    relevance:
      "Requirements for plenum-installed devices.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "plenum",
      "ceiling-installation",
    ],
  },

  {
    id: "medical.standard.localCodes",
    title: "Local Building and Fire Codes",
    reference:
      "Applicable local AHJ requirements",
    relevance:
      "Permits, inspections, occupancy, structural, and fire-code compliance.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "building-code",
      "permit",
      "inspection",
    ],
  },

  {
    id: "medical.standard.manufacturer",
    title: "Manufacturer Installation Requirements",
    reference:
      "Published manufacturer installation instructions",
    relevance:
      "Required to maintain warranty and proper system operation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "manufacturer",
      "warranty",
    ],
  },
];
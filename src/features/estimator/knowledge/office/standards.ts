import type { PlaybookStandardsReference } from "../playbook";

export const officeStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "office.standard.tia568",
    title: "ANSI/TIA-568",
    reference:
      "Commercial Building Telecommunications Cabling Standard",
    relevance:
      "Supports commercial structured cabling topology, performance, cable categories, termination, installation, and testing.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "commercial-standard",
      "testing",
    ],
  },

  {
    id: "office.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Supports telecom-room, pathway, conduit, sleeve, cable-tray, floor-box, furniture-feed, and equipment-space planning.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
      "telecom-spaces",
      "floor-pathways",
    ],
  },

  {
    id: "office.standard.tia606",
    title: "ANSI/TIA-606",
    reference:
      "Administration Standard for Telecommunications Infrastructure",
    relevance:
      "Supports consistent cable, rack, patch-panel, pathway, room, device, and infrastructure labeling and documentation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
      "administration",
    ],
  },

  {
    id: "office.standard.tia607",
    title: "ANSI/TIA-607",
    reference:
      "Telecommunications Bonding and Grounding",
    relevance:
      "Supports telecommunications bonding and grounding for racks, cabinets, equipment, pathways, and telecom spaces.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "grounding",
      "bonding",
      "telecom-infrastructure",
    ],
  },

  {
    id: "office.standard.tia942",
    title: "ANSI/TIA-942",
    reference:
      "Telecommunications Infrastructure Standard for Data Centers",
    relevance:
      "May provide useful guidance when the office includes a larger server room, computer room, resilient network environment, or data-center-like infrastructure.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Restricted server room",
        ],
      },
    ],
    ruleTags: [
      "server-room",
      "resilient-infrastructure",
      "telecom-space",
    ],
  },

  {
    id: "office.standard.nec",
    title: "NFPA 70",
    reference:
      "National Electrical Code",
    relevance:
      "Applies to low-voltage cabling, pathways, grounding, power separation, environmental conditions, fire stopping, and installation methods as adopted locally.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
      "installation-compliance",
      "low-voltage-cabling",
    ],
  },

  {
    id: "office.standard.nfpa101",
    title: "NFPA 101",
    reference:
      "Life Safety Code",
    relevance:
      "Relevant to occupancy, egress, controlled exits, electrified locking arrangements, delayed egress, and life-safety coordination.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "life-safety",
      "egress",
      "access-control",
    ],
  },

  {
    id: "office.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Relevant when access control, door release, emergency notification, paging, or other systems interface with the fire-alarm system.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "fire-alarm-interface",
      "emergency-release",
      "life-safety",
    ],
  },

  {
    id: "office.standard.ada",
    title: "ADA Standards",
    reference:
      "Americans with Disabilities Act Accessibility Standards",
    relevance:
      "Relevant to accessible door operation, reader and control mounting heights, clearances, conference-room controls, displays, kiosks, and user interfaces.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "accessibility",
      "mounting-height",
      "user-interface",
    ],
  },

  {
    id: "office.standard.bicsi",
    title: "BICSI Best Practices",
    reference:
      "BICSI Telecommunications Distribution Methods and Installation Practices",
    relevance:
      "Supports commercial telecom rooms, pathways, structured cabling, fiber, grounding, testing, administration, and installation-quality practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
      "telecommunications",
    ],
  },

  {
    id: "office.standard.avixa",
    title: "AVIXA Standards and Best Practices",
    reference:
      "Audiovisual system design, performance, verification, and documentation guidance",
    relevance:
      "Supports conference-room display sizing, image quality, audio coverage, system verification, user experience, and audiovisual commissioning.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "avixa",
      "audio-visual",
      "conference-room",
      "commissioning",
    ],
  },

  {
    id: "office.standard.ctaCedia",
    title: "AV Signal and Installation Manufacturer Standards",
    reference:
      "Applicable audiovisual manufacturer, connector, signal-transport, and installation requirements",
    relevance:
      "Supports reliable HDMI, USB, network, fiber, control, audio, display, camera, and conferencing-system installation.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "av-signal-transport",
      "manufacturer-requirements",
      "compatibility-review",
    ],
  },

  {
    id: "office.standard.ieee8023",
    title: "IEEE 802.3",
    reference:
      "Ethernet and Power over Ethernet Standards",
    relevance:
      "Relevant to Ethernet performance, copper and fiber networking, PoE classes, switch capacity, endpoint power, and distance limitations.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ethernet",
      "poe",
      "network-design",
    ],
  },

  {
    id: "office.standard.ieee80211",
    title: "IEEE 802.11",
    reference:
      "Wireless LAN Standards",
    relevance:
      "Relevant to office Wi-Fi design, client compatibility, spectrum use, roaming, security, throughput, and access-point performance.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi",
      "wireless-standard",
      "roaming",
    ],
  },

  {
    id: "office.standard.iec60364",
    title: "Applicable Electrical and Grounding Requirements",
    reference:
      "Locally adopted electrical, grounding, bonding, and equipment-power requirements",
    relevance:
      "Relevant to racks, UPS systems, displays, audiovisual equipment, access control, cameras, telecom rooms, and electrical coordination.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-coordination",
      "grounding",
      "equipment-power",
    ],
  },

  {
    id: "office.standard.localBuilding",
    title: "Applicable Building and Fire Codes",
    reference:
      "Locally adopted building, fire, electrical, accessibility, and structural codes",
    relevance:
      "May affect pathways, floor coring, rated penetrations, mounting, occupancy, access control, structural support, inspections, and approval requirements.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "building-code",
      "fire-code",
      "ahj-review",
      "structural-review",
    ],
  },

  {
    id: "office.standard.landlord",
    title: "Building and Landlord Standards",
    reference:
      "Property-management, landlord, tenant-construction, riser-management, and contractor rules",
    relevance:
      "May control telecom-room access, riser work, floor coring, loading, after-hours work, insurance, approved contractors, fire stopping, and closeout documentation.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "landlord-approval",
      "property-management",
      "tenant-construction",
      "building-standard-review",
    ],
  },

  {
    id: "office.standard.privacy",
    title: "Applicable Workplace Privacy Requirements",
    reference:
      "Federal, state, local, employment, labor, and company surveillance policies",
    relevance:
      "May affect camera placement, audio recording, employee monitoring, visitor records, access logs, retention, signage, and administrative permissions.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "employee-privacy",
      "camera-policy",
      "recording-review",
      "legal-review",
    ],
  },

  {
    id: "office.standard.cybersecurity",
    title: "Customer Cybersecurity Standards",
    reference:
      "Applicable customer, industry, insurance, contractual, and information-security requirements",
    relevance:
      "May affect VLAN design, authentication, encryption, remote access, logging, credential management, configuration backup, and vendor connectivity.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cybersecurity",
      "network-segmentation",
      "authentication",
      "remote-access",
    ],
  },
];
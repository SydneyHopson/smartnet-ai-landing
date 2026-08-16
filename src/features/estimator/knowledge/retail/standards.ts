import type { PlaybookStandardsReference } from "../playbook";

export const retailStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "retail.standard.tia568",
    title: "ANSI/TIA-568",
    reference:
      "Commercial Building Telecommunications Cabling Standard",
    relevance:
      "Supports structured cabling topology, cable performance, terminations, patching, installation, and testing for retail network infrastructure.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "commercial-standard",
      "testing",
    ],
  },

  {
    id: "retail.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Supports telecom rooms, racks, pathways, conduit, sleeves, cable tray, floor boxes, fixture feeds, and retail equipment-space planning.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pathways",
      "telecom-spaces",
      "fixture-pathways",
      "floor-pathways",
    ],
  },

  {
    id: "retail.standard.tia606",
    title: "ANSI/TIA-606",
    reference:
      "Administration Standard for Telecommunications Infrastructure",
    relevance:
      "Supports consistent labeling and documentation for cables, racks, patch panels, devices, point-of-sale drops, cameras, access points, and controlled openings.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "labeling",
      "documentation",
      "administration",
    ],
  },

  {
    id: "retail.standard.tia607",
    title: "ANSI/TIA-607",
    reference:
      "Telecommunications Bonding and Grounding",
    relevance:
      "Supports bonding and grounding for racks, cabinets, network equipment, pathways, telecom spaces, and low-voltage infrastructure.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "grounding",
      "bonding",
      "telecom-infrastructure",
    ],
  },

  {
    id: "retail.standard.nec",
    title: "NFPA 70",
    reference:
      "National Electrical Code",
    relevance:
      "Applies to low-voltage cabling, pathways, grounding, environmental ratings, power separation, fire stopping, and installation methods as adopted locally.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
      "installation-compliance",
      "low-voltage-cabling",
    ],
  },

  {
    id: "retail.standard.nfpa101",
    title: "NFPA 101",
    reference:
      "Life Safety Code",
    relevance:
      "Relevant to occupancy, egress, controlled exits, electrified locking, automatic doors, gates, pharmacy openings, and life-safety coordination.",
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
    id: "retail.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Relevant when access control, emergency door release, paging, emergency notification, or other systems interface with fire-alarm systems.",
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
    id: "retail.standard.ada",
    title: "ADA Standards",
    reference:
      "Americans with Disabilities Act Accessibility Standards",
    relevance:
      "Relevant to accessible door operation, reader mounting heights, checkout controls, kiosks, displays, customer interfaces, and clearances.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "accessibility",
      "mounting-height",
      "customer-interface",
    ],
  },

  {
    id: "retail.standard.pciDss",
    title: "PCI DSS",
    reference:
      "Payment Card Industry Data Security Standard",
    relevance:
      "May affect network segmentation, payment-system connectivity, logging, remote access, device security, wireless security, and vendor access.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "pci-dss",
      "payment-security",
      "network-segmentation",
      "cybersecurity",
    ],
  },

  {
    id: "retail.standard.ieee8023",
    title: "IEEE 802.3",
    reference:
      "Ethernet and Power over Ethernet Standards",
    relevance:
      "Relevant to Ethernet performance, copper and fiber networking, PoE classes, endpoint power, switch capacity, and distance limitations.",
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
    id: "retail.standard.ieee80211",
    title: "IEEE 802.11",
    reference:
      "Wireless LAN Standards",
    relevance:
      "Relevant to retail Wi-Fi design, device compatibility, spectrum use, roaming, security, throughput, and access-point performance.",
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
      "retail-roaming",
    ],
  },

  {
    id: "retail.standard.bicsi",
    title: "BICSI Best Practices",
    reference:
      "BICSI Telecommunications Distribution Methods and Installation Practices",
    relevance:
      "Supports telecom spaces, structured cabling, fiber, grounding, pathways, testing, administration, and installation-quality practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
      "telecommunications",
    ],
  },

  {
    id: "retail.standard.avixa",
    title: "AVIXA Standards and Best Practices",
    reference:
      "Audiovisual system design, performance, verification, and documentation guidance",
    relevance:
      "Supports digital signage, video walls, displays, audio systems, viewing distances, mounting, signal transport, verification, and commissioning.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "avixa",
      "audio-visual",
      "digital-signage",
      "commissioning",
    ],
  },

  {
    id: "retail.standard.ul294",
    title: "UL 294",
    reference:
      "Access Control System Units",
    relevance:
      "Relevant to access-control controllers, readers, power supplies, locking interfaces, monitoring, and system equipment where required.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ul294",
      "access-control",
      "listed-equipment",
    ],
  },

  {
    id: "retail.standard.ul2043",
    title: "UL 2043",
    reference:
      "Fire Test for Heat and Visible Smoke Release for Discrete Products Installed in Air-Handling Spaces",
    relevance:
      "Relevant to equipment, enclosures, supports, and devices installed in environmental air plenums where required.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "plenum-rating",
      "listed-equipment",
      "ceiling-installation",
    ],
  },

  {
    id: "retail.standard.nema",
    title: "NEMA Enclosure Ratings",
    reference:
      "Environmental enclosure classifications",
    relevance:
      "Supports enclosure selection for moisture, dust, grease, washdown, corrosion, refrigeration, freezer, and exterior retail environments.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "nema-rating",
      "environmental-protection",
      "weather-rated-equipment",
    ],
  },

  {
    id: "retail.standard.ipRatings",
    title: "IEC 60529",
    reference:
      "Ingress Protection Ratings",
    relevance:
      "Supports device and enclosure selection for dust, water, moisture, washdown, condensation, and exterior exposure.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "ip-rating",
      "ingress-protection",
      "environmental-rating",
    ],
  },

  {
    id: "retail.standard.localBuilding",
    title: "Applicable Building and Fire Codes",
    reference:
      "Locally adopted building, fire, electrical, accessibility, structural, and energy codes",
    relevance:
      "May affect pathways, floor coring, trenching, rated penetrations, mounting, occupancy, access control, signage, inspections, and approval requirements.",
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
    id: "retail.standard.landlord",
    title: "Landlord and Property Standards",
    reference:
      "Mall, landlord, tenant-construction, property-management, riser-management, loading, and contractor rules",
    relevance:
      "May control telecom access, floor coring, common-area work, storefront work, exterior devices, loading, fire stopping, signage, after-hours work, and closeout documentation.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "landlord-approval",
      "mall-coordination",
      "tenant-construction",
      "property-management",
    ],
  },

  {
    id: "retail.standard.privacy",
    title: "Applicable Privacy and Surveillance Requirements",
    reference:
      "Federal, state, local, employment, consumer, pharmacy, and company surveillance policies",
    relevance:
      "May affect camera placement, fitting-room boundaries, audio recording, employee monitoring, customer information, pharmacy areas, retention, signage, and user permissions.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-privacy",
      "employee-privacy",
      "camera-policy",
      "legal-review",
    ],
  },

  {
    id: "retail.standard.pharmacy",
    title: "Applicable Pharmacy Security Requirements",
    reference:
      "Federal, state, local, customer, insurer, and pharmacy-specific security requirements",
    relevance:
      "May affect controlled access, surveillance, medication storage, refrigeration, credential permissions, audit logs, alerts, and retention.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security",
      "controlled-substance-review",
      "access-audit",
    ],
  },

  {
    id: "retail.standard.cybersecurity",
    title: "Customer Cybersecurity Standards",
    reference:
      "Applicable corporate, contractual, insurance, payment, vendor, and information-security requirements",
    relevance:
      "May affect network segmentation, encryption, authentication, remote access, logging, credential management, configuration backup, and vendor connectivity.",
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

  {
    id: "retail.standard.musicLicensing",
    title: "Commercial Music Licensing Requirements",
    reference:
      "Applicable public-performance, commercial-content, subscription, and provider requirements",
    relevance:
      "May affect background music, promotional audio, multi-store content, subscription services, and authorized commercial playback.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "commercial-music",
      "music-licensing",
      "content-rights",
    ],
  },

  {
    id: "retail.standard.manufacturer",
    title: "Manufacturer Installation Requirements",
    reference:
      "Applicable equipment, cable, mounting, environmental, warranty, and configuration requirements",
    relevance:
      "Supports proper installation, environmental ratings, signal transport, mounting, warranty compliance, firmware, and supported system integration.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "manufacturer-requirements",
      "warranty-compliance",
      "compatibility-review",
    ],
  },
];
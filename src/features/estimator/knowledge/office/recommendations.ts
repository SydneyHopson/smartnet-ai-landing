import type { PlaybookRecommendation } from "../playbook";

export const officeRecommendations: PlaybookRecommendation[] = [
  {
    id: "office.performWalkthrough",
    title: "Perform a detailed onsite walkthrough",
    description:
      "Verify floor plans, telecom rooms, cable pathways, ceiling conditions, furniture layouts, conference rooms, executive spaces, camera views, access-controlled openings, electrical availability, and construction conditions before final pricing.",
    category: "service",
    conditions: [],
    ruleTags: [
      "walkthrough",
      "commercial-office",
      "site-verification",
    ],
  },

  {
    id: "office.predictiveWifiSurvey",
    title: "Perform a predictive and onsite Wi-Fi survey",
    description:
      "Design wireless coverage using floor plans and validate with an onsite survey to account for wall construction, glass, furniture density, occupancy, interference, roaming, and conference-room usage.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wireless-survey",
      "wifi-design",
      "rf-validation",
    ],
  },

  {
    id: "office.enterpriseSegmentation",
    title: "Implement enterprise network segmentation",
    description:
      "Separate employee, guest, voice, camera, access-control, printer, audiovisual, IoT, and building-management traffic using VLANs, firewall policies, and access controls.",
    category: "network",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "vlan",
      "cybersecurity",
      "network-segmentation",
    ],
  },

  {
    id: "officeFiberBackbone",
    title: "Install a fiber backbone between telecom rooms",
    description:
      "Use fiber between MDFs, IDFs, floors, or remote office areas where cable distances approach copper limitations or future expansion is expected.",
    category: "cabling",
    conditions: [
      {
        field: "property.numberOfFloors",
        operator: "greater_than",
        value: 1,
      },
    ],
    ruleTags: [
      "fiber",
      "backbone",
      "future-expansion",
    ],
  },

  {
    id: "officeRackUpgrade",
    title: "Upgrade telecom racks and cable management",
    description:
      "Standardize rack layouts with patch panels, cable managers, UPS units, labeling, grounding, and structured cable routing to simplify maintenance and future growth.",
    category: "rack",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack",
      "structured-cabling",
      "best-practice",
    ],
  },

  {
    id: "officeGuestWifi",
    title: "Provide isolated guest Wi-Fi",
    description:
      "Deploy a dedicated guest wireless network separated from corporate resources with bandwidth limits, captive portal, and firewall isolation.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "security",
      "vlan",
    ],
  },

  {
    id: "officeCameraCoverage",
    title: "Focus surveillance on business-critical areas",
    description:
      "Prioritize entrances, reception, lobbies, server rooms, loading areas, parking, and restricted spaces while respecting employee privacy policies.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-design",
      "privacy",
      "security",
    ],
  },

  {
    id: "officeAccessControl",
    title: "Deploy role-based access control",
    description:
      "Secure sensitive office areas using role-based credentials, audit logs, remote administration, and integration with corporate identity systems where appropriate.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-control",
      "identity",
      "audit",
    ],
  },

  {
    id: "officeConferenceRooms",
    title: "Standardize conference-room technology",
    description:
      "Use consistent room designs, collaboration platforms, control interfaces, cameras, microphones, and displays across conference spaces to simplify support and training.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "conference-room",
      "av-standardization",
      "teams-rooms",
    ],
  },

  {
    id: "officeRoomScheduling",
    title: "Implement room scheduling",
    description:
      "Integrate scheduling panels and calendar services to improve conference-room utilization and reduce scheduling conflicts.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "room-scheduling",
      "calendar-integration",
    ],
  },

  {
    id: "officeUps",
    title: "Protect critical systems with UPS power",
    description:
      "Provide battery backup for network equipment, access control, conferencing systems, and security devices to minimize outages during short power interruptions.",
    category: "power",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
    ],
  },

  {
    id: "officeDocumentation",
    title: "Deliver complete project documentation",
    description:
      "Provide rack elevations, cable labeling, floor plans, test results, network diagrams, device schedules, and as-built documentation at project completion.",
    category: "service",
    conditions: [],
    ruleTags: [
      "documentation",
      "closeout",
      "best-practice",
    ],
  },
];
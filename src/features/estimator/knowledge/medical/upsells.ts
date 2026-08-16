import type { PlaybookUpsellOpportunity } from "../playbook";

export const medicalUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "medical.upsell.managedMonitoring",
    title: "Managed Network Monitoring",
    description:
      "Provide proactive monitoring, firmware updates, alerting, and remote diagnostics.",
    valueStatement:
      "Reduces downtime for critical healthcare technology.",
    conditions: [],
    ruleTags: [
      "managed-services",
      "remote-monitoring",
    ],
  },

  {
    id: "medical.upsell.ups",
    title: "UPS Battery Backup",
    description:
      "Protect network, communications, security, and clinical support systems during power interruptions.",
    valueStatement:
      "Improves reliability for critical healthcare operations.",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
    ],
  },

  {
    id: "medical.upsell.cloudVideo",
    title: "Cloud Video Management",
    description:
      "Provide cloud-based video storage and remote surveillance management.",
    valueStatement:
      "Simplifies video management while improving accessibility.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cloud-video",
      "security",
    ],
  },

  {
    id: "medical.upsell.aiAnalytics",
    title: "AI Video Analytics",
    description:
      "Enable occupancy monitoring, people counting, intrusion detection, and security analytics.",
    valueStatement:
      "Enhances safety while providing operational insight.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ai-analytics",
      "security",
    ],
  },

  {
    id: "medical.upsell.assetTracking",
    title: "RTLS Asset Tracking",
    description:
      "Track medical equipment and critical assets using real-time location services.",
    valueStatement:
      "Improves equipment utilization and reduces search time.",
    conditions: [],
    ruleTags: [
      "rtls",
      "asset-tracking",
    ],
  },

  {
    id: "medical.upsell.wirelessSurvey",
    title: "Professional Wireless Survey",
    description:
      "Perform predictive and validation wireless surveys for clinical environments.",
    valueStatement:
      "Improves roaming reliability and wireless performance.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wireless-survey",
      "wifi-validation",
    ],
  },

  {
    id: "medical.upsell.cybersecurity",
    title: "Cybersecurity Assessment",
    description:
      "Review network segmentation, device security, authentication, and infrastructure hardening.",
    valueStatement:
      "Reduces cybersecurity risk for connected medical systems.",
    conditions: [],
    ruleTags: [
      "cybersecurity",
      "network-security",
    ],
  },

  {
    id: "medical.upsell.maintenance",
    title: "Preventive Maintenance Agreement",
    description:
      "Provide scheduled inspections, firmware updates, testing, cleaning, and health checks.",
    valueStatement:
      "Reduces unexpected failures and extends equipment life.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "recurring-revenue",
    ],
  },

  {
    id: "medical.upsell.expansion",
    title: "Future Expansion Infrastructure",
    description:
      "Install spare conduit, fiber, rack capacity, and structured cabling for future growth.",
    valueStatement:
      "Reduces future project costs and disruption.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "spare-capacity",
    ],
  },

  {
    id: "medical.upsell.extendedWarranty",
    title: "Extended Warranty",
    description:
      "Provide long-term manufacturer or SmartNET warranty coverage.",
    valueStatement:
      "Creates predictable maintenance costs and long-term protection.",
    conditions: [],
    ruleTags: [
      "extended-warranty",
      "support-plan",
    ],
  },
];
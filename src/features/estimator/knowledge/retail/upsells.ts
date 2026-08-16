import type { PlaybookUpsellOpportunity } from "../playbook";

export const retailUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "retail.upsell.ups",
    title: "UPS Battery Backup",
    description:
      "Protect networking, cameras, point-of-sale, and security equipment during power outages.",
    valueStatement:
      "Keeps critical systems online during brief outages and reduces downtime.",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
    ],
  },

  {
    id: "retail.upsell.managedMonitoring",
    title: "Managed Network Monitoring",
    description:
      "Provide proactive monitoring, alerting, firmware management, and remote troubleshooting.",
    valueStatement:
      "Reduces downtime while allowing issues to be identified before they impact business.",
    conditions: [],
    ruleTags: [
      "managed-services",
      "remote-monitoring",
    ],
  },

  {
    id: "retail.upsell.cloudVideo",
    title: "Cloud Video Management",
    description:
      "Offer cloud-based camera storage and remote video management.",
    valueStatement:
      "Improves accessibility while reducing onsite recorder maintenance.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cloud-video",
      "camera-upgrade",
    ],
  },

  {
    id: "retail.upsell.aiAnalytics",
    title: "AI Video Analytics",
    description:
      "Add people counting, intrusion detection, queue analytics, and object detection.",
    valueStatement:
      "Provides business intelligence in addition to security.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ai-analytics",
      "loss-prevention",
    ],
  },

  {
    id: "retail.upsell.digitalSignage",
    title: "Digital Signage",
    description:
      "Add centrally managed commercial displays throughout the store.",
    valueStatement:
      "Creates new opportunities for promotions and customer engagement.",
    conditions: [],
    ruleTags: [
      "digital-signage",
    ],
  },

  {
    id: "retail.upsell.audio",
    title: "Retail Audio System",
    description:
      "Install zoned background music and paging.",
    valueStatement:
      "Improves customer experience and store communications.",
    conditions: [],
    ruleTags: [
      "audio",
    ],
  },

  {
    id: "retail.upsell.cellularBackup",
    title: "Cellular Internet Backup",
    description:
      "Provide automatic failover internet connectivity.",
    valueStatement:
      "Allows payment systems and business operations to continue during ISP outages.",
    conditions: [],
    ruleTags: [
      "internet-failover",
    ],
  },

  {
    id: "retail.upsell.maintenance",
    title: "Preventive Maintenance Agreement",
    description:
      "Provide recurring inspections, firmware updates, cleaning, testing, and health checks.",
    valueStatement:
      "Extends equipment life while reducing emergency service calls.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "recurring-revenue",
    ],
  },

  {
    id: "retail.upsell.futureExpansion",
    title: "Future Expansion Cabling",
    description:
      "Install spare conduit, cable pathways, and additional cabling during construction.",
    valueStatement:
      "Greatly reduces the cost of future technology upgrades.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "spare-capacity",
    ],
  },

  {
    id: "retail.upsell.extendedWarranty",
    title: "Extended Equipment Warranty",
    description:
      "Offer manufacturer or SmartNET extended warranty coverage.",
    valueStatement:
      "Provides predictable support costs and long-term protection.",
    conditions: [],
    ruleTags: [
      "extended-warranty",
    ],
  },
];
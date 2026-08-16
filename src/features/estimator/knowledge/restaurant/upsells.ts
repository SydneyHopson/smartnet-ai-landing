import type { PlaybookUpsellOpportunity } from "../playbook";

export const restaurantUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "restaurant.upsell.ups",
    title: "UPS Battery Backup",
    description:
      "Protect network, POS, surveillance, and access-control equipment during utility outages.",
    valueStatement:
      "Keeps restaurant operations running during short power interruptions.",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
    ],
  },

  {
    id: "restaurant.upsell.managedMonitoring",
    title: "Managed Network Monitoring",
    description:
      "Provide remote monitoring, firmware management, health checks, and proactive alerting.",
    valueStatement:
      "Reduces downtime and improves long-term system reliability.",
    conditions: [],
    ruleTags: [
      "managed-services",
      "remote-monitoring",
    ],
  },

  {
    id: "restaurant.upsell.cloudVideo",
    title: "Cloud Video Management",
    description:
      "Add cloud-based surveillance recording and remote video access.",
    valueStatement:
      "Improves remote management while reducing dependence on local storage.",
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
    id: "restaurant.upsell.aiAnalytics",
    title: "AI Video Analytics",
    description:
      "Enable people counting, occupancy monitoring, intrusion detection, heat maps, and queue analytics.",
    valueStatement:
      "Provides operational insight in addition to security.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ai-analytics",
      "business-intelligence",
    ],
  },

  {
    id: "restaurant.upsell.guestWifi",
    title: "Guest Wi-Fi Platform",
    description:
      "Deploy managed guest Wi-Fi with captive portal, branding, analytics, and marketing integrations.",
    valueStatement:
      "Improves customer experience while generating useful business insights.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "customer-experience",
    ],
  },

  {
    id: "restaurant.upsell.digitalSignage",
    title: "Digital Menu Boards",
    description:
      "Install centrally managed menu boards and promotional displays.",
    valueStatement:
      "Makes menu updates faster while improving customer engagement.",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "menu-boards",
    ],
  },

  {
    id: "restaurant.upsell.audio",
    title: "Multi-Zone Audio",
    description:
      "Provide independently controlled dining, patio, bar, and waiting-area audio.",
    valueStatement:
      "Creates a better dining experience with flexible audio control.",
    conditions: [],
    ruleTags: [
      "audio",
      "customer-experience",
    ],
  },

  {
    id: "restaurant.upsell.driveThrough",
    title: "Drive-Through Technology Upgrade",
    description:
      "Upgrade intercoms, cameras, timers, payment systems, and menu boards.",
    valueStatement:
      "Improves speed of service and customer satisfaction.",
    conditions: [
      {
        field: "property.customProjectType",
        operator: "includes",
        value: [
          "drive-through",
          "quick-service",
        ],
      },
    ],
    ruleTags: [
      "drive-through",
      "restaurant-technology",
    ],
  },

  {
    id: "restaurant.upsell.cellularBackup",
    title: "Cellular Internet Failover",
    description:
      "Provide automatic LTE/5G internet backup.",
    valueStatement:
      "Maintains POS and business operations during ISP outages.",
    conditions: [],
    ruleTags: [
      "internet-failover",
      "business-continuity",
    ],
  },

  {
    id: "restaurant.upsell.expansion",
    title: "Future Expansion Infrastructure",
    description:
      "Install spare conduit, cable pathways, fiber, and structured cabling during the current project.",
    valueStatement:
      "Reduces future installation costs and minimizes disruption.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "spare-capacity",
    ],
  },

  {
    id: "restaurant.upsell.maintenance",
    title: "Preventive Maintenance Agreement",
    description:
      "Provide recurring inspections, firmware updates, cleaning, testing, and system health reviews.",
    valueStatement:
      "Extends equipment life and reduces emergency service calls.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "recurring-revenue",
    ],
  },

  {
    id: "restaurant.upsell.extendedWarranty",
    title: "Extended Warranty",
    description:
      "Offer manufacturer or SmartNET extended warranty coverage.",
    valueStatement:
      "Provides long-term protection and predictable maintenance costs.",
    conditions: [],
    ruleTags: [
      "extended-warranty",
      "support-plan",
    ],
  },
];
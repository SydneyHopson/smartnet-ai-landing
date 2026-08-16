import type { PlaybookRecommendation } from "../playbook";

export const restaurantRecommendations: PlaybookRecommendation[] = [
  {
    id: "restaurant.recommendation.enterpriseRack",
    title: "Install a dedicated network rack",
    description:
      "Consolidate switches, patch panels, UPS equipment, firewalls, NVRs, controllers, and structured cabling into a secure, serviceable rack with proper cable management.",
    category: "rack",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-standardization",
      "serviceability",
      "future-expansion",
    ],
  },

  {
    id: "restaurant.recommendation.cat6a",
    title: "Use Category 6A structured cabling",
    description:
      "Deploy Category 6A for new permanent cabling to support multi-gigabit networking, PoE devices, and future upgrades.",
    category: "cabling",
    conditions: [],
    ruleTags: [
      "cat6a",
      "future-ready",
      "structured-cabling",
    ],
  },

  {
    id: "restaurant.recommendation.fiberBackbone",
    title: "Use fiber for long cable routes",
    description:
      "Install fiber backbone cabling where pathway distances exceed copper Ethernet limitations or where future expansion is expected.",
    category: "network",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "greater_than",
        value: 295,
      },
    ],
    ruleTags: [
      "fiber-backbone",
      "distance-limitation",
      "future-expansion",
    ],
  },

  {
    id: "restaurant.recommendation.vlanSegmentation",
    title: "Separate business systems with VLANs",
    description:
      "Separate point-of-sale, guest Wi-Fi, surveillance, staff devices, audio systems, and management traffic into dedicated VLANs for security and reliability.",
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
      "pci",
    ],
  },

  {
    id: "restaurant.recommendation.ups",
    title: "Protect critical equipment with UPS backup",
    description:
      "Provide UPS protection for network equipment, internet connectivity, surveillance, access control, and point-of-sale systems.",
    category: "power",
    conditions: [],
    ruleTags: [
      "ups",
      "business-continuity",
    ],
  },

  {
    id: "restaurant.recommendation.transactionCameras",
    title: "Prioritize transaction-quality camera placement",
    description:
      "Position cameras for clear identification at registers, pickup counters, drive-through windows, entrances, and cash-handling locations rather than maximizing overall coverage.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-design",
      "transaction-verification",
    ],
  },

  {
    id: "restaurant.recommendation.lowLightCameras",
    title: "Use WDR and low-light cameras where required",
    description:
      "Deploy cameras designed for challenging lighting conditions such as bright entrances, parking lots, drive-through lanes, and dim dining areas.",
    category: "camera",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "low-light",
      "wdr",
      "night-surveillance",
    ],
  },

  {
    id: "restaurant.recommendation.guestWifi",
    title: "Deploy isolated guest Wi-Fi",
    description:
      "Provide guest wireless access on a separate secured network with bandwidth controls and captive portal capabilities when appropriate.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "network-separation",
    ],
  },

  {
    id: "restaurant.recommendation.predictiveWifi",
    title: "Perform predictive wireless design",
    description:
      "Validate access-point placement around kitchens, coolers, stainless equipment, and customer seating to improve roaming and capacity.",
    category: "wifi",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wireless-design",
      "rf-survey",
    ],
  },

  {
    id: "restaurant.recommendation.environmentRated",
    title: "Use environment-rated equipment",
    description:
      "Install equipment specifically rated for grease, moisture, washdown, refrigeration, freezer, or exterior environments when required.",
    category: "other",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "environmental-rating",
      "food-service",
    ],
  },

  {
    id: "restaurant.recommendation.accessControl",
    title: "Use commercial access-control hardware",
    description:
      "Select commercial-grade electrified hardware, request-to-exit devices, door-position switches, and controllers designed for restaurant operations.",
    category: "access_control",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "commercial-hardware",
      "life-safety",
    ],
  },

  {
    id: "restaurant.recommendation.audioZones",
    title: "Create independent audio zones",
    description:
      "Separate dining, patio, bar, kitchen, waiting, and private spaces into independently controlled audio zones.",
    category: "audio_visual",
    conditions: [],
    ruleTags: [
      "audio-zones",
      "customer-experience",
    ],
  },

  {
    id: "restaurant.recommendation.documentation",
    title: "Collect complete site documentation",
    description:
      "Obtain floor plans, reflected ceiling plans, equipment schedules, network diagrams, door schedules, and landlord standards before final pricing.",
    category: "service",
    conditions: [],
    ruleTags: [
      "documentation",
      "walkthrough",
    ],
  },

  {
    id: "restaurant.recommendation.walkthrough",
    title: "Perform a detailed onsite walkthrough",
    description:
      "Verify measurements, pathways, power, network equipment, environmental conditions, customer restrictions, and installation logistics before issuing the final quote.",
    category: "service",
    conditions: [],
    ruleTags: [
      "walkthrough-required",
      "site-verification",
    ],
  },
];
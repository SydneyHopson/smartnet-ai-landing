import type {
  PlaybookCommonMistake,
  PlaybookStandardsReference,
  PlaybookUpsellOpportunity,
} from "../playbook";

export const restaurantCommonMistakes: PlaybookCommonMistake[] = [
  {
    id: "restaurant.mistake.networkCloset",
    title: "Ignoring the existing network location",
    description:
      "Restaurant network equipment is often crowded into offices, cabinets, shelves, or utility spaces with poor ventilation, power, security, and cable management.",
    prevention:
      "Inspect the full equipment area and verify rack space, cooling, power, UPS capacity, cable management, and service access before final pricing.",
    conditions: [],
    ruleTags: [
      "network-headend",
      "rack-capacity-review",
      "network-cleanup",
    ],
  },

  {
    id: "restaurant.mistake.posNetwork",
    title: "Combining point-of-sale and guest traffic",
    description:
      "Placing payment systems, guest Wi-Fi, cameras, staff devices, audio systems, and business equipment on the same network can create security and reliability problems.",
    prevention:
      "Confirm vendor requirements and design separate VLANs or physical networks where appropriate.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "pci-network-separation",
      "vlan-review",
      "cybersecurity-review",
    ],
  },

  {
    id: "restaurant.mistake.ceilingAccess",
    title: "Assuming ceiling access is available",
    description:
      "Drywall ceilings, sealed soffits, kitchen panels, architectural finishes, ductwork, and fire-suppression equipment can block expected cable routes.",
    prevention:
      "Inspect every major zone and document actual access points, pathways, mounting surfaces, and repair requirements.",
    conditions: [],
    ruleTags: [
      "ceiling-access-review",
      "pathway-verification",
      "walkthrough-required",
    ],
  },

  {
    id: "restaurant.mistake.foodSafety",
    title: "Underestimating sanitation restrictions",
    description:
      "Drilling, ceiling access, debris, tools, and material staging near food-preparation areas can create operational and sanitation problems.",
    prevention:
      "Coordinate food removal, containment, surface protection, cleanup, and approved work windows before installation.",
    conditions: [],
    ruleTags: [
      "food-safety-review",
      "sanitation-coordination",
      "dust-control",
    ],
  },

  {
    id: "restaurant.mistake.environmentRating",
    title: "Using standard equipment in harsh environments",
    description:
      "Grease, steam, heat, moisture, washdown, refrigeration, freezer temperatures, and cleaning chemicals can damage standard equipment.",
    prevention:
      "Verify the environment and select equipment, cable, enclosures, fittings, and mounting hardware with appropriate ratings.",
    conditions: [],
    ruleTags: [
      "environmental-rating-review",
      "food-service-environment",
      "temperature-rating",
    ],
  },

  {
    id: "restaurant.mistake.cameraOverview",
    title: "Using overview cameras for transaction detail",
    description:
      "Wide-angle cameras mounted too high may show general activity but fail to capture useful cash, payment, order, or facial detail.",
    prevention:
      "Define the identification objective and measure camera height and target distance before selecting the lens and location.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-verification",
      "pixel-density-review",
      "lens-selection-review",
    ],
  },

  {
    id: "restaurant.mistake.cameraLighting",
    title: "Ignoring difficult lighting conditions",
    description:
      "Bright entrances, dark dining areas, drive-through headlights, reflective surfaces, menu boards, and nighttime parking can reduce image quality.",
    prevention:
      "Document lighting conditions and select appropriate camera placement, WDR, low-light performance, infrared, or supplemental lighting.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "drive-through-lighting",
    ],
  },

  {
    id: "restaurant.mistake.wifiObstructions",
    title: "Ignoring restaurant Wi-Fi obstructions",
    description:
      "Stainless steel, refrigerators, freezers, tile, concrete, mirrors, kitchen equipment, and dense seating can block or reflect wireless signals.",
    prevention:
      "Perform predictive design and validate wireless coverage after installation.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "wireless-survey",
      "wifi-validation",
    ],
  },

  {
    id: "restaurant.mistake.guestWifi",
    title: "Deploying guest Wi-Fi without controls",
    description:
      "Unrestricted guest access can consume bandwidth and expose business systems to unnecessary risk.",
    prevention:
      "Use network isolation, bandwidth limits, secure authentication, content controls, and a managed guest portal when appropriate.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "bandwidth-control",
      "network-segmentation",
    ],
  },

  {
    id: "restaurant.mistake.audioZones",
    title: "Treating the restaurant as one audio zone",
    description:
      "Dining rooms, bars, patios, kitchens, restrooms, pickup areas, and private rooms often require different volume levels and controls.",
    prevention:
      "Define independent zones, source requirements, control permissions, speaker types, and ambient-noise conditions.",
    conditions: [],
    ruleTags: [
      "audio-zone-review",
      "speaker-layout-review",
      "control-review",
    ],
  },

  {
    id: "restaurant.mistake.musicLicensing",
    title: "Assuming consumer music accounts are sufficient",
    description:
      "Consumer streaming accounts may not provide commercial performance rights or appropriate business controls.",
    prevention:
      "Confirm the customer's commercial music provider, licensing responsibility, subscriptions, and source requirements.",
    conditions: [],
    ruleTags: [
      "music-licensing-review",
      "commercial-audio",
      "service-subscription-review",
    ],
  },

  {
    id: "restaurant.mistake.doorHardware",
    title: "Quoting access control without inspecting doors",
    description:
      "Storefront doors, cooler doors, freezer doors, roll-up doors, gates, and existing frames may not support standard locking hardware.",
    prevention:
      "Inspect both sides of every controlled opening and document the frame, lock, closer, egress hardware, power transfer, and cable pathway.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "cold-storage-door-review",
      "life-safety-review",
    ],
  },

  {
    id: "restaurant.mistake.driveThrough",
    title: "Treating drive-through equipment as standard networking",
    description:
      "Drive-through intercoms, timers, menu boards, vehicle detection, payment terminals, cameras, and lane devices may require proprietary integration and specialty pathways.",
    prevention:
      "Identify the existing vendors, ownership boundaries, compatibility requirements, power, conduit, trenching, and testing responsibilities.",
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
      "drive-through-review",
      "vendor-integration",
      "specialty-system",
    ],
  },

  {
    id: "restaurant.mistake.power",
    title: "Failing to verify equipment power",
    description:
      "Network racks, recorders, amplifiers, access-control power supplies, displays, and exterior systems may not have suitable nearby power.",
    prevention:
      "Verify receptacles, circuits, voltage, UPS requirements, grounding, and electrical-contractor responsibilities during the walkthrough.",
    conditions: [],
    ruleTags: [
      "power-verification",
      "electrical-coordination",
      "scope-boundary-review",
    ],
  },

  {
    id: "restaurant.mistake.openingSchedule",
    title: "Underestimating the opening schedule",
    description:
      "Construction delays, inspections, kitchen commissioning, furniture installation, vendor cutovers, and staff training can compress the low-voltage schedule.",
    prevention:
      "Confirm dependencies, phased turnover dates, access windows, procurement lead times, and commissioning requirements before committing to completion.",
    conditions: [],
    ruleTags: [
      "opening-date",
      "schedule-review",
      "procurement-review",
    ],
  },
];

export const restaurantUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "restaurant.upsell.managedNetwork",
    title: "Managed Network Support",
    description:
      "Provide remote monitoring, configuration backup, firmware management, alerting, and priority support for the restaurant network.",
    valueStatement:
      "Reduces downtime across point-of-sale, online ordering, Wi-Fi, cameras, access control, and other connected restaurant systems.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "managed-services",
      "remote-monitoring",
      "recurring-revenue",
    ],
  },

  {
    id: "restaurant.upsell.guestWifiAnalytics",
    title: "Guest Wi-Fi Portal and Analytics",
    description:
      "Add branded guest access, captive portal controls, usage reporting, bandwidth limits, and customer-engagement integrations.",
    valueStatement:
      "Improves the customer experience while giving the restaurant more control and insight into guest connectivity.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "captive-portal",
      "customer-analytics",
    ],
  },

  {
    id: "restaurant.upsell.videoAnalytics",
    title: "Intelligent Video Analytics",
    description:
      "Add people counting, line crossing, intrusion detection, occupancy insights, vehicle detection, loitering alerts, and operational analytics.",
    valueStatement:
      "Turns surveillance into a tool for security, staffing insights, customer flow, and operational awareness.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "ai-video",
      "analytics",
      "operational-intelligence",
    ],
  },

  {
    id: "restaurant.upsell.transactionIntegration",
    title: "Transaction and Video Integration",
    description:
      "Integrate point-of-sale events with video bookmarks or transaction search when supported by the selected platforms.",
    valueStatement:
      "Speeds up investigations involving refunds, cash handling, order disputes, and employee transactions.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-integration",
      "loss-prevention",
      "vendor-integration",
    ],
  },

  {
    id: "restaurant.upsell.cloudVideoBackup",
    title: "Cloud Video Backup",
    description:
      "Add cloud retention for selected critical cameras or events in addition to local recording.",
    valueStatement:
      "Protects important footage against recorder theft, damage, or onsite equipment failure.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "cloud-video",
      "redundancy",
      "recurring-revenue",
    ],
  },

  {
    id: "restaurant.upsell.mobileAccess",
    title: "Mobile Access Credentials",
    description:
      "Allow managers and approved employees to unlock doors with managed mobile credentials.",
    valueStatement:
      "Reduces physical key management while improving auditability and credential control.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "mobile-credentials",
      "credential-management",
      "access-control-upgrade",
    ],
  },

  {
    id: "restaurant.upsell.visitorVendorAccess",
    title: "Vendor and Contractor Access Management",
    description:
      "Provide scheduled or temporary credentials for delivery personnel, maintenance vendors, cleaners, contractors, and service providers.",
    valueStatement:
      "Improves accountability while reducing unrestricted key sharing.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "temporary-credentials",
      "vendor-access",
      "audit-trail",
    ],
  },

  {
    id: "restaurant.upsell.zonedAudio",
    title: "Multi-Zone Audio Upgrade",
    description:
      "Provide independent music sources, schedules, volume controls, paging, and speaker zones for dining, bar, patio, kitchen, and private areas.",
    valueStatement:
      "Improves customer experience and gives managers precise control over different restaurant environments.",
    conditions: [],
    ruleTags: [
      "audio-zones",
      "customer-experience",
      "av-upgrade",
    ],
  },

  {
    id: "restaurant.upsell.digitalSignage",
    title: "Digital Signage and Menu Boards",
    description:
      "Add centrally managed displays for menus, promotions, waiting areas, pickup status, and customer messaging.",
    valueStatement:
      "Makes promotions and menu changes faster while improving consistency across customer-facing displays.",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "menu-boards",
      "content-management",
    ],
  },

  {
    id: "restaurant.upsell.preventiveMaintenance",
    title: "Preventive Maintenance Plan",
    description:
      "Provide scheduled camera cleaning, equipment inspection, UPS testing, network health checks, firmware updates, audio testing, and documentation reviews.",
    valueStatement:
      "Reduces failures and keeps restaurant systems reliable during peak operating periods.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "service-contract",
      "recurring-revenue",
    ],
  },

  {
    id: "restaurant.upsell.failoverInternet",
    title: "Backup Internet Connection",
    description:
      "Add cellular or secondary-provider failover for critical restaurant connectivity.",
    valueStatement:
      "Helps preserve point-of-sale, online ordering, delivery platforms, and cloud services during primary internet outages.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "internet-failover",
      "business-continuity",
      "network-resilience",
    ],
  },

  {
    id: "restaurant.upsell.upsRuntime",
    title: "Extended Battery Backup",
    description:
      "Provide larger UPS systems or managed power protection for network, cameras, access control, and selected restaurant systems.",
    valueStatement:
      "Reduces disruption from short outages and improves controlled shutdown capability.",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "restaurant.upsell.futureExpansion",
    title: "Future Expansion Capacity",
    description:
      "Reserve rack space, switch ports, PoE capacity, pathway capacity, cable drops, and system licensing for future restaurant technology.",
    valueStatement:
      "Lowers future upgrade costs and reduces disruption when new devices or services are added.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
    ],
  },
];

export const restaurantStandardsReferences: PlaybookStandardsReference[] = [
  {
    id: "restaurant.standard.tia568",
    title: "ANSI/TIA-568",
    reference:
      "Commercial Building Telecommunications Cabling Standard",
    relevance:
      "Provides structured cabling performance, topology, termination, and installation guidance for commercial restaurant networks.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "structured-cabling",
      "commercial-standard",
    ],
  },

  {
    id: "restaurant.standard.tia569",
    title: "ANSI/TIA-569",
    reference:
      "Telecommunications Pathways and Spaces",
    relevance:
      "Supports pathway, conduit, sleeve, telecom-space, equipment-room, and cable-routing design.",
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
      "Administration Standard for Telecommunications Infrastructure",
    relevance:
      "Supports consistent labeling, identification, records, and administration of restaurant cabling and equipment.",
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
      "Provides grounding and bonding guidance for telecommunications racks, pathways, and equipment.",
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
      "Applies to low-voltage cabling, pathways, power separation, grounding, environmental conditions, and installation methods as adopted locally.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "electrical-code",
      "installation-compliance",
    ],
  },

  {
    id: "restaurant.standard.nfpa101",
    title: "NFPA 101",
    reference:
      "Life Safety Code",
    relevance:
      "Relevant to egress, occupancy, controlled exits, electrified locking arrangements, and life-safety coordination.",
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
    ],
  },

  {
    id: "restaurant.standard.nfpa72",
    title: "NFPA 72",
    reference:
      "National Fire Alarm and Signaling Code",
    relevance:
      "Relevant when access-control hardware, door release, notification, monitoring, or other systems interface with the fire-alarm system.",
    jurisdictionDependent: true,
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "fire-alarm-interface",
      "life-safety",
    ],
  },

  {
    id: "restaurant.standard.ada",
    title: "ADA Standards",
    reference:
      "Americans with Disabilities Act Accessibility Standards",
    relevance:
      "Relevant to accessible door operation, mounting heights, controls, clearances, and customer-facing interfaces.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "accessibility",
      "mounting-height",
    ],
  },

  {
    id: "restaurant.standard.pciDss",
    title: "PCI DSS",
    reference:
      "Payment Card Industry Data Security Standard",
    relevance:
      "Relevant to point-of-sale network isolation, payment-system security, access controls, monitoring, and vendor responsibilities.",
    jurisdictionDependent: false,
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "pci",
      "pos-security",
      "network-segmentation",
    ],
  },

  {
    id: "restaurant.standard.localFoodCode",
    title: "Applicable Food Code and Health Requirements",
    reference:
      "Local or state food-service sanitation and health regulations",
    relevance:
      "May affect work practices, equipment placement, cleaning, contamination controls, and installation access in food-preparation areas.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "food-safety",
      "sanitation",
      "health-department",
    ],
  },

  {
    id: "restaurant.standard.localBuildingCode",
    title: "Applicable Building and Fire Codes",
    reference:
      "Locally adopted building, fire, mechanical, and plumbing codes",
    relevance:
      "May affect penetrations, tenant separations, mounting, rated assemblies, occupancy, egress, and coordination with kitchen systems.",
    jurisdictionDependent: true,
    conditions: [],
    ruleTags: [
      "building-code",
      "fire-code",
      "ahj-review",
    ],
  },

  {
    id: "restaurant.standard.bicsi",
    title: "BICSI Best Practices",
    reference:
      "BICSI Telecommunications Distribution Methods and Installation Practices",
    relevance:
      "Supports commercial pathway, cable support, telecom-space, testing, labeling, grounding, and installation-quality practices.",
    jurisdictionDependent: false,
    conditions: [],
    ruleTags: [
      "bicsi",
      "best-practices",
    ],
  },
];
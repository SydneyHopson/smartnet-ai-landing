import type { PlaybookRisk } from "../playbook";

export const retailRisks: PlaybookRisk[] = [
  {
    id: "retail.activeOperationsRisk",
    title: "Active store operations may reduce installation productivity",
    description:
      "Customers, employees, transactions, deliveries, stocking, inventory activity, and merchandise displays may require phased work, temporary barriers, repeated mobilization, or after-hours installation.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-retail",
      "retail-operations",
      "productivity-review",
      "work-zone-coordination",
    ],
  },

  {
    id: "retail.customerSafetyRisk",
    title: "Customer-facing work requires controlled work zones",
    description:
      "Overhead work, ladders, lifts, open ceilings, tools, cords, drilling, debris, and temporary pathways may create safety hazards in active sales areas.",
    severity: "critical",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-safety",
      "work-zone-control",
      "overhead-work",
      "retail-operations",
    ],
  },

  {
    id: "retail.merchandiseProtectionRisk",
    title: "Merchandise and fixtures may restrict installation access",
    description:
      "Merchandise, shelving, displays, checkout counters, pharmacy inventory, refrigerated products, and high-value goods may require protection, relocation, escorts, or restricted work methods.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "merchandise-protection",
      "inventory-security",
      "fixture-coordination",
      "site-logistics",
    ],
  },

  {
    id: "retail.afterHoursRisk",
    title: "Restricted store hours may increase project cost",
    description:
      "After-closing, overnight, pre-opening, mall-approved, inventory-freeze, holiday, or shutdown work may increase labor rates, mobilizations, supervision, access coordination, and project duration.",
    severity: "high",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "labor-premium-review",
      "mobilization-review",
      "schedule-risk",
    ],
  },

  {
    id: "retail.unknownCeilingRisk",
    title: "Ceiling conditions have not been verified",
    description:
      "Unknown ceiling type, height, access, utilities, fixtures, decorative elements, mounting surfaces, and plenum congestion can materially affect labor and pathway design.",
    severity: "medium",
    conditions: [
      {
        field: "property.ceilingType",
        operator: "equals",
        value: "unknown",
      },
    ],
    ruleTags: [
      "ceiling-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "retail.highCeilingRisk",
    title: "Elevated retail areas require specialized access",
    description:
      "High sales floors, open ceilings, vestibules, stockrooms, canopies, loading areas, signage locations, and exterior walls may require lifts, scaffolding, larger crews, and protected work zones.",
    severity: "high",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "greater_than_or_equal",
        value: 14,
      },
    ],
    ruleTags: [
      "high-ceiling",
      "lift-review",
      "crew-size-review",
      "customer-safety",
    ],
  },

  {
    id: "retail.noPathwayRisk",
    title: "No usable cable pathway has been confirmed",
    description:
      "A lack of accessible ceiling space, conduit, sleeves, floor pathways, fixture pathways, or cable supports may require new conduit, raceway, coring, trenching, floor boxes, or revised equipment locations.",
    severity: "high",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "includes",
        value: [
          "No known pathway",
        ],
      },
    ],
    ruleTags: [
      "new-pathway-required",
      "conduit-review",
      "raceway-review",
      "fixture-feed-review",
    ],
  },

  {
    id: "retail.unknownPathwayRisk",
    title: "Cable pathway conditions are unknown",
    description:
      "Unknown pathway capacity, accessibility, tenant boundaries, fixture integration, fire ratings, and support conditions may significantly affect labor, materials, and schedule.",
    severity: "medium",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "pathway-verification-required",
      "walkthrough-required",
      "estimate-confidence-review",
    ],
  },

  {
    id: "retail.floorCoreRisk",
    title: "Floor coring and trenching may require specialty coordination",
    description:
      "Checkout feeds, floor boxes, poke-throughs, slab penetrations, fixture feeds, and trenches may require scanning, engineering, landlord approval, fire stopping, after-hours work, and restoration.",
    severity: "high",
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "floor-core-review",
      "trenching-review",
      "structural-scan-review",
      "landlord-approval",
    ],
  },

  {
    id: "retail.fixtureCoordinationRisk",
    title: "Retail fixtures may alter routes and device locations",
    description:
      "Shelving, gondolas, checkout counters, millwork, kiosks, refrigerated cases, displays, seasonal layouts, and pharmacy fixtures may change cable lengths, mounting locations, access, and sequencing.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "fixture-coordination",
      "retail-fixture-review",
      "installation-sequencing",
      "change-order-risk",
    ],
  },

  {
    id: "retail.longCableRunRisk",
    title: "Cable distance may exceed copper Ethernet limits",
    description:
      "Long routes between network rooms, floors, stockrooms, loading areas, parking, exterior devices, mall telecom spaces, or detached equipment may require fiber or remote network enclosures.",
    severity: "high",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "greater_than",
        value: 295,
      },
    ],
    ruleTags: [
      "long-cable-run",
      "fiber-required-review",
      "remote-enclosure-review",
      "distance-limitation",
    ],
  },

  {
    id: "retail.unknownCableDistanceRisk",
    title: "Cable-route distances have not been measured",
    description:
      "Unknown pathway distances may conceal copper distance violations, underestimated cable quantities, remote-enclosure needs, or fiber-backbone requirements.",
    severity: "medium",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "distance-measurement-required",
      "fiber-review",
      "material-quantity-review",
    ],
  },

  {
    id: "retail.existingFiberRisk",
    title: "Existing fiber may not be reusable",
    description:
      "Existing fiber may have incompatible type, insufficient strands, damaged connectors, unknown ownership, mall restrictions, poor labeling, undocumented routes, or failed test results.",
    severity: "high",
    conditions: [
      {
        field: "cabling.preferredCableType",
        operator: "equals",
        value: "fiber",
      },
    ],
    ruleTags: [
      "existing-fiber-verification",
      "fiber-testing",
      "strand-count-review",
      "ownership-review",
    ],
  },

  {
    id: "retail.firestopRisk",
    title: "Rated penetrations require approved fire stopping",
    description:
      "Tenant separations, stockroom barriers, risers, shafts, floors, mall boundaries, and rated walls may require listed firestop systems, labels, documentation, inspections, and property-specific procedures.",
    severity: "high",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "inspection-review",
      "documentation-required",
    ],
  },

  {
    id: "retail.rackCapacityRisk",
    title: "Existing rack or cabinet capacity may be insufficient",
    description:
      "Existing retail network locations may lack rack units, switch ports, PoE capacity, uplinks, power, cooling, grounding, cable management, physical security, or future expansion capacity.",
    severity: "high",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-review",
      "switch-capacity-review",
      "power-review",
      "equipment-security",
    ],
  },

  {
    id: "retail.noRackRisk",
    title: "A new secure rack or enclosure may be required",
    description:
      "A store without a suitable telecom location may require a secured rack, wall cabinet, switches, patch panels, UPS, grounding, cooling, power, and restricted employee access.",
    severity: "medium",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "new-rack-review",
      "equipment-security",
      "electrical-coordination",
      "room-readiness",
    ],
  },

  {
    id: "retail.powerRisk",
    title: "Electrical power availability is unverified",
    description:
      "Insufficient power near network racks, point-of-sale equipment, cameras, access control, displays, signage players, audio systems, exterior devices, and UPS equipment may require electrical work outside the low-voltage scope.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "power-verification-required",
      "electrical-coordination",
      "ups-review",
      "scope-boundary-review",
    ],
  },

  {
    id: "retail.networkSegmentationRisk",
    title: "Retail systems may require network isolation",
    description:
      "Combining payment, point-of-sale, employee, guest, camera, access-control, inventory, signage, audio, IoT, building-system, and vendor traffic may create security, reliability, performance, and support concerns.",
    severity: "critical",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
      {
        field: "network.vlanRequired",
        operator: "is_false",
      },
    ],
    ruleTags: [
      "retail-network-segmentation",
      "pci-coordination",
      "cybersecurity-review",
      "vlan-review",
    ],
  },

  {
    id: "retail.posVendorRisk",
    title: "Point-of-sale systems may have proprietary requirements",
    description:
      "Payment terminals, registers, self-checkout, loyalty systems, inventory platforms, pharmacy systems, and mobile point-of-sale devices may require vendor-specific cabling, network, security, power, and support.",
    severity: "critical",
    conditions: [],
    ruleTags: [
      "pos-coordination",
      "payment-system-review",
      "vendor-integration",
      "scope-boundary-review",
    ],
  },

  {
    id: "retail.posCutoverRisk",
    title: "Point-of-sale cutover may disrupt store operations",
    description:
      "Register, payment, inventory, internet, and network migrations may require blackout windows, vendor support, transaction testing, rollback procedures, after-hours work, and reopening approval.",
    severity: "critical",
    conditions: [],
    ruleTags: [
      "pos-cutover",
      "system-migration",
      "business-continuity",
      "vendor-coordination",
    ],
  },

  {
    id: "retail.guestWifiRisk",
    title: "Guest Wi-Fi may affect security and bandwidth",
    description:
      "Customer, vendor, and temporary-worker devices should be isolated from payment, business, inventory, security, pharmacy, signage, and building-system networks.",
    severity: "high",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "bandwidth-review",
      "cybersecurity-review",
    ],
  },

  {
    id: "retail.rfObstructionRisk",
    title: "Retail fixtures and equipment may disrupt wireless coverage",
    description:
      "Metal shelving, merchandise, mirrors, refrigeration, freezers, checkout equipment, elevators, stockroom racks, concrete, and seasonal displays may block or reflect wireless signals.",
    severity: "high",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "retail-fixture-review",
      "wireless-survey",
      "interference-review",
    ],
  },

  {
    id: "retail.roamingRisk",
    title: "Mobile retail workflows require validated Wi-Fi roaming",
    description:
      "Handheld scanners, tablets, mobile point-of-sale, inventory devices, phones, and curbside workflows may fail without proper authentication, cell overlap, channel planning, and device validation.",
    severity: "high",
    conditions: [
      {
        field: "wifi.weakAreas",
        operator: "is_known",
      },
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-roaming",
      "mobile-pos",
      "inventory-mobility",
      "wireless-validation",
    ],
  },

  {
    id: "retail.highDensityWifiRisk",
    title: "Peak customer traffic may require additional wireless capacity",
    description:
      "Promotions, holidays, store openings, high-density checkout areas, customer events, and large sales floors may require more access points, spectrum planning, switch capacity, and internet bandwidth.",
    severity: "high",
    conditions: [
      {
        field: "wifi.estimatedConcurrentUsers",
        operator: "greater_than_or_equal",
        value: 100,
      },
    ],
    ruleTags: [
      "high-density-wireless",
      "wifi-capacity",
      "switch-capacity-review",
      "bandwidth-review",
    ],
  },

  {
    id: "retail.cameraPrivacyRisk",
    title: "Retail camera placement may violate privacy expectations",
    description:
      "Fitting rooms, restrooms, changing areas, employee spaces, pharmacy areas, customer information, screens, and neighboring property may require exclusion, masking, signage, policy approval, or legal review.",
    severity: "critical",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-privacy",
      "employee-privacy",
      "fitting-room-restriction",
      "camera-policy-review",
    ],
  },

  {
    id: "retail.transactionCameraRisk",
    title: "Overview cameras may not capture transaction detail",
    description:
      "Wide-angle or high-mounted cameras may show checkout activity without capturing useful payment, cash, item, receipt, employee, or customer detail.",
    severity: "high",
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
      "camera-height-review",
    ],
  },

  {
    id: "retail.cameraLightingRisk",
    title: "Retail lighting may reduce camera performance",
    description:
      "Storefront glass, display cases, jewelry lighting, self-checkout screens, headlights, reflections, changing displays, and low-light stockrooms may require specialized cameras or revised placement.",
    severity: "high",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
      "display-lighting-review",
    ],
  },

  {
    id: "retail.videoRetentionRisk",
    title: "Video retention may require substantial storage",
    description:
      "Large camera counts, high resolution, continuous recording, transaction cameras, long retention, legal holds, and multi-store requirements may significantly increase storage and bandwidth needs.",
    severity: "high",
    conditions: [
      {
        field: "cameras.recordingDays",
        operator: "greater_than_or_equal",
        value: 30,
      },
    ],
    ruleTags: [
      "storage-sizing-review",
      "retention-policy-review",
      "bandwidth-review",
      "redundancy-review",
    ],
  },

  {
    id: "retail.unknownRetentionRisk",
    title: "Video retention has not been defined",
    description:
      "Without a confirmed retention policy, recorder capacity, storage pricing, recording profiles, corporate standards, and investigation requirements remain preliminary.",
    severity: "medium",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "cameras.recordingDays",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "retention-required",
      "storage-sizing-review",
      "estimate-confidence-review",
    ],
  },

  {
    id: "retail.pharmacyRisk",
    title: "Retail pharmacy areas may require enhanced security",
    description:
      "Prescription handling, controlled substances, medication storage, refrigeration, customer privacy, access logs, surveillance, alerts, and reporting may require specialized design and policy coordination.",
    severity: "critical",
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
      "camera-policy-review",
    ],
  },

  {
    id: "retail.highValueMerchandiseRisk",
    title: "High-value merchandise may require enhanced loss prevention",
    description:
      "Jewelry, electronics, luxury goods, controlled inventory, and cash-intensive areas may require dedicated camera views, access control, analytics, alarms, secure enclosures, and incident workflows.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "High-value merchandise",
          "Jewelry or luxury goods",
        ],
      },
    ],
    ruleTags: [
      "high-value-merchandise",
      "loss-prevention",
      "camera-design",
      "inventory-security",
    ],
  },

  {
    id: "retail.accessHardwareRisk",
    title: "Existing retail openings may not support proposed hardware",
    description:
      "Storefront doors, glass doors, automatic doors, roll-up doors, pharmacy doors, inventory cages, gates, cabinets, and existing frames may require specialty hardware, fabrication, or vendor coordination.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "storefront-door-review",
      "inventory-cage-review",
      "fabrication-review",
    ],
  },

  {
    id: "retail.lifeSafetyRisk",
    title: "Access-control design may affect egress and life safety",
    description:
      "Electrified locks, maglocks, automatic doors, roll-up doors, gates, controlled exits, pharmacy doors, and mall entrances may require fire-alarm interfaces, emergency release, accessibility review, inspections, and authority approval.",
    severity: "critical",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "life-safety-review",
      "egress-review",
      "fire-alarm-interface-review",
      "accessibility-review",
    ],
  },

  {
    id: "retail.accessAuditRisk",
    title: "Retail access reporting may increase system complexity",
    description:
      "Multi-store credentials, pharmacy reports, forced-door alerts, held-door alerts, vendor access, remote management, and identity integrations may require additional licensing, configuration, and administration.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-audit",
      "multi-store-management",
      "event-reporting",
      "licensing-review",
    ],
  },

  {
    id: "retail.audioCoverageRisk",
    title: "Retail audio may require multiple zones and commissioning",
    description:
      "Sales floors, stockrooms, receiving, pharmacy, fitting rooms, vestibules, exterior areas, and employee spaces may require different volume levels, speaker types, paging priorities, and controls.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "retail-audio",
      "audio-zone-review",
      "speaker-layout-review",
      "commissioning-review",
    ],
  },

  {
    id: "retail.musicLicensingRisk",
    title: "Commercial music licensing may be required",
    description:
      "Consumer music accounts may not include commercial performance rights, centralized store management, scheduling, advertising control, or multi-location administration.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "music-licensing-review",
      "commercial-audio",
      "service-subscription-review",
    ],
  },

  {
    id: "retail.digitalSignageRisk",
    title: "Digital signage may require content and corporate coordination",
    description:
      "Displays, mounts, brightness, window exposure, media players, content platforms, branding, promotions, inventory feeds, network access, licensing, and multi-store control must be coordinated.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "content-management",
      "multi-store-signage",
      "display-mounting-review",
    ],
  },

  {
    id: "retail.refrigerationRisk",
    title: "Refrigerated and freezer areas require specialty materials",
    description:
      "Low temperatures, condensation, thermal cycling, sealed panels, washdown, refrigeration equipment, and food-safety procedures may require rated cable, enclosures, seals, and controlled installation methods.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Refrigerated displays",
          "Freezer areas",
        ],
      },
    ],
    ruleTags: [
      "refrigeration-review",
      "condensation-review",
      "temperature-rating",
      "specialty-installation",
    ],
  },

  {
    id: "retail.environmentalExposureRisk",
    title: "Environmental exposure may damage standard equipment",
    description:
      "Moisture, grease, dust, chemicals, washdown, humidity, corrosion, and exterior weather may require specialty devices, cable, fittings, enclosures, seals, and mounting hardware.",
    severity: "high",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "environmental-rating-review",
      "weather-rated-equipment",
      "corrosion-review",
      "specialty-materials",
    ],
  },

  {
    id: "retail.landlordApprovalRisk",
    title: "Landlord or mall approval may be required",
    description:
      "Riser work, common-area work, storefront devices, floor coring, roof access, exterior cameras, signage, loading, fire stopping, after-hours access, and contractor rules may require property approval.",
    severity: "high",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "landlord-approval",
      "mall-coordination",
      "property-management-coordination",
      "schedule-risk",
    ],
  },

  {
    id: "retail.permitRisk",
    title: "Permit and inspection requirements are unverified",
    description:
      "Access control, fire-alarm interfaces, rated penetrations, structural mounting, floor coring, trenching, exterior work, signs, and specialty systems may require permits, engineering, inspections, or authority approval.",
    severity: "medium",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-review",
      "inspection-review",
      "engineering-review",
      "ahj-coordination",
    ],
  },

  {
    id: "retail.openingScheduleRisk",
    title: "Opening and remodel dates may compress the schedule",
    description:
      "Fixture installation, merchandising, stocking, point-of-sale cutover, carrier activation, inspections, employee training, corporate approvals, and grand opening may require larger crews, overtime, expedited freight, and phased turnover.",
    severity: "high",
    conditions: [
      {
        field: "installation.estimatedDurationDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "grand-opening",
      "store-cutover",
      "schedule-review",
      "crew-scaling",
    ],
  },

  {
    id: "retail.documentRisk",
    title: "Incomplete retail documentation may reduce estimate accuracy",
    description:
      "Missing floor plans, reflected ceiling plans, fixture plans, checkout layouts, merchandising drawings, telecom diagrams, rack elevations, door schedules, and corporate standards may cause routing and quantity changes.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "document-review",
      "walkthrough-required",
      "retail-standard-review",
      "estimate-confidence-review",
    ],
  },

  {
    id: "retail.procurementRisk",
    title: "Retail technology may have extended lead times",
    description:
      "Enterprise switches, point-of-sale peripherals, cameras, access-control hardware, displays, media players, wireless equipment, environmental devices, and specialty mounts may have long lead times or corporate substitution restrictions.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "procurement-risk",
      "lead-time-review",
      "substitution-review",
      "schedule-risk",
    ],
  },
];
import type { PlaybookAssumption } from "../playbook";

export const retailAssumptions: PlaybookAssumption[] = [
  {
    id: "retail.standardAccessAssumption",
    text:
      "Pricing assumes reasonable access to all installation areas during the agreed work schedule unless customer-facing, pharmacy, cash-handling, stockroom, receiving, mall, landlord, or restricted zones are identified.",
    conditions: [],
    ruleTags: [
      "site-access-assumption",
      "retail-access",
    ],
  },

  {
    id: "retail.operatingStoreAssumption",
    text:
      "Pricing assumes store operations can be coordinated to provide safe temporary work zones around customers, employees, merchandise, fixtures, ladders, lifts, ceilings, walls, checkout areas, and device locations.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-retail",
      "customer-safety",
      "work-zone-coordination",
      "productivity-assumption",
    ],
  },

  {
    id: "retail.standardWorkHoursAssumption",
    text:
      "Pricing assumes installation can be completed during normal business hours unless after-hours, overnight, pre-opening, mall, inventory, delivery, promotional, or shutdown restrictions are specifically required.",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-hours-assumption",
      "labor-rate-assumption",
    ],
  },

  {
    id: "retail.afterHoursAccessAssumption",
    text:
      "After-hours pricing assumes the customer, landlord, mall, or property manager will provide building access, alarm coordination, loading access, security access, lighting, utilities, keys, escorts, and an authorized onsite contact.",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "site-contact-required",
      "building-access-coordination",
    ],
  },

  {
    id: "retail.customerSafetyAssumption",
    text:
      "Pricing assumes the customer will define required barriers, aisle closures, overhead-work restrictions, customer routing, cleanup procedures, ladder controls, lift controls, and store-management approvals.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-safety-assumption",
      "work-zone-control",
      "retail-operations",
    ],
  },

  {
    id: "retail.merchandiseProtectionAssumption",
    text:
      "Pricing assumes merchandise, displays, shelving, fixtures, registers, pharmacy inventory, refrigerated products, and high-value goods can be protected or relocated by the customer as required for installation.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "merchandise-protection",
      "inventory-security",
      "customer-responsibility",
    ],
  },

  {
    id: "retail.fixtureAccessAssumption",
    text:
      "Pricing assumes checkout counters, display fixtures, shelving, millwork, gondolas, cabinets, kiosks, and other retail fixtures can be accessed without major disassembly or manufacturer-specific labor.",
    conditions: [],
    ruleTags: [
      "fixture-access-assumption",
      "retail-fixture-review",
      "scope-clarification",
    ],
  },

  {
    id: "retail.fixtureVendorAssumption",
    text:
      "Fixture disassembly, millwork modification, display reconstruction, shelving relocation, register-counter modification, refrigeration modification, and manufacturer-specific fixture labor are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "fixture-vendor-exclusion",
      "millwork-coordination",
      "scope-clarification",
    ],
  },

  {
    id: "retail.ceilingAccessAssumption",
    text:
      "Pricing assumes accessible ceiling or pathway conditions unless decorative ceilings, inaccessible soffits, exposed architectural systems, crowded plenums, pharmacy ceilings, mall boundaries, or finished customer areas are identified.",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "ceiling-access-assumption",
      "retail-pathway-review",
      "labor-review",
    ],
  },

  {
    id: "retail.pathwayAssumption",
    text:
      "Pricing assumes existing cable tray, conduit, J-hooks, sleeves, floor boxes, fixture pathways, raceway, risers, and telecom routes are usable, accessible, code-compliant, and have sufficient capacity.",
    conditions: [
      {
        field: "cabling.pathwayType",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "existing-pathway-assumption",
      "pathway-capacity-review",
      "code-compliance-review",
    ],
  },

  {
    id: "retail.newPathwayAssumption",
    text:
      "Where no existing pathway is available, preliminary pricing assumes an approved combination of supported ceiling routing, conduit, surface raceway, floor pathways, fixture feeds, sleeves, or remote enclosures.",
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
      "new-pathway-assumption",
      "raceway-review",
      "conduit-review",
      "fixture-feed-review",
    ],
  },

  {
    id: "retail.floorCoreAssumption",
    text:
      "Floor coring, poke-through installation, trenching, slab scanning, structural engineering, below-floor access, hazardous-material review, landlord approval, and occupied-space coordination are excluded unless specifically identified.",
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "floor-core-assumption",
      "structural-scan-review",
      "landlord-approval",
      "trenching-review",
    ],
  },

  {
    id: "retail.standardCeilingHeightAssumption",
    text:
      "Pricing assumes standard commercial mounting heights until actual sales-floor, stockroom, entrance, receiving, exterior, canopy, camera, access-point, speaker, and signage elevations are verified.",
    conditions: [
      {
        field: "property.ceilingHeightFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "height-assumption",
      "lift-review",
      "labor-review",
    ],
  },

  {
    id: "retail.liftAccessAssumption",
    text:
      "Pricing assumes ladders, scaffolding, and lifts can safely reach proposed locations without major fixture removal, merchandise relocation, aisle reconstruction, floor reinforcement, canopy modification, or structural changes.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-assumption",
      "customer-safety",
      "floor-protection-review",
    ],
  },

  {
    id: "retail.copperDistanceAssumption",
    text:
      "Copper network cabling is assumed to remain within standard Ethernet distance limits unless field measurements identify longer routes requiring fiber, an additional network enclosure, or a revised equipment location.",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "copper-distance-assumption",
      "fiber-review",
      "remote-enclosure-review",
    ],
  },

  {
    id: "retail.existingFiberAssumption",
    text:
      "Existing fiber is not assumed reusable until fiber type, strand availability, connector type, route, labeling, ownership, mall or landlord control, condition, and test results are verified.",
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
      "backbone-review",
    ],
  },

  {
    id: "retail.powerAvailabilityAssumption",
    text:
      "Pricing assumes suitable electrical power is available near racks, switches, firewalls, point-of-sale equipment, recorders, controllers, displays, signage players, audio equipment, access-control power supplies, and UPS systems.",
    conditions: [],
    ruleTags: [
      "power-assumption",
      "electrical-coordination",
    ],
  },

  {
    id: "retail.rackCapacityAssumption",
    text:
      "Existing racks and cabinets are not assumed to have sufficient space, switch ports, PoE capacity, power, cooling, grounding, cable management, physical security, or future capacity until verified.",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-assumption",
      "switch-capacity-review",
      "power-review",
      "equipment-security",
    ],
  },

  {
    id: "retail.networkConfigurationAssumption",
    text:
      "Pricing assumes the customer, corporate IT team, or retail technology provider will supply required IP addressing, VLANs, firewall policies, authentication, payment-network requirements, remote-access rules, cybersecurity standards, and vendor requirements before commissioning.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-coordination",
      "retail-vlan-review",
      "pci-coordination",
      "cybersecurity-coordination",
    ],
  },

  {
    id: "retail.posIntegrationAssumption",
    text:
      "Point-of-sale, payment, inventory, loyalty, pharmacy, self-checkout, curbside, ecommerce, and proprietary retail-system integration is excluded unless specific systems, interfaces, vendor responsibilities, and testing requirements are identified.",
    conditions: [],
    ruleTags: [
      "pos-integration-assumption",
      "payment-system-review",
      "vendor-integration",
      "scope-clarification",
    ],
  },

  {
    id: "retail.posCutoverAssumption",
    text:
      "Pricing assumes the customer and system vendors will define point-of-sale, payment, inventory, network, security, and store-system cutover procedures, testing, rollback plans, support contacts, and blackout periods.",
    conditions: [],
    ruleTags: [
      "pos-cutover-assumption",
      "system-migration",
      "business-continuity",
      "vendor-coordination",
    ],
  },

  {
    id: "retail.internetServiceAssumption",
    text:
      "Internet-provider service, carrier construction, public IP addresses, circuit activation, service contracts, demarcation extension, and provider fees are excluded unless specifically included.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "carrier-service-exclusion",
      "isp-coordination",
      "scope-clarification",
    ],
  },

  {
    id: "retail.guestWifiAssumption",
    text:
      "Guest Wi-Fi pricing assumes standard isolation, captive portal, bandwidth control, and firewall requirements unless custom branding, legal acceptance, analytics, loyalty integration, location services, or identity integration is requested.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi-assumption",
      "captive-portal-review",
      "customer-analytics",
      "network-segmentation",
    ],
  },

  {
    id: "retail.wifiDesignAssumption",
    text:
      "Wireless access-point quantities are preliminary until store dimensions, fixtures, shelving, refrigeration, merchandise density, customer density, device count, roaming, interference, and radio-frequency conditions are verified.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design-assumption",
      "wireless-survey",
      "retail-fixture-review",
      "access-point-count-review",
    ],
  },

  {
    id: "retail.roamingAssumption",
    text:
      "Mobile point-of-sale, scanners, tablets, phones, inventory systems, and curbside workflows are not assumed to roam reliably until device behavior, authentication, application requirements, access-point placement, and post-installation validation are confirmed.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-roaming-assumption",
      "mobile-pos",
      "inventory-mobility",
      "wireless-validation",
    ],
  },

  {
    id: "retail.cameraViewAssumption",
    text:
      "Camera quantities are preliminary until exact views, transaction objectives, privacy restrictions, mounting heights, lighting, merchandise layouts, obstructions, cable routes, analytics, and policy requirements are verified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-layout-assumption",
      "loss-prevention",
      "privacy-review",
      "walkthrough-required",
    ],
  },

  {
    id: "retail.cameraPrivacyAssumption",
    text:
      "Camera scope assumes no recording inside fitting rooms, restrooms, changing areas, or other prohibited spaces and requires customer confirmation of employee, pharmacy, customer-information, neighboring-property, and legal restrictions.",
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
    id: "retail.transactionCameraAssumption",
    text:
      "Transaction-camera pricing remains preliminary until register layout, self-checkout configuration, mounting height, target distance, desired detail, payment-device location, customer position, and point-of-sale integration requirements are verified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "transaction-verification",
      "pixel-density-review",
      "camera-height-review",
    ],
  },

  {
    id: "retail.cameraLightingAssumption",
    text:
      "Preliminary camera pricing assumes typical retail lighting unless bright storefront glass, reflective displays, jewelry lighting, self-checkout screens, low-light stockrooms, parking, infrared, or supplemental-lighting requirements are identified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-lighting-assumption",
      "wdr-review",
      "reflection-review",
      "display-lighting-review",
    ],
  },

  {
    id: "retail.videoRetentionAssumption",
    text:
      "Video storage sizing assumes continuous recording at standard resolution, frame rate, compression, and motion levels unless specific recording profiles, critical-camera groups, investigation retention, legal hold, or corporate retention policies are provided.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
      {
        field: "cameras.recordingDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "storage-sizing-assumption",
      "recording-profile-review",
      "retention-policy-review",
    ],
  },

  {
    id: "retail.accessHardwareAssumption",
    text:
      "Access-control pricing assumes existing doors, frames, storefront systems, glass doors, automatic doors, roll-up doors, gates, inventory cages, cabinets, and controlled barriers are structurally suitable for the proposed hardware unless deficiencies are identified.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-condition-assumption",
      "hardware-compatibility-review",
      "inventory-cage-review",
    ],
  },

  {
    id: "retail.lifeSafetyAssumption",
    text:
      "Access-control scope assumes all locking arrangements will be reviewed for applicable egress, fire-alarm, accessibility, occupancy, automatic-door, storefront, mall, landlord, and authority requirements before installation.",
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
    id: "retail.pharmacySecurityAssumption",
    text:
      "Pharmacy, medication-storage, prescription, controlled-substance, refrigerated-medication, camera, access-log, and reporting requirements are not assumed until customer policies, vendor requirements, legal responsibilities, and regulatory expectations are confirmed.",
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
      "pharmacy-security-assumption",
      "controlled-substance-review",
      "access-audit-review",
      "camera-policy-review",
    ],
  },

  {
    id: "retail.audioQuantityAssumption",
    text:
      "Retail audio quantities are preliminary until store dimensions, ceiling conditions, speaker type, ambient noise, required zones, paging, emergency messaging, exterior areas, and acoustic expectations are verified.",
    conditions: [],
    ruleTags: [
      "retail-audio-assumption",
      "speaker-layout-review",
      "audio-zone-review",
    ],
  },

  {
    id: "retail.musicLicensingAssumption",
    text:
      "Commercial music licensing, subscriptions, content rights, corporate music services, promotional content, and recurring provider fees are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "music-licensing-assumption",
      "commercial-audio",
      "service-subscription-review",
    ],
  },

  {
    id: "retail.digitalSignageAssumption",
    text:
      "Digital-signage quantities are preliminary until display locations, sizes, orientation, brightness, mounting, power, network, media players, content platform, user permissions, scheduling, and corporate standards are verified.",
    conditions: [],
    ruleTags: [
      "digital-signage-assumption",
      "display-mounting-review",
      "content-management-review",
    ],
  },

  {
    id: "retail.contentResponsibilityAssumption",
    text:
      "Digital-signage content creation, branding, artwork, promotional scheduling, approval workflows, product feeds, inventory integration, and corporate campaign management are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "customer-content-responsibility",
      "content-management",
      "scope-clarification",
    ],
  },

  {
    id: "retail.environmentalAssumption",
    text:
      "Standard indoor equipment and installation methods are assumed unless refrigeration, freezer temperatures, condensation, grease, moisture, washdown, dust, chemicals, corrosion, or exterior weather exposure is identified.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-environment-assumption",
      "environmental-rating-review",
      "temperature-rating",
    ],
  },

  {
    id: "retail.refrigerationAssumption",
    text:
      "Work in refrigerated and freezer environments assumes coordination for temperature transitions, condensation control, sealed penetrations, rated cable, approved mounting, equipment shutdowns, and refrigeration-vendor requirements.",
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
      "refrigeration-assumption",
      "condensation-review",
      "temperature-rating",
      "vendor-coordination",
    ],
  },

  {
    id: "retail.firestopAssumption",
    text:
      "Fire-rated penetrations are assumed to require approved firestop systems, labeling, documentation, inspections, and landlord or property-management installation standards when encountered.",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "rated-penetration",
      "documentation-required",
    ],
  },

  {
    id: "retail.permitAssumption",
    text:
      "Permit, inspection, engineering, structural scan, mall approval, landlord approval, signage approval, fire-alarm coordination, loading, security, insurance, and authority fees are excluded from preliminary pricing unless specifically identified.",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-assumption",
      "landlord-approval",
      "mall-coordination",
      "inspection-review",
    ],
  },

  {
    id: "retail.customerProvidedDocumentsAssumption",
    text:
      "Pricing assumes the customer will provide available floor plans, reflected ceiling plans, fixture plans, checkout layouts, merchandising plans, telecom drawings, rack elevations, network diagrams, door schedules, signage standards, and property rules.",
    conditions: [],
    ruleTags: [
      "document-coordination",
      "design-input-assumption",
      "retail-standard-review",
    ],
  },

  {
    id: "retail.patchAndPaintAssumption",
    text:
      "Patching, painting, ceiling repair, flooring repair, fixture repair, millwork restoration, storefront glass work, refrigeration repair, roofing repair, concrete restoration, and architectural finish work are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "finish-repair-exclusion",
      "fixture-repair-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "retail.testingAssumption",
    text:
      "Pricing assumes standard manufacturer and installation testing unless certified copper testing, fiber certification, wireless validation, camera acceptance, transaction-view verification, access-control testing, audio commissioning, signage validation, or third-party commissioning is required.",
    conditions: [],
    ruleTags: [
      "testing-assumption",
      "certification-review",
      "commissioning-review",
    ],
  },

  {
    id: "retail.procurementAssumption",
    text:
      "Equipment availability, freight, lead times, substitutions, manufacturer pricing, software licensing, corporate approvals, fixture schedules, promotional events, and opening dates remain subject to verification before final quote approval.",
    conditions: [],
    ruleTags: [
      "procurement-assumption",
      "lead-time-review",
      "price-validity",
    ],
  },
];
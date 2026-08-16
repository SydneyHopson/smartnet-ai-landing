import type { PlaybookCommonMistake } from "../playbook";

export const retailCommonMistakes: PlaybookCommonMistake[] = [
  {
    id: "retail.mistake.noWalkthrough",
    title: "Estimating without a complete retail walkthrough",
    description:
      "Skipping a detailed walkthrough can miss fixture pathways, checkout conditions, stockroom routes, customer-safety restrictions, telecom spaces, camera views, and landlord requirements.",
    prevention:
      "Walk every sales, checkout, stockroom, receiving, office, exterior, and restricted area before final pricing.",
    conditions: [],
    ruleTags: [
      "walkthrough-required",
      "retail-site-verification",
      "estimate-accuracy",
    ],
  },

  {
    id: "retail.mistake.customerSafety",
    title: "Ignoring customer-safety requirements",
    description:
      "Ladders, lifts, overhead work, tools, open ceilings, cords, drilling, and debris can create serious hazards in an operating store.",
    prevention:
      "Define barriers, aisle closures, overhead-work controls, customer routing, cleanup procedures, and store-management approvals before installation.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "customer-safety",
      "work-zone-control",
      "occupied-retail",
    ],
  },

  {
    id: "retail.mistake.merchandiseProtection",
    title: "Failing to protect merchandise and fixtures",
    description:
      "Dust, tools, ladders, lifts, cable pulls, drilling, and equipment staging can damage merchandise, displays, fixtures, checkout counters, and high-value inventory.",
    prevention:
      "Confirm protection, relocation, secure staging, employee escorts, and prohibited work areas before mobilization.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "merchandise-protection",
      "inventory-security",
      "site-logistics",
    ],
  },

  {
    id: "retail.mistake.afterHours",
    title: "Ignoring restricted retail work windows",
    description:
      "Many stores, malls, landlords, and property managers restrict disruptive work to after-hours, overnight, or pre-opening periods.",
    prevention:
      "Confirm store hours, mall access, security procedures, loading access, inventory events, holidays, and approved work windows during discovery.",
    conditions: [],
    ruleTags: [
      "after-hours",
      "mall-coordination",
      "labor-review",
    ],
  },

  {
    id: "retail.mistake.fixtureCoordination",
    title: "Not coordinating with retail fixture layouts",
    description:
      "Shelving, gondolas, checkout counters, kiosks, millwork, refrigerated cases, and seasonal displays frequently change cable routes and device locations.",
    prevention:
      "Obtain current fixture, checkout, merchandising, and millwork plans and coordinate installation sequencing with fixture vendors.",
    conditions: [],
    ruleTags: [
      "fixture-coordination",
      "retail-fixture-review",
      "installation-sequencing",
    ],
  },

  {
    id: "retail.mistake.ceilingAccess",
    title: "Assuming retail ceiling access is straightforward",
    description:
      "Decorative ceilings, soffits, open structures, crowded plenums, mall boundaries, pharmacy areas, and finished customer spaces may restrict normal installation methods.",
    prevention:
      "Inspect each area and verify ceiling access, mounting structure, approved pathways, appearance requirements, and work-zone restrictions.",
    conditions: [],
    ruleTags: [
      "ceiling-access-review",
      "retail-pathway-review",
      "walkthrough-required",
    ],
  },

  {
    id: "retail.mistake.pathwayCapacity",
    title: "Assuming existing pathways have capacity",
    description:
      "Existing conduit, sleeves, raceway, tray, floor boxes, and fixture feeds may be full, damaged, inaccessible, undocumented, or controlled by the landlord.",
    prevention:
      "Inspect pathway condition, fill, ownership, accessibility, continuity, fire rating, and support before relying on existing infrastructure.",
    conditions: [],
    ruleTags: [
      "pathway-capacity-review",
      "landlord-approval",
      "existing-infrastructure",
    ],
  },

  {
    id: "retail.mistake.floorCore",
    title: "Underestimating floor coring and trenching",
    description:
      "Checkout feeds, floor boxes, poke-throughs, slab penetrations, fixture feeds, and trenches may require scanning, engineering, fire stopping, restoration, and occupied-area coordination.",
    prevention:
      "Confirm structural requirements, landlord approval, slab scans, below-floor conditions, work windows, restoration responsibility, and inspection requirements.",
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
    ],
  },

  {
    id: "retail.mistake.copperDistance",
    title: "Ignoring copper distance limitations",
    description:
      "Large stores, parking areas, loading zones, remote enclosures, detached spaces, and mall pathways can exceed Ethernet distance limits.",
    prevention:
      "Measure actual installed pathways and use fiber or remote network equipment where copper distance limits are exceeded.",
    conditions: [],
    ruleTags: [
      "copper-distance-review",
      "fiber-review",
      "remote-enclosure-review",
    ],
  },

  {
    id: "retail.mistake.existingFiber",
    title: "Assuming existing fiber is reusable",
    description:
      "Existing fiber may have the wrong type, insufficient strands, incompatible connectors, failed test results, undocumented routes, or landlord ownership restrictions.",
    prevention:
      "Inspect, document, test, and confirm ownership of all existing fiber before including it in the final design.",
    conditions: [],
    ruleTags: [
      "fiber-testing",
      "existing-infrastructure",
      "ownership-review",
    ],
  },

  {
    id: "retail.mistake.rackCapacity",
    title: "Assuming rack and cabinet capacity exists",
    description:
      "Retail telecom locations often lack rack space, switch ports, PoE capacity, cooling, power, cable management, physical security, or expansion room.",
    prevention:
      "Inspect every rack and cabinet and document available rack units, ports, PoE budget, uplinks, power, cooling, security, and growth capacity.",
    conditions: [],
    ruleTags: [
      "rack-capacity-review",
      "switch-capacity-review",
      "equipment-security",
    ],
  },

  {
    id: "retail.mistake.power",
    title: "Assuming electrical power is available",
    description:
      "Point-of-sale equipment, network racks, cameras, access control, signage, audio, refrigeration-area devices, and UPS systems may require new electrical work.",
    prevention:
      "Verify power, circuits, receptacles, grounding, UPS requirements, emergency power, and electrical responsibilities during the walkthrough.",
    conditions: [],
    ruleTags: [
      "power-verification",
      "electrical-coordination",
      "ups-review",
    ],
  },

  {
    id: "retail.mistake.networkSegmentation",
    title: "Combining payment and business systems",
    description:
      "Payment, point-of-sale, employee, guest, camera, inventory, signage, access-control, IoT, and vendor systems may have different security and reliability requirements.",
    prevention:
      "Coordinate with retail IT and vendors to define VLANs, firewall policies, access rules, authentication, logging, and support boundaries.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-network-segmentation",
      "pci-coordination",
      "cybersecurity-review",
    ],
  },

  {
    id: "retail.mistake.posIntegration",
    title: "Assuming point-of-sale systems are openly compatible",
    description:
      "Registers, payment terminals, self-checkout, loyalty, inventory, ecommerce, curbside, and pharmacy systems may use proprietary hardware, cabling, network, and support requirements.",
    prevention:
      "Identify system vendors, supported interfaces, ownership, licenses, testing responsibilities, and cutover procedures before quoting integration.",
    conditions: [],
    ruleTags: [
      "pos-coordination",
      "payment-system-review",
      "vendor-integration",
    ],
  },

  {
    id: "retail.mistake.posCutover",
    title: "Underestimating point-of-sale cutover risk",
    description:
      "Failed register, payment, network, or inventory migrations can prevent transactions and delay store opening.",
    prevention:
      "Define the cutover window, vendor participation, transaction testing, rollback procedures, support contacts, blackout periods, and reopening approval.",
    conditions: [],
    ruleTags: [
      "pos-cutover",
      "system-migration",
      "business-continuity",
    ],
  },

  {
    id: "retail.mistake.wifiDensity",
    title: "Underestimating retail wireless demand",
    description:
      "Customer devices, handheld scanners, mobile point-of-sale, tablets, inventory systems, cameras, signage, IoT devices, and peak events can create heavy wireless demand.",
    prevention:
      "Perform predictive design, verify device counts and traffic types, and complete onsite wireless validation.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "wireless-survey",
    ],
  },

  {
    id: "retail.mistake.rfObstructions",
    title: "Ignoring shelving and merchandise as RF obstacles",
    description:
      "Metal shelving, stocked racks, mirrors, refrigeration, freezers, display cases, elevators, concrete, and seasonal merchandise can significantly alter wireless coverage.",
    prevention:
      "Evaluate realistic store conditions and validate Wi-Fi after fixtures and merchandise are installed.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "retail-fixture-review",
      "wireless-validation",
    ],
  },

  {
    id: "retail.mistake.roaming",
    title: "Failing to validate mobile-device roaming",
    description:
      "Handheld scanners, mobile point-of-sale, tablets, inventory devices, and curbside workflows may disconnect while moving through the store.",
    prevention:
      "Validate authentication, channel design, cell overlap, power levels, client compatibility, and application behavior using actual retail devices.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retail-roaming",
      "mobile-pos",
      "inventory-mobility",
    ],
  },

  {
    id: "retail.mistake.cameraPrivacy",
    title: "Ignoring retail privacy restrictions",
    description:
      "Improper camera placement near fitting rooms, restrooms, changing areas, pharmacy counters, employee spaces, screens, or customer information may create serious policy and legal concerns.",
    prevention:
      "Confirm prohibited views, masking, signage, employee policies, customer privacy, pharmacy restrictions, and legal review before final placement.",
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
    id: "retail.mistake.transactionCamera",
    title: "Using overview cameras for transaction verification",
    description:
      "High or wide-angle cameras may show register activity but fail to capture useful cash, item, receipt, employee, or customer detail.",
    prevention:
      "Define the transaction objective and verify mounting height, target distance, lens, pixel density, lighting, and framing at each register area.",
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
    id: "retail.mistake.cameraLighting",
    title: "Ignoring difficult retail lighting",
    description:
      "Storefront glass, reflections, jewelry lighting, self-checkout screens, bright displays, headlights, and dim stockrooms can reduce usable video quality.",
    prevention:
      "Inspect lighting conditions and select appropriate WDR, low-light, infrared, exposure, mounting, and lens configurations.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wdr-review",
      "low-light-review",
      "reflection-review",
    ],
  },

  {
    id: "retail.mistake.videoRetention",
    title: "Sizing storage before confirming retention",
    description:
      "Transaction cameras, entrances, pharmacy, parking, high-value areas, and investigation footage may require different recording profiles and retention periods.",
    prevention:
      "Confirm camera groups, resolution, frame rate, recording mode, compression, retention, redundancy, legal hold, and corporate standards before sizing storage.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "retention-policy-review",
      "storage-sizing",
      "recording-profile-review",
    ],
  },

  {
    id: "retail.mistake.accessHardware",
    title: "Quoting access control without surveying openings",
    description:
      "Storefront doors, glass doors, automatic doors, roll-up doors, gates, pharmacy doors, cages, cabinets, and existing frames may require specialty hardware.",
    prevention:
      "Inspect both sides of every opening and document hardware, frame, egress, closer, power transfer, interfaces, mounting, and pathway conditions.",
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
    ],
  },

  {
    id: "retail.mistake.lifeSafety",
    title: "Ignoring life-safety and accessibility requirements",
    description:
      "Electrified locks, maglocks, automatic doors, roll-up doors, gates, pharmacy doors, and controlled exits may require specialized release and approval.",
    prevention:
      "Review egress, emergency release, fire-alarm interfaces, accessibility, occupancy, mall requirements, landlord rules, and authority approval.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "life-safety-review",
      "egress-review",
      "accessibility-review",
    ],
  },

  {
    id: "retail.mistake.pharmacy",
    title: "Underestimating retail pharmacy security",
    description:
      "Pharmacy areas may require controlled access, cabinet monitoring, camera restrictions, customer privacy, audit logs, alerts, refrigeration considerations, and specialized reporting.",
    prevention:
      "Confirm pharmacy policy, controlled openings, credentials, audit requirements, surveillance restrictions, refrigeration, event retention, and vendor responsibilities.",
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
    id: "retail.mistake.refrigeration",
    title: "Using standard materials in refrigerated areas",
    description:
      "Low temperatures, condensation, thermal cycling, sealed panels, washdown, and refrigeration equipment can damage standard cable, devices, connectors, and enclosures.",
    prevention:
      "Use appropriately rated cable, enclosures, fittings, seals, mounting hardware, and controlled installation methods.",
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
      "temperature-rating",
      "condensation-review",
    ],
  },

  {
    id: "retail.mistake.environmentalRating",
    title: "Ignoring environmental exposure",
    description:
      "Moisture, grease, washdown, chemicals, dust, corrosion, humidity, and exterior weather can cause premature equipment and cable failure.",
    prevention:
      "Verify environmental conditions and specify properly rated devices, cable, seals, fittings, enclosures, and mounting hardware.",
    conditions: [],
    ruleTags: [
      "environmental-rating-review",
      "weather-rated-equipment",
      "specialty-materials",
    ],
  },

  {
    id: "retail.mistake.audioZones",
    title: "Treating the entire store as one audio zone",
    description:
      "Sales floors, stockrooms, receiving, pharmacy, fitting rooms, vestibules, employee areas, and exterior spaces may need different volume, content, paging, and operating schedules.",
    prevention:
      "Define zones, speaker types, sound levels, paging priorities, schedules, controls, and commissioning requirements before equipment selection.",
    conditions: [],
    ruleTags: [
      "retail-audio",
      "audio-zone-review",
      "speaker-layout-review",
    ],
  },

  {
    id: "retail.mistake.musicLicensing",
    title: "Using consumer music services in a retail business",
    description:
      "Consumer streaming accounts may not include commercial performance rights, centralized administration, promotional scheduling, or multi-store management.",
    prevention:
      "Confirm commercial music licensing, provider requirements, subscriptions, content rights, and corporate standards.",
    conditions: [],
    ruleTags: [
      "music-licensing-review",
      "commercial-audio",
      "service-subscription-review",
    ],
  },

  {
    id: "retail.mistake.digitalSignage",
    title: "Installing signage without a content plan",
    description:
      "Displays may remain unused or inconsistent when content creation, approvals, scheduling, branding, user access, and multi-store management are undefined.",
    prevention:
      "Confirm display purpose, content source, ownership, platform, permissions, scheduling, brightness, orientation, power, network, and support.",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "content-management",
      "multi-store-signage",
    ],
  },

  {
    id: "retail.mistake.landlordApproval",
    title: "Starting work before landlord or mall approval",
    description:
      "Floor coring, riser work, exterior devices, storefront work, common-area work, signs, loading, fire stopping, and after-hours access may require prior approval.",
    prevention:
      "Confirm property rules, insurance, contractor registration, loading, security, work hours, drawings, permits, inspections, and closeout requirements.",
    conditions: [],
    ruleTags: [
      "landlord-approval",
      "mall-coordination",
      "property-management-coordination",
    ],
  },

  {
    id: "retail.mistake.openingSchedule",
    title: "Underestimating grand-opening schedule pressure",
    description:
      "Fixture installation, merchandising, stocking, inspections, carrier activation, register cutover, employee training, and corporate approval often converge near opening.",
    prevention:
      "Build a coordinated schedule with procurement milestones, dependencies, testing, commissioning, contingency, vendor support, and phased turnover.",
    conditions: [],
    ruleTags: [
      "grand-opening",
      "store-cutover",
      "schedule-review",
    ],
  },

  {
    id: "retail.mistake.documentation",
    title: "Delivering incomplete retail documentation",
    description:
      "Missing cable labels, rack elevations, camera views, access-control schedules, device inventories, network diagrams, and test results makes future support difficult.",
    prevention:
      "Include complete as-built documentation, testing records, configuration references, warranties, photos, and device schedules.",
    conditions: [],
    ruleTags: [
      "documentation",
      "closeout",
      "serviceability",
    ],
  },

  {
    id: "retail.mistake.futureGrowth",
    title: "Designing only for current store requirements",
    description:
      "Retail stores frequently add registers, cameras, signs, kiosks, access points, sensors, fixtures, pickup workflows, and new vendor systems.",
    prevention:
      "Reserve rack space, switch ports, PoE capacity, fiber strands, pathway capacity, storage, licenses, and spare cabling.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "retail-growth",
    ],
  },
];
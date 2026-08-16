import type { PlaybookRisk } from "../playbook";

export const officeRisks: PlaybookRisk[] = [
  {
    id: "office.activeOperationsRisk",
    title: "Active office operations may reduce installation productivity",
    description:
      "Employees, meetings, customer activity, executive schedules, shared spaces, and business-critical work may require phased installation, protected work zones, repeated mobilization, or after-hours work.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "office-operations",
      "productivity-review",
      "work-zone-coordination",
    ],
  },

  {
    id: "office.afterHoursRisk",
    title: "Restricted work windows may increase cost and duration",
    description:
      "After-hours, weekend, shutdown, meeting-free, tenant-approved, or building-approved work may increase labor rates, mobilizations, supervision, access coordination, and project duration.",
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
    id: "office.noiseRestrictionRisk",
    title: "Noise restrictions may reduce installation productivity",
    description:
      "Calls, meetings, executive activity, legal proceedings, training, customer service, and shared tenant environments may restrict drilling, coring, lift use, and other noisy work.",
    severity: "high",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "noise-restriction",
      "drilling-window",
      "productivity-review",
      "tenant-coordination",
    ],
  },

  {
    id: "office.unknownCeilingRisk",
    title: "Ceiling conditions have not been verified",
    description:
      "Unknown ceiling type, height, access, congestion, architectural features, and mounting surfaces can materially change pathway design, ladder or lift requirements, patching, and labor.",
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
    id: "office.highCeilingRisk",
    title: "Elevated mounting locations require specialized access",
    description:
      "High lobbies, atriums, open ceilings, training rooms, exterior walls, parking areas, and architectural spaces may require lifts, scaffolding, additional crew members, and floor protection.",
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
      "floor-protection-review",
    ],
  },

  {
    id: "office.noPathwayRisk",
    title: "No usable cable pathway has been confirmed",
    description:
      "A lack of accessible ceiling space, conduit, sleeves, floor pathways, furniture pathways, or cable supports may require new conduit, raceway, coring, floor boxes, fire stopping, or revised device locations.",
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
      "floor-pathway-review",
    ],
  },

  {
    id: "office.unknownPathwayRisk",
    title: "Cable pathway conditions are unknown",
    description:
      "Unknown pathway capacity, accessibility, routing, tenant boundaries, furniture integration, fire ratings, and support conditions may significantly affect labor and materials.",
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
    id: "office.floorCoreRisk",
    title: "Floor coring and poke-through work may require specialty coordination",
    description:
      "New floor boxes, poke-throughs, slab penetrations, raised-floor routes, and furniture feeds may require scanning, engineering, landlord approval, fire stopping, after-hours work, and coordination with occupied floors below.",
    severity: "high",
    conditions: [
      {
        field: "cabling.trenchingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "floor-core-review",
      "structural-scan-review",
      "landlord-approval",
      "tenant-coordination",
    ],
  },

  {
    id: "office.furnitureCoordinationRisk",
    title: "Furniture systems may alter cable routes and quantities",
    description:
      "Cubicles, benching systems, modular furniture, sit-stand desks, power poles, floor feeds, and furniture changes may affect cable lengths, outlet locations, installation sequencing, and access.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "furniture-coordination",
      "modular-furniture",
      "installation-sequencing",
      "change-order-risk",
    ],
  },

  {
    id: "office.longCableRunRisk",
    title: "Cable distance may exceed copper Ethernet limits",
    description:
      "Long routes between floors, telecom rooms, suites, exterior areas, parking locations, or remote workspaces may require fiber, an additional telecom room, or a remote enclosure.",
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
      "idf-review",
      "distance-limitation",
    ],
  },

  {
    id: "office.unknownCableDistanceRisk",
    title: "Cable-route distances have not been measured",
    description:
      "Unknown pathway distances may conceal copper distance violations, underestimated cable quantities, additional telecom-space requirements, or fiber-backbone needs.",
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
    id: "office.existingFiberRisk",
    title: "Existing fiber may not be reusable",
    description:
      "Existing fiber may have incompatible type, insufficient strands, damaged connectors, unknown ownership, poor labeling, undocumented routes, or failed test results.",
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
      "connector-review",
    ],
  },

  {
    id: "office.firestopRisk",
    title: "Rated penetrations require approved fire stopping",
    description:
      "Tenant separations, corridors, shafts, floors, risers, and rated walls may require listed firestop systems, labels, documentation, inspections, and building-specific procedures.",
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
    id: "office.rackCapacityRisk",
    title: "Existing rack capacity may be insufficient",
    description:
      "Existing racks may lack rack units, switch ports, PoE capacity, uplink capacity, power, cooling, grounding, cable management, physical security, or room for future growth.",
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
      "cooling-review",
    ],
  },

  {
    id: "office.noRackRisk",
    title: "A new rack or network enclosure may be required",
    description:
      "An office without a suitable telecom rack may require a secured enclosure, patch panels, cable management, switches, UPS, grounding, power, cooling, and physical access controls.",
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
    id: "office.powerRisk",
    title: "Electrical power availability is unverified",
    description:
      "Insufficient power near racks, switches, firewalls, recorders, controllers, displays, conferencing systems, scheduling panels, amplifiers, and UPS equipment may require electrical work outside the low-voltage scope.",
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
    id: "office.networkSegmentationRisk",
    title: "Office systems may require network isolation",
    description:
      "Combining employee, guest, voice, camera, access-control, audiovisual, printer, IoT, building-system, and vendor traffic may create cybersecurity, reliability, performance, and support concerns.",
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
      "office-network-segmentation",
      "iot-isolation",
      "cybersecurity-review",
      "vlan-review",
    ],
  },

  {
    id: "office.guestWifiRisk",
    title: "Guest Wi-Fi may affect security and bandwidth",
    description:
      "Visitor, vendor, client, and temporary-worker devices should be isolated from employee, voice, security, audiovisual, printer, and business networks.",
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
    id: "office.rfObstructionRisk",
    title: "Office construction may disrupt wireless coverage",
    description:
      "Concrete, glass, metal partitions, elevators, acoustic materials, movable walls, dense furniture, neighboring wireless systems, and high-density rooms may block or reflect wireless signals.",
    severity: "high",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rf-obstruction-review",
      "wireless-survey",
      "interference-review",
      "access-point-density-review",
    ],
  },

  {
    id: "office.roamingRisk",
    title: "Mobile office workflows require validated Wi-Fi roaming",
    description:
      "Voice devices, laptops, tablets, conferencing systems, and hybrid workers may experience dropped sessions without proper authentication, cell overlap, channel planning, power levels, and device validation.",
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
      "wifi-roaming",
      "voice-over-wifi",
      "wireless-validation",
      "device-compatibility-review",
    ],
  },

  {
    id: "office.highDensityWifiRisk",
    title: "High-density offices may require additional wireless capacity",
    description:
      "Call centers, training rooms, conference spaces, coworking areas, town halls, and dense open offices may require more access points, additional spectrum planning, higher-capacity switching, and greater internet bandwidth.",
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
    id: "office.cameraPrivacyRisk",
    title: "Office surveillance may create privacy and policy concerns",
    description:
      "Private offices, human-resources areas, legal departments, executive spaces, employee workstations, screens, whiteboards, wellness rooms, and break areas may require exclusions, masking, signage, or policy review.",
    severity: "critical",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "employee-privacy",
      "camera-restrictions",
      "confidential-information-review",
      "policy-review",
    ],
  },

  {
    id: "office.lowLightCameraRisk",
    title: "Lighting conditions may reduce camera performance",
    description:
      "Bright glass entrances, reflective lobbies, dim hallways, parking areas, exterior nighttime conditions, and headlights may require specialized cameras or revised placement.",
    severity: "high",
    conditions: [
      {
        field: "assessment.risks",
        operator: "includes",
        value: [
          "low light",
          "bright glass",
          "headlights",
          "reflections",
          "backlighting",
        ],
      },
    ],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
      "infrared-review",
    ],
  },

  {
    id: "office.videoRetentionRisk",
    title: "Video retention may require substantial storage",
    description:
      "Large camera counts, high resolution, continuous recording, long retention, legal-hold requirements, and critical-area redundancy may significantly increase recorder, storage, and bandwidth requirements.",
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
    id: "office.unknownRetentionRisk",
    title: "Video retention has not been defined",
    description:
      "Without a confirmed retention target, recorder capacity, storage pricing, recording profiles, and legal-hold requirements remain preliminary.",
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
    id: "office.accessHardwareRisk",
    title: "Existing openings may not support proposed access hardware",
    description:
      "Glass doors, automatic doors, elevators, turnstiles, storefront doors, gates, hollow-metal frames, and wood doors may require specialty hardware, fabrication, or vendor coordination.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-hardware-review",
      "automatic-door-review",
      "elevator-integration-review",
      "fabrication-review",
    ],
  },

  {
    id: "office.lifeSafetyRisk",
    title: "Access-control design may affect egress and life safety",
    description:
      "Electrified locks, maglocks, delayed egress, automatic doors, elevators, turnstiles, gates, and controlled exits may require fire-alarm interfaces, emergency release, accessibility review, inspections, and authority approval.",
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
    id: "office.identityIntegrationRisk",
    title: "Identity and visitor integrations may increase complexity",
    description:
      "Directory services, human-resources systems, single sign-on, visitor management, tenant systems, credential lifecycle, and mobile access may require additional licensing, APIs, configuration, testing, and vendor coordination.",
    severity: "high",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "identity-integration-review",
      "visitor-management",
      "licensing-review",
      "vendor-integration",
    ],
  },

  {
    id: "office.conferencePlatformRisk",
    title: "Conference systems may have platform and licensing dependencies",
    description:
      "Microsoft Teams Rooms, Zoom Rooms, Webex, Google Meet, SIP, and bring-your-own-device workflows may require specific hardware, accounts, licenses, room resources, security policies, and administrative ownership.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "collaboration-platform",
      "licensing-review",
      "customer-it-coordination",
      "compatibility-review",
    ],
  },

  {
    id: "office.acousticRisk",
    title: "Poor room acoustics may reduce conferencing quality",
    description:
      "Glass walls, open ceilings, hard surfaces, movable partitions, HVAC noise, long rooms, and background conversations can reduce microphone clarity, intelligibility, privacy, and meeting quality.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "acoustic-review",
      "conference-audio",
      "speech-privacy",
      "dsp-review",
    ],
  },

  {
    id: "office.avFurnitureRisk",
    title: "Conference-room furniture may affect audiovisual design",
    description:
      "Table shape, cable access, display walls, credenzas, blocking, power, floor boxes, movable partitions, and furniture schedules may change equipment placement, cable quantities, and installation sequencing.",
    severity: "high",
    conditions: [],
    ruleTags: [
      "av-furniture-coordination",
      "display-blocking-review",
      "table-connectivity",
      "installation-sequencing",
    ],
  },

  {
    id: "office.soundMaskingRisk",
    title: "Sound masking requires proper zoning and commissioning",
    description:
      "Incorrect emitter spacing, zoning, plenum assumptions, tuning, or coverage may create uneven sound levels and fail to improve speech privacy.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "sound-masking",
      "speech-privacy",
      "commissioning-review",
      "acoustic-design",
    ],
  },

  {
    id: "office.roomSchedulingRisk",
    title: "Room and desk scheduling may require platform integration",
    description:
      "Scheduling panels, room resources, desk booking, calendar platforms, authentication, occupancy sensors, licensing, and tenant administration may require coordinated configuration and support.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "room-scheduling",
      "calendar-integration",
      "licensing-review",
      "occupancy-sensing",
    ],
  },

  {
    id: "office.digitalSignageRisk",
    title: "Digital signage may require content and network coordination",
    description:
      "Displays, mounts, media players, content platforms, orientation, brightness, network access, power, branding, approvals, and content ownership must be coordinated before deployment.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "content-management",
      "network-coordination",
      "display-mounting-review",
    ],
  },

  {
    id: "office.landlordApprovalRisk",
    title: "Landlord or property-management approval may be required",
    description:
      "Riser work, telecom-room access, exterior devices, floor coring, roof access, common-area work, conduit, fire stopping, after-hours work, and loading access may require building approval.",
    severity: "high",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "landlord-approval",
      "property-management-coordination",
      "schedule-risk",
      "building-standard-review",
    ],
  },

  {
    id: "office.permitRisk",
    title: "Permit and inspection requirements are unverified",
    description:
      "Access control, fire-alarm interfaces, rated penetrations, structural mounting, floor coring, exterior work, and specialty systems may require permits, engineering, inspections, or authority approval.",
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
    id: "office.moveInScheduleRisk",
    title: "Move-in and cutover dates may compress the schedule",
    description:
      "Furniture delivery, employee moves, carrier activation, network cutover, conference-room commissioning, access credentialing, training, and occupancy may require larger crews, overtime, expedited freight, and phased turnover.",
    severity: "high",
    conditions: [
      {
        field: "installation.estimatedDurationDays",
        operator: "is_known",
      },
    ],
    ruleTags: [
      "move-in-date",
      "system-cutover",
      "schedule-review",
      "crew-scaling",
    ],
  },

  {
    id: "office.documentRisk",
    title: "Incomplete project documentation may reduce estimate accuracy",
    description:
      "Missing floor plans, reflected ceiling plans, furniture plans, telecom drawings, rack elevations, door schedules, audiovisual standards, and building rules may lead to routing, quantity, and coordination changes.",
    severity: "medium",
    conditions: [],
    ruleTags: [
      "document-review",
      "walkthrough-required",
      "building-standard-review",
      "estimate-confidence-review",
    ],
  },

  {
    id: "office.procurementRisk",
    title: "Equipment availability may affect the project schedule",
    description:
      "Enterprise switches, access-control hardware, conference systems, displays, cameras, wireless equipment, scheduling panels, and specialty mounts may have extended lead times or substitution restrictions.",
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
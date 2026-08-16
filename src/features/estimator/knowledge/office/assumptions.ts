import type { PlaybookAssumption } from "../playbook";

export const officeAssumptions: PlaybookAssumption[] = [
  {
    id: "office.standardAccessAssumption",
    text:
      "Pricing assumes reasonable access to all installation areas during the agreed work schedule unless executive, secure, occupied, tenant, customer-facing, or restricted zones are identified.",
    conditions: [],
    ruleTags: [
      "site-access-assumption",
      "office-access",
    ],
  },

  {
    id: "office.operatingFacilityAssumption",
    text:
      "Pricing assumes office operations can be coordinated to provide safe temporary work zones around desks, furniture, ladders, lifts, ceilings, walls, telecom rooms, and device locations.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "work-zone-coordination",
      "productivity-assumption",
    ],
  },

  {
    id: "office.standardWorkHoursAssumption",
    text:
      "Pricing assumes installation can be completed during normal business hours unless after-hours, weekend, shutdown, meeting, tenant, or building-access restrictions are specifically required.",
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
    id: "office.afterHoursAccessAssumption",
    text:
      "After-hours pricing assumes the customer or property manager will provide building access, elevator access, alarm coordination, security access, loading access, lighting, utilities, and an authorized contact.",
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
    id: "office.noiseRestrictionAssumption",
    text:
      "Pricing assumes standard drilling and installation activity is permitted during the agreed work schedule unless quiet hours, executive meetings, calls, training, legal proceedings, or customer-service restrictions are identified.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "noise-assumption",
      "drilling-window-review",
      "productivity-assumption",
    ],
  },

  {
    id: "office.furnitureAccessAssumption",
    text:
      "Pricing assumes desks, cubicles, modular furniture, cabinets, displays, and other furnishings can be accessed or temporarily moved as required for cabling and device installation.",
    conditions: [],
    ruleTags: [
      "furniture-access-assumption",
      "modular-furniture",
      "workspace-coordination",
    ],
  },

  {
    id: "office.furnitureVendorAssumption",
    text:
      "Furniture disassembly, reconfiguration, modification, power-pole work, and manufacturer-specific furniture labor are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "furniture-vendor-exclusion",
      "scope-clarification",
      "trade-coordination",
    ],
  },

  {
    id: "office.ceilingAccessAssumption",
    text:
      "Pricing assumes accessible ceiling or pathway conditions unless finished ceilings, sealed soffits, inaccessible architectural features, congested plenums, or restricted spaces are identified.",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "ceiling-access-assumption",
      "pathway-review",
      "labor-review",
    ],
  },

  {
    id: "office.pathwayAssumption",
    text:
      "Pricing assumes existing cable tray, conduit, J-hooks, sleeves, floor pathways, furniture pathways, and telecom routes are usable, accessible, code-compliant, and have sufficient capacity.",
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
    id: "office.newPathwayAssumption",
    text:
      "Where no existing pathway is available, preliminary pricing assumes an approved combination of supported ceiling routing, conduit, surface raceway, floor pathways, or furniture feeds.",
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
      "floor-pathway-review",
    ],
  },

  {
    id: "office.floorCoreAssumption",
    text:
      "Floor coring, poke-through installation, slab scanning, structural engineering, below-floor access, asbestos review, and landlord approval are excluded unless specifically identified.",
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
    ],
  },

  {
    id: "office.standardCeilingHeightAssumption",
    text:
      "Pricing assumes standard office mounting heights until actual ceiling, atrium, lobby, exterior, parking, display, speaker, camera, and access-point elevations are verified.",
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
    id: "office.liftAccessAssumption",
    text:
      "Pricing assumes ladders, scaffolding, or lifts can safely reach proposed installation areas without removal of permanent furniture, architectural features, partitions, displays, or other obstructions.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-assumption",
      "obstruction-review",
      "floor-protection-review",
    ],
  },

  {
    id: "office.copperDistanceAssumption",
    text:
      "Copper network cabling is assumed to remain within standard Ethernet distance limits unless field measurements identify longer routes requiring fiber, an additional telecom room, or a remote enclosure.",
    conditions: [
      {
        field: "cabling.estimatedCableFeet",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "copper-distance-assumption",
      "fiber-review",
      "idf-review",
    ],
  },

  {
    id: "office.existingFiberAssumption",
    text:
      "Existing fiber is not assumed reusable until fiber type, strand availability, connector type, route, ownership, labeling, condition, and test results are verified.",
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
    id: "office.powerAvailabilityAssumption",
    text:
      "Pricing assumes suitable electrical power is available near racks, switches, firewalls, recorders, controllers, displays, conferencing systems, scheduling panels, amplifiers, and UPS equipment.",
    conditions: [],
    ruleTags: [
      "power-assumption",
      "electrical-coordination",
    ],
  },

  {
    id: "office.rackCapacityAssumption",
    text:
      "Existing racks and telecom rooms are not assumed to have sufficient space, switch ports, PoE capacity, power, cooling, grounding, cable management, physical security, or future capacity until verified.",
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
      "cooling-review",
    ],
  },

  {
    id: "office.networkConfigurationAssumption",
    text:
      "Pricing assumes the customer or IT provider will supply required IP addressing, VLANs, firewall rules, authentication, voice requirements, cybersecurity standards, remote-access rules, and vendor requirements before commissioning.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-coordination",
      "vlan-review",
      "cybersecurity-coordination",
      "it-coordination",
    ],
  },

  {
    id: "office.internetServiceAssumption",
    text:
      "Internet-provider service, carrier construction, public IP addressing, circuit activation, service contracts, demarcation extension, and provider fees are excluded unless specifically included.",
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
    id: "office.guestWifiAssumption",
    text:
      "Guest Wi-Fi pricing assumes standard network isolation, captive portal, bandwidth control, and firewall requirements unless custom branding, sponsorship, legal acceptance, analytics, or identity integration is requested.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi-assumption",
      "captive-portal-review",
      "network-segmentation",
    ],
  },

  {
    id: "office.wifiDesignAssumption",
    text:
      "Wireless access-point quantities are preliminary until dimensions, wall construction, glass, furniture, occupancy, device density, roaming, interference, and radio-frequency conditions are verified.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-design-assumption",
      "wireless-survey",
      "access-point-count-review",
    ],
  },

  {
    id: "office.roamingAssumption",
    text:
      "Seamless wireless roaming is not guaranteed until client-device behavior, authentication, application requirements, access-point placement, channel design, and post-installation validation are confirmed.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "roaming-assumption",
      "device-compatibility-review",
      "wireless-validation",
    ],
  },

  {
    id: "office.cameraViewAssumption",
    text:
      "Camera quantities are preliminary until exact views, privacy restrictions, mounting heights, lighting, identification objectives, obstructions, policy requirements, and cable routes are verified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-layout-assumption",
      "privacy-review",
      "walkthrough-required",
    ],
  },

  {
    id: "office.cameraPrivacyAssumption",
    text:
      "Camera scope assumes the customer will identify all employee, legal, union, confidential-information, human-resources, executive, and workplace-policy restrictions before final design.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "employee-privacy",
      "camera-policy-review",
      "confidential-information-review",
    ],
  },

  {
    id: "office.cameraLightingAssumption",
    text:
      "Preliminary camera pricing assumes typical office lighting unless low-light, backlight, reflective glass, parking, infrared, or supplemental-lighting requirements are identified.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "camera-lighting-assumption",
      "low-light-review",
      "wdr-review",
    ],
  },

  {
    id: "office.videoRetentionAssumption",
    text:
      "Video storage sizing assumes continuous recording at standard resolution, frame rate, compression, and motion levels unless specific recording profiles, retention groups, or legal-hold requirements are provided.",
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
    id: "office.accessHardwareAssumption",
    text:
      "Access-control pricing assumes existing doors, frames, elevators, turnstiles, gates, glass doors, automatic doors, and controlled barriers are structurally suitable for the proposed hardware unless deficiencies are identified.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "door-condition-assumption",
      "hardware-compatibility-review",
      "controlled-barrier-review",
    ],
  },

  {
    id: "office.lifeSafetyAssumption",
    text:
      "Access-control scope assumes all locking arrangements will be reviewed for applicable egress, fire-alarm, accessibility, occupancy, elevator, turnstile, landlord, and authority requirements before installation.",
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
    id: "office.identityIntegrationAssumption",
    text:
      "Identity-provider, directory, human-resources, visitor-management, tenant, single-sign-on, and credential-lifecycle integrations are excluded unless specifically identified and included.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "identity-integration-assumption",
      "visitor-management-review",
      "scope-clarification",
    ],
  },

  {
    id: "office.conferenceRoomQuantityAssumption",
    text:
      "Conference-room equipment quantities are preliminary until room dimensions, seating, furniture, platform, display, camera, microphone, speaker, control, acoustic, and scheduling requirements are verified.",
    conditions: [],
    ruleTags: [
      "conference-room-assumption",
      "av-design-review",
      "room-verification",
    ],
  },

  {
    id: "office.avPlatformAssumption",
    text:
      "Conference-system pricing assumes the customer will confirm Microsoft Teams, Zoom, Webex, Google Meet, SIP, bring-your-own-device, licensing, account, and administrative requirements.",
    conditions: [],
    ruleTags: [
      "collaboration-platform-assumption",
      "licensing-review",
      "customer-it-coordination",
    ],
  },

  {
    id: "office.avFurnitureAssumption",
    text:
      "Display blocking, furniture reinforcement, millwork modification, table cutouts, custom credenzas, display recesses, and furniture-vendor labor are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "av-furniture-exclusion",
      "display-blocking-review",
      "millwork-coordination",
    ],
  },

  {
    id: "office.acousticAssumption",
    text:
      "Audio and conferencing performance assumes typical office acoustics until room reverberation, glass, open ceilings, movable walls, ambient noise, HVAC noise, and speech-privacy conditions are evaluated.",
    conditions: [],
    ruleTags: [
      "acoustic-assumption",
      "conference-audio-review",
      "speech-privacy-review",
    ],
  },

  {
    id: "office.soundMaskingAssumption",
    text:
      "Sound-masking quantities and zoning are preliminary until ceiling type, plenum conditions, privacy objectives, ambient noise, workspace layout, and commissioning requirements are verified.",
    conditions: [],
    ruleTags: [
      "sound-masking-assumption",
      "speech-privacy",
      "commissioning-review",
    ],
  },

  {
    id: "office.roomSchedulingAssumption",
    text:
      "Room and desk scheduling pricing assumes the customer will provide calendar platform, tenant, licensing, authentication, room-resource, network, and administrative requirements.",
    conditions: [],
    ruleTags: [
      "room-scheduling-assumption",
      "calendar-integration-review",
      "licensing-review",
    ],
  },

  {
    id: "office.digitalSignageAssumption",
    text:
      "Digital-signage pricing assumes the customer will provide content, branding, approval workflows, network requirements, scheduling expectations, and licensing unless content services are specifically included.",
    conditions: [],
    ruleTags: [
      "digital-signage-assumption",
      "content-management-review",
      "customer-content-responsibility",
    ],
  },

  {
    id: "office.firestopAssumption",
    text:
      "Fire-rated penetrations are assumed to require approved firestop materials, labeling, documentation, inspections, and installation methods when encountered.",
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
    id: "office.permitAssumption",
    text:
      "Permit, inspection, engineering, structural scan, landlord, property-management, elevator, fire-alarm, union, and authority fees are excluded from preliminary pricing unless specifically identified.",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-assumption",
      "landlord-approval",
      "inspection-review",
    ],
  },

  {
    id: "office.customerProvidedDocumentsAssumption",
    text:
      "Pricing assumes the customer will provide available floor plans, reflected ceiling plans, furniture plans, telecom drawings, rack elevations, network diagrams, door schedules, audiovisual standards, and building rules.",
    conditions: [],
    ruleTags: [
      "document-coordination",
      "design-input-assumption",
      "building-standard-review",
    ],
  },

  {
    id: "office.patchAndPaintAssumption",
    text:
      "Patching, painting, ceiling repair, flooring repair, furniture repair, millwork restoration, glass work, roofing repair, concrete restoration, and architectural finish work are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "finish-repair-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "office.testingAssumption",
    text:
      "Pricing assumes standard manufacturer and installation testing unless certified copper testing, fiber certification, wireless validation, camera acceptance, access-control testing, audiovisual commissioning, acoustic testing, or third-party commissioning is required.",
    conditions: [],
    ruleTags: [
      "testing-assumption",
      "certification-review",
      "commissioning-review",
    ],
  },

  {
    id: "office.procurementAssumption",
    text:
      "Equipment availability, freight, lead times, substitutions, manufacturer pricing, software licensing, furniture schedules, and move-in dates remain subject to verification before final quote approval.",
    conditions: [],
    ruleTags: [
      "procurement-assumption",
      "lead-time-review",
      "price-validity",
    ],
  },
];
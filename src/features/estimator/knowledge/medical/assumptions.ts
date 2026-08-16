import type { PlaybookAssumption } from "../playbook";

export const medicalAssumptions: PlaybookAssumption[] = [
  {
    id: "medical.standardAccessAssumption",
    text:
      "Pricing assumes reasonable access to all installation areas during the agreed work schedule unless restricted clinical, pharmacy, imaging, laboratory, behavioral-health, or patient-care zones are identified.",
    conditions: [],
    ruleTags: [
      "site-access-assumption",
      "clinical-access",
    ],
  },

  {
    id: "medical.operatingFacilityAssumption",
    text:
      "Pricing assumes clinical operations can be coordinated to provide safe temporary work zones around ladders, lifts, ceilings, walls, telecom spaces, and device locations.",
    conditions: [
      {
        field: "property.occupiedDuringInstall",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "occupied-facility",
      "clinical-coordination",
      "productivity-assumption",
    ],
  },

  {
    id: "medical.standardWorkHoursAssumption",
    text:
      "Pricing assumes installation can be completed during normal business hours unless after-hours, overnight, shutdown, weekend, or patient-schedule restrictions are specifically required.",
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
    id: "medical.afterHoursAccessAssumption",
    text:
      "After-hours pricing assumes the customer will provide building access, alarm coordination, escorts, keys, security access, lighting, utility access, and an authorized facility contact during each work window.",
    conditions: [
      {
        field: "installation.afterHoursRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "after-hours",
      "site-contact-required",
      "access-coordination",
    ],
  },

  {
    id: "medical.infectionControlAssumption",
    text:
      "Pricing assumes standard low-voltage installation procedures unless infection-control barriers, HEPA filtration, negative air, containment, daily cleaning, specialty PPE, or formal infection-control risk assessment requirements are identified.",
    conditions: [],
    ruleTags: [
      "infection-control-assumption",
      "containment-review",
      "clinical-safety",
    ],
  },

  {
    id: "medical.patientPrivacyAssumption",
    text:
      "Pricing assumes the customer will identify all patient-privacy, protected-information, escorted-access, photography, recording, and documentation restrictions before work begins.",
    conditions: [],
    ruleTags: [
      "patient-privacy-assumption",
      "hipaa-coordination",
      "restricted-access",
    ],
  },

  {
    id: "medical.photoPermissionAssumption",
    text:
      "Required project photography assumes facility approval and excludes patient-identifiable information, protected health information, confidential records, and prohibited clinical areas.",
    conditions: [],
    ruleTags: [
      "photo-permission",
      "privacy-protection",
      "documentation-control",
    ],
  },

  {
    id: "medical.ceilingAccessAssumption",
    text:
      "Pricing assumes accessible ceiling or pathway conditions unless sealed clinical ceilings, restricted spaces, imaging rooms, procedure areas, inaccessible soffits, or finished architectural surfaces are identified.",
    conditions: [
      {
        field: "cabling.wiringStyle",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "ceiling-access-assumption",
      "clinical-pathway-review",
      "labor-review",
    ],
  },

  {
    id: "medical.pathwayAssumption",
    text:
      "Pricing assumes existing cable pathways are usable, accessible, code-compliant, appropriately supported, and have sufficient capacity unless otherwise identified during the walkthrough.",
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
    id: "medical.newPathwayAssumption",
    text:
      "Where no existing pathway is available, preliminary pricing assumes approved supported ceiling routing, surface raceway, conduit, sleeves, or other facility-approved pathways.",
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
      "clinical-routing",
    ],
  },

  {
    id: "medical.standardCeilingHeightAssumption",
    text:
      "Pricing assumes standard commercial mounting heights until actual ceiling, imaging-room, atrium, exterior, parking, and device elevations are verified.",
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
    id: "medical.liftAccessAssumption",
    text:
      "Pricing assumes ladders, scaffolding, or lifts can safely reach proposed installation areas without conflicting with patient movement, clinical equipment, imaging restrictions, automatic doors, furniture, or permanent obstructions.",
    conditions: [
      {
        field: "installation.liftRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "lift-access-assumption",
      "clinical-access-review",
      "floor-protection-review",
    ],
  },

  {
    id: "medical.copperDistanceAssumption",
    text:
      "Copper network cabling is assumed to remain within standard Ethernet distance limits unless field measurements identify longer routes requiring fiber, additional telecom rooms, or remote enclosures.",
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
    id: "medical.existingFiberAssumption",
    text:
      "Existing fiber is not assumed reusable until fiber type, strand availability, connector type, routing, labeling, ownership, and test results are verified.",
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
    id: "medical.powerAvailabilityAssumption",
    text:
      "Pricing assumes suitable electrical power is available near proposed racks, switches, recorders, controllers, access-control power supplies, communication equipment, UPS units, and specialty systems.",
    conditions: [],
    ruleTags: [
      "power-assumption",
      "electrical-coordination",
    ],
  },

  {
    id: "medical.rackCapacityAssumption",
    text:
      "Existing racks, cabinets, telecom rooms, and equipment spaces are not assumed to have sufficient space, power, cooling, grounding, security, cable management, or spare capacity until verified.",
    conditions: [
      {
        field: "network.existingRack",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "rack-capacity-assumption",
      "power-review",
      "cooling-review",
      "security-review",
    ],
  },

  {
    id: "medical.networkConfigurationAssumption",
    text:
      "Pricing assumes the customer or healthcare IT provider will supply required IP addressing, VLANs, firewall policies, authentication, medical-device requirements, remote-access rules, and cybersecurity standards before commissioning.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-coordination",
      "healthcare-vlan-review",
      "cybersecurity-coordination",
      "medical-device-isolation",
    ],
  },

  {
    id: "medical.vendorIntegrationAssumption",
    text:
      "Medical-device, EHR, imaging, laboratory, pharmacy, nurse-call, paging, phone, fire-alarm, building-management, and proprietary vendor integration is excluded unless specifically identified and included.",
    conditions: [],
    ruleTags: [
      "vendor-integration-assumption",
      "clinical-system-coordination",
      "scope-clarification",
    ],
  },

  {
    id: "medical.guestWifiAssumption",
    text:
      "Guest Wi-Fi pricing assumes standard network isolation, captive portal, bandwidth control, and firewall requirements unless custom branding, legal acceptance, content filtering, analytics, or identity integration is requested.",
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
    id: "medical.wifiDesignAssumption",
    text:
      "Wireless access-point quantities are preliminary until facility dimensions, wall construction, imaging shielding, clinical equipment, device density, roaming requirements, and radio-frequency conditions are verified.",
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
    id: "medical.clinicalRoamingAssumption",
    text:
      "Clinical roaming performance is not guaranteed until device types, authentication methods, application requirements, access-point placement, and post-installation validation are confirmed.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "clinical-roaming-assumption",
      "wireless-validation",
      "device-compatibility-review",
    ],
  },

  {
    id: "medical.cameraViewAssumption",
    text:
      "Camera quantities are preliminary until exact views, privacy restrictions, mounting heights, lighting, identification objectives, cable routes, and facility policies are verified.",
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
    id: "medical.cameraPrivacyAssumption",
    text:
      "Camera scope assumes no recording in exam rooms, treatment rooms, procedure rooms, restrooms, changing areas, or other prohibited spaces unless expressly approved through appropriate legal, privacy, and facility review.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "patient-privacy",
      "camera-restrictions",
      "policy-review",
    ],
  },

  {
    id: "medical.cameraLightingAssumption",
    text:
      "Preliminary camera pricing assumes typical commercial lighting unless low-light, backlight, reflective glass, parking-lot, infrared, or supplemental-lighting requirements are identified.",
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
    id: "medical.videoRetentionAssumption",
    text:
      "Video storage sizing assumes continuous recording at standard resolution, frame rate, compression, and motion levels unless specific recording profiles or legal retention requirements are provided.",
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
    id: "medical.accessHardwareAssumption",
    text:
      "Access-control pricing assumes existing doors, frames, cabinets, gates, elevators, automatic doors, and controlled barriers are structurally suitable for the proposed hardware unless deficiencies are identified.",
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
    id: "medical.lifeSafetyAssumption",
    text:
      "Access-control scope assumes all locking arrangements will be reviewed for applicable life-safety, egress, fire-alarm, accessibility, occupancy, behavioral-health, and authority requirements before final installation.",
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
      "behavioral-health-review",
    ],
  },

  {
    id: "medical.pharmacySecurityAssumption",
    text:
      "Pharmacy, medication-room, controlled-substance, and medication-cabinet requirements are not assumed until customer policies, audit requirements, credential rules, and regulatory responsibilities are confirmed.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Pharmacy",
          "Medication storage",
        ],
      },
    ],
    ruleTags: [
      "pharmacy-security-assumption",
      "controlled-substance-review",
      "access-audit-review",
    ],
  },

  {
    id: "medical.behavioralHealthAssumption",
    text:
      "Behavioral-health areas are assumed to require separate review for ligature resistance, tamper resistance, patient safety, privacy, staff duress, device placement, and mounting hardware.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "Behavioral health",
        ],
      },
    ],
    ruleTags: [
      "behavioral-health-assumption",
      "ligature-review",
      "tamper-resistance",
      "staff-safety",
    ],
  },

  {
    id: "medical.imagingAssumption",
    text:
      "Imaging-area work assumes coordination with equipment vendors, shielding requirements, magnetic restrictions, radiation-safety policies, shutdown schedules, and approved materials before installation.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "includes",
        value: [
          "MRI environment",
          "X-ray or imaging room",
        ],
      },
    ],
    ruleTags: [
      "imaging-assumption",
      "shielding-coordination",
      "magnetic-environment-review",
      "vendor-coordination",
    ],
  },

  {
    id: "medical.communicationSystemAssumption",
    text:
      "Paging, intercom, nurse-call, staff-duress, emergency-notification, patient-assistance, and room-status quantities are preliminary until workflow, code, integration, device, and coverage requirements are verified.",
    conditions: [],
    ruleTags: [
      "communication-system-assumption",
      "clinical-workflow-review",
      "specialty-system-review",
    ],
  },

  {
    id: "medical.firestopAssumption",
    text:
      "Fire-rated and smoke-rated penetrations are assumed to require approved firestop systems, labels, documentation, inspection, and facility-specific installation procedures.",
    conditions: [
      {
        field: "cabling.fireStoppingRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
      "documentation-required",
    ],
  },

  {
    id: "medical.permitAssumption",
    text:
      "Permit, inspection, engineering, infection-control approval, landlord approval, fire-alarm coordination, compliance review, and authority fees are excluded from preliminary pricing unless specifically identified.",
    conditions: [
      {
        field: "installation.permitsRequired",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "permit-assumption",
      "inspection-review",
      "healthcare-approval",
    ],
  },

  {
    id: "medical.customerProvidedDocumentsAssumption",
    text:
      "Pricing assumes the customer will provide available floor plans, reflected ceiling plans, equipment schedules, shielding details, network diagrams, door schedules, infection-control requirements, facility standards, and system documentation when requested.",
    conditions: [],
    ruleTags: [
      "document-coordination",
      "design-input-assumption",
      "facility-standard-review",
    ],
  },

  {
    id: "medical.patchAndPaintAssumption",
    text:
      "Patching, painting, ceiling repair, wall restoration, shielding restoration, lead-lining repair, millwork repair, flooring repair, roofing repair, and architectural finish work are excluded unless specifically included.",
    conditions: [],
    ruleTags: [
      "finish-repair-exclusion",
      "shielding-repair-exclusion",
      "scope-clarification",
    ],
  },

  {
    id: "medical.specialEnvironmentAssumption",
    text:
      "Standard equipment and installation methods are assumed unless sterile, imaging, laboratory, pharmacy, behavioral-health, oxygen, medical-gas, refrigerated, hazardous, or other specialty clinical requirements are identified.",
    conditions: [
      {
        field: "property.specialEnvironment",
        operator: "is_unknown",
      },
    ],
    ruleTags: [
      "standard-environment-assumption",
      "specialty-clinical-review",
      "environmental-rating-review",
    ],
  },

  {
    id: "medical.testingAssumption",
    text:
      "Pricing assumes standard manufacturer and installation testing unless certified copper testing, fiber certification, wireless validation, camera acceptance, access-control testing, communication-system testing, or third-party commissioning is required.",
    conditions: [],
    ruleTags: [
      "testing-assumption",
      "certification-review",
      "commissioning-review",
    ],
  },

  {
    id: "medical.procurementAssumption",
    text:
      "Equipment availability, freight, lead times, substitutions, manufacturer pricing, healthcare approvals, and clinical opening schedules remain subject to verification before final quote approval.",
    conditions: [],
    ruleTags: [
      "procurement-assumption",
      "lead-time-review",
      "price-validity",
    ],
  },
];
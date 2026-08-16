import type { PlaybookQuestion } from "../playbook";

export const medicalQuestions: PlaybookQuestion[] = [
  {
    id: "medical.facilitySubtype",
    projectField: "property.customProjectType",
    question:
      "What type of medical or healthcare facility is this?",
    promptGuidance:
      "Offer examples such as physician office, dental office, urgent care, outpatient clinic, imaging center, behavioral health, ambulatory surgery center, or specialty practice.",
    reason:
      "Facility type affects privacy requirements, patient flow, clinical spaces, access control, network reliability, camera restrictions, and installation methods.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Physician office",
      "Dental office",
      "Urgent care",
      "Outpatient clinic",
      "Imaging center",
      "Behavioral health facility",
      "Ambulatory surgery center",
      "Specialty medical practice",
      "Pharmacy",
      "Laboratory",
      "Other healthcare facility",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.clinicalAreas",
      "medical.patientCapacity",
      "medical.specialEnvironments",
    ],
    ruleTags: [
      "medical-subtype",
      "healthcare-classification",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.constructionStatus",
    projectField: "property.constructionType",
    question:
      "Is this an operating medical facility, renovation, tenant build-out, or new construction project?",
    promptGuidance:
      "Clarify whether patients, providers, staff, and clinical operations will continue during installation.",
    reason:
      "Construction status affects pathway access, infection-control measures, scheduling, shutdown coordination, and labor productivity.",
    category: "property",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Existing operating facility",
      "Existing vacant facility",
      "Renovation",
      "Tenant build-out",
      "New construction",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.occupiedDuringInstall",
      "medical.afterHoursWork",
      "medical.pathwayAvailability",
    ],
    ruleTags: [
      "construction-phase",
      "clinical-operations",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.squareFootage",
    projectField: "property.squareFootage",
    question:
      "What is the approximate total square footage of the facility?",
    promptGuidance:
      "Accept an estimate or range when exact plans are unavailable.",
    reason:
      "Facility size affects cable distance, device quantities, Wi-Fi coverage, labor, network design, and project duration.",
    category: "property",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.networkRoomCount",
      "medical.longestCableRun",
    ],
    ruleTags: [
      "facility-size",
      "material-scaling",
      "labor-scaling",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.patientCapacity",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "What is the approximate number of staff, providers, patients, and connected devices during the busiest period?",
    promptGuidance:
      "Ask for staff count, provider count, patient volume, guest devices, medical devices, tablets, phones, and workstations.",
    reason:
      "Peak occupancy and device count affect wireless capacity, switch sizing, internet requirements, and network segmentation.",
    category: "commercial",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "medical.facilitySubtype",
    ],
    unlocks: [
      "medical.wifiDevices",
      "medical.guestWifi",
    ],
    ruleTags: [
      "occupancy-review",
      "device-density",
      "network-capacity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.occupiedDuringInstall",
    projectField: "property.occupiedDuringInstall",
    question:
      "Will patient care and clinical operations continue during installation?",
    promptGuidance:
      "Ask whether exam rooms, treatment rooms, offices, imaging areas, laboratories, and waiting rooms will remain active.",
    reason:
      "Active healthcare operations may require phased work, infection-control barriers, escorts, after-hours work, reduced noise, and temporary shutdown coordination.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "property.constructionType",
        operator: "not_equals",
        value: "new_construction",
      },
    ],
    dependsOn: [
      "medical.constructionStatus",
    ],
    unlocks: [
      "medical.afterHoursWork",
      "medical.infectionControlRequirements",
      "medical.patientPrivacyRestrictions",
    ],
    ruleTags: [
      "occupied-facility",
      "clinical-operations",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.clinicalAreas",
    projectField: "property.specialEnvironment",
    question:
      "Which areas are included in the project?",
    promptGuidance:
      "Allow multiple selections and ask about specialized clinical, administrative, diagnostic, and restricted areas.",
    reason:
      "Different healthcare spaces require different security, networking, environmental, privacy, and installation approaches.",
    category: "commercial",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Reception",
      "Waiting room",
      "Exam rooms",
      "Treatment rooms",
      "Procedure rooms",
      "Dental operatories",
      "Imaging rooms",
      "Laboratory",
      "Pharmacy",
      "Medication storage",
      "Behavioral health rooms",
      "Administrative offices",
      "Medical records",
      "Server or telecom room",
      "Staff areas",
      "Exterior and parking",
      "Other",
    ],
    conditions: [],
    dependsOn: [
      "medical.facilitySubtype",
    ],
    unlocks: [
      "medical.specialEnvironments",
      "medical.cameraCoverage",
      "medical.accessControlledAreas",
      "medical.wifiCoverage",
    ],
    ruleTags: [
      "medical-zones",
      "scope-segmentation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.specialEnvironments",
    projectField: "property.specialEnvironment",
    question:
      "Are there any special clinical, imaging, laboratory, sterile, behavioral-health, refrigerated, or hazardous areas?",
    promptGuidance:
      "Ask about MRI, X-ray, surgery, clean rooms, labs, pharmacies, medication refrigerators, oxygen storage, behavioral health, and isolation rooms.",
    reason:
      "Special environments may require restricted materials, equipment ratings, infection-control procedures, shielding coordination, access limitations, and specialized approvals.",
    category: "safety",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "MRI environment",
      "X-ray or imaging room",
      "Procedure or surgery room",
      "Sterile or clean area",
      "Laboratory",
      "Pharmacy",
      "Medication refrigeration",
      "Behavioral health",
      "Isolation room",
      "Oxygen or medical gas area",
      "Hazardous materials area",
      "No special conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "medical.clinicalAreas",
    ],
    unlocks: [],
    ruleTags: [
      "specialty-clinical-environment",
      "infection-control-review",
      "shielding-coordination",
      "hazardous-area-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.infectionControlRequirements",
    projectField: "assessment.risks",
    question:
      "What infection-control, dust-containment, negative-air, cleaning, PPE, or work-zone requirements apply?",
    promptGuidance:
      "Ask whether the customer uses an infection-control risk assessment, containment standards, HEPA filtration, barriers, or daily cleaning procedures.",
    reason:
      "Healthcare infection-control requirements can materially affect labor, tools, barriers, cleanup, scheduling, and access.",
    category: "safety",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "infection-control",
      "dust-containment",
      "clinical-safety",
      "productivity-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.patientPrivacyRestrictions",
    projectField: "assessment.risks",
    question:
      "Are there patient privacy, recording, escort, access, or protected-information restrictions that affect where and when the crew can work?",
    promptGuidance:
      "Ask about exam rooms, treatment areas, medical records, patient-identifiable information, photography restrictions, and escorted access.",
    reason:
      "Privacy restrictions affect camera placement, documentation, photos, device access, work scheduling, and crew procedures.",
    category: "safety",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "patient-privacy",
      "hipaa-coordination",
      "restricted-access",
      "photo-restriction",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.ceilingType",
    projectField: "property.ceilingType",
    question:
      "What ceiling types are present throughout the facility?",
    promptGuidance:
      "Offer drop ceiling, drywall, open ceiling, sealed clinical ceiling, and mixed construction.",
    reason:
      "Ceiling construction affects pathways, access, infection-control procedures, mounting methods, fire stopping, and labor.",
    category: "property",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Drop ceiling",
      "Drywall ceiling",
      "Open ceiling",
      "Sealed clinical ceiling",
      "Mixed ceiling types",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.ceilingAccess",
      "medical.pathwayAvailability",
    ],
    ruleTags: [
      "ceiling-structure",
      "pathway-review",
      "infection-control-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.ceilingHeight",
    projectField: "property.ceilingHeightFeet",
    question:
      "What is the approximate ceiling height in the clinical, waiting, office, and common areas?",
    promptGuidance:
      "Ask whether heights vary in imaging, procedure, lobby, stairwell, or exterior areas.",
    reason:
      "Ceiling height affects ladder or lift requirements, camera design, access-point placement, cable quantity, and labor.",
    category: "property",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.liftRequirement",
    ],
    ruleTags: [
      "ceiling-height",
      "lift-review",
      "mounting-height",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.ceilingAccess",
    projectField: "cabling.wiringStyle",
    question:
      "Can cabling be routed above the ceilings, or are there sealed, restricted, inaccessible, or finished areas?",
    promptGuidance:
      "Ask separately about exam rooms, procedure rooms, imaging, laboratories, offices, waiting areas, and hallways.",
    reason:
      "Ceiling access affects pathway design, infection-control precautions, surface raceway, wall openings, labor, and project duration.",
    category: "cabling",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Accessible above ceilings",
      "Limited access",
      "No ceiling access",
      "Sealed clinical ceiling",
      "Exposed raceway is acceptable",
      "Mixed conditions",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "medical.ceilingType",
    ],
    unlocks: [
      "medical.pathwayAvailability",
      "medical.patchRepair",
    ],
    ruleTags: [
      "ceiling-access-review",
      "wiring-finish",
      "clinical-pathway-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.pathwayAvailability",
    projectField: "cabling.pathwayType",
    question:
      "What cable pathways are available throughout the facility?",
    promptGuidance:
      "Ask about cable tray, conduit, J-hooks, sleeves, above-ceiling pathways, risers, floor pathways, and existing telecom routes.",
    reason:
      "Available pathways affect cable support, infection-control exposure, fire stopping, installation time, materials, and code compliance.",
    category: "cabling",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Accessible ceiling space",
      "Existing conduit",
      "Cable tray",
      "J-hooks",
      "Existing sleeves",
      "Floor pathway",
      "Riser pathway",
      "No known pathway",
      "Not sure",
    ],
    conditions: [],
    dependsOn: [
      "medical.ceilingAccess",
    ],
    unlocks: [
      "medical.fireStopping",
      "medical.longestCableRun",
    ],
    ruleTags: [
      "pathway-review",
      "cable-support-review",
      "clinical-routing",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.longestCableRun",
    projectField: "cabling.estimatedCableFeet",
    question:
      "What is the approximate longest cable route from the serving network room to the farthest device?",
    promptGuidance:
      "Accept an estimate and explain that actual installed pathway distance matters.",
    reason:
      "Cable distance affects copper limits, fiber requirements, material quantities, telecom-room design, and labor.",
    category: "cabling",
    priority: "high",
    answerType: "number",
    choices: [],
    conditions: [],
    dependsOn: [
      "medical.pathwayAvailability",
    ],
    unlocks: [
      "medical.networkRoomCount",
    ],
    ruleTags: [
      "cable-distance-review",
      "fiber-review",
      "material-quantity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.fireStopping",
    projectField: "cabling.fireStoppingRequired",
    question:
      "Will new cabling pass through fire-rated walls, smoke compartments, floors, shafts, barriers, or other rated assemblies?",
    promptGuidance:
      "Ask whether existing sleeves, approved systems, labels, or documentation standards are available.",
    reason:
      "Healthcare facilities may contain numerous rated barriers requiring approved firestop systems, documentation, and inspections.",
    category: "cabling",
    priority: "critical",
    answerType: "single_choice",
    choices: [
      "Yes",
      "No",
      "Existing sleeves are available",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [
      "medical.pathwayAvailability",
    ],
    unlocks: [],
    ruleTags: [
      "firestopping",
      "smoke-compartment",
      "rated-penetration",
      "inspection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.patchRepair",
    projectField: "assessment.assumptions",
    question:
      "If wall or ceiling openings are required, should SmartNET include patching and painting, or will another contractor handle repairs?",
    promptGuidance:
      "Mention that finished and clinical spaces may require controlled access openings.",
    reason:
      "Repair responsibilities must be included or excluded from the proposal.",
    category: "installation",
    priority: "normal",
    answerType: "single_choice",
    choices: [
      "Include patching",
      "Include patching and painting",
      "Another contractor will handle repairs",
      "Decide after walkthrough",
    ],
    conditions: [
      {
        field: "property.constructionType",
        operator: "not_equals",
        value: "new_construction",
      },
    ],
    dependsOn: [
      "medical.ceilingAccess",
    ],
    unlocks: [],
    ruleTags: [
      "finish-repair-scope",
      "scope-clarification",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.networkRoomCount",
    projectField: "network.rackLocation",
    question:
      "How many server rooms, telecom rooms, racks, or network enclosures serve the facility?",
    promptGuidance:
      "Ask where the main and intermediate network locations are and whether remote clinical areas require additional enclosures.",
    reason:
      "Network-room locations determine cable distance, fiber backbone design, switch quantities, redundancy, power, cooling, and serviceability.",
    category: "network",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "medical.rackCapacity",
      "medical.existingFiber",
      "medical.networkSegmentation",
    ],
    ruleTags: [
      "network-room-review",
      "mdf-review",
      "idf-review",
      "fiber-backbone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.rackCapacity",
    projectField: "network.rackRequired",
    question:
      "Do the existing racks have enough space, power, cooling, grounding, security, and cable management for the new systems?",
    promptGuidance:
      "Ask about switches, patch panels, firewalls, recorders, controllers, UPS units, servers, and spare capacity.",
    reason:
      "Insufficient rack capacity may require a new rack, enclosure, UPS, electrical work, cooling, or cable-management upgrades.",
    category: "network",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Existing rack has capacity",
      "Existing rack needs cleanup",
      "Existing rack is full",
      "No existing rack",
      "Needs verification",
    ],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.networkRoomCount",
    ],
    unlocks: [
      "medical.upsRequirement",
    ],
    ruleTags: [
      "rack-capacity-review",
      "power-review",
      "cooling-review",
      "equipment-security",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.existingFiber",
    projectField: "cabling.preferredCableType",
    question:
      "Is there existing fiber between telecom rooms, floors, buildings, or remote clinical areas?",
    promptGuidance:
      "Ask whether fiber type, strand count, connectors, labeling, available strands, and test records are known.",
    reason:
      "Existing fiber may be reusable only after capacity, compatibility, routing, and test results are verified.",
    category: "cabling",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Existing fiber is available and documented",
      "Existing fiber is available but undocumented",
      "No existing fiber",
      "Not sure",
    ],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "existing-fiber-review",
      "fiber-testing",
      "backbone-capacity",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.networkSegmentation",
    projectField: "network.vlanRequired",
    question:
      "Should clinical systems, administrative devices, guest Wi-Fi, cameras, access control, medical devices, and building systems be separated on different networks?",
    promptGuidance:
      "Explain that segmentation can improve security, reliability, troubleshooting, and vendor separation.",
    reason:
      "Healthcare networks often require controlled segmentation between clinical, administrative, guest, security, and medical-device traffic.",
    category: "network",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.networkRoomCount",
    ],
    unlocks: [],
    ruleTags: [
      "vlan-review",
      "healthcare-network-segmentation",
      "cybersecurity-review",
      "medical-device-isolation",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.upsRequirement",
    projectField: "equipment.recommendedItems",
    question:
      "Which network, security, communication, and clinical-support systems must remain online during short power interruptions?",
    promptGuidance:
      "Ask about internet, phones, access control, cameras, Wi-Fi, telecom equipment, critical workstations, and selected medical-support systems.",
    reason:
      "Required runtime affects UPS capacity, equipment grouping, rack layout, electrical requirements, and business continuity.",
    category: "installation",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "medical.rackCapacity",
    ],
    unlocks: [],
    ruleTags: [
      "ups-review",
      "business-continuity",
      "power-resilience",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.wifiCoverage",
    projectField: "wifi.coverageGoals",
    question:
      "Which areas require reliable Wi-Fi coverage?",
    promptGuidance:
      "Ask about exam rooms, waiting rooms, offices, imaging, laboratories, pharmacies, hallways, staff areas, exterior areas, and mobile-clinical workflows.",
    reason:
      "Coverage zones determine access-point quantity, placement, environmental considerations, cabling, switching, and validation requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Reception and waiting",
      "Exam rooms",
      "Treatment rooms",
      "Procedure rooms",
      "Imaging",
      "Laboratory",
      "Pharmacy",
      "Administrative offices",
      "Hallways",
      "Staff areas",
      "Exterior areas",
      "Entire facility",
      "Other",
    ],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "medical.wifiDevices",
      "medical.guestWifi",
      "medical.roamingRequirements",
      "medical.wifiObstructions",
    ],
    ruleTags: [
      "medical-wifi-design",
      "coverage-zone-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.wifiDevices",
    projectField: "wifi.estimatedConcurrentUsers",
    question:
      "Approximately how many wireless devices will be active during the busiest period?",
    promptGuidance:
      "Mention staff phones, tablets, workstations, scanners, medical devices, printers, guest devices, sensors, and vendor equipment.",
    reason:
      "Device count and traffic type affect access-point density, channel planning, switch capacity, authentication, and internet requirements.",
    category: "wifi",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "wifi-capacity",
      "device-density",
      "clinical-device-load",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.guestWifi",
    projectField: "wifi.guestNetworkRequired",
    question:
      "Will patients and visitors receive guest Wi-Fi access?",
    promptGuidance:
      "Ask about network isolation, captive portal, content filtering, bandwidth limits, legal acceptance, and support responsibility.",
    reason:
      "Guest Wi-Fi affects segmentation, security, bandwidth, authentication, firewall policies, and support.",
    category: "wifi",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "guest-wifi",
      "network-segmentation",
      "captive-portal-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.roamingRequirements",
    projectField: "wifi.weakAreas",
    question:
      "Do clinicians, mobile carts, tablets, voice devices, or medical systems require uninterrupted Wi-Fi while moving through the facility?",
    promptGuidance:
      "Ask whether dropped connections affect charting, communications, scanning, monitoring, or clinical applications.",
    reason:
      "Mobile clinical workflows require roaming-aware design, stable authentication, cell overlap, and post-installation validation.",
    category: "wifi",
    priority: "high",
    answerType: "boolean",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "clinical-roaming",
      "wireless-validation",
      "mobility-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.wifiObstructions",
    projectField: "assessment.risks",
    question:
      "Are there building materials, imaging systems, shielded rooms, dense walls, equipment, or interference sources that may affect wireless coverage?",
    promptGuidance:
      "Ask about lead-lined walls, MRI shielding, concrete, masonry, metal cabinets, medical equipment, and neighboring wireless systems.",
    reason:
      "Healthcare construction and equipment can significantly alter wireless propagation and may require predictive or onsite surveys.",
    category: "wifi",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.wifiCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "rf-obstruction-review",
      "shielded-room-review",
      "wireless-survey",
      "interference-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.cameraCoverage",
    projectField: "cameras.coverageGoals",
    question:
      "Which areas and activities require camera coverage?",
    promptGuidance:
      "Ask about entrances, reception, waiting rooms, hallways, pharmacies, medication storage, parking, exterior areas, and restricted zones while avoiding inappropriate clinical recording.",
    reason:
      "Coverage goals determine camera count, privacy restrictions, placement, lens selection, storage, network capacity, and policy review.",
    category: "cameras",
    priority: "critical",
    answerType: "multiple_choice",
    choices: [
      "Main entrances",
      "Reception",
      "Waiting room",
      "Hallways",
      "Pharmacy",
      "Medication storage",
      "Medical records",
      "Staff entrances",
      "Exterior and parking",
      "Restricted areas",
      "Other",
    ],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "medical.cameraPrivacy",
      "medical.recordingRetention",
      "medical.cameraLighting",
    ],
    ruleTags: [
      "medical-camera-layout",
      "privacy-review",
      "security-design",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.cameraPrivacy",
    projectField: "assessment.risks",
    question:
      "Which areas must not be recorded, and are privacy masking, signage, policy approval, or legal review required?",
    promptGuidance:
      "Ask specifically about exam rooms, treatment rooms, procedure rooms, patient information, behavioral-health spaces, restrooms, and staff privacy.",
    reason:
      "Healthcare surveillance must be designed around patient privacy, protected information, workplace policies, and legal restrictions.",
    category: "cameras",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "patient-privacy",
      "camera-restrictions",
      "privacy-masking",
      "policy-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.recordingRetention",
    projectField: "cameras.recordingDays",
    question:
      "How many days of recorded video should the system retain?",
    promptGuidance:
      "Ask whether retention differs for entrances, pharmacies, parking, medication areas, or incident investigations.",
    reason:
      "Retention requirements drive recorder capacity, storage quantity, bandwidth, redundancy, and system cost.",
    category: "cameras",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "video-retention",
      "storage-sizing",
      "bandwidth-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.cameraLighting",
    projectField: "assessment.risks",
    question:
      "Are any camera areas affected by low light, bright glass entrances, parking-lot headlights, reflections, or changing lighting?",
    promptGuidance:
      "Ask about nighttime exterior areas, backlit lobbies, glass doors, and dim corridors.",
    reason:
      "Lighting conditions affect camera sensor selection, WDR, infrared, placement, and image quality.",
    category: "cameras",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.cameraCoverage",
    ],
    unlocks: [],
    ruleTags: [
      "low-light-review",
      "wdr-review",
      "reflection-review",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.accessControlledAreas",
    projectField: "accessControl.controlledDoorCount",
    question:
      "How many doors, cabinets, elevators, gates, or restricted areas require access control?",
    promptGuidance:
      "Ask about staff entrances, pharmacies, medication rooms, records, laboratories, imaging, procedure areas, server rooms, and behavioral-health zones.",
    reason:
      "Controlled-opening count drives readers, locks, controllers, power supplies, credentials, monitoring, licensing, and labor.",
    category: "access_control",
    priority: "critical",
    answerType: "number",
    choices: [],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [],
    unlocks: [
      "medical.accessDoorTypes",
      "medical.accessCredentials",
      "medical.accessAuditRequirements",
    ],
    ruleTags: [
      "medical-access-control",
      "controlled-opening-count",
      "restricted-area-security",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.accessDoorTypes",
    projectField: "assessment.assumptions",
    question:
      "What types of doors, cabinets, gates, or controlled barriers are included?",
    promptGuidance:
      "Ask about hollow-metal doors, storefront doors, wood doors, pharmacy cabinets, automatic doors, elevators, and behavioral-health doors.",
    reason:
      "Opening type affects lock hardware, life safety, monitoring, power transfer, accessibility, ligature risk, and labor.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Hollow-metal door",
      "Aluminum storefront door",
      "Wood door",
      "Automatic door",
      "Pharmacy or medication cabinet",
      "Elevator",
      "Exterior gate",
      "Behavioral-health door",
      "Other",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "door-hardware-review",
      "cabinet-control-review",
      "behavioral-health-review",
      "life-safety-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.accessCredentials",
    projectField: "accessControl.credentialTypes",
    question:
      "What credentials should staff, providers, contractors, pharmacy personnel, and visitors use?",
    promptGuidance:
      "Allow multiple selections and ask about temporary credentials, role-based access, mobile credentials, and identity-system integration.",
    reason:
      "Credential requirements affect readers, enrollment, permissions, licensing, audit trails, integrations, and administration.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Cards",
      "Key fobs",
      "Mobile credentials",
      "PIN codes",
      "Biometric credentials",
      "Temporary visitor credentials",
      "Role-based access",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "credential-selection",
      "role-based-access",
      "identity-integration-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.accessAuditRequirements",
    projectField: "assessment.assumptions",
    question:
      "Are detailed access logs, alerts, reports, pharmacy audit trails, remote management, or compliance reporting required?",
    promptGuidance:
      "Ask which openings require monitoring and who reviews alerts or reports.",
    reason:
      "Audit and reporting requirements affect software licensing, event retention, integrations, alerting, and administrative setup.",
    category: "access_control",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Detailed access logs",
      "Forced-door alerts",
      "Held-door alerts",
      "Pharmacy audit trail",
      "Remote management",
      "Scheduled reports",
      "Identity-system integration",
      "Not sure",
    ],
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    dependsOn: [
      "medical.accessControlledAreas",
    ],
    unlocks: [],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "pharmacy-security",
      "remote-management",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.communicationSystems",
    projectField: "assessment.assumptions",
    question:
      "Does the project include paging, intercom, staff duress, patient assistance, nurse call, emergency notification, or room-status systems?",
    promptGuidance:
      "Clarify whether systems are new, existing, being expanded, or require integration with another vendor.",
    reason:
      "Healthcare communication systems may require specialty devices, code review, vendor integration, dedicated cabling, testing, and workflow design.",
    category: "audio_visual",
    priority: "high",
    answerType: "multiple_choice",
    choices: [
      "Paging",
      "Intercom",
      "Staff duress",
      "Patient assistance",
      "Nurse call",
      "Emergency notification",
      "Room-status indicators",
      "Waiting-room messaging",
      "No communication systems",
      "Other",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [
      "medical.communicationIntegration",
    ],
    ruleTags: [
      "healthcare-communications",
      "specialty-system-review",
      "clinical-workflow",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.communicationIntegration",
    projectField: "equipment.recommendedItems",
    question:
      "Which existing systems must the communication solution integrate with?",
    promptGuidance:
      "Ask about phones, access control, fire alarm, nurse call, paging, EHR workflows, mobile devices, overhead speakers, and emergency systems.",
    reason:
      "Integration requirements affect equipment compatibility, licensing, programming, testing, vendor coordination, and project responsibility.",
    category: "audio_visual",
    priority: "high",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [
      "medical.communicationSystems",
    ],
    unlocks: [],
    ruleTags: [
      "system-integration",
      "vendor-coordination",
      "clinical-communication",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.afterHoursWork",
    projectField: "installation.afterHoursRequired",
    question:
      "Must installation work occur after clinic hours, overnight, during shutdowns, or between patient schedules?",
    promptGuidance:
      "Ask about procedure schedules, imaging use, pharmacy hours, cleaning, staff shifts, and restricted clinical areas.",
    reason:
      "Restricted work windows may increase labor rates, mobilizations, supervision, containment duration, and project schedule.",
    category: "installation",
    priority: "critical",
    answerType: "boolean",
    choices: [],
    conditions: [],
    dependsOn: [
      "medical.constructionStatus",
    ],
    unlocks: [],
    ruleTags: [
      "after-hours",
      "clinical-shutdown",
      "labor-premium-review",
      "schedule-restriction",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.liftRequirement",
    projectField: "installation.liftRequired",
    question:
      "Will ladders, scaffolding, or lifts be required for ceilings, atriums, exterior walls, parking areas, or elevated equipment?",
    promptGuidance:
      "Consider floor protection, patient traffic, narrow corridors, imaging restrictions, and active clinical spaces.",
    reason:
      "Elevated access affects rental cost, infection-control planning, crew size, floor protection, scheduling, and productivity.",
    category: "installation",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Ladders only",
      "Scaffolding",
      "Scissor lift",
      "Boom lift",
      "Multiple access methods",
      "Needs walkthrough",
    ],
    conditions: [],
    dependsOn: [
      "medical.ceilingHeight",
    ],
    unlocks: [],
    ruleTags: [
      "lift-review",
      "equipment-rental",
      "floor-protection-review",
      "clinical-access-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.permits",
    projectField: "installation.permitsRequired",
    question:
      "Are permits, inspections, engineering, infection-control approvals, landlord approvals, fire-alarm coordination, or healthcare compliance reviews required?",
    promptGuidance:
      "Ask who is responsible for each approval and whether the authority or facility has specific standards.",
    reason:
      "Healthcare approvals affect schedule, documentation, design, fees, inspections, system integration, and project responsibility.",
    category: "commercial",
    priority: "high",
    answerType: "single_choice",
    choices: [
      "Yes",
      "No",
      "Customer or contractor will manage",
      "Needs verification",
    ],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "permit-review",
      "inspection-review",
      "healthcare-approval",
      "authority-coordination",
    ],
    requiredForPreliminaryEstimate: false,
    requiredForFinalQuote: true,
  },

  {
    id: "medical.projectSchedule",
    projectField: "installation.estimatedDurationDays",
    question:
      "What is the required completion date, opening date, inspection date, phased turnover, or clinical cutover schedule?",
    promptGuidance:
      "Ask about occupancy, equipment installation, staff training, licensing inspections, patient scheduling, and system migrations.",
    reason:
      "Schedule constraints affect crew size, overtime, procurement, shutdown planning, testing, commissioning, and risk.",
    category: "installation",
    priority: "critical",
    answerType: "text",
    choices: [],
    conditions: [],
    dependsOn: [],
    unlocks: [],
    ruleTags: [
      "schedule-review",
      "clinical-cutover",
      "crew-scaling",
      "procurement-review",
    ],
    requiredForPreliminaryEstimate: true,
    requiredForFinalQuote: true,
  },
];
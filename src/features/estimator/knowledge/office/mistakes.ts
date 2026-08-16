import type { PlaybookCommonMistake } from "../playbook";

export const officeCommonMistakes: PlaybookCommonMistake[] = [
  {
    id: "office.mistake.noWalkthrough",
    title: "Estimating without a complete walkthrough",
    description:
      "Skipping a detailed walkthrough often results in missed pathways, telecom rooms, ceiling conditions, furniture coordination, and access restrictions.",
    prevention:
      "Perform a complete site walkthrough and verify every installation area before final pricing.",
    conditions: [],
    ruleTags: [
      "walkthrough",
      "estimate-accuracy",
    ],
  },

  {
    id: "office.mistake.copperDistance",
    title: "Ignoring copper distance limitations",
    description:
      "Long office cable runs can exceed Ethernet limits and require fiber or additional IDFs.",
    prevention:
      "Measure actual pathways and verify cable distances before finalizing the design.",
    conditions: [],
    ruleTags: [
      "fiber-review",
      "distance-limits",
    ],
  },

  {
    id: "office.mistake.furniture",
    title: "Not coordinating with furniture layouts",
    description:
      "Cubicles, modular furniture, sit-stand desks, and conference tables frequently change cable routes and outlet locations.",
    prevention:
      "Obtain the latest furniture plans and coordinate with the furniture vendor.",
    conditions: [],
    ruleTags: [
      "furniture",
      "coordination",
    ],
  },

  {
    id: "office.mistake.rackCapacity",
    title: "Assuming rack capacity exists",
    description:
      "Existing telecom racks often lack available rack space, switch ports, cooling, or power.",
    prevention:
      "Inspect every telecom room and document available capacity.",
    conditions: [],
    ruleTags: [
      "rack",
      "capacity-review",
    ],
  },

  {
    id: "office.mistake.wifiDensity",
    title: "Underestimating wireless density",
    description:
      "Conference rooms, training rooms, and open office environments frequently require more access points than expected.",
    prevention:
      "Perform predictive design and onsite RF validation.",
    conditions: [],
    ruleTags: [
      "wifi",
      "rf-survey",
    ],
  },

  {
    id: "office.mistake.cameraPrivacy",
    title: "Overlooking employee privacy",
    description:
      "Poor camera placement can create legal, HR, and workplace policy concerns.",
    prevention:
      "Review privacy-sensitive areas with the customer before final camera placement.",
    conditions: [],
    ruleTags: [
      "privacy",
      "camera-design",
    ],
  },

  {
    id: "office.mistake.afterHours",
    title: "Ignoring after-hours requirements",
    description:
      "Many offices only allow disruptive work outside business hours.",
    prevention:
      "Confirm installation windows during discovery.",
    conditions: [],
    ruleTags: [
      "after-hours",
      "labor",
    ],
  },

  {
    id: "office.mistake.power",
    title: "Assuming power is available",
    description:
      "Displays, switches, UPS systems, access controllers, and conference equipment often require new electrical work.",
    prevention:
      "Verify electrical availability during the walkthrough.",
    conditions: [],
    ruleTags: [
      "power",
      "electrical-review",
    ],
  },

  {
    id: "office.mistake.documentation",
    title: "Delivering poor documentation",
    description:
      "Missing labels, rack elevations, and as-built drawings make future maintenance difficult.",
    prevention:
      "Include complete closeout documentation with every project.",
    conditions: [],
    ruleTags: [
      "documentation",
      "closeout",
    ],
  },

  {
    id: "office.mistake.futureGrowth",
    title: "Designing only for today's requirements",
    description:
      "Office environments frequently expand, remodel, and add technology after installation.",
    prevention:
      "Leave spare rack space, switch capacity, fiber strands, and pathway capacity for future growth.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "best-practice",
    ],
  },
];
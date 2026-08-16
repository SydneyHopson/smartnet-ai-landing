import type { PlaybookUpsellOpportunity } from "../playbook";

export const officeUpsellOpportunities: PlaybookUpsellOpportunity[] = [
  {
    id: "office.upsell.managedNetwork",
    title: "Managed Network Support",
    description:
      "Provide remote monitoring, firmware management, configuration backup, switch health alerts, firewall oversight, wireless monitoring, and priority technical support.",
    valueStatement:
      "Reduces downtime and gives the customer ongoing visibility into critical office network infrastructure.",
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
      "network-support",
    ],
  },

  {
    id: "office.upsell.internetFailover",
    title: "Backup Internet Connectivity",
    description:
      "Add cellular or secondary-provider internet failover for critical business applications, phones, conferencing, cloud systems, and security platforms.",
    valueStatement:
      "Helps preserve business operations when the primary internet connection fails.",
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
    id: "office.upsell.networkAccessControl",
    title: "Network Access Control",
    description:
      "Add device authentication, profiling, policy enforcement, guest onboarding, segmentation, and visibility for managed and unmanaged endpoints.",
    valueStatement:
      "Improves control over employee, visitor, contractor, IoT, printer, audiovisual, and unknown network devices.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "network-access-control",
      "device-visibility",
      "cybersecurity",
      "endpoint-control",
    ],
  },

  {
    id: "office.upsell.secureRemoteAccess",
    title: "Secure Remote Access",
    description:
      "Provide managed VPN, zero-trust access, multi-factor authentication, and secure administrative access for approved users and vendors.",
    valueStatement:
      "Improves remote-work security while reducing uncontrolled access to internal office systems.",
    conditions: [
      {
        field: "network.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "remote-access",
      "zero-trust",
      "multi-factor-authentication",
      "cybersecurity",
    ],
  },

  {
    id: "office.upsell.wirelessValidation",
    title: "Post-Installation Wireless Validation",
    description:
      "Perform onsite testing for coverage, signal strength, interference, roaming, channel utilization, client performance, and high-density areas.",
    valueStatement:
      "Confirms that wireless performance supports real office workflows rather than relying only on predictive design.",
    conditions: [
      {
        field: "wifi.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "wifi-validation",
      "wireless-survey",
      "quality-assurance",
      "roaming-validation",
    ],
  },

  {
    id: "office.upsell.guestWifiPortal",
    title: "Managed Guest Wi-Fi Portal",
    description:
      "Add branded guest access, visitor sponsorship, legal acceptance, time limits, bandwidth controls, reporting, and isolated internet access.",
    valueStatement:
      "Improves the visitor experience while protecting employee and business networks.",
    conditions: [
      {
        field: "wifi.guestNetworkRequired",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "guest-wifi",
      "captive-portal",
      "visitor-connectivity",
      "network-segmentation",
    ],
  },

  {
    id: "office.upsell.videoAnalytics",
    title: "Intelligent Video Analytics",
    description:
      "Add approved analytics such as intrusion detection, line crossing, loitering, occupancy counting, object detection, and perimeter alerts.",
    valueStatement:
      "Improves security awareness and helps staff identify important events without continuously watching live video.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "video-analytics",
      "security-monitoring",
      "operational-intelligence",
    ],
  },

  {
    id: "office.upsell.cloudVideoBackup",
    title: "Cloud Video Backup",
    description:
      "Add cloud retention for selected entrances, server rooms, executive areas, parking locations, or other approved critical cameras.",
    valueStatement:
      "Protects important footage against recorder theft, physical damage, storage failure, or onsite equipment loss.",
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
      "video-resilience",
    ],
  },

  {
    id: "office.upsell.remoteVideoMonitoring",
    title: "Remote Video Monitoring",
    description:
      "Provide event-based remote monitoring, escalation workflows, after-hours alerting, and supported response procedures for approved camera areas.",
    valueStatement:
      "Extends surveillance beyond passive recording and improves response to after-hours security events.",
    conditions: [
      {
        field: "cameras.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "remote-monitoring",
      "video-monitoring",
      "security-service",
      "recurring-revenue",
    ],
  },

  {
    id: "office.upsell.mobileCredentials",
    title: "Mobile Access Credentials",
    description:
      "Allow approved employees, executives, contractors, and tenants to use managed mobile credentials instead of physical cards or keys.",
    valueStatement:
      "Reduces physical credential management while improving convenience, auditability, and credential lifecycle control.",
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
    id: "office.upsell.visitorManagement",
    title: "Visitor Management System",
    description:
      "Add visitor preregistration, self-service check-in, badge printing, host notification, approval workflows, temporary credentials, and visitor records.",
    valueStatement:
      "Improves lobby security and creates a more professional, traceable visitor experience.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "visitor-management",
      "temporary-credentials",
      "lobby-security",
      "audit-trail",
    ],
  },

  {
    id: "office.upsell.identityIntegration",
    title: "Identity and HR System Integration",
    description:
      "Integrate access control with supported directories, identity providers, human-resources platforms, single sign-on, and employee lifecycle workflows.",
    valueStatement:
      "Reduces manual credential administration and helps align access permissions with employee status and job role.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "identity-integration",
      "hr-integration",
      "credential-lifecycle",
      "single-sign-on",
    ],
  },

  {
    id: "office.upsell.accessReporting",
    title: "Access-Control Reporting Package",
    description:
      "Add forced-door alerts, held-door alerts, scheduled reports, remote administration, event retention, and executive security reporting.",
    valueStatement:
      "Improves visibility into access events and helps security teams identify abnormal activity.",
    conditions: [
      {
        field: "accessControl.requested",
        operator: "is_true",
      },
    ],
    ruleTags: [
      "access-audit",
      "event-reporting",
      "security-monitoring",
      "remote-management",
    ],
  },

  {
    id: "office.upsell.standardizedConferenceRooms",
    title: "Standardized Conference-Room Package",
    description:
      "Standardize huddle, small, medium, large, training, and boardroom designs using consistent displays, cameras, microphones, speakers, controls, cabling, and support procedures.",
    valueStatement:
      "Creates a consistent meeting experience and reduces training, troubleshooting, spare-parts, and support complexity.",
    conditions: [],
    ruleTags: [
      "conference-room-standardization",
      "av-design",
      "supportability",
      "user-experience",
    ],
  },

  {
    id: "office.upsell.roomScheduling",
    title: "Room and Desk Scheduling",
    description:
      "Add scheduling panels, room check-in, calendar integration, occupancy sensing, automatic room release, desk booking, and workspace analytics.",
    valueStatement:
      "Improves room and workspace utilization while reducing scheduling conflicts and unused reservations.",
    conditions: [],
    ruleTags: [
      "room-scheduling",
      "desk-booking",
      "occupancy-sensing",
      "workspace-analytics",
    ],
  },

  {
    id: "office.upsell.avMonitoring",
    title: "Conference-Room Remote Monitoring",
    description:
      "Add centralized room health monitoring, peripheral status, configuration backup, firmware management, alerting, and remote troubleshooting.",
    valueStatement:
      "Reduces meeting disruptions and helps support teams resolve room issues before users report them.",
    conditions: [],
    ruleTags: [
      "av-monitoring",
      "conference-room-support",
      "managed-services",
      "recurring-revenue",
    ],
  },

  {
    id: "office.upsell.digitalSignage",
    title: "Managed Digital Signage",
    description:
      "Add centrally managed lobby displays, wayfinding, employee communications, dashboards, reception messaging, and emergency content workflows.",
    valueStatement:
      "Improves internal communication and allows content to be updated quickly across multiple office locations.",
    conditions: [],
    ruleTags: [
      "digital-signage",
      "content-management",
      "employee-communications",
      "wayfinding",
    ],
  },

  {
    id: "office.upsell.soundMasking",
    title: "Sound Masking and Speech Privacy",
    description:
      "Add professionally designed and commissioned sound masking for open offices, private offices, executive areas, human resources, legal, finance, and call-center environments.",
    valueStatement:
      "Improves speech privacy, reduces distractions, and creates a more comfortable office environment.",
    conditions: [],
    ruleTags: [
      "sound-masking",
      "speech-privacy",
      "acoustic-design",
      "workplace-comfort",
    ],
  },

  {
    id: "office.upsell.occupancyAnalytics",
    title: "Workspace Occupancy Analytics",
    description:
      "Add occupancy sensors and reporting for conference rooms, desks, collaboration spaces, common areas, and office utilization.",
    valueStatement:
      "Helps the customer understand how spaces are used and supports future workplace planning decisions.",
    conditions: [],
    ruleTags: [
      "occupancy-analytics",
      "workspace-utilization",
      "smart-office",
      "space-planning",
    ],
  },

  {
    id: "office.upsell.upsRuntime",
    title: "Extended UPS Runtime",
    description:
      "Increase battery runtime for network, internet, phones, cameras, access control, conferencing, and other critical office systems.",
    valueStatement:
      "Reduces disruption during short outages and supports controlled system shutdown during longer power events.",
    conditions: [],
    ruleTags: [
      "ups",
      "power-resilience",
      "business-continuity",
    ],
  },

  {
    id: "office.upsell.remotePowerManagement",
    title: "Remote Power Management",
    description:
      "Add managed power distribution, outlet monitoring, remote reboot capability, environmental alerts, and power-event logging for telecom and audiovisual equipment.",
    valueStatement:
      "Allows support teams to recover equipment remotely and reduces unnecessary onsite service calls.",
    conditions: [],
    ruleTags: [
      "remote-power-management",
      "managed-pdu",
      "remote-support",
      "serviceability",
    ],
  },

  {
    id: "office.upsell.preventiveMaintenance",
    title: "Preventive Maintenance Plan",
    description:
      "Provide scheduled network health checks, camera cleaning, UPS testing, access-control inspection, conference-room testing, firmware updates, and documentation review.",
    valueStatement:
      "Reduces unexpected failures and keeps office technology reliable during daily operations.",
    conditions: [],
    ruleTags: [
      "preventive-maintenance",
      "service-contract",
      "recurring-revenue",
      "system-reliability",
    ],
  },

  {
    id: "office.upsell.configurationBackup",
    title: "Secure Configuration Backup",
    description:
      "Maintain encrypted backups of network, firewall, wireless, access-control, camera, audiovisual, room-scheduling, and signage configurations.",
    valueStatement:
      "Speeds system recovery after equipment failure, replacement, corruption, or accidental configuration loss.",
    conditions: [],
    ruleTags: [
      "configuration-backup",
      "disaster-recovery",
      "managed-services",
    ],
  },

  {
    id: "office.upsell.assetDocumentation",
    title: "Digital Asset and As-Built Documentation",
    description:
      "Provide searchable cable records, device inventories, rack elevations, floor plans, photos, IP information, warranties, test results, and configuration references.",
    valueStatement:
      "Makes future maintenance, troubleshooting, moves, additions, and upgrades faster and more accurate.",
    conditions: [],
    ruleTags: [
      "asset-documentation",
      "as-built",
      "serviceability",
      "closeout",
    ],
  },

  {
    id: "office.upsell.futureExpansion",
    title: "Future Expansion Capacity",
    description:
      "Reserve rack units, switch ports, PoE capacity, fiber strands, conduit, floor pathways, cable tray, licenses, and spare cabling for future office growth.",
    valueStatement:
      "Reduces future upgrade costs and limits disruption when employees, rooms, devices, or office areas are added.",
    conditions: [],
    ruleTags: [
      "future-expansion",
      "capacity-planning",
      "scalability",
    ],
  },
];
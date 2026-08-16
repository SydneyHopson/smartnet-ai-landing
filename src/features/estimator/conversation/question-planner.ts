import type { ProjectEstimate } from "../domain/project-estimate";

export type EstimatorQuestionPriority =
  | "critical"
  | "high"
  | "normal"
  | "optional";

export type EstimatorQuestion = {
  key: string;
  question: string;
  reason: string;
  priority: EstimatorQuestionPriority;
  category:
    | "project"
    | "property"
    | "cameras"
    | "network"
    | "wifi"
    | "access_control"
    | "cabling"
    | "installation"
    | "commercial";
};

const priorityOrder: Record<
  EstimatorQuestionPriority,
  number
> = {
  critical: 0,
  high: 1,
  normal: 2,
  optional: 3,
};

function hasKnownQuantity(quantity: {
  value: number | null;
}): boolean {
  return quantity.value !== null;
}

function addQuestion(
  questions: EstimatorQuestion[],
  question: EstimatorQuestion
): void {
  const alreadyExists = questions.some(
    (existing) => existing.key === question.key
  );

  if (alreadyExists) {
    return;
  }

  questions.push(question);
}

export function getEstimatorQuestions(
  project: ProjectEstimate
): EstimatorQuestion[] {
  const questions: EstimatorQuestion[] = [];

  /*
   * ==========================================
   * PROJECT BASICS
   *
   * Only ask what is required to build
   * an accurate preliminary estimate.
   * ==========================================
   */

  if (!project.customerIntent.summary.trim()) {
    addQuestion(questions, {
      key: "customerIntent.summary",
      question:
        "What are you looking to install or improve?",
      reason: "Defines project scope.",
      priority: "critical",
      category: "project",
    });
  }

  if (!project.property.projectType) {
    addQuestion(questions, {
      key: "property.projectType",
      question: "What type of property is this?",
      reason:
        "Property type drives pricing and playbook selection.",
      priority: "critical",
      category: "property",
    });
  }

  if (
    !hasKnownQuantity(
      project.property.squareFootage
    )
  ) {
    addQuestion(questions, {
      key: "property.squareFootage",
      question:
        "About how many square feet is the project area?",
      reason:
        "Square footage drives labor and equipment estimates.",
      priority: "critical",
      category: "property",
    });
  }

  if (
    project.property.constructionType ===
    "unknown"
  ) {
    addQuestion(questions, {
      key: "property.constructionType",
      question:
        "Is this an existing building, renovation, unfinished space, or new construction?",
      reason:
        "Construction type greatly impacts labor.",
      priority: "critical",
      category: "property",
    });
  }

  if (
    project.property.ceilingType ===
    "unknown"
  ) {
    addQuestion(questions, {
      key: "property.ceilingType",
      question:
        "What kind of ceiling does the building have?",
      reason:
        "Ceiling type affects cable installation.",
      priority: "high",
      category: "property",
    });
  }

  if (
    !hasKnownQuantity(
      project.property.ceilingHeightFeet
    )
  ) {
    addQuestion(questions, {
      key: "property.ceilingHeightFeet",
      question:
        "Approximately how tall are the ceilings?",
      reason:
        "Ceiling height determines access equipment and labor.",
      priority: "high",
      category: "property",
    });
  }

  /*
   * Occupied building status is not required for
   * an initial estimate. Collect it during scheduling.
   */

  /*
   * ======================================================
   * CAMERA SCOPE
   *
   * Only ask pricing-critical questions.
   * Site-specific questions are collected during walkthrough.
   * ======================================================
   */

  if (project.cameras.requested) {
    if (
      !hasKnownQuantity(
        project.cameras.interiorCount
      )
    ) {
      addQuestion(questions, {
        key: "cameras.interiorCount",
        question:
          "About how many indoor cameras do you need?",
        reason:
          "Primary equipment cost driver.",
        priority: "critical",
        category: "cameras",
      });
    }

    if (
      !hasKnownQuantity(
        project.cameras.exteriorCount
      )
    ) {
      addQuestion(questions, {
        key: "cameras.exteriorCount",
        question:
          "About how many outdoor cameras do you need?",
        reason:
          "Primary exterior equipment cost driver.",
        priority: "critical",
        category: "cameras",
      });
    }

    if (
      project.cameras.coverageGoals.length ===
      0
    ) {
      addQuestion(questions, {
        key: "cameras.coverageGoals",
        question:
          "What areas do you want covered?",
        reason:
          "Determines camera placement and specialty hardware.",
        priority: "high",
        category: "cameras",
      });
    }

    if (
      !hasKnownQuantity(
        project.cameras.recordingDays
      )
    ) {
      addQuestion(questions, {
        key: "cameras.recordingDays",
        question:
          "How many days should video recordings be stored?",
        reason:
          "Storage size affects pricing.",
        priority: "high",
        category: "cameras",
      });
    }

    if (
      project.cameras.existingSystem ===
      null
    ) {
      addQuestion(questions, {
        key: "cameras.existingSystem",
        question:
          "Are you replacing an existing camera system?",
        reason:
          "Replacement projects have different labor assumptions.",
        priority: "normal",
        category: "cameras",
      });
    }

    /*
     * Removed:
     *
     * cameras.remoteViewingRequired
     * cameras.mountingSurfaces
     *
     * These do not materially affect a preliminary estimate.
     */
  }

  /*
   * ======================================================
   * NETWORK / INTERNET
   *
   * Only collect information that materially changes pricing.
   * Everything else can be discovered during the walkthrough.
   * ======================================================
   */

  const networkingIsRequired =
    project.network.requested ||
    project.wifi.requested ||
    project.cameras.requested ||
    project.accessControl.requested;

  if (networkingIsRequired) {
    if (
      project.network.existingRouter === null
    ) {
      addQuestion(questions, {
        key: "network.existingRouter",
        question:
          "Will we be using your existing internet equipment?",
        reason:
          "Determines whether new networking equipment must be quoted.",
        priority: "high",
        category: "network",
      });
    }

    if (
      project.network.existingRack === null
    ) {
      addQuestion(questions, {
        key: "network.existingRack",
        question:
          "Do you already have a network rack or cabinet?",
        reason:
          "Determines whether rack hardware needs to be included.",
        priority: "normal",
        category: "network",
      });
    }

    if (
      project.network.existingRack ===
        false &&
      project.network.rackRequired ===
        null
    ) {
      addQuestion(questions, {
        key: "network.rackRequired",
        question:
          "Would you like SmartNET to provide a network rack?",
        reason:
          "Rack hardware changes equipment pricing.",
        priority: "normal",
        category: "network",
      });
    }

    /*
     * Removed:
     *
     * network.internetProvider
     * network.existingSwitches
     * network.rackLocation
     */
  }

  /*
   * ======================================================
   * WI-FI
   *
   * Keep only questions that influence pricing.
   * ======================================================
   */

  if (project.wifi.requested) {
    if (
      project.wifi.coverageGoals.length ===
      0
    ) {
      addQuestion(questions, {
        key: "wifi.coverageGoals",
        question:
          "Where do you need reliable Wi-Fi coverage?",
        reason:
          "Coverage area determines access-point quantity and placement.",
        priority: "critical",
        category: "wifi",
      });
    }

    if (
      !hasKnownQuantity(
        project.wifi
          .estimatedConcurrentUsers
      )
    ) {
      addQuestion(questions, {
        key:
          "wifi.estimatedConcurrentUsers",
        question:
          "About how many people or devices will be connected at one time?",
        reason:
          "Concurrent users determine Wi-Fi capacity.",
        priority: "high",
        category: "wifi",
      });
    }

    if (
      project.wifi.guestNetworkRequired ===
      null
    ) {
      addQuestion(questions, {
        key: "wifi.guestNetworkRequired",
        question:
          "Do you want a separate guest Wi-Fi network?",
        reason:
          "Guest Wi-Fi may require additional configuration.",
        priority: "normal",
        category: "wifi",
      });
    }

    /*
     * Removed:
     *
     * wifi.indoorCoverage
     * wifi.outdoorCoverage
     */
  }

  /*
   * ======================================================
   * ACCESS CONTROL
   *
   * Only ask questions that materially affect pricing.
   * ======================================================
   */

  if (project.accessControl.requested) {
    if (
      !hasKnownQuantity(
        project.accessControl
          .controlledDoorCount
      )
    ) {
      addQuestion(questions, {
        key:
          "accessControl.controlledDoorCount",
        question:
          "How many doors would you like to secure with access control?",
        reason:
          "Door count is the largest driver of access-control pricing.",
        priority: "critical",
        category: "access_control",
      });
    }

    if (
      project.accessControl.credentialTypes
        .length === 0
    ) {
      addQuestion(questions, {
        key:
          "accessControl.credentialTypes",
        question:
          "How would you like people to unlock the doors?",
        reason:
          "Credential type determines readers and licensing.",
        priority: "normal",
        category: "access_control",
      });
    }

    if (
      project.accessControl.existingSystem ===
      null
    ) {
      addQuestion(questions, {
        key:
          "accessControl.existingSystem",
        question:
          "Do you already have an access control system installed?",
        reason:
          "Existing equipment may be reused or replaced.",
        priority: "normal",
        category: "access_control",
      });
    }

    /*
     * Removed:
     *
     * accessControl.remoteManagementRequired
     */
  }

  /*
   * ======================================================
   * CABLING AND INSTALLATION
   *
   * Ask only what materially changes pricing.
   * Everything else is verified during the walkthrough.
   * ======================================================
   */

  const cablingIsRequired =
    project.network.requested ||
    project.wifi.requested ||
    project.cameras.requested ||
    project.accessControl.requested;

  if (cablingIsRequired) {
    if (
      project.cabling
        .existingCablingAvailable === null
    ) {
      addQuestion(questions, {
        key:
          "cabling.existingCablingAvailable",
        question:
          "Can we reuse any of the existing network cabling?",
        reason:
          "Reusing cabling can significantly reduce labor and material costs.",
        priority: "high",
        category: "cabling",
      });
    }

    if (
      project.cabling.pathwayType.length ===
      0
    ) {
      addQuestion(questions, {
        key: "cabling.pathwayType",
        question:
          "How will new cables most likely be run?",
        reason:
          "Cable pathways have the biggest impact on labor.",
        priority: "critical",
        category: "cabling",
      });
    }
  }

  if (
    cablingIsRequired &&
    project.installation.liftRequired ===
      null
  ) {
    addQuestion(questions, {
      key: "installation.liftRequired",
      question:
        "Will the installation require work higher than a normal ladder can safely reach?",
      reason:
        "Lift equipment greatly affects labor and equipment pricing.",
      priority: "high",
      category: "installation",
    });
  }

  if (
    cablingIsRequired &&
    project.installation
      .afterHoursRequired === null
  ) {
    addQuestion(questions, {
      key:
        "installation.afterHoursRequired",
      question:
        "Does this work need to happen outside normal business hours?",
      reason:
        "After-hours work increases labor cost.",
      priority: "normal",
      category: "installation",
    });
  }

  /*
   * Removed:
   *
   * cabling.wiringStyle
   * cabling.trenchingRequired
   *
   * These are normally discovered during the walkthrough.
   */

  /*
   * ======================================================
   * COMMERCIAL / FUTURE EXPANSION
   *
   * Nice-to-have information only.
   * Do not slow down the estimate.
   * ======================================================
   */

  const isCommercial =
    project.property.projectType !==
      null &&
    project.property.projectType !==
      "residential";

  if (
    isCommercial &&
    project.customerIntent
      .futureExpansion === null
  ) {
    addQuestion(questions, {
      key:
        "customerIntent.futureExpansion",
      question:
        "Do you expect this system to grow in the future?",
      reason:
        "Expansion planning can influence switch sizing, rack space, and spare capacity.",
      priority: "optional",
      category: "commercial",
    });
  }

  return questions.sort(
    (first, second) => {
      const priorityDifference =
        priorityOrder[first.priority] -
        priorityOrder[second.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return first.key.localeCompare(
        second.key
      );
    }
  );
}

export function getNextEstimatorQuestion(
  project: ProjectEstimate
): EstimatorQuestion | null {
  return (
    getEstimatorQuestions(project)[0] ??
    null
  );
}

export function getUnansweredEstimatorQuestionKeys(
  project: ProjectEstimate
): string[] {
  return getEstimatorQuestions(
    project
  ).map((question) => question.key);
}

export function isProjectReadyForPreliminaryPricing(
  project: ProjectEstimate
): boolean {
  return !getEstimatorQuestions(
    project
  ).some(
    (question) =>
      question.priority ===
        "critical" ||
      question.priority === "high"
  );
}
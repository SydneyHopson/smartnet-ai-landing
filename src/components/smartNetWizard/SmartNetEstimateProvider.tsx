"use client";

import * as React from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

/* -------------------------------------------------------------------------- */
/* Wizard types                                                                */
/* -------------------------------------------------------------------------- */

export type ProjectType =
  | "home"
  | "office"
  | "retail"
  | "restaurant"
  | "warehouse"
  | "industrial"
  | "medical"
  | "education"
  | "hospitality"
  | "religious"
  | "datacenter"
  | "multi_location"
  | "other";

export type CoveragePreset =
  | "entry"
  | "common"
  | "full";

export type WifiLayoutPreset =
  | "few"
  | "balanced"
  | "dense";

export type AccessPreset =
  | "none"
  | "fewDoors"
  | "manyDoors";

export type WiringStyle =
  | "exposed"
  | "hidden"
  | "mix";

export type RackLocation =
  | "hall"
  | "garage"
  | "dedicated";

export type TimelinePreference =
  | "flexible"
  | "month"
  | "rush";

export type FocusState = {
  cameras: boolean;
  wifi: boolean;
  accessControl: boolean;
};

export type ExtrasState = {
  speakers: boolean;
  wallDisplays: boolean;
  miniRack: boolean;
  batteryUps: boolean;
};

export type SmartNetEstimate = {
  projectType: ProjectType;

  /**
   * A value of 0 means the customer does not know the square footage yet.
   * The API seed omits squareFootage when this value is 0.
   */
  squareFootage: number;

  focus: FocusState;

  notes: string;

  coveragePreset:
    | CoveragePreset
    | null;

  wifiLayoutPreset:
    | WifiLayoutPreset
    | null;

  accessPreset:
    | AccessPreset
    | null;

  extras: ExtrasState;

  wiringStyle:
    | WiringStyle
    | null;

  rackLocation:
    | RackLocation
    | null;

  timeline:
    | TimelinePreference
    | null;

  roughLow: number;

  roughHigh: number;
};

/* -------------------------------------------------------------------------- */
/* Magic-link types                                                            */
/* -------------------------------------------------------------------------- */

export type MagicLinkEstimate = {
  projectType?: string;

  squareFootage?: number;

  focus?: string[];

  coverageProfile?: string;

  wifiLayout?: string;

  doorsAccess?: string;

  extras?: string[];

  wiringStyle?: string;

  rackLocation?: string;

  timeline?: string;

  roughLow?: number;

  roughHigh?: number;

  notes?: string;
};

/* -------------------------------------------------------------------------- */
/* Estimator API types                                                         */
/* -------------------------------------------------------------------------- */

export type EstimatorConversationMessage = {
  id: string;

  role:
    | "assistant"
    | "user"
    | "system";

  content: string;

  createdAt: string;
};

export type EstimatorConversation = {
  sessionId: string;

  status: string;

  messages:
    EstimatorConversationMessage[];

  currentQuestion:
    | string
    | null;

  currentQuestionKey:
    | string
    | null;

  unansweredQuestionKeys:
    string[];

  completedQuestionKeys:
    string[];

  lastCustomerMessage?:
    | string
    | null;

  lastAssistantMessage:
    | string
    | null;

  readyForPricing: boolean;

  confidenceScore: number;

  createdAt: string;

  updatedAt: string;
};

export type EstimatorNextQuestion = {
  key: string;

  questionId:
    | string
    | null;

  question: string;

  reason: string;

  category: string;

  priority: string;

  answerType: string;

  choices: string[];

  promptGuidance: string;

  source: string;

  playbookId:
    | string
    | null;
};

export type EstimatorPricing = {
  status: string;

  materialCost: number;

  laborCost: number;

  equipmentRentalCost: number;

  travelCost: number;

  permitCost: number;

  otherCost: number;

  directCost: number;

  overheadAmount: number;

  markupAmount: number;

  estimatedLow: number;

  estimatedHigh: number;

  targetMarginPercent: number;

  catalogVersion:
    | string
    | null;
};

export type EstimatorProject = {
  status?: string;

  customerIntent?: {
    summary?: string;

    goals?: string[];

    problems?: string[];

    futureExpansion?:
      | string
      | null;
  };

  property?: {
    projectType?:
      | string
      | null;

    customProjectType?:
      | string
      | null;

    squareFootage?: {
      value:
        | number
        | null;

      confidence: string;
    };

    numberOfFloors?: {
      value:
        | number
        | null;

      confidence: string;
    };

    constructionType?: string;

    ceilingType?: string;

    ceilingHeightFeet?: {
      value:
        | number
        | null;

      confidence: string;
    };
  };

  cameras?: {
    requested?: boolean;

    interiorCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    exteriorCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    specialtyCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    coverageGoals?: string[];

    recordingDays?: {
      value:
        | number
        | null;

      confidence: string;
    };

    remoteViewingRequired?:
      | boolean
      | null;
  };

  network?: {
    requested?: boolean;

    internetProvider?:
      | string
      | null;

    existingRouter?:
      | boolean
      | null;

    existingSwitches?:
      | boolean
      | null;

    existingRack?:
      | boolean
      | null;

    rackRequired?:
      | boolean
      | null;

    rackLocation?:
      | string
      | null;

    vlanRequired?:
      | boolean
      | null;
  };

  wifi?: {
    requested?: boolean;

    estimatedAccessPointCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    estimatedConcurrentUsers?: {
      value:
        | number
        | null;

      confidence: string;
    };

    coverageGoals?: string[];

    weakAreas?: string[];

    indoorCoverage?:
      | boolean
      | null;

    outdoorCoverage?:
      | boolean
      | null;

    guestNetworkRequired?:
      | boolean
      | null;
  };

  accessControl?: {
    requested?: boolean;

    controlledDoorCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    exteriorDoorCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    interiorDoorCount?: {
      value:
        | number
        | null;

      confidence: string;
    };

    credentialTypes?: string[];

    existingSystem?:
      | boolean
      | null;

    remoteManagementRequired?:
      | boolean
      | null;
  };

  cabling?: {
    preferredCableType?: string;

    pathwayType?: string[];

    wiringStyle?: string;

    estimatedCableFeet?: {
      value:
        | number
        | null;

      confidence: string;
    };
  };

  installation?: {
    liftRequired?:
      | boolean
      | null;

    liftType?:
      | string
      | null;

    afterHoursRequired?:
      | boolean
      | null;

    permitsRequired?:
      | boolean
      | null;

    difficultyLevel?: string;

    estimatedCrewSize?: {
      value:
        | number
        | null;

      confidence: string;
    };

    estimatedLaborHours?: {
      value:
        | number
        | null;

      confidence: string;
    };

    estimatedDurationDays?: {
      value:
        | number
        | null;

      confidence: string;
    };
  };

  equipment?: {
    recommendedItems?: unknown[];
  };

  pricing?: EstimatorPricing;

  assessment?: {
    scopeSummary?: string;

    assumptions?: string[];

    exclusions?: string[];

    risks?: string[];

    unansweredQuestions?: string[];

    walkthroughRequired?: boolean;

    confidenceScore?: number;
  };
};

export type EstimatorPlaybook = {
  id: string;

  name: string;

  version: string;

  description?: string;

  aiGuidance?: string;
};

type EstimatorStartResponse = {
  ok: boolean;

  sessionId?: string;

  project?: EstimatorProject;

  conversation?:
    EstimatorConversation;

  playbook?:
    | EstimatorPlaybook
    | null;

  playbookResolution?: unknown;

  error?: string;
};

type EstimatorAnswerResponse = {
  ok: boolean;

  sessionId?: string;

  normalizedAnswer?: unknown;

  project?: EstimatorProject;

  conversation?:
    EstimatorConversation;

  nextQuestion?:
    | EstimatorNextQuestion
    | null;

  playbook?:
    | EstimatorPlaybook
    | null;

  playbookResolution?: unknown;

  error?: string;

  field?: string;

  questionKey?: string;
};

type EstimatorFinalizeResponse = {
  ok: boolean;

  sessionId?: string;

  quoteId?: string;

  proposalId?: string;

  projectStatus?: string;

  conversationStatus?: string;

  pricing?: EstimatorPricing;

  recommendedEquipment?: unknown[];

  quote?: unknown;

  proposal?: unknown;

  project?: EstimatorProject;

  conversation?:
    EstimatorConversation;

  error?: string;

  currentQuestion?:
    | string
    | null;

  currentQuestionKey?:
    | string
    | null;

  unansweredQuestionKeys?: string[];
};

export type SmartNetEstimatorState = {
  sessionId:
    | string
    | null;

  project:
    | EstimatorProject
    | null;

  conversation:
    | EstimatorConversation
    | null;

  nextQuestion:
    | EstimatorNextQuestion
    | null;

  playbook:
    | EstimatorPlaybook
    | null;

  playbookResolution: unknown;

  quoteId:
    | string
    | null;

  proposalId:
    | string
    | null;

  quote: unknown;

  proposal: unknown;

  isStarting: boolean;

  isAnswering: boolean;

  isFinalizing: boolean;

  error:
    | string
    | null;
};

type SmartNetEstimateContextValue = {
  estimate: SmartNetEstimate;

  updateEstimate: (
    patch:
      Partial<SmartNetEstimate>
  ) => void;

  hydrateFromMagicLink: (
    flat:
      MagicLinkEstimate
  ) => void;

  estimator:
    SmartNetEstimatorState;

  startEstimator: () =>
    Promise<boolean>;

  answerEstimator: (
    answer: unknown
  ) => Promise<boolean>;

  finalizeEstimator: () =>
    Promise<boolean>;

  clearEstimatorError: () =>
    void;

  resetEstimatorSession: () =>
    void;
};

/* -------------------------------------------------------------------------- */
/* Context                                                                     */
/* -------------------------------------------------------------------------- */

const SmartNetEstimateContext =
  React.createContext<
    SmartNetEstimateContextValue | null
  >(null);

const initialEstimate:
  SmartNetEstimate = {
  projectType:
    "home",

  squareFootage:
    0,

  focus: {
    cameras:
      true,

    wifi:
      true,

    accessControl:
      false,
  },

  notes:
    "",

  coveragePreset:
    null,

  wifiLayoutPreset:
    null,

  accessPreset:
    null,

  extras: {
    speakers:
      false,

    wallDisplays:
      false,

    miniRack:
      false,

    batteryUps:
      false,
  },

  wiringStyle:
    null,

  rackLocation:
    null,

  timeline:
    null,

  roughLow:
    0,

  roughHigh:
    0,
};

const initialEstimatorState:
  SmartNetEstimatorState = {
  sessionId:
    null,

  project:
    null,

  conversation:
    null,

  nextQuestion:
    null,

  playbook:
    null,

  playbookResolution:
    null,

  quoteId:
    null,

  proposalId:
    null,

  quote:
    null,

  proposal:
    null,

  isStarting:
    false,

  isAnswering:
    false,

  isFinalizing:
    false,

  error:
    null,
};

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */

export function SmartNetEstimateProvider({
  children,
}: {
  children:
    React.ReactNode;
}) {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [
    estimate,
    setEstimate,
  ] =
    React.useState<SmartNetEstimate>(
      initialEstimate
    );

  const [
    estimator,
    setEstimator,
  ] =
    React.useState<SmartNetEstimatorState>(
      initialEstimatorState
    );

  const updateEstimate =
    React.useCallback(
      (
        patch:
          Partial<SmartNetEstimate>
      ) => {
        setEstimate(
          (previousEstimate) => ({
            ...previousEstimate,

            ...patch,

            focus:
              patch.focus
                ? {
                    ...previousEstimate.focus,

                    ...patch.focus,
                  }
                : previousEstimate.focus,

            extras:
              patch.extras
                ? {
                    ...previousEstimate.extras,

                    ...patch.extras,
                  }
                : previousEstimate.extras,
          })
        );
      },
      []
    );

  const clearEstimatorError =
    React.useCallback(() => {
      setEstimator(
        (previousEstimator) => ({
          ...previousEstimator,

          error:
            null,
        })
      );
    }, []);

  const resetEstimatorSession =
    React.useCallback(() => {
      setEstimator(
        initialEstimatorState
      );
    }, []);

  const startEstimator =
    React.useCallback(
      async (): Promise<boolean> => {
        setEstimator(
          (
            previousEstimator
          ) => ({
            ...previousEstimator,

            isStarting:
              true,

            error:
              null,
          })
        );

        try {
          const seed = {
            projectType:
              toBackendProjectType(
                estimate.projectType
              ),

            customerIntent:
              createCustomerIntent(
                estimate
              ),

            ...(estimate.squareFootage >
            0
              ? {
                  squareFootage:
                    estimate.squareFootage,
                }
              : {}),

            cameras:
              estimate.focus.cameras,

            wifi:
              estimate.focus.wifi,

            accessControl:
              estimate.focus
                .accessControl,
          };

          const response =
            await fetch(
              "/api/estimator/start",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                cache:
                  "no-store",

                body:
                  JSON.stringify({
                    seed,
                  }),
              }
            );

          const data =
            (await response.json()) as
              EstimatorStartResponse;

          if (
            !response.ok ||
            !data.ok ||
            !data.sessionId ||
            !data.project ||
            !data.conversation
          ) {
            throw new Error(
              data.error ??
                "Unable to start the SmartNET AI estimator."
            );
          }

          const conversation =
            data.conversation;

          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              sessionId:
                data.sessionId ??
                null,

              project:
                data.project ??
                null,

              conversation,

              nextQuestion:
                createNextQuestionFromConversation(
                  conversation
                ),

              playbook:
                data.playbook ??
                null,

              playbookResolution:
                data.playbookResolution ??
                null,

              quoteId:
                null,

              proposalId:
                null,

              quote:
                null,

              proposal:
                null,

              isStarting:
                false,

              error:
                null,
            })
          );

          return true;
        } catch (error) {
          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              isStarting:
                false,

              error:
                error instanceof Error
                  ? error.message
                  : "Unable to start the SmartNET AI estimator.",
            })
          );

          return false;
        }
      },
      [estimate]
    );

  const answerEstimator =
    React.useCallback(
      async (
        answer: unknown
      ): Promise<boolean> => {
        if (
          !estimator.sessionId
        ) {
          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              error:
                "Start the estimator before submitting an answer.",
            })
          );

          return false;
        }

        setEstimator(
          (
            previousEstimator
          ) => ({
            ...previousEstimator,

            isAnswering:
              true,

            error:
              null,
          })
        );

        try {
          const response =
            await fetch(
              "/api/estimator/answer",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                cache:
                  "no-store",

                body:
                  JSON.stringify({
                    sessionId:
                      estimator.sessionId,

                    answer,
                  }),
              }
            );

          const data =
            (await response.json()) as
              EstimatorAnswerResponse;

          if (
            !response.ok ||
            !data.ok ||
            !data.project ||
            !data.conversation
          ) {
            throw new Error(
              data.error ??
                "Unable to process the estimator answer."
            );
          }

          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              project:
                data.project ??
                null,

              conversation:
                data.conversation ??
                null,

              nextQuestion:
                data.nextQuestion ??
                null,

              playbook:
                data.playbook ??
                previousEstimator
                  .playbook,

              playbookResolution:
                data.playbookResolution ??
                previousEstimator
                  .playbookResolution,

              isAnswering:
                false,

              error:
                null,
            })
          );

          syncWizardPricingFromProject(
            data.project,
            setEstimate
          );

          return true;
        } catch (error) {
          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              isAnswering:
                false,

              error:
                error instanceof Error
                  ? error.message
                  : "Unable to process the estimator answer.",
            })
          );

          return false;
        }
      },
      [estimator.sessionId]
    );

  const finalizeEstimator =
    React.useCallback(
      async (): Promise<boolean> => {
        if (
          !estimator.sessionId
        ) {
          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              error:
                "Start the estimator before generating a proposal.",
            })
          );

          return false;
        }

        setEstimator(
          (
            previousEstimator
          ) => ({
            ...previousEstimator,

            isFinalizing:
              true,

            error:
              null,
          })
        );

        try {
          const response =
            await fetch(
              "/api/estimator/finalize",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                cache:
                  "no-store",

                body:
                  JSON.stringify({
                    sessionId:
                      estimator.sessionId,
                  }),
              }
            );

          const data =
            (await response.json()) as
              EstimatorFinalizeResponse;

          if (
            !response.ok ||
            !data.ok
          ) {
            const questionSuffix =
              data.currentQuestion
                ? ` Next question: ${data.currentQuestion}`
                : "";

            throw new Error(
              `${
                data.error ??
                "Unable to finalize the SmartNET estimate."
              }${questionSuffix}`
            );
          }

          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              project:
                data.project ??
                previousEstimator
                  .project,

              conversation:
                data.conversation ??
                previousEstimator
                  .conversation,

              nextQuestion:
                null,

              quoteId:
                data.quoteId ??
                null,

              proposalId:
                data.proposalId ??
                null,

              quote:
                data.quote ??
                null,

              proposal:
                data.proposal ??
                null,

              isFinalizing:
                false,

              error:
                null,
            })
          );

          if (data.project) {
            syncWizardPricingFromProject(
              data.project,
              setEstimate
            );
          } else if (
            data.pricing
          ) {
            setEstimate(
              (
                previousEstimate
              ) => ({
                ...previousEstimate,

                roughLow:
                  data.pricing
                    ?.estimatedLow ??
                  previousEstimate
                    .roughLow,

                roughHigh:
                  data.pricing
                    ?.estimatedHigh ??
                  previousEstimate
                    .roughHigh,
              })
            );
          }

          return true;
        } catch (error) {
          setEstimator(
            (
              previousEstimator
            ) => ({
              ...previousEstimator,

              isFinalizing:
                false,

              error:
                error instanceof Error
                  ? error.message
                  : "Unable to finalize the SmartNET estimate.",
            })
          );

          return false;
        }
      },
      [estimator.sessionId]
    );

  const hydrateFromMagicLink =
    React.useCallback(
      (
        flat:
          MagicLinkEstimate
      ) => {
        setEstimate(
          (
            previousEstimate
          ) => {
            const projectType =
              parseProjectType(
                flat.projectType,
                previousEstimate
                  .projectType
              );

            const squareFootage =
              typeof flat.squareFootage ===
                "number" &&
              flat.squareFootage > 0
                ? flat.squareFootage
                : previousEstimate
                    .squareFootage;

            const focus:
              FocusState = {
              cameras:
                flat.focus?.includes(
                  "Cameras"
                ) ??
                previousEstimate.focus
                  .cameras,

              wifi:
                flat.focus?.includes(
                  "Wi-Fi & APs"
                ) ??
                previousEstimate.focus
                  .wifi,

              accessControl:
                flat.focus?.includes(
                  "Access control"
                ) ??
                previousEstimate.focus
                  .accessControl,
            };

            let coveragePreset =
              previousEstimate
                .coveragePreset;

            if (
              flat.coverageProfile ===
              "Entry points only"
            ) {
              coveragePreset =
                "entry";
            } else if (
              flat.coverageProfile ===
              "Most common areas"
            ) {
              coveragePreset =
                "common";
            } else if (
              flat.coverageProfile ===
              "Full coverage"
            ) {
              coveragePreset =
                "full";
            }

            let wifiLayoutPreset =
              previousEstimate
                .wifiLayoutPreset;

            if (
              flat.wifiLayout ===
              "Few APs"
            ) {
              wifiLayoutPreset =
                "few";
            } else if (
              flat.wifiLayout ===
              "Balanced coverage"
            ) {
              wifiLayoutPreset =
                "balanced";
            } else if (
              flat.wifiLayout ===
              "Dense mesh"
            ) {
              wifiLayoutPreset =
                "dense";
            }

            let accessPreset =
              previousEstimate
                .accessPreset;

            if (
              flat.doorsAccess ===
              "No access control"
            ) {
              accessPreset =
                "none";
            } else if (
              flat.doorsAccess ===
              "Front/back + 1–2 doors"
            ) {
              accessPreset =
                "fewDoors";
            } else if (
              flat.doorsAccess ===
              "Many internal doors"
            ) {
              accessPreset =
                "manyDoors";
            }

            const extras:
              ExtrasState = {
              speakers:
                flat.extras?.includes(
                  "Ceiling speakers"
                ) ??
                previousEstimate
                  .extras.speakers,

              wallDisplays:
                flat.extras?.includes(
                  "Wall displays / screens"
                ) ??
                previousEstimate
                  .extras
                  .wallDisplays,

              miniRack:
                flat.extras?.includes(
                  "Mini network rack"
                ) ??
                previousEstimate
                  .extras.miniRack,

              batteryUps:
                flat.extras?.includes(
                  "Battery backup / UPS"
                ) ??
                previousEstimate
                  .extras.batteryUps,
            };

            let wiringStyle =
              previousEstimate
                .wiringStyle;

            if (
              flat.wiringStyle ===
              "Exposed conduit runs"
            ) {
              wiringStyle =
                "exposed";
            } else if (
              flat.wiringStyle ===
              "Hidden in walls / ceilings"
            ) {
              wiringStyle =
                "hidden";
            } else if (
              flat.wiringStyle ===
              "Mix of both"
            ) {
              wiringStyle =
                "mix";
            }

            let rackLocation =
              previousEstimate
                .rackLocation;

            if (
              flat.rackLocation ===
              "Hall / office closet"
            ) {
              rackLocation =
                "hall";
            } else if (
              flat.rackLocation ===
              "Garage / utility room"
            ) {
              rackLocation =
                "garage";
            } else if (
              flat.rackLocation ===
              "Dedicated IDF / MDF"
            ) {
              rackLocation =
                "dedicated";
            }

            let timeline =
              previousEstimate.timeline;

            if (
              flat.timeline ===
              "Flexible"
            ) {
              timeline =
                "flexible";
            } else if (
              flat.timeline ===
              "Within a month"
            ) {
              timeline =
                "month";
            } else if (
              flat.timeline ===
              "ASAP / rush"
            ) {
              timeline =
                "rush";
            }

            return {
              ...previousEstimate,

              projectType,

              squareFootage,

              focus,

              coveragePreset,

              wifiLayoutPreset,

              accessPreset,

              extras,

              wiringStyle,

              rackLocation,

              timeline,

              notes:
                flat.notes ??
                previousEstimate.notes,

              roughLow:
                flat.roughLow ??
                previousEstimate
                  .roughLow,

              roughHigh:
                flat.roughHigh ??
                previousEstimate
                  .roughHigh,
            };
          }
        );
      },
      []
    );

  const didResumeRef =
    React.useRef(false);

  React.useEffect(() => {
    const token =
      searchParams?.get(
        "resumeToken"
      );

    if (
      !token ||
      didResumeRef.current
    ) {
      return;
    }

    didResumeRef.current =
      true;

    void (async () => {
      try {
        const response =
          await fetch(
            `/api/magic-link/${encodeURIComponent(
              token
            )}`,
            {
              method:
                "GET",

              cache:
                "no-store",
            }
          );

        if (!response.ok) {
          return;
        }

        const data =
          (await response.json()) as {
            ok?: boolean;

            isExpired?: boolean;

            estimate?:
              | MagicLinkEstimate
              | null;
          };

        if (
          !data.ok ||
          data.isExpired ||
          !data.estimate
        ) {
          return;
        }

        hydrateFromMagicLink(
          data.estimate
        );

        const nextUrl =
          new URL(
            window.location.href
          );

        nextUrl.searchParams.delete(
          "resumeToken"
        );

        router.replace(
          nextUrl.pathname +
            nextUrl.search,
          {
            scroll:
              false,
          }
        );
      } catch (error) {
        console.warn(
          "[SmartNET] resumeToken hydration failed",
          error
        );
      }
    })();
  }, [
    searchParams,
    router,
    hydrateFromMagicLink,
  ]);

  /*
   * Temporary wizard fallback.
   *
   * This only runs when the customer knows the square footage.
   * A value of 0 means unknown, so no fake square-foot calculation is shown.
   */
  React.useEffect(() => {
    const {
      projectType,
      squareFootage,
      focus,
      coveragePreset,
      wifiLayoutPreset,
      accessPreset,
      extras,
      wiringStyle,
      timeline,
    } = estimate;

    const realPricing =
      estimator.project?.pricing;

    if (
      realPricing &&
      realPricing.status !==
        "not_calculated" &&
      realPricing.estimatedLow >
        0 &&
      realPricing.estimatedHigh >
        0
    ) {
      return;
    }

    const squareFeet =
      Math.max(
        squareFootage,
        0
      );

    if (!squareFeet) {
      setEstimate(
        (
          previousEstimate
        ) => {
          if (
            previousEstimate.roughLow ===
              0 &&
            previousEstimate.roughHigh ===
              0
          ) {
            return previousEstimate;
          }

          return {
            ...previousEstimate,

            roughLow:
              0,

            roughHigh:
              0,
          };
        }
      );

      return;
    }

    let baseLowPerSquareFoot =
      3;

    let baseHighPerSquareFoot =
      6;

    switch (projectType) {
      case "office":
        baseLowPerSquareFoot =
          4;

        baseHighPerSquareFoot =
          8;
        break;

      case "retail":
        baseLowPerSquareFoot =
          4;

        baseHighPerSquareFoot =
          9;
        break;

      case "restaurant":
        baseLowPerSquareFoot =
          5;

        baseHighPerSquareFoot =
          10;
        break;

      case "warehouse":
        baseLowPerSquareFoot =
          4;

        baseHighPerSquareFoot =
          9;
        break;

      case "industrial":
        baseLowPerSquareFoot =
          5;

        baseHighPerSquareFoot =
          10;
        break;

      case "medical":
        baseLowPerSquareFoot =
          6;

        baseHighPerSquareFoot =
          12;
        break;

      case "education":
        baseLowPerSquareFoot =
          5;

        baseHighPerSquareFoot =
          11;
        break;

      case "hospitality":
        baseLowPerSquareFoot =
          5;

        baseHighPerSquareFoot =
          11;
        break;

      case "religious":
        baseLowPerSquareFoot =
          4;

        baseHighPerSquareFoot =
          9;
        break;

      case "datacenter":
        baseLowPerSquareFoot =
          8;

        baseHighPerSquareFoot =
          18;
        break;

      case "multi_location":
        baseLowPerSquareFoot =
          6;

        baseHighPerSquareFoot =
          13;
        break;

      case "other":
      case "home":
      default:
        break;
    }

    let focusFactor =
      1;

    if (focus.cameras) {
      focusFactor +=
        0.1;
    }

    if (focus.wifi) {
      focusFactor +=
        0.05;
    }

    if (
      focus.accessControl
    ) {
      focusFactor +=
        0.15;
    }

    let coverageFactor =
      1;

    if (
      coveragePreset ===
      "entry"
    ) {
      coverageFactor =
        0.9;
    }

    if (
      coveragePreset ===
      "common"
    ) {
      coverageFactor =
        1.05;
    }

    if (
      coveragePreset ===
      "full"
    ) {
      coverageFactor =
        1.2;
    }

    let wifiFactor =
      1;

    if (
      wifiLayoutPreset ===
      "few"
    ) {
      wifiFactor =
        0.95;
    }

    if (
      wifiLayoutPreset ===
      "dense"
    ) {
      wifiFactor =
        1.1;
    }

    let accessFactor =
      1;

    if (
      accessPreset ===
      "fewDoors"
    ) {
      accessFactor =
        1.08;
    }

    if (
      accessPreset ===
      "manyDoors"
    ) {
      accessFactor =
        1.18;
    }

    let extrasBump =
      0;

    if (extras.speakers) {
      extrasBump +=
        0.05;
    }

    if (
      extras.wallDisplays
    ) {
      extrasBump +=
        0.06;
    }

    if (extras.miniRack) {
      extrasBump +=
        0.04;
    }

    if (
      extras.batteryUps
    ) {
      extrasBump +=
        0.04;
    }

    let wiringFactor =
      1;

    if (
      wiringStyle ===
      "exposed"
    ) {
      wiringFactor =
        0.95;
    }

    if (
      wiringStyle ===
      "hidden"
    ) {
      wiringFactor =
        1.12;
    }

    if (
      wiringStyle ===
      "mix"
    ) {
      wiringFactor =
        1.05;
    }

    let timelineFactor =
      1;

    if (
      timeline ===
      "flexible"
    ) {
      timelineFactor =
        0.97;
    }

    if (
      timeline ===
      "rush"
    ) {
      timelineFactor =
        1.12;
    }

    const combinedFactor =
      focusFactor *
      coverageFactor *
      wifiFactor *
      accessFactor *
      wiringFactor *
      timelineFactor *
      (1 + extrasBump);

    const rawLow =
      squareFeet *
      baseLowPerSquareFoot *
      combinedFactor;

    const rawHigh =
      squareFeet *
      baseHighPerSquareFoot *
      combinedFactor;

    const low =
      Math.max(
        Math.round(
          rawLow / 100
        ) * 100,
        800
      );

    const high =
      Math.max(
        Math.round(
          rawHigh / 100
        ) * 100,
        low + 500
      );

    setEstimate(
      (
        previousEstimate
      ) => {
        if (
          previousEstimate.roughLow ===
            low &&
          previousEstimate.roughHigh ===
            high
        ) {
          return previousEstimate;
        }

        return {
          ...previousEstimate,

          roughLow:
            low,

          roughHigh:
            high,
        };
      }
    );
  }, [
    estimate.projectType,
    estimate.squareFootage,
    estimate.focus,
    estimate.coveragePreset,
    estimate.wifiLayoutPreset,
    estimate.accessPreset,
    estimate.extras,
    estimate.wiringStyle,
    estimate.timeline,
    estimator.project?.pricing,
  ]);

  const value =
    React.useMemo<
      SmartNetEstimateContextValue
    >(
      () => ({
        estimate,

        updateEstimate,

        hydrateFromMagicLink,

        estimator,

        startEstimator,

        answerEstimator,

        finalizeEstimator,

        clearEstimatorError,

        resetEstimatorSession,
      }),
      [
        estimate,
        updateEstimate,
        hydrateFromMagicLink,
        estimator,
        startEstimator,
        answerEstimator,
        finalizeEstimator,
        clearEstimatorError,
        resetEstimatorSession,
      ]
    );

  return (
    <SmartNetEstimateContext.Provider
      value={value}
    >
      {children}
    </SmartNetEstimateContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* API helpers                                                                 */
/* -------------------------------------------------------------------------- */

function toBackendProjectType(
  projectType:
    ProjectType
):
  | "residential"
  | "office"
  | "retail"
  | "restaurant"
  | "warehouse"
  | "industrial"
  | "medical"
  | "education"
  | "hospitality"
  | "religious"
  | "datacenter"
  | "multi_location"
  | "other" {
  if (
    projectType === "home"
  ) {
    return "residential";
  }

  return projectType;
}

function createCustomerIntent(
  estimate:
    SmartNetEstimate
): string {
  const requestedSystems:
    string[] = [];

  if (
    estimate.focus.cameras
  ) {
    requestedSystems.push(
      "camera surveillance"
    );
  }

  if (
    estimate.focus.wifi
  ) {
    requestedSystems.push(
      "managed Wi-Fi"
    );
  }

  if (
    estimate.focus
      .accessControl
  ) {
    requestedSystems.push(
      "access control"
    );
  }

  const projectLabel =
    estimate.projectType ===
    "home"
      ? "residential property"
      : estimate.projectType.replace(
          /_/g,
          " "
        );

  const systemDescription =
    requestedSystems.length > 0
      ? formatList(
          requestedSystems
        )
      : "low-voltage technology improvements";

  const sizeDescription =
    estimate.squareFootage > 0
      ? ` The property is approximately ${estimate.squareFootage.toLocaleString()} square feet.`
      : " The customer does not currently know the square footage.";

  const noteDescription =
    estimate.notes.trim()
      ? ` Project description: ${estimate.notes.trim()}`
      : "";

  return `The customer needs ${systemDescription} for a ${projectLabel}.${sizeDescription}${noteDescription}`;
}

function createNextQuestionFromConversation(
  conversation:
    EstimatorConversation
): EstimatorNextQuestion | null {
  if (
    !conversation.currentQuestion ||
    !conversation.currentQuestionKey
  ) {
    return null;
  }

  return {
    key:
      conversation.currentQuestionKey,

    questionId:
      null,

    question:
      conversation.currentQuestion,

    reason:
      "",

    category:
      conversation.currentQuestionKey.split(
        "."
      )[0] ?? "project",

    priority:
      "normal",

    answerType:
      inferAnswerTypeFromQuestionKey(
        conversation.currentQuestionKey
      ),

    choices:
      [],

    promptGuidance:
      "",

    source:
      "conversation",

    playbookId:
      null,
  };
}

function inferAnswerTypeFromQuestionKey(
  questionKey: string
): string {
  const numberFields = [
    "squareFootage",
    "numberOfFloors",
    "ceilingHeightFeet",
    "interiorCount",
    "exteriorCount",
    "specialtyCount",
    "recordingDays",
    "currentDownloadMbps",
    "currentUploadMbps",
    "estimatedAccessPointCount",
    "estimatedConcurrentUsers",
    "controlledDoorCount",
    "exteriorDoorCount",
    "interiorDoorCount",
    "estimatedCableFeet",
    "travelMiles",
    "estimatedCrewSize",
    "estimatedLaborHours",
    "estimatedDurationDays",
  ];

  if (
    numberFields.some(
      (field) =>
        questionKey.includes(field)
    )
  ) {
    return "number";
  }

  const booleanFields = [
    "requested",
    "remoteViewingRequired",
    "existingRouter",
    "existingSwitches",
    "existingRack",
    "rackRequired",
    "vlanRequired",
    "indoorCoverage",
    "outdoorCoverage",
    "guestNetworkRequired",
    "existingSystem",
    "remoteManagementRequired",
    "existingCablingAvailable",
    "trenchingRequired",
    "fireStoppingRequired",
    "liftRequired",
    "ladderAccessPossible",
    "afterHoursRequired",
    "permitsRequired",
    "occupiedDuringInstall",
  ];

  if (
    booleanFields.some(
      (field) =>
        questionKey.includes(field)
    )
  ) {
    return "boolean";
  }

  return "text";
}

function syncWizardPricingFromProject(
  project:
    EstimatorProject,
  setEstimate:
    React.Dispatch<
      React.SetStateAction<SmartNetEstimate>
    >
): void {
  const pricing =
    project.pricing;

  if (!pricing) {
    return;
  }

  if (
    pricing.status ===
      "not_calculated" ||
    pricing.estimatedLow <=
      0 ||
    pricing.estimatedHigh <=
      0
  ) {
    return;
  }

  setEstimate(
    (
      previousEstimate
    ) => ({
      ...previousEstimate,

      roughLow:
        pricing.estimatedLow,

      roughHigh:
        pricing.estimatedHigh,
    })
  );
}

function parseProjectType(
  value:
    string | undefined,
  fallback:
    ProjectType
): ProjectType {
  switch (value) {
    case "residential":
    case "home":
      return "home";

    case "office":
    case "retail":
    case "restaurant":
    case "warehouse":
    case "industrial":
    case "medical":
    case "education":
    case "hospitality":
    case "religious":
    case "datacenter":
    case "multi_location":
    case "other":
      return value;

    default:
      return fallback;
  }
}

function formatList(
  values:
    string[]
): string {
  if (
    values.length === 0
  ) {
    return "";
  }

  if (
    values.length === 1
  ) {
    return values[0];
  }

  if (
    values.length === 2
  ) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values
    .slice(0, -1)
    .join(", ")}, and ${
    values[
      values.length - 1
    ]
  }`;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export function useSmartNetEstimate():
  SmartNetEstimateContextValue {
  const context =
    React.useContext(
      SmartNetEstimateContext
    );

  if (!context) {
    throw new Error(
      "useSmartNetEstimate must be used within a SmartNetEstimateProvider."
    );
  }

  return context;
}
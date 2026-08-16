import type { EstimatorConversationState } from "../conversation/conversation-state";
import type { ProjectEstimate } from "../domain/project-estimate";

export type EstimatorSession = {
  sessionId: string;

  project: ProjectEstimate;

  conversation: EstimatorConversationState;

  createdAt: string;

  updatedAt: string;
};

declare global {
  var __smartnetEstimatorSessions:
    | Map<string, EstimatorSession>
    | undefined;
}

const estimatorSessions =
  globalThis.__smartnetEstimatorSessions ??
  new Map<string, EstimatorSession>();

globalThis.__smartnetEstimatorSessions =
  estimatorSessions;

export function saveEstimatorSession(
  session: EstimatorSession
): EstimatorSession {
  const now = new Date().toISOString();

  const existingSession =
    estimatorSessions.get(
      session.sessionId
    );

  const savedSession: EstimatorSession = {
    ...session,

    createdAt:
      existingSession?.createdAt ??
      session.createdAt ??
      now,

    updatedAt: now,
  };

  estimatorSessions.set(
    session.sessionId,
    savedSession
  );

  return savedSession;
}

export function createEstimatorSession(
  sessionId: string,
  project: ProjectEstimate,
  conversation: EstimatorConversationState
): EstimatorSession {
  const now = new Date().toISOString();

  return saveEstimatorSession({
    sessionId,
    project,
    conversation,
    createdAt: now,
    updatedAt: now,
  });
}

export function getEstimatorSession(
  sessionId: string
): EstimatorSession | null {
  return (
    estimatorSessions.get(sessionId) ??
    null
  );
}

export function updateEstimatorSession(
  sessionId: string,
  updates: {
    project?: ProjectEstimate;

    conversation?: EstimatorConversationState;
  }
): EstimatorSession | null {
  const existingSession =
    estimatorSessions.get(sessionId);

  if (!existingSession) {
    return null;
  }

  return saveEstimatorSession({
    ...existingSession,

    project:
      updates.project ??
      existingSession.project,

    conversation:
      updates.conversation ??
      existingSession.conversation,
  });
}

export function deleteEstimatorSession(
  sessionId: string
): boolean {
  return estimatorSessions.delete(
    sessionId
  );
}

export function clearEstimatorSessions(): void {
  estimatorSessions.clear();
}
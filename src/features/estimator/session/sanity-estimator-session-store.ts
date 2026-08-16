import { sanityWriteClient } from "@/lib/sanityWriteClient";

import type { EstimatorConversationState } from "../conversation/conversation-state";

import {
  projectEstimateSchema,
  type ProjectEstimate,
} from "../domain/project-estimate";

export type PersistentEstimatorSession = {
  sessionId: string;

  project: ProjectEstimate;

  conversation: EstimatorConversationState;

  createdAt: string;

  updatedAt: string;
};

type EstimatorSessionDocument = {
  _id: string;

  _type: "smartnetEstimatorSession";

  sessionId: string;

  project: ProjectEstimate;

  conversation: EstimatorConversationState;

  createdAt: string;

  updatedAt: string;
};

type EstimatorSessionUpdates = {
  project?: ProjectEstimate;

  conversation?: EstimatorConversationState;
};

const estimatorSessionDocumentType =
  "smartnetEstimatorSession";

function getSessionDocumentId(
  sessionId: string
): string {
  return `smartnet-estimator-session-${sessionId}`;
}

function toEstimatorSession(
  document: EstimatorSessionDocument
): PersistentEstimatorSession {
  return {
    sessionId: document.sessionId,

    project: projectEstimateSchema.parse(
      document.project
    ),

    conversation:
      document.conversation,

    createdAt:
      document.createdAt,

    updatedAt:
      document.updatedAt,
  };
}

export async function savePersistentEstimatorSession(
  session: PersistentEstimatorSession
): Promise<PersistentEstimatorSession> {
  const now =
    new Date().toISOString();

  const documentId =
    getSessionDocumentId(
      session.sessionId
    );

  const existingCreatedAt =
    await sanityWriteClient.fetch<
      string | null
    >(
      `*[
        _id == $documentId &&
        _type == $documentType
      ][0].createdAt`,
      {
        documentId,

        documentType:
          estimatorSessionDocumentType,
      }
    );

  const validatedProject =
    projectEstimateSchema.parse(
      session.project
    );

  const document: EstimatorSessionDocument =
    {
      _id:
        documentId,

      _type:
        estimatorSessionDocumentType,

      sessionId:
        session.sessionId,

      project:
        validatedProject,

      conversation:
        session.conversation,

      createdAt:
        existingCreatedAt ??
        session.createdAt ??
        now,

      updatedAt:
        now,
    };

  const savedDocument =
    await sanityWriteClient.createOrReplace(
      document
    );

  return toEstimatorSession(
    savedDocument as EstimatorSessionDocument
  );
}

export async function createPersistentEstimatorSession(
  sessionId: string,
  project: ProjectEstimate,
  conversation: EstimatorConversationState
): Promise<PersistentEstimatorSession> {
  const now =
    new Date().toISOString();

  return savePersistentEstimatorSession({
    sessionId,

    project:
      projectEstimateSchema.parse(
        project
      ),

    conversation,

    createdAt:
      now,

    updatedAt:
      now,
  });
}

export async function getPersistentEstimatorSession(
  sessionId: string
): Promise<PersistentEstimatorSession | null> {
  const documentId =
    getSessionDocumentId(
      sessionId
    );

  const document =
    await sanityWriteClient.fetch<
      EstimatorSessionDocument | null
    >(
      `*[
        _id == $documentId &&
        _type == $documentType
      ][0] {
        _id,
        _type,
        sessionId,
        project,
        conversation,
        createdAt,
        updatedAt
      }`,
      {
        documentId,

        documentType:
          estimatorSessionDocumentType,
      }
    );

  if (!document) {
    return null;
  }

  return toEstimatorSession(
    document
  );
}

export async function updatePersistentEstimatorSession(
  sessionId: string,
  updates: EstimatorSessionUpdates
): Promise<PersistentEstimatorSession | null> {
  const existingSession =
    await getPersistentEstimatorSession(
      sessionId
    );

  if (!existingSession) {
    return null;
  }

  return savePersistentEstimatorSession({
    ...existingSession,

    project:
      updates.project ??
      existingSession.project,

    conversation:
      updates.conversation ??
      existingSession.conversation,
  });
}

export async function deletePersistentEstimatorSession(
  sessionId: string
): Promise<boolean> {
  const documentId =
    getSessionDocumentId(
      sessionId
    );

  const existingSession =
    await getPersistentEstimatorSession(
      sessionId
    );

  if (!existingSession) {
    return false;
  }

  await sanityWriteClient.delete(
    documentId
  );

  return true;
}
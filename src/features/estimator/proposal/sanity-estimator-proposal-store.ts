import { sanityWriteClient } from "@/lib/sanityWriteClient";

import type { EstimatorProposalPackage } from "./proposal-package";

export type SavedEstimatorProposal = {
  proposalId: string;

  sessionId: string;

  proposal: EstimatorProposalPackage;

  createdAt: string;

  updatedAt: string;
};

type EstimatorProposalDocument = {
  _id: string;

  _type: "smartnetEstimatorProposal";

  proposalId: string;

  sessionId: string;

  proposal: EstimatorProposalPackage;

  createdAt: string;

  updatedAt: string;
};

const estimatorProposalDocumentType =
  "smartnetEstimatorProposal";

function createProposalId(
  sessionId: string
): string {
  return `proposal-${sessionId}`;
}

function getProposalDocumentId(
  proposalId: string
): string {
  return `smartnet-estimator-${proposalId}`;
}

function toSavedEstimatorProposal(
  document: EstimatorProposalDocument
): SavedEstimatorProposal {
  return {
    proposalId:
      document.proposalId,

    sessionId:
      document.sessionId,

    proposal:
      document.proposal,

    createdAt:
      document.createdAt,

    updatedAt:
      document.updatedAt,
  };
}

export async function saveEstimatorProposal(
  sessionId: string,
  proposal: EstimatorProposalPackage
): Promise<SavedEstimatorProposal> {
  const proposalId =
    createProposalId(sessionId);

  const documentId =
    getProposalDocumentId(
      proposalId
    );

  const now =
    new Date().toISOString();

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
          estimatorProposalDocumentType,
      }
    );

  const document: EstimatorProposalDocument =
    {
      _id:
        documentId,

      _type:
        estimatorProposalDocumentType,

      proposalId,

      sessionId,

      proposal,

      createdAt:
        existingCreatedAt ??
        now,

      updatedAt:
        now,
    };

  const savedDocument =
    await sanityWriteClient.createOrReplace(
      document
    );

  return toSavedEstimatorProposal(
    savedDocument as EstimatorProposalDocument
  );
}

export async function getEstimatorProposalBySessionId(
  sessionId: string
): Promise<SavedEstimatorProposal | null> {
  const proposalId =
    createProposalId(sessionId);

  const documentId =
    getProposalDocumentId(
      proposalId
    );

  const document =
    await sanityWriteClient.fetch<
      EstimatorProposalDocument | null
    >(
      `*[
        _id == $documentId &&
        _type == $documentType
      ][0] {
        _id,
        _type,
        proposalId,
        sessionId,
        proposal,
        createdAt,
        updatedAt
      }`,
      {
        documentId,

        documentType:
          estimatorProposalDocumentType,
      }
    );

  if (!document) {
    return null;
  }

  return toSavedEstimatorProposal(
    document
  );
}

export async function listEstimatorProposals(
  limit = 50
): Promise<SavedEstimatorProposal[]> {
  const safeLimit =
    Math.max(
      1,
      Math.min(
        100,
        Math.floor(limit)
      )
    );

  const documents =
    await sanityWriteClient.fetch<
      EstimatorProposalDocument[]
    >(
      `*[
        _type == $documentType
      ] |
      order(updatedAt desc)
      [0...$limit] {
        _id,
        _type,
        proposalId,
        sessionId,
        proposal,
        createdAt,
        updatedAt
      }`,
      {
        documentType:
          estimatorProposalDocumentType,

        limit:
          safeLimit,
      }
    );

  return documents.map(
    toSavedEstimatorProposal
  );
}

export async function deleteEstimatorProposalBySessionId(
  sessionId: string
): Promise<boolean> {
  const existingProposal =
    await getEstimatorProposalBySessionId(
      sessionId
    );

  if (!existingProposal) {
    return false;
  }

  const documentId =
    getProposalDocumentId(
      existingProposal.proposalId
    );

  await sanityWriteClient.delete(
    documentId
  );

  return true;
}
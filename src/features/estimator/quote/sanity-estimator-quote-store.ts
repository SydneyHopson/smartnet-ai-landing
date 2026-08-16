import { sanityWriteClient } from "@/lib/sanityWriteClient";

import type { PreliminaryQuote } from "./preliminary-quote";

export type SavedEstimatorQuote = {
  quoteId: string;

  sessionId: string;

  quote: PreliminaryQuote;

  createdAt: string;

  updatedAt: string;
};

type EstimatorQuoteDocument = {
  _id: string;

  _type: "smartnetEstimatorQuote";

  quoteId: string;

  sessionId: string;

  quote: PreliminaryQuote;

  createdAt: string;

  updatedAt: string;
};

const estimatorQuoteDocumentType =
  "smartnetEstimatorQuote";

function createQuoteId(
  sessionId: string
): string {
  return `quote-${sessionId}`;
}

function getQuoteDocumentId(
  quoteId: string
): string {
  return `smartnet-estimator-${quoteId}`;
}

function toSavedEstimatorQuote(
  document: EstimatorQuoteDocument
): SavedEstimatorQuote {
  return {
    quoteId:
      document.quoteId,

    sessionId:
      document.sessionId,

    quote:
      document.quote,

    createdAt:
      document.createdAt,

    updatedAt:
      document.updatedAt,
  };
}

export async function saveEstimatorQuote(
  sessionId: string,
  quote: PreliminaryQuote
): Promise<SavedEstimatorQuote> {
  const quoteId =
    createQuoteId(sessionId);

  const documentId =
    getQuoteDocumentId(
      quoteId
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
          estimatorQuoteDocumentType,
      }
    );

  const document: EstimatorQuoteDocument =
    {
      _id:
        documentId,

      _type:
        estimatorQuoteDocumentType,

      quoteId,

      sessionId,

      quote,

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

  return toSavedEstimatorQuote(
    savedDocument as EstimatorQuoteDocument
  );
}

export async function getEstimatorQuoteBySessionId(
  sessionId: string
): Promise<SavedEstimatorQuote | null> {
  const quoteId =
    createQuoteId(sessionId);

  const documentId =
    getQuoteDocumentId(
      quoteId
    );

  const document =
    await sanityWriteClient.fetch<
      EstimatorQuoteDocument | null
    >(
      `*[
        _id == $documentId &&
        _type == $documentType
      ][0] {
        _id,
        _type,
        quoteId,
        sessionId,
        quote,
        createdAt,
        updatedAt
      }`,
      {
        documentId,

        documentType:
          estimatorQuoteDocumentType,
      }
    );

  if (!document) {
    return null;
  }

  return toSavedEstimatorQuote(
    document
  );
}

export async function listEstimatorQuotes(
  limit = 50
): Promise<SavedEstimatorQuote[]> {
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
      EstimatorQuoteDocument[]
    >(
      `*[
        _type == $documentType
      ] |
      order(updatedAt desc)
      [0...$limit] {
        _id,
        _type,
        quoteId,
        sessionId,
        quote,
        createdAt,
        updatedAt
      }`,
      {
        documentType:
          estimatorQuoteDocumentType,

        limit:
          safeLimit,
      }
    );

  return documents.map(
    toSavedEstimatorQuote
  );
}

export async function deleteEstimatorQuoteBySessionId(
  sessionId: string
): Promise<boolean> {
  const existingQuote =
    await getEstimatorQuoteBySessionId(
      sessionId
    );

  if (!existingQuote) {
    return false;
  }

  const documentId =
    getQuoteDocumentId(
      existingQuote.quoteId
    );

  await sanityWriteClient.delete(
    documentId
  );

  return true;
}
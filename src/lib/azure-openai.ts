import OpenAI from "openai";

let client: OpenAI | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export function getAzureOpenAI(): OpenAI {
  if (client) {
    return client;
  }

  const endpoint = getRequiredEnv("AZURE_OPENAI_ENDPOINT");
  const apiKey = getRequiredEnv("AZURE_OPENAI_API_KEY");
  const apiVersion =
    process.env.AZURE_OPENAI_API_VERSION ??
    "2025-01-01-preview";

  client = new OpenAI({
    apiKey,
    baseURL: `${endpoint}/openai/deployments/${getRequiredEnv(
      "AZURE_OPENAI_DEPLOYMENT"
    )}`,
    defaultQuery: {
      "api-version": apiVersion,
    },
    defaultHeaders: {
      "api-key": apiKey,
    },
  });

  return client;
}

export const azureDeployment =
  process.env.AZURE_OPENAI_DEPLOYMENT ?? "";
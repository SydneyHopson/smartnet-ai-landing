import { defineField, defineType } from "sanity";

export const magicLinkSession = defineType({
  name: "magicLinkSession",
  title: "Magic Link Session",
  type: "document",
  fields: [
    defineField({
      name: "token",
      title: "Magic Link Token",
      type: "string",
      description: "Random token used in the magic link URL.",
      validation: (Rule) => Rule.required(),
    }),

    // ✅ Link to unified lead
    defineField({
      name: "lead",
      title: "Lead",
      type: "reference",
      to: [{ type: "smartnetLead" }],
      description: "The unified lead record tied to this session.",
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Customer Phone",
      type: "string",
    }),
    defineField({
      name: "jobLocation",
      title: "Job Location",
      type: "string",
      description: "City/area or address for this estimate.",
    }),

    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Funnel", value: "funnel" },
          { title: "Magic Link", value: "magic_link" },
          { title: "QR Code", value: "qr" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "funnel",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Redeemed", value: "redeemed" },
          { title: "Expired", value: "expired" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),

    // ✅ Structured snapshot for clean querying + rehydration
    defineField({
      name: "estimateSnapshot",
      title: "Estimate Snapshot",
      type: "object",
      fields: [
        defineField({ name: "projectType", type: "string" }),
        defineField({ name: "squareFootage", type: "number" }),
        defineField({ name: "focus", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "coverageProfile", type: "string" }),
        defineField({ name: "wifiLayout", type: "string" }),
        defineField({ name: "doorsAccess", type: "string" }),
        defineField({ name: "extras", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "wiringStyle", type: "string" }),
        defineField({ name: "rackLocation", type: "string" }),
        defineField({ name: "timeline", type: "string" }),
        defineField({ name: "roughLow", type: "number" }),
        defineField({ name: "roughHigh", type: "number" }),
        defineField({ name: "notes", type: "text" }),
      ],
    }),

    // Keep your backup JSON string
    defineField({
      name: "rawEstimateJson",
      title: "Raw Estimate JSON (stringified)",
      type: "text",
      description: "Optional backup of the full estimate object.",
    }),

    defineField({
      name: "estimateTotal",
      title: "Estimate Total",
      type: "number",
      description: "Total estimated price shown to the customer.",
    }),
    defineField({
      name: "estimateSummary",
      title: "Estimate Summary",
      type: "text",
      rows: 4,
      description: "Short description of the estimate: scope, add-ons, etc.",
    }),

    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description: "When this magic link should stop working.",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "lastAccessedAt",
      title: "Last Accessed At",
      type: "datetime",
    }),

    // ✅ “expensive” signal
    defineField({
      name: "restored",
      title: "Restored",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "restoredAt",
      title: "Restored At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "status",
    },
    prepare(selection) {
      const { title, subtitle } = selection as {
        title?: string;
        subtitle?: string;
      };
      return {
        title: title || "Magic link session",
        subtitle: `Status: ${subtitle || "unknown"}`,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export const smartnetLead = defineType({
  name: "smartnetLead",
  title: "SmartNET Lead",
  type: "document",
  fields: [
    //
    // 🔹 Core identity
    //
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Primary Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Primary Phone",
      type: "string",
    }),

    //
    // 🔹 Location / property context
    //
    defineField({
      name: "primaryJobLocation",
      title: "Primary Job Location",
      type: "string",
      description: "Main city/area or address this lead is associated with.",
    }),
    defineField({
      name: "propertyType",
      title: "Primary Property Type",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Industrial", value: "industrial" },
          { title: "Mixed Use", value: "mixed" },
          { title: "Other", value: "other" },
        ],
      },
    }),

    //
    // 🔹 Lead status, source, and tags
    //
    defineField({
      name: "status",
      title: "Lead Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Engaged", value: "engaged" },
          { title: "Qualified", value: "qualified" },
          { title: "Quoted", value: "quoted" },
          { title: "Booked Walkthrough", value: "booked" },
          { title: "Won / Converted", value: "won" },
          { title: "Lost", value: "lost" },
          { title: "Dormant", value: "dormant" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "leadSource",
      title: "Lead Source",
      type: "string",
      options: {
        list: [
          { title: "SmartNET Funnel", value: "smartnet_funnel" },
          { title: "Website Contact Form", value: "website" },
          { title: "Facebook / Instagram", value: "social" },
          { title: "Referral", value: "referral" },
          { title: "Google Search / Maps", value: "google" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. “high_ticket”, “repeat_client”, “urgent”, etc.',
    }),

    //
    // 🔹 Relationship fields (optional—kept as you had)
    //
    defineField({
      name: "magicLinkSessions",
      title: "Magic Link Sessions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "magicLinkSession" }] }],
      description: "All saved quote sessions this lead has created.",
    }),
    defineField({
      name: "walkthroughBookings",
      title: "Walkthrough Bookings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "walkthroughBooking" }] }],
      description: "All walkthrough bookings associated with this lead.",
    }),

    //
    // 🔹 Last known funnel metrics
    //
    defineField({
      name: "lastEstimateTotal",
      title: "Last Estimate Total",
      type: "number",
    }),
    defineField({
      name: "lastEstimateCurrency",
      title: "Last Estimate Currency",
      type: "string",
      initialValue: "USD",
    }),
    defineField({
      name: "lastInteractionAt",
      title: "Last Interaction At",
      type: "datetime",
      description: "Most recent touchpoint (quote, booking, follow-up, etc.).",
    }),

    //
    // 🔹 Notes
    //
    defineField({
      name: "notes",
      title: "Lead Notes",
      type: "text",
      rows: 4,
      description: "General notes about this lead.",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes (Office Only)",
      type: "text",
      rows: 4,
      description: "Private notes for your team – not visible to the customer.",
    }),

    //
    // 🔹 System fields
    //
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      title: "fullName",
      subtitle: "status",
      email: "email",
      location: "primaryJobLocation",
    },
    prepare(selection) {
      const { title, subtitle, email, location } = selection as {
        title?: string;
        subtitle?: string;
        email?: string;
        location?: string;
      };
      const subParts: string[] = [];
      if (subtitle) subParts.push(subtitle);
      if (email) subParts.push(email);
      if (location) subParts.push(location);
      return {
        title: title || "SmartNET Lead",
        subtitle: subParts.join(" • "),
      };
    },
  },
});

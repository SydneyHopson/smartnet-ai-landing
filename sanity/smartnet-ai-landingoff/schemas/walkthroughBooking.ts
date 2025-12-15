import { defineField, defineType } from "sanity";

export const walkthroughBooking = defineType({
  name: "walkthroughBooking",
  title: "Walkthrough Booking",
  type: "document",
  fields: [
    //
    // 🔹 System / safety
    //
    defineField({
      name: "idempotencyKey",
      title: "Idempotency Key",
      type: "string",
      readOnly: true,
      description: "Prevents duplicate bookings for the same person + slot.",
    }),

    //
    // 🔹 Booking details (what your API writes)
    //
    defineField({
      name: "appointmentType",
      title: "Appointment Type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateISO",
      title: "Preferred Date",
      type: "datetime", // your API stores ISO datetime (often midnight -> timezone shift)
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeSlot",
      title: "Preferred Time Slot",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Example: 9–11 AM, 1–3 PM, 4–6 PM.",
    }),

    //
    // 🔹 Contact (what your API writes)
    //
    defineField({
      name: "contactName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Phone",
      type: "string",
    }),

    //
    // 🔹 Job location (what your API writes)
    //
    defineField({
      name: "locationType",
      title: "Property Type",
      type: "string",
      description: "home / office / retail / industrial / multi",
    }),
    defineField({
      name: "locationLabel",
      title: "Job Location",
      type: "string",
      description: "Friendly label (Home / Office / Retail / etc.)",
    }),
    defineField({
      name: "locationNote",
      title: "Address or general area",
      type: "text",
      rows: 3,
      description: "Address or general area for the walkthrough.",
    }),

    //
    // 🔹 Call flags (what your API writes)
    //
    defineField({
      name: "needsOnsiteWalkthrough",
      title: "Needs On-site Walkthrough",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isVirtualCall",
      title: "Virtual Call",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPhoneCall",
      title: "Phone Call",
      type: "boolean",
      initialValue: false,
    }),

    //
    // 🔹 Estimate context (what your API writes)
    //
    defineField({
      name: "estimateTotal",
      title: "Estimate Total",
      type: "number",
      description: "Total estimated price that was shown to the customer.",
    }),
    defineField({
      name: "estimateSummary",
      title: "Estimate Summary",
      type: "text",
      rows: 4,
      description:
        "High-level description of the scope (zones, camera count, add-ons, etc).",
    }),
    defineField({
      name: "estimateRoughRange",
      title: "Estimate Rough Range",
      type: "string",
      description: "Example: $5,200 – $10,400",
    }),
    defineField({
      name: "rawEstimateJson",
      title: "Raw Estimate JSON (stringified)",
      type: "text",
      description:
        "Store the full estimate object as JSON.stringify(data) for later replay.",
    }),

    //
    // 🔹 Relationships
    //
    defineField({
      name: "magicLinkSession",
      title: "Magic Link Session",
      type: "reference",
      to: [{ type: "magicLinkSession" }],
      description: "If this booking was created from a magic quote link.",
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "reference",
      to: [{ type: "smartnetLead" }],
      description: "Unified lead record for this booking.",
    }),

    //
    // 🔹 Status + pipeline tracking
    //
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Confirmed", value: "confirmed" },
          { title: "In Progress", value: "in_progress" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
          { title: "No Show", value: "no_show" },
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
          { title: "Facebook / Instagram", value: "social" },
          { title: "Referral", value: "referral" },
          { title: "Google Search", value: "google" },
          { title: "Other", value: "other" },
        ],
      },
    }),

    //
    // 🔹 Notes & internal fields
    //
    defineField({
      name: "customerNotes",
      title: "Customer Notes",
      type: "text",
      rows: 3,
      description: "Anything the customer mentioned in the funnel or form.",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes (Office Only)",
      type: "text",
      rows: 4,
      description: "Your private notes for the job, not shown to customer.",
    }),
    defineField({
      name: "technicianNotes",
      title: "Technician Notes",
      type: "text",
      rows: 4,
      description: "Walkthrough / site visit notes from the field.",
    }),
    defineField({
      name: "followUpAt",
      title: "Follow-Up At",
      type: "datetime",
      description: "When you plan to follow up with this customer.",
    }),

    //
    // 🔹 Timestamps
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
      title: "contactName",
      subtitle: "status",
      date: "dateISO",
      location: "locationLabel",
      slot: "timeSlot",
    },
    prepare(selection) {
      const { title, subtitle, date, location, slot } = selection as {
        title?: string;
        subtitle?: string;
        date?: string;
        location?: string;
        slot?: string;
      };

      const dateLabel = date
        ? ` • ${new Date(date).toLocaleDateString("en-US")}`
        : "";
      const slotLabel = slot ? ` • ${slot}` : "";
      const locLabel = location ? ` • ${location}` : "";

      return {
        title: title || "Walkthrough Booking",
        subtitle: `${subtitle || "new"}${dateLabel}${slotLabel}${locLabel}`,
      };
    },
  },
});

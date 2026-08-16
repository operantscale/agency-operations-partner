import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const discoverySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  workEmail: z.string().trim().email("Please enter a valid work email").max(255),
  agencyName: z.string().trim().min(2, "Please enter your agency name").max(150),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  agencyWebsite: z.string().trim().max(200).optional().or(z.literal("")),
  primaryChallenge: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough")
    .max(1000, "Please keep this under 1000 characters"),
  additionalContext: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type DiscoveryInput = z.infer<typeof discoverySchema>;

export const submitDiscoveryRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => discoverySchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase.from("discovery_requests").insert({
      full_name: data.fullName,
      work_email: data.workEmail,
      agency_name: data.agencyName,
      role: data.role || null,
      agency_website: data.agencyWebsite || null,
      primary_challenge: data.primaryChallenge,
      additional_context: data.additionalContext || null,
    });

    if (error) {
      throw new Error("We couldn't submit your request. Please try again or email us directly.");
    }

    return { ok: true as const };
  });

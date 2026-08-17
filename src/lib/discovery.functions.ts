import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendAdminNotification, sendUserConfirmation } from "./email-service";

export const discoverySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
  workEmail: z
    .string()
    .trim()
    .email("Please enter a valid work email")
    .max(255, "Email is too long"),
  agencyName: z
    .string()
    .trim()
    .min(2, "Please enter your agency name")
    .max(150, "Agency name is too long"),
  role: z.string().trim().max(100, "Role is too long").optional().or(z.literal("")),
  agencyWebsite: z.string().trim().max(200, "Website URL is too long").optional().or(z.literal("")),
  primaryChallenge: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough")
    .max(1000, "Please keep this under 1000 characters"),
  additionalContext: z
    .string()
    .trim()
    .max(2000, "Additional context is too long")
    .optional()
    .or(z.literal("")),
});

export type DiscoveryInput = z.infer<typeof discoverySchema>;
export type DiscoverySubmissionResult = { ok: true };

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function insertDiscoveryRequest(data: DiscoveryInput): Promise<void> {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  let response: Response;

  try {
    response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/discovery_requests`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: data.fullName,
        work_email: data.workEmail,
        agency_name: data.agencyName,
        role: data.role || null,
        agency_website: data.agencyWebsite || null,
        primary_challenge: data.primaryChallenge,
        additional_context: data.additionalContext || null,
      }),
    });
  } catch (error) {
    console.error("Supabase network error:", error);
    throw new Error("Unable to connect to the database. Please try again.");
  }

  if (!response.ok) {
    console.error("Supabase insert failed:", {
      status: response.status,
      details: await response.text().catch(() => ""),
    });
    throw new Error("We couldn't save your request. Please try again.");
  }
}

export const submitDiscoveryRequest = createServerFn({ method: "POST" })
  .validator(discoverySchema)
  .handler(async ({ data }) => {
    try {
      getRequiredEnv("SUPABASE_URL");
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
      getRequiredEnv("RESEND_API_KEY");

      // Storage is the source of truth: no email is attempted until it succeeds.
      await insertDiscoveryRequest(data);

      const emailData = {
        fullName: data.fullName,
        workEmail: data.workEmail,
        agencyName: data.agencyName,
        role: data.role || undefined,
        agencyWebsite: data.agencyWebsite || undefined,
        primaryChallenge: data.primaryChallenge,
        additionalContext: data.additionalContext || undefined,
        submittedAt: new Date(),
      };

      const adminEmailResult = await sendAdminNotification(emailData);
      if (!adminEmailResult.success)
        console.error("Admin email failed after saving request:", adminEmailResult.error);

      const userEmailResult = await sendUserConfirmation(emailData);
      if (!userEmailResult.success)
        console.error("Prospect confirmation failed after saving request:", userEmailResult.error);

      return { ok: true } satisfies DiscoverySubmissionResult;
    } catch (error) {
      console.error("Discovery submission failed:", error);
      if (error instanceof Error) throw error;
      throw new Error("We couldn't submit your request. Please try again.");
    }
  });

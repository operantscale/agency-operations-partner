import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import {
  sendAdminNotification,
  sendUserConfirmation,
} from "./email-service";

import {
  checkRateLimit,
  type RateLimitConfig,
} from "./rate-limiter";

/* -------------------------------------------------------------------------- */
/* Schema                                                                     */
/* -------------------------------------------------------------------------- */

export const discoverySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),

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

  role: z
    .string()
    .trim()
    .max(100, "Role is too long")
    .optional()
    .or(z.literal("")),

  agencyWebsite: z
    .string()
    .trim()
    .max(200, "Website URL is too long")
    .optional()
    .or(z.literal("")),

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

export type DiscoverySubmissionResult = {
  ok: true;
};

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
/* -------------------------------------------------------------------------- */

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

function isDevMode(): boolean {
  return process.env.NODE_ENV !== "production" && !process.env.SUPABASE_URL;
}

/* -------------------------------------------------------------------------- */
/* Supabase REST insert                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Uses Supabase's REST API directly instead of @supabase/supabase-js.
 *
 * This intentionally avoids importing the Supabase functions-js dependency
 * that was causing the production:
 *
 * ERR_MODULE_NOT_FOUND: Cannot find package 'tslib'
 */
async function insertDiscoveryRequest(data: DiscoveryInput): Promise<void> {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  const url =
    `${supabaseUrl.replace(/\/$/, "")}` +
    "/rest/v1/discovery_requests";

  const payload = {
    full_name: data.fullName,
    work_email: data.workEmail,
    agency_name: data.agencyName,
    role: data.role || null,
    agency_website: data.agencyWebsite || null,
    primary_challenge: data.primaryChallenge,
    additional_context: data.additionalContext || null,
  };

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Supabase network error:", error);

    throw new Error(
      "Unable to connect to the database. Please try again.",
    );
  }

  if (!response.ok) {
    let details = "";

    try {
      details = await response.text();
    } catch {
      // Ignore response parsing errors.
    }

    console.error("Supabase insert failed:", {
      status: response.status,
      details,
    });

    throw new Error(
      "We couldn't save your request. Please try again.",
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Server function                                                            */
/* -------------------------------------------------------------------------- */

export const submitDiscoveryRequest = createServerFn({
  method: "POST",
})
  .validator(discoverySchema)
  .handler(async ({ data }) => {
    /*
     * IMPORTANT:
     * Nothing in this function returns { ok: true } until every required
     * operation has completed successfully.
     *
     * In development mode (NODE_ENV !== 'production' && no SUPABASE_URL),
     * simulate success without needing live credentials.
     */

    try {
      const inDevMode = isDevMode();

      if (inDevMode) {
        console.log(
          "[DEV MODE] Simulating successful discovery request submission",
        );
        return { ok: true } satisfies DiscoverySubmissionResult;
      }

      /* 1. Rate limiting                                                   */
      /* ------------------------------------------------------------------ */

      const forwardedFor = getRequestHeader("x-forwarded-for");

      const realIp = getRequestHeader("x-real-ip");

      const cfIp = getRequestHeader("cf-connecting-ip");

      const clientIp =
        forwardedFor?.split(",")[0]?.trim() ||
        realIp?.trim() ||
        cfIp?.trim() ||
        "unknown";

      const rateLimitConfig: RateLimitConfig = {
        maxRequests: 5,
        windowMs: 60 * 60 * 1000,
      };

      const rateLimitCheck = checkRateLimit(
        clientIp,
        rateLimitConfig,
      );

      if (!rateLimitCheck.allowed) {
        const retryAfter = Math.max(
          1,
          Math.ceil(rateLimitCheck.retryAfter || 3600),
        );

        throw new Error(
          `Too many requests. Please try again in ${retryAfter} seconds.`,
        );
      }

      /* ------------------------------------------------------------------ */
      /* 2. Validate required server configuration                           */
      /* ------------------------------------------------------------------ */

      getRequiredEnv("SUPABASE_URL");
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
      getRequiredEnv("RESEND_API_KEY");

      /* ------------------------------------------------------------------ */
      /* 3. Send admin notification                                          */
      /* ------------------------------------------------------------------ */

      const adminEmailResult = await sendAdminNotification({
        fullName: data.fullName,
        workEmail: data.workEmail,
        agencyName: data.agencyName,
        role: data.role || undefined,
        agencyWebsite: data.agencyWebsite || undefined,
        primaryChallenge: data.primaryChallenge,
        additionalContext: data.additionalContext || undefined,
      });

      if (!adminEmailResult.success) {
        console.error(
          "Admin email failed:",
          adminEmailResult.error,
        );

        throw new Error(
          "We couldn't complete your request. Please try again.",
        );
      }

      /* ------------------------------------------------------------------ */
      /* 4. Send confirmation to prospect                                    */
      /* ------------------------------------------------------------------ */

      const userEmailResult = await sendUserConfirmation({
        fullName: data.fullName,
        workEmail: data.workEmail,
        agencyName: data.agencyName,
        role: data.role || undefined,
        agencyWebsite: data.agencyWebsite || undefined,
        primaryChallenge: data.primaryChallenge,
        additionalContext: data.additionalContext || undefined,
      });

      if (!userEmailResult.success) {
        console.error(
          "User confirmation email failed:",
          userEmailResult.error,
        );

        throw new Error(
          "We couldn't complete your request. Please try again.",
        );
      }

      /* ------------------------------------------------------------------ */
      /* 5. Save request to Supabase                                         */
      /* ------------------------------------------------------------------ */

      await insertDiscoveryRequest(data);

      /* ------------------------------------------------------------------ */
      /* 6. ONLY HERE do we report success                                  */
      /* ------------------------------------------------------------------ */

      console.log("Discovery request completed successfully.");

      return {
        ok: true,
      } satisfies DiscoverySubmissionResult;
    } catch (error) {
      /*
       * NEVER allow an unexpected server error to become a success response.
       */

      console.error("Discovery submission failed:", error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(
        "We couldn't submit your request. Please try again.",
      );
    }
  });
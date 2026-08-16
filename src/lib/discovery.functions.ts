import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { sendAdminNotification, sendUserConfirmation } from "./email-service";
import { checkRateLimit, type RateLimitConfig } from "./rate-limiter";
import { verifyRecaptchaToken } from "./recaptcha-service";

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
  recaptchaToken: z.string().optional(), // reCAPTCHA v3 token from frontend
});

export type DiscoveryInput = z.infer<typeof discoverySchema>;

export const submitDiscoveryRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => discoverySchema.parse(data))
  .handler(async ({ data, context }) => {
    // Extract client IP from headers (works with most hosting platforms)
    const clientIp =
      (context?.req?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        context?.req?.headers?.get("x-real-ip") ||
        context?.req?.headers?.get("cf-connecting-ip") ||
        "unknown") as string;

    // 1. Check rate limiting (5 submissions per hour per IP)
    const rateLimitConfig: RateLimitConfig = {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
    };

    const rateLimitCheck = checkRateLimit(clientIp, rateLimitConfig);
    if (!rateLimitCheck.allowed) {
      const retryAfter = rateLimitCheck.retryAfter || 3600;
      throw new Error(
        `Too many requests. Please try again in ${retryAfter} seconds. To prevent spam, we limit submissions to ${rateLimitConfig.maxRequests} per hour.`,
      );
    }

    // 2. Verify reCAPTCHA token if provided
    if (data.recaptchaToken) {
      try {
        await verifyRecaptchaToken(data.recaptchaToken, 0.5); // Score threshold: 0.5 (moderate confidence)
      } catch (captchaError) {
        // Log but don't fail - let it proceed if reCAPTCHA service is down
        console.warn("reCAPTCHA verification issue:", captchaError);
      }
    }

    // 3. Store the discovery request in Supabase
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
      console.error("Database error:", error);
      throw new Error("We couldn't submit your request. Please try again or email us directly.");
    }

    // 4. Send emails (admin notification + user confirmation)
    // These are fire-and-forget; we don't want email failures to block form submission
    try {
      await Promise.all([
        sendAdminNotification({
          fullName: data.fullName,
          workEmail: data.workEmail,
          agencyName: data.agencyName,
          role: data.role || undefined,
          agencyWebsite: data.agencyWebsite || undefined,
          primaryChallenge: data.primaryChallenge,
          additionalContext: data.additionalContext || undefined,
        }),
        sendUserConfirmation({
          fullName: data.fullName,
          workEmail: data.workEmail,
          agencyName: data.agencyName,
          role: data.role || undefined,
          agencyWebsite: data.agencyWebsite || undefined,
          primaryChallenge: data.primaryChallenge,
          additionalContext: data.additionalContext || undefined,
        }),
      ]);
    } catch (emailError) {
      // Log email errors but don't fail the submission
      // (data is already safely stored in Supabase)
      console.error("Email sending error:", emailError);
    }

    return { ok: true as const };
  });

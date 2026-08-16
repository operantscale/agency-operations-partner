/**
 * reCAPTCHA v3 verification service for protecting against bot submissions.
 * Verifies tokens received from the frontend against Google's verification API.
 */

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}

/**
 * Verify a reCAPTCHA v3 token with Google's API.
 * Returns the score (0.0 - 1.0) where:
 *   1.0 = definitely a legitimate user
 *   0.0 = definitely a bot
 *
 * Throws an error if verification fails.
 */
export async function verifyRecaptchaToken(
  token: string,
  scoreThreshold: number = 0.5,
): Promise<{ score: number; action: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY not configured. Skipping verification.");
    return { score: 1.0, action: "unknown" };
  }

  if (!token) {
    throw new Error("No reCAPTCHA token provided");
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Google API responded with status ${response.status}`);
    }

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      const errors = data.error_codes?.join(", ") || "unknown error";
      throw new Error(`reCAPTCHA verification failed: ${errors}`);
    }

    const score = data.score ?? 0;

    if (score < scoreThreshold) {
      throw new Error(
        `reCAPTCHA score too low (${score.toFixed(2)} < ${scoreThreshold}). Possible bot activity.`,
      );
    }

    return {
      score,
      action: data.action || "unknown",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to verify reCAPTCHA token");
  }
}

/**
 * Verify reCAPTCHA token without throwing. Instead returns verification result object.
 */
export async function verifyRecaptchaTokenSafe(
  token: string,
  scoreThreshold: number = 0.5,
): Promise<{
  success: boolean;
  score: number;
  action: string;
  reason?: string;
}> {
  try {
    const result = await verifyRecaptchaToken(token, scoreThreshold);
    return {
      success: true,
      ...result,
    };
  } catch (error) {
    return {
      success: false,
      score: 0,
      action: "unknown",
      reason: error instanceof Error ? error.message : "Unknown verification error",
    };
  }
}

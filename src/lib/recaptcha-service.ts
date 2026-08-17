/**
 * Server-side reCAPTCHA v3 verification.
 *
 * IMPORTANT:
 * This file must only be imported by server-side code.
 */

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}

export interface RecaptchaResult {
  score: number;
  action: string;
}

/* -------------------------------------------------------------------------- */
/* Main verification                                                          */
/* -------------------------------------------------------------------------- */

export async function verifyRecaptchaToken(
  token: string,
  scoreThreshold = 0.5,
  expectedAction = "discovery",
): Promise<RecaptchaResult> {
  const secretKey =
    process.env.RECAPTCHA_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error(
      "RECAPTCHA_SECRET_KEY is not configured.",
    );
  }

  const cleanToken = token?.trim();

  if (!cleanToken) {
    throw new Error(
      "No reCAPTCHA token was provided.",
    );
  }

  let response: Response;

  try {
    response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: cleanToken,
        }).toString(),
      },
    );
  } catch (error) {
    console.error(
      "reCAPTCHA network error:",
      error,
    );

    throw new Error(
      "Security verification is temporarily unavailable.",
    );
  }

  if (!response.ok) {
    console.error(
      "reCAPTCHA HTTP error:",
      response.status,
    );

    throw new Error(
      "Security verification is temporarily unavailable.",
    );
  }

  let result: RecaptchaVerifyResponse;

  try {
    result =
      (await response.json()) as RecaptchaVerifyResponse;
  } catch (error) {
    console.error(
      "Invalid reCAPTCHA response:",
      error,
    );

    throw new Error(
      "Security verification failed.",
    );
  }

  if (!result.success) {
    console.warn(
      "reCAPTCHA rejected:",
      result.error_codes,
    );

    throw new Error(
      "Security verification failed. Please try again.",
    );
  }

  const score = result.score ?? 0;

  if (score < scoreThreshold) {
    console.warn(
      `reCAPTCHA score too low: ${score}`,
    );

    throw new Error(
      "Security verification failed. Please try again.",
    );
  }

  const action = result.action ?? "";

  if (
    expectedAction &&
    action &&
    action !== expectedAction
  ) {
    console.warn(
      `Unexpected reCAPTCHA action: ${action}`,
    );

    throw new Error(
      "Security verification failed. Please try again.",
    );
  }

  return {
    score,
    action: action || expectedAction,
  };
}

/* -------------------------------------------------------------------------- */
/* Safe verification                                                          */
/* -------------------------------------------------------------------------- */

export async function verifyRecaptchaTokenSafe(
  token: string,
  scoreThreshold = 0.5,
  expectedAction = "discovery",
): Promise<{
  success: boolean;
  score: number;
  action: string;
  reason?: string;
}> {
  try {
    const result =
      await verifyRecaptchaToken(
        token,
        scoreThreshold,
        expectedAction,
      );

    return {
      success: true,
      score: result.score,
      action: result.action,
    };
  } catch (error) {
    return {
      success: false,
      score: 0,
      action: "unknown",
      reason:
        error instanceof Error
          ? error.message
          : "Unknown verification error",
    };
  }
}
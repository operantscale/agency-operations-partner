import { Resend } from "resend";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface DiscoveryRequestData {
  fullName: string;
  workEmail: string;
  agencyName: string;
  role?: string | undefined;
  agencyWebsite?: string | undefined;
  primaryChallenge: string;
  additionalContext?: string | undefined;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: unknown;
}

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
/* -------------------------------------------------------------------------- */

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    console.error("RESEND_API_KEY is not configured.");
    return null;
  }

  return new Resend(apiKey.trim());
}

function getAdminEmail(): string {
  return (
    process.env.ADMIN_EMAIL?.trim() ||
    "wajeeh@operantscale.com"
  );
}

function getFromEmail(): string {
  return (
    process.env.SMTP_FROM_EMAIL?.trim() ||
    "noreply@operantscale.com"
  );
}

/* -------------------------------------------------------------------------- */
/* Admin notification                                                         */
/* -------------------------------------------------------------------------- */

export async function sendAdminNotification(
  data: DiscoveryRequestData,
): Promise<EmailResult> {
  const resend = getResend();

  if (!resend) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured",
    };
  }

  const adminEmail = getAdminEmail();
  const fromEmail = getFromEmail();

  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Operational Discovery Request</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f7f8fa;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
    }

    .header {
      background: #1f2937;
      color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
      line-height: 1.3;
    }

    .field {
      margin: 18px 0;
    }

    .label {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .value {
      color: #555555;
      word-break: break-word;
    }

    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
    }

    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
    }

    a {
      color: #2563eb;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1>New Operational Discovery Request</h1>
    </div>

    <div class="field">
      <div class="label">Full Name</div>
      <div class="value">
        ${escapeHtml(data.fullName)}
      </div>
    </div>

    <div class="field">
      <div class="label">Work Email</div>
      <div class="value">
        <a href="mailto:${escapeHtml(data.workEmail)}">
          ${escapeHtml(data.workEmail)}
        </a>
      </div>
    </div>

    <div class="field">
      <div class="label">Agency Name</div>
      <div class="value">
        ${escapeHtml(data.agencyName)}
      </div>
    </div>

    ${
      data.role
        ? `
    <div class="field">
      <div class="label">Role</div>
      <div class="value">
        ${escapeHtml(data.role)}
      </div>
    </div>
    `
        : ""
    }

    ${
      data.agencyWebsite
        ? `
    <div class="field">
      <div class="label">Agency Website</div>
      <div class="value">
        <a
          href="${escapeHtml(data.agencyWebsite)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${escapeHtml(data.agencyWebsite)}
        </a>
      </div>
    </div>
    `
        : ""
    }

    <div class="field">
      <div class="label">Primary Operational Challenge</div>
      <div class="value">
        ${escapeHtml(data.primaryChallenge).replace(/\n/g, "<br>")}
      </div>
    </div>

    ${
      data.additionalContext
        ? `
    <div class="field">
      <div class="label">Additional Context</div>
      <div class="value">
        ${escapeHtml(data.additionalContext).replace(/\n/g, "<br>")}
      </div>
    </div>
    `
        : ""
    }

    <div class="divider"></div>

    <div class="footer">
      This inquiry was submitted via operantscale.com.
    </div>

  </div>
</body>
</html>
`;

  try {
    const { data: result, error } =
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject:
          `New Operational Discovery Request - ${data.agencyName}`,
        html: adminHtml,
      });

    if (error) {
      console.error(
        "Resend admin email error:",
        error,
      );

      return {
        success: false,
        error,
      };
    }

    console.log(
      "Admin notification sent:",
      result?.id,
    );

    return {
      success: true,
      messageId: result?.id,
    };
  } catch (error) {
    console.error(
      "Unexpected admin email error:",
      error,
    );

    return {
      success: false,
      error,
    };
  }
}

/* -------------------------------------------------------------------------- */
/* User confirmation                                                          */
/* -------------------------------------------------------------------------- */

export async function sendUserConfirmation(
  data: DiscoveryRequestData,
): Promise<EmailResult> {
  const resend = getResend();

  if (!resend) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured",
    };
  }

  const fromEmail = getFromEmail();

  const userHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Your OperantScale Discovery Request</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f7f8fa;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
    }

    .header {
      background: oklch(0.235 0.038 261);
      color: white;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
    }

    .content {
      color: #555555;
    }

    .content p {
      margin: 16px 0;
    }

    .cta-section {
      background: #f1f3f5;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
    }

    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
      border-top: 1px solid #eeeeee;
      padding-top: 20px;
    }

    a {
      color: #2563eb;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1>Thank you for reaching out!</h1>
    </div>

    <div class="content">

      <p>
        Hi ${escapeHtml(data.fullName)},
      </p>

      <p>
        We've received your discovery request for
        <strong>${escapeHtml(data.agencyName)}</strong>.
      </p>

      <p>
        We'll review what you shared about your operational
        challenges and get back to you within two business days
        to schedule your operational discovery conversation.
      </p>

      <div class="cta-section">
        <p>
          <strong>
            That first call is a working session, not a sales call.
          </strong>
        </p>

        <p>
          We'll walk through how your team operates today and
          identify where meaningful opportunities for improvement
          may exist.
        </p>
      </div>

      <p>
        Questions in the meantime?
        Feel free to reach out directly to
        <a href="mailto:wajeeh@operantscale.com">
          wajeeh@operantscale.com
        </a>.
      </p>

      <p>
        Looking forward to the conversation,
      </p>

      <p>
        <strong>OperantScale</strong><br>
        Operational Intelligence for Independent P&amp;C Insurance Agencies
      </p>

    </div>

    <div class="footer">
      <p>
        © 2026 OperantScale. All rights reserved.
      </p>

      <p>
        <a href="https://operantscale.com">
          operantscale.com
        </a>
      </p>
    </div>

  </div>
</body>
</html>
`;

  try {
    const { data: result, error } =
      await resend.emails.send({
        from: fromEmail,
        to: data.workEmail,
        subject: "Your OperantScale Discovery Request",
        html: userHtml,
      });

    if (error) {
      console.error(
        "Resend user email error:",
        error,
      );

      return {
        success: false,
        error,
      };
    }

    console.log(
      "User confirmation sent:",
      result?.id,
    );

    return {
      success: true,
      messageId: result?.id,
    };
  } catch (error) {
    console.error(
      "Unexpected user email error:",
      error,
    );

    return {
      success: false,
      error,
    };
  }
}

/* -------------------------------------------------------------------------- */
/* HTML escaping                                                              */
/* -------------------------------------------------------------------------- */

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(
    /[&<>"']/g,
    (character) => map[character],
  );
}
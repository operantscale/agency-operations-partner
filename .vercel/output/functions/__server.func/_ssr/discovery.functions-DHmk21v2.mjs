import { i as getRequestHeader, n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery.functions-DHmk21v2.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function getResend() {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey || !apiKey.trim()) {
		console.error("RESEND_API_KEY is not configured.");
		return null;
	}
	return new Resend(apiKey.trim());
}
function getAdminEmail() {
	return process.env.ADMIN_EMAIL?.trim() || "wajeeh@operantscale.com";
}
function getFromEmail() {
	return process.env.SMTP_FROM_EMAIL?.trim() || "noreply@operantscale.com";
}
async function sendAdminNotification(data) {
	const resend = getResend();
	if (!resend) return {
		success: false,
		error: "RESEND_API_KEY is not configured"
	};
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

    ${data.role ? `
    <div class="field">
      <div class="label">Role</div>
      <div class="value">
        ${escapeHtml(data.role)}
      </div>
    </div>
    ` : ""}

    ${data.agencyWebsite ? `
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
    ` : ""}

    <div class="field">
      <div class="label">Primary Operational Challenge</div>
      <div class="value">
        ${escapeHtml(data.primaryChallenge).replace(/\n/g, "<br>")}
      </div>
    </div>

    ${data.additionalContext ? `
    <div class="field">
      <div class="label">Additional Context</div>
      <div class="value">
        ${escapeHtml(data.additionalContext).replace(/\n/g, "<br>")}
      </div>
    </div>
    ` : ""}

    <div class="divider"></div>

    <div class="footer">
      This inquiry was submitted via operantscale.com.
    </div>

  </div>
</body>
</html>
`;
	try {
		const { data: result, error } = await resend.emails.send({
			from: fromEmail,
			to: adminEmail,
			subject: `New Operational Discovery Request - ${data.agencyName}`,
			html: adminHtml
		});
		if (error) {
			console.error("Resend admin email error:", error);
			return {
				success: false,
				error
			};
		}
		console.log("Admin notification sent:", result?.id);
		return {
			success: true,
			messageId: result?.id
		};
	} catch (error) {
		console.error("Unexpected admin email error:", error);
		return {
			success: false,
			error
		};
	}
}
async function sendUserConfirmation(data) {
	const resend = getResend();
	if (!resend) return {
		success: false,
		error: "RESEND_API_KEY is not configured"
	};
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
		const { data: result, error } = await resend.emails.send({
			from: fromEmail,
			to: data.workEmail,
			subject: "Your OperantScale Discovery Request",
			html: userHtml
		});
		if (error) {
			console.error("Resend user email error:", error);
			return {
				success: false,
				error
			};
		}
		console.log("User confirmation sent:", result?.id);
		return {
			success: true,
			messageId: result?.id
		};
	} catch (error) {
		console.error("Unexpected user email error:", error);
		return {
			success: false,
			error
		};
	}
}
function escapeHtml(text) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;"
	};
	return text.replace(/[&<>"']/g, (character) => map[character]);
}
var limiterStore = /* @__PURE__ */ new Map();
setInterval(() => {
	const now = Date.now();
	for (const [key, entry] of limiterStore.entries()) if (entry.resetTime < now) limiterStore.delete(key);
}, 3e5);
/**
* Check if a request from the given IP should be rate limited.
* Returns { allowed: true } if request should proceed.
* Returns { allowed: false, retryAfter: number } if rate limited (seconds until reset).
*/
function checkRateLimit(ip, config = {
	maxRequests: 5,
	windowMs: 36e5
}) {
	const now = Date.now();
	const key = `ratelimit:${ip}`;
	let entry = limiterStore.get(key);
	if (!entry || entry.resetTime < now) {
		limiterStore.set(key, {
			count: 1,
			resetTime: now + config.windowMs
		});
		return { allowed: true };
	}
	entry.count++;
	if (entry.count > config.maxRequests) {
		const retryAfterMs = entry.resetTime - now;
		return {
			allowed: false,
			retryAfter: Math.ceil(retryAfterMs / 1e3)
		};
	}
	return { allowed: true };
}
var discoverySchema = objectType({
	fullName: stringType().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
	workEmail: stringType().trim().email("Please enter a valid work email").max(255, "Email is too long"),
	agencyName: stringType().trim().min(2, "Please enter your agency name").max(150, "Agency name is too long"),
	role: stringType().trim().max(100, "Role is too long").optional().or(literalType("")),
	agencyWebsite: stringType().trim().max(200, "Website URL is too long").optional().or(literalType("")),
	primaryChallenge: stringType().trim().min(10, "A sentence or two is enough").max(1e3, "Please keep this under 1000 characters"),
	additionalContext: stringType().trim().max(2e3, "Additional context is too long").optional().or(literalType(""))
});
function getRequiredEnv(name) {
	const value = process.env[name];
	if (!value || !value.trim()) throw new Error(`Missing required environment variable: ${name}`);
	return value.trim();
}
function isDevMode() {
	return false;
}
/**
* Uses Supabase's REST API directly instead of @supabase/supabase-js.
*
* This intentionally avoids importing the Supabase functions-js dependency
* that was causing the production:
*
* ERR_MODULE_NOT_FOUND: Cannot find package 'tslib'
*/
async function insertDiscoveryRequest(data) {
	const supabaseUrl = getRequiredEnv("SUPABASE_URL");
	const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
	const url = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/discovery_requests`;
	const payload = {
		full_name: data.fullName,
		work_email: data.workEmail,
		agency_name: data.agencyName,
		role: data.role || null,
		agency_website: data.agencyWebsite || null,
		primary_challenge: data.primaryChallenge,
		additional_context: data.additionalContext || null
	};
	let response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				apikey: serviceRoleKey,
				Authorization: `Bearer ${serviceRoleKey}`,
				"Content-Type": "application/json",
				Prefer: "return=minimal"
			},
			body: JSON.stringify(payload)
		});
	} catch (error) {
		console.error("Supabase network error:", error);
		throw new Error("Unable to connect to the database. Please try again.");
	}
	if (!response.ok) {
		let details = "";
		try {
			details = await response.text();
		} catch {}
		console.error("Supabase insert failed:", {
			status: response.status,
			details
		});
		throw new Error("We couldn't save your request. Please try again.");
	}
}
var submitDiscoveryRequest_createServerFn_handler = createServerRpc({
	id: "d617a46fdf585928d24717a1a82d4f39df931f582c18829da984df70c8f99096",
	name: "submitDiscoveryRequest",
	filename: "src/lib/discovery.functions.ts"
}, (opts) => submitDiscoveryRequest.__executeServer(opts));
var submitDiscoveryRequest = createServerFn({ method: "POST" }).validator(discoverySchema).handler(submitDiscoveryRequest_createServerFn_handler, async ({ data }) => {
	try {
		if (isDevMode()) {
			console.log("[DEV MODE] Simulating successful discovery request submission");
			return { ok: true };
		}
		const forwardedFor = getRequestHeader("x-forwarded-for");
		const realIp = getRequestHeader("x-real-ip");
		const cfIp = getRequestHeader("cf-connecting-ip");
		const rateLimitCheck = checkRateLimit(forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || cfIp?.trim() || "unknown", {
			maxRequests: 5,
			windowMs: 36e5
		});
		if (!rateLimitCheck.allowed) {
			const retryAfter = Math.max(1, Math.ceil(rateLimitCheck.retryAfter || 3600));
			throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
		}
		getRequiredEnv("SUPABASE_URL");
		getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
		getRequiredEnv("RESEND_API_KEY");
		const adminEmailResult = await sendAdminNotification({
			fullName: data.fullName,
			workEmail: data.workEmail,
			agencyName: data.agencyName,
			role: data.role || void 0,
			agencyWebsite: data.agencyWebsite || void 0,
			primaryChallenge: data.primaryChallenge,
			additionalContext: data.additionalContext || void 0
		});
		if (!adminEmailResult.success) {
			console.error("Admin email failed:", adminEmailResult.error);
			throw new Error("We couldn't complete your request. Please try again.");
		}
		const userEmailResult = await sendUserConfirmation({
			fullName: data.fullName,
			workEmail: data.workEmail,
			agencyName: data.agencyName,
			role: data.role || void 0,
			agencyWebsite: data.agencyWebsite || void 0,
			primaryChallenge: data.primaryChallenge,
			additionalContext: data.additionalContext || void 0
		});
		if (!userEmailResult.success) {
			console.error("User confirmation email failed:", userEmailResult.error);
			throw new Error("We couldn't complete your request. Please try again.");
		}
		await insertDiscoveryRequest(data);
		console.log("Discovery request completed successfully.");
		return { ok: true };
	} catch (error) {
		console.error("Discovery submission failed:", error);
		if (error instanceof Error) throw error;
		throw new Error("We couldn't submit your request. Please try again.");
	}
});
//#endregion
export { submitDiscoveryRequest_createServerFn_handler };

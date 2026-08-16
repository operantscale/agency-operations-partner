import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-1hXjwGMJ2.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
import { t as supabase } from "./client-CFjc3-zE.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery.functions-DAME6_Kv.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var resend = new Resend(process.env.RESEND_API_KEY);
var ADMIN_EMAIL = process.env.ADMIN_EMAIL || "wajeeh@operantscale.com";
var FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "noreply@operantscale.com";
/**
* Send admin notification email when a discovery request is submitted
*/
async function sendAdminNotification(data) {
	if (!process.env.RESEND_API_KEY) {
		console.warn("RESEND_API_KEY not configured. Email not sent.");
		return {
			success: false,
			error: "Email service not configured"
		};
	}
	try {
		const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #185 oklch(0.235 0.038 261); color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 24px; }
        .field { margin: 15px 0; }
        .label { font-weight: 600; color: #185 oklch(0.235 0.038 261); }
        .value { color: #555; margin-top: 5px; word-break: break-word; }
        .divider { border-top: 1px solid #eee; margin: 20px 0; }
        .footer { font-size: 12px; color: #999; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New Operational Discovery Request</h1>
        </div>
        
        <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${escapeHtml(data.fullName)}</div>
        </div>
        
        <div class="field">
            <div class="label">Work Email</div>
            <div class="value"><a href="mailto:${escapeHtml(data.workEmail)}">${escapeHtml(data.workEmail)}</a></div>
        </div>
        
        <div class="field">
            <div class="label">Agency Name</div>
            <div class="value">${escapeHtml(data.agencyName)}</div>
        </div>
        
        ${data.role ? `
        <div class="field">
            <div class="label">Role</div>
            <div class="value">${escapeHtml(data.role)}</div>
        </div>
        ` : ""}
        
        ${data.agencyWebsite ? `
        <div class="field">
            <div class="label">Agency Website</div>
            <div class="value"><a href="${escapeHtml(data.agencyWebsite)}" target="_blank">${escapeHtml(data.agencyWebsite)}</a></div>
        </div>
        ` : ""}
        
        <div class="field">
            <div class="label">Primary Operational Challenge</div>
            <div class="value">${escapeHtml(data.primaryChallenge).replace(/\n/g, "<br>")}</div>
        </div>
        
        ${data.additionalContext ? `
        <div class="field">
            <div class="label">Additional Context</div>
            <div class="value">${escapeHtml(data.additionalContext).replace(/\n/g, "<br>")}</div>
        </div>
        ` : ""}
        
        <div class="divider"></div>
        
        <div class="footer">
            <p>This inquiry was submitted on ${(/* @__PURE__ */ new Date()).toLocaleString()} via operantscale.com</p>
        </div>
    </div>
</body>
</html>
    `;
		const response = await resend.emails.send({
			from: FROM_EMAIL,
			to: ADMIN_EMAIL,
			subject: `New Operational Discovery Request - ${data.agencyName}`,
			html: adminHtml
		});
		if (response.error) {
			console.error("Resend admin email error:", response.error);
			return {
				success: false,
				error: response.error
			};
		}
		console.log("Admin notification sent:", response.data?.id);
		return {
			success: true,
			messageId: response.data?.id
		};
	} catch (error) {
		console.error("Error sending admin notification:", error);
		throw error;
	}
}
/**
* Send confirmation email to the user who submitted the form
*/
async function sendUserConfirmation(data) {
	if (!process.env.RESEND_API_KEY) {
		console.warn("RESEND_API_KEY not configured. Email not sent.");
		return {
			success: false,
			error: "Email service not configured"
		};
	}
	try {
		const userHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: oklch(0.235 0.038 261); color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { color: #555; }
        .content p { margin: 15px 0; }
        .cta-section { background: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
        .footer { font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank you for reaching out!</h1>
        </div>
        
        <div class="content">
            <p>Hi ${escapeHtml(data.fullName)},</p>
            
            <p>We've received your discovery request for ${escapeHtml(data.agencyName)}.</p>
            
            <p>We'll review what you shared about your operational challenges and get back to you within two business days to schedule your operational discovery conversation.</p>
            
            <div class="cta-section">
                <p><strong>That first call is a working session, not a sales call.</strong></p>
                <p>We'll walk through how your team operates today and identify where meaningful opportunities for improvement may exist.</p>
            </div>
            
            <p>Questions in the meantime? Feel free to reach out directly to <a href="mailto:wajeeh@operantscale.com">wajeeh@operantscale.com</a>.</p>
            
            <p>Looking forward to the conversation,</p>
            <p><strong>OperantScale</strong><br>
            Operational Intelligence for Independent P&C Insurance Agencies</p>
        </div>
        
        <div class="footer">
            <p>© 2026 OperantScale. All rights reserved.</p>
            <p><a href="https://operantscale.com">operantscale.com</a></p>
        </div>
    </div>
</body>
</html>
    `;
		const response = await resend.emails.send({
			from: FROM_EMAIL,
			to: data.workEmail,
			subject: "Your OperantScale Discovery Request",
			html: userHtml
		});
		if (response.error) {
			console.error("Resend user email error:", response.error);
			return {
				success: false,
				error: response.error
			};
		}
		console.log("User confirmation sent:", response.data?.id);
		return {
			success: true,
			messageId: response.data?.id
		};
	} catch (error) {
		console.error("Error sending user confirmation:", error);
		throw error;
	}
}
/**
* Helper: HTML escape to prevent injection
*/
function escapeHtml(text) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;"
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
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
/**
* Verify a reCAPTCHA v3 token with Google's API.
* Returns the score (0.0 - 1.0) where:
*   1.0 = definitely a legitimate user
*   0.0 = definitely a bot
*
* Throws an error if verification fails.
*/
async function verifyRecaptchaToken(token, scoreThreshold = .5) {
	const secretKey = process.env.RECAPTCHA_SECRET_KEY;
	if (!secretKey) {
		console.warn("RECAPTCHA_SECRET_KEY not configured. Skipping verification.");
		return {
			score: 1,
			action: "unknown"
		};
	}
	if (!token) throw new Error("No reCAPTCHA token provided");
	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				secret: secretKey,
				response: token
			}).toString()
		});
		if (!response.ok) throw new Error(`Google API responded with status ${response.status}`);
		const data = await response.json();
		if (!data.success) {
			const errors = data.error_codes?.join(", ") || "unknown error";
			throw new Error(`reCAPTCHA verification failed: ${errors}`);
		}
		const score = data.score ?? 0;
		if (score < scoreThreshold) throw new Error(`reCAPTCHA score too low (${score.toFixed(2)} < ${scoreThreshold}). Possible bot activity.`);
		return {
			score,
			action: data.action || "unknown"
		};
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error("Failed to verify reCAPTCHA token");
	}
}
var discoverySchema = objectType({
	fullName: stringType().trim().min(2, "Please enter your full name").max(100),
	workEmail: stringType().trim().email("Please enter a valid work email").max(255),
	agencyName: stringType().trim().min(2, "Please enter your agency name").max(150),
	role: stringType().trim().max(100).optional().or(literalType("")),
	agencyWebsite: stringType().trim().max(200).optional().or(literalType("")),
	primaryChallenge: stringType().trim().min(10, "A sentence or two is enough").max(1e3, "Please keep this under 1000 characters"),
	additionalContext: stringType().trim().max(2e3).optional().or(literalType("")),
	recaptchaToken: stringType().optional()
});
var submitDiscoveryRequest_createServerFn_handler = createServerRpc({
	id: "d617a46fdf585928d24717a1a82d4f39df931f582c18829da984df70c8f99096",
	name: "submitDiscoveryRequest",
	filename: "src/lib/discovery.functions.ts"
}, (opts) => submitDiscoveryRequest.__executeServer(opts));
var submitDiscoveryRequest = createServerFn({ method: "POST" }).validator((data) => discoverySchema.parse(data)).handler(submitDiscoveryRequest_createServerFn_handler, async ({ data, context }) => {
	const clientIp = context?.req?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || context?.req?.headers?.get("x-real-ip") || context?.req?.headers?.get("cf-connecting-ip") || "unknown";
	const rateLimitConfig = {
		maxRequests: 5,
		windowMs: 36e5
	};
	const rateLimitCheck = checkRateLimit(clientIp, rateLimitConfig);
	if (!rateLimitCheck.allowed) {
		const retryAfter = rateLimitCheck.retryAfter || 3600;
		throw new Error(`Too many requests. Please try again in ${retryAfter} seconds. To prevent spam, we limit submissions to ${rateLimitConfig.maxRequests} per hour.`);
	}
	if (data.recaptchaToken) try {
		await verifyRecaptchaToken(data.recaptchaToken, .5);
	} catch (captchaError) {
		console.warn("reCAPTCHA verification issue:", captchaError);
	}
	const { error } = await supabase.from("discovery_requests").insert({
		full_name: data.fullName,
		work_email: data.workEmail,
		agency_name: data.agencyName,
		role: data.role || null,
		agency_website: data.agencyWebsite || null,
		primary_challenge: data.primaryChallenge,
		additional_context: data.additionalContext || null
	});
	if (error) {
		console.error("Database error:", error);
		throw new Error("We couldn't submit your request. Please try again or email us directly.");
	}
	try {
		await Promise.all([sendAdminNotification({
			fullName: data.fullName,
			workEmail: data.workEmail,
			agencyName: data.agencyName,
			role: data.role || void 0,
			agencyWebsite: data.agencyWebsite || void 0,
			primaryChallenge: data.primaryChallenge,
			additionalContext: data.additionalContext || void 0
		}), sendUserConfirmation({
			fullName: data.fullName,
			workEmail: data.workEmail,
			agencyName: data.agencyName,
			role: data.role || void 0,
			agencyWebsite: data.agencyWebsite || void 0,
			primaryChallenge: data.primaryChallenge,
			additionalContext: data.additionalContext || void 0
		})]);
	} catch (emailError) {
		console.error("Email sending error:", emailError);
	}
	return { ok: true };
});
//#endregion
export { submitDiscoveryRequest_createServerFn_handler };

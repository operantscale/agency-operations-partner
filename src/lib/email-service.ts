import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "wajeeh@operantscale.com";
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "noreply@operantscale.com";

export interface DiscoveryRequestData {
  fullName: string;
  workEmail: string;
  agencyName: string;
  role?: string;
  agencyWebsite?: string;
  primaryChallenge: string;
  additionalContext?: string;
}

/**
 * Send admin notification email when a discovery request is submitted
 */
export async function sendAdminNotification(data: DiscoveryRequestData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
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
        ` : ''}
        
        ${data.agencyWebsite ? `
        <div class="field">
            <div class="label">Agency Website</div>
            <div class="value"><a href="${escapeHtml(data.agencyWebsite)}" target="_blank">${escapeHtml(data.agencyWebsite)}</a></div>
        </div>
        ` : ''}
        
        <div class="field">
            <div class="label">Primary Operational Challenge</div>
            <div class="value">${escapeHtml(data.primaryChallenge).replace(/\n/g, '<br>')}</div>
        </div>
        
        ${data.additionalContext ? `
        <div class="field">
            <div class="label">Additional Context</div>
            <div class="value">${escapeHtml(data.additionalContext).replace(/\n/g, '<br>')}</div>
        </div>
        ` : ''}
        
        <div class="divider"></div>
        
        <div class="footer">
            <p>This inquiry was submitted on ${new Date().toLocaleString()} via operantscale.com</p>
        </div>
    </div>
</body>
</html>
    `;

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Operational Discovery Request - ${data.agencyName}`,
      html: adminHtml,
    });

    if (response.error) {
      console.error("Resend admin email error:", response.error);
      return { success: false, error: response.error };
    }

    console.log("Admin notification sent:", response.data?.id);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    throw error;
  }
}

/**
 * Send confirmation email to the user who submitted the form
 */
export async function sendUserConfirmation(data: DiscoveryRequestData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Email not sent.");
    return { success: false, error: "Email service not configured" };
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
      html: userHtml,
    });

    if (response.error) {
      console.error("Resend user email error:", response.error);
      return { success: false, error: response.error };
    }

    console.log("User confirmation sent:", response.data?.id);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error("Error sending user confirmation:", error);
    throw error;
  }
}

/**
 * Helper: HTML escape to prevent injection
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

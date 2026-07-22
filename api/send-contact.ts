import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMissingOutboundMailKeys } from "../server/mailConfig.js";
import {
  jsonBadRequest,
  respondMailNotConfigured,
  respondMailTransportFailure,
  respondUnexpectedError,
} from "../server/mailApiResponse.js";
import { enforcePublicFormApiGuards } from "../server/formApiGuards.js";
import { sanitizeEnvValue } from "../server/mailTransport.js";
import { sendMailUnified } from "../server/sendMailUnified.js";
import { getJsonBody } from "../server/vercelRequestBody.js";
import {
  assemblePremiumEmail,
  emailDivider,
  emailFieldRow,
  emailMessageCard,
  emailSoftBadge,
  escapeHtml,
} from "../server/emailHtmlShared.js";
import { PRODUCTION_SITE_ORIGIN } from "../server/siteOrigin.js";

/** Allow enough time for two sequential SMTP sends (internal + confirmation). */
export const config = { maxDuration: 60 };

interface ContactBody {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

function buildInternalEmail(data: ContactBody): string {
  const when = escapeHtml(new Date().toUTCString());
  const name = `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`;
  const body = [
    emailFieldRow("Name", name),
    emailFieldRow("Email", escapeHtml(data.email)),
    emailDivider(),
    emailFieldRow("Subject", escapeHtml(data.subject)),
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:0;">
      <tr><td style="padding:0;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Message</p>
        ${emailMessageCard(`<div style="white-space:pre-wrap;margin:0;">${escapeHtml(data.message)}</div>`)}
      </td></tr>
    </table>`,
  ].join("");

  return assemblePremiumEmail({
    preheader: `New contact — ${escapeHtml(data.subject)}`,
    heroTitle: "New contact form submission",
    heroSubtitle: `Submitted via certifygrc.com — ${when}`,
    heroCentered: false,
    bodyHtml: body,
    footerExtraHtml: `<p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#94a3b8;text-align:center;">Internal notification · certifygrc.com</p>`,
  });
}

function buildConfirmationEmail(data: ContactBody): string {
  const first = escapeHtml(data.firstName);
  const subj = escapeHtml(data.subject);
  const body = `
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Hi ${first},</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Thank you for contacting <strong style="color:#0f172a;">CertifyGRC</strong>. We&apos;ve received your message and our team will get back to you shortly.</p>
${emailSoftBadge(`Your subject: <span style="font-weight:700;color:#0c4a6e;">${subj}</span>`)}
<p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Our team typically responds within <strong>24 hours</strong> during business days. If your matter is urgent, reach us at <a href="mailto:info@certifygrc.com" style="color:#4f46e5;font-weight:600;text-decoration:none;">info@certifygrc.com</a>.</p>
<p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">We look forward to speaking with you.</p>`.trim();

  return assemblePremiumEmail({
    preheader: `We received your message — ${first}`,
    heroTitle: "We received your message",
    heroSubtitle: `Thank you, ${first}!`,
    heroCentered: true,
    bodyHtml: body,
    primaryCta: { href: PRODUCTION_SITE_ORIGIN, label: "Visit CertifyGRC" },
    footerExtraHtml: `<p style="margin:14px 0 0;font-size:11px;line-height:1.55;color:#94a3b8;text-align:center;">You received this because you submitted a contact form on our website.</p>`,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (enforcePublicFormApiGuards(req, res, process.env, "send-contact")) {
      return;
    }

    const missing = getMissingOutboundMailKeys(process.env);
    if (missing.length > 0) {
      return respondMailNotConfigured(res, "send-contact", missing);
    }

    const body = getJsonBody<Partial<ContactBody>>(req);

    // Server-side validation
    const required: (keyof ContactBody)[] = ["firstName", "lastName", "email", "subject", "message"];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return res.status(400).json(jsonBadRequest(`Missing required field: ${field}`));
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email!)) {
      return res.status(400).json(jsonBadRequest("Invalid email address"));
    }

    const data = body as ContactBody;

    try {
      const from = sanitizeEnvValue(process.env.CONTACT_EMAIL_FROM) ?? "";
      const to = sanitizeEnvValue(process.env.CONTACT_EMAIL_TO) ?? "";

      await sendMailUnified(process.env, "send-contact internal", {
        from: `"CertifyGRC Website" <${from}>`,
        to,
        subject: `[Contact Form] ${data.subject} — from ${data.firstName} ${data.lastName}`,
        html: buildInternalEmail(data),
      });

      await sendMailUnified(process.env, "send-contact confirmation", {
        from: `"CertifyGRC" <${from}>`,
        to: data.email,
        subject: "We received your message — CertifyGRC",
        html: buildConfirmationEmail(data),
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return respondMailTransportFailure(res, "send-contact", err);
    }
  } catch (err) {
    return respondUnexpectedError(res, "send-contact", err);
  }
}

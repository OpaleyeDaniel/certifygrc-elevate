import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMissingOutboundMailKeys, resolveInternalTo, resolveMailFrom } from "../server/mailConfig.js";
import {
  jsonBadRequest,
  respondMailNotConfigured,
  respondMailTransportFailure,
  respondUnexpectedError,
} from "../server/mailApiResponse.js";
import { enforcePublicFormApiGuards } from "../server/formApiGuards.js";
import { sendMailUnified } from "../server/sendMailUnified.js";
import { getJsonBody } from "../server/vercelRequestBody.js";
import {
  assemblePremiumEmail,
  emailDivider,
  emailFieldRow,
  emailHighlightCard,
  emailTagGroup,
  escapeHtml,
} from "../server/emailHtmlShared.js";
import { PRODUCTION_SITE_ORIGIN } from "../server/siteOrigin.js";

export const config = { maxDuration: 60 };

interface ConsultationBody {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  industry: string;
  country: string;
  interests: string[];
}

function buildInternalEmail(data: ConsultationBody): string {
  const when = escapeHtml(new Date().toUTCString());
  const interestBlock = `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:4px;">
  <tr><td style="padding:0;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Areas of interest</p>
    ${emailTagGroup(data.interests)}
  </td></tr>
</table>`.trim();

  const body = [
    emailFieldRow("Full name", `${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}`),
    emailFieldRow("Work email", escapeHtml(data.workEmail)),
    emailFieldRow("Company", escapeHtml(data.companyName)),
    emailDivider(),
    emailFieldRow("Industry", escapeHtml(data.industry)),
    emailFieldRow("Country", escapeHtml(data.country)),
    interestBlock,
  ].join("");

  return assemblePremiumEmail({
    preheader: `New consultation — ${escapeHtml(data.companyName)}`,
    heroTitle: "New consultation request",
    heroSubtitle: `Submitted via certifygrc.com — ${when}`,
    heroCentered: false,
    bodyHtml: body,
    footerExtraHtml: `<p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#94a3b8;text-align:center;">Internal notification · certifygrc.com</p>`,
  });
}

function buildConfirmationEmail(data: ConsultationBody): string {
  const first = escapeHtml(data.firstName);
  const company = escapeHtml(data.companyName);
  const previewRaw =
    data.interests.slice(0, 2).join(", ") + (data.interests.length > 2 ? ` +${data.interests.length - 2} more` : "");
  const preview = escapeHtml(previewRaw);

  const body = `
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Hi ${first},</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">Thank you for reaching out to <strong style="color:#0f172a;">CertifyGRC</strong>. We&apos;ve received your consultation request and our team of GRC experts will review your submission shortly.</p>
${emailHighlightCard(`Request summary: ${preview}`)}
<p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">A member of our team will be in touch <strong>within 1–2 business days</strong> to schedule your consultation and discuss how we can tailor a compliance strategy for <strong>${company}</strong>.</p>
<p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">In the meantime, explore our platform or reach us at <a href="mailto:info@certifygrc.com" style="color:#4f46e5;font-weight:600;text-decoration:none;">info@certifygrc.com</a>.</p>`.trim();

  return assemblePremiumEmail({
    preheader: `Consultation received — ${first}`,
    heroTitle: "Consultation request received",
    heroSubtitle: `Thank you, ${first}!`,
    heroCentered: true,
    bodyHtml: body,
    primaryCta: { href: PRODUCTION_SITE_ORIGIN, label: "Explore CertifyGRC" },
    footerExtraHtml: `<p style="margin:14px 0 0;font-size:11px;line-height:1.55;color:#94a3b8;text-align:center;">You received this email because you submitted a consultation request.</p>`,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (enforcePublicFormApiGuards(req, res, process.env, "send-consultation")) {
      return;
    }

    const missing = getMissingOutboundMailKeys(process.env);
    if (missing.length > 0) {
      return respondMailNotConfigured(res, "send-consultation", missing);
    }

    const body = getJsonBody<Partial<ConsultationBody>>(req);

    // Server-side validation
    const required: (keyof ConsultationBody)[] = [
      "firstName", "lastName", "workEmail", "companyName", "industry", "country",
    ];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return res.status(400).json(jsonBadRequest(`Missing required field: ${field}`));
      }
    }
    if (!Array.isArray(body.interests) || body.interests.length === 0) {
      return res.status(400).json(jsonBadRequest("At least one area of interest is required"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.workEmail!)) {
      return res.status(400).json(jsonBadRequest("Invalid email address"));
    }

    const data = body as ConsultationBody;

    try {
      const from = resolveMailFrom(process.env);
      const to = resolveInternalTo(process.env);

      await sendMailUnified(process.env, "send-consultation internal", {
        from: `"CertifyGRC Website" <${from}>`,
        to,
        subject: `[Consultation Request] ${data.firstName} ${data.lastName} — ${data.companyName}`,
        html: buildInternalEmail(data),
      });

      await sendMailUnified(process.env, "send-consultation confirmation", {
        from: `"CertifyGRC" <${from}>`,
        to: data.workEmail,
        subject: "We've received your consultation request — CertifyGRC",
        html: buildConfirmationEmail(data),
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return respondMailTransportFailure(res, "send-consultation", err);
    }
  } catch (err) {
    return respondUnexpectedError(res, "send-consultation", err);
  }
}

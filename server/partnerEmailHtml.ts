import type { PartnerFormValues } from "../src/lib/partnerFormSchema.js";
import { emailLogoBlock } from "./emailHtmlShared.js";
import { PRODUCTION_SITE_ORIGIN } from "./siteOrigin.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatList(items: string[]): string {
  return items.map((i) => escapeHtml(i)).join(", ");
}

function yesNo(v: "yes" | "no"): string {
  return v === "yes" ? "Yes" : "No";
}

export function buildPartnerInternalHtml(data: PartnerFormValues): string {
  const ts = new Date().toUTCString();
  const willing = [
    data.willingDemo ? "Attend a private demo session in May" : null,
    data.willingActiveUse ? "Use the platform actively for 30 days" : null,
    data.willingFeedback ? "Provide structured feedback" : null,
  ].filter(Boolean) as string[];

  const contextRows: { label: string; html: string }[] =
    data.submissionContext === "early_access"
      ? [
          {
            label: "Submission channel",
            html: escapeHtml("Early access & assessment (public form)"),
          },
        ]
      : [];

  const rows: { label: string; html: string }[] = [
    ...contextRows,
    { label: "Full Name", html: escapeHtml(data.fullName) },
    { label: "Work Email", html: escapeHtml(data.workEmail) },
    { label: "Company Name", html: escapeHtml(data.companyName) },
    { label: "Job Title / Role", html: escapeHtml(data.jobTitle) },
    { label: "Company Size", html: escapeHtml(data.companySize) },
    { label: "Industry", html: escapeHtml(data.industry) },
    { label: "Primary Region of Operations", html: escapeHtml(data.primaryRegion) },
    { label: "Frameworks (current)", html: formatList(data.frameworks) },
    { label: "Current Stage", html: escapeHtml(data.currentStage) },
    { label: "Uses GRC / compliance tool today", html: escapeHtml(yesNo(data.usesGrcTool)) },
    ...(data.usesGrcTool === "yes" && data.grcToolName?.trim()
      ? [{ label: "GRC / compliance tool (specified)", html: escapeHtml(data.grcToolName.trim()) }]
      : []),
    { label: "Biggest challenges (up to 3)", html: formatList(data.challenges) },
    { label: "What you want to achieve with CertifyGRC", html: escapeHtml(data.desiredOutcome) },
    { label: "Implementation timeline", html: escapeHtml(data.implementationTimeline) },
    { label: "Willing to commit to", html: formatList(willing) },
    {
      label: "Consent — contact regarding early access",
      html: escapeHtml(data.consentContact ? "Yes" : "No"),
    },
    {
      label: "Consent — product updates & announcements",
      html: escapeHtml(data.consentUpdates ? "Yes" : "No"),
    },
  ];

  const bodyRows = rows
    .map(
      ({ label, html }) => `
      <div class="field">
        <div class="label">${escapeHtml(label)}</div>
        <div class="value">${html}</div>
      </div>`,
    )
    .join("");

  const headerTitle =
    data.submissionContext === "early_access"
      ? "Early Access & Assessment Request"
      : "Partner / Early Access Request";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" />
<style>
  body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
  .wrapper { max-width: 640px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #305CDE 0%, #5B7FE8 100%); padding: 28px 32px; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; font-weight: 700; }
  .header p { color: rgba(255,255,255,0.88); margin: 6px 0 0; font-size: 13px; }
  .body { padding: 28px 32px; }
  .field { margin-bottom: 18px; }
  .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 4px; }
  .value { font-size: 15px; color: #111827; font-weight: 500; white-space: pre-wrap; }
  .footer { padding: 16px 32px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
</style>
</head>
<body>
  <div class="wrapper">
    <div style="padding:28px 32px 12px;background:#fff;">${emailLogoBlock({ centered: true, height: 40 })}</div>
    <div class="header">
      <h1>${escapeHtml(headerTitle)}</h1>
      <p>Submitted via certifygrc.com — ${escapeHtml(ts)}</p>
    </div>
    <div class="body">${bodyRows}</div>
    <div class="footer">CertifyGRC · certifygrc.com</div>
  </div>
</body>
</html>
  `.trim();
}

export function buildPartnerConfirmationHtml(data: PartnerFormValues): string {
  const first = data.fullName.trim().split(/\s+/)[0] || "there";
  const isEarlyAccess = data.submissionContext === "early_access";
  const title = isEarlyAccess ? "We received your access request" : "We received your partner request";
  const bodyP = isEarlyAccess
    ? `<p>Thank you for completing the <strong>early access assessment</strong>. Our team has your information and will review it to prepare the right next steps — including timing, onboarding fit, and demo options when applicable.</p>`
    : `<p>Thank you for your interest in <strong>CertifyGRC</strong>. Our partnerships team has received your early access request and will follow up regarding next steps, including demo scheduling when applicable.</p>`;
  const footerNote = isEarlyAccess
    ? "You received this because you submitted a CertifyGRC early access assessment form."
    : "You received this because you submitted a partner / early access form on our website.";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" />
<style>
  body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
  .wrapper { max-width: 640px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #305CDE 0%, #5B7FE8 100%); padding: 36px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
  .header p { color: rgba(255,255,255,0.92); margin: 8px 0 0; font-size: 14px; }
  .body { padding: 32px 36px; }
  .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 14px; }
  .cta { display: inline-block; background: linear-gradient(135deg, #305CDE, #5B7FE8); color: #fff !important; text-decoration: none; border-radius: 8px; padding: 11px 26px; font-size: 15px; font-weight: 600; margin-top: 8px; }
  .footer { padding: 18px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
  <div class="wrapper">
    <div style="padding:28px 36px 12px;background:#fff;">${emailLogoBlock({ centered: true, height: 40 })}</div>
    <div class="header">
      <h1>${escapeHtml(title)}</h1>
      <p>Thank you, ${escapeHtml(first)}!</p>
    </div>
    <div class="body">
      ${bodyP}
      <p>If you have questions in the meantime, reply to this email or contact us at <a href="mailto:info@certifygrc.com" style="color:#305CDE;">info@certifygrc.com</a>.</p>
      <a href="${PRODUCTION_SITE_ORIGIN}" class="cta">Visit CertifyGRC</a>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} CertifyGRC · certifygrc.com<br />
      ${escapeHtml(footerNote)}
    </div>
  </div>
</body>
</html>
  `.trim();
}

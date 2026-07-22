import { PRODUCTION_LOGO_URL, PRODUCTION_SITE_ORIGIN } from "./siteOrigin.js";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** CertifyGRC logo block for HTML emails — always served from the production domain. */
export function emailLogoBlock(options?: { centered?: boolean; height?: number }): string {
  const centered = options?.centered ?? true;
  const height = options?.height ?? 40;
  const align = centered ? "center" : "left";

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px;">
  <tr>
    <td align="${align}" style="padding:0;">
      <a href="${PRODUCTION_SITE_ORIGIN}" style="text-decoration:none;display:inline-block;">
        <img
          src="${PRODUCTION_LOGO_URL}"
          alt="CertifyGRC"
          height="${height}"
          style="display:block;height:${height}px;width:auto;max-width:200px;border:0;outline:none;text-decoration:none;"
        />
      </a>
    </td>
  </tr>
</table>`.trim();
}

export function emailFieldRow(label: string, valueHtml: string): string {
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:18px;">
  <tr>
    <td style="padding:0;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">${label}</p>
      <p style="margin:0;font-size:15px;line-height:1.5;color:#0f172a;font-weight:600;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">${valueHtml}</p>
    </td>
  </tr>
</table>`.trim();
}

export function emailDivider(): string {
  return `<hr style="border:none;border-top:1px solid #e2e8f0;margin:22px 0;" />`;
}

export function emailMessageCard(innerHtml: string): string {
  return `
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.65;color:#334155;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">
  ${innerHtml}
</div>`.trim();
}

export function emailSoftBadge(innerHtml: string): string {
  return `
<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:12px 16px;font-size:14px;line-height:1.55;color:#0369a1;font-weight:600;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">
  ${innerHtml}
</div>`.trim();
}

export function emailHighlightCard(text: string): string {
  return `
<div style="background:#ede9fe;border:1px solid #c4b5fd;border-radius:10px;padding:14px 18px;font-size:14px;line-height:1.6;color:#305CDE;font-weight:600;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">
  ${text}
</div>`.trim();
}

export function emailTagGroup(tags: string[]): string {
  const chips = tags
    .map(
      (tag) =>
        `<span style="display:inline-block;background:#ede9fe;color:#305CDE;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;margin:0 6px 6px 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">${escapeHtml(tag)}</span>`,
    )
    .join("");
  return `<div style="line-height:1.4;">${chips}</div>`;
}

export interface PremiumEmailOptions {
  preheader: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCentered?: boolean;
  bodyHtml: string;
  primaryCta?: { href: string; label: string };
  footerExtraHtml?: string;
}

export function assemblePremiumEmail(options: PremiumEmailOptions): string {
  const heroAlign = options.heroCentered ? "center" : "left";
  const heroTextAlign = options.heroCentered ? "center" : "left";
  const ctaBlock = options.primaryCta
    ? `
<p style="margin:28px 0 0;text-align:${heroTextAlign};">
  <a href="${escapeHtml(options.primaryCta.href)}" style="display:inline-block;background:linear-gradient(135deg,#305CDE,#5B7FE8);color:#ffffff !important;text-decoration:none;border-radius:10px;padding:14px 28px;font-size:15px;font-weight:600;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">
    ${escapeHtml(options.primaryCta.label)}
  </a>
</p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.heroTitle)}</title>
  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; max-height:0; max-width:0; overflow:hidden; mso-hide:all; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;">
  <div class="preheader">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(15,23,42,0.08);">
          <tr>
            <td style="padding:28px 36px 8px;background:#ffffff;">
              ${emailLogoBlock({ centered: true, height: 42 })}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 28px;background:linear-gradient(135deg,#305CDE 0%,#5B7FE8 100%);">
              <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:800;color:#ffffff;text-align:${heroTextAlign};">${options.heroTitle}</h1>
              <p style="margin:10px 0 0;font-size:15px;line-height:1.55;color:rgba(255,255,255,0.92);text-align:${heroTextAlign};">${options.heroSubtitle}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 36px;background:#ffffff;">
              ${options.bodyHtml}
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">© ${new Date().getFullYear()} CertifyGRC · <a href="${PRODUCTION_SITE_ORIGIN}" style="color:#305CDE;text-decoration:none;">certifygrc.com</a></p>
              ${options.footerExtraHtml ?? ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/** Shared email shell for legacy/simple templates (waitlist, partner, assessment). */
export function wrapLegacyEmail(options: {
  preheader?: string;
  logoCentered?: boolean;
  headerHtml: string;
  bodyHtml: string;
  footerHtml: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${options.preheader ? `<title>${escapeHtml(options.preheader)}</title>` : ""}
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:'Inter',Arial,sans-serif;">
  ${options.preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(options.preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:28px 36px 12px;background:#fff;">
              ${emailLogoBlock({ centered: options.logoCentered ?? true, height: 40 })}
            </td>
          </tr>
          <tr><td style="padding:0;">${options.headerHtml}</td></tr>
          <tr><td style="padding:0;">${options.bodyHtml}</td></tr>
          <tr><td style="padding:0;">${options.footerHtml}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

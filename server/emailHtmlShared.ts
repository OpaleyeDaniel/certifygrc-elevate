import { PRODUCTION_SITE_ORIGIN } from "./siteOrigin.js";
import { PUBLIC_REPLY_EMAIL } from "./mailConfig.js";
import { EMAIL_LOGO_SRC, EMAIL_MARK_SRC } from "./emailInlineAssets.js";

const EMAIL_FONT = "Roboto, 'Google Sans', Helvetica, Arial, sans-serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inline CID logo — attached by sendMailUnified for Gmail/Outlook compatibility. */
export function emailHostedFullLogo(options?: { width?: number; align?: "left" | "center" }): string {
  const width = options?.width ?? 168;
  const align = options?.align ?? "left";
  const src = escapeHtml(EMAIL_LOGO_SRC);
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td align="${align}" style="padding:0;">
      <a href="${PRODUCTION_SITE_ORIGIN}" style="text-decoration:none;display:inline-block;line-height:0;">
        <img src="${src}" alt="CertifyGRC" width="${width}" style="display:block;width:${width}px;max-width:100%;height:auto;border:0;outline:none;" />
      </a>
    </td>
  </tr>
</table>`.trim();
}

/** Hosted checkmark mark. */
export function emailHostedMark(options?: { size?: number; align?: "left" | "center" }): string {
  const size = options?.size ?? 44;
  const align = options?.align ?? "left";
  const src = escapeHtml(EMAIL_MARK_SRC);
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
  <tr>
    <td align="${align}" style="padding:0;">
      <a href="${PRODUCTION_SITE_ORIGIN}" style="text-decoration:none;display:inline-block;line-height:0;">
        <img src="${src}" alt="CertifyGRC" width="${size}" height="${size}" style="display:block;width:${size}px;height:${size}px;border:0;outline:none;object-fit:contain;" />
      </a>
    </td>
  </tr>
</table>`.trim();
}

/** @deprecated Use emailHostedFullLogo */
export function emailEmbeddedFullLogo(options?: { height?: number; align?: "left" | "center" }): string {
  return emailHostedFullLogo({ width: 168, align: options?.align });
}

/** @deprecated Use emailHostedMark */
export function emailEmbeddedMark(options?: { size?: number; align?: "left" | "center" }): string {
  return emailHostedMark(options);
}

/** HTML wordmark readable on white email backgrounds (PNG wordmark uses white "Certify" text). */
export function emailWordmarkHtml(options?: { fontSize?: number }): string {
  const fontSize = options?.fontSize ?? 24;
  return `<span style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;font-size:${fontSize}px;font-weight:800;letter-spacing:-0.03em;line-height:1;white-space:nowrap;"><span style="color:#0f172a;">Certify</span><span style="color:#305CDE;">GRC</span></span>`;
}

/** Full logo + optional mark — primary email brand header. */
export function emailBrandHeaderBlock(options?: { logoWidth?: number; showMark?: boolean }): string {
  const logoWidth = options?.logoWidth ?? 168;
  if (options?.showMark) {
    return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0;">
  <tr>
    <td align="center" style="padding:0;">
      ${emailHostedMark({ size: 48, align: "center" })}
      <div style="height:12px;line-height:12px;font-size:0;">&nbsp;</div>
      ${emailHostedFullLogo({ width: logoWidth, align: "center" })}
    </td>
  </tr>
</table>`.trim();
  }
  return emailHostedFullLogo({ width: logoWidth, align: "center" });
}

/** Round CertifyGRC mark for compact placements (matches browser favicon). */
export function emailLogoMarkBlock(options?: { centered?: boolean; size?: number }): string {
  const centered = options?.centered ?? true;
  const size = options?.size ?? 56;
  const align = centered ? "center" : "left";

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px;">
  <tr>
    <td align="${align}" style="padding:0;">
      <a href="${PRODUCTION_SITE_ORIGIN}" style="text-decoration:none;display:inline-block;line-height:0;">
        <img
          src="${EMAIL_MARK_SRC}"
          alt="CertifyGRC"
          width="${size}"
          height="${size}"
          style="display:block;width:${size}px;height:${size}px;border:0;outline:none;text-decoration:none;object-fit:contain;"
        />
      </a>
    </td>
  </tr>
</table>`.trim();
}

/** Full wordmark for HTML emails — light-background logo on the live site. */
export function emailLogoBlock(options?: { centered?: boolean; width?: number }): string {
  const centered = options?.centered ?? true;
  const width = options?.width ?? 168;
  const align = centered ? "center" : "left";
  const src = escapeHtml(EMAIL_LOGO_SRC);

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px;">
  <tr>
    <td align="${align}" style="padding:0;">
      <a href="${PRODUCTION_SITE_ORIGIN}" style="text-decoration:none;display:inline-block;">
        <img src="${src}" alt="CertifyGRC" width="${width}" style="display:block;width:${width}px;max-width:100%;height:auto;border:0;outline:none;" />
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
            <td style="padding:32px 36px 12px;background:#ffffff;">
              ${emailHostedFullLogo({ width: 160, align: options.heroCentered ? "center" : "left" })}
            </td>
          </tr>
          <tr>
            <td style="padding:12px 36px 28px;background:linear-gradient(135deg,#305CDE 0%,#5B7FE8 100%);">
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

/** Google / Meta–style minimal transactional shell — no gradients, no stat cards. */
export interface CleanEmailOptions {
  preheader: string;
  title: string;
  bodyHtml: string;
  primaryCta?: { href: string; label: string };
  footerNote?: string;
}

export function assembleCleanEmail(options: CleanEmailOptions): string {
  const ctaBlock = options.primaryCta
    ? `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:32px 0 0;">
  <tr>
    <td style="border-radius:4px;background:#305CDE;">
      <a href="${escapeHtml(options.primaryCta.href)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:500;color:#ffffff !important;text-decoration:none;font-family:${EMAIL_FONT};">
        ${escapeHtml(options.primaryCta.label)}
      </a>
    </td>
  </tr>
</table>`
    : "";

  const footerNote = options.footerNote
    ? `<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#70757a;font-family:${EMAIL_FONT};">${options.footerNote}</p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.title)}</title>
  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
  </style>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:${EMAIL_FONT};">
  <div class="preheader">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">
          <tr>
            <td style="padding:32px 40px 0;background:#ffffff;">
              ${emailHostedFullLogo({ width: 160, align: "left" })}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 40px;background:#ffffff;">
              <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;font-weight:400;color:#202124;font-family:${EMAIL_FONT};">${escapeHtml(options.title)}</h1>
              ${options.bodyHtml}
              ${ctaBlock}
              <hr style="border:none;border-top:1px solid #dadce0;margin:36px 0 24px;" />
              <p style="margin:0;font-size:12px;line-height:1.5;color:#70757a;font-family:${EMAIL_FONT};">
                © ${new Date().getFullYear()} CertifyGRC · <a href="${PRODUCTION_SITE_ORIGIN}" style="color:#305CDE;text-decoration:none;">certifygrc.com</a>
              </p>
              ${footerNote}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/** Modern SaaS transactional shell — card layout, score hero, metric tiles. */
export interface SaasEmailOptions {
  preheader: string;
  title: string;
  subtitle?: string;
  heroHtml?: string;
  bodyHtml: string;
  primaryCta?: { href: string; label: string };
  footerNote?: string;
}

export function assembleSaasEmail(options: SaasEmailOptions): string {
  const subtitleBlock = options.subtitle
    ? `<p style="margin:8px 0 0;font-size:15px;line-height:1.55;color:#64748b;font-family:${EMAIL_FONT};">${options.subtitle}</p>`
    : "";

  const heroBlock = options.heroHtml
    ? `
<tr>
  <td style="padding:0 32px 28px;background:#ffffff;">
    ${options.heroHtml}
  </td>
</tr>`
    : "";

  const ctaBlock = options.primaryCta
    ? `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:32px 0 0;">
  <tr>
    <td style="border-radius:10px;background:#305CDE;">
      <a href="${escapeHtml(options.primaryCta.href)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff !important;text-decoration:none;font-family:${EMAIL_FONT};">
        ${escapeHtml(options.primaryCta.label)}
      </a>
    </td>
  </tr>
</table>`
    : "";

  const footerNote = options.footerNote
    ? `<p style="margin:12px 0 0;font-size:12px;line-height:1.55;color:#94a3b8;font-family:${EMAIL_FONT};">${options.footerNote}</p>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(options.title)}</title>
  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:${EMAIL_FONT};">
  <div class="preheader">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f6f8;padding:40px 16px;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
          <tr>
            <td style="padding:32px 32px 24px;background:#ffffff;border-bottom:1px solid #f1f5f9;">
              ${emailHostedFullLogo({ width: 160, align: "center" })}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 0;background:#ffffff;">
              <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:700;color:#0f172a;font-family:${EMAIL_FONT};">${escapeHtml(options.title)}</h1>
              ${subtitleBlock}
            </td>
          </tr>
          ${heroBlock}
          <tr>
            <td style="padding:0 32px 32px;background:#ffffff;">
              ${options.bodyHtml}
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;font-family:${EMAIL_FONT};">
                © ${new Date().getFullYear()} CertifyGRC · <a href="${PRODUCTION_SITE_ORIGIN}" style="color:#305CDE;text-decoration:none;">certifygrc.com</a>
                · <a href="mailto:${PUBLIC_REPLY_EMAIL}" style="color:#305CDE;text-decoration:none;">${PUBLIC_REPLY_EMAIL}</a>
              </p>
              ${footerNote}
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
              ${emailLogoBlock({ centered: options.logoCentered ?? true, width: 168 })}
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

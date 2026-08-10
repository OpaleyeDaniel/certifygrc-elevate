import {
  assemblePremiumEmail,
  assembleSaasEmail,
  emailDivider,
  emailFieldRow,
  escapeHtml,
} from "./emailHtmlShared.js";

const FONT = "Roboto, 'Google Sans', Helvetica, Arial, sans-serif";
const TEXT = "#334155";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const BRAND = "#305CDE";

function roundScore(value: number): number {
  return Math.round(value);
}

function formatScore(value: number, max: number): string {
  return `${roundScore(value)} / ${max}`;
}

export interface AssessmentLeadResultsForEmail {
  overallMaturity: number;
  postureProfile: string;
  totalGaps: number;
  gapRate: number;
  estimatedReadiness: number;
  functionBreakdown: Record<string, number>;
  topGaps: { nistId: string; question: string; answer: string }[];
}

export interface AssessmentLeadForEmail {
  email: string;
  companyName?: string;
  jobTitle?: string;
  submittedAtUtc: string;
  results: AssessmentLeadResultsForEmail;
}

function scoreHero(score: number): string {
  const pct = Math.round((score / 5) * 100);
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#f8fafc 0%,#eef2ff 100%);border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
  <tr>
    <td style="padding:28px 24px;text-align:center;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};font-family:${FONT};">Overall maturity</p>
      <p style="margin:0 0 20px;font-size:52px;line-height:1;font-weight:800;color:#0f172a;font-family:${FONT};">${score}<span style="font-size:22px;font-weight:600;color:${MUTED};">/5</span></p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="background:#e2e8f0;border-radius:999px;height:8px;padding:0;">
            <div style="width:${pct}%;max-width:100%;background:linear-gradient(90deg,${BRAND},#5B7FE8);border-radius:999px;height:8px;line-height:8px;font-size:0;">&nbsp;</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function metricTiles(gaps: number, gapRate: number, readiness: number): string {
  const tile = (label: string, value: string, accent: string) => `
<td width="33%" style="padding:0 6px;vertical-align:top;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border:1px solid ${BORDER};border-radius:12px;">
    <tr>
      <td style="padding:16px 12px;text-align:center;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};font-family:${FONT};">${label}</p>
        <p style="margin:0;font-size:24px;line-height:1.2;font-weight:800;color:${accent};font-family:${FONT};">${value}</p>
      </td>
    </tr>
  </table>
</td>`;

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0 0;">
  <tr>
    ${tile("Gaps found", String(gaps), "#dc2626")}
    ${tile("Gap rate", `${gapRate}%`, "#d97706")}
    ${tile("Audit readiness", `${readiness}%`, BRAND)}
  </tr>
</table>`;
}

function functionBreakdownBars(breakdown: Record<string, number>): string {
  const rows = Object.entries(breakdown)
    .map(([fn, score]) => {
      const rounded = roundScore(score);
      const pct = Math.round((rounded / 5) * 100);
      return `
<tr>
  <td colspan="2" style="padding:0 0 14px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="padding:0 0 6px;font-size:13px;font-weight:600;color:#0f172a;font-family:${FONT};">${escapeHtml(fn)}</td>
        <td align="right" style="padding:0 0 6px;font-size:13px;font-weight:600;color:${MUTED};font-family:${FONT};">${formatScore(score, 5)}</td>
      </tr>
      <tr>
        <td colspan="2" style="background:#e2e8f0;border-radius:999px;height:6px;padding:0;">
          <div style="width:${pct}%;max-width:100%;background:${BRAND};border-radius:999px;height:6px;line-height:6px;font-size:0;">&nbsp;</div>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
    })
    .join("");

  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0;">
  ${rows}
</table>`;
}

function topGapsCards(gaps: AssessmentLeadForEmail["results"]["topGaps"]): string {
  if (gaps.length === 0) {
    return `<p style="margin:0;font-size:14px;line-height:1.6;color:${MUTED};font-family:${FONT};">No significant gaps were flagged in this sample.</p>`;
  }

  return gaps
    .map(
      (g, i) => `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:${i === 0 ? "0" : "12px 0 0"};background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
  <tr>
    <td style="padding:14px 16px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#991b1b;font-family:${FONT};">${escapeHtml(g.nistId)}</p>
      <p style="margin:0 0 6px;font-size:14px;line-height:1.5;color:${TEXT};font-family:${FONT};">${escapeHtml(g.question)}</p>
      <p style="margin:0;font-size:13px;line-height:1.45;color:#b91c1c;font-family:${FONT};">${escapeHtml(g.answer)}</p>
    </td>
  </tr>
</table>`,
    )
    .join("");
}

function sectionHeading(title: string): string {
  return `<p style="margin:28px 0 14px;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#0f172a;font-family:${FONT};">${escapeHtml(title)}</p>`;
}

/** Internal notification — sent to the CertifyGRC team when a visitor completes the quiz. */
export function buildAssessmentInternalHtml(input: AssessmentLeadForEmail): string {
  const r = input.results;
  let headerWhen = input.submittedAtUtc;
  try {
    headerWhen = new Date(input.submittedAtUtc).toUTCString();
  } catch {
    /* keep ISO */
  }

  const body = [
    emailFieldRow("Email", escapeHtml(input.email)),
    emailFieldRow("Company", escapeHtml(input.companyName ?? "—")),
    emailFieldRow("Job title", escapeHtml(input.jobTitle ?? "—")),
    emailDivider(),
    emailFieldRow("Overall maturity", `${formatScore(r.overallMaturity, 5)} (${escapeHtml(r.postureProfile)})`),
    emailFieldRow("Gaps found", `${r.totalGaps} (${r.gapRate}% gap rate)`),
    emailFieldRow("Estimated readiness", `${r.estimatedReadiness}%`),
    emailDivider(),
    sectionHeading("NIST CSF function breakdown"),
    functionBreakdownBars(r.functionBreakdown),
    sectionHeading("Top gaps"),
    topGapsCards(r.topGaps),
  ].join("");

  return assemblePremiumEmail({
    preheader: `New quiz lead — ${input.email}`,
    heroTitle: "New Security Posture Quiz lead",
    heroSubtitle: `CertifyGRC landing page · ${escapeHtml(headerWhen)}`,
    heroCentered: false,
    bodyHtml: body,
    footerExtraHtml: `<p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#94a3b8;text-align:center;">Internal notification · certifygrc.com</p>`,
  });
}

/** Confirmation / results email — sent to the person who completed the quiz. */
export function buildAssessmentConfirmationHtml(input: {
  results: AssessmentLeadResultsForEmail;
  softwareUrl: string;
}): string {
  const r = input.results;
  const softwareUrl = escapeHtml(input.softwareUrl);
  const score = roundScore(r.overallMaturity);

  const body = [
    metricTiles(r.totalGaps, r.gapRate, r.estimatedReadiness),
    sectionHeading("Function breakdown"),
    functionBreakdownBars(r.functionBreakdown),
    sectionHeading("Top gaps to address"),
    topGapsCards(r.topGaps),
    `<p style="margin:28px 0 0;font-size:12px;line-height:1.65;color:${MUTED};font-family:${FONT};">This is an indicative self-assessment based on 16 sample controls aligned to NIST CSF. It is not a formal audit or certification. CertifyGRC&apos;s platform covers all 106 subcategory controls with evidence, remediation, and auditor review.</p>`,
  ].join("");

  return assembleSaasEmail({
    preheader: `Your NIST CSF maturity score is ${score} out of 5`,
    title: "Your NIST CSF maturity report",
    subtitle: "Thanks for completing the Security Posture Quiz. Here is where your organization stands based on your responses.",
    heroHtml: scoreHero(score),
    bodyHtml: body,
    primaryCta: { href: softwareUrl, label: "Start your full NIST CSF assessment" },
    footerNote: "You received this email because you completed the Security Posture Quiz on certifygrc.com.",
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function functionBreakdownRows(breakdown: Record<string, number>): string {
  return Object.entries(breakdown)
    .map(
      ([fn, score]) =>
        `<tr><td style="padding:6px 10px;color:#374151;font-size:13px;">${escapeHtml(fn)}</td><td style="padding:6px 10px;color:#111827;font-size:13px;font-weight:600;">${score.toFixed(1)} / 3.0</td></tr>`,
    )
    .join("");
}

function topGapRows(gaps: AssessmentLeadForEmail["results"]["topGaps"]): string {
  if (gaps.length === 0) {
    return `<tr><td style="padding:6px 10px;color:#6b7280;font-size:13px;">No significant gaps flagged.</td></tr>`;
  }
  return gaps
    .map(
      (g) =>
        `<tr><td style="padding:6px 10px;color:#374151;font-size:13px;">${escapeHtml(g.nistId)} — ${escapeHtml(g.question)}</td><td style="padding:6px 10px;color:#b91c1c;font-size:13px;font-weight:600;">${escapeHtml(g.answer)}</td></tr>`,
    )
    .join("");
}

/** Internal notification — sent to the CertifyGRC team when a visitor
 *  unlocks their Security Posture Quiz results (a marketing lead magnet). */
export function buildAssessmentInternalHtml(input: AssessmentLeadForEmail): string {
  const email = escapeHtml(input.email);
  const companyName = escapeHtml(input.companyName ?? "—");
  const jobTitle = escapeHtml(input.jobTitle ?? "—");
  let headerWhen = escapeHtml(input.submittedAtUtc);
  try {
    headerWhen = escapeHtml(new Date(input.submittedAtUtc).toUTCString());
  } catch {
    /* keep ISO */
  }
  const r = input.results;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
    .wrapper { max-width: 640px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #305CDE 0%, #5B7FE8 100%); padding: 32px 36px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px 36px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; font-weight: 500; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 22px 0; }
    .stat-grid { display: table; width: 100%; margin: 10px 0 20px; }
    .stat { display: table-cell; padding: 10px 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }
    table { border-collapse: collapse; width: 100%; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Security Posture Quiz lead</h1>
      <p>CertifyGRC landing page · ${headerWhen}</p>
    </div>
    <div class="body">
      <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
      <div class="field"><div class="label">Company</div><div class="value">${companyName}</div></div>
      <div class="field"><div class="label">Job title</div><div class="value">${jobTitle}</div></div>
      <hr class="divider" />
      <div class="field">
        <div class="label">Overall maturity</div>
        <div class="value">${r.overallMaturity.toFixed(1)} / 5.0 — ${escapeHtml(r.postureProfile)}</div>
      </div>
      <div class="field"><div class="label">Gaps found</div><div class="value">${r.totalGaps} (${r.gapRate}% gap rate)</div></div>
      <div class="field"><div class="label">Estimated readiness</div><div class="value">${r.estimatedReadiness}%</div></div>
      <hr class="divider" />
      <div class="label" style="margin-bottom:8px;">Function breakdown</div>
      <table>${functionBreakdownRows(r.functionBreakdown)}</table>
      <hr class="divider" />
      <div class="label" style="margin-bottom:8px;">Top gaps</div>
      <table>${topGapRows(r.topGaps)}</table>
    </div>
    <div class="footer">CertifyGRC · certifygrc.com · Landing page lead magnet</div>
  </div>
</body>
</html>
  `.trim();
}

/** Confirmation / results email — sent to the person who completed the quiz. */
export function buildAssessmentConfirmationHtml(input: {
  results: AssessmentLeadResultsForEmail;
  softwareUrl: string;
}): string {
  const r = input.results;
  const softwareUrl = escapeHtml(input.softwareUrl);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #305CDE 0%, #5B7FE8 100%); padding: 36px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 36px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .score { text-align: center; margin: 8px 0 24px; }
    .score .big { font-size: 40px; font-weight: 800; color: #305CDE; }
    .score .label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; }
    .box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px 18px; font-size: 14px; color: #374151; line-height: 1.65; margin: 18px 0; }
    .cta { display: inline-block; background: linear-gradient(135deg, #305CDE, #5B7FE8); color: #fff !important; text-decoration: none; border-radius: 10px; padding: 14px 28px; font-size: 15px; font-weight: 600; margin-top: 8px; }
    .disclaimer { font-size: 11px; color: #9ca3af; line-height: 1.6; margin-top: 20px; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Your NIST CSF maturity report</h1>
      <p>CertifyGRC Security Posture Quiz</p>
    </div>
    <div class="body">
      <div class="score">
        <div class="big">${r.overallMaturity.toFixed(1)} / 5.0</div>
        <div class="label">${escapeHtml(r.postureProfile)}</div>
      </div>
      <p>Thanks for taking the Security Posture Quiz. Based on your answers, here's a snapshot of where your organization stands against NIST CSF 2.0:</p>
      <div class="box">
        <strong>${r.totalGaps} compliance gaps</strong> found (${r.gapRate}% of sample controls) · Estimated audit readiness: <strong>${r.estimatedReadiness}%</strong>
      </div>
      <p style="text-align:center; margin: 24px 0 8px;">
        <a href="${softwareUrl}" class="cta">Start your full NIST CSF assessment</a>
      </p>
      <p class="disclaimer">
        This is an indicative self-assessment based on 16 sample controls aligned to NIST CSF 2.0. It is not a formal audit, certification, or legal compliance determination. CertifyGRC's full platform assesses all 106 subcategory controls with evidence, gap remediation, risk scoring, and auditor review.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} CertifyGRC · certifygrc.com<br />
      You received this because you completed our Security Posture Quiz.
    </div>
  </div>
</body>
</html>
  `.trim();
}

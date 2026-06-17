function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function firstNameFromFullName(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "there";
  return t.split(/\s+/)[0] ?? "there";
}

export function buildWaitlistInternalHtml(input: {
  fullName: string;
  email: string;
  pageLabel: string;
  submittedAtUtc: string;
}): string {
  const fullName = escapeHtml(input.fullName);
  const email = escapeHtml(input.email);
  const pageLabel = escapeHtml(input.pageLabel);
  const submittedAtUtc = escapeHtml(input.submittedAtUtc);
  let headerWhen = submittedAtUtc;
  try {
    headerWhen = escapeHtml(new Date(input.submittedAtUtc).toUTCString());
  } catch {
    /* keep ISO */
  }
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 32px 36px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px 36px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; font-weight: 500; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New waitlist signup</h1>
      <p>CertifyGRC · ${headerWhen}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full name</div>
        <div class="value">${fullName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email}</div>
      </div>
      <hr class="divider" />
      <div class="field">
        <div class="label">Page</div>
        <div class="value">${pageLabel}</div>
      </div>
      <div class="field">
        <div class="label">Submitted (UTC)</div>
        <div class="value">${submittedAtUtc}</div>
      </div>
    </div>
    <div class="footer">CertifyGRC · certifygrc.com</div>
  </div>
</body>
</html>
  `.trim();
}

export function buildWaitlistConfirmationHtml(input: {
  fullName: string;
  accessFormUrl: string;
}): string {
  const first = escapeHtml(firstNameFromFullName(input.fullName));
  const accessFormUrl = escapeHtml(input.accessFormUrl);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 36px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 36px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px 18px; font-size: 14px; color: #374151; line-height: 1.65; margin: 18px 0; }
    .cta { display: inline-block; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #fff !important; text-decoration: none; border-radius: 10px; padding: 14px 28px; font-size: 15px; font-weight: 600; margin-top: 8px; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>You're on the list</h1>
      <p>Welcome, ${first}</p>
    </div>
    <div class="body">
      <p>Thank you for joining the CertifyGRC waitlist your spot is reserved. As we open the platform in controlled waves, we use a short qualification step to understand your organization’s compliance priorities and prepare the right next steps.</p>
      <div class="box">
        <strong>Next step: access &amp; readiness</strong><br />
        Please complete a brief early access assessment. It takes about two minutes and helps us tailor onboarding, timing, and follow-up to your team’s needs.
      </div>
      <p style="text-align:center; margin: 24px 0 8px;">
        <a href="${accessFormUrl}" class="cta">Complete your access form</a>
      </p>
      <p style="text-align:center; font-size: 14px; color: #6b7280; margin-top: 12px;">
        Or copy this link: <a href="${accessFormUrl}" style="color:#4f46e5;">${accessFormUrl}</a>
      </p>
      <p>Our team will review your information and reply with clear next steps. If you have questions in the meantime, reply to this email or write us at <a href="mailto:info@certifygrc.com" style="color:#4f46e5;">info@certifygrc.com</a>.</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} CertifyGRC · certifygrc.com<br />
      You received this because you joined our waitlist.
    </div>
  </div>
</body>
</html>
  `.trim();
}

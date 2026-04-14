import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ConsultationBody {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  industry: string;
  country: string;
  interests: string[];
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

function buildInternalEmail(data: ConsultationBody): string {
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
    .tag-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
    .tag { background: #ede9fe; color: #4f46e5; border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Consultation Request</h1>
      <p>Submitted via certifygrc.com — ${new Date().toUTCString()}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Work Email</div>
        <div class="value">${data.workEmail}</div>
      </div>
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${data.companyName}</div>
      </div>
      <hr class="divider" />
      <div class="field">
        <div class="label">Industry</div>
        <div class="value">${data.industry}</div>
      </div>
      <div class="field">
        <div class="label">Country</div>
        <div class="value">${data.country}</div>
      </div>
      <div class="field">
        <div class="label">Areas of Interest</div>
        <div class="tag-list">
          ${data.interests.map((i) => `<span class="tag">${i}</span>`).join("")}
        </div>
      </div>
    </div>
    <div class="footer">CertifyGRC · certifygrc.com</div>
  </div>
</body>
</html>
  `.trim();
}

function buildConfirmationEmail(data: ConsultationBody): string {
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
    .highlight { background: #ede9fe; border-radius: 8px; padding: 16px 20px; color: #4f46e5; font-size: 14px; font-weight: 600; margin: 20px 0; }
    .cta { display: inline-block; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #fff; text-decoration: none; border-radius: 8px; padding: 12px 28px; font-size: 15px; font-weight: 600; margin-top: 8px; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Consultation Request Received</h1>
      <p>Thank you, ${data.firstName}!</p>
    </div>
    <div class="body">
      <p>Hi ${data.firstName},</p>
      <p>Thank you for reaching out to <strong>CertifyGRC</strong>. We've received your consultation request and our team of GRC experts will review your submission shortly.</p>
      <div class="highlight">
        📋 &nbsp; Your request covers: ${data.interests.slice(0, 2).join(", ")}${data.interests.length > 2 ? ` and ${data.interests.length - 2} more` : ""}.
      </div>
      <p>A member of our team will be in touch <strong>within 1–2 business days</strong> to schedule your consultation and discuss how we can tailor a compliance strategy for <em>${data.companyName}</em>.</p>
      <p>In the meantime, feel free to explore our platform or reach out at <a href="mailto:info@certifygrc.com" style="color:#4f46e5;">info@certifygrc.com</a>.</p>
      <a href="https://certifygrc.com" class="cta">Explore CertifyGRC</a>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} CertifyGRC · certifygrc.com<br />
      You received this email because you submitted a consultation request.
    </div>
  </div>
</body>
</html>
  `.trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Partial<ConsultationBody>;

  // Server-side validation
  const required: (keyof ConsultationBody)[] = [
    "firstName", "lastName", "workEmail", "companyName", "industry", "country",
  ];
  for (const field of required) {
    if (!body[field] || String(body[field]).trim() === "") {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }
  if (!Array.isArray(body.interests) || body.interests.length === 0) {
    return res.status(400).json({ error: "At least one area of interest is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.workEmail!)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const data = body as ConsultationBody;

  try {
    const transporter = createTransport();
    const from = process.env.CONTACT_EMAIL_FROM!;
    const to = process.env.CONTACT_EMAIL_TO!;

    // Send internal notification
    await transporter.sendMail({
      from: `"CertifyGRC Website" <${from}>`,
      to,
      subject: `[Consultation Request] ${data.firstName} ${data.lastName} — ${data.companyName}`,
      html: buildInternalEmail(data),
    });

    // Send user confirmation
    await transporter.sendMail({
      from: `"CertifyGRC" <${from}>`,
      to: data.workEmail,
      subject: "We've received your consultation request — CertifyGRC",
      html: buildConfirmationEmail(data),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ContactBody {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
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

function buildInternalEmail(data: ContactBody): string {
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
    .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.65; white-space: pre-wrap; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>Submitted via certifygrc.com — ${new Date().toUTCString()}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${data.email}</div>
      </div>
      <hr class="divider" />
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${data.subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${data.message}</div>
      </div>
    </div>
    <div class="footer">CertifyGRC · certifygrc.com</div>
  </div>
</body>
</html>
  `.trim();
}

function buildConfirmationEmail(data: ContactBody): string {
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
    .subject-badge { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #0369a1; font-weight: 600; margin: 16px 0; }
    .cta { display: inline-block; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #fff; text-decoration: none; border-radius: 8px; padding: 12px 28px; font-size: 15px; font-weight: 600; margin-top: 8px; }
    .footer { padding: 20px 36px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>We Received Your Message</h1>
      <p>Thank you, ${data.firstName}!</p>
    </div>
    <div class="body">
      <p>Hi ${data.firstName},</p>
      <p>Thank you for contacting <strong>CertifyGRC</strong>. We've received your message and our team will get back to you shortly.</p>
      <div class="subject-badge">
        💬 &nbsp; Re: ${data.subject}
      </div>
      <p>Our team typically responds within <strong>24 hours</strong> during business days. If your matter is urgent, feel free to reach us directly at <a href="mailto:info@certifygrc.com" style="color:#4f46e5;">info@certifygrc.com</a>.</p>
      <p>We look forward to speaking with you.</p>
      <a href="https://certifygrc.com" class="cta">Visit CertifyGRC</a>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} CertifyGRC · certifygrc.com<br />
      You received this because you submitted a contact form on our website.
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

  const body = req.body as Partial<ContactBody>;

  // Server-side validation
  const required: (keyof ContactBody)[] = ["firstName", "lastName", "email", "subject", "message"];
  for (const field of required) {
    if (!body[field] || String(body[field]).trim() === "") {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email!)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const data = body as ContactBody;

  try {
    const transporter = createTransport();
    const from = process.env.CONTACT_EMAIL_FROM!;
    const to = process.env.CONTACT_EMAIL_TO!;

    // Send internal notification
    await transporter.sendMail({
      from: `"CertifyGRC Website" <${from}>`,
      to,
      subject: `[Contact Form] ${data.subject} — from ${data.firstName} ${data.lastName}`,
      html: buildInternalEmail(data),
    });

    // Send user confirmation
    await transporter.sendMail({
      from: `"CertifyGRC" <${from}>`,
      to: data.email,
      subject: "We received your message — CertifyGRC",
      html: buildConfirmationEmail(data),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
}

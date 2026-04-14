import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import nodemailer from "nodemailer";
import type { IncomingMessage, ServerResponse } from "http";

// ─── helpers ────────────────────────────────────────────────────────────────

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => { data += chunk.toString(); });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function jsonResponse(res: ServerResponse, status: number, body: object) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function makeTransport(env: Record<string, string>) {
  const port = Number(env.SMTP_PORT ?? 587);
  if (port === 597) {
    console.warn(
      "[dev-api] SMTP_PORT is 597 — that is almost never valid. Use 587 (TLS) or 465 (SSL). Typo for 587 is common.",
    );
  }
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: env.SMTP_SECURE === "true",
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15_000,
    socketTimeout: 15_000,
  });
}

// ─── Email templates ─────────────────────────────────────────────────────────

function consultationInternalHtml(d: Record<string, unknown>): string {
  const interests = Array.isArray(d.interests) ? (d.interests as string[]) : [];
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0}
.w{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.h{background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:28px 32px}
.h h1{color:#fff;margin:0;font-size:20px;font-weight:700}
.h p{color:rgba(255,255,255,.85);margin:4px 0 0;font-size:13px}
.b{padding:28px 32px}.f{margin-bottom:18px}
.l{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-bottom:3px}
.v{font-size:15px;color:#111827;font-weight:500}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.tag{background:#ede9fe;color:#4f46e5;border-radius:6px;padding:3px 9px;font-size:12px;font-weight:600}
hr{border:none;border-top:1px solid #e5e7eb;margin:20px 0}
.ft{padding:16px 32px;background:#f9fafb;text-align:center;font-size:12px;color:#9ca3af}
</style></head><body>
<div class="w"><div class="h"><h1>New Consultation Request</h1><p>Received ${new Date().toUTCString()}</p></div>
<div class="b">
<div class="f"><div class="l">Name</div><div class="v">${d.firstName} ${d.lastName}</div></div>
<div class="f"><div class="l">Work Email</div><div class="v">${d.workEmail}</div></div>
<div class="f"><div class="l">Company</div><div class="v">${d.companyName}</div></div>
<hr/>
<div class="f"><div class="l">Industry</div><div class="v">${d.industry}</div></div>
<div class="f"><div class="l">Country</div><div class="v">${d.country}</div></div>
<div class="f"><div class="l">Areas of Interest</div>
<div class="tags">${interests.map((i) => `<span class="tag">${i}</span>`).join("")}</div></div>
</div><div class="ft">CertifyGRC · certifygrc.com</div></div></body></html>`;
}

function consultationConfirmHtml(d: Record<string, unknown>): string {
  const interests = Array.isArray(d.interests) ? (d.interests as string[]) : [];
  const preview = interests.slice(0, 2).join(", ") + (interests.length > 2 ? ` +${interests.length - 2} more` : "");
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0}
.w{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.h{background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:32px;text-align:center}
.h h1{color:#fff;margin:0;font-size:22px;font-weight:700}.h p{color:rgba(255,255,255,.9);margin:6px 0 0;font-size:14px}
.b{padding:32px}.b p{color:#374151;font-size:15px;line-height:1.7;margin:0 0 14px}
.hl{background:#ede9fe;border-radius:8px;padding:14px 18px;color:#4f46e5;font-size:14px;font-weight:600;margin:18px 0}
.cta{display:inline-block;background:linear-gradient(135deg,#4f46e5,#06b6d4);color:#fff;text-decoration:none;border-radius:8px;padding:11px 26px;font-size:15px;font-weight:600;margin-top:6px}
.ft{padding:16px 32px;background:#f9fafb;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
</style></head><body>
<div class="w"><div class="h"><h1>Consultation Request Received</h1><p>Thank you, ${d.firstName}!</p></div>
<div class="b">
<p>Hi ${d.firstName},</p>
<p>Thank you for reaching out to <strong>CertifyGRC</strong>. We have received your consultation request and our team will be in touch within <strong>1–2 business days</strong>.</p>
<div class="hl">📋 &nbsp;Your request covers: ${preview}</div>
<p>In the meantime feel free to explore our platform or email us at <a href="mailto:info@certifygrc.com" style="color:#4f46e5">info@certifygrc.com</a>.</p>
<a href="https://certifygrc.com" class="cta">Explore CertifyGRC</a>
</div><div class="ft">© ${new Date().getFullYear()} CertifyGRC · certifygrc.com</div></div></body></html>`;
}

function contactInternalHtml(d: Record<string, unknown>): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0}
.w{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.h{background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:28px 32px}
.h h1{color:#fff;margin:0;font-size:20px;font-weight:700}.h p{color:rgba(255,255,255,.85);margin:4px 0 0;font-size:13px}
.b{padding:28px 32px}.f{margin-bottom:18px}
.l{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-bottom:3px}
.v{font-size:15px;color:#111827;font-weight:500}
.msg{background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap}
hr{border:none;border-top:1px solid #e5e7eb;margin:20px 0}
.ft{padding:16px 32px;background:#f9fafb;text-align:center;font-size:12px;color:#9ca3af}
</style></head><body>
<div class="w"><div class="h"><h1>New Contact Form Message</h1><p>Received ${new Date().toUTCString()}</p></div>
<div class="b">
<div class="f"><div class="l">Name</div><div class="v">${d.firstName} ${d.lastName}</div></div>
<div class="f"><div class="l">Email</div><div class="v">${d.email}</div></div>
<hr/>
<div class="f"><div class="l">Subject</div><div class="v">${d.subject}</div></div>
<div class="f"><div class="l">Message</div><div class="msg">${d.message}</div></div>
</div><div class="ft">CertifyGRC · certifygrc.com</div></div></body></html>`;
}

function contactConfirmHtml(d: Record<string, unknown>): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0}
.w{max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.h{background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:32px;text-align:center}
.h h1{color:#fff;margin:0;font-size:22px;font-weight:700}.h p{color:rgba(255,255,255,.9);margin:6px 0 0;font-size:14px}
.b{padding:32px}.b p{color:#374151;font-size:15px;line-height:1.7;margin:0 0 14px}
.sbadge{background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:11px 15px;font-size:14px;color:#0369a1;font-weight:600;margin:14px 0}
.cta{display:inline-block;background:linear-gradient(135deg,#4f46e5,#06b6d4);color:#fff;text-decoration:none;border-radius:8px;padding:11px 26px;font-size:15px;font-weight:600;margin-top:6px}
.ft{padding:16px 32px;background:#f9fafb;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
</style></head><body>
<div class="w"><div class="h"><h1>We Received Your Message</h1><p>Thank you, ${d.firstName}!</p></div>
<div class="b">
<p>Hi ${d.firstName},</p>
<p>Thank you for contacting <strong>CertifyGRC</strong>. We have received your message and will respond within <strong>24 hours</strong> on business days.</p>
<div class="sbadge">💬 &nbsp;Re: ${d.subject}</div>
<p>If it's urgent you can reach us at <a href="mailto:info@certifygrc.com" style="color:#4f46e5">info@certifygrc.com</a>.</p>
<a href="https://certifygrc.com" class="cta">Visit CertifyGRC</a>
</div><div class="ft">© ${new Date().getFullYear()} CertifyGRC · certifygrc.com</div></div></body></html>`;
}

// ─── Vite config ─────────────────────────────────────────────────────────────

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),

      // Dev-only API middleware — mirrors Vercel functions for local development
      mode === "development" && {
        name: "dev-api-routes",
        configureServer(server) {
          server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
            if (!req.url?.startsWith("/api/")) return next();

            // Always respond with JSON
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");

            if (req.method === "OPTIONS") {
              res.statusCode = 200;
              res.end("{}");
              return;
            }

            if (req.method !== "POST") {
              return jsonResponse(res, 405, { success: false, error: "Method not allowed" });
            }

            let body: Record<string, unknown>;
            try {
              const raw = await readBody(req);
              body = JSON.parse(raw);
            } catch {
              return jsonResponse(res, 400, { success: false, error: "Invalid JSON body" });
            }

            const transporter = makeTransport(env);
            const FROM = env.CONTACT_EMAIL_FROM;
            const TO = env.CONTACT_EMAIL_TO;

            try {
              if (req.url === "/api/send-consultation") {
                // Validate
                const required = ["firstName", "lastName", "workEmail", "companyName", "industry", "country"];
                for (const f of required) {
                  if (!body[f] || String(body[f]).trim() === "") {
                    return jsonResponse(res, 400, { success: false, error: `Missing required field: ${f}` });
                  }
                }
                if (!Array.isArray(body.interests) || (body.interests as string[]).length === 0) {
                  return jsonResponse(res, 400, { success: false, error: "Select at least one area of interest" });
                }
                const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRx.test(body.workEmail as string)) {
                  return jsonResponse(res, 400, { success: false, error: "Invalid email address" });
                }

                await transporter.sendMail({
                  from: `"CertifyGRC" <${FROM}>`,
                  to: TO,
                  subject: `[Consultation] ${body.firstName} ${body.lastName} — ${body.companyName}`,
                  html: consultationInternalHtml(body),
                });
                await transporter.sendMail({
                  from: `"CertifyGRC" <${FROM}>`,
                  to: body.workEmail as string,
                  subject: "We received your consultation request — CertifyGRC",
                  html: consultationConfirmHtml(body),
                });

                return jsonResponse(res, 200, { success: true, message: "Request submitted successfully" });
              }

              if (req.url === "/api/send-contact") {
                // Validate
                const required = ["firstName", "lastName", "email", "subject", "message"];
                for (const f of required) {
                  if (!body[f] || String(body[f]).trim() === "") {
                    return jsonResponse(res, 400, { success: false, error: `Missing required field: ${f}` });
                  }
                }
                const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRx.test(body.email as string)) {
                  return jsonResponse(res, 400, { success: false, error: "Invalid email address" });
                }

                await transporter.sendMail({
                  from: `"CertifyGRC" <${FROM}>`,
                  to: TO,
                  subject: `[Contact] ${body.subject} — ${body.firstName} ${body.lastName}`,
                  html: contactInternalHtml(body),
                });
                await transporter.sendMail({
                  from: `"CertifyGRC" <${FROM}>`,
                  to: body.email as string,
                  subject: "We received your message — CertifyGRC",
                  html: contactConfirmHtml(body),
                });

                return jsonResponse(res, 200, { success: true, message: "Message sent successfully" });
              }

              return jsonResponse(res, 404, { success: false, error: "API endpoint not found" });

            } catch (err) {
              const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
              const isTimeout = code === "ESOCKET" || code === "ETIMEDOUT" || code === "ECONNREFUSED";
              console.error("[dev-api] Email error:", err);
              if (isTimeout) {
                console.error(
                  "[dev-api] SMTP connection failed. Check .env: SMTP_HOST, SMTP_PORT (587 or 465), firewall/VPN, and that the mail server allows connections from your network.",
                );
              }
              return jsonResponse(res, 500, {
                success: false,
                error: "Failed to send email. Please check SMTP settings or try again.",
              });
            }
          });
        },
      },
    ].filter(Boolean),

    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});

import type { IncomingMessage, ServerResponse } from "http";
import type { Connect } from "vite";
import { jsonBadRequest, mailNotConfiguredPayload, mailTransportFailurePayload } from "./mailApiResponse.js";
import { getMissingOutboundMailKeys, shouldSkipMailSend } from "./mailConfig.js";
import { sanitizeEnvValue } from "./mailTransport.js";
import { sendMailUnified } from "./sendMailUnified.js";
import { sendPartnerSubmissionEmails } from "./partnerMailDispatch.js";
import { sendWaitlistEmails } from "./waitlistMailDispatch.js";
import { partnerFormSchema } from "../src/lib/partnerFormSchema.js";
import { waitlistFormSchema } from "../src/lib/waitlistFormSchema.js";
import { enforceNodeFormApiGuards, jsonResponseWithHeaders } from "./nodeFormApiGuards.js";
import { markDedupe, peekDedupe } from "./inMemoryRateLimit.js";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk.toString();
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function apiPathname(url: string | undefined): string {
  if (!url) return "";
  return url.split("?")[0] ?? "";
}

function routeForApiPath(path: string): "send-waitlist" | "send-contact" | "send-consultation" | "send-partner" | null {
  if (path === "/api/send-waitlist") return "send-waitlist";
  if (path === "/api/send-contact") return "send-contact";
  if (path === "/api/send-consultation") return "send-consultation";
  if (path === "/api/send-partner") return "send-partner";
  return null;
}

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
  const preview =
    interests.slice(0, 2).join(", ") + (interests.length > 2 ? ` +${interests.length - 2} more` : "");
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

/**
 * Dev + `vite preview` middleware — serves `/api/send-*` locally so forms work without Cloudflare or a separate origin proxy.
 */
export function createViteFormApiMiddleware(env: Record<string, string>): Connect.NextHandleFunction {
  const procEnv = env as unknown as NodeJS.ProcessEnv;

  return async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    if (!req.url?.startsWith("/api/")) return next();

    const path = apiPathname(req.url);
    const route = routeForApiPath(path);
    if (!route) return next();

    if (enforceNodeFormApiGuards(req, res, procEnv, route)) return;

    let body: Record<string, unknown>;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return jsonResponseWithHeaders(res, 400, jsonBadRequest("Invalid JSON body"));
    }

    if (shouldSkipMailSend(env) && path === "/api/send-waitlist") {
      const parsed = waitlistFormSchema.safeParse(body);
      if (!parsed.success) {
        const msg = parsed.error.issues[0]?.message ?? "Invalid request";
        return jsonResponseWithHeaders(res, 400, jsonBadRequest(msg));
      }
      console.info("[vite-api] MAIL_SKIP_SEND=true — send-waitlist skipped (no email)");
      return jsonResponseWithHeaders(res, 200, {
        success: true,
        message: "You're on the list. Check your inbox for a confirmation email.",
      });
    }

    const missing = getMissingOutboundMailKeys(env);
    if (missing.length > 0) {
      console.error("[vite-api] Missing mail configuration:", missing.join(", "));
      return jsonResponseWithHeaders(res, 503, mailNotConfiguredPayload());
    }

    const FROM = sanitizeEnvValue(env.CONTACT_EMAIL_FROM) ?? "";
    const TO = sanitizeEnvValue(env.CONTACT_EMAIL_TO) ?? "";

    try {
      if (path === "/api/send-consultation") {
        const required = ["firstName", "lastName", "workEmail", "companyName", "industry", "country"];
        for (const f of required) {
          if (!body[f] || String(body[f]).trim() === "") {
            return jsonResponseWithHeaders(res, 400, jsonBadRequest(`Missing required field: ${f}`));
          }
        }
        if (!Array.isArray(body.interests) || (body.interests as string[]).length === 0) {
          return jsonResponseWithHeaders(res, 400, jsonBadRequest("Select at least one area of interest"));
        }
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(body.workEmail as string)) {
          return jsonResponseWithHeaders(res, 400, jsonBadRequest("Invalid email address"));
        }

        await sendMailUnified(env, "vite send-consultation internal", {
          from: `"CertifyGRC" <${FROM}>`,
          to: TO,
          subject: `[Consultation] ${body.firstName} ${body.lastName} — ${body.companyName}`,
          html: consultationInternalHtml(body),
        });
        await sendMailUnified(env, "vite send-consultation confirmation", {
          from: `"CertifyGRC" <${FROM}>`,
          to: body.workEmail as string,
          subject: "We received your consultation request — CertifyGRC",
          html: consultationConfirmHtml(body),
        });

        return jsonResponseWithHeaders(res, 200, { success: true, message: "Request submitted successfully" });
      }

      if (path === "/api/send-contact") {
        const required = ["firstName", "lastName", "email", "subject", "message"];
        for (const f of required) {
          if (!body[f] || String(body[f]).trim() === "") {
            return jsonResponseWithHeaders(res, 400, jsonBadRequest(`Missing required field: ${f}`));
          }
        }
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(body.email as string)) {
          return jsonResponseWithHeaders(res, 400, jsonBadRequest("Invalid email address"));
        }

        await sendMailUnified(env, "vite send-contact internal", {
          from: `"CertifyGRC" <${FROM}>`,
          to: TO,
          subject: `[Contact] ${body.subject} — ${body.firstName} ${body.lastName}`,
          html: contactInternalHtml(body),
        });
        await sendMailUnified(env, "vite send-contact confirmation", {
          from: `"CertifyGRC" <${FROM}>`,
          to: body.email as string,
          subject: "We received your message — CertifyGRC",
          html: contactConfirmHtml(body),
        });

        return jsonResponseWithHeaders(res, 200, { success: true, message: "Message sent successfully" });
      }

      if (path === "/api/send-partner") {
        const parsed = partnerFormSchema.safeParse(body);
        if (!parsed.success) {
          const msg = parsed.error.issues[0]?.message ?? "Invalid request";
          return jsonResponseWithHeaders(res, 400, jsonBadRequest(msg));
        }
        const d = parsed.data;
        const result = await sendPartnerSubmissionEmails(env, FROM, TO, d);
        if (!result.internalOk) {
          console.error("[vite-api] Partner internal email failed:", result.error);
          return jsonResponseWithHeaders(res, 502, mailTransportFailurePayload());
        }
        return jsonResponseWithHeaders(res, 200, {
          success: true,
          message: "Request submitted successfully",
          confirmationSent: result.confirmationSent,
        });
      }

      if (path === "/api/send-waitlist") {
        const parsed = waitlistFormSchema.safeParse(body);
        if (!parsed.success) {
          const msg = parsed.error.issues[0]?.message ?? "Invalid request";
          return jsonResponseWithHeaders(res, 400, jsonBadRequest(msg));
        }
        if (peekDedupe(`waitlist:${parsed.data.email}`, 10 * 60 * 1000)) {
          return jsonResponseWithHeaders(res, 200, {
            success: true,
            message: "You're on the list. Check your inbox for a confirmation email.",
          });
        }
        await sendWaitlistEmails(env, FROM, TO, parsed.data);
        markDedupe(`waitlist:${parsed.data.email}`);
        return jsonResponseWithHeaders(res, 200, {
          success: true,
          message: "You're on the list. Check your inbox for a confirmation email.",
        });
      }

      return jsonResponseWithHeaders(res, 404, jsonBadRequest("API endpoint not found"));
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
      console.error("[vite-api] Email send failed:", code || "unknown", err);
      return jsonResponseWithHeaders(res, 502, mailTransportFailurePayload());
    }
  };
}

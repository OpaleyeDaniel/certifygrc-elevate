import { sanitizeEnvValue, type MailEnv } from "./mailTransport.js";
import type { EmailInlineAttachment } from "./emailInlineAssets.js";

export type ResendHtmlMail = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailInlineAttachment[];
};

/**
 * Sends transactional HTML email via Resend REST API (no SMTP).
 * @see https://resend.com/docs/api-reference/emails/send-email
 */
export async function sendResendHtml(env: MailEnv, mail: ResendHtmlMail): Promise<void> {
  const apiKey = sanitizeEnvValue(env.RESEND_API_KEY as string | undefined);
  if (!apiKey) {
    throw new Error("[mail] RESEND_API_KEY is empty");
  }

  const attachments = mail.attachments?.map((a) => ({
    filename: a.filename,
    content: a.content,
    content_type: a.contentType,
    content_id: a.contentId,
  }));

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: mail.from,
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      ...(attachments?.length ? { attachments } : {}),
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("[resend] send failed", { status: res.status, body: text });
    throw new Error(`[resend] HTTP ${res.status}: ${text.slice(0, 800)}`);
  }
}

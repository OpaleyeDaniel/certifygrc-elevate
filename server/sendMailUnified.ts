import { createMailTransportFromEnv, type MailEnv } from "./mailTransport.js";
import { useResendApi } from "./mailConfig.js";
import { sendResendHtml } from "./resendMail.js";
import { sendMailWithValidation } from "./mailSend.js";
import type { EmailInlineAttachment } from "./emailInlineAssets.js";
import { getDefaultEmailAttachments } from "./emailInlineAssets.js";

export type HtmlMail = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailInlineAttachment[];
};

/**
 * Sends one HTML message via Resend (if RESEND_API_KEY) or SMTP.
 * Attachments default to the inline CertifyGRC logo so images render in Gmail.
 */
export async function sendMailUnified(env: MailEnv, context: string, mail: HtmlMail): Promise<void> {
  const attachments = mail.attachments ?? getDefaultEmailAttachments();

  if (useResendApi(env)) {
    await sendResendHtml(env, { ...mail, attachments });
    return;
  }
  const transporter = createMailTransportFromEnv(env);
  await sendMailWithValidation(
    transporter,
    {
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      replyTo: mail.replyTo,
      attachments: attachments.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content, "base64"),
        contentType: a.contentType,
        cid: a.contentId,
      })),
    },
    context,
  );
}

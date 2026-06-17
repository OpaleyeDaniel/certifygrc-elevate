import { createMailTransportFromEnv, type MailEnv } from "./mailTransport.js";
import { useResendApi } from "./mailConfig.js";
import { sendResendHtml } from "./resendMail.js";
import { sendMailWithValidation } from "./mailSend.js";

type HtmlMail = { from: string; to: string; subject: string; html: string };

/**
 * Sends one HTML message via Resend (if RESEND_API_KEY) or SMTP.
 */
export async function sendMailUnified(env: MailEnv, context: string, mail: HtmlMail): Promise<void> {
  if (useResendApi(env)) {
    await sendResendHtml(env, mail);
    return;
  }
  const transporter = createMailTransportFromEnv(env);
  await sendMailWithValidation(transporter, mail, context);
}

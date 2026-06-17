import type { Transporter } from "nodemailer";

type MailOptions = Parameters<Transporter["sendMail"]>[0];

/**
 * Validates common fields and sends mail. Throws nodemailer errors on failure.
 */
export async function sendMailWithValidation(transporter: Transporter, options: MailOptions, context: string) {
  const from = typeof options.from === "string" ? options.from : (options.from as { address?: string })?.address;
  if (!from?.trim()) {
    console.error(`[mail] ${context}: missing "from"`);
    throw new Error(`[mail] ${context}: missing from`);
  }

  const to = options.to;
  const toStr = Array.isArray(to) ? to.join(",") : String(to ?? "");
  if (!toStr.trim()) {
    console.error(`[mail] ${context}: missing "to"`);
    throw new Error(`[mail] ${context}: missing to`);
  }

  return transporter.sendMail(options);
}

import type { MailEnv } from "./mailTransport.js";
import { buildWaitlistConfirmationHtml, buildWaitlistInternalHtml } from "./waitlistEmailHtml.js";
import { getPublicSiteOrigin } from "./waitlistSiteUrl.js";
import { sendMailUnified } from "./sendMailUnified.js";
import type { WaitlistFormInput } from "../src/lib/waitlistFormSchema.js";

export function pageLabelForSource(source: WaitlistFormInput["source"]): string {
  return source === "landing" ? "Landing Page" : "Application Page";
}

export async function sendWaitlistEmails(
  env: MailEnv,
  from: string,
  toInternal: string,
  data: WaitlistFormInput,
): Promise<void> {
  const submittedAtUtc = new Date().toISOString();
  const pageLabel = pageLabelForSource(data.source);
  const origin = getPublicSiteOrigin(env);
  const accessFormUrl = `${origin}/early-access`;

  await sendMailUnified(
    env,
    "waitlist internal",
    {
      from: `"CertifyGRC Website" <${from}>`,
      to: toInternal,
      subject: `[Waitlist] ${data.fullName} — ${pageLabel}`,
      html: buildWaitlistInternalHtml({
        fullName: data.fullName,
        email: data.email,
        pageLabel,
        submittedAtUtc,
      }),
    },
  );

  await sendMailUnified(
    env,
    "waitlist confirmation",
    {
      from: `"CertifyGRC" <${from}>`,
      to: data.email,
      subject: "You're on the list - CertifyGRC",
      html: buildWaitlistConfirmationHtml({
        fullName: data.fullName,
        accessFormUrl,
      }),
    },
  );
}

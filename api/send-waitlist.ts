import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMissingOutboundMailKeys, resolveInternalTo, resolveMailFrom, shouldSkipMailSend, useResendApi } from "../server/mailConfig.js";
import {
  jsonBadRequest,
  respondMailNotConfigured,
  respondMailTransportFailure,
  respondUnexpectedError,
} from "../server/mailApiResponse.js";
import { sendWaitlistEmails } from "../server/waitlistMailDispatch.js";
import { waitlistFormSchema } from "../src/lib/waitlistFormSchema.js";
import { getJsonBody } from "../server/vercelRequestBody.js";
import { enforcePublicFormApiGuards } from "../server/formApiGuards.js";
import { markDedupe, peekDedupe } from "../server/inMemoryRateLimit.js";

export const config = { maxDuration: 60 };

const DEDUPE_MS = 10 * 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (enforcePublicFormApiGuards(req, res, process.env, "send-waitlist")) {
      return;
    }

    const parsed = waitlistFormSchema.safeParse(getJsonBody(req));
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid request";
      return res.status(400).json(jsonBadRequest(msg));
    }
    const data = parsed.data;

    if (shouldSkipMailSend(process.env)) {
      console.info("[send-waitlist] MAIL_SKIP_SEND=true — skipping outbound email (development only)");
      return res.status(200).json({
        success: true,
        message: "You're on the list. Check your inbox for a confirmation email.",
      });
    }

    if (peekDedupe(`waitlist:${data.email}`, DEDUPE_MS)) {
      console.info("[send-waitlist] duplicate submission suppressed");
      return res.status(200).json({
        success: true,
        message: "You're on the list. Check your inbox for a confirmation email.",
      });
    }

    const missing = getMissingOutboundMailKeys(process.env);
    if (missing.length > 0) {
      return respondMailNotConfigured(res, "send-waitlist", missing);
    }

    try {
      const from = resolveMailFrom(process.env);
      const to = resolveInternalTo(process.env);

      await sendWaitlistEmails(process.env, from, to, data);
      markDedupe(`waitlist:${data.email}`);

      console.info("[send-waitlist] delivered", { channel: useResendApi(process.env) ? "resend" : "smtp" });

      return res.status(200).json({
        success: true,
        message: "You're on the list. Check your inbox for a confirmation email.",
      });
    } catch (err) {
      return respondMailTransportFailure(res, "send-waitlist", err);
    }
  } catch (err) {
    return respondUnexpectedError(res, "send-waitlist", err);
  }
}

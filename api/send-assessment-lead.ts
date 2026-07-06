import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMissingOutboundMailKeys, shouldSkipMailSend, useResendApi } from "../server/mailConfig.js";
import {
  jsonBadRequest,
  respondMailNotConfigured,
  respondMailTransportFailure,
  respondUnexpectedError,
} from "../server/mailApiResponse.js";
import { sanitizeEnvValue } from "../server/mailTransport.js";
import { sendAssessmentLeadEmails } from "../server/assessmentMailDispatch.js";
import { assessmentLeadSchema } from "../src/lib/assessmentLeadSchema.js";
import { getJsonBody } from "../server/vercelRequestBody.js";
import { enforcePublicFormApiGuards } from "../server/formApiGuards.js";
import { markDedupe, peekDedupe } from "../server/inMemoryRateLimit.js";

export const config = { maxDuration: 60 };

const DEDUPE_MS = 5 * 60 * 1000;

const UNLOCK_MESSAGE = "Your full report is on its way to your inbox.";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (enforcePublicFormApiGuards(req, res, process.env, "send-assessment-lead")) {
      return;
    }

    const parsed = assessmentLeadSchema.safeParse(getJsonBody(req));
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid request";
      return res.status(400).json(jsonBadRequest(msg));
    }
    const data = parsed.data;

    if (shouldSkipMailSend(process.env)) {
      console.info("[send-assessment-lead] MAIL_SKIP_SEND=true — skipping outbound email (development only)");
      return res.status(200).json({ success: true, message: UNLOCK_MESSAGE });
    }

    // Dedupe on email — someone retaking the quiz within a few minutes shouldn't
    // trigger a fresh internal notification + confirmation email each time.
    if (peekDedupe(`assessment-lead:${data.email}`, DEDUPE_MS)) {
      console.info("[send-assessment-lead] duplicate submission suppressed");
      return res.status(200).json({ success: true, message: UNLOCK_MESSAGE });
    }

    const missing = getMissingOutboundMailKeys(process.env);
    if (missing.length > 0) {
      return respondMailNotConfigured(res, "send-assessment-lead", missing);
    }

    try {
      const from = sanitizeEnvValue(process.env.CONTACT_EMAIL_FROM) ?? "";
      const to = sanitizeEnvValue(process.env.CONTACT_EMAIL_TO) ?? "";

      await sendAssessmentLeadEmails(process.env, from, to, data);
      markDedupe(`assessment-lead:${data.email}`);

      console.info("[send-assessment-lead] delivered", {
        channel: useResendApi(process.env) ? "resend" : "smtp",
        postureProfile: data.results.postureProfile,
      });

      return res.status(200).json({ success: true, message: UNLOCK_MESSAGE });
    } catch (err) {
      return respondMailTransportFailure(res, "send-assessment-lead", err);
    }
  } catch (err) {
    return respondUnexpectedError(res, "send-assessment-lead", err);
  }
}

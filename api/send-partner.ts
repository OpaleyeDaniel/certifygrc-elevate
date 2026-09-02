import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMissingOutboundMailKeys, resolveInternalTo, resolveMailFrom } from "../server/mailConfig.js";
import {
  jsonBadRequest,
  respondMailNotConfigured,
  respondMailTransportFailure,
  respondUnexpectedError,
} from "../server/mailApiResponse.js";
import { enforcePublicFormApiGuards } from "../server/formApiGuards.js";
import { sendPartnerSubmissionEmails } from "../server/partnerMailDispatch.js";
import { partnerFormSchema } from "../src/lib/partnerFormSchema.js";
import { getJsonBody } from "../server/vercelRequestBody.js";

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (enforcePublicFormApiGuards(req, res, process.env, "send-partner")) {
      return;
    }

    const missing = getMissingOutboundMailKeys(process.env);
    if (missing.length > 0) {
      return respondMailNotConfigured(res, "send-partner", missing);
    }

    const parsed = partnerFormSchema.safeParse(getJsonBody(req));
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid request";
      return res.status(400).json(jsonBadRequest(msg));
    }

    const data = parsed.data;

    try {
      const from = resolveMailFrom(process.env);
      const to = resolveInternalTo(process.env);

      const result = await sendPartnerSubmissionEmails(process.env, from, to, data);
      if (!result.internalOk) {
        const err = "error" in result ? result.error : new Error("Mail dispatch failed");
        return respondMailTransportFailure(res, "send-partner", err);
      }

      return res.status(200).json({
        success: true,
        message: "Request submitted successfully",
        confirmationSent: result.confirmationSent,
      });
    } catch (err) {
      return respondMailTransportFailure(res, "send-partner", err);
    }
  } catch (err) {
    return respondUnexpectedError(res, "send-partner", err);
  }
}

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/** Content-ID referenced in HTML as cid:certifygrc-logo */
export const EMAIL_LOGO_CID = "certifygrc-logo";
export const EMAIL_LOGO_SRC = `cid:${EMAIL_LOGO_CID}`;

export const EMAIL_MARK_CID = "certifygrc-mark";
export const EMAIL_MARK_SRC = `cid:${EMAIL_MARK_CID}`;

export interface EmailInlineAttachment {
  filename: string;
  content: string;
  contentType: string;
  contentId: string;
}

function readAsset(filename: string): Buffer {
  const path = join(dirname(fileURLToPath(import.meta.url)), "assets", filename);
  return readFileSync(path);
}

/** Inline logo attachment — renders in Gmail/Outlook (hosted URLs and data: URIs are often blocked). */
export function getEmailLogoAttachment(): EmailInlineAttachment {
  return {
    filename: "certifygrc-logo-email.png",
    content: readAsset("certifygrc-logo-email.png").toString("base64"),
    contentType: "image/png",
    contentId: EMAIL_LOGO_CID,
  };
}

export function getEmailMarkAttachment(): EmailInlineAttachment {
  return {
    filename: "certifygrc-mark.png",
    content: readAsset("certifygrc-mark.png").toString("base64"),
    contentType: "image/png",
    contentId: EMAIL_MARK_CID,
  };
}

/** Default brand attachments for transactional HTML mail. */
export function getDefaultEmailAttachments(): EmailInlineAttachment[] {
  return [getEmailLogoAttachment()];
}

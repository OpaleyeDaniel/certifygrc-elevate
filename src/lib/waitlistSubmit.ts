import { formSubmitUserMessage, resolveFormApiUrl } from "@/lib/formSubmitApi";
import type { WaitlistRequestBody } from "@/lib/waitlistFormSchema";

function isApiSuccessPayload(json: Record<string, unknown> | null): boolean {
  if (!json) return false;
  const s = json.success;
  if (s === true) return true;
  if (s === "true") return true;
  return false;
}

const SUBMIT_TIMEOUT_MS = 35_000;

function isLikelyNetworkFailure(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const name = "name" in err && typeof (err as { name?: unknown }).name === "string" ? (err as { name: string }).name : "";
  return name === "AbortError" || name === "TypeError";
}

async function fetchWaitlistOnce(
  data: WaitlistRequestBody,
  signal: AbortSignal,
): Promise<{ res: Response; rawText: string; json: Record<string, unknown> | null }> {
  const url = resolveFormApiUrl("/api/send-waitlist");
  const crossOrigin = /^https?:\/\//i.test(url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "CertifyGRC",
    },
    credentials: crossOrigin ? "omit" : "same-origin",
    body: JSON.stringify(data),
    signal,
  });

  let json: Record<string, unknown> | null = null;
  let rawText = "";
  try {
    rawText = await res.text();
    if (rawText) json = JSON.parse(rawText) as Record<string, unknown>;
  } catch {
    /* non-JSON */
  }

  return { res, rawText, json };
}

/** Shared POST /api/send-waitlist — used by section + popup so behavior stays identical. */
export async function submitWaitlistRequest(
  data: WaitlistRequestBody,
): Promise<{ ok: true; message?: string } | { ok: false; error: string }> {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), SUBMIT_TIMEOUT_MS);

  let last: { res: Response; rawText: string; json: Record<string, unknown> | null } | null = null;

  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        last = await fetchWaitlistOnce(data, ctrl.signal);
        break;
      } catch (err) {
        const isLast = attempt === 1;
        if (isLast || !isLikelyNetworkFailure(err)) {
          console.warn("[waitlist-submit] fetch failed", err);
          return {
            ok: false,
            error:
              err && typeof err === "object" && (err as { name?: string }).name === "AbortError"
                ? "That took too long. Check your connection and try again."
                : "Network error. Check your connection, or try again in a moment.",
          };
        }
        await new Promise((r) => setTimeout(r, 450));
      }
    }
  } finally {
    window.clearTimeout(t);
  }

  if (!last) {
    return { ok: false, error: "Network error. Check your connection, or try again in a moment." };
  }

  const { res, rawText, json } = last;

  if (import.meta.env.DEV && (!res.ok || !isApiSuccessPayload(json))) {
    console.debug("[waitlist-submit]", {
      url: resolveFormApiUrl("/api/send-waitlist"),
      status: res.status,
      ok: res.ok,
      contentType: res.headers.get("content-type"),
      bodyPreview: rawText.slice(0, 500),
    });
  }

  if (!json || !isApiSuccessPayload(json)) {
    return { ok: false, error: formSubmitUserMessage(res, json) };
  }

  if (!res.ok) {
    return { ok: false, error: formSubmitUserMessage(res, json) };
  }

  return {
    ok: true,
    message:
      typeof json.message === "string" && json.message.trim()
        ? json.message
        : "You're on the list. Check your inbox for confirmation.",
  };
}

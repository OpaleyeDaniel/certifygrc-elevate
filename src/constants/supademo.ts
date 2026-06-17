/**
 * Default Supademo demo for the home hero (inline iframe + “open in new tab”).
 * Override with VITE_SUPADEMO_EMBED_URL / VITE_SUPADEMO_OPEN_URL if needed.
 */
export const SUPADEMO_DEMO_ID = "cmng2dd444qj0u98h4uud0lia" as const;

const UTM = "utm_source=link" as const;

export const SUPADEMO_DEFAULT_OPEN_URL =
  `https://app.supademo.com/demo/${SUPADEMO_DEMO_ID}?${UTM}` as const;

/** Supademo iframe embed path (verified against app.supademo.com) */
export const SUPADEMO_DEFAULT_EMBED_URL =
  `https://app.supademo.com/embed/${SUPADEMO_DEMO_ID}?${UTM}` as const;

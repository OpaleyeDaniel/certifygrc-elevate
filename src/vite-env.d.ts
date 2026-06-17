/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supademo iframe embed URL (paste from Supademo “Embed” / share). */
  readonly VITE_SUPADEMO_EMBED_URL?: string;
  /** Optional full Supademo URL opened in a new tab when embed URL is not set. */
  readonly VITE_SUPADEMO_OPEN_URL?: string;
  /**
   * Optional API origin when the static site and `/api/*` functions are on different hosts.
   * Example: `https://your-deployment.vercel.app` (no trailing slash).
   */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Curated assets copied from certifygrc.com (public/site). Order matches user-provided sequence. */

export function siteFw(n: number) {
  return `/site/fw-${String(Math.min(Math.max(n, 1), 14)).padStart(2, "0")}.png`;
}

export function siteCs(n: number) {
  return `/site/cs-${String(Math.min(Math.max(n, 1), 10)).padStart(2, "0")}.png`;
}

export const SITE_ALLIANCE_JOURNEY = "/site/alliance-partner-journey.png";

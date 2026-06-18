/**
 * CertifyGRC brand color system — extracted from certifygrc-logo.png.
 * Logo blue: #305CDE · hsl(225, 72%, 53%)
 *
 * Use these tokens everywhere instead of ad-hoc hex / Tailwind rainbow classes.
 */

/** Primary brand blue (logo) */
export const BRAND_PRIMARY = "#305CDE" as const;
export const BRAND_PRIMARY_RGB = "48, 92, 222" as const;
export const BRAND_PRIMARY_HSL = "225 72% 53%" as const;

/** Soft indigo — same hue family */
export const BRAND_INDIGO = "#4A6FD4" as const;
export const BRAND_INDIGO_HSL = "225 58% 56%" as const;

/** Light brand blue — secondary accent */
export const BRAND_LIGHT = "#5B7FE8" as const;
export const BRAND_LIGHT_HSL = "225 70% 63%" as const;

/** Pale blue — subtle highlights */
export const BRAND_PALE = "#7BA3EB" as const;
export const BRAND_PALE_HSL = "220 75% 77%" as const;

/** Deep navy — surfaces & backgrounds */
export const BRAND_NAVY = "#0A1628" as const;
export const BRAND_NAVY_HSL = "225 47% 8%" as const;

/** Neutral slate for tertiary UI */
export const BRAND_GRAY = "#64748B" as const;

/** Subtle accent rotation — brand blues only */
export const BRAND_ACCENT_CYCLE = [
  BRAND_PRIMARY,
  BRAND_INDIGO,
  BRAND_LIGHT,
  "#6888E0",
  BRAND_PALE,
  "#3D72E3",
] as const;

export function brandAccentAt(index: number): string {
  return BRAND_ACCENT_CYCLE[index % BRAND_ACCENT_CYCLE.length];
}

/** CSS rgba helper for glows and washes */
export function brandRgb(alpha: number): string {
  return `rgba(${BRAND_PRIMARY_RGB}, ${alpha})`;
}

/** Inline styles for icon containers — restrained brand tint */
export function brandIconContainerStyle(index = 0): {
  background: string;
  color: string;
  borderColor: string;
  boxShadow: string;
} {
  const accent = brandAccentAt(index);
  return {
    background: `${accent}14`,
    color: accent,
    borderColor: `${accent}28`,
    boxShadow: `0 0 0 1px ${accent}20`,
  };
}

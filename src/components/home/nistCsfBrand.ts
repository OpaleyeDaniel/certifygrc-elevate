import { BRAND_INDIGO, BRAND_LIGHT, BRAND_PALE, BRAND_PRIMARY, brandRgb } from "@/lib/brandColors";

/* Brand-aligned NIST CSF function colors — blue family only, varied depth for hierarchy */
export const CSF_BRAND_VARIANTS = [
  { color: BRAND_PRIMARY, lightBg: "from-primary/8 to-primary/4", border: "border-primary/20", glow: brandRgb(0.22) },
  { color: BRAND_INDIGO, lightBg: "from-primary/7 to-accent/4", border: "border-primary/18", glow: "rgba(74,111,212,0.20)" },
  { color: BRAND_LIGHT, lightBg: "from-accent/8 to-primary/4", border: "border-accent/20", glow: "rgba(91,127,232,0.20)" },
  { color: "#6888E0", lightBg: "from-accent/7 to-primary/3", border: "border-accent/18", glow: "rgba(104,136,224,0.18)" },
  { color: "#3D72E3", lightBg: "from-primary/8 to-accent/3", border: "border-primary/20", glow: "rgba(61,114,227,0.20)" },
  { color: BRAND_PALE, lightBg: "from-accent/6 to-primary/4", border: "border-accent/16", glow: "rgba(123,163,235,0.18)" },
] as const;

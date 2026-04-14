/**
 * Paths for images you place under `public/site-assets/` (see public/site-assets/README.md).
 * If a file is missing, use <SiteImage /> which falls back to bundled public artwork.
 */

const FW = (n: number) => `/site-assets/frameworks/fw-${String(n).padStart(2, "0")}.png`;
const CS = (n: number) => `/site-assets/consulting/cs-${String(n).padStart(2, "0")}.png`;

export const FRAMEWORK_FALLBACK = "/hero-dashboard-frameworks.png";
export const CONSULTING_FALLBACK = "/hero-dashboard-consulting.png";

/** Order matches: first 14 captures from certifygrc.com/frameworks/ */
export const frameworkPageVisuals = [
  { src: FW(1), alt: "Compliance frameworks and trust marks", caption: "Framework coverage" },
  { src: FW(2), alt: "GRC platform dashboard overview", caption: "Unified compliance view" },
  { src: FW(3), alt: "ISO 27001 framework workspace", caption: "ISO / IEC 27001" },
  { src: FW(4), alt: "PCI DSS compliance workspace", caption: "PCI DSS" },
  { src: FW(5), alt: "SOC 2 trust services criteria", caption: "SOC 2" },
  { src: FW(6), alt: "Security and privacy controls", caption: "Security & privacy" },
  { src: FW(7), alt: "Operational resilience and continuity", caption: "Resilience" },
  { src: FW(8), alt: "Regulatory and audit tracking", caption: "Audit readiness" },
  { src: FW(9), alt: "Data protection and privacy programs", caption: "Data privacy" },
  { src: FW(10), alt: "AI governance and risk", caption: "AI governance" },
  { src: FW(11), alt: "Digital transformation and architecture", caption: "Transformation" },
  { src: FW(12), alt: "Agile delivery and program governance", caption: "Agile programs" },
  { src: FW(13), alt: "AICPA SOC for service organizations", caption: "SOC attestation" },
  { src: FW(14), alt: "OSFI supervisory alignment", caption: "OSFI" },
];

/** Order matches: consulting-services imagery sequence */
export const consultingPageVisuals = [
  { src: CS(1), alt: "Digital transformation consulting", caption: "Digital transformation" },
  { src: CS(2), alt: "Agile project and program delivery", caption: "Agile delivery" },
  { src: CS(3), alt: "Cybersecurity and information protection", caption: "Cybersecurity" },
  { src: CS(4), alt: "Business continuity and resilience", caption: "Business continuity" },
  { src: CS(5), alt: "Payment card and PCI DSS security", caption: "Payment security" },
  { src: CS(6), alt: "Data privacy and protection", caption: "Privacy" },
  { src: CS(7), alt: "AI governance and responsible AI", caption: "AI governance" },
  { src: CS(8), alt: "Corporate governance and GRC", caption: "Governance" },
  { src: CS(9), alt: "Partner ecosystem and certification", caption: "Alliance" },
  { src: CS(10), alt: "OSFI and financial institution compliance", caption: "OSFI" },
];

export const partnerAssets = {
  allianceHero: "/site-assets/partner/partner-alliance.png",
  processGraphic: "/site-assets/partner/partner-process.png",
  fallbackAlliance: "/hero-dashboard-partner.png",
  fallbackProcess: "/hero-background-partner.png",
};

export const optionalBadges = {
  aicpaSoc: "/site-assets/badges/badge-aicpa-soc.png",
  osfi: "/site-assets/badges/badge-osfi.png",
};

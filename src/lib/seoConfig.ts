/**
 * SEO & Open Graph global configuration for CertifyGRC.
 */

export const SITE_NAME = "CertifyGRC";
export const SITE_URL = "https://certifygrc.com";
export const SITE_TAGLINE = "Smarter Governance, Safer Decisions";
export const DEFAULT_OG_IMAGE = "https://certifygrc.com/application-hero-dashboard.png";
export const TWITTER_HANDLE = "@CertifyGRC";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/certifygrc",
  twitter: "https://x.com/certifygrc",
  github: "https://github.com/certifygrc",
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

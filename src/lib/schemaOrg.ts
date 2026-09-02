/**
 * Structured Data (Schema.org JSON-LD) generators for CertifyGRC.
 */
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  SOCIAL_LINKS,
  type BreadcrumbItem,
  type FAQItem,
} from "./seoConfig";

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/certifygrc-logo.png`,
    image: DEFAULT_OG_IMAGE,
    description:
      "CertifyGRC delivers intelligent GRC software, expert advisory, and cyber awareness training to simplify compliance and accelerate audit readiness.",
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter, SOCIAL_LINKS.github].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@certifygrc.com",
      url: `${SITE_URL}/contact`,
    },
  };
}

export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CertifyGRC Compliance & Risk Platform",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web-based, Cloud SaaS",
    description:
      "All-in-one Governance, Risk, and Compliance platform with NIST CSF 2.0, ISO 27001, and SOC 2 mapping, continuous control monitoring, and gap remediation.",
    url: `${SITE_URL}/software`,
    screenshot: DEFAULT_OG_IMAGE,
    isSimilarTo: [
      {
        "@type": "SoftwareApplication",
        name: "Vanta",
        applicationCategory: "SecurityApplication",
      },
      {
        "@type": "SoftwareApplication",
        name: "Drata",
        applicationCategory: "SecurityApplication",
      },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free NIST CSF 2.0 Security Posture Assessment",
      url: `${SITE_URL}/free-assessment`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function createCompetitorComparisonSchema(opts: {
  name: string;
  description: string;
  url: string;
  comparedTo: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "CertifyGRC Compliance & Risk Platform",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Web-based, Cloud SaaS",
      url: `${SITE_URL}/software`,
      isSimilarTo: opts.comparedTo.map((c) => ({
        "@type": "SoftwareApplication",
        name: c,
        applicationCategory: "SecurityApplication",
      })),
    },
  };
}

export function createFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function createServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Global",
    url: service.url.startsWith("http") ? service.url : `${SITE_URL}${service.url}`,
  };
}

export function createBlogPostingSchema(post: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorRole?: string;
  authorUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`,
    },
    headline: post.headline,
    description: post.description,
    image: post.image || DEFAULT_OG_IMAGE,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: post.authorName
      ? {
          "@type": "Person",
          name: post.authorName,
          jobTitle: post.authorRole || undefined,
          url: post.authorUrl || undefined,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/certifygrc-logo.png`,
      },
    },
  };
}

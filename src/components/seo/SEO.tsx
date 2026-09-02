import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SITE_NAME,
  SITE_URL,
  SITE_TAGLINE,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
} from "@/lib/seoConfig";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function updateOrCreateMeta(
  attrName: "name" | "property",
  attrValue: string,
  content: string | undefined,
) {
  if (typeof document === "undefined") return;
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`,
  );

  if (!content) {
    if (element) element.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateCanonical(url: string) {
  if (typeof document === "undefined") return;
  let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function updateJsonLd(jsonLd: Record<string, unknown> | Array<Record<string, unknown>> | undefined) {
  if (typeof document === "undefined") return;
  const scriptId = "certifygrc-dynamic-jsonld";
  const existing = document.getElementById(scriptId);

  if (!jsonLd) {
    if (existing) existing.remove();
    return;
  }

  const script = (existing as HTMLScriptElement) || document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
  if (!existing) {
    document.head.appendChild(script);
  }
}

/**
 * Robust, framework-agnostic head and meta manager for React 18 SPA.
 * Manages title, description, canonical link, Open Graph, Twitter Cards, and Schema.org JSON-LD.
 */
export default function SEO({
  title,
  description = "CertifyGRC delivers practical GRC solutions — software, consulting, and training — to simplify compliance, manage risk, and drive governance excellence.",
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title
      ? title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | ${SITE_TAGLINE}`;

    document.title = fullTitle;

    // Canonical calculation
    const resolvedCanonical =
      canonical || `${SITE_URL}${location.pathname === "/" ? "" : location.pathname}`;
    updateCanonical(resolvedCanonical);

    // Primary meta tags
    updateOrCreateMeta("name", "description", description);
    updateOrCreateMeta(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    // Open Graph
    updateOrCreateMeta("property", "og:site_name", SITE_NAME);
    updateOrCreateMeta("property", "og:title", fullTitle);
    updateOrCreateMeta("property", "og:description", description);
    updateOrCreateMeta("property", "og:type", ogType);
    updateOrCreateMeta("property", "og:url", resolvedCanonical);
    updateOrCreateMeta("property", "og:image", ogImage);

    // Article-specific Open Graph
    if (ogType === "article") {
      if (publishedTime) updateOrCreateMeta("property", "article:published_time", publishedTime);
      if (modifiedTime) updateOrCreateMeta("property", "article:modified_time", modifiedTime);
      if (author) updateOrCreateMeta("property", "article:author", author);
    }

    // Twitter Card
    updateOrCreateMeta("name", "twitter:card", "summary_large_image");
    updateOrCreateMeta("name", "twitter:site", TWITTER_HANDLE);
    updateOrCreateMeta("name", "twitter:creator", TWITTER_HANDLE);
    updateOrCreateMeta("name", "twitter:title", fullTitle);
    updateOrCreateMeta("name", "twitter:description", description);
    updateOrCreateMeta("name", "twitter:image", ogImage);

    // Structured Data (JSON-LD)
    updateJsonLd(jsonLd);

    return () => {
      // Optional cleanup on unmount
    };
  }, [
    title,
    description,
    canonical,
    location.pathname,
    ogType,
    ogImage,
    publishedTime,
    modifiedTime,
    author,
    noIndex,
    jsonLd,
  ]);

  return null;
}

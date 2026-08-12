import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/** ─── Client ─────────────────────────────────── */
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "729gr7n1",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-02-01",
  // Fresh published content shortly after Studio publish (CDN can lag).
  useCdn: false,
  perspective: "published",
});

/** ─── Image URL builder ───────────────────────── */
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** ─── TypeScript types matching our schema ────── */
export interface SanitySlug { current: string }
export interface SanityImageAsset { _type: "image"; asset: { _ref: string; _type: "reference" }; alt?: string; caption?: string }

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: SanitySlug;
  photo?: SanityImageAsset;
  role?: string;
  bio?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
  icon?: string;
}

export interface SanityTag {
  _id: string;
  title: string;
  slug: SanitySlug | string;
}

export interface SanityPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  coverImage?: SanityImageAsset;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  tags?: SanityTag[];
  publishedAt?: string;
  readTime?: number;
  featured?: boolean;
  body?: unknown[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageAsset;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  relatedPosts?: SanityPost[];
}

/** ─── Reusable projection fragments ─────────────── */
const AUTHOR_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  photo,
  linkedIn,
  twitter
`;

const CATEGORY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  color
`;

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  readTime,
  featured,
  "author": author->{${AUTHOR_FIELDS}},
  "categories": categories[]->{${CATEGORY_FIELDS}}
`;

/** ─── GROQ Queries ───────────────────────────── */

/** All published posts, newest first */
export const ALL_POSTS_QUERY = `*[_type == "blogPost" && defined(slug)] | order(publishedAt desc) {
  ${POST_CARD_FIELDS}
}`;

/** Featured post (first one marked featured) */
export const FEATURED_POST_QUERY = `*[_type == "blogPost" && featured == true && defined(slug)] | order(publishedAt desc)[0] {
  ${POST_CARD_FIELDS}
}`;

/** Latest N posts (excluding the featured one) */
export const LATEST_POSTS_QUERY = (limit = 9) => `*[_type == "blogPost" && defined(slug)] | order(publishedAt desc)[0...${limit}] {
  ${POST_CARD_FIELDS}
}`;

/** Single post by slug */
export const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  readTime,
  featured,
  body,
  "author": author->{${AUTHOR_FIELDS}},
  "categories": categories[]->{${CATEGORY_FIELDS}},
  "relatedPosts": relatedPosts[]->{${POST_CARD_FIELDS}},
  seo
}`;

/** Posts by category slug */
export const POSTS_BY_CATEGORY_QUERY = `*[_type == "blogPost" && $slug in categories[]->slug.current && defined(slug)] | order(publishedAt desc) {
  ${POST_CARD_FIELDS}
}`;

/** All categories */
export const ALL_CATEGORIES_QUERY = `*[_type == "blogCategory"] | order(title asc) {
  ${CATEGORY_FIELDS}
}`;

/** All tags */
export const ALL_TAGS_QUERY = `*[_type == "blogTag"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`;

/** Search posts by query string */
export const SEARCH_POSTS_QUERY = `*[_type == "blogPost" && (
  title match $q ||
  excerpt match $q
) && defined(slug)] | order(publishedAt desc) {
  ${POST_CARD_FIELDS}
}`;

/** Related posts (same category, excluding current) */
export const RELATED_POSTS_QUERY = `*[_type == "blogPost" && slug.current != $slug && count((categories[]->slug.current)[@ in $categories]) > 0 && defined(slug)] | order(publishedAt desc)[0...3] {
  ${POST_CARD_FIELDS}
}`;

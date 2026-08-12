import { format, formatDistanceToNow } from "date-fns";
import { urlFor, type SanityAuthor, type SanityPost } from "@/lib/sanity";

/** Resolve slug whether projected as string or object */
export function getPostSlug(post: SanityPost): string {
  if (typeof post.slug === "string") return post.slug;
  return post.slug?.current ?? "";
}

/** Cover image from Sanity asset */
export function getPostCoverUrl(post: SanityPost, width = 800, height = 450): string | null {
  if (post.coverImage?.asset?._ref) {
    return urlFor(post.coverImage).width(width).height(height).auto("format").fit("crop").url();
  }
  return null;
}

/** Author photo from Sanity */
export function getAuthorPhotoUrl(post: SanityPost, size = 80): string | null {
  if (post.author?.photo?.asset?._ref) {
    return urlFor(post.author.photo).width(size).height(size).fit("crop").auto("format").url();
  }
  return null;
}

export function getCategorySlug(cat: { slug: SanityPost["slug"] | string }): string {
  if (typeof cat.slug === "string") return cat.slug;
  return cat.slug?.current ?? "";
}

export function getTagSlug(tag: { slug: SanityPost["slug"] | string }): string {
  if (typeof tag.slug === "string") return tag.slug;
  return tag.slug?.current ?? "";
}

export function getAuthorSlug(author?: SanityAuthor): string {
  if (!author?.slug) return "";
  if (typeof author.slug === "string") return author.slug;
  return author.slug.current ?? "";
}

/** Format a Sanity publishedAt date string */
export function formatPostDate(dateStr?: string): string {
  if (!dateStr) return "";
  return format(new Date(dateStr), "MMMM d, yyyy");
}

/** Relative date like "3 days ago" */
export function relativeDate(dateStr?: string): string {
  if (!dateStr) return "";
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

/** Extract plain-text headings from a Portable Text body for TOC */
export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export function extractToc(body: unknown[]): TocEntry[] {
  if (!body) return [];
  return (body as { _type: string; style?: string; _key: string; children?: { text: string }[] }[])
    .filter((b) => b._type === "block" && ["h2", "h3", "h4"].includes(b.style ?? ""))
    .map((b) => ({
      id: b._key,
      text: (b.children ?? []).map((c) => c.text).join(""),
      level: parseInt(b.style?.replace("h", "") ?? "2", 10),
    }));
}

/** Strip HTML / plain text from portable text excerpt */
export function plainText(body: unknown[]): string {
  if (!body) return "";
  return (body as { _type: string; children?: { text: string }[] }[])
    .filter((b) => b._type === "block")
    .flatMap((b) => (b.children ?? []).map((c) => c.text))
    .join(" ")
    .slice(0, 200);
}

/** Generate a URL-safe heading id from key */
export function headingId(key: string): string {
  return `heading-${key}`;
}

/** Category accent color with fallback */
export function categoryColor(color?: string): string {
  return color ?? "#305CDE";
}

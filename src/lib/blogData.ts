/**
 * Blog data layer — live Sanity CMS only (no seed / demo fallback).
 * Content published in Studio at https://certifygrc.sanity.studio appears on the site.
 */
import {
  sanityClient,
  ALL_POSTS_QUERY,
  FEATURED_POST_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  ALL_TAGS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  SEARCH_POSTS_QUERY,
  RELATED_POSTS_QUERY,
  type SanityPost,
  type SanityCategory,
  type SanityTag,
} from "@/lib/sanity";

async function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch(query, params);
}

export async function fetchAllPosts(): Promise<SanityPost[]> {
  try {
    return (await fetchSanity<SanityPost[]>(ALL_POSTS_QUERY)) ?? [];
  } catch (err) {
    console.error("[blog] fetchAllPosts failed:", err);
    return [];
  }
}

export async function fetchFeaturedPost(): Promise<SanityPost | null> {
  try {
    return (await fetchSanity<SanityPost | null>(FEATURED_POST_QUERY)) ?? null;
  } catch (err) {
    console.error("[blog] fetchFeaturedPost failed:", err);
    return null;
  }
}

export async function fetchFeaturedPosts(limit = 3): Promise<SanityPost[]> {
  try {
    const query = `*[_type == "blogPost" && featured == true && defined(slug)] | order(publishedAt desc)[0...${limit}] {
      _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, readTime, featured,
      "author": author->{ _id, name, "slug": slug.current, role, bio, photo, linkedIn },
      "categories": categories[]->{ _id, title, "slug": slug.current, description, color }
    }`;
    return (await fetchSanity<SanityPost[]>(query)) ?? [];
  } catch (err) {
    console.error("[blog] fetchFeaturedPosts failed:", err);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    return (await fetchSanity<SanityPost | null>(POST_BY_SLUG_QUERY, { slug })) ?? null;
  } catch (err) {
    console.error("[blog] fetchPostBySlug failed:", err);
    return null;
  }
}

export async function fetchAllCategories(): Promise<SanityCategory[]> {
  try {
    return (await fetchSanity<SanityCategory[]>(ALL_CATEGORIES_QUERY)) ?? [];
  } catch (err) {
    console.error("[blog] fetchAllCategories failed:", err);
    return [];
  }
}

export async function fetchAllTags(): Promise<SanityTag[]> {
  try {
    return (await fetchSanity<SanityTag[]>(ALL_TAGS_QUERY)) ?? [];
  } catch (err) {
    console.error("[blog] fetchAllTags failed:", err);
    return [];
  }
}

export async function fetchPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  try {
    return (await fetchSanity<SanityPost[]>(POSTS_BY_CATEGORY_QUERY, { slug: categorySlug })) ?? [];
  } catch (err) {
    console.error("[blog] fetchPostsByCategory failed:", err);
    return [];
  }
}

export async function searchPosts(query: string): Promise<SanityPost[]> {
  const q = query.trim() ? `*${query.trim()}*` : "";
  if (!q) return [];
  try {
    return (await fetchSanity<SanityPost[]>(SEARCH_POSTS_QUERY, { q })) ?? [];
  } catch (err) {
    console.error("[blog] searchPosts failed:", err);
    return [];
  }
}

export async function fetchRelatedPosts(
  currentSlug: string,
  categorySlugList: string[],
): Promise<SanityPost[]> {
  try {
    return (
      (await fetchSanity<SanityPost[]>(RELATED_POSTS_QUERY, {
        slug: currentSlug,
        categories: categorySlugList,
      })) ?? []
    );
  } catch (err) {
    console.error("[blog] fetchRelatedPosts failed:", err);
    return [];
  }
}

export async function fetchAuthorPosts(authorSlug: string, excludeSlug?: string): Promise<SanityPost[]> {
  try {
    const query = `*[_type == "blogPost" && author->slug.current == $authorSlug && slug.current != $excludeSlug && defined(slug)] | order(publishedAt desc)[0...3] {
      _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, readTime, featured,
      "author": author->{ _id, name, "slug": slug.current, role, bio, photo, linkedIn },
      "categories": categories[]->{ _id, title, "slug": slug.current, description, color }
    }`;
    return (await fetchSanity<SanityPost[]>(query, { authorSlug, excludeSlug: excludeSlug ?? "" })) ?? [];
  } catch (err) {
    console.error("[blog] fetchAuthorPosts failed:", err);
    return [];
  }
}

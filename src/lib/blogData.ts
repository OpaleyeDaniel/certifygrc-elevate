/**
 * Blog data layer — Sanity first, seed fallback when CMS is empty or unavailable.
 *
 * Set VITE_BLOG_USE_SEED=true to force seed data during design review.
 * Remove seed fallback in production once Sanity is fully populated.
 */
import {
  sanityClient,
  ALL_POSTS_QUERY,
  FEATURED_POST_QUERY,
  POST_BY_SLUG_QUERY,
  ALL_CATEGORIES_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  SEARCH_POSTS_QUERY,
  RELATED_POSTS_QUERY,
  type SanityPost,
  type SanityCategory,
} from "@/lib/sanity";
import {
  SEED_POSTS,
  SEED_CATEGORIES,
  getSeedFeaturedPost,
  getSeedFeaturedPosts,
  getSeedPostBySlug,
  getSeedPostsByCategory,
  searchSeedPosts,
  getSeedRelatedPosts,
  getSeedPostsByAuthor,
  type SeedPost,
} from "@/lib/blogSeed";

const FORCE_SEED = import.meta.env.VITE_BLOG_USE_SEED === "true";
/** In dev, show full seed catalog when CMS has fewer than 15 posts */
const DEV_SEED_THRESHOLD = 15;

function shouldUseSeed(sanityCount: number): boolean {
  if (FORCE_SEED) return true;
  if (import.meta.env.DEV && sanityCount < DEV_SEED_THRESHOLD) return true;
  return false;
}

async function fetchSanity<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch(query, params);
}

let seedModeCache: boolean | null = null;

/** Determine once per session whether to use seed catalog */
async function isSeedMode(): Promise<boolean> {
  if (FORCE_SEED) return true;
  if (seedModeCache !== null) return seedModeCache;
  try {
    const count = await fetchSanity<number>(`count(*[_type == "blogPost" && defined(slug)])`);
    seedModeCache = shouldUseSeed(count);
  } catch {
    seedModeCache = true;
  }
  return seedModeCache;
}

export async function fetchAllPosts(): Promise<SanityPost[]> {
  if (await isSeedMode()) return SEED_POSTS;
  try {
    const result = await fetchSanity<SanityPost[]>(ALL_POSTS_QUERY);
    if (!result?.length) return SEED_POSTS;
    return result;
  } catch {
    return SEED_POSTS;
  }
}

export async function fetchFeaturedPost(): Promise<SanityPost | null> {
  if (await isSeedMode()) return getSeedFeaturedPost();
  try {
    const result = await fetchSanity<SanityPost | null>(FEATURED_POST_QUERY);
    return result ?? getSeedFeaturedPost();
  } catch {
    return getSeedFeaturedPost();
  }
}

export async function fetchFeaturedPosts(limit = 3): Promise<SanityPost[]> {
  if (await isSeedMode()) return getSeedFeaturedPosts(limit);
  try {
    const query = `*[_type == "blogPost" && featured == true && defined(slug)] | order(publishedAt desc)[0...${limit}] {
      _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, readTime, featured,
      "author": author->{ _id, name, "slug": slug.current, role, bio, photo, linkedIn },
      "categories": categories[]->{ _id, title, "slug": slug.current, description, color }
    }`;
    const result = await fetchSanity<SanityPost[]>(query);
    if (result?.length) return result;
    return getSeedFeaturedPosts(limit);
  } catch {
    return getSeedFeaturedPosts(limit);
  }
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  if (await isSeedMode()) return getSeedPostBySlug(slug);
  try {
    const result = await fetchSanity<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
    return result ?? getSeedPostBySlug(slug);
  } catch {
    return getSeedPostBySlug(slug);
  }
}

export async function fetchAllCategories(): Promise<SanityCategory[]> {
  if (await isSeedMode()) return SEED_CATEGORIES;
  try {
    const result = await fetchSanity<SanityCategory[]>(ALL_CATEGORIES_QUERY);
    if (!result?.length) return SEED_CATEGORIES;
    return result;
  } catch {
    return SEED_CATEGORIES;
  }
}

export async function fetchPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  if (await isSeedMode()) return getSeedPostsByCategory(categorySlug);
  try {
    const result = await fetchSanity<SanityPost[]>(POSTS_BY_CATEGORY_QUERY, { slug: categorySlug });
    if (!result?.length) return getSeedPostsByCategory(categorySlug);
    return result;
  } catch {
    return getSeedPostsByCategory(categorySlug);
  }
}

export async function searchPosts(query: string): Promise<SanityPost[]> {
  if (await isSeedMode()) return searchSeedPosts(query.trim());
  const q = query.trim() ? `*${query.trim()}*` : "";
  try {
    const result = await fetchSanity<SanityPost[]>(SEARCH_POSTS_QUERY, { q });
    if (result?.length) return result;
    return searchSeedPosts(query.trim());
  } catch {
    return searchSeedPosts(query.trim());
  }
}

export async function fetchRelatedPosts(
  currentSlug: string,
  categorySlugList: string[],
): Promise<SanityPost[]> {
  if (await isSeedMode()) return getSeedRelatedPosts(currentSlug, categorySlugList);
  try {
    const result = await fetchSanity<SanityPost[]>(RELATED_POSTS_QUERY, {
      slug: currentSlug,
      categories: categorySlugList,
    });
    if (result?.length) return result;
    return getSeedRelatedPosts(currentSlug, categorySlugList);
  } catch {
    return getSeedRelatedPosts(currentSlug, categorySlugList);
  }
}

export async function fetchAuthorPosts(authorSlug: string, excludeSlug?: string): Promise<SanityPost[]> {
  if (await isSeedMode()) return getSeedPostsByAuthor(authorSlug, excludeSlug);
  try {
    const query = `*[_type == "blogPost" && author->slug.current == $authorSlug && slug.current != $excludeSlug && defined(slug)] | order(publishedAt desc)[0...3] {
      _id, title, "slug": slug.current, excerpt, coverImage, publishedAt, readTime, featured,
      "author": author->{ _id, name, "slug": slug.current, role, bio, photo, linkedIn },
      "categories": categories[]->{ _id, title, "slug": slug.current, description, color }
    }`;
    const result = await fetchSanity<SanityPost[]>(query, { authorSlug, excludeSlug: excludeSlug ?? "" });
    if (result?.length) return result;
    return getSeedPostsByAuthor(authorSlug, excludeSlug);
  } catch {
    return getSeedPostsByAuthor(authorSlug, excludeSlug);
  }
}

export type { SeedPost };

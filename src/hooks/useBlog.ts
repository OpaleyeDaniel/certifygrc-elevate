import { useQuery } from "@tanstack/react-query";
import type { SanityPost, SanityCategory, SanityTag } from "@/lib/sanity";
import {
  fetchAllPosts,
  fetchFeaturedPost,
  fetchFeaturedPosts,
  fetchPostBySlug,
  fetchAllCategories,
  fetchAllTags,
  fetchPostsByCategory,
  searchPosts,
  fetchRelatedPosts,
  fetchAuthorPosts,
} from "@/lib/blogData";

/** Short stale window so Studio publishes show up quickly on refresh / focus. */
const STALE = 1000 * 30;

export function useFeaturedPost() {
  return useQuery<SanityPost | null>({
    queryKey: ["blog", "featured"],
    queryFn: fetchFeaturedPost,
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function useFeaturedPosts(limit = 3) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "featured-list", limit],
    queryFn: () => fetchFeaturedPosts(limit),
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function useAllPosts() {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "all"],
    queryFn: fetchAllPosts,
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery<SanityPost | null>({
    queryKey: ["blog", "post", slug],
    queryFn: () => fetchPostBySlug(slug),
    staleTime: STALE,
    enabled: !!slug,
    refetchOnWindowFocus: true,
  });
}

export function useAllCategories() {
  return useQuery<SanityCategory[]>({
    queryKey: ["blog", "categories"],
    queryFn: fetchAllCategories,
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function useAllTags() {
  return useQuery<SanityTag[]>({
    queryKey: ["blog", "tags"],
    queryFn: fetchAllTags,
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function usePostsByCategory(categorySlug: string) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "category", categorySlug],
    queryFn: () => fetchPostsByCategory(categorySlug),
    staleTime: STALE,
    enabled: !!categorySlug,
    refetchOnWindowFocus: true,
  });
}

export function useSearchPosts(query: string) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "search", query.trim()],
    queryFn: () => searchPosts(query),
    staleTime: STALE,
    enabled: query.trim().length > 1,
  });
}

export function useRelatedPosts(currentSlug: string, categorySlugList: string[]) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "related", currentSlug],
    queryFn: () => fetchRelatedPosts(currentSlug, categorySlugList),
    staleTime: STALE,
    enabled: !!currentSlug && categorySlugList.length > 0,
  });
}

export function useAuthorPosts(authorSlug: string, excludeSlug?: string) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "author-posts", authorSlug, excludeSlug],
    queryFn: () => fetchAuthorPosts(authorSlug, excludeSlug),
    staleTime: STALE,
    enabled: !!authorSlug,
  });
}

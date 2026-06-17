import { useQuery } from "@tanstack/react-query";
import type { SanityPost, SanityCategory } from "@/lib/sanity";
import {
  fetchAllPosts,
  fetchFeaturedPost,
  fetchFeaturedPosts,
  fetchPostBySlug,
  fetchAllCategories,
  fetchPostsByCategory,
  searchPosts,
  fetchRelatedPosts,
  fetchAuthorPosts,
} from "@/lib/blogData";

const STALE = 1000 * 60 * 5;

export function useFeaturedPost() {
  return useQuery<SanityPost | null>({
    queryKey: ["blog", "featured"],
    queryFn: fetchFeaturedPost,
    staleTime: STALE,
  });
}

export function useFeaturedPosts(limit = 3) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "featured-list", limit],
    queryFn: () => fetchFeaturedPosts(limit),
    staleTime: STALE,
  });
}

export function useAllPosts() {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "all"],
    queryFn: fetchAllPosts,
    staleTime: STALE,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery<SanityPost | null>({
    queryKey: ["blog", "post", slug],
    queryFn: () => fetchPostBySlug(slug),
    staleTime: STALE,
    enabled: !!slug,
  });
}

export function useAllCategories() {
  return useQuery<SanityCategory[]>({
    queryKey: ["blog", "categories"],
    queryFn: fetchAllCategories,
    staleTime: STALE,
  });
}

export function usePostsByCategory(categorySlug: string) {
  return useQuery<SanityPost[]>({
    queryKey: ["blog", "category", categorySlug],
    queryFn: () => fetchPostsByCategory(categorySlug),
    staleTime: STALE,
    enabled: !!categorySlug,
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

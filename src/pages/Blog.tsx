import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Rss, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";
import {
  useAllPosts,
  useAllCategories,
  useFeaturedPost,
  useFeaturedPosts,
  useSearchPosts,
  usePostsByCategory,
} from "@/hooks/useBlog";
import { categoryColor, getCategorySlug, getPostSlug } from "@/lib/blogUtils";
import { SEED_TAGS } from "@/lib/blogSeed";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogFeaturedEditorial from "@/components/blog/BlogFeaturedEditorial";
import BlogNewsletterSection from "@/components/blog/BlogNewsletterSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data: allPosts = [], isLoading: loadingAll } = useAllPosts();
  const { data: featuredPost } = useFeaturedPost();
  const { data: featuredPosts = [] } = useFeaturedPosts(4);
  const { data: categories = [] } = useAllCategories();
  const { data: categoryPosts = [], isLoading: loadingCat } = usePostsByCategory(categorySlug ?? "");
  const { data: searchResults = [], isLoading: loadingSearch } = useSearchPosts(debouncedQuery);

  const isSearching = debouncedQuery.length > 1;
  const isCategoryFiltered = !!categorySlug;
  const isLoading = isSearching ? loadingSearch : isCategoryFiltered ? loadingCat : loadingAll;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setActiveTag(null);
  }, [categorySlug]);

  const activeCategoryObj = categories.find((c) => getCategorySlug(c) === categorySlug);

  const basePosts = useMemo(() => {
    if (isSearching) return searchResults;
    if (isCategoryFiltered) return categoryPosts;
    return allPosts;
  }, [isSearching, isCategoryFiltered, searchResults, categoryPosts, allPosts]);

  const displayedPosts = useMemo(() => {
    let posts = basePosts;
    if (activeTag) {
      posts = posts.filter((p) =>
        (p as { tagSlugs?: string[] }).tagSlugs?.includes(activeTag) ||
        p.title.toLowerCase().includes(activeTag.replace(/-/g, " ")),
      );
    }
    if (!isSearching && !isCategoryFiltered && featuredPost) {
      const heroSlug = getPostSlug(featuredPost);
      posts = posts.filter((p) => getPostSlug(p) !== heroSlug);
    }
    return posts;
  }, [basePosts, activeTag, isSearching, isCategoryFiltered, featuredPost]);

  useEffect(() => {
    const title = activeCategoryObj
      ? `${activeCategoryObj.title} | CertifyGRC Blog`
      : "Blog | CertifyGRC – GRC, Cybersecurity & Compliance Insights";
    document.title = title;
  }, [activeCategoryObj]);

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-20"
        style={{ background: "linear-gradient(165deg, #070b14 0%, #0c1220 45%, #0a0f18 100%)" }}
      >
        {/* Subtle platform imagery */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14] motion-safe:animate-hero-bg-drift motion-reduce:animate-none"
          style={{ backgroundImage: "url(/hero-background.png)" }}
        />
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(220,230,255,0.55) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 15%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 15%, transparent 85%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/4 w-[560px] h-[320px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(ellipse, #305CDE, transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 right-0 w-[380px] h-[380px] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(ellipse, #4A6FD4, transparent)" }}
        />
        {/* Dark blend into page — no white band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to top, hsl(222,47%,5%), transparent)" }}
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 mb-6">
              <Rss className="w-3.5 h-3.5" />
              CertifyGRC Insights
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight mb-5 leading-[1.08]">
              {activeCategoryObj ? activeCategoryObj.title : "GRC Intelligence Hub"}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {activeCategoryObj?.description ??
                "Expert insights on governance, risk, compliance, cybersecurity, and regulatory intelligence — written by practitioners, for practitioners."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, frameworks, topics…"
              className="pl-11 pr-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl text-base focus:border-primary/60 focus:ring-primary/25 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container-wide py-14">
        {/* ── Category filters ─────────────────── */}
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Browse by topic</p>
            <div className="flex flex-wrap gap-2">
              <FilterPill active={!categorySlug} href="/blog" label="All" count={allPosts.length} />
              {categories.map((cat) => {
                const slug = getCategorySlug(cat);
                return (
                  <FilterPill
                    key={cat._id}
                    active={categorySlug === slug}
                    href={`/blog/category/${slug}`}
                    label={cat.title}
                    color={categorySlug === slug ? categoryColor(cat.color) : undefined}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Tag filters ──────────────────────── */}
        {!isSearching && !isCategoryFiltered && (
          <div className="flex flex-wrap items-center gap-2 mb-12">
            <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
                !activeTag ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground hover:bg-muted",
              )}
            >
              All tags
            </button>
            {SEED_TAGS.map((tag) => (
              <button
                key={tag._id}
                type="button"
                onClick={() => setActiveTag(activeTag === tag.slug.current ? null : tag.slug.current ?? "")}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
                  activeTag === tag.slug.current
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {tag.title}
              </button>
            ))}
          </div>
        )}

        {/* ── Hero featured article ────────────── */}
        {!isSearching && !isCategoryFiltered && featuredPost && (
          <div className="mb-14">
            <BlogPostCard post={featuredPost} variant="featured" />
          </div>
        )}

        {/* ── Featured editorial row ───────────── */}
        {!isSearching && !isCategoryFiltered && featuredPosts.length > 1 && (
          <BlogFeaturedEditorial
            posts={featuredPosts}
            excludeSlug={featuredPost ? getPostSlug(featuredPost) : undefined}
          />
        )}

        {/* ── Latest articles ──────────────────── */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                {isSearching ? "Search Results" : isCategoryFiltered ? activeCategoryObj?.title : "Latest Articles"}
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
                {isSearching ? `Results for "${debouncedQuery}"` : "Recent Publications"}
              </h2>
            </div>
            {!isLoading && (
              <p className="text-sm text-muted-foreground tabular-nums">
                {displayedPosts.length} article{displayedPosts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
                ))}
              </motion.div>
            ) : displayedPosts.length === 0 ? (
              <EmptyState key="empty" query={debouncedQuery} tag={activeTag} />
            ) : (
              <motion.div
                key={`grid-${categorySlug ?? ""}-${debouncedQuery}-${activeTag ?? ""}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {displayedPosts.map((post, i) => (
                  <BlogPostCard key={post._id} post={post} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="mt-20">
          <BlogNewsletterSection />
        </div>
      </div>
    </>
  );
}

function FilterPill({
  active,
  href,
  label,
  count,
  color,
}: {
  active: boolean;
  href: string;
  label: string;
  count?: number;
  color?: string;
}) {
  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
        active
          ? "text-white border-transparent shadow-md scale-[1.02]"
          : "border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground hover:-translate-y-0.5",
      )}
      style={active && color ? { background: color, borderColor: color } : active ? { background: "hsl(239 84% 67%)", borderColor: "hsl(239 84% 67%)" } : {}}
    >
      {label}
      {count !== undefined && <span className="ml-1.5 tabular-nums opacity-75">({count})</span>}
    </Link>
  );
}

function EmptyState({ query, tag }: { query: string; tag: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-center py-24 rounded-3xl"
      style={{ background: "linear-gradient(180deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-5" />
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        {query ? `No results for "${query}"` : tag ? `No articles tagged "${tag}"` : "No articles found"}
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        Try different keywords, browse categories, or explore our featured insights above.
      </p>
    </motion.div>
  );
}

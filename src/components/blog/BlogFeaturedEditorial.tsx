import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { SanityPost } from "@/lib/sanity";
import { formatPostDate, getPostCoverUrl, getPostSlug } from "@/lib/blogUtils";
import BlogCategoryBadge from "./BlogCategoryBadge";
import { cardHover, cardTap, revealUp, staggerContainer, scrollViewport } from "@/lib/motion";

type Props = {
  posts: SanityPost[];
  /** Slug to exclude (shown in hero above) */
  excludeSlug?: string;
};

/**
 * Editorial 3-column featured row — Stripe / Linear blog style.
 */
export default function BlogFeaturedEditorial({ posts, excludeSlug }: Props) {
  const items = posts.filter((p) => getPostSlug(p) !== excludeSlug).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Featured Insights</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
            Editor&apos;s Picks
          </h2>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-6 md:grid-cols-3"
      >
        {items.map((post, i) => {
          const slug = getPostSlug(post);
          const cover = getPostCoverUrl(post, 640, 360);
          const category = post.categories?.[0];

          return (
            <motion.article key={post._id} variants={revealUp} custom={i * 0.1} whileHover={cardHover} whileTap={cardTap}>
              <Link to={`/blog/${slug}`} className="group block h-full">
                <div
                  className="relative rounded-2xl overflow-hidden transition-shadow duration-400 group-hover:shadow-[0_20px_50px_-16px_rgba(99,102,241,0.28)]"
                  style={{
                    background: "linear-gradient(155deg, rgba(99,102,241,0.20) 0%, hsl(221,42%,13%) 100%)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.45)",
                  }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted/30">
                    {cover ? (
                      <img
                        src={cover}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/15 to-accent/10" />
                    )}
                  </div>
                  <div className="p-5">
                    {category && <BlogCategoryBadge category={category} asLink size="sm" className="mb-3" />}
                    <h3 className="font-display font-bold text-lg text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author?.name}</span>
                      <span className="flex items-center gap-3">
                        {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}m
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

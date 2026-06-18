import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPostDate, getPostCoverUrl, getPostSlug } from "@/lib/blogUtils";
import { type SanityPost } from "@/lib/sanity";
import BlogCategoryBadge from "./BlogCategoryBadge";
import { cardHover, cardTap, revealUp } from "@/lib/motion";

interface Props {
  post: SanityPost;
  variant?: "default" | "featured" | "horizontal" | "compact";
  index?: number;
}

export default function BlogPostCard({ post, variant = "default", index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const slug = getPostSlug(post);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);

  const primaryCategory = post.categories?.[0];
  const imageUrl = getPostCoverUrl(post, 800, 450);

  if (variant === "featured") return <FeaturedCard post={post} slug={slug} imageUrl={imageUrl} />;
  if (variant === "horizontal") return <HorizontalCard post={post} slug={slug} imageUrl={imageUrl} index={index} />;
  if (variant === "compact") return <CompactCard post={post} slug={slug} index={index} />;

  return (
    <motion.article variants={revealUp} custom={index * 0.1} whileHover={cardHover} whileTap={cardTap} className="group h-full">
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-shadow duration-400"
        style={{
          background: "linear-gradient(155deg, rgba(48,92,222,0.22) 0%, rgba(48,92,222,0.08) 42%, hsl(221,42%,13%) 100%)",
          border: "1px solid rgba(48,92,222,0.28)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.45)",
          "--gx": "50%",
          "--gy": "50%",
        } as React.CSSProperties}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 rounded-2xl"
          style={{ background: "radial-gradient(320px circle at var(--gx) var(--gy), rgba(48,92,222,0.06), transparent 70%)" }}
        />

        <Link to={`/blog/${slug}`} className="block overflow-hidden aspect-[16/10] bg-muted/20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.coverImage?.alt ?? post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <PlaceholderCover category={primaryCategory} />
          )}
        </Link>

        <div className="relative z-10 flex flex-col flex-1 p-5">
          {primaryCategory && (
            <div className="mb-3">
              <BlogCategoryBadge category={primaryCategory} asLink size="sm" />
            </div>
          )}

          <Link to={`/blog/${slug}`} className="group/title">
            <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-3 group-hover/title:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatPostDate(post.publishedAt)}
                </span>
              )}
            </div>
            {post.readTime && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime}m
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedCard({ post, slug, imageUrl }: { post: SanityPost; slug: string; imageUrl: string | null }) {
  const primaryCategory = post.categories?.[0];
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden"
      style={{ minHeight: 520 }}
    >
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={getPostCoverUrl(post, 1400, 700) ?? imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #0f0c29, #1a1450, #0c0a1f)" }} />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(4,4,20,0.97) 0%, rgba(4,4,20,0.55) 45%, rgba(4,4,20,0.12) 100%)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[520px] p-8 md:p-12 lg:p-14">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {primaryCategory && <BlogCategoryBadge category={primaryCategory} />}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/90">
            ★ Featured
          </span>
        </div>

        <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] mb-5 max-w-4xl tracking-tight">
          {post.title}
        </h2>
        <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-8 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            {post.author && <span className="font-medium text-white/80">{post.author.name}</span>}
            {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            )}
          </div>
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:gap-3 shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))", color: "#fff", boxShadow: "0 0 20px rgba(48,92,222,0.3)" }}
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function HorizontalCard({ post, slug, imageUrl, index }: { post: SanityPost; slug: string; imageUrl: string | null; index: number }) {
  const primaryCategory = post.categories?.[0];
  return (
    <motion.article
      variants={revealUp}
      custom={index * 0.08}
      whileHover={{ x: 4 }}
      className="group flex gap-4 sm:gap-6 rounded-xl p-4 transition-shadow duration-300"
      style={{
        background: "linear-gradient(155deg, rgba(48,92,222,0.18) 0%, hsl(221,42%,13%) 100%)",
        border: "1px solid rgba(48,92,222,0.22)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <Link to={`/blog/${slug}`} className="shrink-0">
        <div className="w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-muted/30">
          {imageUrl ? (
            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          ) : (
            <PlaceholderCover category={primaryCategory} small />
          )}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        {primaryCategory && <BlogCategoryBadge category={primaryCategory} size="sm" className="mb-2" />}
        <Link to={`/blog/${slug}`}>
          <h3 className="font-display font-semibold text-foreground text-sm sm:text-base leading-snug hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
          {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
          {post.readTime && <span>{post.readTime}m</span>}
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({ post, slug, index }: { post: SanityPost; slug: string; index: number }) {
  const primaryCategory = post.categories?.[0];
  return (
    <motion.article variants={revealUp} custom={index * 0.06} className="group">
      <Link to={`/blog/${slug}`} className="flex items-start gap-3 py-3 border-b border-border/40 hover:border-primary/30 transition-colors">
        <div className="flex-1 min-w-0">
          {primaryCategory && <BlogCategoryBadge category={primaryCategory} size="sm" className="mb-1.5" />}
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {post.title}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
            {post.publishedAt && <span>{formatPostDate(post.publishedAt)}</span>}
            {post.readTime && <span>· {post.readTime}m</span>}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-1 transition-all group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}

function PlaceholderCover({ category, small }: { category?: SanityPost["categories"] extends (infer C)[] | undefined ? C : never; small?: boolean }) {
  const color = (category as { color?: string })?.color ?? "#305CDE";
  return (
    <div
      className={cn("w-full h-full flex items-center justify-center", small ? "text-xl" : "text-3xl")}
      style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)`, border: `1px solid ${color}20` }}
    >
      <span style={{ filter: "grayscale(0.3)" }}>🛡️</span>
    </div>
  );
}

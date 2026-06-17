import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer } from "@/lib/motion";
import {
  formatPostDate,
  extractToc,
  getPostCoverUrl,
  getAuthorPhotoUrl,
  getCategorySlug,
  getPostSlug,
  getAuthorSlug,
} from "@/lib/blogUtils";
import { type SanityPost } from "@/lib/sanity";
import { usePostBySlug, useRelatedPosts, useAuthorPosts } from "@/hooks/useBlog";
import BlogPortableText from "@/components/blog/BlogPortableText";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogShareBar from "@/components/blog/BlogShareBar";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogCategoryBadge from "@/components/blog/BlogCategoryBadge";
import BlogReadingProgress from "@/components/blog/BlogReadingProgress";
import BlogNewsletterSection from "@/components/blog/BlogNewsletterSection";

export default function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePostBySlug(slug);

  const categorySlugList = (post?.categories ?? []).map((c) => getCategorySlug(c));
  const { data: relatedPosts = [] } = useRelatedPosts(slug, categorySlugList);
  const authorSlug = getAuthorSlug(post?.author);
  const { data: authorPosts = [] } = useAuthorPosts(authorSlug, slug);

  useEffect(() => {
    if (!post) return;
    const seoTitle = post.seo?.metaTitle ?? `${post.title} | CertifyGRC Blog`;
    const seoDesc = post.seo?.metaDescription ?? post.excerpt;
    document.title = seoTitle;
    setMeta("description", seoDesc);
    setMeta("og:title", seoTitle);
    setMeta("og:description", seoDesc);
    setMeta("og:type", "article");
    const cover = getPostCoverUrl(post, 1200, 630);
    if (cover) setMeta("og:image", cover);
    return () => {
      document.title = "CertifyGRC";
    };
  }, [post]);

  if (isLoading) return <BlogPostSkeleton />;
  if (isError || (!isLoading && !post)) return <Navigate to="/blog" replace />;
  if (!post) return null;

  const coverUrl = getPostCoverUrl(post, 1600, 800);
  const authorAvatarUrl = getAuthorPhotoUrl(post, 96);
  const toc = post.body ? extractToc(post.body as Parameters<typeof extractToc>[0]) : [];

  return (
    <>
      <BlogReadingProgress />

      <header className="relative overflow-hidden pt-20" style={{ minHeight: 520 }}>
        <div className="absolute inset-0">
          {coverUrl ? (
            <img src={coverUrl} alt={post.title} className="w-full h-full object-cover" loading="eager" decoding="async" />
          ) : (
            <div className="w-full h-full" style={{ background: "linear-gradient(165deg, #0a0818, #12103a, #0f172a)" }} />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(4,4,20,0.98) 0%, rgba(4,4,20,0.7) 50%, rgba(4,4,20,0.25) 100%)" }}
          />
        </div>

        <div className="container-narrow relative z-10 pb-14 pt-8">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            {post.categories?.[0] && (
              <>
                <span>/</span>
                <Link
                  to={`/blog/category/${getCategorySlug(post.categories[0])}`}
                  className="hover:text-white transition-colors"
                >
                  {post.categories[0].title}
                </Link>
              </>
            )}
          </nav>

          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories?.map((cat) => (
              <BlogCategoryBadge key={cat._id} category={cat} asLink />
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.12] max-w-4xl mb-6 tracking-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-white/65 text-lg leading-relaxed max-w-3xl mb-8"
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex flex-wrap items-center gap-5">
              {post.author && (
                <div className="flex items-center gap-3">
                  {authorAvatarUrl ? (
                    <img src={authorAvatarUrl} alt={post.author.name} className="w-11 h-11 rounded-full border-2 border-white/25 object-cover" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-primary/30 border border-white/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold text-sm">{post.author.name}</p>
                    {post.author.role && <p className="text-white/50 text-xs">{post.author.role}</p>}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-white/50">
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatPostDate(post.publishedAt)}
                  </span>
                )}
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime} min read
                  </span>
                )}
              </div>
            </div>
            <BlogShareBar title={post.title} variant="hero" />
          </motion.div>
        </div>
      </header>

      <div className="container-wide py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <main className="lg:col-span-8">
            {post.body && post.body.length > 0 ? (
              <BlogPortableText body={post.body} />
            ) : (
              <p className="text-muted-foreground italic">Article content coming soon.</p>
            )}

            <div className="mt-14 pt-8 border-t border-border/40">
              <BlogShareBar title={post.title} />
            </div>

            {post.author && (
              <AuthorSection post={post} avatarUrl={authorAvatarUrl} otherPosts={authorPosts} />
            )}

            <div className="mt-14">
              <BlogNewsletterSection />
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Continue Reading</p>
                <h2 className="font-display font-bold text-2xl text-foreground mb-8">Related Articles</h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {relatedPosts.map((rp, i) => (
                    <BlogPostCard key={rp._id} post={rp} index={i} />
                  ))}
                </motion.div>
              </section>
            )}
          </main>

          <aside className="lg:col-span-4">
            {toc.length > 0 && <BlogTableOfContents entries={toc} />}

            <div
              className="mt-8 rounded-2xl overflow-hidden relative p-6 text-center"
              style={{ background: "linear-gradient(135deg, #0f0c29, #1a1450)" }}
            >
              <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 0%, #6366f1, transparent 70%)" }} />
              <div className="relative z-10">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">Ready to get compliant?</p>
                <h3 className="font-display font-bold text-white text-xl mb-3">Start your NIST CSF 2.0 assessment today</h3>
                <p className="text-white/60 text-sm mb-5">
                  CertifyGRC automates compliance assessments, evidence management, and audit reporting.
                </p>
                <Button asChild className="w-full font-semibold mb-3" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}>
                  <Link to="/software">Explore the Platform</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full text-white/70 hover:text-white text-sm">
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ArticleSchema post={post} coverUrl={coverUrl} />
    </>
  );
}

function AuthorSection({
  post,
  avatarUrl,
  otherPosts,
}: {
  post: SanityPost;
  avatarUrl: string | null;
  otherPosts: SanityPost[];
}) {
  if (!post.author) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-14 rounded-2xl p-8"
      style={{ background: "linear-gradient(135deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">About the Author</p>
      <div className="flex flex-col sm:flex-row gap-6">
        {avatarUrl ? (
          <img src={avatarUrl} alt={post.author!.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-border/40" />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-primary" />
          </div>
        )}
        <div className="flex-1">
          <p className="font-display font-bold text-xl text-foreground">{post.author.name}</p>
          {post.author.role && <p className="text-sm text-primary font-medium mt-0.5 mb-3">{post.author.role}</p>}
          {post.author.bio && <p className="text-sm text-muted-foreground leading-relaxed">{post.author.bio}</p>}
          {post.author.linkedIn && (
            <a
              href={post.author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Connect on LinkedIn →
            </a>
          )}
        </div>
      </div>

      {otherPosts.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-sm font-semibold text-foreground mb-4">More from {post.author.name}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {otherPosts.map((p) => (
              <Link
                key={p._id}
                to={`/blog/${getPostSlug(p)}`}
                className="group rounded-xl border border-border/40 p-4 hover:border-primary/25 hover:shadow-sm transition-all duration-300"
              >
                <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {p.title}
                </p>
                {p.readTime && <p className="text-xs text-muted-foreground mt-2">{p.readTime} min read</p>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ArticleSchema({ post, coverUrl }: { post: SanityPost; coverUrl: string | null }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
    publisher: {
      "@type": "Organization",
      name: "CertifyGRC",
      logo: { "@type": "ImageObject", url: "https://certifygrc.com/favicon.ico" },
    },
    image: coverUrl ?? undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : "",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function BlogPostSkeleton() {
  return (
    <div>
      <Skeleton className="h-[520px] w-full rounded-none" />
      <div className="container-narrow py-12 space-y-4">
        <Skeleton className="h-10 w-3/4 rounded-xl" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-2/3 rounded-lg" />
      </div>
    </div>
  );
}

function setMeta(name: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${name}"], meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
    document.head.appendChild(el);
  }
  el.content = content;
}

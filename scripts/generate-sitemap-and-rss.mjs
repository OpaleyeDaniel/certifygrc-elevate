/**
 * Build-time script: queries Sanity CMS (if reachable) to dynamically append
 * all published blog articles to public/sitemap.xml and public/rss.xml.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(ROOT_DIR, "public");

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "729gr7n1";
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || "production";
const SITE_URL = "https://certifygrc.com";

const STATIC_ROUTES = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/software", priority: "0.9", changefreq: "weekly" },
  { url: "/consulting", priority: "0.8", changefreq: "weekly" },
  { url: "/cyber-aware", priority: "0.8", changefreq: "monthly" },
  { url: "/free-assessment", priority: "0.85", changefreq: "weekly" },
  { url: "/frameworks", priority: "0.8", changefreq: "monthly" },
  { url: "/compare", priority: "0.9", changefreq: "weekly" },
  { url: "/compare/vanta-alternative", priority: "0.85", changefreq: "weekly" },
  { url: "/compare/drata-alternative", priority: "0.85", changefreq: "weekly" },
  { url: "/blog", priority: "0.8", changefreq: "daily" },
  { url: "/company", priority: "0.7", changefreq: "monthly" },
  { url: "/partner", priority: "0.7", changefreq: "monthly" },
  { url: "/early-access", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.6", changefreq: "monthly" },
  { url: "/privacy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms", priority: "0.3", changefreq: "yearly" },
];

async function fetchSanityPosts() {
  const query = encodeURIComponent(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    title, "slug": slug.current, excerpt, publishedAt, _updatedAt
  }`);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${SANITY_DATASET}?query=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch (err) {
    console.warn("[sitemap/rss] could not fetch live Sanity posts (offline/no network):", err.message);
    return [];
  }
}

async function fetchSanityCategories() {
  const query = encodeURIComponent(`*[_type == "category" && defined(slug.current)] {
    title, "slug": slug.current
  }`);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${SANITY_DATASET}?query=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch (err) {
    console.warn("[sitemap] could not fetch live Sanity categories:", err.message);
    return [];
  }
}

async function generate() {
  const [posts, categories] = await Promise.all([fetchSanityPosts(), fetchSanityCategories()]);
  const today = new Date().toISOString().split("T")[0];

  // 1. Generate sitemap.xml
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of STATIC_ROUTES) {
    sitemapXml += `  <url>\n    <loc>${SITE_URL}${route.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
  }

  for (const cat of categories) {
    sitemapXml += `  <url>\n    <loc>${SITE_URL}/blog/category/${cat.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  for (const post of posts) {
    const lastmod = (post._updatedAt || post.publishedAt || today).split("T")[0];
    sitemapXml += `  <url>\n    <loc>${SITE_URL}/blog/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
  }

  sitemapXml += `</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml, "utf-8");
  console.log(`[sitemap] Generated sitemap.xml with ${STATIC_ROUTES.length + posts.length} URLs.`);

  // 2. Generate rss.xml
  let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n`;
  rssXml += `  <title>CertifyGRC Blog | GRC, Risk &amp; Compliance Insights</title>\n`;
  rssXml += `  <link>${SITE_URL}/blog</link>\n`;
  rssXml += `  <description>Expert guidance on NIST CSF 2.0, ISO 27001, SOC 2, risk management, and cybersecurity governance from CertifyGRC.</description>\n`;
  rssXml += `  <language>en-us</language>\n`;
  rssXml += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rssXml += `  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  for (const post of posts) {
    const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString();
    rssXml += `  <item>\n`;
    rssXml += `    <title><![CDATA[${post.title}]]></title>\n`;
    rssXml += `    <link>${SITE_URL}/blog/${post.slug}</link>\n`;
    rssXml += `    <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>\n`;
    rssXml += `    <pubDate>${pubDate}</pubDate>\n`;
    if (post.excerpt) {
      rssXml += `    <description><![CDATA[${post.excerpt}]]></description>\n`;
    }
    rssXml += `  </item>\n`;
  }

  rssXml += `</channel>\n</rss>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), rssXml, "utf-8");
  console.log(`[rss] Generated rss.xml with ${posts.length} articles.`);
}

generate().catch((err) => {
  console.error("[generate-sitemap-and-rss] failed:", err);
});

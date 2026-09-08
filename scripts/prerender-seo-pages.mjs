import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "../dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error("[prerender] dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

const SITE_URL = "https://certifygrc.com";
const SITE_NAME = "CertifyGRC";
const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || "729gr7n1";
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || "production";
const DEFAULT_OG_IMAGE = "https://certifygrc.com/application-hero-dashboard.png";

/**
 * @typedef {Object} PageMeta
 * @property {string} route
 * @property {string} title
 * @property {string} description
 * @property {string} [keywords]
 * @property {string} canonical
 * @property {string} [ogImage]
 * @property {string} [ogType]
 * @property {string} [publishedTime]
 * @property {string} [modifiedTime]
 * @property {string} [author]
 * @property {string} [htmlBody]
 * @property {Record<string, unknown> | Array<Record<string, unknown>>} [jsonLd]
 */

/** @type {PageMeta[]} */
const STATIC_PAGES = [
  {
    route: "solutions/nist-csf-2-0",
    title: "NIST CSF 2.0 Compliance Software & Continuous Gap Analysis Platform | CertifyGRC",
    description:
      "The premier enterprise software platform for NIST CSF 2.0 implementation. Native mapping across Govern, Identify, Protect, Detect, Respond, and Recover with automated gap analysis and audit readiness.",
    keywords:
      "NIST CSF 2.0 software, NIST CSF platform, NIST CSF compliance tool, NIST CSF 2.0 gap analysis, NIST Cybersecurity Framework automation, NIST maturity assessment, Govern function NIST, OneTrust alternative, Hyperproof alternative",
    canonical: `${SITE_URL}/solutions/nist-csf-2-0`,
    htmlBody: `
      <section>
        <h1>Enterprise NIST CSF 2.0 Software &amp; Maturity Automation</h1>
        <p>CertifyGRC is the leading specialized software platform for implementing the NIST Cybersecurity Framework 2.0 (NIST CSF 2.0). Built natively for all six core functions with complete 106 subcategory mapping, automated cloud evidence synchronization, and hybrid vCISO advisory.</p>
        <h2>The Six Core NIST CSF 2.0 Functions</h2>
        <ul>
          <li><strong>Govern (GV):</strong> Organizational context, risk management strategy, roles and authorities, policy oversight, and Cybersecurity Supply Chain Risk Management (C-SCRM).</li>
          <li><strong>Identify (ID):</strong> Asset management, risk assessments, vulnerability prioritization, and improvement roadmaps.</li>
          <li><strong>Protect (PR):</strong> Identity management, access control (PR.AA), awareness training (PR.AT), data security (PR.DS), and platform resilience.</li>
          <li><strong>Detect (DE):</strong> Continuous security log monitoring (DE.CM) and adverse event anomaly analysis (DE.AE).</li>
          <li><strong>Respond (RS):</strong> Incident management workflows (RS.MA), forensic triaging (RS.AN), customer communications (RS.CO), and incident mitigation.</li>
          <li><strong>Recover (RC):</strong> Incident recovery execution (RC.RP) and business continuity restoration.</li>
        </ul>
        <h2>NIST CSF 2.0 Implementation Tiers &amp; Community Profiles</h2>
        <p>Model your Current Profile against your Target Profile across Tier 1 (Partial), Tier 2 (Risk-Informed), Tier 3 (Repeatable), and Tier 4 (Adaptive). Generate instant board-ready posture reports and auditor export bundles.</p>
        <p><a href="/free-assessment">Take the Free 2-Minute NIST CSF 2.0 Security Posture Quiz</a></p>
      </section>
    `,
  },
  {
    route: "solutions/iso-27001",
    title: "ISO 27001:2022 Compliance Automation & ISMS Platform | CertifyGRC",
    description:
      "Automate your ISO/IEC 27001:2022 Information Security Management System (ISMS). Real-time Statement of Applicability (SoA), Annex A 93-control mapping, and continuous audit readiness.",
    keywords:
      "ISO 27001 software, ISO 27001 automation platform, ISO 27001:2022 ISMS tool, Statement of Applicability automation, Annex A 93 controls, ISO 27001 certification software, GRC platform",
    canonical: `${SITE_URL}/solutions/iso-27001`,
    htmlBody: `
      <section>
        <h1>Streamlined ISO 27001:2022 Compliance &amp; ISMS Platform</h1>
        <p>CertifyGRC automates the end-to-end lifecycle of your Information Security Management System (ISMS), aligning with Clauses 4 through 10 and all 93 controls of Annex A (2022 revision).</p>
        <h2>Automated Annex A Controls Across All 4 Themes</h2>
        <ul>
          <li><strong>Organizational Controls (37 Controls):</strong> Information security policies, supplier relationships, asset management, and threat intelligence.</li>
          <li><strong>People Controls (8 Controls):</strong> Screening, terms of employment, security awareness training, and remote working.</li>
          <li><strong>Physical Controls (14 Controls):</strong> Security perimeters, physical monitoring, and equipment maintenance.</li>
          <li><strong>Technological Controls (34 Controls):</strong> Access control, configuration management, data masking, secure coding, and vulnerability management.</li>
        </ul>
        <h2>Dynamic Statement of Applicability (SoA)</h2>
        <p>Generate auditor-ready SoA reports in real time, linking inclusions, exclusions, and justifications directly to live cloud infrastructure evidence.</p>
        <p><a href="/contact">Schedule an ISO 27001 Platform Walkthrough</a></p>
      </section>
    `,
  },
  {
    route: "frameworks",
    title: "Compliance Frameworks | NIST CSF 2.0, ISO 27001, SOC 2, OSFI | CertifyGRC",
    description:
      "Comprehensive compliance framework mapping: NIST CSF 2.0 (Govern to Recover), ISO 27001:2022, SOC 2, PCI DSS 4.0, OSFI B-10 & B-13, and ISO 42001.",
    keywords:
      "NIST CSF 2.0 framework, ISO 27001 compliance, SOC 2 Type II, PCI DSS 4.0, OSFI B-10, OSFI B-13, ISO 42001 AI governance, PIPEDA, HIPAA compliance software, compliance automation software, software like Drata, software like Vanta",
    canonical: `${SITE_URL}/frameworks`,
    htmlBody: `
      <section>
        <h1>Supported Compliance Standards &amp; Frameworks</h1>
        <p>Accelerate audit readiness and eliminate redundant work with automated control cross-mapping across all leading industry frameworks.</p>
        <div>
          <h2>NIST CSF 2.0 (Cybersecurity Framework)</h2>
          <p>Complete coverage across all 6 core functions: Govern (GV), Identify (ID), Protect (PR), Detect (DE), Respond (RS), and Recover (RC) across 106 subcategories.</p>
        </div>
        <div>
          <h2>ISO/IEC 27001:2022</h2>
          <p>End-to-end Information Security Management System (ISMS) implementation, Statement of Applicability (SoA), and Annex A control automation.</p>
        </div>
        <div>
          <h2>SOC 2 (Type I &amp; Type II)</h2>
          <p>Trust Services Criteria coverage for Security, Availability, Confidentiality, Processing Integrity, and Privacy with continuous auditor evidence staging.</p>
        </div>
        <div>
          <h2>OSFI B-10 &amp; B-13 Guidelines</h2>
          <p>Specialized controls for Canadian Federally Regulated Financial Institutions covering third-party risk management and technology/cyber risk.</p>
        </div>
        <div>
          <h2>ISO/IEC 42001 &amp; NIST AI RMF</h2>
          <p>Artificial Intelligence Management System (AIMS), algorithmic risk assessment, model governance, and ethical AI safety controls.</p>
        </div>
        <div>
          <h2>Unified Multi-Framework Deduplication</h2>
          <p>Deduplicate controls across NIST CSF 2.0, ISO 27001, SOC 2, and OSFI B-10/B-13 while leveraging dedicated vCISO advisory and built-in CyberDrill employee security training.</p>
          <p><a href="/software">Explore CertifyGRC Application</a> | <a href="/free-assessment">Take the Free Security Posture Assessment</a></p>
        </div>
      </section>
    `,
  },
  {
    route: "software",
    title: "Compliance Automation Software & Continuous GRC Platform | CertifyGRC",
    description:
      "Leading compliance automation software for fast-growing organizations. Automated continuous evidence collection, audit readiness, and continuous control monitoring for SOC 2, ISO 27001, and NIST CSF 2.0.",
    keywords:
      "compliance automation software, software like Drata, software like Vanta, Vanta alternative, Drata alternative, best GRC software, SOC 2 compliance tool, ISO 27001 automation, continuous evidence collection, vCISO advisory",
    canonical: `${SITE_URL}/software`,
    htmlBody: `
      <section>
        <h1>CertifyGRC Compliance Automation &amp; Risk Platform</h1>
        <p>Continuous evidence synchronization across AWS, Azure, Google Cloud, GitHub, GitLab, Okta, and Microsoft 365. Automated gap analysis, risk registers, and real-time posture reporting.</p>
        <div>
          <h2>Enterprise Compliance Automation with Hands-on vCISO Advisory</h2>
          <p>CertifyGRC combines SaaS automation with certified practitioner advisory, eliminating the burden of self-managing policy drafting and auditor defense. Natively built for NIST CSF 2.0 with all 6 core functions (Govern, Identify, Protect, Detect, Respond, Recover), ISO 27001:2022, and SOC 2.</p>
          <p><a href="/contact">Schedule a Platform Demo</a> | <a href="/free-assessment">Free 2-Minute Security Assessment</a></p>
        </div>
      </section>
    `,
  },
  {
    route: "consulting",
    title: "vCISO & Compliance Advisory Services | CertifyGRC",
    description:
      "Hands-on vCISO advisory, policy development, risk assessments, and audit defense from certified cybersecurity practitioners.",
    keywords:
      "vCISO advisory, virtual CISO, fractional CISO, compliance consulting, SOC 2 consultant, ISO 27001 advisory, NIST CSF 2.0 consultant",
    canonical: `${SITE_URL}/consulting`,
    htmlBody: `
      <section>
        <h1>vCISO &amp; Advisory Services</h1>
        <p>Get dedicated fractional security leadership from certified CISSP, CISM, and CRISC professionals. We design security programs, author custom policies, and sit on audit calls with your team.</p>
      </section>
    `,
  },
  {
    route: "cyber-aware",
    title: "CyberDrill | Workforce Security Awareness & Tabletop Simulations | CertifyGRC",
    description:
      "Interactive employee security training, phishing simulations, and tabletop incident drills built directly into your compliance workflow.",
    keywords:
      "CyberDrill, security awareness training, phishing simulation, tabletop exercises, incident response drills, employee cybersecurity training",
    canonical: `${SITE_URL}/cyber-aware`,
    htmlBody: `
      <section>
        <h1>CyberDrill Security Awareness &amp; Simulations</h1>
        <p>Move beyond boring once-a-year compliance videos. CyberDrill provides hands-on phishing tests, role-based micro-learning, and executive tabletop exercises mapped directly to NIST CSF 2.0 PR.AT controls.</p>
      </section>
    `,
  },
  {
    route: "free-assessment",
    title: "Free 2-Minute NIST CSF 2.0 Cybersecurity Posture Quiz | CertifyGRC",
    description:
      "Assess your organization's cybersecurity maturity across Govern, Identify, Protect, Detect, Respond, and Recover with instant scoring and gap analysis.",
    keywords:
      "NIST CSF 2.0 assessment, cybersecurity posture quiz, free security assessment, NIST maturity score, cyber risk evaluation",
    canonical: `${SITE_URL}/free-assessment`,
    htmlBody: `
      <section>
        <h1>Free NIST CSF 2.0 Security Posture Assessment</h1>
        <p>Take our 2-minute diagnostic quiz to evaluate your security posture across Govern, Identify, Protect, Detect, Respond, and Recover. Receive instant maturity scoring, gap insights, and recommended remediation steps.</p>
      </section>
    `,
  },
  {
    route: "blog",
    title: "GRC Intelligence Hub | Cybersecurity, Risk & Compliance Insights | CertifyGRC",
    description:
      "Read expert insights on NIST CSF 2.0, ISO 27001 compliance, cyber risk management, audit readiness strategies, and GRC best practices from the CertifyGRC team.",
    keywords:
      "GRC blog, cybersecurity insights, NIST CSF 2.0 guide, ISO 27001 tips, SOC 2 compliance, audit readiness, vCISO advisory",
    canonical: `${SITE_URL}/blog`,
    htmlBody: `
      <section>
        <h1>CertifyGRC Intelligence Hub</h1>
        <p>Expert insights on governance, risk, compliance, cybersecurity, and regulatory intelligence — written by practitioners, for practitioners.</p>
      </section>
    `,
  },
];

async function fetchSanityPosts() {
  const query = encodeURIComponent(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt,
    "coverImageUrl": coverImage.asset->url,
    "author": author->{ name, role, linkedIn },
    "categories": categories[]->{ title, "slug": slug.current },
    "tags": tags[]->title,
    body
  }`);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${SANITY_DATASET}?query=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch (err) {
    console.warn("[prerender] Could not fetch live Sanity posts:", err.message);
    return [];
  }
}

/**
 * Render a complete static HTML page with metadata in <head> and fallback in <noscript>.
 * The #root container is NEVER overwritten with visible text so users NEVER experience FOUC!
 */
function renderPage(meta) {
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace or add <meta name="description">
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    );
  }

  // Replace or add <meta name="keywords">
  if (meta.keywords) {
    if (html.includes('name="keywords"')) {
      html = html.replace(
        /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="keywords" content="${meta.keywords.replace(/"/g, "&quot;")}" />`,
      );
    } else {
      html = html.replace(
        /<\/head>/i,
        `  <meta name="keywords" content="${meta.keywords.replace(/"/g, "&quot;")}" />\n</head>`,
      );
    }
  }

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${meta.canonical}" />`,
  );

  // Replace OpenGraph
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  const ogType = meta.ogType || "website";

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title.replace(/"/g, "&quot;")}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${meta.canonical}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${ogImage}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${ogType}" />`,
  );

  // Article-specific OpenGraph meta tags
  if (ogType === "article") {
    let articleMeta = "";
    if (meta.publishedTime) {
      articleMeta += `\n  <meta property="article:published_time" content="${meta.publishedTime}" />`;
    }
    if (meta.modifiedTime) {
      articleMeta += `\n  <meta property="article:modified_time" content="${meta.modifiedTime}" />`;
    }
    if (meta.author) {
      articleMeta += `\n  <meta property="article:author" content="${meta.author.replace(/"/g, "&quot;")}" />`;
    }
    if (articleMeta) {
      html = html.replace(/<\/head>/i, `${articleMeta}\n</head>`);
    }
  }

  // Replace Twitter Card
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${meta.title.replace(/"/g, "&quot;")}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

  // Inject JSON-LD Schema if provided
  if (meta.jsonLd) {
    const jsonLdString = JSON.stringify(meta.jsonLd);
    const scriptTag = `\n  <script type="application/ld+json">${jsonLdString}</script>\n`;
    html = html.replace(/<\/head>/i, `${scriptTag}</head>`);
  }

  // IMPORTANT: Inject semantic crawl fallback strictly inside <noscript> outside #root!
  // This ensures search bots see full text, while human users with JS enabled NEVER see raw unstyled text flashing!
  if (meta.htmlBody) {
    const noscriptContent = `
    <noscript>
      <div class="static-seo-prerender">
        ${meta.htmlBody}
      </div>
    </noscript>
    `.trim();

    html = html.replace(/<\/body>/i, `  ${noscriptContent}\n  </body>`);
  }

  return html;
}

async function run() {
  let generatedCount = 0;

  // 1. Pre-render static service & solutions pages
  for (const page of STATIC_PAGES) {
    const targetDir = path.join(DIST_DIR, page.route);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, "index.html");
    const renderedHtml = renderPage(page);
    fs.writeFileSync(targetFile, renderedHtml, "utf-8");
    console.log(`[prerender] Generated static HTML: ${page.route}/index.html`);
    generatedCount++;

    // Aliases
    if (page.route === "solutions/nist-csf-2-0") {
      const aliasDir = path.join(DIST_DIR, "nist-csf-2-0");
      fs.mkdirSync(aliasDir, { recursive: true });
      fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
      generatedCount++;
    }
    if (page.route === "solutions/iso-27001") {
      const aliasDir = path.join(DIST_DIR, "iso-27001");
      fs.mkdirSync(aliasDir, { recursive: true });
      fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
      generatedCount++;
    }
  }

  // 2. Fetch and pre-render all live Sanity blog posts
  const posts = await fetchSanityPosts();
  console.log(`[prerender] Fetched ${posts.length} blog posts from Sanity for SEO pre-rendering.`);

  for (const post of posts) {
    const postSlug = post.slug;
    if (!postSlug) continue;

    const postUrl = `${SITE_URL}/blog/${postSlug}`;
    const postTitle = `${post.title} | CertifyGRC Blog`;
    const postDesc = post.excerpt || `Read ${post.title} on CertifyGRC.`;
    const postCover = post.coverImageUrl || DEFAULT_OG_IMAGE;
    const authorName = post.author?.name || "CertifyGRC";
    const categories = (post.categories || []).map((c) => c.title).join(", ");
    const tags = (post.tags || []).join(", ");
    const keywords = [post.title, categories, tags, "NIST CSF 2.0", "ISO 27001", "GRC Compliance"]
      .filter(Boolean)
      .join(", ");

    // Schema.org BlogPosting
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      headline: post.title,
      description: postDesc,
      image: postCover,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt || post.publishedAt,
      author: {
        "@type": "Person",
        name: authorName,
        jobTitle: post.author?.role || "Compliance Specialist",
        url: post.author?.linkedIn || undefined,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/certifygrc-logo.png`,
        },
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    };

    /** @type {PageMeta} */
    const postMeta = {
      route: `blog/${postSlug}`,
      title: postTitle,
      description: postDesc,
      keywords,
      canonical: postUrl,
      ogImage: postCover,
      ogType: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      author: authorName,
      htmlBody: `
        <article>
          <header>
            <h1>${post.title}</h1>
            ${post.publishedAt ? `<p>Published on ${post.publishedAt.split("T")[0]} by ${authorName}</p>` : `<p>By ${authorName}</p>`}
            ${categories ? `<p>Category: ${categories}</p>` : ""}
          </header>
          <p class="lead">${post.excerpt || ""}</p>
          <p><a href="/blog">Return to CertifyGRC Blog</a> | <a href="/software">Explore CertifyGRC Platform</a></p>
        </article>
      `,
      jsonLd: [blogPostingSchema, breadcrumbSchema],
    };

    const postDir = path.join(DIST_DIR, "blog", postSlug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const postFile = path.join(postDir, "index.html");
    const renderedPostHtml = renderPage(postMeta);
    fs.writeFileSync(postFile, renderedPostHtml, "utf-8");
    console.log(`[prerender] Pre-rendered blog post: blog/${postSlug}/index.html`);
    generatedCount++;
  }

  // 3. Ensure dist/index.html (homepage & dynamic SPA fallback) has clean noscript fallback
  // with ZERO text inside #root so that visiting or reloading NEVER flashes unstyled text!
  const homeNoscript = `
    <noscript>
      <div class="static-seo-prerender">
        <header>
          <h1>CertifyGRC — Smarter Governance, Risk &amp; Compliance Platform</h1>
          <p>Enterprise compliance automation, continuous control monitoring, and hands-on vCISO advisory natively aligned with NIST CSF 2.0, ISO 27001, and SOC 2.</p>
        </header>
        <section>
          <h2>Enterprise Continuous Compliance Automation</h2>
          <p>CertifyGRC empowers modern security leaders with continuous control monitoring, automated cloud evidence collection, native NIST CSF 2.0 gap analysis, and certified vCISO advisory. Built for high-growth enterprises and regulated organizations.</p>
          <p><a href="/solutions/nist-csf-2-0">Explore NIST CSF 2.0 Solution</a> | <a href="/solutions/iso-27001">Explore ISO 27001 ISMS</a> | <a href="/software">Explore Software Platform</a></p>
        </section>
      </div>
    </noscript>
  `.trim();

  // Inject home fallback before </body> only if not already present
  let cleanHomeHtml = template;
  if (!cleanHomeHtml.includes("<noscript>")) {
    cleanHomeHtml = cleanHomeHtml.replace(/<\/body>/i, `  ${homeNoscript}\n</body>`);
  }
  fs.writeFileSync(TEMPLATE_PATH, cleanHomeHtml, "utf-8");
  console.log(`[prerender] Injected clean <noscript> SEO fallback into dist/index.html (Zero-FOUC).`);

  console.log(`[prerender] Successfully generated ${generatedCount + 1} static pre-rendered pages with zero FOUC.`);
}

run().catch((err) => {
  console.error("[prerender] Error during pre-rendering:", err);
});

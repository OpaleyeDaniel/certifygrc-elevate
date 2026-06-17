import type { SanityAuthor, SanityCategory, SanityPost, SanityTag } from "@/lib/sanity";
import { buildArticleBody } from "./portableText";
import { AUTHOR_AVATARS, BLOG_COVERS } from "./covers";

/** Extended post type for seed — coverImageUrl used when no Sanity asset */
export type SeedPost = SanityPost & {
  coverImageUrl?: string;
  authorAvatarUrl?: string;
  tagSlugs?: string[];
};

export const SEED_AUTHORS: SanityAuthor[] = [
  {
    _id: "seed-author-sarah",
    name: "Sarah Thompson",
    slug: { current: "sarah-thompson" },
    role: "Chief Information Security Officer",
    bio: "Sarah leads enterprise cybersecurity programs for Fortune 500 organizations. She specializes in NIST CSF 2.0 adoption, board-level risk reporting, and building audit-ready security operations.",
    linkedIn: "https://linkedin.com/in/sarah-thompson",
  },
  {
    _id: "seed-author-michael",
    name: "Michael Carter",
    slug: { current: "michael-carter" },
    role: "Director of Compliance",
    bio: "Michael has spent 15 years designing compliance programs across financial services and healthcare. He focuses on SOC 2, ISO 27001, and continuous control monitoring.",
    linkedIn: "https://linkedin.com/in/michael-carter",
  },
  {
    _id: "seed-author-david",
    name: "David Reynolds",
    slug: { current: "david-reynolds" },
    role: "Head of Internal Audit",
    bio: "David transforms internal audit functions with data-driven methodologies. He advises boards on control effectiveness and regulatory readiness.",
    linkedIn: "https://linkedin.com/in/david-reynolds",
  },
  {
    _id: "seed-author-jennifer",
    name: "Jennifer Kim",
    slug: { current: "jennifer-kim" },
    role: "Privacy & Data Protection Officer",
    bio: "Jennifer is a certified privacy professional with deep expertise in PIPEDA, GDPR, and cross-border data governance for multinational enterprises.",
    linkedIn: "https://linkedin.com/in/jennifer-kim",
  },
  {
    _id: "seed-author-alex",
    name: "Alex Morgan",
    slug: { current: "alex-morgan" },
    role: "Senior Risk Management Consultant",
    bio: "Alex helps organizations operationalize enterprise risk management frameworks, third-party risk programs, and quantitative risk analysis.",
    linkedIn: "https://linkedin.com/in/alex-morgan",
  },
];

export const SEED_CATEGORIES: SanityCategory[] = [
  { _id: "seed-cat-governance", title: "Governance", slug: { current: "governance" }, description: "Board oversight, policy, and corporate governance", color: "#6366f1" },
  { _id: "seed-cat-risk", title: "Risk Management", slug: { current: "risk-management" }, description: "Enterprise and operational risk strategies", color: "#8b5cf6" },
  { _id: "seed-cat-compliance", title: "Compliance", slug: { current: "compliance" }, description: "Regulatory compliance and audit readiness", color: "#06b6d4" },
  { _id: "seed-cat-cyber", title: "Cybersecurity", slug: { current: "cybersecurity" }, description: "Security operations and threat management", color: "#3b82f6" },
  { _id: "seed-cat-audit", title: "Internal Audit", slug: { current: "internal-audit" }, description: "Audit methodology and assurance", color: "#10b981" },
  { _id: "seed-cat-ai", title: "AI Governance", slug: { current: "ai-governance" }, description: "Responsible AI and model risk", color: "#f59e0b" },
  { _id: "seed-cat-privacy", title: "Privacy", slug: { current: "privacy" }, description: "Data protection and privacy programs", color: "#ec4899" },
  { _id: "seed-cat-regulatory", title: "Regulatory Updates", slug: { current: "regulatory-updates" }, description: "Latest regulatory changes and guidance", color: "#ef4444" },
  { _id: "seed-cat-iso", title: "ISO Standards", slug: { current: "iso-standards" }, description: "ISO 27001, 27701, and related standards", color: "#14b8a6" },
  { _id: "seed-cat-esg", title: "ESG", slug: { current: "esg" }, description: "Environmental, social, and governance reporting", color: "#22c55e" },
  { _id: "seed-cat-nist", title: "NIST CSF 2.0", slug: { current: "nist-csf-2" }, description: "NIST Cybersecurity Framework 2.0 guidance", color: "#6366f1" },
];

export const SEED_TAGS: SanityTag[] = [
  { _id: "seed-tag-nist", title: "NIST CSF", slug: { current: "nist-csf" } },
  { _id: "seed-tag-soc2", title: "SOC 2", slug: { current: "soc-2" } },
  { _id: "seed-tag-iso27001", title: "ISO 27001", slug: { current: "iso-27001" } },
  { _id: "seed-tag-board", title: "Board Reporting", slug: { current: "board-reporting" } },
  { _id: "seed-tag-tprm", title: "Third-Party Risk", slug: { current: "third-party-risk" } },
  { _id: "seed-tag-privacy", title: "Privacy", slug: { current: "privacy" } },
  { _id: "seed-tag-ai", title: "AI Governance", slug: { current: "ai-governance" } },
  { _id: "seed-tag-audit", title: "Internal Audit", slug: { current: "internal-audit" } },
];

const cat = (slug: string) => SEED_CATEGORIES.find((c) => c.slug.current === slug)!;
const author = (slug: string) => SEED_AUTHORS.find((a) => a.slug.current === slug)!;

const defaultBody = (topic: string) =>
  buildArticleBody([
    {
      heading: `Why ${topic} Matters in 2026`,
      paragraphs: [
        `Organizations face unprecedented pressure to demonstrate measurable progress on ${topic.toLowerCase()}. Regulators, customers, and boards now expect evidence—not assertions.`,
        `Leading GRC teams are shifting from periodic assessments to continuous assurance models. This requires integrated tooling, clear ownership, and executive sponsorship.`,
      ],
      bullets: [
        "Align controls to business-critical processes",
        "Automate evidence collection where possible",
        "Report outcomes in language executives understand",
      ],
    },
    {
      heading: "Practical Implementation Steps",
      paragraphs: [
        "Start with a baseline assessment against your target framework. Identify gaps, prioritize by risk, and assign accountable owners with defined timelines.",
      ],
      callout: {
        type: "tip",
        title: "CertifyGRC Insight",
        body: "Teams using integrated GRC platforms reduce audit preparation time by up to 60% compared to spreadsheet-based programs.",
      },
    },
    {
      heading: "Measuring Success",
      paragraphs: [
        "Define KPIs tied to control effectiveness, remediation velocity, and audit findings trend. Review quarterly with leadership and adjust the program based on outcomes.",
      ],
      quote: "Compliance is not a destination—it is a continuous discipline that protects trust.",
    },
  ]);

function post(
  id: string,
  data: Omit<SeedPost, "_id" | "_createdAt"> & { bodySections?: Parameters<typeof buildArticleBody>[0] },
): SeedPost {
  const { bodySections, ...rest } = data;
  return {
    _id: id,
    _createdAt: rest.publishedAt ?? new Date().toISOString(),
    body: bodySections ? buildArticleBody(bodySections) : defaultBody(rest.title),
    ...rest,
  };
}

export const SEED_POSTS: SeedPost[] = [
  post("seed-post-1", {
    title: "The Complete Guide to NIST CSF 2.0: What Every Security Leader Needs to Know",
    slug: { current: "complete-guide-nist-csf-2" },
    excerpt: "NIST CSF 2.0 introduces Govern as a core function and reshapes how organizations manage cybersecurity risk. Here is everything CISOs and GRC leaders need to implement it effectively.",
    coverImageUrl: BLOG_COVERS.nist,
    author: author("sarah-thompson"),
    authorAvatarUrl: AUTHOR_AVATARS.sarah,
    categories: [cat("nist-csf-2"), cat("cybersecurity")],
    tagSlugs: ["nist-csf"],
    publishedAt: "2026-05-28T09:00:00Z",
    readTime: 12,
    featured: true,
    bodySections: [
      {
        heading: "What Changed in NIST CSF 2.0",
        paragraphs: [
          "The National Institute of Standards and Technology released CSF 2.0 as a major evolution of the world's most adopted cybersecurity framework. The addition of the Govern function elevates cybersecurity to a board-level enterprise risk discipline.",
          "Unlike CSF 1.1, version 2.0 explicitly addresses supply chain risk, organizational context, and continuous improvement cycles that align with modern zero-trust architectures.",
        ],
        bullets: [
          "Six core functions: Govern, Identify, Protect, Detect, Respond, Recover",
          "Expanded guidance for small and mid-size organizations",
          "Integration pathways with ISO 27001 and SOC 2",
        ],
      },
      {
        heading: "Implementing Govern at Scale",
        paragraphs: [
          "The Govern function requires documented cybersecurity strategy, defined roles, and policy frameworks that connect security outcomes to business objectives. Most organizations fail here—not because they lack policies, but because policies are disconnected from operational controls.",
        ],
        callout: { type: "info", title: "Framework Mapping", body: "CertifyGRC maps all NIST CSF 2.0 subcategories to controls, evidence, and assessment workflows automatically." },
      },
      {
        heading: "Building Your CSF 2.0 Roadmap",
        paragraphs: [
          "Conduct a current-state assessment, establish target profiles for each business unit, and prioritize gaps by risk and regulatory exposure. Reassess quarterly and report progress using tier-appropriate metrics.",
        ],
        quote: "NIST CSF 2.0 is not a checklist—it is a language for communicating cyber resilience across the enterprise.",
      },
    ],
  }),
  post("seed-post-2", {
    title: "ISO 27001 vs NIST CSF 2.0: Which Framework Is Right for Your Organization?",
    slug: { current: "iso-27001-vs-nist-csf-2" },
    excerpt: "Choosing between ISO 27001 certification and NIST CSF 2.0 alignment is one of the most common decisions GRC leaders face. This guide breaks down the trade-offs.",
    coverImageUrl: BLOG_COVERS.iso,
    author: author("michael-carter"),
    authorAvatarUrl: AUTHOR_AVATARS.michael,
    categories: [cat("iso-standards"), cat("nist-csf-2")],
    tagSlugs: ["iso-27001", "nist-csf"],
    publishedAt: "2026-05-22T10:00:00Z",
    readTime: 9,
    featured: true,
  }),
  post("seed-post-3", {
    title: "SOC 2 Type II in 90 Days: The Accelerated Compliance Roadmap",
    slug: { current: "soc2-type-ii-90-days-roadmap" },
    excerpt: "A practical week-by-week roadmap for achieving SOC 2 Type II readiness without burning out your team or cutting corners on control design.",
    coverImageUrl: BLOG_COVERS.compliance,
    author: author("michael-carter"),
    authorAvatarUrl: AUTHOR_AVATARS.michael,
    categories: [cat("compliance")],
    tagSlugs: ["soc-2"],
    publishedAt: "2026-05-15T11:00:00Z",
    readTime: 11,
    featured: true,
  }),
  post("seed-post-4", {
    title: "How to Present Cybersecurity Risk to Your Board: A CISO's Playbook",
    slug: { current: "present-cybersecurity-risk-board-ciso-playbook" },
    excerpt: "Board members need clarity, not jargon. Learn how to translate technical risk into business impact narratives that drive informed decisions.",
    coverImageUrl: BLOG_COVERS.board,
    author: author("sarah-thompson"),
    authorAvatarUrl: AUTHOR_AVATARS.sarah,
    categories: [cat("governance"), cat("cybersecurity")],
    tagSlugs: ["board-reporting"],
    publishedAt: "2026-05-08T09:30:00Z",
    readTime: 8,
    featured: true,
  }),
  post("seed-post-5", {
    title: "AI Governance in 2026: The GRC Professional's Complete Handbook",
    slug: { current: "ai-governance-grc-handbook-2026" },
    excerpt: "From model inventory to bias testing and regulatory compliance—everything GRC teams need to govern AI responsibly across the enterprise.",
    coverImageUrl: BLOG_COVERS.ai,
    author: author("jennifer-kim"),
    authorAvatarUrl: AUTHOR_AVATARS.jennifer,
    categories: [cat("ai-governance"), cat("governance")],
    tagSlugs: ["ai-governance"],
    publishedAt: "2026-05-01T14:00:00Z",
    readTime: 14,
  }),
  post("seed-post-6", {
    title: "Building a Third-Party Risk Management Program That Actually Works",
    slug: { current: "third-party-risk-management-program-2026" },
    excerpt: "Vendor breaches are board-level events. Here is how to design a TPRM program with tiered assessments, continuous monitoring, and executive accountability.",
    coverImageUrl: BLOG_COVERS.thirdParty,
    author: author("alex-morgan"),
    authorAvatarUrl: AUTHOR_AVATARS.alex,
    categories: [cat("risk-management")],
    tagSlugs: ["third-party-risk"],
    publishedAt: "2026-04-24T10:00:00Z",
    readTime: 10,
  }),
  post("seed-post-7", {
    title: "PIPEDA Compliance Checklist for Canadian Organizations",
    slug: { current: "pipeda-compliance-checklist-canadian-organizations" },
    excerpt: "A comprehensive checklist covering consent management, breach notification, cross-border transfers, and privacy impact assessments under PIPEDA.",
    coverImageUrl: BLOG_COVERS.privacy,
    author: author("jennifer-kim"),
    authorAvatarUrl: AUTHOR_AVATARS.jennifer,
    categories: [cat("privacy"), cat("regulatory-updates")],
    tagSlugs: ["privacy"],
    publishedAt: "2026-04-18T09:00:00Z",
    readTime: 7,
  }),
  post("seed-post-8", {
    title: "Internal Audit Automation: How GRC Platforms Transform Assurance",
    slug: { current: "internal-audit-automation-grc-platforms" },
    excerpt: "Modern internal audit teams are replacing manual workpapers with continuous testing, AI-assisted sampling, and real-time control monitoring.",
    coverImageUrl: BLOG_COVERS.audit,
    author: author("david-reynolds"),
    authorAvatarUrl: AUTHOR_AVATARS.david,
    categories: [cat("internal-audit")],
    tagSlugs: ["internal-audit"],
    publishedAt: "2026-04-10T11:00:00Z",
    readTime: 9,
  }),
  post("seed-post-9", {
    title: "Integrating ESG Reporting Into Your Governance Framework",
    slug: { current: "esg-reporting-governance-integration" },
    excerpt: "ESG is no longer optional for public companies. Learn how to connect sustainability metrics with existing GRC infrastructure and board reporting.",
    coverImageUrl: BLOG_COVERS.esg,
    author: author("david-reynolds"),
    authorAvatarUrl: AUTHOR_AVATARS.david,
    categories: [cat("esg"), cat("governance")],
    publishedAt: "2026-04-03T10:00:00Z",
    readTime: 8,
  }),
  post("seed-post-10", {
    title: "Zero Trust Architecture: Mapping Controls to NIST CSF 2.0",
    slug: { current: "zero-trust-architecture-nist-csf-mapping" },
    excerpt: "Zero trust is a strategy, not a product. This guide maps zero trust pillars to NIST CSF 2.0 functions for audit-ready implementation.",
    coverImageUrl: BLOG_COVERS.zeroTrust,
    author: author("sarah-thompson"),
    authorAvatarUrl: AUTHOR_AVATARS.sarah,
    categories: [cat("nist-csf-2"), cat("cybersecurity")],
    tagSlugs: ["nist-csf"],
    publishedAt: "2026-03-27T09:00:00Z",
    readTime: 11,
  }),
  post("seed-post-11", {
    title: "GDPR Data Protection Impact Assessments: A Practical Guide",
    slug: { current: "gdpr-dpia-practical-guide" },
    excerpt: "When DPIAs are required, how to conduct them effectively, and how to integrate outcomes into your enterprise privacy program.",
    coverImageUrl: BLOG_COVERS.privacy,
    author: author("jennifer-kim"),
    authorAvatarUrl: AUTHOR_AVATARS.jennifer,
    categories: [cat("privacy"), cat("regulatory-updates")],
    tagSlugs: ["privacy"],
    publishedAt: "2026-03-20T10:00:00Z",
    readTime: 10,
  }),
  post("seed-post-12", {
    title: "PCI DSS 4.0 Readiness Guide for Merchants and Service Providers",
    slug: { current: "pci-dss-4-merchants-readiness-guide" },
    excerpt: "PCI DSS 4.0 introduces customized validation approaches and enhanced MFA requirements. Here is your readiness checklist.",
    coverImageUrl: BLOG_COVERS.pci,
    author: author("michael-carter"),
    authorAvatarUrl: AUTHOR_AVATARS.michael,
    categories: [cat("compliance"), cat("regulatory-updates")],
    publishedAt: "2026-03-13T11:00:00Z",
    readTime: 9,
  }),
  post("seed-post-13", {
    title: "Continuous Control Monitoring vs. Periodic Assessments",
    slug: { current: "continuous-control-monitoring-vs-periodic-assessments" },
    excerpt: "Why leading organizations are moving from annual assessments to continuous control monitoring—and how to make the transition.",
    coverImageUrl: BLOG_COVERS.compliance,
    author: author("alex-morgan"),
    authorAvatarUrl: AUTHOR_AVATARS.alex,
    categories: [cat("risk-management"), cat("compliance")],
    publishedAt: "2026-03-06T09:00:00Z",
    readTime: 8,
  }),
  post("seed-post-14", {
    title: "Board Governance for Cybersecurity Oversight in 2026",
    slug: { current: "board-governance-cybersecurity-oversight" },
    excerpt: "Regulators expect boards to demonstrate active cyber oversight. This article covers committee structures, reporting cadences, and accountability models.",
    coverImageUrl: BLOG_COVERS.governance,
    author: author("sarah-thompson"),
    authorAvatarUrl: AUTHOR_AVATARS.sarah,
    categories: [cat("governance")],
    tagSlugs: ["board-reporting"],
    publishedAt: "2026-02-27T10:00:00Z",
    readTime: 7,
  }),
  post("seed-post-15", {
    title: "Designing Incident Response Tabletop Exercises That Drive Improvement",
    slug: { current: "incident-response-tabletop-exercises" },
    excerpt: "Tabletop exercises fail when they are checkbox activities. Learn how to design scenarios that expose gaps and improve response readiness.",
    coverImageUrl: BLOG_COVERS.incident,
    author: author("david-reynolds"),
    authorAvatarUrl: AUTHOR_AVATARS.david,
    categories: [cat("cybersecurity"), cat("internal-audit")],
    publishedAt: "2026-02-20T11:00:00Z",
    readTime: 9,
  }),
];

export function getSeedFeaturedPost(): SeedPost | null {
  return SEED_POSTS.find((p) => p.featured) ?? SEED_POSTS[0] ?? null;
}

export function getSeedFeaturedPosts(limit = 3): SeedPost[] {
  const featured = SEED_POSTS.filter((p) => p.featured);
  return featured.slice(0, limit);
}

export function getSeedPostBySlug(slug: string): SeedPost | null {
  return SEED_POSTS.find((p) => p.slug.current === slug || (p.slug as unknown as string) === slug) ?? null;
}

export function getSeedPostsByCategory(categorySlug: string): SeedPost[] {
  return SEED_POSTS.filter((p) =>
    p.categories?.some((c) => c.slug.current === categorySlug || (c.slug as unknown as string) === categorySlug),
  );
}

export function searchSeedPosts(query: string): SeedPost[] {
  const q = query.toLowerCase();
  return SEED_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.categories?.some((c) => c.title.toLowerCase().includes(q)),
  );
}

export function getSeedRelatedPosts(slug: string, categorySlugs: string[]): SeedPost[] {
  return SEED_POSTS.filter(
    (p) =>
      p.slug.current !== slug &&
      p.categories?.some((c) => categorySlugs.includes(c.slug.current ?? (c.slug as unknown as string))),
  ).slice(0, 3);
}

export function getSeedPostsByAuthor(authorSlug: string, excludeSlug?: string): SeedPost[] {
  return SEED_POSTS.filter(
    (p) =>
      p.author?.slug.current === authorSlug &&
      p.slug.current !== excludeSlug,
  ).slice(0, 3);
}

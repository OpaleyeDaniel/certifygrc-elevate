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

/**
 * @typedef {Object} PageMeta
 * @property {string} route
 * @property {string} title
 * @property {string} description
 * @property {string} keywords
 * @property {string} canonical
 * @property {string} heading
 * @property {string} subheading
 * @property {string} htmlBody
 */

/** @type {PageMeta[]} */
const PAGES = [
  {
    route: "compare",
    title: "CertifyGRC vs. Vanta vs. Drata: 2026 Compliance Platform Comparison",
    description:
      "Detailed 2026 comparison between CertifyGRC, Vanta, and Drata. Evaluate NIST CSF 2.0 alignment, ISO 27001, SOC 2, pricing models, and hybrid advisory support.",
    keywords:
      "Vanta alternative, Drata alternative, CertifyGRC vs Vanta, CertifyGRC vs Drata, NIST CSF 2.0 platform, GRC software comparison, SOC 2 compliance tool, ISO 27001 automation, best vCISO advisory",
    canonical: `${SITE_URL}/compare`,
    heading: "The Modern Alternative to Vanta & Drata",
    subheading:
      "Why compliance teams and regulated organizations choose CertifyGRC for comprehensive NIST CSF 2.0, ISO 27001, and SOC 2 — combining intelligent SaaS automation with hands-on vCISO advisory.",
    htmlBody: `
      <section class="compare-hero">
        <h1>The Modern Alternative to Vanta &amp; Drata</h1>
        <p>CertifyGRC provides automated continuous evidence collection, cloud integrations, and audit readiness workflows just like Vanta and Drata. However, CertifyGRC is a hybrid platform: we combine SaaS automation with hands-on vCISO advisory and built-in workforce training (CyberDrill), ensuring you are not left alone to interpret frameworks or negotiate with auditors.</p>
        <p><strong>Primary Differentiators:</strong></p>
        <ul>
          <li><strong>Native NIST CSF 2.0 Architecture:</strong> Complete coverage across all 6 core functions (Govern, Identify, Protect, Detect, Respond, Recover) and 106 subcategories.</li>
          <li><strong>Hybrid Delivery Model:</strong> Software automation plus certified GRC practitioners who draft policies, review evidence, and defend audits.</li>
          <li><strong>Built-in CyberDrill:</strong> Role-based security simulations, phishing drills, and tabletop exercises without expensive add-on licenses.</li>
          <li><strong>Multi-Framework Control Deduplication:</strong> Test once, comply across NIST CSF 2.0, ISO 27001, SOC 2, PCI DSS, OSFI B-10/B-13, and ISO 42001.</li>
          <li><strong>Transparent Commercials:</strong> No forced 3-year contracts, no hidden auditor portal seat fees, and scalable modular pricing.</li>
        </ul>
      </section>

      <section class="compare-table-section">
        <h2>Feature &amp; Capability Comparison Matrix</h2>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Feature / Requirement</th>
              <th>CertifyGRC</th>
              <th>Vanta</th>
              <th>Drata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>NIST CSF 2.0 Native Coverage</strong></td>
              <td>Full 106 subcategories including Govern (GV)</td>
              <td>Partial / secondary mapping from SOC 2</td>
              <td>Partial / common control framework</td>
            </tr>
            <tr>
              <td><strong>Delivery Model</strong></td>
              <td>Hybrid: SaaS Automation + vCISO Advisory</td>
              <td>Software Only (Tool-only subscription)</td>
              <td>Software Only (Tool-only subscription)</td>
            </tr>
            <tr>
              <td><strong>Policy Writing &amp; Customization</strong></td>
              <td>Included; certified practitioners draft policies</td>
              <td>Requires hiring external consulting partner</td>
              <td>Requires hiring external consulting partner</td>
            </tr>
            <tr>
              <td><strong>Auditor Defense Representation</strong></td>
              <td>Experts represent you on auditor calls</td>
              <td>Software portal only</td>
              <td>Auditor partner directory only</td>
            </tr>
            <tr>
              <td><strong>Workforce CyberDrill (Phishing &amp; Drills)</strong></td>
              <td>Included natively with tabletop drills</td>
              <td>Paid add-on module or 3rd-party LMS</td>
              <td>Basic static video modules only</td>
            </tr>
            <tr>
              <td><strong>Canadian &amp; Global Banking (OSFI B-10/B-13)</strong></td>
              <td>Native regulatory support</td>
              <td>Limited / US-centric focus</td>
              <td>Limited / US-centric focus</td>
            </tr>
            <tr>
              <td><strong>AI Governance (ISO 42001 &amp; NIST AI RMF)</strong></td>
              <td>Supported with AI risk assessments</td>
              <td>Limited / Early roadmap</td>
              <td>Limited / Early roadmap</td>
            </tr>
            <tr>
              <td><strong>Multi-Framework Deduplication</strong></td>
              <td>Yes: Test once, comply everywhere</td>
              <td>Yes: Across supported frameworks</td>
              <td>Yes: Across supported frameworks</td>
            </tr>
            <tr>
              <td><strong>Contract Flexibility</strong></td>
              <td>Modular, transparent, no forced lock-in</td>
              <td>High annual upfront ($15k–$30k+) + renewal hikes</td>
              <td>High annual upfront ($15k–$25k+) + module fees</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <article>
          <h3>Is CertifyGRC a direct alternative to Vanta and Drata?</h3>
          <p>Yes. CertifyGRC provides automated continuous evidence collection, cloud integrations, and audit readiness workflows just like Vanta and Drata, but includes hands-on advisory and employee CyberDrills.</p>
        </article>
        <article>
          <h3>How does CertifyGRC compare for NIST CSF 2.0?</h3>
          <p>CertifyGRC was architected natively around NIST CSF 2.0 with full out-of-the-box coverage for all six core functions: Govern, Identify, Protect, Detect, Respond, and Recover across 106 subcategories.</p>
        </article>
        <article>
          <h3>Can we easily migrate from Vanta or Drata?</h3>
          <p>Yes. Our migration team ingests your historical evidence, existing policies, and cloud infrastructure connections within 48 hours without disrupting your ongoing audit schedule.</p>
        </article>
      </section>
    `,
  },
  {
    route: "compare/vanta-alternative",
    title: "Best Vanta Alternative for NIST CSF 2.0 & Continuous GRC | CertifyGRC",
    description:
      "Looking for an alternative to Vanta? Discover why organizations switch to CertifyGRC for comprehensive NIST CSF 2.0 coverage, hands-on vCISO advisory, and employee CyberDrills.",
    keywords:
      "Vanta alternative, replace Vanta, switch from Vanta, Vanta competitors, Vanta vs CertifyGRC, NIST CSF 2.0 software, automated GRC platform, SOC 2 automation, vCISO advisory",
    canonical: `${SITE_URL}/compare/vanta-alternative`,
    heading: "The Leading Vanta Alternative for 2026",
    subheading:
      "Why security leaders and high-growth enterprises are switching from Vanta to CertifyGRC for true hybrid compliance automation and hands-on advisory.",
    htmlBody: `
      <section>
        <h1>The Leading Vanta Alternative for NIST CSF 2.0 &amp; GRC</h1>
        <p>Vanta pioneered automated evidence collection for early-stage startups pursuing their initial SOC 2 audit. However, as organizations mature and face enterprise scrutiny, they often find that Vanta is strictly a tool: you are still responsible for drafting custom policies, conducting complex risk assessments, interpreting NIST CSF 2.0, and defending controls during audit inquiries.</p>
        <h2>Why Organizations Switch from Vanta to CertifyGRC</h2>
        <ul>
          <li><strong>Hands-on vCISO Advisory Included:</strong> We don't just alert you to gaps; our certified GRC practitioners write your policies, tune your technical controls, and participate directly in auditor calls.</li>
          <li><strong>Native NIST CSF 2.0 Implementation:</strong> Unlike Vanta's retrofitted SOC 2 baseline, CertifyGRC has deep native mapping across all 6 NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover).</li>
          <li><strong>CyberDrill Built In:</strong> Realistic phishing simulations and tabletop incident exercises are included natively—no costly third-party add-on licenses required.</li>
          <li><strong>Transparent Pricing:</strong> No surprise renewal markups or multi-year contractual lock-in.</li>
        </ul>
        <h2>3-Step Migration from Vanta</h2>
        <p>1. Export your existing policies and evidence from Vanta. 2. Our engineering team ingests and cross-maps your controls into CertifyGRC within 48 hours. 3. Launch continuous monitoring with zero audit downtime.</p>
      </section>
    `,
  },
  {
    route: "compare/drata-alternative",
    title: "Best Drata Alternative for Enterprise Compliance & NIST | CertifyGRC",
    description:
      "Compare CertifyGRC vs Drata. Discover how CertifyGRC combines automated evidence collection with expert human advisory and built-in tabletop simulations.",
    keywords:
      "Drata alternative, replace Drata, switch from Drata, Drata competitors, Drata vs CertifyGRC, NIST CSF 2.0 software, enterprise compliance platform, OSFI B-10 compliance, vCISO services",
    canonical: `${SITE_URL}/compare/drata-alternative`,
    heading: "The Top Drata Alternative for Enterprise GRC",
    subheading:
      "Break free from rigid compliance workflows and high renewal fees. CertifyGRC delivers unified control deduplication, NIST CSF 2.0 native depth, and dedicated vCISO advisory.",
    htmlBody: `
      <section>
        <h1>The Top Drata Alternative for Enterprise Compliance</h1>
        <p>While Drata offers a modern interface for automated evidence gathering, companies frequently encounter rigid control templates, steep renewal price escalations, and gaps when addressing specialized regulatory standards like NIST CSF 2.0 Govern, OSFI B-10/B-13, and ISO 42001 (AI Management).</p>
        <h2>Why Choose CertifyGRC Over Drata?</h2>
        <ul>
          <li><strong>Holistic Governance:</strong> Built-in support for the complete NIST CSF 2.0 framework and Canadian/Global financial guidelines (OSFI B-10, B-13, PIPEDA).</li>
          <li><strong>Hybrid Expert Delivery:</strong> A dedicated compliance architect works alongside your team to craft policies and represent your security posture to enterprise auditors.</li>
          <li><strong>Integrated CyberDrills:</strong> Phishing awareness and executive tabletop simulations included out of the box.</li>
          <li><strong>Test Once, Comply Everywhere:</strong> Evidence collected from AWS, Azure, GCP, GitHub, and identity providers automatically maps across multiple frameworks simultaneously.</li>
        </ul>
      </section>
    `,
  },
  {
    route: "frameworks",
    title: "Compliance Frameworks | NIST CSF 2.0, ISO 27001, SOC 2, OSFI | CertifyGRC",
    description:
      "Comprehensive compliance framework mapping: NIST CSF 2.0 (Govern to Recover), ISO 27001:2022, SOC 2, PCI DSS 4.0, OSFI B-10 & B-13, and ISO 42001.",
    keywords:
      "NIST CSF 2.0 framework, ISO 27001 compliance, SOC 2 Type II, PCI DSS 4.0, OSFI B-10, OSFI B-13, ISO 42001 AI governance, PIPEDA, HIPAA compliance software",
    canonical: `${SITE_URL}/frameworks`,
    heading: "Supported Compliance Frameworks & Standards",
    subheading:
      "CertifyGRC maps evidence across the world's most demanding cybersecurity and regulatory standards from a single unified control framework.",
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
      </section>
    `,
  },
  {
    route: "software",
    title: "CertifyGRC Software | Continuous Compliance & Risk Automation Platform",
    description:
      "Automate compliance, control monitoring, risk registers, and audit readiness across NIST CSF 2.0, ISO 27001, and SOC 2. The smarter alternative to Vanta and Drata.",
    keywords:
      "GRC software, compliance automation platform, continuous control monitoring, risk register software, audit readiness tool, Vanta alternative software",
    canonical: `${SITE_URL}/software`,
    heading: "Intelligent GRC Software Platform",
    subheading:
      "Connect your cloud environment, automate evidence polling, track maturity, and collaborate with auditors inside one unified workspace.",
    htmlBody: `
      <section>
        <h1>CertifyGRC Compliance &amp; Risk Platform</h1>
        <p>Continuous evidence synchronization across AWS, Azure, Google Cloud, GitHub, GitLab, Okta, and Microsoft 365. Automated gap analysis, risk registers, and real-time posture reporting.</p>
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
    heading: "vCISO & Strategic Compliance Advisory",
    subheading:
      "Expert cybersecurity leadership without full-time executive overhead. Program design, policy authoring, and auditor representation.",
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
    heading: "CyberDrill: Training & Incident Simulations",
    subheading:
      "Transform human risk into an active line of defense with realistic phishing campaigns and tabletop drills.",
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
    heading: "Free NIST CSF 2.0 Posture Assessment",
    subheading:
      "Evaluate your security maturity across all six NIST CSF 2.0 functions in 2 minutes and receive an instant gap breakdown.",
    htmlBody: `
      <section>
        <h1>Free NIST CSF 2.0 Security Posture Assessment</h1>
        <p>Take our 2-minute diagnostic quiz to evaluate your security posture across Govern, Identify, Protect, Detect, Respond, and Recover. Receive instant maturity scoring, gap insights, and recommended remediation steps.</p>
      </section>
    `,
  },
];

// Helper to replace or inject tags in template
function renderPage(meta) {
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace or add <meta name="description">
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${meta.description}" />`,
    );
  }

  // Replace or add <meta name="keywords">
  if (html.includes('name="keywords"')) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${meta.keywords}" />`,
    );
  }

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${meta.canonical}" />`,
  );

  // Replace OpenGraph
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${meta.canonical}" />`,
  );

  // Replace Twitter
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );

  // Inject crawlable semantic body into <div id="root">
  const renderedRoot = `
    <div id="root">
      <main class="static-seo-prerender" style="display: block;">
        ${meta.htmlBody}
      </main>
    </div>
  `.trim();

  html = html.replace(/<div\s+id="root">\s*<\/div>/i, renderedRoot);

  return html;
}

// Generate static files
let generatedCount = 0;

for (const page of PAGES) {
  const targetDir = path.join(DIST_DIR, page.route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, "index.html");
  const renderedHtml = renderPage(page);
  fs.writeFileSync(targetFile, renderedHtml, "utf-8");
  console.log(`[prerender] Generated static HTML: ${page.route}/index.html`);
  generatedCount++;

  // Also create aliases if applicable (e.g. /vanta-alternative and /drata-alternative)
  if (page.route === "compare/vanta-alternative") {
    const aliasDir = path.join(DIST_DIR, "vanta-alternative");
    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
    console.log(`[prerender] Generated static HTML alias: vanta-alternative/index.html`);
    generatedCount++;
  }
  if (page.route === "compare/drata-alternative") {
    const aliasDir = path.join(DIST_DIR, "drata-alternative");
    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
    console.log(`[prerender] Generated static HTML alias: drata-alternative/index.html`);
    generatedCount++;
  }
}

// Also enhance dist/index.html (homepage) with rich crawlable semantic fallback!
const homePrerender = `
  <div id="root">
    <main class="static-seo-prerender">
      <header>
        <h1>CertifyGRC — Smarter Governance, Risk &amp; Compliance Platform</h1>
        <p>Enterprise compliance automation, continuous control monitoring, and hands-on vCISO advisory natively aligned with NIST CSF 2.0, ISO 27001, and SOC 2.</p>
      </header>
      <section>
        <h2>The Modern Alternative to Vanta &amp; Drata</h2>
        <p>Why compliance leaders choose CertifyGRC over legacy software-only checklists: comprehensive NIST CSF 2.0 native depth (all 6 functions: Govern, Identify, Protect, Detect, Respond, Recover), integrated vCISO advisory, and native CyberDrill employee security training.</p>
        <p><a href="/compare">Compare CertifyGRC vs. Vanta &amp; Drata</a> | <a href="/compare/vanta-alternative">Vanta Alternative Guide</a> | <a href="/compare/drata-alternative">Drata Alternative Guide</a></p>
      </section>
      <section>
        <h2>Compliance Standards Supported</h2>
        <ul>
          <li>NIST CSF 2.0 (Govern, Identify, Protect, Detect, Respond, Recover)</li>
          <li>ISO/IEC 27001:2022 ISMS</li>
          <li>SOC 2 (Type I &amp; Type II) Trust Services Criteria</li>
          <li>PCI DSS 4.0</li>
          <li>OSFI Guidelines B-10 &amp; B-13</li>
          <li>ISO 42001 (Artificial Intelligence Management) &amp; NIST AI RMF</li>
          <li>PIPEDA, HIPAA, and GDPR</li>
        </ul>
        <p><a href="/free-assessment">Take the Free 2-Minute NIST CSF 2.0 Posture Quiz</a></p>
      </section>
    </main>
  </div>
`.trim();

const updatedHomeHtml = template.replace(/<div\s+id="root">\s*<\/div>/i, homePrerender);
fs.writeFileSync(TEMPLATE_PATH, updatedHomeHtml, "utf-8");
console.log(`[prerender] Injected rich semantic SEO crawl fallback into dist/index.html`);

console.log(`[prerender] Successfully generated ${generatedCount + 1} static pre-rendered pages.`);

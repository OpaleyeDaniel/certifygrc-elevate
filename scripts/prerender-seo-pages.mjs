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
    route: "solutions/nist-csf-2-0",
    title: "NIST CSF 2.0 Compliance Software & Continuous Gap Analysis Platform | CertifyGRC",
    description:
      "The premier enterprise software platform for NIST CSF 2.0 implementation. Native mapping across Govern, Identify, Protect, Detect, Respond, and Recover with automated gap analysis and audit readiness.",
    keywords:
      "NIST CSF 2.0 software, NIST CSF platform, NIST CSF compliance tool, NIST CSF 2.0 gap analysis, NIST Cybersecurity Framework automation, NIST maturity assessment, Govern function NIST, OneTrust alternative, Hyperproof alternative",
    canonical: `${SITE_URL}/solutions/nist-csf-2-0`,
    heading: "Enterprise NIST CSF 2.0 Software & Maturity Automation",
    subheading:
      "Master cybersecurity governance, continuous gap analysis, and risk mitigation across all six core NIST CSF 2.0 functions.",
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
    heading: "Streamlined ISO 27001:2022 Compliance & ISMS Automation",
    subheading:
      "Accelerate certification and maintain continuous compliance across all 93 Annex A controls with real-time Statement of Applicability generation.",
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
    heading: "Intelligent GRC & Compliance Automation Software",
    subheading:
      "Connect your cloud environment, automate evidence polling, track maturity, and collaborate with auditors inside one unified workspace.",
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
  if (page.route === "solutions/nist-csf-2-0") {
    const aliasDir = path.join(DIST_DIR, "nist-csf-2-0");
    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
    console.log(`[prerender] Generated static HTML alias: nist-csf-2-0/index.html`);
    generatedCount++;
  }
  if (page.route === "solutions/iso-27001") {
    const aliasDir = path.join(DIST_DIR, "iso-27001");
    fs.mkdirSync(aliasDir, { recursive: true });
    fs.writeFileSync(path.join(aliasDir, "index.html"), renderedHtml, "utf-8");
    console.log(`[prerender] Generated static HTML alias: iso-27001/index.html`);
    generatedCount++;
  }
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
        <h2>Enterprise Continuous Compliance Automation</h2>
        <p>CertifyGRC empowers modern security leaders with continuous control monitoring, automated cloud evidence collection, native NIST CSF 2.0 gap analysis, and certified vCISO advisory. Built for high-growth enterprises and regulated organizations.</p>
        <p><a href="/solutions/nist-csf-2-0">Explore NIST CSF 2.0 Solution</a> | <a href="/solutions/iso-27001">Explore ISO 27001 ISMS</a> | <a href="/software">Explore Software Platform</a></p>
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

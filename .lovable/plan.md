

# CertifyGRC — Premium Enterprise SaaS Platform Website

## Design System
- **Dark mode (default):** Deep Obsidian (#020617) background, Slate (#1E293B) glassmorphism cards, Electric Indigo (#6366F1) primary, Sky Blue (#38BDF8) accents, Off-white (#F8FAFC) text
- **Light mode:** White (#F8FAFC) bg, Pure White (#FFFFFF) surfaces, Deep Navy (#0F172A) text
- **Typography:** Inter Tight for headlines, Inter for body. Strong hierarchy with -0.02em tracking on display
- **Motion:** 200ms ease-out transitions, subtle parallax, hover glow/lift micro-interactions
- **Theme toggle** with smooth CSS transitions stored in localStorage

---

## Pages & Routing

### 1. Homepage (`/`) — The Flagship
**Sticky Navbar** — Glassmorphism blur, 70% opacity. Logo left, nav center (Home, Software, Consulting, E-Learning, Contact), theme toggle + "Book Demo" + "Book Consultation" CTAs right. Mobile hamburger menu.

**Hero Section** — Split-level layout:
- Headline: "Smarter Governance. Safer Decisions."
- Sub: "Practical GRC Solutions — Simplified, Intelligent, Secure"
- Body: Enhanced CertifyGRC copy about their comprehensive GRC ecosystem
- Two CTAs: Book Demo (primary indigo) + Book Consultation (outlined)
- Right side: Floating dashboard mockup with animated risk score cards, compliance status indicators, and heat map elements

**Trust Bar** — Scrolling logo carousel of partner/client placeholders with credibility statement: "Trusted by regulated organizations across finance, healthcare, and government"

**Three Pillars Section** — Bento grid showcasing CertifyGRC's 3 integrated pillars:
1. Software Platform — real-time compliance tracking, risk monitoring
2. Consulting Services — framework-agnostic advisory
3. E-Learning — professional development & certification

**Features Section** — Bento grid of 7 feature cards with icons, glow borders:
- Automated Compliance Workflows
- Real-Time Risk Insights
- Audit Management System
- Policy & Control Management
- AI-Powered Recommendations
- Integration Ready APIs
- Role-Based Access Control

**Consulting Services Preview** — Cards with hover animations for: IT Service Management (ITIL/ISO 20000), IT Governance (COBIT/ISO 38500), Information & Cybersecurity (NIST CSF/SOC 2/ISO 27001), Business Continuity (BCI GPG/ISO 22301), Payment Security (PCI DSS), Privacy & Data Protection (PIPEDA/NIST Privacy), AI Governance (NIST AI RMF/ISO 42001), Enterprise Architecture, Agile PM, OSFI Compliance

**Compliance Frameworks** — Glowing badge cloud/carousel: NIST CSF, ISO 27001, SOC 2, PCI DSS, COBIT, NIST AI RMF, ISO 20000, ISO 22301 — expand on hover with brief description

**Why CertifyGRC** — Enhanced messaging cards:
- Execution-First Delivery
- Built for Regulated Environments
- Framework-Agnostic, Risk-Driven
- Consulting + SaaS Advantage
- Business-Aligned Governance
- Future-Ready by Design

**Industries Served** — Icon grid: Government, Healthcare, IT & Cybersecurity, Finance & Banking, Manufacturing, SMEs

**Product Experience** — Dashboard UI mockup section with dark/light preview toggle showing charts, compliance gauges, alert panels

**Pricing Section** — 3-tier premium pricing cards (Starter, Growth, Enterprise) with feature lists, all showing "Coming Soon" instead of prices. Enterprise card highlighted with glow

**Final CTA Block** — "Ready to simplify your compliance?" with Book Demo + Book Consultation buttons, subtle background gradient animation

### 2. Software Page (`/software`)
- Hero with platform overview
- Interactive dashboard preview mockup
- Feature deep-dives with visual explanations
- Integration ecosystem section
- CTA to Book Demo

### 3. Consulting Services Page (`/consulting`)
- Hero: "Confidence Through Compliance"
- Service cards for all 10 consulting areas with frameworks, descriptions, and "Learn More" modals
- Each card: icon, framework badges, hover animation

### 4. E-Learning Page (`/e-learning`)
- Hero with learning platform preview
- Course category cards: ISO Training, Cybersecurity, Governance, AI & Emerging Tech
- All marked "Coming Soon" or "Explore Courses"
- CTA for early access

### 5. Contact Page (`/contact`)
- Hero banner
- Contact info: 325 Front St W, Suite 300, Toronto, ON M5V 2Y1 | info@certifygrc.com | +1 (942) 788-2515
- Interactive contact form (Name, Email, Subject, Message)
- Support categories: Sales, Technical Support, Partnerships
- FAQ accordion section
- Social links

### 6. Partner Page (`/partner`)
- Multi-step partner application form with progress indicator
- Fields from original site, clean UX

## Modals
- **Book Demo Modal** — Clean form: Name, Email, Company, Interest dropdown
- **Book Consultation Modal** — Similar minimal form with area of interest selection

## Footer
- Logo, nav links (all pages), contact info, social icons, legal links (Privacy, Terms)
- "CertifyGRC is a trading name under SandBP Canada"

## Technical Notes
- Built with React + Vite + Tailwind (not Next.js — Lovable's stack)
- Component-based architecture with shared UI components
- All content is static/frontend-only — no backend needed
- Responsive mobile-first design throughout
- CSS custom properties for theme switching
- Framer Motion-style animations via Tailwind animate utilities


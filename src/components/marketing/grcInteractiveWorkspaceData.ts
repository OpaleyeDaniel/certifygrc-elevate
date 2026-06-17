import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BarChart3,
  ClipboardCheck,
  FileSearch,
  FolderOpen,
  LayoutDashboard,
  ShieldCheck,
  TriangleAlert,
  LogIn,
  FileText,
  AlertCircle,
} from "lucide-react";

export type WorkspaceStep = {
  id: string;
  tabLabel: string;
  icon: LucideIcon;
  imageSrc: string;
  imageAlt: string;
  tourTitle: string;
  tourBody: string;
  accentColor: string;
};

/** All 25 real application screenshots, grouped into labelled sections */
export const interactiveWorkspaceSteps: WorkspaceStep[] = [
  /* ── ONBOARDING ────────────────────────────────── */
  {
    id: "login",
    tabLabel: "Sign In",
    icon: LogIn,
    imageSrc: "/app-screenshots/screen-01.png",
    imageAlt: "CertifyGRC login screen — Welcome back, secure access to your compliance dashboard",
    tourTitle: "Sign In",
    tourBody:
      "The branded login screen where users enter email and password to access their GRC workspace — with optional SSO and enterprise authentication.",
    accentColor: "#6366f1",
  },
  /* ── DASHBOARD ─────────────────────────────────── */
  {
    id: "dashboard",
    tabLabel: "Command Center",
    icon: LayoutDashboard,
    imageSrc: "/app-screenshots/screen-02.png",
    imageAlt: "GRC Command Center — live posture, workflow pressure map, risk mix, audit readiness",
    tourTitle: "GRC Command Center",
    tourBody: "Your live posture at a glance. System health, audit readiness, workflow bottlenecks, and risk distribution — all in one screen.",
    accentColor: "#6366f1",
  },
  {
    id: "dashboard-notifications",
    tabLabel: "Live Activity",
    icon: AlertCircle,
    imageSrc: "/app-screenshots/screen-21.png",
    imageAlt: "GRC dashboard with real-time compliance notifications and activity feed",
    tourTitle: "Real-Time Alerts",
    tourBody: "Intelligent notifications keep your team informed of compliance changes, control updates, and assessment events as they happen.",
    accentColor: "#8b5cf6",
  },
  {
    id: "action-needed",
    tabLabel: "Action Needed",
    icon: AlertCircle,
    imageSrc: "/app-screenshots/screen-26.png",
    imageAlt: "Action needed panel with workflow items — waiting for evidence, pending review, revision queue",
    tourTitle: "Workflow Queue",
    tourBody: "Clear prioritization of what needs attention right now. Waiting for evidence, pending auditor review, and revision queues — all in one place.",
    accentColor: "#f59e0b",
  },
  /* ── NIST CSF ASSESSMENT ───────────────────────── */
  {
    id: "nist-overview",
    tabLabel: "NIST CSF 2.0",
    icon: ShieldCheck,
    imageSrc: "/app-screenshots/screen-03.png",
    imageAlt: "NIST CSF 2.0 Assessment Dashboard with GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER function cards",
    tourTitle: "NIST CSF 2.0 Dashboard",
    tourBody: "All six CSF functions at a glance. Track progress, questions answered, and potential gaps across your entire framework coverage.",
    accentColor: "#6366f1",
  },
  {
    id: "nist-overview-2",
    tabLabel: "Function Progress",
    icon: BarChart3,
    imageSrc: "/app-screenshots/screen-11.png",
    imageAlt: "NIST CSF 2.0 assessment dashboard showing function progress and gap indicators",
    tourTitle: "Function Coverage",
    tourBody: "Color-coded progress across GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, and RECOVER functions. See gaps and completion rates instantly.",
    accentColor: "#10b981",
  },
  {
    id: "nist-tabs",
    tabLabel: "Function Tabs",
    icon: ClipboardCheck,
    imageSrc: "/app-screenshots/screen-22.png",
    imageAlt: "NIST CSF function tabs navigation with assessment workflow",
    tourTitle: "Structured Navigation",
    tourBody: "Navigate between NIST CSF functions seamlessly. Each function contains categorized questions mapped to real subcategory outcomes.",
    accentColor: "#06b6d4",
  },
  /* ── GOVERN FUNCTION ───────────────────────────── */
  {
    id: "govern-function",
    tabLabel: "GOVERN",
    icon: ShieldCheck,
    imageSrc: "/app-screenshots/screen-05.png",
    imageAlt: "GOVERN function assessment list with GV.OC, GV.OT, GV.PO, GV.RM categories",
    tourTitle: "GOVERN Function",
    tourBody: "The new NIST CSF 2.0 Govern function. Map your organizational context, supply chain risk, and cybersecurity strategy in one structured flow.",
    accentColor: "#7c3aed",
  },
  {
    id: "govern-review",
    tabLabel: "Review Answers",
    icon: FileSearch,
    imageSrc: "/app-screenshots/screen-16.png",
    imageAlt: "Review Answers workflow in GOVERN function",
    tourTitle: "Answer Review",
    tourBody: "Review and modify previous responses at any time. Complete audit trails ensure your assessments remain accurate and defensible.",
    accentColor: "#7c3aed",
  },
  /* ── QUESTION & EVIDENCE ────────────────────────── */
  {
    id: "question-answer",
    tabLabel: "Assessment Q&A",
    icon: ClipboardCheck,
    imageSrc: "/app-screenshots/screen-04.png",
    imageAlt: "Individual assessment question with maturity level selection and evidence upload",
    tourTitle: "Question & Evidence",
    tourBody: "Answer structured compliance questions, select your maturity level, and upload supporting evidence — all in one focused interface.",
    accentColor: "#06b6d4",
  },
  {
    id: "question-2",
    tabLabel: "Question Detail",
    icon: FileText,
    imageSrc: "/app-screenshots/screen-18.png",
    imageAlt: "Detailed assessment question with No / Partial / Yes maturity selection and evidence upload zone",
    tourTitle: "Maturity Assessment",
    tourBody: "Select No, Partial, or Yes for each control. Drill down to specific maturity levels (1 Initial through 5 Optimized) for precision scoring.",
    accentColor: "#06b6d4",
  },
  {
    id: "focus-mode",
    tabLabel: "Focus Mode",
    icon: ClipboardCheck,
    imageSrc: "/app-screenshots/screen-19.png",
    imageAlt: "Focus Mode assessment interface for deep single-question answering",
    tourTitle: "Focus Mode",
    tourBody: "Enter Focus Mode for distraction-free question answering. Work through categories one at a time with auto-saved progress.",
    accentColor: "#8b5cf6",
  },
  {
    id: "question-complete",
    tabLabel: "Complete Category",
    icon: ShieldCheck,
    imageSrc: "/app-screenshots/screen-28.png",
    imageAlt: "Complete assessment answer with evidence attached and maturity level 4 - Managed selected",
    tourTitle: "Submit Responses",
    tourBody: "Once you've answered all questions and attached evidence, complete the category and return to the function overview to continue.",
    accentColor: "#10b981",
  },
  /* ── EVIDENCE & AI ──────────────────────────────── */
  {
    id: "evidence-ai",
    tabLabel: "Evidence + AI",
    icon: Bot,
    imageSrc: "/app-screenshots/screen-10.png",
    imageAlt: "Evidence upload with AI analysis showing document verification status",
    tourTitle: "AI Document Analysis",
    tourBody: "Upload evidence and let the AI engine verify whether it satisfies the control requirement. Instant compliance validation.",
    accentColor: "#f59e0b",
  },
  {
    id: "view-document",
    tabLabel: "View Document",
    icon: FolderOpen,
    imageSrc: "/app-screenshots/screen-12.png",
    imageAlt: "Document viewer with evidence file and AI compliance analysis",
    tourTitle: "Evidence Viewer",
    tourBody: "View uploaded documents inline. See AI-generated document summaries, compliance status, and assessment reasoning without leaving the platform.",
    accentColor: "#f59e0b",
  },
  {
    id: "ai-analysis",
    tabLabel: "AI Insights",
    icon: Bot,
    imageSrc: "/app-screenshots/screen-13.png",
    imageAlt: "AI compliance analysis with remediation steps and next actions",
    tourTitle: "AI Remediation Guide",
    tourBody: "When gaps are identified, the AI engine generates missing requirements, remediation steps, and next actions — grounded in your specific context.",
    accentColor: "#f59e0b",
  },
  {
    id: "ai-improvement",
    tabLabel: "Improvement Steps",
    icon: Bot,
    imageSrc: "/app-screenshots/screen-29.png",
    imageAlt: "AI-powered improvement steps with common mistakes, risk impact, and maturity progression",
    tourTitle: "AI Improvement Plan",
    tourBody: "Detailed improvement guidance including common mistakes, risk impact analysis, maturity progression roadmap, and audit tips.",
    accentColor: "#ec4899",
  },
  /* ── EVIDENCE LIBRARY ───────────────────────────── */
  {
    id: "evidence-library",
    tabLabel: "Evidence Library",
    icon: FolderOpen,
    imageSrc: "/app-screenshots/screen-20.png",
    imageAlt: "Evidence library organized by NIST function with file count and function coverage charts",
    tourTitle: "Evidence Repository",
    tourBody: "All evidence organized by NIST function. See file counts, functions covered, and average coverage — a complete audit-ready evidence trail.",
    accentColor: "#10b981",
  },
  /* ── GAP ANALYSIS ───────────────────────────────── */
  {
    id: "gap-analysis",
    tabLabel: "Gap Analysis",
    icon: TriangleAlert,
    imageSrc: "/app-screenshots/screen-22.png",
    imageAlt: "Gap analysis showing treated and in-progress gaps across NIST CSF controls",
    tourTitle: "Gap Analysis",
    tourBody: "See all identified gaps across frameworks. Filter by function, treatment status, and evidence coverage. Prioritize remediation with clarity.",
    accentColor: "#ef4444",
  },
  /* ── RISK MANAGEMENT ────────────────────────────── */
  {
    id: "risk-assessment",
    tabLabel: "Risk Register",
    icon: TriangleAlert,
    imageSrc: "/app-screenshots/screen-24.png",
    imageAlt: "Risk assessment workspace with risk scoring and treatment tracking",
    tourTitle: "Risk Management",
    tourBody: "Score risks with pre-treatment and post-treatment likelihood and impact. Calculate residual risk scores and track mitigation across the register.",
    accentColor: "#ef4444",
  },
  {
    id: "risk-remediation",
    tabLabel: "Remediation",
    icon: FileText,
    imageSrc: "/app-screenshots/screen-25.png",
    imageAlt: "Risk remediation form with root cause, action plan, priority level, and expected completion date",
    tourTitle: "Remediation Workflow",
    tourBody: "Document root causes, action plans, and priority levels. Set expected completion dates and track remediation progress through to closure.",
    accentColor: "#ef4444",
  },
  /* ── AUDIT & REPORTING ──────────────────────────── */
  {
    id: "audit-report",
    tabLabel: "Audit Report",
    icon: FileText,
    imageSrc: "/app-screenshots/screen-15.png",
    imageAlt: "Comprehensive audit report with 101 controls, 71 gaps identified, 41 with evidence",
    tourTitle: "Audit-Ready Report",
    tourBody: "Generate comprehensive audit reports. 101 controls answered, gaps identified, evidence attached — everything an auditor needs in one place.",
    accentColor: "#3b82f6",
  },
  {
    id: "audit-respond",
    tabLabel: "RESPOND Controls",
    icon: BarChart3,
    imageSrc: "/app-screenshots/screen-23.png",
    imageAlt: "Audit report showing RESPOND function controls with status and risk assessment tags",
    tourTitle: "Control Tracking",
    tourBody: "Filter audit reports by function. See each control's compliance status, risk level, and audit readiness — grouped by NIST CSF function.",
    accentColor: "#3b82f6",
  },
  /* ── COMMENT & REVIEW ───────────────────────────── */
  {
    id: "comment-review",
    tabLabel: "Auditor Review",
    icon: ShieldCheck,
    imageSrc: "/app-screenshots/screen-27.png",
    imageAlt: "Auditor review workflow with maturity score assessment, approve and request revision actions",
    tourTitle: "Auditor Workflow",
    tourBody: "Auditors review evidence, assign maturity scores, add overall comments, and Approve or Request Revision — all with full traceability.",
    accentColor: "#10b981",
  },
];

/** Tabs used in the tab bar — grouped by section */
export const WORKSPACE_TABS = [
  { label: "Overview", ids: ["login", "dashboard", "dashboard-notifications", "action-needed"] },
  { label: "NIST CSF 2.0", ids: ["nist-overview", "nist-overview-2", "nist-tabs"] },
  { label: "Assessment", ids: ["govern-function", "govern-review", "question-answer", "question-2", "focus-mode", "question-complete"] },
  { label: "Evidence & AI", ids: ["evidence-ai", "view-document", "ai-analysis", "ai-improvement", "evidence-library"] },
  { label: "Risk & Gaps", ids: ["gap-analysis", "risk-assessment", "risk-remediation"] },
  { label: "Reports", ids: ["audit-report", "audit-respond", "comment-review"] },
] as const;

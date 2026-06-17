/**
 * Realistic mock data for the GRC workspace product demo (no backend).
 * Aligned with NIST CSF 2.0–style workflows and CertifyGRC positioning.
 */

export type RiskLevel = "high" | "medium" | "low";

export type NavId =
  | "dashboard"
  | "risk register"
  | "frameworks"
  | "evidence"
  | "reports"
  | "settings";

export const nistCsfFunctions = [
  { id: "gv", label: "Govern", pct: 82, description: "Policy, oversight, culture" },
  { id: "id", label: "Identify", pct: 71, description: "Asset inventory, risk context" },
  { id: "pr", label: "Protect", pct: 76, description: "Safeguards & access" },
  { id: "de", label: "Detect", pct: 64, description: "Monitoring & anomalies" },
  { id: "rs", label: "Respond", pct: 69, description: "Incident response" },
  { id: "rc", label: "Recover", pct: 58, description: "Resilience & recovery" },
] as const;

export const metricsSnapshot = {
  overallScore: 75,
  totalControls: 704,
  compliant: 527,
  inProgress: 117,
  highRisk: 4,
  gapsOpen: 12,
  evidencePending: 8,
};

export const evidenceRows = [
  {
    id: "ev-1",
    name: "Access control matrix Q1",
    type: "Policy",
    status: "pending_review" as const,
    uploadedBy: "A. Chen",
    uploadedAt: "2h ago",
  },
  {
    id: "ev-2",
    name: "SOC 2 control test CC6.1",
    type: "Screenshot",
    status: "approved" as const,
    uploadedBy: "M. Ortiz",
    uploadedAt: "Yesterday",
  },
  {
    id: "ev-3",
    name: "Penetration test executive summary",
    type: "PDF",
    status: "approved" as const,
    uploadedBy: "Security Ops",
    uploadedAt: "3d ago",
  },
  {
    id: "ev-4",
    name: "Vendor SOC report CloudCo",
    type: "PDF",
    status: "pending_review" as const,
    uploadedBy: "Procurement",
    uploadedAt: "5d ago",
  },
];

export const riskRegisterRows = [
  {
    id: "r1",
    title: "Privileged access without MFA for legacy admin",
    owner: "IT Security",
    inherent: "High",
    residual: "Medium",
    status: "high" as RiskLevel,
    nextReview: "Apr 28",
  },
  {
    id: "r2",
    title: "Backup encryption gap regional DC",
    owner: "Infrastructure",
    inherent: "Medium",
    residual: "Low",
    status: "medium" as RiskLevel,
    nextReview: "May 02",
  },
  {
    id: "r3",
    title: "Third-party API rate limits not monitored",
    owner: "AppSec",
    inherent: "Medium",
    residual: "Medium",
    status: "medium" as RiskLevel,
    nextReview: "May 14",
  },
  {
    id: "r4",
    title: "Documented incident runbook drift",
    owner: "GRC",
    inherent: "Low",
    residual: "Low",
    status: "low" as RiskLevel,
    nextReview: "Jun 01",
  },
];

export const activityFeed = [
  { id: "a1", text: "Auditor requested clarification on CC7.2 evidence", time: "12m ago", tone: "warning" as const },
  { id: "a2", text: "Gap analysis run completed 3 new findings", time: "1h ago", tone: "default" as const },
  { id: "a3", text: "Control PR.AC-3 mapped to ISO A.8.2", time: "3h ago", tone: "default" as const },
];

export const reportTemplates = [
  { id: "rep1", name: "Executive compliance summary", lastRun: "Apr 12, 2026" },
  { id: "rep2", name: "NIST CSF posture quarterly", lastRun: "Apr 10, 2026" },
  { id: "rep3", name: "Evidence coverage by framework", lastRun: "Apr 08, 2026" },
];

export const rbacPreview = [
  { role: "Org Admin", users: 2, scopes: "All programs" },
  { role: "Auditor", users: 4, scopes: "Read-only + evidence requests" },
  { role: "Control Owner", users: 18, scopes: "Assigned controls" },
  { role: "Viewer", users: 6, scopes: "Dashboards & reports" },
];

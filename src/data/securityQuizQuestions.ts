/**
 * Question bank for the landing-page "Security Posture Quiz" — a short,
 * frontend-only lead magnet that estimates NIST CSF 2.0 maturity from 16
 * representative questions across all 6 functions.
 *
 * This is intentionally a small sample, not the full CertifyGRC platform
 * assessment (which covers all 106 NIST CSF 2.0 subcategory controls with
 * evidence, risk scoring, and auditor review). See the disclaimer shown on
 * the results screen.
 */

export const NIST_FUNCTIONS = ["GOVERN", "IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"] as const;
export type NistFunction = (typeof NIST_FUNCTIONS)[number];

export const NIST_FUNCTION_LABEL: Record<NistFunction, string> = {
  GOVERN: "Govern",
  IDENTIFY: "Identify",
  PROTECT: "Protect",
  DETECT: "Detect",
  RESPOND: "Respond",
  RECOVER: "Recover",
};

export const NIST_FUNCTION_CODE: Record<NistFunction, string> = {
  GOVERN: "GV",
  IDENTIFY: "ID",
  PROTECT: "PR",
  DETECT: "DE",
  RESPOND: "RS",
  RECOVER: "RC",
};

export type QuizAnswerValue = "Yes" | "Partial" | "No";

export const QUIZ_ANSWER_OPTIONS: { value: QuizAnswerValue; label: string; helper: string }[] = [
  { value: "Yes", label: "Yes", helper: "Fully in place" },
  { value: "Partial", label: "Partial", helper: "Somewhat / inconsistently" },
  { value: "No", label: "No", helper: "Not in place" },
];

export interface QuizQuestion {
  nistId: string;
  function: NistFunction;
  category: string;
  question: string;
  helper: string;
  /** Plain-English remediation hint shown if the user answers Partial/No. */
  remediation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    nistId: "GV.OC-01",
    function: "GOVERN",
    category: "Organizational Context",
    question: "Do you clearly understand what information and systems are critical to your organization's mission?",
    helper: "Think about the systems and data that would hurt the most if they went down.",
    remediation: "Document your most critical systems and data so priorities are clear before an incident, not during one.",
  },
  {
    nistId: "GV.RM-01",
    function: "GOVERN",
    category: "Risk Management Strategy",
    question: "Do you have a formal strategy for managing cybersecurity risks?",
    helper: "A written approach for identifying, prioritizing, and treating risk — not just ad hoc decisions.",
    remediation: "Put a lightweight risk management strategy in writing, even a one-page version, and revisit it quarterly.",
  },
  {
    nistId: "GV.PO-01",
    function: "GOVERN",
    category: "Policy",
    question: "Are cybersecurity roles and responsibilities clearly defined across the organization?",
    helper: "People should know who owns security decisions, not just IT by default.",
    remediation: "Assign named owners for key security responsibilities, even if security isn't anyone's full-time job yet.",
  },
  {
    nistId: "ID.AM-01",
    function: "IDENTIFY",
    category: "Asset Management",
    question: "Do you maintain an up-to-date inventory of all hardware, software, and data assets?",
    helper: "You can't protect what you don't know you have.",
    remediation: "Start a simple asset inventory — even a spreadsheet — and keep it current as devices and tools change.",
  },
  {
    nistId: "ID.RA-01",
    function: "IDENTIFY",
    category: "Risk Assessment",
    question: "Do you regularly identify potential cybersecurity threats and vulnerabilities?",
    helper: "Scanning, monitoring, or periodic reviews — not a one-time check years ago.",
    remediation: "Schedule a recurring vulnerability scan or risk review, even quarterly, instead of a one-time assessment.",
  },
  {
    nistId: "PR.AA-01",
    function: "PROTECT",
    category: "Identity Management, Authentication & Access Control",
    question: "Are all users uniquely identified and authenticated before accessing systems?",
    helper: "No shared logins, and multi-factor authentication where it matters.",
    remediation: "Eliminate shared accounts and turn on multi-factor authentication for anything sensitive.",
  },
  {
    nistId: "PR.AA-02",
    function: "PROTECT",
    category: "Identity Management, Authentication & Access Control",
    question: "Are access rights based on roles and job responsibilities?",
    helper: "People should only have access to what their job actually requires.",
    remediation: "Review access lists and remove permissions that go beyond what each role actually needs.",
  },
  {
    nistId: "PR.DS-01",
    function: "PROTECT",
    category: "Data Security",
    question: "Is sensitive data classified (e.g., public, confidential, restricted)?",
    helper: "A simple tiering system, not necessarily a complex program.",
    remediation: "Define 2–3 data sensitivity tiers and label your most important data accordingly.",
  },
  {
    nistId: "DE.CM-01",
    function: "DETECT",
    category: "Continuous Monitoring",
    question: "Is your network and systems monitored for suspicious activity?",
    helper: "Logging and alerting, even basic, counts.",
    remediation: "Turn on centralized logging and alerting for your most critical systems, even a basic setup.",
  },
  {
    nistId: "DE.AE-01",
    function: "DETECT",
    category: "Adverse Event Analysis",
    question: "Do you analyze detected events to understand scope and impact?",
    helper: "When something looks off, is there a process to investigate it?",
    remediation: "Define a basic triage step so flagged events get reviewed and scoped, not just logged and ignored.",
  },
  {
    nistId: "RS.MA-01",
    function: "RESPOND",
    category: "Incident Management",
    question: "Do you have a documented incident response plan?",
    helper: "A written plan people can actually follow under pressure.",
    remediation: "Draft a short incident response plan covering who to call and what to do in the first hour.",
  },
  {
    nistId: "RS.MA-02",
    function: "RESPOND",
    category: "Incident Management",
    question: "Are incident response roles and responsibilities defined?",
    helper: "Everyone should know their job during an incident, not figure it out live.",
    remediation: "Name specific people (or roles) responsible for communications, technical response, and leadership decisions.",
  },
  {
    nistId: "RC.RP-01",
    function: "RECOVER",
    category: "Incident Recovery Plan Execution",
    question: "Do you have recovery plans for critical systems and data?",
    helper: "Backups plus a documented way to actually restore service.",
    remediation: "Document recovery steps and confirmed backup locations for your most critical systems.",
  },
  {
    nistId: "RC.RP-02",
    function: "RECOVER",
    category: "Incident Recovery Plan Execution",
    question: "Are recovery plans tested regularly?",
    helper: "A plan that's never been tested is a guess, not a plan.",
    remediation: "Run a tabletop or backup-restore test at least twice a year, and fix what breaks.",
  },
  {
    nistId: "GV.RR-01",
    function: "GOVERN",
    category: "Roles, Responsibilities & Authorities",
    question: "Does top management actively oversee cybersecurity risk management?",
    helper: "Leadership should see risk reporting, not just delegate it entirely.",
    remediation: "Add a recurring cybersecurity update to a leadership or board meeting, even quarterly.",
  },
  {
    nistId: "ID.IM-01",
    function: "IDENTIFY",
    category: "Improvement",
    question: "Do you have a process to improve your cybersecurity practices over time?",
    helper: "Lessons learned should actually change what you do next.",
    remediation: "After incidents or audits, capture lessons learned and track whether changes actually get made.",
  },
];

export const QUIZ_TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;

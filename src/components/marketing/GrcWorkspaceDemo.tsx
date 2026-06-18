import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Layers,
  Search,
  Settings,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollEase } from "@/lib/motion";
import {
  activityFeed,
  evidenceRows,
  metricsSnapshot,
  nistCsfFunctions,
  rbacPreview,
  reportTemplates,
  riskRegisterRows,
  type NavId,
} from "@/components/marketing/grcWorkspaceDemoData";

const navItems: { id: NavId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "risk register", label: "Risk Register", icon: AlertTriangle },
  { id: "frameworks", label: "Frameworks", icon: Layers },
  { id: "evidence", label: "Evidence", icon: FolderOpen },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function riskBadgeClass(level: "high" | "medium" | "low") {
  if (level === "high") return "bg-red-500/15 text-red-700 border-red-500/25";
  if (level === "medium") return "bg-amber-500/15 text-amber-800 border-amber-500/25";
  return "bg-primary/15 text-emerald-800 border-primary/25";
}

function CircularScore({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 112 112" aria-hidden>
        <circle cx="56" cy="56" r={r} fill="none" className="stroke-muted/60" strokeWidth="9" />
        <motion.circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          className="stroke-primary"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [...scrollEase] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold tabular-nums text-foreground">{value}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Score</span>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "default" | "emerald" | "amber" | "rose";
}) {
  const accentRing =
    accent === "emerald"
      ? "hover:ring-emerald-500/20"
      : accent === "amber"
        ? "hover:ring-amber-500/20"
        : accent === "rose"
          ? "hover:ring-rose-500/20"
          : "hover:ring-primary/15";
  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "rounded-xl p-4 pcshell transition-shadow duration-300",
        "hover:shadow-md",
        accentRing,
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl font-bold tabular-nums text-foreground">{value}</div>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </motion.div>
  );
}

const viewVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function GrcWorkspaceDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [nav, setNav] = useState<NavId>("dashboard");
  const [frameworkTab, setFrameworkTab] = useState<"nist" | "iso" | "soc2">("nist");
  const [syncSeconds, setSyncSeconds] = useState(42);

  const transition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: [...scrollEase] as [number, number, number, number],
    }),
    [prefersReducedMotion],
  );

  useEffect(() => {
    const sync = window.setInterval(() => setSyncSeconds((s) => (s + 3) % 120), 4000);
    return () => window.clearInterval(sync);
  }, []);

  const onNav = useCallback((id: NavId) => setNav(id), []);

  const shellEnter = prefersReducedMotion ? false : { opacity: 0, y: 20 };
  const shellAnim = prefersReducedMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <motion.div
      role="region"
      aria-label="CertifyGRC workspace demo"
      className="mt-10 overflow-hidden rounded-[1.75rem]"
      style={{ background: "hsl(220,42%,8%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 48px -12px rgba(0,0,0,0.5)" }}
      initial={shellEnter}
      whileInView={shellAnim}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [...scrollEase] }}
    >
      <div className="border-b border-border/40 bg-gradient-to-r from-primary/[0.06] via-transparent to-accent/[0.04] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Interactive demo</p>
            <p className="font-display text-lg font-semibold text-foreground sm:text-xl">CertifyGRC workspace</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-semibold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live signals
            </span>
            <span className="hidden sm:inline">Synced {syncSeconds}s ago</span>
          </div>
        </div>
      </div>

      <div className="flex max-h-[min(88vh,920px)] min-h-[min(520px,85vh)] flex-col md:flex-row md:min-h-[580px]">
        {/* Sidebar desktop */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-b border-border/50 bg-muted/20 md:flex md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 border-b border-border/40 px-4 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Shield className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground">CertifyGRC</div>
              <div className="truncate text-[11px] text-muted-foreground">NIST CSF 2.0</div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Workspace">
            {navItems.map((item) => {
              const active = nav === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onNav(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                    active
                      ? "bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-border/40 p-3">
            <div className="rounded-lg border border-dashed border-border/80 bg-background/50 px-3 py-2 text-[11px] leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">Demo mode</span> - explore navigation; no data is saved.
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Mobile nav */}
          <div className="flex gap-1 overflow-x-auto border-b border-border/50 bg-muted/15 p-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const active = nav === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onNav(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                    active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/70",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {item.label.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Top bar */}
          <header className="flex flex-wrap items-center gap-3 border-b border-border/40 bg-card/40 px-3 py-3 sm:px-5">
            <div className="relative min-w-[160px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                readOnly
                placeholder="Search controls, evidence, risks…"
                className="h-10 w-full rounded-lg border border-border/70 bg-background/80 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25"
                aria-label="Search (demo)"
              />
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                aria-label="Notifications (demo)"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              <div className="hidden h-8 w-px bg-border/80 sm:block" aria-hidden />
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-2 py-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-xs font-semibold text-foreground">Daniel Hall</div>
                  <div className="text-[10px] text-muted-foreground">GRC Lead · Admin</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5">
            <AnimatePresence mode="wait">
              {nav === "dashboard" && (
                <motion.div
                  key="dashboard"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
                    <div className="flex flex-1 flex-col justify-between rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground">Compliance overview</h3>
                          <p className="mt-1 max-w-md text-sm text-muted-foreground">
                            NIST CSF 2.0 assessment, gap analysis, and continuous monitoring unified in one workspace.
                          </p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end">
                          <CircularScore value={metricsSnapshot.overallScore} />
                          <p className="mt-2 text-center text-xs font-medium text-muted-foreground sm:text-right">
                            Overall compliance score
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <MetricCard label="Total controls" value={metricsSnapshot.totalControls} sub="Mapped & tracked" />
                        <MetricCard label="Compliant" value={metricsSnapshot.compliant} sub="Passing tests" accent="emerald" />
                        <MetricCard label="In progress" value={metricsSnapshot.inProgress} sub="Remediation" accent="amber" />
                        <MetricCard label="High risk" value={metricsSnapshot.highRisk} sub="Open items" accent="rose" />
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 flex-col justify-between rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-5 lg:w-[280px]">
                      <div>
                        <div className="flex items-center gap-2 text-primary">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wide">Gap & risk</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          <strong className="text-foreground">{metricsSnapshot.gapsOpen} gaps</strong> flagged from the latest
                          assessment run. Risk assessment ties each finding to controls and owners.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNav("frameworks")}
                        className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg bg-primary/90 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary"
                      >
                        View framework coverage
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-semibold text-foreground">Framework coverage</h4>
                        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">NIST CSF 2.0</span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {nistCsfFunctions.map((fn) => (
                          <li key={fn.id}>
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="font-medium text-foreground">{fn.label}</span>
                              <span className="tabular-nums text-muted-foreground">{fn.pct}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted/70">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                                initial={{ width: 0 }}
                                animate={{ width: `${fn.pct}%` }}
                                transition={{ duration: 0.9, ease: [...scrollEase] }}
                              />
                            </div>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{fn.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-semibold text-foreground">Evidence & activity</h4>
                          <button
                            type="button"
                            onClick={() => onNav("evidence")}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Open evidence
                          </button>
                        </div>
                        <ul className="mt-3 space-y-2">
                          {activityFeed.map((a) => (
                            <li
                              key={a.id}
                              className="flex gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-sm"
                            >
                              <span
                                className={cn(
                                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                                  a.tone === "warning" ? "bg-amber-500" : "bg-primary",
                                )}
                              />
                              <div>
                                <p className="text-foreground/95">{a.text}</p>
                                <p className="text-[11px] text-muted-foreground">{a.time}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="rounded-lg border border-border/60 bg-muted/30 py-2">
                            <div className="font-display text-lg font-bold text-foreground">{metricsSnapshot.evidencePending}</div>
                            <div className="text-muted-foreground">Pending review</div>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/30 py-2">
                            <div className="font-display text-lg font-bold text-primary">412</div>
                            <div className="text-muted-foreground">Approved evidence</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-semibold text-foreground">Risk register</h4>
                          <button
                            type="button"
                            onClick={() => onNav("risk-register")}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            View all
                          </button>
                        </div>
                        <ul className="mt-3 space-y-2">
                          {riskRegisterRows.slice(0, 3).map((r) => (
                            <li
                              key={r.id}
                              className="flex items-start justify-between gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm"
                            >
                              <div className="min-w-0">
                                <p className="truncate font-medium text-foreground">{r.title}</p>
                                <p className="text-[11px] text-muted-foreground">{r.owner}</p>
                              </div>
                              <span
                                className={cn(
                                  "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase",
                                  riskBadgeClass(r.status),
                                )}
                              >
                                {r.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {nav === "evidence" && (
                <motion.div
                  key="evidence"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">Evidence management</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Central library with auditor verification workflows and immutable audit trails.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border/60">
                    <table className="w-full min-w-0 text-left text-sm">
                      <thead className="border-b border-border/60 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">Document</th>
                          <th className="hidden px-4 py-3 sm:table-cell">Type</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="hidden px-4 py-3 md:table-cell">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evidenceRows.map((row) => (
                          <tr key={row.id} className="border-b border-border/40 transition-colors hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                            <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{row.type}</td>
                            <td className="px-4 py-3">
                              {row.status === "approved" ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                                  <CheckCircle2 className="h-3 w-3" /> Approved
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-800">
                                  <Clock className="h-3 w-3" /> Pending review
                                </span>
                              )}
                            </td>
                            <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                              {row.uploadedBy}
                              <span className="block text-[11px]">{row.uploadedAt}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {nav === "risk-register" && (
                <motion.div
                  key="risk"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">Risk register</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Inherent vs residual risk, treatment plans, and continuous improvement tracking.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {riskRegisterRows.map((r) => (
                      <motion.div
                        key={r.id}
                        layout
                        className="rounded-xl p-4 pcshell"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground">{r.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Owner: {r.owner} · Next review {r.nextReview}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase",
                              riskBadgeClass(r.status),
                            )}
                          >
                            {r.status}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span>
                            Inherent: <strong className="text-foreground">{r.inherent}</strong>
                          </span>
                          <span>
                            Residual: <strong className="text-foreground">{r.residual}</strong>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {nav === "frameworks" && (
                <motion.div
                  key="frameworks"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">Framework coverage</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Map controls across NIST CSF 2.0, ISO 27001, and SOC 2 with shared evidence.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { id: "nist" as const, label: "NIST CSF 2.0" },
                        { id: "iso" as const, label: "ISO 27001" },
                        { id: "soc2" as const, label: "SOC 2" },
                      ]
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFrameworkTab(t.id)}
                        className={cn(
                          "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                          frameworkTab === t.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {frameworkTab === "nist" && (
                    <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <ul className="space-y-3">
                        {nistCsfFunctions.map((fn) => (
                          <li key={fn.id}>
                            <div className="mb-1 flex justify-between text-sm">
                              <span className="font-medium text-foreground">{fn.label}</span>
                              <span className="tabular-nums text-muted-foreground">{fn.pct}%</span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-muted/70">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent/90"
                                style={{ width: `${fn.pct}%` }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {frameworkTab === "iso" && (
                    <div className="rounded-2xl p-8 text-center text-sm text-muted-foreground" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <Layers className="mx-auto mb-3 h-10 w-10 text-primary/80" />
                      <p className="font-medium text-foreground">ISO 27001 Annex A mapping</p>
                      <p className="mt-2 max-w-md mx-auto">
                        114 controls tracked · 89% evidence attached · auditor sign-off scheduled.
                      </p>
                    </div>
                  )}
                  {frameworkTab === "soc2" && (
                    <div className="rounded-2xl p-8 text-center text-sm text-muted-foreground" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <ClipboardList className="mx-auto mb-3 h-10 w-10 text-primary/80" />
                      <p className="font-medium text-foreground">SOC 2 Trust Services Criteria</p>
                      <p className="mt-2 max-w-md mx-auto">
                        CC + A + P series in scope · 6 exceptions in remediation · continuous monitoring on.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {nav === "reports" && (
                <motion.div
                  key="reports"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">Reporting</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Executive summaries, audit packages, and exportable evidence bundles.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {reportTemplates.map((rep) => (
                      <motion.div
                        key={rep.id}
                        whileHover={{ y: -3 }}
                        className="rounded-xl p-4 pcshell"
                      >
                        <FileText className="h-8 w-8 text-primary/80" />
                        <p className="mt-3 font-semibold text-foreground">{rep.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Last run · {rep.lastRun}</p>
                        <button
                          type="button"
                          className="mt-4 text-xs font-semibold text-primary hover:underline"
                        >
                          Configure (demo)
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {nav === "settings" && (
                <motion.div
                  key="settings"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">Workspace settings</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Role based access control, integrations, and auditor collaboration policies.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border/60">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border/60 bg-muted/40 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">Role</th>
                          <th className="px-4 py-3">Users</th>
                          <th className="hidden px-4 py-3 sm:table-cell">Scopes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rbacPreview.map((row) => (
                          <tr key={row.role} className="border-b border-border/40 hover:bg-muted/25">
                            <td className="px-4 py-3 font-medium text-foreground">{row.role}</td>
                            <td className="px-4 py-3 tabular-nums text-muted-foreground">{row.users}</td>
                            <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{row.scopes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SSO, MFA, and granular permissions align with enterprise security requirements (demo).
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
}

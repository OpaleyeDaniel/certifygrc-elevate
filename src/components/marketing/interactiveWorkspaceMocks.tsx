import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Link2,
  Paperclip,
  Sparkles,
  Tag,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { evidenceRows, riskRegisterRows } from "@/components/marketing/grcWorkspaceDemoData";

function riskBadgeClass(level: "high" | "medium" | "low") {
  if (level === "high") return "bg-red-500/15 text-red-700 border-red-500/25";
  if (level === "medium") return "bg-amber-500/15 text-amber-800 border-amber-500/25";
  return "bg-emerald-500/15 text-emerald-800 border-emerald-500/25";
}

export function EvidenceManagementMock() {
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-1 sm:p-2">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Evidence library</p>
          <p className="mt-1 font-display text-lg font-semibold text-foreground">Map proof to controls</p>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Upload documents, attach metadata, and link evidence to controls in one guided flow.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="gap-2 rounded-xl shadow-sm"
          onClick={(e) => e.preventDefault()}
        >
          <UploadCloud className="h-4 w-4" aria-hidden />
          Upload evidence
        </Button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-4">
          <div className="flex items-center gap-2 text-primary">
            <Paperclip className="h-4 w-4" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-wide">Drop zone</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Drag files or click upload tagging is captured automatically.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Policy", "Screenshot", "Log export", "SOC report"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground"
              >
                <Tag className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Control mapping</div>
            <Link2 className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div className="mt-3 space-y-2">
            {["PR.AC-1 · Identity management", "CC6.1 · Logical access", "ISO A.8.2 · Privileged access"].map((l) => (
              <div
                key={l}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-card/40 px-3 py-2 text-[13px] text-foreground"
              >
                <span className="min-w-0 truncate">{l}</span>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50">
        <div className="grid grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] gap-2 border-b border-border/50 bg-muted/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
          <span>Artifact</span>
          <span className="hidden sm:inline">Type</span>
          <span>Status</span>
          <span className="hidden sm:inline">Owner</span>
        </div>
        <div className="divide-y divide-border/50">
          {evidenceRows.map((row, i) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 items-center gap-2 px-3 py-3 sm:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr] sm:px-4"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{row.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground sm:hidden">{row.type}</div>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:inline">{row.type}</span>
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  row.status === "approved"
                    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700"
                    : "border-amber-500/25 bg-amber-500/10 text-amber-800",
                )}
              >
                {row.status === "approved" ? "Approved" : "Pending review"}
              </span>
              <span className="hidden text-sm text-muted-foreground sm:inline">{row.uploadedBy}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RiskManagementMock() {
  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-1 sm:p-2">
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Risk register</p>
            <p className="mt-1 font-display text-lg font-semibold text-foreground">Score, prioritize, mitigate</p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Track inherent vs. residual risk, owners, and next review dates aligned to your control library.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-xs font-semibold text-foreground">
            <span className="text-muted-foreground">Heatmap</span>
            <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-primary">Live</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "High", value: "4", sub: "Open items" },
            { label: "Medium", value: "12", sub: "In treatment" },
            { label: "Low", value: "27", sub: "Monitor" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border/50 bg-card/50 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{m.label}</div>
              <div className="mt-1 font-display text-2xl font-bold tabular-nums text-foreground">{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50">
        <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-2 border-b border-border/50 bg-muted/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
          <span>Risk</span>
          <span className="hidden sm:inline">Inherent</span>
          <span className="hidden sm:inline">Residual</span>
          <span>Status</span>
          <span className="hidden sm:inline">Review</span>
        </div>
        <div className="divide-y divide-border/50">
          {riskRegisterRows.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.7fr] sm:items-center sm:px-4"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{r.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{r.owner}</div>
              </div>
              <span className="hidden text-sm text-foreground sm:inline">{r.inherent}</span>
              <span className="hidden text-sm text-foreground sm:inline">{r.residual}</span>
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
                  riskBadgeClass(r.status),
                )}
              >
                {r.status}
              </span>
              <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:inline-flex">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {r.nextReview}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiAssistantMock() {
  const messages = [
    {
      role: "user" as const,
      text: "What’s the fastest path to close NIST PR.AC-1 gaps with evidence we already have?",
    },
    {
      role: "assistant" as const,
      text: "You can reuse your access control matrix and IdP export logs as primary evidence. Map them to PR.AC-1 and attach the reviewer sign-off from the January audit pack, I can draft the linkage summary for your auditor.",
    },
  ];

  return (
    <div className="flex h-full min-h-[320px] flex-col gap-4 p-1 sm:p-2">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl p-4" style={{ background: "linear-gradient(145deg, hsl(220,42%,10%), hsl(220,42%,8%))", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">AI assistant</p>
          <p className="mt-1 font-display text-lg font-semibold text-foreground">Guided answers, not generic chat</p>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Context aware help for assessments, controls, and evidence tuned to your compliance program.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Preview mode
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-border/60 bg-gradient-to-b from-muted/25 to-card/40 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Conversation</div>
          <Button type="button" variant="outline" size="sm" className="h-8 rounded-lg text-xs">
            Suggest improvements
          </Button>
        </div>
        <div className="space-y-3">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={cn(
                "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm",
                m.role === "user"
                  ? "ml-auto border-border/60 bg-background/80 text-foreground"
                  : "border-primary/20 bg-primary/5 text-foreground",
              )}
            >
              {m.role === "assistant" ? (
                <div className="mt-1 flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{m.text}</span>
                </div>
              ) : (
                m.text
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Summarize gaps", "Draft auditor response", "Map evidence"].map((s) => (
            <button
              key={s}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/5"
            >
              {s}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2">
          <input
            readOnly
            placeholder="Ask a compliance question…"
            className="h-9 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="AI assistant input (demo)"
          />
          <Button type="button" size="sm" className="rounded-lg">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export function renderWorkspaceMock(mockKey: "evidence" | "risk" | "ai") {
  if (mockKey === "evidence") return <EvidenceManagementMock />;
  if (mockKey === "risk") return <RiskManagementMock />;
  return <AiAssistantMock />;
}

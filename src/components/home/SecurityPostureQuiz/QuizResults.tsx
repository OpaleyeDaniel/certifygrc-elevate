import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { AssessmentSummary, PostureProfile } from "@/lib/securityQuizScoring";
import { brandAccentAt } from "@/lib/brandColors";
import { useBooking } from "@/contexts/BookingContext";

const PROFILE_COLOR: Record<PostureProfile["color"], string> = {
  red: "#DC2626",
  amber: "#D97706",
  blue: "#305CDE",
  emerald: "#059669",
  green: "#16A34A",
};

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const pct = Math.max(0, Math.min(1, score / 5));
  const size = 108;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-display text-[22px] font-bold">
        {score.toFixed(1)}
      </text>
      <text x="50%" y="66%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
        out of 5.0
      </text>
    </svg>
  );
}

interface QuizResultsProps {
  summary: AssessmentSummary;
  onRestart: () => void;
}

export default function QuizResults({ summary, onRestart }: QuizResultsProps) {
  const { openDemo } = useBooking();
  const color = PROFILE_COLOR[summary.postureProfile.color];

  const chartData = summary.functionBreakdown.map((f, i) => ({
    code: f.code,
    label: f.label,
    score: f.avgScore,
    fill: brandAccentAt(i),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full min-h-[560px] overflow-y-auto px-5 py-6 sm:min-h-[600px] sm:px-8 sm:py-8"
    >
      {/* Header: gauge + profile + confirmation */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <ScoreGauge score={summary.overallMaturity} color={color} />
          <div>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]"
              style={{ background: `${color}16`, color }}
            >
              {summary.postureProfile.label}
            </span>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              {summary.postureProfile.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5 text-primary" aria-hidden />
          Emailed to you — check your inbox
        </div>
      </div>

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/60 bg-card p-3 text-center">
          <div className="font-display text-xl font-bold text-foreground">{summary.totalGaps}</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">Gaps found</div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-3 text-center">
          <div className="font-display text-xl font-bold text-foreground">{summary.gapRate}%</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">Gap rate</div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-3 text-center">
          <div className="font-display text-xl font-bold text-foreground">{summary.estimatedReadiness}%</div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">Est. readiness</div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-muted-foreground sm:text-left">
        Readiness estimate based on your self-assessment sample, not a formal audit.
      </p>

      {/* Function breakdown chart */}
      <div className="mt-7">
        <h4 className="font-display text-sm font-bold text-foreground">Maturity by NIST CSF function</h4>
        <div className="mt-3 h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="code" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 3]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={24} />
              <Tooltip
                cursor={{ fill: "hsl(var(--foreground) / 0.04)" }}
                contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }}
                formatter={(value: number) => [`${value.toFixed(1)} / 3.0`, "Maturity"]}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ""}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={36}>
                {chartData.map((entry) => (
                  <Cell key={entry.code} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority focus areas */}
      {summary.weakestFunctions.length > 0 && (
        <div className="mt-7">
          <h4 className="font-display text-sm font-bold text-foreground">Priority focus areas</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.weakestFunctions.map((f) => (
              <span
                key={f.function}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden />
                {f.label} — {f.avgScore.toFixed(1)}/3.0
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top gaps */}
      {summary.topGaps.length > 0 && (
        <div className="mt-7">
          <h4 className="font-display text-sm font-bold text-foreground">Top gaps to address</h4>
          <ul className="mt-3 space-y-2.5">
            {summary.topGaps.map((g) => (
              <li key={g.nistId} className="rounded-xl border border-border/60 bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="min-w-0 flex-1 break-words text-xs font-bold leading-snug text-foreground">
                    {g.nistId} · {g.question}
                  </span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                    style={{
                      background: g.answer === "No" ? "#DC262614" : "#D9770614",
                      color: g.answer === "No" ? "#DC2626" : "#D97706",
                    }}
                  >
                    {g.answer}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{g.remediation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA block */}
      <div className="mt-8 rounded-2xl border border-border/60 p-4 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.06))" }}>
        <p className="text-xs font-medium text-foreground/90">
          This sample covers 16 of 106 NIST CSF 2.0 controls. See your full picture in CertifyGRC.
        </p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button asChild size="sm" className="glow-primary group w-full sm:w-auto">
            <Link to="/software">
              Start your full NIST CSF assessment
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Button>
          <Button onClick={openDemo} size="sm" variant="outline" className="w-full sm:w-auto">
            Book a demo
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mx-auto mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="h-3 w-3" aria-hidden />
        Retake the quiz
      </button>

      <div className="mt-6 flex items-start gap-2 border-t border-border/60 pt-4">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          This is an indicative self-assessment based on 16 sample controls aligned to NIST CSF 2.0. It is not a
          formal audit, certification, or legal compliance determination. CertifyGRC's full platform assesses all
          106 subcategory controls with evidence, gap remediation, risk scoring, and auditor review.
        </p>
      </div>
    </motion.div>
  );
}

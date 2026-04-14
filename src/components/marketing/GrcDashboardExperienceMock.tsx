import { useMemo, useState, type ComponentType } from "react";

type FeatureItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const statSets = [
  { overall: 75, controls: 704, compliant: 527, inProgress: 117, highRisk: 4 },
  { overall: 68, controls: 612, compliant: 418, inProgress: 134, highRisk: 6 },
  { overall: 82, controls: 781, compliant: 612, inProgress: 96, highRisk: 3 },
  { overall: 71, controls: 655, compliant: 492, inProgress: 124, highRisk: 5 },
  { overall: 77, controls: 732, compliant: 561, inProgress: 102, highRisk: 2 },
  { overall: 86, controls: 802, compliant: 652, inProgress: 88, highRisk: 3 },
  { overall: 73, controls: 689, compliant: 504, inProgress: 109, highRisk: 4 },
  { overall: 79, controls: 748, compliant: 588, inProgress: 97, highRisk: 2 },
];

export default function GrcDashboardExperienceMock({ features }: { features: FeatureItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = features[activeIndex] ?? features[0];
  const stats = useMemo(() => statSets[activeIndex % statSets.length] ?? statSets[0], [activeIndex]);

  const Icon = active?.icon;

  return (
    <div className="mt-10 rounded-3xl border border-border/60 bg-card/40 overflow-hidden shadow-2xl shadow-primary/10 hover-lift transition-all duration-500 ring-1 ring-white/5">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">GRC Dashboard</div>
            <h3 className="font-display font-bold text-2xl text-foreground mt-1">Monitor compliance across frameworks</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-xs font-semibold">
              Live signals
            </span>
            <span className="text-xs text-muted-foreground">Updated moments ago</span>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[360px_1fr] gap-6 items-start">
          <div className="max-h-[420px] overflow-y-auto pr-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Platform capabilities</div>
            <div className="space-y-3">
              {features.map((f, idx) => {
                const isActive = idx === activeIndex;
                const FIcon = f.icon;
                return (
                  <button
                    key={f.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={[
                      "w-full text-left rounded-2xl border px-4 py-4 transition-all duration-200",
                      "bg-background/35 backdrop-blur-sm",
                      isActive
                        ? "border-primary/30 ring-1 ring-primary/20 shadow-lg shadow-primary/10"
                        : "border-border/60 hover:border-border/90",
                    ].join(" ")}
                  >
                    <div className="flex gap-3 items-start">
                      <div
                        className={[
                          "w-10 h-10 rounded-xl flex items-center justify-center border",
                          isActive ? "bg-primary/10 border-primary/30" : "bg-muted/20 border-border/60",
                        ].join(" ")}
                      >
                        <FIcon className={isActive ? "w-5 h-5 text-primary" : "w-5 h-5 text-muted-foreground"} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground">{f.title}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">{f.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/25 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Selected</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    {Icon ? <Icon className="w-5 h-5 text-primary" /> : null}
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-foreground">{active?.title ?? "—"}</div>
                    <div className="text-sm text-muted-foreground mt-1">{active?.description ?? ""}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overall</div>
                <div className="text-2xl font-display font-bold text-foreground mt-2">{stats.overall}%</div>
                <div className="text-xs text-muted-foreground mt-1">compliance health</div>
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Total Controls</div>
                <div className="text-xl font-display font-bold text-foreground mt-2">{stats.controls}</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compliant</div>
                <div className="text-xl font-display font-bold text-foreground mt-2">{stats.compliant}</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">In Progress</div>
                <div className="text-xl font-display font-bold text-foreground mt-2">{stats.inProgress}</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">High Risk</div>
                <div className="text-xl font-display font-bold text-foreground mt-2">{stats.highRisk}</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Compliance progress</span>
                <span>{stats.overall}%</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                  style={{ width: `${stats.overall}%` }}
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border/60 bg-muted/20 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent activity</div>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-primary" />
                  Controls mapped to relevant clauses for active framework.
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-primary/70" />
                  Evidence mapping updated to keep audit trails complete.
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-primary/40" />
                  Compliance gaps queued for review and continuous monitoring.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, BarChart3, FileCheck, Clock, TrendingUp, Activity } from "lucide-react";

const tabs = ["Overview", "Compliance", "Risk", "Audit"];

const complianceData = [
  { name: "NIST CSF 2.0", progress: 87, status: "On Track", controls: 108, evidences: 245 },
  { name: "ISO 27001", progress: 92, status: "Compliant", controls: 114, evidences: 312 },
  { name: "PCI DSS", progress: 78, status: "In Progress", controls: 78, evidences: 156 },
  { name: "SOC 2", progress: 95, status: "Compliant", controls: 64, evidences: 198 },
  { name: "PIPEDA", progress: 71, status: "In Progress", controls: 42, evidences: 89 },
];

const riskItems = [
  { severity: "Critical", count: 2, color: "bg-red-500" },
  { severity: "High", count: 7, color: "bg-orange-500" },
  { severity: "Medium", count: 15, color: "bg-yellow-500" },
  { severity: "Low", count: 23, color: "bg-green-500" },
];

const auditTasks = [
  { task: "Q1 Internal Audit Review", status: "Complete", date: "Mar 15" },
  { task: "Evidence Collection — ISO 27001", status: "In Progress", date: "Mar 22" },
  { task: "PCI DSS Gap Assessment", status: "Scheduled", date: "Apr 1" },
  { task: "SOC 2 Type II Readiness", status: "In Progress", date: "Apr 10" },
];

export default function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="glass rounded-2xl overflow-hidden glow-border shadow-2xl shadow-primary/10">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-muted-foreground font-medium">CertifyGRC — Compliance Dashboard</span>
        </div>
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5">
        {activeTab === "Overview" && (
          <div className="space-y-5 animate-fade-in">
            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Overall Score", value: "87%", icon: TrendingUp, trend: "+3.2%" },
                { label: "Active Controls", value: "406", icon: Shield, trend: "+12" },
                { label: "Open Risks", value: "24", icon: AlertTriangle, trend: "-5" },
                { label: "Audit Tasks", value: "18", icon: FileCheck, trend: "4 due" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl bg-muted/30 border border-border/30 p-4 group hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <kpi.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[10px] text-green-500 font-medium">{kpi.trend}</span>
                  </div>
                  <p className="text-xl font-bold text-foreground font-display">{kpi.value}</p>
                  <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Compliance bars */}
            <div className="rounded-xl bg-muted/20 border border-border/30 p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Framework Compliance
              </h4>
              <div className="space-y-3">
                {complianceData.slice(0, 4).map((fw) => (
                  <div key={fw.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{fw.name}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        fw.status === "Compliant" ? "bg-green-500/10 text-green-500" : "bg-accent/10 text-accent"
                      }`}>{fw.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{ width: `${fw.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Compliance" && (
          <div className="space-y-3 animate-fade-in">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Compliance Status by Framework
            </h4>
            {complianceData.map((fw) => (
              <div key={fw.name} className="rounded-xl bg-muted/20 border border-border/30 p-4 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-foreground">{fw.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    fw.status === "Compliant" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                  }`}>{fw.status}</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${fw.progress}%` }} />
                </div>
                <div className="flex gap-4 text-[11px] text-muted-foreground">
                  <span>{fw.controls} Controls</span>
                  <span>{fw.evidences} Evidences</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Risk" && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-primary" />
              Risk Distribution
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {riskItems.map((r) => (
                <div key={r.severity} className="rounded-xl bg-muted/20 border border-border/30 p-4 text-center hover:border-primary/30 transition-all">
                  <div className={`w-3 h-3 rounded-full ${r.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-foreground font-display">{r.count}</p>
                  <p className="text-xs text-muted-foreground">{r.severity}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted/20 border border-border/30 p-4">
              <h5 className="text-xs font-semibold text-foreground mb-3">Risk Heat Map</h5>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-md transition-all hover:scale-110"
                      style={{
                        backgroundColor: intensity > 0.7
                          ? `hsl(0 70% ${40 + intensity * 20}%)`
                          : intensity > 0.4
                          ? `hsl(40 70% ${50 + intensity * 15}%)`
                          : `hsl(140 50% ${45 + intensity * 20}%)`,
                        opacity: 0.4 + intensity * 0.6,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>Low Impact</span>
                <span>High Impact</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Audit" && (
          <div className="space-y-3 animate-fade-in">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Audit Pipeline
            </h4>
            {auditTasks.map((t) => (
              <div key={t.task} className="rounded-xl bg-muted/20 border border-border/30 p-4 flex items-center justify-between hover:border-primary/30 transition-all">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.task}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Due: {t.date}</p>
                </div>
                <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                  t.status === "Complete" ? "bg-green-500/10 text-green-500" :
                  t.status === "In Progress" ? "bg-accent/10 text-accent" :
                  "bg-muted text-muted-foreground"
                }`}>{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

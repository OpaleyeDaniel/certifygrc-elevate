import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PrivacyPolicyDialog from "@/components/legal/PrivacyPolicyDialog";
import { HoneypotField, readHoneypotValue } from "@/components/forms/HoneypotField";
import { JOB_TITLE_OPTIONS, type JobTitleOption } from "@/lib/assessmentLeadSchema";
import type { AssessmentSummary } from "@/lib/securityQuizScoring";
import { BRAND_PRIMARY } from "@/lib/brandColors";

export interface EmailGateSubmitValues {
  email: string;
  companyName: string;
  jobTitle: JobTitleOption | undefined;
  consentMarketing: boolean;
  _gotcha: string;
}

interface EmailGateProps {
  summary: AssessmentSummary;
  status: "idle" | "loading" | "error";
  error?: string;
  onSubmit: (values: EmailGateSubmitValues) => void;
}

export default function EmailGate({ summary, status, error, onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState<JobTitleOption | undefined>(undefined);
  const [consent, setConsent] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const disabled = status === "loading";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!emailValid || !consent || disabled) return;
    onSubmit({ email: email.trim(), companyName: companyName.trim(), jobTitle, consentMarketing: consent, _gotcha: readHoneypotValue(honeypotRef) });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative h-full min-h-[560px] sm:min-h-[600px]"
    >
      {/* Blurred teaser backdrop */}
      <div aria-hidden className="flex h-full flex-col items-center justify-center px-8 py-10 text-center blur-[6px]">
        <span className="font-display text-4xl font-bold text-foreground/40">{summary.postureProfile.label}</span>
        <p className="mt-4 text-lg font-semibold text-foreground/30">
          We found {summary.totalGaps} compliance gaps across your organization
        </p>
        <div className="mt-8 grid w-full max-w-sm grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-foreground/10" />
          ))}
        </div>
      </div>

      {/* Gate modal, centered on top */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/70 px-4 py-6 backdrop-blur-sm sm:px-6">
        <div
          className="w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-7"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${BRAND_PRIMARY}14` }}>
              <Lock className="h-4 w-4" style={{ color: BRAND_PRIMARY }} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-base font-bold leading-snug text-foreground">
                Get your full NIST CSF maturity report
              </h3>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Enter your work email to unlock your maturity score, gap analysis by function, and priority remediation
            areas.
          </p>

          <form className="mt-5 space-y-3.5" onSubmit={handleSubmit} noValidate aria-busy={disabled}>
            <HoneypotField ref={honeypotRef} />

            <div className="space-y-1.5">
              <Label htmlFor="quiz-gate-email" className="text-xs text-foreground">
                Work email
              </Label>
              <Input
                id="quiz-gate-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 rounded-xl text-sm"
              />
              {touched && !emailValid && <p className="text-[11px] text-destructive">Enter a valid work email address.</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quiz-gate-company" className="text-xs text-foreground">
                Company name <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="quiz-gate-company"
                type="text"
                autoComplete="organization"
                disabled={disabled}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                className="h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quiz-gate-title" className="text-xs text-foreground">
                Job title <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Select
                value={jobTitle}
                onValueChange={(v) => setJobTitle(v as JobTitleOption)}
                disabled={disabled}
              >
                <SelectTrigger id="quiz-gate-title" className="h-11 rounded-xl text-sm">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TITLE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="quiz-gate-consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                disabled={disabled}
                className="mt-0.5"
              />
              <Label htmlFor="quiz-gate-consent" className="text-[11px] font-normal leading-relaxed text-muted-foreground">
                I agree to receive my assessment results and occasional CertifyGRC product updates. Unsubscribe
                anytime.
              </Label>
            </div>
            {touched && !consent && <p className="-mt-2 text-[11px] text-destructive">Please agree to continue.</p>}

            {status === "error" && error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-[11px] text-foreground" role="alert">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" aria-hidden />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" size="lg" disabled={disabled} className="glow-primary h-11 w-full min-h-[44px] rounded-xl text-sm font-semibold">
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Unlocking…
                </>
              ) : (
                "Unlock my results"
              )}
            </Button>

            <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <button type="button" className="underline underline-offset-2 hover:text-foreground" onClick={() => setPrivacyOpen(true)}>
                Privacy Policy
              </button>
              .
            </p>
          </form>
        </div>
      </div>

      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </motion.div>
  );
}

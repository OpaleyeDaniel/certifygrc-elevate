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
  fullName: string;
  email: string;
  companyName: string;
  jobTitle: JobTitleOption;
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState<JobTitleOption | undefined>(undefined);
  const [consent, setConsent] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const fullNameValid = fullName.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const jobTitleValid = Boolean(jobTitle);
  const companyNameValid = companyName.trim().length >= 2;
  const disabled = status === "loading";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!fullNameValid || !emailValid || !jobTitleValid || !jobTitle || !companyNameValid || !consent || disabled) return;
    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      companyName: companyName.trim(),
      jobTitle,
      consentMarketing: consent,
      _gotcha: readHoneypotValue(honeypotRef),
    });
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
      <div className="absolute inset-0 flex items-center justify-center bg-background/70 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-6">
        <div
          className="max-h-[95%] w-full max-w-sm overflow-y-auto rounded-2xl border border-border/60 bg-card p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9" style={{ background: `${BRAND_PRIMARY}14` }}>
              <Lock className="h-4 w-4" style={{ color: BRAND_PRIMARY }} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:text-base">
                Get your full NIST CSF maturity report
              </h3>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Enter your details to unlock your maturity score, gap analysis by function, and priority remediation areas.
          </p>

          <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate aria-busy={disabled}>
            <HoneypotField ref={honeypotRef} />

            <div className="space-y-1">
              <Label htmlFor="quiz-gate-name" className="text-xs text-foreground">
                Full name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="quiz-gate-name"
                type="text"
                autoComplete="name"
                required
                disabled={disabled}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="h-10 rounded-xl text-sm"
              />
              {touched && !fullNameValid && <p className="text-[11px] text-destructive">Enter your full name.</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="quiz-gate-email" className="text-xs text-foreground">
                Work email <span className="text-destructive">*</span>
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
                className="h-10 rounded-xl text-sm"
              />
              {touched && !emailValid && <p className="text-[11px] text-destructive">Enter a valid work email address.</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="quiz-gate-title" className="text-xs text-foreground">
                Job title <span className="text-destructive">*</span>
              </Label>
              <Select
                value={jobTitle}
                onValueChange={(v) => setJobTitle(v as JobTitleOption)}
                disabled={disabled}
              >
                <SelectTrigger id="quiz-gate-title" className="h-10 rounded-xl text-sm">
                  <SelectValue placeholder="Select your job title" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TITLE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched && !jobTitleValid && <p className="text-[11px] text-destructive">Select your job title.</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="quiz-gate-company" className="text-xs text-foreground">
                Company name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="quiz-gate-company"
                type="text"
                autoComplete="organization"
                required
                disabled={disabled}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                className="h-10 rounded-xl text-sm"
              />
              {touched && !companyNameValid && <p className="text-[11px] text-destructive">Enter your company name.</p>}
            </div>

            <div className="flex items-start gap-2.5 pt-0.5">
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
            {touched && !consent && <p className="-mt-1.5 text-[11px] text-destructive">Please agree to continue.</p>}

            {status === "error" && error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-[11px] text-foreground" role="alert">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" aria-hidden />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" size="lg" disabled={disabled} className="glow-primary h-10 w-full min-h-[40px] rounded-xl text-sm font-semibold">
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

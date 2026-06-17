import { useMemo, useRef, useState, type ElementType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Compass,
  Loader2,
  Mail,
  Shield,
  Sparkles,
  Target,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import PrivacyPolicyDialog from "@/components/legal/PrivacyPolicyDialog";
import { formSubmitUserMessage } from "@/lib/formSubmitApi";
import { cn } from "@/lib/utils";
import {
  CHALLENGE_OPTIONS,
  COMPANY_SIZES,
  FRAMEWORK_OPTIONS,
  INDUSTRIES,
  partnerFormDefaults,
  partnerFormSchema,
  partnerStep1OnlySchema,
  partnerStep2Fields,
  REGIONS,
  STAGE_OPTIONS,
  TIMELINE_OPTIONS,
  type PartnerFormValues,
} from "@/lib/partnerFormSchema";

type Status = "idle" | "success" | "error";

const STEPS_PARTNER = [
  {
    id: 0,
    title: "Profile & landscape",
    subtitle: "Who you are and how you work with compliance today",
    icon: Building2,
  },
  {
    id: 1,
    title: "Goals & partnership",
    subtitle: "Priorities, timing, and how we can move forward together",
    icon: Target,
  },
] as const;

const STEPS_EARLY_ACCESS = [
  {
    id: 0,
    title: "Profile & landscape",
    subtitle: "Your organization and how you operate today",
    icon: Building2,
  },
  {
    id: 1,
    title: "Goals & readiness",
    subtitle: "Outcomes, timing, and how we should prepare your access",
    icon: Target,
  },
] as const;

export type PartnerApplicationFormProps = {
  /** Alliance page (default) vs public early-access / assessment page */
  variant?: "partner" | "earlyAccess";
};

function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  return res.text().then((text) => {
    if (!text) return null;
    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return null;
    }
  });
}

function FieldSection({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon: ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-gradient-to-b from-background/80 to-muted/15 p-6 shadow-sm md:p-7",
        "ring-1 ring-white/[0.06]",
        className,
      )}
    >
      <div className="mb-5 flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0 space-y-1">
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground md:text-lg">
            {title}
          </h3>
          {description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function PartnerApplicationForm({ variant = "partner" }: PartnerApplicationFormProps) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [confirmationMaybeSkipped, setConfirmationMaybeSkipped] = useState(false);
  const submitLock = useRef(false);

  const isEarlyAccess = variant === "earlyAccess";
  const STEPS = isEarlyAccess ? STEPS_EARLY_ACCESS : STEPS_PARTNER;

  const formDefaults = useMemo<PartnerFormValues>(
    () =>
      isEarlyAccess
        ? { ...partnerFormDefaults, submissionContext: "early_access" }
        : { ...partnerFormDefaults },
    [isEarlyAccess],
  );

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: formDefaults,
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const usesGrc = form.watch("usesGrcTool");
  const challengeCount = form.watch("challenges")?.length ?? 0;

  const goBackToStep1 = () => {
    partnerStep2Fields.forEach((name) => form.clearErrors(name));
    setStep(0);
  };

  const goNext = () => {
    const parsed = partnerStep1OnlySchema.safeParse(form.getValues());
    if (!parsed.success) {
      form.clearErrors();
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
          form.setError(key as keyof PartnerFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      }
      const first = parsed.error.issues[0]?.path[0];
      if (typeof first === "string") {
        form.setFocus(first as keyof PartnerFormValues);
      }
      return;
    }
    partnerStep2Fields.forEach((name) => form.clearErrors(name));
    setStep(1);
  };

  const onValid = async (values: PartnerFormValues) => {
    if (submitLock.current) return;
    submitLock.current = true;
    setErrorMsg("");
    setStatus("idle");
    try {
      const res = await fetch("/api/send-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await safeJson(res);
      if (!res.ok || json?.success === false) {
        throw new Error(formSubmitUserMessage(res, json));
      }
      setConfirmationMaybeSkipped(json?.confirmationSent === false);
      setStatus("success");
      form.reset(formDefaults);
      setStep(0);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    } finally {
      submitLock.current = false;
    }
  };

  const handleFormSubmit = form.handleSubmit(onValid);
  const submitting = form.formState.isSubmitting;

  const toggleFramework = (opt: (typeof FRAMEWORK_OPTIONS)[number], current: string[]) => {
    if (opt === "None yet") return ["None yet"];
    const withoutNone = current.filter((x) => x !== "None yet");
    if (withoutNone.includes(opt)) return withoutNone.filter((x) => x !== opt);
    return [...withoutNone, opt];
  };

  const toggleChallenge = (opt: (typeof CHALLENGE_OPTIONS)[number], current: string[]) => {
    if (current.includes(opt)) return current.filter((x) => x !== opt);
    if (current.length >= 3) return current;
    return [...current, opt];
  };

  const progressValue = (step + 1) * 50;

  if (status === "success") {
    return (
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.07] px-8 py-12 text-center shadow-xl md:px-12 md:py-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <Check className="h-10 w-10 text-primary" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {isEarlyAccess ? "Thank you — we have your assessment" : "You're on the list"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground leading-relaxed">
          {isEarlyAccess
            ? "We&apos;ve received your early access assessment. Our team will review your details and follow up with clear next steps, including demo options when applicable."
            : "We&apos;ve received your early partner access request. Our team will review your details and follow up with next steps, including demo options when applicable."}
        </p>
        {confirmationMaybeSkipped ? (
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground/90 leading-relaxed">
            If you don&apos;t see a confirmation email within a few minutes, check spam or contact us at{" "}
            <a href="mailto:info@certifygrc.com" className="font-medium text-primary hover:underline">
              info@certifygrc.com
            </a>
            — your request was still received.
          </p>
        ) : null}
        <Button
          className="mt-10 min-w-[200px] glow-primary"
          type="button"
          variant="default"
          onClick={() => {
            setConfirmationMaybeSkipped(false);
            setStatus("idle");
          }}
        >
          Submit another response
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <header className="mb-10 text-center md:mb-12 md:text-left">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {isEarlyAccess ? "Early access" : "Partner program"}
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {isEarlyAccess ? "Complete your early access assessment" : "Request early partner access"}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed md:mx-0 md:text-base">
          {isEarlyAccess
            ? "A short, two-step qualification so we can understand your compliance needs and prepare the right onboarding path. Required fields are marked with an asterisk. You can go back at any time — your answers are preserved."
            : "A short, two-step application. Required fields are marked with an asterisk. You can move back at any time—your answers are preserved."}
        </p>
      </header>

      {/* Stepper */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>Progress</span>
          <span aria-live="polite">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <Progress
          value={progressValue}
          className="h-1.5 overflow-hidden rounded-full bg-muted/80"
          aria-hidden
        />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {STEPS.map((s, idx) => {
            const active = step === idx;
            const done = step > idx;
            const StepIcon = s.icon;
            return (
              <div
                key={s.id}
                className={cn(
                  "relative flex gap-3 rounded-2xl border p-4 transition-all duration-300 md:p-5",
                  active &&
                    "border-primary/35 bg-gradient-to-br from-primary/10 to-transparent shadow-md ring-1 ring-primary/20",
                  done && !active && "border-primary/20 bg-primary/[0.06]",
                  !active && !done && "border-border/60 bg-muted/20 opacity-80",
                )}
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                    active && "bg-primary text-primary-foreground shadow-sm",
                    done && !active && "bg-primary/20 text-primary",
                    !active && !done && "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-5 w-5" strokeWidth={2.5} /> : idx + 1}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <StepIcon className="hidden h-4 w-4 text-primary/80 sm:block" aria-hidden />
                    <p className="font-display text-sm font-semibold text-foreground md:text-base">
                      {s.title}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug md:text-sm">
                    {s.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <FieldSection
                  icon={Mail}
                  title="Contact"
                  description="We’ll use this to confirm your request and follow up."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Full name *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 rounded-xl border-border/60 bg-background/80"
                              placeholder="Jane Doe"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Work email *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 rounded-xl border-border/60 bg-background/80"
                              type="email"
                              placeholder="you@company.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FieldSection>

                <FieldSection
                  icon={Building2}
                  title="Organization"
                  description="Helps us tailor the conversation to your company profile."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Company name *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 rounded-xl border-border/60 bg-background/80"
                              placeholder="Organization name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Job title / role *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 rounded-xl border-border/60 bg-background/80"
                              placeholder="Your role"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Company size *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/80">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {COMPANY_SIZES.map((sz) => (
                                <SelectItem key={sz} value={sz}>
                                  {sz === "500+" ? "500+" : sz.replace(/-/g, "\u2013")} employees
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel className="text-foreground">Industry *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/80">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-64">
                              {INDUSTRIES.map((ind) => (
                                <SelectItem key={ind} value={ind}>
                                  {ind}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="primaryRegion"
                    render={({ field }) => (
                      <FormItem className="mt-5">
                        <FormLabel className="text-foreground">Primary region of operations *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/80">
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {REGIONS.map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldSection>

                <FieldSection
                  icon={Compass}
                  title="Compliance landscape"
                  description="What you’re working with today—so we can align the right frameworks and resources."
                >
                  <FormField
                    control={form.control}
                    name="frameworks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Which frameworks are you currently working with? *
                        </FormLabel>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Select all that apply. &quot;None yet&quot; cannot be combined with other
                          options.
                        </p>
                        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {FRAMEWORK_OPTIONS.map((opt) => {
                            const checked = field.value?.includes(opt);
                            return (
                              <label
                                key={opt}
                                htmlFor={`fw-${opt}`}
                                className={cn(
                                  "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition-colors",
                                  "border-border/55 bg-background/60 hover:border-primary/25 hover:bg-background/90",
                                  checked && "border-primary/40 bg-primary/[0.07] ring-1 ring-primary/15",
                                )}
                              >
                                <Checkbox
                                  id={`fw-${opt}`}
                                  className="mt-0.5"
                                  checked={checked}
                                  onCheckedChange={() => {
                                    field.onChange(toggleFramework(opt, field.value ?? []));
                                  }}
                                />
                                <span className="text-sm font-medium leading-snug text-foreground">
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="my-6 bg-border/60" />
                  <FormField
                    control={form.control}
                    name="currentStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">What is your current stage? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/80">
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STAGE_OPTIONS.map((st) => (
                              <SelectItem key={st} value={st}>
                                {st}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldSection>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <FieldSection
                  icon={Shield}
                  title="Tooling"
                  description="Whether you already use a GRC platform helps us plan integration and migration."
                >
                  <FormField
                    control={form.control}
                    name="usesGrcTool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Do you currently use any GRC or compliance tool? *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value === "" ? undefined : field.value}
                            className="grid gap-3 sm:grid-cols-2"
                          >
                            <label
                              htmlFor="grc-yes"
                              className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                                "border-border/55 bg-background/60 hover:border-primary/25",
                                field.value === "yes" && "border-primary/40 bg-primary/[0.07] ring-1 ring-primary/15",
                              )}
                            >
                              <RadioGroupItem value="yes" id="grc-yes" />
                              <span className="text-sm font-medium">Yes (specify below)</span>
                            </label>
                            <label
                              htmlFor="grc-no"
                              className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                                "border-border/55 bg-background/60 hover:border-primary/25",
                                field.value === "no" && "border-primary/40 bg-primary/[0.07] ring-1 ring-primary/15",
                              )}
                            >
                              <RadioGroupItem value="no" id="grc-no" />
                              <span className="text-sm font-medium">No</span>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {usesGrc === "yes" && (
                    <FormField
                      control={form.control}
                      name="grcToolName"
                      render={({ field }) => (
                        <FormItem className="mt-5 animate-fade-in">
                          <FormLabel className="text-foreground">Tool name *</FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 rounded-xl border-border/60 bg-background/80"
                              placeholder="e.g. ServiceNow GRC, OneTrust…"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FieldSection>

                <FieldSection
                  icon={Target}
                  title="Priorities & outcomes"
                  description="What’s blocking you today, what success looks like, and when you want to move."
                >
                  <FormField
                    control={form.control}
                    name="challenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          What are your biggest challenges today? *
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Choose up to three ({challengeCount}/3).
                        </p>
                        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {CHALLENGE_OPTIONS.map((opt) => {
                            const checked = field.value?.includes(opt);
                            const atCap = (field.value?.length ?? 0) >= 3 && !checked;
                            return (
                              <label
                                key={opt}
                                htmlFor={`ch-${opt}`}
                                className={cn(
                                  "flex items-start gap-3 rounded-xl border px-3 py-3 transition-colors",
                                  "border-border/55 bg-background/60",
                                  !atCap && "cursor-pointer hover:border-primary/25 hover:bg-background/90",
                                  checked && "border-primary/40 bg-primary/[0.07] ring-1 ring-primary/15",
                                  atCap && "cursor-not-allowed opacity-45",
                                )}
                              >
                                <Checkbox
                                  id={`ch-${opt}`}
                                  className="mt-0.5"
                                  disabled={atCap}
                                  checked={checked}
                                  onCheckedChange={() => {
                                    field.onChange(toggleChallenge(opt, field.value ?? []));
                                  }}
                                />
                                <span className="text-sm font-medium leading-snug text-foreground">
                                  {opt}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desiredOutcome"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="text-foreground">
                          What do you want to achieve with CertifyGRC? *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Outcomes, timelines, or success criteria you care about."
                            rows={4}
                            className="min-h-[120px] resize-y rounded-xl border-border/60 bg-background/80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="implementationTimeline"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel className="text-foreground">
                          How soon are you looking to implement a solution? *
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-border/60 bg-background/80">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIMELINE_OPTIONS.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FieldSection>

                <FieldSection
                  icon={Sparkles}
                  title={isEarlyAccess ? "Engagement preferences" : "Partnership commitments"}
                  description={
                    isEarlyAccess
                      ? "Select at least one option so we can plan demos, onboarding, and follow-up."
                      : "Select at least one option so we can plan demos, onboarding, and feedback."
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-1">
                    <FormField
                      control={form.control}
                      name="willingDemo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border/55 bg-background/60 px-4 py-3.5">
                          <FormControl>
                            <Checkbox
                              className="mt-0.5"
                              checked={field.value}
                              onCheckedChange={(v) => field.onChange(v === true)}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-medium leading-snug text-foreground">
                            Attend a private demo session in May
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="willingActiveUse"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border/55 bg-background/60 px-4 py-3.5">
                          <FormControl>
                            <Checkbox
                              className="mt-0.5"
                              checked={field.value}
                              onCheckedChange={(v) => field.onChange(v === true)}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-medium leading-snug text-foreground">
                            Use the platform actively for 30 days
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="willingFeedback"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border/55 bg-background/60 px-4 py-3.5">
                          <FormControl>
                            <Checkbox
                              className="mt-0.5"
                              checked={field.value}
                              onCheckedChange={(v) => field.onChange(v === true)}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-medium leading-snug text-foreground">
                            Provide structured feedback
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.formState.errors.willingDemo ? (
                    <p className="mt-3 text-sm font-medium text-destructive" role="alert">
                      {form.formState.errors.willingDemo.message}
                    </p>
                  ) : null}
                </FieldSection>

                <FieldSection
                  icon={Shield}
                  title="Consent"
                  description="Required contact consent; optional product updates."
                >
                  <FormField
                    control={form.control}
                    name="consentContact"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border/55 bg-background/60 px-4 py-3.5">
                        <FormControl>
                          <Checkbox
                            className="mt-0.5"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="cursor-pointer font-medium leading-snug text-foreground">
                            I agree to be contacted by CertifyGRC regarding my early access request,
                            including demo scheduling and platform onboarding. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consentUpdates"
                    render={({ field }) => (
                      <FormItem className="mt-3 flex flex-row items-start gap-3 rounded-xl border border-border/55 bg-background/60 px-4 py-3.5">
                        <FormControl>
                          <Checkbox
                            className="mt-0.5"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(v === true)}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-medium leading-snug text-foreground">
                          I would like to receive updates, product announcements, and insights from
                          CertifyGRC.
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                    We respect your privacy. Your information will be handled in accordance with our{" "}
                    <button
                      type="button"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                      onClick={() => setPrivacyOpen(true)}
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>
                </FieldSection>

                {status === "error" && errorMsg ? (
                  <div
                    className="flex items-start gap-3 rounded-2xl border border-destructive/35 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col-reverse gap-3 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {step === 0 ? (
              <p className="text-center text-xs text-muted-foreground sm:text-left">
                Estimated time: about 2 minutes
              </p>
            ) : (
              <Button type="button" variant="outline" className="h-11 rounded-xl sm:min-w-[120px]" onClick={goBackToStep1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <div className="flex w-full justify-end gap-3 sm:w-auto">
              {step === 0 ? (
                <Button type="button" className="h-11 min-w-[160px] rounded-xl glow-primary" onClick={goNext}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-11 min-w-[200px] rounded-xl glow-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      {isEarlyAccess ? "Submit assessment" : "Submit application"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>

      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </div>
  );
}

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, CheckCircle2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrivacyPolicyDialog from "@/components/legal/PrivacyPolicyDialog";
import { cn } from "@/lib/utils";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";
import type { WaitlistRequestBody } from "@/lib/waitlistFormSchema";
import { submitWaitlistRequest } from "@/lib/waitlistSubmit";

type PageSource = WaitlistRequestBody["source"];

type SubmitStatus = "idle" | "loading" | "success" | "error";

const copy: Record<
  PageSource,
  {
    badge: string;
    headline: string;
    subhead: string;
    bullets: string[];
  }
> = {
  landing: {
    badge: "Early access",
    headline: "Ship audit ready GRC before the market catches up",
    subhead:
      "CertifyGRC is opening in controlled waves. Join the waitlist for launch timing, early access, and a first look at the workflows teams use to run controls, evidence, and framework coverage without the chaos.",
    bullets: [
      "Be the first to know when we launch",
      "Get early access and exclusive updates",
      "Limited early access spots available",
    ],
  },
  application: {
    badge: "Product waitlist",
    headline: "Lock in priority access to the application experience",
    subhead:
      "You're already exploring the platform story, add your name and we'll reserve a spot for the private rollout, roadmap briefings, and framework coverage drops as we open the workspace.",
    bullets: [
      "Priority notifications for the application rollout",
      "Curated updates on dashboards, evidence, and integrations",
      "Limited early access spots available",
    ],
  },
};

export default function WaitlistSection({ source }: { source: PageSource }) {
  const prefersReducedMotion = useReducedMotion();
  const c = copy[source];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const resetLater = useCallback(() => {
    window.setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 6500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length < 2) {
      setStatus("error");
      setMessage("Please enter your full name.");
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");

    const payload: WaitlistRequestBody = {
      fullName: trimmedName,
      email: trimmedEmail,
      source,
      _gotcha: gotcha,
    };

    const result = await submitWaitlistRequest(payload);

    if (result.ok === false) {
      setStatus("error");
      setMessage(result.error);
      return;
    }

    setStatus("success");
    setMessage(result.message ?? "You're on the list. Check your inbox for confirmation.");
    setFullName("");
    setEmail("");
    setGotcha("");
    resetLater();
  };

  const disabled = status === "loading" || status === "success";

  return (
    <section
      id="waitlist"
      className="section-padding relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-muted/25 via-background to-muted/15"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-[380px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.10),transparent_55%)]" />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
        >
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <motion.div variants={revealUp} className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {c.badge}
              </div>

              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">
                {c.headline}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {c.subhead}
              </p>

              <ul className="mt-7 space-y-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground/90 md:text-[15px]">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 backdrop-blur-sm">
                  <Bell className="h-3.5 w-3.5 text-primary" aria-hidden />
                  No spam - launch updates only
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 backdrop-blur-sm">
                  Unsubscribe anytime
                </span>
              </div>
            </motion.div>

            <motion.div variants={revealUp}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-[1.35rem] border border-border/60 bg-card/80 shadow-elevated-lg backdrop-blur-xl ring-1 ring-primary/15",
                  "ring-1 ring-primary/10",
                  !prefersReducedMotion && "motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:-translate-y-0.5"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Join the waitlist
                      </div>
                      <div className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                        Reserve your spot
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Full name and work email, we’ll confirm instantly.
                      </p>
                    </div>
                    <div className="hidden h-11 w-11 shrink-0 rounded-2xl border border-border/60 bg-background/40 sm:flex sm:items-center sm:justify-center">
                      <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                  </div>

                  <form
                    className="relative mt-7 space-y-4"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={status === "loading"}
                  >
                    <div className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
                      <input
                        id={`waitlist-hp-${source}`}
                        tabIndex={-1}
                        autoComplete="new-password"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        data-bwignore
                        value={gotcha}
                        onChange={(e) => setGotcha(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`waitlist-name-${source}`} className="text-foreground">
                        Full name
                      </Label>
                      <Input
                        id={`waitlist-name-${source}`}
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        disabled={disabled}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jordan Rivera"
                        className="h-12 rounded-xl border-border/60 bg-background/50 text-base shadow-sm focus-visible:ring-primary/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`waitlist-email-${source}`} className="text-foreground">
                        Email address
                      </Label>
                      <Input
                        id={`waitlist-email-${source}`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={email}
                        disabled={disabled}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="h-12 rounded-xl border-border/60 bg-background/50 text-base shadow-sm focus-visible:ring-primary/30"
                      />
                    </div>

                    {status === "success" ? (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground"
                        role="status"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                        <div>
                          <div className="font-semibold">You’re in.</div>
                          <div className="mt-1 text-muted-foreground">{message}</div>
                        </div>
                      </motion.div>
                    ) : null}

                    {status === "error" ? (
                      <div
                        className="rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-foreground"
                        role="alert"
                      >
                        {message}
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={disabled}
                      className="glow-primary h-12 w-full rounded-xl text-base font-semibold"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                          Joining…
                        </>
                      ) : (
                        <>
                          Join the waitlist
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs leading-relaxed text-muted-foreground">
                      By joining, you agree we may email you about CertifyGRC. See our{" "}
                      <button
                        type="button"
                        className="text-primary underline-offset-4 hover:underline"
                        onClick={() => setPrivacyOpen(true)}
                      >
                        Privacy Policy
                      </button>
                      .
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </section>
  );
}

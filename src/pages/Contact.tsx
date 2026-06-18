import { useState } from "react";
import { BRAND_PRIMARY } from "@/lib/brandColors";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Handshake,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { heroImagery } from "@/constants/heroImagery";
import { formSubmitUserMessage } from "@/lib/formSubmitApi";
import { revealUp, scrollEase, scrollViewport, staggerContainer } from "@/lib/motion";
import { PremiumCard, PremiumCardGrid, PremiumCardStandalone } from "@/components/ui/PremiumCard";

const supportCategories = [
  { icon: MessageSquare, title: "Sales", description: "Learn about our platform and services", email: "sales@certifygrc.com" },
  { icon: Headphones, title: "Technical Support", description: "Get help with platform issues", email: "support@certifygrc.com" },
  { icon: Handshake, title: "Partnerships", description: "Explore partnership opportunities", email: "partners@certifygrc.com" },
];

const faqs = [
  { q: "What industries does CertifyGRC serve?", a: "We serve regulated industries including finance & banking, healthcare, government, IT & cybersecurity, manufacturing, and SMEs. Our solutions are adaptable to any organization that needs robust GRC capabilities." },
  { q: "How long does implementation typically take?", a: "Implementation timelines vary based on scope and complexity. A typical single-framework implementation takes 4-8 weeks, while multi-framework deployments may take 3-6 months." },
  { q: "Do you offer custom consulting engagements?", a: "Absolutely. Every consulting engagement is tailored to your organization's specific regulatory requirements, risk profile, and business objectives." },
  { q: "What frameworks does your platform support?", a: "Our platform supports NIST CSF, ISO 27001, SOC 2, PCI DSS, COBIT, ISO 20000, ISO 22301, ISO 42001, PIPEDA, and many more. We continuously add new framework support." },
  { q: "Is the platform available for on-premise deployment?", a: "Yes, our Enterprise plan includes an on-premise deployment option for organizations with strict data residency requirements." },
];

type Status = "idle" | "loading" | "success" | "error";

const defaultForm = {
  fullName: "",
  email: "",
  message: "",
};

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState(defaultForm);

  const setField = (field: keyof typeof defaultForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const full = formData.fullName.trim();
    const parts = full.split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || "—";

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email.trim(),
          subject: "Website contact — certifygrc.com",
          message: formData.message.trim(),
        }),
      });
      let json: Record<string, unknown> | null = null;
      try {
        const text = await res.text();
        if (text) json = JSON.parse(text) as Record<string, unknown>;
      } catch {
        /* non-JSON */
      }
      if (!res.ok || json?.success === false) {
        throw new Error(formSubmitUserMessage(res, json));
      }
      setStatus("success");
      setFormData(defaultForm);
      setTimeout(() => setStatus("idle"), 8000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        backgroundUrl={heroImagery.contact.background}
        foregroundUrl={heroImagery.contact.foreground}
        foregroundAlt={heroImagery.contact.foregroundAlt}
        overlay="strong"
        textEntrance="none"
        className="!pt-28 !pb-20 md:!pt-32 md:!pb-28 lg:min-h-[min(92vh,980px)] lg:flex lg:items-center"
      >
        <motion.div
          className="space-y-5"
          variants={heroStagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.span
            variants={revealUp}
            className="inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary"
          >
            Contact
          </motion.span>

          <motion.h1
            variants={revealUp}
            className="font-display font-bold tracking-tight text-white text-display-lg md:text-display-xl"
          >
            Premium Support for <span className="gradient-text">Regulated Teams</span>
          </motion.h1>

          <motion.p variants={revealUp} className="max-w-xl text-lg leading-relaxed text-white/85">
            Reach the right team fast sales, technical support, or partnerships. We&apos;ll respond with clarity and speed.
          </motion.p>

          <motion.div variants={revealUp} className="flex flex-wrap gap-3 pt-1">
            <a
              href="mailto:info@certifygrc.com"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              info@certifygrc.com
            </a>
            <a
              href="#contact-form"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-primary/35 bg-primary/15 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/25"
            >
              Message us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>

          <motion.p variants={revealUp} className="text-xs text-white/55 lg:text-sm">
            Typical response within one business day · urgent security matters prioritized.
          </motion.p>
        </motion.div>
      </PageHero>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <motion.div
                className="lg:col-span-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
              >
                <motion.div variants={revealUp}>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Get in touch</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Tell us what you need we&apos;ll route you to the right team and follow up with clear next steps.
                  </p>
                </motion.div>

                <PremiumCardStandalone padding="md" interactive={false} className="mt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
                      <Mail className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:info@certifygrc.com"
                        className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        info@certifygrc.com
                      </a>
                    </div>
                  </div>
                </PremiumCardStandalone>

                <motion.div variants={revealUp} className="mt-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                    Support channels
                  </div>
                  <PremiumCardGrid className="space-y-3">
                    {supportCategories.map((cat, i) => (
                      <PremiumCard key={cat.title} padding="sm" interactive={false} contentClassName="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `${BRAND_PRIMARY}14`,
                            color: BRAND_PRIMARY,
                          }}
                        >
                          <cat.icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-foreground">{cat.title}</h4>
                          <p className="text-xs text-muted-foreground">{cat.description}</p>
                        </div>
                        <a
                          href={`mailto:${cat.email}`}
                          className="shrink-0 text-xs font-semibold text-primary hover:underline"
                        >
                          {cat.email}
                        </a>
                      </PremiumCard>
                    ))}
                  </PremiumCardGrid>
                </motion.div>

                <motion.p variants={revealUp} className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  Mon–Fri · 9am–6pm ET
                </motion.p>
              </motion.div>

              <motion.div
                className="lg:col-span-7"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ ...scrollViewport, once: true }}
                transition={{ duration: 0.65, ease: [...scrollEase], delay: 0.08 }}
              >
                <PremiumCardStandalone id="contact-form" padding="lg" interactive={false} className="rounded-[1.35rem]">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">Send a message</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Full name, email, and your message we&apos;ll confirm receipt and respond within 24 hours on business days.
                  </p>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        className="flex flex-col items-center justify-center gap-4 py-14 text-center"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4, ease: [...scrollEase] }}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/12 ring-1 ring-primary/25">
                          <Send className="h-8 w-8 text-primary" aria-hidden />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground">Message received</h3>
                        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                          We&apos;ve sent a confirmation to your inbox and will reply within 24 hours during business days.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full name</Label>
                          <Input
                            id="fullName"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="Jordan Rivera"
                            value={formData.fullName}
                            onChange={setField("fullName")}
                            className="h-12 rounded-xl border-border/60 bg-background/90 text-base transition-shadow focus-visible:ring-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={setField("email")}
                            className="h-12 rounded-xl border-border/60 bg-background/90 text-base transition-shadow focus-visible:ring-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            required
                            rows={6}
                            placeholder="Tell us about your needs..."
                            value={formData.message}
                            onChange={setField("message")}
                            className="min-h-[160px] resize-y rounded-xl border-border/60 bg-background/90 text-base transition-shadow focus-visible:ring-primary/30"
                          />
                        </div>

                        {status === "error" ? (
                          <motion.div
                            className="flex items-center gap-2 rounded-xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            role="alert"
                          >
                            {errorMsg}
                          </motion.div>
                        ) : null}

                        <Button
                          type="submit"
                          size="lg"
                          className="glow-primary h-12 w-full rounded-xl text-base font-semibold"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="ml-2 h-4 w-4" aria-hidden />
                            </>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </PremiumCardStandalone>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <section className="pb-20 md:pb-28 lg:pb-32">
          <div className="container-wide">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
              <div className="lg:col-span-4">
              <PremiumCardStandalone padding="lg" interactive={false} className="h-full">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">Find us</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A clean, embedded map for quick location context styled to match the premium CertifyGRC experience.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:info@certifygrc.com"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        info@certifygrc.com
                      </a>
                    </div>
                  </div>
              </PremiumCardStandalone>
              </div>
              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-elevated-lg">
                  <iframe
                    title="CertifyGRC location map"
                    className="h-[280px] w-full sm:h-[360px] md:h-[420px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Toronto%2C%20ON&output=embed"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={120}>
        <section className="surface-section section-padding">
          <div className="container-narrow">
            <SectionHeading
              badge="FAQ"
              title="Frequently asked questions"
              description="Quick answers to common questions about CertifyGRC."
            />
            <Accordion type="single" collapsible className="mx-auto max-w-2xl">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

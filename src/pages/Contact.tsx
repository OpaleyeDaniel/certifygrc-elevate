import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Send, MessageSquare, Headphones, Handshake, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import ScrollReveal from "@/components/ScrollReveal";
import { revealUp, staggerContainer, scrollViewport } from "@/lib/motion";

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
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
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
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Safe JSON parse — handles empty/non-JSON responses gracefully
      let json: Record<string, unknown> | null = null;
      try {
        const text = await res.text();
        if (text) json = JSON.parse(text) as Record<string, unknown>;
      } catch {
        /* non-JSON response */
      }
      if (!res.ok || !json?.success) {
        throw new Error(
          (json?.error as string) ?? `Request failed (${res.status}). Please try again.`
        );
      }
      setStatus("success");
      setFormData(defaultForm);
      setTimeout(() => setStatus("idle"), 6000);
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
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
          Contact
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
          Premium Support for <span className="gradient-text">Regulated Teams</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Reach the right team fast — sales, technical support, or partnerships. We'll respond with
          clarity and speed.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="mailto:info@certifygrc.com"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm px-4 py-3 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-primary" />
            info@certifygrc.com
          </a>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary hover:bg-primary/15 transition-all duration-300 hover:-translate-y-0.5"
          >
            Message Us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </PageHero>

      {/* Contact Info + Form */}
      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Info */}
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4 p-4 rounded-xl glass">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Email</h3>
                      <a
                        href="mailto:info@certifygrc.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@certifygrc.com
                      </a>
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Support Categories
                </h3>
                <motion.div
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                >
                  {supportCategories.map((cat) => (
                    <motion.div
                      key={cat.title}
                      className="flex items-center gap-3 p-3 rounded-lg glass hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                      variants={revealUp}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <cat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{cat.title}</h4>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                      <a
                        href={`mailto:${cat.email}`}
                        className="ml-auto text-xs text-primary hover:underline shrink-0"
                      >
                        {cat.email}
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right - Form */}
              <div id="contact-form" className="glass rounded-2xl p-6 sm:p-8 glow-border">
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Send a Message
                </h2>
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="contact-success"
                      className="flex flex-col items-center justify-center py-16 gap-4"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                      >
                        <Send className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h3 className="font-display font-semibold text-xl text-foreground">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground text-center text-sm max-w-xs">
                        We've received your message and sent a confirmation to your email. We'll
                        respond within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            required
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={setField("firstName")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            required
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={setField("lastName")}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="Work email"
                          value={formData.email}
                          onChange={setField("email")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          required
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={setField("subject")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          required
                          placeholder="Tell us about your needs..."
                          rows={5}
                          value={formData.message}
                          onChange={setField("message")}
                        />
                      </div>

                      {status === "error" && (
                        <motion.div
                          className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errorMsg}
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        className="w-full glow-primary"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Map */}
      <ScrollReveal delayMs={100}>
        <section className="pb-20 md:pb-28 lg:pb-32">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4">
                <div className="glass rounded-2xl p-8 glow-border h-full">
                  <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                    Find Us
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A clean, embedded map for quick location context — styled to match the premium
                    CertifyGRC experience.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:info@certifygrc.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@certifygrc.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="glass rounded-2xl overflow-hidden glow-border">
                  <iframe
                    title="CertifyGRC location map"
                    className="w-full h-[300px] sm:h-[360px] md:h-[420px]"
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

      {/* FAQ */}
      <ScrollReveal delayMs={140}>
        <section className="section-padding bg-muted/20">
          <div className="container-narrow">
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              description="Quick answers to common questions about CertifyGRC."
            />
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

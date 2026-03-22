import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Headphones, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import contactHero from "@/assets/contact-hero.png";

const supportCategories = [
  { icon: MessageSquare, title: "Sales", description: "Learn about our platform and services", email: "sales@certifygrc.com" },
  { icon: Headphones, title: "Technical Support", description: "Get help with platform issues", email: "support@certifygrc.com" },
  { icon: Handshake, title: "Partnerships", description: "Explore partnership opportunities", email: "partners@certifygrc.com" },
];

const faqs = [
  { q: "What industries does CertifyGRC serve?", a: "We serve regulated industries including finance & banking, healthcare, government, IT & cybersecurity, manufacturing, and SMEs. Our solutions are adaptable to any organization that needs robust GRC capabilities." },
  { q: "How long does implementation typically take?", a: "Implementation timelines vary based on scope and complexity. A typical single-framework implementation takes 4-8 weeks, while multi-framework deployments may take 3-6 months." },
  { q: "Do you offer custom consulting engagements?", a: "Absolutely. Every consulting engagement is tailored to your organization's specific regulatory requirements, risk profile, and business objectives." },
  { q: "What frameworks does your platform support?", a: "Our platform supports NIST CSF, ISO 27001, SOC 2, PCI DSS, COBIT, ISO 20000, ISO 22301, ISO 42001, PIPEDA, and many more." },
  { q: "Is the platform available for on-premise deployment?", a: "Yes, our Enterprise plan includes an on-premise deployment option for organizations with strict data residency requirements." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Contact Us
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6 leading-[1.1]">
                Connect <span className="gradient-text">With Us</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Feel free to reach out to us using the options below, and our dedicated team will respond to your inquiries promptly.
              </p>
            </div>
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden glow-border shadow-2xl shadow-primary/5">
                <img src={contactHero} alt="CertifyGRC Support Hub" className="w-full h-auto" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <ScrollReveal>
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">How can we help?</h2>
                <p className="text-muted-foreground mb-6 text-sm">Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.</p>
                <div className="space-y-4 mb-10">
                  {[
                    { icon: MapPin, label: "Office", value: "325 Front St W, Suite 300, Toronto, ON M5V 2Y1" },
                    { icon: Mail, label: "Email", value: "info@certifygrc.com" },
                    { icon: Phone, label: "Phone", value: "+1 (942) 788-2515" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl glass group hover-lift">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Support Categories</h3>
                <div className="space-y-3">
                  {supportCategories.map((cat) => (
                    <div key={cat.title} className="flex items-center gap-3 p-3 rounded-lg glass group hover-lift">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <cat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{cat.title}</h4>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Form */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-8 glow-border">
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4 animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground text-center text-sm">We'll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required placeholder="Your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required placeholder="Your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="you@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" required placeholder="Tell us about your needs..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full glow-primary active:scale-[0.97] transition-transform">
                      Submit Form <Send className="w-4 h-4 ml-1" />
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/20">
        <div className="container-narrow">
          <ScrollReveal>
            <SectionHeading badge="FAQ" title="Frequently Asked Questions" description="Quick answers to common questions about CertifyGRC." />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-foreground">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

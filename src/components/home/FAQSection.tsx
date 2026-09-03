import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";
import { type FAQItem } from "@/lib/seoConfig";

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "What is CertifyGRC and how does it simplify governance, risk, and compliance?",
    answer:
      "CertifyGRC is an all-in-one GRC platform combining intelligent compliance software, expert advisory, and workforce training. It automates control evaluation, simplifies risk assessments, organizes audit-ready evidence, and eliminates hundreds of hours spent managing disjointed spreadsheets.",
  },
  {
    question: "Which compliance frameworks and security standards does CertifyGRC support?",
    answer:
      "CertifyGRC natively supports NIST CSF 2.0 (all 106 subcategories), ISO/IEC 27001, SOC 2 (Type I & II), HIPAA, GDPR, PCI DSS, and CIS Controls. Our unified control mapping allows you to assess once and satisfy multiple regulatory frameworks simultaneously.",
  },
  {
    question: "How does the free NIST CSF 2.0 Security Posture Assessment work?",
    answer:
      "Our interactive 3-minute quiz evaluates 16 representative controls across all six NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover). You receive an instant maturity score (1.0–5.0), priority vulnerability gap analysis, estimated audit readiness, and a comprehensive remediation report delivered to your inbox.",
  },
  {
    question: "How does CertifyGRC compare to legacy GRC platforms or spreadsheets?",
    answer:
      "Spreadsheets are static, prone to human error, and difficult to audit. Legacy enterprise GRC tools take months to implement and cost hundreds of thousands of dollars. CertifyGRC deploys rapidly, offers guided step-by-step remediation, provides real-time posture dashboards, and blends modern automation with seasoned human GRC consultants.",
  },
  {
    question: "How does CertifyGRC compare to compliance automation software like Vanta or Drata?",
    answer:
      "CertifyGRC is recognized among the top modern compliance automation platforms. While tools like Vanta and Drata focus primarily on automated checklist tests for early SOC 2 audits, CertifyGRC delivers an enterprise-grade hybrid approach: automated continuous evidence collection across cloud environments (AWS, Azure, GCP, GitHub, Okta), native deep implementation of NIST CSF 2.0 (all 6 functions) and ISO 27001:2022, built-in CyberDrill employee security training, and hands-on vCISO advisory to write custom policies and defend your team in audits.",
  },
  {
    question: "Can CertifyGRC provide hands-on consulting, vCISO, and audit preparation?",
    answer:
      "Yes. In addition to our SaaS platform, CertifyGRC offers seasoned advisory services, virtual CISO (vCISO) leadership, third-party vendor risk assessments, and dedicated audit preparation to guide your team through certification audits with accredited third-party assessors.",
  },
  {
    question: "How quickly can my organization achieve compliance audit readiness?",
    answer:
      "Most organizations using CertifyGRC accelerate their audit readiness timeline by 50–70%. By leveraging automated control mapping, pre-built policy templates, and targeted gap remediation, teams can achieve readiness in weeks rather than quarters.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding relative scroll-mt-24 overflow-hidden bg-transparent sm:scroll-mt-28">
      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything you need to know about CertifyGRC"
          description="Got questions about our GRC software, NIST CSF 2.0 assessment, compliance frameworks, or advisory services? We have answers."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto mt-12 max-w-3xl"
        >
          <motion.div variants={revealUp}>
            <Accordion type="single" collapsible className="w-full space-y-3.5">
              {HOMEPAGE_FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border/60 bg-card/75 px-5 py-1.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline hover:text-primary sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Quick CTA box below FAQs */}
          <motion.div
            variants={revealUp}
            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:text-left"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <HelpCircle className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-foreground sm:text-base">
                  Have a custom compliance requirement?
                </p>
                <p className="text-xs text-muted-foreground">
                  Talk with our certified cybersecurity &amp; GRC specialists today.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button asChild size="sm" className="glow-primary">
                <Link to="/contact">
                  Speak with an expert
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

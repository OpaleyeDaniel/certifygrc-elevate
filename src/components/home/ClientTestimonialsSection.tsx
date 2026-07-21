import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { revealUp, scrollViewport, staggerContainer } from "@/lib/motion";

const TESTIMONIALS = [
  {
    company: "PSE",
    quote:
      "CertifyGRC gave us a structured NIST CSF program we could actually run — not another shelfware platform. Our audit prep time dropped significantly.",
    role: "Compliance & Risk Leadership",
  },
  {
    company: "A4S",
    quote:
      "The workflow from assessment to evidence collection is seamless. Our team finally has one place to collaborate instead of chasing spreadsheets and email threads.",
    role: "Security & GRC Team",
  },
] as const;

export default function ClientTestimonialsSection() {
  return (
    <section className="section-padding bg-muted/15">
      <div className="container-wide">
        <SectionHeading
          badge="Trusted by teams"
          title="What our customers say"
          description="Organizations using CertifyGRC to operationalize compliance and strengthen cyber resilience."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
        >
          {TESTIMONIALS.map((item, index) => (
            <motion.blockquote
              key={item.company}
              variants={revealUp}
              custom={index * 0.06}
              className="rounded-2xl border border-border/50 bg-card p-7 sm:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-extrabold text-primary">
                {item.company}
              </div>
              <p className="text-base leading-relaxed text-foreground/90">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{item.company}</span>
                <span className="mx-1.5" aria-hidden>
                  ·
                </span>
                {item.role}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

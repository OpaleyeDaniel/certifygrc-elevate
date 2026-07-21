import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { BRAND_PRIMARY, brandAccentAt, brandRgb } from "@/lib/brandColors";
import { scrollEase, scrollViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  company: string;
  name: string;
  quote: string;
  role: string;
  accentIndex: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    company: "PSE",
    name: "Sarah Chen",
    quote:
      "CertifyGRC gave us a structured NIST CSF program we could actually run — not another shelfware platform. Our audit prep time dropped significantly.",
    role: "Compliance & Risk Leadership",
    accentIndex: 0,
  },
  {
    company: "A4S",
    name: "Marcus Webb",
    quote:
      "The workflow from assessment to evidence collection is seamless. Our team finally has one place to collaborate instead of chasing spreadsheets and email threads.",
    role: "Security & GRC Team",
    accentIndex: 1,
  },
  {
    company: "Meridian Health",
    name: "Dr. Elena Ruiz",
    quote:
      "We mapped HIPAA and NIST CSF in one workspace — auditors finally get a single evidence trail instead of a folder of PDFs scattered across departments.",
    role: "Chief Information Security Officer",
    accentIndex: 2,
  },
  {
    company: "Northgate Capital",
    name: "James Okonkwo",
    quote:
      "Executive reporting went from weekly manual pulls to live dashboards. Our board sees compliance posture the same way our GRC team does — in real time.",
    role: "VP Compliance & Regulatory Affairs",
    accentIndex: 3,
  },
  {
    company: "Vertex Industrial",
    name: "Priya Nair",
    quote:
      "CyberDrill plus structured controls cut our phishing click rate in half within two quarters. Readiness is measurable, not anecdotal anymore.",
    role: "Director of IT Security",
    accentIndex: 4,
  },
  {
    company: "Horizon Municipal",
    name: "David Kim",
    quote:
      "Multi-department rollout used to mean ten versions of the truth. CertifyGRC gave us one program, clear ownership, and export-ready audit packs.",
    role: "Deputy CIO, Public Sector",
    accentIndex: 5,
  },
];

const TRUST_PILLS = [
  "NIST CSF 2.0 programs",
  "Audit-ready evidence",
  "Cross-framework mapping",
  "Executive reporting",
  "CyberDrill readiness",
] as const;

const ROW_A = TESTIMONIALS.slice(0, 3);
const ROW_B = TESTIMONIALS.slice(3);

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

function TestimonialCard({ item, className }: { item: Testimonial; className?: string }) {
  const accent = brandAccentAt(item.accentIndex);

  return (
    <article
      className={cn(
        "group relative flex w-[min(100%,22rem)] shrink-0 flex-col overflow-hidden rounded-[1.35rem] p-6 sm:w-[26rem] sm:p-7",
        "border border-border/70 bg-card backdrop-blur-md",
        "shadow-[0_20px_48px_-28px_rgba(48,92,222,0.16)]",
        "transition-[transform,box-shadow,border-color] duration-500",
        "hover:-translate-y-1 hover:border-primary/30",
        "dark:border-white/[0.08] dark:bg-[hsl(225,42%,9%)]/90",
        "dark:shadow-[0_20px_48px_-28px_rgba(0,0,0,0.65)] dark:hover:border-primary/35",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${accent}33` }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-display text-xs font-extrabold tracking-wide"
          style={{
            borderColor: `${accent}44`,
            background: `${accent}18`,
            color: accent,
            boxShadow: `0 0 24px -8px ${accent}55`,
          }}
        >
          {item.company
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 3)
            .toUpperCase()}
        </div>
        <Quote className="h-8 w-8 shrink-0 text-primary/25" aria-hidden />
      </div>

      <StarRating />

      <p className="relative mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90 sm:text-base">
        &ldquo;{item.quote}&rdquo;
      </p>

      <footer className="relative mt-6 border-t border-border/60 pt-5 dark:border-white/[0.06]">
        <p className="font-display text-sm font-bold text-foreground">{item.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground/85">{item.company}</span>
          <span className="mx-1.5" aria-hidden>
            ·
          </span>
          {item.role}
        </p>
      </footer>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  durationClass = "motion-safe:[animation-duration:52s]",
}: {
  items: Testimonial[];
  reverse?: boolean;
  durationClass?: string;
}) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-5 py-1 sm:gap-6",
          reverse
            ? "motion-safe:animate-marquee-stream-reverse motion-reduce:animate-none"
            : "motion-safe:animate-marquee-stream motion-reduce:animate-none",
          durationClass,
          "motion-safe:hover:[animation-play-state:paused]",
        )}
      >
        {track.map((item, index) => (
          <TestimonialCard key={`${item.company}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function StaticGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {TESTIMONIALS.map((item, index) => (
        <motion.div
          key={item.company}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.6, ease: scrollEase, delay: index * 0.06 }}
          className="min-w-0"
        >
          <TestimonialCard item={item} className="w-full max-w-none sm:w-auto" />
        </motion.div>
      ))}
    </div>
  );
}

export default function ClientTestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden bg-muted/20 dark:bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, ${brandRgb(0.08)} 0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 10% 80%, rgba(74,111,212,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 90% 70%, rgba(91,127,232,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[100px] opacity-50 motion-safe:animate-ambient-drift-slow dark:opacity-100"
        style={{ background: `${BRAND_PRIMARY}14` }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(48,92,222,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeading
          badge="Trusted by teams"
          title="What our customers say"
          description="Organizations using CertifyGRC to operationalize compliance and strengthen cyber resilience."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.65, ease: scrollEase, delay: 0.08 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2.5 md:mb-12"
        >
          {TRUST_PILLS.map((pill, index) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.45, ease: scrollEase, delay: 0.12 + index * 0.05 }}
              className="rounded-full border border-primary/20 bg-primary/[0.07] px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-primary/90 sm:text-xs"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {reduceMotion ? (
          <StaticGrid />
        ) : (
          <>
            <div className="md:hidden">
              <StaticGrid />
            </div>
            <div className="relative hidden space-y-5 md:block sm:space-y-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24 md:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24 md:w-32" />

              <MarqueeRow items={ROW_A} durationClass="motion-safe:[animation-duration:48s]" />
              <MarqueeRow
                items={ROW_B.length > 0 ? ROW_B : ROW_A}
                reverse
                durationClass="motion-safe:[animation-duration:56s]"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

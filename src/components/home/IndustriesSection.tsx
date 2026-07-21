import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landmark, Heart, Monitor, Banknote, Factory, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { scrollEase } from "@/lib/motion";
import { brandAccentAt } from "@/lib/brandColors";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  {
    id: "government",
    icon: Landmark,
    name: "Government",
    heading: "Government Compliance Solutions",
    intro: "Keep public-sector programs audit-ready across every department:",
    bullets: [
      "Map controls to NIST CSF 2.0 and federal reporting requirements",
      "Track risk posture across departments in one dashboard",
      "Keep audit evidence organized and defensible",
    ],
    image: "/home-industries/government.png",
    imageAlt: "Government sector — public sector compliance and governance",
  },
  {
    id: "healthcare",
    icon: Heart,
    name: "Healthcare",
    heading: "Healthcare Compliance Solutions",
    intro: "Protect patients and stay accreditation-ready:",
    bullets: [
      "Protect patient data with privacy-aligned controls",
      "Track vendor and third-party risk across your care network",
      "Stay audit-ready for accreditation and regulatory reviews",
    ],
    image: "/home-industries/healthcare.png",
    imageAlt: "Healthcare sector — clinical compliance and patient data protection",
  },
  {
    id: "it-cyber",
    icon: Monitor,
    name: "IT & Cybersecurity",
    heading: "IT & Cybersecurity Compliance Solutions",
    intro: "Turn a framework into an operating rhythm:",
    bullets: [
      "Operationalize NIST CSF 2.0 across every control function",
      "Automate evidence collection instead of chasing screenshots",
      "Give auditors real-time visibility into control status",
    ],
    image: "/home-industries/it-cybersecurity.png",
    imageAlt: "IT and cybersecurity — digital risk and security operations",
  },
  {
    id: "finance",
    icon: Banknote,
    name: "Finance & Banking",
    heading: "Finance & Banking Compliance Solutions",
    intro: "Meet regulatory expectations without slowing the business down:",
    bullets: [
      "Align governance with OSFI and industry risk expectations",
      "Monitor third-party and technology risk continuously",
      "Generate audit-ready reports in a fraction of the time",
    ],
    image: "/home-industries/finance-banking.png",
    imageAlt: "Finance and banking — regulatory compliance and risk management",
  },
  {
    id: "manufacturing",
    icon: Factory,
    name: "Manufacturing",
    heading: "Manufacturing Compliance Solutions",
    intro: "Keep every site accountable from one system:",
    bullets: [
      "Manage supply-chain and vendor risk from one system",
      "Track safety and compliance evidence across every site",
      "Keep control ownership clear across distributed teams",
    ],
    image: "/home-industries/manufacturing.png",
    imageAlt: "Manufacturing sector — industrial compliance and supply chain controls",
  },
  {
    id: "smes",
    icon: Users,
    name: "SMEs",
    heading: "SME Compliance Solutions",
    intro: "Enterprise-grade compliance, sized for a growing team:",
    bullets: [
      "Get enterprise-grade compliance without enterprise overhead",
      "Start with the frameworks that matter, scale as you grow",
      "Spend less time on spreadsheets, more time operating",
    ],
    image: "/home-industries/smes.png",
    imageAlt: "Small and medium enterprises — scalable GRC for growing teams",
  },
] as const;

type IndustryTab = (typeof INDUSTRIES)[number];

function TabButton({
  industry,
  isActive,
  onClick,
}: {
  industry: IndustryTab;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all duration-300 sm:px-5",
        isActive
          ? "border-transparent text-white shadow-[0_10px_28px_-10px_rgba(48,92,222,0.55)]"
          : "border-primary/15 bg-primary/[0.05] text-foreground/85 hover:-translate-y-0.5 hover:border-primary/25",
      )}
      style={isActive ? { background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" } : undefined}
    >
      <industry.icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.9} aria-hidden />
      <span className="whitespace-nowrap">{industry.name}</span>
    </button>
  );
}

function IndustryVisual({ industry, accent }: { industry: IndustryTab; accent: string }) {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#0a0e16] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)] sm:min-h-[420px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={industry.id}
          src={industry.image}
          alt={industry.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          draggable={false}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [...scrollEase] }}
        />
      </AnimatePresence>

      {/* Subtle edge vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-white/[0.08]"
      />

      {/* Industry label chip */}
      <div
        className="absolute bottom-4 left-4 z-[2] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-md"
      >
        <industry.icon className="h-4 w-4" style={{ color: accent }} strokeWidth={1.8} aria-hidden />
        <span className="text-xs font-semibold text-white/90">{industry.name}</span>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const activeIndex = INDUSTRIES.findIndex((i) => i.id === activeId);
  const active = INDUSTRIES[activeIndex];
  const accent = brandAccentAt(activeIndex);

  return (
    <section className="section-padding bg-transparent">
      <div className="container-wide">
        <SectionHeading
          badge="Industries"
          title="Simplifying compliance across sectors"
          description="See how CertifyGRC applies to your industry — pick a sector below."
        />

        {/* Tab row — horizontal scroll on phones */}
        <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:mb-12 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {INDUSTRIES.map((industry) => (
            <TabButton
              key={industry.id}
              industry={industry}
              isActive={industry.id === activeId}
              onClick={() => setActiveId(industry.id)}
            />
          ))}
        </div>

        {/* Content panel — swaps with the active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [...scrollEase] }}
            className="grid gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {/* Left: tinted copy card */}
            <div
              className="flex flex-col justify-center rounded-[1.75rem] border p-8 sm:p-10 lg:p-12"
              style={{ background: `${accent}0d`, borderColor: `${accent}28` }}
            >
              <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
                {active.heading}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{active.intro}</p>
              <ul className="mt-3 space-y-2.5">
                {active.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85 sm:text-[15px]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>

              <Link
                to="/software"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>

            {/* Right: industry photography */}
            <IndustryVisual industry={active} accent={accent} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

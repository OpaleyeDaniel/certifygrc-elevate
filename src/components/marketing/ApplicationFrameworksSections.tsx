import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import FrameworkImageMarquee from "@/components/visual/FrameworkImageMarquee";
import { applicationDashboards } from "@/constants/applicationDashboards";

type Props = {
  showCtas?: boolean;
  /** Hide the centered “Compliance and Privacy Frameworks…” block (e.g. when the hero already shows it). */
  hideIntroBlock?: boolean;
};

/** High-contrast product shot frame — readable dashboard chrome on marketing pages */
const imgFrame =
  "group relative rounded-[1.35rem] overflow-hidden border-2 border-primary/25 bg-gradient-to-b from-muted/40 via-card to-muted/30 shadow-[0_28px_70px_-24px_rgba(37,99,235,0.35),0_0_0_1px_rgba(15,23,42,0.06)] ring-2 ring-primary/10";

/** Scaled for visual dominance — transform preserves aspect ratio (no stretch) */
const imgClass =
  "relative z-[1] w-[108%] max-w-none -translate-x-[3.7%] sm:w-[112%] sm:-translate-x-[5.4%] md:w-[118%] md:-translate-x-[7.6%] lg:w-[125%] lg:-translate-x-[10%] min-h-[min(68vw,460px)] sm:min-h-[480px] md:min-h-[min(54vh,540px)] lg:min-h-[min(68vh,760px)] max-h-[min(94vh,880px)] object-contain object-top bg-gradient-to-b from-muted/50 to-card transition-transform duration-500 ease-out group-hover:scale-[1.01]";

export default function ApplicationFrameworksSections({ showCtas = true, hideIntroBlock = false }: Props) {
  const d = applicationDashboards;

  return (
    <>
      <ScrollReveal>
        <section className="pt-8 md:pt-12 pb-4 border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent">
          <div className="container-wide mb-3">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Framework coverage — live from your compliance program
            </p>
          </div>
          <FrameworkImageMarquee />
        </section>
      </ScrollReveal>

      {!hideIntroBlock && (
        <ScrollReveal>
          <section className="section-padding">
            <div className="container-wide max-w-4xl mx-auto text-center">
              <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary border border-primary/20">
                Frameworks
              </span>
              <h2 className="mt-6 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
                Compliance and Privacy Frameworks, <span className="gradient-text">Automated</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                CertifyGRC Software offers a robust suite of over 3 industry-leading compliance frameworks, including{" "}
                <strong className="text-foreground font-medium">
                  NIST CSF, ISO 27001, SOC 2, PCI-DSS, PIPEDA, COBIT, NIST AI RMF, ISO 20000, ISO 22301, ISO 42001
                </strong>
                .
              </p>
              {showCtas && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="outline" className="border-primary/30">
                    <Link to="/contact">Talk with an Advisor</Link>
                  </Button>
                  <Button asChild className="glow-primary">
                    <Link to="/software">Explore Application</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="section-padding bg-muted/25">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Frameworks</span>
                <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-foreground">
                  Tailored to your company&apos;s needs
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Users can delve into detailed clauses and controls specified by these standards, gaining clarity on necessary actions to take through the implementation guidance provided by the software.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  With our efficient evidence mapping system; organizations can map the evidence required to demonstrate compliance against specific controls, ensuring thorough documentation and audit readiness.
                </p>
              </div>
              <div className={`${imgFrame} hover-lift p-1 sm:p-2`}>
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-inner min-h-[min(58vw,360px)] sm:min-h-[400px] md:min-h-[440px] flex justify-center">
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 rounded-full bg-background/90 backdrop-blur-md border border-primary/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                    Controls & Evidence Mapping
                  </div>
                  <img
                    src={d.tailored}
                    alt="CertifyGRC GRC command center dashboard — real-time posture and workflow"
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={`order-2 lg:order-1 ${imgFrame} hover-lift p-1 sm:p-2`}>
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-inner min-h-[min(58vw,360px)] sm:min-h-[400px] md:min-h-[440px] flex justify-center">
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 rounded-full bg-background/90 backdrop-blur-md border border-primary/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                    ISO 27001 Compliance
                  </div>
                  <img
                    src={d.iso}
                    alt="CertifyGRC framework assessment workspace — structured controls and progress"
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  ISO 27001 Compliance <span className="gradient-text">with CertifyGRC</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  CertifyGRC provides an end-to-end solution to help businesses navigate ISO 27001 compliance with ease.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Implementation Made Easy", "Risk Management & Continuous Monitoring", "Improve customer retention"].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding bg-muted/25">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  PCI DSS Compliance <span className="gradient-text">with CertifyGRC</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  CertifyGRC streamlines PCI DSS compliance by automating security control assessments, tracking compliance gaps, and facilitating audits
                </p>
                <ul className="mt-6 space-y-3">
                  {["PCI DSS Control Implementation & Assessment", "Risk-Based Approach to Payment Security", "Audit & Compliance Reporting"].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${imgFrame} hover-lift p-1 sm:p-2`}>
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-inner min-h-[min(58vw,360px)] sm:min-h-[400px] md:min-h-[440px] flex justify-center">
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 rounded-full bg-background/90 backdrop-blur-md border border-primary/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                    PCI DSS Compliance
                  </div>
                  <img
                    src={d.pci}
                    alt="CertifyGRC audit report and compliance evidence workspace"
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={`order-2 lg:order-1 ${imgFrame} hover-lift p-1 sm:p-2`}>
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-inner min-h-[min(58vw,360px)] sm:min-h-[400px] md:min-h-[440px] flex justify-center">
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 rounded-full bg-background/90 backdrop-blur-md border border-primary/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                    SOC 2 Trust Services
                  </div>
                  <img
                    src={d.soc}
                    alt="CertifyGRC auditor workspace — control verification and review"
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  SOC 2 Compliance <span className="gradient-text">with CertifyGRC</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  CertifyGRC provides a comprehensive approach to achieving and maintaining SOC 2 compliance.
                </p>
                <ul className="mt-6 space-y-3">
                  {["SOC 2 Trust Principles Implementation", "Risk & Security Management", "Audit & Evidence Management"].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { PremiumCardStandalone } from "@/components/ui/PremiumCard";
import SEO from "@/components/seo/SEO";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms & Conditions | CertifyGRC"
        description="Review the terms, conditions, and acceptable use policies for CertifyGRC software, consulting, and training services."
        canonical="https://certifygrc.com/terms"
      />
      <ScrollReveal>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="container-narrow relative z-10">
            <SectionHeading
              badge="Legal"
              title="Terms & Conditions"
              description="These terms govern access to and use of the CertifyGRC website and services."
            />
            <PremiumCardStandalone padding="lg" className="prose prose-slate max-w-none">
              <p>
                This page is a placeholder. Replace this content with your company&apos;s official Terms & Conditions.
              </p>
              <h3>Use of Services</h3>
              <p>
                By using CertifyGRC services, you agree to comply with applicable laws and our acceptable use requirements.
              </p>
              <h3>Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, CertifyGRC will not be liable for indirect, incidental, or consequential damages.
              </p>
              <h3>Contact</h3>
              <p>
                Questions about these terms can be sent to <a href="mailto:info@certifygrc.com">info@certifygrc.com</a>.
              </p>
            </PremiumCardStandalone>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

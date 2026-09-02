import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { PremiumCardStandalone } from "@/components/ui/PremiumCard";
import SEO from "@/components/seo/SEO";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | CertifyGRC"
        description="Learn how CertifyGRC collects, processes, and protects your personal data and ensures enterprise-grade privacy standards."
        canonical="https://certifygrc.com/privacy"
      />
      <ScrollReveal>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg" />
          <div className="container-narrow relative z-10">
            <SectionHeading
              badge="Legal"
              title="Privacy Policy"
              description="How CertifyGRC collects, uses, and protects personal information."
            />
            <PremiumCardStandalone padding="lg" className="max-w-3xl mx-auto">
              <PrivacyPolicyContent />
            </PremiumCardStandalone>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

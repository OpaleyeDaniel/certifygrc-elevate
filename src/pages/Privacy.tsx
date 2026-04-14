import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPage() {
  return (
    <>
      <ScrollReveal>
        <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="container-narrow relative z-10">
          <SectionHeading
            badge="Legal"
            title="Privacy Policy"
            description="How CertifyGRC collects, uses, and protects personal information."
          />
          <div className="glass rounded-2xl p-8 md:p-10 glow-border prose prose-slate dark:prose-invert max-w-none">
            <p>
              This page is a placeholder. Replace this content with your company’s official Privacy Policy.
            </p>
            <h3>Information We Collect</h3>
            <p>
              We may collect information you provide in forms (such as name, work email, and company details) and basic usage analytics.
            </p>
            <h3>How We Use Information</h3>
            <p>
              We use information to respond to requests, provide services, and improve the platform experience.
            </p>
            <h3>Contact</h3>
            <p>
              Privacy questions can be sent to <a href="mailto:info@certifygrc.com">info@certifygrc.com</a>.
            </p>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}


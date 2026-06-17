/**
 * Shared privacy policy copy — used by the full /privacy page and the in-form modal.
 */
export default function PrivacyPolicyContent({ className }: { className?: string }) {
  return (
    <div className={className}>
      <section className="space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">Introduction</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          CertifyGRC (“we,” “us,” or “our”) respects your privacy. This notice explains how we handle
          personal information when you use our website, submit forms (including partner and early
          access requests), or communicate with our team. It is designed to be clear and practical.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Information we collect
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We collect information that you choose to provide, such as your name, work email, company,
          job title, organization details, and any content you include in forms or messages. We may
          also collect limited technical data automatically (for example, browser type, general
          location derived at a coarse level from IP, and pages visited) to operate and improve the
          site and to protect against abuse.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          How we use your information
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We use personal information to respond to inquiries, evaluate partnership or early access
          requests, schedule demos, deliver services, operate and secure our platform, comply with
          legal obligations, and understand how our website is used so we can improve the experience.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Communication and updates
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          If you opt in to product updates or announcements, we may send relevant email
          communications. You can withdraw marketing consent at any time using the unsubscribe link
          in those emails or by contacting us. We may still send transactional messages related to
          your requests (for example, confirmations of form submissions) where necessary.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Data protection
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We implement reasonable technical and organizational measures designed to protect personal
          information against unauthorized access, loss, or misuse. No method of transmission over
          the internet is completely secure; please avoid sharing sensitive credentials through
          unsecured channels.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">Retention</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We retain information only as long as needed for the purposes described here, including to
          manage our relationship with you, meet legal or regulatory requirements, and resolve
          disputes. Retention periods vary depending on the type of interaction and applicable law.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Third-party services
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          We may use trusted service providers (such as hosting, email delivery, and analytics) to
          operate our services. Those providers process data on our behalf under contractual
          safeguards and only for authorized purposes. We do not sell your personal information.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">Your rights</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Depending on where you live, you may have rights to access, correct, delete, or restrict
          certain processing of your personal information, or to object to certain uses. To exercise
          these rights, contact us using the details below. We will respond within a reasonable
          timeframe and in line with applicable law.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Contact information
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          For privacy-related questions or requests, contact us at{" "}
          <a href="mailto:info@certifygrc.com" className="font-medium text-primary hover:underline">
            info@certifygrc.com
          </a>
          . You may also reach us through the contact options listed on our website.
        </p>
      </section>

      <p className="mt-10 border-t border-border/60 pt-6 text-xs leading-relaxed text-muted-foreground">
        Last updated: April 15, 2026. We may update this policy from time to time; the current version
        will always be available here.
      </p>
    </div>
  );
}

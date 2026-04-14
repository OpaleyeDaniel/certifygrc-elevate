import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Application", path: "/software" },
    { label: "Frameworks", path: "/frameworks" },
    { label: "Consulting Services", path: "/consulting" },
    { label: "E-Learning", path: "/e-learning" },
    { label: "Alliance", path: "/partner" },
  ],
  Company: [
    { label: "About", path: "/company" },
    { label: "Contact Us", path: "/contact" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ],
  Frameworks: [
    { label: "ISO 27001", path: "/frameworks" },
    { label: "PCI DSS 4.0", path: "/frameworks" },
    { label: "SOC 2", path: "/frameworks" },
    { label: "NIST CSF", path: "/frameworks" },
    { label: "PIPEDA", path: "/frameworks" },
    { label: "NIST AI RMF", path: "/frameworks" },
    { label: "COBIT", path: "/frameworks" },
    { label: "ISO 20000", path: "/frameworks" },
    { label: "ISO 22301", path: "/frameworks" },
    { label: "ISO 42001", path: "/frameworks" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/certifygrc-logo.png" alt="CertifyGRC" className="h-8 w-auto" loading="eager" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              CertifyGRC is a governance, risk, and compliance (GRC) company delivering technology enabled solutions that help organizations operationalize trust, meet regulatory expectations, and scale with confidence.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:info@certifygrc.com"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@certifygrc.com
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 CertifyGRC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
            <span className="hidden md:block w-px h-5 bg-border/60" />
            <a
              href="https://www.linkedin.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

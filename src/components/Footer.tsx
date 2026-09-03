import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const footerLinks = {
  Platform: [
    { label: "Application", path: "/software" },
    { label: "Frameworks", path: "/frameworks" },
    { label: "Consulting Services", path: "/consulting" },
    { label: "CyberDrill", path: "/cyber-aware" },
    { label: "Alliance", path: "/partner" },
    { label: "Free Posture Assessment", path: "/free-assessment" },
  ],
  Solutions: [
    { label: "NIST CSF 2.0 Software", path: "/solutions/nist-csf-2-0" },
    { label: "ISO 27001 Automation", path: "/solutions/iso-27001" },
    { label: "SOC 2 Type II", path: "/frameworks" },
    { label: "PCI DSS 4.0", path: "/frameworks" },
    { label: "OSFI B-10 / B-13", path: "/frameworks" },
    { label: "ISO 42001 (AI)", path: "/frameworks" },
  ],
  Company: [
    { label: "About", path: "/company" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border" style={{ background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)" }}>
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <BrandLogo linked size="md" className="mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-sm">
              CertifyGRC delivers technology-enabled GRC solutions that help organizations operationalize trust,
              meet regulatory expectations, and scale with confidence.
            </p>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <a
                href="mailto:info@certifygrc.com"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                info@certifygrc.com
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-foreground/70 mb-4">{title}</h4>
              <ul className="space-y-2.5">
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
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70">
            © 2026 CertifyGRC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:block w-px h-4 bg-border/60" />
            <a
              href="https://www.linkedin.com"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

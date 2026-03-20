import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/certifygrc-logo.png";

const footerLinks = {
  Platform: [
    { label: "Software", path: "/software" },
    { label: "Consulting", path: "/consulting" },
    { label: "E-Learning", path: "/e-learning" },
  ],
  Company: [
    { label: "Contact", path: "/contact" },
    { label: "Partners", path: "/partner" },
  ],
  Frameworks: [
    { label: "ISO 27001", path: "/consulting" },
    { label: "SOC 2", path: "/consulting" },
    { label: "NIST CSF", path: "/consulting" },
    { label: "PCI DSS", path: "/consulting" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="CertifyGRC" className="h-8 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Practical GRC solutions — simplified, intelligent, and secure. Empowering organizations to navigate governance, risk, and compliance with confidence.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                325 Front St W, Suite 300, Toronto, ON M5V 2Y1
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@certifygrc.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +1 (942) 788-2515
              </div>
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
            © {new Date().getFullYear()} CertifyGRC. A trading name under SandBP Canada. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

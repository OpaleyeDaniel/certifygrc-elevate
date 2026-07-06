export type Framework = {
  name: string;
  image: string;
  description: string;
};

/** Shared framework badge data — used by the homepage cross-marquee banner and FrameworksSection. */
export const FRAMEWORKS: Framework[] = [
  { name: "COBIT", image: "/framework-marquee/01.png", description: "IT governance & management framework" },
  { name: "ISO 42001", image: "/framework-marquee/02.png", description: "AI Management System Standard (AIMS)" },
  { name: "ISO 22301", image: "/framework-marquee/03.png", description: "Business Continuity Management System" },
  { name: "ISO 20000", image: "/framework-marquee/04.png", description: "IT Service Management System Standard" },
  { name: "ISO 27001", image: "/framework-marquee/05.png", description: "Information Security Management System" },
  { name: "SOC 2", image: "/framework-marquee/06.png", description: "Service organization controls for trust & security" },
  { name: "PIPEDA", image: "/framework-marquee/07.png", description: "Privacy protection standards for organizations" },
  { name: "PCI DSS", image: "/framework-marquee/08.png", description: "Payment Card Industry Data Security Standard" },
  { name: "NIST CSF", image: "/framework-marquee/09.png", description: "Cybersecurity Framework for critical infrastructure" },
];

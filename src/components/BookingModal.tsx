import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "demo" | "consultation";
}

const demoInterestOptions = [
  "GRC Software Platform",
  "Compliance Automation",
  "Risk Management",
  "Audit Management",
  "Full Platform Tour",
];

const consultationIndustries = [
  "Banking & Financial Services",
  "Insurance",
  "FinTech",
  "Technology / SaaS",
  "Healthcare",
  "Government / Public Sector",
  "Retail & eCommerce",
  "Manufacturing",
  "Professional Services",
  "Other",
];

const countries = [
  "Canada",
  "United States",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Netherlands",
  "Singapore",
  "United Arab Emirates",
  "Other",
];

const consultationInterests = [
  "OSFI Compliance",
  "Information & Cybersecurity",
  "IT Service Management",
  "Privacy & Data Protection",
  "Agile Project & Program Management",
  "Artificial Intelligence (AI) Governance",
  "Business Continuity Management",
  "IT Governance",
  "Payment & Card Security",
  "Enterprise Architecture & Digital Transformation",
];

const defaultConsultationData = {
  firstName: "",
  lastName: "",
  workEmail: "",
  companyName: "",
  industry: "",
  country: "",
  interests: [] as string[],
};

const defaultDemoData = {
  name: "",
  email: "",
  company: "",
  interest: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function BookingModal({ open, onOpenChange, type }: BookingModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [demoFormData, setDemoFormData] = useState(defaultDemoData);
  const [consultationFormData, setConsultationFormData] = useState(defaultConsultationData);

  const resetForm = () => {
    setDemoFormData(defaultDemoData);
    setConsultationFormData(defaultConsultationData);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = (open: boolean) => {
    if (!open) resetForm();
    onOpenChange(open);
  };

  /** Safe JSON parse — never throws; returns null on failure */
  const safeJson = async (res: Response): Promise<Record<string, unknown> | null> => {
    try {
      const text = await res.text();
      return text ? (JSON.parse(text) as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consultationFormData),
      });
      const json = await safeJson(res);
      if (!res.ok || !json?.success) {
        throw new Error(
          (json?.error as string) ?? `Request failed (${res.status}). Please try again.`
        );
      }
      setStatus("success");
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: demoFormData.name.split(" ")[0] ?? demoFormData.name,
          lastName: demoFormData.name.split(" ").slice(1).join(" ") || "-",
          workEmail: demoFormData.email,
          companyName: demoFormData.company,
          industry: "Not specified",
          country: "Not specified",
          interests: demoFormData.interest ? [demoFormData.interest] : ["Full Platform Tour"],
        }),
      });
      const json = await safeJson(res);
      if (!res.ok || !json?.success) {
        throw new Error(
          (json?.error as string) ?? `Request failed (${res.status}). Please try again.`
        );
      }
      setStatus("success");
      setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const title = type === "demo" ? "Book a Demo" : "Book a Consultation";
  const description =
    type === "demo"
      ? "See how CertifyGRC can transform your compliance operations."
      : "Speak with our GRC experts about your specific requirements.";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={
          type === "consultation"
            ? "sm:max-w-5xl p-0 max-h-[90vh] overflow-y-auto glass-strong"
            : "sm:max-w-md glass-strong max-h-[90vh] overflow-y-auto"
        }
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              className="flex flex-col items-center justify-center py-12 gap-4 px-8"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-xl text-foreground">Thank You!</h3>
              <p className="text-muted-foreground text-center text-sm max-w-xs">
                We've received your request and sent a confirmation email. We'll be in touch within
                1–2 business days.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {type === "consultation" ? (
                <div className="grid md:grid-cols-2">
                  {/* Descriptive side */}
                  <div className="relative p-8 md:p-10 bg-gradient-to-br from-primary/10 via-background to-accent/10">
                    <div className="absolute inset-0 pointer-events-none" aria-hidden>
                      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
                      <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
                    </div>
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold tracking-wide uppercase text-primary">
                          Book Consultation
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight mb-4">
                        Get Expert Guidance on Your Compliance Journey
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                        Work with CertifyGRC to accelerate audit readiness, reduce risk exposure,
                        and operationalize trust with a tailored compliance strategy.
                      </p>
                      <div className="space-y-3 mb-10">
                        {[
                          "Tailored compliance strategy",
                          "Faster audit readiness",
                          "Reduced risk exposure",
                          "Expert advisory support",
                        ].map((benefit) => (
                          <div key={benefit} className="flex items-start gap-3">
                            <div className="mt-0.5 w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                              ✓
                            </div>
                            <span className="text-sm text-foreground/90">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <div className="glass rounded-2xl p-6 glow-border">
                        <ConsultationIllustration />
                      </div>
                    </div>
                  </div>

                  {/* Form side */}
                  <div className="p-8 md:p-10">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">{title}</DialogTitle>
                      <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleConsultationSubmit} className="mt-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            required
                            value={consultationFormData.firstName}
                            onChange={(e) =>
                              setConsultationFormData((p) => ({ ...p, firstName: e.target.value }))
                            }
                            placeholder="Enter Your First Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            required
                            value={consultationFormData.lastName}
                            onChange={(e) =>
                              setConsultationFormData((p) => ({ ...p, lastName: e.target.value }))
                            }
                            placeholder="Enter Your Last Name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="workEmail">Work Email</Label>
                          <Input
                            id="workEmail"
                            type="email"
                            required
                            value={consultationFormData.workEmail}
                            onChange={(e) =>
                              setConsultationFormData((p) => ({ ...p, workEmail: e.target.value }))
                            }
                            placeholder="Enter your work email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            required
                            value={consultationFormData.companyName}
                            onChange={(e) =>
                              setConsultationFormData((p) => ({
                                ...p,
                                companyName: e.target.value,
                              }))
                            }
                            placeholder="Enter your company name"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Select
                            value={consultationFormData.industry}
                            onValueChange={(value) =>
                              setConsultationFormData((p) => ({ ...p, industry: value }))
                            }
                          >
                            <SelectTrigger id="industry">
                              <SelectValue placeholder="- Select -" />
                            </SelectTrigger>
                            <SelectContent>
                              {consultationIndustries.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={consultationFormData.country}
                            onValueChange={(value) =>
                              setConsultationFormData((p) => ({ ...p, country: value }))
                            }
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Area of Interest</Label>
                        <div className="grid sm:grid-cols-2 gap-3 rounded-xl border border-border/60 bg-muted/10 p-4">
                          {consultationInterests.map((interest) => {
                            const checked = consultationFormData.interests.includes(interest);
                            return (
                              <label
                                key={interest}
                                className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/40 transition-colors cursor-pointer"
                              >
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(v) => {
                                    const isChecked = v === true;
                                    setConsultationFormData((p) => ({
                                      ...p,
                                      interests: isChecked
                                        ? Array.from(new Set([...p.interests, interest]))
                                        : p.interests.filter((x) => x !== interest),
                                    }));
                                  }}
                                />
                                <span className="text-sm text-foreground/90 leading-snug">
                                  {interest}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Select the areas you'd like to discuss. We'll tailor the session to your
                          needs.
                        </p>
                      </div>

                      {status === "error" && (
                        <motion.div
                          className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errorMsg}
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full glow-primary"
                        disabled={
                          status === "loading" ||
                          !consultationFormData.industry ||
                          !consultationFormData.country ||
                          consultationFormData.interests.length === 0
                        }
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        By submitting, you agree to be contacted by CertifyGRC regarding your
                        request.
                      </p>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="font-display text-xl">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDemoSubmit} className="space-y-4 mt-2 px-6 pb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={demoFormData.name}
                        onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={demoFormData.email}
                        onChange={(e) =>
                          setDemoFormData({ ...demoFormData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        required
                        value={demoFormData.company}
                        onChange={(e) =>
                          setDemoFormData({ ...demoFormData, company: e.target.value })
                        }
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest">Area of Interest</Label>
                      <Select
                        value={demoFormData.interest}
                        onValueChange={(value) =>
                          setDemoFormData({ ...demoFormData, interest: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                          {demoInterestOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {status === "error" && (
                      <motion.div
                        className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {errorMsg}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      className="w-full glow-primary"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function ConsultationIllustration() {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label="Compliance dashboard illustration"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="cg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="cg-soft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
        </linearGradient>
        <filter id="cg-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect
        x="0"
        y="0"
        width="720"
        height="360"
        rx="22"
        fill="hsl(var(--card))"
        fillOpacity="0.55"
        stroke="hsl(var(--border))"
      />
      <g opacity="0.9">
        <circle cx="130" cy="90" r="78" fill="url(#cg-soft)" filter="url(#cg-blur)" />
        <circle cx="610" cy="260" r="86" fill="url(#cg-soft)" filter="url(#cg-blur)" />
      </g>

      <rect
        x="32"
        y="28"
        width="656"
        height="54"
        rx="14"
        fill="hsl(var(--muted))"
        fillOpacity="0.35"
        stroke="hsl(var(--border))"
      />
      <rect x="52" y="46" width="190" height="18" rx="9" fill="hsl(var(--foreground))" fillOpacity="0.12" />
      <rect x="560" y="42" width="110" height="26" rx="13" fill="url(#cg-grad)" fillOpacity="0.9" />

      {[
        { x: 32, label: "Audit readiness", value: "92%" },
        { x: 262, label: "Controls mapped", value: "247" },
        { x: 492, label: "Risk trend", value: "↓ 18%" },
      ].map((c, i) => (
        <g key={i}>
          <rect
            x={c.x}
            y="102"
            width="196"
            height="92"
            rx="18"
            fill="hsl(var(--muted))"
            fillOpacity="0.28"
            stroke="hsl(var(--border))"
          />
          <rect x={c.x + 18} y="120" width="110" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.10" />
          <rect x={c.x + 18} y="142" width="82" height="22" rx="11" fill="url(#cg-grad)" fillOpacity="0.9" />
          <rect x={c.x + 18} y="172" width="150" height="10" rx="5" fill="hsl(var(--foreground))" fillOpacity="0.08" />
        </g>
      ))}

      <rect
        x="32"
        y="214"
        width="432"
        height="118"
        rx="18"
        fill="hsl(var(--muted))"
        fillOpacity="0.25"
        stroke="hsl(var(--border))"
      />
      <rect x="52" y="232" width="160" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      <path
        d="M56 308 C 104 260, 136 292, 170 268 C 204 244, 236 270, 266 250 C 296 230, 330 242, 360 226 C 390 210, 416 226, 450 206"
        fill="none"
        stroke="url(#cg-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="450" cy="206" r="6" fill="hsl(var(--accent))" />

      <rect
        x="482"
        y="214"
        width="206"
        height="118"
        rx="18"
        fill="hsl(var(--muted))"
        fillOpacity="0.22"
        stroke="hsl(var(--border))"
      />
      <rect x="502" y="232" width="120" height="12" rx="6" fill="hsl(var(--foreground))" fillOpacity="0.10" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect
            x="502"
            y={258 + r * 22}
            width="16"
            height="16"
            rx="6"
            fill="url(#cg-grad)"
            fillOpacity="0.9"
          />
          <rect
            x="524"
            y={261 + r * 22}
            width="138"
            height="10"
            rx="5"
            fill="hsl(var(--foreground))"
            fillOpacity="0.08"
          />
        </g>
      ))}
    </svg>
  );
}

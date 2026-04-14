import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Users, TrendingUp, Headphones, Megaphone, Gift, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import { SITE_ALLIANCE_JOURNEY } from "@/constants/siteImages";
import ScrollReveal from "@/components/ScrollReveal";

const steps = ["Company Info", "Contact Details", "Partnership Interest"];

const whyJoin = [
  { icon: Users, title: "Expand Your Services", description: "Offer your clients a powerful, easy-to-use GRC solution that simplifies compliance and cybersecurity management." },
  { icon: TrendingUp, title: "Boost Your Revenue", description: "Earn commissions and unlock new business opportunities by integrating CertifyGRC into your service offerings." },
  { icon: Headphones, title: "Get Expert Support", description: "From sales materials to training and dedicated partner assistance, we’ve got your back every step of the way." },
  { icon: Megaphone, title: "Co-Marketing & Visibility", description: "Gain exposure through joint marketing campaigns, case studies, and co-branded initiatives." },
  { icon: Gift, title: "Exclusive Partner Perks", description: "Access partner-only discounts, early feature releases, and premium resources." },
];

export default function PartnerPage() {
  const [mainTab, setMainTab] = useState("overview");
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        backgroundUrl={heroImagery.partner.background}
        foregroundUrl={heroImagery.partner.foreground}
        foregroundAlt="CertifyGRC alliance and partnership"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
          Partners
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
          Join the CertifyGRC <span className="gradient-text">Alliance!</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Collaborate with us to streamline processes, leverage cutting-edge technology, and deliver exceptional value to your clients by becoming our partner.
        </p>
      </PageHero>

      <ScrollReveal>
        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1 md:gap-0 rounded-xl bg-muted/60">
                <TabsTrigger value="overview" className="rounded-lg py-3 text-xs sm:text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="become" className="rounded-lg py-3 text-xs sm:text-sm">
                  Become A Partner
                </TabsTrigger>
                <TabsTrigger value="find" className="rounded-lg py-3 text-xs sm:text-sm">
                  Find A Partner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-10 space-y-12 animate-fade-in">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">Let&apos;s Grow Together</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    At CertifyGRC, we believe that success is better when shared! That&apos;s why we created the CertifyGRC Alliance—a partnership program designed for consultants, resellers, and cybersecurity professionals who want to help businesses stay compliant while growing their own revenue.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-xl text-center mb-8">Why Join the CertifyGRC Alliance?</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyJoin.map((item, i) => (
                      <div
                        key={item.title}
                        className="glass rounded-2xl p-6 border border-border/50 hover-lift glow-border transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-display font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-strong rounded-2xl p-8 md:p-10 text-center border border-primary/15 glow-border">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">Become A Partner</h3>
                  <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                    Let&apos;s Make Compliance Easier—Together! Ready to team up and take your business to the next level? Join the CertifyGRC Alliance today and start offering top-notch compliance solutions to your clients.
                  </p>
                  <Button type="button" size="lg" className="mt-6 glow-primary" onClick={() => setMainTab("become")}>
                    Become a Partner
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="become" className="mt-10 animate-fade-in">
                <div className="rounded-2xl border border-border/50 bg-muted/20 overflow-hidden mb-10 hover-lift transition-shadow">
                  <img
                    src={SITE_ALLIANCE_JOURNEY}
                    alt="CertifyGRC partner journey: Apply, agreement, onboard, promote, and grow"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="container-narrow max-w-2xl mx-auto">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                    <motion.div
                      key="partner-submitted"
                      className="glass rounded-2xl p-12 text-center glow-border"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="font-display font-bold text-2xl text-foreground mb-2">Application Submitted!</h2>
                      <p className="text-muted-foreground">Our partnerships team will review your application and reach out within 3 business days.</p>
                    </motion.div>
                  ) : (
                    <div className="glass rounded-2xl p-8 glow-border">
                      <div className="flex items-center justify-between mb-8">
                        {steps.map((step, i) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                              i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            <span className="ml-2 text-sm font-medium text-foreground hidden sm:inline">{step}</span>
                            {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${i < currentStep ? "bg-primary" : "bg-muted"}`} />}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSubmit}>
                        {currentStep === 0 && (
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            <div className="space-y-2">
                              <Label>Company Name</Label>
                              <Input required placeholder="Your company name" />
                            </div>
                            <div className="space-y-2">
                              <Label>Website</Label>
                              <Input type="url" placeholder="https://yourcompany.com" />
                            </div>
                            <div className="space-y-2">
                              <Label>Company Size</Label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10">1-10 employees</SelectItem>
                                  <SelectItem value="11-50">11-50 employees</SelectItem>
                                  <SelectItem value="51-200">51-200 employees</SelectItem>
                                  <SelectItem value="201+">201+ employees</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </motion.div>
                        )}
                        {currentStep === 1 && (
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input required placeholder="John" />
                              </div>
                              <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input required placeholder="Doe" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input type="email" required placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone</Label>
                              <Input type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                          </motion.div>
                        )}
                        {currentStep === 2 && (
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            <div className="space-y-2">
                              <Label>Partnership Type</Label>
                              <Select>
                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="reseller">Reseller</SelectItem>
                                  <SelectItem value="referral">Referral Partner</SelectItem>
                                  <SelectItem value="technology">Technology Partner</SelectItem>
                                  <SelectItem value="consulting">Consulting Partner</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Why partner with CertifyGRC?</Label>
                              <Textarea placeholder="Describe your company, the solutions you provide, and why you want to partner with CertifyGRC." rows={4} />
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between mt-8">
                          <Button type="button" variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                          </Button>
                          {currentStep < steps.length - 1 ? (
                            <Button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="glow-primary">
                              Next <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          ) : (
                            <Button type="submit" className="glow-primary">
                              Submit Application <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                  </AnimatePresence>
                </div>
              </TabsContent>

              <TabsContent value="find" className="mt-10 animate-fade-in">
                <div className="glass rounded-2xl p-10 md:p-14 text-center max-w-2xl mx-auto border border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground">Find A Partner</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Looking for an authorized CertifyGRC partner in your region or industry? Our team can connect you with the right alliance member.
                  </p>
                  <Button asChild size="lg" className="mt-8 glow-primary">
                    <Link to="/contact">
                      Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

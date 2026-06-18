import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Headphones, Megaphone, Gift, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHero from "@/components/PageHero";
import { heroImagery } from "@/constants/heroImagery";
import { SITE_ALLIANCE_JOURNEY } from "@/constants/siteImages";
import ScrollReveal from "@/components/ScrollReveal";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";
import { PremiumCard, PremiumCardGrid, PremiumCardStandalone } from "@/components/ui/PremiumCard";
import { BRAND_PRIMARY } from "@/lib/brandColors";

const whyJoin = [
  { icon: Users, title: "Expand Your Services", description: "Offer your clients a powerful, easy-to-use GRC solution that simplifies compliance and cybersecurity management." },
  { icon: TrendingUp, title: "Boost Your Revenue", description: "Earn commissions and unlock new business opportunities by integrating CertifyGRC into your service offerings." },
  { icon: Headphones, title: "Get Expert Support", description: "From sales materials to training and dedicated partner assistance, we've got your back every step of the way." },
  { icon: Megaphone, title: "Co-Marketing & Visibility", description: "Gain exposure through joint marketing campaigns, case studies, and co-branded initiatives." },
  { icon: Gift, title: "Exclusive Partner Perks", description: "Access partner only discounts, early feature releases, and premium resources." },
];

export default function PartnerPage() {
  const [mainTab, setMainTab] = useState("overview");

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
        <h1 className="font-display font-bold text-display-lg md:text-display-xl text-foreground tracking-tight">
          Join the CertifyGRC <span className="gradient-text">Alliance!</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Collaborate with us to streamline processes, leverage cutting edge technology, and deliver exceptional value to your clients by becoming our partner.
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
                    At CertifyGRC, we believe that success is better when shared! That&apos;s why we created the CertifyGRC Alliance a partnership program designed for consultants, resellers, and cybersecurity professionals who want to help businesses stay compliant while growing their own revenue.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-xl text-center mb-8">Why Join the CertifyGRC Alliance?</h3>
                  <PremiumCardGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {whyJoin.map((item) => (
                      <PremiumCard key={item.title} padding="md" interactive={false}>
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                          style={{
                            background: `linear-gradient(135deg, ${BRAND_PRIMARY}18, ${BRAND_PRIMARY}08)`,
                            border: `1px solid ${BRAND_PRIMARY}28`,
                          }}
                        >
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-display font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </PremiumCard>
                    ))}
                  </PremiumCardGrid>
                </div>

                <PremiumCardStandalone featured padding="lg" className="text-center">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">Become A Partner</h3>
                  <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                    Let&apos;s Make Compliance Easier Together! Ready to team up and take your business to the next level? Join the CertifyGRC Alliance today and start offering top notch compliance solutions to your clients.
                  </p>
                  <Button type="button" size="lg" className="mt-6 glow-primary" onClick={() => setMainTab("become")}>
                    Become a Partner
                  </Button>
                </PremiumCardStandalone>
              </TabsContent>

              <TabsContent value="become" className="mt-10 animate-fade-in">
                <div className="rounded-2xl overflow-hidden mb-10 transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(145deg, hsl(220,42%,9%), hsl(220,42%,7%))", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img
                    src={SITE_ALLIANCE_JOURNEY}
                    alt="CertifyGRC partner journey: Apply, agreement, onboard, promote, and grow"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="container-narrow mx-auto max-w-3xl">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <PremiumCardStandalone padding="lg" className="shadow-card-hover">
                      <PartnerApplicationForm />
                    </PremiumCardStandalone>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="find" className="mt-10 animate-fade-in">
                <PremiumCardStandalone padding="lg" className="text-center max-w-2xl mx-auto">
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
                </PremiumCardStandalone>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const steps = ["Company Info", "Contact Details", "Partnership Interest"];

export default function PartnerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="container-wide relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
            Partner With Us
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
            Grow <span className="gradient-text">Together</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the CertifyGRC partner ecosystem and help organizations achieve compliance excellence.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-2xl">
          {submitted ? (
            <div className="glass rounded-2xl p-12 text-center glow-border animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">Application Submitted!</h2>
              <p className="text-muted-foreground">Our partnerships team will review your application and reach out within 3 business days.</p>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 glow-border">
              {/* Progress */}
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
                  <div className="space-y-4 animate-fade-in">
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
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
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
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
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
                      <Label>Why Partner With CertifyGRC?</Label>
                      <Textarea placeholder="Tell us about your interest..." rows={4} />
                    </div>
                  </div>
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
        </div>
      </section>
    </>
  );
}

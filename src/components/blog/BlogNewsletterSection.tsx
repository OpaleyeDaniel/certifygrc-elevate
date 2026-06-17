import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogNewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="my-12 rounded-3xl overflow-hidden relative">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1450 50%, #0c1f3f 100%)" }}
      />
      {/* Orbs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "#6366f1" }} />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: "#8b5cf6" }} />

      <div className="relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 mb-5">
          <Mail className="w-3.5 h-3.5" />
          GRC Intelligence Newsletter
        </div>
        <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-3 max-w-xl mx-auto">
          Get the latest GRC insights delivered to your inbox
        </h3>
        <p className="text-white/60 text-base mb-7 max-w-lg mx-auto">
          Join 2,000+ compliance and cybersecurity professionals. No spam. Unsubscribe anytime.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-lg"
          >
            <CheckCircle2 className="w-6 h-6" />
            You're subscribed! Welcome aboard.
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20"
            />
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 font-semibold whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))", color: "#fff" }}
            >
              {loading ? "Subscribing…" : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/35">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

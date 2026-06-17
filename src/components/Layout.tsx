import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import PageAmbient from "./visual/PageAmbient";
import CyberGridCanvas from "./visual/CyberGridCanvas";
import FloatingGeometry from "./visual/FloatingGeometry";
import WaitlistPopupModal from "@/components/marketing/WaitlistPopupModal";
import { BookingProvider } from "@/contexts/BookingContext";
import { useWaitlistPopup } from "@/hooks/useWaitlistPopup";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const waitlistPopup = useWaitlistPopup();

  const booking = useMemo(
    () => ({
      openDemo: () => setDemoOpen(true),
      openConsultation: () => setConsultOpen(true),
    }),
    [],
  );

  return (
    <BookingProvider value={booking}>
      <div className="min-h-screen flex flex-col relative">
        {/* ── Layer 0: Base ambient orbs (fixed, z-0) ─────────────── */}
        <PageAmbient />

        {/* ── Layer 1: Animated cyber-grid + light particles (fixed, z-1) */}
        <CyberGridCanvas />

        {/* ── Layer 2: Floating geometric shapes (fixed, z-2) ─────── */}
        <FloatingGeometry />

        {/* ── Layer 10+: All page content ─────────────────────────── */}
        <Navbar onTalkWithAdvisor={booking.openConsultation} onBookDemo={booking.openDemo} />
        <main className="relative z-10 min-w-0 flex-1 pt-[72px]">{children}</main>
        <Footer />

        <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
        <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
        <WaitlistPopupModal open={waitlistPopup.open} onOpenChange={waitlistPopup.setOpen} />
      </div>
    </BookingProvider>
  );
}

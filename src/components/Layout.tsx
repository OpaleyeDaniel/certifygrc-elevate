import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import PageAmbient from "./visual/PageAmbient";
import CyberGridCanvas from "./visual/CyberGridCanvas";
import FloatingGeometry from "./visual/FloatingGeometry";
import BlueprintGrid from "./visual/BlueprintGrid";
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
        {/* ── Experiment: animated ambient background layers disabled ───
            Trying a plain background (white in light mode, dark in dark
            mode) instead of the animated cyber-grid/orbs/geometry. Not
            permanent — re-enable these three lines to restore it. */}
        {/* <PageAmbient /> */}
        {/* <CyberGridCanvas /> */}
        {/* <FloatingGeometry /> */}

        {/* ── Layer 0: Static blueprint grid texture (fixed, z-0) ──── */}
        <BlueprintGrid />

        {/* ── Layer 10+: All page content ─────────────────────────── */}
        <Navbar onTalkWithAdvisor={booking.openConsultation} onBookDemo={booking.openDemo} />
        {/* Offset matches the new floating pill navbar: pill height + its
            top margin (was a flush pt-[72px] for the old edge-to-edge bar). */}
        <main className="relative z-10 min-w-0 flex-1 pt-[76px] sm:pt-[84px]">{children}</main>
        <Footer />

        <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
        <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
        {/* Waitlist popup disabled for now — not permanent, just re-enable
            this line to bring it back. */}
        {/* <WaitlistPopupModal open={waitlistPopup.open} onOpenChange={waitlistPopup.setOpen} /> */}
      </div>
    </BookingProvider>
  );
}

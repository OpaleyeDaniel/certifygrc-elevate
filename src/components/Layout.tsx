import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import GlobalGradientLines from "./visual/GlobalGradientLines";
import { BookingProvider } from "@/contexts/BookingContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

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
        <GlobalGradientLines />
        <Navbar onTalkWithAdvisor={booking.openConsultation} onBookDemo={booking.openDemo} />
        <main className="flex-1 pt-16 md:pt-20 relative z-10">{children}</main>
        <Footer />
        <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
        <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
      </div>
    </BookingProvider>
  );
}

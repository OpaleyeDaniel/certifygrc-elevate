import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onBookDemo={() => setDemoOpen(true)}
        onBookConsultation={() => setConsultOpen(true)}
      />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <BookingModal open={demoOpen} onOpenChange={setDemoOpen} type="demo" />
      <BookingModal open={consultOpen} onOpenChange={setConsultOpen} type="consultation" />
    </div>
  );
}

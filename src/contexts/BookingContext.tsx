import { createContext, useContext, type ReactNode } from "react";

export type BookingContextValue = {
  openDemo: () => void;
  openConsultation: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: BookingContextValue;
}) {
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

/** Opens demo / consultation modals from Layout (navbar, hero, etc.). */
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    return {
      openDemo: () => {},
      openConsultation: () => {},
    };
  }
  return ctx;
}

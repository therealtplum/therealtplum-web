"use client";

import BottomNav from "@/components/travel/BottomNav";
import OfflineIndicator from "@/components/travel/OfflineIndicator";
import TripHeader from "@/components/travel/TripHeader";
import { TripProvider, useTrip } from "@/lib/trip-context";

function TripLayoutContent({ children }: { children: React.ReactNode }) {
  const { trip, loading } = useTrip();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-charcoal/60 dark:text-cream/60">Loading trip...</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-charcoal/60 dark:text-cream/60">No trip found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <TripHeader trip={trip} />
      <OfflineIndicator />
      <main className="pt-2">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TripProvider>
      <TripLayoutContent>{children}</TripLayoutContent>
    </TripProvider>
  );
}


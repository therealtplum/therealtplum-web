"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Trip } from "@/types/trip";

interface TripContextType {
  trip: Trip | null;
  setTrip: (trip: Trip | null) => void;
  loading: boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        const response = await fetch("/api/travel/trip", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login
            window.location.href = "/travel/login";
            return;
          }
          const errorData = await response.json().catch(() => ({}));
          console.error("Failed to load trip:", response.status, errorData);
          throw new Error(`Failed to load trip: ${errorData.error || response.statusText || response.status}`);
        }

        const data = await response.json();
        setTrip(data.trip);

        // Save to offline storage (always update with latest)
        if (data.trip) {
          const { saveTripOffline } = await import("./offline-db");
          await saveTripOffline(data.trip);
        }
      } catch (error) {
        console.error("Error loading trip:", error);
        // Try to load from offline storage
        try {
          const { getTripOffline } = await import("./offline-db");
          const offlineTrip = await getTripOffline("japan2026");
          if (offlineTrip) {
            setTrip(offlineTrip);
          }
        } catch (offlineError) {
          console.error("Error loading offline trip:", offlineError);
        }
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, []);

  return (
    <TripContext.Provider value={{ trip, setTrip, loading }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}


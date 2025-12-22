/**
 * Database adapter that switches between file-based (dev) and Vercel Postgres (prod)
 */

import type { Trip } from "@/types/trip";

// Use Vercel DB if we're on Vercel or explicitly set
const USE_VERCEL_DB = 
  process.env.VERCEL === "1" || 
  process.env.VERCEL_ENV !== undefined || 
  process.env.USE_VERCEL_DB === "true" ||
  !!process.env.POSTGRES_URL;

// Re-export functions that work in both environments
export async function getTrip(tripId: string): Promise<Trip | null> {
  if (USE_VERCEL_DB) {
    const { getTripVercel } = await import("./db-vercel");
    return getTripVercel(tripId);
  } else {
    const { getTrip } = await import("./db");
    return getTrip(tripId);
  }
}

export async function saveTrip(trip: Trip): Promise<void> {
  if (USE_VERCEL_DB) {
    const { saveTripVercel } = await import("./db-vercel");
    return saveTripVercel(trip);
  } else {
    const { saveTrip } = await import("./db");
    return saveTrip(trip);
  }
}

export async function verifyTraveler(
  tripId: string,
  travelerId: string,
  password: string
): Promise<{ valid: boolean; role?: "traveler" | "admin" }> {
  if (USE_VERCEL_DB) {
    const { verifyTravelerVercel } = await import("./db-vercel");
    return verifyTravelerVercel(tripId, travelerId, password);
  } else {
    const { verifyTraveler } = await import("./db");
    return verifyTraveler(tripId, travelerId, password);
  }
}

export async function createTraveler(
  tripId: string,
  travelerId: string,
  password: string,
  name: string,
  role: "traveler" | "admin" = "traveler"
): Promise<void> {
  if (USE_VERCEL_DB) {
    const { createTravelerVercel } = await import("./db-vercel");
    return createTravelerVercel(tripId, travelerId, password, name, role);
  } else {
    const { createTraveler } = await import("./db");
    return createTraveler(tripId, travelerId, password, name, role);
  }
}

export async function initializeDemoData(): Promise<void> {
  // Import the appropriate initialize function
  if (USE_VERCEL_DB) {
    const { initializeDemoDataVercel } = await import("./db-vercel");
    return initializeDemoDataVercel();
  } else {
    const { initializeDemoData } = await import("./db");
    return initializeDemoData();
  }
}


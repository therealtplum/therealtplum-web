/**
 * Simple file-based database for MVP
 * In production, replace with actual database (PostgreSQL, MongoDB, etc.)
 */

import type { Trip, Traveler } from "@/types/trip";
import { hashPassword } from "./auth";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DB_DIR = join(process.cwd(), "data");
const TRIPS_FILE = join(DB_DIR, "trips.json");
const TRAVELERS_FILE = join(DB_DIR, "travelers.json");

// Ensure data directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

interface TravelerRecord {
  tripId: string;
  travelerId: string;
  passwordHash: string;
  role: "traveler" | "admin";
  name: string;
}

interface Database {
  trips: Record<string, Trip>;
  travelers: TravelerRecord[];
}

function loadDB(): Database {
  const defaultDB: Database = {
    trips: {},
    travelers: [],
  };

  try {
    if (existsSync(TRIPS_FILE)) {
      const tripsData = JSON.parse(readFileSync(TRIPS_FILE, "utf-8"));
      defaultDB.trips = tripsData;
    }
    if (existsSync(TRAVELERS_FILE)) {
      const travelersData = JSON.parse(readFileSync(TRAVELERS_FILE, "utf-8"));
      defaultDB.travelers = travelersData;
    }
  } catch (error) {
    console.error("Error loading database:", error);
  }

  return defaultDB;
}

function saveDB(db: Database): void {
  try {
    writeFileSync(TRIPS_FILE, JSON.stringify(db.trips, null, 2));
    writeFileSync(TRAVELERS_FILE, JSON.stringify(db.travelers, null, 2));
  } catch (error) {
    console.error("Error saving database:", error);
    throw error;
  }
}

export async function getTrip(tripId: string): Promise<Trip | null> {
  const db = loadDB();
  return db.trips[tripId] || null;
}

export async function saveTrip(trip: Trip): Promise<void> {
  const db = loadDB();
  db.trips[trip.id] = trip;
  saveDB(db);
}

export async function verifyTraveler(
  tripId: string,
  travelerId: string,
  password: string
): Promise<{ valid: boolean; role?: "traveler" | "admin" }> {
  const db = loadDB();
  const traveler = db.travelers.find(
    (t) => t.tripId === tripId && t.travelerId === travelerId
  );

  if (!traveler) {
    return { valid: false };
  }

  const { verifyPassword } = await import("./auth");
  const valid = await verifyPassword(password, traveler.passwordHash);

  return valid ? { valid: true, role: traveler.role } : { valid: false };
}

export async function createTraveler(
  tripId: string,
  travelerId: string,
  password: string,
  name: string,
  role: "traveler" | "admin" = "traveler"
): Promise<void> {
  const db = loadDB();
  const passwordHash = await hashPassword(password);

  const existingIndex = db.travelers.findIndex(
    (t) => t.tripId === tripId && t.travelerId === travelerId
  );

  const travelerRecord: TravelerRecord = {
    tripId,
    travelerId,
    passwordHash,
    role,
    name,
  };

  if (existingIndex >= 0) {
    db.travelers[existingIndex] = travelerRecord;
  } else {
    db.travelers.push(travelerRecord);
  }

  saveDB(db);
}

// Initialize with real trip data
export async function initializeDemoData(): Promise<void> {
  const db = loadDB();

  // Always update trip data (in case itinerary changes)
  // Create trip if it doesn't exist, or update if it does
  {
    // Import shared trip data
    const { getJapan2026Trip } = await import("./trip-seed-data");
    const japanTrip = getJapan2026Trip();

    await saveTrip(japanTrip);
  }

  // Create demo travelers if they don't exist
  const hasTom = db.travelers.some(
    (t) => t.tripId === "japan2026" && t.travelerId === "tom"
  );
  const hasCourtney = db.travelers.some(
    (t) => t.tripId === "japan2026" && t.travelerId === "courtney"
  );

  if (!hasTom) {
    await createTraveler("japan2026", "tom", "password123", "Tom", "traveler");
  }
  if (!hasCourtney) {
    await createTraveler(
      "japan2026",
      "courtney",
      "password123",
      "Courtney",
      "traveler"
    );
  }
}


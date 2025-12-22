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

// Initialize with demo data
export async function initializeDemoData(): Promise<void> {
  const db = loadDB();

  // Create demo trip if it doesn't exist
  if (!db.trips["japan2026"]) {
    const demoTrip: Trip = {
      id: "japan2026",
      name: "Japan Adventure",
      version: "1.0",
      startDate: "2026-03-15T00:00:00Z",
      endDate: "2026-03-25T00:00:00Z",
      baseTimezone: "Asia/Tokyo",
      locations: [
        {
          id: "tokyo",
          name: "Tokyo",
          city: "Tokyo",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 35.6762,
          lng: 139.6503,
          address: "3-7-1-1 Nishi-Shinjuku, Shinjuku, Tokyo",
        },
        {
          id: "kyoto",
          name: "Kyoto",
          city: "Kyoto",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 35.0116,
          lng: 135.7681,
        },
      ],
      events: [
        {
          id: "e1",
          type: "logistics",
          title: "Flight to Tokyo",
          startTime: "2026-03-15T08:00:00Z",
          endTime: "2026-03-15T14:00:00Z",
          locationId: "tokyo",
          description: "Narita Airport arrival",
        },
        {
          id: "e2",
          type: "hotel",
          title: "Check-in: Park Hyatt Tokyo",
          startTime: "2026-03-15T15:00:00Z",
          locationId: "tokyo",
          description: "3-7-1-1 Nishi-Shinjuku",
        },
        {
          id: "e3",
          type: "meal",
          title: "Dinner at Sukiyabashi Jiro",
          startTime: "2026-03-15T19:00:00Z",
          locationId: "tokyo",
          description: "Reservation confirmed",
        },
        {
          id: "e4",
          type: "attraction",
          title: "Senso-ji Temple",
          startTime: "2026-03-16T09:00:00Z",
          locationId: "tokyo",
        },
        {
          id: "e5",
          type: "logistics",
          title: "Shinkansen to Kyoto",
          startTime: "2026-03-18T10:00:00Z",
          endTime: "2026-03-18T12:30:00Z",
          locationId: "kyoto",
        },
      ],
      bookings: [
        {
          id: "b1",
          type: "flight",
          title: "Flight to Tokyo",
          confirmationCode: "ABC123",
          provider: "Japan Airlines",
          startDate: "2026-03-15T08:00:00Z",
          locationId: "tokyo",
          phone: "+81-3-1234-5678",
          attachments: [
            {
              id: "a1",
              type: "qr",
              url: "#",
              essential: true,
            },
          ],
        },
        {
          id: "b2",
          type: "hotel",
          title: "Park Hyatt Tokyo",
          confirmationCode: "HYATT-456789",
          provider: "Hyatt",
          startDate: "2026-03-15T15:00:00Z",
          endDate: "2026-03-18T11:00:00Z",
          locationId: "tokyo",
          phone: "+81-3-5322-1234",
        },
      ],
      purchases: [
        {
          id: "p1",
          title: "JR Pass",
          status: "purchased",
          quantity: "2 passes",
        },
        {
          id: "p2",
          title: "Tokyo Skytree tickets",
          status: "needed",
          dueDate: "2026-03-16T00:00:00Z",
        },
        {
          id: "p3",
          title: "Kyoto temple passes",
          status: "planned",
        },
      ],
      travelers: [
        { id: "tom", name: "Tom", role: "traveler" },
        { id: "courtney", name: "Courtney", role: "traveler" },
      ],
    };

    await saveTrip(demoTrip);
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


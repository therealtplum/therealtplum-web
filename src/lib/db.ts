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
    const japanTrip: Trip = {
      id: "japan2026",
      name: "Japan Adventure",
      version: "1.0",
      startDate: "2026-03-27T00:00:00Z",
      endDate: "2026-04-12T23:59:59Z",
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
        },
        {
          id: "yamagata",
          name: "Yamagata",
          city: "Yamagata",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 38.2404,
          lng: 140.3633,
        },
        {
          id: "kanazawa",
          name: "Kanazawa",
          city: "Kanazawa",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 36.5613,
          lng: 136.6562,
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
        {
          id: "osaka",
          name: "Osaka",
          city: "Osaka",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 34.6937,
          lng: 135.5023,
        },
        {
          id: "hiroshima",
          name: "Hiroshima",
          city: "Hiroshima",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 34.3853,
          lng: 132.4553,
        },
        {
          id: "miyajima",
          name: "Miyajima",
          city: "Miyajima",
          country: "Japan",
          timezone: "Asia/Tokyo",
          lat: 34.2969,
          lng: 132.3194,
        },
      ],
      events: [
        // Day 0 - Mar 27: Flight out
        {
          id: "e-flight-out",
          type: "logistics",
          title: "Flight: ORD → HND (UA 881)",
          startTime: "2026-03-27T12:00:00Z",
          locationId: "tokyo",
          description: "Overnight flight",
        },
        // Day 1 - Mar 28: Tokyo Arrival
        {
          id: "e-arrival",
          type: "logistics",
          title: "Arrive Haneda Airport",
          startTime: "2026-03-28T08:45:00Z",
          locationId: "tokyo",
          description: "Land ~5:45 pm local. Immigration, customs, eSIM/Wi-Fi, add Suica to Apple Wallet",
        },
        {
          id: "e-tokyo-checkin-1",
          type: "hotel",
          title: "Check-in: Tokyo Hotel",
          startTime: "2026-03-28T10:00:00Z",
          locationId: "tokyo",
          description: "Shinjuku or Ginza area",
        },
        {
          id: "e-dinner-1",
          type: "meal",
          title: "Dinner",
          startTime: "2026-03-28T11:00:00Z",
          locationId: "tokyo",
          description: "Light dinner - ramen, curry, or convenience store",
        },
        // Day 2 - Mar 29: Tokyo
        {
          id: "e-meguro",
          type: "attraction",
          title: "Meguro River Cherry Blossoms",
          startTime: "2026-03-29T00:00:00Z",
          locationId: "tokyo",
          description: "Coffee + slow stroll",
        },
        {
          id: "e-ueno",
          type: "attraction",
          title: "Ueno Park",
          startTime: "2026-03-29T02:00:00Z",
          locationId: "tokyo",
        },
        {
          id: "e-yanaka",
          type: "attraction",
          title: "Yanaka Cemetery + Old Town Walk",
          startTime: "2026-03-29T04:00:00Z",
          locationId: "tokyo",
          description: "Pre-war Tokyo vibe",
        },
        {
          id: "e-shinjuku-night",
          type: "attraction",
          title: "Shinjuku: Omoide Yokocho & Golden Gai",
          startTime: "2026-03-29T09:00:00Z",
          locationId: "tokyo",
          description: "Evening exploration, microbars",
        },
        // Day 3 - Mar 30: Tokyo
        {
          id: "e-nezu",
          type: "attraction",
          title: "Nezu Museum",
          startTime: "2026-03-30T00:00:00Z",
          locationId: "tokyo",
          description: "Art + garden",
        },
        {
          id: "e-teamlab",
          type: "attraction",
          title: "teamLab Planets",
          startTime: "2026-03-30T04:00:00Z",
          locationId: "tokyo",
          description: "Pre-booked",
        },
        {
          id: "e-roppongi",
          type: "attraction",
          title: "Roppongi Hills: Mori Art Museum + Sky Deck",
          startTime: "2026-03-30T08:00:00Z",
          locationId: "tokyo",
          description: "Sunset views, dinner nearby",
        },
        {
          id: "e-buy-tickets",
          type: "admin",
          title: "Buy all long-distance train tickets",
          startTime: "2026-03-30T12:00:00Z",
          locationId: "tokyo",
          description: "At JR counter",
        },
        // Day 4 - Mar 31: Tokyo → Yamagata
        {
          id: "e-forward-luggage-1",
          type: "logistics",
          title: "Forward luggage: Tokyo → Kyoto",
          startTime: "2026-03-31T00:00:00Z",
          locationId: "tokyo",
          description: "Travel light with backpack",
        },
        {
          id: "e-train-yamagata",
          type: "logistics",
          title: "Train: Tokyo → Yamagata",
          startTime: "2026-03-31T01:00:00Z",
          endTime: "2026-03-31T04:00:00Z",
          locationId: "yamagata",
          description: "Yamagata Shinkansen, ~2.5-3 hours",
        },
        {
          id: "e-yamagata-checkin",
          type: "hotel",
          title: "Check-in: Yamagata",
          startTime: "2026-03-31T04:30:00Z",
          locationId: "yamagata",
        },
        {
          id: "e-onsen-yamagata",
          type: "attraction",
          title: "Optional Onsen Soak",
          startTime: "2026-03-31T06:00:00Z",
          locationId: "yamagata",
          description: "Tattoo-friendly options available",
        },
        // Day 5 - Apr 1: Yamagata
        {
          id: "e-yamadera-train",
          type: "logistics",
          title: "Train to Yamadera Station",
          startTime: "2026-04-01T00:00:00Z",
          locationId: "yamagata",
          description: "~20 min",
        },
        {
          id: "e-yamadera-hike",
          type: "attraction",
          title: "Yamadera Temple Hike (Risshaku-ji)",
          startTime: "2026-04-01T00:30:00Z",
          endTime: "2026-04-01T04:00:00Z",
          locationId: "yamagata",
          description: "~1,000 stone steps. Slow, scenic, very doable. Mountain views, temples, forest air. Courtney's dream hike!",
        },
        {
          id: "e-soba-yamagata",
          type: "meal",
          title: "Local Soba",
          startTime: "2026-04-01T05:00:00Z",
          locationId: "yamagata",
          description: "Yamagata specialty",
        },
        // Day 6 - Apr 2: Yamagata → Kanazawa
        {
          id: "e-train-kanazawa",
          type: "logistics",
          title: "Train: Yamagata → Kanazawa",
          startTime: "2026-04-02T00:00:00Z",
          endTime: "2026-04-02T05:00:00Z",
          locationId: "kanazawa",
          description: "Via Tokyo Station (~5 hours total, break at Tokyo)",
        },
        {
          id: "e-kanazawa-checkin",
          type: "hotel",
          title: "Check-in: Kanazawa",
          startTime: "2026-04-02T05:30:00Z",
          locationId: "kanazawa",
        },
        {
          id: "e-nagamachi",
          type: "attraction",
          title: "Nagamachi Samurai District",
          startTime: "2026-04-02T06:00:00Z",
          locationId: "kanazawa",
          description: "Nomura Samurai House",
        },
        {
          id: "e-higashi-chaya",
          type: "attraction",
          title: "Higashi Chaya District",
          startTime: "2026-04-02T09:00:00Z",
          locationId: "kanazawa",
          description: "Geisha quarter, dinner + gold leaf dessert",
        },
        // Day 7 - Apr 3: Kanazawa
        {
          id: "e-kenrokuen",
          type: "attraction",
          title: "Kenroku-en Garden",
          startTime: "2026-04-03T00:00:00Z",
          locationId: "kanazawa",
          description: "Peak sakura",
        },
        {
          id: "e-kanazawa-castle",
          type: "attraction",
          title: "Kanazawa Castle Park",
          startTime: "2026-04-03T02:00:00Z",
          locationId: "kanazawa",
        },
        {
          id: "e-21st-century",
          type: "attraction",
          title: "21st Century Museum of Contemporary Art",
          startTime: "2026-04-03T04:00:00Z",
          locationId: "kanazawa",
        },
        {
          id: "e-suzuki-museum",
          type: "attraction",
          title: "D.T. Suzuki Museum",
          startTime: "2026-04-03T06:00:00Z",
          locationId: "kanazawa",
          description: "Zen architecture",
        },
        {
          id: "e-ninja-temple",
          type: "attraction",
          title: "Ninja Temple (Myōryū-ji)",
          startTime: "2026-04-03T08:00:00Z",
          locationId: "kanazawa",
          description: "If booked",
        },
        // Day 8 - Apr 4: Kanazawa → Kyoto
        {
          id: "e-train-kyoto",
          type: "logistics",
          title: "Train: Kanazawa → Kyoto",
          startTime: "2026-04-04T02:00:00Z",
          endTime: "2026-04-04T04:00:00Z",
          locationId: "kyoto",
          description: "Limited Express Thunderbird (~2 hrs). Main luggage should be waiting",
        },
        {
          id: "e-kyoto-checkin",
          type: "hotel",
          title: "Check-in: Kyoto",
          startTime: "2026-04-04T04:30:00Z",
          locationId: "kyoto",
        },
        {
          id: "e-kamo-river",
          type: "attraction",
          title: "Kamo River Stroll",
          startTime: "2026-04-04T05:00:00Z",
          locationId: "kyoto",
          description: "Orientation walk",
        },
        {
          id: "e-gion",
          type: "attraction",
          title: "Gion District at Dusk",
          startTime: "2026-04-04T08:00:00Z",
          locationId: "kyoto",
        },
        {
          id: "e-pontocho",
          type: "meal",
          title: "Dinner in Pontocho Alley",
          startTime: "2026-04-04T09:00:00Z",
          locationId: "kyoto",
        },
        // Day 9 - Apr 5: Kyoto
        {
          id: "e-fushimi-inari",
          type: "attraction",
          title: "Fushimi Inari Taisha - Full Torii Gate Loop",
          startTime: "2026-04-05T00:00:00Z",
          endTime: "2026-04-05T02:00:00Z",
          locationId: "kyoto",
          description: "Early morning. Full hike ~2 hrs",
        },
        {
          id: "e-nijo-castle",
          type: "attraction",
          title: "Nijo Castle",
          startTime: "2026-04-05T03:00:00Z",
          locationId: "kyoto",
        },
        {
          id: "e-nishiki",
          type: "attraction",
          title: "Nishiki Market Food Crawl",
          startTime: "2026-04-05T09:00:00Z",
          locationId: "kyoto",
        },
        // Day 10 - Apr 6: Kyoto
        {
          id: "e-arashiyama-early",
          type: "attraction",
          title: "Arashiyama: Early Arrival",
          startTime: "2026-04-06T00:00:00Z",
          locationId: "kyoto",
        },
        {
          id: "e-tenryuji",
          type: "attraction",
          title: "Tenryu-ji Temple",
          startTime: "2026-04-06T00:30:00Z",
          locationId: "kyoto",
        },
        {
          id: "e-bamboo-grove",
          type: "attraction",
          title: "Bamboo Grove",
          startTime: "2026-04-06T01:30:00Z",
          locationId: "kyoto",
          description: "Before crowds",
        },
        {
          id: "e-okochi-sanso",
          type: "attraction",
          title: "Okochi Sanso Villa + Hillside Paths",
          startTime: "2026-04-06T03:00:00Z",
          locationId: "kyoto",
          description: "River walk, optional hillside paths",
        },
        {
          id: "e-kaiseki",
          type: "meal",
          title: "Optional Kaiseki Dinner",
          startTime: "2026-04-06T09:00:00Z",
          locationId: "kyoto",
          description: "Book ahead",
        },
        // Day 11 - Apr 7: Kyoto → Osaka
        {
          id: "e-forward-luggage-2",
          type: "logistics",
          title: "Forward luggage: Kyoto → Hiroshima",
          startTime: "2026-04-07T00:00:00Z",
          locationId: "kyoto",
          description: "Travel light",
        },
        {
          id: "e-train-osaka",
          type: "logistics",
          title: "Train: Kyoto → Osaka",
          startTime: "2026-04-07T02:00:00Z",
          endTime: "2026-04-07T02:30:00Z",
          locationId: "osaka",
          description: "~30 min",
        },
        {
          id: "e-osaka-castle",
          type: "attraction",
          title: "Osaka Castle Park or Nakanoshima Art Museum",
          startTime: "2026-04-07T03:00:00Z",
          locationId: "osaka",
        },
        {
          id: "e-dotonbori",
          type: "attraction",
          title: "Dotonbori Food Crawl",
          startTime: "2026-04-07T08:00:00Z",
          locationId: "osaka",
        },
        {
          id: "e-shinsekai",
          type: "attraction",
          title: "Shinsekai Neon District",
          startTime: "2026-04-07T09:00:00Z",
          locationId: "osaka",
        },
        {
          id: "e-capsule-checkin",
          type: "hotel",
          title: "Check-in: Capsule Hotel",
          startTime: "2026-04-07T10:00:00Z",
          locationId: "osaka",
          description: "Capsule night experience",
        },
        // Day 12 - Apr 8: Osaka → Hiroshima
        {
          id: "e-train-hiroshima",
          type: "logistics",
          title: "Train: Shin-Osaka → Hiroshima",
          startTime: "2026-04-08T02:00:00Z",
          endTime: "2026-04-08T03:30:00Z",
          locationId: "hiroshima",
          description: "~1.5 hrs",
        },
        {
          id: "e-hiroshima-checkin",
          type: "hotel",
          title: "Check-in: Hiroshima",
          startTime: "2026-04-08T04:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "e-peace-park",
          type: "attraction",
          title: "Peace Memorial Park",
          startTime: "2026-04-08T05:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "e-peace-museum",
          type: "attraction",
          title: "Peace Memorial Museum",
          startTime: "2026-04-08T06:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "e-abomb-dome",
          type: "attraction",
          title: "A-Bomb Dome",
          startTime: "2026-04-08T07:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "e-okonomiyaki",
          type: "meal",
          title: "Hiroshima Okonomiyaki",
          startTime: "2026-04-08T09:00:00Z",
          locationId: "hiroshima",
        },
        // Day 13 - Apr 9: Miyajima
        {
          id: "e-miyajima-ferry",
          type: "logistics",
          title: "Train + Ferry to Miyajima",
          startTime: "2026-04-09T00:00:00Z",
          locationId: "miyajima",
        },
        {
          id: "e-itsukushima",
          type: "attraction",
          title: "Itsukushima Shrine & Torii Gate",
          startTime: "2026-04-09T01:00:00Z",
          locationId: "miyajima",
        },
        {
          id: "e-misen-ropeway",
          type: "attraction",
          title: "Ropeway up Mt. Misen",
          startTime: "2026-04-09T03:00:00Z",
          locationId: "miyajima",
        },
        {
          id: "e-misen-hike",
          type: "attraction",
          title: "Downhill Forest Hike from Mt. Misen",
          startTime: "2026-04-09T04:00:00Z",
          endTime: "2026-04-09T07:00:00Z",
          locationId: "miyajima",
          description: "Deer, sweets, ocean views",
        },
        {
          id: "e-return-hiroshima",
          type: "logistics",
          title: "Return to Hiroshima",
          startTime: "2026-04-09T08:00:00Z",
          locationId: "hiroshima",
        },
        // Day 14 - Apr 10: Hiroshima → Tokyo
        {
          id: "e-forward-luggage-3",
          type: "logistics",
          title: "Forward luggage: Hiroshima → Final Tokyo Hotel",
          startTime: "2026-04-10T00:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "e-train-tokyo-final",
          type: "logistics",
          title: "Shinkansen: Hiroshima → Tokyo",
          startTime: "2026-04-10T01:00:00Z",
          endTime: "2026-04-10T05:00:00Z",
          locationId: "tokyo",
          description: "~4 hrs",
        },
        {
          id: "e-luxury-checkin",
          type: "hotel",
          title: "Check-in: Aman Tokyo (Luxury Splurge)",
          startTime: "2026-04-10T05:30:00Z",
          locationId: "tokyo",
          description: "Spa, pool, onsen, skyline views",
        },
        {
          id: "e-luxury-dinner",
          type: "meal",
          title: "Elegant Dinner or In-Room Dining",
          startTime: "2026-04-10T09:00:00Z",
          locationId: "tokyo",
        },
        // Day 15 - Apr 11: Tokyo
        {
          id: "e-shimokitazawa",
          type: "attraction",
          title: "Shimokitazawa",
          startTime: "2026-04-11T00:00:00Z",
          locationId: "tokyo",
          description: "Optional",
        },
        {
          id: "e-asakusa",
          type: "attraction",
          title: "Asakusa & Senso-ji",
          startTime: "2026-04-11T02:00:00Z",
          locationId: "tokyo",
        },
        {
          id: "e-akihabara",
          type: "attraction",
          title: "Akihabara Arcades & Gachapon",
          startTime: "2026-04-11T04:00:00Z",
          locationId: "tokyo",
        },
        {
          id: "e-farewell-dinner",
          type: "meal",
          title: "Farewell Dinner",
          startTime: "2026-04-11T09:00:00Z",
          locationId: "tokyo",
        },
        // Day 16 - Apr 12: Departure
        {
          id: "e-departure",
          type: "logistics",
          title: "Flight: HND → ORD (UA 882)",
          startTime: "2026-04-12T08:15:00Z",
          locationId: "tokyo",
          description: "Departs 5:15 pm local. Arrive ORD same day",
        },
      ],
      bookings: [
        {
          id: "b-flight-in",
          type: "flight",
          title: "UA 881: ORD → HND",
          confirmationCode: "UA881",
          provider: "United Airlines",
          startDate: "2026-03-27T12:00:00Z",
          locationId: "tokyo",
          attachments: [
            {
              id: "a-flight-in",
              type: "qr",
              url: "#",
              essential: true,
            },
          ],
        },
        {
          id: "b-flight-out",
          type: "flight",
          title: "UA 882: HND → ORD",
          confirmationCode: "UA882",
          provider: "United Airlines",
          startDate: "2026-04-12T08:15:00Z",
          locationId: "tokyo",
          attachments: [
            {
              id: "a-flight-out",
              type: "qr",
              url: "#",
              essential: true,
            },
          ],
        },
        {
          id: "b-tokyo-hotel-1",
          type: "hotel",
          title: "Tokyo Hotel (Shinjuku/Ginza)",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-03-28T10:00:00Z",
          endDate: "2026-03-31T11:00:00Z",
          locationId: "tokyo",
        },
        {
          id: "b-yamagata-hotel",
          type: "hotel",
          title: "Yamagata Hotel",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-03-31T04:30:00Z",
          endDate: "2026-04-02T11:00:00Z",
          locationId: "yamagata",
        },
        {
          id: "b-kanazawa-hotel",
          type: "hotel",
          title: "Kanazawa Hotel",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-04-02T05:30:00Z",
          endDate: "2026-04-04T11:00:00Z",
          locationId: "kanazawa",
        },
        {
          id: "b-kyoto-hotel",
          type: "hotel",
          title: "Kyoto Hotel",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-04-04T04:30:00Z",
          endDate: "2026-04-07T11:00:00Z",
          locationId: "kyoto",
        },
        {
          id: "b-osaka-capsule",
          type: "hotel",
          title: "Osaka Capsule Hotel",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-04-07T10:00:00Z",
          endDate: "2026-04-08T11:00:00Z",
          locationId: "osaka",
        },
        {
          id: "b-hiroshima-hotel",
          type: "hotel",
          title: "Hiroshima Hotel",
          confirmationCode: "TBD",
          provider: "TBD",
          startDate: "2026-04-08T04:00:00Z",
          endDate: "2026-04-10T11:00:00Z",
          locationId: "hiroshima",
        },
        {
          id: "b-tokyo-luxury",
          type: "hotel",
          title: "Aman Tokyo (Luxury Splurge)",
          confirmationCode: "TBD",
          provider: "Aman",
          startDate: "2026-04-10T05:30:00Z",
          endDate: "2026-04-12T11:00:00Z",
          locationId: "tokyo",
          details: {
            note: "Luxury splurge - spa, pool, onsen, skyline views",
          },
        },
      ],
      purchases: [
        {
          id: "p-jr-pass",
          title: "JR Pass (14-day)",
          status: "needed",
          quantity: "2 passes",
          description: "Buy before trip",
          links: ["https://www.japanrailpass.net/"],
        },
        {
          id: "p-teamlab",
          title: "teamLab Planets Tickets",
          status: "needed",
          dueDate: "2026-03-30T00:00:00Z",
          description: "Pre-book for Mar 30",
          links: ["https://planets.teamlab.art/"],
        },
        {
          id: "p-kaiseki",
          title: "Kaiseki Dinner Reservation",
          status: "planned",
          dueDate: "2026-04-06T00:00:00Z",
          description: "Kyoto - book ahead",
        },
        {
          id: "p-ninja-temple",
          title: "Ninja Temple (Myōryū-ji) Booking",
          status: "planned",
          dueDate: "2026-04-03T00:00:00Z",
          description: "Kanazawa - if interested",
        },
        {
          id: "p-esim",
          title: "Japan eSIM or Wi-Fi",
          status: "needed",
          description: "Set up on arrival at Haneda",
        },
        {
          id: "p-suca",
          title: "Suica Card",
          status: "planned",
          description: "Add to Apple Wallet on arrival",
        },
      ],
      travelers: [
        { id: "tom", name: "Tom", role: "traveler" },
        { id: "courtney", name: "Courtney", role: "traveler" },
      ],
    };

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


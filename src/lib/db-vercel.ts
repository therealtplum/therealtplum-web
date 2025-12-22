/**
 * Vercel Postgres database adapter
 * Used in production on Vercel
 */

import { sql } from "@vercel/postgres";
import type { Trip } from "@/types/trip";
import { hashPassword } from "./auth";

// Initialize database tables
export async function initVercelDB() {
  try {
    // Create trips table
    await sql`
      CREATE TABLE IF NOT EXISTS trips (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create travelers table
    await sql`
      CREATE TABLE IF NOT EXISTS travelers (
        trip_id TEXT NOT NULL,
        traveler_id TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'traveler',
        name TEXT NOT NULL,
        PRIMARY KEY (trip_id, traveler_id)
      )
    `;
  } catch (error) {
    console.error("Error initializing Vercel DB:", error);
    // Tables might already exist, which is fine
  }
}

export async function getTripVercel(tripId: string): Promise<Trip | null> {
  await initVercelDB();
  const result = await sql`
    SELECT data FROM trips WHERE id = ${tripId}
  `;
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0].data as Trip;
}

export async function saveTripVercel(trip: Trip): Promise<void> {
  await initVercelDB();
  await sql`
    INSERT INTO trips (id, data, updated_at)
    VALUES (${trip.id}, ${JSON.stringify(trip)}::jsonb, NOW())
    ON CONFLICT (id) 
    DO UPDATE SET data = ${JSON.stringify(trip)}::jsonb, updated_at = NOW()
  `;
}

export async function verifyTravelerVercel(
  tripId: string,
  travelerId: string,
  password: string
): Promise<{ valid: boolean; role?: "traveler" | "admin" }> {
  await initVercelDB();
  const result = await sql`
    SELECT password_hash, role FROM travelers
    WHERE trip_id = ${tripId} AND traveler_id = ${travelerId}
  `;

  if (result.rows.length === 0) {
    return { valid: false };
  }

  const { verifyPassword } = await import("./auth");
  const valid = await verifyPassword(password, result.rows[0].password_hash);

  return valid
    ? { valid: true, role: result.rows[0].role as "traveler" | "admin" }
    : { valid: false };
}

export async function createTravelerVercel(
  tripId: string,
  travelerId: string,
  password: string,
  name: string,
  role: "traveler" | "admin" = "traveler"
): Promise<void> {
  await initVercelDB();
  const passwordHash = await hashPassword(password);

  await sql`
    INSERT INTO travelers (trip_id, traveler_id, password_hash, role, name)
    VALUES (${tripId}, ${travelerId}, ${passwordHash}, ${role}, ${name})
    ON CONFLICT (trip_id, traveler_id)
    DO UPDATE SET 
      password_hash = ${passwordHash},
      role = ${role},
      name = ${name}
  `;
}

// Initialize with real trip data (same as file-based version)
export async function initializeDemoDataVercel(): Promise<void> {
  await initVercelDB();
  
  // Check if trip already exists
  const existingTrip = await getTripVercel("japan2026");
  
  // Check if travelers exist by querying directly
  let hasTom = false;
  let hasCourtney = false;
  try {
    const travelers = await sql`
      SELECT traveler_id FROM travelers
      WHERE trip_id = 'japan2026'
    `;
    hasTom = travelers.rows.some((r) => r.traveler_id === "tom");
    hasCourtney = travelers.rows.some((r) => r.traveler_id === "courtney");
  } catch (error) {
    // Table might not exist yet, that's fine
  }
  
  if (existingTrip && hasTom && hasCourtney) {
    // Everything already exists
    return;
  }

  // Get trip data from seed data
  const { getJapan2026Trip } = await import("./trip-seed-data");
  const trip = getJapan2026Trip();
  await saveTripVercel(trip);
  
  // Create travelers
  await createTravelerVercel("japan2026", "tom", "password123", "Tom", "traveler");
  await createTravelerVercel("japan2026", "courtney", "password123", "Courtney", "traveler");
}


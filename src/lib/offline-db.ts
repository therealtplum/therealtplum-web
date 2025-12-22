/**
 * IndexedDB utilities for offline storage
 */

import { openDB, DBSchema, IDBPDatabase } from "idb";
import type { Trip, Event, Purchase, Note, SyncOperation } from "@/types/trip";

interface TripOSDB extends DBSchema {
  trips: {
    key: string;
    value: Trip;
  };
  syncQueue: {
    key: string;
    value: SyncOperation;
    indexes: { byTimestamp: string };
  };
  weather: {
    key: string; // "locationId-date"
    value: {
      locationId: string;
      date: string;
      fetchedAt: string;
      data: Record<string, unknown>;
    };
  };
}

let dbInstance: IDBPDatabase<TripOSDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<TripOSDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<TripOSDB>("trip-os", 1, {
    upgrade(db) {
      // Trips store
      if (!db.objectStoreNames.contains("trips")) {
        db.createObjectStore("trips");
      }

      // Sync queue store
      if (!db.objectStoreNames.contains("syncQueue")) {
        const syncStore = db.createObjectStore("syncQueue", {
          keyPath: "id",
        });
        syncStore.createIndex("byTimestamp", "timestamp");
      }

      // Weather cache store
      if (!db.objectStoreNames.contains("weather")) {
        db.createObjectStore("weather");
      }
    },
  });

  return dbInstance;
}

export async function saveTripOffline(trip: Trip): Promise<void> {
  const db = await getDB();
  await db.put("trips", trip, trip.id);
}

export async function getTripOffline(tripId: string): Promise<Trip | null> {
  const db = await getDB();
  return (await db.get("trips", tripId)) || null;
}

export async function addToSyncQueue(operation: SyncOperation): Promise<void> {
  const db = await getDB();
  await db.add("syncQueue", operation);
}

export async function getSyncQueue(): Promise<SyncOperation[]> {
  const db = await getDB();
  return await db.getAll("syncQueue");
}

export async function clearSyncQueue(operationIds: string[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction("syncQueue", "readwrite");
  for (const id of operationIds) {
    await tx.store.delete(id);
  }
  await tx.done;
}

export async function saveWeatherCache(
  locationId: string,
  date: string,
  data: Record<string, unknown>
): Promise<void> {
  const db = await getDB();
  await db.put("weather", {
    locationId,
    date,
    fetchedAt: new Date().toISOString(),
    data,
  }, `${locationId}-${date}`);
}

export async function getWeatherCache(
  locationId: string,
  date: string
): Promise<{ data: Record<string, unknown>; fetchedAt: string } | null> {
  const db = await getDB();
  const cached = await db.get("weather", `${locationId}-${date}`);
  if (!cached) return null;
  return { data: cached.data, fetchedAt: cached.fetchedAt };
}


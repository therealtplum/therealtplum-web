/**
 * Trip OS Data Models
 * Core types for trip data structure
 */

export type EventType =
  | "logistics"
  | "hotel"
  | "meal"
  | "attraction"
  | "free-time"
  | "admin";

export type PurchaseStatus =
  | "needed"
  | "planned"
  | "purchased"
  | "received"
  | "canceled";

export interface Location {
  id: string;
  name: string;
  city?: string;
  country?: string;
  timezone: string;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface Event {
  id: string;
  type: EventType;
  title: string;
  startTime: string; // ISO 8601
  endTime?: string; // ISO 8601
  locationId?: string;
  location?: Location; // Resolved location
  description?: string;
  bookingId?: string; // Reference to booking
  purchaseId?: string; // Reference to purchase/task
  attachments?: Attachment[];
  notes?: Note[];
  metadata?: Record<string, unknown>;
}

export interface Booking {
  id: string;
  type: "flight" | "train" | "hotel" | "reservation" | "other";
  title: string;
  confirmationCode?: string;
  provider?: string;
  startDate: string;
  endDate?: string;
  locationId?: string;
  location?: Location;
  details?: Record<string, unknown>;
  attachments?: Attachment[];
  phone?: string;
  email?: string;
}

export interface Purchase {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  links?: string[];
  quantity?: string; // e.g., "2 tickets", "covers Tom+Courtney"
  status: PurchaseStatus;
  updatedBy?: string; // travelerId
  updatedAt?: string; // ISO 8601
  eventId?: string; // Optional link to event
}

export interface Note {
  id: string;
  author: string; // travelerId
  createdAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  content: string;
  rating?: number; // 1-5
  eventId?: string; // Optional link to event
  day?: string; // Optional link to day (YYYY-MM-DD)
  shared?: boolean; // If false, only visible to author
}

export interface Attachment {
  id: string;
  type: "qr" | "pdf" | "image" | "other";
  url: string;
  filename?: string;
  essential?: boolean; // Included in offline pack
  size?: number; // bytes
}

export interface Traveler {
  id: string;
  name: string;
  role?: "traveler" | "admin";
  email?: string;
}

export interface WeatherSnapshot {
  locationId: string;
  date: string; // YYYY-MM-DD
  fetchedAt: string; // ISO 8601
  tempHigh?: number;
  tempLow?: number;
  condition?: string;
  icon?: string;
  data?: Record<string, unknown>;
}

export interface Trip {
  id: string;
  name: string;
  version: string; // For migrations
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  baseTimezone: string;
  locations: Location[];
  events: Event[];
  bookings: Booking[];
  purchases: Purchase[];
  travelers: Traveler[];
  metadata?: Record<string, unknown>;
}

export interface TripSession {
  tripId: string;
  travelerId: string;
  role: "traveler" | "admin";
  expiresAt: string;
}

export interface SyncOperation {
  id: string;
  type: "update" | "create" | "delete";
  entity: "event" | "purchase" | "note";
  entityId: string;
  data: Record<string, unknown>;
  timestamp: string;
  travelerId: string;
}

export interface SyncResponse {
  applied: SyncOperation[];
  conflicts?: SyncOperation[];
  checkpoint: string;
  updated: {
    events?: Event[];
    purchases?: Purchase[];
    notes?: Note[];
  };
}


/**
 * Trip Data Utilities
 * Helper functions for working with trip data
 */

import type { Trip, Event, Location, Booking, Purchase } from "@/types/trip";

/**
 * Get events for a specific date
 */
export function getEventsForDate(trip: Trip, date: string): Event[] {
  const targetDate = date.split("T")[0]; // YYYY-MM-DD
  return trip.events.filter((event) => {
    const eventDate = event.startTime.split("T")[0];
    return eventDate === targetDate;
  });
}

/**
 * Get events for today
 */
export function getTodayEvents(trip: Trip): Event[] {
  const today = new Date().toISOString().split("T")[0];
  return getEventsForDate(trip, today);
}

/**
 * Get next upcoming event
 */
export function getNextEvent(trip: Trip): Event | null {
  const now = new Date();
  const upcoming = trip.events
    .filter((event) => new Date(event.startTime) > now)
    .sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  return upcoming[0] || null;
}

/**
 * Resolve location for an event
 */
export function resolveEventLocation(
  event: Event,
  locations: Location[]
): Location | undefined {
  if (event.location) return event.location;
  if (event.locationId) {
    return locations.find((loc) => loc.id === event.locationId);
  }
  return undefined;
}

/**
 * Get events filtered by type
 */
export function getEventsByType(trip: Trip, type: string): Event[] {
  return trip.events.filter((event) => event.type === type);
}

/**
 * Get logistics events (transit, check-in/out, transfers)
 */
export function getLogisticsEvents(trip: Trip): Event[] {
  return trip.events.filter(
    (event) =>
      event.type === "logistics" ||
      (event.type === "hotel" && 
       (event.title.toLowerCase().includes("check-in") ||
        event.title.toLowerCase().includes("check-out")))
  );
}

/**
 * Get hotel events
 */
export function getHotelEvents(trip: Trip): Event[] {
  return trip.events.filter((event) => event.type === "hotel");
}

/**
 * Get meal events
 */
export function getMealEvents(trip: Trip): Event[] {
  return trip.events.filter((event) => event.type === "meal");
}

/**
 * Get purchases with status
 */
export function getPurchasesByStatus(
  purchases: Purchase[],
  status: string
): Purchase[] {
  return purchases.filter((p) => p.status === status);
}

/**
 * Get bookings for an event
 */
export function getBookingForEvent(
  event: Event,
  bookings: Booking[]
): Booking | undefined {
  if (!event.bookingId) return undefined;
  return bookings.find((b) => b.id === event.bookingId);
}

/**
 * Group events by time of day
 */
export function groupEventsByTimeOfDay(events: Event[]): {
  morning: Event[];
  afternoon: Event[];
  evening: Event[];
} {
  const morning: Event[] = [];
  const afternoon: Event[] = [];
  const evening: Event[] = [];

  events.forEach((event) => {
    const hour = new Date(event.startTime).getHours();
    if (hour < 12) {
      morning.push(event);
    } else if (hour < 17) {
      afternoon.push(event);
    } else {
      evening.push(event);
    }
  });

  return { morning, afternoon, evening };
}

/**
 * Format time for display
 */
export function formatTime(
  isoString: string,
  timezone?: string,
  mode: "user" | "trip" = "trip"
): string {
  const date = new Date(isoString);
  
  if (mode === "user") {
    // Display in user's local timezone
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } else {
    // Display in trip/location timezone
    const tz = timezone || "Asia/Tokyo";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
      timeZoneName: "short",
    });
  }
}

/**
 * Format date for display
 */
export function formatDate(
  isoString: string,
  timezone?: string,
  mode: "user" | "trip" = "trip"
): string {
  const date = new Date(isoString);
  
  if (mode === "user") {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } else {
    const tz = timezone || "Asia/Tokyo";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: tz,
    });
  }
}

/**
 * Get all dates in trip range
 */
export function getTripDates(trip: Trip): string[] {
  const dates: string[] = [];
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(date.toISOString().split("T")[0]);
  }
  
  return dates;
}


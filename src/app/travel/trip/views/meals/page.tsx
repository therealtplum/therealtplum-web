"use client";

import { useState } from "react";
import type { Event } from "@/types/trip";
import { getMealEvents, resolveEventLocation } from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";
import EventCard from "@/components/travel/EventCard";
import EventDetailSheet from "@/components/travel/EventDetailSheet";

export default function MealsViewPage() {
  const { trip } = useTrip();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (!trip) return null;

  const mealEvents = getMealEvents(trip);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <a
          href="/travel/trip/views"
          className="text-charcoal/60 dark:text-cream/60 hover:text-charcoal dark:hover:text-cream"
        >
          ← Back
        </a>
        <h1 className="text-2xl font-bold">Meals</h1>
      </div>

      {mealEvents.length === 0 ? (
        <div className="text-center py-12 text-charcoal/60 dark:text-cream/60">
          <p>No meal events</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mealEvents
            .sort(
              (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
            )
            .map((event) => {
              const location = resolveEventLocation(event, trip.locations);
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  location={location}
                  onClick={() => setSelectedEvent(event)}
                />
              );
            })}
        </div>
      )}

      {selectedEvent && (
        <EventDetailSheet
          event={selectedEvent}
          trip={trip}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}


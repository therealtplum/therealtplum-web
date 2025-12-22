"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/types/trip";
import {
  getTripDates,
  getEventsForDate,
  formatDate,
  resolveEventLocation,
} from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";
import EventCard from "@/components/travel/EventCard";
import EventDetailSheet from "@/components/travel/EventDetailSheet";

export default function DaysPage() {
  const { trip } = useTrip();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (trip && !selectedDate) {
      const tripDates = getTripDates(trip);
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(
        tripDates.includes(today) ? today : tripDates[0] || today
      );
    }
  }, [trip, selectedDate]);

  if (!trip) return null;

  const tripDates = getTripDates(trip);
  const currentDateEvents = selectedDate
    ? getEventsForDate(trip, selectedDate)
    : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Days</h1>

      {/* Date Scroller */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {tripDates.map((date) => {
            const isSelected = date === selectedDate;
            const dateEvents = getEventsForDate(trip, date);
            const isToday = date === new Date().toISOString().split("T")[0];

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-charcoal/50 border-charcoal/20 dark:border-cream/20 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                <div className="text-xs font-medium mb-1">
                  {formatDate(date)}
                </div>
                <div className="text-xs opacity-70">
                  {dateEvents.length} {dateEvents.length === 1 ? "event" : "events"}
                </div>
                {isToday && (
                  <div className="text-xs mt-1 font-semibold">Today</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      {selectedDate && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {formatDate(selectedDate)}
          </h2>

          {currentDateEvents.length === 0 ? (
            <div className="text-center py-12 text-charcoal/60 dark:text-cream/60">
              <p>No events scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentDateEvents
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


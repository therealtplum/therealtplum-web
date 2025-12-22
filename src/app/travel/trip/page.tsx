"use client";

import { useState } from "react";
import type { Event } from "@/types/trip";
import {
  getTodayEvents,
  getNextEvent,
  groupEventsByTimeOfDay,
  formatTime,
  resolveEventLocation,
} from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";
import EventCard from "@/components/travel/EventCard";
import EventDetailSheet from "@/components/travel/EventDetailSheet";
import WeatherDisplay from "@/components/travel/WeatherDisplay";

export default function TodayPage() {
  const { trip } = useTrip();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (!trip) return null;

  const todayEvents = getTodayEvents(trip);
  const nextEvent = getNextEvent(trip);
  const { morning, afternoon, evening } = groupEventsByTimeOfDay(todayEvents);

  const renderEventSection = (title: string, events: Event[]) => {
    if (events.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-charcoal/70 dark:text-cream/70 mb-3 uppercase tracking-wide">
          {title}
        </h3>
        <div className="space-y-3">
          {events.map((event) => {
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
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Today</h1>
        <p className="text-charcoal/70 dark:text-cream/70 mb-3">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        {trip.locations.length > 0 && (
          <WeatherDisplay
            location={trip.locations[0]}
            date={new Date().toISOString()}
            compact
          />
        )}
      </div>

      {nextEvent && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">
            Next Up
          </div>
          <div className="font-semibold">{nextEvent.title}</div>
          <div className="text-sm text-charcoal/70 dark:text-cream/70">
            {formatTime(nextEvent.startTime)}
          </div>
        </div>
      )}

      {todayEvents.length === 0 ? (
        <div className="text-center py-12 text-charcoal/60 dark:text-cream/60">
          <p>No events scheduled for today</p>
        </div>
      ) : (
        <div>
          {renderEventSection("Morning", morning)}
          {renderEventSection("Afternoon", afternoon)}
          {renderEventSection("Evening", evening)}
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


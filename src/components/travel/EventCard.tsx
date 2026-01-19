"use client";

import type { Event, Location } from "@/types/trip";
import { formatTime, formatDateTime, getBookingForEvent } from "@/lib/trip-data";
import { useTimezone } from "@/lib/timezone-context";
import { useTrip } from "@/lib/trip-context";

interface EventCardProps {
  event: Event;
  location?: Location;
  onClick: () => void;
}

const eventTypeColors: Record<string, string> = {
  logistics: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  hotel: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  meal: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  attraction: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "free-time": "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  admin: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
};

export default function EventCard({ event, location, onClick }: EventCardProps) {
  const { mode } = useTimezone();
  const { trip } = useTrip();
  const timezone = location?.timezone || trip?.baseTimezone || "Asia/Tokyo";
  
  const booking = trip ? getBookingForEvent(event, trip.bookings) : undefined;
  const isLogisticsEvent = event.type === "logistics" || event.type === "hotel";
  const isHotel = booking?.type === "hotel" || event.type === "hotel";
  const isFlightOrTrain = booking?.type === "flight" || booking?.type === "train";
  
  // Use booking dates if available, otherwise use event times
  const startDateTime = booking?.startDate || event.startTime;
  const endDateTime = booking?.endDate || event.endTime;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-white dark:bg-charcoal/50 rounded-lg border border-charcoal/10 dark:border-cream/10 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded ${eventTypeColors[event.type] || eventTypeColors.admin}`}>
              {event.type}
            </span>
            {!isLogisticsEvent && (
              <span className="text-sm font-medium text-charcoal/70 dark:text-cream/70">
                {formatTime(event.startTime, timezone, mode)}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
          {location && (
            <div className="text-sm text-charcoal/60 dark:text-cream/60">
              <p>{location.name}</p>
              {location.address && location.lat && location.lng && (
                <a
                  href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs flex items-center gap-1 mt-1"
                >
                  <span>📍</span>
                  <span>{location.address}</span>
                </a>
              )}
            </div>
          )}
          {isLogisticsEvent && (
            <div className="mt-2 space-y-1">
              {isHotel && startDateTime && (
                <p className="text-sm text-charcoal/70 dark:text-cream/70">
                  <span className="font-medium">Check in:</span> {formatDateTime(startDateTime, timezone, mode)}
                </p>
              )}
              {isHotel && endDateTime && (
                <p className="text-sm text-charcoal/70 dark:text-cream/70">
                  <span className="font-medium">Check out:</span> {formatDateTime(endDateTime, timezone, mode)}
                </p>
              )}
              {isFlightOrTrain && startDateTime && (
                <p className="text-sm text-charcoal/70 dark:text-cream/70">
                  <span className="font-medium">Depart:</span> {formatDateTime(startDateTime, timezone, mode)}
                </p>
              )}
              {isFlightOrTrain && endDateTime && (
                <p className="text-sm text-charcoal/70 dark:text-cream/70">
                  <span className="font-medium">Arrive:</span> {formatDateTime(endDateTime, timezone, mode)}
                </p>
              )}
              {isLogisticsEvent && !isHotel && !isFlightOrTrain && startDateTime && (
                <p className="text-sm text-charcoal/70 dark:text-cream/70">
                  {formatDateTime(startDateTime, timezone, mode)}
                  {endDateTime && (
                    <>
                      {" → "}
                      {formatDateTime(endDateTime, timezone, mode)}
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {event.description && (
        <p className="text-sm text-charcoal/70 dark:text-cream/70 mt-2">
          {event.description}
        </p>
      )}
    </button>
  );
}


"use client";

import { useEffect } from "react";
import type { Trip, Event, Location } from "@/types/trip";
import { formatTime, formatDateTime, resolveEventLocation, getBookingForEvent } from "@/lib/trip-data";
import { useTimezone } from "@/lib/timezone-context";

interface EventDetailSheetProps {
  event: Event;
  trip: Trip;
  onClose: () => void;
}

export default function EventDetailSheet({
  event,
  trip,
  onClose,
}: EventDetailSheetProps) {
  const { mode } = useTimezone();
  
  useEffect(() => {
    // Prevent body scroll when sheet is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const location = resolveEventLocation(event, trip.locations);
  const booking = getBookingForEvent(event, trip.bookings);
  const timezone = location?.timezone || trip.baseTimezone;
  
  const isLogisticsEvent = event.type === "logistics" || event.type === "hotel";
  const isHotel = booking?.type === "hotel" || event.type === "hotel";
  const isFlightOrTrain = booking?.type === "flight" || booking?.type === "train";
  
  // Use booking dates if available, otherwise use event times
  const startDateTime = booking?.startDate || event.startTime;
  const endDateTime = booking?.endDate || event.endTime;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-h-[90vh] bg-cream dark:bg-charcoal rounded-t-2xl overflow-y-auto">
        <div className="sticky top-0 bg-cream dark:bg-charcoal border-b border-charcoal/10 dark:border-cream/10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Event Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-charcoal/10 dark:hover:bg-cream/10 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            {isLogisticsEvent ? (
              <div className="space-y-2 text-sm text-charcoal/70 dark:text-cream/70">
                {isHotel && startDateTime && (
                  <div>
                    <span className="font-medium">Check in:</span> {formatDateTime(startDateTime, timezone, mode)}
                  </div>
                )}
                {isHotel && endDateTime && (
                  <div>
                    <span className="font-medium">Check out:</span> {formatDateTime(endDateTime, timezone, mode)}
                  </div>
                )}
                {isFlightOrTrain && startDateTime && (
                  <div>
                    <span className="font-medium">Depart:</span> {formatDateTime(startDateTime, timezone, mode)}
                  </div>
                )}
                {isFlightOrTrain && endDateTime && (
                  <div>
                    <span className="font-medium">Arrive:</span> {formatDateTime(endDateTime, timezone, mode)}
                  </div>
                )}
                {isLogisticsEvent && !isHotel && !isFlightOrTrain && startDateTime && (
                  <div>
                    {formatDateTime(startDateTime, timezone, mode)}
                    {endDateTime && (
                      <>
                        {" → "}
                        {formatDateTime(endDateTime, timezone, mode)}
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm text-charcoal/70 dark:text-cream/70">
                <span>{formatTime(event.startTime, timezone, mode)}</span>
                {event.endTime && (
                  <>
                    <span>→</span>
                    <span>{formatTime(event.endTime, timezone, mode)}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {location && (
            <div>
              <h4 className="font-semibold mb-1">Location</h4>
              <p className="text-charcoal/70 dark:text-cream/70">
                {location.name}
                {location.address && `, ${location.address}`}
              </p>
              {location.lat && location.lng && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Open in Maps →
                </a>
              )}
            </div>
          )}

          {event.description && (
            <div>
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-charcoal/70 dark:text-cream/70">
                {event.description}
              </p>
            </div>
          )}

          {booking && (
            <div>
              <h4 className="font-semibold mb-1">Booking Details</h4>
              {booking.confirmationCode && (
                <div className="mb-2">
                  <span className="text-sm text-charcoal/60 dark:text-cream/60">
                    Confirmation:{" "}
                  </span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                    {booking.confirmationCode}
                  </button>
                </div>
              )}
              {booking.phone && (
                <div>
                  <span className="text-sm text-charcoal/60 dark:text-cream/60">
                    Phone:{" "}
                  </span>
                  <a
                    href={`tel:${booking.phone}`}
                    className="text-sm text-blue-600 dark:text-blue-400"
                  >
                    {booking.phone}
                  </a>
                </div>
              )}
            </div>
          )}

          {event.attachments && event.attachments.filter(att => att.type !== "qr").length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Attachments</h4>
              <div className="space-y-2">
                {event.attachments
                  .filter(att => att.type !== "qr")
                  .map((attachment) => (
                    <div
                      key={attachment.id}
                      className="p-3 bg-charcoal/5 dark:bg-cream/5 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{attachment.filename || "Attachment"}</span>
                        <button className="text-sm text-blue-600 dark:text-blue-400">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {event.notes && event.notes.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Notes</h4>
              <div className="space-y-2">
                {event.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-charcoal/5 dark:bg-cream/5 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">
                        {trip.travelers.find((t) => t.id === note.author)?.name || note.author}
                      </span>
                      {note.rating && (
                        <span className="text-xs">{"⭐".repeat(note.rating)}</span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/70 dark:text-cream/70">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

import type { Event, Location } from "@/types/trip";
import { formatTime } from "@/lib/trip-data";

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
            <span className="text-sm font-medium text-charcoal/70 dark:text-cream/70">
              {formatTime(event.startTime)}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
          {location && (
            <p className="text-sm text-charcoal/60 dark:text-cream/60">
              {location.name}
            </p>
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


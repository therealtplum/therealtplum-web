"use client";

import { useState, useEffect } from "react";
import type { Booking } from "@/types/trip";
import { formatDate, formatTime } from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";
import { useTimezone } from "@/lib/timezone-context";

function BookingCard({ booking, location, trip }: { booking: Booking; location?: { name: string; address?: string }; trip: { baseTimezone: string } }) {
  const { mode } = useTimezone();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-white dark:bg-charcoal/50 rounded-lg border border-charcoal/10 dark:border-cream/10 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg mb-1">{booking.title}</h3>
          {booking.provider && (
            <p className="text-sm text-charcoal/60 dark:text-cream/60">
              {booking.provider}
            </p>
          )}
        </div>
        <span className="text-2xl">
          {booking.type === "flight" && "✈️"}
          {booking.type === "hotel" && "🏨"}
          {booking.type === "train" && "🚄"}
          {!["flight", "hotel", "train"].includes(booking.type) && "📋"}
        </span>
      </div>

      {booking.confirmationCode && (
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal/60 dark:text-cream/60">
              Confirmation:
            </span>
            <code className="text-sm font-mono bg-charcoal/5 dark:bg-cream/5 px-2 py-1 rounded">
              {booking.confirmationCode}
            </code>
            <button
              onClick={() => copyToClipboard(booking.confirmationCode!)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {location && (
        <div className="mb-2">
          <p className="text-sm text-charcoal/70 dark:text-cream/70">
            {location.name}
          </p>
          {location.address && (
            <div className="flex items-start gap-2 mt-1">
              <p className="text-sm text-charcoal/60 dark:text-cream/60 flex-1">
                {location.address}
              </p>
              <button
                onClick={() => copyToClipboard(location.address!)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      )}

      <div className="text-sm text-charcoal/60 dark:text-cream/60 mb-2">
        {formatDate(booking.startDate, trip.baseTimezone, mode)} {formatTime(booking.startDate, trip.baseTimezone, mode)}
        {booking.endDate && (
          <>
            {" → "}
            {formatDate(booking.endDate, trip.baseTimezone, mode)} {formatTime(booking.endDate, trip.baseTimezone, mode)}
          </>
        )}
      </div>

      {booking.phone && (
        <div className="mb-2">
          <a
            href={`tel:${booking.phone}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            📞 {booking.phone}
          </a>
        </div>
      )}

      {booking.attachments && booking.attachments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-charcoal/10 dark:border-cream/10">
          <div className="text-xs font-medium text-charcoal/60 dark:text-cream/60 mb-2">
            Attachments
          </div>
          <div className="space-y-2">
            {booking.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="p-3 bg-charcoal/5 dark:bg-cream/5 rounded-lg"
              >
                {attachment.type === "qr" ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-sm text-charcoal/70 dark:text-cream/70">
                      QR Code Available
                    </p>
                    <button className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      View QR Code
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {attachment.filename || "Attachment"}
                    </span>
                    <button className="text-sm text-blue-600 dark:text-blue-400">
                      View
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WalletPage() {
  const { trip } = useTrip();
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    // Check if offline pack is available
    // In production, this would check IndexedDB or service worker cache
    const stored = localStorage.getItem("offlinePack");
    setOfflineReady(!!stored);
  }, []);

  if (!trip) return null;

  const essentialBookings = trip.bookings.filter((booking) =>
    booking.attachments?.some((att) => att.essential)
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <button
          onClick={() => {
            // TODO: Implement offline pack download
            localStorage.setItem("offlinePack", "downloaded");
            setOfflineReady(true);
          }}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {offlineReady ? "✓ Downloaded" : "Download for Offline"}
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {offlineReady
            ? "✓ Offline pack ready. Essential items available without internet."
            : "Download offline pack to access essential items without internet."}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
        {trip.bookings.length === 0 ? (
          <p className="text-charcoal/60 dark:text-cream/60">
            No bookings yet
          </p>
        ) : (
          trip.bookings.map((booking) => {
            const location = trip.locations.find(
              (loc) => loc.id === booking.locationId
            );
            return (
              <BookingCard key={booking.id} booking={booking} location={location} trip={trip} />
            );
          })
        )}
      </div>

      {essentialBookings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Essential Items</h2>
          <p className="text-sm text-charcoal/60 dark:text-cream/60 mb-3">
            These items are included in your offline pack
          </p>
          {essentialBookings.map((booking) => {
            const location = trip.locations.find(
              (loc) => loc.id === booking.locationId
            );
            return (
              <BookingCard key={booking.id} booking={booking} location={location} trip={trip} />
            );
          })}
        </div>
      )}
    </div>
  );
}


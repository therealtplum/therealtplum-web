"use client";

import Link from "next/link";
import {
  getLogisticsEvents,
  getHotelEvents,
  getMealEvents,
  getPurchasesByStatus,
} from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";


interface ViewTileProps {
  title: string;
  count: number;
  subtitle?: string;
  icon: string;
  href: string;
}

function ViewTile({ title, count, subtitle, icon, href }: ViewTileProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white dark:bg-charcoal/50 rounded-lg border border-charcoal/10 dark:border-cream/10 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-4xl">{icon}</div>
        <div className="text-2xl font-bold">{count}</div>
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-charcoal/60 dark:text-cream/60">
          {subtitle}
        </p>
      )}
    </Link>
  );
}

export default function ViewsPage() {
  const { trip } = useTrip();

  if (!trip) return null;

  const logisticsEvents = getLogisticsEvents(trip);
  const hotelEvents = getHotelEvents(trip);
  const mealEvents = getMealEvents(trip);
  const neededPurchases = getPurchasesByStatus(trip.purchases, "needed");
  const pendingPurchases = getPurchasesByStatus(trip.purchases, "planned");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Views</h1>

      <div className="space-y-4">
        <ViewTile
          title="Logistics"
          count={logisticsEvents.length}
          subtitle="Flights, trains, transfers"
          icon="✈️"
          href="/travel/trip/views/logistics"
        />

        <ViewTile
          title="Purchases"
          count={trip.purchases.length}
          subtitle={`${neededPurchases.length} due, ${pendingPurchases.length} pending`}
          icon="🛒"
          href="/travel/trip/views/purchases"
        />

        <ViewTile
          title="Hotels"
          count={hotelEvents.length}
          subtitle="Check-ins and stays"
          icon="🏨"
          href="/travel/trip/views/hotels"
        />

        <ViewTile
          title="Meals"
          count={mealEvents.length}
          subtitle="Restaurants and reservations"
          icon="🍽️"
          href="/travel/trip/views/meals"
        />
      </div>
    </div>
  );
}


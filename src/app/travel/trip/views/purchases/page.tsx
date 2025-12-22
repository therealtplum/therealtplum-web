"use client";

import type { Purchase } from "@/types/trip";
import { formatDate } from "@/lib/trip-data";
import { useTrip } from "@/lib/trip-context";

const statusColors: Record<string, string> = {
  needed: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  planned: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  purchased: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  received: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  canceled: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  return (
    <div className="p-4 bg-white dark:bg-charcoal/50 rounded-lg border border-charcoal/10 dark:border-cream/10">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg flex-1">{purchase.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[purchase.status] || statusColors.needed}`}>
          {purchase.status}
        </span>
      </div>
      {purchase.description && (
        <p className="text-sm text-charcoal/70 dark:text-cream/70 mb-2">
          {purchase.description}
        </p>
      )}
      {purchase.quantity && (
        <p className="text-sm text-charcoal/60 dark:text-cream/60 mb-2">
          {purchase.quantity}
        </p>
      )}
      {purchase.dueDate && (
        <p className="text-sm text-charcoal/60 dark:text-cream/60">
          Due: {formatDate(purchase.dueDate)}
        </p>
      )}
      {purchase.links && purchase.links.length > 0 && (
        <div className="mt-2">
          {purchase.links.map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mr-3"
            >
              Link {idx + 1} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PurchasesViewPage() {
  const { trip } = useTrip();

  if (!trip) return null;

  const purchasesByStatus = trip.purchases.reduce((acc, purchase) => {
    if (!acc[purchase.status]) {
      acc[purchase.status] = [];
    }
    acc[purchase.status].push(purchase);
    return acc;
  }, {} as Record<string, Purchase[]>);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <a
          href="/travel/trip/views"
          className="text-charcoal/60 dark:text-cream/60 hover:text-charcoal dark:hover:text-cream"
        >
          ← Back
        </a>
        <h1 className="text-2xl font-bold">Purchases</h1>
      </div>

      {trip.purchases.length === 0 ? (
        <div className="text-center py-12 text-charcoal/60 dark:text-cream/60">
          <p>No purchases tracked</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(purchasesByStatus).map(([status, purchases]) => (
            <div key={status}>
              <h2 className="text-lg font-semibold mb-3 capitalize">
                {status} ({purchases.length})
              </h2>
              <div className="space-y-3">
                {purchases.map((purchase) => (
                  <PurchaseCard key={purchase.id} purchase={purchase} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


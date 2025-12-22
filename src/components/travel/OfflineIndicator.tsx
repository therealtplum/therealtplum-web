"use client";

import { useState, useEffect } from "react";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Get last sync time from localStorage
    const stored = localStorage.getItem("lastSync");
    if (stored) {
      setLastSync(new Date(stored));
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="sticky top-[73px] z-30 bg-cream/95 dark:bg-charcoal/95 backdrop-blur-sm border-b border-charcoal/10 dark:border-cream/10">
      <div className="flex items-center justify-between px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className={isOnline ? "text-green-600" : "text-orange-600"}>
            {isOnline ? "●" : "○"}
          </span>
          <span className="text-charcoal/70 dark:text-cream/70">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        {lastSync && (
          <span className="text-charcoal/60 dark:text-cream/60">
            Last sync: {formatTime(lastSync)}
          </span>
        )}
      </div>
    </div>
  );
}


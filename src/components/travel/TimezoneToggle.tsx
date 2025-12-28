"use client";

import { useTimezone } from "@/lib/timezone-context";

export default function TimezoneToggle() {
  const { mode, toggle } = useTimezone();

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-charcoal/20 dark:border-cream/20 bg-white/50 dark:bg-charcoal/50 hover:bg-white dark:hover:bg-charcoal/70 transition-colors flex items-center gap-2"
      title={`Switch to ${mode === "user" ? "trip" : "user"} timezone`}
    >
      <span className="text-lg">
        {mode === "user" ? "🌍" : "🇯🇵"}
      </span>
      <span className="text-charcoal/70 dark:text-cream/70">
        {mode === "user" ? "Your Time" : "Trip Time"}
      </span>
    </button>
  );
}



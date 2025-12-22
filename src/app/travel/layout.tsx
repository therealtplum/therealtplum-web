"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/service-worker";

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal">
      {children}
    </div>
  );
}


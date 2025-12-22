"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [tripId, setTripId] = useState("");
  const [traveler, setTraveler] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tripId || !traveler || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/travel/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tripId,
          travelerId: traveler,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect on success
      router.push("/travel/trip");
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Trip OS</h1>
          <p className="text-charcoal/70 dark:text-cream/70">
            Your travel command center
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="tripId"
              className="block text-sm font-medium mb-1"
            >
              Trip ID
            </label>
            <input
              id="tripId"
              type="text"
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              placeholder="e.g., japan2026"
              className="w-full px-4 py-2 border border-charcoal/20 dark:border-cream/20 rounded-lg bg-cream dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="traveler"
              className="block text-sm font-medium mb-1"
            >
              Traveler
            </label>
            <input
              id="traveler"
              type="text"
              value={traveler}
              onChange={(e) => setTraveler(e.target.value)}
              placeholder="e.g., tom"
              className="w-full px-4 py-2 border border-charcoal/20 dark:border-cream/20 rounded-lg bg-cream dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-charcoal/20 dark:border-cream/20 rounded-lg bg-cream dark:bg-charcoal focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-charcoal/60 dark:text-cream/60">
          <p>Demo: tripId: japan2026, traveler: tom/courtney, password: password123</p>
        </div>
      </div>
    </div>
  );
}


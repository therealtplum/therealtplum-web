"use client";

import { useState, useEffect } from "react";
import type { Location, WeatherSnapshot } from "@/types/trip";
import { getWeather } from "@/lib/weather";

interface WeatherDisplayProps {
  location: Location;
  date: string;
  compact?: boolean;
}

export default function WeatherDisplay({
  location,
  date,
  compact = false,
}: WeatherDisplayProps) {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      const weatherData = await getWeather(location, date);
      setWeather(weatherData);
      setLoading(false);
    }

    if (location.lat && location.lng) {
      loadWeather();
    } else {
      setLoading(false);
    }
  }, [location, date]);

  if (loading) {
    return (
      <div className="text-xs text-charcoal/60 dark:text-cream/60">
        Loading weather...
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const timeAgo = (timestamp: string) => {
    const minutes = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 60000
    );
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        {weather.icon && (
          <span className="text-lg">
            {weather.condition === "Clear" && "☀️"}
            {weather.condition === "Clouds" && "☁️"}
            {weather.condition === "Rain" && "🌧️"}
            {weather.condition === "Snow" && "❄️"}
            {!["Clear", "Clouds", "Rain", "Snow"].includes(weather.condition || "") && "🌤️"}
          </span>
        )}
        {weather.tempHigh && weather.tempLow && (
          <span className="text-charcoal/70 dark:text-cream/70">
            {Math.round(weather.tempHigh)}° / {Math.round(weather.tempLow)}°
          </span>
        )}
        <span className="text-xs text-charcoal/50 dark:text-cream/50">
          {timeAgo(weather.fetchedAt)}
        </span>
      </div>
    );
  }

  return (
    <div className="p-3 bg-charcoal/5 dark:bg-cream/5 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {weather.icon && (
            <span className="text-2xl">
              {weather.condition === "Clear" && "☀️"}
              {weather.condition === "Clouds" && "☁️"}
              {weather.condition === "Rain" && "🌧️"}
              {weather.condition === "Snow" && "❄️"}
              {!["Clear", "Clouds", "Rain", "Snow"].includes(weather.condition || "") && "🌤️"}
            </span>
          )}
          <div>
            <div className="font-semibold">{weather.condition || "N/A"}</div>
            {weather.tempHigh && weather.tempLow && (
              <div className="text-sm text-charcoal/70 dark:text-cream/70">
                {Math.round(weather.tempHigh)}° / {Math.round(weather.tempLow)}°
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-xs text-charcoal/60 dark:text-cream/60">
        Updated {timeAgo(weather.fetchedAt)}
      </div>
    </div>
  );
}



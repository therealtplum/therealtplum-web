/**
 * Weather API integration with caching
 */

import type { Location, WeatherSnapshot } from "@/types/trip";
import { getWeatherCache, saveWeatherCache } from "./offline-db";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
const WEATHER_CACHE_THRESHOLD = 60 * 60 * 1000; // 60 minutes

// Using OpenWeatherMap API (free tier available)
// Fallback to mock data if no API key
async function fetchWeatherFromAPI(
  lat: number,
  lng: number,
  date: string
): Promise<Record<string, unknown> | null> {
  if (!WEATHER_API_KEY) {
    // Return mock weather data
    return {
      temp: { min: 10, max: 20 },
      condition: "Partly Cloudy",
      icon: "02d",
      description: "Partly cloudy skies",
    };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    // Find forecast for the target date
    const targetDate = new Date(date).toISOString().split("T")[0];
    const forecast = data.list?.find((item: any) => {
      const itemDate = new Date(item.dt * 1000).toISOString().split("T")[0];
      return itemDate === targetDate;
    });

    if (forecast) {
      return {
        temp: {
          min: forecast.main.temp_min,
          max: forecast.main.temp_max,
        },
        condition: forecast.weather[0].main,
        icon: forecast.weather[0].icon,
        description: forecast.weather[0].description,
        humidity: forecast.main.humidity,
        windSpeed: forecast.wind?.speed,
      };
    }

    return null;
  } catch (error) {
    console.error("Weather API error:", error);
    return null;
  }
}

export async function getWeather(
  location: Location,
  date: string
): Promise<WeatherSnapshot | null> {
  if (!location.lat || !location.lng) {
    return null;
  }

  const dateStr = date.split("T")[0]; // YYYY-MM-DD

  // Check cache first
  const cached = await getWeatherCache(location.id, dateStr);
  if (cached) {
    const cachedAge = Date.now() - new Date(cached.fetchedAt).getTime();
    if (cachedAge < WEATHER_CACHE_THRESHOLD) {
      return {
        locationId: location.id,
        date: dateStr,
        fetchedAt: cached.fetchedAt,
        tempHigh: (cached.data.temp as any)?.max,
        tempLow: (cached.data.temp as any)?.min,
        condition: cached.data.condition as string,
        icon: cached.data.icon as string,
        data: cached.data,
      };
    }
  }

  // Fetch fresh data if online
  if (typeof navigator !== "undefined" && navigator.onLine) {
    const weatherData = await fetchWeatherFromAPI(
      location.lat,
      location.lng,
      dateStr
    );

    if (weatherData) {
      await saveWeatherCache(location.id, dateStr, weatherData);
      return {
        locationId: location.id,
        date: dateStr,
        fetchedAt: new Date().toISOString(),
        tempHigh: (weatherData.temp as any)?.max,
        tempLow: (weatherData.temp as any)?.min,
        condition: weatherData.condition as string,
        icon: weatherData.icon as string,
        data: weatherData,
      };
    }
  }

  // Return cached data even if stale, or null
  if (cached) {
    return {
      locationId: location.id,
      date: dateStr,
      fetchedAt: cached.fetchedAt,
      tempHigh: (cached.data.temp as any)?.max,
      tempLow: (cached.data.temp as any)?.min,
      condition: cached.data.condition as string,
      icon: cached.data.icon as string,
      data: cached.data,
    };
  }

  return null;
}

export async function refreshWeatherForDates(
  locations: Location[],
  dates: string[]
): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.onLine) {
    return;
  }

  for (const location of locations) {
    if (!location.lat || !location.lng) continue;

    for (const date of dates) {
      const dateStr = date.split("T")[0];
      const cached = await getWeatherCache(location.id, dateStr);
      const cachedAge = cached
        ? Date.now() - new Date(cached.fetchedAt).getTime()
        : Infinity;

      if (cachedAge >= WEATHER_CACHE_THRESHOLD) {
        await getWeather(location, dateStr);
      }
    }
  }
}


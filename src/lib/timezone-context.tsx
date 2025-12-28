"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TimezoneMode = "user" | "trip";

interface TimezoneContextType {
  mode: TimezoneMode;
  setMode: (mode: TimezoneMode) => void;
  toggle: () => void;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<TimezoneMode>("trip");

  useEffect(() => {
    // Load preference from localStorage
    const saved = localStorage.getItem("timezoneMode");
    if (saved === "user" || saved === "trip") {
      setModeState(saved);
    }
  }, []);

  const setMode = (newMode: TimezoneMode) => {
    setModeState(newMode);
    localStorage.setItem("timezoneMode", newMode);
  };

  const toggle = () => {
    setMode(mode === "user" ? "trip" : "user");
  };

  return (
    <TimezoneContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error("useTimezone must be used within a TimezoneProvider");
  }
  return context;
}



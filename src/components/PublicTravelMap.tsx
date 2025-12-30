"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { publicTravelPoints } from "@/lib/public-travel";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Dark theme map styles (same vibe as FlightMap)
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
];

const mapContainerStyle = { width: "100%", height: "100%" };

const defaultCenter = { lat: 20, lng: 0 };

const defaultOptions: google.maps.MapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  gestureHandling: "greedy",
  minZoom: 1.5,
  maxZoom: 6,
};

function markerIcon(): google.maps.Symbol {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 7,
    fillColor: "#D6AA4A", // brass glow
    fillOpacity: 0.95,
    strokeColor: "#FFE7A3",
    strokeOpacity: 0.85,
    strokeWeight: 1.5,
  };
}

export default function PublicTravelMap() {
  const [selected, setSelected] = useState<(typeof publicTravelPoints)[number] | null>(
    null
  );

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const markers = useMemo(() => publicTravelPoints, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full aspect-[2/1] rounded-xl border border-brass/20 bg-charcoal/10 dark:bg-cream/10 flex items-center justify-center">
        <div className="text-sm font-mono text-charcoal/60 dark:text-cream/60">
          Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full aspect-[2/1] rounded-xl border border-brass/20 bg-charcoal/10 dark:bg-cream/10 flex items-center justify-center">
        <div className="text-sm font-mono text-charcoal/60 dark:text-cream/60">
          Error loading map
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full aspect-[2/1] rounded-xl border border-brass/20 bg-charcoal/10 dark:bg-cream/10 flex items-center justify-center">
        <div className="text-sm font-mono text-charcoal/60 dark:text-cream/60">
          Loading map…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4"
      >
        <div>
          <h3 className="font-serif text-3xl md:text-4xl text-cream dark:text-brass">
            Global exploration
          </h3>
          <p className="font-sans text-sm text-cream/80 dark:text-charcoal/80 mt-2">
            350+ flights <span className="text-brass/60">|</span> 60+ airports{" "}
            <span className="text-brass/60">|</span> 26 countries
          </p>
          <p className="font-mono text-xs text-cream/60 dark:text-charcoal/60 mt-1 italic">
            so far...
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <a
            href="/travel"
            className="font-sans text-sm lowercase italic text-cream/90 dark:text-charcoal/90 hover:text-cream dark:hover:text-charcoal transition-colors"
          >
            <span>travel</span>
            <span className="text-red-500 dark:text-red-400">bug</span>
            <span className="text-brass ml-1">→</span>
          </a>
          <a
            href="/travel/map"
            className="font-mono text-xs tracking-wide text-brass hover:underline"
          >
            View full map →
          </a>
        </div>
      </motion.div>

      <div className="relative w-full aspect-[2/1] rounded-xl border border-brass/20 overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={2}
          options={defaultOptions}
          onClick={() => setSelected(null)}
        >
          {markers.map((p) => (
            <Marker
              key={p.code}
              position={{ lat: p.lat, lng: p.lng }}
              title={p.label}
              onClick={() => setSelected(p)}
              icon={markerIcon()}
            />
          ))}
        </GoogleMap>

        {selected && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[340px] bg-charcoal/80 text-cream backdrop-blur-md rounded-lg border border-cream/10 p-4">
            <div className="font-serif text-lg">{selected.label}</div>
            <div className="font-mono text-xs text-cream/70 mt-1">
              Approximate marker
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



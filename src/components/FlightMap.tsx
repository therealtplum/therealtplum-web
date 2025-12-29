"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import {
  flights,
  airportCoordinates,
  calculateAirportStats,
  calculateRoutes,
  getFlightStats,
  type AirportStats,
  type Route,
} from "@/lib/flight-data";

type ViewMode = "dots" | "paths" | "animated";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Dark theme map styles for elegant look
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3C7680" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0d5ce" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#3a4762" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 35,
  lng: -30,
};

const defaultOptions: google.maps.MapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  gestureHandling: "greedy",
  minZoom: 2,
  maxZoom: 8,
};

// Get color based on frequency (for heatmap effect)
function getHeatmapColor(intensity: number, maxIntensity: number): string {
  const ratio = Math.min(intensity / maxIntensity, 1);
  // Gradient from brass (low) to bright gold (high)
  const r = Math.round(184 + (255 - 184) * ratio);
  const g = Math.round(134 + (215 - 134) * ratio);
  const b = Math.round(11 + (50 - 11) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

// Create geodesic path between two points
function createGeodesicPath(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  numPoints: number = 50
): google.maps.LatLngLiteral[] {
  const points: google.maps.LatLngLiteral[] = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = from.lat + (to.lat - from.lat) * t;
    const lng = from.lng + (to.lng - from.lng) * t;
    points.push({ lat, lng });
  }
  
  return points;
}

export default function FlightMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("dots");
  const [airports, setAirports] = useState<AirportStats[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getFlightStats> | null>(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [selectedAirport, setSelectedAirport] = useState<AirportStats | null>(null);
  const [animatedPaths, setAnimatedPaths] = useState<Set<string>>(new Set());
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  
  useEffect(() => {
    setAirports(calculateAirportStats());
    setRoutes(calculateRoutes());
    setStats(getFlightStats());
  }, []);
  
  // Animation logic for animated mode
  useEffect(() => {
    if (viewMode !== "animated") {
      setAnimationIndex(0);
      setAnimatedPaths(new Set());
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      return;
    }
    
    const sortedFlights = [...flights].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let currentIndex = 0;
    
    const animate = () => {
      if (currentIndex < sortedFlights.length) {
        const flight = sortedFlights[currentIndex];
        const [first, second] = [flight.from, flight.to].sort();
        const routeKey = `${first}-${second}`;
        
        setAnimatedPaths(prev => new Set([...prev, routeKey]));
        currentIndex++;
        setAnimationIndex(currentIndex);
        
        animationRef.current = setTimeout(animate, 80);
      }
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [viewMode]);
  
  const resetAnimation = useCallback(() => {
    setAnimationIndex(0);
    setAnimatedPaths(new Set());
  }, []);
  
  const maxVisits = airports[0]?.visitCount || 1;
  const maxRouteCount = routes[0]?.count || 1;
  
  // Count how many times each route has been animated
  const getAnimatedRouteCount = useCallback((routeKey: string): number => {
    const sortedFlights = [...flights].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    let count = 0;
    for (let i = 0; i < animationIndex; i++) {
      const flight = sortedFlights[i];
      const [first, second] = [flight.from, flight.to].sort();
      if (`${first}-${second}` === routeKey) {
        count++;
      }
    }
    return count;
  }, [animationIndex]);
  
  // Get visible airports for animated mode
  const visibleAirports = useMemo(() => {
    if (viewMode !== "animated") return airports;
    
    const sortedFlights = [...flights].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const visitedCodes = new Set<string>();
    for (let i = 0; i < animationIndex; i++) {
      visitedCodes.add(sortedFlights[i].from);
      visitedCodes.add(sortedFlights[i].to);
    }
    
    return airports.filter(a => visitedCodes.has(a.code));
  }, [airports, viewMode, animationIndex]);
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  // Create custom marker icon
  const createMarkerIcon = useCallback((visitCount: number, isSelected: boolean): google.maps.Symbol => {
    const scale = Math.min(6 + (visitCount / maxVisits) * 10, 16);
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: isSelected ? scale * 1.3 : scale,
      fillColor: isSelected ? "#FFD700" : "#B8860B",
      fillOpacity: 1,
      strokeColor: "#FFD700",
      strokeWeight: isSelected ? 3 : 1.5,
      strokeOpacity: 0.8,
    };
  }, [maxVisits]);
  
  if (loadError) {
    return (
      <section className="py-16 px-4 bg-charcoal dark:bg-cream">
        <div className="max-w-7xl mx-auto text-center text-cream dark:text-charcoal">
          Error loading maps
        </div>
      </section>
    );
  }
  
  if (!isLoaded) {
    return (
      <section className="py-16 px-4 bg-charcoal dark:bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="w-full aspect-[2/1] bg-charcoal/50 dark:bg-cream/5 rounded-xl border border-brass/20 flex items-center justify-center">
            <div className="text-cream/50 dark:text-charcoal/50 font-mono">Loading map...</div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-4 bg-charcoal dark:bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-cream dark:text-brass mb-2">
            Global Exploration
          </h2>
          <p className="font-sans text-cream/70 dark:text-charcoal/70 text-lg">
            {stats?.totalFlights || 0} flights{" "}
            <span className="text-brass/60">|</span>{" "}
            {stats?.uniqueAirports || 0} destinations{" "}
            <span className="text-brass/60">|</span>{" "}
            {stats?.uniqueCountries || 0} countries
          </p>
          <p className="font-mono text-sm text-cream/50 dark:text-charcoal/50 mt-1 italic">
            so far...
          </p>
        </motion.div>
        
        {/* View Mode Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {(["dots", "paths", "animated"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setViewMode(mode);
                if (mode === "animated") resetAnimation();
              }}
              className={`px-4 py-2 font-mono text-sm rounded-lg transition-all ${
                viewMode === mode
                  ? "bg-brass text-charcoal"
                  : "bg-cream/10 dark:bg-charcoal/10 text-cream/70 dark:text-charcoal/70 hover:bg-cream/20 dark:hover:bg-charcoal/20"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[2/1] rounded-xl border border-brass/20 overflow-hidden"
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={2.5}
            options={defaultOptions}
            onLoad={onMapLoad}
            onClick={() => setSelectedAirport(null)}
          >
            {/* Flight Paths */}
            {(viewMode === "paths" || viewMode === "animated") && routes.map((route) => {
              const fromCoords = airportCoordinates[route.from];
              const toCoords = airportCoordinates[route.to];
              if (!fromCoords || !toCoords) return null;
              
              const routeKey = `${route.from}-${route.to}`;
              const isAnimated = viewMode === "animated";
              const isVisible = !isAnimated || animatedPaths.has(routeKey);
              const animatedCount = isAnimated ? getAnimatedRouteCount(routeKey) : route.count;
              
              if (!isVisible) return null;
              
              const intensity = isAnimated ? animatedCount : route.count;
              const opacity = Math.min(0.4 + (intensity / maxRouteCount) * 0.6, 1);
              const strokeWeight = Math.min(2 + (intensity / maxRouteCount) * 3, 5);
              const strokeColor = isAnimated 
                ? getHeatmapColor(animatedCount, maxRouteCount) 
                : "#B8860B";
              
              return (
                <Polyline
                  key={routeKey}
                  path={[
                    { lat: fromCoords.lat, lng: fromCoords.lng },
                    { lat: toCoords.lat, lng: toCoords.lng },
                  ]}
                  options={{
                    strokeColor,
                    strokeOpacity: opacity,
                    strokeWeight,
                    geodesic: true,
                  }}
                />
              );
            })}
            
            {/* Airport Markers */}
            {visibleAirports.map((airport) => {
              const coords = airportCoordinates[airport.code];
              if (!coords) return null;
              
              const isSelected = selectedAirport?.code === airport.code;
              
              return (
                <Marker
                  key={airport.code}
                  position={{ lat: coords.lat, lng: coords.lng }}
                  icon={createMarkerIcon(airport.visitCount, isSelected)}
                  onClick={() => setSelectedAirport(airport)}
                  title={`${airport.code}: ${airport.visitCount} visits`}
                />
              );
            })}
            
            {/* Info Window for selected airport */}
            {selectedAirport && airportCoordinates[selectedAirport.code] && (
              <InfoWindow
                position={{
                  lat: airportCoordinates[selectedAirport.code].lat,
                  lng: airportCoordinates[selectedAirport.code].lng,
                }}
                onCloseClick={() => setSelectedAirport(null)}
              >
                <div className="p-2 min-w-[140px]">
                  <div className="font-bold text-base text-charcoal">
                    {airportCoordinates[selectedAirport.code].name}
                  </div>
                  <div className="text-xs text-charcoal/60 uppercase tracking-wide">
                    {selectedAirport.code} · {airportCoordinates[selectedAirport.code].country}
                  </div>
                  <div className="text-sm font-mono mt-1 text-amber-700">
                    {selectedAirport.visitCount} {selectedAirport.visitCount === 1 ? 'visit' : 'visits'}
                  </div>
                  <a
                    href={`https://wikivoyage.org/wiki/${encodeURIComponent(airportCoordinates[selectedAirport.code].name.replace(/ /g, '_'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Travel guide →
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          
          {/* Animation progress bar */}
          {viewMode === "animated" && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-charcoal/70 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-brass"
                  style={{ width: `${(animationIndex / flights.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="font-mono text-xs text-cream/80 drop-shadow-md">
                  {animationIndex} / {flights.length}
                </span>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Total Flights", value: stats?.totalFlights || 0 },
            { label: "Airports", value: stats?.uniqueAirports || 0 },
            { label: "Countries", value: stats?.uniqueCountries || 0 },
            { label: "Aircraft Types", value: stats?.uniqueAircraftTypes || 0 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-cream/5 dark:bg-charcoal/5 rounded-lg border border-brass/20 text-center"
            >
              <div className="font-serif text-2xl md:text-3xl text-brass">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-cream/60 dark:text-charcoal/60 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

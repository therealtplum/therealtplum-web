"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Convert lat/lng to SVG coordinates using Robinson-like projection
function projectToSVG(lat: number, lng: number, width: number, height: number) {
  // Simple equirectangular projection with adjustments
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

// Calculate great circle path points for curved flight paths
function getGreatCirclePath(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  width: number,
  height: number,
  numPoints: number = 50
): string {
  const points: { x: number; y: number }[] = [];
  
  // Handle date line crossing
  let toLng = to.lng;
  if (Math.abs(from.lng - to.lng) > 180) {
    toLng = to.lng + (from.lng > to.lng ? 360 : -360);
  }
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    
    // Interpolate latitude and longitude
    const lat = from.lat + (to.lat - from.lat) * t;
    let lng = from.lng + (toLng - from.lng) * t;
    
    // Normalize longitude
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    
    // Add curve for visual appeal (arc effect)
    const arcHeight = Math.sin(t * Math.PI) * Math.min(30, Math.abs(from.lng - to.lng) * 0.15);
    const adjustedLat = lat + arcHeight;
    
    const point = projectToSVG(adjustedLat, lng, width, height);
    points.push(point);
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

// Get color based on frequency (for heatmap effect)
function getHeatmapColor(intensity: number, maxIntensity: number): string {
  const ratio = Math.min(intensity / maxIntensity, 1);
  // Gradient from brass (low) to bright gold (high)
  const r = Math.round(184 + (255 - 184) * ratio);
  const g = Math.round(134 - 34 * ratio);
  const b = Math.round(11 + (50 - 11) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function FlightMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("dots");
  const [airports, setAirports] = useState<AirportStats[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getFlightStats> | null>(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null);
  const [animatedPaths, setAnimatedPaths] = useState<Set<string>>(new Set());
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  const SVG_WIDTH = 1200;
  const SVG_HEIGHT = 600;
  
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
  const getAnimatedRouteCount = (routeKey: string): number => {
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
  };
  
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
          <p className="font-sans text-cream/70 dark:text-charcoal/70">
            {stats?.totalFlights || 0} flights across {stats?.uniqueAirports || 0} airports in {stats?.uniqueCountries || 0} countries
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
          className="relative w-full aspect-[2/1] bg-charcoal/50 dark:bg-cream/5 rounded-xl border border-brass/20 overflow-hidden"
        >
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background gradient */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#16213e" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#mapGradient)" />
            
            {/* Simplified world map outline */}
            <WorldMapOutline />
            
            {/* Flight Paths */}
            <AnimatePresence>
              {(viewMode === "paths" || viewMode === "animated") && routes.map((route) => {
                const fromCoords = airportCoordinates[route.from];
                const toCoords = airportCoordinates[route.to];
                if (!fromCoords || !toCoords) return null;
                
                const routeKey = `${route.from}-${route.to}`;
                const isAnimated = viewMode === "animated";
                const isVisible = !isAnimated || animatedPaths.has(routeKey);
                const animatedCount = isAnimated ? getAnimatedRouteCount(routeKey) : route.count;
                
                if (!isVisible) return null;
                
                const path = getGreatCirclePath(fromCoords, toCoords, SVG_WIDTH, SVG_HEIGHT);
                const intensity = isAnimated ? animatedCount : route.count;
                const opacity = Math.min(0.3 + (intensity / maxRouteCount) * 0.7, 1);
                const strokeWidth = Math.min(1 + (intensity / maxRouteCount) * 2, 3);
                
                return (
                  <motion.path
                    key={routeKey}
                    d={path}
                    fill="none"
                    stroke={isAnimated ? getHeatmapColor(animatedCount, maxRouteCount) : "#B8860B"}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    filter="url(#pathGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: opacity }}
                    transition={{ duration: isAnimated ? 0.3 : 0.8, ease: "easeOut" }}
                  />
                );
              })}
            </AnimatePresence>
            
            {/* Airport Dots */}
            {airports.map((airport) => {
              const coords = airportCoordinates[airport.code];
              if (!coords) return null;
              
              const pos = projectToSVG(coords.lat, coords.lng, SVG_WIDTH, SVG_HEIGHT);
              const size = Math.min(4 + (airport.visitCount / maxVisits) * 8, 12);
              const isHovered = hoveredAirport === airport.code;
              
              // For animated mode, only show airports that have been visited
              if (viewMode === "animated") {
                const sortedFlights = [...flights].sort((a, b) => 
                  new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                const visitedAirports = new Set<string>();
                for (let i = 0; i < animationIndex; i++) {
                  visitedAirports.add(sortedFlights[i].from);
                  visitedAirports.add(sortedFlights[i].to);
                }
                if (!visitedAirports.has(airport.code)) return null;
              }
              
              return (
                <g key={airport.code}>
                  {/* Outer glow */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={size + 2}
                    fill="#B8860B"
                    fillOpacity={0.2}
                    initial={{ scale: 0 }}
                    animate={{ scale: isHovered ? 1.5 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Main dot */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={size}
                    fill="#B8860B"
                    filter="url(#glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.4, delay: airport.visitCount * 0.01 }}
                    onMouseEnter={() => setHoveredAirport(airport.code)}
                    onMouseLeave={() => setHoveredAirport(null)}
                    className="cursor-pointer"
                  />
                  {/* Label on hover */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <rect
                        x={pos.x - 40}
                        y={pos.y - 35}
                        width={80}
                        height={24}
                        rx={4}
                        fill="rgba(0,0,0,0.8)"
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 18}
                        textAnchor="middle"
                        fill="#F5F5DC"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {airport.code} ({airport.visitCount})
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
            
            {/* Animated flight dot */}
            {viewMode === "animated" && animationIndex > 0 && animationIndex < flights.length && (
              <AnimatedFlightDot
                flights={flights}
                currentIndex={animationIndex - 1}
                svgWidth={SVG_WIDTH}
                svgHeight={SVG_HEIGHT}
              />
            )}
          </svg>
          
          {/* Animation progress bar */}
          {viewMode === "animated" && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-charcoal/50 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-brass"
                  style={{ width: `${(animationIndex / flights.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-xs text-cream/50 dark:text-charcoal/50">
                  2015
                </span>
                <span className="font-mono text-xs text-cream/50 dark:text-charcoal/50">
                  {animationIndex < flights.length 
                    ? flights.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[animationIndex]?.date.slice(0, 4)
                    : "2025"}
                </span>
                <span className="font-mono text-xs text-cream/50 dark:text-charcoal/50">
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

// Animated dot that moves along the current flight path
function AnimatedFlightDot({
  flights: flightList,
  currentIndex,
  svgWidth,
  svgHeight,
}: {
  flights: typeof flights;
  currentIndex: number;
  svgWidth: number;
  svgHeight: number;
}) {
  const sortedFlights = [...flightList].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const flight = sortedFlights[currentIndex];
  if (!flight) return null;
  
  const fromCoords = airportCoordinates[flight.from];
  const toCoords = airportCoordinates[flight.to];
  if (!fromCoords || !toCoords) return null;
  
  const from = projectToSVG(fromCoords.lat, fromCoords.lng, svgWidth, svgHeight);
  const to = projectToSVG(toCoords.lat, toCoords.lng, svgWidth, svgHeight);
  
  return (
    <motion.circle
      r={4}
      fill="#FFD700"
      filter="url(#glow)"
      initial={{ cx: from.x, cy: from.y }}
      animate={{ cx: to.x, cy: to.y }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
}

// Simplified world map outline (continents only)
function WorldMapOutline() {
  return (
    <g stroke="#B8860B" strokeWidth="0.5" strokeOpacity="0.15" fill="none">
      {/* North America */}
      <path d="M 120 120 Q 150 100 200 110 L 280 130 Q 300 150 280 180 L 260 220 Q 240 260 200 280 L 150 260 Q 120 240 100 200 L 90 160 Q 100 130 120 120" />
      {/* Central America */}
      <path d="M 200 280 Q 220 300 230 330 L 250 360 Q 240 380 220 370 L 200 340 Q 190 310 200 280" />
      {/* South America */}
      <path d="M 250 360 Q 280 380 300 420 L 320 480 Q 310 520 280 540 L 250 520 Q 220 480 230 420 L 250 360" />
      {/* Europe */}
      <path d="M 540 100 Q 580 90 620 100 L 660 120 Q 680 140 660 160 L 600 170 Q 560 160 540 140 L 520 120 Q 530 100 540 100" />
      {/* Africa */}
      <path d="M 540 200 Q 580 180 620 190 L 660 230 Q 680 280 660 340 L 620 400 Q 580 420 540 400 L 520 340 Q 510 280 520 230 L 540 200" />
      {/* Asia */}
      <path d="M 680 80 Q 750 60 850 80 L 950 120 Q 1000 160 980 200 L 920 240 Q 860 260 800 240 L 740 200 Q 700 160 680 120 L 680 80" />
      {/* India */}
      <path d="M 780 240 Q 810 260 820 300 L 800 350 Q 770 360 760 330 L 760 280 Q 760 250 780 240" />
      {/* Southeast Asia */}
      <path d="M 880 260 Q 920 250 960 270 L 980 320 Q 960 360 920 350 L 880 320 Q 870 290 880 260" />
      {/* Australia */}
      <path d="M 920 420 Q 980 400 1040 420 L 1080 460 Q 1080 500 1040 520 L 960 520 Q 920 500 920 460 L 920 420" />
      {/* Japan */}
      <path d="M 1000 140 Q 1020 130 1040 150 L 1050 180 Q 1040 200 1020 190 L 1000 160 Q 990 150 1000 140" />
    </g>
  );
}


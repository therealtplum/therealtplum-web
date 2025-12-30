export type PublicTravelPoint = {
  /** ISO-ish short code used in this app (not necessarily strict ISO) */
  code: string;
  label: string;
  /** Approximate country/region centroid (intentionally not precise) */
  lat: number;
  lng: number;
};

/**
 * Public, privacy-safe travel points.
 *
 * Intentionally coarse: no dates, no routes, no city/airport-level detail.
 * This keeps the "neat interactive piece" while avoiding publishing a travel log.
 */
export const publicTravelPoints: PublicTravelPoint[] = [
  { code: "US", label: "United States", lat: 39.5, lng: -98.35 },
  { code: "CA", label: "Canada", lat: 56.13, lng: -106.35 },
  { code: "MX", label: "Mexico", lat: 23.63, lng: -102.55 },
  { code: "PR", label: "Puerto Rico", lat: 18.22, lng: -66.59 },
  { code: "CR", label: "Costa Rica", lat: 9.75, lng: -83.75 },
  { code: "CU", label: "Cuba", lat: 21.52, lng: -77.78 },
  { code: "DO", label: "Dominican Republic", lat: 18.74, lng: -70.16 },
  { code: "SX", label: "Sint Maarten", lat: 18.04, lng: -63.06 },
  { code: "LC", label: "Saint Lucia", lat: 13.91, lng: -60.98 },

  { code: "GB", label: "United Kingdom", lat: 55.38, lng: -3.44 },
  { code: "IE", label: "Ireland", lat: 53.14, lng: -7.69 },
  { code: "PT", label: "Portugal", lat: 39.40, lng: -8.22 },
  { code: "ES", label: "Spain", lat: 40.46, lng: -3.75 },
  { code: "IT", label: "Italy", lat: 41.87, lng: 12.57 },
  { code: "DE", label: "Germany", lat: 51.17, lng: 10.45 },
  { code: "NL", label: "Netherlands", lat: 52.13, lng: 5.29 },
  { code: "AT", label: "Austria", lat: 47.52, lng: 14.55 },
  { code: "CZ", label: "Czech Republic", lat: 49.82, lng: 15.47 },
  { code: "GR", label: "Greece", lat: 39.07, lng: 21.82 },
  { code: "HU", label: "Hungary", lat: 47.16, lng: 19.50 },

  { code: "BR", label: "Brazil", lat: -14.24, lng: -51.93 },
  { code: "CL", label: "Chile", lat: -35.68, lng: -71.54 },
  { code: "AR", label: "Argentina", lat: -38.42, lng: -63.62 },

  { code: "JP", label: "Japan", lat: 36.20, lng: 138.25 },
  { code: "CN", label: "China", lat: 35.86, lng: 104.20 },
  { code: "HK", label: "Hong Kong", lat: 22.32, lng: 114.17 },
  { code: "SG", label: "Singapore", lat: 1.35, lng: 103.82 },
];



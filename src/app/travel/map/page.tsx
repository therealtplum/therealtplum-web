import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import FlightMap from "@/components/FlightMap";

export default function TravelMapPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass transition-colors"
              aria-label="Back to homepage"
            >
              <BrandLogo italicizeReal redT />
              <span className="font-mono text-xs tracking-wide opacity-70">
                back to home
              </span>
            </Link>
          </div>
        </header>

        <h1 className="font-serif text-3xl md:text-4xl text-charcoal dark:text-cream">
          Travel Map
        </h1>
        <p className="mt-2 font-mono text-sm text-charcoal/70 dark:text-cream/70 italic">
          Where to next?
        </p>

        <div className="mt-6">
          <FlightMap showHeader={false} />
        </div>
      </div>
    </div>
  );
}



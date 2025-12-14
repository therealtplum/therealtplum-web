"use client";

import { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import BrandLogo from "./BrandLogo";
import FormattedBrandText from "./FormattedBrandText";

export default function Hero() {
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    // Show reveal after a short delay
    const timer = setTimeout(() => setShowReveal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain">
      {/* Background with subtle particle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-hunter-green via-navy to-charcoal dark:from-charcoal dark:via-navy dark:to-hunter-green" />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl mb-8">
          <span className="text-cream">Who </span>
          <span className="text-cream">is </span>
          <span className="text-cream italic">
            <FormattedBrandText className="text-cream" italicizeReal={false} />
          </span>
          <span className="text-cream">?</span>
        </h1>
        
        {showReveal && (
          <div className="animate-fade-in mt-8 space-y-4">
            <p className="font-sans text-xl md:text-2xl text-cream/90 leading-relaxed">
              I'm a <span className="text-brass">business-builder</span> who believes in{" "}
              <span className="text-brass/90">refined ingenuity</span> — 
              where classic craftsmanship meets modern innovation.
            </p>
            <p className="font-serif text-lg md:text-xl text-cream/70 italic mt-6">
              "A thing is a thing, not what is said of that thing."
            </p>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-brass"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import ContactEmail from "./ContactEmail";

const navItems = [
  { label: "About", href: "#about-me" },
  { label: "Craft", href: "#craft" },
  { label: "Ventures", href: "#code" },
  { label: "Curiosities", href: "#curiosities" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 dark:bg-charcoal/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl transition-colors ${
              scrolled
                ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                : "text-cream dark:text-cream hover:text-brass dark:hover:text-brass"
            }`}
          >
            <BrandLogo italicizeReal redT />
          </Link>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`brass-underline font-sans text-sm tracking-wider uppercase transition-colors ${
                  scrolled
                    ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                    : "text-cream dark:text-cream hover:text-brass dark:hover:text-brass"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ContactEmail
              displayText="CONTACT"
              className={`brass-underline font-sans text-sm tracking-wider uppercase transition-colors ${
                scrolled
                  ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                  : "text-cream dark:text-cream hover:text-brass dark:hover:text-brass"
              }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}


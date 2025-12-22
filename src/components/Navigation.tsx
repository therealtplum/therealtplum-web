"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import ContactEmail from "./ContactEmail";

const navItems = [
  { label: "About", href: "#about-me" },
  // Craft nav item is temporarily commented out - uncomment to restore when Craft section is added back
  // { label: "Craft", href: "#craft" },
  { label: "Ventures", href: "#code" },
  { label: "Curiosities", href: "#curiosities" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navigation on travel routes
  if (pathname?.startsWith("/travel")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 dark:bg-charcoal/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-xl sm:text-2xl transition-colors flex-shrink-0 ${
              scrolled
                ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                : "text-cream dark:text-cream hover:text-brass dark:hover:text-brass"
            }`}
          >
            <BrandLogo italicizeReal redT />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled
                ? "text-charcoal dark:text-cream hover:text-brass"
                : "text-cream hover:text-brass"
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`brass-underline font-sans text-sm tracking-wider uppercase transition-colors ${
                  scrolled
                    ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                    : "text-cream hover:text-brass"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div onClick={handleLinkClick}>
              <ContactEmail
                displayText="CONTACT"
                className={`brass-underline font-sans text-sm tracking-wider uppercase transition-colors ${
                  scrolled
                    ? "text-charcoal dark:text-cream hover:text-brass dark:hover:text-brass"
                    : "text-cream hover:text-brass"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


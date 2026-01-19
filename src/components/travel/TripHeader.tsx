"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Trip } from "@/types/trip";

interface TripHeaderProps {
  trip: Trip;
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/travel/trip", label: "Today", icon: "📅" },
  { href: "/travel/trip/days", label: "Days", icon: "📆" },
  {
    href: "/travel/trip/views",
    label: "Views",
    icon: "🔍",
    children: [
      { href: "/travel/trip/views/logistics", label: "Logistics", icon: "✈️" },
      { href: "/travel/trip/views/purchases", label: "Purchases", icon: "🛒" },
      { href: "/travel/trip/views/hotels", label: "Hotels", icon: "🏨" },
      { href: "/travel/trip/views/meals", label: "Meals", icon: "🍽️" },
    ],
  },
  { href: "/travel/trip/wallet", label: "Wallet", icon: "💳" },
];

// Trip theme colors - can be extended per trip
const tripThemes: Record<string, { primary: string; secondary: string; accent: string; pattern?: string }> = {
  japan2026: {
    primary: "from-red-500 to-pink-500",
    secondary: "bg-red-50 dark:bg-red-900/20",
    accent: "text-red-600 dark:text-red-400",
    pattern: "🇯🇵",
  },
  default: {
    primary: "from-blue-500 to-cyan-500",
    secondary: "bg-blue-50 dark:bg-blue-900/20",
    accent: "text-blue-600 dark:text-blue-400",
  },
};

export default function TripHeader({ trip }: TripHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedViews, setExpandedViews] = useState(false);
  const pathname = usePathname();
  const theme = tripThemes[trip.id] || tripThemes.default;

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  // Close menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Auto-expand Views submenu if on a views page
  useEffect(() => {
    if (pathname?.startsWith("/travel/trip/views")) {
      setExpandedViews(true);
    }
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/travel/trip") {
      return pathname === "/travel/trip";
    }
    if (href === "/travel/trip/views") {
      return pathname?.startsWith("/travel/trip/views");
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const isViewsActive = pathname?.startsWith("/travel/trip/views");

  return (
    <header
      className={`sticky top-0 z-50 bg-gradient-to-r ${theme.primary} text-white shadow-lg relative overflow-hidden`}
    >
      {/* Cherry Blossom Background Pattern - Only for Japan trips */}
      {trip.id === "japan2026" && (
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cherry blossom flowers */}
            <g>
              {/* Flower 1 */}
              <g transform="translate(100, 20)">
                <circle cx="0" cy="0" r="12" fill="white" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.4;0.6;0.4"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="-8" cy="-5" r="8" fill="white" opacity="0.3" />
                <circle cx="8" cy="-5" r="8" fill="white" opacity="0.3" />
                <circle cx="-5" cy="8" r="8" fill="white" opacity="0.3" />
                <circle cx="5" cy="8" r="8" fill="white" opacity="0.3" />
                <circle cx="0" cy="0" r="4" fill="#ffb3d9" opacity="0.5" />
              </g>
              
              {/* Flower 2 */}
              <g transform="translate(400, 30)">
                <circle cx="0" cy="0" r="10" fill="white" opacity="0.35">
                  <animate
                    attributeName="opacity"
                    values="0.35;0.55;0.35"
                    dur="5s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <circle cx="-7" cy="-4" r="7" fill="white" opacity="0.25" />
                <circle cx="7" cy="-4" r="7" fill="white" opacity="0.25" />
                <circle cx="-4" cy="7" r="7" fill="white" opacity="0.25" />
                <circle cx="4" cy="7" r="7" fill="white" opacity="0.25" />
                <circle cx="0" cy="0" r="3" fill="#ffb3d9" opacity="0.4" />
              </g>
              
              {/* Flower 3 */}
              <g transform="translate(700, 15)">
                <circle cx="0" cy="0" r="11" fill="white" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.4;0.6;0.4"
                    dur="4.5s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>
                <circle cx="-8" cy="-5" r="8" fill="white" opacity="0.3" />
                <circle cx="8" cy="-5" r="8" fill="white" opacity="0.3" />
                <circle cx="-5" cy="8" r="8" fill="white" opacity="0.3" />
                <circle cx="5" cy="8" r="8" fill="white" opacity="0.3" />
                <circle cx="0" cy="0" r="3.5" fill="#ffb3d9" opacity="0.45" />
              </g>
              
              {/* Flower 4 */}
              <g transform="translate(1000, 35)">
                <circle cx="0" cy="0" r="9" fill="white" opacity="0.3">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.5;0.3"
                    dur="5.5s"
                    repeatCount="indefinite"
                    begin="1.5s"
                  />
                </circle>
                <circle cx="-6" cy="-4" r="6" fill="white" opacity="0.2" />
                <circle cx="6" cy="-4" r="6" fill="white" opacity="0.2" />
                <circle cx="-4" cy="6" r="6" fill="white" opacity="0.2" />
                <circle cx="4" cy="6" r="6" fill="white" opacity="0.2" />
                <circle cx="0" cy="0" r="3" fill="#ffb3d9" opacity="0.35" />
              </g>
              
              {/* Scattered falling petals */}
              <circle cx="250" cy="60" r="3" fill="white" opacity="0.2">
                <animate
                  attributeName="cy"
                  values="60;70;60"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="550" cy="55" r="4" fill="white" opacity="0.25">
                <animate
                  attributeName="cy"
                  values="55;65;55"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="0.3s"
                />
              </circle>
              <circle cx="850" cy="65" r="3" fill="white" opacity="0.2">
                <animate
                  attributeName="cy"
                  values="65;75;65"
                  dur="4s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
              </circle>
              <circle cx="1150" cy="58" r="3.5" fill="white" opacity="0.22">
                <animate
                  attributeName="cy"
                  values="58;68;58"
                  dur="3.8s"
                  repeatCount="indefinite"
                  begin="0.9s"
                />
              </circle>
            </g>
          </svg>
        </div>
      )}
      
      <div className="px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          {theme.pattern && <span className="text-2xl">{theme.pattern}</span>}
          <div>
            <h1 className="text-lg font-bold">{trip.name}</h1>
            <p className="text-xs opacity-90">
              {new Date(trip.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(trip.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Menu"
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
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-[100] bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            <nav className="fixed top-16 right-4 w-64 bg-cream dark:bg-charcoal rounded-lg shadow-xl border border-charcoal/10 dark:border-cream/10 z-[110] max-h-[80vh] overflow-y-auto">
                <div className="p-2">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.children ? (
                        // Views has submenu - make it expandable
                        <>
                          <button
                            onClick={() => setExpandedViews(!expandedViews)}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isActive(item.href)
                                ? `${theme.secondary} ${theme.accent} font-semibold`
                                : "hover:bg-charcoal/5 dark:hover:bg-cream/5 text-charcoal dark:text-cream"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                            <svg
                              className={`w-4 h-4 transition-transform ${
                                expandedViews ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {expandedViews && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                    pathname === child.href
                                      ? `${theme.secondary} ${theme.accent} font-semibold`
                                      : "hover:bg-charcoal/5 dark:hover:bg-cream/5 text-charcoal/70 dark:text-cream/70"
                                  }`}
                                >
                                  <span className="text-lg">{child.icon}</span>
                                  <span className="text-sm">{child.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        // Regular link without submenu
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive(item.href)
                              ? `${theme.secondary} ${theme.accent} font-semibold`
                              : "hover:bg-charcoal/5 dark:hover:bg-cream/5 text-charcoal dark:text-cream"
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            </>
          )}
      </div>
    </header>
  );
}


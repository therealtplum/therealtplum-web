"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/travel/trip", label: "Today", icon: "📅" },
  { href: "/travel/trip/days", label: "Days", icon: "📆" },
  { href: "/travel/trip/views", label: "Views", icon: "🔍" },
  { href: "/travel/trip/wallet", label: "Wallet", icon: "💳" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cream/95 dark:bg-charcoal/95 backdrop-blur-sm border-t border-charcoal/10 dark:border-cream/10 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          let isActive = false;
          if (item.href === "/travel/trip") {
            isActive = pathname === "/travel/trip";
          } else if (item.href === "/travel/trip/days") {
            isActive = pathname === "/travel/trip/days";
          } else if (item.href === "/travel/trip/views") {
            isActive = pathname?.startsWith("/travel/trip/views") || pathname === "/travel/trip/views";
          } else if (item.href === "/travel/trip/wallet") {
            isActive = pathname === "/travel/trip/wallet";
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-charcoal/60 dark:text-cream/60"
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


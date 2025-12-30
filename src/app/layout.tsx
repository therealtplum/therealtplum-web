import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Using Playfair Display as elegant serif alternative to Canela
const canela = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-canela",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://therealtplum.com"),
  title: {
    default: "therealtplum | Thomas Plummer",
    template: "%s | therealtplum",
  },
  description:
    "Thomas Plummer — strategy and market-structure work with a builder’s mindset: shipping, systems thinking, and disciplined execution.",
  applicationName: "therealtplum",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "therealtplum",
    title: "therealtplum | Thomas Plummer",
    description:
      "Thomas Plummer — strategy and market-structure work with a builder’s mindset: shipping, systems thinking, and disciplined execution.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "therealtplum | Thomas Plummer",
    description:
      "Thomas Plummer — strategy and market-structure work with a builder’s mindset: shipping, systems thinking, and disciplined execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${canela.variable} font-sans`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:font-sans focus:text-charcoal focus:shadow-lg dark:focus:bg-charcoal dark:focus:text-cream"
        >
          Skip to content
        </a>
        <Navigation />
        <DarkModeToggle />
        <div id="main">{children}</div>
      </body>
    </html>
  );
}


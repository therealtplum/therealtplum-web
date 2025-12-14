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
  title: "therealtplum | Thomas Plummer",
  description: "Who is therealtplum? Explore the work, interests, and curiosities of Thomas Plummer.",
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
        <Navigation />
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import TravelClientShell from "./travel-client-shell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TravelClientShell>{children}</TravelClientShell>
  );
}



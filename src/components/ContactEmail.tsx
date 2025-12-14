"use client";

import { useState, useEffect } from "react";

// Simple email obfuscation - split and reverse parts
const obfuscatedEmail = {
  part1: "moc.pacdribwons",
  part2: "mot",
};

export default function ContactEmail({ 
  displayText = "Get in touch",
  className = "",
}: {
  displayText?: string;
  className?: string;
}) {
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Decode email only after component mounts (JavaScript enabled)
    // Reverse part2 (mot -> tom) and part1 (moc.pacdribwons -> snowbirdcap.com)
    const decoded = obfuscatedEmail.part2.split("").reverse().join("") + "@" + obfuscatedEmail.part1.split("").reverse().join("");
    setEmail(decoded);
  }, []);

  // Show obfuscated version until JavaScript loads
  if (!mounted || !email) {
    return (
      <span className={className}>
        {displayText}
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      className={`hover:underline transition-colors ${className}`}
      // Add data attributes that scrapers might look for but we can filter
      data-contact="true"
      onClick={(e) => {
        // Additional protection - could add analytics here
        e.preventDefault();
        window.location.href = `mailto:${email}`;
      }}
    >
      {displayText}
    </a>
  );
}


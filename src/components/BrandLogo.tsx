"use client";

interface BrandLogoProps {
  italicizeReal?: boolean;
  redT?: boolean;
  className?: string;
}

export default function BrandLogo({
  italicizeReal = false,
  redT = true,
  className = "",
}: BrandLogoProps) {
  return (
    <span className={`font-sans lowercase italic ${className}`}>
      <span>the</span>
      <span>real</span>
      <span className={redT ? "text-red-600 dark:text-red-400" : ""}>tplum</span>
    </span>
  );
}


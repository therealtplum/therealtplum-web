"use client";

interface FormattedBrandTextProps {
  italicizeReal?: boolean;
  className?: string;
}

export default function FormattedBrandText({
  italicizeReal = true,
  className = "",
}: FormattedBrandTextProps) {
  // Default color if not specified
  const defaultColor = "text-charcoal dark:text-cream";
  const baseClass = className || defaultColor;
  
  return (
    <span className={`font-sans lowercase ${baseClass}`}>
      <span>the</span>
      <span className={italicizeReal ? "italic" : ""}>real</span>
      <span className="text-red-600 dark:text-red-400">tplum</span>
    </span>
  );
}


import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hunter-green": "#2D3E2B",
        navy: "#1B2A4A",
        brass: "#B8860B",
        cream: "#F5F5DC",
        charcoal: "#36454F",
        "electric-blue": "#00FFFF",
      },
      fontFamily: {
        serif: ["var(--font-canela)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "typewriter": "typewriter 3s steps(40) 1s forwards",
        "fade-in": "fadeIn 1s ease-in forwards",
        "ink-spread": "inkSpread 0.8s ease-out forwards",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        inkSpread: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;



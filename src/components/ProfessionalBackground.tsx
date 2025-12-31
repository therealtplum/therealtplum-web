"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const obsessions = [
  "High-Frequency Trading",
  "Private Investments",
  "Oil & Gas Rights",
  "Corporate Real Estate",
  "System Architecture",
  "Data Engineering",
  "Rust",
  "LLM",
  "Prediction Markets",
  "Emerging Markets",
  "Crypto",
  "Human-AI Collaboration",
  "Autonomous Systems",
  "Energy Innovation",
  "Biotech & Longevity",
  "Sports Strategy",
  "Travel Optimization",
];

export default function ProfessionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 8-bit style pixel size
    const pixelSize = 8;
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);

    // Create pixel grid
    const pixels: Array<{ x: number; y: number; vx: number; vy: number; color: string }> = [];
    
    // Initialize more animated pixels for richer effect
    for (let i = 0; i < 50; i++) {
      pixels.push({
        x: Math.random() * cols,
        y: Math.random() * rows,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: Math.random() > 0.5 ? "#B8860B" : "#8B7355", // brass or warm brown
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pixelated grid background with more variation
      ctx.fillStyle = "rgba(184, 134, 11, 0.08)"; // slightly more visible brass grid
      for (let x = 0; x < cols; x += 3) {
        for (let y = 0; y < rows; y += 3) {
          if ((x + y) % 6 === 0) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          }
        }
      }

      // Animate pixels
      pixels.forEach((pixel) => {
        pixel.x += pixel.vx;
        pixel.y += pixel.vy;

        // Bounce off edges
        if (pixel.x < 0 || pixel.x > cols) pixel.vx *= -1;
        if (pixel.y < 0 || pixel.y > rows) pixel.vy *= -1;

        // Draw pixel
        ctx.fillStyle = pixel.color;
        ctx.fillRect(
          pixel.x * pixelSize,
          pixel.y * pixelSize,
          pixelSize * 2,
          pixelSize * 2
        );
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="obsessions"
      className="py-24 px-6 bg-cream dark:bg-charcoal min-h-screen relative overflow-hidden"
    >
      {/* 8-bit animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-25"
        style={{ imageRendering: "pixelated" }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/20 to-transparent dark:via-charcoal/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-16 text-center text-hunter-green dark:text-brass"
        >
          Current Obsessions
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          {/* Current Obsessions (3D orbit effect) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative h-[32rem] md:h-[36rem]">
              {obsessions.map((obsession, index) => {
                const angle = (index * 2 * Math.PI) / obsessions.length;
                const radius = 160;
                const baseX = Math.cos(angle) * radius;
                const baseY = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, scale: 1, x: baseX, y: baseY }}
                    animate={{
                      x: [baseX, baseX * 1.15, baseX],
                      y: [baseY, baseY * 1.15, baseY],
                    }}
                    transition={{
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, zIndex: 20 }}
                      className="group relative bg-gradient-to-br from-brass/30 to-brass/10 dark:from-brass/20 dark:to-brass/10 backdrop-blur-md px-5 py-3 rounded-lg border-2 border-brass/60 dark:border-brass/60 shadow-lg shadow-brass/20 dark:shadow-brass/10 hover:shadow-xl hover:shadow-brass/30 dark:hover:shadow-brass/20 transition-all duration-300"
                    >
                      <span className="font-sans text-sm font-medium text-charcoal dark:text-cream whitespace-nowrap relative z-10">
                        {obsession}
                      </span>
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brass/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


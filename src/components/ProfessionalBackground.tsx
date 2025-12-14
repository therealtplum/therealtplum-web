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
    
    // Initialize some animated pixels
    for (let i = 0; i < 30; i++) {
      pixels.push({
        x: Math.random() * cols,
        y: Math.random() * rows,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? "#B8860B" : "#8B7355", // brass or warm brown
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pixelated grid background
      ctx.fillStyle = "rgba(184, 134, 11, 0.05)"; // subtle brass grid
      for (let x = 0; x < cols; x += 4) {
        for (let y = 0; y < rows; y += 4) {
          if ((x + y) % 8 === 0) {
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
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20"
        style={{ imageRendering: "pixelated" }}
      />

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
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    animate={{
                      x: [baseX, baseX * 1.15, baseX],
                      y: [baseY, baseY * 1.15, baseY],
                    }}
                    transition={{
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="bg-brass/20 dark:bg-brass/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-brass/50 dark:border-brass/50">
                      <span className="font-sans text-sm text-charcoal dark:text-cream whitespace-nowrap">
                        {obsession}
                      </span>
                    </div>
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


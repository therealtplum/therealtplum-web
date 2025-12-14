"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="about"
      className="py-24 px-6 bg-cream dark:bg-charcoal min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
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
            className="relative"
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
                    <div className="bg-brass/20 dark:bg-electric-blue/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-brass/50 dark:border-electric-blue/50">
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


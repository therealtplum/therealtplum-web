"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 bg-charcoal dark:bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-12 text-center text-cream dark:text-brass"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Portrait */}
          <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-brass/20 to-brass/10 rounded-lg" />
            <div className="relative w-full h-full rounded-lg border-2 border-brass/30 overflow-hidden">
              <Image
                src="/TP_portrait.jpg"
                alt="Thomas Plummer"
                fill
                className="object-cover"
              />
              {/* Theme-matching filter overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brass/30 via-transparent to-charcoal/40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-brass/10 mix-blend-soft-light" />
            </div>
          </div>

          {/* About Me Content */}
          <div className="p-8 bg-cream/5 dark:bg-charcoal/5 rounded-lg border border-brass/20 mx-auto w-full max-w-lg">
            <p className="font-sans text-cream/90 dark:text-charcoal/90 leading-relaxed text-lg">
              I'm Thomas Plummer. I build in high-stakes environments—markets, software, and operations—where speed, scale and correctness matters.
            </p>
            <p className="font-sans text-cream/80 dark:text-charcoal/80 leading-relaxed mt-4">
              I'm drawn to conversations about structure, opportunities, and long-horizon fundamentals. I like crisp problem solving, fast iteration, and teams that take pride in craft. More on my investment work can be found at{" "}
              <a
                href="https://snowbirdcap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass dark:text-brass hover:underline"
              >
                snowbirdcap.com
              </a>
              .
            </p>
            <p className="font-sans text-cream/80 dark:text-charcoal/80 leading-relaxed mt-4">
              I'm usually building something — software, a research thread, or a new venture.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


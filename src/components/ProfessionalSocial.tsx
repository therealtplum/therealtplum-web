"use client";

import { motion } from "framer-motion";
import ContactEmail from "./ContactEmail";

export default function ProfessionalSocial() {
  return (
    <section
      id="signal"
      className="py-20 px-6 bg-cream dark:bg-charcoal border-t border-brass/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-hunter-green dark:text-brass">
            Strategy, market structure, and builder energy
          </h2>
          <p className="font-sans text-lg md:text-xl text-charcoal/80 dark:text-cream/80 mt-4 leading-relaxed">
            I work on the business side of markets—strategy, partnerships, and execution—close to the details.
            I’m technical enough to prototype, debug, and collaborate deeply with strong engineers without pretending to be one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="p-6 rounded-xl border border-brass/20 bg-gradient-to-br from-cream to-cream/60 dark:from-charcoal dark:to-charcoal/60"
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-brass">
              What I do (most days)
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-charcoal/80 dark:text-cream/80">
              <li>Turn ambiguous problems into crisp plans and shipped outcomes</li>
              <li>Partner across product, engineering, trading, and ops</li>
              <li>Write, prototype, and analyze when it helps the team move faster</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-xl border border-brass/20 bg-gradient-to-br from-cream to-cream/60 dark:from-charcoal dark:to-charcoal/60"
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-brass">
              What I’m into
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-charcoal/80 dark:text-cream/80">
              <li>Market structure + big ideas</li>
              <li>Reliable systems and clean interfaces</li>
              <li>Democratization of financial markets</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 rounded-xl border border-brass/20 bg-gradient-to-br from-cream to-cream/60 dark:from-charcoal dark:to-charcoal/60"
          >
            <h3 className="font-mono text-xs tracking-widest uppercase text-brass">
              If you’re curious
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-charcoal/80 dark:text-cream/80">
              <li>Comparing notes on markets, products, and incentives</li>
              <li>Collaboration on ambitious side projects</li>
              <li>Good people building real things</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/therealtplum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-charcoal text-cream hover:opacity-90 transition-opacity dark:bg-cream dark:text-charcoal font-sans text-sm"
          >
            GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <div className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-brass/30 font-sans text-sm text-charcoal dark:text-cream">
            <ContactEmail displayText="Say hello" />
          </div>
        </div>
      </div>
    </section>
  );
}



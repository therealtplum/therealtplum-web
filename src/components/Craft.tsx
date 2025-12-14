"use client";

import { motion } from "framer-motion";

const craftItems = [
  {
    title: "High-Frequency Trading",
    description: "Precision and speed in financial systems",
  },
  {
    title: "Private Investments",
    description: "Oil & gas rights, corporate real estate",
  },
  {
    title: "Software Development",
    description: "Building tools and solutions through self-directed learning and hands-on practice",
  },
  {
    title: "System Architecture",
    description: "Designing scalable, elegant solutions",
  },
];

export default function Craft() {
  return (
    <section
      id="craft"
      className="py-24 px-6 bg-gradient-to-b from-charcoal to-hunter-green dark:from-charcoal dark:to-hunter-green min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-4 text-center text-cream dark:text-brass"
        >
          Craft
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-cream/80 dark:text-charcoal/80 font-sans text-lg mb-16"
        >
          Areas of expertise and professional focus
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {craftItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-6 bg-cream/10 dark:bg-charcoal/10 backdrop-blur-sm rounded-lg border border-brass/30 dark:border-electric-blue/30 hover:border-brass dark:hover:border-electric-blue transition-all duration-300 hover:scale-105"
            >
              <h3 className="font-serif text-xl mb-2 text-cream dark:text-brass">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-cream/90 dark:text-charcoal/90">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 p-8 bg-cream/5 dark:bg-charcoal/5 rounded-lg border border-brass/20"
        >
          <h3 className="font-serif text-2xl mb-4 text-cream dark:text-brass">
            Philosophy
          </h3>
          <p className="font-sans text-cream/90 dark:text-charcoal/90 leading-relaxed">
            I approach every project with the mindset of a craftsman: attention to detail,
            respect for the materials (code, data, systems, investments), and a commitment to creating
            something that not only works but endures. Whether it's building businesses,
            evaluating investment opportunities, or developing software tools, I believe in doing
            things right, not just fast.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


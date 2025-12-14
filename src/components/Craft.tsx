"use client";

import { motion } from "framer-motion";

const craftItems = [
  {
    title: "Market Structure",
    description: "Expert in capital markets: options, equities, global futures, crypto, retail pipelines, new products. Finding opportunities and optimizing existing business.",
  },
  {
    title: "Business Operations",
    description: "Turning around underperforming businesses and launching new ventures from scratch. Not afraid to step in, right the ship, and build operations from the ground up.",
  },
  {
    title: "Strategic Growth",
    description: "Driving growth through relationship building, strategic advocacy, and execution. Building and scaling operations while managing complex projects, teams, and initiatives.",
  },
  {
    title: "Private Investments",
    description: "Evaluating and structuring investments in oil & gas rights, corporate real estate, and other alternative assets. Analyzing structure, incentives, and long-term fundamentals.",
  },
  {
    title: "Software Development",
    description: "Building tools and solutions from scratch through self-directed learning. From CLI utilities to mobile apps, not afraid to dive in and build what's needed.",
  },
  {
    title: "Data & Analytics",
    description: "Transforming raw data into actionable insights using SQL, Python, and LLMs. Building pipelines, designing schemas, and ensuring data quality to support strategic decision-making.",
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
          className="text-center text-cream/80 dark:text-cream/70 font-sans text-lg mb-16"
        >
          Areas of expertise and professional focus
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {craftItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-6 bg-cream/10 dark:bg-cream/5 backdrop-blur-sm rounded-lg border border-brass/30 dark:border-brass/30 hover:border-brass dark:hover:border-brass transition-all duration-300 hover:scale-105"
            >
              <h3 className="font-serif text-xl mb-3 text-cream dark:text-brass">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-cream/90 dark:text-cream/80 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 p-8 bg-cream/5 dark:bg-cream/5 rounded-lg border border-brass/20 dark:border-brass/20"
        >
          <h3 className="font-serif text-2xl mb-4 text-cream dark:text-brass">
            Tools & Technologies
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-serif text-lg mb-2 text-cream/90 dark:text-brass/90">Languages & Tools</h4>
              <p className="font-sans text-sm text-cream/80 dark:text-cream/70">
                SQL, Python, Rust, TypeScript, Swift. Building with Next.js, React, SwiftUI, LLMs, and exploring new tools as the problem demands.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-2 text-cream/90 dark:text-brass/90">Areas of Focus</h4>
              <p className="font-sans text-sm text-cream/80 dark:text-cream/70">
                Market structure, business operations, data pipelines, and strategic systems. Building from first principles and fixing what's broken.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 p-8 bg-cream/5 dark:bg-cream/5 rounded-lg border border-brass/20 dark:border-brass/20"
        >
          <h3 className="font-serif text-2xl mb-4 text-cream dark:text-brass">
            Philosophy
          </h3>
          <p className="font-sans text-cream/90 dark:text-cream/80 leading-relaxed">
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


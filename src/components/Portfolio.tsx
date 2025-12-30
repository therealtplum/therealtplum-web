"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  linkType: "website" | "app" | "github";
  icon?: string;
}

const projects: Project[] = [
  {
    title: "Foundry90",
    description: "Educational platform showcasing capstone projects from the Foundry90 program",
    tech: ["Education", "Rust", "Python"],
    link: "https://foundry90.com/capstones",
    linkType: "website",
    icon: "/f90-icon.png",
  },
  {
    title: "dinger",
    description: "iOS app for tracking and analyzing sports statistics and game data",
    tech: ["Swift", "iOS", "Mobile"],
    link: null,
    linkType: "app",
    icon: "/dinger-icon.png",
  },
  {
    title: "Snowbird Capital",
    description: "Private investment firm focused on oil & gas rights, corporate real estate, and strategic investments",
    tech: ["Investments", "Real Estate", "Energy"],
    link: "https://snowbirdcap.com",
    linkType: "website",
    icon: "/snowbird-logo.png",
  },
  {
    title: "LowRoller",
    description: "Turn-based dice game where 3s count as zero. Play head-to-head or against smart bots, build streaks, and climb the leaderboard",
    tech: ["Swift", "SwiftUI", "iOS"],
    link: null,
    linkType: "app",
    icon: "/lowroller-icon.png",
  },
  {
    title: "Time2Sail",
    description: "Python package for quick sailing condition summaries across multiple cities. Pulls forecasts from NWS and outputs 1-10 ratings to Slack or email",
    tech: ["Python", "NWS API", "CLI"],
    link: "https://github.com/therealtplum/sailing-conditions",
    linkType: "github",
    icon: "/time2sail.png",
  },
  {
    title: "Crypto Systems",
    description: "Ongoing work exploring market structure, data pipelines, and building blocks for crypto-native products.",
    tech: ["Market Structure", "Data", "Crypto"],
    link: null,
    linkType: "github",
    icon: "/crypto-icon.svg",
  },
];

export default function Portfolio() {
  return (
    <section
      id="code"
      className="py-24 px-6 bg-gradient-to-b from-cream to-cream/50 dark:from-charcoal dark:to-charcoal/50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-16 text-center text-hunter-green dark:text-brass"
        >
          Selected Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto font-sans text-charcoal/70 dark:text-cream/70 mb-12"
        >
          A mix of shipped products, experiments, and long-term builds—usually at the intersection of systems, markets, and craft.
        </motion.p>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {/* Leather-bound book appearance */}
              <div className="relative h-full bg-gradient-to-br from-[#8B4513] to-[#654321] p-1 rounded-lg shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                <div className="bg-cream dark:bg-charcoal p-6 rounded h-full flex flex-col">
                  {project.icon && (
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={project.icon}
                        alt={`${project.title} icon`}
                        width={80}
                        height={80}
                        className="rounded-2xl"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-2xl mb-3 text-hunter-green dark:text-brass">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm mb-4 text-charcoal/80 dark:text-cream/80 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-brass/20 dark:bg-brass/20 text-xs font-mono rounded text-charcoal dark:text-cream"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brass dark:bg-brass text-cream dark:text-charcoal rounded hover:opacity-80 transition-opacity font-sans text-sm"
                    >
                      {project.linkType === "website" ? "Visit Site" : project.linkType === "github" ? "View Code" : "View App"}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal/20 dark:bg-cream/20 text-charcoal/60 dark:text-cream/60 rounded font-sans text-sm">
                      {project.linkType === "app" ? "iOS App" : "Notes available on request"}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link - Small line under projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/therealtplum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-charcoal/70 dark:text-cream/70 hover:text-brass dark:hover:text-brass transition-colors"
          >
            View GitHub Profile
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}


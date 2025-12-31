"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const interests = [
  {
    title: "Sailing",
    description: "Racing small boats with 4-5 person teams. The combination of strategy, teamwork, and reading wind and water creates a unique challenge that mirrors the complexity of building systems.",
    details: "Racing • Team Sailing",
    links: [
      { name: "Chicago Yacht Club", url: "https://www.chicagoyachtclub.org" },
    ],
  },
  {
    title: "Wine",
    description: "WSET Level 1 certified, Level 2 upcoming. Exploring terroir, vintages, and the art of winemaking. Building tools to deepen understanding and share the passion.",
    details: "WSET L1 • L2 In Progress",
    links: [
      { name: "Wine Quiz", url: "https://wine-quiz.com" },
      { name: "Rhyne Wines", url: "https://rhynewines.com" },
    ],
  },
  {
    title: "Field Sports & Conservation",
    description: "Lifelong outdoorsman and conservation supporter. I care about land stewardship, habitat work, and keeping wild places healthy for the long run.",
    details: "Stewardship • PF & DU Supporter",
    links: [
      { name: "Pheasants Forever", url: "https://www.pheasantsforever.org" },
      { name: "Ducks Unlimited", url: "https://www.ducks.org" },
    ],
  },
  {
    title: "Music",
    description: "Wide-ranging taste from EDM to folk to soul. Favorites include Rufus Du Sol, Anyma, Lane8, Deorro, Chris Stapleton, and Leon Bridges.",
    details: "EDM • Folk • Soul",
    links: [
      { name: "Spotify Profile", url: "https://open.spotify.com/user/1258862314?si=38120e3f76ee4698" },
    ],
  },
  {
    title: "Ceramics",
    description: "Exploring the craft of ceramics, drawn to the patience and precision required. Inspired by the work of Frank Nemick, Adam Russell of Key West Pottery, and Trate Art Kuan.",
    details: "Ceramic Arts",
    links: [
      { name: "Frank Nemick", url: "https://www.instagram.com/franknemick/" },
      { name: "Key West Pottery", url: "https://www.instagram.com/keywestpottery/" },
      { name: "Trate Art Kuan", url: "https://www.instagram.com/trate_art_kuan/" },
    ],
  },
  {
    title: "University of Kansas",
    description: "Jayhawks alum and lifelong fan. The University of Kansas shaped my foundation in critical thinking, problem-solving, and building lasting connections.",
    details: "KU Graduate • Rock Chalk",
    links: [
      { name: "KU Alumni Association", url: "https://kualumni.org" },
      { name: "KU Athletics", url: "https://kuathletics.com" },
    ],
  },
];

const PublicTravelMap = dynamic(() => import("./PublicTravelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] rounded-xl border border-brass/20 bg-cream/5 dark:bg-charcoal/5 flex items-center justify-center">
      <div className="text-sm font-mono text-cream/60 dark:text-charcoal/60">
        Loading…
      </div>
    </div>
  ),
});

export default function PersonalInterests() {
  return (
    <section
      id="curiosities"
      className="py-24 bg-charcoal dark:bg-cream min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-4 text-center text-cream dark:text-brass"
        >
          Curiosities (Analog + Digital)
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-cream/80 dark:text-charcoal/80 font-sans text-lg mb-8"
        >
          Fuel for the work: craft, competition, and a little wanderlust.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <PublicTravelMap />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-6 bg-cream/10 dark:bg-charcoal/10 backdrop-blur-sm rounded-lg border border-brass/30 dark:border-brass/30 hover:border-brass dark:hover:border-brass transition-colors"
            >
              <div className="flex-1 relative z-10">
                <h3 className="font-serif text-xl mb-2 text-cream dark:text-brass">
                  {interest.title}
                </h3>
                <p className="font-sans text-sm text-cream/90 dark:text-charcoal/90 mb-3">
                  {interest.description}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-brass/70 dark:text-brass/70">
                    {interest.details}
                  </span>
                  {interest.links && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {interest.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-brass dark:text-brass hover:underline font-sans relative z-20"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Subtle animation on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-brass/5 to-brass/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


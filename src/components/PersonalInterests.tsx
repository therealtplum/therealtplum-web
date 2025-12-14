"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FormattedBrandText from "./FormattedBrandText";

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
    description: "LSET Level 1 certified, Level 2 upcoming. Exploring terroir, vintages, and the art of winemaking. Building tools to deepen understanding and share the passion.",
    details: "LSET L1 • L2 In Progress",
    links: [
      { name: "Wine Quiz", url: "https://wine-quiz.com" },
      { name: "Rhyne Wines", url: "https://rhynewines.com" },
    ],
  },
  {
    title: "Hunting & Conservation",
    description: "Life-long outdoorsman pursuing upland birds (pheasant, quail), turkey, and deer. Active supporter of Pheasants Forever and Ducks Unlimited, balancing the tradition of hunting with conservation stewardship.",
    details: "Conservationist • PF & DU Member",
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
    title: "F1 Racing",
    description: "Following the precision, strategy, and engineering excellence of Formula 1. Longtime Team Williams supporter, drawn to their history of innovation and underdog spirit.",
    details: "Team Williams • Formula 1",
    links: [
      { name: "Circuit of the Americas", url: "https://www.circuitoftheamericas.com" },
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
  {
    title: "Reading",
    description: "Exploring ideas across technology, finance, history, and philosophy. Books that shape how I think about systems, markets, and building things that last.",
    details: "Non-Fiction • Systems Thinking",
  },
  {
    title: "Global Exploration",
    description: "Traveling to understand different cultures, markets, and ways of building. Over 30 countries visited, each offering new perspectives on how the world works.",
    details: "30+ Countries • Cultural Immersion",
    links: [
      { name: "Travel Map", url: "#" },
    ],
  },
];

export default function PersonalInterests() {
  return (
    <section
      id="curiosities"
      className="py-24 px-6 bg-charcoal dark:bg-cream min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mb-4 text-center text-cream dark:text-brass"
        >
          The Gentleman's Workshop
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-cream/80 dark:text-charcoal/80 font-sans text-lg mb-16"
        >
          Where analog meets digital
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Bio Section */}
        <motion.div
          id="about-me"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
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
            <h3 className="font-serif text-3xl mb-4 text-cream dark:text-brass">
              About Me
            </h3>
            <p className="font-sans text-cream/90 dark:text-charcoal/90 leading-relaxed text-lg">
              I'm Thomas Plummer. I build businesses and work in high-frequency trading and finance, with a focus on precision, systems, and disciplined execution.
            </p>
            <p className="font-sans text-cream/80 dark:text-charcoal/80 leading-relaxed mt-4">
              My professional interests span trading, private investments, oil and gas rights, and corporate real estate. I'm particularly drawn to opportunities where structure, incentives, and long-term fundamentals matter. More on my investment work can be found at{" "}
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
              Outside of work, you might find me racing sailboats, exploring new wines, or spending time in the field during hunting season. I'm a University of Kansas graduate and lifelong Jayhawks fan. I'm naturally curious, always learning, and usually building something—whether it's software, an investment thesis, or a new venture.
            </p>
          </div>
        </motion.div>

        {/* Echo of hero question */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-center mt-16 mb-8"
        >
          <span className="text-cream dark:text-charcoal">That's just a glimpse into who </span>
          <span className="text-cream dark:text-charcoal italic">
            <FormattedBrandText className="text-cream dark:text-charcoal" italicizeReal={false} />
          </span>
          <span className="text-cream dark:text-charcoal"> is</span>
        </motion.h2>
      </div>
    </section>
  );
}


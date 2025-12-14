import Hero from "@/components/Hero";
import ProfessionalBackground from "@/components/ProfessionalBackground";
import Craft from "@/components/Craft";
import Portfolio from "@/components/Portfolio";
import PersonalInterests from "@/components/PersonalInterests";
import ContactEmail from "@/components/ContactEmail";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <ProfessionalBackground />
      <Craft />
      <Portfolio />
      <PersonalInterests />
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-charcoal dark:bg-cream text-center">
        <p className="font-sans text-cream/70 dark:text-charcoal/70 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="lowercase italic">
            <span>the</span>
            <span>real</span>
            <span className="text-red-600 dark:text-red-400">tplum</span>
          </span>
          . Built with integrity.
        </p>
        <p className="font-sans text-cream/60 dark:text-charcoal/60 text-xs mt-2">
          Chicago | Austin | Global
        </p>
        <p className="font-sans text-cream/70 dark:text-charcoal/70 text-sm mt-4">
          <ContactEmail displayText="Get in touch" />
        </p>
      </footer>
    </main>
  );
}


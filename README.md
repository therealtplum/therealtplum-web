# therealtplum - Personal Website

A personal website that blends "old money Tom Selleck meets humble Elon Musk" — combining classic, refined aesthetics with modern tech minimalism.

## Design Philosophy

**"Refined Ingenuity"** - Classic craftsmanship meets futuristic innovation

### Key Features

- **Hero Section**: Cinematic portrait with typewriter animation
- **Professional Background**: Split timeline and orbiting obsessions
- **Portfolio**: GitHub constellation map and leather-bound project cards
- **Personal Interests**: "The Gentleman's Workshop" section
- **Dark Mode**: Toggle with brass lamp switch aesthetic
- **Smooth Animations**: Framer Motion and custom CSS animations

### Color Palette

- **Primary**: Hunter Green (#2D3E2B) / Navy (#1B2A4A)
- **Accent**: Brass/Gold (#B8860B)
- **Neutral**: Cream (#F5F5DC) / Charcoal (#36454F)
- **Tech Touch**: Electric Blue (#00FFFF)

### Typography

- **Display**: Canela (serif) - for elegant headers
- **Body**: Inter (sans-serif) - for clean readability
- **Code**: JetBrains Mono - for technical sections

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Customization

1. **Portrait Image**: Replace the placeholder in `src/components/Hero.tsx` with your actual portrait
2. **Projects**: Update the projects array in `src/components/Portfolio.tsx` with your actual GitHub projects
3. **Timeline**: Modify the timeline data in `src/components/ProfessionalBackground.tsx`
4. **Interests**: Update personal interests in `src/components/PersonalInterests.tsx`
5. **Fonts**: Add Canela font files to `src/fonts/` or update the font configuration

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Anime.js** - Additional animation support (available but not required)

## Notes

- The Canela font is referenced but uses a fallback. You'll need to add the actual font files or use a similar elegant serif.
- GitHub constellation visualization is a placeholder - you can integrate with the GitHub API to show actual contribution data.
- All animations are optimized for performance with `viewport={{ once: true }}` to prevent re-triggering on scroll.







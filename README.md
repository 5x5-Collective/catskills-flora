# Catskills Flora 🌿

A personal field guide, identification tool, and living catalog for wildflowers and plants of the Catskill Mountains.

## Features

- **AI Plant Identification** - Upload photos to identify plants using Claude vision AI
- **Personal Herbarium** - Build your collection with photos, notes, and location data
- **Interactive Encyclopedia** - Browse 70+ Catskills species with gamified unlocking
- **DIY Ideas Generator** - Get creative traditional uses for plants you've found
- **Seasonal Awareness** - See what's blooming now and coming soon

## Tech Stack

- React 19 + TypeScript
- Vite for blazing-fast builds
- Tailwind CSS for styling
- Framer Motion for animations
- Dexie.js (IndexedDB) for local storage
- Claude API for AI features
- Deployed on Vercel

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=your_key_here
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Deployment

This app is configured for Vercel deployment with serverless API routes.

```bash
vercel --yes
```

## Design Philosophy

The app embraces an old-world naturalist aesthetic - think 19th century botanical journals with hand-inked illustrations, aged paper textures, and careful observation notes. It's designed to feel like a treasured field journal, not a clinical database.

## Data

The plant species database includes 70+ wildflowers and plants native to the Catskill Mountains, with:
- Common and scientific names
- Bloom periods and habitats
- Elevation ranges
- Rarity classifications
- Catskills-specific notes

## License

MIT

## Acknowledgments

Plant data sourced from:
- Biodiversity Heritage Library
- USDA PLANTS Database
- Field observations and regional flora guides

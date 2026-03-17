# The Catskill Herbarium

A modern botanical field guide app for exploring the wildflowers and plants of the Catskill Mountains, designed with the aesthetic of a 19th-century naturalist's herbarium.

## 🌿 Phase 1 Features

### Completed
- ✅ Project scaffold (Vite + React + TypeScript + Tailwind CSS)
- ✅ Responsive navigation shell (bottom tabs mobile, sidebar desktop)
- ✅ Encyclopedia page with 15 real Catskills plant species
- ✅ Plant discovery system (5 discovered, 10 locked)
- ✅ Detailed plant information pages
- ✅ Botanical herbarium aesthetic throughout
- ✅ Vintage progress tracking
- ✅ Placeholder pages for future features

### Design Aesthetic
- **Typography**: Playfair Display (headings), Crimson Text (body)
- **Color Palette**: 
  - Parchment (#F5F0E8)
  - Dark Brown (#3D2B1F)
  - Forest Green (#2D5016)
  - Aged Gold (#B8860B)
  - Ink Black (#1A1A1A)
- **Visual Style**: Pressed specimen cards, aged paper textures, vintage borders, botanical illustration placeholders

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 📖 Encyclopedia

The encyclopedia features 15 authentic Catskills wildflower species:

**Discovered (5):**
1. White Trillium (*Trillium grandiflorum*)
2. Wild Columbine (*Aquilegia canadensis*)
3. Bloodroot (*Sanguinaria canadensis*)
4. Trout Lily (*Erythronium americanum*)
5. Pink Lady's Slipper (*Cypripedium acaule*)

**To Discover (10):**
6. Bee Balm (*Monarda didyma*)
7. Black-eyed Susan (*Rudbeckia hirta*)
8. Cardinal Flower (*Lobelia cardinalis*)
9. Joe-Pye Weed (*Eutrochium purpureum*)
10. Blue-stemmed Goldenrod (*Solidago caesia*)
11. Bottle Gentian (*Gentiana clausa*)
12. Round-lobed Hepatica (*Hepatica americana*)
13. Jewelweed (*Impatiens capensis*)
14. Black Cohosh (*Actaea racemosa*)
15. Pipsissewa (*Chimaphila umbellata*)

Each species includes:
- Common and Latin names
- Family classification
- Bloom months
- Habitat preferences
- Rarity status (common/uncommon/rare)
- Detailed descriptions
- Catskills-specific field notes
- Elevation ranges

## 🎨 Project Structure

```
catskills-flora/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Navigation shell & app structure
│   │   └── PlantCard.tsx       # Encyclopedia grid cards
│   ├── pages/
│   │   ├── Encyclopedia.tsx    # Main plant grid page
│   │   ├── PlantDetail.tsx     # Individual species pages
│   │   ├── MyCatalog.tsx       # Placeholder for user collections
│   │   ├── Identify.tsx        # Placeholder for AI identification
│   │   └── Ideas.tsx           # Placeholder for discovery guides
│   ├── data/
│   │   └── species-data.ts     # Plant species database
│   ├── App.tsx                 # Router setup
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind + custom styles
├── tailwind.config.js         # Custom theme & colors
└── package.json
```

## 🔮 Future Phases

### Phase 2 (Planned)
- AI-powered plant identification via camera
- User catalog with personal notes
- Seasonal discovery guides & bloom forecasts
- Trail recommendations
- Offline support

### Phase 3 (Vision)
- Community observations & photos
- Interactive range maps
- Conservation status tracking
- Integration with iNaturalist
- Guided botanical quests

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Fonts**: Google Fonts (Playfair Display, Crimson Text)

## 📝 Development Notes

- Species data is currently static (no backend)
- All botanical information is scientifically accurate
- Designed mobile-first with responsive breakpoints
- Accessibility considerations in navigation and typography
- Uses semantic HTML and ARIA labels where appropriate

## 🌲 About the Catskills

The Catskill Mountains of New York State are home to diverse ecosystems ranging from rich hardwood forests at lower elevations to spruce-fir forests at higher peaks. The region's botanical diversity makes it a perfect subject for a field guide application.

---

**Built with 🌿 for naturalists, hikers, and wildflower enthusiasts**

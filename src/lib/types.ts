export interface SpecimenEntry {
  id: string;
  speciesId: string;
  photos: string[];
  dateFound: string;
  locationLabel?: string;
  coordinates?: [number, number];
  notes?: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  createdAt: string;
  diyIdeas?: IdeaCard[];
}

export interface PlantIdentification {
  height: string;
  leafShape: string;
  flowerDescription: string;
  fruitSeed: string;
  bark?: string;
  distinguishingFeatures: string;
  lookalikes: string[];
  lookalikeDifferences: string;
}

export interface PlantSpecies {
  id: string;
  commonName: string;
  latinName: string;
  family: string;
  bloomMonths: number[];
  habitat: string[];
  elevation: string;
  illustrationUrl: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare';
  catskillsNotes?: string;
  identification?: PlantIdentification;
  whereToLook?: string[];
  peakSeason?: string;
  catskillsLocations?: string[];
}

export interface IdeaCard {
  title: string;
  method: string;
  difficulty: string;
  seasonRelevance: string;
  category: 'food' | 'medicine' | 'fiber' | 'home' | 'unusual' | 'historical';
}

export interface IdentificationResult {
  confidence: number;
  speciesId: string;
  commonName: string;
  latinName: string;
  family: string;
  bloomSeason: string;
  habitat: string;
  reasoning: string;
}

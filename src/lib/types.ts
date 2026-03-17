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

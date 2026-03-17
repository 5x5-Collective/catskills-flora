import { Link } from 'react-router-dom';
import type { Species } from '../data/species-data';

interface PlantCardProps {
  species: Species;
}

const PlantCard = ({ species }: PlantCardProps) => {
  const rarityColors = {
    common: 'bg-forest-green text-parchment',
    uncommon: 'bg-aged-gold text-ink-black',
    rare: 'bg-amber-600 text-parchment',
  };

  if (!species.discovered) {
    return (
      <div className="relative group">
        <div className="border-4 border-brown-dark/30 rounded-lg overflow-hidden bg-brown-dark/5 backdrop-blur-sm shadow-lg aspect-[3/4] flex flex-col">
          {/* Locked Silhouette */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-brown-dark/10 to-brown-dark/5 relative">
            <svg
              className="w-20 h-20 md:w-24 md:h-24 text-brown-dark/20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-brown-dark/80 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-parchment"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-4 bg-brown-dark/10 border-t-2 border-brown-dark/30">
            <h3 className="font-display text-base md:text-lg text-brown-dark/40 mb-1">
              Undiscovered
            </h3>
            <p className="text-xs md:text-sm font-body italic text-brown-dark/30">
              Species #{species.id}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/plant/${species.id}`} className="relative group">
      <div className="border-4 border-brown-dark rounded-lg overflow-hidden bg-parchment shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 aspect-[3/4] flex flex-col">
        {/* Plant Illustration Placeholder */}
        <div className="flex-1 bg-gradient-to-br from-amber-50 via-parchment to-amber-100 p-4 flex items-center justify-center border-b-2 border-brown-dark/20 relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brown-dark/30"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brown-dark/30"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brown-dark/30"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brown-dark/30"></div>

          {/* Botanical sketch placeholder */}
          <svg
            className="w-16 h-16 md:w-20 md:h-20 text-forest-green/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
        </div>

        {/* Card Info */}
        <div className="p-3 md:p-4 bg-gradient-to-b from-parchment to-amber-50">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-base md:text-lg text-brown-dark leading-tight flex-1">
              {species.commonName}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-body font-semibold ml-2 ${
                rarityColors[species.rarity]
              }`}
            >
              {species.rarity}
            </span>
          </div>

          <p className="font-body italic text-xs md:text-sm text-brown-dark/70 mb-2">
            {species.latinName}
          </p>

          <div className="text-xs font-body text-brown-dark/60 space-y-1">
            <p className="flex items-center">
              <span className="font-semibold mr-1">Family:</span>
              {species.family}
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-1">Blooms:</span>
              {species.bloomMonths}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {species.habitat.map((h, idx) => (
              <span
                key={idx}
                className="text-xs bg-forest-green/10 text-forest-green px-2 py-0.5 rounded border border-forest-green/30"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;

import { useParams, useNavigate } from 'react-router-dom';
import { speciesData } from '../data/species-data';

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const species = speciesData.find((s) => s.id === Number(id));

  if (!species) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Species not found</p>
      </div>
    );
  }

  if (!species.discovered) {
    navigate('/');
    return null;
  }

  const rarityColors = {
    common: 'bg-forest-green text-parchment',
    uncommon: 'bg-aged-gold text-ink-black',
    rare: 'bg-amber-600 text-parchment',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-brown-dark hover:text-forest-green transition-colors font-body"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Encyclopedia
      </button>

      {/* Main Content Card */}
      <div className="border-4 border-brown-dark rounded-lg overflow-hidden bg-gradient-to-br from-parchment to-amber-50 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-brown-dark to-brown-dark/90 text-parchment p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-5xl mb-2">
                {species.commonName}
              </h1>
              <p className="font-body italic text-xl md:text-2xl text-parchment/80">
                {species.latinName}
              </p>
            </div>
            <span
              className={`text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-full font-body font-semibold ${
                rarityColors[species.rarity]
              }`}
            >
              {species.rarity.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Botanical Illustration */}
        <div className="bg-gradient-to-br from-amber-50 via-parchment to-amber-100 p-8 md:p-12 border-y-4 border-brown-dark/20 relative">
          {/* Decorative Frame */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-brown-dark/30"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-brown-dark/30"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-brown-dark/30"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-brown-dark/30"></div>

          {/* Illustration Placeholder */}
          <div className="max-w-md mx-auto aspect-square flex items-center justify-center border-2 border-brown-dark/20 rounded bg-parchment/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern
                  id="herbarium-grid"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#herbarium-grid)" />
              </svg>
            </div>
            <svg
              className="w-32 h-32 md:w-48 md:h-48 text-forest-green/40 relative z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
            <div className="absolute bottom-2 right-2 font-body text-xs italic text-brown-dark/30">
              Botanical sketch
            </div>
          </div>
        </div>

        {/* Species Information */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-brown-dark/20 rounded p-3 bg-parchment">
              <div className="text-xs font-body text-brown-dark/60 mb-1">
                Family
              </div>
              <div className="font-display text-brown-dark">{species.family}</div>
            </div>
            <div className="border-2 border-brown-dark/20 rounded p-3 bg-parchment">
              <div className="text-xs font-body text-brown-dark/60 mb-1">
                Bloom Period
              </div>
              <div className="font-display text-brown-dark">
                {species.bloomMonths}
              </div>
            </div>
            <div className="border-2 border-brown-dark/20 rounded p-3 bg-parchment">
              <div className="text-xs font-body text-brown-dark/60 mb-1">
                Elevation
              </div>
              <div className="font-display text-brown-dark">
                {species.elevation}
              </div>
            </div>
            <div className="border-2 border-brown-dark/20 rounded p-3 bg-parchment">
              <div className="text-xs font-body text-brown-dark/60 mb-1">
                Rarity
              </div>
              <div className="font-display text-brown-dark capitalize">
                {species.rarity}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-l-4 border-forest-green pl-4">
            <h2 className="font-display text-2xl text-brown-dark mb-2">
              Description
            </h2>
            <p className="font-body text-brown-dark/80 leading-relaxed">
              {species.description}
            </p>
          </div>

          {/* Habitat */}
          <div className="border-l-4 border-aged-gold pl-4">
            <h2 className="font-display text-2xl text-brown-dark mb-3">
              Habitat
            </h2>
            <div className="flex flex-wrap gap-2">
              {species.habitat.map((h, idx) => (
                <span
                  key={idx}
                  className="bg-forest-green/10 text-forest-green px-4 py-2 rounded-lg border-2 border-forest-green/30 font-body"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Catskills Notes */}
          <div className="bg-gradient-to-br from-amber-50 to-parchment border-2 border-brown-dark/30 rounded-lg p-6">
            <h2 className="font-display text-2xl text-brown-dark mb-3 flex items-center gap-2">
              <span>🏔️</span>
              Catskills Field Notes
            </h2>
            <p className="font-body text-brown-dark/80 leading-relaxed italic">
              {species.catskillsNotes}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t-2 border-brown-dark/20">
            <button className="w-full md:w-auto bg-forest-green hover:bg-forest-green/90 text-parchment font-display text-lg px-8 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 border-2 border-brown-dark/30">
              Add to My Catalog
            </button>
            <p className="mt-2 text-sm font-body text-brown-dark/60 italic">
              (Feature coming soon)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;

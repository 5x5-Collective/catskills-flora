import { speciesData } from '../data/species-data';
import PlantCard from '../components/PlantCard';

const Encyclopedia = () => {
  const discoveredCount = speciesData.filter(s => s.discovered).length;
  const totalCount = speciesData.length;
  const progressPercent = (discoveredCount / totalCount) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="font-display text-4xl md:text-5xl text-brown-dark mb-4">
          Flora Encyclopedia
        </h2>
        <div className="border-2 border-brown-dark rounded-lg p-6 bg-gradient-to-br from-amber-50 to-parchment shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-lg text-brown-dark">
              Discovery Progress
            </span>
            <span className="font-display text-2xl text-aged-gold font-bold">
              {discoveredCount} / {totalCount}
            </span>
          </div>
          {/* Vintage Progress Bar */}
          <div className="relative h-8 bg-brown-dark/10 border-2 border-brown-dark rounded overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-forest-green to-aged-gold transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent > 20 && (
                <span className="text-xs font-bold text-parchment drop-shadow">
                  {Math.round(progressPercent)}%
                </span>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm font-body text-brown-dark/70 italic">
            Discover new species by exploring the Catskills wilderness
          </p>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {speciesData.map((species) => (
          <PlantCard key={species.id} species={species} />
        ))}
      </div>
    </div>
  );
};

export default Encyclopedia;

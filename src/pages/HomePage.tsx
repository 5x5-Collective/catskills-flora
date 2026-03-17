import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import speciesData from '../data/species.json';
import { isInBloom, getBloomingSoonSpecies, monthNames, getCurrentMonth } from '../lib/seasons';

export function HomePage() {
  const specimens = useLiveQuery(() => db.specimens.toArray());
  const totalSpecies = speciesData.length;
  const foundCount = new Set(specimens?.map(s => s.speciesId) || []).size;
  const progress = Math.round((foundCount / totalSpecies) * 100);

  const currentMonth = getCurrentMonth();
  const bloomingNow = speciesData.filter(s => isInBloom(s.bloomMonths));
  const bloomingSoon = getBloomingSoonSpecies(speciesData);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-ink-800">
          Welcome, Naturalist
        </h2>
        <p className="text-lg text-ink-700 max-w-2xl mx-auto">
          Your personal field guide to the wildflowers and plants of the Catskill Mountains.
          Identify, catalog, and discover the botanical treasures of these ancient peaks.
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="field-journal-card"
      >
        <h3 className="text-xl font-semibold text-ink-800 mb-4">Your Collection</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-ink-700 mb-2">
              <span>{foundCount} of {totalSpecies} species found</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-parchment-300 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-forest-500"
              />
            </div>
          </div>
          <Link
            to="/catalog"
            className="px-6 py-3 bg-forest-600 text-parchment-50 rounded hover:bg-forest-700 transition-colors font-semibold"
          >
            View Herbarium
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/identify" className="block pressed-specimen p-6 h-full hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="text-xl font-semibold text-ink-800 mb-2">Identify a Plant</h3>
            <p className="text-ink-700">
              Use AI vision to identify wildflowers from photos and add them to your collection.
            </p>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/encyclopedia" className="block pressed-specimen p-6 h-full hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-xl font-semibold text-ink-800 mb-2">Field Guide</h3>
            <p className="text-ink-700">
              Browse the complete encyclopedia of Catskills flora. Unlock species as you find them.
            </p>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/catalog" className="block pressed-specimen p-6 h-full hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🌿</div>
            <h3 className="text-xl font-semibold text-ink-800 mb-2">My Herbarium</h3>
            <p className="text-ink-700">
              Review your personal collection with photos, notes, and seasonal records.
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Seasonal Awareness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="field-journal-card"
      >
        <h3 className="text-xl font-semibold text-ink-800 mb-4">
          Blooming in {monthNames[currentMonth]}
        </h3>
        <p className="text-ink-700 mb-4">
          {bloomingNow.length} species are currently in bloom across the Catskills.
        </p>
        <div className="flex flex-wrap gap-2">
          {bloomingNow.slice(0, 8).map(species => (
            <Link
              key={species.id}
              to={`/encyclopedia/${species.id}`}
              className="px-3 py-1 bg-botanical-yellow/20 border border-botanical-yellow/40 rounded text-sm text-ink-800 hover:bg-botanical-yellow/30 transition-colors"
            >
              {species.commonName}
            </Link>
          ))}
          {bloomingNow.length > 8 && (
            <Link
              to="/encyclopedia"
              className="px-3 py-1 bg-forest-600 text-parchment-50 rounded text-sm hover:bg-forest-700 transition-colors"
            >
              +{bloomingNow.length - 8} more
            </Link>
          )}
        </div>

        {bloomingSoon.length > 0 && (
          <div className="mt-6 pt-6 border-t border-ink-600/20">
            <h4 className="font-semibold text-ink-800 mb-2">Coming Soon</h4>
            <p className="text-sm text-ink-700">
              {bloomingSoon.length} species will bloom next month. Plan your field trips accordingly!
            </p>
          </div>
        )}
      </motion.div>

      {/* Recent Finds */}
      {specimens && specimens.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="field-journal-card"
        >
          <h3 className="text-xl font-semibold text-ink-800 mb-4">Recent Finds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specimens.slice(-4).reverse().map(specimen => {
              const species = speciesData.find(s => s.id === specimen.speciesId);
              return (
                <Link
                  key={specimen.id}
                  to={`/catalog/${specimen.id}`}
                  className="pressed-specimen p-3 block"
                >
                  {specimen.photos[0] && (
                    <img
                      src={specimen.photos[0]}
                      alt={species?.commonName}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <p className="text-sm font-semibold text-ink-800 truncate">
                    {species?.commonName}
                  </p>
                  <p className="text-xs text-ink-600 italic truncate">
                    {species?.latinName}
                  </p>
                  <p className="text-xs text-ink-600 mt-1">
                    {new Date(specimen.dateFound).toLocaleDateString()}
                  </p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

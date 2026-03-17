import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import speciesData from '../data/species.json';
import { getSeasonName } from '../lib/seasons';

export function CatalogPage() {
  const specimens = useLiveQuery(() => db.specimens.orderBy('createdAt').reverse().toArray());
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const filteredSpecimens = specimens?.filter(s => 
    filterSeason === 'all' || s.season === filterSeason
  ) || [];

  const sortedSpecimens = [...filteredSpecimens].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.dateFound).getTime() - new Date(a.dateFound).getTime();
    } else {
      const speciesA = speciesData.find(s => s.id === a.speciesId);
      const speciesB = speciesData.find(s => s.id === b.speciesId);
      return (speciesA?.commonName || '').localeCompare(speciesB?.commonName || '');
    }
  });

  const uniqueSpeciesCount = new Set(specimens?.map(s => s.speciesId) || []).size;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-ink-800 mb-2">My Personal Herbarium</h2>
        <p className="text-ink-700">
          {specimens?.length || 0} specimens collected · {uniqueSpeciesCount} unique species
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="field-journal-card"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-ink-800">Season:</label>
            <select
              value={filterSeason}
              onChange={(e) => setFilterSeason(e.target.value)}
              className="px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800"
            >
              <option value="all">All Seasons</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-ink-800">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
              className="px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800"
            >
              <option value="date">Date Found</option>
              <option value="name">Plant Name</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {(!specimens || specimens.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="field-journal-card text-center py-16"
        >
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-ink-800 mb-2">
            Your herbarium awaits
          </h3>
          <p className="text-ink-700 mb-6">
            Start building your collection by identifying plants in the field
          </p>
          <Link
            to="/identify"
            className="inline-block px-6 py-3 bg-forest-600 text-parchment-50 rounded-lg hover:bg-forest-700 transition-colors font-semibold"
          >
            Identify Your First Plant
          </Link>
        </motion.div>
      )}

      {/* Specimen Grid */}
      {sortedSpecimens.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedSpecimens.map((specimen, index) => {
            const species = speciesData.find(s => s.id === specimen.speciesId);
            
            return (
              <motion.div
                key={specimen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/catalog/${specimen.id}`}
                  className="block pressed-specimen p-4 h-full hover:scale-105 transition-transform"
                >
                  {/* Photo */}
                  {specimen.photos[0] && (
                    <div className="mb-3 rounded overflow-hidden border border-ink-600/20">
                      <img
                        src={specimen.photos[0]}
                        alt={species?.commonName}
                        className="w-full h-48 object-cover botanical-illustration"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <h3 className="text-lg font-semibold text-ink-800 mb-1">
                    {species?.commonName || 'Unknown Species'}
                  </h3>
                  <p className="text-sm italic text-ink-700 mb-2">
                    {species?.latinName}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-1 text-xs text-ink-600">
                    <p>📅 {new Date(specimen.dateFound).toLocaleDateString()}</p>
                    {specimen.locationLabel && (
                      <p>📍 {specimen.locationLabel}</p>
                    )}
                    <p>
                      <span className="inline-block px-2 py-0.5 bg-botanical-blue/20 border border-botanical-blue/40 rounded text-ink-800">
                        {getSeasonName(specimen.season)}
                      </span>
                    </p>
                  </div>

                  {/* Notes Preview */}
                  {specimen.notes && (
                    <p className="mt-2 text-xs text-ink-700 italic line-clamp-2 font-script">
                      "{specimen.notes}"
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* No Results */}
      {specimens && specimens.length > 0 && sortedSpecimens.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="field-journal-card text-center py-12"
        >
          <p className="text-ink-700">
            No specimens found for {filterSeason} season
          </p>
          <button
            onClick={() => setFilterSeason('all')}
            className="mt-4 px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200 transition-colors"
          >
            Show All Seasons
          </button>
        </motion.div>
      )}
    </div>
  );
}

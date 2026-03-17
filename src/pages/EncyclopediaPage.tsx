import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import speciesData from '../data/species.json';
import { monthNames, getCurrentMonth } from '../lib/seasons';

export function EncyclopediaPage() {
  const specimens = useLiveQuery(() => db.specimens.toArray());
  const [filterMonth, setFilterMonth] = useState<number | 'all'>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const foundSpeciesIds = new Set(specimens?.map(s => s.speciesId) || []);
  const currentMonth = getCurrentMonth();

  const filteredSpecies = speciesData.filter(species => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !species.commonName.toLowerCase().includes(query) &&
        !species.latinName.toLowerCase().includes(query) &&
        !species.family.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Month filter
    if (filterMonth !== 'all' && !species.bloomMonths.includes(filterMonth)) {
      return false;
    }

    // Rarity filter
    if (filterRarity !== 'all' && species.rarity !== filterRarity) {
      return false;
    }

    return true;
  });

  const totalSpecies = speciesData.length;
  const foundCount = foundSpeciesIds.size;
  const progress = Math.round((foundCount / totalSpecies) * 100);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-ink-800 mb-2">Catskills Field Guide</h2>
        <p className="text-ink-700">
          Complete encyclopedia of {totalSpecies} wildflowers and plants
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="field-journal-card"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-ink-800">Collection Progress</h3>
          <span className="text-2xl font-bold text-forest-600">{progress}%</span>
        </div>
        <div className="w-full bg-parchment-300 rounded-full h-3 overflow-hidden mb-2">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-forest-500 transition-all duration-500"
          />
        </div>
        <p className="text-sm text-ink-700">
          {foundCount} of {totalSpecies} species discovered
        </p>
        <p className="text-xs text-ink-600 mt-2 italic">
          💡 Unlock species by finding them in the wild and adding them to your herbarium
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="field-journal-card space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-ink-800 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Common or scientific name..."
              className="w-full px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800 placeholder:text-ink-600/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-800 mb-2">
              Bloom Month
            </label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800"
            >
              <option value="all">All Months</option>
              {monthNames.map((name, index) => (
                <option key={index} value={index}>
                  {name} {index === currentMonth && '(Now)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-800 mb-2">
              Rarity
            </label>
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="w-full px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800"
            >
              <option value="all">All Rarity</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
            </select>
          </div>
        </div>

        {(searchQuery || filterMonth !== 'all' || filterRarity !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-ink-600/20">
            <p className="text-sm text-ink-700">
              Showing {filteredSpecies.length} of {totalSpecies} species
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterMonth('all');
                setFilterRarity('all');
              }}
              className="text-sm text-forest-600 hover:text-forest-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Species Grid */}
      {filteredSpecies.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredSpecies.map((species, index) => {
            const isFound = foundSpeciesIds.has(species.id);
            const isInBloom = species.bloomMonths.includes(currentMonth);

            return (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Link
                  to={`/encyclopedia/${species.id}`}
                  className={`block pressed-specimen p-3 h-full transition-all ${
                    !isFound ? 'locked-species hover:scale-105' : 'hover:scale-105'
                  }`}
                >
                  {/* Illustration placeholder */}
                  <div className="mb-2 h-32 bg-parchment-200 rounded border border-ink-600/20 flex items-center justify-center">
                    {isFound ? (
                      <div className="text-4xl">🌸</div>
                    ) : (
                      <div className="text-4xl opacity-30">❓</div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className={`text-sm font-semibold mb-1 ${isFound ? 'text-ink-800' : 'text-ink-600'}`}>
                    {isFound ? species.commonName : '???'}
                  </h3>
                  <p className={`text-xs italic mb-2 ${isFound ? 'text-ink-700' : 'text-ink-500'}`}>
                    {isFound ? species.latinName : 'Unknown species'}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    {isInBloom && (
                      <span className="text-xs px-2 py-0.5 bg-botanical-yellow/30 border border-botanical-yellow/50 rounded">
                        Blooming
                      </span>
                    )}
                    {isFound && (
                      <>
                        <span className={`text-xs px-2 py-0.5 rounded border ${
                          species.rarity === 'common' ? 'bg-forest-300/20 border-forest-400/40' :
                          species.rarity === 'uncommon' ? 'bg-botanical-blue/20 border-botanical-blue/40' :
                          'bg-botanical-violet/20 border-botanical-violet/40'
                        }`}>
                          {species.rarity}
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="field-journal-card text-center py-12"
        >
          <p className="text-ink-700">No species match your filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterMonth('all');
              setFilterRarity('all');
            }}
            className="mt-4 px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

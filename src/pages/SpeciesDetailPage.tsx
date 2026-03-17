import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { SpecimenEntry } from '../lib/types';
import speciesData from '../data/species.json';
import { monthNames } from '../lib/seasons';

export function SpeciesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const species = speciesData.find(s => s.id === id);
  const specimens = useLiveQuery<SpecimenEntry[]>(() => 
    id ? db.specimens.where('speciesId').equals(id).toArray() : Promise.resolve([]),
    [id]
  );

  const isFound = specimens && specimens.length > 0;

  if (!species) {
    return (
      <div className="field-journal-card text-center py-12">
        <p className="text-ink-700">Species not found</p>
        <Link to="/encyclopedia" className="mt-4 inline-block px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200">
          Return to Field Guide
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-ink-800">{species.commonName}</h2>
          <p className="text-2xl italic text-ink-700 mt-1">{species.latinName}</p>
          <p className="text-ink-600 mt-2">Family: {species.family}</p>
          
          {/* Status Badges */}
          <div className="flex gap-2 mt-4">
            {isFound ? (
              <span className="px-3 py-1 bg-forest-500 text-parchment-50 rounded font-semibold">
                ✓ Found ({specimens?.length} specimen{specimens!.length > 1 ? 's' : ''})
              </span>
            ) : (
              <span className="px-3 py-1 bg-ink-600/20 text-ink-700 rounded font-semibold">
                🔒 Not Yet Discovered
              </span>
            )}
            <span className={`px-3 py-1 rounded font-semibold ${
              species.rarity === 'common' ? 'bg-forest-300/30 text-forest-700' :
              species.rarity === 'uncommon' ? 'bg-botanical-blue/30 text-botanical-blue' :
              'bg-botanical-violet/30 text-botanical-violet'
            }`}>
              {species.rarity.charAt(0).toUpperCase() + species.rarity.slice(1)}
            </span>
          </div>
        </div>
        
        <Link to="/encyclopedia" className="px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200">
          ← Back
        </Link>
      </motion.div>

      {/* Main Content - Only show if found OR show teaser */}
      {isFound ? (
        <>
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="field-journal-card"
          >
            <h3 className="text-xl font-semibold text-ink-800 mb-3">Description</h3>
            <p className="text-ink-800 leading-relaxed mb-4">{species.description}</p>
            
            {species.catskillsNotes && (
              <div className="pt-4 border-t border-ink-600/20">
                <h4 className="font-semibold text-ink-700 mb-2">Catskills Notes</h4>
                <p className="text-ink-800 italic">{species.catskillsNotes}</p>
              </div>
            )}
          </motion.div>

          {/* Field Guide Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Bloom Period */}
            <div className="field-journal-card">
              <h3 className="text-lg font-semibold text-ink-800 mb-3">Bloom Period</h3>
              <div className="flex flex-wrap gap-2">
                {species.bloomMonths.map(month => (
                  <span
                    key={month}
                    className="px-3 py-1 bg-botanical-yellow/20 border border-botanical-yellow/40 rounded text-ink-800"
                  >
                    {monthNames[month]}
                  </span>
                ))}
              </div>
            </div>

            {/* Elevation */}
            <div className="field-journal-card">
              <h3 className="text-lg font-semibold text-ink-800 mb-3">Elevation Range</h3>
              <p className="text-ink-800 text-lg">{species.elevation}</p>
            </div>
          </motion.div>

          {/* Habitat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="field-journal-card"
          >
            <h3 className="text-lg font-semibold text-ink-800 mb-3">Habitat & Growing Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {species.habitat.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-forest-300/20 border border-forest-400/40 rounded text-ink-800"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Your Specimens */}
          {specimens && specimens.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="field-journal-card"
            >
              <h3 className="text-lg font-semibold text-ink-800 mb-4">
                Your Specimens ({specimens.length})
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {specimens.map(specimen => (
                  <Link
                    key={specimen.id}
                    to={`/catalog/${specimen.id}`}
                    className="pressed-specimen p-3 block hover:scale-105 transition-transform"
                  >
                    {specimen.photos[0] && (
                      <img
                        src={specimen.photos[0]}
                        alt="Specimen"
                        className="w-full h-32 object-cover rounded border border-ink-600/20 mb-2"
                      />
                    )}
                    <p className="text-sm text-ink-800">
                      {new Date(specimen.dateFound).toLocaleDateString()}
                    </p>
                    {specimen.locationLabel && (
                      <p className="text-xs text-ink-600 truncate">
                        📍 {specimen.locationLabel}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Locked View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="field-journal-card text-center py-16"
        >
          <div className="text-6xl mb-4 opacity-30">🔒</div>
          <h3 className="text-2xl font-semibold text-ink-800 mb-3">
            Species Locked
          </h3>
          <p className="text-ink-700 max-w-md mx-auto mb-6">
            Find this plant in the wild and add it to your herbarium to unlock full details, 
            habitat information, and collection records.
          </p>
          <div className="mb-6 p-4 bg-parchment-200 rounded inline-block">
            <p className="text-sm font-semibold text-ink-800 mb-2">Hints for Finding:</p>
            <p className="text-sm text-ink-700">
              Blooms: {species.bloomMonths.map(m => monthNames[m]).join(', ')}
            </p>
            <p className="text-sm text-ink-700">
              Elevation: {species.elevation}
            </p>
            <p className="text-sm text-ink-700 capitalize">
              Rarity: {species.rarity}
            </p>
          </div>
          <Link
            to="/identify"
            className="inline-block px-6 py-3 bg-forest-600 text-parchment-50 rounded-lg hover:bg-forest-700 transition-colors font-semibold"
          >
            Identify a Plant
          </Link>
        </motion.div>
      )}

      {/* Conservation Note */}
      {species.rarity !== 'common' && isFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="field-journal-card border-2 border-botanical-pink/50 bg-botanical-pink/10"
        >
          <h4 className="font-semibold text-ink-800 mb-2">⚠️ Conservation Notice</h4>
          <p className="text-sm text-ink-800">
            This is an <strong>{species.rarity}</strong> species. Please observe without disturbing. 
            Never pick, dig, or transplant wild plants. Take only photographs and leave only footprints.
          </p>
        </motion.div>
      )}
    </div>
  );
}

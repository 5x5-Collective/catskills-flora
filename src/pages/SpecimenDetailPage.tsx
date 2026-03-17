import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import speciesData from '../data/species.json';
import { getSeasonName } from '../lib/seasons';
import { IdeaCard } from '../lib/types';

export function SpecimenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const specimen = useLiveQuery(() => id ? db.specimens.get(id) : undefined, [id]);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const species = specimen ? speciesData.find(s => s.id === specimen.speciesId) : null;

  const handleSaveNotes = async () => {
    if (!id || !specimen) return;
    await db.specimens.update(id, {
      notes: notes || undefined,
      locationLabel: location || undefined,
    });
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!id || !confirm('Delete this specimen from your herbarium?')) return;
    await db.specimens.delete(id);
    navigate('/catalog');
  };

  const generateIdeas = async () => {
    if (!species || !specimen) return;

    setLoadingIdeas(true);
    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commonName: species.commonName,
          latinName: species.latinName,
          family: species.family,
        }),
      });

      if (response.ok) {
        const ideas: IdeaCard[] = await response.json();
        await db.specimens.update(specimen.id, { diyIdeas: ideas });
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error);
    } finally {
      setLoadingIdeas(false);
    }
  };

  if (!specimen || !species) {
    return (
      <div className="field-journal-card text-center py-12">
        <p className="text-ink-700">Specimen not found</p>
        <Link to="/catalog" className="mt-4 inline-block px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200">
          Return to Catalog
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
        <div>
          <h2 className="text-3xl font-bold text-ink-800">{species.commonName}</h2>
          <p className="text-xl italic text-ink-700">{species.latinName}</p>
          <p className="text-sm text-ink-600 mt-1">Family: {species.family}</p>
        </div>
        <Link to="/catalog" className="px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200">
          ← Back to Catalog
        </Link>
      </motion.div>

      {/* Photos */}
      {specimen.photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="field-journal-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specimen.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${species.commonName} - ${index + 1}`}
                className="w-full h-64 object-cover rounded border border-ink-600/20 botanical-illustration"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Collection Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="field-journal-card"
      >
        <h3 className="text-xl font-semibold text-ink-800 mb-4">Collection Record</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-1">Date Found</p>
            <p className="text-ink-800">{new Date(specimen.dateFound).toLocaleDateString('en-US', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            })}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-1">Season</p>
            <p className="text-ink-800">{getSeasonName(specimen.season)}</p>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6 pt-6 border-t border-ink-600/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-ink-800">Field Notes</h4>
            {!editMode && (
              <button
                onClick={() => {
                  setNotes(specimen.notes || '');
                  setLocation(specimen.locationLabel || '');
                  setEditMode(true);
                }}
                className="text-sm text-forest-600 hover:text-forest-700 font-semibold"
              >
                Edit
              </button>
            )}
          </div>

          {editMode ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-ink-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Trail, elevation, or landmark..."
                  className="w-full px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800"
                />
              </div>
              <div>
                <label className="block text-sm text-ink-700 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observations, habitat details, companions, etc..."
                  rows={4}
                  className="w-full px-3 py-2 border border-ink-600/30 rounded bg-parchment-50 text-ink-800 font-script"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-forest-600 text-parchment-50 rounded hover:bg-forest-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-ink-600/30 rounded hover:bg-parchment-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {specimen.locationLabel && (
                <p className="text-ink-800">
                  <span className="font-semibold">📍 </span>
                  {specimen.locationLabel}
                </p>
              )}
              {specimen.notes ? (
                <p className="text-ink-800 font-script italic">"{specimen.notes}"</p>
              ) : (
                <p className="text-ink-600 italic text-sm">No notes recorded</p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* DIY Ideas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="field-journal-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-ink-800">DIY & Traditional Uses</h3>
          {!specimen.diyIdeas && !loadingIdeas && (
            <button
              onClick={generateIdeas}
              className="px-4 py-2 bg-botanical-violet text-parchment-50 rounded hover:bg-botanical-violet/80 transition-colors"
            >
              ✨ Generate Ideas
            </button>
          )}
        </div>

        {loadingIdeas && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 animate-pulse">🔮</div>
            <p className="text-ink-700">Consulting historical records and folk wisdom...</p>
          </div>
        )}

        {specimen.diyIdeas && specimen.diyIdeas.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {specimen.diyIdeas.map((idea, index) => (
              <div
                key={index}
                className="pressed-specimen p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-ink-800">{idea.title}</h4>
                  <span className="text-xs px-2 py-0.5 bg-botanical-pink/20 border border-botanical-pink/40 rounded">
                    {idea.difficulty}
                  </span>
                </div>
                <p className="text-sm text-ink-700 mb-2">{idea.method}</p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-parchment-200 rounded">
                    {idea.category}
                  </span>
                  <span className="text-ink-600 italic">{idea.seasonRelevance}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!specimen.diyIdeas && !loadingIdeas && (
          <p className="text-ink-600 italic text-sm text-center py-6">
            Generate creative and traditional use ideas for this plant
          </p>
        )}
      </motion.div>

      {/* Species Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between field-journal-card"
      >
        <div>
          <p className="text-sm text-ink-700 mb-1">Learn more about this species</p>
          <Link
            to={`/encyclopedia/${species.id}`}
            className="text-forest-600 hover:text-forest-700 font-semibold"
          >
            View in Field Guide →
          </Link>
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border-2 border-botanical-pink text-botanical-pink hover:bg-botanical-pink hover:text-parchment-50 rounded transition-colors"
        >
          Delete Specimen
        </button>
      </motion.div>
    </div>
  );
}

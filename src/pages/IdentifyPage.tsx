import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../lib/db';
import { getSeason } from '../lib/seasons';
import speciesData from '../data/species.json';
import { IdentificationResult } from '../lib/types';

export function IdentifyPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const identifyPlant = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error('Identification failed');
      }

      const data = await response.json();
      
      // Try to match with our species database
      const matchedSpecies = speciesData.find(
        s => s.latinName.toLowerCase() === data.latinName.toLowerCase() ||
             s.commonName.toLowerCase() === data.commonName.toLowerCase()
      );

      setResult({
        ...data,
        speciesId: matchedSpecies?.id || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to identify plant');
    } finally {
      setLoading(false);
    }
  };

  const saveToHerbarium = async () => {
    if (!result || !result.speciesId || !image) return;

    const specimen = {
      id: crypto.randomUUID(),
      speciesId: result.speciesId,
      photos: [image],
      dateFound: new Date().toISOString(),
      season: getSeason(new Date()),
      createdAt: new Date().toISOString(),
    };

    await db.specimens.add(specimen);
    navigate(`/catalog/${specimen.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-ink-800 mb-2">Plant Identification</h2>
        <p className="text-ink-700">
          Upload or capture a photo to identify wildflowers using AI vision
        </p>
      </motion.div>

      {/* Image Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="field-journal-card"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageCapture}
          className="hidden"
        />

        {!image ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-16 border-2 border-dashed border-ink-600/30 rounded-lg hover:border-forest-600 hover:bg-parchment-200 transition-colors"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-lg font-semibold text-ink-800 mb-2">
                Capture or Upload Photo
              </p>
              <p className="text-sm text-ink-700">
                Take a clear photo of the plant, focusing on flowers if visible
              </p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={image}
                alt="Plant to identify"
                className="w-full max-h-96 object-contain rounded border border-ink-600/20"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setResult(null);
                  setError(null);
                }}
                className="absolute top-2 right-2 px-3 py-1 bg-parchment-50 border border-ink-600/30 rounded text-sm hover:bg-parchment-100"
              >
                Change Photo
              </button>
            </div>

            {!result && !loading && (
              <button
                onClick={identifyPlant}
                className="w-full py-3 bg-forest-600 text-parchment-50 rounded-lg hover:bg-forest-700 transition-colors font-semibold"
              >
                Identify This Plant
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="field-journal-card text-center py-12"
        >
          <div className="text-4xl mb-4 animate-pulse">🔍</div>
          <p className="text-lg text-ink-800 font-semibold">
            Consulting botanical references...
          </p>
          <p className="text-sm text-ink-700 mt-2">
            This may take a few moments
          </p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="field-journal-card border-2 border-botanical-pink"
        >
          <p className="text-ink-800 font-semibold mb-2">⚠️ Identification Error</p>
          <p className="text-ink-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 px-4 py-2 bg-ink-600 text-parchment-50 rounded hover:bg-ink-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="field-journal-card space-y-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-ink-800">
                {result.commonName}
              </h3>
              <p className="text-lg italic text-ink-700">
                {result.latinName}
              </p>
              <p className="text-sm text-ink-600 mt-1">
                Family: {result.family}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-forest-600">
                {result.confidence}%
              </div>
              <div className="text-xs text-ink-600">Confidence</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-ink-600/20">
            <div>
              <p className="text-sm font-semibold text-ink-800 mb-1">
                Bloom Season
              </p>
              <p className="text-ink-700">{result.bloomSeason}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-800 mb-1">
                Typical Habitat
              </p>
              <p className="text-ink-700">{result.habitat}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-ink-600/20">
            <p className="text-sm font-semibold text-ink-800 mb-2">
              Identification Notes
            </p>
            <p className="text-ink-700 text-sm">{result.reasoning}</p>
          </div>

          <div className="flex gap-4 pt-4 border-t border-ink-600/20">
            {result.speciesId ? (
              <button
                onClick={saveToHerbarium}
                className="flex-1 py-3 bg-forest-600 text-parchment-50 rounded-lg hover:bg-forest-700 transition-colors font-semibold"
              >
                💾 Save to My Herbarium
              </button>
            ) : (
              <div className="flex-1 py-3 bg-botanical-yellow/20 border border-botanical-yellow/40 rounded-lg text-center">
                <p className="text-sm text-ink-800">
                  This species isn't in our Catskills database yet, but you can still save the identification.
                </p>
              </div>
            )}
            <button
              onClick={() => {
                setImage(null);
                setResult(null);
              }}
              className="px-6 py-3 border-2 border-ink-600/30 rounded-lg hover:bg-parchment-200 transition-colors"
            >
              New Identification
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

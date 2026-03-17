const Identify = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="font-display text-4xl md:text-5xl text-brown-dark mb-6">
        Identify Plants
      </h2>
      
      <div className="border-4 border-brown-dark/30 rounded-lg p-12 bg-gradient-to-br from-amber-50 to-parchment text-center">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-brown-dark/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        
        <h3 className="font-display text-2xl text-brown-dark mb-3">
          AI-Powered Plant Recognition
        </h3>
        
        <p className="font-body text-brown-dark/70 text-lg leading-relaxed max-w-md mx-auto mb-6">
          Snap a photo of any plant in the Catskills and get instant
          identification powered by computer vision and botanical AI. Learn
          which species you've discovered in real-time.
        </p>
        
        <div className="space-y-4 max-w-sm mx-auto text-left">
          <div className="flex items-start gap-3">
            <div className="bg-forest-green text-parchment rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              1
            </div>
            <p className="font-body text-brown-dark/70">
              Take or upload a clear photo of the plant
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-forest-green text-parchment rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              2
            </div>
            <p className="font-body text-brown-dark/70">
              AI analyzes flowers, leaves, and habitat
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-forest-green text-parchment rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
              3
            </div>
            <p className="font-body text-brown-dark/70">
              Get instant matches with confidence scores
            </p>
          </div>
        </div>
        
        <div className="mt-8 inline-block bg-brown-dark/10 border-2 border-brown-dark/30 rounded-lg px-6 py-3">
          <span className="font-body text-brown-dark/70 italic">
            Coming in Phase 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default Identify;

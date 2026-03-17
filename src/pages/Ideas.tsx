const Ideas = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="font-display text-4xl md:text-5xl text-brown-dark mb-6">
        Discovery Ideas
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        
        <h3 className="font-display text-2xl text-brown-dark mb-3">
          Seasonal Discovery Guides
        </h3>
        
        <p className="font-body text-brown-dark/70 text-lg leading-relaxed max-w-md mx-auto mb-6">
          Get personalized suggestions for what's blooming now, where to find
          rare species, and which trails offer the best botanical diversity for
          the current season.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mb-8">
          <div className="border-2 border-brown-dark/20 rounded-lg p-4 bg-parchment">
            <h4 className="font-display text-lg text-brown-dark mb-2">
              🌸 What's Blooming
            </h4>
            <p className="font-body text-sm text-brown-dark/70">
              Real-time bloom forecasts based on elevation, weather, and season
            </p>
          </div>
          
          <div className="border-2 border-brown-dark/20 rounded-lg p-4 bg-parchment">
            <h4 className="font-display text-lg text-brown-dark mb-2">
              📍 Where to Go
            </h4>
            <p className="font-body text-sm text-brown-dark/70">
              Trail recommendations for specific species and habitat types
            </p>
          </div>
          
          <div className="border-2 border-brown-dark/20 rounded-lg p-4 bg-parchment">
            <h4 className="font-display text-lg text-brown-dark mb-2">
              🎯 Quests & Challenges
            </h4>
            <p className="font-body text-sm text-brown-dark/70">
              Seasonal collecting goals and naturalist achievements
            </p>
          </div>
          
          <div className="border-2 border-brown-dark/20 rounded-lg p-4 bg-parchment">
            <h4 className="font-display text-lg text-brown-dark mb-2">
              🗓️ Peak Viewing
            </h4>
            <p className="font-body text-sm text-brown-dark/70">
              Alerts for rare species about to bloom in your area
            </p>
          </div>
        </div>
        
        <div className="inline-block bg-brown-dark/10 border-2 border-brown-dark/30 rounded-lg px-6 py-3">
          <span className="font-body text-brown-dark/70 italic">
            Coming in Phase 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ideas;

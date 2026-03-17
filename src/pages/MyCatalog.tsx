const MyCatalog = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="font-display text-4xl md:text-5xl text-brown-dark mb-6">
        My Catalog
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        
        <h3 className="font-display text-2xl text-brown-dark mb-3">
          Your Personal Herbarium
        </h3>
        
        <p className="font-body text-brown-dark/70 text-lg leading-relaxed max-w-md mx-auto">
          Track your discoveries, add field notes, and curate your own collection
          of Catskills flora. This feature will let you organize and annotate
          your botanical observations.
        </p>
        
        <div className="mt-8 inline-block bg-brown-dark/10 border-2 border-brown-dark/30 rounded-lg px-6 py-3">
          <span className="font-body text-brown-dark/70 italic">
            Coming in Phase 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyCatalog;

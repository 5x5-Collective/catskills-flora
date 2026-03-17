import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/identify', label: 'Identify' },
    { path: '/catalog', label: 'My Herbarium' },
    { path: '/encyclopedia', label: 'Field Guide' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-parchment-200 border-b-2 border-ink-600/30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link to="/" className="block">
            <h1 className="text-4xl font-bold text-ink-800 text-center tracking-wide">
              Catskills Flora
            </h1>
            <p className="text-center text-ink-700 text-sm italic mt-1 font-script">
              A Naturalist's Field Journal
            </p>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="max-w-4xl mx-auto px-4 pb-4">
          <ul className="flex justify-center gap-2 md:gap-6 flex-wrap">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 block transition-colors ${
                    location.pathname === item.path
                      ? 'text-forest-600 font-semibold'
                      : 'text-ink-700 hover:text-forest-600'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-600"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-parchment-200 border-t border-ink-600/20 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-ink-700 text-sm">
          <p className="italic">
            "In every walk with nature, one receives far more than he seeks."
          </p>
          <p className="text-xs mt-2 text-ink-600">— John Muir</p>
          <p className="mt-4 text-xs text-ink-600">
            Catskills Flora · A Personal Field Guide · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

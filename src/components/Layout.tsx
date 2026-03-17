import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  const navItems = [
    { to: '/', label: '📖 Encyclopedia', icon: '📖' },
    { to: '/catalog', label: '🌿 My Catalog', icon: '🌿' },
    { to: '/identify', label: '📷 Identify', icon: '📷' },
    { to: '/ideas', label: '💡 Ideas', icon: '💡' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r-4 border-brown-dark bg-gradient-to-b from-parchment to-amber-50 sticky top-0 h-screen">
        <div className="p-6 border-b-2 border-brown-dark">
          <h1 className="font-display text-3xl text-brown-dark tracking-wide">
            The Catskill Herbarium
          </h1>
          <div className="mt-2 h-1 w-16 bg-aged-gold"></div>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-body text-lg transition-all ${
                  isActive
                    ? 'bg-brown-dark text-parchment shadow-lg'
                    : 'text-brown-dark hover:bg-aged-gold/20 hover:translate-x-1'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-10 bg-gradient-to-r from-parchment to-amber-50 border-b-4 border-brown-dark px-4 py-4 shadow-lg">
          <h1 className="font-display text-2xl text-brown-dark tracking-wide text-center">
            The Catskill Herbarium
          </h1>
          <div className="mt-1 h-0.5 w-12 bg-aged-gold mx-auto"></div>
        </header>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-parchment to-amber-50 border-t-4 border-brown-dark shadow-2xl z-20">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-brown-dark scale-110'
                    : 'text-brown-dark/60'
                }`
              }
            >
              <span className="text-2xl mb-0.5">{item.icon}</span>
              <span className="text-xs font-body font-semibold">
                {item.label.split(' ')[1] || item.label.split(' ')[0]}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;

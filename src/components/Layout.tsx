import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>Grimdarkly</h1>
              <span className="logo-subtitle">Warhammer 40K Database</span>
            </Link>
            
            <nav className="nav">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/units" 
                className={`nav-link ${isActive('/units') ? 'active' : ''}`}
              >
                Units
              </Link>
              <Link 
                to="/weapons" 
                className={`nav-link ${isActive('/weapons') ? 'active' : ''}`}
              >
                Weapons
              </Link>
              <Link 
                to="/factions" 
                className={`nav-link ${isActive('/factions') ? 'active' : ''}`}
              >
                Factions
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Grimdarkly. Warhammer 40K data provided for reference purposes.</p>
            <p className="text-muted">
              This is an unofficial fan project and is not affiliated with Games Workshop.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

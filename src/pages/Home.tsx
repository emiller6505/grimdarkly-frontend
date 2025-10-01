import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Grimdark Grimoire</h1>
        <p className="hero-subtitle">
          Your comprehensive Warhammer 40K database for units, weapons, and factions
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">1,635+</span>
            <span className="stat-label">Units</span>
          </div>
          <div className="stat">
            <span className="stat-number">2,271+</span>
            <span className="stat-label">Weapons</span>
          </div>
          <div className="stat">
            <span className="stat-number">25+</span>
            <span className="stat-label">Factions</span>
          </div>
        </div>
      </div>

      <div className="features">
        <h2>Explore the Grim Darkness</h2>
        <div className="grid grid-cols-3">
          <div className="feature-card">
            <div className="feature-icon">⚔️</div>
            <h3>Units</h3>
            <p>
              Browse and search through thousands of Warhammer 40K units with detailed stats, 
              abilities, and configurations.
            </p>
            <Link to="/units" className="btn btn-primary">
              Explore Units
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔫</div>
            <h3>Weapons</h3>
            <p>
              Discover the arsenal of the 41st millennium with comprehensive weapon stats, 
              abilities, and compatibility.
            </p>
            <Link to="/weapons" className="btn btn-primary">
              Browse Weapons
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Factions</h3>
            <p>
              Explore the major factions of Warhammer 40K and their unique characteristics 
              and special abilities.
            </p>
            <Link to="/factions" className="btn btn-primary">
              View Factions
            </Link>
          </div>
        </div>
      </div>

      <div className="search-preview">
        <h2>Quick Search</h2>
        <p>Start your search across the vast database of Warhammer 40K data</p>
        <div className="search-links">
          <Link to="/units" className="search-link">
            <span className="search-icon">🔍</span>
            <span>Search Units</span>
          </Link>
          <Link to="/weapons" className="search-link">
            <span className="search-icon">🔍</span>
            <span>Search Weapons</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

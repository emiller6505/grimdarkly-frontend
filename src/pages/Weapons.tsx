import { useState } from 'react';
import { weaponApi } from '../services/api';
import type { Weapon, WeaponSearchParams } from '../types';
import WeaponCard from '../components/WeaponCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import './Weapons.css';

const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: WeaponSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await weaponApi.search(params);
      setWeapons(response.data);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search weapons. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setWeapons([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="weapons-page">
      <div className="page-header">
        <h1>Weapons</h1>
        <p>Search and explore Warhammer 40K weapons with detailed stats and abilities</p>
      </div>

      <div className="search-section">
        <SearchFilters
          type="weapons"
          onSearch={handleSearch}
          onClear={handleClearSearch}
          loading={loading}
        />
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleClearSearch} className="btn btn-secondary">
            Clear Search
          </button>
        </div>
      )}

      {loading && <LoadingSpinner />}

      {!loading && hasSearched && weapons.length === 0 && !error && (
        <div className="no-results">
          <h3>No weapons found</h3>
          <p>Try adjusting your search criteria or clearing the filters.</p>
          <button onClick={handleClearSearch} className="btn btn-primary">
            Clear Search
          </button>
        </div>
      )}

      {!loading && weapons.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Search Results</h2>
            <p className="results-count">
              Found {weapons.length} weapon{weapons.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="weapons-grid">
            {weapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="search-prompt">
          <h3>Start Your Search</h3>
          <p>Use the filters above to search for specific weapons, or browse by type, range, or stats.</p>
          <div className="search-examples">
            <h4>Search Examples:</h4>
            <ul>
              <li>Search by name: "Storm Bolter" or "Chainsword"</li>
              <li>Filter by type: "MELEE" or "RANGED"</li>
              <li>Filter by range: Min/Max range values</li>
              <li>Filter by AP: Armor Penetration values</li>
              <li>Filter by attacks: "2", "D6", "D3+1"</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weapons;

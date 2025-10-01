import { useState } from 'react';
import { unitApi } from '../services/api';
import type { Unit, UnitSearchParams } from '../types';
import UnitCard from '../components/UnitCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import './Units.css';

const Units = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: UnitSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await unitApi.search(params);
      setUnits(response.data);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search units. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setUnits([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="units-page">
      <div className="page-header">
        <h1>Units</h1>
        <p>Search and explore Warhammer 40K units with detailed stats and abilities</p>
      </div>

      <div className="search-section">
        <SearchFilters
          type="units"
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

      {!loading && hasSearched && units.length === 0 && !error && (
        <div className="no-results">
          <h3>No units found</h3>
          <p>Try adjusting your search criteria or clearing the filters.</p>
          <button onClick={handleClearSearch} className="btn btn-primary">
            Clear Search
          </button>
        </div>
      )}

      {!loading && units.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Search Results</h2>
            <p className="results-count">
              Found {units.length} unit{units.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="units-grid">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="search-prompt">
          <h3>Start Your Search</h3>
          <p>Use the filters above to search for specific units, or browse by faction, type, or keywords.</p>
          <div className="search-examples">
            <h4>Search Examples:</h4>
            <ul>
              <li>Search by name: "Space Marine" or "Intercessor"</li>
              <li>Filter by faction: "Space Marines", "Chaos", "Orks"</li>
              <li>Filter by type: "BATTLELINE", "CHARACTER", "EPIC_HERO"</li>
              <li>Filter by keywords: "Infantry", "Vehicle", "Monster"</li>
              <li>Filter by stats: Toughness, Wounds, Movement ranges</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;

import { useState, useMemo } from 'react';
import { unitApi } from '../services/api';
import type { Unit, UnitSearchParams } from '../types';
import UnitCard from '../components/UnitCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import SortComponent, { type SortState, type SortOption } from '../components/SortComponent';
import './Units.css';

const Units = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortState, setSortState] = useState<SortState>({ criteria: 'name', direction: 'asc' });

  const sortOptions: SortOption[] = [
    { value: 'name', label: 'Name (default)' },
    { value: 'toughness', label: 'Toughness' },
    { value: 'wounds', label: 'Wounds' },
    { value: 'movement', label: 'Movement' },
    { value: 'save', label: 'Save' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'oc', label: 'Objective Control' }
  ];

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

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
  };

  const sortedUnits = useMemo(() => {
    if (!units.length) return units;

    return [...units].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortState.criteria) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'toughness':
          aValue = a.toughness;
          bValue = b.toughness;
          break;
        case 'wounds':
          aValue = a.wounds;
          bValue = b.wounds;
          break;
        case 'movement':
          aValue = a.movement;
          bValue = b.movement;
          break;
        case 'save':
          aValue = a.save;
          bValue = b.save;
          break;
        case 'leadership':
          aValue = a.leadership;
          bValue = b.leadership;
          break;
        case 'oc':
          aValue = a.oc;
          bValue = b.oc;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [units, sortState]);

  return (
    <div className="units-page">
      <div className="page-header">
        <h1>Units</h1>
        <p>Search and explore Warhammer 40K units with detailed stats and abilities.</p>
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
            <div className="results-title">
              <h2>Search Results</h2>
              <p className="results-count">
                Found {units.length} unit{units.length !== 1 ? 's' : ''}
              </p>
            </div>
            <SortComponent
              sortOptions={sortOptions}
              onSortChange={handleSortChange}
              currentSort={sortState}
            />
          </div>
          
          <div className="units-grid">
            {sortedUnits.map((unit) => (
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
              <li>Filter by type: "BATTLELINE", "CHARACTER", "OTHER"</li>
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

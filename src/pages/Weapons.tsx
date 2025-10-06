import { useState, useMemo } from 'react';
import { weaponApi } from '../services/api';
import type { Weapon, WeaponSearchParams } from '../types';
import WeaponCard from '../components/WeaponCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import SortComponent, { type SortState, type SortOption } from '../components/SortComponent';
import './Weapons.css';

const Weapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortState, setSortState] = useState<SortState>({ criteria: 'name', direction: 'asc' });

  const sortOptions: SortOption[] = [
    { value: 'name', label: 'Name (default)' },
    { value: 'weaponType', label: 'Type' },
    { value: 'range', label: 'Range' },
    { value: 'attacks', label: 'Attacks' },
    { value: 'strength', label: 'Strength' },
    { value: 'ap', label: 'Armor Penetration' },
    { value: 'damage', label: 'Damage' }
  ];

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

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
  };

  const sortedWeapons = useMemo(() => {
    if (!weapons.length) return weapons;

    return [...weapons].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortState.criteria) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'weaponType':
          aValue = a.weaponType.toLowerCase();
          bValue = b.weaponType.toLowerCase();
          break;
        case 'range':
          aValue = a.range || 0;
          bValue = b.range || 0;
          break;
        case 'attacks':
          // Convert attacks to number for sorting (handle dice notation)
          aValue = typeof a.attacks === 'string' ? parseInt(a.attacks) || 0 : a.attacks;
          bValue = typeof b.attacks === 'string' ? parseInt(b.attacks) || 0 : b.attacks;
          break;
        case 'strength':
          aValue = a.strength;
          bValue = b.strength;
          break;
        case 'ap':
          aValue = a.ap;
          bValue = b.ap;
          break;
        case 'damage':
          aValue = a.damage;
          bValue = b.damage;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [weapons, sortState]);

  return (
    <div className="weapons-page">
      <div className="page-header page-header-fade">
        <h1>Weapons</h1>
        <p>Search and explore Warhammer 40K weapons with detailed stats and abilities.</p>
      </div>

      <div className="search-section search-section-fade">
        <SearchFilters
          type="weapons"
          onSearch={handleSearch}
          onClear={handleClearSearch}
          loading={loading}
        />
      </div>

      {error && (
        <div className="error-message content-fade-in">
          <p>{error}</p>
          <button onClick={handleClearSearch} className="btn btn-secondary">
            Clear Search
          </button>
        </div>
      )}

      {loading && <LoadingSpinner />}

      {!loading && hasSearched && weapons.length === 0 && !error && (
        <div className="no-results content-fade-in">
          <h3>No weapons found</h3>
          <p>Try adjusting your search criteria or clearing the filters.</p>
          <button onClick={handleClearSearch} className="btn btn-primary">
            Clear Search
          </button>
        </div>
      )}

      {!loading && weapons.length > 0 && (
        <div className="results-section results-fade-in">
          <div className="results-header">
            <div className="results-title">
              <h2>Search Results</h2>
              <p className="results-count">
                Found {weapons.length} weapon{weapons.length !== 1 ? 's' : ''}
              </p>
            </div>
            <SortComponent
              sortOptions={sortOptions}
              onSortChange={handleSortChange}
              currentSort={sortState}
            />
          </div>
          
          <div className="weapons-grid">
            {sortedWeapons.map((weapon) => (
              <div key={weapon.id} className="grid-item-fade-in">
                <WeaponCard weapon={weapon} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="search-prompt content-fade-in-delayed">
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

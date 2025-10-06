import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { unitApi } from '../services/api';
import type { Unit, UnitSearchParams } from '../types';
import UnitCard from '../components/UnitCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import SortComponent, { type SortState, type SortOption } from '../components/SortComponent';
import EasterEggModal from '../components/EasterEggModal';
import './Units.css';

const LEGENDS_PREFERENCE_KEY = 'grimdarkly-show-legends';

const Units = () => {
  const [searchParams] = useSearchParams();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortState, setSortState] = useState<SortState>({ criteria: 'name', direction: 'asc' });
  const [showLegends, setShowLegends] = useState(() => {
    // Load preference from localStorage, default to true if not set
    const saved = localStorage.getItem(LEGENDS_PREFERENCE_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // Easter egg modal state
  const [easterEggModal, setEasterEggModal] = useState<{
    isOpen: boolean;
    searchTerm: string;
  }>({ isOpen: false, searchTerm: '' });

  const sortOptions: SortOption[] = [
    { value: 'name', label: 'Name (default)' },
    { value: 'toughness', label: 'Toughness' },
    { value: 'wounds', label: 'Wounds' },
    { value: 'movement', label: 'Movement' },
    { value: 'save', label: 'Save' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'oc', label: 'Objective Control' }
  ];

  // Save showLegends preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LEGENDS_PREFERENCE_KEY, JSON.stringify(showLegends));
  }, [showLegends]);

  // Handle URL parameters and auto-trigger search
  useEffect(() => {
    const faction = searchParams.get('faction');
    const name = searchParams.get('name');
    const unitType = searchParams.get('unitType') as 'CHARACTER' | 'BATTLELINE' | 'OTHER' | null;
    const keyword = searchParams.get('keyword');
    const minToughness = searchParams.get('minToughness');
    const maxToughness = searchParams.get('maxToughness');
    const minWounds = searchParams.get('minWounds');
    const maxWounds = searchParams.get('maxWounds');
    const minMovement = searchParams.get('minMovement');
    const maxMovement = searchParams.get('maxMovement');

    // Build search parameters from URL
    const urlSearchParams: UnitSearchParams = {};
    
    if (faction) urlSearchParams.faction = faction;
    if (name) urlSearchParams.name = name;
    if (unitType) urlSearchParams.unitType = unitType;
    if (keyword) urlSearchParams.keyword = keyword;
    if (minToughness) urlSearchParams.minToughness = parseInt(minToughness, 10);
    if (maxToughness) urlSearchParams.maxToughness = parseInt(maxToughness, 10);
    if (minWounds) urlSearchParams.minWounds = parseInt(minWounds, 10);
    if (maxWounds) urlSearchParams.maxWounds = parseInt(maxWounds, 10);
    if (minMovement) urlSearchParams.minMovement = parseInt(minMovement, 10);
    if (maxMovement) urlSearchParams.maxMovement = parseInt(maxMovement, 10);

    // Auto-trigger search if any parameters are present
    const hasSearchParams = Object.keys(urlSearchParams).length > 0;
    if (hasSearchParams) {
      handleSearch(urlSearchParams);
    }
  }, [searchParams]);

  // Build initial values for SearchFilters from URL parameters
  const getInitialSearchValues = (): UnitSearchParams => {
    const faction = searchParams.get('faction');
    const name = searchParams.get('name');
    const unitType = searchParams.get('unitType') as 'CHARACTER' | 'BATTLELINE' | 'OTHER' | null;
    const keyword = searchParams.get('keyword');
    const minToughness = searchParams.get('minToughness');
    const maxToughness = searchParams.get('maxToughness');
    const minWounds = searchParams.get('minWounds');
    const maxWounds = searchParams.get('maxWounds');
    const minMovement = searchParams.get('minMovement');
    const maxMovement = searchParams.get('maxMovement');

    const initialValues: UnitSearchParams = {};
    
    if (faction) initialValues.faction = faction;
    if (name) initialValues.name = name;
    if (unitType) initialValues.unitType = unitType;
    if (keyword) initialValues.keyword = keyword;
    if (minToughness) initialValues.minToughness = parseInt(minToughness, 10);
    if (maxToughness) initialValues.maxToughness = parseInt(maxToughness, 10);
    if (minWounds) initialValues.minWounds = parseInt(minWounds, 10);
    if (maxWounds) initialValues.maxWounds = parseInt(maxWounds, 10);
    if (minMovement) initialValues.minMovement = parseInt(minMovement, 10);
    if (maxMovement) initialValues.maxMovement = parseInt(maxMovement, 10);

    return initialValues;
  };

  const handleSearch = async (params: UnitSearchParams) => {
    setLoading(true);
    setError(null);
    
    // Check for easter egg names in the search
    const searchName = params.name?.toLowerCase() || '';
    if (searchName.includes('bruce dickinson') || searchName.includes('will ferrell') || searchName.includes('christopher walken') || searchName.includes('cowbell') || searchName.includes('more cowbell')) {
      setEasterEggModal({
        isOpen: true,
        searchTerm: params.name || ''
      });
      setLoading(false);
      return;
    }
    
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

  const handleCloseEasterEggModal = () => {
    setEasterEggModal({ isOpen: false, searchTerm: '' });
  };

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
  };

  const sortedUnits = useMemo(() => {
    if (!units.length) return units;

    // Filter out Legends units if showLegends is false
    const filteredUnits = showLegends ? units : units.filter(unit => !unit.isLegends);

    return [...filteredUnits].sort((a, b) => {
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
  }, [units, sortState, showLegends]);

  return (
    <div className="units-page">
      <div className="page-header page-header-fade">
        <h1>Units</h1>
        <p>Search and explore Warhammer 40K units with detailed stats and abilities.</p>
      </div>

      <div className="search-section search-section-fade">
        <SearchFilters
          type="units"
          onSearch={handleSearch}
          onClear={handleClearSearch}
          loading={loading}
          initialValues={getInitialSearchValues()}
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

      {!loading && hasSearched && units.length === 0 && !error && (
        <div className="no-results content-fade-in">
          <h3>No units found</h3>
          <p>Try adjusting your search criteria or clearing the filters.</p>
          <button onClick={handleClearSearch} className="btn btn-primary">
            Clear Search
          </button>
        </div>
      )}

      {!loading && units.length > 0 && (
        <div className="results-section results-fade-in">
          <div className="results-header">
            <div className="results-title">
              <h2>Search Results</h2>
              <p className="results-count">
                Found {sortedUnits.length} unit{sortedUnits.length !== 1 ? 's' : ''}
                {!showLegends && units.length > sortedUnits.length && (
                  <span className="filtered-count">
                    {' '}({units.length - sortedUnits.length} Legends hidden)
                  </span>
                )}
              </p>
            </div>
            <div className="results-controls">
              <div className="legends-toggle">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showLegends}
                    onChange={(e) => setShowLegends(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Show Legends?</span>
                </label>
              </div>
              <SortComponent
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
                currentSort={sortState}
              />
            </div>
          </div>
          
          <div className="units-grid">
            {sortedUnits.map((unit) => (
              <div key={unit.id} className="grid-item-fade-in">
                <UnitCard unit={unit} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasSearched && !loading && (
        <div className="search-prompt content-fade-in-delayed">
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

      {/* Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggModal.isOpen}
        onClose={handleCloseEasterEggModal}
        searchTerm={easterEggModal.searchTerm}
      />
    </div>
  );
};

export default Units;

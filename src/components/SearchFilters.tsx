import { useState } from 'react';
import type { UnitSearchParams, WeaponSearchParams } from '../types';
import MultiKeywordInput from './MultiKeywordInput';
import './SearchFilters.css';

interface SearchFiltersProps {
  type: 'units' | 'weapons';
  onSearch: (params: UnitSearchParams | WeaponSearchParams) => void;
  onClear: () => void;
  loading: boolean;
}

const SearchFilters = ({ type, onSearch, onClear, loading }: SearchFiltersProps) => {
  const [unitFilters, setUnitFilters] = useState<UnitSearchParams>({});
  const [weaponFilters, setWeaponFilters] = useState<WeaponSearchParams>({});
  const [appliedKeywords, setAppliedKeywords] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | number | undefined) => {
    if (type === 'units') {
      setUnitFilters(prev => ({
        ...prev,
        [field]: value || undefined
      }));
    } else {
      setWeaponFilters(prev => ({
        ...prev,
        [field]: value || undefined
      }));
    }
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setAppliedKeywords(keywords);
    if (type === 'units') {
      setUnitFilters(prev => ({
        ...prev,
        keywords: keywords,
        keyword: keywords.length > 0 ? keywords.join(',') : undefined
      }));
    }
  };

  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
    if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: minus sign (for negative numbers)
        (e.keyCode === 189 || e.keyCode === 109) ||
        // Allow: numbers 0-9
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        // Allow: numpad numbers 0-9
        (e.keyCode >= 96 && e.keyCode <= 105)) {
      return;
    }
    // Prevent all other keys
    e.preventDefault();
  };

  const executeSearch = () => {
    if (isSubmitting || loading) return;
    
    setIsSubmitting(true);
    if (type === 'units') {
      onSearch(unitFilters);
    } else {
      onSearch(weaponFilters);
    }
    
    // Reset the flag after a short delay
    setTimeout(() => setIsSubmitting(false), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasActiveFilters && !loading && !isSubmitting) {
      e.preventDefault();
      e.stopPropagation();
      executeSearch();
    }
  };

  const handleClear = () => {
    setUnitFilters({});
    setWeaponFilters({});
    setAppliedKeywords([]);
    onClear();
  };

  const currentFilters = type === 'units' ? unitFilters : weaponFilters;
  const hasActiveFilters = Object.values(currentFilters).some(value => 
    value !== undefined && value !== '' && value !== null && value !== 0
  ) || appliedKeywords.length > 0;

  if (type === 'units') {
    return (
      <form className="search-filters" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="filters-header">
          <h3>Search Units</h3>
          <div className="filters-actions">
            <button 
              type="button" 
              onClick={handleClear}
              className="btn btn-secondary"
              disabled={loading || !hasActiveFilters}
            >
              Clear
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !hasActiveFilters}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="unit-name">Unit Name</label>
            <input
              type="text"
              id="unit-name"
              placeholder="e.g. Space Marine, Intercessor"
              value={unitFilters.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="faction">Faction</label>
            <input
              type="text"
              id="faction"
              placeholder="e.g. Dark Angels, World Eaters"
              value={unitFilters.faction || ''}
              onChange={(e) => handleInputChange('faction', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="unitType">Unit Type</label>
            <select
              id="unitType"
              value={unitFilters.unitType || ''}
              onChange={(e) => handleInputChange('unitType', e.target.value || undefined)}
            >
              <option value="">Any Type</option>
              <option value="CHARACTER">Character</option>
              <option value="BATTLELINE">Battleline</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="keywords">Keywords</label>
            <MultiKeywordInput
              appliedKeywords={appliedKeywords}
              onKeywordsChange={handleKeywordsChange}
              placeholder="e.g. Infantry, Vehicle"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minToughness">Min Toughness</label>
            <input
              type="number"
              id="minToughness"
              min="1"
              max="10"
              value={unitFilters.minToughness || ''}
              onChange={(e) => handleInputChange('minToughness', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxToughness">Max Toughness</label>
            <input
              type="number"
              id="maxToughness"
              min="1"
              max="10"
              value={unitFilters.maxToughness || ''}
              onChange={(e) => handleInputChange('maxToughness', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minWounds">Min Wounds</label>
            <input
              type="number"
              id="minWounds"
              min="1"
              value={unitFilters.minWounds || ''}
              onChange={(e) => handleInputChange('minWounds', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxWounds">Max Wounds</label>
            <input
              type="number"
              id="maxWounds"
              min="1"
              value={unitFilters.maxWounds || ''}
              onChange={(e) => handleInputChange('maxWounds', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minMovement">Min Movement (inches)</label>
            <input
              type="number"
              id="minMovement"
              min="0"
              max="20"
              value={unitFilters.minMovement || ''}
              onChange={(e) => handleInputChange('minMovement', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxMovement">Max Movement (inches)</label>
            <input
              type="number"
              id="maxMovement"
              min="0"
              max="20"
              value={unitFilters.maxMovement || ''}
              onChange={(e) => handleInputChange('maxMovement', e.target.value ? parseInt(e.target.value) : undefined)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="active-filters">
            <h4>Active Filters:</h4>
            <div className="active-filter-tags">
            {Object.entries(currentFilters).map(([key, value]) => {
              if (value === undefined || value === '' || value === null) return null;
              return (
                <span key={key} className="active-filter-tag">
                  {key}: {String(value)}
                </span>
              );
            })}
            </div>
          </div>
        )}
      </form>
    );
  }

  // Weapons filters
  return (
    <form className="search-filters" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="filters-header">
        <h3>Search Weapons</h3>
        <div className="filters-actions">
          <button 
            type="button" 
            onClick={handleClear}
            className="btn btn-secondary"
            disabled={loading || !hasActiveFilters}
          >
            Clear
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !hasActiveFilters}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Storm Bolter, Chainsword"
            value={weaponFilters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="weaponType">Weapon Type</label>
          <select
            id="weaponType"
            value={weaponFilters.weaponType || ''}
            onChange={(e) => handleInputChange('weaponType', e.target.value || undefined)}
          >
            <option value="">Any Type</option>
            <option value="MELEE">Melee</option>
            <option value="RANGED">Ranged</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minRange">Min Range</label>
          <input
            type="number"
            id="minRange"
            min="0"
            value={weaponFilters.minRange || ''}
            onChange={(e) => handleInputChange('minRange', e.target.value ? parseInt(e.target.value) : undefined)}
            onKeyDown={handleNumberKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxRange">Max Range</label>
          <input
            type="number"
            id="maxRange"
            min="0"
            value={weaponFilters.maxRange || ''}
            onChange={(e) => handleInputChange('maxRange', e.target.value ? parseInt(e.target.value) : undefined)}
            onKeyDown={handleNumberKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="ap">Armor Penetration</label>
          <input
            type="number"
            id="ap"
            placeholder="e.g. -1, -2"
            value={weaponFilters.ap || ''}
            onChange={(e) => handleInputChange('ap', e.target.value ? parseInt(e.target.value) : undefined)}
            onKeyDown={handleNumberKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="attacks">Attacks</label>
          <input
            type="text"
            id="attacks"
            placeholder="e.g. 2, D6, D3+1"
            value={weaponFilters.attacks || ''}
            onChange={(e) => handleInputChange('attacks', e.target.value)}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <h4>Active Filters:</h4>
          <div className="active-filter-tags">
            {Object.entries(currentFilters).map(([key, value]) => {
              if (value === undefined || value === '' || value === null) return null;
              return (
                <span key={key} className="active-filter-tag">
                  {key}: {value}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchFilters;

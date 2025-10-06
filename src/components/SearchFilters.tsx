import { useState } from 'react';
import type { UnitSearchParams, WeaponSearchParams } from '../types';
import MultiKeywordInput from './MultiKeywordInput';
import './SearchFilters.css';

interface SearchFiltersProps {
  type: 'units' | 'weapons';
  onSearch: (params: UnitSearchParams | WeaponSearchParams) => void;
  onClear: () => void;
  loading: boolean;
  initialValues?: UnitSearchParams | WeaponSearchParams;
}

const SearchFilters = ({ type, onSearch, onClear, loading, initialValues }: SearchFiltersProps) => {
  const [unitFilters, setUnitFilters] = useState<UnitSearchParams>(() => {
    if (type === 'units' && initialValues) {
      return initialValues as UnitSearchParams;
    }
    return {};
  });
  const [weaponFilters, setWeaponFilters] = useState<WeaponSearchParams>(() => {
    if (type === 'weapons' && initialValues) {
      return initialValues as WeaponSearchParams;
    }
    return {};
  });
  const [appliedKeywords, setAppliedKeywords] = useState<string[]>(() => {
    if (initialValues && 'keyword' in initialValues && initialValues.keyword) {
      return initialValues.keyword.split(',').map(k => k.trim()).filter(k => k.length > 0);
    }
    return [];
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | number | undefined) => {
    // Handle empty strings and null values as undefined, but preserve 0 and false
    const processedValue = value === '' || value === null ? undefined : value;
    
    if (type === 'units') {
      setUnitFilters(prev => ({
        ...prev,
        [field]: processedValue
      }));
    } else {
      setWeaponFilters(prev => ({
        ...prev,
        [field]: processedValue
      }));
    }
  };

  const handleNumberInputChange = (field: string, value: string) => {
    // For number inputs, convert empty string to undefined, but preserve 0
    const numValue = value === '' ? undefined : parseInt(value, 10);
    handleInputChange(field, numValue);
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setAppliedKeywords(keywords);
    if (type === 'units') {
      setUnitFilters(prev => ({
        ...prev,
        keyword: keywords.length > 0 ? keywords.join(',') : undefined
      }));
    } else if (type === 'weapons') {
      setWeaponFilters(prev => ({
        ...prev,
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

  const executeSearch = async () => {
    if (isSubmitting || loading) return;
    
    setIsSubmitting(true);
    try {
      if (type === 'units') {
        await onSearch(unitFilters);
      } else {
        await onSearch(weaponFilters);
      }
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Search execution error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSearch();
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasActiveFilters && !loading && !isSubmitting) {
      e.preventDefault();
      e.stopPropagation();
      await executeSearch();
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
    value !== undefined && value !== '' && value !== null
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
              placeholder="e.g. Captain, Plague Marines"
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
            <label htmlFor="keywords">Keywords (comma separated)</label>
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
              value={unitFilters.minToughness ?? ''}
              onChange={(e) => handleNumberInputChange('minToughness', e.target.value)}
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
              value={unitFilters.maxToughness ?? ''}
              onChange={(e) => handleNumberInputChange('maxToughness', e.target.value)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minWounds">Min Wounds</label>
            <input
              type="number"
              id="minWounds"
              min="1"
              value={unitFilters.minWounds ?? ''}
              onChange={(e) => handleNumberInputChange('minWounds', e.target.value)}
              onKeyDown={handleNumberKeyDown}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxWounds">Max Wounds</label>
            <input
              type="number"
              id="maxWounds"
              min="1"
              value={unitFilters.maxWounds ?? ''}
              onChange={(e) => handleNumberInputChange('maxWounds', e.target.value)}
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
              value={unitFilters.minMovement ?? ''}
              onChange={(e) => handleNumberInputChange('minMovement', e.target.value)}
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
              value={unitFilters.maxMovement ?? ''}
              onChange={(e) => handleNumberInputChange('maxMovement', e.target.value)}
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
              // Skip showing 'keyword' field if we have appliedKeywords to avoid duplication
              if (key === 'keyword' && appliedKeywords.length > 0) return null;
              return (
                <span key={key} className="active-filter-tag">
                  {key}: {String(value)}
                </span>
              );
            })}
            {appliedKeywords.length > 0 && (
              <span className="active-filter-tag">
                keywords: {appliedKeywords.join(', ')}
              </span>
            )}
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
          <label htmlFor="keywords">Keywords (comma separated)</label>
          <MultiKeywordInput
            appliedKeywords={appliedKeywords}
            onKeywordsChange={handleKeywordsChange}
            placeholder="e.g. Rapid Fire, Assault"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minRange">Min Range</label>
          <input
            type="number"
            id="minRange"
            min="0"
            value={weaponFilters.minRange ?? ''}
            onChange={(e) => handleNumberInputChange('minRange', e.target.value)}
            onKeyDown={handleNumberKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxRange">Max Range</label>
          <input
            type="number"
            id="maxRange"
            min="0"
            value={weaponFilters.maxRange ?? ''}
            onChange={(e) => handleNumberInputChange('maxRange', e.target.value)}
            onKeyDown={handleNumberKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="ap">Armor Penetration</label>
          <input
            type="number"
            id="ap"
            placeholder="e.g. -1, -2"
            value={weaponFilters.ap ?? ''}
            onChange={(e) => handleNumberInputChange('ap', e.target.value)}
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
              // Skip showing 'keyword' field if we have appliedKeywords to avoid duplication
              if (key === 'keyword' && appliedKeywords.length > 0) return null;
              return (
                <span key={key} className="active-filter-tag">
                  {key}: {value}
                </span>
              );
            })}
            {appliedKeywords.length > 0 && (
              <span className="active-filter-tag">
                keywords: {appliedKeywords.join(', ')}
              </span>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchFilters;

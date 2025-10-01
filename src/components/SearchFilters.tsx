import { useState } from 'react';
import type { UnitSearchParams, WeaponSearchParams } from '../types';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'units') {
      onSearch(unitFilters);
    } else {
      onSearch(weaponFilters);
    }
  };

  const handleClear = () => {
    setUnitFilters({});
    setWeaponFilters({});
    onClear();
  };

  const currentFilters = type === 'units' ? unitFilters : weaponFilters;
  const hasActiveFilters = Object.values(currentFilters).some(value => 
    value !== undefined && value !== '' && value !== null
  );

  if (type === 'units') {
    return (
      <form className="search-filters" onSubmit={handleSubmit}>
        <div className="filters-header">
          <h3>Search Units</h3>
          <div className="filters-actions">
            <button 
              type="button" 
              onClick={handleClear}
              className="btn btn-secondary"
              disabled={loading}
            >
              Clear
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
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
              placeholder="e.g., Space Marine, Intercessor"
              value={unitFilters.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="faction">Faction</label>
            <input
              type="text"
              id="faction"
              placeholder="e.g., Space Marines, Chaos"
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
            <label htmlFor="keyword">Keyword</label>
            <input
              type="text"
              id="keyword"
              placeholder="e.g., Infantry, Vehicle"
              value={unitFilters.keyword || ''}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
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
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minMovement">Min Movement</label>
            <input
              type="number"
              id="minMovement"
              min="0"
              max="20"
              value={unitFilters.minMovement || ''}
              onChange={(e) => handleInputChange('minMovement', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxMovement">Max Movement</label>
            <input
              type="number"
              id="maxMovement"
              min="0"
              max="20"
              value={unitFilters.maxMovement || ''}
              onChange={(e) => handleInputChange('maxMovement', e.target.value ? parseInt(e.target.value) : undefined)}
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
    <form className="search-filters" onSubmit={handleSubmit}>
      <div className="filters-header">
        <h3>Search Weapons</h3>
        <div className="filters-actions">
          <button 
            type="button" 
            onClick={handleClear}
            className="btn btn-secondary"
            disabled={loading}
          >
            Clear
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
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
            placeholder="e.g., Storm Bolter, Chainsword"
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
          />
        </div>

        <div className="filter-group">
          <label htmlFor="ap">Armor Penetration</label>
          <input
            type="number"
            id="ap"
            placeholder="e.g., -1, -2"
            value={weaponFilters.ap || ''}
            onChange={(e) => handleInputChange('ap', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="attacks">Attacks</label>
          <input
            type="text"
            id="attacks"
            placeholder="e.g., 2, D6, D3+1"
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

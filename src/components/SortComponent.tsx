import { useState } from 'react';
import './SortComponent.css';

export interface SortOption {
  value: string;
  label: string;
}

export interface SortState {
  criteria: string;
  direction: 'asc' | 'desc';
}

interface SortComponentProps {
  sortOptions: SortOption[];
  onSortChange: (sortState: SortState) => void;
  currentSort?: SortState;
}

const SortComponent = ({ sortOptions, onSortChange, currentSort }: SortComponentProps) => {
  const [sortState, setSortState] = useState<SortState>(
    currentSort || { criteria: sortOptions[0]?.value || '', direction: 'asc' }
  );

  const handleCriteriaChange = (criteria: string) => {
    const newSortState = { ...sortState, criteria };
    setSortState(newSortState);
    onSortChange(newSortState);
  };

  const handleDirectionChange = (direction: 'asc' | 'desc') => {
    const newSortState = { ...sortState, direction };
    setSortState(newSortState);
    onSortChange(newSortState);
  };

  const toggleDirection = () => {
    const newDirection = sortState.direction === 'asc' ? 'desc' : 'asc';
    handleDirectionChange(newDirection);
  };

  return (
    <div className="sort-component">
      <label htmlFor="sort-criteria" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-criteria"
        value={sortState.criteria}
        onChange={(e) => handleCriteriaChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={toggleDirection}
        className="sort-direction-btn"
        title={`Sort ${sortState.direction === 'asc' ? 'Descending' : 'Ascending'}`}
      >
        {sortState.direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SortComponent;

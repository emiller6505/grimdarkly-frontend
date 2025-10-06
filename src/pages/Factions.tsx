import { useState, useEffect } from 'react';
import { factionApi } from '../services/api';
import type { Faction } from '../types';
import FactionCard from '../components/FactionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Factions.css';

// Space Marine subfactions with their lore descriptions
const SPACE_MARINE_SUBFACTIONS = [
  {
    id: 1001,
    name: 'Blood Angels',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1002,
    name: 'Dark Angels',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1003,
    name: 'Ultramarines',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1004,
    name: 'Space Wolves',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1005,
    name: 'Iron Hands',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1006,
    name: 'White Scars',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1007,
    name: 'Raven Guard',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1008,
    name: 'Salamanders',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  },
  {
    id: 1009,
    name: 'Imperial Fists',
    category: { id: 0, name: 'Subfaction' },
    isSubfaction: true,
    parentFaction: 'Space Marines'
  }
];

const Factions = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFactions = async () => {
      try {
        const response = await factionApi.getAll();
        setFactions(response.data);
      } catch (err) {
        setError('Failed to load factions. Please try again.');
        console.error('Factions fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFactions();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading factions..." />;
  }

  if (error) {
    return (
      <div className="factions-page">
        <div className="page-header">
          <h1>Factions</h1>
          <p>Explore the major factions of Warhammer 40K</p>
        </div>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Combine main factions with Space Marine subfactions
  const allFactions = [...factions, ...SPACE_MARINE_SUBFACTIONS];
  
  // Sort factions alphabetically by name
  const sortedFactions = allFactions.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="factions-page">
      <div className="page-header">
        <h1>Factions</h1>
        <p>Explore the major factions of Warhammer 40K and their unique characteristics</p>
      </div>

      <div className="factions-summary">
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-number">{factions.length}</span>
            <span className="stat-label">Factions</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">{SPACE_MARINE_SUBFACTIONS.length}</span>
            <span className="stat-label">Subfactions</span>
          </div>
        </div>
      </div>

      <div className="factions-content">
        <div className="factions-grid">
          {sortedFactions.map((faction) => (
            <FactionCard key={faction.id} faction={faction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Factions;

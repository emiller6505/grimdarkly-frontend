import { useState, useEffect } from 'react';
import { factionApi } from '../services/api';
import type { Faction } from '../types';
import FactionCard from '../components/FactionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Factions.css';

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

  // Group factions by category
  const factionsByCategory = factions.reduce((acc, faction) => {
    const category = faction.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faction);
    return acc;
  }, {} as Record<string, Faction[]>);

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
            <span className="stat-label">Total Factions</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">{Object.keys(factionsByCategory).length}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="factions-content">
        {Object.entries(factionsByCategory).map(([category, categoryFactions]) => (
          <div key={category} className="faction-category">
            <h2 className="category-title">{category}</h2>
            <div className="factions-grid">
              {categoryFactions.map((faction) => (
                <FactionCard key={faction.id} faction={faction} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Factions;

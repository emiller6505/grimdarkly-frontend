import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { weaponApi } from '../services/api';
import type { Weapon } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import './WeaponDetail.css';

const WeaponDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<string>('all');

  useEffect(() => {
    const fetchWeapon = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await weaponApi.getById(parseInt(id));
        setWeapon(response.data);
      } catch (err) {
        setError('Failed to load weapon details. Please try again.');
        console.error('Weapon fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeapon();
  }, [id]);

  const getWeaponTypeColor = (weaponType: string) => {
    switch (weaponType) {
      case 'MELEE':
        return 'badge-melee';
      case 'RANGED':
        return 'badge-primary';
      default:
        return '';
    }
  };

  const formatStat = (value: number | string | undefined) => {
    if (value === undefined || value === null) return '-';
    return value.toString();
  };

  const formatAP = (ap: number) => {
    if (ap === 0) return '0';
    if (ap > 0) return `+${ap}`;
    return ap.toString();
  };

  // Get unique factions from weapon units
  const uniqueFactions = useMemo(() => {
    if (!weapon) return [];
    const factions = weapon.units.map(unit => unit.faction);
    return Array.from(new Set(factions)).sort();
  }, [weapon]);

  // Filter units based on selected faction
  const filteredUnits = useMemo(() => {
    if (!weapon) return [];
    if (selectedFaction === 'all') return weapon.units;
    return weapon.units.filter(unit => unit.faction === selectedFaction);
  }, [weapon, selectedFaction]);

  if (loading) {
    return (
      <div className="weapon-detail">
        <div className="detail-loading">
          <LoadingSpinner text="Loading weapon details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weapon-detail">
        <div className="detail-error">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/weapons" className="btn btn-primary">
            Back to Weapons
          </Link>
        </div>
      </div>
    );
  }

  if (!weapon) {
    return (
      <div className="weapon-detail">
        <div className="detail-error">
          <h2>Weapon Not Found</h2>
          <p>The requested weapon could not be found.</p>
          <Link to="/weapons" className="btn btn-primary">
            Back to Weapons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="weapon-detail">
      <div className="weapon-detail-header">
        <div className="breadcrumb">
          <Link to="/weapons" className="breadcrumb-link">Weapons</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{weapon.name}</span>
        </div>
        
        <div className="weapon-title-section">
          <h1 className="weapon-title">{weapon.name}</h1>
          <div className="weapon-badges">
            <span className={`badge ${getWeaponTypeColor(weapon.weaponType)}`}>
              {weapon.weaponType}
            </span>
          </div>
        </div>
      </div>

      <div className="weapon-detail-content">
        <div className="weapon-stats-section">
          <h2>Weapon Statistics</h2>
          <div className="weapon-stats-grid">
            {weapon.weaponType === 'RANGED' && (
              <div className="weapon-stat-card">
                <div className="weapon-stat-label">Range</div>
                <div className="weapon-stat-value">{formatStat(weapon.range)}"</div>
              </div>
            )}
            <div className="weapon-stat-card">
              <div className="weapon-stat-label">Attacks</div>
              <div className="weapon-stat-value">{weapon.attacks}</div>
            </div>
            {weapon.weaponType === 'MELEE' && (
              <div className="weapon-stat-card">
                <div className="weapon-stat-label">Weapon Skill</div>
                <div className="weapon-stat-value">{formatStat(weapon.skill)}+</div>
              </div>
            )}
            <div className="weapon-stat-card">
              <div className="weapon-stat-label">Strength</div>
              <div className="weapon-stat-value">{weapon.strength}</div>
            </div>
            <div className="weapon-stat-card">
              <div className="weapon-stat-label">Armor Penetration</div>
              <div className="weapon-stat-value">{formatAP(weapon.ap)}</div>
            </div>
            <div className="weapon-stat-card">
              <div className="weapon-stat-label">Damage</div>
              <div className="weapon-stat-value">{weapon.damage}</div>
            </div>
          </div>
        </div>

        {weapon.abilities.length > 0 && (
          <div className="weapon-abilities-section">
            <h2>Weapon Abilities ({weapon.abilities.length})</h2>
            <div className="weapon-abilities-list">
              {weapon.abilities.map((abilityValue, index) => (
                <div key={index} className="weapon-ability-card">
                  <div className="weapon-ability-header">
                    <h3 className="weapon-ability-name">{abilityValue.name}</h3>
                    {abilityValue.value && (
                      <span className="weapon-ability-value">({abilityValue.value})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {weapon.units.length > 0 && (
          <div className="weapon-units-section">
            <div className="weapon-units-header">
              <div className="weapon-units-title-section">
                <h2>Used by {weapon.units.length} units from {uniqueFactions.length} factions</h2>
                {selectedFaction !== 'all' && (
                  <p className="faction-filter-helper">
                    Showing only units for {selectedFaction}
                  </p>
                )}
              </div>
              {uniqueFactions.length > 1 && (
                <div className="faction-filter">
                  <label htmlFor="faction-filter" className="faction-filter-label">
                    Filter by Faction:
                  </label>
                  <select
                    id="faction-filter"
                    value={selectedFaction}
                    onChange={(e) => setSelectedFaction(e.target.value)}
                    className="faction-filter-select"
                  >
                    <option value="all">All Factions</option>
                    {uniqueFactions.map((faction) => {
                      const count = weapon.units.filter(unit => unit.faction === faction).length;
                      return (
                        <option key={faction} value={faction}>
                          {faction} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
            <div className="weapon-units-grid">
              {filteredUnits
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((unit) => (
                  <div key={unit.id} className="weapon-unit-card">
                    <h3 className="weapon-unit-name">
                      <Link to={`/units/${unit.id}`}>{unit.name}</Link>
                    </h3>
                    <p className="weapon-unit-faction">{unit.faction}</p>
                  </div>
                ))}
            </div>
            {filteredUnits.length === 0 && selectedFaction !== 'all' && (
              <div className="no-units-message">
                <p>No units found for the selected faction.</p>
                <button 
                  onClick={() => setSelectedFaction('all')}
                  className="btn btn-secondary"
                >
                  Show All Units
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="weapon-detail-footer">
        <Link to="/weapons" className="btn btn-secondary">
          Back to Weapons
        </Link>
        <Link to={`/weapons?weaponType=${weapon.weaponType}`} className="btn btn-primary">
          View More {weapon.weaponType} Weapons
        </Link>
      </div>
    </div>
  );
};

export default WeaponDetail;

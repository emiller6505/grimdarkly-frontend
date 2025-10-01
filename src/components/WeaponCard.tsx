import { Link } from 'react-router-dom';
import type { Weapon } from '../types';
import './WeaponCard.css';

interface WeaponCardProps {
  weapon: Weapon;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
  const getWeaponTypeColor = (weaponType: string) => {
    switch (weaponType) {
      case 'MELEE':
        return 'badge-danger';
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

  return (
    <div className="weapon-card">
      <div className="weapon-header">
        <h3 className="weapon-name">
          <Link to={`/weapons/${weapon.id}`}>{weapon.name}</Link>
        </h3>
        <div className="weapon-badges">
          <span className={`badge ${getWeaponTypeColor(weapon.weaponType)}`}>
            {weapon.weaponType}
          </span>
        </div>
      </div>

      <div className="weapon-stats">
        <div className="stat-grid">
          {weapon.weaponType === 'RANGED' && (
            <div className="stat-item">
              <span className="stat-label">Range</span>
              <span className="stat-value">{formatStat(weapon.range)}"</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-label">A</span>
            <span className="stat-value">{weapon.attacks}</span>
          </div>
          {weapon.weaponType === 'MELEE' && (
            <div className="stat-item">
              <span className="stat-label">WS</span>
              <span className="stat-value">{formatStat(weapon.skill)}+</span>
            </div>
          )}
          <div className="stat-item">
            <span className="stat-label">S</span>
            <span className="stat-value">{weapon.strength}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">AP</span>
            <span className="stat-value">{formatAP(weapon.ap)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">D</span>
            <span className="stat-value">{weapon.damage}</span>
          </div>
        </div>
      </div>

      {weapon.abilities.length > 0 && (
        <div className="weapon-abilities">
          <h4>Abilities ({weapon.abilities.length})</h4>
          <div className="abilities-list">
            {weapon.abilities.slice(0, 3).map((abilityValue, index) => (
              <div key={index} className="ability-item">
                <span className="ability-name">{abilityValue.ability.name}</span>
                {abilityValue.value && (
                  <span className="ability-value">({abilityValue.value})</span>
                )}
              </div>
            ))}
            {weapon.abilities.length > 3 && (
              <div className="ability-item more">
                +{weapon.abilities.length - 3} more abilities
              </div>
            )}
          </div>
        </div>
      )}

      {weapon.units.length > 0 && (
        <div className="weapon-units">
          <h4>Used by ({weapon.units.length} units)</h4>
          <div className="units-list">
            {weapon.units.slice(0, 3).map((unit) => (
              <span key={unit.id} className="unit-tag">
                {unit.name}
              </span>
            ))}
            {weapon.units.length > 3 && (
              <span className="unit-tag more">
                +{weapon.units.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="weapon-footer">
        <Link to={`/weapons/${weapon.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WeaponCard;

import { Link } from 'react-router-dom';
import type { Weapon } from '../types';
import TagList from './TagList';
import './WeaponCard.css';
import '../styles/tags.css';

interface WeaponCardProps {
  weapon: Weapon;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
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
        <table className="weapon-stats-table">
          <thead>
            <tr>
              {weapon.weaponType === 'RANGED' && <th>Range</th>}
              <th>A</th>
              {weapon.weaponType === 'MELEE' && <th>WS</th>}
              <th>S</th>
              <th>AP</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {weapon.weaponType === 'RANGED' && (
                <td>{formatStat(weapon.range)}"</td>
              )}
              <td>{weapon.attacks}</td>
              {weapon.weaponType === 'MELEE' && (
                <td>{formatStat(weapon.skill)}+</td>
              )}
              <td>{weapon.strength}</td>
              <td>{formatAP(weapon.ap)}</td>
              <td>{weapon.damage}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {weapon.abilities.length > 0 && (
        <div className="weapon-abilities">
          <TagList
            title={`Abilities (${weapon.abilities.length})`}
            items={weapon.abilities.map(ability => ({
              name: ability.name,
              value: ability.value
            }))}
            variant="ability"
            maxVisible={3}
          />
        </div>
      )}

      {weapon.units.length > 0 && (
        <div className="weapon-units">
          <TagList
            title={`Used by (${weapon.units.length} units)`}
            items={weapon.units.map(unit => ({
              id: unit.id,
              name: unit.name
            }))}
            variant="weapon"
            maxVisible={3}
          />
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

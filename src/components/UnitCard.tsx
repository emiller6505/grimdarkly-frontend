import { Link } from 'react-router-dom';
import type { Unit } from '../types';
import './UnitCard.css';

interface UnitCardProps {
  unit: Unit;
}

const UnitCard = ({ unit }: UnitCardProps) => {
  const getUnitTypeColor = (unitType: string) => {
    switch (unitType) {
      case 'CHARACTER':
        return 'badge-secondary';
      case 'BATTLELINE':
        return 'badge-secondary';
      default:
        return '';
    }
  };

  const formatStat = (value: number | string | undefined) => {
    if (value === undefined || value === null) return '-';
    return value.toString();
  };

  return (
    <div className="unit-card">
      <div className="unit-header">
        <h3 className="unit-name">
          <Link to={`/units/${unit.id}`}>{unit.name}</Link>
        </h3>
        <div className="unit-badges">
          <span className={`badge ${getUnitTypeColor(unit.unitType)}`}>
            {unit.unitType.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="unit-faction">
        <span className="faction-name">Faction: {unit.faction.name}</span>
      </div>

      <div className="unit-stats">
        <table className="unit-stats-table">
          <thead>
            <tr>
              <th>M</th>
              <th>T</th>
              <th>Sv</th>
              <th>W</th>
              <th>Ld</th>
              <th>OC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatStat(unit.movement)}"</td>
              <td>{unit.toughness}</td>
              <td>{unit.save}+</td>
              <td>{unit.wounds}</td>
              <td>{unit.leadership}</td>
              <td>{unit.oc}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {unit.weapons.length > 0 && (
        <div className="unit-weapons">
          <h4>Weapons ({unit.weapons.length})</h4>
          <div className="weapons-list">
            {unit.weapons.slice(0, 3).map((weapon) => (
              <span key={weapon.id} className="weapon-tag">
                {weapon.name}
              </span>
            ))}
            {unit.weapons.length > 3 && (
              <span className="weapon-tag more">
                +{unit.weapons.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {unit.keywords.length > 0 && (
        <div className="unit-keywords">
          <h4>Keywords</h4>
          <div className="keywords-list">
            {unit.keywords.slice(0, 4).map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
            {unit.keywords.length > 4 && (
              <span className="keyword-tag more">
                +{unit.keywords.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {unit.configurations.length > 0 && (
        <div className="unit-configurations">
          <h4>Configurations</h4>
          <div className="configurations-list">
            {unit.configurations.slice(0, 2).map((config) => (
              <div key={config.id} className="configuration-item">
                <span className="config-description">{config.description}</span>
                <span className="config-points">{config.points}pts</span>
              </div>
            ))}
            {unit.configurations.length > 2 && (
              <div className="configuration-item more">
                +{unit.configurations.length - 2} more configurations
              </div>
            )}
          </div>
        </div>
      )}

      <div className="unit-footer">
        <Link to={`/units/${unit.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UnitCard;

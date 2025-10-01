import { Link } from 'react-router-dom';
import type { Faction } from '../types';
import './FactionCard.css';

interface FactionCardProps {
  faction: Faction;
}

const FactionCard = ({ faction }: FactionCardProps) => {
  const getCategoryColor = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'imperium':
        return 'category-imperium';
      case 'chaos':
        return 'category-chaos';
      case 'xenos':
        return 'category-xenos';
      case 'aeldari':
        return 'category-aeldari';
      case 'tyranids':
        return 'category-tyranids';
      case 'necrons':
        return 'category-necrons';
      case 'orks':
        return 'category-orks';
      case 'tau empire':
        return 'category-tau';
      default:
        return 'category-default';
    }
  };

  return (
    <div className="faction-card">
      <div className="faction-header">
        <h3 className="faction-name">{faction.name}</h3>
        <div className="faction-badges">
          <span className={`badge category-badge ${getCategoryColor(faction.category.name)}`}>
            {faction.category.name}
          </span>
        </div>
      </div>

      <div className="faction-content">
        <div className="faction-info">
          <p className="faction-description">
            Explore units, weapons, and abilities for the {faction.name} faction.
          </p>
        </div>

        <div className="faction-actions">
          <Link 
            to={`/units?faction=${encodeURIComponent(faction.name)}`}
            className="btn btn-primary"
          >
            View Units
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FactionCard;

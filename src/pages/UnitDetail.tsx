import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { unitApi } from '../services/api';
import type { Unit } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import CollapsibleText from '../components/CollapsibleText';
import './UnitDetail.css';

const UnitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnit = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await unitApi.getById(parseInt(id));
        setUnit(response.data);
      } catch (err) {
        setError('Failed to load unit details. Please try again.');
        console.error('Unit fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [id]);


  const formatStat = (value: number | string | undefined) => {
    if (value === undefined || value === null) return '-';
    return value.toString();
  };

  if (loading) {
    return (
      <div className="unit-detail">
        <div className="detail-loading">
          <LoadingSpinner text="Loading unit details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="unit-detail">
        <div className="detail-error">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/units" className="btn btn-primary">
            Back to Units
          </Link>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="unit-detail">
        <div className="error-message">
          <h2>Unit Not Found</h2>
          <p>The requested unit could not be found.</p>
          <Link to="/units" className="btn btn-primary">
            Back to Units
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="unit-detail">
      <div className="unit-detail-header">
        <div className="breadcrumb">
          <Link to="/units" className="breadcrumb-link">Units</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{unit.name}</span>
        </div>

        <div className="unit-title-section">
          <h1 className="unit-title">{unit.name}</h1>
          <div className="unit-badges">
            {(unit.unitType === 'CHARACTER' || unit.unitType === 'BATTLELINE') && (
              <span className="badge">
                {unit.unitType.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>

        <div className="unit-faction-info">
          <div className="unit-faction-breadcrumb">
            <span className="unit-faction-category">{unit.faction.category.name}</span>
            <span className="unit-faction-arrow"> › </span>
            <span className="unit-faction-name">{unit.faction.name}</span>
            {(() => {
              // Find sub-faction keyword using metadata
              const subFaction = unit.keywords.find(keyword => keyword.isSubFaction);

              return subFaction ? (
                <>
                  <span className="unit-faction-arrow"> › </span>
                  <span className="unit-faction-subfaction">{subFaction.name}</span>
                </>
              ) : null;
            })()}
          </div>
        </div>
      </div>

      <div className="unit-detail-content">
        <div className="unit-stats-section">
          <h2>Combat Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Movement</div>
              <div className="stat-value">{formatStat(unit.movement)}"</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Toughness</div>
              <div className="stat-value">{unit.toughness}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Save</div>
              <div className="stat-value">{unit.save}+</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Wounds</div>
              <div className="stat-value">{unit.wounds}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Leadership</div>
              <div className="stat-value">{unit.leadership}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Objective Control</div>
              <div className="stat-value">{unit.oc}</div>
            </div>
          </div>
        </div>

        {unit.weapons.length > 0 && (
          <div className="unit-weapons-section">
            <h2>Weapons ({unit.weapons.length})</h2>
            <div className="weapons-table-container">
              <table className="weapons-table">
                <thead>
                  <tr>
                    <th>Weapon</th>
                    <th>
                      <span className="header-full">Type</span>
                      <span className="header-mobile">Type</span>
                    </th>
                    <th>
                      <span className="header-full">Range</span>
                      <span className="header-mobile">R</span>
                    </th>
                    <th>
                      <span className="header-full">Attacks</span>
                      <span className="header-mobile">A</span>
                    </th>
                    <th>
                      <span className="header-full">Skill</span>
                      <span className="header-mobile">BS/WS</span>
                    </th>
                    <th>
                      <span className="header-full">Strength</span>
                      <span className="header-mobile">S</span>
                    </th>
                    <th>
                      <span className="header-full">AP</span>
                      <span className="header-mobile">AP</span>
                    </th>
                    <th>
                      <span className="header-full">Damage</span>
                      <span className="header-mobile">D</span>
                    </th>
                    <th>
                      <span className="header-full">Abilities</span>
                      <span className="header-mobile">Abilities</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {unit.weapons.map((weapon) => (
                    <tr key={weapon.id} className="weapon-row">
                      <td className="weapon-name-cell">
                        <Link to={`/weapons/${weapon.id}`} className="weapon-name-link">
                          {weapon.name}
                        </Link>
                      </td>
                      <td className="weapon-type-cell">
                        {weapon.weaponType}
                      </td>
                      <td className="weapon-range-cell">
                        {weapon.range ? `${weapon.range}"` : '-'}
                      </td>
                      <td className="weapon-attacks-cell">
                        {weapon.attacks}
                      </td>
                      <td className="weapon-skill-cell">
                        {weapon.skill ? `${weapon.skill}+` : '-'}
                      </td>
                      <td className="weapon-strength-cell">
                        {weapon.strength}
                      </td>
                      <td className="weapon-ap-cell">
                        {weapon.ap > 0 ? `-${weapon.ap}` : weapon.ap}
                      </td>
                      <td className="weapon-damage-cell">
                        {weapon.damage}
                      </td>
                      <td className="weapon-abilities-cell">
                        {weapon.abilities && weapon.abilities.length > 0 ? (
                          weapon.abilities.map(ability =>
                            `${ability.name}${ability.value ? ` ${ability.value}` : ''}`
                          ).join(', ')
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {unit.unitAbilities.length > 0 ? (
          <div className="unit-abilities-section">
            <h2>Unit Abilities ({unit.unitAbilities.length})</h2>
            <div className="abilities-list">
              {unit.unitAbilities.map((ability) => (
                <div key={ability.id} className="ability-card">
                  <h3 className="ability-name">{ability.name}</h3>
                  <CollapsibleText 
                    text={ability.description} 
                    maxLength={120}
                    className="ability-description"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="unit-abilities-section">
            <h2>Unit Abilities (0)</h2>
            <div className="abilities-disclaimer">
              <p className="disclaimer-text">
                <em>Some units may be missing abilities. Please report missing datasheet abilities </em>
                <a 
                  href="https://github.com/emiller6505/grimdarkly-frontend/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="disclaimer-link"
                >
                  here
                </a>
                <em>.</em>
              </p>
            </div>
          </div>
        )}

        {unit.keywords.length > 0 && (
          <div className="unit-keywords-section">
            <h2>Keywords ({unit.keywords.length})</h2>
            <div className="keywords-grid">
              {unit.keywords.map((keyword, index) => (
                <span key={index} className="keyword-badge">
                  {keyword.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Leader Relationships Section */}
        {(unit.canLead.length > 0 || unit.ledBy.length > 0) && (
          <div className="unit-leadership-section">
            <h2>Leadership</h2>

            {unit.canLead.length > 0 && (
              <div className="leadership-subsection">
                <h3>This unit can lead:</h3>
                <div className="leadership-list">
                  {unit.canLead.map((ledUnit) => (
                    <div key={ledUnit.id} className="leadership-card">
                      <Link to={`/units/${ledUnit.id}`} className="leadership-link">
                        <div className="leadership-name">{ledUnit.name}</div>
                        <div className="leadership-details">
                          <span className="leadership-type">{ledUnit.unitType.replace('_', ' ')}</span>
                          <span className="leadership-faction">{ledUnit.faction}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {unit.ledBy.length > 0 && (
              <div className="leadership-subsection">
                <h3>This unit can be led by:</h3>
                <div className="leadership-list">
                  {unit.ledBy.map((leaderUnit) => (
                    <div key={leaderUnit.id} className="leadership-card">
                      <Link to={`/units/${leaderUnit.id}`} className="leadership-link">
                        <div className="leadership-name">{leaderUnit.name}</div>
                        <div className="leadership-details">
                          <span className="leadership-type">{leaderUnit.unitType.replace('_', ' ')}</span>
                          <span className="leadership-faction">{leaderUnit.faction}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {unit.configurations.length > 0 && (
          <div className="unit-configurations-section">
            <h2>Configurations ({unit.configurations.length})</h2>
            <div className="configurations-list">
              {unit.configurations.map((config) => (
                <div key={config.id} className="configuration-card">
                  <div className="config-header">
                    <h3 className="config-description">{config.description}</h3>
                    <span className="config-points">{config.points}pts</span>
                  </div>
                  <div className="config-details">
                    <span className="config-models">{config.modelCount} models</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {unit.options.length > 0 && (
          <div className="unit-options-section">
            <h2>Upgrade Options ({unit.options.length})</h2>
            <div className="options-list">
              {unit.options.map((option) => (
                <div key={option.id} className="option-card">
                  <div className="option-header">
                    <span className="option-line">Line {option.line}</span>
                  </div>
                  <p className="option-description">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {unit.compositions.length > 0 && (
          <div className="unit-compositions-section">
            <h2>Unit Composition ({unit.compositions.length})</h2>
            <div className="compositions-list">
              {unit.compositions.map((composition) => (
                <div key={composition.id} className="composition-card">
                  <div className="composition-header">
                    <span className="composition-line">Line {composition.line}</span>
                    {composition.isAlternative && (
                      <span className="composition-alternative">Alternative</span>
                    )}
                  </div>
                  <p className="composition-description">{composition.description}</p>
                  {(composition.minCount || composition.maxCount) && (
                    <div className="composition-counts">
                      {composition.minCount && (
                        <span>Min: {composition.minCount}</span>
                      )}
                      {composition.maxCount && (
                        <span>Max: {composition.maxCount}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="unit-detail-footer">
        <Link to="/units" className="btn btn-secondary">
          Back to Units
        </Link>
        <Link to={`/units?faction=${encodeURIComponent(unit.faction.name)}`} className="btn btn-primary">
          View More {unit.faction.name} Units
        </Link>
      </div>
    </div>
  );
};

export default UnitDetail;

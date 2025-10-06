import { Link } from 'react-router-dom';
import type { Faction } from '../types';
import './FactionCard.css';

interface FactionCardProps {
  faction: Faction & {
    isSubfaction?: boolean;
    parentFaction?: string;
  };
}

const FactionCard = ({ faction }: FactionCardProps) => {
  // Generate unique faction descriptions based on lore and characteristics
  const getFactionDescription = (factionName: string): string => {
    // Simple approach: normalize the faction name by removing/replacing apostrophes
    const normalizeName = (name: string) => name.replace(/['']/g, '').toLowerCase();
    
    // Check for specific factions with simple string matching
    const normalizedFaction = normalizeName(factionName);
    
    if (normalizedFaction.includes('emperor') && normalizedFaction.includes('children')) {
      return 'Slaanesh\'s perfectionist followers, seeking ever-greater sensations and aesthetic beauty in all things.';
    }
    
    if (normalizedFaction.includes('au empire') || normalizedFaction.includes('t\'au')) {
      return 'A young and rapidly expanding empire that seeks to unite all races under the Greater Good through diplomacy and technology.';
    }
    
    if (normalizedFaction.includes('adepta') && normalizedFaction.includes('sororitas')) {
      return 'The militant arm of the Ecclesiarchy, wielding faith as their greatest weapon against the enemies of the Emperor.';
    }
    
    if (normalizedFaction.includes('adeptus') && normalizedFaction.includes('custodes')) {
      return 'The Emperor\'s personal bodyguards, genetically enhanced super-soldiers who are the pinnacle of human perfection.';
    }
    
    if (normalizedFaction.includes('adeptus') && normalizedFaction.includes('mechanicus')) {
      return 'The tech-priests of Mars, masters of ancient technology and cybernetic augmentation in service to the Omnissiah.';
    }
    
    if (normalizedFaction.includes('adeptus') && normalizedFaction.includes('titanicus')) {
      return 'Pilots of the mighty God-Machines, commanding colossal war engines that can level entire cities.';
    }
    
    if (normalizedFaction.includes('aeldari')) {
      return 'The ancient and graceful space elves, masters of psychic powers and advanced technology from a fallen empire.';
    }
    
    if (normalizedFaction.includes('astra') && normalizedFaction.includes('militarum')) {
      return 'The vast armies of the Imperium, countless billions of brave soldiers holding the line against all threats.';
    }
    
    if (normalizedFaction.includes('chaos') && normalizedFaction.includes('daemons')) {
      return 'Malevolent entities from the Warp, manifestations of the Dark Gods\' will and pure embodiments of corruption.';
    }
    
    if (normalizedFaction.includes('chaos') && normalizedFaction.includes('knights')) {
      return 'Noble houses corrupted by Chaos, piloting massive war machines in service to the Ruinous Powers.';
    }
    
    if (normalizedFaction.includes('chaos') && normalizedFaction.includes('space') && normalizedFaction.includes('marines')) {
      return 'Traitor Astartes who have turned from the Emperor\'s light, embracing the dark gifts of Chaos.';
    }
    
    if (normalizedFaction.includes('death') && normalizedFaction.includes('guard')) {
      return 'Nurgle\'s chosen warriors, spreading plague and decay while remaining unnaturally resilient to all harm.';
    }
    
    if (normalizedFaction.includes('drukhari')) {
      return 'The dark kin of the Aeldari, sadistic raiders who feed on the suffering of others to stave off their own damnation.';
    }
    
    if (normalizedFaction.includes('genestealer') && normalizedFaction.includes('cults')) {
      return 'Hidden infiltrators working to prepare worlds for the coming of the Great Devourer through subversion and mutation.';
    }
    
    if (normalizedFaction.includes('grey') && normalizedFaction.includes('knights')) {
      return 'The Emperor\'s daemon-hunting specialists, incorruptible warriors dedicated to purging the galaxy of Chaos.';
    }
    
    if (normalizedFaction.includes('imperial') && normalizedFaction.includes('agents')) {
      return 'The diverse operatives of the Inquisition and other Imperial organizations, working in the shadows to protect humanity.';
    }
    
    if (normalizedFaction.includes('imperial') && normalizedFaction.includes('knights')) {
      return 'Noble houses piloting towering war machines, bound by ancient oaths to defend their worlds and the Imperium.';
    }
    
    if (normalizedFaction.includes('leagues') && normalizedFaction.includes('votann')) {
      return 'The Kin, ancient space dwarves who mine the galaxy\'s riches while maintaining their independence from the Imperium.';
    }
    
    if (normalizedFaction.includes('necrons')) {
      return 'Ancient robotic warriors who ruled the galaxy eons ago, now awakening from their tomb worlds to reclaim their empire.';
    }
    
    if (normalizedFaction.includes('orks')) {
      return 'Brutal and warlike creatures who live for battle, growing stronger through combat and spreading across the galaxy.';
    }
    
    if (normalizedFaction.includes('space') && normalizedFaction.includes('marines') && !normalizedFaction.includes('chaos')) {
      return 'The Adeptus Astartes are the Emperor\'s finest warriors, genetically enhanced super-soldiers who are humanity\'s greatest defenders.';
    }
    
    if (normalizedFaction.includes('thousand') && normalizedFaction.includes('sons')) {
      return 'Tzeentch\'s scholarly followers, masters of sorcery and mutation who seek to unlock the universe\'s greatest secrets.';
    }
    
    if (normalizedFaction.includes('tyranids')) {
      return 'The Great Devourer, an endless swarm of bio-engineered horrors that consumes all life in its path across the galaxy.';
    }
    
    if (normalizedFaction.includes('unaligned') && normalizedFaction.includes('forces')) {
      return 'Independent factions and mercenaries who operate outside the major galactic powers, serving their own interests.';
    }
    
    if (normalizedFaction.includes('world') && normalizedFaction.includes('eaters')) {
      return 'Khorne\'s bloodthirsty berserkers, lost to the rage of the Blood God and seeking only to spill blood in his name.';
    }
    
    // Space Marine Chapter descriptions
    if (normalizedFaction.includes('blood') && normalizedFaction.includes('angels')) {
      return 'A subfaction of the Adeptus Astartes, the Blood Angels are noble warriors cursed with the Red Thirst and Black Rage, fighting with unmatched ferocity and artistic grace.';
    }
    
    if (normalizedFaction.includes('dark') && normalizedFaction.includes('angels')) {
      return 'A subfaction of the Adeptus Astartes, the Dark Angels are secretive and mysterious, guarding ancient secrets and hunting the Fallen with relentless determination.';
    }
    
    if (normalizedFaction.includes('ultramarines')) {
      return 'A subfaction of the Adeptus Astartes, the Ultramarines are the most disciplined and organized of all Space Marine Chapters, following the Codex Astartes with unwavering devotion.';
    }
    
    if (normalizedFaction.includes('space') && normalizedFaction.includes('wolves')) {
      return 'A subfaction of the Adeptus Astartes, the Space Wolves are fierce warriors from Fenris who embrace their savage nature and fight with berserker fury.';
    }
    
    if (normalizedFaction.includes('iron') && normalizedFaction.includes('hands')) {
      return 'A subfaction of the Adeptus Astartes, the Iron Hands are masters of technology and cybernetics, replacing flesh with metal in their quest for perfection.';
    }
    
    if (normalizedFaction.includes('white') && normalizedFaction.includes('scars')) {
      return 'A subfaction of the Adeptus Astartes, the White Scars are swift and mobile warriors who excel at hit-and-run tactics and lightning-fast strikes.';
    }
    
    if (normalizedFaction.includes('raven') && normalizedFaction.includes('guard')) {
      return 'A subfaction of the Adeptus Astartes, the Raven Guard are masters of stealth and infiltration, striking from the shadows with surgical precision.';
    }
    
    if (normalizedFaction.includes('salamanders')) {
      return 'A subfaction of the Adeptus Astartes, the Salamanders are noble warriors who forge their own weapons and protect the innocent with unwavering compassion.';
    }
    
    if (normalizedFaction.includes('imperial') && normalizedFaction.includes('fists')) {
      return 'A subfaction of the Adeptus Astartes, the Imperial Fists are master defenders and siege specialists, known for their unbreakable resolve and fortification expertise.';
    }
    
    // Fallback for any faction not explicitly handled
    return `Explore units, weapons, and abilities for the ${factionName} faction.`;
  };

  return (
    <div className="faction-card">
      <div className="faction-header">
        <h3 className="faction-name">{faction.name}</h3>
      </div>

      <div className="faction-content">
        <div className="faction-info">
          <p className="faction-description">
            {getFactionDescription(faction.name)}
          </p>
        </div>

        <div className="faction-actions">
          <Link 
            to={faction.isSubfaction 
              ? `/units?keyword=${encodeURIComponent(faction.name)}`
              : `/units?faction=${encodeURIComponent(faction.name)}`
            }
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

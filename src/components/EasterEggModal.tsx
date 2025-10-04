import React from 'react';
import './EasterEggModal.css';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
}

const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose, searchTerm }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    const term = searchTerm.toLowerCase();
    
    if (term.includes('bruce dickinson')) {
      return {
        title: '⚔️ BRUCE DICKINSON DETECTED ⚔️',
        subtitle: 'The Iron Rockstar of Warhammer 40K',
        description: 'You have discovered the legendary Bruce Dickinson easter egg! The Emperor\'s own rock star has been found in the grim darkness of the far future!',
        icon: '🎸',
        color: 'gold'
      };
    } else if (term.includes('will ferrell')) {
      return {
        title: '⚔️ WILL FERRELL DETECTED ⚔️',
        subtitle: 'The Comedic Champion of the Imperium',
        description: 'You have discovered the legendary Will Ferrell easter egg! Even in the grim darkness of the far future, there is still laughter... and it is Will Ferrell!',
        icon: '🎭',
        color: 'blue'
      };
    } else if (term.includes('christopher walken')) {
      return {
        title: '⚔️ CHRISTOPHER WALKEN DETECTED ⚔️',
        subtitle: 'The Master of Dramatic Pauses',
        description: 'You have discovered the legendary Christopher Walken easter egg! In the grim darkness of the far future, there is only war... and Christopher Walken\'s distinctive delivery!',
        icon: '🎬',
        color: 'purple'
      };
    } else if (term.includes('cowbell')) {
      return {
        title: '⚔️ COWBELL DETECTED ⚔️',
        subtitle: 'The Sacred Instrument of the Imperium',
        description: 'You have discovered the legendary Cowbell easter egg! In the grim darkness of the far future, there is only war... and the eternal rhythm of the sacred cowbell!',
        icon: '🔔',
        color: 'orange'
      };
    } else if (term.includes('more cowbell')) {
      return {
        title: '⚔️ MORE COWBELL DETECTED ⚔️',
        subtitle: 'The Ultimate Sacred Instrument',
        description: 'You have discovered the legendary "More Cowbell" easter egg! In the grim darkness of the far future, there is only war... and MORE COWBELL! The Emperor demands it!',
        icon: '🔔🔔',
        color: 'red'
      };
    }
    
    return null;
  };

  const content = getModalContent();
  if (!content) return null;

  return (
    <div className="easter-egg-modal-overlay" onClick={onClose}>
      <div className={`easter-egg-modal ${content.color}`} onClick={(e) => e.stopPropagation()}>
        <div className="easter-egg-modal-header">
          <div className="easter-egg-icon">{content.icon}</div>
          <div className="easter-egg-header-text">
            <h2 className="easter-egg-title">{content.title}</h2>
            <h3 className="easter-egg-subtitle">{content.subtitle}</h3>
          </div>
          <button className="easter-egg-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="easter-egg-modal-content">
          {/* <p className="easter-egg-description">{content.description}</p> */}
          
          <div className="easter-egg-video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/cVsQLlk-T0s?si=I8s0h4_5JQLhwjnR"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="easter-egg-video"
            ></iframe>
          </div>
        </div>
        
        <div className="easter-egg-modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EasterEggModal;

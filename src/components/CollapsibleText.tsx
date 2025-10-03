// ⚔️ IMPERIAL COLLAPSIBLE TEXT COMPONENT ⚔️
// Sacred component to handle long text with "Read more" functionality

import { useState } from 'react';
import './CollapsibleText.css';

interface CollapsibleTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const CollapsibleText = ({ text, maxLength = 90, className = '' }: CollapsibleTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If text is short enough, don't show collapse functionality
  if (text.length <= maxLength) {
    return <p className={`collapsible-text ${className}`}>{text}</p>;
  }

  // Find the last space before maxLength to avoid cutting words
  let truncateIndex = maxLength;
  if (text.length > maxLength) {
    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
    if (lastSpaceIndex > maxLength * 0.8) { // Only use word boundary if it's not too far back
      truncateIndex = lastSpaceIndex;
    }
  }
  
  const truncatedText = text.substring(0, truncateIndex);
  const remainingText = text.substring(truncateIndex);

  return (
    <div className={`collapsible-text-container ${className}`}>
      <p className="collapsible-text">
        {isExpanded ? text : truncatedText}
        {!isExpanded && remainingText && (
          <>
            <span className="text-ellipsis">...</span>
            <button 
              className="read-more-btn"
              onClick={() => setIsExpanded(true)}
              type="button"
            >
              Read more
            </button>
          </>
        )}
        {isExpanded && (
          <button 
            className="read-less-btn"
            onClick={() => setIsExpanded(false)}
            type="button"
          >
            Read less
          </button>
        )}
      </p>
    </div>
  );
};

export default CollapsibleText;

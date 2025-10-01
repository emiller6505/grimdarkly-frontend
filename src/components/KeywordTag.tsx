import React from 'react';
import './KeywordTag.css';

interface KeywordTagProps {
  keyword: string;
  onRemove: (keyword: string) => void;
}

const KeywordTag: React.FC<KeywordTagProps> = ({ keyword, onRemove }) => {
  return (
    <span className="keyword-tag">
      {keyword}
      <button 
        className="keyword-tag-remove" 
        onClick={() => onRemove(keyword)}
        aria-label={`Remove ${keyword} keyword`}
      >
        ×
      </button>
    </span>
  );
};

export default KeywordTag;

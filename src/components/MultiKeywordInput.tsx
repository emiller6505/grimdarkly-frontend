import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import KeywordTag from './KeywordTag';
import './MultiKeywordInput.css';

interface MultiKeywordInputProps {
  appliedKeywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  placeholder?: string;
}

const MultiKeywordInput: React.FC<MultiKeywordInputProps> = ({
  appliedKeywords,
  onKeywordsChange,
  placeholder = "Enter keywords separated by commas..."
}) => {
  const [inputValue, setInputValue] = useState('');

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && !appliedKeywords.includes(trimmedKeyword)) {
      onKeywordsChange([...appliedKeywords, trimmedKeyword]);
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    onKeywordsChange(appliedKeywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if user typed a comma
    if (value.includes(',')) {
      const parts = value.split(',');
      const keywordToAdd = parts[0].trim();
      const remainingText = parts.slice(1).join(',').trim();
      
      if (keywordToAdd) {
        addKeyword(keywordToAdd);
      }
      
      setInputValue(remainingText);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addKeyword(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && appliedKeywords.length > 0) {
      // Remove last keyword if input is empty and user presses backspace
      const lastKeyword = appliedKeywords[appliedKeywords.length - 1];
      removeKeyword(lastKeyword);
    }
  };

  return (
    <div className="multi-keyword-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={appliedKeywords.length === 0 ? placeholder : "Add more keywords..."}
        className="keyword-input-field"
      />
      <div className="applied-keywords">
        {appliedKeywords.map((keyword) => (
          <KeywordTag
            key={keyword}
            keyword={keyword}
            onRemove={removeKeyword}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiKeywordInput;

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
  const [error, setError] = useState<string | null>(null);

  const validateKeyword = (keyword: string): string | null => {
    const trimmed = keyword.trim();
    
    if (!trimmed) {
      return 'Keyword cannot be empty';
    }
    
    if (trimmed.length < 2) {
      return 'Keyword must be at least 2 characters long';
    }
    
    if (trimmed.length > 50) {
      return 'Keyword cannot exceed 50 characters';
    }
    
    if (appliedKeywords.includes(trimmed)) {
      return 'Keyword already added';
    }
    
    if (appliedKeywords.length >= 10) {
      return 'Maximum 10 keywords allowed';
    }
    
    // Check for potentially problematic characters
    if (/[<>{}[\]\\|`~!@#$%^&*()+=\/]/.test(trimmed)) {
      return 'Keyword contains invalid characters';
    }
    
    return null;
  };

  const addKeyword = (keyword: string) => {
    const validationError = validateKeyword(keyword);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    const trimmedKeyword = keyword.trim();
    onKeywordsChange([...appliedKeywords, trimmedKeyword]);
  };

  const removeKeyword = (keywordToRemove: string) => {
    onKeywordsChange(appliedKeywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }

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
        className={`keyword-input-field ${error ? 'error' : ''}`}
      />
      {error && (
        <div className="keyword-error">
          {error}
        </div>
      )}
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

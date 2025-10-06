import React from 'react';
import Tag from './Tag';
import '../styles/tags.css';

interface TagItem {
  id?: string | number;
  name: string;
  value?: string;
}

interface TagListProps {
  title: string;
  items: TagItem[];
  variant?: 'default' | 'keyword' | 'weapon' | 'ability';
  maxVisible?: number;
  expanded?: boolean;
  onToggleExpanded?: () => void;
  className?: string;
}

const TagList: React.FC<TagListProps> = ({
  title,
  items,
  variant = 'default',
  maxVisible = 3,
  expanded = false,
  onToggleExpanded,
  className = ''
}) => {
  if (items.length === 0) return null;

  const visibleItems = expanded ? items : items.slice(0, maxVisible);
  const hasMore = items.length > maxVisible;
  const showMore = hasMore && !expanded;
  const showLess = hasMore && expanded;

  return (
    <div className={`tag-section ${className}`}>
      <h4>{title}</h4>
      <div className="tag-list">
        {visibleItems.map((item, index) => (
          <Tag key={item.id || index} variant={variant}>
            {item.name}{item.value ? ` (${item.value})` : ''}
          </Tag>
        ))}
        
        {showMore && onToggleExpanded && (
          <Tag
            variant={variant}
            more
            clickable
            onClick={onToggleExpanded}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleExpanded();
              }
            }}
            role="button"
            tabIndex={0}
          >
            +{items.length - maxVisible} more
          </Tag>
        )}
        
        {showLess && onToggleExpanded && (
          <Tag
            variant={variant}
            more
            clickable
            onClick={onToggleExpanded}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleExpanded();
              }
            }}
            role="button"
            tabIndex={0}
          >
            Show less
          </Tag>
        )}
      </div>
    </div>
  );
};

export default TagList;

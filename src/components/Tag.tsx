import React from 'react';
import '../styles/tags.css';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'keyword' | 'weapon' | 'ability';
  more?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  role?: string;
  tabIndex?: number;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  more = false,
  clickable = false,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  className = ''
}) => {
  const baseClasses = 'tag';
  const variantClass = variant !== 'default' ? `${variant}-tag` : '';
  const moreClass = more ? 'more' : '';
  const clickableClass = clickable ? 'clickable' : '';
  
  const classes = [baseClasses, variantClass, moreClass, clickableClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </span>
  );
};

export default Tag;

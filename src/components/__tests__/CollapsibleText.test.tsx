// ⚔️ IMPERIAL COLLAPSIBLE TEXT TESTS ⚔️
// Sacred tests for the collapsible text component

import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleText from '../CollapsibleText';

describe('CollapsibleText', () => {
  it('renders short text without collapse functionality', () => {
    const shortText = 'This is a short text.';
    render(<CollapsibleText text={shortText} maxLength={90} />);
    
    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });

  it('renders long text with collapse functionality', () => {
    const longText = 'This is a very long text that should be truncated because it exceeds the maximum length of 90 characters and should show a read more button.';
    render(<CollapsibleText text={longText} maxLength={90} />);
    
    // Should show truncated text
    expect(screen.getByText(/This is a very long text that should be truncated/)).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('expands text when Read more is clicked', () => {
    const longText = 'This is a very long text that should be truncated because it exceeds the maximum length of 90 characters and should show a read more button.';
    render(<CollapsibleText text={longText} maxLength={90} />);
    
    const readMoreButton = screen.getByText('Read more');
    fireEvent.click(readMoreButton);
    
    // Should show full text and Read less button
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByText('Read less')).toBeInTheDocument();
    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });

  it('collapses text when Read less is clicked', () => {
    const longText = 'This is a very long text that should be truncated because it exceeds the maximum length of 90 characters and should show a read more button.';
    render(<CollapsibleText text={longText} maxLength={90} />);
    
    // First expand
    const readMoreButton = screen.getByText('Read more');
    fireEvent.click(readMoreButton);
    
    // Then collapse
    const readLessButton = screen.getByText('Read less');
    fireEvent.click(readLessButton);
    
    // Should show truncated text and Read more button again
    expect(screen.getByText(/This is a very long text that should be truncated/)).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
    expect(screen.queryByText('Read less')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const text = 'Test text';
    render(<CollapsibleText text={text} className="custom-class" />);
    
    const container = screen.getByText(text).closest('.collapsible-text-container');
    expect(container).toHaveClass('custom-class');
  });
});

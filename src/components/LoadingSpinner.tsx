import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner loading-spinner-${size}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

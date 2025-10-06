import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

interface PageTransitionProps {
  children: ReactNode;
  animationType?: 'fade' | 'slide' | 'scale' | 'glow';
}

const PageTransition = ({ children, animationType = 'fade' }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState(`${animationType}In`);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage(`${animationType}Out`);
    }
  }, [location, displayLocation, animationType]);

  const onAnimationEnd = () => {
    if (transitionStage === `${animationType}Out`) {
      setTransitionStage(`${animationType}In`);
      setDisplayLocation(location);
    }
  };

  return (
    <div 
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  );
};

export default PageTransition;

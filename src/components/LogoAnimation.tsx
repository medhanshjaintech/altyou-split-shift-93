
import { useEffect, useState } from 'react';

interface LogoAnimationProps {
  onAnimationComplete: () => void;
}

const LogoAnimation = ({ onAnimationComplete }: LogoAnimationProps) => {
  const [animationState, setAnimationState] = useState<'initial' | 'split' | 'complete'>('initial');
  
  useEffect(() => {
    // First animation: Show the logo
    const initialTimeout = setTimeout(() => {
      setAnimationState('split');
      
      // Second animation: Split the logo
      const splitTimeout = setTimeout(() => {
        setAnimationState('complete');
        
        // After the split animation is complete, trigger the callback
        const completeTimeout = setTimeout(() => {
          onAnimationComplete();
        }, 1200); // Allow time for the split animation to finish
        
        return () => clearTimeout(completeTimeout);
      }, 2000); // Wait 2 seconds before splitting
      
      return () => clearTimeout(splitTimeout);
    }, 1000); // Wait 1 second before starting
    
    return () => clearTimeout(initialTimeout);
  }, [onAnimationComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {animationState === 'initial' && (
        <div className="text-6xl font-hanson animate-fade-in tracking-wider">
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            altyou
          </span>
        </div>
      )}
      
      {animationState === 'split' && (
        <div className="flex items-center space-x-1">
          <div className="text-6xl font-hanson animate-slide-left tracking-wider">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              alt
            </span>
          </div>
          <div className="text-6xl font-hanson animate-slide-right tracking-wider">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
              you
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;

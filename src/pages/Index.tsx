
import { useState, useEffect } from 'react';
import LogoAnimation from '@/components/LogoAnimation';
import AuthForm from '@/components/AuthForm';
import MinimalBackground from '@/components/MinimalBackground';

const Index = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="min-h-screen bg-[#222222] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      
      {/* Minimal graphic elements */}
      <MinimalBackground />
      
      {/* Logo animation */}
      {!animationComplete && (
        <LogoAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      {/* Auth form */}
      <AuthForm visible={animationComplete} />
    </div>
  );
};

export default Index;

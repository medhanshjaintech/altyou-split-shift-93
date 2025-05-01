
import { useState } from 'react';
import LogoAnimation from '@/components/LogoAnimation';
import AuthForm from '@/components/AuthForm';

const Index = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <>
      {/* Background with noise texture and gradient */}
      <div className="noise-bg">
        <div className="gradient-blob" style={{ top: '10%', left: '15%' }}></div>
        <div className="gradient-blob" style={{ bottom: '10%', right: '15%' }}></div>
      </div>
      
      {/* Logo animation */}
      {!animationComplete && (
        <LogoAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      
      {/* Auth form */}
      <AuthForm visible={animationComplete} />
    </>
  );
};

export default Index;

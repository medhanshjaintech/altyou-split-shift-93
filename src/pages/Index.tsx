
import { useState, useEffect } from 'react';
import LogoAnimation from '@/components/LogoAnimation';
import AuthForm from '@/components/AuthForm';

const Index = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number, left: number, top: number, size: number, opacity: number }>>([]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  // Generate random particles
  useEffect(() => {
    const generateParticles = () => {
      const particlesArray = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 5 + 1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }

      setParticles(particlesArray);
    };

    generateParticles();
  }, []);

  return (
    <>
      {/* Background with noise texture, gradient, and wavy mesh */}
      <div className="noise-bg">
        <div className="gradient-blob" style={{ top: '10%', left: '15%' }}></div>
        <div className="gradient-blob" style={{ bottom: '10%', right: '15%' }}></div>
        <div className="wavy-mesh"></div>
      </div>
      
      {/* Floating particles */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          ></div>
        ))}
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


import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('enter');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('exit');
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-all duration-600 ${
      animationPhase === 'exit' ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Main content */}
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <img 
              src="/images/gavi_icon.png" 
              alt="Gavi Gadgets Logo" 
              className="w-full h-full rounded-full object-contain shadow-lg animate-fade-in"
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-pink-600 animate-fade-in">
            GAVI GADGETS
          </h1>
          <p className="text-lg text-gray-600 mt-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Your Mobile Source
          </p>
        </div>

        {/* Simple loading indicator */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

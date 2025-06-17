
import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center z-50 animate-fade-out">
        <div className="text-center animate-scale-out">
          <div className="relative mb-8">
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-white shadow-2xl border-4 border-white object-contain"
            />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider drop-shadow-lg">
            GAVI GADGETS
          </h1>
          <p className="text-lg sm:text-xl text-pink-100 font-medium tracking-wide">
            Your Mobile Source
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <img 
            src="/images/gavi_gadgets_logo.png" 
            alt="Gavi Gadgets Logo" 
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-white shadow-2xl border-4 border-white object-contain animate-scale-in"
          />
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider drop-shadow-lg animate-fade-in">
          GAVI GADGETS
        </h1>
        <p className="text-lg sm:text-xl text-pink-100 font-medium tracking-wide animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Your Mobile Source
        </p>
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

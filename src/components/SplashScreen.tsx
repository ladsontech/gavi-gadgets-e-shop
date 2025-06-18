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
      }, 800);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-all duration-800 ${
      animationPhase === 'exit' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 100 + 20 + 'px',
              height: Math.random() * 100 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 4) + 's'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        {/* Logo with advanced animations */}
        <div className="relative mb-12 group">
          {/* Outer glow rings */}
          <div className="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-spin-reverse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-40 animate-pulse-slow"></div>
          </div>
          
          {/* Logo container */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-white shadow-2xl border border-gray-200 animate-logo-entrance"></div>
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="relative w-full h-full rounded-full object-contain p-4 animate-logo-entrance"
              style={{ animationDelay: '0.3s' }}
            />
            
            {/* Floating particles around logo */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-orbit"
                style={{
                  transformOrigin: '0 0',
                  left: '50%',
                  top: '50%',
                  animationDelay: (i * 0.2) + 's',
                  transform: `rotate(${i * 45}deg) translateX(80px)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand name with spectacular text effects */}
        <div className="mb-6 overflow-hidden">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-text-reveal tracking-wider">
            {"GAVI GADGETS".split('').map((char, i) => (
              <span
                key={i}
                className="inline-block animate-letter-drop"
                style={{ 
                  animationDelay: (i * 0.1) + 's',
                  transform: 'translateY(-100px)'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline with smooth reveal */}
        <div className="mb-12 overflow-hidden">
          <p className="text-xl sm:text-2xl text-gray-600 font-medium tracking-wide animate-slide-up opacity-0" style={{ animationDelay: '1.5s' }}>
            Your Mobile Source
          </p>
        </div>

        {/* Loading animation */}
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '2s' }}>
          <div className="relative w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full animate-loading-bar"></div>
          </div>
          <div className="mt-4 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-dot-pulse"
                style={{ animationDelay: (i * 0.3) + 's' }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes logo-entrance {
          0% { 
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          70% { 
            transform: scale(1.1) rotate(-10deg);
            opacity: 1;
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes orbit {
          0% { 
            transform: rotate(0deg) translateX(80px) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
            transform: rotate(180deg) translateX(80px) scale(1);
          }
          100% { 
            transform: rotate(360deg) translateX(80px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes letter-drop {
          0% { 
            transform: translateY(-100px) rotateX(90deg);
            opacity: 0;
          }
          50% {
            transform: translateY(10px) rotateX(0deg);
            opacity: 1;
          }
          100% { 
            transform: translateY(0px) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          0% { 
            transform: translateY(50px);
            opacity: 0;
          }
          100% { 
            transform: translateY(0px);
            opacity: 1;
          }
        }
        
        @keyframes loading-bar {
          0% { 
            transform: translateX(-100%);
          }
          100% { 
            transform: translateX(0%);
          }
        }
        
        @keyframes dot-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.5);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 10s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-logo-entrance { animation: logo-entrance 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-orbit { animation: orbit 3s ease-in-out infinite; }
        .animate-letter-drop { animation: letter-drop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out; }
        .animate-dot-pulse { animation: dot-pulse 1.5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};
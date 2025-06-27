import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return <header className="w-full bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
      
      <nav className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="relative">
            <img src="/images/gavi_gadgets_logo.png" alt="Gavi Gadgets Logo" className="w-12 h-12 rounded-xl object-contain transition-all duration-300 group-hover:scale-110 animate-logo-rotation" draggable={false} />
          </div>
          
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900 text-xl tracking-tight group-hover:text-purple-700 transition-colors duration-200">
              Gavi Gadgets UG
            </h1>
            <p className="text-sm text-gray-600 font-medium group-hover:text-purple-600 transition-colors duration-200">
              Your Mobile Source
            </p>
          </div>
        </div>

        {/* Mobile Logo Title (visible only on mobile) */}
        <div className="sm:hidden flex-1 text-center">
          <h1 className="font-bold text-gray-900 tracking-tight text-2xl">
            Gavi Gadgets
          </h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <div className="relative">
            <CartIcon />
          </div>
          
          {/* Mobile Menu Button - keeping for future use if needed */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2.5 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:shadow-md" 
            aria-label="Toggle menu"
            style={{ display: 'none' }} // Hidden for now since no menu items
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes logoRotation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-logo-rotation {
          animation: logoRotation 6s ease-in-out infinite;
        }
      `}</style>
    </header>;
};

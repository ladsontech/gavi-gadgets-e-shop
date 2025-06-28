import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 via-white/20 to-purple-50/30"></div>
      
      <nav className="relative flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        {/* Logo Section - Compact */}
        <div 
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105" 
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="w-10 h-10 rounded-xl object-contain transition-all duration-300 group-hover:rotate-12 relative z-10" 
              draggable={false} 
            />
          </div>
          
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-pink-600 transition-colors duration-300">
              Gavi Gadgets
            </h1>
            <p className="text-xs text-gray-500 font-medium group-hover:text-pink-500 transition-colors duration-300 -mt-0.5">
              Your Mobile Source
            </p>
          </div>
        </div>

        {/* Mobile Logo Title (visible only on mobile) */}
        <div className="sm:hidden flex-1 text-center">
          <h1 className="font-bold text-gray-900 tracking-tight text-lg">
            Gavi Gadgets
          </h1>
        </div>

        {/* Actions Section - Compact */}
        <div className="flex items-center gap-2">
          {/* Cart Icon with enhanced styling */}
          <div className="relative">
            <CartIcon />
          </div>
          
          {/* Mobile Menu Button - keeping for future use if needed */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-200" 
            aria-label="Toggle menu"
            style={{ display: 'none' }} // Hidden for now since no menu items
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </nav>
    </header>
  );
};
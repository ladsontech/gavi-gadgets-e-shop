import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    const phoneNumber = "+256740799577";
    // Direct phone call
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/30 via-white/20 to-purple-50/30"></div>
      
      <nav className="relative flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        {/* Logo Section - Enhanced with bigger text */}
        <div 
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105" 
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <img 
              src="/images/gavi_gadgets_logo.png" 
              alt="Gavi Gadgets Logo" 
              className="w-12 h-12 rounded-xl object-contain transition-all duration-300 group-hover:rotate-12 relative z-10" 
              draggable={false} 
            />
          </div>
          
          <div className="hidden sm:block">
            <h1 className="font-bold text-gray-900 text-2xl xl:text-3xl tracking-tight group-hover:text-pink-600 transition-colors duration-300 leading-tight">
              Gavi Gadgets
            </h1>
            <p className="text-sm text-gray-500 font-medium group-hover:text-pink-500 transition-colors duration-300 -mt-1">
              Your Mobile Source
            </p>
          </div>
        </div>

        {/* Mobile Logo Title with Contact (visible only on mobile) */}
        <div className="sm:hidden flex-1 text-center">
          <h1 className="font-bold text-gray-900 tracking-tight text-2xl leading-tight">
            Gavi Gadgets
          </h1>
          <button
            onClick={handleContactClick}
            className="flex items-center justify-center gap-1 mx-auto mt-1 text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
          >
            <Phone className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xs font-medium">+256 740799577</span>
          </button>
        </div>

        {/* Actions Section - Compact */}
        <div className="flex items-center gap-2">
          {/* Contact Button - Desktop with phone number */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleContactClick}
            className="hidden sm:flex items-center gap-2 h-10 px-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <Phone className="w-4 h-4 relative z-10" />
            <span className="text-sm font-medium relative z-10">+256 740799577</span>
          </Button>

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
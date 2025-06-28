import React, { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {
    const phoneNumber = "+256740799577";
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <header className="w-full bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-lg sticky top-0 z-50">
      {/* Gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/3 to-blue-500/5"></div>
      
      <nav className="relative">
        {/* Top contact bar - Desktop only */}
        <div className="hidden lg:block bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400" />
                <span className="font-medium">+256 740799577</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>New Pioneer Mall Shop PA 82A, Kampala</span>
              </div>
            </div>
            <div className="text-pink-300 font-medium">
              Your Mobile Source - Quality Guaranteed
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section - Enhanced */}
            <div 
              className="flex items-center gap-4 cursor-pointer group transition-all duration-300" 
              onClick={() => navigate("/")}
            >
              <div className="relative">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 scale-110 blur-sm"></div>
                
                {/* Logo container with enhanced styling */}
                <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 p-2 rounded-2xl border border-pink-100 group-hover:border-pink-300 transition-all duration-300 group-hover:shadow-lg">
                  <img 
                    src="/images/gavi_gadgets_logo.png" 
                    alt="Gavi Gadgets Logo" 
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-all duration-300 group-hover:scale-110" 
                    draggable={false} 
                  />
                </div>
              </div>
              
              {/* Brand text - Desktop */}
              <div className="hidden sm:block">
                <h1 className="font-black text-gray-900 text-2xl lg:text-3xl xl:text-4xl tracking-tight group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-none">
                  Gavi Gadgets
                </h1>
                <p className="text-sm lg:text-base text-gray-600 font-semibold group-hover:text-pink-600 transition-colors duration-300 -mt-1">
                  Your Mobile Source
                </p>
              </div>
            </div>

            {/* Mobile Brand Section */}
            <div className="sm:hidden flex-1 text-center">
              <h1 className="font-black text-gray-900 text-2xl tracking-tight leading-none bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Gavi Gadgets
              </h1>
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 mx-auto mt-1 text-blue-600 hover:text-blue-700 transition-all duration-300 group bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full"
              >
                <Phone className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-bold">+256 740799577</span>
              </button>
            </div>

            {/* Actions Section - Enhanced */}
            <div className="flex items-center gap-3">
              
              {/* Contact Button - Desktop with enhanced styling */}
              <Button
                variant="ghost"
                onClick={handleContactClick}
                className="hidden lg:flex items-center gap-3 h-12 px-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-200 hover:border-blue-300 group"
              >
                <div className="p-2 bg-blue-500 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-blue-600">Call Now</div>
                  <div className="text-sm font-bold">+256 740799577</div>
                </div>
              </Button>

              {/* Medium screen contact button */}
              <Button
                variant="ghost"
                onClick={handleContactClick}
                className="hidden sm:flex lg:hidden items-center gap-2 h-10 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-105 border border-blue-200"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-bold">Call</span>
              </Button>

              {/* Cart Icon with enhanced styling */}
              <div className="relative">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
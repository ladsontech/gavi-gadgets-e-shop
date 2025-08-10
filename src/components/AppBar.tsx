
import React from "react";
import { Phone } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppBar = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    const phoneNumber = "+256740799577";
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="relative bg-gray-50 p-2 rounded-xl border group-hover:border-pink-200 transition-colors">
              <img 
                src="/images/gavi_gadgets_logo.png" 
                alt="Gavi Gadgets Logo" 
                className="w-10 h-10 object-contain" 
                draggable={false} 
              />
            </div>
            
            <div className="hidden sm:block">
              <h1 className="font-bold text-gray-900 text-2xl group-hover:text-pink-600 transition-colors">
                Gavi Gadgets
              </h1>
              <p className="text-sm text-gray-600 -mt-1">
                Your Mobile Source
              </p>
            </div>
          </div>

          {/* Mobile Brand Section */}
          <div className="sm:hidden flex-1 text-center">
            <h1 className="font-bold text-gray-900 text-xl">
              Gavi Gadgets
            </h1>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            
            {/* Contact Button - Desktop */}
            <Button
              variant="outline"
              onClick={handleContactClick}
              className="hidden md:flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+256 740799577</span>
            </Button>

            {/* Contact Button - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleContactClick}
              className="md:hidden text-blue-600"
            >
              <Phone className="w-4 h-4" />
            </Button>

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};


import React from "react";
import { Phone, Facebook, Instagram } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppBar = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    const phoneNumber = "+256740799577";
    window.location.href = `tel:${phoneNumber}`;
  };

  const socialLinks = [
    { 
      icon: Facebook, 
      url: "https://www.facebook.com/p/GAVI-Gadgets-UG-100083303156382/", 
      label: "Facebook",
      color: "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    },
    { 
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      url: "https://x.com/gavigadgetsug", 
      label: "X (Twitter)",
      color: "text-black hover:text-gray-800 hover:bg-gray-50"
    },
    { 
      icon: Instagram, 
      url: "https://www.instagram.com/gavi_gadgets_0740799577/?hl=en", 
      label: "Instagram",
      color: "text-pink-600 hover:text-pink-700 hover:bg-pink-50"
    },
    { 
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-2.08v5.73a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88V2H6.9v5.73a4.83 4.83 0 01-3.77 4.25 4.84 4.84 0 01-1.84-3.81A4.84 4.84 0 014.96 3.5h.54V2H4.96A6.84 6.84 0 00-1.88 8.84a6.84 6.84 0 006.84 6.84A6.84 6.84 0 0011.8 8.84V22h2.4V8.84a6.84 6.84 0 006.84-6.84A6.84 6.84 0 0014.2 2h-.54v1.5h.54a4.84 4.84 0 014.84 4.84 4.84 4.84 0 01-1.84 3.81z"/>
        </svg>
      ), 
      url: "https://www.tiktok.com/discover/gavi-gadgets?lang=en", 
      label: "TikTok",
      color: "text-black hover:text-gray-800 hover:bg-gray-50"
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <img 
              src="/images/appbar_logo.png" 
              alt="Gavi Gadgets" 
              className="h-16 w-auto object-contain" 
              draggable={false} 
            />
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2">
            
            {/* Social Media Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(social.url, '_blank')}
                    className={`w-8 h-8 p-0 ${social.color}`}
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                );
              })}
            </div>
            
            {/* Contact Button - All Views */}
            <Button
              variant="outline"
              onClick={handleContactClick}
              className="flex items-center gap-2 text-pink-600 border-pink-200 hover:bg-pink-50 bg-pink-50/50 px-3 py-2 h-10 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+256 740799577</span>
            </Button>

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>
        
        {/* Mobile Social Media Links */}
        <div className="md:hidden flex justify-center gap-4 py-2 border-t border-gray-100">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => window.open(social.url, '_blank')}
                className={`w-8 h-8 p-0 ${social.color}`}
                title={social.label}
              >
                <Icon className="w-3 h-3" />
              </Button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

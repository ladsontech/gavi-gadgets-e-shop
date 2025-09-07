
import React from "react";
import { Phone, Facebook, Instagram, Search } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";

export const AppBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleContactClick = () => {
    const phoneNumber = "+256740799577";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <img 
          src="/images/tiktok-logo.png" 
          alt="TikTok" 
          className={`${className} rounded-full object-cover`}
        />
      ), 
      url: "https://www.tiktok.com/discover/gavi-gadgets?lang=en", 
      label: "TikTok",
      color: "hover:bg-gray-50"
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 lg:px-16 xl:px-20">
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

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for iPhone, Samsung, Pixel..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 h-10 w-full rounded-lg border-gray-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </form>
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
            
            {/* Contact Button - Desktop Only */}
            <Button
              variant="outline"
              onClick={handleContactClick}
              className="hidden md:flex items-center gap-2 text-pink-600 border-pink-200 hover:bg-pink-50 bg-pink-50/50 px-3 py-2 h-10 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+256 740799577</span>
            </Button>

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>
        
        {/* Mobile Search Bar and Social Media Links */}
        <div className="md:hidden">
          {/* Mobile Search Bar */}
          <div className="px-4 py-3 border-t border-gray-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for iPhone, Samsung, Pixel..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 h-10 w-full rounded-lg border-gray-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </form>
          </div>
          
          {/* Mobile Social Media Links */}
          <div className="flex justify-center gap-4 py-2 border-t border-gray-100">
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
        </div>
      </nav>
    </header>
  );
};


import React from "react";
import { Phone, Search } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";

export const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearch();
  
  // Hide search bar on categories and offers pages
  const isCategoriesPage = location.pathname === "/categories";
  const isOffersPage = location.pathname === "/offers";

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

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
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

          {/* Desktop Search Bar - Only show on home page */}
          {!isCategoriesPage && !isOffersPage && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 h-10 w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500 bg-white"
                />
              </form>
            </div>
          )}

          {/* Actions Section */}
          <div className="flex items-center gap-2">
            
            {/* Contact Button - Desktop Only */}
            <Button
              variant="outline"
              onClick={handleContactClick}
              className="hidden md:flex items-center gap-2 text-pink-600 border-pink-300 hover:bg-pink-50 bg-white px-3 py-2 h-10 text-sm font-medium transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+256 740799577</span>
            </Button>

            {/* Cart Icon */}
            <CartIcon />
          </div>
        </div>
        
        {/* Mobile Search Bar - Only show on home page */}
        {!isCategoriesPage && !isOffersPage && (
          <div className="md:hidden">
            {/* Mobile Search Bar */}
            <div className="px-4 py-3 border-t border-gray-100">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 h-10 w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500 bg-white"
                />
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const HeroSection = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Don't render on non-home pages
  if (!isHomePage) {
    return null;
  }

  const handleShopNow = () => {
    // Scroll to products section
    const productsSection = document.querySelector('[data-products-section]');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewOffers = () => {
    // Scroll to weekly offers section
    const offersSection = document.querySelector('[data-offers-section]');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-fuchsia-700">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Premium <span className="text-pink-200">Electronics</span> in Uganda
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-pink-100 max-w-3xl mx-auto px-2">
            Discover the latest smartphones, accessories, and gadgets with authentic warranties and competitive prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button 
              size="lg" 
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-6 sm:px-8 py-3"
              onClick={handleShopNow}
            >
              Shop Now <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white hover:bg-white font-semibold px-6 sm:px-8 py-3 text-pink-700"
              onClick={handleViewOffers}
            >
              View Offers
            </Button>
          </div>
          
          {/* Mobile-optimized feature cards */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-5xl mx-auto px-2">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 lg:p-6 border border-white/20">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mb-1 sm:mb-2 lg:mb-3 text-pink-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 text-center leading-tight">
                New Pioneer Mall
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm text-center leading-tight">
                Shop PA 82A, Kampala
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 lg:p-6 border border-white/20">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mb-1 sm:mb-2 lg:mb-3 text-pink-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 text-center leading-tight">
                Fast Delivery
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm text-center leading-tight">
                Same day delivery in Kampala
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 lg:p-6 border border-white/20">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mb-1 sm:mb-2 lg:mb-3 text-pink-200" />
              <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 text-center leading-tight">
                Authentic Warranty
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm text-center leading-tight">
                All products come with warranty
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, Clock, Shield } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
export const HeroSection = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Don't render if not on home page or if there's a category filter active
  const isHomePage = location.pathname === '/';
  const hasActiveCategory = searchParams.get('category') || window.location.hash.includes('category');

  // Check if any category is selected via the app state (listen for category changes)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  React.useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };
    window.addEventListener('categoryChanged', handleCategoryChange as EventListener);
    return () => {
      window.removeEventListener('categoryChanged', handleCategoryChange as EventListener);
    };
  }, []);

  // Don't render on non-home pages or when a category is selected
  if (!isHomePage || selectedCategory || hasActiveCategory) {
    return null;
  }
  return <div className="relative bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          {/* Clean feature cards with better design */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 text-black text-center">
                New Pioneer Mall
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center leading-tight">
                Shop PA 82A, Kampala
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 text-black text-center">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center leading-tight">
                Same day delivery in Kampala
              </p>
            </div>
            
            <div className="flex flex-col items-center bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 text-black text-center">
                Authentic Warranty
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center leading-tight">
                All products come with warranty
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
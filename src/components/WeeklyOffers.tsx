
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  brand: string;
  model: string;
  storage_capacity?: string;
  color?: string;
  condition: string;
  stock_quantity: number;
  images: string[];
  description?: string;
  is_featured: boolean;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

export const WeeklyOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: offers, isLoading } = useQuery({
    queryKey: ['weekly-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('is_weekly_offer', true)
        .eq('is_active', true)
        .gte('offer_end_date', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Auto-scroll functionality
  useEffect(() => {
    if (!offers || offers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [offers]);

  const nextOffer = () => {
    if (offers && offers.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevOffer = () => {
    if (offers && offers.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? offers.length - 1 : prevIndex - 1
      );
    }
  };

  if (isLoading || !offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            This Week's Offers
          </h2>
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
        </div>

        <div className="relative">
          {/* Mobile: Single product view */}
          <div className="block sm:hidden">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {offers.map((offer) => (
                  <div key={offer.id} className="w-full flex-shrink-0 px-2">
                    <ProductCard product={offer} />
                  </div>
                ))}
              </div>

              {/* Navigation arrows for mobile */}
              {offers.length > 1 && (
                <>
                  <button
                    onClick={prevOffer}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={nextOffer}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Dots indicator */}
            {offers.length > 1 && (
              <div className="flex justify-center mt-4 gap-1">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex 
                        ? 'bg-pink-600' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Grid view */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {offers.map((offer) => (
                <ProductCard key={offer.id} product={offer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

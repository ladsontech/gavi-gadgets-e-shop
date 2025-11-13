import React, { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number | null;
  description?: string | null;
  images: string[] | null;
  brand?: string;
  model?: string;
  storage_capacity?: string | null;
}

interface TuzisazePromoProps {
  variant?: "compact" | "full";
}

export const TuzisazePromo = ({ variant = "compact" }: TuzisazePromoProps) => {
  const navigate = useNavigate();
  const isCompact = variant === "compact";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: promoProducts, isLoading } = useQuery({
    queryKey: ["tuzisaze-promo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .not("original_price", "is", null)
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Product[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Auto-scroll to the right for promo section with smooth return and manual scroll support
  useEffect(() => {
    if (!isCompact || !scrollContainerRef.current || !promoProducts || promoProducts.length === 0) return;

    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = scrollContainer.scrollLeft || 0;
    let direction = 1; // 1 for right, -1 for left
    const scrollSpeed = 2; // pixels per frame - increased for faster scrolling
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    let intervalId: NodeJS.Timeout | null = null;
    let isUserScrolling = false;
    let resumeTimeout: NodeJS.Timeout | null = null;

    const autoScroll = () => {
      if (isUserScrolling) return;

      scrollAmount += scrollSpeed * direction;

      // Change direction when reaching boundaries
      if (scrollAmount >= maxScroll) {
        direction = -1; // Start scrolling left
      } else if (scrollAmount <= 0) {
        direction = 1; // Start scrolling right
      }

      scrollContainer.scrollLeft = scrollAmount;
    };

    const handleUserInteraction = () => {
      isUserScrolling = true;
      
      // Clear any pending resume timeout
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }

      // Resume auto-scroll after 2 seconds of no interaction
      resumeTimeout = setTimeout(() => {
        isUserScrolling = false;
        scrollAmount = scrollContainer.scrollLeft; // Sync with current position
      }, 2000);
    };

    // Start auto-scrolling
    intervalId = setInterval(autoScroll, 30);

    // Listen for user interactions
    scrollContainer.addEventListener('touchstart', handleUserInteraction);
    scrollContainer.addEventListener('mousedown', handleUserInteraction);
    scrollContainer.addEventListener('wheel', handleUserInteraction);
    scrollContainer.addEventListener('scroll', handleUserInteraction);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      scrollContainer.removeEventListener('touchstart', handleUserInteraction);
      scrollContainer.removeEventListener('mousedown', handleUserInteraction);
      scrollContainer.removeEventListener('wheel', handleUserInteraction);
      scrollContainer.removeEventListener('scroll', handleUserInteraction);
    };
  }, [promoProducts, isCompact]);

  if (isLoading || !promoProducts || promoProducts.length === 0) {
    return null;
  }

  const getDiscountAmount = (original: number, discounted: number) => {
    return original - discounted;
  };

  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <section
      className={
        isCompact
          ? "bg-gradient-to-br from-pink-50 via-white to-white py-8 sm:py-12 px-4 sm:px-6"
          : "relative bg-white"
      }
    >
      {isCompact ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full mb-4">
              <span className="text-2xl sm:text-3xl font-bold">Tuzisaze Ebeeyi</span>
              <span className="ml-2 text-xl sm:text-2xl">Promo!</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Special discounted prices on selected products
            </p>
          </div>

        {/* Products Grid - Compact (horizontal scroll) or Full (grid) */}
        {isCompact ? (
          /* Compact: Horizontal scroll, 2 per row on mobile */
          <div className="mb-8">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2"
            >
              <div className="inline-flex gap-3 sm:gap-4" style={{ display: 'inline-flex' }}>
                {promoProducts.map((product) => {
                  const originalPrice = product.original_price || product.price;
                  const discountedPrice = product.price;
                  const discount = getDiscountAmount(originalPrice, discountedPrice);
                  const discountPercent = getDiscountPercentage(originalPrice, discountedPrice);
                  const mainImage = product.images && product.images.length > 0 
                    ? product.images[0] 
                    : "/placeholder.svg";

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-200 h-full flex flex-col flex-shrink-0"
                      style={{ width: 'calc(50vw - 1rem)', minWidth: '160px', maxWidth: '200px' }}
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      {/* Product Image - Square */}
                      <div className="aspect-square relative overflow-hidden bg-gray-50">
                        <img
                          src={mainImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        {/* Discount Badge */}
                        {discountPercent > 0 && (
                          <div className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                            -{discountPercent}%
                          </div>
                        )}
                      </div>

                      {/* Product Info - Compact */}
                      <div className="p-2 flex-1 flex flex-col">
                        <h3 className="font-medium text-xs text-gray-900 line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Pricing - Discounted on top, original below */}
                        <div className="flex flex-col mb-1">
                          <span className="text-sm font-bold text-pink-600">
                            UGX {Number(discountedPrice).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            UGX {Number(originalPrice).toLocaleString()}
                          </span>
                        </div>

                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.slug}`);
                          }}
                          className="w-full text-xs h-6 bg-pink-600 hover:bg-pink-700 text-white mt-auto"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Full: Normal grid layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {promoProducts.map((product) => {
              const originalPrice = product.original_price || product.price;
              const discountedPrice = product.price;
              const discount = getDiscountAmount(originalPrice, discountedPrice);
              const discountPercent = getDiscountPercentage(originalPrice, discountedPrice);
              const mainImage = product.images && product.images.length > 0 
                ? product.images[0] 
                : "/placeholder.svg";

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-pink-100"
                >
                  {/* Product Image - Square */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{discountPercent}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-6">
                    {/* Product Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Storage/Model Info */}
                    {(product.storage_capacity || product.model) && (
                      <div className="flex items-center gap-2 mb-4">
                        {product.storage_capacity && (
                          <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-medium">
                            {product.storage_capacity}
                          </span>
                        )}
                        {product.model && (
                          <span className="text-xs text-gray-500">{product.model}</span>
                        )}
                      </div>
                    )}

                    {/* Pricing - Discounted on top, original below */}
                    <div className="mb-4">
                      <div className="flex flex-col mb-1">
                        <span className="text-2xl sm:text-3xl font-bold text-pink-600">
                          UGX {Number(discountedPrice).toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-sm line-through">
                          UGX {Number(originalPrice).toLocaleString()}
                        </span>
                      </div>
                      {discount > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          Save UGX {Number(discount).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* View Product Button */}
                    <Button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      View Product
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

          {/* View All Offers Link - Only show on compact variant (home page) */}
          {isCompact && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/offers");
                }}
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                View All Offers
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Full: Promotional header - Black November style for offers page */
        <div className="relative bg-black overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            {/* Top left - "COMING SOON" equivalent */}
            <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
              <p className="text-white text-xs sm:text-sm uppercase tracking-wider font-medium">
                Special Offers
              </p>
            </div>
            
            {/* Main promo text - centered */}
            <div className="text-center mt-8 sm:mt-12">
              {/* TUZISAZE - Solid pink */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-pink-600 uppercase tracking-tight leading-none">
                TUZISAZE
              </h1>
              
              {/* EBEEYI - Outlined pink */}
              <h2 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-none mt-2"
                style={{
                  WebkitTextStroke: '3px #ec4899',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                } as React.CSSProperties}
              >
                EBEEYI
              </h2>
              
              {/* PROMO! - Smaller pink text */}
              <div className="mt-4 sm:mt-6">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-pink-600 font-bold uppercase tracking-wide inline-block">
                  PROMO!
                </span>
              </div>
            </div>
            
            {/* Decorative grid pattern - top right */}
            <div className="absolute top-8 right-4 sm:right-6 lg:right-8">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-pink-600 rounded-full"
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom left - "GET READY!" equivalent */}
            <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8">
              <p className="text-white text-xs sm:text-sm uppercase tracking-wider font-medium">
                Shop Now!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


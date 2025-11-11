import React from "react";
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

  if (isLoading || !promoProducts || promoProducts.length === 0) {
    return null;
  }

  const getDiscountAmount = (original: number, discounted: number) => {
    return original - discounted;
  };

  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const scrollToOffersGrid = () => {
    const element = document.querySelector("[data-offers-grid]");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroProduct = promoProducts?.[0];
  const heroImage =
    heroProduct?.images && heroProduct.images.length > 0
      ? heroProduct.images[0]
      : null;

  return (
    <section
      className={
        isCompact
          ? "bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 sm:py-12 px-4 sm:px-6"
          : "relative bg-gradient-to-b from-white via-pink-50/40 to-white"
      }
    >
      {isCompact ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4">
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
            <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2">
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
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2"
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
        /* Full: Clean hero banner for offers page */
        <div className="relative isolate overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -right-32 w-96 h-96 bg-pink-300/35 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-100/60 rounded-full blur-2xl" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
              <div className="relative flex justify-center lg:justify-start">
                <div className="absolute -inset-6 bg-gradient-to-br from-pink-200/40 via-white to-purple-100/30 rounded-[2.75rem] blur-2xl" />
                <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-[2.5rem] border-4 border-pink-500/60 bg-white/80 shadow-2xl overflow-hidden backdrop-blur">
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt={heroProduct?.name || "Promo highlight"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pink-100 text-pink-600 text-xl font-semibold">
                      Promo
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-6 -right-6 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold uppercase tracking-wider">
                  Special Offer
                </div>
              </div>

              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                  Limited Time Promo
                </div>

                <div className="leading-none">
                  <span className="block text-pink-600 text-4xl sm:text-5xl lg:text-6xl font-black drop-shadow-md transform -rotate-6 origin-left">
                    Tuzisaze Ebeeyi
                  </span>
                  <span className="block text-pink-500 text-4xl sm:text-5xl lg:text-6xl font-black drop-shadow-md transform -rotate-6 origin-left">
                    Promo!
                  </span>
                </div>

                <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                  Discover unbeatable discounts on premium gadgets. Carefully curated deals to keep you ahead with the latest tech and accessories.
                </p>

                {heroProduct && (
                  <div className="bg-white/85 border border-pink-200 rounded-2xl shadow-md px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-left">
                      <h3 className="text-lg sm:text-xl font-semibold text-pink-700">
                        {heroProduct.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                        {heroProduct.storage_capacity && (
                          <span className="bg-pink-50 px-2 py-1 rounded-full">
                            {heroProduct.storage_capacity}
                          </span>
                        )}
                        {heroProduct.model && (
                          <span className="bg-pink-50 px-2 py-1 rounded-full">
                            {heroProduct.model}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-pink-600 text-3xl sm:text-4xl font-black">
                        UGX {Number(heroProduct.price).toLocaleString()}
                      </div>
                      {heroProduct.original_price && (
                        <div className="text-gray-400 text-sm line-through">
                          UGX {Number(heroProduct.original_price).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Button
                    onClick={scrollToOffersGrid}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg shadow-pink-600/30"
                  >
                    Shop Offers
                  </Button>
                  {heroProduct && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/product/${heroProduct.slug}`)}
                      className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-6 sm:px-8 py-2 sm:py-3"
                    >
                      View Featured Deal
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


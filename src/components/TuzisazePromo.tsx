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
        /* Full: Minimal header for offers page */
        <div className="bg-white border-b border-pink-200/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-sm">
              Tuzisaze Ebeeyi Promo!
            </h1>
          </div>
        </div>
      )}
    </section>
  );
};


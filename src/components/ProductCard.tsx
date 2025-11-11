import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
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
interface ProductCardProps {
  product: Product;
}
export const ProductCard = ({
  product
}: ProductCardProps) => {
  const navigate = useNavigate();
  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock_quantity === 0) return;
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder.svg",
        quantity: 1,
        slug: product.slug
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const handleClick = () => {
    navigate(`/product/${product.slug}`);
  };
  const getConditionDisplay = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'New';
      case 'used':
        return 'Used';
      default:
        return condition;
    }
  };
  const getDiscountPercentage = () => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    return Math.round((product.original_price - product.price) / product.original_price * 100);
  };
  const discount = getDiscountPercentage();
  return (
    <div 
      onClick={handleClick} 
      className="bg-white rounded-none overflow-hidden cursor-pointer group h-full flex flex-col border border-gray-100 hover:border-gray-200 transition-all duration-300"
    >
      {/* Image Container - Shopify style */}
      <div className="aspect-square relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gray-50">
          <img 
            src={product.images[0] || "/placeholder.svg"} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out" 
          />
        </div>
        
        {/* Badges - Top right corner, minimal */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="bg-black text-white text-xs font-semibold px-2 py-1 uppercase tracking-wide">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <div className="bg-pink-600 rounded-full p-1.5">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Condition badge - Bottom left */}
        {product.condition && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className={`text-xs font-medium px-2 py-1 ${
              product.condition === "new" 
                ? "bg-white text-black" 
                : "bg-gray-900 text-white"
            }`}>
              {getConditionDisplay(product.condition)}
            </span>
          </div>
        )}

        {/* Hover overlay - Quick view effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      {/* Product Info - Clean Shopify style */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Product Title */}
        <h3 className="text-sm font-normal text-black mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Price - Prominent */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-semibold text-black">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Product specs - Minimal tags */}
        {(product.storage_capacity || product.color) && (
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {product.storage_capacity && (
              <span className="text-xs text-gray-600 border border-gray-200 px-2 py-0.5">
                {product.storage_capacity}
              </span>
            )}
            {product.color && (
              <span className="text-xs text-gray-600 border border-gray-200 px-2 py-0.5">
                {product.color}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button - Shopify style */}
        <button
          onClick={addToCart}
          disabled={product.stock_quantity === 0}
          className="w-full mt-auto py-2.5 px-4 bg-black text-white text-sm font-medium uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
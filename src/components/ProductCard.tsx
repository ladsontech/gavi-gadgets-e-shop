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
      className="bg-white border border-gray-200 rounded-lg cursor-pointer group h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        <img 
          src={product.images[0] || "/placeholder.svg"} 
          alt={product.name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Badges - Top corners */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          {/* Left side - Condition Badge */}
          <Badge 
            className={`${
              product.condition === 'new' 
                ? 'bg-pink-600 hover:bg-pink-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white text-[10px] font-semibold px-2 py-0.5 shadow-md`}
          >
            {getConditionDisplay(product.condition)}
          </Badge>
          
          {/* Right side - Featured & Discount */}
          <div className="flex flex-col gap-1.5 items-end">
            {product.is_featured && (
              <div className="bg-pink-600 hover:bg-pink-700 rounded-full p-1.5 shadow-md">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-2 py-1 shadow-md">
                -{discount}%
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex-1 flex flex-col p-2">
        {/* Product Title - BOLD */}
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-[1.2] group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        {product.description && (
          <p className="text-[10px] sm:text-xs text-gray-600 mb-1 line-clamp-2 leading-[1.3]">
            {product.description}
          </p>
        )}
        
        {/* Product specs */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 flex-wrap">
          {product.storage_capacity && (
            <Badge variant="outline" className="text-[9px] sm:text-[10px] px-1.5 py-0.5 border-gray-300 leading-none">
              {product.storage_capacity}
            </Badge>
          )}
          {product.color && (
            <Badge variant="outline" className="text-[9px] sm:text-[10px] px-1.5 py-0.5 border-gray-300 leading-none">
              {product.color}
            </Badge>
          )}
        </div>
        
        {/* Price Section - Prominent */}
        <div className="mb-1.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-pink-600 leading-none">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through leading-none">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={product.stock_quantity === 0}
          className={`w-full mt-auto py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap ${
            product.stock_quantity === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-md active:scale-95'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
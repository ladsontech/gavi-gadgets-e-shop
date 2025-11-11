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
      className="bg-white cursor-pointer group h-full flex flex-col"
    >
      {/* Image Container - Clean minimal */}
      <div className="aspect-square relative overflow-hidden bg-white mb-2">
        <img 
          src={product.images[0] || "/placeholder.svg"} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:opacity-80 transition-opacity duration-300" 
        />
        
        {/* Badges - Minimal, top right */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="bg-black text-white text-[10px] font-medium px-1.5 py-0.5">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <div className="bg-pink-600 rounded-full p-1">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>
      </div>
      
      {/* Product Info - Clean minimal */}
      <div className="flex-1 flex flex-col">
        {/* Product Title */}
        <h3 className="text-sm font-normal text-black mb-1.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        
        {/* Price - Clean */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-medium text-black">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Product specs - Very minimal */}
        {(product.storage_capacity || product.color) && (
          <div className="flex items-center gap-1 mb-2 flex-wrap">
            {product.storage_capacity && (
              <span className="text-[10px] text-gray-500">
                {product.storage_capacity}
              </span>
            )}
            {product.color && (
              <span className="text-[10px] text-gray-500">
                {product.color}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button - Minimal */}
        <button
          onClick={addToCart}
          disabled={product.stock_quantity === 0}
          className="w-full mt-auto py-2 px-3 bg-black text-white text-xs font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
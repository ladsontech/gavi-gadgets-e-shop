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
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Badges - Top corners */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1.5">
            {/* Condition Badge */}
            <Badge 
              className={`${
                product.condition === 'new' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white text-[10px] font-semibold px-2 py-0.5 shadow-md`}
            >
              {getConditionDisplay(product.condition)}
            </Badge>
            {product.is_featured && (
              <Badge className="bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-semibold px-2 py-0.5 shadow-md flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-white" />
                Featured
              </Badge>
            )}
          </div>
          {discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-2 py-1 shadow-md">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex-1 flex flex-col p-3">
        {/* Product Title - BOLD */}
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        {/* Product specs */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {product.storage_capacity && (
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-gray-300">
              {product.storage_capacity}
            </Badge>
          )}
          {product.color && (
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-gray-300">
              {product.color}
            </Badge>
          )}
        </div>
        
        {/* Price Section - Prominent */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-pink-600">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">
                  UGX {Number(product.original_price).toLocaleString()}
                </span>
                <span className="text-[10px] text-green-600 font-semibold">
                  Save UGX {Number(product.original_price - product.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={product.stock_quantity === 0}
          className={`w-full mt-auto py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            product.stock_quantity === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-md active:scale-95'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
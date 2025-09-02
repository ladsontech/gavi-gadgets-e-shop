
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

export const ProductCard = ({ product }: ProductCardProps) => {
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
        slug: product.slug,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const getConditionDisplay = (condition: string) => {
    switch(condition) {
      case 'new': return 'New';
      case 'used': return 'Used';
      default: return condition;
    }
  };

  const getDiscountPercentage = () => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    return Math.round(((product.original_price - product.price) / product.original_price) * 100);
  };

  const discount = getDiscountPercentage();

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-200 h-full flex flex-col"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_featured && (
            <div className="bg-orange-500 rounded-full p-1">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
          )}
          {discount > 0 && (
            <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Condition badge */}
        <Badge 
          variant={product.condition === "new" ? "default" : "secondary"} 
          className="absolute top-2 right-2 text-xs"
        >
          {getConditionDisplay(product.condition)}
        </Badge>
      </div>
      
      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <div className="mb-2 flex-1">
          <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm sm:text-lg font-bold text-pink-600">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Product specs */}
          {(product.storage_capacity || product.color) && (
            <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              {product.storage_capacity && (
                <span className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                  {product.storage_capacity}
                </span>
              )}
              {product.color && (
                <span className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                  {product.color}
                </span>
              )}
            </div>
          )}
        </div>

        <Button
          size="sm"
          onClick={addToCart}
          disabled={product.stock_quantity === 0}
          className="w-full text-xs h-7 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

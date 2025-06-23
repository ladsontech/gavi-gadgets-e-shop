import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
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
    
    // Dispatch cart update event
    window.dispatchEvent(new Event("cartUpdated"));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const getConditionDisplay = (condition: string) => {
    switch(condition) {
      case 'new': return 'Brand New';
      case 'used': return 'UK Used';
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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-pink-200"
    >
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_featured && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-1.5 shadow-lg">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
          )}
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 shadow-lg">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Condition badge */}
        <Badge 
          variant={product.condition === "new" ? "default" : "secondary"} 
          className="absolute top-2 right-2 text-xs font-medium shadow-lg"
        >
          {getConditionDisplay(product.condition)}
        </Badge>

        {/* Wishlist button */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-pink-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 mb-2 leading-tight group-hover:text-pink-700 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && discount > 0 && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Additional product info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {product.storage_capacity && (
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {product.storage_capacity}
              </span>
            )}
            {product.color && (
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {product.color}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {product.stock_quantity > 0 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={addToCart}
            disabled={product.stock_quantity === 0}
            className="text-xs px-3 py-2 h-8 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
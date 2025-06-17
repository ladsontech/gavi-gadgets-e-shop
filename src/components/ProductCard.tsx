
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
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

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="aspect-square relative">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
        {product.is_featured && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-xs">Featured</Badge>
        )}
        {product.condition === "refurbished" && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            Refurbished
          </Badge>
        )}
      </div>
      
      <div className="p-2 sm:p-3">
        <div className="mb-2">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 truncate">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-sm sm:text-lg font-bold text-green-600">
              UGX {Number(product.price).toLocaleString()}
            </span>
            {product.original_price && (
              <span className="text-xs text-gray-400 line-through">
                UGX {Number(product.original_price).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={addToCart}
            disabled={product.stock_quantity === 0}
            className="text-xs px-2 py-1 h-7 bg-pink-600 hover:bg-pink-700"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

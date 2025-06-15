
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  brand: string;
  storage_capacity?: string;
  color?: string;
  condition: string;
  stock_quantity: number;
  images: string[];
  description?: string;
  is_featured: boolean;
  categories?: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 rounded-xl sm:rounded-2xl">
      <CardContent className="p-2 sm:p-4">
        <div className="relative mb-3 sm:mb-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt={product.name}
              className="w-4/5 h-4/5 object-contain rounded-lg mx-auto"
            />
          </div>
          {product.is_featured && (
            <Badge className="absolute top-1.5 left-1.5 bg-yellow-500 text-black text-xs sm:text-sm px-2">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-1.5 right-1.5 bg-red-500 text-xs sm:text-sm px-2">
              -{discount}%
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge className="absolute bottom-1.5 left-1.5 bg-gray-500 text-xs sm:text-sm px-2">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] sm:text-xs px-2 py-0.5">
              {product.categories?.name || product.brand}
            </Badge>
            <Badge variant={product.condition === 'new' ? 'default' : 'secondary'} className="text-[10px] sm:text-xs px-2 py-0.5">
              {product.condition}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-sm sm:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
            {product.storage_capacity && (
              <p>Storage: {product.storage_capacity}</p>
            )}
            {product.color && (
              <p>Color: {product.color}</p>
            )}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-xs sm:text-lg text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full text-xs sm:text-base py-2 sm:py-3"
        >
          <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};


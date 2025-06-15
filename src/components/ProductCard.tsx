
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
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {product.is_featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              -{discount}%
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge className="absolute bottom-2 left-2 bg-gray-500">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {product.categories?.name || product.brand}
            </Badge>
            <Badge variant={product.condition === 'new' ? 'default' : 'secondary'} className="text-xs">
              {product.condition}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="text-sm text-gray-600 space-y-1">
            {product.storage_capacity && (
              <p>Storage: {product.storage_capacity}</p>
            )}
            {product.color && (
              <p>Color: {product.color}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ShoppingCart, ArrowLeft, Share2, Heart, Star, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
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
  features?: string[];
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
        navigate("/");
        return;
      }

      if (!data) {
        navigate("/");
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [slug, navigate]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === product.id);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder.svg",
        quantity: quantity,
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

  const shareProduct = () => {
    if (!product) return;

    const currentUrl = window.location.href;
    const shareText = `Check out this ${product.name} from Gavi Gadgets UG!\n\nPrice: UGX ${Number(product.price).toLocaleString()}\nCondition: ${product.condition}\n\nYour Mobile Source - Quality Phones, Competitive Prices\n\n${currentUrl}`;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: shareText,
        url: currentUrl,
      });
    } else {
      // Fallback to WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getDiscountPercentage = () => {
    if (!product?.original_price || product.original_price <= product.price) return 0;
    return Math.round(((product.original_price - product.price) / product.original_price) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      {/* Enhanced Mobile Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-pink-100 px-4 py-3 md:hidden shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={shareProduct}
              className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-3 py-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {/* Compact Product Images */}
            <div className="p-3 md:p-6 lg:p-8">
              <div className="aspect-square mb-3 md:mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain p-3 md:p-4"
                />
                
                {/* Image badges */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
                  {product.is_featured && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg text-xs">
                      <Star className="w-2 h-2 md:w-3 md:h-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg text-xs">
                      -{discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                        selectedImage === index 
                          ? "border-pink-500 shadow-lg scale-105" 
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Product Info */}
            <div className="p-3 md:p-6 lg:p-8">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="flex-1">
                  {product.categories && (
                    <Badge variant="secondary" className="mb-2 md:mb-3 text-xs bg-pink-100 text-pink-700 border-pink-200">
                      {product.categories.name}
                    </Badge>
                  )}
                  <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-3 md:mb-4">
                    {product.brand} {product.model}
                  </p>
                </div>
                
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareProduct}
                    className="flex items-center gap-2 hover:bg-pink-50 border-pink-200"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-pink-50 border-pink-200"
                  >
                    <Heart className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Compact Pricing */}
              <div className="mb-4 md:mb-6 lg:mb-8 p-4 md:p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    UGX {Number(product.price).toLocaleString()}
                  </span>
                  {product.original_price && discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg lg:text-xl text-gray-400 line-through">
                        UGX {Number(product.original_price).toLocaleString()}
                      </span>
                      <Badge className="bg-red-500 text-white text-xs">
                        Save UGX {Number(product.original_price - product.price).toLocaleString()}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg border">
                    <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                    <span>Condition: <strong>{product.condition === 'new' ? 'Brand New' : 'UK Used'}</strong></span>
                  </div>
                  {product.color && (
                    <div className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg border">
                      Color: <strong>{product.color}</strong>
                    </div>
                  )}
                  {product.storage_capacity && (
                    <div className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg border">
                      Storage: <strong>{product.storage_capacity}</strong>
                    </div>
                  )}
                </div>
              </div>

              {product.description && (
                <div className="mb-4 md:mb-6 lg:mb-8">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3 text-gray-900">Description</h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed bg-gray-50 p-3 md:p-4 rounded-xl">
                    {product.description}
                  </p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mb-4 md:mb-6 lg:mb-8">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm md:text-base text-gray-700 bg-gray-50 p-2 md:p-3 rounded-lg">
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Quantity and Stock */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <label htmlFor="quantity" className="text-sm font-medium whitespace-nowrap text-gray-700">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-sm bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                <Button
                  onClick={addToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white text-sm md:text-base lg:text-lg py-2.5 md:py-3 lg:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/cart")}
                  className="sm:flex-shrink-0 text-sm md:text-base lg:text-lg py-2.5 md:py-3 lg:py-4 rounded-xl border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                >
                  View Cart
                </Button>
              </div>

              {/* Compact Payment Methods */}
              <div className="mt-4 md:mt-6 lg:mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                  Secure Payment Options
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 text-sm">
                  <div className="bg-white p-2 md:p-3 rounded-lg border flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    <span>Mobile Money</span>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-lg border flex items-center gap-2">
                    <span className="text-lg">🏦</span>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-lg border flex items-center gap-2">
                    <span className="text-lg">💵</span>
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
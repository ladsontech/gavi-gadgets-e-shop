import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ShoppingCart, ArrowLeft, Share2 } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={shareProduct}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-2 sm:px-4 py-4 md:py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Product Images */}
            <div className="p-4 md:p-6">
              <div className="aspect-square mb-4">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-lg border"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded border-2 ${
                        selectedImage === index ? "border-pink-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {product.categories && (
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {product.categories.name}
                    </Badge>
                  )}
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    {product.brand} {product.model}
                  </p>
                </div>
                {/* Desktop Share Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareProduct}
                  className="hidden md:flex items-center gap-2 ml-4"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">
                    UGX {Number(product.price).toLocaleString()}
                  </span>
                  {product.original_price && (
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      UGX {Number(product.original_price).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span>Condition: <strong>{product.condition}</strong></span>
                  {product.color && <span>Color: <strong>{product.color}</strong></span>}
                  {product.storage_capacity && (
                    <span>Storage: <strong>{product.storage_capacity}</strong></span>
                  )}
                </div>
              </div>

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm sm:text-base text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium whitespace-nowrap">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  {product.stock_quantity} in stock
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <Button
                  onClick={addToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/cart")}
                  className="sm:flex-shrink-0 text-sm sm:text-base"
                >
                  View Cart
                </Button>
              </div>

              {/* Payment Methods Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Payment Options:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📱 Mobile Money (MTN/Airtel)</div>
                  <div>🏦 Bank Transfer</div>
                  <div>💵 Cash on Delivery</div>
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

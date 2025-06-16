
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ShoppingCart, Star } from "lucide-react";
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
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppBar />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppBar />
        <div className="container mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="aspect-square mb-4">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-lg border"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                        selectedImage === index ? "border-blue-500" : "border-gray-200"
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
            <div>
              <div className="mb-4">
                {product.categories && (
                  <Badge variant="secondary" className="mb-2">
                    {product.categories.name}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.brand} {product.model}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    UGX {Number(product.price).toLocaleString()}
                  </span>
                  {product.original_price && (
                    <span className="text-xl text-gray-400 line-through">
                      UGX {Number(product.original_price).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Condition: <strong>{product.condition}</strong></span>
                  {product.color && <span>Color: <strong>{product.color}</strong></span>}
                  {product.storage_capacity && <span>Storage: <strong>{product.storage_capacity}</strong></span>}
                </div>
              </div>

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock_quantity} in stock
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={addToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

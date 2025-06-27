import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ShoppingCart, ArrowLeft, Share2, Heart, Star, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductGrid } from "@/components/ProductGrid";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  slug: string;
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
  slug: string;
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
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

      // Fetch related products
      if (data.categories?.id) {
        setRelatedLoading(true);
        const { data: related, error: relatedError } = await supabase
          .from("products")
          .select(`
            *,
            categories (
              id,
              name,
              slug
            )
          `)
          .eq("category_id", data.categories.id)
          .eq("is_active", true)
          .neq("id", data.id)
          .limit(8);

        if (!relatedError && related) {
          setRelatedProducts(related);
        }
        setRelatedLoading(false);
      }
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
        slug: product.slug
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Dispatch cart update event
    window.dispatchEvent(new Event("cartUpdated"));

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const shareProduct = () => {
    if (!product) return;
    const currentUrl = window.location.href;
    const shareText = `Check out this ${product.name} from Gavi Gadgets UG!\n\nPrice: UGX ${Number(product.price).toLocaleString()}\nCondition: ${product.condition}\n\nYour Mobile Source - Quality Products, Competitive Prices\n\n${currentUrl}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: shareText,
        url: currentUrl
      });
    } else {
      // Fallback to WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getDiscountPercentage = () => {
    if (!product?.original_price || product.original_price <= product.price) return 0;
    return Math.round((product.original_price - product.price) / product.original_price * 100);
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <LoadingSpinner />
      </div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
      </div>;
  }

  const discount = getDiscountPercentage();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Enhanced SEO data for product
  const productSEO = {
    title: `${product.name} - UGX ${Number(product.price).toLocaleString()} | Buy ${product.brand} ${product.model} in Uganda | Gavi Gadgets`,
    description: `Buy ${product.name} (${product.brand} ${product.model}) in Uganda for UGX ${Number(product.price).toLocaleString()}. ${product.condition === 'new' ? 'Brand new' : 'UK Used'} condition. ${product.storage_capacity ? `${product.storage_capacity} storage` : ''} ${product.color ? `in ${product.color}` : ''}. Better prices than Jumia Uganda and Jiji Uganda. Located at New Pioneer Mall Shop PA 82A, Kampala.`,
    keywords: `${product.name} Uganda, ${product.brand} ${product.model} Uganda, ${product.brand} Uganda, ${product.model} price Uganda, buy ${product.brand} Kampala, ${product.name} price, ${product.storage_capacity || ''} ${product.color || ''}, smartphone Uganda, mobile phone Uganda, ${product.brand} New Pioneer Mall, ${product.brand} better than Jumia, ${product.brand} better than Jiji`,
    image: product.images[0] || 'https://gavistore.lovable.app/images/gavi_gadgets_logo.png',
    url: currentUrl,
  };

  const breadcrumbs = [
    { name: product.categories?.name || 'Products', url: '/' },
    { name: product.name, url: `/product/${product.slug}` }
  ];

  return (
    <>
      <SEOHead
        title={productSEO.title}
        description={productSEO.description}
        keywords={productSEO.keywords}
        image={productSEO.image}
        url={productSEO.url}
        type="product"
        product={{
          name: product.name,
          price: product.price,
          originalPrice: product.original_price,
          brand: product.brand,
          model: product.model,
          condition: product.condition,
          availability: product.stock_quantity > 0 ? 'in_stock' : 'out_of_stock',
          category: product.categories?.name || 'Electronics',
          images: product.images,
          description: product.description,
          features: product.features
        }}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <main className="container mx-auto px-3 sm:px-4 py-3 md:py-4 lg:py-6">
          {/* Back Button and Share - Mobile and Desktop */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-3 py-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </Button>
            <Button variant="ghost" onClick={shareProduct} className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-3 py-2 md:hidden">
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share</span>
            </Button>
          </div>

          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {/* Product Images */}
              <div className="p-3 md:p-4 lg:p-6">
                <div className="aspect-square mb-2 md:mb-3 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                  <img src={product.images[selectedImage] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-contain p-2 md:p-3" />
                  
                  {/* Image badges */}
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1">
                    {product.is_featured && <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg text-xs">
                        <Star className="w-2 h-2 md:w-3 md:h-3 mr-1 fill-white" />
                        Featured
                      </Badge>}
                    {discount > 0 && <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg text-xs">
                        -{discount}% OFF
                      </Badge>}
                  </div>
                </div>
                
                {product.images.length > 1 && <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg border-2 overflow-hidden transition-all duration-300 ${selectedImage === index ? "border-pink-500 shadow-lg scale-105" : "border-gray-200 hover:border-pink-300"}`}>
                        <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain p-1" />
                      </button>)}
                  </div>}
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4 lg:p-6">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="flex-1">
                    {product.categories && <Badge variant="secondary" className="mb-1 md:mb-2 text-xs bg-pink-100 text-pink-700 border-pink-200">
                        {product.categories.name}
                      </Badge>}
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                      {product.brand} {product.model}
                    </p>
                  </div>
                  
                  {/* Desktop Actions */}
                  <div className="hidden md:flex items-center gap-2 ml-3">
                    <Button variant="outline" size="sm" onClick={shareProduct} className="flex items-center gap-1 hover:bg-pink-50 border-pink-200 text-xs">
                      <Share2 className="w-3 h-3" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-pink-50 border-pink-200 text-xs">
                      <Heart className="w-3 h-3" />
                      Save
                    </Button>
                  </div>
                </div>

                {/* Compact Pricing */}
                <div className="mb-2 md:mb-3 p-3 md:p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-2 mb-2">
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                      UGX {Number(product.price).toLocaleString()}
                    </span>
                    {product.original_price && discount > 0 && <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base text-gray-400 line-through">
                          UGX {Number(product.original_price).toLocaleString()}
                        </span>
                        <Badge className="bg-red-500 text-white text-xs">
                          Save UGX {Number(product.original_price - product.price).toLocaleString()}
                        </Badge>
                      </div>}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 md:gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span>Condition: <strong>{product.condition === 'new' ? 'Brand New' : 'UK Used'}</strong></span>
                    </div>
                    {product.color && <div className="bg-white px-2 py-1 rounded-lg border">
                        Color: <strong>{product.color}</strong>
                      </div>}
                    {product.storage_capacity && <div className="bg-white px-2 py-1 rounded-lg border">
                        Storage: <strong>{product.storage_capacity}</strong>
                      </div>}
                  </div>
                </div>

                {product.description && <div className="mb-2 md:mb-3">
                    <h3 className="text-sm md:text-base font-semibold mb-1 text-gray-900">Description</h3>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg">
                      {product.description}
                    </p>
                  </div>}

                {product.features && product.features.length > 0 && <div className="mb-2 md:mb-3">
                    <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-gray-900">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {product.features.map((feature, index) => <div key={index} className="flex items-center gap-1 text-xs md:text-sm text-gray-700 bg-gray-50 p-1.5 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></div>
                          {feature}
                        </div>)}
                    </div>
                  </div>}

                {/* Compact Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-2 md:mb-3">
                  <Button onClick={addToCart} disabled={product.stock_quantity === 0} className="flex-1 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white text-xs md:text-sm py-2 md:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/cart")} className="sm:flex-shrink-0 text-xs md:text-sm py-2 md:py-2.5 rounded-xl border-pink-200 hover:bg-pink-50 hover:border-pink-300">
                    View Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-6 md:mt-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                  Related Products
                </h2>
                {relatedLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ProductGrid products={relatedProducts} />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProductDetail;

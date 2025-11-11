import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, X, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number | null;
  description?: string | null;
  images: string[] | null;
  brand?: string;
  is_featured: boolean;
  is_active: boolean;
}

export const PromoManager = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all products
  const { data: allProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Fetch promo products (featured with original_price)
  const { data: promoProducts, isLoading: promoLoading } = useQuery({
    queryKey: ["admin-promo-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .not("original_price", "is", null)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const addPromoMutation = useMutation({
    mutationFn: async () => {
      if (!selectedProductId || !originalPrice || !discountedPrice) {
        throw new Error("Please fill in all fields");
      }

      const original = parseFloat(originalPrice);
      const discounted = parseFloat(discountedPrice);

      if (isNaN(original) || isNaN(discounted) || original <= discounted) {
        throw new Error("Original price must be greater than discounted price");
      }

      const { error } = await supabase
        .from("products")
        .update({
          is_featured: true,
          original_price: original,
          price: discounted,
        })
        .eq("id", selectedProductId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promo-products"] });
      queryClient.invalidateQueries({ queryKey: ["tuzisaze-promo"] });
      queryClient.invalidateQueries({ queryKey: ["productsAll"] });
      setSelectedProductId("");
      setOriginalPrice("");
      setDiscountedPrice("");
      setIsAdding(false);
      toast({
        title: "Success",
        description: "Product added to Tuzisaze Ebeeyi Promo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add product to promo",
        variant: "destructive",
      });
    },
  });

  const removePromoMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from("products")
        .update({
          is_featured: false,
          original_price: null,
        })
        .eq("id", productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promo-products"] });
      queryClient.invalidateQueries({ queryKey: ["tuzisaze-promo"] });
      queryClient.invalidateQueries({ queryKey: ["productsAll"] });
      toast({
        title: "Success",
        description: "Product removed from promo",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove product from promo",
        variant: "destructive",
      });
    },
  });

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const product = allProducts?.find((p) => p.id === productId);
    if (product) {
      setOriginalPrice(product.original_price?.toString() || product.price.toString());
      setDiscountedPrice(product.price.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPromoMutation.mutate();
  };

  const resetForm = () => {
    setSelectedProductId("");
    setOriginalPrice("");
    setDiscountedPrice("");
    setIsAdding(false);
  };

  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  if (productsLoading || promoLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const availableProducts = allProducts?.filter(
    (p) => !promoProducts?.some((promo) => promo.id === p.id)
  ) || [];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Tuzisaze Ebeeyi Promo Manager
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage promotional products with discounted prices
          </p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Promo Product
        </Button>
      </div>

      {/* Add Promo Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Add Product to Promo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="product" className="text-sm font-medium">
                  Select Product *
                </Label>
                <Select value={selectedProductId} onValueChange={handleProductSelect}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - UGX {Number(product.price).toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {availableProducts.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    All products are already in promo
                  </p>
                )}
              </div>

              {selectedProductId && (
                <>
                  <div>
                    <Label htmlFor="originalPrice" className="text-sm font-medium">
                      Original Price (UGX) *
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="e.g., 1450000"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="discountedPrice" className="text-sm font-medium">
                      Discounted Price (UGX) *
                    </Label>
                    <Input
                      id="discountedPrice"
                      type="number"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      placeholder="e.g., 1400000"
                      className="mt-1"
                      required
                    />
                    {originalPrice && discountedPrice && 
                     parseFloat(originalPrice) > parseFloat(discountedPrice) && (
                      <p className="text-sm text-green-600 mt-1">
                        Discount: {getDiscountPercentage(
                          parseFloat(originalPrice),
                          parseFloat(discountedPrice)
                        )}% (Save UGX {(parseFloat(originalPrice) - parseFloat(discountedPrice)).toLocaleString()})
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  type="submit" 
                  disabled={addPromoMutation.isPending || !selectedProductId || !originalPrice || !discountedPrice}
                  className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
                >
                  {addPromoMutation.isPending ? "Adding..." : "Add to Promo"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="w-full sm:w-auto"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Promo Products List */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Current Promo Products ({promoProducts?.length || 0})
        </h3>
        
        {promoProducts?.map((product) => {
          const original = product.original_price || product.price;
          const discounted = product.price;
          const discount = original - discounted;
          const discountPercent = getDiscountPercentage(original, discounted);
          const mainImage = product.images && product.images.length > 0 
            ? product.images[0] 
            : "/placeholder.svg";

          return (
            <Card key={product.id}>
              <CardContent className="p-2 sm:p-3 md:p-4">
                {/* Mobile Layout */}
                <div className="block sm:hidden space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {product.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-gray-400 text-xs line-through">
                            UGX {Number(original).toLocaleString()}
                          </span>
                          <span className="text-pink-600 font-bold text-sm">
                            UGX {Number(discounted).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-green-600">
                          -{discountPercent}% (Save UGX {Number(discount).toLocaleString()})
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Remove this product from promo?")) {
                        removePromoMutation.mutate(product.id);
                      }
                    }}
                    disabled={removePromoMutation.isPending}
                    className="w-full"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Remove from Promo
                  </Button>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.png";
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate mb-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-baseline gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 text-sm line-through">
                          UGX {Number(original).toLocaleString()}
                        </span>
                        <span className="text-pink-600 font-bold text-lg">
                          UGX {Number(discounted).toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        -{discountPercent}% OFF
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Save UGX {Number(discount).toLocaleString()}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Remove this product from promo?")) {
                        removePromoMutation.mutate(product.id);
                      }
                    }}
                    disabled={removePromoMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {(!promoProducts || promoProducts.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-sm sm:text-base">
              No promo products yet. Add your first promo product above.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


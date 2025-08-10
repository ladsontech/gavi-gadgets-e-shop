import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SimpleProductForm } from "@/components/admin/SimpleProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { UpdatesManager } from "@/components/admin/UpdatesManager";
import { OthersManager } from "@/components/admin/OthersManager";
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Star,
  Plus,
  Settings,
  Image,
  Tag,
  Calendar
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  brand: string;
  model: string;
  condition: string;
  images: string[];
  description?: string;
  category_id?: string;
  slug: string;
  is_featured: boolean;
  stock_quantity: number;
  is_weekly_offer?: boolean;
  offer_start_date?: string;
  offer_end_date?: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const Admin = () => {
  const { isAdmin, loginAdmin } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAdmin) {
      setShowLoginModal(true);
    }
  }, [isAdmin]);

  const handleLoginClose = () => {
    setShowLoginModal(false);
    if (!isAdmin) {
      window.location.href = "/";
    }
  };

  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
      console.error("Error deleting item:", error);
    },
  });

  const toggleWeeklyOffer = useMutation({
    mutationFn: async ({ productId, isOffer }: { productId: string; isOffer: boolean }) => {
      const updateData: any = {
        is_weekly_offer: isOffer,
      };

      if (isOffer) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7); // 7 days from now
        
        updateData.offer_start_date = startDate.toISOString();
        updateData.offer_end_date = endDate.toISOString();
      } else {
        updateData.offer_start_date = null;
        updateData.offer_end_date = null;
      }

      const { error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({
        title: "Success",
        description: "Weekly offer status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update weekly offer status",
        variant: "destructive",
      });
      console.error("Error updating weekly offer:", error);
    },
  });

  if (!isAdmin) {
    return (
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={handleLoginClose}
        onLogin={loginAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your products, categories, and content
            </p>
          </div>
          <Button
            onClick={() => setShowProductForm(true)}
            className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="products" className="flex items-center gap-2 p-2 sm:p-3">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2 p-2 sm:p-3">
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2 p-2 sm:p-3">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Weekly Offers</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center gap-2 p-2 sm:p-3">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Updates</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2 p-2 sm:p-3">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {showProductForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleProductForm
                    editProduct={editingProduct ? {
                      id: editingProduct.id,
                      name: editingProduct.name,
                      price: editingProduct.price,
                      description: editingProduct.description,
                      images: editingProduct.images,
                      stock_quantity: editingProduct.stock_quantity,
                    } : undefined}
                    onSave={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
                    }}
                    onCancel={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Products Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductList
                    products={products || []}
                    categories={categories || []}
                    onEdit={(product) => {
                      setEditingProduct(product);
                      setShowProductForm(true);
                    }}
                    onDelete={deleteProduct.mutate}
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <OthersManager />
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Weekly Offers Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products?.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          UGX {Number(product.price).toLocaleString()}
                        </p>
                        {product.is_weekly_offer && product.offer_end_date && (
                          <p className="text-xs text-green-600">
                            Offer expires: {new Date(product.offer_end_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button
                        variant={product.is_weekly_offer ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleWeeklyOffer.mutate({
                          productId: product.id,
                          isOffer: !product.is_weekly_offer
                        })}
                        disabled={toggleWeeklyOffer.isPending}
                      >
                        {product.is_weekly_offer ? "Remove from Offers" : "Add to Offers"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="space-y-4">
            <UpdatesManager />
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {products?.filter(p => p.is_featured).length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Offers</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {products?.filter(p => p.is_weekly_offer).length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{categories?.length || 0}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

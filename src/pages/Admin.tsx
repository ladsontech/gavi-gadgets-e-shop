import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatchProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { UpdatesManager } from "@/components/admin/UpdatesManager";
import { OthersManager } from "@/components/admin/OthersManager";
import { PromoManager } from "@/components/admin/PromoManager";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { NotificationSender } from "@/components/admin/NotificationSender";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { SimpleProductForm } from "@/components/admin/SimpleProductForm";
import { EditProductForm } from "@/components/admin/EditProductForm";
import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  original_price?: number;
  description?: string;
  images: string[];
  category_id: string | null;
  slug: string;
  is_active: boolean;
  condition: string;
  features?: string[];
  stock_quantity: number;
  is_featured: boolean;
  is_weekly_offer: boolean;
  offer_start_date?: string | null;
  offer_end_date?: string | null;
  storage_capacity?: string;
  color?: string;
  created_at: string;
  updated_at: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { isAdmin, logoutAdmin, isLoading } = useAdminAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSimpleForm, setShowSimpleForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Debug logging
  useEffect(() => {
    console.log("Admin page state:", { isAdmin, isLoading });
  }, [isAdmin, isLoading]);

  useEffect(() => {
    // Only redirect if we're sure the user is not an admin after loading is complete
    if (!isLoading && !isAdmin) {
      console.log("Redirecting to auth - user is not admin");
      navigate("/auth", { replace: true });
    }
  }, [isAdmin, isLoading, navigate]);


  const {
    data: products,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
            *,
            categories (
              id,
              name,
              slug
            )
          `
        )
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: isAdmin && !isLoading, // Only fetch when authenticated
    refetchOnWindowFocus: false, // Don't auto-refresh on focus
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: isAdmin && !isLoading, // Only fetch when authenticated
    refetchOnWindowFocus: false, // Don't auto-refresh on focus
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(false);
    setShowSimpleForm(false);
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      
      if (error) {
        console.error("Error deleting product:", error);
      } else {
        refetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
          <p className="text-gray-300 text-xs mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show redirect message if not admin (redirect happens in useEffect)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Redirecting to login...</p>
          <p className="text-gray-300 text-xs mt-2">You are not authorized to access this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={logoutAdmin} variant="outline" size="sm" className="w-full sm:w-auto">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Mobile: Scrollable tabs */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-2 px-2">
            <TabsList className="inline-flex w-auto h-auto p-1 gap-1">
              <TabsTrigger value="analytics" className="text-xs px-3 py-2 whitespace-nowrap">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs px-3 py-2 whitespace-nowrap">
                Orders
              </TabsTrigger>
              <TabsTrigger value="products" className="text-xs px-3 py-2 whitespace-nowrap">
                Products
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-xs px-3 py-2 whitespace-nowrap">
                Categories
              </TabsTrigger>
              <TabsTrigger value="promo" className="text-xs px-3 py-2 whitespace-nowrap">
                Promo
              </TabsTrigger>
              <TabsTrigger value="updates" className="text-xs px-3 py-2 whitespace-nowrap">
                Updates
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs px-3 py-2 whitespace-nowrap">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="others" className="text-xs px-3 py-2 whitespace-nowrap">
                Others
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop: Grid tabs */}
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-8 h-auto p-1">
              <TabsTrigger value="analytics" className="text-sm px-3 py-2">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-sm px-3 py-2">
                Orders
              </TabsTrigger>
              <TabsTrigger value="products" className="text-sm px-3 py-2">
                Products ({products?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-sm px-3 py-2">
                Categories ({categories?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="promo" className="text-sm px-3 py-2">
                Promo
              </TabsTrigger>
              <TabsTrigger value="updates" className="text-sm px-3 py-2">
                Updates
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-sm px-3 py-2">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="others" className="text-sm px-3 py-2">
                Others
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analytics" className="space-y-3 sm:space-y-4 md:space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="orders" className="space-y-3 sm:space-y-4 md:space-y-6">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="products" className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Product Management</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setShowSimpleForm(true)}
                    className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-sm"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="w-full sm:w-auto text-sm"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              {showSimpleForm && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg bg-purple-50">
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Quick Add Item</h3>
                  <SimpleProductForm
                    onSave={() => {
                      setShowSimpleForm(false);
                      refetchProducts();
                    }}
                    onCancel={() => setShowSimpleForm(false)}
                  />
                </div>
              )}

              {showAddForm && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Add New Product</h3>
                  <BatchProductForm
                    categories={categories || []}
                    onSave={() => {
                      setShowAddForm(false);
                      refetchProducts();
                    }}
                    onCancel={() => setShowAddForm(false)}
                  />
                </div>
              )}

              {editingProduct && (
                <div className="mb-4 sm:mb-6">
                  <EditProductForm
                    product={editingProduct}
                    categories={categories || []}
                    onSave={() => {
                      setEditingProduct(null);
                      refetchProducts();
                    }}
                    onCancel={() => setEditingProduct(null)}
                  />
                </div>
              )}

              {!editingProduct && (
                <ProductList 
                  products={products || []} 
                  categories={categories || []}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Categories</h2>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {categories?.map((category) => (
                  <div key={category.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 md:p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">{category.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Slug: {category.slug}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="promo">
            <PromoManager />
          </TabsContent>

          <TabsContent value="updates">
            <UpdatesManager />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-3 sm:space-y-4 md:space-y-6">
            <NotificationSender />
          </TabsContent>

          <TabsContent value="others">
            <OthersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

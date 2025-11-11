
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatchProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { UpdatesManager } from "@/components/admin/UpdatesManager";
import { OthersManager } from "@/components/admin/OthersManager";
import { PromoManager } from "@/components/admin/PromoManager";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { SimpleProductForm } from "@/components/admin/SimpleProductForm";
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
  offer_start_date?: string;
  offer_end_date?: string;
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
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        setShowLoginModal(true);
      } else {
        setShowLoginModal(false);
      }
    }
  }, [isAdmin, isLoading]);

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
  });

  const handleEdit = (product: Product) => {
    // Handle product editing
    console.log("Edit product:", product);
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
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login modal if not authenticated
  if (!isAdmin) {
    return (
      <AdminLoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
      />
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

        <Tabs defaultValue="products" className="space-y-3 sm:space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1">
            <TabsTrigger value="products" className="text-xs sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">
              Products ({products?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-xs sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">
              Categories ({categories?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="promo" className="text-xs sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">Promo</TabsTrigger>
            <TabsTrigger value="updates" className="text-xs sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">Updates</TabsTrigger>
            <TabsTrigger value="others" className="text-xs sm:text-sm px-1 sm:px-3 py-1.5 sm:py-2">Others</TabsTrigger>
          </TabsList>

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

              <ProductList 
                products={products || []} 
                categories={categories || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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

          <TabsContent value="others">
            <OthersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

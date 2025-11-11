
import React, { useState } from "react";
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
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSimpleForm, setShowSimpleForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(!isAdmin);

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

  if (!isAdmin) {
    return (
      <AdminLoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={logoutAdmin} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products">Products ({products?.length || 0})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories?.length || 0})</TabsTrigger>
            <TabsTrigger value="promo">Promo</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Product Management</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setShowSimpleForm(true)}
                    className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              {showSimpleForm && (
                <div className="mb-6 p-4 border rounded-lg bg-purple-50">
                  <h3 className="text-lg font-medium mb-4">Quick Add Item</h3>
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
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Add New Product</h3>
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

          <TabsContent value="categories" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-4">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-gray-500">Slug: {category.slug}</p>
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

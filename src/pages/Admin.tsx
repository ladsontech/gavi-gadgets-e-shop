
import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { Loader2, Plus, Package, ArrowLeft } from "lucide-react";

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
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const Admin: React.FC = () => {
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, [isAdmin, navigate]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Load categories
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories(catData || []);
      
      // Load products
      await refreshProducts();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const refreshProducts = async () => {
    const { data: prodData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(prodData || []);
  };

  const handleAdd = () => {
    setEditProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      refreshProducts();
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    refreshProducts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-friendly header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showForm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFormCancel}
                  className="p-1 sm:hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {showForm ? (editProduct ? "Edit Product" : "Add Product") : "Products"}
                  </h1>
                  {!showForm && (
                    <p className="text-xs sm:text-sm text-gray-600">
                      {products.length} smartphone{products.length !== 1 ? 's' : ''} in store
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!showForm && (
                <Button 
                  onClick={handleAdd} 
                  size="sm"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Plus className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={logoutAdmin}>
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="px-4 py-4 sm:px-6 sm:py-6 max-w-4xl mx-auto">
        {showForm ? (
          <ProductForm
            product={editProduct}
            categories={categories}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
              </div>
            ) : (
              <ProductList
                products={products}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;


import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";
import { Loader2, Plus, Package } from "lucide-react";
import { AppBar } from "@/components/AppBar";

type Product = {
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
  category_id?: string;
  features?: string[];
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
      <AppBar />
      <main className="py-8 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-pink-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600">Manage your store inventory</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? 's' : ''} total
              </div>
              <Button variant="outline" size="sm" onClick={logoutAdmin}>
                Logout
              </Button>
            </div>
          </div>

          {showForm ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
              </div>
              <ProductForm
                product={editProduct}
                categories={categories}
                onSave={handleFormSave}
                onCancel={handleFormCancel}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                <Button onClick={handleAdd} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

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
        </div>
      </main>
    </div>
  );
};

export default Admin;

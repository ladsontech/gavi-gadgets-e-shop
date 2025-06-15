
import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { Loader2, Edit, Plus, Trash2 } from "lucide-react";

// Simple Product, Category types
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

  // Fetch categories + products
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories(catData || []);
      const { data: prodData } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts(prodData || []);
      setIsLoading(false);
    };
    load();
  }, []);

  // Triggered after add/edit
  const refreshProducts = async () => {
    setIsLoading(true);
    const { data: prodData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(prodData || []);
    setIsLoading(false);
  };

  const handleAdd = () => {
    setEditProduct(undefined);
    setShowForm(true);
  };
  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      refreshProducts();
    }
  };

  if (!isAdmin) return null;

  return (
    <main className="py-8 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="secondary" size="sm" onClick={logoutAdmin}>
          Logout
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button size="sm" onClick={handleAdd}>
          <Plus className="inline mr-1" /> Add Product
        </Button>
      </div>

      {showForm ? (
        <ProductForm
          product={editProduct}
          categories={categories}
          onSave={(prod) => {
            setShowForm(false);
            refreshProducts();
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-xs sm:text-base bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2">Name</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Condition</th>
                  <th>Featured</th>
                  <th>Images</th>
                  <th className="w-[110px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>{p.model}</td>
                    <td>{categories.find(c => c.id === p.category_id)?.name || "-"}</td>
                    <td>
                      UGX {Number(p.price).toLocaleString()}
                      {p.original_price && (
                        <span className="line-through text-gray-400 ml-2">
                          UGX {Number(p.original_price).toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td>{p.stock_quantity}</td>
                    <td>{p.condition}</td>
                    <td>
                      {p.is_featured ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(p.images || []).slice(0, 2).map((img, i) => (
                          <img key={img} src={img} alt="" className="w-8 h-8 rounded object-cover" />
                        ))}
                        {p.images && p.images.length > 2 && <span className="text-xs ml-2">+{p.images.length - 2}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(p)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!products.length && (
                  <tr>
                    <td colSpan={10} className="text-center py-8">No products. Click 'Add Product' to create the first one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      )}
    </main>
  );
};

export default Admin;
